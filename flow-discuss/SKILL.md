---
name: flow-discuss
description: 深入讨论并澄清本次需求。Use when a new feature, change request, bugfix initiative, or iteration needs requirements clarification before technical design. Explore requirement rationale, purpose, expected outcome, feasibility, open questions, and acceptance criteria through iterative questioning until the requirement is clear enough. Produces plans/PROJECT.md, plans/REQUIREMENTS.md, and plans/STATE.md. Do not use for API/UI technical design, planning tasks, or coding.
---

# Flow Discuss

把用户想法变成当前迭代的需求文档。这个阶段要先探讨需求是否合理、为什么要做、最终想达到什么效果、还有哪些不清楚的地方；只有需求足够明确后，才产出可进入 `flow-design` 的需求文档。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/risk-rules.md`

## 边界

只做：

- 澄清背景、目标、非目标、用户、业务规则、验收标准。
- 探讨需求合理性、真实目的、预期效果、成功标准和替代路径。
- 识别需求风险和开放问题。
- 持续反问，直到关键需求信息足够明确。
- 创建或更新 `plans/PROJECT.md`、`plans/REQUIREMENTS.md`、`plans/STATE.md`。
- 所有需求文档、状态说明和风险描述必须使用中文。

不做：

- 不写 API/UI 技术方案。
- 不拆 phase。
- 不写代码。

## 流程

1. 读取 `AGENTS.md` 和相关 `docs/*`，确认长期项目约束。
2. 如果存在未归档 `plans/STATE.md`，先说明当前状态，避免覆盖旧需求。
3. 先找问题，再给澄清方向；至少列 3 条风险。
4. 对用户需求做需求合理性探讨：
   - 用户为什么要做这个需求？
   - 当前痛点或机会是什么？
   - 最终想达到什么业务/用户/技术效果？
   - 这个需求是否有更简单或更低风险的替代方案？
   - 不做会有什么影响？
5. 执行反问循环。每轮最多问 3-5 个高价值问题，优先询问会影响范围、验收、风险和设计方向的问题。能从代码和文档确认的，不重复问。
6. 每轮用户回答后，更新需求理解，并判断是否达到“需求明确度门槛”。未达到时继续反问，不要进入设计。
7. 需求明确后，产出：
   - `plans/PROJECT.md`：本轮 brief、目标、非目标、相关 docs 链接。
   - `plans/REQUIREMENTS.md`：需求、验收标准、边界、约束、开放问题。
   - `plans/STATE.md`：当前阶段为 `discuss complete` 或 `blocked`。

## 反问循环

如果以下任一项不清楚，必须继续反问：

- 目标用户或使用场景不清楚。
- 真实目的不清楚，只描述了一个想做的功能。
- 最终想达到的效果不可衡量。
- 验收标准不可验证。
- 范围和非目标不清楚。
- 关键业务规则、边界条件、异常场景不清楚。
- 正确性、安全、性能、维护性风险无法判断。
- 需求与现有项目约定或产品方向可能冲突。

反问时要先说明“为什么这个问题会影响需求定义”，避免机械列问题。

## 需求明确度门槛

只有满足以下条件，才能将 `STATE.md` 标记为 `discuss complete`：

- 需求目的明确：知道为什么要做。
- 预期效果明确：知道最终希望用户或系统发生什么变化。
- 范围明确：知道做什么和不做什么。
- 验收标准明确：可以通过测试、演示、接口、页面或人工验收验证。
- 关键风险明确：至少记录正确性、安全、性能/维护中的 3 类风险。
- 未决问题已分类：阻塞项必须解决；非阻塞项必须记录为后续关注。

如果门槛未满足，`STATE.md` 必须标记为 `blocked` 或 `discussing`，并列出下一轮需要用户回答的问题。

## 退出条件

- 需求目的、合理性、目标和非目标明确。
- 最终想达到的效果明确。
- 验收标准可验证。
- 开放问题已记录，并标明是否阻塞进入 `flow-design`。
- 若仍存在阻塞问题，不能进入 `flow-design`。
