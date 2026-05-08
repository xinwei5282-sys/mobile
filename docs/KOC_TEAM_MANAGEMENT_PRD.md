# KOC 团队管理项目 — 产品需求文档（PRD）

> 本文件是项目级唯一主 PRD。
> `koc-team-index.html`、`koc-team-main.html`、`koc-team-detail.html` 的页面需求已全部合并到本文件中统一维护。
> `prd/team-index.js`、`prd/team-main.js`、`prd/team-detail.js` 仅用于页面内 PRD 面板展示，不作为项目级主文档。

**版本**: 3.0（按当前原型同步）  
**最后更新**: 2026-05-07  
**负责人**: 蔚然  
**状态**: 原型对齐中  
**范围**: `koc-team-index.html` / `koc-team-main.html` / `koc-team-detail.html`

---

## 一、项目概述

### 1.1 背景

当前 KOC 邀请链路以个人直邀为主，缺少“团队化分发”和“来源归因”能力。项目目标是在移动端为 KOC 提供一套轻量团队管理工具，让 KOC 可以：

- 添加团队成员（下属推广员）
- 为每个成员分配独立邀请码
- 通过标签区分不同投放渠道或运营策略
- 查看成员带来的邀请结果与转化明细

核心关系为：**KOC → 团队成员 → 被邀请用户**。所有邀请成果仍归 KOC 所有。

### 1.2 目标

- 让 KOC 能直接管理自己的推广团队
- 让每个团队成员拥有独立邀请码，便于归因
- 让用户来源能够被标签化追踪
- 让 KOC 在移动端完成查看、添加、删除、明细追踪的闭环

### 1.3 本期范围

本期仅覆盖移动端原型与对应数据结构定义，包含 3 个页面：

1. `koc-team-index.html`：体验营邀请记录
2. `koc-team-main.html`：团队管理
3. `koc-team-detail.html`：成员邀请明细

### 1.4 不在本期范围

- PC 管理后台
- 复杂权限配置后台
- 海报真实二维码生成服务
- 营期看板导出、下载报表
- 历史数据切换的真实业务逻辑

---

## 二、用户故事

### Story 1：KOC 查看自己的总体邀请表现

**作为** KOC  
**我想要** 在邀请记录页查看自己的邀请总量、转化总量，以及后续按状态筛选邀请记录  
**以便于** 快速判断整体推广效果，并进入团队管理页继续追踪成员表现

### Story 2：KOC 添加团队成员并分配标签

**作为** KOC  
**我想要** 为团队成员设置名称、标签，并自动生成独立邀请码  
**以便于** 区分不同推广渠道，形成稳定的下属推广链路

### Story 3：KOC 查看团队整体表现

**作为** KOC  
**我想要** 在团队管理页查看团队人数、总邀请数、成功推荐数，以及每个成员的漏斗数据  
**以便于** 比较不同成员、不同标签的推广效果

### Story 4：KOC 查看单个成员的邀请明细

**作为** KOC  
**我想要** 进入成员详情页查看该成员邀请来的用户列表，并按状态筛选  
**以便于** 判断该成员的具体转化情况

### Story 5：KOC 删除失效成员

**作为** KOC  
**我想要** 删除不再合作的团队成员  
**以便于** 保持团队数据干净，同时保留历史邀请记录用于结算与分析

---

## 三、页面结构与功能需求

## 3.1 页面关系

```text
体验营邀请记录（koc-team-index）
  └─ 团队管理（koc-team-main）
       └─ 邀请明细（koc-team-detail）
```

---

## 3.2 页面一：体验营邀请记录（`koc-team-index.html`）

### 3.2.1 顶部区域

- 展示浏览器壳层导航：关闭按钮、站点名、生财官网域名、更多按钮
- 页面标题栏显示：
  - 返回按钮（当前原型仅展示，未绑定业务）
  - 标题：`体验营邀请记录`
  - 右侧跳转入口：`团队管理 >`

### 3.2.2 统计区

- 两个统计指标：
  - `已邀请总人数`
  - `成功推荐总人数`
- 每个指标右侧保留 `ⓘ` 说明入口
- 当前原型支持数字展示，不含口径弹层实现

### 3.2.3 操作区

- 按钮 1：`生成邀请码`
- 按钮 2：`切换历史数据`
- 当前原型为视觉占位，不绑定具体业务逻辑

### 3.2.4 Tab 与筛选

- Tab：
  - `邀请进度`（默认）
  - `营期看板`
- 状态筛选：
  - 全部
  - 推荐成功
  - 已领卡
  - 已入营
  - 未入营

### 3.2.5 内容区

#### 邀请进度 Tab

- 支持展示邀请记录列表
- 列表项字段：
  - 用户头像 / 占位头像
  - 微信昵称
  - 当前状态文案
  - 添加时间
