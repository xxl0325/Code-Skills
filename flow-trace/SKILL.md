---
name: flow-trace
description: 梳理指定模块或功能的长期真实流程。Use when the user names a module, feature, route, API, user journey, state flow, data flow, job, event, or security boundary and wants source-backed flow documentation or navigation for future changes.
---

# Flow Trace

梳理指定模块或功能在当前系统里的真实流程，产出或更新 `docs/flows/*.md`，并同步更新 `docs/flows/README.md` 和 `AGENTS.md` 的文档导航。它是长期知识维护，不是需求设计或实现计划。

## 本阶段上下文

读取 `AGENTS.md`、`docs/flows/README.md`（若存在）和与目标模块相关的长期约束文档。优先按目标模块读取对应文档：

- `docs/architecture.md`：目录职责、模块边界、入口位置。
- `docs/frontend.md`：前端路由、页面、组件、状态和 API 调用约定。
- `docs/backend.md`：API、handler、service、repository、权限、安全、性能约定。
- `docs/conventions.md`：命名、错误处理、日志、测试、提交约定。
- 已存在的 `docs/flows/<name>.md`：需要更新时读取。

只读取与目标模块/功能相关的源码、测试和配置。不要默认全量梳理所有模块。

## 边界

只做：

- 追踪指定模块/功能的入口、主流程、分支流程、数据流、状态流、权限/安全边界、错误处理和涉及文件。
- 创建或更新 `docs/flows/<module-or-feature>.md`。
- 更新 `docs/flows/README.md` 的索引、读取条件和状态。
- 同步更新 `AGENTS.md` 的文档导航或架构地图摘要，让后续 Agent 能直接发现对应流程文档。
- 所有文档正文使用中文；路径、命令、API 名称、代码符号可以保留英文。

不做：

- 不写业务代码。
- 不设计新功能。
- 不创建或修改 `plans/changes/*` 下的 `SPEC.md`、`DATA-DESIGN.md`、`API-DESIGN.md`、`UI-DESIGN.md`、`TECHNICAL-DESIGN.md`、`PLAN.md`。
- 不把猜测写成 `verified`。
- 不把一次性需求计划写进 `docs/flows/*` 或 `AGENTS.md`。

## 流程

1. 明确用户要梳理的模块/功能名称；如果目标过宽，先缩小到一个可追踪流程。
2. 读取 `AGENTS.md` 和 `docs/flows/README.md`；若不存在 `docs/flows/README.md`，创建时补上索引和维护规则。
3. 读取相关长期约束文档；缺失时在产物中标注，不凭空补规则。
4. 用 `rg --files`、`rg "<关键词>"`、路由/入口文件、API 定义、测试文件定位真实入口。
5. 顺着调用链和数据流阅读相关源码：
   - 前端：页面、组件、状态、hooks、API client、错误/加载/空态。
   - 后端：route/controller/handler、service、repository/model、权限、安全、事务、日志。
   - 异步：job、queue、event、callback、定时任务、消息消费。
   - 测试：单测、集成测试、E2E、fixture，作为流程证据。
6. 先列至少 3 类风险，再写文档：
   - 正确性：是否可能漏掉入口、分支、异步路径或多端路径。
   - 安全：是否涉及认证、授权、敏感数据、日志、外部回调。
   - 维护性/性能：是否存在重复流程、隐式依赖、热点路径或过细文档风险。
7. 创建或更新 `docs/flows/<module-or-feature>.md`。
8. 更新 `docs/flows/README.md`：流程文档索引、覆盖模块/功能、主要入口、适用场景、状态、最近验证日期。
9. 同步更新 `AGENTS.md`：
   - 在“文档导航”中加入或更新该流程文档入口。
   - 如有必要，在“架构地图”相关目录下加一行流程导航提示。
   - 只写短导航，不把完整流程复制进 `AGENTS.md`。
10. 输出本次追踪范围、证据来源、更新文件和未确认问题。

## docs/flows/*.md 模板

```markdown
# <模块或功能>流程

---
Status: draft | verified | stale
Source: code scan | user provided | inferred
Last verified: YYYY-MM-DD
---

## 适用范围

## 入口

- 前端入口：
- 后端入口：
- 异步/任务入口：
- 外部系统入口：

## 主流程

1. ...

## 分支流程

- 成功路径：
- 失败路径：
- 权限/安全分支：
- 空态/边界输入：
- 异步或重试路径：

## 数据与状态流

- 输入数据：
- 中间状态：
- 持久化位置：
- 输出结果：

## 涉及文件

- `path/to/file`：作用。

## 关键约束

- ...

## 常见改动入口

- 修改 UI：
- 修改 API：
- 修改业务规则：
- 修改数据模型：
- 修改验证逻辑：

## 验证建议

- ...

## 未确认问题

- ...
```

## 状态规则

- `verified`：流程来自源码、配置、测试或用户确认，并且关键入口和分支已核对。
- `draft`：部分流程来自推断，或分支尚未完全确认。
- `stale`：文档与代码明显冲突，或最近变更可能影响流程但尚未重新核对。

## AGENTS.md 同步规则

`AGENTS.md` 只放导航，不放完整流程。推荐写法：

```markdown
## 文档导航

- `docs/flows/order-create.md`：订单创建流程；改订单入口、订单 API、库存/支付前置校验时读取。
```

如果 `AGENTS.md` 有架构地图，也可以在相关目录下补一条短提示：

```markdown
- `src/features/order/`：订单前端功能；订单创建流程见 `docs/flows/order-create.md`。
```

## 退出条件

- `docs/flows/<module-or-feature>.md` 存在，且内容有源码或测试证据支撑。
- `docs/flows/README.md` 已更新索引。
- `AGENTS.md` 已更新短导航，后续 Agent 能直接发现该流程文档。
- 未确认内容标为 `draft` 或写入“未确认问题”。
- 没有修改业务代码，也没有创建本次需求计划。
