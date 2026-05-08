window.PRD_CONTENTS = window.PRD_CONTENTS || {};
window.PRD_CONTENTS['team-main'] = `
<div class="prd-mobile-header">
  <div>
    <h2 class="prd-title">团队管理</h2>
    <div class="prd-mobile-meta">koc-team-main.html</div>
  </div>
  <button class="prd-close" onclick="togglePRD()">关闭</button>
</div>

<!-- 1. 标题栏 -->
<div class="prd-section">
  <div class="prd-section-title blue">1. 标题栏</div>
  <div class="prd-label">左侧</div>
  <div class="prd-item">返回按钮（&lt;）→ 调用 <strong>window.history.back()</strong></div>
  <div class="prd-item">页面标题：<strong>团队管理</strong></div>
  <div class="prd-label">右侧</div>
  <div class="prd-item"><strong>➕ 团队成员</strong> 按钮 → 弹出"添加团队成员"表单</div>
</div>

<!-- 2. 顶部数据统计 -->
<div class="prd-section">
  <div class="prd-section-title green">2. 顶部数据统计（3 列）</div>
  <div class="prd-item"><strong>团队人数</strong>（teamStats.totalMembers）：当前 KOC 名下下属总数</div>
  <div class="prd-item"><strong>已邀请总数</strong>（teamStats.totalInviteCount）：团队累计已发送的邀请人数</div>
  <div class="prd-item"><strong>成功推荐人数</strong>（teamStats.totalConvert）：团队累计推荐成功（已转化）人数</div>
  <div class="prd-label">交互</div>
  <div class="prd-item">每个字段右侧带 <strong>ⓘ</strong> 图标，点击查看口径说明（待实现）</div>
</div>

<!-- 3. Tab 切换 -->
<div class="prd-section">
  <div class="prd-section-title orange">3. Tab 切换</div>
  <div class="prd-item">两个 Tab：<strong>团队进度</strong>（progress，默认） / <strong>营期看板</strong>（board）</div>
  <div class="prd-item">激活 Tab：文字加粗 + 底部 3px 主色 #5dd4cc 横线</div>
</div>

<!-- 4. 团队进度（成员卡片列表） -->
<div class="prd-section">
  <div class="prd-section-title green">4. 团队进度（成员卡片）</div>
  <div class="prd-label">列表规则</div>
  <div class="prd-item">按 <strong>joinTime 倒序</strong>，新添加成员排在最前</div>
  <div class="prd-item">空状态：📋 + "暂无数据"</div>
  <div class="prd-label">卡片字段</div>
  <div class="prd-item"><strong>头部第一行</strong>：成员名称（distributorName）+ 标签徽章（tag，浅绿底）</div>
  <div class="prd-item"><strong>头部第二行</strong>：手机号（distributorPhone，浅灰）</div>
  <div class="prd-label">数据区（4 列等分）</div>
  <div class="prd-item"><strong>邀请总人数</strong>（inviteCount）</div>
  <div class="prd-item"><strong>已领卡</strong>（tryCount）</div>
  <div class="prd-item"><strong>已入营</strong>（chatCount）</div>
  <div class="prd-item"><strong>未入营</strong>（notEnterCount）</div>
  <div class="prd-label">操作区（3 按钮等分一行）</div>
  <div class="prd-item"><strong>查看详情</strong>（中性）→ 跳转 koc-team-detail.html?id={distributorId}&code={inviteCode}</div>
  <div class="prd-item"><strong>查看邀请码</strong>（主色）→ 弹出邀请海报</div>
  <div class="prd-item"><strong>删除</strong>（红色）→ 弹出二次确认</div>
</div>

<!-- 5. 营期看板表格 -->
<div class="prd-section">
  <div class="prd-section-title green">5. 营期看板（表格）</div>
  <div class="prd-label">行</div>
  <div class="prd-item">每个营期 × 每个成员一行；按<strong>营期倒序</strong>，同营期内按成员 ID 正序</div>
  <div class="prd-item">数据来源：member.periods 数组（每条 { num, invited, joined, card, success }）</div>
  <div class="prd-label">列字段（6 列）</div>
  <div class="prd-item"><strong>营期</strong>：显示"第N期"，列宽 18%</div>
  <div class="prd-item"><strong>成员</strong>：下属姓名（distributorName），列宽 14%</div>
  <div class="prd-item"><strong>已邀请</strong>（invited）：列宽 17%</div>
  <div class="prd-item"><strong>已入营</strong>（joined）：列宽 17%</div>
  <div class="prd-item"><strong>已领卡</strong>（card）：列宽 17%</div>
  <div class="prd-item"><strong>推荐成功</strong>（success）：列宽 17%</div>
  <div class="prd-label">视觉规则</div>
  <div class="prd-item">表头浅绿底 #e8f5f4</div>
  <div class="prd-item">偶数营期行用 #fafcfc 浅底分组</div>
  <div class="prd-item">数字 0 显示为 "—"，颜色 #d0d0d0 弱化</div>
  <div class="prd-item">漏斗式分层配色：已邀请灰 #999 / 已入营深 #333 / 已领卡绿 #5dd4cc / 推荐成功绿 #5dd4cc</div>
  <div class="prd-item">表格一屏全部展示，不横向滚动</div>
</div>

<!-- 6. 添加团队成员弹窗 -->
<div class="prd-section">
  <div class="prd-section-title blue">6. 添加团队成员弹窗</div>
  <div class="prd-label">触发</div>
  <div class="prd-item">标题栏右侧"➕ 团队成员"按钮 → showAddModal = true</div>
  <div class="prd-label">表单字段</div>
  <div class="prd-item"><strong>成员名称</strong>（formData.name）— 必填，placeholder "请输入成员名称"</div>
  <div class="prd-item"><strong>标签</strong>（formData.tag）— 必填，placeholder "如：微信群1、朋友圈等"</div>
  <div class="prd-label">校验</div>
  <div class="prd-item">名称非空 / 标签非空，否则不允许提交</div>
  <div class="prd-label">业务逻辑</div>
  <div class="prd-item">提交后<strong>自动生成 6 位邀请码</strong>：KOC_M_xxxxxx</div>
  <div class="prd-item">用户通过该邀请码加入营时<strong>自动打上标签</strong>，便于业务分类管理</div>
  <div class="prd-item">新成员 joinTime 取当前时间，列表自动排到最前</div>
  <div class="prd-label">按钮</div>
  <div class="prd-item">取消（白底）/ 添加（主色）</div>
</div>

<!-- 7. 邀请海报弹窗 -->
<div class="prd-section">
  <div class="prd-section-title blue">7. 邀请海报弹窗</div>
  <div class="prd-label">触发</div>
  <div class="prd-item">成员卡片"查看邀请码"按钮 → showInvitePosterModal = true</div>
  <div class="prd-label">海报内容（poster-image）</div>
  <div class="prd-item">品牌头："生财有术 | 第十年 80000+ 创业者同行"</div>
  <div class="prd-item">主标题："加入生财有术，开启财富之路"</div>
  <div class="prd-item">描述：{成员名} 邀请您加入生财有术社群，获得独家体验卡和推荐奖励</div>
  <div class="prd-item">徽章："深耕至第 10 年，累计 80000+ 会员加入"</div>
  <div class="prd-item">二维码区：📲 占位 + 邀请码（inviteCode）+ "扫码免费领体验卡"</div>
  <div class="prd-item">底部提示："💡 长按图片保存到相册分享"</div>
  <div class="prd-label">操作</div>
  <div class="prd-item"><strong>⬇️ 保存海报</strong> 按钮 → html2canvas 转图，自动下载</div>
  <div class="prd-item">下载文件名：邀请海报_{distributorName}_{时间戳}.png</div>
</div>

<!-- 8. 删除确认弹窗 -->
<div class="prd-section">
  <div class="prd-section-title red">8. 删除确认弹窗</div>
  <div class="prd-label">触发</div>
  <div class="prd-item">成员卡片"删除"按钮 → showDeleteConfirmModal = true</div>
  <div class="prd-label">弹窗内容</div>
  <div class="prd-item">图标：⚠️</div>
  <div class="prd-item">标题：<strong>确定删除？</strong></div>
  <div class="prd-item">提示："删除后，{distributorName} 的邀请码将失效，但已有的邀请记录将保留。"</div>
  <div class="prd-label">按钮</div>
  <div class="prd-item">取消（白底）/ 删除（红色）</div>
  <div class="prd-item">使用<strong>自定义弹窗</strong>而非浏览器原生 confirm()</div>
</div>

<!-- 9. 数据模型 -->
<div class="prd-section">
  <div class="prd-section-title orange">9. 数据模型</div>
  <div class="prd-label">teamStats</div>
  <div class="prd-item">totalMembers / totalInviteCount / totalConvert</div>
  <div class="prd-label">teamMembers[i]</div>
  <div class="prd-item">distributorId / distributorName / distributorPhone / inviteCode / tag / joinTime / status</div>
  <div class="prd-item">inviteCount / tryCount / chatCount / notEnterCount（漏斗 4 项）</div>
  <div class="prd-item">periods[]（营期数组）：{ num, invited, joined, card, success }</div>
  <div class="prd-label">formData（添加表单）</div>
  <div class="prd-item">name / tag</div>
</div>
`;
