---
name: flow-review
description: 可选地评审技术方案。Use after flow-design has produced API/UI/technical solution documents when the user wants AI-assisted review before human approval or phase planning. Reviews correctness, security, performance, maintainability, and UX risks. Produces TECHNICAL-REVIEW.md inside the active change workspace. Do not use for code review after implementation.
---

# Flow Review

可选地评审技术方案是否值得进入计划阶段。这个阶段是 AI 辅助评审，不替代人工 review；人工确认才是进入 `flow-plan` 的主要门禁。

## 本阶段上下文

读取当前 change 的 `SPEC.md`、`STATE.md`、`API-SPEC.md`、`UI-SPEC.md`、`TECHNICAL-SOLUTION.md` 和关键源码。必须先读取目标项目的长期约束：

- `docs/architecture.md`：架构、模块边界、目录职责。
- `docs/conventions.md`：编码规范、命名、错误处理、日志、提交约定。
- `docs/frontend.md`：前端架构、路由、状态、组件、设计系统。
- `docs/backend.md`：API、数据模型、权限、安全、性能约定。

如果某个 docs 文件不存在，必须在评审中标注缺失，并从 `AGENTS.md`、源码、配置或 README 中补充证据；不能因为文档缺失就默认方案可行。

## 边界

只做：

- 评审 `API-SPEC.md`、`UI-SPEC.md`、`TECHNICAL-SOLUTION.md`。
- 产出当前 change 的 `TECHNICAL-REVIEW.md`。
- 判断 PASS / NEEDS-REVISION / BLOCKED。
- 使用中文撰写所有评审结论、风险、阻塞项和替代方案。

不做：

- 不实现代码。
- 不直接改计划。
- 不用“建议优化”掩盖阻塞问题。

## 流程

1. 读取需求、技术方案、关键源码。
2. 读取 `docs/architecture.md`、`docs/conventions.md`、`docs/frontend.md`、`docs/backend.md`；若缺失，记录缺失并从源码/配置/README 补证据。
3. 检查 `STATE.md` 中确认的 workflow profile：
   - AI review 默认可选，不是必经流程。
   - 用户显式要求 AI review、人工 review 需要辅助材料、或方案风险较高时，执行本 skill。
   - 如果人工已经确认方案，可以不运行本 skill，直接进入 `flow-plan`。
4. 至少给出 3 条风险，优先正确性、安全、性能。
5. 检查方案是否：
   - 覆盖所有验收标准。
   - API 和 UI 契约一致。
   - 权限和数据边界清楚。
   - 验证方式可执行。
   - 不违反现有架构和编码约定。
6. 明显风险必须明确反对，并提出替代方案。
7. 写当前 change 的 `TECHNICAL-REVIEW.md`：
   - Verdict: PASS / NEEDS-REVISION / BLOCKED
   - Blocking issues
   - Non-blocking issues
   - Required changes
   - Accepted risks
8. 如果不是 PASS，路由回 `flow-design`。

## 安全与风险要求

- 至少给出 3 条风险，优先正确性、安全、性能。
- 涉及认证、授权、用户输入、文件、网络、第三方服务、敏感数据、日志或依赖时，必须单独列安全风险。
- 明显风险必须明确反对，并提出替代方案。

## 退出条件

- PASS：表示 AI 辅助评审未发现阻塞问题，但仍需要人工确认后进入 `flow-plan`。
- PASS 前必须确认方案符合 `docs/architecture.md`、`docs/conventions.md`、`docs/frontend.md`、`docs/backend.md` 的约束；缺失文档必须说明替代证据。
- NEEDS-REVISION：需要修改 design 后复审。
- BLOCKED：需求或约束不清，回 `flow-discuss`。
