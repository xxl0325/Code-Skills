---
name: flow-plan
description: 将已确认的技术方案拆成可执行任务计划。Use after flow-design has produced technical solution documents and the user or team has confirmed the solution. Produces PLAN.md by default, or ROADMAP.md plus phases/*/PLAN.md only when the user requests multi-phase files or the requirement is large. Do not use for coding.
---

# Flow Plan

把已确认的技术方案拆成可执行计划。默认只生成当前 change 的 `PLAN.md`，在一个文件里包含 phase 和 task 明细。只有用户明确要求多文件计划，或需求明显很大、需要多阶段独立交付/多 agent 并行时，才生成 `ROADMAP.md + phases/*/PLAN.md`。

## 本阶段上下文

读取当前 change 的 `SPEC.md`、`STATE.md`、`API-SPEC.md`、`UI-SPEC.md`、`TECHNICAL-SOLUTION.md`。如果存在 `TECHNICAL-REVIEW.md`，必须读取并处理其中阻塞项。需要列出供 `flow-verify` 使用的检查命令时优先读取 `AGENTS.md` 或 `docs/verification.md`；模块边界或编码约定不清时，再读取对应 docs。

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
4. 读取 `SPEC.md`、API/UI/technical solution、人工 review 结论或 AI review；需要列出检查命令或核对模块边界时再读取对应 docs。
5. 选择计划模式：
   - 默认：单文件模式，生成 `plans/changes/<change-name>/PLAN.md`。
   - 多文件模式：仅当用户明确要求，或需求很大、多个 user story 可独立交付、需要多 agent 并行时，生成 `ROADMAP.md + phases/*/PLAN.md`。
   - 选择多文件模式时必须在 `STATE.md` 记录原因。
6. 将本轮需求拆成小 phase。每个 phase 必须有：
   - 目标。
   - 范围。
   - 依赖。
   - 预期产物。
   - Verify 关注点。
   - 风险。
7. 为每个 phase 写明细任务。任务必须使用工程化块格式：
   - `- [ ] T001 [P?] [area] [SPEC:<引用>] [DESIGN:<引用>] <一句话任务名>`
   - `[P]` 表示可并行，只有不同文件且无依赖时才能标记。
   - `[area]` 使用 `frontend`、`backend`、`test`、`docs`、`config`、`infra` 等。
   - 每个 task 必须写：目的、输入、涉及文件、前置依赖、执行要点、预期产物、Verify 关注。
   - 尽量写具体文件路径；无法确定时写 `待发现：<原因>`。
   - 测试任务可优先安排，但 `PLAN.md` 只列任务和 Verify 关注，不判断测试是否通过。
8. 单文件 `PLAN.md` 必须包含：
   - 输入文档
   - 执行顺序
   - Phase 列表
   - Task 明细
   - 并行任务说明
   - 供 Verify 使用的检查命令
   - 安全检查
   - 风险与回退
9. 多文件模式下，`ROADMAP.md` 只写 phase 顺序、依赖和预期产物摘要；详细任务写到各 `phases/*/PLAN.md`。
10. 更新当前 change 的 `STATE.md`，记录计划模式和下一个可执行 task 或 phase。

## PLAN.md 模板

```markdown
# PLAN: <需求名称>

## 1. 输入

- SPEC:
- API-SPEC:
- UI-SPEC:
- TECHNICAL-SOLUTION:
- 人工确认记录:

## 2. 执行顺序

### Phase 1: <名称>

目标：
依赖：
范围：
预期产物：
Verify 关注：

- [ ] T001 [test] [SPEC:成功标准-1] [DESIGN:验证策略]
  - 目的：覆盖核心成功标准的回归测试
  - 输入：`SPEC.md#成功标准`，`TECHNICAL-SOLUTION.md#验证策略`
  - 涉及文件：`path/to/test`
  - 前置依赖：无
  - 执行要点：复用现有测试工具，不新增测试框架
  - 预期产物：新增测试用例
  - Verify 关注：测试是否覆盖成功标准、失败路径和边界条件

- [ ] T002 [backend] [SPEC:目标行为-1] [DESIGN:后端设计]
  - 目的：实现目标行为所需的后端入口
  - 输入：`API-SPEC.md#...`，`TECHNICAL-SOLUTION.md#...`
  - 涉及文件：`path/to/file`
  - 前置依赖：T001
  - 执行要点：遵守现有错误处理和日志约定，不新增未确认依赖
  - 预期产物：接口/服务逻辑变更
  - Verify 关注：权限、错误码、边界输入、回归风险

- [ ] T003 [P] [frontend] [SPEC:用户场景-1] [DESIGN:UI-SPEC]
  - 目的：接入用户场景中的前端交互
  - 输入：`UI-SPEC.md#...`
  - 涉及文件：`path/to/component`
  - 前置依赖：T002
  - 执行要点：复用现有组件和状态管理约定
  - 预期产物：页面交互变更
  - Verify 关注：加载/空/错态、可访问性、响应式

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
- 每个任务都有预期产物和 Verify 关注点，但不写验收结论。
- ROADMAP 若存在，不包含永久产品路线图，只包含本轮需求 phase。
