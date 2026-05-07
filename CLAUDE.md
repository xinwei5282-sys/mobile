# Mobile 项目 Claude Code 工作系统

> KOC 团队管理移动应用原型。
> 基于全局角色定义 + 项目内轻量技能的混合架构。

## 项目信息

- **项目名称**：KOC 团队管理移动应用
- **技术栈**：Vue 3 (CDN) + HTML + CSS
- **设计**：移动优先，绿色主题（#5dd4cc）
- **GitHub**：https://github.com/xinwei5282-sys/mobile

## 文件结构

```
/Users/weiran/mobile/
├── index.html                 # 主入口（首页 + 我的页面）
├── koc-team-index.html        # 邀请记录页面
├── koc-team-main.html         # 团队管理页面
├── koc-team-detail.html       # 邀请明细页面
├── .claude/
│   ├── role-registry.md       # 角色映射表
│   └── skills/
│       ├── role-router/       # 薄路由（上下文优先）
│       └── mobile-dev/        # 轻量开发技能
├── docs/
│   └── KOC_TEAM_MANAGEMENT_PRD.md  # 产品需求文档
├── README.md
└── CLAUDE.md
```

## 工作流选择

### 场景 1：快速改动（样式、文案、小功能）

```
用户说："调整一下按钮的颜色" 或 "加个加载动画"

→ 使用 `/mobile-dev` 技能
  - 直接修改文件
  - git commit
  - 完成
```

### 场景 2：新页面或大功能

```
用户说："设计一个新的邀请页面" 或 "重写整个流程"

→ 1. 检查 role-registry.md
  2. 需要设计？→ 加载 role-ui
  3. 需要需求分析？→ 加载 role-pm
  4. 需要开发实现？→ 加载 role-dev
  5. 执行对应任务
```

### 场景 3：不确定任务上下文

```
用户说："改进一下这个页面"

→ 1. 使用 `/role-router` 分析
  2. 识别主导上下文（视觉？流程？实现？）
  3. 加载必要的角色
  4. 执行
```

## 全局角色定义

所有角色定义都在 `~/.agents/skills/role-*/SKILL.md` 中，不在项目内复制：

| 角色 | 全局路径 | 适用任务 |
|------|---------|---------|
| `ui` / 绘心 | `~/.agents/skills/role-ui/SKILL.md` | 页面设计、交互、样式 |
| `pm` / 明策 | `~/.agents/skills/role-pm/SKILL.md` | 需求分析、业务流程 |
| `dev` / 码匠 | `~/.agents/skills/role-dev/SKILL.md` | 开发实现、修 bug |
| `arch` / 架构师 | `~/.agents/skills/role-arch/SKILL.md` | 页面架构、技术方案 |

## 项目专有技能

### mobile-dev（轻量开发）

触发词：`/mobile-dev` 或直接说"快速改""调整一下""加个功能"

适用于：
- 样式调整（颜色、间距、阴影）
- 现有交互补充（弹窗、按钮、验证）
- 页面内的小功能扩展
- 文案和标签更新

不适用于：
- 全新页面
- 跨页面功能
- 需求重新讨论

## 项目特点与约束

### 技术特点

- **Vue 3 CDN**：全局 Vue，不使用构建工具
- **单文件完整**：每个 .html 是独立完整的应用
- **响应式移动**：viewport meta tag，移动优先设计
- **绿色主题**：主色 `#5dd4cc`，背景渐变 `linear-gradient(180deg, #cef4f0 0%, #e0f8f5 100%)`

### 文件修改规则

```javascript
// 添加新数据属性
const showModal = ref(false);

// 添加新方法
const handleClick = () => { ... };

// 返回对象中新增暴露
return { showModal, handleClick };

// 模板中新增绑定
@click="handleClick"
v-if="showModal"
```

### 样式修改规则

```css
/* 添加新类 */
.new-class {
  /* 遵循现有间距 16px/12px/8px */
  /* 使用现有颜色 #5dd4cc 绿色主题 */
  /* 使用 flex/grid 布局 */
}
```

## 开发工作流

### 1. 小改动（10 分钟内）

```bash
使用 /mobile-dev 技能

1. 读文件
2. 确认范围
3. Edit 修改
4. git commit
```

### 2. 中等功能（1 小时内）

```bash
1. /role-router 分析任务类型
2. 需要设计 → /ui 或参考 role-ui
3. 需要实现 → /role-dev
4. Edit 修改多个文件
5. git commit（可能多个 commit）
```

### 3. 大功能（1+ 小时）

```bash
1. /role-pm 澄清需求
2. /role-ui 或 /role-arch 设计方案
3. /role-dev 实现
4. 分步 git commit
5. 推送到 GitHub
```

## Git 提交规范

```bash
# 样式改动
git commit -m "style: 调整 XX 页面的颜色/间距

- 更改 padding 从 12px 到 16px
- 主题色从 #0052ff 改为 #5dd4cc"

# 功能开发
git commit -m "feat(add-modal): 实现弹窗功能

- 新增模态框组件
- 支持表单验证
- 添加取消/确认按钮"

# bug 修复
git commit -m "fix(navigation): 修复返回按钮不生效

- 添加 @click 处理器
- 使用 window.history.back()"
```

## 项目相关的快速参考

### 页面映射

- `index.html` → 首页 + 我的页面
- `koc-team-index.html` → 邀请记录（体验营邀请展示）
- `koc-team-main.html` → 团队管理（下属列表 + 邀请码生成）
- `koc-team-detail.html` → 邀请明细（单个下属的邀请详情）

### 页面跳转关系

```
index.html (我的页面)
    ↓
koc-team-main.html (团队管理)
    ↔ koc-team-index.html (邀请记录)
    ↓
koc-team-detail.html (邀请明细)
```

### 常用颜色

```css
/* 主题色 */
#5dd4cc        /* 绿色主色 */
#e8f5f4        /* 浅绿背景 */
#cef4f0        /* 渐变起点 */
#e0f8f5        /* 渐变终点 */

/* 文字 */
#333           /* 深灰文字 */
#999           /* 浅灰文字 */
#fff           /* 白色 */

/* 背景 */
#f9f9f9        /* 浅灰背景 */
#f5f5f5        /* 稍深灰背景 */
#fff           /* 白色卡片 */
```

### 常用间距

```css
padding: 16px 12px 8px;      /* 常用 padding */
gap: 12px;                   /* 常用间隙 */
margin-bottom: 16px;         /* 常用外间距 */
border-radius: 12px 8px;     /* 常用圆角 */
```

## 何时暂停工作

遇到以下情况，停止当前 skill，向用户汇报：

1. **需求不清楚** → 暂停，请 /role-pm 澄清
2. **影响超过 3 个文件** → 暂停，需要完整设计
3. **涉及架构变更** → 暂停，请 /role-arch 评审
4. **用户未回应** → 暂停等待用户反馈
5. **时间预估超过 2 小时** → 暂停，拆分任务

## 记忆与沉淀

项目级记忆存储在 `/Users/weiran/.claude/projects/-Users-weiran-mobile/memory/` 中：

- 用户偏好、工作风格
- 技术决策（为什么选 Vue 3 CDN？）
- 常见改动模式
- 踩过的坑

## 快速启动

```bash
# 进入项目
cd /Users/weiran/mobile

# 启动本地预览
python3 -m http.server 8080

# 浏览器打开
http://localhost:8080/index.html

# 硬刷新查看最新改动
Cmd+Shift+R (Mac) 或 Ctrl+Shift+R (Windows)
```

---

**更新日期**：2026-05-07
**架构参考**：/Users/weiran/SCRM 项目的角色 + 技能分离模式
