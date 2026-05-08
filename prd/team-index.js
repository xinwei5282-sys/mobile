window.PRD_CONTENTS = window.PRD_CONTENTS || {};
window.PRD_CONTENTS['team-index'] = `
<div class="prd-mobile-header">
  <div>
    <h2 class="prd-title">体验营邀请记录</h2>
    <div class="prd-mobile-meta">koc-team-index.html</div>
  </div>
  <button class="prd-close" onclick="togglePRD()">关闭</button>
</div>

<!-- 1. 顶部导航栏 -->
<div class="prd-section">
  <div class="prd-section-title blue">1. 顶部导航栏</div>
  <div class="prd-label">浏览器壳</div>
  <div class="prd-item">左侧关闭按钮（×）/ 中间站点信息 / 右侧更多按钮（⋯）仅作视觉展示</div>
  <div class="prd-label">页面标题栏</div>
  <div class="prd-item">标题：<strong>体验营邀请记录</strong></div>
  <div class="prd-item">右侧入口：<strong>团队管理 ></strong> → 跳转 koc-team-main.html</div>
</div>

<!-- 2. 顶部统计 -->
<div class="prd-section">
  <div class="prd-section-title green">2. 顶部统计</div>
  <div class="prd-item"><strong>已邀请总人数</strong>：invitationStats.totalInvite</div>
  <div class="prd-item"><strong>成功推荐总人数</strong>：invitationStats.totalConvert</div>
  <div class="prd-item">每项右侧保留 <strong>ⓘ</strong> 口径说明入口</div>
</div>

<!-- 3. 操作区 -->
<div class="prd-section">
  <div class="prd-section-title orange">3. 操作区</div>
  <div class="prd-item"><strong>生成邀请码</strong>：当前为占位按钮，未接业务逻辑</div>
  <div class="prd-item"><strong>切换历史数据</strong>：当前为占位按钮，未接业务逻辑</div>
</div>

<!-- 4. Tab 与筛选 -->
<div class="prd-section">
  <div class="prd-section-title blue">4. Tab 与筛选</div>
  <div class="prd-item">两个 Tab：<strong>邀请进度</strong>（默认） / <strong>营期看板</strong></div>
  <div class="prd-item">筛选项：全部 / 推荐成功 / 已领卡 / 已入营 / 未入营</div>
  <div class="prd-item">激活态：主色底 #5dd4cc + 白字</div>
</div>

<!-- 5. 内容区 -->
<div class="prd-section">
  <div class="prd-section-title green">5. 内容区</div>
  <div class="prd-label">邀请进度</div>
  <div class="prd-item">列表项字段：头像 / 微信昵称 / 状态文案 / 添加时间</div>
  <div class="prd-item">空状态：插画 + "暂无数据"</div>
  <div class="prd-item">加载态：spinner + "加载中..."</div>
  <div class="prd-label">营期看板</div>
  <div class="prd-item">当前仅展示空态："功能开发中..."</div>
</div>

<!-- 6. 数据模型 -->
<div class="prd-section">
  <div class="prd-section-title orange">6. 数据模型</div>
  <div class="prd-label">invitationStats</div>
  <div class="prd-item">totalInvite / totalConvert</div>
  <div class="prd-label">invitationList[i]</div>
  <div class="prd-item">id / wxName / status / statusDesc / addTime</div>
  <div class="prd-label">filterStatus</div>
  <div class="prd-item">'' / xq_paid / xq_tried / room_entered / room_not_enter</div>
</div>
`;
