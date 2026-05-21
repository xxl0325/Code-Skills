---
name: flow-auto
description: 自动编排当前迭代的 build 和 verify 阶段。Use after flow-plan has produced PLAN.md or multi-phase PLAN files in the active change workspace, when the user wants to automatically run implementation, verification, and security review. It loops flow-build -> flow-verify and routes failures backward to build/plan/design/discuss according to verification results. Does not replace requirement discussion, design, human approval, planning, or final shipping.
---

# Flow Auto

自动跑当前迭代的 `flow-build -> flow-verify`。它是编排器，不替代单个阶段的职责。`flow-ship` 会交付并归档整个 change，因此不在自动循环中执行；所有任务或 phase 验证通过后，再提示用户运行 `flow-ship`。

## 本阶段上下文

读取当前 active change 的 `STATE.md`。单文件模式读取 change 根目录 `PLAN.md`、`EXECUTION.md`、`VERIFICATION.md`；多文件模式读取 `ROADMAP.md`、当前 phase 的 `PLAN.md` 以及 phase 内已有 `EXECUTION.md`、`VERIFICATION.md`。只有当 PLAN 或验证命令不清楚时，才按需读取 `AGENTS.md` 或对应 `docs/*`。

## 边界

只做：

- 读取当前 change 的 `STATE.md` 和可执行 `PLAN.md`。
- 单文件模式按 `PLAN.md` 的 task 顺序执行；多文件模式按 phase 顺序执行。
- 根据 `VERIFICATION.md` 的路由向前回退。
- 维护当前 change 的 `STATE.md` 的当前阶段、结果和下一步。
- 所有自动生成或更新的文档必须使用中文。

不做：

- 不跳过 `flow-discuss`、`flow-design`、人工技术方案确认和 `flow-plan`。
- 不在没有 `PLAN.md` 的情况下直接写代码。
- 不强行通过失败的验证。
- 不静默扩大需求范围。
- 不自动处理需要用户业务判断的问题。

## 前置条件

必须满足：

- 当前 change 存在 `PLAN.md`；或多文件模式下 `ROADMAP.md` 和当前 phase `PLAN.md` 存在。
- 技术方案已由用户或团队人工确认，并且 `flow-plan` 已产出可执行计划。
- 如果存在 `TECHNICAL-REVIEW.md`，不得有未处理的 BLOCKED 或 required changes。
- 工作区没有无法归因的冲突改动；若有，先说明并等待用户确认。

不满足时停止，并提示应该回到：

- 缺需求：`flow-discuss`
- 缺设计：`flow-design`
- 缺人工确认：请用户确认技术方案是否可以进入执行
- 缺计划：`flow-plan`

## 自动循环

单文件模式按 `PLAN.md` 中未完成 task 顺序执行；多文件模式对每个未完成 phase 执行：

1. **Build**
   - 读取当前可执行 `PLAN.md`。
   - 执行 `flow-build` 的规则。
   - 写或更新 `EXECUTION.md`。
2. **Verify**
   - 执行 `flow-verify` 的规则。
   - 必须包含功能验证、回归检查和代码安全审查。
   - 写或更新 `VERIFICATION.md`。
3. **Route**
   - 如果 `VERIFICATION.md` 为 `PASS`，进入下一个 task 或 phase。
   - 如果失败原因是实现问题，回到 Build。
   - 如果失败原因是计划遗漏，停止并回到 `flow-plan`。
   - 如果失败原因是技术方案错误，停止并回到 `flow-design`，之后必须重新人工确认；用户需要 AI 辅助时再运行 `flow-review`。
   - 如果失败原因是需求不清，停止并回到 `flow-discuss`。
4. **Advance**
   - 更新当前 change 的 `STATE.md`。
   - 单文件模式进入下一个 task；多文件模式进入下一个 phase。

## 回退规则

自动回退只允许在当前 task 组或当前 phase 内执行 `build -> verify -> build` 循环。默认最多 2 轮修复。

遇到以下情况必须停止并请求用户确认：

- 需要修改需求范围。
- 需要改变 API/UI/数据模型等技术方案。
- 需要新增未在 `PLAN.md` 中出现的大模块。
- 安全审查发现高风险问题。
- 验证失败两轮仍未通过。
- 外部依赖、权限、账号、环境问题阻塞验证。

停止时必须写清楚：

```text
当前 task/phase：
失败位置：
失败原因：
建议回退到：
需要用户确认：
下一步命令：
```

## 状态记录

每次循环后更新当前 change 的 `STATE.md`：

```markdown
## Current Automation

- Mode: single-plan | multi-phase
- Current task/phase:
- Step: build | verify | blocked
- Last result:
- Failure route:
- Next action:
```

## 退出条件

- 单文件模式所有 task 验证通过，或多文件模式所有 phase 验证通过，提示可以运行 `flow-ship` 完成交付归档。
- 或遇到必须回退到 `flow-plan` / `flow-design` / `flow-discuss` 的阻塞问题。
- 或用户中断自动执行。
