import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ─── VPC ───────────────────────────────────────────────
    const vpc = new ec2.Vpc(this, 'AppVpc', {
      maxAzs: 2,
      natGateways: 1,
    });

    // ─── ECR Repository ────────────────────────────────────
    const repository = new ecr.Repository(this, 'AppRepository', {
      repositoryName: 'sample-app',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // ─── ECS Cluster ───────────────────────────────────────
    const cluster = new ecs.Cluster(this, 'AppCluster', {
      vpc,
      clusterName: 'migration-cluster',
    });

    // ─── Task Definition ───────────────────────────────────
    const taskDef = new ecs.FargateTaskDefinition(this, 'AppTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const logGroup = new logs.LogGroup(this, 'AppLogs', {
      logGroupName: '/ecs/sample-app',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      retention: logs.RetentionDays.ONE_WEEK,
    });

    taskDef.addContainer('AppContainer', {
      image: ecs.ContainerImage.fromEcrRepository(repository, 'latest'),
      portMappings: [{ containerPort: 8080 }],
      logging: ecs.LogDrivers.awsLogs({
        logGroup,
        streamPrefix: 'sample-app',
      }),
      environment: {
        ASPNETCORE_ENVIRONMENT: 'Production',
        ASPNETCORE_URLS: 'http://+:8080',
      },
      healthCheck: {
        command: ['CMD-SHELL', 'curl -f http://localhost:8080/health || exit 1'],
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(5),
        retries: 3,
      },
    });

    // ─── Fargate Service ───────────────────────────────────
    const service = new ecs.FargateService(this, 'AppService', {
      cluster,
      taskDefinition: taskDef,
      desiredCount: 2,
      serviceName: 'sample-app-service',
    });

    // ─── Application Load Balancer ─────────────────────────
    const alb = new elbv2.ApplicationLoadBalancer(this, 'AppAlb', {
      vpc,
      internetFacing: true,
    });

    const listener = alb.addListener('AppListener', { port: 80 });
    listener.addTargets('AppTargets', {
      port: 8080,
      targets: [service],
      healthCheck: {
        path: '/health',
        interval: cdk.Duration.seconds(30),
      },
    });

    // ─── Outputs ───────────────────────────────────────────
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: alb.loadBalancerDnsName,
      description: 'Application URL',
    });

    new cdk.CfnOutput(this, 'ECRRepository', {
      value: repository.repositoryUri,
      description: 'ECR Repository URI',
    });
  }
}
