(function () {
  'use strict';

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }
  function optionalJson(url) { return window.LoomDemo.fetch(url).then(function (response) { return response.ok ? response.json() : null; }).catch(function () { return null; }); }
  function when(value) { if (!value) return '时间未知'; var date = new Date(value); return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }); }
  function loadModel(apiBase) {
    return window.LoomDemo.fetch(apiBase + '/projects').then(function (response) { if (!response.ok) throw new Error('project unavailable'); return response.json(); }).then(function (project) {
      var projectId = encodeURIComponent(project.project_id);
      return Promise.all([
        Promise.resolve(project),
        window.LoomDemo.fetch(apiBase + '/projects/' + projectId + '/workspace-view').then(function (response) { if (!response.ok) throw new Error('workspace view unavailable'); return response.json(); }),
        optionalJson(apiBase + '/projects/' + projectId + '/knowledge'),
        optionalJson(apiBase + '/projects/' + projectId + '/workflow/view-runs'),
        optionalJson(apiBase + '/projects/' + projectId + '/workflow/skills')
      ]);
    }).then(function (results) {
      var model = results[1]; model.apiBase = apiBase; model.rawProject = results[0]; model.knowledgeSnapshot = results[2] || {}; model.workflows = results[3] && Array.isArray(results[3].runs) ? results[3].runs : []; model.skills = results[4] || {};
      var work = model.current_work || {};
      work.details = work.details || model.architecture.summary;
      if (!(work.turn && work.turn.technical_id)) work.summary = '尚无 Agent 工作记录';
      if (model.location.confidence !== 'source-backed' || !(work.turn && work.turn.technical_id)) {
        model.location.path = model.location.path.filter(function (item) { return item.level !== 'object'; });
        model.location.confidence = '位置未知';
      }
      model.scope = {};
      return model;
    });
  }
  function renderSummary(host, model) {
    var work = model.current_work || {}, architecture = model.architecture || {}, counts = architecture.counts || {}, last = (model.location.path || []).slice(-1)[0];
    host.innerHTML = '<div class="loom-console-stat is-project"><span>PROJECT</span><strong>' + esc(model.project.name) + '</strong><small>' + esc(work.goal_title) + '</small></div><div class="loom-console-stat is-state"><span>AGENT STATUS</span><strong><i></i>' + esc(work.status || 'idle') + '</strong><small>' + esc(work.session && work.session.title || '暂无活动会话') + '</small></div><div class="loom-console-stat"><span>CURRENT LOCATION</span><strong>' + esc(last && last.title || '项目全景') + '</strong><small>' + esc(model.location.confidence || 'projected') + '</small></div><div class="loom-console-stat"><span>TRUST + ATTENTION</span><strong>' + esc(architecture.trust_state || 'unknown') + '</strong><small>' + esc((counts.blocked || 0) + ' blocked · ' + (model.attention || []).length + ' attention') + '</small></div>';
  }
  function locationTree(path) { return (path || []).map(function (item, index) { return '<div class="loom-location-step"><span>' + (index ? '↳' : '●') + '</span><div><small>' + esc(item.level) + '</small><b>' + esc(item.title) + '</b></div></div>'; }).join(''); }
  function timelineType(event) { return event.event_type === 'turn' ? 'agent' : event.event_type === 'checkpoint' ? 'artifact' : 'hook'; }
  function renderTimeline(events, limit) {
    var visible = events.slice(0, limit || events.length);
    if (!visible.length) return '<div class="loom-knowledge-empty"><strong>暂无运行记录</strong><small>此快照未包含 Agent session、Turn 或 checkpoint 运行记录。</small></div>';
    return '<div class="loom-event-list">' + visible.map(function (event) { var type = timelineType(event); return '<article class="loom-event"><div class="loom-event-time">' + esc(when(event.occurred_at)) + '</div><div class="loom-event-marker is-' + type + '"></div><div class="loom-event-body"><div class="loom-event-head"><span class="loom-event-type is-' + type + '">' + esc(String(event.event_type || 'event').toUpperCase()) + '</span><b>' + esc(event.title) + '</b></div><p style="display:block">' + esc(event.summary || '') + '</p><div class="loom-event-meta" style="display:flex"><em>' + esc(event.status || 'unknown') + '</em>' + (event.tool_steps ? '<span>' + esc(event.tool_steps + ' tool steps') + '</span>' : '') + '</div></div></article>'; }).join('') + '</div>';
  }
  function attentionCard(item) { return '<article class="loom-attention-card is-pending"><div class="loom-attention-icon">!</div><div><span class="loom-event-type is-notification">' + esc(item.severity || 'attention') + '</span><h4>' + esc(item.title) + '</h4><p>' + esc(item.summary || '') + '</p></div></article>'; }
  function renderOverview(host, model) {
    var work = model.current_work || {}, next = work.next_action || {}, checkpoint = work.checkpoint, attention = model.attention || [];
    host.innerHTML = '<div class="loom-workbench-grid"><section class="loom-current-work"><div class="loom-console-card-kicker">CURRENT STATUS</div><div class="loom-current-work-head"><div><span class="loom-status-pill is-running"><i></i>' + esc(work.status || 'idle') + '</span><h3>' + esc(String(work.summary || '等待 Agent 工作记录').slice(0, 72)) + '</h3><details class="loom-project-details"><summary>查看项目背景</summary><p>' + esc(work.details || '') + '</p></details></div></div><dl class="loom-work-explain"><div><dt>下一步</dt><dd><b>' + esc(next.action || 'inspect_project') + '</b> · ' + esc(next.description || '查看项目视图') + '</dd></div><div><dt>可信度</dt><dd>' + esc(model.architecture && model.architecture.verification || '状态未知') + '</dd></div></dl><div class="loom-work-coordinates"><article><span>SESSION</span><b>' + esc(work.session && work.session.title || '暂无活动会话') + '</b><small>' + esc(work.session && work.session.status || 'idle') + '</small></article><article><span>TURN</span><b>' + esc(work.turn && work.turn.title || '暂无最近 Turn') + '</b><small>' + esc((work.turn && work.turn.tool_steps || 0) + ' tool steps') + '</small></article><article><span>CHECKPOINT</span><b>' + esc(checkpoint && checkpoint.title || '尚未保存语义检查点') + '</b><small>' + esc(checkpoint ? when(checkpoint.created_at) : '—') + '</small></article></div></section><aside class="loom-location-panel"><div class="loom-console-card-kicker">CURRENT LOCATION</div><h3>' + esc((model.location.path || []).slice(-1)[0] && (model.location.path || []).slice(-1)[0].title || '项目全景') + '</h3><div class="loom-location-path">' + locationTree(model.location.path) + '</div><button type="button" class="loom-control-btn is-quiet" data-jump="architecture">查看对应架构</button></aside></div><div class="loom-overview-lower"><section class="loom-overview-timeline"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">RECENT WORK</span><h3>最近发生了什么</h3></div><button type="button" class="loom-inline-link" data-jump="activity">查看任务记录</button></div>' + renderTimeline(model.timeline || [], 5) + '</section><aside class="loom-overview-attention"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">ATTENTION</span><h3>需要关注</h3></div><span class="loom-attention-count">' + attention.length + '</span></div>' + (attention.length ? attention.slice(0, 3).map(attentionCard).join('') : '<div class="loom-knowledge-empty"><strong>当前没有需要处理的事项</strong></div>') + '</aside></div>';
    bindInteractions(host);
  }
  function renderActivity(host, model) {
    var work = model.current_work || {};
    host.innerHTML = '<div class="loom-activity-layout"><section class="loom-activity-main"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">SESSION · TURN · CHECKPOINT</span><h3>Agent 工作时间线</h3></div><span class="loom-stream-indicator"><i></i>' + esc((model.timeline || []).length + ' records') + '</span></div>' + renderTimeline(model.timeline || []) + '</section><aside class="loom-activity-aside"><div class="loom-console-card-kicker">LATEST SESSION</div><h3>' + esc(work.session && work.session.title || '暂无活动会话') + '</h3><p class="loom-console-muted">' + esc(work.status === 'idle' ? '此快照未包含活动 Agent 会话，不代表当前实时运行状态。' : work.summary || '') + '</p><div class="loom-provenance-box"><span>STATUS</span><b>' + esc(work.status || 'idle') + '</b><small>技术 ID 只在对象详情中显示。</small></div></aside></div>';
  }
  function groupCard(group) {
    var preview = (group.objects || []).slice(0, 3).map(function (item) { return '<li><b>' + esc(item.title) + '</b><small>' + esc(item.summary) + '</small></li>'; }).join('');
    return '<article class="loom-architecture-group" data-group="' + esc(group.group_id) + '"><header><div><span>' + esc(group.count) + '</span><h4>' + esc(group.title) + '</h4></div><small>' + esc(group.description) + '</small></header><ul>' + preview + '</ul>' + (group.count > 3 ? '<button type="button" data-group-expand>查看全部 ' + group.count + ' 项</button>' : '') + '<div class="loom-group-all" hidden>' + (group.objects || []).map(function (item) { return '<button type="button" data-object-id="' + esc(item.object_id) + '"><b>' + esc(item.title) + '</b><small>' + esc(item.status + ' · ' + item.evidence_count + ' evidence') + '</small></button>'; }).join('') + '</div></article>';
  }
  function renderArchitecture(host, model) {
    var architecture = model.architecture || {}, flow = architecture.primary_flow || [];
    host.innerHTML = '<section class="loom-layered-architecture"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">TOP-DOWN ARCHITECTURE</span><h3>从系统主链路到风险与证据</h3></div><span class="loom-source-badge is-projected">' + esc(architecture.verification || 'unknown') + '</span></div><div class="loom-architecture-groups">' + (architecture.groups || []).map(groupCard).join('') + '</div><div class="loom-primary-flow"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">PRIMARY FLOW</span><h3>默认只显示主链路</h3></div><span class="loom-architecture-count">' + flow.length + ' key relations</span></div>' + (flow.length ? flow.map(function (item) { return '<div class="loom-flow-row"><b>' + esc(item.from_title) + '</b><span>' + esc(item.type) + ' →</span><b>' + esc(item.to_title) + '</b></div>'; }).join('') : '<div class="loom-knowledge-empty"><small>当前视图没有可识别的主链路。</small></div>') + '</div></section>';
    host.querySelectorAll('[data-group-expand]').forEach(function (button) { button.addEventListener('click', function () { var all = button.parentNode.querySelector('.loom-group-all'); all.hidden = !all.hidden; button.textContent = all.hidden ? '查看全部' : '收起'; }); });
    host.querySelectorAll('[data-object-id]').forEach(function (button) { button.addEventListener('click', function () { window.dispatchEvent(new CustomEvent('loom:architecture-select', { detail: { objectId: button.getAttribute('data-object-id') } })); }); });
  }
  function renderKnowledge(host, model) {
    var snapshot = model.knowledgeSnapshot || {}, objects = Array.isArray(snapshot.objects) ? snapshot.objects : [];
    if (!objects.length) { host.innerHTML = '<div class="loom-knowledge-empty"><strong>当前没有可用的项目事实投影</strong><small>先完成一次有证据的项目视图。</small></div>'; return; }
    var selectedId = model.knowledgeSelection && objects.some(function (entry) { return entry.object_id === model.knowledgeSelection; }) ? model.knowledgeSelection : objects[0].object_id, scope = model.scope;
    function draw() {
      var item = objects.find(function (entry) { return entry.object_id === selectedId; }) || objects[0];
      host.innerHTML = '<div class="loom-knowledge-layout"><section class="loom-knowledge-main"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">PROJECT KNOWLEDGE</span><h3>对象与证据</h3></div><span class="loom-source-badge is-projected">' + esc(snapshot.verification || 'unknown') + '</span></div><div class="loom-knowledge-list">' + objects.map(function (entry) { return '<button type="button" class="loom-knowledge-row ' + (entry.object_id === item.object_id ? 'is-selected' : '') + '" data-knowledge-id="' + esc(entry.object_id) + '"><span class="loom-knowledge-kind">' + esc(entry.kind) + '</span><span><b>' + esc(entry.title) + '</b><small>' + esc(entry.summary) + '</small></span><em>' + esc(entry.state) + '</em><i>' + (scope[entry.object_id] ? '已选' : '加入') + '</i></button>'; }).join('') + '</div></section><aside class="loom-knowledge-inspector"><div class="loom-console-card-kicker">SELECTED OBJECT</div><h3>' + esc(item.title) + '</h3><p>' + esc(item.summary) + '</p><div class="loom-knowledge-state"><span>TRUST</span><b>' + esc(item.state) + '</b><small>' + esc((item.claims || []).length + ' claims · ' + (item.evidence_ids || []).length + ' evidence') + '</small></div><div class="loom-knowledge-actions"><button type="button" class="loom-control-btn is-primary" data-knowledge-add>' + (scope[item.object_id] ? '移出工作范围' : '加入工作范围') + '</button><button type="button" class="loom-control-btn" data-knowledge-bundle>生成范围上下文</button></div><div class="loom-knowledge-bundle" data-bundle-host></div></aside></div>';
      host.querySelectorAll('[data-knowledge-id]').forEach(function (button) { button.addEventListener('click', function () { selectedId = button.getAttribute('data-knowledge-id'); draw(); }); });
      host.querySelector('[data-knowledge-add]').addEventListener('click', function () { if (scope[item.object_id]) delete scope[item.object_id]; else scope[item.object_id] = true; draw(); });
      var bundleButton = host.querySelector('[data-knowledge-bundle]');
      bundleButton.disabled = true;
      bundleButton.textContent = '范围上下文仅在本地工作台可用';
      bundleButton.title = '公开 Demo 不连接本地工作区；范围选择仅保存在此页面。';
    }
    draw();
  }
  function renderEvidence(host, model) {
    var snapshot = model.knowledgeSnapshot || {}, evidence = Array.isArray(snapshot.evidence) ? snapshot.evidence : [], objects = Array.isArray(snapshot.objects) ? snapshot.objects : [];
    var rows = evidence.map(function (item) { var linked = objects.filter(function (object) { return (object.evidence_ids || []).indexOf(item.evidence_id) !== -1; }).slice(0, 2); return '<details class="loom-evidence-card"><summary>' + esc(linked.map(function (object) { return object.title; }).join("、") || "未关联对象的来源") + ' · 依据待核验</summary><div class="loom-evidence-card-icon">?</div><div><b>' + esc(linked.map(function (object) { return object.title; }).join('、') || '架构对象') + '</b><p>' + esc(item.relation === 'implemented_by' ? '关联的代码或文档位置；内容与行为尚未核验。' : '该来源与对象存在关联。') + '</p><small>' + esc(item.locator || item.source_ref || '') + '</small></div><span class="loom-evidence-state">' + esc(item.status === 'locator_only' ? '仅有来源位置' : '尚待核验') + '</span></details>'; }).join('');
    host.innerHTML = '<div class="loom-evidence-layout"><section class="loom-evidence-main"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">EVIDENCE + TRUST</span><h3>证据能证明什么</h3></div><span class="loom-source-badge is-projected">' + esc(model.architecture.verification || 'unknown') + '</span></div><p class="loom-evidence-intro">证据把架构对象连接到可定位的代码或文档。当前视图使用它判断“是否有来源”，不会把来源位置误报成已经验证的行为。</p><div class="loom-change-summary"><div><span>OBJECTS</span><strong>' + esc(model.knowledge.mapped_objects || 0) + '</strong><small>已映射对象</small></div><div><span>LINKS</span><strong>' + esc(model.knowledge.evidence_links || 0) + '</strong><small>来源连接</small></div><div><span>TO VERIFY</span><strong>' + esc(model.knowledge.unverified_claims || 0) + '</strong><small>仍需验证</small></div></div><div class="loom-evidence-list">' + (rows || '<div class="loom-knowledge-empty"><strong>当前没有可用证据</strong><small>完成一次有来源的项目捕获后，这里会显示对象与来源的对应关系。</small></div>') + '</div></section><aside class="loom-evidence-side"><div class="loom-console-card-kicker">HOW TO READ</div><h3>证据状态</h3><div class="loom-provenance-box"><span>CURRENT VIEW</span><b>' + esc(model.architecture.trust_state || 'unknown') + '</b><small>' + esc(model.architecture.verification || '') + '</small></div><p class="loom-console-muted">先看对象，再看来源位置，最后看验证状态。点击架构对象可跳到它的主张与证据详情。</p><button type="button" class="loom-control-btn is-quiet" data-jump="knowledge">查看对象详情</button></aside></div>';
    bindInteractions(host);
  }
  function renderNotifications(host, model) { var attention = model.attention || []; host.innerHTML = '<div class="loom-notifications-layout"><section class="loom-inbox"><div class="loom-section-heading"><div><span class="loom-console-card-kicker">ATTENTION</span><h3>需要用户关注的状态</h3></div><span class="loom-attention-count">' + attention.length + ' pending</span></div>' + (attention.length ? attention.map(attentionCard).join('') : '<div class="loom-knowledge-empty"><strong>当前没有待处理状态</strong></div>') + '</section><aside class="loom-notification-rail"><div class="loom-console-card-kicker">READ MODEL</div><div class="loom-channel-card"><div class="loom-channel-mark is-local">◉</div><div><b>Human workspace view</b><small>状态、位置、信任与下一步</small></div><span class="loom-channel-state is-live">SNAPSHOT</span></div></aside></div>'; }
  function bindInteractions(host) { host.querySelectorAll('[data-jump]').forEach(function (button) { button.addEventListener('click', function () { var tab = document.querySelector('[data-console-view="' + button.getAttribute('data-jump') + '"]'); if (tab) tab.click(); }); }); }
  function mount(options) {
    var root = document.querySelector('.loom-project-console'); if (!root) return Promise.resolve();
    var summary = root.querySelector('#loom-console-summary'), viewHost = root.querySelector('#loom-console-view'), tabs = Array.prototype.slice.call(root.querySelectorAll('.loom-console-tab')), model = null;
    window.addEventListener('loom:architecture-select', function (event) {
      if (!model || !event.detail || !event.detail.objectId) return;
      var item = (model.knowledgeSnapshot.objects || []).find(function (entry) { return entry.object_id === event.detail.objectId; });
      if (!item) return;
      var dialog = document.querySelector('#loom-object-dialog');
      if (!dialog) { dialog = document.createElement('dialog'); dialog.id = 'loom-object-dialog'; root.appendChild(dialog); }
      var snapshot = model.knowledgeSnapshot;
      var claims = (snapshot.claims || []).filter(function (claim) { return claim.object_id === item.object_id; });
      var sources = (snapshot.evidence || []).filter(function (source) { return (item.evidence_ids || []).indexOf(source.evidence_id) !== -1; });
      dialog.innerHTML = '<form method="dialog"><button autofocus>关闭详情 · 返回原处</button></form><p>项目 / 对象详情</p><h2>' + esc(item.title) + '</h2><p>' + esc(item.summary) + '</p><h3>当前主张</h3>' + claims.map(function (claim) { return '<p>' + esc(claim.statement) + '</p>'; }).join('') + '<h3>依据与局限</h3><p>以下是关联来源位置，尚不能据此判断行为正确，也未确认来源是否仍然有效。</p>' + sources.map(function (source) { return '<p><code>' + esc(source.locator || source.source_ref) + '</code></p>'; }).join('');
      dialog.showModal();
    });
    function render(key) { if (!model) return; if (key === 'activity') renderActivity(viewHost, model); else if (key === 'architecture') renderArchitecture(viewHost, model); else if (key === 'knowledge') renderKnowledge(viewHost, model); else if (key === 'evidence') renderEvidence(viewHost, model); else if (key === 'notifications') renderNotifications(viewHost, model); else renderOverview(viewHost, model); }
    tabs.forEach(function (tab) { tab.addEventListener('click', function () { tabs.forEach(function (item) { item.classList.toggle('is-active', item === tab); item.setAttribute('aria-selected', String(item === tab)); }); render(tab.getAttribute('data-console-view')); }); });
    var apiBase = String((options && options.apiBase) || '').replace(/\/$/, '');
    return loadModel(apiBase).then(function (result) { model = result; renderSummary(summary, model); render('overview'); }).catch(function (error) { viewHost.innerHTML = '<div class="loom-console-loading is-error">项目工作台暂不可用：' + esc(error.message) + '</div>'; });
  }
  window.LoomProjectConsole = { mount: mount };
}());

