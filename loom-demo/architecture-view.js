(function () {
  'use strict';

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>\"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function mount(options) {
    var host = document.getElementById('architecture-likec4-host');
    var status = document.getElementById('architecture-view-status');
    var meta = document.getElementById('architecture-view-meta');
    if (!host || !status) return Promise.resolve();
    var apiBase = String((options && options.apiBase) || '').replace(/\/$/, '');
    status.textContent = 'Loading published architecture…';
    return window.LoomDemo.fetch(apiBase + '/projects').then(function (response) {
      if (!response.ok) throw new Error('project unavailable: ' + response.status);
      return response.json();
    }).then(function (project) {
      var projectId = project.project_id;
      if (!projectId) throw new Error('project is not initialized');
      return window.LoomDemo.fetch(apiBase + '/projects/' + encodeURIComponent(projectId) + '/architecture').then(function (response) {
        if (!response.ok) throw new Error('architecture unavailable: ' + response.status);
        return response.json();
      });
    }).then(function (architecture) {
      var version = architecture.version || {};
      if (!version.view_hash) {
        status.textContent = '尚未发布 architecture view；等待第一个有效 Turn Report。';
        meta.textContent = 'Agent-declared · Unverified · no published version';
        host.innerHTML = '<div class="loom-architecture-empty"><span>◌</span><strong>等待真实项目架构</strong><small>Turn Report 中的 view_delta 通过发布校验后，这里会生成 LikeC4 版本。</small></div>';
        return architecture;
      }
      return window.LoomDemo.fetch(apiBase + '/projects/' + encodeURIComponent(architecture.project_id) + '/architecture/assets/manifest.json').then(function (response) {
        if (!response.ok) throw new Error('manifest unavailable: ' + response.status);
        return response.json();
      }).then(function (manifest) {
        renderManifest(host, manifest);
        status.textContent = '已发布的项目视图';
        meta.textContent = '从系统区域逐层展开；来源关联不等于行为已验证。';
        return architecture;
      });
    }).catch(function (error) {
      status.textContent = 'Architecture view unavailable';
      if (meta) meta.textContent = error.message;
      host.innerHTML = '<div class="loom-architecture-empty is-error"><strong>无法读取 architecture view</strong><small>' + esc(error.message) + '</small></div>';
    });
  }

  function renderManifest(host, manifest) {
    if (manifest.conceptual_architecture) { renderConceptual(host, manifest); bindArchitectureSelection(host, manifest); return; }
    renderLayerLandscape(host, manifest);
    bindArchitectureSelection(host, manifest);
  }

  function renderConceptual(host, manifest) {
    var model = manifest.conceptual_architecture, names = {};
    (model.concepts || []).forEach(function (c) { names[c.id] = c.title; });
    var order = { environment:0, core:1, capability:2, support:3 };
    host.innerHTML = '<div class="loom-architecture-toolbar"><b>'+esc(model.thesis)+'</b></div><div class="loom-landscape-regions">'+model.concepts.slice().sort(function(a,b){return order[a.role]-order[b.role];}).map(function(c){
      var links = model.relationships.filter(function(r){return r.from===c.id;});
      return '<details class="loom-region" data-concept-role="'+esc(c.role)+'"><summary><h3>'+esc(c.title)+'</h3><small>'+esc(c.id===model.central_concept?'系统核心':c.role==='environment'?'外部环境与服务':'围绕核心的能力与机制')+'</small></summary><p>'+esc(c.summary)+'</p>'+links.map(function(r){return '<p><b>'+esc(r.label)+' → '+esc(names[r.to])+'</b><br>'+esc(r.transfer)+'<br>生效条件：'+esc(r.activation)+'</p>';}).join('')+'<div>'+c.component_refs.map(function(id){var n=(manifest.nodes||[]).find(function(n){return n.id===id;});return '<button type="button" data-node-id="'+esc(id)+'">'+esc(n?n.title:id)+'</button>';}).join('')+'</div></details>';
    }).join('')+'</div>';
  }

  function renderLayerLandscape(host, manifest) {
    var raw = manifest.nodes || [], layers = (manifest.runtime_layers || []).slice().sort(function (a,b) { return a.order-b.order; });
    if (!layers.length) layers = [{ id: 'system', title: '系统模块', component_refs: raw.map(function (n) { return n.id; }) }];
    var assigned = {}, groups = layers.map(function (layer) {
      var members = raw.filter(function (n) { return !assigned[n.id] && ((layer.component_refs || []).indexOf(n.id) >= 0 || n.layer === layer.id); });
      members.forEach(function (n) { assigned[n.id] = layer.id; });
      return { id: layer.id, title: layer.title, members: members };
    }).filter(function (g) { return g.members.length; });
    var rest = raw.filter(function (n) { return !assigned[n.id]; });
    if (rest.length) groups.push({ id: 'other', title: '其他对象与约束', members: rest });
    if (groups.length > 6) groups = groups.slice(0,5).concat([{ id:'other', title:'其他系统区域', members: groups.slice(5).reduce(function (all,g) { return all.concat(g.members); },[]) }]);
    var owners = {}; groups.forEach(function (g,i) { g.members.forEach(function (n) { owners[n.id] = i; }); });
    var pairs = {};
    (manifest.flows || manifest.relations || []).forEach(function (r) { var a=owners[r.from], b=owners[r.to]; if(a === undefined || b === undefined || a === b) return; var key=Math.min(a,b)+'-'+Math.max(a,b); pairs[key]=(pairs[key]||0)+1; });
    host.innerHTML = '<div class="loom-architecture-toolbar"><b>HIGH-LEVEL LANDSCAPE · 系统全景</b><span>展开区域查看模块</span></div><div class="loom-landscape-regions">' + groups.map(function (g,i) {
      var links = Object.keys(pairs).filter(function (key) { return key.split('-').indexOf(String(i)) >= 0; }).map(function (key) { var other=key.split('-').map(Number).filter(function (x) { return x!==i; })[0]; return groups[other].title; });
      return '<details class="loom-region"><summary><span>0'+(i+1)+'</span><h3>'+esc(g.title)+'</h3><small>'+g.members.length+' 个模块 / 对象</small></summary><div>'+g.members.map(function (n) { return '<button type="button" data-node-id="'+esc(n.id)+'">'+esc(n.title || n.id)+'</button>'; }).join('')+'</div><p>关联区域：'+esc(links.join('、') || '暂无已记录关系')+'</p></details>';
    }).join('')+'</div><details class="loom-project-details"><summary>查看区域之间的连接（'+Object.keys(pairs).length+'）</summary>'+Object.keys(pairs).map(function(key){var ids=key.split('-').map(Number);return '<p>'+esc(groups[ids[0]].title)+' ↔ '+esc(groups[ids[1]].title)+' · '+pairs[key]+' 条来源关系</p>';}).join('')+'</details>';
  }


  function mermaidDiagram(manifest) {
    var nodes = manifest.nodes || [], ids = Object.create(null), lines = ['flowchart LR'];
    function label(value) { return String(value || '').replace(/["\x60<>\r\n]/g, ' '); }
    nodes.forEach(function(node, i) { ids[node.id] = 'n' + i; lines.push('  n' + i + '["' + label(node.title || node.id) + '"]'); });
    (manifest.relations || []).forEach(function(r) {
      if (ids[r.from] && ids[r.to]) lines.push('  ' + ids[r.from] + ' -->|' + label(r.type) + '| ' + ids[r.to]);
    });
    return lines.join('\n');
  }

  function dispatchArchitectureSelection(objectId) {
    if (objectId && window.dispatchEvent) window.dispatchEvent(new CustomEvent('loom:architecture-select', { detail: { objectId: objectId } }));
  }
  function bindArchitectureSelection(host) {
    if (!host.querySelectorAll) return;
    host.querySelectorAll('[data-node-id]').forEach(function(node) {
      node.addEventListener('click', function() { dispatchArchitectureSelection(node.getAttribute('data-node-id')); });
    });
  }
  window.LoomArchitectureView = { mount: mount, mermaidDiagram: mermaidDiagram };
}());

