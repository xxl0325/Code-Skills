---
name: flow-plan
description: 将已确认的技术方案拆成可执行任务计划。Use after flow-design has produced design documents and the user or team has confirmed the solution. Produces PLAN.md by default, or ROADMAP.md plus phases/*/PLAN.md only when the user requests multi-phase files or the requirement is large. Do not use for coding.
---

# Flow Plan

把已确认的技术方案拆成可执行计划。默认只生成当前 change 的 `PLAN.md`，在一个文件里包含 phase 和少量 task 明细。只有用户明确要求多文件计划，或需求明显很大、需要多阶段独立交付/多 agent 并行时，才生成 `ROADMAP.md + phases/*/PLAN.md`。

`flow-plan` 要控制 token 成本和验证成本：设计文档可以细到方法粒度，但 plan 默认按 API / 后端可自动验证入口拆 task，不按每个方法拆 task。UI 作为 API task 的消费契约和人工验收项；只有纯前端需求才单独生成 UI task。每个 task 提炼一个 task-local contract，让 `flow-build` 默认只读当前 task 即可执行，只有触发回读条件时才回读 DATA/API/UI design 原文。

## 本阶段上下文

读取当前 change 的 `SPEC.md`、`STATE.md`、`API-DESIGN.md`、`UI-DESIGN.md`、`TECHNICAL-DESIGN.md`；如果存在 `DATA-DESIGN.md`，必须读取。如果存在 `TECHNICAL-REVIEW.md`，必须读取并处理其中阻塞项。需要列出供 `flow-verify` 使用的检查命令时优先读取 `AGENTS.md` 或 `docs/verification.md`；模块边界、编码约定或既有流程不清时，再读取对应 docs。只有当前计划任务涉及某个已记录模块/功能流程时，才读取 `docs/flows/README.md` 和相关 `docs/flows/*.md`。

## 边界

只做：

- 默认创建当前 change 的 `PLAN.md`。
- 必要时创建当前 change 的 `ROADMAP.md` 和 `phases/*/PLAN.md`。
- 更新当前 change 的 `STATE.md`。
- 使用中文撰写执行计划、任务明细、Verify 关注点、风险和回退说明。

不做：

- 不写代码。
- 不重新发明技术方案。
- 不忽略人工 review 结论或 `TECHNICAL-REVIEW.md` 的 required changes。

## 流程

1. 读取当前 change 的 `STATE.md`，确认本次 workflow profile。
2. 确认技术方案已经由用户或团队人工确认；若没有确认，先停止并要求用户确认是否进入计划。
3. 如果存在 `TECHNICAL-REVIEW.md`，检查 verdict 和 required changes；存在 BLOCKED 或未处理的 required changes 时，不能进入 plan。
4. 读取 `SPEC.md`、DATA/API/UI/TECHNICAL design 文档、人工 review 结论或 AI review；需要列出检查命令或核对模块边界时再读取对应 docs。
5. 判断任务是否涉及已有模块/功能流程；若涉及，读取 `docs/flows/README.md` 和相关 `docs/flows/*.md`，并在任务输入或 Verify 关注中引用；若不涉及，不读取全量流程文档。
6. 选择计划模式：
   - 默认：单文件模式，生成 `plans/changes/<change-name>/PLAN.md`。
   - 多文件模式：仅当用户明确要求，或需求很大、多个 user story 可独立交付、需要多 agent 并行时，生成 `ROADMAP.md + phases/*/PLAN.md`。
   - 选择多文件模式时必须在 `STATE.md` 记录原因。
7. 将本轮需求拆成少量 phase。小需求默认 1 个 phase；只有存在明确交付边界、依赖顺序、阶段验证或并行协作价值时，才拆多个 phase。每个 phase 必须有：
   - 目标。
   - 范围。
   - 依赖。
   - 预期产物。
   - Verify 关注点。
   - 风险。
8. 为每个 phase 写少量 API-first task。任务必须使用工程化块格式：
   - `- [ ] T001 [P?] [area] [SPEC:<引用>] [DESIGN:<引用>] <一句话任务名>`
   - `[P]` 表示可并行，只有不同文件且无依赖时才能标记。
   - `[area]` 优先使用 `api-path`、`backend-path`、`job-path`、`webhook-path`、`cli-path`、`ui-manual`、`docs`、`config`、`infra`。
   - 默认按可自动验证入口拆，例如 API endpoint、service entry、job/event handler、webhook/callback、CLI command。
   - API / 后端入口是主线；UI 不单独拆 task，除非需求是纯前端或 UI 改动无法挂到任何 API/后端入口。
   - 不要默认按方法拆 task；只有方法跨模块、风险高、可独立验证、适合并行，才拆成独立 task。
   - 每个 task 必须写：目的、自动验证入口、自动验证方式、UI 消费契约、人工验收、设计来源、必须覆盖、最小实现链路、最小契约、涉及文件、前置依赖、禁止事项、回读条件、预期产物、Verify 关注。
   - 尽量写具体文件路径；无法确定时写 `待发现：<原因>`。
   - 测试任务可优先安排，但 `PLAN.md` 只列任务和 Verify 关注，不判断测试是否通过。
9. 单文件 `PLAN.md` 必须包含：
   - 输入文档
   - 执行顺序
   - Phase 列表
   - Task 明细
   - 并行任务说明
   - 供 Verify 使用的检查命令
   - 安全检查
   - 风险与回退
10. 多文件模式下，`ROADMAP.md` 只写 phase 顺序、依赖和预期产物摘要；详细任务写到各 `phases/*/PLAN.md`。
11. 更新当前 change 的 `STATE.md`，记录计划模式和下一个可执行 task 或 phase。

## Task 数量约束

控制 task 数量比方法级穷举更重要。默认规则：

- 小需求：1 个 phase，2-5 个 task。
- 中等需求：1-2 个 phase，4-8 个 task。
- 大需求：可以多 phase，但单个 phase 尽量不超过 6 个 task。
- 单个 task 覆盖的 API/后端入口过多、涉及文件过多、风险过高或无法独立验证时，再拆小。
- 不要为了形式完整把每个函数、每个字段、每个 UI 状态都拆成独立 task。
- 不要为了 UI 状态单独制造 task；UI 状态优先写到相关 API task 的“UI 消费契约”和“人工验收”。

## API-first task 规则

task 的主线是自动验证能力，而不是 UI 操作。优先级：

1. API endpoint 或后端 service entry。
2. job/event handler、webhook/callback、CLI command、定时任务。
3. 数据迁移验证入口。
4. 纯 UI 需求才使用 `ui-manual` task。

每个 task 必须能说明：

- 自动验证入口：例如 `POST /api/orders`、`OrderJob.handle`、`paymentCallback`。
- 自动验证方式：API/integration/unit/job test，或可执行脚本/curl。
- UI 消费契约：如果涉及前端，写页面如何调用、成功态、错误态、人工验收项。
- 人工验收：UI 只能作为人工调试或 demo 项，不要写成已自动验证。

如果一个 UI 改动没有对应 API/后端入口，才单独生成 `ui-manual` task，并明确自动验证缺口和人工验收方式。

## Task-local contract 规则

`PLAN.md` 的 task 要从 `DATA-DESIGN.md`、`API-DESIGN.md`、`UI-DESIGN.md` 中提炼执行所需的最小契约，减少 `flow-build` 反复读取大设计文档。

压缩时不能丢失设计里的关键实现链路。task 标题可以短，但 task 正文必须保留足够执行的信息。禁止把 `API-DESIGN.md` 中的“类/方法/调用顺序”压缩成模糊动词。

例子：

- 不合格：`生成 Ragas 种子样本`
- 合格：`DatasetBuildRunner：将输入样本转成 Ragas documents -> 调用 TestsetGenerator -> 持久化/返回生成结果`

每个 task 必须包含：

- 设计来源：引用设计文档章节，但不复制长篇设计。
- 自动验证入口：API/后端/job/webhook/CLI 等可运行入口；纯 UI 任务写页面路径和用户动作。
- 自动验证方式：优先测试，其次可执行脚本/curl；没有自动验证时必须说明原因。
- UI 消费契约：页面调用、状态展示、错误码映射和人工验收项；不涉及 UI 时写“无”。
- 必须覆盖：已确认需要实现的方法、endpoint、页面状态、数据变更或错误分支清单；不要加入设计中未确认的冗余接口。
- 最小实现链路：从设计文档提炼类/模块/方法和调用顺序，保留关键转换、调用、持久化、返回步骤。
- 最小契约：执行该 task 必须满足的压缩行为约束。
- 涉及文件：尽量列具体路径；不确定时写待发现和原因。
- 禁止事项：不能新增的依赖、不能改变的契约、不能扩大的范围。
- 回读条件：只有字段、错误码、事务边界、UI 状态、数据结构不明确或与源码冲突时，才回读 DATA/API/UI design 原文。
- Verify 关注：留给 `flow-verify` 的检查重点，不写验收结论。

`PLAN.md` 可以压缩关键约束，但不能重新定义设计事实，也不能丢失关键实现链路。如果 task 看起来无法直接指导 `flow-build` 实现，说明压缩过度，必须补充“最小实现链路”。如果压缩契约和设计文档冲突，以设计文档为准，并应回到 `flow-plan` 或 `flow-design` 修正。

## PLAN.md 模板

```markdown
# PLAN: <需求名称>

## 1. 输入

- SPEC:
- DATA-DESIGN: 无 / `DATA-DESIGN.md`
- API-DESIGN:
- UI-DESIGN:
- TECHNICAL-DESIGN:
- 相关流程文档：无 / `docs/flows/<name>.md`
- 人工确认记录:

## 2. 执行顺序

### Phase 1: <名称>

目标：
依赖：
范围：
预期产物：
Verify 关注：

- [ ] T001 [api-path] [SPEC:目标行为-1] [DESIGN:API-DESIGN] 订单创建成功路径
  - 目的：实现本需求需要的数据结构变化
  - 自动验证入口：`POST /api/orders`
  - 自动验证方式：API/integration test；必要时补充 curl 示例
  - UI 消费契约：确认订单页调用该接口；成功后展示订单摘要或跳转结果页
  - 人工验收：页面提交有效订单，确认成功态和展示内容
  - 设计来源：`API-DESIGN.md#POST-/api/orders`，`DATA-DESIGN.md#...`，`UI-DESIGN.md#...`
  - 必须覆盖：订单创建服务方法、请求校验、订单写入、订单明细写入、成功响应、前端成功态
  - 最小实现链路：`OrderController.create` -> `OrderService.createOrder` -> `validateOrderItems` -> `persistOrder` -> 返回订单摘要
  - 最小契约：有效订单提交后返回订单摘要；数据库存在订单和明细；日志不记录敏感信息
  - 涉及文件：`path/to/service`，`path/to/route`，`path/to/test`，`path/to/component`
  - 前置依赖：无
  - 禁止事项：不新增 API-DESIGN 未确认的接口、字段或响应结构
  - 回读条件：字段、错误码、事务/并发边界、幂等策略、UI 状态映射不明确或与源码冲突
  - 预期产物：接口、服务、测试和必要 UI 接入
  - Verify 关注：API 成功路径、数据写入、权限、响应结构、UI 人工验收

- [ ] T002 [api-path] [SPEC:失败路径-1] [DESIGN:API-DESIGN] 订单创建库存不足路径
  - 目的：实现并验证库存不足失败路径
  - 自动验证入口：`POST /api/orders`
  - 自动验证方式：API/integration test
  - UI 消费契约：确认订单页展示库存不足提示，不进入成功态
  - 人工验收：页面提交库存不足商品，确认错误态
  - 设计来源：`API-DESIGN.md#POST-/api/orders`
  - 必须覆盖：库存校验、错误码、无订单写入、前端错误态
  - 最小实现链路：`OrderService.createOrder` -> `validateInventory` -> 返回库存不足错误 -> 前端映射错误态
  - 最小契约：库存不足时返回明确错误；不创建订单；页面能展示错误
  - 涉及文件：`path/to/service`，`path/to/route`，`path/to/test`，`path/to/component`
  - 前置依赖：T001
  - 禁止事项：不新增未确认错误码或 UI 文案规则
  - 回读条件：错误码、库存并发策略、UI 错误映射不明确或与源码冲突
  - 预期产物：失败路径逻辑、测试和必要 UI 错误态
  - Verify 关注：API 错误码、数据库无脏写、UI 人工验收

- [ ] T003 [ui-manual] [SPEC:用户场景-2] [DESIGN:UI-DESIGN] 纯前端展示路径
  - 目的：实现不涉及 API 的前端展示变化
  - 自动验证入口：无；纯 UI 需要人工验收
  - 自动验证方式：可运行组件测试则写测试；否则说明无自动验证
  - UI 消费契约：页面路径、用户动作、展示状态
  - 人工验收：打开页面并按 UI-DESIGN 检查展示、响应式和可访问性
  - 设计来源：`UI-DESIGN.md#...`
  - 必须覆盖：页面展示、loading/empty/error 状态、响应式
  - 最小实现链路：渲染目标组件 -> 读取现有状态/props -> 展示 UI-DESIGN 定义的视觉和状态变化
  - 最小契约：展示符合 UI-DESIGN，不改变 API 或数据契约
  - 涉及文件：`path/to/component`
  - 前置依赖：无
  - 禁止事项：不新增未确认页面、字段或 API 行为
  - 回读条件：状态流、组件边界或人工验收标准不明确
  - 预期产物：页面展示变更
  - Verify 关注：人工验收、响应式、可访问性

## 3. 并行任务

- T003 和 T004 可并行，因为修改不同文件且无依赖。

## 4. 供 Verify 使用的检查命令

- ...

## 5. 安全检查

- ...

## 6. 风险与回退

- 风险：
- 回退：
```

## 退出条件

- `PLAN.md` 或每个 phase `PLAN.md` 都能被 `flow-build` 直接执行。
- task 数量被控制在合理范围，默认按 API / 后端可自动验证入口拆，不按方法机械拆分。
- 每个任务都有 task-local contract、最小实现链路、回读条件、预期产物和 Verify 关注点，但不写验收结论。
- 涉及 UI 的 task 已写 UI 消费契约和人工验收项；纯 UI task 明确说明自动验证缺口。
- 涉及既有模块/功能流程的任务，已引用对应 `docs/flows/*`；未涉及时没有强制读取流程文档。
- ROADMAP 若存在，不包含永久产品路线图，只包含本轮需求 phase。
