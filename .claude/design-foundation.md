# Mobile 项目设计基础（Design Foundation）

> 本文件是项目的设计唯一真相来源。所有角色（PM、UI、前端）在涉及界面、交互、样式时必须遵循本文件。
> 任何设计变更必须先更新本文件，再同步到代码和设计稿。

---

## 1. 品牌标识

- **产品名称**：KOC 团队管理移动应用（生财官网·会员体验卡）
- **产品定位**：KOC 推广团队管理工具
- **品牌主色**：生财绿（Teal）#5DD4CC
- **设计风格**：简洁、轻盈、易用
- **主题支持**：亮色模式（当前默认），暗色模式（CSS 变量支持）
- **设计基准**：移动端优先（375px-414px 宽度）
- **设计语言**：紧凑布局 — 容器 padding 16px，组件间 gap 12px，按钮高度 44px（移动），圆角 8px-12px

---

## 2. 颜色系统（Color Tokens）

### 2.1 主色系（生财绿 / Teal）

品牌主色系，用于按钮、链接、强调等核心元素。

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 主色调 Primary | `#5DD4CC` | 按钮、链接、强调色 |
| 浅背景 | `#E8F5F4` | 标签背景、Hover 背景 |
| 浅背景（更浅） | `#F0F8F7` | 禁用状态背景 |
| 渐变起点 | `#CEF4F0` | 页面背景渐变起点 |
| 渐变终点 | `#E0F8F5` | 页面背景渐变终点 |
| 边框色 | `#BDD4CE` | 边框和分割线 |

### 2.2 文字色

| 层级 | 颜色值 | 说明 |
|------|--------|------|
| 主要文字 | `#333` | 标题、正文 |
| 次要文字 | `#666` | 副标题、描述 |
| 辅助文字 | `#999` | 提示、时间、标签 |
| 禁用文字 | `#CCC` | 禁用状态 |
| 白色文字 | `#FFF` | 在彩色背景上 |

### 2.3 背景色

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 页面背景（默认） | `linear-gradient(180deg, #CEF4F0 0%, #E0F8F5 100%)` | 绿色渐变背景 |
| 卡片/弹窗 | `#FFFFFF` | 白色不透明 |
| 浅灰背景 | `#F9F9F9` | 内容区分 |
| 更浅灰 | `#F5F5F5` | 禁用/不可用 |

### 2.4 状态色

| 状态 | 颜色值 | 说明 |
|------|--------|------|
| 成功 | `#52C41A` | 操作成功 |
| 警告 | `#FA9A1D` | 警告提示 |
| 错误 | `#F54A45` | 错误/危险 |
| 信息 | `#327CFB` | 信息提示 |

---

## 3. 排版系统（Typography）

### 3.1 字体栈

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 
             'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

系统字体优先，提供最佳可读性和一致的移动体验。

### 3.2 字号与行高

| 用途 | 字号 | 行高 | 说明 |
|------|------|------|------|
| 大标题 | 18px | 1.4 | 页面标题 |
| 中标题 | 16px | 1.5 | 卡片标题、模态框标题 |
| 小标题 | 14px | 1.5 | 列表项标题 |
| 正文 | 14px | 1.6 | 默认文本 |
| 辅助文字 | 12px | 1.5 | 描述、标签、时间 |
| 超小文字 | 11px | 1.4 | 边标注 |

### 3.3 字重

| 用途 | 字重 | 说明 |
|------|------|------|
| 标题 | 600 | h1-h3, 强调 |
| 正文 | 500 | 默认文本 |
| 细字 | 400 | 描述、辅助 |

---

## 4. 布局与间距（Spacing & Layout）

### 4.1 基础间距单位

基础单位：4px

| 倍数 | 实际值 | 用途 |
|------|--------|------|
| 1x | 4px | 极小间距 |
| 2x | 8px | 紧凑组件间距 |
| 3x | 12px | 组件间默认距离 |
| 4x | 16px | 容器 padding，组件间距 |
| 5x | 20px | 大间距 |

### 4.2 常用间距规则

```css
/* 容器 padding */
padding: 16px;

/* 组件间距 */
gap: 12px;          /* 小间距 */
gap: 16px;          /* 标准间距 */

/* 外间距 */
margin-bottom: 16px;    /* 卡片间距 */
margin-bottom: 12px;    /* 元素间距 */

/* 圆角 */
border-radius: 8px;     /* 标准圆角 */
border-radius: 12px;    /* 大卡片圆角 */
border-radius: 6px;     /* 小组件圆角 */
```

### 4.3 布局基础

- **移动优先**：375px-414px 宽度
- **使用 Flexbox**：布局优先选择 flex
- **使用 CSS Grid**：多列网格（如统计卡片）
- **全宽容器**：内容区域 100% 宽度，padding 内缩

---

## 5. 组件规范

### 5.1 按钮

