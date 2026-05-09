---
name: flow-next
description: 开启下一轮需求迭代。Use after flow-ship has archived the previous change, or when a new requirement arrives and previous plans should not be reused. Creates a fresh plans/changes/<change-name>/ workspace while preserving AGENTS.md, docs/*, and archive.
---

# Flow Next

开启下一轮需求。不要把新需求追加到旧 change 的 `SPEC.md`。

## 本阶段上下文

读取 `AGENTS.md`、`plans/changes/*/STATE.md` 和最近一次 archive 总结。只有新需求明显涉及具体模块或长期约束时，读取对应 `docs/*`。

## 边界

只做：

- 检查上一轮是否已归档。
- 基于新需求创建新的 `plans/changes/<change-name>/` 初始状态。
- 引导进入 `flow-discuss`。
- 使用中文创建新一轮 change 初始文档。

不做：

- 不继承旧需求作为当前需求。
- 不改长期 docs，除非只是引用。
- 不写技术方案。

## 流程

1. 检查 `plans/changes/*/STATE.md` 是否仍有进行中工作。
2. 如果上一轮未归档，建议先运行 `flow-ship`；用户明确要求覆盖时，先备份。
3. 读取 `AGENTS.md` 和最近 archive 总结；只有新需求明显涉及具体模块或长期约束时，读取对应 docs。
4. 根据新需求创建新的 `plans/changes/<change-name>/`，不要重置旧 change：
   - `SPEC.md`
   - `STATE.md`
5. 标记下一步为 `flow-discuss`。

## 退出条件

- 新一轮 `plans/changes/<change-name>/` 已准备好。
- 旧迭代未被静默覆盖。
- 用户知道下一步进入需求澄清。
