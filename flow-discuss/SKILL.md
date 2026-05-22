---
name: flow-discuss
description: 深入讨论并澄清本次需求。Use when a new feature, change request, bugfix initiative, or iteration needs requirements clarification before technical design. Explore requirement rationale, purpose, expected outcome, feasibility, open questions, and acceptance criteria through iterative questioning until the requirement is clear enough. Only produces SPEC.md and STATE.md after explicit user confirmation. Do not use for API/UI technical design, planning tasks, or coding.
---

# Flow Discuss

把用户想法澄清到足以生成当前迭代的 `SPEC.md`。这个阶段要先探讨需求是否合理、为什么要做、最终想达到什么效果、还有哪些不清楚的地方；讨论过程中不要修改文档。只有规格足够明确，并且用户明确确认后，才汇总上述所有讨论生成可进入 `flow-design` 的规格说明。

## 本阶段上下文

读取 `.flow/config.yaml` 和 `AGENTS.md`。如果存在未关闭 `plans/changes/*/STATE.md`，读取当前状态，避免覆盖旧需求。只有需求涉及具体模块、验证、安全或技术边界时，才读取对应 `docs/*`。

## 边界

只做：

- 澄清背景、目标、非目标、用户、业务规则、验收标准。
- 探讨需求合理性、真实目的、预期效果、成功标准和替代路径。
- 识别需求风险和开放问题。
- 根据 `.flow/config.yaml` 评估本次需求复杂度，并建议 `lite`、`standard` 或 `full`。
- 持续反问，直到关键需求信息足够明确。
- 在用户明确确认定稿后，创建或更新 `plans/changes/<change-name>/SPEC.md`、`STATE.md`。
- 所有规格说明、状态说明和风险描述必须使用中文。

不做：

- 不写 API/UI 技术方案。
- 不拆 phase。
- 不写代码。
- 用户确认定稿前，不创建、不更新 `SPEC.md`、`STATE.md` 或其他 `plans/changes/*` 文档。

## 流程

1. 读取 `.flow/config.yaml` 和 `AGENTS.md`，确认 workflow 默认策略和长期项目约束；只有需求涉及具体模块、验证、安全或技术边界时，才按触发条件读取对应 docs。
2. 如果存在未关闭 `plans/changes/*/STATE.md`，先说明当前状态，避免覆盖旧需求；多个未关闭 change 必须让用户选择。
3. 先找问题，再给澄清方向；至少列 3 条风险。
4. 对用户需求做需求合理性探讨：
   - 用户为什么要做这个需求？
   - 当前痛点或机会是什么？
   - 最终想达到什么业务/用户/技术效果？
   - 这个需求是否有更简单或更低风险的替代方案？
   - 不做会有什么影响？
5. 执行反问循环。每轮最多问 3-5 个高价值问题，优先询问会影响范围、验收、风险和设计方向的问题。能从代码和文档确认的，不重复问。
6. 评估本次需求 workflow profile：
   - 默认从 `.flow/config.yaml` 的 `default_profile` 开始。
   - 命中任一 `full_when`，不得使用 `lite`。
   - 只有低风险、小范围、可逆、无 API/数据/权限/安全敏感变化时，才建议 `lite`。
   - 涉及多模块、API/UI/后端协作但未命中高风险时，建议 `standard`。
   - 涉及架构、权限、敏感数据、数据迁移、公开 API、支付、不可逆操作或关键性能路径时，建议 `full`。
7. 如果建议 profile 和默认 profile 不同，必须说明原因并等待用户确认；用户指定 `lite` 但命中高风险条件时，必须明确反对并给出替代 profile。
8. 每轮用户回答后，只在对话中临时总结当前理解，并判断是否达到“SPEC 完成度门槛”。未达到时继续反问，不要写文件，不要进入设计。
9. 达到“SPEC 完成度门槛”后，先给出拟定 SPEC 摘要和 profile 建议，请用户明确确认。用户未确认前，不写 `SPEC.md`、`STATE.md`。
10. 只有用户明确表达“确认”“定稿”“生成 SPEC”“可以进入下一步”等同意信号后，才汇总上述所有讨论，产出：
   - `plans/changes/<change-name>/SPEC.md`：本次需求唯一真实来源，只回答“做什么”和“为什么做”，不写“怎么做”。
   - `plans/changes/<change-name>/STATE.md`：当前阶段为 `discuss complete` 或 `blocked`，并记录本次确认的 workflow profile。

