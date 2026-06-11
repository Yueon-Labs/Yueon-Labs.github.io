const I18N_DICTIONARY = {
  zh: {
    'nav.playground': 'Playground',
    'nav.join': '加入',
    'nav.github': 'GitHub',
    'nav.joinUs': '加入我们',
    'home.manifesto.strong': 'AIGC 是我们的支撑层。',
    'home.manifesto.rest': '实验室关注会推理的模型、会行动的 Agent、能触碰世界的机器人、可编程的视频，以及让未来更近的学生系统。',
    'home.scope.eyebrow': '01 · 我们探索什么',
    'home.scope.title': '模型、Agent、机器人、视频，都在同一个实验场。',
    'home.scope.model.title': '模型评测场',
    'home.scope.model.body': '模型评测、对抗测试、幻觉分析、失效案例库、能力边界探索。',
    'home.scope.paradigm.title': '新模型范式',
    'home.scope.paradigm.body': '多模态、推理模型、世界模型、端侧模型、新交互范式。',
    'home.scope.agent.title': 'Agent 系统',
    'home.scope.agent.body': '长期记忆、工具调用、任务规划、自主执行、Agent Runtime。',
    'home.scope.robotics.title': '机器人',
    'home.scope.robotics.body': '具身智能、视觉感知、语音交互、动作规划、真实世界任务。',
    'home.scope.video.title': 'AI 视频',
    'home.scope.video.body': 'AI 视频、数字人、短片生成、动态视觉、创意工作流。',
    'home.scope.automation.title': '自动化',
    'home.scope.automation.body': '飞书、网页、本地工具、知识库、信息流和办公流自动化。',
    'home.project.eyebrow': '02 · 当前项目',
    'home.project.label': '本地 AI 助手系统',
    'home.project.title': '长期记忆、深度搜索、工具、定时执行和飞书入口。',
    'home.project.body': '一个本地 AI 助手系统，支持长期记忆、深度搜索、受控命令执行、定时任务和飞书消息接入。它是 AIGC-X 的第一个系统级项目。',
    'home.project.cta': '打开 GitHub',
    'home.join.eyebrow': '03 · 加入我们',
    'home.join.title': '欢迎 builders、researchers、creators、operators 和 product hackers。',
    'home.join.body': '你可以不会代码，但你最好有好奇心。想测模型、做 Agent、玩机器人、做 AI 视频、做产品、做开源，都可以加入这个实验场。',
    'home.join.cta': '关注 GitHub',
    'home.role.builder': 'Builder',
    'home.role.researcher': 'Researcher',
    'home.role.creator': 'Creator',
    'home.role.operator': 'Operator',
    'home.role.product': 'Product Hacker',
    'footer.home': 'Models · Agents · Robotics · AI Video · Playground · Open Source',
    'join.title': '加入我们',
    'join.lede': '一起做 Agent、模型评测、机器人工作流、AI 视频系统，以及可以公开发布的学生工具。',
    'join.back': '返回实验室',
    'join.qq': 'QQ群',
    'join.copy': '复制群号',
    'playground.kicker': 'AIGC-X 活动中心',
    'playground.title': '开放活动空间',
    'playground.lede': 'AIGC-X 的开放活动空间：比赛、Demo、工具、研究展示和未来服务都会从这里生长。',
    'playground.cta.activities': '探索活动',
    'playground.cta.gallery': 'HTML 展示',
    'playground.cta.guide': '阅读指南',
    'playground.activities.eyebrow': '01 · 活动空间',
    'playground.activities.title': '一个中心，承载未来多个模块。',
    'playground.card.live': '已开放',
    'playground.card.next': '下一步',
    'playground.card.future': '未来',
    'playground.html.title': 'HTML 展示墙',
    'playground.html.desc': '比赛提交和个人 HTML 设计，会在网站中安全预览。',
    'playground.html.open': '打开模块',
    'playground.competitions.title': '比赛',
    'playground.competitions.desc': '挑战页面、规则、截止时间、排名、获奖名单和最终展示。',
    'playground.workshops.title': '工作坊',
    'playground.workshops.desc': '模型评测、Agent、机器人、视频、设计和产品主题活动。',
    'playground.demo.title': 'Demo 实验室',
    'playground.demo.desc': '学生工具、模型 Demo、Agent 界面和交互原型。',
    'playground.service.title': '服务入口',
    'playground.service.desc': '托管 API、内部工具、仪表盘和未来后端服务入口。',
    'playground.research.title': '研究墙',
    'playground.research.desc': '笔记、论文、实验、评测记录和公开学习档案。',
    'playground.gallery.eyebrow': '02 · HTML 展示',
    'playground.gallery.title': '第一个模块：在安全预览框里展示个人 HTML 设计。',
    'playground.preview': '预览',
    'playground.preview.empty': '选择一个作品',
    'playground.preview.open': '打开 HTML',
    'playground.guide.eyebrow': '03 · 指南',
    'playground.guide.title': '为多样化 Playground 准备的共同规则。',
    'playground.guide.intro.title': 'Playground 不只是展示墙。',
    'playground.guide.intro.body': 'AIGC-X Playground 是比赛、Demo、工具、研究展示和未来服务的开放活动中心。',
    'playground.guide.open': '打开完整指南',
    'playground.guide.types.label': '类型',
    'playground.guide.types.title': '形式可以很多',
    'playground.guide.types.body': '静态设计、互动实验、AI Demo、文档、工具、原型和未来服务。',
    'playground.guide.structure.label': '结构',
    'playground.guide.structure.title': '一个入口，一个文件夹',
    'playground.guide.structure.body': '使用 playground/submissions/<entry-id>/index.html，并把本地资源放在同一目录附近。',
    'playground.guide.metadata.label': '元数据',
    'playground.guide.metadata.title': '用 JSON 上架',
    'playground.guide.metadata.body': '在 submissions.json 中添加标题、作者、描述、标签和 URL。',
    'playground.guide.safety.label': '安全',
    'playground.guide.safety.title': '先放进沙盒',
    'playground.guide.safety.body': '不能包含密钥、隐藏跳转、凭证收集、付款表单或未审核追踪。',
    'playground.guide.backend.label': '后端',
    'playground.guide.backend.title': '前端先行，API 后续',
    'playground.guide.backend.body': '未来服务可以把 Playground 作为界面入口，后端路由再统一审核。',
    'playground.guide.review.label': '审核',
    'playground.guide.review.title': '通过 PR 提交',
    'playground.guide.review.body': '作品公开部署前会被审核，让网站保持开放且稳定。',
    'playground.submit.eyebrow': '04 · 提交',
    'playground.submit.title': '一个文件夹，一个 HTML 页面。',
    'playground.step1.label': '步骤 01',
    'playground.step1.title': '创建文件夹',
    'playground.step1.body': '把作品放在 playground/submissions/your-name/index.html。',
    'playground.step2.label': '步骤 02',
    'playground.step2.title': '添加元数据',
    'playground.step2.body': '在 playground/submissions.json 里添加 title、author、description、tags 和 URL。',
    'playground.step3.label': '步骤 03',
    'playground.step3.title': '提交 PR',
    'playground.step3.body': '审核并合并后，你的页面会自动出现在公开网站。',
    'footer.playground': 'Student HTML designs · Safe previews · Open competition'
  },
  en: {
    'nav.playground': 'Playground',
    'nav.join': 'Join',
    'nav.github': 'GitHub',
    'nav.joinUs': 'Join us',
    'home.manifesto.strong': 'AIGC is our support layer.',
    'home.manifesto.rest': 'The lab is about models that reason, agents that act, robots that touch the world, programmable video, and student-built systems that make the future feel closer.',
    'home.scope.eyebrow': '01 · What we play with',
    'home.scope.title': 'Models, Agents, Robotics, Video — all in one playground.',
    'home.scope.model.title': 'Model Arena',
    'home.scope.model.body': 'Model evaluation, adversarial testing, hallucination analysis, failure libraries, and capability-boundary exploration.',
    'home.scope.paradigm.title': 'New Model Paradigms',
    'home.scope.paradigm.body': 'Multimodal systems, reasoning models, world models, edge models, and new interaction patterns.',
    'home.scope.agent.title': 'Agent Systems',
    'home.scope.agent.body': 'Long-term memory, tool use, task planning, autonomous execution, and Agent Runtime.',
    'home.scope.robotics.title': 'Robotics',
    'home.scope.robotics.body': 'Embodied intelligence, vision perception, voice interaction, action planning, and real-world tasks.',
    'home.scope.video.title': 'AI Video',
    'home.scope.video.body': 'AI video, digital humans, short-film generation, motion visuals, and creative workflows.',
    'home.scope.automation.title': 'Automation',
    'home.scope.automation.body': 'Feishu, web tasks, local tools, knowledge bases, information flows, and office automation.',
    'home.project.eyebrow': '02 · Current project',
    'home.project.label': 'Local AI Assistant System',
    'home.project.title': 'Memory, deep search, tools, scheduled execution, and Feishu ingress.',
    'home.project.body': 'A local AI assistant system with long-term memory, deep search, controlled command execution, scheduled tasks, and Feishu message ingress. It is AIGC-X’s first system-level project.',
    'home.project.cta': 'Open GitHub',
    'home.join.eyebrow': '03 · Join us',
    'home.join.title': 'For builders, researchers, creators, operators, and product hackers.',
    'home.join.body': 'You do not have to code yet, but you should be curious. Model evaluation, agents, robotics, AI video, product work, and open source all belong in this lab.',
    'home.join.cta': 'Follow on GitHub',
    'home.role.builder': 'Builder',
    'home.role.researcher': 'Researcher',
    'home.role.creator': 'Creator',
    'home.role.operator': 'Operator',
    'home.role.product': 'Product Hacker',
    'footer.home': 'Models · Agents · Robotics · AI Video · Playground · Open Source',
    'join.title': 'Join us',
    'join.lede': 'Build agents, evaluate models, prototype robotics workflows, make AI video systems, and ship student-built tools with people who test ideas in public.',
    'join.back': 'Back to lab',
    'join.qq': 'QQ Group',
    'join.copy': 'Copy number',
    'playground.kicker': 'AIGC-X Activity Hub',
    'playground.title': 'A big place for future activities.',
    'playground.lede': 'AIGC-X is an open activity space where competitions, demos, tools, research showcases, and future services can grow.',
    'playground.cta.activities': 'Explore activities',
    'playground.cta.gallery': 'HTML gallery',
    'playground.cta.guide': 'Read guide',
    'playground.activities.eyebrow': '01 · Activity space',
    'playground.activities.title': 'One hub, many future modules.',
    'playground.card.live': 'Live now',
    'playground.card.next': 'Next',
    'playground.card.future': 'Future',
    'playground.html.title': 'HTML Gallery',
    'playground.html.desc': 'Competition entries and personal HTML designs, previewed safely on the website.',
    'playground.html.open': 'Open module',
    'playground.competitions.title': 'Competitions',
    'playground.competitions.desc': 'Challenge pages, rules, deadlines, rankings, winners, and final showcases.',
    'playground.workshops.title': 'Workshops',
    'playground.workshops.desc': 'Event pages for model evaluation, agents, robotics, video, design, and product sessions.',
    'playground.demo.title': 'Demo Lab',
    'playground.demo.desc': 'Student-built tools, model demos, agent interfaces, and interactive prototypes.',
    'playground.service.title': 'Service Portal',
    'playground.service.desc': 'Entry points for hosted APIs, internal tools, dashboards, and future backend services.',
    'playground.research.title': 'Research Wall',
    'playground.research.desc': 'Notes, papers, experiments, benchmark records, and public learning archives.',
    'playground.gallery.eyebrow': '02 · HTML Gallery',
    'playground.gallery.title': 'The first module: personal HTML designs in safe preview frames.',
    'playground.preview': 'Preview',
    'playground.preview.empty': 'Select a submission',
    'playground.preview.open': 'Open HTML',
    'playground.guide.eyebrow': '03 · Guide',
    'playground.guide.title': 'A shared rulebook for a diverse playground.',
    'playground.guide.intro.title': 'Playground is not only a gallery.',
    'playground.guide.intro.body': 'AIGC-X Playground is an open activity hub for competitions, demos, tools, research showcases, and future services.',
    'playground.guide.open': 'Open full guide',
    'playground.guide.types.label': 'Types',
    'playground.guide.types.title': 'Many forms',
    'playground.guide.types.body': 'Static designs, interactive experiments, AI demos, docs, tools, prototypes, and future services.',
    'playground.guide.structure.label': 'Structure',
    'playground.guide.structure.title': 'One entry, one folder',
    'playground.guide.structure.body': 'Use playground/submissions/<entry-id>/index.html and keep local assets nearby.',
    'playground.guide.metadata.label': 'Metadata',
    'playground.guide.metadata.title': 'Listed by JSON',
    'playground.guide.metadata.body': 'Add title, author, description, tags, and URL in submissions.json.',
    'playground.guide.safety.label': 'Safety',
    'playground.guide.safety.title': 'Sandbox first',
    'playground.guide.safety.body': 'No secrets, hidden redirects, credential collection, payment forms, or unreviewed trackers.',
    'playground.guide.backend.label': 'Backend',
    'playground.guide.backend.title': 'Frontend here, API later',
    'playground.guide.backend.body': 'Future services can use Playground for UI while backend routes are reviewed separately.',
    'playground.guide.review.label': 'Review',
    'playground.guide.review.title': 'Submit through PR',
    'playground.guide.review.body': 'Entries are reviewed before public deployment so the website can stay open and stable.',
    'playground.submit.eyebrow': '04 · Submit',
    'playground.submit.title': 'One folder, one HTML page.',
    'playground.step1.label': 'Step 01',
    'playground.step1.title': 'Create your folder',
    'playground.step1.body': 'Put your work in playground/submissions/your-name/index.html.',
    'playground.step2.label': 'Step 02',
    'playground.step2.title': 'Add metadata',
    'playground.step2.body': 'Add title, author, description, tags, and URL in playground/submissions.json.',
    'playground.step3.label': 'Step 03',
    'playground.step3.title': 'Open a PR',
    'playground.step3.body': 'After review and merge, your page appears on the public website automatically.',
    'footer.playground': 'Student HTML designs · Safe previews · Open competition'
  }
};

