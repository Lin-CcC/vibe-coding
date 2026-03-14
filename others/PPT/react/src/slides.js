export const slides = [
  {
    id: "1",
    routeTitle: "封面",
    theme: "simple",
    layout: "cover",
    title: "从 C 源码到可执行文件",
    subtitle: "预处理 → 编译 → 汇编 → 链接",
    meta: "第 11 组",
  },
  {
    id: "2",
    routeTitle: "流程",
    theme: "simple",
    title: "演示流程",
    blocks: [
      {
        kind: "list",
        columns: 1,
        items: [
          "<b>1）</b> 用一句话说明目标：搞清楚“从源码到可执行文件”的每一步做什么。",
          "<b>2）</b> 按顺序讲四步：预处理 → 编译 → 汇编 → 链接。",
          "<b>3）</b> 用常见报错做定位：缺头文件 / 语法错误 / 链接失败 / 缺少动态库。",
          "<b>4）</b> Q&A：为什么“编译通过”不等于“能运行”？",
        ],
      },
    ],
  },
  {
    id: "3",
    routeTitle: "Q&A",
    theme: "simple",
    title: "Q&A",
    blocks: [
      {
        kind: "cardHtml",
        html: "你准备从哪里一步开始深入？<b>语法</b> / <b>链接与库</b> / <b>性能优化</b>？为什么？",
      },
      {
        kind: "list",
        columns: 1,
        items: [
          "<b>问题 1：</b>你遇到过哪些“编译能过但运行失败”的情况？",
          "<b>问题 2：</b>当出现 <code>undefined reference</code>，你会先检查什么？",
          "<b>问题 3：</b>你觉得最难理解的是哪一步？",
        ],
      },
    ],
  },
];

