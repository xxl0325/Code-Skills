# Flow Skills

一组中文 Codex skills，用于把一次需求从项目初始化、需求澄清、方案设计、方案评审、计划拆分、实现、验证、安全审查、交付到归档，串成可重复执行的工作流。

这套 workflow 参考了 GSD 的阶段化思想，也吸收了 AGENTS.md 实践中的“地图，而非手册”原则：

- `AGENTS.md + docs/*`：长期项目知识。
- `plans/*`：当前需求/当前迭代状态。
- `plans/archive/*`：历史迭代归档。
- 代码：最终事实源。
- 所有由 skills 生成或更新的文档默认使用中文。

## Skills

```text
flow-init      初始化项目长期知识层：AGENTS.md + docs/*
flow-discuss   讨论和澄清本次需求，产出需求文档
flow-research  针对指定话题联网调研方案和 GitHub 项目
flow-design    设计 API、UI、后端、安全和验证方案
flow-review    评审技术方案，阻断高风险方案
flow-plan      拆分 phases 和可执行 PLAN
flow-auto      自动编排 build、verify、ship，并按失败路由回退
flow-build     按 PLAN 实现代码
flow-verify    验证功能、回归和代码安全
flow-ship      准备 PR/交付说明
flow-close     归档当前需求迭代
flow-next      开启下一轮需求
```

`flow-shared/` 不是一个可触发 skill，它保存所有 flow skills 共享的规则。安装时必须一起复制。

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
ls ~/.codex/skills/flow-shared
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
flow-close
flow-next
flow-shared
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
使用 flow-discuss 讨论这个需求并产出需求文档
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
  -> flow-review
  -> flow-plan
  -> flow-auto
  -> flow-close
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
AGENTS.md
docs/
  architecture.md
  development.md
  verification.md
  conventions.md
  frontend.md
  backend.md

plans/
  PROJECT.md
  REQUIREMENTS.md
  RESEARCH.md
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

## Development

检查 skill 结构：

```bash
find . -maxdepth 3 -type f | sort
rg -n "^name:|^description:" .
rg -n "../flow-shared/references|flow-shared/references" .
npm run check
npm run pack:dry
```

约定：

- 每个可触发 skill 是一个目录，目录内必须有 `SKILL.md`。
- `flow-shared/` 只放共享规则，不写 `SKILL.md`。
- 公共规则放在 `flow-shared/references/*`，不要复制到每个 skill。
- 所有生成文档必须使用中文；英文技术名词、命令、API 字段、代码标识符可以保留原文。
- 修改 workflow 边界时，同时更新 README 和相关 shared reference。
