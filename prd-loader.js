/**
 * PRD Loader — 从 window.PRD_CONTENTS 读取 PRD 内容并初始化编辑器
 *
 * 用法：
 *   1. 引入对应的 PRD 数据脚本：<script src="prd/team-main.js"></script>
 *      该脚本会注册：window.PRD_CONTENTS['team-main'] = '<HTML 字符串>';
 *   2. 主页面加空 panel：<aside class="prd-panel" data-prd-key="team-main"></aside>
 *   3. 引入 prd-editor.js + prd-loader.js
 *
 * 优点：
 *   - 不依赖 fetch，file:// 协议下也能工作
 *   - PRD 内容独立于主 HTML，便于维护
 */
(function () {
  'use strict';

  function showError(panel, key) {
    panel.innerHTML = '<div class="prd-loading">PRD 内容未注册：' + key + '<br>请检查是否引入对应的 prd/*.js 数据脚本</div>';
  }

  function loadPanel(panel) {
    const key = panel.dataset.prdKey;
    if (!key) return;
    const content = window.PRD_CONTENTS && window.PRD_CONTENTS[key];
    if (!content) {
      showError(panel, key);
      return;
    }
    panel.innerHTML = content;
    if (window.PRDEditor && typeof window.PRDEditor.initPanel === 'function') {
      window.PRDEditor.initPanel(panel);
    }
  }

  function initAll() {
    document.querySelectorAll('.prd-panel[data-prd-key]').forEach(loadPanel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.PRDLoader = { loadPanel: loadPanel };
})();
