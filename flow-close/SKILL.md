---
name: flow-close
description: 关闭并归档当前需求迭代。Use when all phases in plans/ROADMAP.md are verified and shipped. Archives plans/ to plans/archive, summarizes learnings, and proposes updates to AGENTS.md/docs. Do not use for starting a new requirement.
---

# Flow Close

关闭当前需求迭代，归档 `plans/`，并把稳定经验沉淀到长期文档。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`

## 边界

只做：

- 检查本轮所有 phase 是否完成。
- 归档当前 `plans/`。
- 总结经验和长期文档更新建议。

不做：

- 不删除历史。
- 不开始新需求。
- 不把一次性需求写进 `AGENTS.md`。

## 流程

1. 读取 `ROADMAP.md`、`STATE.md`、所有 phase 的 `VERIFICATION.md` 和 `SHIP.md`。
2. 若存在未 PASS 或未 ship 的 phase，停止并列出阻塞项。
3. 生成 archive 目录：`plans/archive/YYYY-MM-DD-slug/`。
4. 归档当前 `plans/*` 到 archive，保留 `plans/archive/`。
5. 生成迭代总结：
   - delivered
   - verification
   - risks
   - decisions
   - docs candidates
6. 对确认为长期规则的内容，更新或建议更新 `AGENTS.md` / `docs/*`。

## 退出条件

- 当前迭代已归档。
- `plans/` 为下一轮做好准备，或提示运行 `flow-next`。
- 长期文档沉淀项已记录。

