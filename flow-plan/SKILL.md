---
name: flow-plan
description: 将通过评审的技术方案拆成可执行 phases 和任务计划。Use after flow-review passes. Produces plans/ROADMAP.md and plans/phases/*/PLAN.md with acceptance criteria, file scope, dependencies, and verification commands. Do not use for coding.
---

# Flow Plan

把通过评审的技术方案拆成可执行计划。`ROADMAP.md` 只代表本轮需求的 phase 拆分。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/verification-rules.md`

## 边界

只做：

- 创建 `plans/ROADMAP.md`。
- 创建 `plans/phases/*/PLAN.md`。
- 更新 `plans/STATE.md`。
- 使用中文撰写路线图、计划、验收标准、风险和验证说明。

不做：

- 不写代码。
- 不重新发明技术方案。
- 不忽略 `TECHNICAL-REVIEW.md` 的 required changes。

## 流程

1. 确认 `TECHNICAL-REVIEW.md` verdict 为 PASS。
2. 读取需求、API/UI/technical solution、review、相关 docs。
3. 将本轮需求拆成小 phase。每个 phase 必须有：
   - 目标。
   - 范围。
   - 依赖。
   - 验收标准。
   - 风险。
4. 为每个 phase 写 `PLAN.md`：
   - Objective
   - Inputs
   - Files likely touched
   - Tasks
   - Verification commands
   - Security checks
   - Rollback or failure route
5. 更新 `STATE.md` 指向第一个可执行 phase。

## 退出条件

- 每个 PLAN 都能被 `flow-build` 直接执行。
- 每个任务都有验证方式。
- ROADMAP 不包含永久产品路线图，只包含本轮需求 phase。