- 空状态：插画 + `暂无数据`
- 加载状态：spinner + `加载中...`

#### 营期看板 Tab

- 当前原型仅展示占位空态：`功能开发中...`

---

## 3.3 页面二：团队管理（`koc-team-main.html`）

### 3.3.1 标题栏

- 左侧返回按钮：调用 `window.history.back()`
- 标题：`团队管理`
- 右侧按钮：`➕ 团队成员`

### 3.3.2 顶部数据统计

- 三个统计指标：
  - `团队人数`：`teamStats.totalMembers`
  - `已邀请总数`：`teamStats.totalInviteCount`
  - `成功推荐人数`：`teamStats.totalConvert`
- 保留 `ⓘ` 口径说明入口（待实现）

### 3.3.3 Tab 切换

- `团队进度`（默认）
- `营期看板`

### 3.3.4 团队进度 Tab

#### 列表规则

- 按 `joinTime` 倒序展示，新成员排最前
- 空状态：`📋` + `暂无数据`

#### 成员卡片字段

- 成员名称：`distributorName`
- 标签：`tag`
- 手机号：`distributorPhone`
- 漏斗数据 4 项：
  - `inviteCount` 邀请总人数
  - `tryCount` 已领卡
  - `chatCount` 已入营
  - `notEnterCount` 未入营

#### 成员卡片操作

- `查看详情`：跳转 `koc-team-detail.html?id={distributorId}&code={inviteCode}`
- `查看邀请码`：打开邀请海报弹窗
- `删除`：打开删除确认弹窗

### 3.3.5 营期看板 Tab

- 以表格展示成员营期数据
- 每条数据来自 `teamMembers[i].periods[]`
- 行维度：每个营期 × 每个成员
- 排序规则：
  - 营期倒序
  - 同营期内成员 ID 正序

#### 表格列

- 营期
- 成员
- 已邀请
- 已入营
- 已领卡
- 推荐成功

#### 视觉规则

- 表头浅绿底
- 偶数营期行使用浅底分组
- 数值 `0` 显示为 `—`

### 3.3.6 添加团队成员弹窗

#### 表单字段

- `成员名称`：必填
- `标签`：必填

#### 当前原型状态

- `formData` 中仍保留 `phone` 字段，但 UI 表单当前未展示手机号输入框
- 提交时创建新成员并生成邀请码：`KOC_M_xxxxxx`
- 提交成功后关闭弹窗，并通过浏览器 `alert` 提示邀请码

### 3.3.7 邀请海报弹窗

- 触发：成员卡片 `查看邀请码`
- 海报内容：
  - 品牌头
  - 主标题
  - 描述文案（带成员名称）
  - 邀请码
  - `扫码免费领体验卡`
  - `长按图片保存到相册分享`
- 操作按钮：`⬇️ 保存海报`
- 当前实现通过 `html2canvas` 导出图片

### 3.3.8 删除确认弹窗

- 触发：成员卡片 `删除`
- 内容：
  - 警示图标 `⚠️`
  - 标题：`确定删除？`
  - 提示：删除后邀请码失效，但已有邀请记录保留
- 按钮：
  - `取消`
  - `删除`

---

## 3.4 页面三：邀请明细（`koc-team-detail.html`）

### 3.4.1 顶部区域

- 浏览器壳层导航仅作视觉展示
- 页面标题栏：
  - 返回按钮：调用 `window.history.back()`
  - 标题：`邀请明细`

### 3.4.2 成员信息卡

- 展示字段：
  - 成员名称：`memberInfo.distributorName`
  - 标签：`memberInfo.tag`
- 页面通过 URL 参数 `id` 定位当前成员

### 3.4.3 顶部统计卡

- 四列统计：
  - `邀请总数`
  - `转化总数`
  - `已领卡`
  - `已入营`

### 3.4.4 状态筛选

- 筛选项：
  - 全部
  - 推荐成功（`xq_paid`）
  - 已领卡（`xq_tried`）
  - 已入营（`room_entered`）
  - 未入营（`room_not_enter`）

### 3.4.5 邀请记录列表

- 列表项字段：
  - `wxAvatar`
  - `wxName`
  - `externalUserWorkAddTime`
  - `statusDesc`
- 空状态：`📭` + `暂无邀请记录`
- 加载状态：spinner + `加载中...`

### 3.4.6 当前原型说明

- 筛选仅影响列表，不影响顶部统计卡
- 当前数据由前端本地 mock 提供

---

## 四、前端数据模型

### 4.1 邀请记录页

#### `invitationStats`

- `totalInvite`
- `totalConvert`

#### `invitationList[i]`

- `id`
- `wxName`
- `status`
- `statusDesc`
- `addTime`

### 4.2 团队管理页

#### `teamStats`

