import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookMarked,
  Check,
  CheckCircle2,
  Copy,
  Download,
  EyeOff,
  FileCode2,
  GitBranch,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { CHAPTERS, VOL1_BEATS } from '../data/codexData';
import { STORY_FILES } from '../data/chaptersLoader';
import {
  CHARACTER_STATES,
  FORESHADOW_THREADS,
  ForeshadowThread,
  ROLLING_SUMMARIES,
} from '../data/trackerData';
import { lintStoryChapters } from '../utils/continuityLinter';

type EngineTab = 'state' | 'foreshadow' | 'rolling' | 'linter';
type ForeshadowFilter = '全部' | '当前卷活跃' | '中远期锁闭';

export function ContinuityEngine() {
  const [activeTab, setActiveTab] = useState<EngineTab>('state');
  const [foreshadowFilter, setForeshadowFilter] =
    useState<ForeshadowFilter>('全部');
  const [copiedPacket, setCopiedPacket] = useState(false);
  const [showPacketPreview, setShowPacketPreview] = useState(false);

  const lintReports = useMemo(() => lintStoryChapters(CHAPTERS), []);

  const totalChars = useMemo(
    () => lintReports.reduce((acc, item) => acc + item.charCount, 0),
    [lintReports]
  );

  const passedCount = useMemo(
    () => lintReports.filter((item) => item.passed).length,
    [lintReports]
  );

  const filteredForeshadows = useMemo(() => {
    if (foreshadowFilter === '全部') return FORESHADOW_THREADS;
    if (foreshadowFilter === '当前卷活跃') {
      const activeStatuses: ForeshadowThread['status'][] = [
        '推进中',
        '待推进',
        '已露端倪',
        '已锁定暗格',
        '待触发',
        '核心活跃',
        '已部分回收',
      ];
      return FORESHADOW_THREADS.filter((item) =>
        activeStatuses.includes(item.status)
      );
    }
    return FORESHADOW_THREADS.filter(
      (item) => item.status === '刚埋下' || item.status === '未开启'
    );
  }, [foreshadowFilter]);

  const upcomingBeats = useMemo(
    () => VOL1_BEATS.filter((beat) => beat.status === '待写'),
    []
  );

  const compiledContextPacket = useMemo(() => {
    const skillDoc = STORY_FILES.find((f) => f.id === 'skill')?.content ?? '';
    const auditDoc = STORY_FILES.find((f) => f.id === 'audit')?.content ?? '';
    const foreshadowDoc =
      STORY_FILES.find((f) => f.id === 'tracker-foreshadow')?.content ?? '';
    const stateDoc =
      STORY_FILES.find((f) => f.id === 'tracker-state')?.content ?? '';
    const rollingDoc =
      STORY_FILES.find((f) => f.id === 'tracker-rolling')?.content ?? '';

    const beatsMarkdown = upcomingBeats
      .map(
        (b) =>
          `- **${b.chapter} · ${b.title}**\n  - 细纲：${b.summary}\n  - 张力落点：${b.tension}`
      )
      .join('\n');

    return [
      '# 《赊春山》下一轮续写防吃书上下文包（Context Compiler 自动汇编）',
      '',
      '## 一、待推进章节细纲（下一轮优先：第 21–25 章）',
      beatsMarkdown,
      '',
      '## 二、角色运行态与 POV 知识边界矩阵',
      stateDoc.trim(),
      '',
      '## 三、滚动摘要压缩树与衔接锚点',
      rollingDoc.trim(),
      '',
      '## 四、伏笔追踪账本',
      foreshadowDoc.trim(),
      '',
      '## 五、创作铁律与保密锁',
      auditDoc.trim(),
      '',
      '## 六、去 AI 味与《燕云》江湖烟火写作规范',
      skillDoc.trim(),
    ].join('\n');
  }, [upcomingBeats]);

  const handleCopyContextPacket = async () => {
    try {
      await navigator.clipboard.writeText(compiledContextPacket);
      setCopiedPacket(true);
      setTimeout(() => setCopiedPacket(false), 2000);
    } catch {
      setCopiedPacket(false);
    }
  };

  const handleDownloadPacket = () => {
    const blob = new Blob([compiledContextPacket], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '赊春山_下一轮防吃书上下文包.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="continuity-engine" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs font-folio tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              长篇连载底层编写地基 · 记忆压缩与门禁校验
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100">
              连载中枢：防吃书、伏笔与质检门禁
            </h2>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 max-w-3xl leading-relaxed">
              参照长篇小说工程化四层记忆架构（硬设定宪法、POV 知识边界、伏笔账本、金字塔滚动摘要），确保推进至百章、千章时人物智商、时间线、禁词表与暗线伏笔依然严丝合缝。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyContextPacket}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-[#9A3412] dark:bg-[#D97757] text-white dark:text-[#161513] hover:bg-[#7C2D12] dark:hover:bg-[#C66545] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedPacket ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>已复制防吃书上下文包</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>复制下一轮防吃书上下文包</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPacket}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-[#F3EFE6] dark:hover:bg-[#23201C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>导出打包 .md</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              已入库定稿正文
            </p>
            <p className="mt-1.5 text-2xl font-semibold font-folio text-stone-900 dark:text-stone-100">
              {CHAPTERS.length} 章
            </p>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              合计约 {totalChars.toLocaleString()} 字
            </p>
          </div>

          <div className="p-4 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              确定性文风/剧透门禁
            </p>
            <p className="mt-1.5 text-2xl font-semibold font-folio text-stone-900 dark:text-stone-100">
              {passedCount} / {lintReports.length} 通过
            </p>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              实时扫描禁词、碎句与信息锁
            </p>
          </div>

          <div className="p-4 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              在册伏笔线索
            </p>
            <p className="mt-1.5 text-2xl font-semibold font-folio text-stone-900 dark:text-stone-100">
              {FORESHADOW_THREADS.length} 条
            </p>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              覆盖卷一短线至卷六终极底牌
            </p>
          </div>

          <div className="p-4 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              下一轮衔接目标
            </p>
            <p className="mt-1.5 text-2xl font-semibold font-folio text-[#9A3412] dark:text-[#D97757]">
              第 21–25 章
            </p>
            <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
              含 {upcomingBeats.length} 组待写章回细纲
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div
            className="inline-flex flex-wrap items-center p-1 bg-[#F1ECE2] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800"
            role="tablist"
            aria-label="切换连载中枢功能模块"
          >
            {[
              { id: 'state' as EngineTab, label: '角色状态与 POV 边界', icon: EyeOff },
              { id: 'foreshadow' as EngineTab, label: '伏笔追踪账本', icon: BookMarked },
              { id: 'rolling' as EngineTab, label: '滚动摘要树', icon: Layers },
              { id: 'linter' as EngineTab, label: '质检门禁与上下文包', icon: ShieldCheck },
            ].map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FBF9F5] dark:bg-[#161513] text-[#9A3412] dark:text-[#D97757] font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs font-folio text-stone-500 dark:text-stone-400">
            状态基准：截至第 20 章末（三月二十三子时）
          </p>
        </div>

        {activeTab === 'state' && (
          <div className="space-y-6">
            {CHARACTER_STATES.map((char) => (
              <article
                key={char.name}
                className="bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-4 border-b border-stone-200 dark:border-stone-800">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {char.name}
                  </h3>
                  <p className="text-xs font-folio text-[#9A3412] dark:text-[#D97757]">
                    当前位置：{char.location}
                  </p>
                </div>

                <dl className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
                  <div className="space-y-1">
                    <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      身心与修为状态
                    </dt>
                    <dd className="text-stone-800 dark:text-stone-200 leading-relaxed">
                      {char.condition}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      随身物证 / 法器道具
                    </dt>
                    <dd className="text-stone-800 dark:text-stone-200 leading-relaxed">
                      {char.inventory}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      关系温度锚点
                    </dt>
                    <dd className="text-stone-800 dark:text-stone-200 leading-relaxed">
                      {char.relationshipState}
                    </dd>
                  </div>
                </dl>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
                  <div className="p-4 bg-[#FBF9F5] dark:bg-[#161513] border border-stone-200 dark:border-stone-800 space-y-2.5">
                    <p className="text-xs font-semibold text-[#14532D] dark:text-emerald-400">
                      当前已知（后续正文可安全调用）
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {char.knows.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-folio text-stone-400 shrink-0">
                            0{idx + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-[#FBF9F5] dark:bg-[#161513] border border-[#9A3412]/30 dark:border-[#D97757]/30 space-y-2.5">
                    <p className="text-xs font-semibold text-[#9A3412] dark:text-[#D97757]">
                      绝对未知（POV 知识边界禁区，严禁提前泄底）
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {char.unknownToCharacter.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-folio text-[#9A3412] dark:text-[#D97757] shrink-0">
                            ×
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'foreshadow' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center p-1 bg-[#F1ECE2] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800">
                {(['全部', '当前卷活跃', '中远期锁闭'] as ForeshadowFilter[]).map(
                  (filterName) => {
                    const active = foreshadowFilter === filterName;
                    return (
                      <button
                        key={filterName}
                        type="button"
                        onClick={() => setForeshadowFilter(filterName)}
                        className={`px-3 py-1.5 text-xs whitespace-nowrap transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#FBF9F5] dark:bg-[#161513] text-stone-900 dark:text-stone-100 font-semibold'
                            : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                        }`}
                      >
                        {filterName}
                      </button>
                    );
                  }
                )}
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-folio">
                当前显示 {filteredForeshadows.length} 条伏笔 · 同步自 /story/tracker/01_伏笔追踪总表.md
              </p>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800 bg-[#F4F0E8]/60 dark:bg-[#1E1C19]/60">
              {filteredForeshadows.map((item) => (
                <div
                  key={item.id}
                  className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline"
                >
                  <div className="lg:col-span-2 flex items-center gap-2.5">
                    <span className="font-folio text-sm font-semibold text-[#9A3412] dark:text-[#D97757]">
                      {item.id}
                    </span>
                    <span className="text-xs font-folio text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700 px-2 py-0.5 bg-[#FBF9F5] dark:bg-[#161513]">
                      {item.status}
                    </span>
                  </div>
                  <div className="lg:col-span-4 space-y-1">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-relaxed">
                      {item.clue}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      埋设：{item.plantedAt}
                    </p>
                  </div>
                  <div className="lg:col-span-3 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    <span className="text-stone-500 dark:text-stone-400 block mb-0.5">
                      预期回收窗口
                    </span>
                    {item.targetWindow}
                  </div>
                  <div className="lg:col-span-3 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    <span className="text-[#9A3412] dark:text-[#D97757] block mb-0.5">
                      防剧透与衔接约束
                    </span>
                    {item.constraint}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rolling' && (
          <div className="space-y-8">
            <div className="divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800 bg-[#F4F0E8]/60 dark:bg-[#1E1C19]/60">
              {ROLLING_SUMMARIES.map((row) => (
                <div
                  key={row.chapter}
                  className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
                >
                  <div className="lg:col-span-3 space-y-1">
                    <p className="font-folio text-xs font-semibold text-[#9A3412] dark:text-[#D97757]">
                      {row.chapter} · {row.pov}视角
                    </p>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {row.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {row.timeAnchor} · {row.location}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-1.5">
                    <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                      核心事件压缩
                    </p>
                    <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                      {row.digest}
                    </p>
                  </div>

                  <div className="lg:col-span-4 space-y-2 text-xs leading-relaxed">
                    <div>
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        状态增量（Delta）：
                      </span>
                      <span className="text-stone-700 dark:text-stone-300">
                        {row.stateDelta}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#9A3412] dark:text-[#D97757]">
                        章末钩子：
                      </span>
                      <span className="text-stone-600 dark:text-stone-400">
                        {row.hook}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100">
                <GitBranch className="w-4 h-4 text-[#9A3412] dark:text-[#D97757]" aria-hidden="true" />
                <span>下一批推进锚点（第 21–25 章写前锁定）</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {upcomingBeats.slice(0, 3).map((beat) => (
                  <div
                    key={beat.chapter}
                    className="p-4 bg-[#FBF9F5] dark:bg-[#161513] border border-stone-200 dark:border-stone-800 space-y-1.5"
                  >
                    <p className="font-folio text-xs text-[#9A3412] dark:text-[#D97757]">
                      {beat.chapter} · {beat.title}
                    </p>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                      {beat.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'linter' && (
          <div className="space-y-8">
            <div className="p-5 sm:p-6 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  晋江五项 AI 抽检对标 · 朱雀三大特征预检与 3,000 字门禁
                </h3>
                <span className="text-xs font-folio text-stone-500 dark:text-stone-400">
                  对标：阅文 · 朱雀（最严） · DS · GLM · 千问 · 晋江约 3,000 字/章
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                依据社区公开分析，腾讯朱雀主要抓取三大机器特征：<strong>困惑度过低</strong>（过度工整的高频平滑过渡如“下一秒/做完这些/紧接着/不禁”）、<strong>突发性不足</strong>（句长齐整、缺乏长短错落）以及<strong>局部结构指纹</strong>（剧本冒号引语“：“”、感叹号拟声轰炸、连续三明治句式、修饰词“的/地”过密与单人 POV 破视角描写）。全书已永久录入<strong>晋江单章约 3,000 字（2,600–3,500 字）</strong>要领；<strong>第 02 章</strong>原封保留为朱雀 100% 过检基准，<strong>第 01 章及第 03–20 章</strong>均已完成逐章去 AI 味精修与门禁自检。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {lintReports.map((report) => (
                <div
                  key={report.chapterId}
                  className="p-5 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
                    <div>
                      <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                        {report.title}
                      </h3>
                      <p className="mt-1 text-xs font-folio text-stone-500 dark:text-stone-400">
                        正文 {report.charCount.toLocaleString()} 字（{report.jinjiangLengthNote}） ·{' '}
                        {report.paragraphCount} 段 · 句长方差{' '}
                        {report.sentenceStdDev} · 短句{' '}
                        {report.shortSentenceRatio}% · 的/地{' '}
                        {report.deDensityPer100}/百字
                      </p>
                      <p className="mt-1 text-xs font-folio text-stone-500 dark:text-stone-400">
                        剧本冒号 {report.colonQuoteCount} 次 · 感叹号{' '}
                        {report.exclamationCount} 处 · 三明治句{' '}
                        {report.splitDialogueCount} 次 · {report.zhuqueTier}
                      </p>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 ${
                        report.passed
                          ? 'text-[#14532D] dark:text-emerald-400'
                          : 'text-[#9A3412] dark:text-[#D97757]'
                      }`}
                    >
                      {report.passed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          <span>门禁通过</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                          <span>待修正</span>
                        </>
                      )}
                    </div>
                  </div>

                  {report.findings.length === 0 ? (
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      已通过全项确定性检验：冒号剧本腔与拟声套词归零、句长突发性贴近第 02 章过检基准、定语“的/地”低密度、零 AI 套话与提前剧透词。
                    </p>
                  ) : (
                    <ul className="space-y-2 text-xs">
                      {report.findings.map((finding, idx) => (
                        <li
                          key={idx}
                          className="p-2.5 bg-[#FBF9F5] dark:bg-[#161513] border border-[#9A3412]/30 text-stone-800 dark:text-stone-200"
                        >
                          <p className="font-semibold text-[#9A3412] dark:text-[#D97757]">
                            {finding.label}
                          </p>
                          <p className="mt-1 text-stone-600 dark:text-stone-400">
                            命中项：{finding.matches.join('、')}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-[#9A3412] dark:text-[#D97757]" aria-hidden="true" />
                    <span>下一轮上下文编译器（Context Compiler）</span>
                  </h3>
                  <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                    每次开新篇章前，将本汇编包作为硬约束底座喂入创作流程，即可在不反复重读几十万字旧稿的前提下保持设定与人物一致。
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowPacketPreview((prev) => !prev)}
                  className="px-3.5 py-2 text-xs border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#161513] text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {showPacketPreview ? '收起上下文包源码' : '展开预览上下文包'}
                </button>
              </div>

              {showPacketPreview && (
                <pre className="max-h-96 overflow-y-auto p-4 bg-[#FBF9F5] dark:bg-[#161513] border border-stone-200 dark:border-stone-800 text-xs leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-wrap font-editorial">
                  {compiledContextPacket}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