| 类型 | 背景 | 文字 | 高度 | 说明 |
|------|------|------|------|------|
| 主按钮 (Primary) | `#5DD4CC` | `#FFF` | 44px | 主要行动 |
| 次按钮 (Secondary) | `#F9F9F9` | `#333` | 44px | 次要行动 |
| 危险按钮 (Danger) | `#FFE8E8` | `#F54A45` | 44px | 删除/危险 |
| 文字按钮 | 透明 | `#5DD4CC` | auto | 链接式 |
| 小按钮 (Sm) | 按需 | 按需 | 32px | 卡片内操作 |

```css
/* 主按钮 */
background: #5DD4CC;
color: #FFF;
padding: 12px 16px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
cursor: pointer;

/* Hover 状态 */
&:hover {
  background: #4ab8b3;
  opacity: 0.9;
}

/* Active 状态 */
&:active {
  background: #3a9e9a;
}
```

### 5.2 输入框 / 表单

```css
/* 标准输入框 */
padding: 12px;
border: 1px solid #E4E4E7;
border-radius: 8px;
font-size: 14px;
font-family: inherit;

/* Focus 状态 */
&:focus {
  outline: none;
  border-color: #5DD4CC;
  box-shadow: 0 0 0 3px rgba(93, 212, 204, 0.1);
}

/* 错误状态 */
&.error {
  border-color: #F54A45;
}
```

### 5.3 标签 / 徽章

```css
background: #E8F5F4;
color: #5DD4CC;
font-size: 11px;
padding: 2px 8px;
border-radius: 4px;
display: inline-block;
```

### 5.4 卡片

```css
background: #FFF;
border-radius: 12px;
padding: 16px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
margin-bottom: 12px;
```

### 5.5 模态框

```css
/* 覆盖层 */
position: fixed;
top: 0; left: 0; right: 0; bottom: 0;
background: rgba(0, 0, 0, 0.4);
display: flex;
align-items: flex-end;
z-index: 100;

/* 内容框 */
background: #FFF;
width: 100%;
border-radius: 16px 16px 0 0;
padding: 20px 16px;
max-height: 80vh;
overflow-y: auto;

/* 动画 */
animation: slideUp 0.3s ease;
```

---

## 6. 响应式设计

### 6.1 断点

| 设备 | 宽度 | 说明 |
|------|------|------|
| 移动 | 375px-414px | iPhone SE-iPhone 12/13 |
| 平板 | 768px+ | iPad 和更大屏幕 |

### 6.2 适配策略

- **移动优先**：从小屏幕开始设计
- **Viewport Meta**：`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **相对尺寸**：使用 %, em, rem，避免绝对像素
- **Flexbox/Grid**：自适应布局

---

## 7. 深色模式（Dark Mode）

### 7.1 颜色反转规则

深色模式通过 CSS 媒体查询支持：

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
  }
  
  .card {
    background: #2a2a2a;
    border-color: #3a3a3a;
  }
  
  .text-primary {
    color: #fff;
  }
  
  .text-secondary {
    color: #999;
  }
}
```

### 7.2 深色模式色值

| 元素 | 亮色 | 深色 |
|------|------|------|
| 背景 | `#F4F5F7` | `#1a1a1a` |
| 卡片 | `#FFF` | `#2a2a2a` |
| 主文字 | `#333` | `#FFF` |
| 副文字 | `#999` | `#999` |
| 边框 | `#EEE` | `#3a3a3a` |

---

## 8. 页面架构

### 8.1 导航结构

```
index.html (首页 + 我的)
    ↓
koc-team-main.html (团队管理)
    ↔ koc-team-index.html (邀请记录)
    ↓
koc-team-detail.html (邀请明细)
```

### 8.2 顶部导航栏

```css
.top-navbar {
  background: #FFF;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.nav-url {
  font-size: 11px;
  color: #999;
  margin-top: 2px;
}
```

### 8.3 页面标题栏

```css
.title-bar {
  background: #FFF;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-bar-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
```

### 8.4 内容区域

```css
.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 20px;
}
```

---

## 9. 设计检查清单

设计/代码完成前必须检查：

- [ ] 颜色使用是否符合本文件定义
- [ ] 间距（padding/margin/gap）是否为 4px 倍数
- [ ] 圆角是否为 6px, 8px, 12px 之一
- [ ] 字号是否为定义的范围内
- [ ] 按钮高度是否为 44px（主）或 32px（小）
- [ ] 卡片是否有一致的阴影 `0 1px 3px rgba(0,0,0,0.06)`
- [ ] 深色模式是否支持（如适用）
- [ ] 触摸目标最小 44x44px（移动端）
- [ ] 响应式设计是否适配 375px+ 宽度
- [ ] 无障碍：对比度、文字可读性、按钮可点击

---

## 10. 文件引用

| 文件 | 用途 |
|------|------|
| 本文件 | 设计规范唯一真源 |
| `/Users/weiran/mobile/CLAUDE.md` | 项目工作指南 |
| `role-registry.md` | 角色映射 |
| `/Users/weiran/.agents/skills/role-ui/SKILL.md` | UI 设计角色 |

---

**更新日期**：2026-05-07  
**参考项目**：/Users/weiran/SCRM 的 design-foundation.md
