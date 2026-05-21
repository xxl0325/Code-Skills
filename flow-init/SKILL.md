---
name: flow-init
description: 初始化或刷新项目长期知识层。Use when starting this workflow in an existing or new repository, creating .flow/config.yaml, AGENTS.md, docs/*, and docs/flows/*, mapping project structure, module flows, commands, conventions, frontend/backend architecture, and verification guidance. Do not use for discussing a specific feature request or writing implementation plans.
---

# Flow Init

初始化项目长期知识层：`.flow/config.yaml`、`AGENTS.md`、`docs/*` 和 `docs/flows/*`。这是给后续需求开发读取的项目地图、模块流程导航和 workflow 默认策略，不是本次需求计划。

`AGENTS.md` 的写法参考“地图，而非手册”的经验：它应该让 Agent 打开项目后快速知道项目是什么、怎么启动、哪些规则不能违反、去哪里读细节。不要把完整架构说明、组件手册、API 细节、一次性需求计划塞进 `AGENTS.md`。

## 本阶段上下文

读取现有 `.flow/config.yaml`、`AGENTS.md`、`docs/*`、README、包管理/构建配置、测试配置和主要源码目录。只读代码和配置，不修改业务代码。

## 边界

只做：

- 读取代码、配置、README、脚本、测试，理解项目结构。
- 创建或更新 `.flow/config.yaml`。
- 创建或更新 `AGENTS.md`。
- 创建或更新 `docs/architecture.md`、`docs/development.md`、`docs/verification.md`、`docs/conventions.md`、`docs/frontend.md`、`docs/backend.md`。
- 创建或更新 `docs/flows/README.md`，并按项目情况创建关键模块/功能流程文档草稿。
- 所有生成或更新的文档正文必须使用中文。

不做：

- 不写业务代码。
- 不讨论本次需求。
- 不创建 `plans/changes/<change-name>/PLAN.md`、`ROADMAP.md` 或 phase plan。
- 不覆盖用户已有规则；有冲突时先标注冲突并询问或保守合并。

## 流程

1. 检查现有 `.flow/config.yaml`、`AGENTS.md`、`docs/*`、README、构建配置、测试配置、主要源码目录。
2. 提取长期项目事实：技术栈、目录职责、完整目录地图、关键模块/功能流程、构建/启动/测试命令、前后端边界、安全和验证要求。
3. 生成 `.flow/config.yaml`，默认 `default_profile: standard`；只有项目明显是 demo/脚本/小工具时可建议 `lite`，只有项目明显涉及支付、权限、敏感数据、复杂集成时可建议 `full`。
4. 生成 `AGENTS.md` 作为地图，控制在约 200 行，详细内容链接到 `docs/*`。
5. 生成或更新 `docs/*` 和 `docs/flows/*`，每个文档标注：
   - `Status: draft | verified | stale`
   - `Source: code scan | user provided | inferred`
   - `Last verified: YYYY-MM-DD`
6. 对推断内容使用 `draft`，不要伪装成已验证事实。
7. 输出变更摘要和需要用户确认的开放问题。

## .flow/config.yaml 生成规则

`.flow/config.yaml` 是项目级 workflow 默认策略，不记录某次需求状态。默认创建：

```yaml
version: 1
language: zh-CN
default_profile: standard

profiles:
  lite:
    docs_loading: minimal
    require_research: false
    require_design: optional
    require_ai_review: optional
    require_phase_plan: optional
    require_security_review: true

  standard:
    docs_loading: related
    require_research: optional
    require_design: true
    require_ai_review: optional
    require_phase_plan: true
    require_security_review: true

  full:
    docs_loading: broad
    require_research: true
    require_design: true
    require_ai_review: optional
    require_phase_plan: true
    require_security_review: true

routing:
  lite_when:
    - copy_or_style_only
    - single_file_low_risk
    - no_api_change
    - no_data_model_change
    - no_auth_or_permission_change
    - no_security_sensitive_input
    - no_cross_module_behavior

  full_when:
    - auth_or_permission_change
    - payment_or_financial_logic
    - database_schema_or_migration
    - public_api_contract_change
    - security_sensitive_input
    - privacy_or_personal_data
    - cross_service_integration
    - performance_critical_path
    - irreversible_operation
```

若已有 `.flow/config.yaml`，不要覆盖用户配置；只补充缺失字段，并说明变更。

## AGENTS.md 生成规则

`AGENTS.md` 必须是目标项目的核心入口文件，优先覆盖这些章节：

```markdown
# AGENTS.md

## 1. 项目概述
[一段话说清楚项目定位、技术栈、仓库结构。前 10 行必须让 Agent 建立项目心智模型。]

## 2. 快速命令
[构建、启动、格式化、质量检查、测试命令速查表。只写可直接执行的命令。]

## 3. 架构地图
[尽可能详细列出项目目录结构，要求梳理到最后一个有意义的文件夹级别。每个目录写清楚职责、所属层次、主要入口文件或关键文件类型。详细说明链接到 docs/architecture.md。]

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
[列出 docs/* 和 docs/flows/* 每个文档解决什么问题，并写清楚读取条件。]
```

如果项目没有前端或后端，不要保留空章节；改成适合项目的模块约定。

`AGENTS.md` 的正文必须使用中文。命令、路径、API 名称、代码符号可以保留原文。

## AGENTS.md 与 docs 的分工

判断一条信息放哪里：

- Agent 不知道就会写错代码：放 `AGENTS.md`。
- Agent 不知道只是写得不够好：放 `docs/*`，在 `AGENTS.md` 放链接。
- 模块细节、组件参数、API 细节、环境长说明：放 `docs/*`。
- 模块/功能的长期真实流转、入口、分支、涉及文件和常见改动导航：放 `docs/flows/*`。
- 当前需求、phase 进度、临时计划：放 `plans/changes/<change-name>/`，禁止写进 `AGENTS.md`。

`AGENTS.md` 中的规则要尽量可执行。能用脚本检查的规则，写出检查命令；不能检查的规则，写出明确的禁止/必须。

## 架构地图细化要求

`AGENTS.md` 的“架构地图”必须比概览更细，目标是让 Agent 不打开全仓库也能快速定位代码。生成时：

- 使用 `rg --files`、包管理配置、路由/入口文件和主要源码目录推断目录职责。
- 尽可能展开到最后一个有意义的文件夹级别，例如 `src/features/order/components/`、`src/server/modules/user/`、`apps/web/app/(dashboard)/`。
- 不要求逐个列出普通源文件，但必须列出关键入口文件、配置文件、路由入口、模块边界文件和测试目录。
- 忽略或压缩 `node_modules/`、构建产物、缓存目录、日志、临时文件、二进制资源大目录。
- 对每个目录写一句职责说明；不确定的目录标记 `待确认`，不要编造。
- 若目录很多，`AGENTS.md` 保留完整目录树和职责摘要，细节可链接到 `docs/architecture.md`，但不能只写“详见 docs”。

推荐格式：

````markdown
## 3. 架构地图

```text
src/
  app/                  # 应用入口、全局布局、路由注册
    routes/             # 页面路由，到具体页面文件夹级别
  features/
    order/              # 订单领域功能
      components/       # 订单 UI 组件
      hooks/            # 订单相关 hooks
      api/              # 订单 API 调用封装
  server/
    modules/
      user/             # 用户领域后端模块
        handlers/       # HTTP handler
        services/       # 业务服务
        repository/     # 数据访问
tests/
  integration/          # 集成测试
```

- `src/app/`：...
- `src/features/order/`：...
- `src/server/modules/user/`：...
````

## docs/* 生成要求

默认创建或更新这些文档：

```text
docs/architecture.md   # 架构、模块边界、目录职责
docs/development.md    # 环境、依赖、启动、调试
docs/verification.md   # 构建、测试、接口/浏览器验证
docs/conventions.md    # 编码规范、命名、错误处理、日志、提交约定
docs/frontend.md       # 前端架构、路由、状态、组件、设计系统
docs/backend.md        # API、数据模型、权限、安全、性能约定
docs/flows/README.md   # 模块/功能流程导航索引、读取条件、维护规则
docs/flows/*.md        # 具体模块或功能的长期真实流程
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

## docs/flows/* 生成要求

`docs/flows/*` 用来记录当前系统中模块和功能的长期真实流程，帮助后续需求改到相关模块时快速导航。它不是本次需求计划，也不是实现任务清单。

初始化时至少创建 `docs/flows/README.md`，写清楚：

- `docs/flows/*` 的作用：记录模块/功能从入口到关键分支、依赖模块、涉及文件和验证建议的长期流程。
- 读取条件：只有当前需求明确涉及某个模块、功能、入口、路由、API、数据链路、状态流或安全边界时，`flow-design`、`flow-plan` 才读取对应流程文档；禁止每个阶段默认全量读取。
- 维护规则：如果本次变更改变了既有流程，必须在 `flow-ship` 前提出更新对应流程文档的建议。
- 索引表：列出已有流程文档、覆盖模块、主要入口、适用场景、可信状态。

具体流程文档建议使用：

```markdown
# <模块或功能>流程

---
Status: draft | verified | stale
Source: code scan | user provided | inferred
Last verified: YYYY-MM-DD
---

## 适用范围

## 入口

## 主流程

## 分支流程

## 涉及文件

## 关键约束

## 常见改动入口

## 验证建议
```

只记录稳定流程和导航信息，不记录一次性计划、临时任务、实现过程流水账或尚未确认的新需求。

## 初始化时的风险检查

生成前先列出至少 3 条风险：

- 正确性：项目结构或命令是否可能误判。
- 安全：是否会把密钥、私有地址、敏感环境变量写进文档。
- 维护性：是否引入重复事实源，是否和 README/docs 现有内容冲突。
- 流程文档：是否把一次性需求计划误写进 `docs/flows/*`，或把流程文档写得过细导致很快过期。
- 流程成本：默认 profile 是否会让小项目过重，或让高风险项目过轻。

若发现现有 `AGENTS.md` 或 `docs/*` 与代码冲突，不要直接覆盖；标注冲突，保守更新，必要时询问用户。

## 退出条件

- `AGENTS.md` 存在且能作为项目入口地图。
- `.flow/config.yaml` 存在，且包含 `lite`、`standard`、`full` 三个 profile。
- `docs/*` 至少覆盖架构、开发、验证、约定。
- `docs/flows/README.md` 存在，并说明流程文档作用、读取条件和维护规则。
- `AGENTS.md` 有明确文档导航，且没有承载长篇细节。
- `AGENTS.md` 没有记录当前需求进度或 phase 状态。
- 不存在与代码明显冲突的未标注事实。
