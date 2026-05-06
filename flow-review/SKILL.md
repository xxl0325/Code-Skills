---
name: flow-review
description: 评审技术方案。Use after flow-design has produced API/UI/technical solution documents and before phase planning. Reviews correctness, security, performance, maintainability, and UX risks. Produces plans/TECHNICAL-REVIEW.md. Do not use for code review after implementation.
---

# Flow Review

评审技术方案是否值得进入计划阶段。这个阶段必须先找问题，再给结论。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/risk-rules.md`
- `../flow-shared/references/security-review.md`

## 边界

只做：

- 评审 `API-SPEC.md`、`UI-SPEC.md`、`TECHNICAL-SOLUTION.md`。
- 产出 `plans/TECHNICAL-REVIEW.md`。
- 判断 PASS / NEEDS-REVISION / BLOCKED。

不做：

- 不实现代码。
- 不直接改计划。
- 不用“建议优化”掩盖阻塞问题。

## 流程

1. 读取需求、技术方案、相关 docs 和关键源码。
2. 至少给出 3 条风险，优先正确性、安全、性能。
3. 检查方案是否：
   - 覆盖所有验收标准。
   - API 和 UI 契约一致。
   - 权限和数据边界清楚。
   - 验证方式可执行。
   - 不违反现有架构和编码约定。
4. 明显风险必须明确反对，并提出替代方案。
5. 写 `plans/TECHNICAL-REVIEW.md`：
   - Verdict: PASS / NEEDS-REVISION / BLOCKED
   - Blocking issues
   - Non-blocking issues
   - Required changes
   - Accepted risks
6. 如果不是 PASS，路由回 `flow-design`。

## 退出条件

- PASS：可以进入 `flow-plan`。
- NEEDS-REVISION：需要修改 design 后复审。
- BLOCKED：需求或约束不清，回 `flow-discuss`。

