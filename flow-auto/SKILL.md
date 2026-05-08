---
name: flow-auto
description: 自动编排当前迭代的 build、verify、ship 阶段。Use after flow-plan has produced plans/ROADMAP.md and phase PLAN.md files, when the user wants to automatically run implementation, verification, security review, and shipping across phases. It loops flow-build -> flow-verify -> flow-ship, and routes failures backward to build/plan/design/discuss according to verification results. Does not replace requirement discussion, design, review, or planning.
---

# Flow Auto

自动跑当前迭代的 `flow-build -> flow-verify -> flow-ship`。它是编排器，不替代单个阶段的职责。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/verification-rules.md`
- `../flow-shared/references/security-review.md`

## 边界

只做：

- 读取 `plans/STATE.md`、`plans/ROADMAP.md` 和当前 phase 的 `PLAN.md`。
- 按 phase 顺序自动执行 build、verify、ship。
- 根据 `VERIFICATION.md` 的路由向前回退。
- 维护 `plans/STATE.md` 的当前阶段、结果和下一步。
- 所有自动生成或更新的文档必须使用中文。

不做：

- 不跳过 `flow-discuss`、`flow-design`、`flow-review`、`flow-plan`。
- 不在没有 `PLAN.md` 的情况下直接写代码。
- 不强行通过失败的验证。
- 不静默扩大需求范围。
- 不自动处理需要用户业务判断的问题。

## 前置条件

必须满足：

- `plans/ROADMAP.md` 存在。
- 当前 phase 存在 `PLAN.md`。
- `plans/TECHNICAL-REVIEW.md` 已通过，或用户明确允许在无 review 情况下继续。
- 工作区没有无法归因的冲突改动；若有，先说明并等待用户确认。

不满足时停止，并提示应该回到：

- 缺需求：`flow-discuss`
- 缺设计：`flow-design`
- 缺评审：`flow-review`
- 缺计划：`flow-plan`

## 自动循环

对每个未完成 phase 执行：

1. **Build**
   - 读取当前 phase `PLAN.md`。
   - 执行 `flow-build` 的规则。
   - 写或更新 `EXECUTION.md`。
2. **Verify**
   - 执行 `flow-verify` 的规则。
   - 必须包含功能验证、回归检查和代码安全审查。
   - 写或更新 `VERIFICATION.md`。
3. **Route**
   - 如果 `VERIFICATION.md` 为 `PASS`，进入 Ship。
   - 如果失败原因是实现问题，回到 Build。
   - 如果失败原因是计划遗漏，停止并回到 `flow-plan`。
   - 如果失败原因是技术方案错误，停止并回到 `flow-design`，之后必须重新 `flow-review`。
   - 如果失败原因是需求不清，停止并回到 `flow-discuss`。
4. **Ship**
   - 执行 `flow-ship` 的规则。
   - 写或更新 `SHIP.md`。
5. **Advance**
   - 更新 `plans/STATE.md`。
   - 进入下一个 phase。

## 回退规则

自动回退只允许在当前 phase 内执行 `build -> verify -> build` 循环。默认最多 2 轮修复。

遇到以下情况必须停止并请求用户确认：

- 需要修改需求范围。
- 需要改变 API/UI/数据模型等技术方案。
- 需要新增未在 `PLAN.md` 中出现的大模块。
- 安全审查发现高风险问题。
- 验证失败两轮仍未通过。
- 外部依赖、权限、账号、环境问题阻塞验证。

停止时必须写清楚：

```text
当前 phase：
失败位置：
失败原因：
建议回退到：
需要用户确认：
下一步命令：
```

## 状态记录

每次循环后更新 `plans/STATE.md`：

```markdown
## Current Automation

- Phase:
- Step: build | verify | ship | blocked
- Last result:
- Failure route:
- Next action:
```

## 退出条件

- 所有 phase 都完成 `SHIP.md`，提示可以运行 `flow-close`。
- 或遇到必须回退到 `flow-plan` / `flow-design` / `flow-discuss` 的阻塞问题。
- 或用户中断自动执行。

