---
name: mobile-dev
description: Mobile 项目轻量开发。用于快速修改页面样式、补充功能细节、小改动时，不需要完整规划流程。触发词：快速改, 调整一下, 修个细节, 加个功能, 补充
allowed-tools: Read, Write, Edit, Bash
---

# Mobile 项目轻量开发

适用于**小改动**：不需要新建 PRD，直接修改原型。

## 适用场景

- 页面样式调整（颜色、间距、字体、阴影）
- 现有交互补充（加个按钮、修个弹窗、验证逻辑）
- 新增简单功能（一个页面内的功能扩展）
- 补充空态/加载态/错误态展示
- 文案修改、标签更新
- 已有组件的小优化

## 不适用场景

- 全新页面开发 → 先用 role-pm 澄清需求，再用 role-dev
- 跨页面的大功能 → 用 role-arch 设计架构
- 影响多个页面的改动 → 需要先规划
- 涉及需求重新讨论 → 先澄清再动手

## 执行流程

```
1. 读目标文件（具体的 .html 文件）
2. 确认改动范围是否在 mobile-dev 边界内
3. 直接修改（Edit、Write、Bash）
4. git commit（提交改动）
5. 简要报告改动内容
```

## 文件修改快速清单

### Vue 3 + CDN 页面的改动点

- **样式改动**：`<style>` 区块内的 CSS
- **HTML 改动**：模板字符串内的 markup
- **JS 逻辑改动**：setup() 函数内的 refs、computed、methods
- **绑定改动**：@click、v-if、v-for 等

### 常见改动类型及命令

```bash
# 样式改动
Edit /Users/weiran/mobile/koc-team-main.html

# 添加新的 Vue 数据属性
Edit /Users/weiran/mobile/koc-team-main.html  # 在 setup() 中 ref()

# 添加新的模态框或组件
Edit /Users/weiran/mobile/koc-team-main.html  # 在模板末尾

# 修复小 bug
Read /Users/weiran/mobile/koc-team-main.html  # 确认问题
Edit /Users/weiran/mobile/koc-team-main.html   # 修复
```

## 样式修改最佳实践

### 调整已有颜色

- 主题色：`#5dd4cc`（绿色）
- 背景：`linear-gradient(180deg, #cef4f0 0%, #e0f8f5 100%)`
- 浅灰：`#f9f9f9`、`#f5f5f5`
- 文字：`#333` 深灰、`#999` 浅灰

### 调整间距

- 常用 padding：`16px`、`12px`、`8px`
- 常用 gap：`12px`、`8px`、`4px`
- 常用 margin：`16px`、`12px`

### 添加新的 CSS 类

- 在 `<style>` 最后直接添加
- 命名：`.new-element { ... }`
- 遵循现有的 BEM 或 flex/grid 布局

## Git 提交规范

```bash
git commit -m "style: 调整 XX 页面的 YY 样式

- 修改 padding/margin/color
- 更新 border-radius
- 优化间距"
```

## 完成标准

- [ ] 改动文件已读取和理解
- [ ] 代码修改无语法错误
- [ ] git commit 已提交
- [ ] 改动摘要清楚说明了做了什么

## 何时停止用 mobile-dev

如果发现以下情况，停止本流程，改用完整角色：

- 需要新建页面 → 用 role-ui 设计 + role-dev 开发
- 改动影响 3+ 个文件 → 需要 role-dev 完整流程
- 涉及需求讨论 → 需要 role-pm
- 涉及架构变更 → 需要 role-arch
