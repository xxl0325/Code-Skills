# Flow Skills

一组中文 Codex skills，用于把一次需求从项目初始化、需求澄清、方案设计、人工确认、计划拆分、实现、验证、安全审查、交付归档，串成可重复执行的工作流。

这套 workflow 参考了 GSD 的阶段化思想，也吸收了 AGENTS.md 实践中的“地图，而非手册”原则：

- `AGENTS.md + docs/*`：长期项目知识。
- `.flow/config.yaml`：项目级 workflow 默认策略。
- `plans/changes/*`：每次需求/变更的工作区。
- `plans/archive/*`：已关闭需求归档。
- 代码：最终事实源。
- 所有由 skills 生成或更新的文档默认使用中文。

## Skills

```text
flow-init      初始化项目长期知识层：AGENTS.md + docs/* + docs/flows/*
flow-discuss   讨论和澄清本次需求，产出 SPEC.md 和 STATE.md
flow-research  针对指定话题联网调研方案和 GitHub 项目
flow-design    设计 API、UI、后端、安全和验证方案
flow-review    可选 AI 辅助评审技术方案
flow-plan      默认生成单文件 PLAN.md，必要时拆分多 phase
flow-auto      自动编排 build、verify，并按失败路由回退
flow-build     按 PLAN 实现代码
flow-verify    验证功能、回归和代码安全
flow-ship      准备 PR/交付说明，归档当前需求迭代，并沉淀长期文档建议
flow-next      开启下一轮需求
```

## Install

### Option 1: npx

推荐使用 npm 安装：

```bash
npx flow-skills install
```

如果已经安装过同名 skill，需要显式覆盖：

```bash
npx flow-skills install --force
```

安装到自定义目录：

```bash
npx flow-skills install --dest /path/to/skills
```

默认安装到：

```text
~/.codex/skills/
```

如果你设置了 `CODEX_HOME`，会安装到：

```text
$CODEX_HOME/skills/
```

安装完成后重启 Codex 或开启新会话。

验证安装：

```bash
ls ~/.codex/skills/flow-init
```

### Option 2: Clone and install

如果你从 GitHub 克隆了本仓库，可以在仓库根目录运行：

```bash
./install.sh
```

### Option 3: Manual install

```bash
mkdir -p ~/.codex/skills
cp -R flow-* ~/.codex/skills/
```

确认这些目录都在 `~/.codex/skills/` 下：

```text
flow-init
flow-discuss
flow-research
flow-design
flow-review
flow-plan
flow-auto
flow-build
flow-verify
flow-ship
flow-next
```

## Update

使用 npm 更新：

```bash
npx flow-skills install --force
```

如果从源码安装，重新拉取仓库后再次运行安装脚本：

```bash
git pull
./install.sh
```

安装脚本会把已有同名目录备份为：

```text
~/.codex/skills/<skill>.backup.<timestamp>
```

然后复制新版本。

## Usage

在 Codex 中直接提到 skill 名称即可触发，例如：

```text
使用 flow-init 初始化这个项目的 AGENTS.md 和 docs
```

```text
使用 flow-discuss 讨论这个需求并产出 SPEC.md
```

```text
使用 flow-design 做 API 和 UI 技术方案
```

推荐自动路径：

```text
flow-init
  -> flow-discuss
  -> flow-research
  -> flow-design
  -> flow-review（可选）
  -> 人工确认技术方案
  -> flow-plan
  -> flow-auto
  -> flow-ship
  -> flow-next
```

如果你希望手动控制每个阶段，可以不用 `flow-auto`，改为：

```text
flow-plan
  -> flow-build
  -> flow-verify
  -> flow-ship
```

## Generated Project Structure

在目标项目中，这套 skills 预期维护：

```text
.flow/
  config.yaml
AGENTS.md
docs/
  architecture.md
  development.md
  verification.md
  conventions.md
  frontend.md
  backend.md
  flows/
    README.md
    <module-or-feature>.md

plans/
  changes/
    <change-name>/
      SPEC.md
      RESEARCH.md
      API-SPEC.md
      UI-SPEC.md
      TECHNICAL-SOLUTION.md
      TECHNICAL-REVIEW.md  # 可选，AI 辅助评审产物
      PLAN.md
      STATE.md
      ROADMAP.md       # 可选：多文件 phase 模式
      phases/          # 可选：多文件 phase 模式
        001-name/
          PLAN.md
          EXECUTION.md
          VERIFICATION.md
          SHIP.md
  archive/
```

`AGENTS.md + docs/*` 是长期项目知识；当前系统长期行为、架构和约定只沉淀到这里。`docs/flows/*` 记录模块/功能的长期真实流程和导航，只有当前需求涉及对应模块时才读取。不要额外维护 `plans/specs/*`，避免与 `docs/*` 形成重复事实源。

`.flow/config.yaml` 是项目级默认策略，记录 `lite`、`standard`、`full` 三个 workflow profile。`flow-discuss` 会根据本次需求复杂度评估并把实际采用的 profile 写入当前 change 的 `STATE.md`。

`plans/changes/<change-name>/` 是一次需求的短期工作区。需求完成后，`flow-ship` 归档该 change，并只把已经稳定成为长期规则的内容更新回 `AGENTS.md` 或 `docs/*`。

## Development

检查 skill 结构：

```bash
find . -maxdepth 3 -type f | sort
rg -n "^name:|^description:" .
npm run check
npm run pack:dry
```

约定：

- 每个可触发 skill 是一个目录，目录内必须有 `SKILL.md`。
- 每个 skill 应自包含本阶段的读取范围、产出、关键规则和退出条件，避免运行时依赖共享规则文件。
- 所有生成文档必须使用中文；英文技术名词、命令、API 字段、代码标识符可以保留原文。
- 修改 workflow 边界时，同时更新 README 和相关 skill。
