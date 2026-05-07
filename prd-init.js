/**
 * PRD Init — 一行引入即可启用 PRD 标注面板
 *
 * 用法（在主页面只需要这两行）：
 *   <script src="prd/team-main.js"></script>            <!-- PRD 数据 -->
 *   <script src="prd-init.js" data-prd-key="team-main"></script>
 *
 * 本脚本自动完成：
 *   - 注入 PRD 触发按钮（右上角悬浮）
 *   - 注入 PRD 空面板容器（data-prd-key）
 *   - 注册 window.togglePRD()
 *   - 触发内容注入 + PRDEditor 初始化
 *
 * 依赖：
 *   - prd-editor.css / prd-editor.js（SCRM 通用编辑器）
 *   - prd-panel.css（移动端定位与按钮样式）
 *   - window.PRD_CONTENTS[key]（由 prd/{key}.js 注册）
 */
(function () {
  'use strict';

  var script = document.currentScript;
  var key = script && script.dataset.prdKey;
  if (!key) {
    console.warn('PRD Init: 缺少 data-prd-key 属性');
    return;
  }

  window.togglePRD = function () {
    document.body.classList.toggle('prd-on');
  };

  function injectAndLoad() {
    if (!document.body) return;

    // 注入按钮
    var btn = document.createElement('button');
    btn.className = 'prd-toggle';
    btn.onclick = window.togglePRD;
    btn.innerHTML = '<span class="dot"></span>PRD';
    document.body.appendChild(btn);

    // 注入面板
    var panel = document.createElement('aside');
    panel.className = 'prd-panel';
    panel.dataset.prdKey = key;
    document.body.appendChild(panel);

    // 注入内容
    var content = window.PRD_CONTENTS && window.PRD_CONTENTS[key];
    if (!content) {
      panel.innerHTML = '<div class="prd-loading">PRD 内容未注册：' + key + '</div>';
      return;
    }
    panel.innerHTML = content;

    // 启用编辑器
    if (window.PRDEditor && typeof window.PRDEditor.initPanel === 'function') {
      window.PRDEditor.initPanel(panel);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAndLoad);
  } else {
    injectAndLoad();
  }
})();
