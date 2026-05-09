---
name: flow-build
description: 按当前 change 的 PLAN.md 或当前 phase 的 PLAN.md 实现代码。Use after flow-plan has created an executable plan and the user wants implementation. Makes scoped code changes, runs checks, records deviations in EXECUTION.md. Do not use for requirements or technical design.
---

# Flow Build

严格按当前 change 的 `PLAN.md` 或当前 phase 的 `PLAN.md` 实现。执行中发现计划不成立，要记录偏差并按严重程度回退。

## 本阶段上下文

读取当前 active change 的 `STATE.md`。默认读取 `plans/changes/<change-name>/PLAN.md`；如果使用多文件模式，则读取当前 `phases/<phase>/PLAN.md`。再读取 PLAN 指向的源码、测试、配置。只有 PLAN 或代码约定不清、验证命令缺失、安全边界不清时，才读取 `AGENTS.md` 或对应 `docs/*`。

## 边界

只做：

- 修改业务代码、测试、必要文档。
- 按 `PLAN.md` 中的 task 编号逐项执行。
- 运行 PLAN 中供 Verify 使用的检查命令或就近检查。
- 记录 `EXECUTION.md`。单文件模式写到 change 根目录；多文件模式写到当前 phase 目录。
- 使用中文撰写 `EXECUTION.md`、task 执行记录、偏差记录、检查记录和剩余风险。

不做：

- 不扩大需求范围。
- 不在 build 阶段给出 PASS / FAIL 验收结论。
- 不覆盖用户未授权改动。
- 不在重大方案偏差下继续硬做。
- 不擅自实现 PLAN 中没有出现的大模块或新能力。

## 流程

1. 识别当前 active change，读取其 `STATE.md`，并按计划模式读取 change 根目录 `PLAN.md` 或当前 phase `PLAN.md`。
2. 检查工作区状态，识别已有用户改动。
3. 找到第一个未完成 task，按 `T001`、`T002` 等编号顺序执行；用户指定 task 时，只执行指定范围。
4. 执行每个 task 前，确认：
   - 前置依赖已完成或用户允许跳过。
   - 涉及文件范围清楚。
   - 执行要点和技术约束清楚。
   - Verify 关注点已理解，但不在 build 阶段下验收结论。
5. 只修改 task 声明的文件范围。必须修改未列出的文件时，先记录 deviation；若新增大模块、改变 API/UI/数据模型或扩大 SPEC 范围，停止并路由回 `flow-plan` / `flow-design` / `flow-discuss`。
6. 每完成一个 task，运行就近检查或 PLAN 中相关检查命令；无法运行时说明原因。
7. 更新 `EXECUTION.md` 的 task progress、files changed、checks run、deviation 和 notes。
8. 运行 PLAN 中适用于当前 task 组的检查命令。
9. 更新当前 change 的 `STATE.md`。

## EXECUTION.md 模板

```markdown
# EXECUTION: <需求名称>

## Task Progress

| Task | Status | Files Changed | Checks Run | Deviation | Notes |
|---|---|---|---|---|---|
| T001 | done | `path/to/file` | `pnpm test ...` | no | ... |

## Deviations

### D001

- Task:
- Planned:
- Actual:
- Reason:
- Risk:
- Route: continue | replan | redesign | respec

## Checks Run

- ...

## Remaining Risks

- ...
```

## 路由规则

- PLAN 漏项、task 不可执行、文件范围明显错误：回 `flow-plan`。
- 技术方案不成立、API/UI/数据模型需要改变：回 `flow-design`，之后重新人工确认。
- SPEC 目标、范围、Non-Goals 或成功标准不清：回 `flow-discuss`。
- 实现细节问题且不扩大范围：可继续当前 task，并在 `EXECUTION.md` 记录 deviation。

## 退出条件

- 当前指定 task / task group / phase 的实现完成。
- `EXECUTION.md` 已记录 task progress、变更文件、检查命令、偏差和剩余风险。
- 就近检查已运行，或明确说明无法运行。
- 未在 build 阶段宣布 PASS / FAIL；最终结论留给 `flow-verify`。
