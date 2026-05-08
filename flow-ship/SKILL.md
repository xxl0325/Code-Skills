---
name: flow-ship
description: 准备当前 phase 或本轮需求的交付说明。Use after flow-verify passes. Creates PR/release notes, change summary, verification evidence, remaining risks, and SHIP.md. Do not use to add new features.
---

# Flow Ship

准备交付，不做新开发。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`

## 边界

只做：

- 汇总变更、验证证据、剩余风险。
- 准备 PR 描述或交付说明。
- 写 `SHIP.md`。
- 使用中文撰写交付说明、PR 摘要、验证证据和剩余风险。

不做：

- 不新增功能。
- 不修复非阻塞问题，除非用户明确要求。
- 不隐瞒未运行的验证。

## 流程

1. 确认 `VERIFICATION.md` 为 PASS。
2. 读取 git diff、PLAN、EXECUTION、VERIFICATION。
3. 写 `SHIP.md`：
   - Summary
   - User-visible changes
   - Technical changes
   - Verification evidence
   - Security notes
   - Remaining risks
   - Rollback notes
4. 更新 `STATE.md`。

## 退出条件

- 交付说明足够支持 PR 或发布。
- 剩余风险明确。
- 没有把未验证内容描述为已验证。
