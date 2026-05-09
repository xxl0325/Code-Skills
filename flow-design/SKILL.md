---
name: flow-design
description: 设计本次需求的 API、UI、后端、数据流、安全和验证方案。Use after flow-discuss has produced SPEC.md and before human confirmation or optional AI review. Produces API-SPEC.md, UI-SPEC.md, and TECHNICAL-SOLUTION.md inside the active change workspace. Do not use for implementation task planning or coding.
---

# Flow Design

把 `SPEC.md` 转成可评审的技术方案，覆盖 API、UI、后端设计、数据流、安全和验证思路。

## 本阶段上下文

读取当前 active change 的 `SPEC.md`、`STATE.md`、`AGENTS.md`。必须先读取目标项目的长期设计约束：

- `docs/architecture.md`：架构、模块边界、目录职责。
- `docs/conventions.md`：编码规范、命名、错误处理、日志、提交约定。
- `docs/frontend.md`：前端架构、路由、状态、组件、设计系统。
- `docs/backend.md`：API、数据模型、权限、安全、性能约定。

如果某个 docs 文件不存在，必须在方案中标注缺失，并从 `AGENTS.md`、源码、配置或 README 中补充证据；不能因为文档缺失就凭空设计。如果存在 `RESEARCH.md`，必须读取。

## 边界

只做：

- 设计技术方案。
- 对方案做风险分析，至少覆盖正确性、安全、性能/维护 3 类风险。
- 创建当前 change 的 `API-SPEC.md`、`UI-SPEC.md`、`TECHNICAL-SOLUTION.md`。
- 所有技术方案文档必须使用中文；API 字段、路径、代码符号可保留英文。
- 当需求不涉及到前端代码时，可以在`UI-SPEC.md`直接说明。

不做：

- 不拆执行任务。
- 不写业务代码。
- 不跳过人工确认直接进入 build。

## 流程

1. 识别当前 active change，并读取其 `SPEC.md`、`STATE.md`、`AGENTS.md`。
2. 读取 `docs/architecture.md`、`docs/conventions.md`、`docs/frontend.md`、`docs/backend.md`；若缺失，记录缺失并从源码/配置/README 补证据。
3. 阅读相关源码，验证方案是否符合现有架构和约定。
4. 检查 `STATE.md` 中确认的 workflow profile：
   - `standard` 和 `full` 必须产出正式设计文档。
   - `lite` 若跳过正式设计，必须确认 `STATE.md` 已记录跳过原因；若需求实际命中高风险，停止并回到 `flow-discuss` 重新定级。
5. 如果存在当前 change 的 `RESEARCH.md`，先读取；多文件 phase 模式下如果存在当前 phase 的 `RESEARCH.md`，也要读取，并说明：
   - 采纳了哪些建议。
   - 拒绝了哪些建议及原因。
   - 哪些未知需要在实现或验证中继续确认。
6. 先列问题和风险，再提出设计。
7. 设计 API：
   - endpoint、method、request/response、错误码、权限、兼容性、幂等性。
8. 设计 UI：
   - 页面结构、组件、状态、加载/空/错态、响应式、可访问性。
9. 设计后端：
   - 模块边界、数据模型、事务、一致性、性能、安全。
10. 写验证策略：
   - 测试、构建、接口验证、浏览器验证、安全用例。
11. 更新当前 change 的 `STATE.md`。

## 安全与风险要求

- 涉及认证、授权、用户输入、文件、网络、第三方服务、敏感数据、日志或依赖时，必须写安全设计。
- 方案不得突破 `SPEC.md` 的 Non-Goals 和技术约束。
- 明显高风险方案必须明确反对，并给出替代方案。

## 退出条件

- 技术方案能覆盖全部验收标准。
- 技术方案没有修改 `SPEC.md` 的目标、范围、Non-Goals 或成功标准；若需要修改，必须回到 `flow-discuss`。
- API 和 UI 契约清晰。
- 安全、性能、验证方案有明确检查点。
- 未决问题标明是否阻塞人工确认或后续 plan。
