---
name: flow-design
description: 设计本次需求的数据、API、UI、跨层技术方案、安全和验证方案。Use after flow-discuss has produced SPEC.md and before human confirmation or optional AI review. Produces DATA-DESIGN.md when data changes are needed, plus API-DESIGN.md, UI-DESIGN.md, and a concise TECHNICAL-DESIGN.md inside the active change workspace. Do not use for implementation task planning or coding.
---

# Flow Design

把 `SPEC.md` 转成可评审的技术方案。设计顺序是：先判断是否需要数据/表结构变化；如需要先写 `DATA-DESIGN.md`；再设计方法粒度的 `API-DESIGN.md`；再基于 API 设计 `UI-DESIGN.md`；最后用瘦身版 `TECHNICAL-DESIGN.md` 汇总跨层决策、风险、验证和回退。

## 本阶段上下文

读取当前 active change 的 `SPEC.md`、`STATE.md`、`AGENTS.md`。必须先读取目标项目的长期设计约束：

- `docs/architecture.md`：架构、模块边界、目录职责。
- `docs/conventions.md`：编码规范、命名、错误处理、日志、提交约定。
- `docs/frontend.md`：前端架构、路由、状态、组件、设计系统。
- `docs/backend.md`：API、数据模型、权限、安全、性能约定。

如果当前需求明确涉及某个模块、功能、入口、路由、API、数据链路、状态流或安全边界，必须读取 `docs/flows/README.md`，并按索引读取对应 `docs/flows/*.md`。不要默认全量读取所有流程文档。

如果某个 docs 文件不存在，必须在方案中标注缺失，并从 `AGENTS.md`、源码、配置或 README 中补充证据；不能因为文档缺失就凭空设计。如果存在 `RESEARCH.md`，必须读取。

## 边界

只做：

- 设计技术方案。
- 对方案做风险分析，至少覆盖正确性、安全、性能/维护 3 类风险。
- 按需创建当前 change 的 `DATA-DESIGN.md`。
- 创建当前 change 的 `API-DESIGN.md`、`UI-DESIGN.md`、`TECHNICAL-DESIGN.md`。
- 所有技术方案文档必须使用中文；API 字段、路径、代码符号可保留英文。
- 当需求不涉及到前端代码时，可以在`UI-DESIGN.md`直接说明。

不做：

- 不拆执行任务。
- 不写业务代码。
- 不跳过人工确认直接进入 build。

## 流程

1. 识别当前 active change，并读取其 `SPEC.md`、`STATE.md`、`AGENTS.md`。
2. 读取 `docs/architecture.md`、`docs/conventions.md`、`docs/frontend.md`、`docs/backend.md`；若缺失，记录缺失并从源码/配置/README 补证据。
3. 判断本次需求是否命中已有模块/功能流程；若命中，读取 `docs/flows/README.md` 和相关 `docs/flows/*.md`，并在方案中引用对应流程；若未命中，说明无需读取流程文档的原因。
4. 阅读相关源码，验证方案是否符合现有架构、约定和既有流程。
5. 检查 `STATE.md` 中确认的 workflow profile：
   - `standard` 和 `full` 必须产出正式设计文档。
   - `lite` 若跳过正式设计，必须确认 `STATE.md` 已记录跳过原因；若需求实际命中高风险，停止并回到 `flow-discuss` 重新定级。
6. 如果存在当前 change 的 `RESEARCH.md`，先读取；多文件 phase 模式下如果存在当前 phase 的 `RESEARCH.md`，也要读取，并说明：
   - 采纳了哪些建议。
   - 拒绝了哪些建议及原因。
   - 哪些未知需要在实现或验证中继续确认。
7. 先列问题和风险，再提出设计。
8. 判断是否需要数据变化：
   - 涉及新增/修改表、字段、索引、约束、迁移、数据修复、缓存结构、消息结构或外部数据契约时，必须先写 `DATA-DESIGN.md`。
   - 不涉及数据变化时，不强制创建空文档；在 `TECHNICAL-DESIGN.md` 说明“无数据结构变化”。
9. 设计数据或表结构（如需要）：
   - 表、字段、类型、默认值、约束、索引、唯一性、关系、迁移策略、回滚策略、兼容旧数据、数据安全、性能影响。
10. 设计 API 和服务方法：
   - API 必须从 `SPEC.md` 的用户场景和 `UI-DESIGN.md` 的交互需要反推；前端、本次业务流程或外部调用方用不到的接口不要设计。
   - 禁止为了“以后可能用”“管理端可能需要”“通用能力”新增未确认接口；确有必要时写入未决问题，等待用户确认。
   - endpoint、method、request/response、错误码、权限、兼容性、幂等性。
   - 必须细化到服务方法/模块方法粒度：每个接口都要写执行逻辑、用到的类/模块/方法；每个方法写清目的、输入、输出、前置校验、执行步骤、数据读写、错误处理、事务/并发、日志和监控。