- `totalMembers`
- `totalInviteCount`
- `totalConvert`

#### `teamMembers[i]`

- `distributorId`
- `distributorName`
- `distributorPhone`
- `inviteCode`
- `tag`
- `joinTime`
- `status`
- `inviteCount`
- `tryCount`
- `chatCount`
- `notEnterCount`
- `periods[]`：`{ num, invited, joined, card, success }`

#### `formData`

- `name`
- `phone`
- `tag`

### 4.3 邀请明细页

#### `memberInfo`

- `distributorName`
- `inviteCode`
- `tag`

#### `stats`

- `totalInvite`
- `totalConvert`
- `tryCount`
- `chatCount`

#### `invitationList[i]`

- `id`
- `wxName`
- `wxAvatar`
- `externalUserWorkAddTime`
- `statusDesc`
- `status`

---

## 五、后端建议数据模型

### 5.1 `koc_team_member`

建议保留如下字段：

- `id`
- `koc_union_user_id`
- `distributor_name`
- `distributor_phone`
- `invite_code`
- `tag`
- `status`
- `gmt_create`
- `gmt_update`
- `gmt_delete`

### 5.2 邀请来源追踪

建议在邀请记录表中保留：

- `source_distributor_invite_code`
- `source_distributor_id`
- `source_distributor_tag`

### 5.3 业务规则

- 一个成员对应一个邀请码
- 邀请码全局唯一
- 删除成员后邀请码失效
- 历史邀请记录保留，不回收
- 用户通过成员邀请码进入时，自动继承对应标签

---

## 六、接口建议

以下接口按当前原型能力整理，供后续真实接入使用。

### 6.1 获取邀请记录页汇总

`GET /try/koc/invitation/summary`

返回：

- `totalInvite`
- `totalConvert`

### 6.2 获取邀请记录列表

`GET /try/koc/invitations?status=`

返回：

- `items[]`
  - `wxName`
  - `status`
  - `statusDesc`
  - `addTime`

### 6.3 获取团队汇总与成员列表

`GET /try/koc/team/members`

返回：

- `summary`
  - `totalMembers`
  - `totalInviteCount`
  - `totalConvert`
- `items[]`
  - `distributorId`
  - `distributorName`
  - `distributorPhone`
  - `inviteCode`
  - `tag`
  - `joinTime`
  - `inviteCount`
  - `tryCount`
  - `chatCount`
  - `notEnterCount`
  - `periods[]`

### 6.4 添加团队成员

`POST /try/koc/team/add-member`

请求：

```json
{
  "distributorName": "张三",
  "tag": "微信群1"
}
```

说明：

- 当前原型仅要求 `distributorName` 与 `tag`
- 若后端保留手机号，可作为可选字段扩展

### 6.5 删除团队成员

`DELETE /try/koc/team/member/{distributorId}`

### 6.6 获取成员邀请明细

`GET /try/koc/member/{distributorId}/invitations?filterStatus=`

返回：

- `memberInfo`
- `summary`
- `items[]`

### 6.7 获取成员邀请海报信息

`GET /try/share/poster?distributorId={distributorId}`

返回：

- `inviteCode`
- `posterUrl` 或二维码资源信息

---

## 七、验收标准

### 7.1 体验营邀请记录页

- [ ] 可展示邀请总人数与成功推荐总人数
- [ ] 可从页面进入团队管理页
- [ ] 支持状态筛选 UI
- [ ] 空状态、加载状态符合原型

### 7.2 团队管理页

- [ ] 可展示团队人数、总邀请数、成功推荐数
- [ ] 可新增团队成员，且名称与标签为必填
- [ ] 新成员提交后自动生成邀请码
- [ ] 可查看成员邀请海报
- [ ] 可查看成员详情
- [ ] 可触发删除确认弹窗
- [ ] 营期看板可按营期倒序展示

### 7.3 邀请明细页

- [ ] 可按成员 ID 加载当前成员信息
- [ ] 可展示四项统计数据
- [ ] 可按状态筛选邀请记录
- [ ] 可展示空状态与加载状态

### 7.4 业务一致性

- [ ] 删除成员后邀请码失效，但历史邀请记录保留
- [ ] 团队成员标签与邀请码绑定
- [ ] 通过成员邀请码产生的用户记录可追踪到成员与标签

---

## 八、当前原型与正式接入差异

- 当前原型大量数据来自前端本地 mock，不是真实接口
- `koc-team-main.html` 中 `phone` 字段保留在数据结构里，但添加弹窗未展示手机号输入
- 团队管理页删除成员后当前实现是重新加载 mock 数据，不是本地状态真实删除
- 邀请记录页的“生成邀请码”“切换历史数据”尚未接业务逻辑
- 邀请明细页顶部统计当前不随筛选切换

这些差异应在后续联调阶段逐步收敛。
