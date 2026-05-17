# 🗺️ .NET to AWS Migration Guide

> Part of the MigrateAI Starter Kit

---

## Overview

This guide walks you through migrating a legacy .NET Framework application to AWS using **AWS Transform for .NET**, containerization, and AWS CDK.

---

## Step 1: Assess Your Application

Before writing any code, understand what you're working with.

### Run AWS Transform Scan
```bash
# Install AWS Transform for .NET (via Visual Studio extension or CLI)
# Then run assessment on your solution
aws transform dotnet assess --solution-path ./YourApp.sln --output ./docs/report
```

### What to look for in the report:
- 🔴 **HIGH** — Must fix before migration
- 🟡 **MEDIUM** — Fix or document workaround
- 🟢 **LOW** — Nice to fix, not blocking

Common HIGH issues:
- `System.Web` dependencies
- Windows-specific APIs
- COM interop
- `HttpContext.Current`

---

## Step 2: Plan Your Migration Waves

Break your solution into waves based on dependency order.

```
Wave 1: Infrastructure libs (no dependencies)
Wave 2: Domain/business logic (depends on Wave 1)
Wave 3: API/Web layer (depends on Wave 2)
Wave 4: Integration points (depends on Wave 3)
```

See [wave-planning.md](./wave-planning.md) for detailed guidance.

---

## Step 3: Update Code

### Replace System.Web
```csharp
// ❌ Old (.NET Framework)
using System.Web.Http;
public class ProductsController : ApiController { }

// ✅ New (.NET 8)
using Microsoft.AspNetCore.Mvc;
[ApiController]
public class ProductsController : ControllerBase { }
```

### Replace HttpContext.Current
```csharp
// ❌ Old
var user = HttpContext.Current.User.Identity.Name;

// ✅ New (inject IHttpContextAccessor)
var user = _httpContextAccessor.HttpContext?.User.Identity?.Name;
```

### Update Connection Strings
```csharp
// ✅ Use environment variables / AWS Secrets Manager
var connStr = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING")
           ?? builder.Configuration.GetConnectionString("Default");
```

---

## Step 4: Containerize

```bash
# Build Docker image
docker build -t sample-app:latest .

# Test locally
docker run -p 8080:8080 --env-file .env sample-app:latest

# Verify health check
curl http://localhost:8080/health
```

---

## Step 5: Push to ECR

```bash
# Authenticate
aws ecr get-login-password --region ap-south-1 | \
  docker login --username AWS --password-stdin \
  YOUR_ACCOUNT_ID.dkr.ecr.ap-south-1.amazonaws.com

# Tag and push
docker tag sample-app:latest YOUR_ECR_URI:latest
docker push YOUR_ECR_URI:latest
```

---

## Step 6: Deploy with CDK

```bash
cd infra/cdk
npm install
cdk bootstrap aws://YOUR_ACCOUNT_ID/ap-south-1
cdk synth      # Preview CloudFormation
cdk deploy     # Deploy to AWS
```

---

## Step 7: Verify

```bash
# Get ALB URL from CDK output
curl http://YOUR-ALB-DNS/health
curl http://YOUR-ALB-DNS/api/products
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| `System.Web not found` | Replace with ASP.NET Core equivalents |
| Docker build fails on Windows paths | Ensure Linux line endings (`.gitattributes`) |
| ECS task keeps restarting | Check `/health` endpoint returns 200 |
| CDK bootstrap fails | Ensure IAM user has admin permissions |
| Secrets not loading | Check Secrets Manager ARN in `.env` |

---

## Next Steps

- Set up RDS for database migration
- Configure AWS WAF for the ALB
- Enable CloudWatch dashboards
- Set up auto-scaling policies

---

> 🎓 **MigrateAI Cohort**: If you're stuck at any step, raise a [Migration Blocker issue](../.github/ISSUE_TEMPLATE/migration_blocker.md)!
