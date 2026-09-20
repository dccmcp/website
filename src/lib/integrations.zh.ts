/**
 * Chinese overrides for the integration records in `integrations.ts`.
 *
 * Only the fields a reader actually reads are translated. Tool names and their
 * signatures stay in English on purpose: they are the literal API surface an
 * agent calls, and Chinese developer documentation keeps them untranslated.
 */
export type IntegrationZh = {
  tagline: string;
  summary: string;
  heroLead: string;
  problems: { title: string; body: string }[];
  workflows: { title: string; body: string }[];
  install: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  toolNote: string;
  specLabels: Record<string, string>;
};

export const integrationZh: Record<string, IntegrationZh> = {
  "mcp-for-blender": {
    tagline: "把 AI Agent 接入 Blender —— 场景结构、几何节点、渲染与批量自动化。",
    summary:
      "一个本地 MCP Server 加一个 Blender 插件，为 Agent 提供类型化、可审计的工具：场景检查、建模、几何节点、材质、渲染与无界面批处理。",
    heroLead:
      "给 Agent 一个真实的 Blender 会话，而不是一个空白的 Python 提示框。每次调用都经过类型校验、对照当前场景验证，并写入审计日志。",
    problems: [
      {
        title: "生成的脚本假设了一个并不存在的场景",
        body: "写 bpy 代码的模型从没见过你的文件。它靠猜集合名、对象路径和修改器栈，跑到一半失败，留下一个改坏了一半的场景。",
      },
      {
        title: "一次崩溃赔掉一小时的工作",
        body: "在没有检查点的情况下调用破坏性操作，可能损坏场景、破坏链接库，甚至把视口一起拖垮。",
      },
      {
        title: "没人能复核模型到底做了什么",
        body: "无人值守的自动化如果没记录——改了哪个对象、谁改的、什么时候——工作室就无法签核。",
      },
    ],
    workflows: [
      {
        title: "先读取，再动手",
        body: "Agent 先调用 scene.inspect，拿到集合、对象、修改器、材质与单位制的结构化摘要，然后才提出改动方案。",
      },
      {
        title: "类型化工具，而不是自由发挥的 bpy",
        body: "工具接收经过校验的 schema——网格名、带单位的尺寸、插槽索引。非法调用在边界就被拒绝，而不是在渲染到一半时出错。",
      },
      {
        title: "带检查点的写操作",
        body: "每个修改型工具都运行在可预览、可应用、可回滚的事务里，Blender 自身的撤销历史也保持完整，方便人工收拾。",
      },
      {
        title: "批处理与无界面一致",
        body: "同一套工具面也能驱动后台模式下的 Blender，Agent 可以在渲染农场上按完全一致的语义批量生成变体。",
      },
    ],
    install: [
      {
        title: "安装插件",
        body: "把 DCCMCP 插件装进 Blender，在「偏好设置 → 插件」里启用。插件只开一个本地控制通道，默认不会监听任何公网接口。",
      },
      {
        title: "启动 MCP Server",
        body: "在项目目录下启动服务，它会自动发现正在运行的 Blender 会话，并把工具清单广播给客户端。",
      },
      {
        title: "注册到你的 Agent",
        body: "把服务写进 MCP 客户端配置。Claude Code、Codex、Cursor、OpenClaw、VS Code 或任何兼容 MCP 的客户端，走的是同一套 stdio 或 HTTP 传输。",
      },
      {
        title: "设置策略",
        body: "决定哪些工具自动放行、哪些需要人工确认、哪些在生产文件里直接禁用。默认是只读。",
      },
    ],
    faq: [
      {
        q: "MCP for Blender 会把我的 .blend 文件上传到云端吗？",
        a: "不会。服务运行在你自己的机器上，只和本地的 Blender 进程通信。只有当你显式为工作室部署配置了远程 HTTP 传输时，场景数据才可能离开你的网络——即便如此，也只传输 Agent 主动请求的工具结果。",
      },
      {
        q: "Agent 会不会把我的生产场景弄坏？",
        a: "修改型工具受策略层管控。默认配置是只读；破坏性操作前会创建检查点；每次调用都可以通过 Blender 自身的撤销栈加上 DCCMCP 检查点回滚。",
      },
      {
        q: "支持 Blender 后台模式吗？",
        a: "支持。同一套工具面在 -b/--background 会话里同样可用，工作室的变体生成与渲染农场就是这么驱动的。",
      },
      {
        q: "支持哪些 Blender 版本？",
        a: "Blender 4.2 LTS 及更新版本，含 4.5 LTS 与 5.x。旧版 3.x 支持放在企业版通道。",
      },
      {
        q: "这跟让模型直接写 bpy 脚本有什么区别？",
        a: "生成的脚本没有校验、无法单独运行、也无法复核。DCCMCP 提供的是一套稳定、可发现、带 schema、带权限和审计的工具面——Agent 是在契约上工作，而不是在猜测上工作。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Modes: "运行模式",
      Platforms: "支持平台",
    },
  },

  "mcp-for-maya": {
    tagline: "把 AI Agent 接入 Maya —— 场景组装、绑定、动画曲线与批量渲染。",
    summary:
      "一个 MCP Server 加一个 Maya 模块，让 Agent 以类型化方式访问场景图、DG 连线、引用与命名空间、动画曲线，以及 mayapy 无界面批处理。",
    heroLead:
      "Maya 场景首先是图结构、引用和命名空间，其次才是形状。Agent 针对这套结构工作——解析名称、尊重引用，绝不去猜自己刚刚重连了哪个节点。",
    problems: [
      {
        title: "命名空间会悄悄让所有硬编码名称失效",
        body: "在美术的会话里能跑的脚本，到了镜头文件就报错——因为引用进来变成了 props_v003:pCube1。Agent 必须先解析名称，而不是等到报错。",
      },
      {
        title: "一次错误的图连线就毁掉绑定",
        body: "重连一条 DG 连接、覆盖一个驱动关键帧，会悄悄破坏花了整整一周做出来的绑定，而问题往往在下一轮动画才暴露。",
      },
      {
        title: "重场景经不起试探性自动化",
        body: "为了回答一个问题就打开、求值、重建整个场景的 Agent，在生产镜头上根本没法用。读取必须是有范围、低成本的。",
      },
    ],
    workflows: [
      {
        title: "感知命名空间的解析",
        body: "工具接受短名或全名，并对照实时命名空间树解析，返回实际命中路径，让 Agent 清楚自己动的是哪个节点。",
      },
      {
        title: "改动前先给差异",
        body: "连线与属性改动会先以 diff 形式返回再应用，且每次写入都运行在带检查点的事务里。",
      },
      {
        title: "安全引用组装",
        body: "Agent 可以查看引用及其版本、主动切换版本；除非策略允许，否则无法编辑被引用内容。",
      },
      {
        title: "mayapy 批处理一致",
        body: "同一套工具面可在 mayapy 独立模式运行， Agent 无需打开界面就能把一个修改应用到整个镜头列表。",
      },
    ],
    install: [
      {
        title: "安装 Maya 模块",
        body: "把 DCCMCP 模块放进 Maya 的 module 路径。支持按项目配置模块目录，适合把工具链放在流水线仓库里的团队。",
      },
      {
        title: "启动桥接服务",
        body: "对已打开的会话运行桥接，或让它启动 mayapy 做批处理。",
      },
      {
        title: "注册客户端",
        body: "把服务注册到 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。工作室构建也可以指向共享的 HTTP 传输。",
      },
      {
        title: "保护被引用内容",
        body: "默认禁止写入被引用节点，避免 Agent 悄悄修改共享资产。",
      },
    ],
    faq: [
      {
        q: "支持哪些 Maya 版本？",
        a: "Beta 通道支持 Maya 2024、2025 与 2026，使用 Python 3 与 Maya Python API 2.0。Python 2 / Maya 2022 及更早版本仅对企业客户开放。",
      },
      {
        q: "Agent 会把我的绑定搞坏吗？",
        a: "图连线与属性写入都有检查点，并以 diff 形式返回；被引用内容默认只读；策略可以直接禁用特定节点类型——例如绑定控制组下的任何节点。",
      },
      {
        q: "没有界面，在 mayapy 里能用吗？",
        a: "可以。同一套工具在 mayapy 独立模式下同样暴露，多数团队就是用它在整个镜头列表上应用已批准的修改，或提交给渲染农场。",
      },
      {
        q: "如何处理 USD 与引用？",
        a: "引用是一等公民：Agent 可以查看、核对版本并有意识地切换。USD Stage 可读取，并在策略批准的前提下通过 Maya 的 USD 集成进行编辑。",
      },
      {
        q: "渲染支持 Arnold 吗？",
        a: "渲染提交与渲染器无关——Agent 声明渲染器与设置，服务会对照你会话中实际安装的内容做校验。Arnold、V-Ray、RenderMan 都在我们的测试语料里。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Modes: "运行模式",
      Platforms: "支持平台",
    },
  },

  "mcp-for-houdini": {
    tagline: "让 Agent 搭建并计算 Houdini 网络 —— SOP、VEX、HDA、PDG/TOPs 与 USD 输出。",
    summary:
      "一个 MCP Server 加一个 Houdini Package，把节点网络、参数、VEX 片段、数字资产、PDG/TOPs 图与 USD/Karma 输出暴露为类型化、带检查点的工具。",
    heroLead:
      "程序化工作本质上是一张意图图。Agent 拿到的是对这张图的类型化访问——节点、参数、表达式、VEX——并且计算范围被严格限定，问一个问题不会触发八小时的解算。",
    problems: [
      {
        title: "改一个参数可能触发八小时的计算",
        body: "程序化网络在某个上游被失效之前都很便宜。Agent 乱戳参数，可能排进一个谁都没要求的解算。",
      },
      {
        title: "盲写的 VEX 编译不过",
        body: "生成的片段常在类型不匹配、属性缺失或 run-over 上下文不对时失败——而报错出现在计算深处，不在编写的地方。",
      },
      {
        title: "TOPs 图强大但难以看透",
        body: "Work Item、依赖关系和属性恰恰是 Agent 擅长的结构化状态，前提是这张图能被检查，而不是靠猜。",
      },
    ],
    workflows: [
      {
        title: "限定范围的计算",
        body: "每个操作都要声明允许计算什么。Agent 拿到进度流和取消句柄，而不是被卡住的会话；也不会隐式失效任何上游。",
      },
      {
        title: "绑定参数，而不是写死",
        body: "工具接受字面值或通道引用，并会报告哪些参数仍是硬编码，让本该程序化的设置保持程序化。",
      },
      {
        title: "带校验的 VEX",
        body: "片段在写入节点前会先做 run-over 上下文、属性类型与绑定检查，编译错误以结构化结果返回。",
      },
      {
        title: "把 PDG 当作类型化接口",
        body: "Agent 检查 Work Item、设置属性与依赖、运行图的一个子集并读回失败项——和 TD 手动跑的循环完全一样。",
      },
    ],
    install: [
      {
        title: "安装 Houdini Package",
        body: "把 DCCMCP Package 加进 Houdini 搜索路径。Package 文件让工作室级与项目级安装互不干扰。",
      },
      {
        title: "启动桥接服务",
        body: "挂到正在运行的会话，或在农场节点上用 hython 做批量计算。",
      },
      {
        title: "注册客户端",
        body: "把服务注册到 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。农场节点用同一份配置的 HTTP 传输。",
      },
      {
        title: "限制计算开销",
        body: "设置计算时长与内存上限，避免 Agent 在工作站上误触发完整解算。",
      },
    ],
    faq: [
      {
        q: "Agent 会不会误触发我的整个解算？",
        a: "不会。计算是带范围的显式工具调用，策略可以限制计算时长与内存。读取节点结构与参数值绝不会触发计算。",
      },
      {
        q: "支持 PDG 与 TOPs 吗？",
        a: "支持。PDG 图以结构化数据暴露——Work Item、属性、依赖与结果——Agent 可以检查、运行子集并按 Work Item 汇报失败。",
      },
      {
        q: "能写 VEX 与 HScript 吗？",
        a: "可以编写 VEX 片段与参数表达式，并在提交到节点前完成校验。无效片段会以结构化编译错误返回，Agent 可自行修正。",
      },
      {
        q: "支持哪些 Houdini 版本与授权？",
        a: "Houdini 20.5、21 及更新版本，覆盖 Core、FX 与 Indie 授权。Indie 用户拿到同样的工具面，并行计算上限遵循你实际安装的授权。",
      },
      {
        q: "如何与渲染农场集成？",
        a: "同一套工具可在农场节点上通过 hython 运行，缓存、USD 导出与渲染都以你的提交器已经认识的路径声明。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Systems: "覆盖系统",
      Platforms: "支持平台",
    },
  },

  "mcp-for-3dsmax": {
    tagline: "面向建筑表现与动画的 Agent 自动化 —— 修改器、材质、XRef 与批量导出。",
    summary:
      "一个 MCP Server 加一个 3ds Max 插件，把场景组装、修改器栈、材质库、XRef 场景与渲染提交暴露为类型化工具，底层由 Python 3 与 MAXScript 支撑。",
    heroLead:
      "建筑表现场景庞大、分层、充满共享资产。Agent 拿到的是尊重图层、XRef 与修改器栈的工具，而不是把一切压平成无法再编辑的样子。",
    problems: [
      {
        title: "单位与缩放假设会毁掉组装",
        body: "合并进来的室内场景、导入的 CAD、系统单位不匹配，会做出看起来没问题、一量门就不对的模型。Agent 必须先拿到场景单位上下文。",
      },
      {
        title: "压平修改器栈等于毁掉可编辑性",
        body: "为了拿到结果而塌陷整个栈的自动化，留给美术的是一堆再也调不动的几何体——比没有自动化还糟。",
      },
      {
        title: "XRef 场景让归属变得模糊",
        body: "场景由 XRef 组装时，编辑必须区分本地内容与共享资产，否则一次改动会悄悄传播到所有引用它的项目。",
      },
    ],
    workflows: [
      {
        title: "分层组装",
        body: "对象被创建到显式图层中，尺寸符合场景单位；Agent 会报告每个对象所属的图层、XRef 与组。",
      },
      {
        title: "非破坏性修改器",
        body: "修改器参数就地编辑而非塌陷，美术在 Agent 跑完后仍然保有和之前一样的控制权。",
      },
      {
        title: "绑定材质库",
        body: "材质从声明的库中指派，并做插槽与贴图校验，Agent 无法编造渲染器会忽略的着色器参数。",
      },
      {
        title: "批量导出与提交",
        body: "用命名令牌导出确定的 FBX、OBJ、USD 或 glTF 集合，再以明确的相机与渲染器设置提交渲染。",
      },
    ],
    install: [
      {
        title: "安装插件包",
        body: "装进 3ds Max 插件路径，或通过工作室的应用包管理器统一下发，保证各工作站版本一致。",
      },
      {
        title: "启动桥接服务",
        body: "对已打开的会话运行桥接，或用 3dsmaxbatch 跑自动化流程。",
      },
      {
        title: "注册客户端",
        body: "把服务注册到 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。",
      },
      {
        title: "锁定单位系统",
        body: "固定工作单位体系，避免 Agent 以错误比例插入几何体。",
      },
    ],
    faq: [
      {
        q: "支持哪些 3ds Max 版本？",
        a: "3ds Max 2024、2025 与 2026，这些版本自带 Python 3 运行时。更早的纯 MAXScript 版本在企业版通道提供精简工具集。",
      },
      {
        q: "支持 V-Ray、Corona 与 Arnold 吗？",
        a: "支持。材质与渲染工具会对照会话中实际安装的渲染器校验设置，Agent 无法设置你的渲染器会忽略的参数。",
      },
      {
        q: "会塌陷我的修改器栈吗？",
        a: "只有在策略显式允许时才会。默认行为是就地编辑修改器参数，保留美术的控制权。",
      },
      {
        q: "XRef 场景如何处理？",
        a: "Agent 检查的每个对象都会带上 XRef 归属信息；默认禁止写入共享 XRef 内容，避免改动在项目间悄悄传播。",
      },
      {
        q: "支持 Linux 或 macOS 吗？",
        a: "不支持。3ds Max 是 Windows 独占应用，因此集成也跟随宿主，只运行在 Windows 工作站与构建机上。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Renderers: "渲染器",
      Platforms: "支持平台",
    },
  },

  "mcp-for-rhino": {
    tagline: "用 AI Agent 驱动 Rhino 与 Grasshopper —— NURBS、图层、图块与参数化定义。",
    summary:
      "一个 MCP Server 加一个 Rhino 插件，为 Agent 提供对 Rhino 文档与 Grasshopper 定义的类型化访问：几何创建、图层与图块管理、求解器控制与烘焙。",
    heroLead:
      "懂得文档的 Agent，而不只是会执行命令的 Agent。先读取图层、单位与公差，再创建符合你实际打开文件的几何体。",
    problems: [
      {
        title: "公差与单位会悄悄毁掉几何",
        body: "一个按毫米假设的模型进了按英尺设置的文档，产出的就是垃圾。Agent 在创建任何东西之前必须拿到文档上下文。",
      },
      {
        title: "Grasshopper 定义对自动化不透明",
        body: "Agent 做参数化工作往往只能盲写组件。缺少内省能力，Agent 就不知道哪些滑块重要、该烘焙哪些输出。",
      },
      {
        title: "烘焙操作会污染文档",
        body: "失控的烘焙会把图层塞满无名几何体、破坏图块定义，让后续制图变得不可靠。",
      },
    ],
    workflows: [
      {
        title: "感知文档的几何",
        body: "每个几何工具都从 doc.inspect 取得单位与公差上下文，Agent 创建的曲线半径就符合文档应有的数值。",
      },
      {
        title: "Grasshopper 内省",
        body: "枚举输入输出、读取滑块范围、设置取值、求解，再把指定输出烘焙到具名图层——整个闭环可脚本化、可复核。",
      },
      {
        title: "具名图层纪律",
        body: "烘焙目标必须显式声明。Agent 必须先选择或创建图层，且每个插入对象都带来源元数据。",
      },
      {
        title: "用图块实例，而不是复制品",
        body: "放置并变换图块实例，而不是炸开几何体，让大模型保持轻快、图纸保持一致。",
      },
    ],
    install: [
      {
        title: "安装 Rhino 插件",
        body: "通过 Rhino 包管理器安装 Yak 包，或在构建机上用命令行安装。",
      },
      {
        title: "启动桥接服务",
        body: "桥接服务把 MCP 客户端连到你正在运行的 Rhino 文档，以及任何已打开的 Grasshopper 定义。",
      },
      {
        title: "注册服务",
        body: "把桥接写进 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。可以指向正在运行的文档，也可以让它无界面启动 Rhino 做批处理。",
      },
      {
        title: "绑定定义文件",
        body: "让 Agent 指向一个或多个 .gh 文件，这样它能在改动之前先内省输入与输出。",
      },
    ],
    faq: [
      {
        q: "MCP for Rhino 能用我已有的 Grasshopper 定义吗？",
        a: "可以。把服务指向 .gh 或 .ghx 文件，它会内省组件、输入、输出与滑块范围。你不需要为让 Agent 使用而重写定义。",
      },
      {
        q: "Agent 能在单位特殊的文档里创建几何体吗？",
        a: "doc.inspect 会返回文档单位体系与公差，几何工具会按此归一。如果 Agent 请求的值违反公差约束，调用会被拒绝并给出说明，而不是悄悄产出坏几何。",
      },
      {
        q: "必须要 Rhino 8 吗？",
        a: "不需要。Rhino 7 与 Rhino 8 都支持，另有 Rhino 9 WIP 的早期通道。部分 Grasshopper 内省能力在 Rhino 8 及更新版本上更完整。",
      },
      {
        q: "烘焙如何避免污染模型？",
        a: "烘焙目标是显式的。Agent 必须声明已有或新建的图层，每个插入对象都会带上定义名、运行 ID 与时间戳等来源属性。",
      },
      {
        q: "能在无界面的构建服务器上跑吗？",
        a: "可以。桥接支持面向 CI 与批处理流水线的无界面模式，前提是你的 Rhino 授权条款允许无人值守使用。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Grasshopper: "Grasshopper",
      Platforms: "支持平台",
    },
  },

  "mcp-for-freecad": {
    tagline: "面向 Agent 的参数化 CAD 自动化 —— 草图、特征、工程图与 STEP 导出。",
    summary:
      "一个 MCP Server 加一个 FreeCAD 工作台，把参数化建模暴露为类型化工具：草图约束、Part Design 特征、表格参数、工程图与技术图纸、以及制造用导出。",
    heroLead:
      "参数化模型只有在约束存活时才有价值。Agent 调用的是特征级工具，让模型树保持有效——而不是推倒重建的脚本。",
    problems: [
      {
        title: "脚本重建模型，而不是编辑模型",
        body: "用代码重新生成零件会丢掉设计意图。工程师需要特征树、约束与引用关系原样保留。",
      },
      {
        title: "参数表会悄悄失去同步",
        body: "当 Agent 把尺寸写死、而不是绑定到参数表时，这个模型就不再是参数化的了。",
      },
      {
        title: "制造变更没有可追溯性",
        body: "一个没人记录的孔径变更，是真实的生产风险。无法留痕的自动化在车间是不可接受的。",
      },
    ],
    workflows: [
      {
        title: "特征级建模",
        body: "Agent 以真实的 Part Design 特征添加凸台、凹槽、旋转与圆角，模型树在之后仍然可被人类编辑。",
      },
      {
        title: "默认绑定参数",
        body: "尺寸工具接受字面值或表格别名。当某个值未被绑定时，服务会报告出来，让 Agent 在交付前修正。",
      },
      {
        title: "感知约束的草图",
        body: "Agent 读取草图自由度、添加几何与尺寸约束，并验证求解器收敛。",
      },
      {
        title: "出图与导出流水线",
        body: "生成 TechDraw 视图，然后导出 STEP、IGES、STL 或 DXF，带单位校验和精确的版本清单。",
      },
    ],
    install: [
      {
        title: "安装工作台",
        body: "通过 FreeCAD 附加组件管理器安装 DCCMCP 工作台，然后重启 FreeCAD。",
      },
      {
        title: "启动服务",
        body: "服务可挂接到正在运行的 FreeCAD，也可以为批量转换任务无界面启动一个实例。",
      },
      {
        title: "注册客户端",
        body: "把服务注册到 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。批处理模式适合夜间参数扫描。",
      },
      {
        title: "保护你的参数",
        body: "把表格与属性标记为受保护，让 Agent 可以读取但不能覆盖已批准的取值。",
      },
    ],
    faq: [
      {
        q: "FreeCAD 支持达到生产可用了吗？",
        a: "MCP for FreeCAD 处于 Beta 通道。读取操作、草图、Part Design 特征与导出在我们的测试语料中已经稳定；FEM 与装配工作台目前是只读预览。",
      },
      {
        q: "Agent 会让我的模型保持参数化吗？",
        a: "会。尺寸工具优先使用表格别名，服务会报告未绑定的值，让 Agent 去绑定。你也可以直接保护特定参数，禁止写入。",
      },
      {
        q: "能导出可直接用于制造的格式吗？",
        a: "支持 STEP、IGES、DXF、STL 与 3MF 导出，每个都带版本清单，记录所用参数与文件哈希。",
      },
      {
        q: "支持哪些 FreeCAD 版本？",
        a: "支持 FreeCAD 0.21 与 1.0+。推荐 1.0 系列，因为它的 Python API 更稳定。",
      },
      {
        q: "能在容器里无界面运行吗？",
        a: "可以。挂接模式与无界面模式都支持，这让参数扫描与夜间导出在 CI 里很容易自动化。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Workbenches: "工作台",
      Platforms: "支持平台",
    },
  },

  "mcp-for-qgis": {
    tagline: "让 Agent 跑真正的空间分析 —— 图层、坐标系、处理算法与打印布局。",
    summary:
      "一个 MCP Server 加一个 QGIS 插件，把 PyQGIS、处理框架与布局/图集工具暴露为类型化工具，让 Agent 能带着完整来源信息分析与发布空间数据。",
    heroLead:
      "地理空间工作的失败往往是安静的。坐标系不匹配、几何无效、字段类型错误，会产出看起来合理、实际错误的结果——所以每一步操作都要校验。",
    problems: [
      {
        title: "坐标系错误会产出「自信的废话」",
        body: "在错误的时机做投影转换，或混用不同坐标系的图层，会得到差几个数量级的量测结果，而地图渲染起来毫无异常。",
      },
      {
        title: "无效几何会拖垮下游工具",
        body: "自相交与碎屑多边形会在叠加运算中一路传播，直到交付给客户一份坏数据集。",
      },
      {
        title: "分析过程不可复现",
        body: "当算法、参数与输入版本都没被记录时，没人能重跑上季度的分析并得到相同结果。",
      },
    ],
    workflows: [
      {
        title: "从构造上就感知坐标系",
        body: "每个几何工具都会声明工作坐标系，服务会确定性地做投影转换，而不是预设各图层一致。",
      },
      {
        title: "先校验，再分析",
        body: "几何有效性、字段类型与拓扑检查在叠加运算之前执行，自动修复会被报告而不是被隐藏。",
      },
      {
        title: "算法来源记录",
        body: "处理调用会记录算法 ID、参数、QGIS 版本与输入图层指纹，让结果可以精确复现。",
      },
      {
        title: "可直接发布的布局",
        body: "Agent 更新打印布局、地图范围、图例与图集覆盖层设置，然后导出可印刷的 PDF。",
      },
    ],
    install: [
      {
        title: "安装 QGIS 插件",
        body: "通过 QGIS 插件管理器安装 DCCMCP 插件，并在「插件」菜单里启用。",
      },
      {
        title: "启动服务",
        body: "服务会挂接到正在运行的 QGIS 实例，并注册你安装环境里可用的处理算法。",
      },
      {
        title: "注册客户端",
        body: "把服务注册到 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。共享部署请使用带令牌鉴权的 HTTP 传输。",
      },
      {
        title: "锁定工作坐标系",
        body: "定义 Agent 允许写入的项目坐标系，避免分析在坐标系之间悄悄漂移。",
      },
    ],
    faq: [
      {
        q: "Agent 会不经询问就重投影我的数据吗？",
        a: "投影转换是独立的显式工具调用，源与目标坐标系始终会被报告。只读工具绝不会修改底层数据。",
      },
      {
        q: "支持 GRASS 与 SAGA 算法吗？",
        a: "支持。处理框架是通用暴露的，因此你 QGIS 配置里安装的任何算法提供者都能被 Agent 发现。",
      },
      {
        q: "能自动发布地图吗？",
        a: "布局与图集都可以更新并导出为 PDF、PNG 或 SVG。图集覆盖层、过滤表达式与地图范围都可脚本化。",
      },
      {
        q: "我怎么知道 Agent 改了什么？",
        a: "每次写入与执行调用都会记录项目指纹、工具参数与产出结果，因此项目可以跨会话做差异比对。",
      },
      {
        q: "这是云服务吗？",
        a: "不是。它运行在你自己或自建的 QGIS 环境上。共享服务器部署可选用 HTTP 传输，且完全停留在你的基础设施内。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Engines: "运算引擎",
      Platforms: "支持平台",
    },
  },

  "mcp-for-opencv": {
    tagline: "可复现的计算机视觉流水线 —— Agent 可组合、标定并验证。",
    summary:
      "面向 OpenCV 工作负载的 MCP Server，把图像处理、检测、标定与视频巡检变成类型化、可复现的流水线操作，而不是一次性的 notebook 单元格。",
    heroLead:
      "视觉结果只有可复现才有价值。流水线被声明为带版本号的图结构，参数固定、输入带哈希、产物存档。",
    problems: [
      {
        title: "Notebook 实验永远变不成流水线",
        body: "Agent 写了一段很聪明的检测代码，三周后没人能复现当时的阈值、预处理顺序，或者它到底跑在哪批图上。",
      },
      {
        title: "视觉参数是看不见的",
        body: "阈值、卷积核大小、色彩空间转换都藏在代码里，结果既无法扫描对比，也无法验收签核。",
      },
      {
        title: "失败是静默的",
        body: "一条处理 4000 张图、其中 40 张失败的流水线，看起来是成功的——除非有人去数产物。",
      },
    ],
    workflows: [
      {
        title: "流水线即带版本的图",
        body: "操作被组合成具名、带版本的图。参数是产物的一部分，因此任一运行都能被精确重放。",
      },
      {
        title: "确定性的产物",
        body: "输入带哈希，输出带清单，运行报告会列出每一张失败的图与原因。",
      },
      {
        title: "标定是一等工具",
        body: "棋盘格、ChArUco 与圆点标定都作为类型化工具暴露，返回内外参矩阵与重投影误差。",
      },
      {
        title: "对视觉输出做回归",
        body: "每个流水线版本都保存基准输出，因此改变预处理导致检测结果变化会在到达客户之前被捕获。",
      },
    ],
    install: [
      {
        title: "安装软件包",
        body: "把服务装进与你的视觉依赖相同的环境，以便复用现有的 OpenCV 构建。",
      },
      {
        title: "启动服务",
        body: "用存放流水线与数据集的目录作为工作区启动服务。",
      },
      {
        title: "注册客户端",
        body: "把 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端指向该服务。Agent 随后可以发现你已有的流水线，再决定是否新建。",
      },
      {
        title: "设置资源上限",
        body: "限制并发数与内存，避免长时间扫描把工作站或共享构建机拖垮。",
      },
    ],
    faq: [
      {
        q: "MCP for OpenCV 会替换我现有的视觉栈吗？",
        a: "不会。它包装你环境中已有的 OpenCV 构建，在其上增加一个类型化、可复现的接口。现有代码可以通过自定义工具暴露出来。",
      },
      {
        q: "能实时处理视频流吗？",
        a: "它可以挂接 RTSP 流与采集设备做巡检与抽帧。对于硬实时控制回路，请把生成的流水线放到你自己的进程里运行，用 DCCMCP 做配置与验证。",
      },
      {
        q: "失败帧怎么处理？",
        a: "每次运行都会写出清单，列出已处理、已跳过与失败的条目及原因，让部分失败可见而不是静默。",
      },
      {
        q: "支持 GPU 加速吗？",
        a: "支持，通过 CUDA 版 OpenCV 构建。服务在启动时会报告可用的执行提供者，让 Agent 知道自己能请求什么。",
      },
      {
        q: "能把我自己的函数暴露成工具吗？",
        a: "可以。任何带类型签名的 Python 可调用对象都能通过插件 API 注册为自定义工具，包括你自己的模型与硬件集成。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Backends: "后端",
      Inputs: "输入类型",
      Platforms: "支持平台",
    },
  },

  "mcp-for-photoshop": {
    tagline: "面向贴图生产的 Agent —— 图层栈、蒙版、色彩管理与 PBR 贴图导出。",
    summary:
      "一个 MCP Server 加一个 Photoshop UXP 插件，把文档、图层、蒙版、调整栈、通道与配置文件状态、批量导出暴露为类型化工具，服务于贴图与市场物料流水线。",
    heroLead:
      "贴图工作首先是命名和色彩管理问题，其次才是视觉问题。Agent 拿到的是能保持图层栈可编辑、导出引擎真正认得的贴图的工具。",
    problems: [
      {
        title: "自动化把本该加速的文件压平了",
        body: "为了导出一张 PNG 而合并图层的批处理脚本，毁掉了源 PSD 的可编辑性。美术要为这次自动化付好几个月的时间。",
      },
      {
        title: "贴图以错误的色彩空间到达",
        body: "法线与粗糙度贴图不能被 sRGB 编码，但忽略文档配置文件的导出会产出在引擎里悄悄破坏光照的贴图。",
      },
      {
        title: "命名规范就是整条流水线",
        body: "一个叫 final_v2_NORMAL_fixed.png 的贴图会直接打断导入。引擎要的是确定的后缀、一致的尺寸与可预期的通道打包。",
      },
    ],
    workflows: [
      {
        title: "默认非破坏性",
        body: "编辑以图层、蒙版与调整图层的形式落地。合并、压平与破坏性滤镜需要策略显式批准。",
      },
      {
        title: "色彩管理导出",
        body: "Agent 按贴图类型声明目标色彩空间，服务在写文件前校验文档配置文件与位深。",
      },
      {
        title: "令牌化贴图集",
        body: "用命名模板与统一分辨率导出完整 PBR 集——基础色、法线、粗糙度、金属度、AO、高度——并写出清单。",
      },
      {
        title: "带检查点的文档",
        body: "修改型操作前会写出版本化检查点，因此一次坏批量可以按文档回滚，而不是按文件夹。",
      },
    ],
    install: [
      {
        title: "安装 UXP 插件",
        body: "通过 UXP Developer Tool 安装 DCCMCP 插件，或用工作室的扩展下发机制部署。",
      },
      {
        title: "启动桥接服务",
        body: "桥接把 MCP 客户端连到正在运行的 Photoshop 实例及其打开的文档。",
      },
      {
        title: "注册客户端",
        body: "把服务注册到 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。",
      },
      {
        title: "声明贴图规范",
        body: "告诉服务你的引擎期望哪些后缀与色彩空间，导出时会据此校验。",
      },
    ],
    faq: [
      {
        q: "MCP for Photoshop 会使用 Adobe 的生成式 AI 功能吗？",
        a: "不会。该集成不调用 Firefly 或任何生成式功能，只暴露文档、图层、蒙版、色彩管理与导出操作，你的文件不会经由我们送到生成式模型。",
      },
      {
        q: "会把我的 PSD 压平吗？",
        a: "除非策略允许，否则不会。编辑以图层、蒙版与调整图层完成，压平与合并等破坏性操作默认被禁止。",
      },
      {
        q: "支持哪些 Photoshop 版本？",
        a: "Photoshop 2024、2025 与 2026，使用 UXP 插件架构。旧的 ExtendScript 动作仍可通过批量工具运行以保持兼容。",
      },
      {
        q: "能为虚幻或 Unity 准备贴图集吗？",
        a: "可以。贴图导出工具按你的命名模板写出完整贴图集，按贴图类型校验线性与色彩数据，并产出列出每个文件与分辨率的清单。",
      },
      {
        q: "这与 Adobe 有关联吗？",
        a: "没有。DCCMCP 是独立的第三方集成，与 Adobe 无隶属、背书或赞助关系。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Documents: "支持文档",
      Platforms: "支持平台",
    },
  },

  "mcp-for-zbrush": {
    tagline: "雕刻流水线自动化 —— 子工具管理、重拓扑、UV 准备与 GoZ 交接。",
    summary:
      "面向 ZBrush 的 MCP Server 与 ZScript 桥接，把子工具清单、重网格与减面、多边形组操作、顶点色烘焙与 GoZ 交接暴露为类型化工具。",
    heroLead:
      "雕刻文件会长成几百个子工具、面数不可预期。Agent 拿到的是诚实的清单和明确的分辨率目标，让重网格成为一个决定而不是一次赌博。",
    problems: [
      {
        title: "子工具泛滥让文件失控",
        body: "一个有一百八十个子工具、命名毫无纪律的角色文件就是生产风险。没人知道哪个子工具是当前版本、为什么这么命名、到底有多重。",
      },
      {
        title: "重网格的决定不可逆且昂贵",
        body: "ZRemesher 目标面数与 DynaMesh 分辨率会永久改变拓扑。数字填错，就意味着重做数小时的雕刻细节。",
      },
      {
        title: "顶点色永远到不了引擎",
        body: "细节一直活在顶点色里，直到有人把它烘焙成贴图——而分辨率选错就要再烘焙一轮。",
      },
    ],
    workflows: [
      {
        title: "先看清子工具",
        body: "Agent 在提出任何操作前，先读取每个子工具的面数、可见性、文件夹与材质，命名与面数问题立刻暴露。",
      },
      {
        title: "显式分辨率目标",
        body: "重网格与减面必须给出明确目标——面数或边长——工具会返回实际结果，让改动是被测量的而不是被假设的。",
      },
      {
        title: "感知多边形组",
        body: "拆分、合并、分组与可见性操作都作用于具名多边形组，让硬表面与软表面部件可分离。",
      },
      {
        title: "GoZ 交接",
        body: "把选中的子工具按声明的细分级别送到 Maya、Blender 或 3ds Max，往返过程记录在审计日志里。",
      },
    ],
    install: [
      {
        title: "安装 ZStartup 脚本",
        body: "把 DCCMCP 脚本放进 ZBrush 的 ZStartup 目录，桥接会随应用一起加载。",
      },
      {
        title: "启动桥接服务",
        body: "桥接负责协调 ZScript 命令与配套进程，后者计算网格统计并执行烘焙。",
      },
      {
        title: "注册客户端",
        body: "把服务注册到 Claude Code、Codex、Cursor、OpenClaw 或任何其他 MCP 客户端。",
      },
      {
        title: "设置面数上限",
        body: "限制 Agent 可以请求的面数预算，避免一次重拓扑把子工具推到下游工具打不开的程度。",
      },
    ],
    faq: [
      {
        q: "MCP for ZBrush 达到生产可用了吗？",
        a: "目前处于 Preview 通道。读取子工具结构、按目标重网格、减面与 GoZ 交接在我们的测试语料中已经稳定。贴图烘焙较新，建议先用自己的材质设置验证再依赖它。",
      },
      {
        q: "为什么需要一个配套进程？",
        a: "ZBrush 的脚本接口并未暴露 Agent 需要的全部信息，尤其是操作后的准确统计与烘焙结果。本地配套进程负责计算这些并回报，从而保证工具结果可信。",
      },
      {
        q: "支持 ZBrush for iPad 吗？",
        a: "不支持。该集成针对桌面版。ZBrush for iPad 没有暴露这个桥接所依赖的脚本接口。",
      },
      {
        q: "Agent 会不会误操作重网格毁掉雕刻细节？",
        a: "重网格必须给出明确目标，作为带检查点的操作运行，并且策略可以按工具或文件直接禁用。宿主允许时，回滚可以限定在单个子工具。",
      },
      {
        q: "能交接给哪些软件？",
        a: "GoZ 交接覆盖 Maya、Blender、3ds Max 以及任何装了 GoZ 桥接的应用，细分级别由 Agent 声明。",
      },
    ],
    toolNote: "工具名与参数签名保持英文——它们是 Agent 实际调用的接口。",
    specLabels: {
      "Host software": "宿主软件",
      Runtime: "运行时",
      Transport: "传输方式",
      Install: "安装方式",
      Exchange: "交换格式",
      Platforms: "支持平台",
    },
  },
};

export function getIntegrationZh(slug: string) {
  return integrationZh[slug];
}
