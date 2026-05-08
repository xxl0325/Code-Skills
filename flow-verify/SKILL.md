---
name: flow-verify
description: 验证当前 phase 是否真正达成目标，并执行代码质量和安全审查。Use after flow-build. Checks requirements, tests, runtime behavior, regression risk, and security. Produces VERIFICATION.md and routes failures back to build/plan/design/discuss.
---

# Flow Verify

验证不是检查“任务打勾”，而是证明 phase 目标达成。该阶段包括代码安全审查。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/verification-rules.md`
- `../flow-shared/references/security-review.md`

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

1. 读取需求、技术方案、PLAN、EXECUTION、相关代码和测试。
2. 逐条对照验收标准。
3. 运行或检查：
   - lint/typecheck/format
   - tests/build
   - API/browser/runtime checks
   - security review
4. 安全审查至少覆盖认证、授权、输入输出、敏感数据、依赖、日志。
5. 写 `VERIFICATION.md`：
   - Verdict: PASS / FAIL / PARTIAL
   - Evidence
   - Failed checks
   - Security review
   - Required fixes
   - Route
6. 更新 `STATE.md`。

## 退出条件

- PASS：可以进入 `flow-ship`。
- FAIL/PARTIAL：明确回到 `flow-build`、`flow-plan`、`flow-design` 或 `flow-discuss`。
