const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'loom-demo');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
class Element {
  constructor(attrs = {}) { this.attrs = attrs; this.innerHTML = ''; this.children = new Map(); this.handlers = {}; this.classList = { toggle() {} }; }
  querySelector(key) { if (!this.children.has(key)) this.children.set(key, new Element()); return this.children.get(key); }
  querySelectorAll() { return []; }
  addEventListener(type, fn) { this.handlers[type] = fn; }
  getAttribute(key) { return this.attrs[key]; }
  setAttribute(key, value) { this.attrs[key] = value; }
  appendChild(child) { this.child = child; }
  showModal() { this.open = true; }
  click() { return this.handlers.click?.call(this); }
}
async function main() {
  const elements = new Map();
  const get = key => { if (!elements.has(key)) elements.set(key, new Element()); return elements.get(key); };
  const tabs = ['overview','architecture','activity','evidence','knowledge','notifications'].map(key => new Element({'data-console-view': key}));
  const consoleRoot = get('.loom-project-console');
  consoleRoot.querySelectorAll = () => tabs;
  const events = {};
  const window = { addEventListener: (key, fn) => events[key] = fn };
  const context = vm.createContext({window, document: { getElementById: get, querySelector: key => key === '#loom-object-dialog' ? null : get(key), createElement: () => new Element() }, console});
  for (const file of ['snapshot.js','architecture-view.js','loom-project-console.js']) vm.runInContext(read(file), context, {filename:file});
  await window.LoomArchitectureView.mount({});
  assert.match(get('architecture-likec4-host').innerHTML, /loom-region/);
  await window.LoomProjectConsole.mount({});
  const panel = consoleRoot.querySelector('#loom-console-view');
  assert.match(panel.innerHTML, /尚无 Agent 工作记录/);
  for (const tab of tabs) { tab.click(); assert.ok(panel.innerHTML.length > 100); assert.doesNotMatch(panel.innerHTML, /undefined|NaN/); }
  tabs[4].click();
  assert.equal(panel.querySelector('[data-knowledge-bundle]').disabled, true);
  const data = await (await window.LoomDemo.fetch('/projects/workspace/knowledge')).json();
  events['loom:architecture-select']({detail: {objectId: data.objects[0].object_id}});
  assert.equal(consoleRoot.child.open, true);
  assert.ok(consoleRoot.child.innerHTML.includes(data.objects[0].title));
  const html = read('index.html');
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (match[1].startsWith('/')) continue;
    assert.ok(fs.existsSync(path.join(root, match[1])), match[1]);
  }
  for (const file of ['index.html','snapshot.js','architecture-view.js','loom-project-console.js']) {
    assert.doesNotMatch(read(file), /https?:\/\/(?:127\.0\.0\.1|localhost)|[A-Z]:\\|cp_[a-f0-9]{12}|space_\d+/);
  }
  assert.doesNotMatch(read('loom-project-console.js'), /method:\s*'POST'|>LIVE</);
  assert.match(fs.readFileSync(path.join(root, '..', 'index.html'), 'utf8'), /href="\.\/loom-demo\/"[^>]*>\[Demo\]/);
  console.log('PASS: static assets, architecture render, six tabs, object dialog, read-only actions, privacy checks, homepage link');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
