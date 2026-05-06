---
name: flow-build
description: 按当前 phase 的 PLAN.md 实现代码。Use after flow-plan has created executable plans and the user wants implementation. Makes scoped code changes, runs checks, records deviations in EXECUTION.md. Do not use for requirements or technical design.
---

# Flow Build

严格按 `PLAN.md` 实现当前 phase。执行中发现计划不成立，要记录偏差并按严重程度回退。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/verification-rules.md`

## 边界

只做：

- 修改业务代码、测试、必要文档。
- 运行 PLAN 指定检查。
- 记录 `EXECUTION.md`。

不做：

- 不扩大需求范围。
- 不跳过测试。
- 不覆盖用户未授权改动。
- 不在重大方案偏差下继续硬做。

## 流程

1. 读取 `plans/STATE.md` 和当前 phase `PLAN.md`。
2. 检查工作区状态，识别已有用户改动。
3. 按任务顺序小步实现。
4. 每完成一个任务，运行就近验证。
5. 偏差记录到 `EXECUTION.md`：
   - planned action
   - actual action
   - reason
   - risk
   - route: continue / replan / redesign
6. 运行 PLAN 中的最终检查命令。
7. 更新 `STATE.md`。

## 退出条件

- 当前 phase 代码实现完成。
- 验证命令已运行或明确说明无法运行。
- `EXECUTION.md` 包含变更、验证、偏差和剩余风险。

