# Flow Artifact Contract

本文件定义所有 flow-* skill 共享的产物边界。若某个 skill 的局部说明与本文件冲突，以本文件为准。

## 分层

```text
AGENTS.md + docs/* = 长期项目知识
plans/* = 当前需求/当前迭代状态
plans/archive/* = 历史迭代归档
代码 = 最终事实源
```

## 长期项目知识

`AGENTS.md` 是地图，不是手册。只放 Agent 不知道就容易写错代码的硬规则、命令入口、文档导航，目标控制在 200 行左右。

`docs/*` 放相对稳定的项目知识：

- `docs/architecture.md`：架构、模块边界、目录职责。
- `docs/development.md`：环境、依赖、启动、调试。
- `docs/verification.md`：构建、测试、接口/浏览器验证流程。
- `docs/conventions.md`：编码规范、命名、错误处理、日志、提交约定。
- `docs/frontend.md`：前端架构、路由、状态、组件、设计系统。
- `docs/backend.md`：API、数据模型、权限、安全、性能约定。

禁止在 `AGENTS.md` 或 `docs/*` 里记录当前 phase 进度、临时任务列表、一次性需求计划。

## 当前迭代状态

```text
plans/
  PROJECT.md
  REQUIREMENTS.md
  API-SPEC.md
  UI-SPEC.md
  TECHNICAL-SOLUTION.md
  TECHNICAL-REVIEW.md
  ROADMAP.md
  STATE.md
  phases/
    001-name/
      PLAN.md
      EXECUTION.md
      VERIFICATION.md
      SHIP.md
  archive/
```

- `PROJECT.md`：本轮需求 brief。写背景、目标、非目标、关键约束链接，不重复 docs。
- `REQUIREMENTS.md`：本轮需求文档。写需求、验收、边界、风险、开放问题。
- `API-SPEC.md`：接口契约、数据结构、权限、安全、错误码。
- `UI-SPEC.md`：页面、交互、状态、响应式、可访问性、视觉约束。
- `TECHNICAL-SOLUTION.md`：端到端技术方案，连接 API、UI、数据、验证。
- `TECHNICAL-REVIEW.md`：方案评审结果和必须修复的问题。
- `ROADMAP.md`：本轮需求拆分出来的 phases，不是永久产品路线图。
- `STATE.md`：当前位置、最近决策、阻塞、下一步。

禁止把新需求追加到旧 `REQUIREMENTS.md`。新一轮需求应由 `flow-next` 创建新的 `plans/*`，旧内容由 `flow-close` 归档。

## 更新规则

- 需求变化：更新 `plans/REQUIREMENTS.md`、`plans/STATE.md`。
- 技术方案变化：更新 `plans/API-SPEC.md`、`plans/UI-SPEC.md`、`plans/TECHNICAL-SOLUTION.md`，并重新 review。
- phase 拆分变化：更新 `plans/ROADMAP.md` 和对应 `plans/phases/*/PLAN.md`。
- 长期规则沉淀：在 `flow-close` 阶段提出，并更新 `AGENTS.md` 或 `docs/*`。
- 文档与代码冲突：以当前代码为准，记录偏差，并修正文档。

