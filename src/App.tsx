import { useEffect, useState } from 'react';
import { ArrowRight, BookOpenText, Check, Copy, FileStack, Layers, ScrollText, ShieldCheck, Users } from 'lucide-react';
import { ARTWORKS, STORY_META, VOL1_BEATS, VOLUMES } from './data/codexData';
import { ResilientArtwork } from './components/ResilientArtwork';
import { ProtagonistDossier } from './components/ProtagonistDossier';
import { WorldAndTimeline } from './components/WorldAndTimeline';
import { StoryReader } from './components/StoryReader';
import { ContinuityEngine } from './components/ContinuityEngine';
import { ExportLibrary } from './components/ExportLibrary';

type AppPage = 'overview' | 'outlines' | 'protagonists' | 'worldbuilding' | 'reader' | 'engine' | 'library';
type OutlineTab = 'volumes' | 'beats';

const NAV_ITEMS: { id: AppPage; label: string; icon: typeof ScrollText }[] = [
  { id: 'overview', label: '立意与总览', icon: ScrollText },
  { id: 'outlines', label: '分卷与细纲', icon: Layers },
  { id: 'protagonists', label: '人物志', icon: Users },
  { id: 'worldbuilding', label: '世界观与编年', icon: FileStack },
  { id: 'reader', label: '正文阅读室', icon: BookOpenText },
  { id: 'engine', label: '连载中枢', icon: ShieldCheck },
  { id: 'library', label: '分类档案库', icon: FileStack },
];

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>('overview');
  const [activeVolumeId, setActiveVolumeId] = useState(VOLUMES[0].id);
  const [outlineTab, setOutlineTab] = useState<OutlineTab>('volumes');
  const [isDark, setIsDark] = useState(false);
  const [copiedOutline, setCopiedOutline] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const navigateTo = (page: AppPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeVolume =
    VOLUMES.find((v) => v.id === activeVolumeId) ?? VOLUMES[0];

  const handleCopyOutline = async () => {
    const text = [
      `《${STORY_META.title}》— ${STORY_META.subtitle}`,
      `类型：${STORY_META.genre}`,
      `核心梗概：${STORY_META.hook}`,
      `双璧羁绊：${STORY_META.cpSummary}`,
      '',
      '【八卷 400 章紧凑大纲（约 400 章 · 每章 ≥3,000 纯汉字）】',
      ...VOLUMES.map(
        (v) =>
          `${v.title}（${v.timelineTag}）\n梗概：${v.summary}\n核心奇案：${v.keyCase}\n感情节点：${v.emotionalTurn}\n伏笔：${v.foreshadowing}\n`
      ),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopiedOutline(true);
      setTimeout(() => setCopiedOutline(false), 2000);
    } catch {
      setCopiedOutline(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#161513] text-[#1C1917] dark:text-[#EDE8DF] transition-colors duration-200">
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#161513]/95 backdrop-blur-xs border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigateTo('overview')}
            className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            赊春山
          </button>

          <nav
            aria-label="主导航"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar"
          >
            {NAV_ITEMS.map((item) => {
              const active = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                    active
                      ? 'border-[#9A3412] dark:border-[#D97757] text-[#9A3412] dark:text-[#D97757] font-semibold'
                      : 'border-transparent text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden sm:block shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('reader')}
              className="px-4 py-2 text-xs font-semibold bg-[#9A3412] dark:bg-[#D97757] text-white dark:text-[#161513] hover:bg-[#7C2D12] dark:hover:bg-[#C66545] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              直达正文试读
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {activePage === 'overview' && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 tracking-wider mb-4">
                      {STORY_META.genre}
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-[1.15]">
                      {STORY_META.title}
                    </h1>
                    <p className="mt-3 text-lg sm:text-xl text-[#9A3412] dark:text-[#D97757] italic">
                      {STORY_META.subtitle}
                    </p>

                    <p className="mt-6 text-base leading-[1.85] text-stone-700 dark:text-stone-300">
                      {STORY_META.hook}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-5">
                    <div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mb-1.5">
                        双主角羁绊定位
                      </p>
                      <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">
                        {STORY_META.cpSummary}
                      </p>
                    </div>

                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      创作基调：{STORY_META.toneFormula}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => navigateTo('reader')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#1C1917] dark:bg-[#EDE8DF] text-[#FBF9F5] dark:text-[#161513] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>进入正文阅读室</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyOutline}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-[#F3EFE6] dark:hover:bg-[#23201C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {copiedOutline ? (
                          <>
                            <Check className="w-4 h-4 text-[#14532D] dark:text-emerald-400" aria-hidden="true" />
                            <span>已复制大纲文本</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" aria-hidden="true" />
                            <span>复制立意与大纲</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 flex flex-col">
                  <ResilientArtwork
                    src={ARTWORKS.heroCliff}
                    alt="北境天界界碑与长灯风雪"
                    caption="Fig. 0 — 极北分界碑与司命引路灯。五百年前被风雪掩埋的那份绝密死契，就压在九重天与凡尘交界的风雪之下。"
                    aspectClass="aspect-[16/9] lg:aspect-auto lg:h-full"
                    className="h-full flex flex-col justify-between"
                  />
                </div>
              </div>

              <div className="pt-10 border-t border-stone-200 dark:border-stone-800">
                <p className="text-xs font-folio tracking-wider text-stone-500 dark:text-stone-400 mb-4">
                  全书分页面索引 · 点击直达对应分类
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      page: 'outlines' as AppPage,
                      title: '分卷与细纲',
                      desc: '八卷 400 章紧凑结构 & 卷一 1–25 章逐章细纲表',
                    },
                    {
                      page: 'protagonists' as AppPage,
                      title: '人物志',
                      desc: '谢峥 / 楚越完整生平 & 宿敌与南荒群像',
                    },
                    {
                      page: 'worldbuilding' as AppPage,
                      title: '世界观与编年',
                      desc: '八重界域、战力禁制、逻辑锚点与双线编年',
                    },
                    {
                      page: 'reader' as AppPage,
                      title: '正文阅读室',
                      desc: '沉浸读 1–20 章正文，一键复制纯正文或导出 txt/md',
                    },
                    {
                      page: 'engine' as AppPage,
                      title: '连载中枢',
                      desc: 'POV 边界、伏笔账本、滚动摘要树与实时防吃书质检门禁',
                    },
                    {
                      page: 'library' as AppPage,
                      title: '分类档案库',
                      desc: '铁律、大纲、设定、追踪与草稿全部原始 .md 分类查阅',
                    },
                  ].map((card) => (
                    <button
                      key={card.page}
                      type="button"
                      onClick={() => navigateTo(card.page)}
                      className="text-left p-5 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 hover:border-[#9A3412] dark:hover:border-[#D97757] transition-colors cursor-pointer flex flex-col justify-between gap-3"
                    >
                      <div>
                        <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                          {card.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                      <span className="text-xs text-[#9A3412] dark:text-[#D97757] font-semibold inline-flex items-center gap-1">
                        <span>进入子页面</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === 'outlines' && (
          <section className="py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <p className="text-xs font-folio tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                    分卷与细纲 · 约 400 章紧凑架构（每章 ≥3,000 纯汉字）
                  </p>
                  <h2 className="text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100">
                    从三丈锁链慢热试探，到杀穿九重天重立契约律
                  </h2>
                </div>
                <div
                  className="inline-flex items-center p-1 bg-[#F1ECE2] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800 shrink-0"
                  role="tablist"
                  aria-label="切换大纲子页面"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={outlineTab === 'volumes'}
                    onClick={() => setOutlineTab('volumes')}
                    className={`px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      outlineTab === 'volumes'
                        ? 'bg-[#FBF9F5] dark:bg-[#161513] text-[#9A3412] dark:text-[#D97757] font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    八卷总纲 (1–400章)
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={outlineTab === 'beats'}
                    onClick={() => setOutlineTab('beats')}
                    className={`px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      outlineTab === 'beats'
                        ? 'bg-[#FBF9F5] dark:bg-[#161513] text-[#9A3412] dark:text-[#D97757] font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    卷一 1–25 章细纲表
                  </button>
                </div>
              </div>

              {outlineTab === 'volumes' ? (
                <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800">
                    {VOLUMES.map((vol) => {
                      const isActive = vol.id === activeVolumeId;
                      return (
                        <button
                          key={vol.id}
                          type="button"
                          onClick={() => setActiveVolumeId(vol.id)}
                          className={`w-full text-left py-4 px-4 transition-colors cursor-pointer flex items-baseline justify-between gap-4 ${
                            isActive
                              ? 'bg-[#F4F0E8] dark:bg-[#1E1C19] text-[#9A3412] dark:text-[#D97757]'
                              : 'hover:bg-[#F4F0E8]/60 dark:hover:bg-[#1E1C19]/60 text-stone-800 dark:text-stone-200'
                          }`}
                        >
                          <div className="min-w-0">
                            <span className="font-folio text-xs text-stone-400 mr-2.5">
                              {vol.index}
                            </span>
                            <span className="text-sm font-semibold">
                              {vol.title}
                            </span>
                          </div>
                          <span className="text-xs text-stone-500 dark:text-stone-400 whitespace-nowrap shrink-0">
                            {vol.timelineTag}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="lg:col-span-8 p-6 sm:p-8 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-6">
                    <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                        <span className="font-folio">卷 {activeVolume.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeVolume.timelineTag}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                        {activeVolume.title}
                      </h3>
                    </div>

                    <p className="text-base leading-relaxed text-stone-800 dark:text-stone-200">
                      {activeVolume.summary}
                    </p>

                    <dl className="divide-y divide-stone-200 dark:divide-stone-800 text-sm">
                      <div className="py-3.5 grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <dt className="font-semibold text-stone-900 dark:text-stone-100">
                          核心奇案
                        </dt>
                        <dd className="sm:col-span-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                          {activeVolume.keyCase}
                        </dd>
                      </div>
                      <div className="py-3.5 grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <dt className="font-semibold text-[#9A3412] dark:text-[#D97757]">
                          情感名场面
                        </dt>
                        <dd className="sm:col-span-3 text-stone-800 dark:text-stone-200 leading-relaxed">
                          {activeVolume.emotionalTurn}
                        </dd>
                      </div>
                      <div className="py-3.5 grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <dt className="font-semibold text-stone-900 dark:text-stone-100">
                          伏笔回收
                        </dt>
                        <dd className="sm:col-span-3 text-stone-600 dark:text-stone-400 leading-relaxed">
                          {activeVolume.foreshadowing}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ) : (
                <div className="mt-10 divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800 bg-[#F4F0E8]/50 dark:bg-[#1E1C19]/50">
                  {VOL1_BEATS.map((beat) => (
                    <div
                      key={beat.chapter}
                      className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline"
                    >
                      <div className="lg:col-span-3 flex flex-wrap items-center gap-2">
                        <span className="font-folio text-xs font-semibold text-[#9A3412] dark:text-[#D97757]">
                          {beat.chapter}
                        </span>
                        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {beat.title}
                        </span>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400 font-folio">
                          [{beat.status}]
                        </span>
                      </div>
                      <p className="lg:col-span-5 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        {beat.summary}
                      </p>
                      <p className="lg:col-span-4 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                        张力落点：{beat.tension}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activePage === 'protagonists' && <ProtagonistDossier />}
        {activePage === 'worldbuilding' && <WorldAndTimeline />}
        {activePage === 'reader' && (
          <StoryReader
            isDark={isDark}
            onToggleDark={() => setIsDark((prev) => !prev)}
          />
        )}
        {activePage === 'engine' && <ContinuityEngine />}
        {activePage === 'library' && <ExportLibrary />}
      </main>

      <footer className="border-t border-stone-200 dark:border-stone-800 py-8 bg-[#F4F0E8] dark:bg-[#191714]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <p>
            《赊春山》原创 400 章修仙耽美企划（每章 ≥3,000 纯汉字） · 已拆分为独立子页面，方便随时阅读正文与审查全套档案
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
