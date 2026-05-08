---
name: flow-design
description: 设计本次需求的 API、UI、后端、数据流、安全和验证方案。Use after flow-discuss has produced requirements and before technical review. Produces plans/API-SPEC.md, plans/UI-SPEC.md, and plans/TECHNICAL-SOLUTION.md. Do not use for implementation task planning or coding.
---

# Flow Design

把需求文档转成可评审的技术方案，覆盖 API、UI、后端设计、数据流、安全和验证思路。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/risk-rules.md`
- `../flow-shared/references/security-review.md`

## 边界

只做：

- 设计技术方案。
- 对方案做风险分析。
- 创建 `plans/API-SPEC.md`、`plans/UI-SPEC.md`、`plans/TECHNICAL-SOLUTION.md`。
- 所有技术方案文档必须使用中文；API 字段、路径、代码符号可保留英文。

不做：

- 不拆执行任务。
- 不写业务代码。
- 不跳过 review 直接进入 build。

## 流程

1. 读取 `plans/PROJECT.md`、`plans/REQUIREMENTS.md`、`AGENTS.md` 和相关 `docs/*`。
2. 阅读相关源码，验证方案是否符合现有架构和约定。
3. 如果存在 `plans/RESEARCH.md` 或当前 phase 的 `RESEARCH.md`，先读取，并说明：
   - 采纳了哪些建议。
   - 拒绝了哪些建议及原因。
   - 哪些未知需要在实现或验证中继续确认。
4. 先列问题和风险，再提出设计。
5. 设计 API：
   - endpoint、method、request/response、错误码、权限、兼容性、幂等性。
6. 设计 UI：
   - 页面结构、组件、状态、加载/空/错态、响应式、可访问性。
7. 设计后端：
   - 模块边界、数据模型、事务、一致性、性能、安全。
8. 写验证策略：
   - 测试、构建、接口验证、浏览器验证、安全用例。
9. 更新 `plans/STATE.md`。

## 退出条件

- 技术方案能覆盖全部验收标准。
- API 和 UI 契约清晰。
- 安全、性能、验证方案有明确检查点。
- 未决问题标明是否阻塞 review。