## 讨论落盘规则

`flow-discuss` 是先对话、后落盘的阶段。默认行为是持续澄清，不修改任何文档。

- 每一轮讨论只允许在回复中总结当前理解、风险、缺口和下一轮问题。
- 不要为了“记录进度”提前创建或更新 `SPEC.md`、`STATE.md`。
- 如果用户补充、反悔或调整范围，继续在对话中澄清，不要改文件。
- 当需求已经满足 SPEC 完成度门槛时，必须先请求用户确认定稿。
- 用户确认后，必须总结本轮会话中所有相关讨论，而不是只总结最后一条消息。
- 用户确认后一次性生成或更新 `SPEC.md` 和 `STATE.md`。
- 如果用户只说“继续讨论”“再想想”“这个不对”，继续反问，不落盘。

## SPEC.md 规则

`SPEC.md` 是本次需求的唯一真实来源。它回答“做什么”和“为什么做”，不涉及“怎么做”。不要写具体实现步骤、类名、函数名、数据库表设计、组件拆分、算法细节或任务列表。

`SPEC.md` 必须覆盖：

- 为什么做：背景、问题、目标价值。
- 做到什么程度算完：可测试的成功标准，例如 `P95 < 50ms`，不要写“系统应该很快”。
- 谁在什么场景下用：目标用户、使用场景、关键路径。
- 怎么验证：验收方式、测试方式、演示方式或可观察指标。
- 什么不做：Non-Goals，明确告诉 Agent 哪些不要做。
- 技术约束：限制技术选型和边界，防止自作主张引入新组件或扩大架构。

建议模板：

```markdown
# SPEC: <需求名称>

## 1. 为什么做

## 2. 用户与场景

## 3. 目标行为

## 4. 成功标准

## 5. 验证方式

## 6. Non-Goals

## 7. 技术约束

## 8. 风险与开放问题
```

完成度检验标准：用不同技术栈实现这个 Spec，Spec 是否仍然有效？如果必须依赖某个具体实现细节才读得懂，说明写得太细；如果无法判断是否完成，说明写得太粗。

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

## SPEC 完成度门槛

只有满足以下条件，才能将 `STATE.md` 标记为 `discuss complete`：

- 需求目的明确：知道为什么要做。
- 预期效果明确：知道最终希望用户或系统发生什么变化。
- 范围明确：知道做什么和不做什么，Non-Goals 已记录。
- 验收标准明确：可以通过测试、演示、接口、页面、指标或人工验收验证。
- 使用场景明确：知道谁在什么场景下用。
- 技术约束明确：知道哪些技术边界不能突破。
- 抽象层级合适：换一个技术栈实现时，SPEC 仍然有效。
- 关键风险明确：至少记录正确性、安全、性能/维护中的 3 类风险。
- 未决问题已分类：阻塞项必须解决；非阻塞项必须记录为后续关注。

如果门槛未满足，继续在对话中反问，不写 `STATE.md`。只有用户确认定稿但仍存在阻塞问题时，才允许将 `STATE.md` 标记为 `blocked` 或 `discussing`，并列出下一轮需要用户回答的问题。

## Workflow Profile 记录

`STATE.md` 必须记录：

```markdown
## Workflow Profile

- Default profile:
- Recommended profile:
- Confirmed profile:
- Reason:
- Matched high-risk rules:
- Skipped stages:
```

`Skipped stages` 只能记录按确认 profile 可跳过的阶段。安全审查不能被跳过。

## 退出条件

- 需求目的、合理性、目标和非目标明确。
- 最终想达到的效果明确。
- 验收标准可验证。
- 用户已明确确认定稿并允许生成文档。
- `SPEC.md` 不包含实现计划或技术方案细节。
- 开放问题已记录，并标明是否阻塞进入 `flow-design`。
- 本次需求采用的 workflow profile 已记录在 `STATE.md`。
- 若仍存在阻塞问题，不能进入 `flow-design`。
