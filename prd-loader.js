/**
 * PRD Loader — 异步加载外部 PRD 内容并交给 prd-editor 初始化
 *
 * 用法：
 *   <aside class="prd-panel" data-prd-key="team-main" data-prd-src="prd/team-main.html"></aside>
 *
 * 加载流程：
 *   1. 找到所有带 data-prd-src 的 .prd-panel
 *   2. fetch 内容注入到 panel.innerHTML
 *   3. 调用 window.PRDEditor.initPanel(panel) 启用编辑能力
 */
(function () {
  'use strict';

  function showLoading(panel) {
    panel.innerHTML = '<div class="prd-loading">PRD 加载中…</div>';
  }

  function showError(panel, src, err) {
    panel.innerHTML = '<div class="prd-loading">PRD 加载失败：' + src + '<br>' +
      (err && err.message ? err.message : '') + '</div>';
  }

  async function loadPanel(panel) {
    const src = panel.dataset.prdSrc;
    if (!src) return;
    showLoading(panel);
    try {
      const res = await fetch(src, { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      panel.innerHTML = await res.text();
      if (window.PRDEditor && typeof window.PRDEditor.initPanel === 'function') {
        window.PRDEditor.initPanel(panel);
      }
    } catch (err) {
      console.warn('PRD Loader:', src, err);
      showError(panel, src, err);
    }
  }

  function initAll() {
    document.querySelectorAll('.prd-panel[data-prd-src]').forEach(loadPanel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.PRDLoader = { loadPanel: loadPanel };
})();