11. 基于 API 设计 UI：
   - 页面结构、组件、状态、加载/空/错态、响应式、可访问性。
   - UI 状态必须能映射到 API request/response、错误码和边界状态。
12. 写瘦身版 `TECHNICAL-DESIGN.md`：
   - 只汇总跨层决策、模块边界、关键数据/API/UI 串联关系、安全、性能、验证和回退。
   - 不重复 `DATA-DESIGN.md`、`API-DESIGN.md`、`UI-DESIGN.md` 的明细。
13. 写验证策略：
   - 测试、构建、接口验证、浏览器验证、安全用例。
14. 更新当前 change 的 `STATE.md`。

## DATA-DESIGN.md 规则

只有需求涉及数据结构变化时才创建 `DATA-DESIGN.md`。它必须覆盖：

- 数据变化原因：为什么需要新增或修改数据结构。
- 表/集合/缓存/消息结构：名称、用途、生命周期。
- 字段明细：名称、类型、必填、默认值、约束、敏感性。
- 索引与唯一性：查询路径、性能原因、唯一约束。
- 关系与一致性：外键/逻辑关系、事务边界、并发策略。
- 迁移与兼容：历史数据处理、灰度、回滚、旧版本兼容。
- 安全与隐私：敏感字段、脱敏、日志限制、权限边界。
- 验证建议：迁移验证、读写验证、回滚验证。

不涉及数据结构变化时，不创建空文档。

## API-DESIGN.md 规则

`API-DESIGN.md` 必须尽可能明细，至少覆盖接口和服务方法粒度，但不能有多余冗余。只设计当前 `SPEC.md`、已确认用户场景、`UI-DESIGN.md` 交互或外部调用方实际需要的接口。

禁止：

- 前端当前用不到、业务流程没有调用方、外部系统没有明确需求的接口。
- 为未来扩展预留的 CRUD、批量接口、管理接口、导出接口、查询接口。
- 未经确认的“顺手补齐能力”。

如果发现可能需要额外接口，只能写入“未决问题/后续扩展”，不能直接放入 API 设计。

每个 endpoint 建议包含：

- 目的。
- 调用场景。
- 权限与认证。
- Request：字段、类型、必填、约束、示例。
- Response：成功结构、失败结构、错误码。
- 执行逻辑：按步骤说明接口从入口到返回的处理流程。
- 使用的类/模块/方法：列出 controller/handler、service、repository/model、client、validator 等。
- 服务方法：方法名、所属类/模块、目的、输入、输出、核心职责、执行步骤。
- 数据变化：读取/写入哪些表、缓存、消息或外部系统。
- 错误处理：业务错误、权限错误、边界输入、外部依赖失败。
- 幂等与并发：重复提交、并发写、事务或锁策略。
- 日志与监控：记录什么，不允许记录什么敏感信息。
- 兼容性：旧接口、旧字段、客户端版本、降级行为。

服务方法粒度要说明“每个方法需要做什么事情”和“按什么顺序执行”，但不要写具体代码实现。

## UI-DESIGN.md 规则

`UI-DESIGN.md` 必须基于 `API-DESIGN.md` 设计页面和交互：

- 页面/组件结构。
- 用户操作路径。
- API 调用时机。
- request 组装规则。
- response 展示规则。
- 加载、空、错、禁用、成功、局部失败状态。
- 表单校验、权限态、可访问性、响应式。
- 不涉及前端时，明确说明原因，不创建伪 UI 方案。

## TECHNICAL-DESIGN.md 规则

`TECHNICAL-DESIGN.md` 保留，但只做跨层总览，不承载细节：

- 方案概览。
- 模块边界。
- 数据/API/UI 串联关系。
- 关键决策和取舍。
- 安全、性能、兼容、回退。
- 验证策略摘要。
- 未决问题和人工确认点。

如果发现 `TECHNICAL-DESIGN.md` 在重复 DATA/API/UI 明细，应删减为引用和摘要。

## 安全与风险要求

- 涉及认证、授权、用户输入、文件、网络、第三方服务、敏感数据、日志或依赖时，必须写安全设计。
- 方案不得突破 `SPEC.md` 的 Non-Goals 和技术约束。
- 方案不得绕过已记录的 `docs/flows/*` 既有流程；如果需要改变流程，必须明确写出影响和需要更新的流程文档。
- 明显高风险方案必须明确反对，并给出替代方案。

## 退出条件

- 技术方案能覆盖全部验收标准。
- 技术方案没有修改 `SPEC.md` 的目标、范围、Non-Goals 或成功标准；若需要修改，必须回到 `flow-discuss`。
- 如果需要数据变化，`DATA-DESIGN.md` 清晰；如果不需要，`TECHNICAL-DESIGN.md` 已说明无数据结构变化。
- API 没有冗余接口；每个接口都有明确调用方、执行逻辑、使用的类/模块/方法和方法级执行步骤。
- UI 设计已基于 API 契约展开。
- 安全、性能、验证方案有明确检查点。
- 未决问题标明是否阻塞人工确认或后续 plan。
