---
name: flow-init
description: 初始化或刷新项目长期知识层。Use when starting this workflow in an existing or new repository, creating AGENTS.md and docs/*, mapping project structure, commands, conventions, frontend/backend architecture, and verification guidance. Do not use for discussing a specific feature request or writing implementation plans.
---

# Flow Init

初始化项目长期知识层：`AGENTS.md` 和 `docs/*`。这是给后续需求开发读取的项目地图，不是本次需求计划。

`AGENTS.md` 的写法参考“地图，而非手册”的经验：它应该让 Agent 打开项目后快速知道项目是什么、怎么启动、哪些规则不能违反、去哪里读细节。不要把完整架构说明、组件手册、API 细节、一次性需求计划塞进 `AGENTS.md`。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`

## 边界

只做：

- 读取代码、配置、README、脚本、测试，理解项目结构。
- 创建或更新 `AGENTS.md`。
- 创建或更新 `docs/architecture.md`、`docs/development.md`、`docs/verification.md`、`docs/conventions.md`、`docs/frontend.md`、`docs/backend.md`。

不做：

- 不写业务代码。
- 不讨论本次需求。
- 不创建 `plans/ROADMAP.md` 或 phase plan。
- 不覆盖用户已有规则；有冲突时先标注冲突并询问或保守合并。

## 流程

1. 检查现有 `AGENTS.md`、`docs/*`、README、构建配置、测试配置、主要源码目录。
2. 提取长期项目事实：技术栈、目录职责、构建/启动/测试命令、前后端边界、安全和验证要求。
3. 生成 `AGENTS.md` 作为地图，控制在约 200 行，详细内容链接到 `docs/*`。
4. 生成或更新 `docs/*`，每个文档标注：
   - `Status: draft | verified | stale`
   - `Source: code scan | user provided | inferred`
   - `Last verified: YYYY-MM-DD`
5. 对推断内容使用 `draft`，不要伪装成已验证事实。
6. 输出变更摘要和需要用户确认的开放问题。

## AGENTS.md 生成规则

`AGENTS.md` 必须是目标项目的核心入口文件，优先覆盖这些章节：

```markdown
# AGENTS.md

## 1. 项目概述
[一段话说清楚项目定位、技术栈、仓库结构。前 10 行必须让 Agent 建立项目心智模型。]

## 2. 快速命令
[构建、启动、格式化、质量检查、测试命令速查表。只写可直接执行的命令。]

## 3. 架构地图
[后端/前端/共享模块的目录入口和职责。详细说明链接到 docs/architecture.md。]

## 4. 前端约定
[前端技术栈、路由、状态、组件库、API 调用约定。详细说明链接到 docs/frontend.md。]

## 5. 后端约定
[后端模块分层、API、数据、权限、安全、错误处理。详细说明链接到 docs/backend.md。]

## 6. 关键硬规则
[5-10 条违反后会直接导致错误的规则。每条尽量链接到 docs/* 或自动化检查。]

## 7. 开发与验证流程
[改 -> 构建 -> 启动 -> 验证 -> 修复的闭环。详细说明链接到 docs/verification.md。]

## 8. 质量检查
[lint、format、typecheck、build、test、安全检查命令矩阵。]

## 9. 文档导航
[列出 docs/* 每个文档解决什么问题。]
```

如果项目没有前端或后端，不要保留空章节；改成适合项目的模块约定。

## AGENTS.md 与 docs 的分工

判断一条信息放哪里：

- Agent 不知道就会写错代码：放 `AGENTS.md`。
- Agent 不知道只是写得不够好：放 `docs/*`，在 `AGENTS.md` 放链接。
- 模块细节、组件参数、API 细节、环境长说明：放 `docs/*`。
- 当前需求、phase 进度、临时计划：放 `plans/*`，禁止写进 `AGENTS.md`。

`AGENTS.md` 中的规则要尽量可执行。能用脚本检查的规则，写出检查命令；不能检查的规则，写出明确的禁止/必须。

## docs/* 生成要求

默认创建或更新这些文档：

```text
docs/architecture.md   # 架构、模块边界、目录职责
docs/development.md    # 环境、依赖、启动、调试
docs/verification.md   # 构建、测试、接口/浏览器验证
docs/conventions.md    # 编码规范、命名、错误处理、日志、提交约定
docs/frontend.md       # 前端架构、路由、状态、组件、设计系统
docs/backend.md        # API、数据模型、权限、安全、性能约定
```

每个 docs 文件开头必须包含：

```markdown
---
Status: draft | verified | stale
Source: code scan | user provided | inferred
Last verified: YYYY-MM-DD
---
```

若信息来自推断，使用 `draft`；只有从代码、配置、脚本或用户确认中验证过，才使用 `verified`。

## 初始化时的风险检查

生成前先列出至少 3 条风险：

- 正确性：项目结构或命令是否可能误判。
- 安全：是否会把密钥、私有地址、敏感环境变量写进文档。
- 维护性：是否引入重复事实源，是否和 README/docs 现有内容冲突。

若发现现有 `AGENTS.md` 或 `docs/*` 与代码冲突，不要直接覆盖；标注冲突，保守更新，必要时询问用户。

## 退出条件

- `AGENTS.md` 存在且能作为项目入口地图。
- `docs/*` 至少覆盖架构、开发、验证、约定。
- `AGENTS.md` 有明确文档导航，且没有承载长篇细节。
- `AGENTS.md` 没有记录当前需求进度或 phase 状态。
- 不存在与代码明显冲突的未标注事实。
