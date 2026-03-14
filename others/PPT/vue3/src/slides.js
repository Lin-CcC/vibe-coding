export const slides = [
  {
    id: "1",
    routeTitle: "主题页",
    theme: "simple",
    layout: "cover",
    title: "从 C 源码到可执行文件",
    subtitle: "预处理 → 编译 → 汇编 → 链接",
    meta: "第 11 组",
    blocks: [],
  },
  {
    id: "2",
    routeTitle: "目录",
    theme: "simple",
    title: "目录",
    blocks: [
      {
        kind: "list",
        columns: 2,
        items: [
          "讨论课问题（任务要求）",
          "选题与目录（本次讲什么）",
          "Q1：是什么（输入/输出/链路）",
          "Q1：四个步骤（每步做什么）",
          "Q1：常见现象（错误定位）",
          "Q1：范围与前景（为什么值得学）",
          "Q2：GCC（简介与常用参数）",
          "总结 + 讨论题",
        ],
      },
    ],
  },
  {
    id: "3",
    routeTitle: "讨论课问题",
    theme: "discussion",
    titleHtml: "讨论课问题",
    blocks: [
      {
        kind: "cardHtml",
        html: "<b>1.</b> 你对“编译”相关的哪项技术最感兴趣？围绕该技术完成：技术介绍、应用范围、应用前景。",
      },
      {
        kind: "cardHtml",
        html: "<b>2.</b> 从 万舟/毕昇/LLVM/GCC/UCC 或自选编译器中任选 1 种：整理资料并组织主题讨论。",
      },
      {
        kind: "cardHtml",
        html: "<b>3.</b> 个人提交预习笔记；分组制作 PPT 汇报；每组 8 分钟（讲解 + 讨论）。",
      },
    ],
  },
  {
    id: "4",
    routeTitle: "选题与目录",
    theme: "simple",
    title: "选题",
    blocks: [
      {
        kind: "cardHtml",
        html: "我选择的技术方向：<b>从 C 源码到可执行文件的完整过程</b>（预处理 → 编译 → 汇编 → 链接）。",
      },
      {
        kind: "list",
        items: [
          "<b>Q1：</b>这项技术是什么？每一步做什么？为什么需要这些步骤？",
          "<b>Q1：</b>应用范围与应用前景（为什么学它有用）。",
          "<b>Q2：</b>选择编译器：<b>GCC</b>（常用之一），介绍它能做什么、怎么用、常见参数。",
          "<b>讨论点：</b>为什么有时编译能过但链接失败？为什么运行会报“缺少 dll/so”？",
        ],
      },
    ],
  },
  {
    id: "5",
    routeTitle: "Q1 技术是什么",
    theme: "simple",
    title: "Q1：从源码到可执行文件（是什么）",
    blocks: [
      {
        kind: "cardHtml",
        html: "一句话：编译器把 <b>人写的代码</b> 变成 <b>机器能执行的程序</b>。",
      },
      {
        kind: "list",
        items: [
          "<b>输入：</b>源代码（例如 <code>hello.c</code>）。",
          "<b>输出：</b>可执行文件（Windows 的 <code>.exe</code>，Linux 的 ELF）。",
          "<b>核心链路：</b>预处理 → 编译 → 汇编 → 链接（把多个文件“拼成一个能跑的程序”）。",
          "<b>为什么要拆成多步：</b>每一步解决一种问题，便于复用、调试，也便于支持不同平台。",
        ],
      },
    ],
  },
  {
    id: "6",
    routeTitle: "Q1 四个步骤",
    theme: "simple",
    title: "Q1：预处理/编译/汇编/链接（每步做什么）",
    blocks: [
      { kind: "cardHtml", html: "用一个最常见的 C 程序来理解每一步：" },
      {
        kind: "list",
        columns: 2,
        items: [
          "<b>预处理（Preprocess）：</b>展开 <code>#include</code>、处理 <code>#define</code> 宏、条件编译。",
          "<b>编译（Compile）：</b>把 C 代码翻译成“更低层的表示”（可理解成汇编之前的内部表示），并做检查/优化。",
          "<b>汇编（Assemble）：</b>把汇编代码变成目标文件 <code>.o/.obj</code>（里面是机器指令，但还不能直接运行）。",
          "<b>链接（Link）：</b>把多个目标文件 + 库文件合并，补齐函数地址，生成最终可执行文件。",
        ],
      },
    ],
  },
  {
    id: "7",
    routeTitle: "Q1 常见现象",
    theme: "simple",
    title: "Q1：常见问题（为什么会这样）",
    blocks: [
      { kind: "cardHtml", html: "初学者最常遇到的报错，其实都对应上面某一步：" },
      {
        kind: "list",
        items: [
          "<b>找不到头文件：</b>多发生在预处理阶段（<code>#include</code> 路径不对）。",
          "<b>语法错误：</b>编译阶段发现（缺分号、类型不匹配等）。",
          "<b>undefined reference / unresolved external symbol：</b>大概率是链接阶段（声明了但没实现，或库没链接上）。",
          "<b>运行时报“缺少 dll/so”：</b>与动态链接库有关（程序运行时找不到依赖库）。",
        ],
      },
    ],
  },
  {
    id: "8",
    routeTitle: "Q1 范围前景",
    theme: "simple",
    title: "Q1：应用范围与前景（为什么值得学）",
    blocks: [
      {
        kind: "list",
        items: [
          "<b>应用范围：</b>所有“需要把代码变成可运行程序”的领域：系统软件、应用软件、嵌入式、移动端、服务器端等。",
          "<b>工程能力：</b>理解编译/链接后，你更能读懂构建报错、依赖问题、性能与体积取舍。",
          "<b>就业/发展：</b>不仅是“写编译器”，还包括：性能优化、工具链、静态分析、安全、IDE/语言服务等。",
          "<b>趋势：</b>新架构（ARM/RISC‑V）与跨平台开发更普遍，工具链与编译知识更重要。",
        ],
      },
    ],
  },
  {
    id: "9",
    routeTitle: "Q2 选择 GCC",
    theme: "simple",
    title: "Q2：GCC（编译器简介与常用用法）",
    blocks: [
      {
        kind: "cardHtml",
        html: "<b>GCC</b>（GNU Compiler Collection）是一套经典、成熟的编译器集合，最常用的是编译 C/C++。",
      },
      {
        kind: "list",
        items: [
          "<b>一条命令编译：</b><code>gcc hello.c -o hello</code>",
          "<b>分步看过程：</b><code>-E</code> 预处理、<code>-S</code> 生成汇编、<code>-c</code> 生成目标文件。",
          "<b>常用参数：</b><code>-O0/-O2</code> 优化等级，<code>-g</code> 调试信息，<code>-Wall</code> 常见警告。",
          "<b>链接库：</b>如果用到数学库，可能需要 <code>-lm</code>（体现“链接阶段”的概念）。",
        ],
      },
    ],
  },
  {
    id: "10",
    routeTitle: "总结与讨论",
    theme: "simple",
    title: "总结 + 讨论题",
    blocks: [
      { kind: "cardHtml", html: "用最少的概念，把两道题讲清楚：" },
      {
        kind: "list",
        items: [
          "<b>Q1 总结：</b>编译链路=预处理→编译→汇编→链接；很多报错都能定位到某一步。",
          "<b>Q2 总结：</b>GCC 是常用编译器；会用基本参数就能完成大多数课程实验与项目构建。",
          "<b>讨论题 1：</b>为什么“编译通过”不等于“能运行”？你见过哪些链接/运行时错误？",
          "<b>讨论题 2：</b>你更想深入哪一块：语法/错误提示、链接与库、还是性能优化？为什么？",
        ],
      },
    ],
  },
];

