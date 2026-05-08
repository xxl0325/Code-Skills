# Context Loading

默认不要全量读取所有文档。先读当前阶段必要文件，再按任务相关性读取 `docs/*`。

## 通用优先级

1. 用户最新请求。
2. 仓库根目录 `AGENTS.md`。
3. 当前 skill 的 `SKILL.md`。
4. `plans/STATE.md` 当前状态。
5. 当前阶段产物。
6. 相关源码、测试、配置。
7. `docs/*` 中与任务相关的长期知识。

## 各阶段默认读取

`flow-init`：

- 读取现有 `AGENTS.md`、`docs/*`、README、包管理/构建配置。
- 扫描源码结构，但不修改业务代码。

`flow-discuss`：

- 读取 `AGENTS.md`、`docs/*` 的导航与相关约束。
- 若存在 `plans/STATE.md`，读取当前状态，避免覆盖未归档工作。

`flow-research`：

- 读取 `plans/PROJECT.md`、`plans/REQUIREMENTS.md`、`AGENTS.md` 和相关 `docs/*`。
- 必须联网搜索；不要只凭模型记忆。
- 按需读取相关源码以判断 GitHub 项目或方案是否适合当前项目。

`flow-design`：

- 读取 `plans/PROJECT.md`、`plans/REQUIREMENTS.md`、`AGENTS.md`。
- 如果存在 `plans/RESEARCH.md` 或当前 phase 的 `RESEARCH.md`，必须读取并显式说明如何吸收或拒绝其中建议。
- 按需读取 `docs/frontend.md`、`docs/backend.md`、`docs/architecture.md`、`docs/verification.md`。
- 读取相关源码以确认方案可落地。

`flow-review`：

- 读取 `plans/API-SPEC.md`、`plans/UI-SPEC.md`、`plans/TECHNICAL-SOLUTION.md`。
- 读取相关 `docs/*` 和关键源码。

`flow-plan`：

- 读取通过 review 的技术方案和 `TECHNICAL-REVIEW.md`。
- 读取 `REQUIREMENTS.md`、`STATE.md`、相关 `docs/*`。

`flow-build`：

- 读取当前 phase 的 `PLAN.md`。
- 读取对应源码、测试、配置和相关 `docs/*`。
- 不默认读取历史 archive。

`flow-verify`：

- 读取 `REQUIREMENTS.md`、当前 phase 的 `PLAN.md`、`EXECUTION.md`。
- 读取相关测试输出、代码 diff、安全相关文件。

`flow-ship`：

- 读取 `VERIFICATION.md`、`SHIP.md` 若存在、git diff、`STATE.md`。

`flow-close`：

- 读取本轮 `plans/*`、所有 phase 的 `VERIFICATION.md`、`SHIP.md`。
- 只在需要沉淀规则时读取 `AGENTS.md` 和对应 `docs/*`。

`flow-next`：

- 读取 `AGENTS.md`、`docs/*` 导航、最近一次 archive 总结。
- 不继承旧 `REQUIREMENTS.md` 为当前需求。
