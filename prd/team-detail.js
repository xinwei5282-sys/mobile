window.PRD_CONTENTS = window.PRD_CONTENTS || {};
window.PRD_CONTENTS['team-detail'] = `
<div class="prd-mobile-header">
  <div>
    <h2 class="prd-title">邀请明细</h2>
    <div class="prd-mobile-meta">koc-team-detail.html</div>
  </div>
  <button class="prd-close" onclick="togglePRD()">关闭</button>
</div>

<!-- 1. 顶部导航栏 -->
<div class="prd-section">
  <div class="prd-section-title blue">1. 顶部导航栏</div>
  <div class="prd-label">浏览器壳</div>
  <div class="prd-item">左侧关闭按钮（×）/ 中间站点信息 / 右侧更多按钮（⋯）仅作壳层展示，不承载业务交互</div>
  <div class="prd-label">页面标题栏</div>
  <div class="prd-item">左侧返回按钮（‹）→ 调用 <strong>window.history.back()</strong></div>
  <div class="prd-item">标题：<strong>邀请明细</strong></div>
</div>

<!-- 2. 成员信息卡 -->
<div class="prd-section">
  <div class="prd-section-title green">2. 成员信息卡</div>
  <div class="prd-label">字段</div>
  <div class="prd-item"><strong>成员名称</strong>：memberInfo.distributorName</div>
  <div class="prd-item"><strong>标签</strong>：memberInfo.tag，浅绿底徽章展示</div>
  <div class="prd-label">来源</div>
  <div class="prd-item">页面从 URL 读取 <strong>id</strong> 参数，用于定位当前下属详情</div>
</div>

<!-- 3. 顶部统计卡 -->
<div class="prd-section">
  <div class="prd-section-title orange">3. 顶部统计卡（4 列）</div>
  <div class="prd-item"><strong>邀请总数</strong>：filteredStats.totalInvite</div>
  <div class="prd-item"><strong>转化总数</strong>：filteredStats.totalConvert</div>
  <div class="prd-item"><strong>已领卡</strong>：filteredStats.tryCount</div>
  <div class="prd-item"><strong>已入营</strong>：filteredStats.chatCount</div>
  <div class="prd-label">说明</div>
  <div class="prd-item">当前实现中统计区不随筛选变化，始终展示该成员全量累计数据</div>
</div>

<!-- 4. 状态筛选 -->
<div class="prd-section">
  <div class="prd-section-title blue">4. 状态筛选</div>
  <div class="prd-label">筛选项</div>
  <div class="prd-item">全部（空值）/ 推荐成功（xq_paid）/ 已领卡（xq_tried）/ 已入营（room_entered）/ 未入营（room_not_enter）</div>
  <div class="prd-label">交互</div>
  <div class="prd-item">点击筛选 Tab → 更新 filterStatus，并按 status 过滤 invitationList</div>
  <div class="prd-item">激活态：主色底 #5dd4cc + 白字</div>
</div>

<!-- 5. 邀请记录列表 -->
<div class="prd-section">
  <div class="prd-section-title green">5. 邀请记录列表</div>
  <div class="prd-label">列表项字段</div>
  <div class="prd-item"><strong>头像</strong>：item.wxAvatar</div>
  <div class="prd-item"><strong>微信名</strong>：item.wxName</div>
  <div class="prd-item"><strong>添加时间</strong>：item.externalUserWorkAddTime</div>
  <div class="prd-item"><strong>状态文案</strong>：item.statusDesc</div>
  <div class="prd-label">空态 / 加载态</div>
  <div class="prd-item">无数据：📭 + "暂无邀请记录"</div>
  <div class="prd-item">加载中：spinner + "加载中..."</div>
</div>

<!-- 6. 数据模型 -->
<div class="prd-section">
  <div class="prd-section-title orange">6. 数据模型</div>
  <div class="prd-label">memberInfo</div>
  <div class="prd-item">distributorName / inviteCode / tag</div>
  <div class="prd-label">stats</div>
  <div class="prd-item">totalInvite / totalConvert / tryCount / chatCount</div>
  <div class="prd-label">filterStatus</div>
  <div class="prd-item">'' / xq_paid / xq_tried / room_entered / room_not_enter</div>
  <div class="prd-label">invitationList[i]</div>
  <div class="prd-item">id / wxName / wxAvatar / externalUserWorkAddTime / statusDesc / status</div>
</div>
`;
