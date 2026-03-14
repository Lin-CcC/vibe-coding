(function () {
  "use strict";

  var SLIDE_W = 1280;
  var SLIDE_H = 720;

  function el(id) {
    return document.getElementById(id);
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  var slides = [
    {
      id: "1",
      routeTitle: "主题页",
      theme: "simple",
      titleHtml: "从 C 源码到可执行文件",
      bodyHtml:
        "<div class=\"cover__subtitle\">预处理 → 编译 → 汇编 → 链接</div>" +
        "<div class=\"cover__meta\"><span>第 11 组</span></div>",
    },
    {
      id: "2",
      routeTitle: "目录",
      theme: "simple",
      titleHtml: "目录",
      bodyHtml:
        "<ul class=\"cols2\">" +
        "<li>讨论课问题（任务要求）</li>" +
        "<li>选题与目录（本次讲什么）</li>" +
        "<li>Q1：是什么（输入/输出/链路）</li>" +
        "<li>Q1：四个步骤（每步做什么）</li>" +
        "<li>Q1：常见现象（错误定位）</li>" +
        "<li>Q1：范围与前景（为什么值得学）</li>" +
        "<li>Q2：GCC（简介与常用参数）</li>" +
        "<li>总结 + 讨论题</li>" +
        "</ul>",
    },
    {
      id: "3",
      routeTitle: "讨论课问题",
      theme: "discussion",
      titleHtml: '<span class="c-red">讨论课问题</span>',
      bodyHtml:
        '<div class="c-blue"><span class="n">1.</span>你对“编译”相关的哪项技术最感兴趣？围绕该技术完成：<span class="c-green">技术介绍</span>、<span class="c-green">应用范围</span>、<span class="c-green">应用前景</span>。</div>' +
        '<div class="c-blue"><span class="n">2.</span>从 <span class="c-black">万舟</span>、<span class="c-red">毕昇</span>、<span class="c-black">LLVM</span>、<span class="c-black">GCC</span>、<span class="c-black">UCC</span> 或自选编译器中任选 1 种：整理资料并组织主题讨论。</div>' +
        '<div class="c-blue"><span class="n">3.</span>个人提交预习笔记；分组制作 PPT 汇报；<span class="c-black">每组 8 分钟</span>（讲解 + 讨论）。</div>',
    },
    {
      id: "4",
      routeTitle: "选题与目录",
      theme: "simple",
      titleHtml: "选题",
      bodyHtml:
        "<div>我选择的技术方向：<b>从 C 源码到可执行文件的完整过程</b>（预处理 → 编译 → 汇编 → 链接）。</div>" +
        "<ul>" +
        "<li><b>Q1：</b>这项技术是什么？每一步做什么？为什么需要这些步骤？</li>" +
        "<li><b>Q1：</b>应用范围与应用前景（为什么学它有用）。</li>" +
        "<li><b>Q2：</b>选择编译器：<b>GCC</b>（初学者最常用之一），介绍它能做什么、怎么用、常见参数。</li>" +
        "<li><b>讨论点：</b>为什么有时编译能过但链接失败？为什么运行会报“缺少 dll/so”？</li>" +
        "</ul>",
    },
    {
      id: "5",
      routeTitle: "Q1 技术是什么",
      theme: "simple",
      titleHtml: "Q1：从源码到可执行文件（是什么）",
      bodyHtml:
        "<div>一句话：编译器把 <b>人写的代码</b> 变成 <b>机器能执行的程序</b>。</div>" +
        "<ul>" +
        "<li><b>输入：</b>源代码（例如 <code>hello.c</code>）。</li>" +
        "<li><b>输出：</b>可执行文件（Windows 的 <code>.exe</code>，Linux 的 ELF）。</li>" +
        "<li><b>核心链路：</b>预处理 → 编译 → 汇编 → 链接（把多个文件“拼成一个能跑的程序”）。</li>" +
        "<li><b>为什么要拆成多步：</b>每一步解决一种问题，便于复用、调试，也便于支持不同平台。</li>" +
        "</ul>",
    },
    {
      id: "6",
      routeTitle: "Q1 四个步骤",
      theme: "simple",
      titleHtml: "Q1：预处理/编译/汇编/链接（每步做什么）",
      bodyHtml:
        "<div>用一个最常见的 C 程序来理解每一步：</div>" +
        "<ul class=\"cols2\">" +
        "<li><b>预处理（Preprocess）：</b>展开 <code>#include</code>、处理 <code>#define</code> 宏、条件编译。</li>" +
        "<li><b>编译（Compile）：</b>把 C 代码翻译成“更低层的表示”（通常理解成汇编之前的内部表示），并做一些检查/优化。</li>" +
        "<li><b>汇编（Assemble）：</b>把汇编代码变成目标文件 <code>.o/.obj</code>（里面是机器指令，但还不能直接运行）。</li>" +
        "<li><b>链接（Link）：</b>把多个目标文件 + 库文件合并，补齐函数地址，生成最终可执行文件。</li>" +
        "</ul>",
    },
    {
      id: "7",
      routeTitle: "Q1 常见现象",
      theme: "simple",
      titleHtml: "Q1：常见问题（为什么会这样）",
      bodyHtml:
        "<div>初学者最常遇到的报错，其实都对应上面某一步：</div>" +
        "<ul>" +
        "<li><b>找不到头文件：</b>多发生在预处理阶段（<code>#include</code> 路径不对）。</li>" +
        "<li><b>语法错误：</b>编译阶段发现（缺分号、类型不匹配等）。</li>" +
        "<li><b>undefined reference / unresolved external symbol：</b>大概率是链接阶段（函数声明了但没有实现，或库没链接上）。</li>" +
        "<li><b>运行时报“缺少 dll/so”：</b>与动态链接库有关（程序运行时找不到依赖库）。</li>" +
        "</ul>",
    },
    {
      id: "8",
      routeTitle: "Q1 范围前景",
      theme: "simple",
      titleHtml: "Q1：应用范围与前景（为什么值得学）",
      bodyHtml:
        "<ul>" +
        "<li><b>应用范围：</b>所有“需要把代码变成可运行程序”的领域：系统软件、应用软件、嵌入式、移动端、服务器端等。</li>" +
        "<li><b>工程能力：</b>理解编译/链接后，你更能读懂构建报错、依赖问题、性能与体积取舍。</li>" +
        "<li><b>就业/发展：</b>不仅是“写编译器”，还包括：性能优化、工具链、静态分析、安全、IDE/语言服务等。</li>" +
        "<li><b>趋势：</b>新架构（ARM/RISC‑V）与跨平台开发更普遍，工具链与编译知识更重要。</li>" +
        "</ul>",
    },
    {
      id: "9",
      routeTitle: "Q2 选择 GCC",
      theme: "simple",
      titleHtml: "Q2：GCC（编译器简介与常用用法）",
      bodyHtml:
        "<div><b>GCC</b>（GNU Compiler Collection）是一套经典、成熟的编译器集合，最常用的是编译 C/C++。</div>" +
        "<ul>" +
        "<li><b>一条命令编译：</b><code>gcc hello.c -o hello</code></li>" +
        "<li><b>分步看过程：</b><code>-E</code> 预处理、<code>-S</code> 生成汇编、<code>-c</code> 生成目标文件。</li>" +
        "<li><b>常用参数：</b><code>-O0/-O2</code> 优化等级，<code>-g</code> 调试信息，<code>-Wall</code> 常见警告。</li>" +
        "<li><b>链接库：</b>如果用到数学库，可能需要 <code>-lm</code>（体现“链接阶段”的概念）。</li>" +
        "</ul>",
    },
    {
      id: "10",
      routeTitle: "总结与讨论",
      theme: "simple",
      titleHtml: "总结 + 讨论题",
      bodyHtml:
        "<div>用最少的概念，把两道题讲清楚：</div>" +
        "<ul>" +
        "<li><b>Q1 总结：</b>编译链路=预处理→编译→汇编→链接；很多报错都能定位到某一步。</li>" +
        "<li><b>Q2 总结：</b>GCC 是常用编译器；会用基本参数就能完成大多数课程实验与项目构建。</li>" +
        "<li><b>讨论题 1：</b>为什么“编译通过”不等于“能运行”？你见过哪些链接/运行时错误？</li>" +
        "<li><b>讨论题 2：</b>你更想深入哪一块：语法/错误提示、链接与库、还是性能优化？为什么？</li>" +
        "<li style=\"margin-top:12px;\"><b>Q &amp; A</b></li>" +
        "</ul>",
    },
  ];

  var sidebar = el("sidebar");
  var thumbs = el("thumbs");
  var slideRoot = el("slideRoot");
  var viewport = el("viewport");
  var statusLabel = el("statusLabel");
  var prevBtn = el("prevBtn");
  var nextBtn = el("nextBtn");
  var homeBtn = el("homeBtn");
  var toggleSidebarBtn = el("toggleSidebarBtn");

  function getSlideIndexById(id) {
    for (var i = 0; i < slides.length; i++) {
      if (slides[i].id === id) return i;
    }
    return -1;
  }

  function parseRoute() {
    var hash = (location.hash || "#/").replace(/^#/, "");
    var parts = hash.split("/").filter(Boolean);
    if (parts.length === 0) return { name: "home" };
    if (parts[0] === "slide" && parts[1]) return { name: "slide", id: parts[1] };
    if (parts[0] === "s" && parts[1]) return { name: "slide", id: parts[1] };
    if (parts[0] === "home") return { name: "home" };
    return { name: "notfound", raw: hash };
  }

  function toSlideRoute(id) {
    return "#/slide/" + encodeURIComponent(id);
  }

  function renderSlide(slide, opts) {
    var isThumb = Boolean(opts && opts.thumbnail);
    var index = opts && typeof opts.index === "number" ? opts.index : null;
    var total = opts && typeof opts.total === "number" ? opts.total : null;
    var container = document.createElement("div");
    container.className =
      "slide slide-theme--" +
      escapeHtml(slide.theme || "simple") +
      (isThumb ? " slide--thumb" : "");
    container.style.width = SLIDE_W + "px";
    container.style.height = SLIDE_H + "px";
    container.setAttribute("data-slide-id", slide.id);

    var inner = document.createElement("div");
    inner.className = "s";

    if (!isThumb) {
      var frame = document.createElement("div");
      frame.className = "frame";

      var frameTop = document.createElement("div");
      frameTop.className = "frame__top";

      var chip = document.createElement("div");
      chip.className = "chip";
      chip.innerHTML =
        "<span class=\"chip__dot\" aria-hidden=\"true\"></span>" +
        "<span class=\"chip__text\">" +
        escapeHtml(slide.routeTitle || "页面") +
        "</span>";

      var pill = document.createElement("div");
      pill.className = "pill";
      if (index !== null && total !== null) {
        var a = index + 1;
        var b = total;
        var aa = a < 10 ? "0" + String(a) : String(a);
        var bb = b < 10 ? "0" + String(b) : String(b);
        pill.textContent = aa + " / " + bb;
      } else {
        pill.textContent = "";
      }

      frameTop.appendChild(chip);
      frameTop.appendChild(pill);

      var frameMain = document.createElement("div");
      frameMain.className = "frame__main";

      var title = document.createElement("div");
      title.className = "s__title";
      title.innerHTML = slide.titleHtml;

      var body = document.createElement("div");
      body.className = "s__body";
      body.innerHTML = slide.bodyHtml;

      frameMain.appendChild(title);
      frameMain.appendChild(body);

      frame.appendChild(frameTop);
      frame.appendChild(frameMain);
      inner.appendChild(frame);
      container.appendChild(inner);
      return container;
    }

    var title = document.createElement("div");
    title.className = "s__title";
    title.innerHTML = slide.titleHtml;

    var body = document.createElement("div");
    body.className = "s__body";
    body.innerHTML = slide.bodyHtml;

    inner.appendChild(title);
    inner.appendChild(body);

    container.appendChild(inner);
    return container;
  }

  function setViewportScale() {
    var rect = viewport.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var scale = rect.width / SLIDE_W;
    slideRoot.style.transform = "scale(" + scale + ")";
    slideRoot.style.width = SLIDE_W + "px";
    slideRoot.style.height = SLIDE_H + "px";
  }

  function setActiveThumb(id) {
    var items = thumbs.querySelectorAll("[data-slide-id]");
    for (var i = 0; i < items.length; i++) {
      var isActive = items[i].getAttribute("data-slide-id") === id;
      items[i].classList.toggle("is-active", isActive);
      items[i].setAttribute("aria-current", isActive ? "page" : "false");
    }
  }

  function mountThumbs() {
    thumbs.innerHTML = "";
    for (var i = 0; i < slides.length; i++) {
      (function (slide, idx) {
        var btn = document.createElement("div");
        btn.className = "thumb";
        btn.setAttribute("role", "link");
        btn.setAttribute("tabindex", "0");
        btn.setAttribute("data-slide-id", slide.id);
        btn.setAttribute("title", "打开第 " + (idx + 1) + " 页");

        var preview = document.createElement("div");
        preview.className = "thumb__preview";
        var previewSlide = renderSlide(slide, { thumbnail: true, index: idx, total: slides.length });
        preview.appendChild(previewSlide);

        var label = document.createElement("div");
        label.className = "thumb__label";
        label.innerHTML =
          "<strong>" +
          escapeHtml(String(idx + 1)) +
          "</strong>" +
          "<span>" +
          escapeHtml(slide.routeTitle || "") +
          "</span>";

        btn.appendChild(preview);
        btn.appendChild(label);

        function go() {
          location.hash = toSlideRoute(slide.id);
        }

        btn.addEventListener("click", go);
        btn.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            go();
          }
        });

        thumbs.appendChild(btn);
      })(slides[i], i);
    }
  }

  function renderRoute() {
    var route = parseRoute();

    if (route.name === "home") {
      location.hash = toSlideRoute(slides[0].id);
      return;
    }

    if (route.name === "slide") {
      var idx = getSlideIndexById(route.id);
      if (idx < 0) {
        location.hash = toSlideRoute(slides[0].id);
        return;
      }

      var slide = slides[idx];
      slideRoot.innerHTML = "";
      slideRoot.className = "slide slide--base";
      slideRoot.appendChild(renderSlide(slide, { index: idx, total: slides.length }));

      setActiveThumb(slide.id);
      statusLabel.textContent =
        "第 " + (idx + 1) + " / " + slides.length + " 页 · " + (slide.routeTitle || "");
      setViewportScale();
      return;
    }

    // notfound
    slideRoot.innerHTML =
      "<div class=\"slide slide-theme--simple\" style=\"width:" +
      SLIDE_W +
      "px;height:" +
      SLIDE_H +
      "px;\"><div class=\"s\"><div class=\"s__title\">404</div><div class=\"s__body\">未找到路由：" +
      escapeHtml(route.raw) +
      "</div></div></div>";
    statusLabel.textContent = "未找到路由";
    setViewportScale();
  }

  function goDelta(delta) {
    var route = parseRoute();
    if (route.name !== "slide") return;
    var idx = getSlideIndexById(route.id);
    if (idx < 0) return;
    var next = clamp(idx + delta, 0, slides.length - 1);
    if (next === idx) return;
    location.hash = toSlideRoute(slides[next].id);
  }

  function bindUi() {
    window.addEventListener("hashchange", renderRoute);
    window.addEventListener("resize", setViewportScale);

    prevBtn.addEventListener("click", function () {
      goDelta(-1);
    });
    nextBtn.addEventListener("click", function () {
      goDelta(1);
    });
    homeBtn.addEventListener("click", function () {
      location.hash = toSlideRoute(slides[0].id);
    });

    toggleSidebarBtn.addEventListener("click", function () {
      sidebar.classList.toggle("is-collapsed");
      el("app").classList.toggle("is-sidebar-collapsed");
    });

    window.addEventListener("keydown", function (e) {
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goDelta(-1);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goDelta(1);
      } else if (e.key === "Home") {
        e.preventDefault();
        location.hash = toSlideRoute(slides[0].id);
      }
    });
  }

  function init() {
    mountThumbs();
    bindUi();
    renderRoute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
