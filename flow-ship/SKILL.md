---
name: flow-ship
description: 交付并归档当前需求迭代。Use after flow-verify passes and the active change is ready to deliver. Creates PR/release notes, SHIP.md, archives the change to plans/archive, and records long-term documentation candidates. Do not use to add new features.
---

# Flow Ship

准备交付并归档当前需求迭代，不做新开发。

## 本阶段上下文

读取当前 active change 的 `SPEC.md`、`STATE.md`、可执行 `PLAN.md`、`EXECUTION.md`、`VERIFICATION.md` 和 git diff。单文件模式读取 change 根目录产物；多文件模式读取 `ROADMAP.md` 和所有 phase 的 `PLAN.md`、`EXECUTION.md`、`VERIFICATION.md`。只有需要沉淀长期规则时，才读取 `AGENTS.md` 和对应 `docs/*`。

## 边界

只做：

- 汇总变更、验证证据、剩余风险。
- 准备 PR 描述或交付说明。
- 写当前 change 根目录的 `SHIP.md`。
- 归档当前 change 到 `plans/archive/YYYY-MM-DD-slug/`。
- 记录长期文档沉淀建议，必要时更新或建议更新 `AGENTS.md` / `docs/*`。
- 使用中文撰写交付说明、PR 摘要、验证证据、剩余风险、归档总结和文档沉淀建议。

不做：

- 不新增功能。
- 不修复非阻塞问题，除非用户明确要求。
- 不隐瞒未运行的验证。
- 不把一次性需求写进 `AGENTS.md` 或 `docs/*`。

## 流程

1. 确认 `VERIFICATION.md` 为 PASS。
2. 单文件模式确认 change 根目录 `VERIFICATION.md` 为 PASS；多文件模式确认所有 phase 的 `VERIFICATION.md` 均为 PASS。
3. 读取 git diff、SPEC、PLAN、EXECUTION、VERIFICATION。
4. 写当前 change 根目录 `SHIP.md`：
   - 交付摘要
   - 用户可见变化
   - 技术变化
   - 验证证据
   - 安全说明
   - 剩余风险
   - 回退说明
   - 归档位置
   - 长期文档沉淀建议
5. 生成 archive 目录：`plans/archive/YYYY-MM-DD-slug/`。
6. 复制或移动当前 `plans/changes/<change-name>/` 到 archive，并把原 change 标记为 closed 或移除。
7. 只把稳定、可复用的规则沉淀到 `AGENTS.md` 或 `docs/*`；不确定时只写入 `SHIP.md` 的建议列表。
8. 更新当前 change 的 `STATE.md`，或在归档副本中记录 closed 状态。

## 退出条件

- 交付说明足够支持 PR 或发布。
- 剩余风险明确。
- 没有把未验证内容描述为已验证。
- 当前 change 已归档到 `plans/archive/`。
- 长期文档沉淀建议已记录。