(function initI18n() {
  const root = document.documentElement;
  const supported = ['zh', 'en'];
  const zhRegions = ['CN', 'HK', 'MO', 'TW'];
  const zhTimeZones = ['Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Macau', 'Asia/Taipei'];

  function safeLocalStorage(method, key, value) {
    try {
      if (method === 'get') return localStorage.getItem(key);
      if (method === 'set') localStorage.setItem(key, value);
    } catch (_) {
      return null;
    }
    return null;
  }

  function normalizeLanguage(value) {
    if (!value) return null;
    const lower = String(value).trim().toLowerCase();
    if (lower.startsWith('zh')) return 'zh';
    if (lower.startsWith('en')) return 'en';
    return supported.includes(lower) ? lower : null;
  }

  function getRegion(locale) {
    try {
      const parts = new Intl.Locale(locale).maximize();
      return parts.region || '';
    } catch (_) {
      const match = String(locale || '').match(/[-_]([A-Za-z]{2})\b/);
      return match ? match[1].toUpperCase() : '';
    }
  }

  function detectRegionalLanguage() {
    const queryLang = normalizeLanguage(new URLSearchParams(window.location.search).get('lang'));
    if (queryLang) return queryLang;

    const stored = normalizeLanguage(safeLocalStorage('get', 'aigcx-lang'));
    if (stored) return stored;

    const locales = [
      ...((navigator.languages && navigator.languages.length) ? navigator.languages : []),
      navigator.language,
      Intl.DateTimeFormat().resolvedOptions().locale
    ].filter(Boolean);

    const region = locales.map(getRegion).find(Boolean);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zhRegions.includes(region) || zhTimeZones.includes(timeZone)) return 'zh';

    const direct = locales.map(normalizeLanguage).find(Boolean);
    if (direct) return direct;

    return 'en';
  }

  function applyLanguage(lang) {
    const current = normalizeLanguage(lang) || 'en';
    const dict = I18N_DICTIONARY[current] || I18N_DICTIONARY.en;
    root.lang = current === 'zh' ? 'zh-CN' : 'en';
    root.dataset.lang = current;
    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (dict[key]) node.textContent = dict[key];
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => {
      const key = node.getAttribute('data-i18n-aria-label');
      if (dict[key]) node.setAttribute('aria-label', dict[key]);
    });
    document.querySelectorAll('[data-lang-switch]').forEach((button) => {
      const active = button.getAttribute('data-lang-switch') === current;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    safeLocalStorage('set', 'aigcx-lang', current);
  }

  window.setAigcxLanguage = applyLanguage;
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-lang-switch]');
    if (!button) return;
    applyLanguage(button.getAttribute('data-lang-switch'));
  });
  applyLanguage(detectRegionalLanguage());
})();
