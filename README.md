# KOC 团队管理移动应用

本项目是 KOC（Key Opinion Consumer）团队管理功能的 Vue 3 移动端原型实现。

## 项目结构

```
src/mobile/pages/my/koc-team/
├── index.vue                    # 团队管理主页面
├── detail.vue                   # 下属邀请明细页面
└── components/
    ├── TeamStatisticCard.vue    # 团队统计卡片组件
    ├── AddTeamMemberModal.vue   # 添加下属弹窗组件
    └── TeamMemberList.vue       # 团队成员列表组件
```

## 功能模块

### 团队管理页面 (index.vue)
- 团队统计信息展示（总下属数、总邀请数、总转化数）
- 添加下属按钮
- 下属列表展示（支持删除、查看详情、查看邀请码）
- 分页加载

### 邀请明细页面 (detail.vue)
- 下属基本信息展示（名字、邀请码、标签）
- 邀请统计数据（邀请总数、转化总数、已领卡、已入营）
- 邀请列表筛选（全部、推荐成功、已领卡、已入营、未入营）
- 用户邀请记录展示

### 组件说明
- **TeamStatisticCard**: 三列统计卡片，展示核心数据
- **AddTeamMemberModal**: 两阶段底部弹窗（表单输入 → 邀请码展示）
- **TeamMemberList**: 成员卡片列表，支持操作按钮

## 技术栈

- Vue 3 (Composition API)
- TypeScript
- Less (样式)
- 深色主题支持（CSS 变量）

## 设计特点

- 移动端优先响应式设计
- 完整的深色主题支持
- 流畅的动画过渡效果
- 模态框、表单验证、用户反馈

## 文档

- `docs/KOC_TEAM_MANAGEMENT_PRD.md` - 完整的需求文档

## 注意事项

当前所有 API 调用均为本地模拟数据，生产环境需要替换为真实的后端接口调用。
