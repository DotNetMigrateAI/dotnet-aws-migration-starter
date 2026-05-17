# 🌊 Migration Wave Planning Guide

> Part of the MigrateAI Starter Kit

---

## What is Wave Planning?

Wave planning breaks a large migration into smaller, manageable groups of applications migrated together — reducing risk and allowing rollback if needed.

---

## Wave Planning Template

| Wave | Applications | Dependencies | Target Date | Owner | Status |
|------|-------------|--------------|-------------|-------|--------|
| Wave 1 | Shared libs, utilities | None | Week 2 | | 🔴 Not Started |
| Wave 2 | Domain services | Wave 1 | Week 4 | | 🔴 Not Started |
| Wave 3 | APIs & web apps | Wave 2 | Week 6 | | 🔴 Not Started |
| Wave 4 | Integrations | Wave 3 | Week 8 | | 🔴 Not Started |

---

## Wave Criteria

### Good candidates for Wave 1 (migrate first):
- No external dependencies
- Stateless services
- Utility/helper libraries
- Low traffic, low risk

### Good candidates for later waves:
- Complex state management
- Heavy database interactions
- Third-party integrations
- High traffic, business-critical services

---

## Rollback Plan per Wave

For each wave, document:

```
Wave X Rollback Plan:
- Trigger condition: [e.g. error rate > 5%]
- Who approves rollback: [name/role]
- Rollback steps:
  1. Redirect traffic back to legacy via Route 53 weighted routing
  2. Notify stakeholders
  3. Create post-mortem issue
- Max rollback time: 15 minutes
```

---

> 🎓 Use the [Migration Blocker issue template](../.github/ISSUE_TEMPLATE/migration_blocker.md) if you're blocked on any wave.
