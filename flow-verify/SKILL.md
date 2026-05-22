---
name: flow-verify
description: 验证当前计划或 phase 是否真正达成目标，并执行代码质量和安全审查。Use after flow-build. Checks requirements, tests, runtime behavior, regression risk, and security. Produces VERIFICATION.md and routes failures back to build/plan/design/discuss.
---

# Flow Verify

验证不是检查“任务打勾”，而是证明当前计划或 phase 目标达成。该阶段包括代码安全审查。

## 本阶段上下文

读取当前 change 的 `SPEC.md`、`STATE.md`、可执行 `PLAN.md`、`EXECUTION.md`、相关代码、测试输出和 git diff。单文件模式读取 change 根目录产物；多文件模式读取当前 phase 目录产物。需要确认验证命令时读取 `AGENTS.md` 或 `docs/verification.md`；安全边界不清时读取对应项目 docs。若 git diff 显示新增或修改关键方法，读取 `AGENTS.md` 的硬规则；如其指向 `docs/conventions.md#方法注释规范`，按需读取该章节。

## 边界

只做：

- 验证功能、测试、构建、运行时行为、安全和回归风险。
- 产出 `VERIFICATION.md`。
- 对小问题可修复；重大问题路由回对应阶段。
- 使用中文撰写验证结论、证据、失败项、安全审查和路由建议。

不做：

- 不新增需求。
- 不用未验证的主观判断宣布通过。

## 流程

1. 读取 `SPEC.md`、技术方案、PLAN、EXECUTION、相关代码和测试。
2. 逐条对照 `SPEC.md` 的成功标准和 `PLAN.md` 的 Verify 关注点。
3. 运行或检查：
   - lint/typecheck/format
   - tests/build
   - API/browser/runtime checks
   - security review
4. 检查新增或修改的业务方法、service/controller/handler/repository/public API、复杂工具方法是否有中文方法注释，并说明作用、入参、出参；有副作用或错误场景时也要说明。简单 getter/setter、自解释私有小函数、测试内部 helper、一两行局部 callback 可作为例外。
5. 安全审查至少覆盖认证、授权、输入输出、敏感数据、依赖、日志。
6. 写 `VERIFICATION.md`：
   - Verdict: PASS / FAIL / PARTIAL
   - Evidence
   - Failed checks
   - Method comment review
   - Security review
   - Required fixes
   - Route
7. 更新当前 change 的 `STATE.md`。

## 退出条件

- PASS：可以进入 `flow-ship`。
- FAIL/PARTIAL：明确回到 `flow-build`、`flow-plan`、`flow-design` 或 `flow-discuss`。

## 验证要求

- 必须逐条对照 `SPEC.md` 的成功标准、验证方式、Non-Goals 和技术约束。
- 必须检查新增或修改的关键方法是否符合中文方法注释规范；缺失时至少标记为 PARTIAL，并路由回 `flow-build`。
- 无法运行的检查必须说明原因和剩余风险。
- 不得用“看起来正常”代替证据。
