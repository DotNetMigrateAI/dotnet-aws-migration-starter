# 🚀 .NET to AWS Migration Starter Kit

> Built by [Hitesh](https://twitter.com/) | [MigrateWithAI](https://youtube.com/) | Part of the **MigrateAI** ecosystem

A production-ready starter template for migrating legacy .NET applications to AWS using **AWS Transform for .NET** and modern AWS services (ECS, Lambda, API Gateway, CDK).

---

## 📦 What's Inside

```
dotnet-aws-migration-starter/
├── src/
│   └── SampleApp/              # .NET 8 Web API starter
│       ├── Controllers/        # Sample REST controllers
│       ├── Models/             # Domain models
│       └── Services/           # Business logic layer
├── infra/
│   └── cdk/                    # AWS CDK Infrastructure as Code
│       ├── app-stack.ts        # ECS Fargate stack
│       └── cdk.json
├── transform/
│   └── migration-config/       # AWS Transform for .NET configs
│       └── transform-settings.json
├── docs/
│   ├── migration-guide.md      # Step-by-step migration guide
│   └── wave-planning.md        # Migration wave planning guide
├── .github/
│   ├── ISSUE_TEMPLATE/         # Bug & question templates
│   └── workflows/              # CI/CD GitHub Actions
├── Dockerfile
├── .env.example
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [AWS CLI](https://aws.amazon.com/cli/) configured
- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html) (`npm install -g aws-cdk`)
- [Docker](https://www.docker.com/)

### 1. Use This Template
Click **"Use this template"** → **"Create a new repository"** on GitHub.

### 2. Clone & Setup
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
cd YOUR_REPO_NAME
cp .env.example .env
# Fill in your AWS details in .env
```

### 3. Run Locally
```bash
cd src/SampleApp
dotnet restore
dotnet run
# API runs at http://localhost:5000
```

### 4. Deploy to AWS
```bash
cd infra/cdk
npm install
cdk bootstrap
cdk deploy
```

---

## 🗺️ Migration Workflow

```
Legacy .NET App
      ↓
AWS Transform Scan    ← transform/migration-config/
      ↓
Wave Planning         ← docs/wave-planning.md
      ↓
Containerize          ← Dockerfile
      ↓
Deploy to AWS         ← infra/cdk/
      ↓
CI/CD Pipeline        ← .github/workflows/
```

---

## 🏗️ AWS Architecture

```
Internet → ALB → ECS Fargate (.NET 8)
                      ↓
              RDS / DynamoDB
                      ↓
              S3 / Secrets Manager
```

---

## 📚 Documentation

| Doc | Description |
|-----|-------------|
| [Migration Guide](docs/migration-guide.md) | End-to-end migration walkthrough |
| [Wave Planning](docs/wave-planning.md) | How to plan migration in waves |

---

## 🎓 Learn More

This template is part of the **MigrateAI Cohort Program** — a hands-on training for engineers migrating legacy .NET apps to AWS.

- 🐦 Follow on X: [@YourHandle](https://twitter.com/)
- 📺 YouTube: [MigrateWithAI](https://youtube.com/)
- 💼 LinkedIn: [Your Profile](https://linkedin.com/)

---

## 🤝 Contributing

Found an issue or want to improve the template? Use the [Issue Templates](.github/ISSUE_TEMPLATE/) to report bugs or suggest features.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

> ⭐ If this helped you, please **star the repo** — it helps others find it!
