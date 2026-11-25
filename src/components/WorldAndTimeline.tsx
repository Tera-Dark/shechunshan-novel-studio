import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  ARTWORKS,
  LOGIC_AUDIT_PATCHES,
  SECTS,
  TIMELINE,
  WORLD_SYSTEM_RULES,
} from '../data/codexData';
import { ResilientArtwork } from './ResilientArtwork';

type WorldSubPage = 'sects' | 'rules' | 'patches' | 'timeline';

export function WorldAndTimeline() {
  const [revealTruth, setRevealTruth] = useState(false);
  const [worldTab, setWorldTab] = useState<WorldSubPage>('sects');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'past' | 'present'>('all');

  const filteredTimeline = TIMELINE.filter((item) =>
    timelineFilter === 'all' ? true : item.line === timelineFilter
  );

  return (
    <section id="worldbuilding" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs font-folio tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              世界观与法则 · 独立分类视图
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100">
              八重界域、天律禁制与双线编年
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex flex-wrap items-center p-1 bg-[#F1ECE2] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800"
              role="tablist"
              aria-label="切换世界观子页面"
            >
              {[
                { key: 'sects', label: '八重界域与势力' },
                { key: 'rules', label: '战力禁制与双脉消长' },
                { key: 'patches', label: '防穿帮逻辑锚点' },
                { key: 'timeline', label: '因果双线编年表' },
              ].map((tab) => {
                const active = worldTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setWorldTab(tab.key as WorldSubPage)}
                    className={`px-3.5 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#FBF9F5] dark:bg-[#161513] text-[#9A3412] dark:text-[#D97757] font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {worldTab === 'sects' && (
              <button
                type="button"
                onClick={() => setRevealTruth((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs whitespace-nowrap shrink-0 border transition-colors duration-150 cursor-pointer ${
                  revealTruth
                    ? 'bg-[#9A3412] dark:bg-[#D97757] text-white dark:text-[#161513] border-[#9A3412] dark:border-[#D97757]'
                    : 'bg-[#F3EFE6] dark:bg-[#23201C] text-stone-900 dark:text-stone-100 border-stone-300 dark:border-stone-700 hover:bg-[#EAE3D5] dark:hover:bg-[#2D2924]'
                }`}
              >
                {revealTruth ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>当前：幕后真相（切回传闻）</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>切换至幕后真相</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {worldTab === 'sects' && (
          <div className="mt-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SECTS.map((sect) => (
                <article
                  key={sect.id}
                  className="p-6 lg:p-8 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                      <span>{sect.locus}</span>
                      <span aria-hidden="true">·</span>
                      <span>代表：{sect.keyFigure}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
                      {sect.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#9A3412] dark:text-[#D97757]">
                      {sect.signatureArt}
                    </p>

                    <div className="mt-5 pt-5 border-t border-stone-200 dark:border-stone-800">
                      <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                        {revealTruth ? '真相考据' : '世人传闻'}
                      </p>
                      <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                        {revealTruth ? sect.hiddenTruth : sect.reputationSurface}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="pt-10 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6">
                <ResilientArtwork
                  src={ARTWORKS.lanternRiver}
                  alt="幽州千灯鬼市夜渡长卷"
                  caption="Fig. 3 — 幽州九幽河子时灯会。正道修士视之为妖魔销金窟，实则漂满无数无名者的归魂灯。"
                  aspectClass="aspect-[4/3]"
                  className="h-full"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  核心设定法则 · 《降凡印》、双脉消长与四重同心链
                </p>
                <h3 className="text-2xl lg:text-3xl font-semibold text-stone-900 dark:text-stone-100">
                  先账后刑的天律禁制，与层层失控的绑命誓约
                </h3>
                <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300">
                  大司命下凡受《降凡印》修为压制，且太渊剑须“先账后刑”——唯由天机算查清因果画押方能出鞘正法，迫使两位主角必须并肩查案。许知微靠《太虚定命册》压住十五雷劫与十六寒毒吊命五年，每破一案便直观消解替劫死契（365→0），推动枯竭灵脉历经“死灰→抽芽→凝脉→通窍→圆满”五候复苏。
                </p>
                <p className="text-base leading-relaxed text-stone-700 dark:text-stone-300">
                  四重同心锁命链从牵丝分痛、寒髓渡阳、灵犀共鸣一路锁至命骨同生——哪怕置身命债无间，也要向老天爷赊出一隅有温度的春山。
                </p>
              </div>
            </div>
          </div>
        )}

        {worldTab === 'rules' && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {WORLD_SYSTEM_RULES.map((card, idx) => (
              <article
                key={card.id}
                className="p-6 lg:p-8 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-4"
              >
                <div className="flex items-center gap-2 text-xs text-[#9A3412] dark:text-[#D97757]">
                  <span className="font-folio">0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{card.tag}</span>
                </div>
                <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                  {card.title}
                </h3>
                <ul className="space-y-2.5 pt-3 border-t border-stone-200 dark:border-stone-800 text-sm text-stone-700 dark:text-stone-300">
                  {card.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed flex gap-2">
                      <span className="text-[#9A3412] dark:text-[#D97757] shrink-0">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        {worldTab === 'patches' && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {LOGIC_AUDIT_PATCHES.map((card, idx) => (
              <article
                key={card.id}
                className="p-6 lg:p-8 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-4"
              >
                <div className="flex items-center gap-2 text-xs text-[#9A3412] dark:text-[#D97757]">
                  <span className="font-folio">0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{card.tag}</span>
                </div>
                <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                  {card.title}
                </h3>
                <ul className="space-y-2.5 pt-3 border-t border-stone-200 dark:border-stone-800 text-sm text-stone-700 dark:text-stone-300">
                  {card.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed flex gap-2">
                      <span className="text-[#9A3412] dark:text-[#D97757] shrink-0">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        {worldTab === 'timeline' && (
          <div className="mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
                前尘旧账与现世讨债双线编年
              </h3>
              <div
                className="inline-flex items-center p-1 bg-[#F1ECE2] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800"
                role="tablist"
                aria-label="筛选时间线"
              >
                {[
                  { key: 'all', label: '全部编年' },
                  { key: 'past', label: '天庭旧账' },
                  { key: 'present', label: '下凡同行' },
                ].map((tab) => {
                  const active = timelineFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() =>
                        setTimelineFilter(tab.key as 'all' | 'past' | 'present')
                      }
                      className={`px-3.5 py-1.5 text-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#FBF9F5] dark:bg-[#161513] text-stone-900 dark:text-stone-100 font-semibold'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {filteredTimeline.map((event, idx) => (
                <div
                  key={`${event.year}-${idx}`}
                  className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
                >
                  <div className="md:col-span-3">
                    <span className="font-folio text-xs text-stone-500 dark:text-stone-400">
                      {event.year}
                    </span>
                    <span className="mx-2 text-stone-300 dark:text-stone-700">/</span>
                    <span className="text-xs text-[#9A3412] dark:text-[#D97757]">
                      {event.line === 'past' ? '旧账线' : '现世线'}
                    </span>
                  </div>
                  <div className="md:col-span-9 space-y-2">
                    <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                      {event.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                      {event.detail}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      暗线伏笔：{event.secretLink}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
