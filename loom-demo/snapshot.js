'use strict';
window.LoomDemo = (function () {
  var data = {
  "/projects": {
    "project_id": "workspace"
  },
  "/projects/workspace/architecture": {
    "project_id": "workspace",
    "version": {
      "view_hash": "public-snapshot"
    }
  },
  "/projects/workspace/architecture/assets/manifest.json": {
    "nodes": [
      {
        "contract": "运行后读取 canonical artifacts；不拥有 Agent 决策",
        "id": "component.evidence_verification",
        "kind": "component",
        "layer": "layer.evidence",
        "mechanism": "Python projections, deterministic smoke providers, pytest diagnostics and real runners",
        "note": {
          "done": "分离任务正确性、研究闭环、组件使用与收益证据；提供对照实验和真实链路 smoke，但不把组件测试冒充全链路关闭。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "投影、评测与验收层"
      },
      {
        "contract": "与 Pi Agent 同进程，通过 ExtensionAPI 注册工具和 lifecycle hooks",
        "id": "component.pi_extensions",
        "kind": "component",
        "layer": "layer.harness",
        "mechanism": "TypeScript loaded inside the Pi process",
        "note": {
          "done": "把 ARC/OfficeBench/Shopping/Terminal-Bench 能力暴露为 Pi 工具，投影 observation，接入研究生命周期，并维持 action boundary。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "Pi Benchmark 扩展与工具面"
      },
      {
        "contract": "Pi 进程内的确定性资源处理器；更改限于当前 run/task root",
        "id": "component.self_harness",
        "kind": "component",
        "layer": "layer.harness",
        "mechanism": "Pi extension handlers plus append-only task resources",
        "note": {
          "done": "版本化并激活 system prompt、skills、memory、tools、subagents，执行 route，记录 exposure/effect，并管理 context lifecycle。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "任务内 Self-Harness"
      },
      {
        "contract": "项目之外；需要 ARC checkout/SDK 与 API key",
        "id": "external.arc_service",
        "kind": "external",
        "layer": "layer.external",
        "mechanism": "official ARC Python SDK and online service",
        "note": {
          "done": "拥有游戏真实状态、关卡转移、scorecard 与官方 action budget；接受 SDK action 并返回原始帧/状态。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "官方 ARC-AGI-3 环境"
      },
      {
        "contract": "Pi 进程之外的模型服务；测试可由本地 provider extension 替代",
        "id": "external.model_provider",
        "kind": "external",
        "layer": "layer.agent",
        "mechanism": "OpenAI-compatible/provider API or deterministic test extension",
        "note": {
          "done": "接收 system/context/tool schema 与历史消息，返回 assistant 内容、工具调用和 stop reason。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "模型 Provider"
      },
      {
        "contract": "先复核最新源码，再明确 adapter、Agent runtime、policy/research 的契约和依赖方向。",
        "id": "issue.adapter_boundary",
        "kind": "issue",
        "layer": "layer.risk",
        "mechanism": "Pi ARC extension 仍混合环境工具、观测投影、context hook、研究辅助和 self-harness gate。",
        "note": {
          "done": "目标边界已记录。",
          "outlook": "以相同状态→相同 canonical observation 等不变量验收。",
          "todo": "清单 A 尚未关闭。"
        },
        "status": "blocked",
        "title": "A · ARC adapter 职责仍需收窄"
      },
      {
        "contract": "视图保留 locator-only 引用并明确覆盖风险；重新 capture 前不能声称仓库全量覆盖。",
        "id": "issue.capture_coverage",
        "kind": "issue",
        "layer": "layer.risk",
        "mechanism": "Refreshed bounded inventory contains 171 entries; this is not a claim of whole-worktree coverage.",
        "note": {
          "done": "Reconciled current bounded source snapshot.",
          "outlook": "",
          "todo": "Untracked source references outside capture remain locator-only; independently verify semantic claims."
        },
        "status": "blocked",
        "title": "Capture scope and untracked-source limits"
      },
      {
        "contract": "联合检查 lifecycle、frame projection、Pi auto-compaction 和 session rotation 的真实 provider 输入。",
        "id": "issue.cognitive_continuity",
        "kind": "issue",
        "layer": "layer.risk",
        "mechanism": "落盘可恢复尚不能证明关键假设、排除项和决策理由仍进入后续模型上下文。",
        "note": null,
        "status": "blocked",
        "title": "D · 压缩后的认知连续性"
      },
      {
        "contract": "Parent alone chooses and executes each environment action. Interfaces present in source do not prove real-provider end-to-end closure.",
        "id": "issue.parent_child_experiments",
        "kind": "issue",
        "layer": "layer.risk",
        "mechanism": "Structured experiment_request is normalized in child output, surfaced through task_harness inbox, and associated with parent ARC action receipts. Task-local action sequences return plans rather than executing live actions.",
        "note": {
          "done": "Request schema, parent inbox and action receipt association are implemented in current source.",
          "outlook": "Preserve single-life action ordering and budget accountability.",
          "todo": "Validate request/result/resume semantics through real runner and real provider; deferred C remains open."
        },
        "status": "blocked",
        "title": "C · Parent-mediated experiment requests"
      },
      {
        "contract": "完整验收需真实 ARC bridge、Pi parent、child broker/process、structured return、router、native mutation、action boundary 与后续真实 parent turn；provider 声明需真实 provider run。",
        "id": "issue.real_provider_acceptance",
        "kind": "issue",
        "layer": "layer.risk",
        "mechanism": "deterministic runner 能证明 wiring/lifecycle 可达，不能证明真实模型行为或游戏质量。",
        "note": null,
        "status": "blocked",
        "title": "真实 Provider 与 ARC 闭环验收未完成"
      },
      {
        "contract": "比较归纳、假设检验、复核、反例与开放探索，并控制预算与证据泄漏。",
        "id": "issue.research_observability",
        "kind": "issue",
        "layer": "layer.risk",
        "mechanism": "研究目的和可见轨迹范围尚缺系统对照，不能只增加 prompt 标签。",
        "note": null,
        "status": "blocked",
        "title": "B · 离线研究目的与可观测条件"
      },
      {
        "contract": "pytest 与离线 deterministic smoke 是诊断证据；涉及 provider 行为或游戏质量的结论必须有真实 provider run。",
        "id": "mechanism.acceptance_evidence",
        "kind": "mechanism",
        "layer": "layer.evidence",
        "mechanism": "把任务正确性、研究闭环、组件使用、harness 语义效果与真实 provider/benchmark 收益分层记录。",
        "note": {
          "done": "证据投影和多类 smoke/测试存在。",
          "outlook": "建立可比较的真实运行证据。",
          "todo": "不得将组件测试升级表述为全链路关闭。"
        },
        "status": "implemented",
        "title": "分层证据与验收"
      },
      {
        "contract": "原文可恢复不等于模型仍保有旧推理；observation、hypothesis、verified knowledge 必须区分。",
        "id": "mechanism.context_knowledge_lifecycle",
        "kind": "mechanism",
        "layer": "layer.harness",
        "mechanism": "用版本依赖、失效传播、checkpoint、memory/finding 与条件投影维持任务内知识。",
        "note": {
          "done": "版本依赖、显式替换和失效抑制已有实现。",
          "outlook": "联合验证 compaction、session rotation 与恢复。",
          "todo": "跨压缩语义连续性与实际 provider 输入尚未系统验证。"
        },
        "status": "implemented",
        "title": "上下文与知识生命周期"
      },
      {
        "contract": "资源更改限于当前任务根；成功状态必须伴随语义效果证据。",
        "id": "mechanism.harness_delivery",
        "kind": "mechanism",
        "layer": "layer.harness",
        "mechanism": "将获批研究交付编译为 system_prompt、skills、memory、tools、subagents 五类确定性 route，并在后续父 turn 投影可用面。",
        "note": {
          "done": "五类 route 与任务内资源处理器已实现。",
          "outlook": "以 work receipt 回流变更与证据。",
          "todo": "仍需按 AGENTS.md 的真实 ARC bridge→Pi→child→router→mutation→later-turn 矩阵验收。"
        },
        "status": "implemented",
        "title": "HarnessDelivery 路由"
      },
      {
        "contract": "Research output can be a conclusion, planning implication, experiment request or optional harness candidate. Parent chooses adoption; child has no live action capability.",
        "id": "mechanism.research_lifecycle",
        "kind": "mechanism",
        "layer": "layer.harness",
        "mechanism": "父 Agent 选择问题与证据边界，broker 启动隔离 child；child 产出结构化 report/checkpoint，父侧审批交付并记录 continuation。",
        "note": {
          "done": "结构化 child 回报、pending/continuation 与审批路径已存在。",
          "outlook": "用目的×可观测条件矩阵评估研究收益。",
          "todo": "主动实验通信、真实 provider 收益对照仍未关闭。"
        },
        "status": "implemented",
        "title": "Auto-Research 生命周期"
      },
      {
        "contract": "adapter 不依赖 findings、memory、child 身份或 research mode；派生特征不冒充环境语义。",
        "id": "principle.narrow_adapter",
        "kind": "principle",
        "layer": "layer.governance",
        "mechanism": "adapter 返回 canonical 环境状态并执行具体 action；研究、权限、上下文和策略属于 Agent 侧。",
        "note": null,
        "status": "active",
        "title": "窄环境适配器"
      },
      {
        "contract": "新能力优先通过 Pi extension/task-local resource 接入，不在 Python 侧复制第二套 Agent policy。",
        "id": "principle.pi_native_core",
        "kind": "principle",
        "layer": "layer.governance",
        "mechanism": "父 Agent 的模型对话与工具循环由 Pi 原生 loop 持有，Python PiKernel 只承担薄 RPC、会话与事件编排。",
        "note": null,
        "status": "active",
        "title": "Pi 原生决策核心"
      },
      {
        "contract": "One irreversible environment history; main agent observes each action result before choosing the next action. Child budget is a request bound, not a lease.",
        "id": "principle.single_life_control",
        "kind": "principle",
        "layer": "layer.governance",
        "mechanism": "单条不可回退环境历史中 main agent 独占逐步交互和结果上下文；child 只能请求预算内实验。",
        "note": null,
        "status": "active",
        "title": "单次生命控制权"
      },
      {
        "contract": "不得把一次任务的动态资源泄漏为另一任务的全局真值。",
        "id": "principle.task_local_isolation",
        "kind": "principle",
        "layer": "layer.governance",
        "mechanism": "Harness 和研究资源写入当前 run/task root，采用追加式 ledger、版本化资源与精确引用。",
        "note": null,
        "status": "active",
        "title": "任务内隔离与可追溯变更"
      },
      {
        "contract": "独立 bridge 进程；Pi 扩展通过 HTTP JSON 调用",
        "id": "runtime.arc_bridge",
        "kind": "runtime",
        "layer": "layer.adapter",
        "mechanism": "Python localhost ThreadingHTTPServer under ARC SDK interpreter",
        "note": {
          "done": "校验具体 action、调用官方 SDK、序列化 canonical frame/delta、记录 action/environment events，并返回 state/trajectory/scorecard。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "本地 ARC Bridge"
      },
      {
        "contract": "独立模型上下文；只接收父选择的 evidence/resource/context refs 与授权工具",
        "id": "runtime.auto_research_children",
        "kind": "runtime",
        "layer": "layer.harness",
        "mechanism": "separate Pi child sessions/processes",
        "note": {
          "done": "执行有界研究或角色委派，支持 blocking/non-blocking、provider length continuation、结构化报告、交付审批与 pending 恢复。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "Auto-Research 与委派 Child"
      },
      {
        "contract": "外部 JIT checkout 或 Harbor/Docker；源码只读，输出回写本项目 run root",
        "id": "runtime.benchmark_backends",
        "kind": "runtime",
        "layer": "layer.adapter",
        "mechanism": "JIT subprocess bridges, evaluator imports, or Harbor/Docker",
        "note": {
          "done": "准备 benchmark case、执行受限 action、调用原 evaluator/verifier，并把任务正确性与 self-harness 证据分开。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "OfficeBench / Shopping / Terminal-Bench 后端"
      },
      {
        "contract": "用户命令启动的父进程；按任务创建 Pi、Bridge、Broker 或 Harbor/JIT 子进程",
        "id": "runtime.cli_runner",
        "kind": "runtime",
        "layer": "layer.entry",
        "mechanism": "Python process",
        "note": {
          "done": "解析命令、装配模型与 benchmark 配置、创建隔离 run root、驱动 treatment/control/continuation，并投影 summary。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "CLI 与实验 Runner"
      },
      {
        "contract": "独立 Pi CLI 进程；Python PiKernel 只传输 RPC、session 和异步事件",
        "id": "runtime.pi_agent",
        "kind": "runtime",
        "layer": "layer.agent",
        "mechanism": "pi --mode rpc child process",
        "note": {
          "done": "维护父 Agent 对话与工具循环，执行 extension hooks/tools，并在后续真实 turn 中接收变更后的任务内上下文。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "Pi 原生 Agent Loop"
      },
      {
        "contract": "父 runner 管理的独立线程/子进程边界",
        "id": "runtime.subagent_broker",
        "kind": "runtime",
        "layer": "layer.harness",
        "mechanism": "Python localhost HTTP server",
        "note": {
          "done": "托管非阻塞 child 进程、状态检查、取消与结果回收；进程存活与逻辑 research session 状态分离。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "后台 Child Broker"
      },
      {
        "contract": "父 runner、Pi extension、child 和 bridge 共享的受限任务目录",
        "id": "store.run_artifacts",
        "kind": "store",
        "layer": "layer.evidence",
        "mechanism": "filesystem JSON/JSONL/Markdown/artifacts under run root",
        "note": {
          "done": "保存 canonical observation、research resources、harness mutations、continuations、telemetry、receipts、handoffs 与 summary，供恢复和审计。",
          "outlook": "",
          "todo": ""
        },
        "status": null,
        "title": "Run-local 持久状态与证据库"
      }
    ],
    "runtime_layers": [
      {
        "component_refs": [
          "runtime.cli_runner"
        ],
        "id": "layer.entry",
        "order": 1,
        "title": "入口与实验编排"
      },
      {
        "component_refs": [
          "external.model_provider",
          "runtime.pi_agent"
        ],
        "id": "layer.agent",
        "order": 2,
        "title": "模型与 Pi Agent 运行时"
      },
      {
        "component_refs": [
          "component.pi_extensions",
          "component.self_harness",
          "runtime.auto_research_children",
          "runtime.subagent_broker"
        ],
        "id": "layer.harness",
        "order": 3,
        "title": "Pi 扩展、Auto-Research 与 Self-Harness"
      },
      {
        "component_refs": [
          "runtime.arc_bridge",
          "runtime.benchmark_backends"
        ],
        "id": "layer.adapter",
        "order": 4,
        "title": "环境适配与本地桥"
      },
      {
        "component_refs": [
          "external.arc_service"
        ],
        "id": "layer.external",
        "order": 5,
        "title": "外部环境与服务"
      },
      {
        "component_refs": [
          "store.run_artifacts",
          "component.evidence_verification"
        ],
        "id": "layer.evidence",
        "order": 6,
        "title": "任务内状态、证据与验证"
      }
    ],
    "flows": [
      {
        "contract": "spawn pi --mode rpc; send new_session/prompt/follow_up; stream asynchronous events",
        "from": "runtime.cli_runner",
        "kind": "message",
        "to": "runtime.pi_agent"
      },
      {
        "contract": "provider request containing model messages, context and active tool schemas",
        "from": "runtime.pi_agent",
        "kind": "message",
        "to": "external.model_provider"
      },
      {
        "contract": "assistant content/tool calls/usage/stop_reason, including native length continuation signal",
        "from": "external.model_provider",
        "kind": "result",
        "to": "runtime.pi_agent"
      },
      {
        "contract": "Pi ExtensionAPI hooks and registered tool calls with typed arguments",
        "from": "runtime.pi_agent",
        "kind": "tool_call",
        "to": "component.pi_extensions"
      },
      {
        "contract": "localhost GET /state,/trajectory,/events and POST /step,/close",
        "from": "component.pi_extensions",
        "kind": "http_json",
        "to": "runtime.arc_bridge"
      },
      {
        "contract": "official SDK game discovery/reset/step/scorecard close",
        "from": "runtime.arc_bridge",
        "kind": "sdk_api",
        "to": "external.arc_service"
      },
      {
        "contract": "raw frame, terminal state, levels, scorecard and SDK/environment errors",
        "from": "external.arc_service",
        "kind": "result",
        "to": "runtime.arc_bridge"
      },
      {
        "contract": "serialized canonical observation, delta, action receipt or structured bridge error",
        "from": "runtime.arc_bridge",
        "kind": "result",
        "to": "component.pi_extensions"
      },
      {
        "contract": "tool result plus next-turn context/system prompt/active-tool projection",
        "from": "component.pi_extensions",
        "kind": "result",
        "to": "runtime.pi_agent"
      },
      {
        "contract": "enqueue/status/cancel a non-blocking child job",
        "from": "component.pi_extensions",
        "kind": "http_json",
        "to": "runtime.subagent_broker"
      },
      {
        "contract": "launch isolated Pi child with bounded prompt, evidence refs, resources and required reporting tools",
        "from": "runtime.subagent_broker",
        "kind": "message",
        "to": "runtime.auto_research_children"
      },
      {
        "contract": "structured research report/capsule, checkpoint or delegate result with continuation metadata",
        "from": "runtime.auto_research_children",
        "kind": "result",
        "to": "component.pi_extensions"
      },
      {
        "contract": "compile approved HarnessDelivery into deterministic routes and invoke native task component handlers",
        "from": "component.pi_extensions",
        "kind": "tool_call",
        "to": "component.self_harness"
      },
      {
        "contract": "subsequent turn receives eligible prompt/memory/skill indexes and updated tool/subagent surfaces",
        "from": "component.self_harness",
        "kind": "state",
        "to": "runtime.pi_agent"
      },
      {
        "contract": "bounded OfficeBench/Shopping action bridge or Terminal-Bench terminal/Harbor execution",
        "from": "component.pi_extensions",
        "kind": "tool_call",
        "to": "runtime.benchmark_backends"
      },
      {
        "contract": "task action observation, artifact/evaluator result, semantic or transport error",
        "from": "runtime.benchmark_backends",
        "kind": "result",
        "to": "component.pi_extensions"
      },
      {
        "contract": "append canonical research, resource, decision, exposure, telemetry and continuation ledgers",
        "from": "component.pi_extensions",
        "kind": "state",
        "to": "store.run_artifacts"
      },
      {
        "contract": "append bridge-events and persist readiness/error/result snapshots",
        "from": "runtime.arc_bridge",
        "kind": "state",
        "to": "store.run_artifacts"
      },
      {
        "contract": "recover exact resource/report/checkpoint references for later turns and sessions",
        "from": "store.run_artifacts",
        "kind": "state",
        "to": "component.pi_extensions"
      },
      {
        "contract": "canonical inputs for projections, smoke acceptance, comparisons and summaries",
        "from": "store.run_artifacts",
        "kind": "result",
        "to": "component.evidence_verification"
      }
    ],
    "relations": [
      {
        "from": "component.pi_extensions",
        "to": "component.self_harness",
        "type": "exposes_tools"
      },
      {
        "from": "component.pi_extensions",
        "to": "component.self_harness",
        "type": "exposes_tools"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.arc_bridge",
        "type": "calls_http_json"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.arc_bridge",
        "type": "calls_http_json"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.benchmark_backends",
        "type": "exposes_tools"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.benchmark_backends",
        "type": "exposes_tools"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.pi_agent",
        "type": "returns_result"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.pi_agent",
        "type": "returns_result"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.subagent_broker",
        "type": "calls_http_json"
      },
      {
        "from": "component.pi_extensions",
        "to": "runtime.subagent_broker",
        "type": "calls_http_json"
      },
      {
        "from": "component.pi_extensions",
        "to": "store.run_artifacts",
        "type": "persists_state"
      },
      {
        "from": "component.pi_extensions",
        "to": "store.run_artifacts",
        "type": "persists_state"
      },
      {
        "from": "component.self_harness",
        "to": "runtime.pi_agent",
        "type": "persists_state"
      },
      {
        "from": "component.self_harness",
        "to": "runtime.pi_agent",
        "type": "persists_state"
      },
      {
        "from": "external.arc_service",
        "to": "runtime.arc_bridge",
        "type": "returns_result"
      },
      {
        "from": "external.arc_service",
        "to": "runtime.arc_bridge",
        "type": "returns_result"
      },
      {
        "from": "external.model_provider",
        "to": "runtime.pi_agent",
        "type": "returns_result"
      },
      {
        "from": "external.model_provider",
        "to": "runtime.pi_agent",
        "type": "returns_result"
      },
      {
        "from": "issue.adapter_boundary",
        "to": "component.pi_extensions",
        "type": "tracks"
      },
      {
        "from": "issue.adapter_boundary",
        "to": "component.pi_extensions",
        "type": "tracks"
      },
      {
        "from": "issue.capture_coverage",
        "to": "component.evidence_verification",
        "type": "limits"
      },
      {
        "from": "issue.capture_coverage",
        "to": "component.evidence_verification",
        "type": "limits"
      },
      {
        "from": "issue.cognitive_continuity",
        "to": "mechanism.context_knowledge_lifecycle",
        "type": "tracks"
      },
      {
        "from": "issue.cognitive_continuity",
        "to": "mechanism.context_knowledge_lifecycle",
        "type": "tracks"
      },
      {
        "from": "issue.parent_child_experiments",
        "to": "runtime.subagent_broker",
        "type": "tracks"
      },
      {
        "from": "issue.parent_child_experiments",
        "to": "runtime.subagent_broker",
        "type": "tracks"
      },
      {
        "from": "issue.real_provider_acceptance",
        "to": "mechanism.acceptance_evidence",
        "type": "tracks"
      },
      {
        "from": "issue.real_provider_acceptance",
        "to": "mechanism.acceptance_evidence",
        "type": "tracks"
      },
      {
        "from": "issue.research_observability",
        "to": "mechanism.research_lifecycle",
        "type": "tracks"
      },
      {
        "from": "issue.research_observability",
        "to": "mechanism.research_lifecycle",
        "type": "tracks"
      },
      {
        "from": "mechanism.acceptance_evidence",
        "to": "component.evidence_verification",
        "type": "governs"
      },
      {
        "from": "mechanism.acceptance_evidence",
        "to": "component.evidence_verification",
        "type": "governs"
      },
      {
        "from": "mechanism.context_knowledge_lifecycle",
        "to": "store.run_artifacts",
        "type": "persists_state"
      },
      {
        "from": "mechanism.context_knowledge_lifecycle",
        "to": "store.run_artifacts",
        "type": "persists_state"
      },
      {
        "from": "mechanism.harness_delivery",
        "to": "component.self_harness",
        "type": "routes_to"
      },
      {
        "from": "mechanism.harness_delivery",
        "to": "component.self_harness",
        "type": "routes_to"
      },
      {
        "from": "mechanism.research_lifecycle",
        "to": "mechanism.harness_delivery",
        "type": "produces_delivery"
      },
      {
        "from": "mechanism.research_lifecycle",
        "to": "mechanism.harness_delivery",
        "type": "produces_delivery"
      },
      {
        "from": "mechanism.research_lifecycle",
        "to": "runtime.auto_research_children",
        "type": "coordinates"
      },
      {
        "from": "mechanism.research_lifecycle",
        "to": "runtime.auto_research_children",
        "type": "coordinates"
      },
      {
        "from": "principle.narrow_adapter",
        "to": "runtime.arc_bridge",
        "type": "constrains"
      },
      {
        "from": "principle.narrow_adapter",
        "to": "runtime.arc_bridge",
        "type": "constrains"
      },
      {
        "from": "principle.pi_native_core",
        "to": "runtime.pi_agent",
        "type": "constrains"
      },
      {
        "from": "principle.pi_native_core",
        "to": "runtime.pi_agent",
        "type": "constrains"
      },
      {
        "from": "principle.single_life_control",
        "to": "mechanism.research_lifecycle",
        "type": "constrains"
      },
      {
        "from": "principle.single_life_control",
        "to": "mechanism.research_lifecycle",
        "type": "constrains"
      },
      {
        "from": "principle.task_local_isolation",
        "to": "component.self_harness",
        "type": "constrains"
      },
      {
        "from": "principle.task_local_isolation",
        "to": "component.self_harness",
        "type": "constrains"
      },
      {
        "from": "runtime.arc_bridge",
        "to": "component.pi_extensions",
        "type": "returns_result"
      },
      {
        "from": "runtime.arc_bridge",
        "to": "component.pi_extensions",
        "type": "returns_result"
      },
      {
        "from": "runtime.arc_bridge",
        "to": "external.arc_service",
        "type": "executes_sdk_api"
      },
      {
        "from": "runtime.arc_bridge",
        "to": "external.arc_service",
        "type": "executes_sdk_api"
      },
      {
        "from": "runtime.arc_bridge",
        "to": "store.run_artifacts",
        "type": "persists_state"
      },
      {
        "from": "runtime.arc_bridge",
        "to": "store.run_artifacts",
        "type": "persists_state"
      },
      {
        "from": "runtime.auto_research_children",
        "to": "component.pi_extensions",
        "type": "returns_result"
      },
      {
        "from": "runtime.auto_research_children",
        "to": "component.pi_extensions",
        "type": "returns_result"
      },
      {
        "from": "runtime.benchmark_backends",
        "to": "component.pi_extensions",
        "type": "returns_result"
      },
      {
        "from": "runtime.benchmark_backends",
        "to": "component.pi_extensions",
        "type": "returns_result"
      },
      {
        "from": "runtime.cli_runner",
        "to": "runtime.pi_agent",
        "type": "sends_messages"
      },
      {
        "from": "runtime.cli_runner",
        "to": "runtime.pi_agent",
        "type": "sends_messages"
      },
      {
        "from": "runtime.pi_agent",
        "to": "component.pi_extensions",
        "type": "exposes_tools"
      },
      {
        "from": "runtime.pi_agent",
        "to": "component.pi_extensions",
        "type": "exposes_tools"
      },
      {
        "from": "runtime.pi_agent",
        "to": "external.model_provider",
        "type": "sends_messages"
      },
      {
        "from": "runtime.pi_agent",
        "to": "external.model_provider",
        "type": "sends_messages"
      },
      {
        "from": "runtime.pi_agent",
        "to": "mechanism.research_lifecycle",
        "type": "owns_policy"
      },
      {
        "from": "runtime.pi_agent",
        "to": "mechanism.research_lifecycle",
        "type": "owns_policy"
      },
      {
        "from": "runtime.subagent_broker",
        "to": "runtime.auto_research_children",
        "type": "sends_messages"
      },
      {
        "from": "runtime.subagent_broker",
        "to": "runtime.auto_research_children",
        "type": "sends_messages"
      },
      {
        "from": "store.run_artifacts",
        "to": "component.evidence_verification",
        "type": "returns_result"
      },
      {
        "from": "store.run_artifacts",
        "to": "component.evidence_verification",
        "type": "returns_result"
      },
      {
        "from": "store.run_artifacts",
        "to": "component.pi_extensions",
        "type": "persists_state"
      },
      {
        "from": "store.run_artifacts",
        "to": "component.pi_extensions",
        "type": "persists_state"
      }
    ]
  },
  "/projects/workspace/workspace-view": {
    "generated_at": "2026-09-20T09:49:19Z",
    "project": {
      "project_id": "workspace",
      "name": "autoresearch_pi_project",
      "checkpoint_count": 3
    },
    "current_work": {
      "goal_title": "AutoResearch Pi · refreshed project workspace",
      "status": "idle",
      "summary": "Refreshed Pi-native runtime topology, parent-mediated experiment requests and single-life action boundaries. Source inspection only; provider behavior and complete acceptance remain unverified.",
      "why": "Agent-declared · Unverified",
      "next_action": {
        "action": "inspect_project",
        "description": "查看项目结构与未决事项。"
      },
      "session": {
        "title": "暂无活动会话",
        "status": "idle"
      },
      "turn": {
        "title": "暂无最近 Turn",
        "status": "idle",
        "tool_steps": 0
      },
      "checkpoint": null
    },
    "location": {
      "path": [
        {
          "level": "project",
          "title": "autoresearch_pi_project"
        },
        {
          "level": "goal",
          "title": "AutoResearch Pi · refreshed project workspace"
        },
        {
          "level": "object",
          "title": "Pi Benchmark 扩展与工具面",
          "object_id": "component.pi_extensions"
        }
      ],
      "confidence": "projected"
    },
    "architecture": {
      "summary": "Refreshed Pi-native runtime topology, parent-mediated experiment requests and single-life action boundaries. Source inspection only; provider behavior and complete acceptance remain unverified.",
      "verification": "Agent-declared · Unverified",
      "trust_state": "unverified",
      "counts": {
        "objects": 26,
        "relations": 72,
        "blocked": 6,
        "unverified": 26
      },
      "core_objects": [
        {
          "object_id": "component.pi_extensions",
          "title": "Pi Benchmark 扩展与工具面",
          "summary": "TypeScript loaded inside the Pi process",
          "kind": "component",
          "status": "mapped",
          "group": "core",
          "relation_count": 24,
          "evidence_count": 6,
          "technical": {
            "id": "component.pi_extensions",
            "layer": "layer.harness"
          }
        },
        {
          "object_id": "runtime.pi_agent",
          "title": "Pi 原生 Agent Loop",
          "summary": "pi --mode rpc child process",
          "kind": "runtime",
          "status": "mapped",
          "group": "core",
          "relation_count": 16,
          "evidence_count": 5,
          "technical": {
            "id": "runtime.pi_agent",
            "layer": "layer.agent"
          }
        },
        {
          "object_id": "runtime.arc_bridge",
          "title": "本地 ARC Bridge",
          "summary": "Python localhost ThreadingHTTPServer under ARC SDK interpreter",
          "kind": "runtime",
          "status": "mapped",
          "group": "core",
          "relation_count": 12,
          "evidence_count": 6,
          "technical": {
            "id": "runtime.arc_bridge",
            "layer": "layer.adapter"
          }
        },
        {
          "object_id": "mechanism.research_lifecycle",
          "title": "Auto-Research 生命周期",
          "summary": "父 Agent 选择问题与证据边界，broker 启动隔离 child；child 产出结构化 report/checkpoint，父侧审批交付并记录 continuation。",
          "kind": "mechanism",
          "status": "implemented",
          "group": "mechanisms",
          "relation_count": 10,
          "evidence_count": 6,
          "technical": {
            "id": "mechanism.research_lifecycle",
            "layer": "layer.harness"
          }
        },
        {
          "object_id": "store.run_artifacts",
          "title": "Run-local 持久状态与证据库",
          "summary": "filesystem JSON/JSONL/Markdown/artifacts under run root",
          "kind": "store",
          "status": "mapped",
          "group": "evidence",
          "relation_count": 10,
          "evidence_count": 5,
          "technical": {
            "id": "store.run_artifacts",
            "layer": "layer.evidence"
          }
        },
        {
          "object_id": "component.self_harness",
          "title": "任务内 Self-Harness",
          "summary": "Pi extension handlers plus append-only task resources",
          "kind": "component",
          "status": "mapped",
          "group": "core",
          "relation_count": 8,
          "evidence_count": 7,
          "technical": {
            "id": "component.self_harness",
            "layer": "layer.harness"
          }
        },
        {
          "object_id": "runtime.auto_research_children",
          "title": "Auto-Research 与委派 Child",
          "summary": "separate Pi child sessions/processes",
          "kind": "runtime",
          "status": "mapped",
          "group": "core",
          "relation_count": 6,
          "evidence_count": 6,
          "technical": {
            "id": "runtime.auto_research_children",
            "layer": "layer.harness"
          }
        }
      ],
      "primary_flow": [
        {
          "from": "component.pi_extensions",
          "to": "store.run_artifacts",
          "type": "persists_state",
          "from_title": "Pi Benchmark 扩展与工具面",
          "to_title": "Run-local 持久状态与证据库"
        },
        {
          "from": "component.pi_extensions",
          "to": "store.run_artifacts",
          "type": "persists_state",
          "from_title": "Pi Benchmark 扩展与工具面",
          "to_title": "Run-local 持久状态与证据库"
        },
        {
          "from": "component.self_harness",
          "to": "runtime.pi_agent",
          "type": "persists_state",
          "from_title": "任务内 Self-Harness",
          "to_title": "Pi 原生 Agent Loop"
        },
        {
          "from": "component.self_harness",
          "to": "runtime.pi_agent",
          "type": "persists_state",
          "from_title": "任务内 Self-Harness",
          "to_title": "Pi 原生 Agent Loop"
        },
        {
          "from": "mechanism.context_knowledge_lifecycle",
          "to": "store.run_artifacts",
          "type": "persists_state",
          "from_title": "上下文与知识生命周期",
          "to_title": "Run-local 持久状态与证据库"
        },
        {
          "from": "mechanism.context_knowledge_lifecycle",
          "to": "store.run_artifacts",
          "type": "persists_state",
          "from_title": "上下文与知识生命周期",
          "to_title": "Run-local 持久状态与证据库"
        },
        {
          "from": "mechanism.harness_delivery",
          "to": "component.self_harness",
          "type": "routes_to",
          "from_title": "HarnessDelivery 路由",
          "to_title": "任务内 Self-Harness"
        },
        {
          "from": "mechanism.harness_delivery",
          "to": "component.self_harness",
          "type": "routes_to",
          "from_title": "HarnessDelivery 路由",
          "to_title": "任务内 Self-Harness"
        }
      ],
      "groups": [
        {
          "group_id": "core",
          "title": "核心运行",
          "description": "Agent、运行时与主要执行入口",
          "count": 8,
          "status_counts": {
            "mapped": 8
          },
          "objects": [
            {
              "object_id": "component.pi_extensions",
              "title": "Pi Benchmark 扩展与工具面",
              "summary": "TypeScript loaded inside the Pi process",
              "kind": "component",
              "status": "mapped",
              "group": "core",
              "relation_count": 24,
              "evidence_count": 6,
              "technical": {
                "id": "component.pi_extensions",
                "layer": "layer.harness"
              }
            },
            {
              "object_id": "component.self_harness",
              "title": "任务内 Self-Harness",
              "summary": "Pi extension handlers plus append-only task resources",
              "kind": "component",
              "status": "mapped",
              "group": "core",
              "relation_count": 8,
              "evidence_count": 7,
              "technical": {
                "id": "component.self_harness",
                "layer": "layer.harness"
              }
            },
            {
              "object_id": "runtime.arc_bridge",
              "title": "本地 ARC Bridge",
              "summary": "Python localhost ThreadingHTTPServer under ARC SDK interpreter",
              "kind": "runtime",
              "status": "mapped",
              "group": "core",
              "relation_count": 12,
              "evidence_count": 6,
              "technical": {
                "id": "runtime.arc_bridge",
                "layer": "layer.adapter"
              }
            },
            {
              "object_id": "runtime.auto_research_children",
              "title": "Auto-Research 与委派 Child",
              "summary": "separate Pi child sessions/processes",
              "kind": "runtime",
              "status": "mapped",
              "group": "core",
              "relation_count": 6,
              "evidence_count": 6,
              "technical": {
                "id": "runtime.auto_research_children",
                "layer": "layer.harness"
              }
            },
            {
              "object_id": "runtime.benchmark_backends",
              "title": "OfficeBench / Shopping / Terminal-Bench 后端",
              "summary": "JIT subprocess bridges, evaluator imports, or Harbor/Docker",
              "kind": "runtime",
              "status": "mapped",
              "group": "core",
              "relation_count": 4,
              "evidence_count": 6,
              "technical": {
                "id": "runtime.benchmark_backends",
                "layer": "layer.adapter"
              }
            },
            {
              "object_id": "runtime.cli_runner",
              "title": "CLI 与实验 Runner",
              "summary": "Python process",
              "kind": "runtime",
              "status": "mapped",
              "group": "core",
              "relation_count": 2,
              "evidence_count": 5,
              "technical": {
                "id": "runtime.cli_runner",
                "layer": "layer.entry"
              }
            },
            {
              "object_id": "runtime.pi_agent",
              "title": "Pi 原生 Agent Loop",
              "summary": "pi --mode rpc child process",
              "kind": "runtime",
              "status": "mapped",
              "group": "core",
              "relation_count": 16,
              "evidence_count": 5,
              "technical": {
                "id": "runtime.pi_agent",
                "layer": "layer.agent"
              }
            },
            {
              "object_id": "runtime.subagent_broker",
              "title": "后台 Child Broker",
              "summary": "Python localhost HTTP server",
              "kind": "runtime",
              "status": "mapped",
              "group": "core",
              "relation_count": 6,
              "evidence_count": 3,
              "technical": {
                "id": "runtime.subagent_broker",
                "layer": "layer.harness"
              }
            }
          ]
        },
        {
          "group_id": "mechanisms",
          "title": "关键机制",
          "description": "跨模块运转方式与状态生命周期",
          "count": 4,
          "status_counts": {
            "implemented": 4
          },
          "objects": [
            {
              "object_id": "mechanism.acceptance_evidence",
              "title": "分层证据与验收",
              "summary": "把任务正确性、研究闭环、组件使用、harness 语义效果与真实 provider/benchmark 收益分层记录。",
              "kind": "mechanism",
              "status": "implemented",
              "group": "mechanisms",
              "relation_count": 4,
              "evidence_count": 5,
              "technical": {
                "id": "mechanism.acceptance_evidence",
                "layer": "layer.evidence"
              }
            },
            {
              "object_id": "mechanism.context_knowledge_lifecycle",
              "title": "上下文与知识生命周期",
              "summary": "用版本依赖、失效传播、checkpoint、memory/finding 与条件投影维持任务内知识。",
              "kind": "mechanism",
              "status": "implemented",
              "group": "mechanisms",
              "relation_count": 4,
              "evidence_count": 5,
              "technical": {
                "id": "mechanism.context_knowledge_lifecycle",
                "layer": "layer.harness"
              }
            },
            {
              "object_id": "mechanism.harness_delivery",
              "title": "HarnessDelivery 路由",
              "summary": "将获批研究交付编译为 system_prompt、skills、memory、tools、subagents 五类确定性 route，并在后续父 turn 投影可用面。",
              "kind": "mechanism",
              "status": "implemented",
              "group": "mechanisms",
              "relation_count": 4,
              "evidence_count": 5,
              "technical": {
                "id": "mechanism.harness_delivery",
                "layer": "layer.harness"
              }
            },
            {
              "object_id": "mechanism.research_lifecycle",
              "title": "Auto-Research 生命周期",
              "summary": "父 Agent 选择问题与证据边界，broker 启动隔离 child；child 产出结构化 report/checkpoint，父侧审批交付并记录 continuation。",
              "kind": "mechanism",
              "status": "implemented",
              "group": "mechanisms",
              "relation_count": 10,
              "evidence_count": 6,
              "technical": {
                "id": "mechanism.research_lifecycle",
                "layer": "layer.harness"
              }
            }
          ]
        },
        {
          "group_id": "governance",
          "title": "原则与约束",
          "description": "系统必须遵守的设计边界",
          "count": 4,
          "status_counts": {
            "active": 4
          },
          "objects": [
            {
              "object_id": "principle.narrow_adapter",
              "title": "窄环境适配器",
              "summary": "adapter 返回 canonical 环境状态并执行具体 action；研究、权限、上下文和策略属于 Agent 侧。",
              "kind": "principle",
              "status": "active",
              "group": "governance",
              "relation_count": 2,
              "evidence_count": 3,
              "technical": {
                "id": "principle.narrow_adapter",
                "layer": "layer.governance"
              }
            },
            {
              "object_id": "principle.pi_native_core",
              "title": "Pi 原生决策核心",
              "summary": "父 Agent 的模型对话与工具循环由 Pi 原生 loop 持有，Python PiKernel 只承担薄 RPC、会话与事件编排。",
              "kind": "principle",
              "status": "active",
              "group": "governance",
              "relation_count": 2,
              "evidence_count": 4,
              "technical": {
                "id": "principle.pi_native_core",
                "layer": "layer.governance"
              }
            },
            {
              "object_id": "principle.single_life_control",
              "title": "单次生命控制权",
              "summary": "单条不可回退环境历史中 main agent 独占逐步交互和结果上下文；child 只能请求预算内实验。",
              "kind": "principle",
              "status": "active",
              "group": "governance",
              "relation_count": 2,
              "evidence_count": 2,
              "technical": {
                "id": "principle.single_life_control",
                "layer": "layer.governance"
              }
            },
            {
              "object_id": "principle.task_local_isolation",
              "title": "任务内隔离与可追溯变更",
              "summary": "Harness 和研究资源写入当前 run/task root，采用追加式 ledger、版本化资源与精确引用。",
              "kind": "principle",
              "status": "active",
              "group": "governance",
              "relation_count": 2,
              "evidence_count": 3,
              "technical": {
                "id": "principle.task_local_isolation",
                "layer": "layer.governance"
              }
            }
          ]
        },
        {
          "group_id": "risks",
          "title": "风险与待追踪项",
          "description": "未闭环、阻塞或需要验证的事项",
          "count": 6,
          "status_counts": {
            "blocked": 6
          },
          "objects": [
            {
              "object_id": "issue.adapter_boundary",
              "title": "A · ARC adapter 职责仍需收窄",
              "summary": "Pi ARC extension 仍混合环境工具、观测投影、context hook、研究辅助和 self-harness gate。",
              "kind": "issue",
              "status": "blocked",
              "group": "risks",
              "relation_count": 2,
              "evidence_count": 4,
              "technical": {
                "id": "issue.adapter_boundary",
                "layer": "layer.risk"
              }
            },
            {
              "object_id": "issue.capture_coverage",
              "title": "Capture scope and untracked-source limits",
              "summary": "Refreshed bounded inventory contains 171 entries; this is not a claim of whole-worktree coverage.",
              "kind": "issue",
              "status": "blocked",
              "group": "risks",
              "relation_count": 2,
              "evidence_count": 8,
              "technical": {
                "id": "issue.capture_coverage",
                "layer": "layer.risk"
              }
            },
            {
              "object_id": "issue.cognitive_continuity",
              "title": "D · 压缩后的认知连续性",
              "summary": "落盘可恢复尚不能证明关键假设、排除项和决策理由仍进入后续模型上下文。",
              "kind": "issue",
              "status": "blocked",
              "group": "risks",
              "relation_count": 2,
              "evidence_count": 3,
              "technical": {
                "id": "issue.cognitive_continuity",
                "layer": "layer.risk"
              }
            },
            {
              "object_id": "issue.parent_child_experiments",
              "title": "C · Parent-mediated experiment requests",
              "summary": "Structured experiment_request is normalized in child output, surfaced through task_harness inbox, and associated with parent ARC action receipts. Task-local action sequences return plans rather than executing live actions.",
              "kind": "issue",
              "status": "blocked",
              "group": "risks",
              "relation_count": 2,
              "evidence_count": 4,
              "technical": {
                "id": "issue.parent_child_experiments",
                "layer": "layer.risk"
              }
            },
            {
              "object_id": "issue.real_provider_acceptance",
              "title": "真实 Provider 与 ARC 闭环验收未完成",
              "summary": "deterministic runner 能证明 wiring/lifecycle 可达，不能证明真实模型行为或游戏质量。",
              "kind": "issue",
              "status": "blocked",
              "group": "risks",
              "relation_count": 2,
              "evidence_count": 3,
              "technical": {
                "id": "issue.real_provider_acceptance",
                "layer": "layer.risk"
              }
            },
            {
              "object_id": "issue.research_observability",
              "title": "B · 离线研究目的与可观测条件",
              "summary": "研究目的和可见轨迹范围尚缺系统对照，不能只增加 prompt 标签。",
              "kind": "issue",
              "status": "blocked",
              "group": "risks",
              "relation_count": 2,
              "evidence_count": 2,
              "technical": {
                "id": "issue.research_observability",
                "layer": "layer.risk"
              }
            }
          ]
        },
        {
          "group_id": "external",
          "title": "外部依赖",
          "description": "模型、基准环境与项目外服务",
          "count": 2,
          "status_counts": {
            "mapped": 2
          },
          "objects": [
            {
              "object_id": "external.arc_service",
              "title": "官方 ARC-AGI-3 环境",
              "summary": "official ARC Python SDK and online service",
              "kind": "external",
              "status": "mapped",
              "group": "external",
              "relation_count": 4,
              "evidence_count": 4,
              "technical": {
                "id": "external.arc_service",
                "layer": "layer.external"
              }
            },
            {
              "object_id": "external.model_provider",
              "title": "模型 Provider",
              "summary": "OpenAI-compatible/provider API or deterministic test extension",
              "kind": "external",
              "status": "mapped",
              "group": "external",
              "relation_count": 4,
              "evidence_count": 4,
              "technical": {
                "id": "external.model_provider",
                "layer": "layer.agent"
              }
            }
          ]
        },
        {
          "group_id": "evidence",
          "title": "证据与状态",
          "description": "持久化状态、验证与证据投影",
          "count": 2,
          "status_counts": {
            "mapped": 2
          },
          "objects": [
            {
              "object_id": "component.evidence_verification",
              "title": "投影、评测与验收层",
              "summary": "Python projections, deterministic smoke providers, pytest diagnostics and real runners",
              "kind": "component",
              "status": "mapped",
              "group": "evidence",
              "relation_count": 6,
              "evidence_count": 6,
              "technical": {
                "id": "component.evidence_verification",
                "layer": "layer.evidence"
              }
            },
            {
              "object_id": "store.run_artifacts",
              "title": "Run-local 持久状态与证据库",
              "summary": "filesystem JSON/JSONL/Markdown/artifacts under run root",
              "kind": "store",
              "status": "mapped",
              "group": "evidence",
              "relation_count": 10,
              "evidence_count": 5,
              "technical": {
                "id": "store.run_artifacts",
                "layer": "layer.evidence"
              }
            }
          ]
        }
      ]
    },
    "timeline": [],
    "attention": [
      {
        "severity": "warning",
        "title": "当前架构尚未独立验证",
        "summary": "Agent-declared · Unverified"
      },
      {
        "severity": "blocked",
        "title": "A · ARC adapter 职责仍需收窄",
        "summary": "Pi ARC extension 仍混合环境工具、观测投影、context hook、研究辅助和 self-harness gate。",
        "object_id": "issue.adapter_boundary"
      },
      {
        "severity": "blocked",
        "title": "Capture scope and untracked-source limits",
        "summary": "Refreshed bounded inventory contains 171 entries; this is not a claim of whole-worktree coverage.",
        "object_id": "issue.capture_coverage"
      },
      {
        "severity": "blocked",
        "title": "D · 压缩后的认知连续性",
        "summary": "落盘可恢复尚不能证明关键假设、排除项和决策理由仍进入后续模型上下文。",
        "object_id": "issue.cognitive_continuity"
      },
      {
        "severity": "blocked",
        "title": "C · Parent-mediated experiment requests",
        "summary": "Structured experiment_request is normalized in child output, surfaced through task_harness inbox, and associated with parent ARC action receipts. Task-local action sequences return plans rather than executing live actions.",
        "object_id": "issue.parent_child_experiments"
      },
      {
        "severity": "blocked",
        "title": "真实 Provider 与 ARC 闭环验收未完成",
        "summary": "deterministic runner 能证明 wiring/lifecycle 可达，不能证明真实模型行为或游戏质量。",
        "object_id": "issue.real_provider_acceptance"
      },
      {
        "severity": "blocked",
        "title": "B · 离线研究目的与可观测条件",
        "summary": "研究目的和可见轨迹范围尚缺系统对照，不能只增加 prompt 标签。",
        "object_id": "issue.research_observability"
      }
    ],
    "knowledge": {
      "mapped_objects": 26,
      "evidence_links": 65,
      "unverified_claims": 52
    }
  },
  "/projects/workspace/knowledge": {
    "verification": "agent_declared_unverified",
    "objects": [
      {
        "object_id": "component.evidence_verification",
        "kind": "component",
        "title": "投影、评测与验收层",
        "summary": "Python projections, deterministic smoke providers, pytest diagnostics and real runners",
        "state": "proposed",
        "evidence_ids": [
          "evidence:44063cacc6409b9d",
          "evidence:1b180cd30a759674",
          "evidence:9c1f8c5510efae85",
          "evidence:80ccb1a09f25f538",
          "evidence:d2da1162401b9948",
          "evidence:4d97c7a4f6628098"
        ],
        "claim_ids": [
          "claim:component.evidence_verification:mapping",
          "claim:component.evidence_verification:detail"
        ]
      },
      {
        "object_id": "component.pi_extensions",
        "kind": "component",
        "title": "Pi Benchmark 扩展与工具面",
        "summary": "TypeScript loaded inside the Pi process",
        "state": "proposed",
        "evidence_ids": [
          "evidence:2c6ba7635090bd19",
          "evidence:8529d6105017ab7e",
          "evidence:c7acdeba472eed14",
          "evidence:820fd65aee5fddfb",
          "evidence:ed69c972461d80f6",
          "evidence:21db8090de84d0aa"
        ],
        "claim_ids": [
          "claim:component.pi_extensions:mapping",
          "claim:component.pi_extensions:detail"
        ]
      },
      {
        "object_id": "component.self_harness",
        "kind": "component",
        "title": "任务内 Self-Harness",
        "summary": "Pi extension handlers plus append-only task resources",
        "state": "proposed",
        "evidence_ids": [
          "evidence:097519fa78b51821",
          "evidence:9e5f5cb05682b7cc",
          "evidence:d51b334dbdec684a",
          "evidence:a75f97a8cb817b82",
          "evidence:9ac5181a1a3fd736",
          "evidence:bdf074f8f36dbc8e",
          "evidence:71fc3c0ecb6bcb0a"
        ],
        "claim_ids": [
          "claim:component.self_harness:mapping",
          "claim:component.self_harness:detail"
        ]
      },
      {
        "object_id": "external.arc_service",
        "kind": "external",
        "title": "官方 ARC-AGI-3 环境",
        "summary": "official ARC Python SDK and online service",
        "state": "proposed",
        "evidence_ids": [
          "evidence:af728c96d55197fb",
          "evidence:3bd63b2ff9bed057",
          "evidence:198c6a5a0a97838d",
          "evidence:7f7a608038ce2a74"
        ],
        "claim_ids": [
          "claim:external.arc_service:mapping",
          "claim:external.arc_service:detail"
        ]
      },
      {
        "object_id": "external.model_provider",
        "kind": "external",
        "title": "模型 Provider",
        "summary": "OpenAI-compatible/provider API or deterministic test extension",
        "state": "proposed",
        "evidence_ids": [
          "evidence:af728c96d55197fb",
          "evidence:16850ef81b1282e1",
          "evidence:816f33656b11eeee",
          "evidence:a4df09098fbad459"
        ],
        "claim_ids": [
          "claim:external.model_provider:mapping",
          "claim:external.model_provider:detail"
        ]
      },
      {
        "object_id": "issue.adapter_boundary",
        "kind": "issue",
        "title": "A · ARC adapter 职责仍需收窄",
        "summary": "Pi ARC extension 仍混合环境工具、观测投影、context hook、研究辅助和 self-harness gate。",
        "state": "blocked",
        "evidence_ids": [
          "evidence:84c071e7efa1de02",
          "evidence:2c6ba7635090bd19",
          "evidence:8529d6105017ab7e",
          "evidence:7f7a608038ce2a74"
        ],
        "claim_ids": [
          "claim:issue.adapter_boundary:mapping",
          "claim:issue.adapter_boundary:detail"
        ]
      },
      {
        "object_id": "issue.capture_coverage",
        "kind": "issue",
        "title": "Capture scope and untracked-source limits",
        "summary": "Refreshed bounded inventory contains 171 entries; this is not a claim of whole-worktree coverage.",
        "state": "blocked",
        "evidence_ids": [
          "evidence:6eb0bf797fa0086f",
          "evidence:a553f9bd85444f83",
          "evidence:1ebd33113e367fd3",
          "evidence:aacb9956658fa8c5",
          "evidence:62dd92f58976964d",
          "evidence:55ec91782654a13a",
          "evidence:840e6eb966a1b87a",
          "evidence:779d4cb112c3c2b2"
        ],
        "claim_ids": [
          "claim:issue.capture_coverage:mapping",
          "claim:issue.capture_coverage:detail"
        ]
      },
      {
        "object_id": "issue.cognitive_continuity",
        "kind": "issue",
        "title": "D · 压缩后的认知连续性",
        "summary": "落盘可恢复尚不能证明关键假设、排除项和决策理由仍进入后续模型上下文。",
        "state": "blocked",
        "evidence_ids": [
          "evidence:84c071e7efa1de02",
          "evidence:d51b334dbdec684a",
          "evidence:840e6eb966a1b87a"
        ],
        "claim_ids": [
          "claim:issue.cognitive_continuity:mapping",
          "claim:issue.cognitive_continuity:detail"
        ]
      },
      {
        "object_id": "issue.parent_child_experiments",
        "kind": "issue",
        "title": "C · Parent-mediated experiment requests",
        "summary": "Structured experiment_request is normalized in child output, surfaced through task_harness inbox, and associated with parent ARC action receipts. Task-local action sequences return plans rather than executing live actions.",
        "state": "blocked",
        "evidence_ids": [
          "evidence:728c6e8f436f2dc1",
          "evidence:2c6ba7635090bd19",
          "evidence:a75f97a8cb817b82",
          "evidence:8529d6105017ab7e"
        ],
        "claim_ids": [
          "claim:issue.parent_child_experiments:mapping",
          "claim:issue.parent_child_experiments:detail"
        ]
      },
      {
        "object_id": "issue.real_provider_acceptance",
        "kind": "issue",
        "title": "真实 Provider 与 ARC 闭环验收未完成",
        "summary": "deterministic runner 能证明 wiring/lifecycle 可达，不能证明真实模型行为或游戏质量。",
        "state": "blocked",
        "evidence_ids": [
          "evidence:44063cacc6409b9d",
          "evidence:1b180cd30a759674",
          "evidence:4d97c7a4f6628098"
        ],
        "claim_ids": [
          "claim:issue.real_provider_acceptance:mapping",
          "claim:issue.real_provider_acceptance:detail"
        ]
      },
      {
        "object_id": "issue.research_observability",
        "kind": "issue",
        "title": "B · 离线研究目的与可观测条件",
        "summary": "研究目的和可见轨迹范围尚缺系统对照，不能只增加 prompt 标签。",
        "state": "blocked",
        "evidence_ids": [
          "evidence:84c071e7efa1de02",
          "evidence:ce28b14f59e9dd24"
        ],
        "claim_ids": [
          "claim:issue.research_observability:mapping",
          "claim:issue.research_observability:detail"
        ]
      },
      {
        "object_id": "mechanism.acceptance_evidence",
        "kind": "mechanism",
        "title": "分层证据与验收",
        "summary": "把任务正确性、研究闭环、组件使用、harness 语义效果与真实 provider/benchmark 收益分层记录。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:44063cacc6409b9d",
          "evidence:1b180cd30a759674",
          "evidence:80ccb1a09f25f538",
          "evidence:d2da1162401b9948",
          "evidence:4d97c7a4f6628098"
        ],
        "claim_ids": [
          "claim:mechanism.acceptance_evidence:mapping",
          "claim:mechanism.acceptance_evidence:detail"
        ]
      },
      {
        "object_id": "mechanism.context_knowledge_lifecycle",
        "kind": "mechanism",
        "title": "上下文与知识生命周期",
        "summary": "用版本依赖、失效传播、checkpoint、memory/finding 与条件投影维持任务内知识。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:d51b334dbdec684a",
          "evidence:840e6eb966a1b87a",
          "evidence:376d0bc5cf0031af",
          "evidence:58fb31ac5379bde9",
          "evidence:91e6e38abd5cf9fc"
        ],
        "claim_ids": [
          "claim:mechanism.context_knowledge_lifecycle:mapping",
          "claim:mechanism.context_knowledge_lifecycle:detail"
        ]
      },
      {
        "object_id": "mechanism.harness_delivery",
        "kind": "mechanism",
        "title": "HarnessDelivery 路由",
        "summary": "将获批研究交付编译为 system_prompt、skills、memory、tools、subagents 五类确定性 route，并在后续父 turn 投影可用面。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:097519fa78b51821",
          "evidence:9e5f5cb05682b7cc",
          "evidence:a75f97a8cb817b82",
          "evidence:62dd92f58976964d",
          "evidence:71fc3c0ecb6bcb0a"
        ],
        "claim_ids": [
          "claim:mechanism.harness_delivery:mapping",
          "claim:mechanism.harness_delivery:detail"
        ]
      },
      {
        "object_id": "mechanism.research_lifecycle",
        "kind": "mechanism",
        "title": "Auto-Research 生命周期",
        "summary": "父 Agent 选择问题与证据边界，broker 启动隔离 child；child 产出结构化 report/checkpoint，父侧审批交付并记录 continuation。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:c7acdeba472eed14",
          "evidence:728c6e8f436f2dc1",
          "evidence:1ebd33113e367fd3",
          "evidence:a553f9bd85444f83",
          "evidence:60a43e84771ee335",
          "evidence:b20bb2a8604e5866"
        ],
        "claim_ids": [
          "claim:mechanism.research_lifecycle:mapping",
          "claim:mechanism.research_lifecycle:detail"
        ]
      },
      {
        "object_id": "principle.narrow_adapter",
        "kind": "principle",
        "title": "窄环境适配器",
        "summary": "adapter 返回 canonical 环境状态并执行具体 action；研究、权限、上下文和策略属于 Agent 侧。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:84c071e7efa1de02",
          "evidence:088263014f58e239",
          "evidence:198c6a5a0a97838d"
        ],
        "claim_ids": [
          "claim:principle.narrow_adapter:mapping",
          "claim:principle.narrow_adapter:detail"
        ]
      },
      {
        "object_id": "principle.pi_native_core",
        "kind": "principle",
        "title": "Pi 原生决策核心",
        "summary": "父 Agent 的模型对话与工具循环由 Pi 原生 loop 持有，Python PiKernel 只承担薄 RPC、会话与事件编排。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:af728c96d55197fb",
          "evidence:b81231f2207ebe34",
          "evidence:b010450d0871c9ac",
          "evidence:779d4cb112c3c2b2"
        ],
        "claim_ids": [
          "claim:principle.pi_native_core:mapping",
          "claim:principle.pi_native_core:detail"
        ]
      },
      {
        "object_id": "principle.single_life_control",
        "kind": "principle",
        "title": "单次生命控制权",
        "summary": "单条不可回退环境历史中 main agent 独占逐步交互和结果上下文；child 只能请求预算内实验。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:130efec385816e0a",
          "evidence:84c071e7efa1de02"
        ],
        "claim_ids": [
          "claim:principle.single_life_control:mapping",
          "claim:principle.single_life_control:detail"
        ]
      },
      {
        "object_id": "principle.task_local_isolation",
        "kind": "principle",
        "title": "任务内隔离与可追溯变更",
        "summary": "Harness 和研究资源写入当前 run/task root，采用追加式 ledger、版本化资源与精确引用。",
        "state": "implemented",
        "evidence_ids": [
          "evidence:bdf074f8f36dbc8e",
          "evidence:a75f97a8cb817b82",
          "evidence:71fc3c0ecb6bcb0a"
        ],
        "claim_ids": [
          "claim:principle.task_local_isolation:mapping",
          "claim:principle.task_local_isolation:detail"
        ]
      },
      {
        "object_id": "runtime.arc_bridge",
        "kind": "runtime",
        "title": "本地 ARC Bridge",
        "summary": "Python localhost ThreadingHTTPServer under ARC SDK interpreter",
        "state": "proposed",
        "evidence_ids": [
          "evidence:8cf4d7c5a72a2e8a",
          "evidence:2064941d85faeea8",
          "evidence:0847fc5078e6d53c",
          "evidence:088263014f58e239",
          "evidence:198c6a5a0a97838d",
          "evidence:793df7767c80111b"
        ],
        "claim_ids": [
          "claim:runtime.arc_bridge:mapping",
          "claim:runtime.arc_bridge:detail"
        ]
      },
      {
        "object_id": "runtime.auto_research_children",
        "kind": "runtime",
        "title": "Auto-Research 与委派 Child",
        "summary": "separate Pi child sessions/processes",
        "state": "proposed",
        "evidence_ids": [
          "evidence:fb12076b6ccd7901",
          "evidence:728c6e8f436f2dc1",
          "evidence:5fc2ff364a3fd334",
          "evidence:700f0b1361a3d1b9",
          "evidence:e53bb2626cf7c797",
          "evidence:b20bb2a8604e5866"
        ],
        "claim_ids": [
          "claim:runtime.auto_research_children:mapping",
          "claim:runtime.auto_research_children:detail"
        ]
      },
      {
        "object_id": "runtime.benchmark_backends",
        "kind": "runtime",
        "title": "OfficeBench / Shopping / Terminal-Bench 后端",
        "summary": "JIT subprocess bridges, evaluator imports, or Harbor/Docker",
        "state": "proposed",
        "evidence_ids": [
          "evidence:64c6137ddc0e99c0",
          "evidence:6743e678b5855ec8",
          "evidence:d6386c0cf5067f65",
          "evidence:8ffca3302c50cbaf",
          "evidence:fcf21254e5dd5177",
          "evidence:f4a1d4fca92eb15b"
        ],
        "claim_ids": [
          "claim:runtime.benchmark_backends:mapping",
          "claim:runtime.benchmark_backends:detail"
        ]
      },
      {
        "object_id": "runtime.cli_runner",
        "kind": "runtime",
        "title": "CLI 与实验 Runner",
        "summary": "Python process",
        "state": "proposed",
        "evidence_ids": [
          "evidence:7f7a608038ce2a74",
          "evidence:aad6d9c779193035",
          "evidence:6743e678b5855ec8",
          "evidence:8ffca3302c50cbaf",
          "evidence:f4a1d4fca92eb15b"
        ],
        "claim_ids": [
          "claim:runtime.cli_runner:mapping",
          "claim:runtime.cli_runner:detail"
        ]
      },
      {
        "object_id": "runtime.pi_agent",
        "kind": "runtime",
        "title": "Pi 原生 Agent Loop",
        "summary": "pi --mode rpc child process",
        "state": "proposed",
        "evidence_ids": [
          "evidence:af728c96d55197fb",
          "evidence:b81231f2207ebe34",
          "evidence:b010450d0871c9ac",
          "evidence:5470506236b6e077",
          "evidence:6e6559d81f6d8bd4"
        ],
        "claim_ids": [
          "claim:runtime.pi_agent:mapping",
          "claim:runtime.pi_agent:detail"
        ]
      },
      {
        "object_id": "runtime.subagent_broker",
        "kind": "runtime",
        "title": "后台 Child Broker",
        "summary": "Python localhost HTTP server",
        "state": "proposed",
        "evidence_ids": [
          "evidence:7f7a608038ce2a74",
          "evidence:60a43e84771ee335",
          "evidence:0ac2c3fcbc87a7a6"
        ],
        "claim_ids": [
          "claim:runtime.subagent_broker:mapping",
          "claim:runtime.subagent_broker:detail"
        ]
      },
      {
        "object_id": "store.run_artifacts",
        "kind": "store",
        "title": "Run-local 持久状态与证据库",
        "summary": "filesystem JSON/JSONL/Markdown/artifacts under run root",
        "state": "proposed",
        "evidence_ids": [
          "evidence:af728c96d55197fb",
          "evidence:16850ef81b1282e1",
          "evidence:bdf074f8f36dbc8e",
          "evidence:58fb31ac5379bde9",
          "evidence:7b134628b37f4a7a"
        ],
        "claim_ids": [
          "claim:store.run_artifacts:mapping",
          "claim:store.run_artifacts:detail"
        ]
      }
    ],
    "claims": [
      {
        "object_id": "component.evidence_verification",
        "statement": "投影、评测与验收层 is mapped as component in the published architecture."
      },
      {
        "object_id": "component.evidence_verification",
        "statement": "投影、评测与验收层: Python projections, deterministic smoke providers, pytest diagnostics and real runners"
      },
      {
        "object_id": "component.pi_extensions",
        "statement": "Pi Benchmark 扩展与工具面 is mapped as component in the published architecture."
      },
      {
        "object_id": "component.pi_extensions",
        "statement": "Pi Benchmark 扩展与工具面: TypeScript loaded inside the Pi process"
      },
      {
        "object_id": "component.self_harness",
        "statement": "任务内 Self-Harness is mapped as component in the published architecture."
      },
      {
        "object_id": "component.self_harness",
        "statement": "任务内 Self-Harness: Pi extension handlers plus append-only task resources"
      },
      {
        "object_id": "external.arc_service",
        "statement": "官方 ARC-AGI-3 环境 is mapped as external in the published architecture."
      },
      {
        "object_id": "external.arc_service",
        "statement": "官方 ARC-AGI-3 环境: official ARC Python SDK and online service"
      },
      {
        "object_id": "external.model_provider",
        "statement": "模型 Provider is mapped as external in the published architecture."
      },
      {
        "object_id": "external.model_provider",
        "statement": "模型 Provider: OpenAI-compatible/provider API or deterministic test extension"
      },
      {
        "object_id": "issue.adapter_boundary",
        "statement": "A · ARC adapter 职责仍需收窄 is mapped as issue in the published architecture."
      },
      {
        "object_id": "issue.adapter_boundary",
        "statement": "A · ARC adapter 职责仍需收窄: Pi ARC extension 仍混合环境工具、观测投影、context hook、研究辅助和 self-harness gate。"
      },
      {
        "object_id": "issue.capture_coverage",
        "statement": "Capture scope and untracked-source limits is mapped as issue in the published architecture."
      },
      {
        "object_id": "issue.capture_coverage",
        "statement": "Capture scope and untracked-source limits: Refreshed bounded inventory contains 171 entries; this is not a claim of whole-worktree coverage."
      },
      {
        "object_id": "issue.cognitive_continuity",
        "statement": "D · 压缩后的认知连续性 is mapped as issue in the published architecture."
      },
      {
        "object_id": "issue.cognitive_continuity",
        "statement": "D · 压缩后的认知连续性: 落盘可恢复尚不能证明关键假设、排除项和决策理由仍进入后续模型上下文。"
      },
      {
        "object_id": "issue.parent_child_experiments",
        "statement": "C · Parent-mediated experiment requests is mapped as issue in the published architecture."
      },
      {
        "object_id": "issue.parent_child_experiments",
        "statement": "C · Parent-mediated experiment requests: Structured experiment_request is normalized in child output, surfaced through task_harness inbox, and associated with parent ARC action receipts. Task-local action sequences return plans rather than executing live actions."
      },
      {
        "object_id": "issue.real_provider_acceptance",
        "statement": "真实 Provider 与 ARC 闭环验收未完成 is mapped as issue in the published architecture."
      },
      {
        "object_id": "issue.real_provider_acceptance",
        "statement": "真实 Provider 与 ARC 闭环验收未完成: deterministic runner 能证明 wiring/lifecycle 可达，不能证明真实模型行为或游戏质量。"
      },
      {
        "object_id": "issue.research_observability",
        "statement": "B · 离线研究目的与可观测条件 is mapped as issue in the published architecture."
      },
      {
        "object_id": "issue.research_observability",
        "statement": "B · 离线研究目的与可观测条件: 研究目的和可见轨迹范围尚缺系统对照，不能只增加 prompt 标签。"
      },
      {
        "object_id": "mechanism.acceptance_evidence",
        "statement": "分层证据与验收 is mapped as mechanism in the published architecture."
      },
      {
        "object_id": "mechanism.acceptance_evidence",
        "statement": "分层证据与验收: 把任务正确性、研究闭环、组件使用、harness 语义效果与真实 provider/benchmark 收益分层记录。"
      },
      {
        "object_id": "mechanism.context_knowledge_lifecycle",
        "statement": "上下文与知识生命周期 is mapped as mechanism in the published architecture."
      },
      {
        "object_id": "mechanism.context_knowledge_lifecycle",
        "statement": "上下文与知识生命周期: 用版本依赖、失效传播、checkpoint、memory/finding 与条件投影维持任务内知识。"
      },
      {
        "object_id": "mechanism.harness_delivery",
        "statement": "HarnessDelivery 路由 is mapped as mechanism in the published architecture."
      },
      {
        "object_id": "mechanism.harness_delivery",
        "statement": "HarnessDelivery 路由: 将获批研究交付编译为 system_prompt、skills、memory、tools、subagents 五类确定性 route，并在后续父 turn 投影可用面。"
      },
      {
        "object_id": "mechanism.research_lifecycle",
        "statement": "Auto-Research 生命周期 is mapped as mechanism in the published architecture."
      },
      {
        "object_id": "mechanism.research_lifecycle",
        "statement": "Auto-Research 生命周期: 父 Agent 选择问题与证据边界，broker 启动隔离 child；child 产出结构化 report/checkpoint，父侧审批交付并记录 continuation。"
      },
      {
        "object_id": "principle.narrow_adapter",
        "statement": "窄环境适配器 is mapped as principle in the published architecture."
      },
      {
        "object_id": "principle.narrow_adapter",
        "statement": "窄环境适配器: adapter 返回 canonical 环境状态并执行具体 action；研究、权限、上下文和策略属于 Agent 侧。"
      },
      {
        "object_id": "principle.pi_native_core",
        "statement": "Pi 原生决策核心 is mapped as principle in the published architecture."
      },
      {
        "object_id": "principle.pi_native_core",
        "statement": "Pi 原生决策核心: 父 Agent 的模型对话与工具循环由 Pi 原生 loop 持有，Python PiKernel 只承担薄 RPC、会话与事件编排。"
      },
      {
        "object_id": "principle.single_life_control",
        "statement": "单次生命控制权 is mapped as principle in the published architecture."
      },
      {
        "object_id": "principle.single_life_control",
        "statement": "单次生命控制权: 单条不可回退环境历史中 main agent 独占逐步交互和结果上下文；child 只能请求预算内实验。"
      },
      {
        "object_id": "principle.task_local_isolation",
        "statement": "任务内隔离与可追溯变更 is mapped as principle in the published architecture."
      },
      {
        "object_id": "principle.task_local_isolation",
        "statement": "任务内隔离与可追溯变更: Harness 和研究资源写入当前 run/task root，采用追加式 ledger、版本化资源与精确引用。"
      },
      {
        "object_id": "runtime.arc_bridge",
        "statement": "本地 ARC Bridge is mapped as runtime in the published architecture."
      },
      {
        "object_id": "runtime.arc_bridge",
        "statement": "本地 ARC Bridge: Python localhost ThreadingHTTPServer under ARC SDK interpreter"
      },
      {
        "object_id": "runtime.auto_research_children",
        "statement": "Auto-Research 与委派 Child is mapped as runtime in the published architecture."
      },
      {
        "object_id": "runtime.auto_research_children",
        "statement": "Auto-Research 与委派 Child: separate Pi child sessions/processes"
      },
      {
        "object_id": "runtime.benchmark_backends",
        "statement": "OfficeBench / Shopping / Terminal-Bench 后端 is mapped as runtime in the published architecture."
      },
      {
        "object_id": "runtime.benchmark_backends",
        "statement": "OfficeBench / Shopping / Terminal-Bench 后端: JIT subprocess bridges, evaluator imports, or Harbor/Docker"
      },
      {
        "object_id": "runtime.cli_runner",
        "statement": "CLI 与实验 Runner is mapped as runtime in the published architecture."
      },
      {
        "object_id": "runtime.cli_runner",
        "statement": "CLI 与实验 Runner: Python process"
      },
      {
        "object_id": "runtime.pi_agent",
        "statement": "Pi 原生 Agent Loop is mapped as runtime in the published architecture."
      },
      {
        "object_id": "runtime.pi_agent",
        "statement": "Pi 原生 Agent Loop: pi --mode rpc child process"
      },
      {
        "object_id": "runtime.subagent_broker",
        "statement": "后台 Child Broker is mapped as runtime in the published architecture."
      },
      {
        "object_id": "runtime.subagent_broker",
        "statement": "后台 Child Broker: Python localhost HTTP server"
      },
      {
        "object_id": "store.run_artifacts",
        "statement": "Run-local 持久状态与证据库 is mapped as store in the published architecture."
      },
      {
        "object_id": "store.run_artifacts",
        "statement": "Run-local 持久状态与证据库: filesystem JSON/JSONL/Markdown/artifacts under run root"
      }
    ],
    "evidence": [
      {
        "evidence_id": "evidence:0847fc5078e6d53c",
        "relation": "implemented_by",
        "locator": "demo/pi_arc_trajectory_resource.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:088263014f58e239",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/arc_agi_3_adapter.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:097519fa78b51821",
        "relation": "implemented_by",
        "locator": "demo/pi_auto_research_harness_router.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:0ac2c3fcbc87a7a6",
        "relation": "implemented_by",
        "locator": "tests/test_task_research_context.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:130efec385816e0a",
        "relation": "implemented_by",
        "locator": "docs/plans/2026-09-20-agent-native-single-life-harness.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:16850ef81b1282e1",
        "relation": "implemented_by",
        "locator": "demo/pi_provider_telemetry.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:198c6a5a0a97838d",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/arc_agi_3_bridge.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:1b180cd30a759674",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/arc_harness_smoke.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:1ebd33113e367fd3",
        "relation": "implemented_by",
        "locator": "demo/pi_auto_research_protocol.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:2064941d85faeea8",
        "relation": "implemented_by",
        "locator": "demo/pi_arc_bridge_client.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:21db8090de84d0aa",
        "relation": "implemented_by",
        "locator": "demo/pi_terminal_bench_extension.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:2c6ba7635090bd19",
        "relation": "implemented_by",
        "locator": "demo/pi_arc_agi_3_extension.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:376d0bc5cf0031af",
        "relation": "implemented_by",
        "locator": "demo/pi_task_checkpoint_reader.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:3bd63b2ff9bed057",
        "relation": "implemented_by",
        "locator": "docs/plans/2026-09-10-arc-agi-3-terminal-bench-adapters.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:44063cacc6409b9d",
        "relation": "implemented_by",
        "locator": "AGENTS.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:4d97c7a4f6628098",
        "relation": "implemented_by",
        "locator": "tests/test_auto_research_self_harness_smoke.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:5470506236b6e077",
        "relation": "implemented_by",
        "locator": "tests/test_pi_kernel.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:55ec91782654a13a",
        "relation": "implemented_by",
        "locator": "demo/pi_harness_review.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:58fb31ac5379bde9",
        "relation": "implemented_by",
        "locator": "docs/adr/0002-generic-task-local-context-lifecycle.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:5fc2ff364a3fd334",
        "relation": "implemented_by",
        "locator": "demo/pi_task_local_subagents.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:60a43e84771ee335",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/subagent_broker.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:62dd92f58976964d",
        "relation": "implemented_by",
        "locator": "demo/pi_harness_protocol.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:64c6137ddc0e99c0",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/jit_adapter.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:6743e678b5855ec8",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/officebench_e2e.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:6e6559d81f6d8bd4",
        "relation": "implemented_by",
        "locator": "tests/test_task_agent.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:6eb0bf797fa0086f",
        "relation": "implemented_by",
        "locator": "demo/pi_auto_research_evidence.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:700f0b1361a3d1b9",
        "relation": "implemented_by",
        "locator": "demo/pi_task_validation_child.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:71fc3c0ecb6bcb0a",
        "relation": "implemented_by",
        "locator": "docs/auto-research-task-local-self-harness-protocol.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:728c6e8f436f2dc1",
        "relation": "implemented_by",
        "locator": "demo/pi_auto_research_output.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:779d4cb112c3c2b2",
        "relation": "implemented_by",
        "locator": "docs/current-architecture-and-mechanisms-2026-09-18.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:793df7767c80111b",
        "relation": "implemented_by",
        "locator": "tests/test_arc_agi_3_e2e.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:7b134628b37f4a7a",
        "relation": "implemented_by",
        "locator": "docs/research-resource-agent-view.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:7f7a608038ce2a74",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/arc_agi_3_e2e.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:80ccb1a09f25f538",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/research_evidence.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:816f33656b11eeee",
        "relation": "implemented_by",
        "locator": "tests/pi_external_benchmark_provider.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:820fd65aee5fddfb",
        "relation": "implemented_by",
        "locator": "demo/pi_officebench_e2e_extension.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:840e6eb966a1b87a",
        "relation": "implemented_by",
        "locator": "demo/pi_task_knowledge_lifecycle.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:84c071e7efa1de02",
        "relation": "implemented_by",
        "locator": "docs/deferred-research-todos.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:8529d6105017ab7e",
        "relation": "implemented_by",
        "locator": "demo/pi_arc_task_tools.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:8cf4d7c5a72a2e8a",
        "relation": "implemented_by",
        "locator": "demo/arc_agi_3_official_adapter.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:8ffca3302c50cbaf",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/shopping_e2e.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:91e6e38abd5cf9fc",
        "relation": "implemented_by",
        "locator": "docs/plans/2026-09-18-harness-knowledge-lifecycle.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:9ac5181a1a3fd736",
        "relation": "implemented_by",
        "locator": "demo/pi_task_local_tools.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:9c1f8c5510efae85",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/observation_compaction_evidence.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:9e5f5cb05682b7cc",
        "relation": "implemented_by",
        "locator": "demo/pi_auto_research_harness_schema.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:a4df09098fbad459",
        "relation": "implemented_by",
        "locator": "tools/arc_harness_smoke_provider.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:a553f9bd85444f83",
        "relation": "implemented_by",
        "locator": "demo/pi_auto_research_handoff.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:a75f97a8cb817b82",
        "relation": "implemented_by",
        "locator": "demo/pi_task_local_self_harness.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:aacb9956658fa8c5",
        "relation": "implemented_by",
        "locator": "demo/pi_harness_control.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:aad6d9c779193035",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/cli.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:af728c96d55197fb",
        "relation": "implemented_by",
        "locator": "README.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:b010450d0871c9ac",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/task_agent.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:b20bb2a8604e5866",
        "relation": "implemented_by",
        "locator": "docs/adr/0003-bounded-auto-research-output.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:b81231f2207ebe34",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/pi_kernel.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:bdf074f8f36dbc8e",
        "relation": "implemented_by",
        "locator": "demo/pi_task_resource_store.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:c7acdeba472eed14",
        "relation": "implemented_by",
        "locator": "demo/pi_external_benchmark_research.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:ce28b14f59e9dd24",
        "relation": "implemented_by",
        "locator": "docs/plans/2026-09-18-grounded-auto-research-guidance.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:d2da1162401b9948",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/validation_evidence.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:d51b334dbdec684a",
        "relation": "implemented_by",
        "locator": "demo/pi_task_local_context_lifecycle.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:d6386c0cf5067f65",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/officebench_tool_bridge.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:e53bb2626cf7c797",
        "relation": "implemented_by",
        "locator": "demo/prompts/auto_research_child_contract.md",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:ed69c972461d80f6",
        "relation": "implemented_by",
        "locator": "demo/pi_shopping_e2e_extension.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:f4a1d4fca92eb15b",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/terminal_bench_e2e.py",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:fb12076b6ccd7901",
        "relation": "implemented_by",
        "locator": "demo/pi_auto_research_approvals.ts",
        "status": "locator_only"
      },
      {
        "evidence_id": "evidence:fcf21254e5dd5177",
        "relation": "implemented_by",
        "locator": "src/autoresearch_pi/shopping_tool_bridge.py",
        "status": "locator_only"
      }
    ]
  }
};
  return { fetch: function (path) {
    var found = Object.prototype.hasOwnProperty.call(data, path);
    return Promise.resolve({ ok: found, status: found ? 200 : 404, json: function () { return Promise.resolve(JSON.parse(JSON.stringify(data[path] || {}))); } });
  } };
}());

