---
name: flow-next
description: 开启下一轮需求迭代。Use after flow-close or when a new requirement arrives and previous plans should not be reused. Creates fresh plans/PROJECT.md, REQUIREMENTS.md, ROADMAP.md, and STATE.md while preserving AGENTS.md, docs/*, and archive.
---

# Flow Next

开启下一轮需求。不要把新需求追加到旧 `REQUIREMENTS.md`。

## 必读

- `../flow-shared/references/artifact-contract.md`
- `../flow-shared/references/context-loading.md`
- `../flow-shared/references/risk-rules.md`

## 边界

只做：

- 检查上一轮是否已归档。
- 基于新需求创建新的 `plans/*` 初始状态。
- 引导进入 `flow-discuss`。

不做：

- 不继承旧需求作为当前需求。
- 不改长期 docs，除非只是引用。
- 不写技术方案。

## 流程

1. 检查 `plans/STATE.md` 是否仍有进行中工作。
2. 如果上一轮未归档，建议先运行 `flow-close`；用户明确要求覆盖时，先备份。
3. 读取 `AGENTS.md`、`docs/*` 导航、最近 archive 总结。
4. 根据新需求创建或重置：
   - `plans/PROJECT.md`
   - `plans/REQUIREMENTS.md`
   - `plans/ROADMAP.md` 初始占位或空白
   - `plans/STATE.md`
5. 标记下一步为 `flow-discuss`。

## 退出条件

- 新一轮 `plans/` 已准备好。
- 旧迭代未被静默覆盖。
- 用户知道下一步进入需求澄清。

