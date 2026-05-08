---
name: flow-research
description: 针对指定技术或产品话题进行联网方案调研。Use when the user gives a topic such as RAG evaluation, agent memory, frontend testing, API gateway design, observability, or any fast-moving technical area and wants current solutions from web search, official docs, GitHub projects, papers, and engineering articles. Produces plans/RESEARCH.md with source links, GitHub project comparisons, implementation patterns, risks, and recommended approach. Requires browsing/searching; do not answer from memory only.
---

# Flow Research

针对用户给定的话题进行联网调研，输出可进入 `flow-design` 的研究报告。这个阶段回答“业界怎么做、哪些项目值得参考、当前项目该怎么选”，不写代码。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/risk-rules.md`
- `../flow-shared/references/security-review.md`

## 边界

只做：

- 联网搜索当前资料。
- 分析官方文档、论文、GitHub 项目、工程文章。
- 对比候选方案和类似项目实现。
- 产出 `plans/RESEARCH.md`，或在已有当前 phase 时产出 `plans/phases/<phase>/RESEARCH.md`。
- 使用中文撰写调研结论、对比、风险和推荐方案；英文来源必须用中文总结。

不做：

- 不写业务代码。
- 不直接生成 API/UI 技术方案；方案设计交给 `flow-design`。
- 不复制开源项目代码。
- 不把个人博客或营销文章当作唯一事实来源。
- 不忽略 license、维护活跃度和安全风险。

## 来源优先级

1. 官方文档、标准、论文、技术报告。
2. 高质量 GitHub 开源项目。
3. 工程团队博客和生产实践文章。
4. 个人博客、社区文章、教程。
5. Reddit、issue、discussion 只作为经验信号，不作为事实依据。

必须记录检索日期。对于快速变化的话题，不得只凭模型记忆回答。

调研报告正文必须使用中文。允许保留英文项目名、论文名、API 名称、命令、代码标识符和原始链接。

## 搜索流程

1. 解析 topic、目标、当前项目约束。必要时最多问 3 个澄清问题。
2. 制定搜索问题，例如：
   - 主流方案有哪些？
   - 官方推荐是什么？
   - GitHub 上类似项目如何实现？
   - 生产实践中有哪些坑？
   - 如何验证效果？
3. 联网搜索：
   - Google/通用搜索：找官方文档、文章、论文。
   - GitHub：找类似项目、工具库、示例实现。
   - 其他网站：框架官网、论文站点、工程博客、社区讨论。
4. 对每个来源记录 URL、类型、可信度、使用理由。
5. 对 GitHub 项目分析：
   - URL
   - License
   - 最近更新时间
   - star/fork/issue 活跃度
   - 技术栈
   - 架构和关键模块
   - 测试/评测方式
   - 可借鉴点
   - 不适合照搬的点
6. 汇总不少于 2 个候选方案；若只有 1 个合理方案，说明原因。
7. 明确推荐方案、反对方案、落地步骤和风险。

## 输出模板

写入 `plans/RESEARCH.md`：

```markdown
# Research: <topic>

**Date:** YYYY-MM-DD
**Topic:** <topic>
**Goal:** <为什么调研>
**Scope:** <范围和非范围>

## 1. 结论摘要
- 推荐方案：
- 适用条件：
- 不推荐方案：
- 最大风险：

## 2. 搜索问题与关键词
- ...

## 3. 来源列表
| 类型 | 来源 | 链接 | 可信度 | 用途 |
|---|---|---|---|---|

## 4. 方案地图
| 方案 | 适合场景 | 优点 | 风险 | 成本 |
|---|---|---|---|---|

## 5. GitHub 项目对比
| 项目 | License | 活跃度 | 技术栈 | 实现方式 | 可借鉴点 | 风险 |
|---|---|---|---|---|---|---|

## 6. 推荐实现路径
1. ...
2. ...
3. ...

## 7. 对当前项目的落地建议
- 需要新增的模块：
- 需要复用的现有模块：
- API/UI/数据影响：
- 验证方式：

## 8. 风险与未知
- 正确性：
- 安全：
- 性能：
- 维护：
- 合规/license：

## 9. 进入 flow-design 的输入
- 设计约束：
- 必须验证的问题：
- 推荐技术选型：
- 明确不采用的方案：
```

## 退出条件

- `RESEARCH.md` 有来源链接和检索日期。
- 至少分析官方/权威来源和 GitHub 项目。
- 给出推荐方案、反对方案、风险和进入 `flow-design` 的输入。
- 没有把未验证资料表述为事实。
