window.PRD_CONTENTS = window.PRD_CONTENTS || {};
window.PRD_CONTENTS['team-main'] = `
<div class="prd-mobile-header">
  <div>
    <h2 class="prd-title">团队管理</h2>
    <div class="prd-mobile-meta">koc-team-main.html</div>
  </div>
  <button class="prd-close" onclick="togglePRD()">关闭</button>
</div>

<!-- 1. 需求概述 -->
<div class="prd-section">
  <div class="prd-section-title orange">1. 需求概述</div>
  <div class="prd-label">背景</div>
  <div class="prd-item">KOC 推广员需要一个团队管理工具，帮助招募下属并追踪每个下属在不同体验营期的邀请数据</div>
  <div class="prd-label">目标</div>
  <div class="prd-item">查看团队整体邀请数据（人数 / 已邀请 / 成功推荐）</div>
  <div class="prd-item">管理下属（添加 / 删除 / 查看邀请码 / 查看明细）</div>
  <div class="prd-item">按营期维度看每个下属的邀请漏斗数据</div>
  <div class="prd-label">用户角色</div>
  <div class="prd-item"><strong>KOC</strong>：拥有团队管理权限的推广员</div>
</div>

<!-- 2. 顶部数据统计 -->
<div class="prd-section">
  <div class="prd-section-title green">2. 顶部数据统计</div>
  <div class="prd-label">展示字段（3 列）</div>
  <div class="prd-item"><strong>团队人数</strong>：当前 KOC 名下下属总数</div>
  <div class="prd-item"><strong>已邀请总数</strong>：团队累计已发送的邀请人数</div>
  <div class="prd-item"><strong>成功推荐人数</strong>：团队累计推荐成功（已转化）人数</div>
  <div class="prd-label">交互</div>
  <div class="prd-item">每个字段右侧带 ⓘ 图标，点击可查看口径说明（待实现）</div>
</div>

<!-- 3. 标题栏 -->
<div class="prd-section">
  <div class="prd-section-title blue">3. 标题栏</div>
  <div class="prd-item"><strong>左侧</strong>：返回按钮 + "团队管理"标题</div>
  <div class="prd-item"><strong>右侧</strong>："+ 团队成员"按钮，点击弹出添加下属表单</div>
</div>

<!-- 4. Tab 切换 -->
<div class="prd-section">
  <div class="prd-section-title orange">4. Tab 切换</div>
  <div class="prd-item">两个 Tab：<strong>团队进度</strong>（默认） / <strong>营期看板</strong></div>
  <div class="prd-item">激活 Tab 文字加粗 + 底部 3px 主色 #5dd4cc 横线</div>
</div>

<!-- 5. 团队进度（成员卡片列表） -->
<div class="prd-section">
  <div class="prd-section-title green">5. 团队进度（成员卡片）</div>
  <div class="prd-label">列表规则</div>
  <div class="prd-item">按 <strong>joinTime 倒序</strong>，新添加的成员排在最前</div>
  <div class="prd-item">空状态：📋 + "暂无数据"</div>
  <div class="prd-label">卡片字段</div>
  <div class="prd-item"><strong>头部</strong>：成员名称（大字）+ 标签（绿色徽章），电话单独一行</div>
  <div class="prd-item"><strong>数据区（4 列）</strong>：邀请总人数 / 已领卡 / 已入营 / 未入营</div>
  <div class="prd-item"><strong>操作区（3 按钮）</strong>：查看详情 / 查看邀请码（主色）/ 删除（红色）</div>
  <div class="prd-label">交互</div>
  <div class="prd-item"><strong>查看详情</strong>：跳转 koc-team-detail.html?id={id}&code={code}</div>
  <div class="prd-item"><strong>查看邀请码</strong>：弹出邀请海报，支持长按下载图片</div>
  <div class="prd-item"><strong>删除</strong>：弹出二次确认弹窗，确认后从列表移除</div>
</div>

<!-- 6. 营期看板 -->
<div class="prd-section">
  <div class="prd-section-title green">6. 营期看板（表格）</div>
  <div class="prd-label">行：每个营期 × 每个成员一行（按营期倒序、成员 ID 正序）</div>
  <div class="prd-label">列字段（6 列）</div>
  <div class="prd-item"><strong>营期</strong>：体验营期数，如"第113期"</div>
  <div class="prd-item"><strong>成员</strong>：下属姓名</div>
  <div class="prd-item"><strong>已邀请</strong>：该成员在该营期的邀请人数</div>
  <div class="prd-item"><strong>已入营</strong>：已加入营群的人数</div>
  <div class="prd-item"><strong>已领卡</strong>：已领取体验卡的人数</div>
  <div class="prd-item"><strong>推荐成功</strong>：转化成功的人数</div>
  <div class="prd-label">视觉规则</div>
  <div class="prd-item">表头浅绿背景 #e8f5f4</div>
  <div class="prd-item">偶数营期行用浅色 #fafcfc 背景区分（同营期分组）</div>
  <div class="prd-item">数字 0 显示为 "—" 弱化视觉</div>
  <div class="prd-item">漏斗式分层配色：已邀请灰 / 已入营深 / 已领卡绿 / 推荐成功绿</div>
  <div class="prd-item">表格一屏全部展示，不横向滚动</div>
</div>

<!-- 7. 添加下属弹窗 -->
<div class="prd-section">
  <div class="prd-section-title blue">7. 添加下属弹窗</div>
  <div class="prd-label">表单字段</div>
  <div class="prd-item"><strong>成员名称</strong>：必填，非空校验</div>
  <div class="prd-item"><strong>标签</strong>：必填，自由输入（如"微信群1"、"朋友圈"）</div>
  <div class="prd-label">业务逻辑</div>
  <div class="prd-item">提交后<strong>自动生成 6 位邀请码</strong>（KOC_M_xxxxxx）</div>
  <div class="prd-item">用户通过该邀请码加入营时，<strong>自动打上该标签</strong>，便于 KOC 业务管理</div>
  <div class="prd-item">新成员 joinTime 取当前时间，列表排到最前</div>
</div>

<!-- 8. 邀请海报弹窗 -->
<div class="prd-section">
  <div class="prd-section-title blue">8. 邀请海报弹窗</div>
  <div class="prd-item">展示成员邀请海报（含邀请码、二维码占位、宣传文案）</div>
  <div class="prd-item">支持<strong>长按下载图片</strong>（html2canvas 转图）</div>
  <div class="prd-item">下载文件名：邀请海报_{成员名}_{时间戳}.png</div>
</div>

<!-- 9. 删除确认弹窗 -->
<div class="prd-section">
  <div class="prd-section-title red">9. 删除确认弹窗</div>
  <div class="prd-item">使用<strong>自定义弹窗</strong>而非浏览器原生 confirm()</div>
  <div class="prd-item">提示："确定删除该团队成员？"</div>
  <div class="prd-item">两个按钮：取消 / 删除（红色）</div>
</div>
`;
