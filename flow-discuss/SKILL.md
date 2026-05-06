---
name: flow-discuss
description: 讨论并澄清本次需求。Use when a new feature, change request, bugfix initiative, or iteration needs requirements clarification before technical design. Produces plans/PROJECT.md, plans/REQUIREMENTS.md, and plans/STATE.md. Do not use for API/UI technical design, planning tasks, or coding.
---

# Flow Discuss

把用户想法变成当前迭代的需求文档。这个阶段只澄清“要做什么”和“如何验收”，不设计实现方案。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/risk-rules.md`

## 边界

只做：

- 澄清背景、目标、非目标、用户、业务规则、验收标准。
- 识别需求风险和开放问题。
- 创建或更新 `plans/PROJECT.md`、`plans/REQUIREMENTS.md`、`plans/STATE.md`。

不做：

- 不写 API/UI 技术方案。
- 不拆 phase。
- 不写代码。

## 流程

1. 读取 `AGENTS.md` 和相关 `docs/*`，确认长期项目约束。
2. 如果存在未归档 `plans/STATE.md`，先说明当前状态，避免覆盖旧需求。
3. 先找问题，再给澄清方向；至少列 3 条风险。
4. 向用户提出必要问题。能从代码和文档确认的，不重复问。
5. 产出：
   - `plans/PROJECT.md`：本轮 brief、目标、非目标、相关 docs 链接。
   - `plans/REQUIREMENTS.md`：需求、验收标准、边界、约束、开放问题。
   - `plans/STATE.md`：当前阶段为 `discuss complete` 或 `blocked`。

## 退出条件

- 需求目标和非目标明确。
- 验收标准可验证。
- 开放问题已记录，并标明是否阻塞进入 `flow-design`。

