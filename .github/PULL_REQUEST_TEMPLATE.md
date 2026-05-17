# Pull Request

## Summary
<!-- What does this PR do? -->

## Type of Change
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 🏗️ Infrastructure change (CDK)
- [ ] 📄 Documentation update
- [ ] 🔧 Config/settings update

---

## Migration Checklist
<!-- For migration-related PRs, complete this section -->

### Code
- [ ] .NET version confirmed and compatible
- [ ] No `System.Web` references remaining
- [ ] Replaced `HttpContext` with ASP.NET Core equivalents
- [ ] Connection strings use environment variables (not hardcoded)
- [ ] No secrets committed to repo

### AWS Transform
- [ ] AWS Transform scan completed
- [ ] Compatibility report reviewed
- [ ] All HIGH severity issues resolved
- [ ] MEDIUM severity issues documented with plan

### Infrastructure
- [ ] CDK stack updated if new resources added
- [ ] IAM permissions follow least privilege
- [ ] Health check endpoint `/health` working
- [ ] Environment variables added to `.env.example`

### Testing
- [ ] Unit tests pass (`dotnet test`)
- [ ] Docker image builds successfully
- [ ] Local smoke test done
- [ ] Health check returns 200

### Wave Planning
- [ ] Migration wave number assigned: **Wave ___**
- [ ] Dependencies on other services documented
- [ ] Rollback plan documented

---

## Screenshots / Evidence
<!-- Add screenshots, logs, or test output here -->

## Related Issues
<!-- Closes #123 -->
