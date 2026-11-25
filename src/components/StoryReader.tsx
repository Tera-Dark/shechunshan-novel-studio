import { useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  MessageSquareText,
  Moon,
  Sun,
} from 'lucide-react';
import { CHAPTERS } from '../data/codexData';
import { lintStoryChapters } from '../utils/continuityLinter';

interface StoryReaderProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export function StoryReader({ isDark, onToggleDark }: StoryReaderProps) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [largeType, setLargeType] = useState(false);
  const [copiedChapter, setCopiedChapter] = useState(false);

  const chapter = CHAPTERS[chapterIndex] ?? CHAPTERS[0];
  const currentLint = useMemo(
    () => lintStoryChapters([chapter])[0],
    [chapter]
  );

  const handlePrev = () => {
    setChapterIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setChapterIndex((prev) => Math.min(CHAPTERS.length - 1, prev + 1));
  };

  const handleCopyPureText = async () => {
    const pureText = chapter.paragraphs.join('\n\n');
    try {
      await navigator.clipboard.writeText(pureText);
      setCopiedChapter(true);
      setTimeout(() => setCopiedChapter(false), 2000);
    } catch {
      setCopiedChapter(false);
    }
  };

  const handleDownloadChapter = (ext: 'md' | 'txt') => {
    const content =
      ext === 'md'
        ? `# ${chapter.title}\n\n${chapter.paragraphs.join('\n\n')}\n`
        : `${chapter.title}\n\n${chapter.paragraphs.join('\n\n')}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chapter.title.replace(/\s+/g, '_')}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="reader" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs font-folio tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              正文阅读室 · 沉浸试读与导出
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100">
              慢热立人版连载正文（已更 {CHAPTERS.length} 章） · 支持纯文本复制与导出
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowNotes((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs whitespace-nowrap shrink-0 border border-stone-300 dark:border-stone-700 bg-[#F3EFE6] dark:bg-[#23201C] text-stone-800 dark:text-stone-200 hover:bg-[#EAE3D5] dark:hover:bg-[#2D2924] transition-colors cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{showNotes ? '隐藏改写解析' : '显示改写解析'}</span>
            </button>

            <button
              type="button"
              onClick={() => setLargeType((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs whitespace-nowrap shrink-0 border border-stone-300 dark:border-stone-700 bg-[#F3EFE6] dark:bg-[#23201C] text-stone-800 dark:text-stone-200 hover:bg-[#EAE3D5] dark:hover:bg-[#2D2924] transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{largeType ? '字号：舒朗' : '字号：标准'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleDark}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs whitespace-nowrap shrink-0 border border-stone-300 dark:border-stone-700 bg-[#F3EFE6] dark:bg-[#23201C] text-stone-800 dark:text-stone-200 hover:bg-[#EAE3D5] dark:hover:bg-[#2D2924] transition-colors cursor-pointer"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>切回宣纸日间</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>夜间墨灯模式</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 border-t border-l border-stone-200 dark:border-stone-800">
            {CHAPTERS.map((item, idx) => {
              const active = idx === chapterIndex;
              const numLabel = String(idx + 1).padStart(2, '0');
              const shortTitle = item.title.replace(/^第[一二三四五六七八九十百零\d]+章[\s　]*/, '');
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setChapterIndex(idx)}
                  title={item.title}
                  className={`px-3 py-2.5 text-left border-r border-b border-stone-200 dark:border-stone-800 transition-colors cursor-pointer flex items-baseline gap-2 min-w-0 ${
                    active
                      ? 'bg-[#1C1917] dark:bg-[#EDE8DF] text-[#FBF9F5] dark:text-[#161513] font-semibold'
                      : 'bg-[#FBF9F5] dark:bg-[#161513] text-stone-700 dark:text-stone-300 hover:bg-[#F3EFE6] dark:hover:bg-[#23201C]'
                  }`}
                >
                  <span
                    className={`font-folio text-[11px] shrink-0 ${
                      active
                        ? 'text-[#D97757] dark:text-[#9A3412]'
                        : 'text-stone-400 dark:text-stone-500'
                    }`}
                  >
                    {numLabel}
                  </span>
                  <span className="text-xs truncate">{shortTitle}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-folio text-stone-500 dark:text-stone-400">
              当前阅读：{chapter.title} · 纯汉字 {currentLint.cjkCharCount.toLocaleString()} 字（{currentLint.jinjiangLengthNote}） · 句均 {currentLint.avgSentenceLen} · 逗句比 {currentLint.commaToPeriodRatio}
            </p>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyPureText}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs whitespace-nowrap shrink-0 border border-[#9A3412]/40 dark:border-[#D97757]/50 text-[#9A3412] dark:text-[#D97757] hover:bg-[#9A3412]/5 dark:hover:bg-[#D97757]/10 transition-colors cursor-pointer"
              >
                {copiedChapter ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>已复制纯正文</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>复制纯正文（送检用）</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleDownloadChapter('txt')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs whitespace-nowrap shrink-0 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-[#F3EFE6] dark:hover:bg-[#23201C] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>导出 .txt</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadChapter('md')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs whitespace-nowrap shrink-0 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-[#F3EFE6] dark:hover:bg-[#23201C] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>导出 .md</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <article
            className={`${
              showNotes ? 'lg:col-span-8' : 'lg:col-span-10 lg:col-start-2'
            } bg-[#FBF9F5] dark:bg-[#191714] border border-stone-200 dark:border-stone-800 p-6 sm:p-10 lg:p-12`}
          >
            <header className="pb-8 border-b border-stone-200 dark:border-stone-800">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3">
                <span className="font-folio">{chapter.folio}</span>
                <span aria-hidden="true">·</span>
                <span>{chapter.volume}</span>
                <span aria-hidden="true">·</span>
                <span>{chapter.mood}</span>
                <span aria-hidden="true">·</span>
                <span className="font-folio">{currentLint.cjkCharCount.toLocaleString()} 纯汉字</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                {chapter.title}
              </h3>
              <p className="mt-4 text-sm italic text-stone-600 dark:text-stone-400 leading-relaxed">
                {chapter.epigraph}
              </p>
            </header>

            <div
              className={`mt-8 space-y-6 max-w-prose text-stone-800 dark:text-stone-200 ${
                largeType
                  ? 'text-lg leading-[1.95]'
                  : 'text-base leading-[1.85]'
              }`}
            >
              {chapter.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className={pIdx === 0 ? 'drop-cap-zh' : undefined}
                >
                  {para}
                </p>
              ))}
            </div>

            <footer className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                disabled={chapterIndex === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap shrink-0 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3EFE6] dark:hover:bg-[#23201C] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>上一章</span>
              </button>

              <span className="font-folio text-xs text-stone-500 dark:text-stone-400">
                {String(chapterIndex + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
              </span>

              <button
                type="button"
                onClick={handleNext}
                disabled={chapterIndex === CHAPTERS.length - 1}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm whitespace-nowrap shrink-0 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F3EFE6] dark:hover:bg-[#23201C] transition-colors cursor-pointer"
              >
                <span>下一章</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </footer>
          </article>

          {showNotes && (
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {chapter.id === 'ch-1' && (
                <div className="p-6 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-4">
                  <div className="pb-3 border-b border-stone-200 dark:border-stone-800">
                    <p className="text-xs font-folio text-[#9A3412] dark:text-[#D97757] mb-1">
                      朱雀深度逆向重构 · 复刻原第 02 章过检基因
                    </p>
                    <h4 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                      为何原二章过检而原一章 100% 疑似 AI？四项核心改造
                    </h4>
                  </div>
                  <dl className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <dt className="font-semibold text-stone-900 dark:text-stone-100">
                        01. 斩断长逗号复句串（句均 25.5 → {currentLint.avgSentenceLen} 字）
                      </dt>
                      <dd className="mt-0.5 text-stone-600 dark:text-stone-400">
                        原二章过检的关键在于大量“一句一顿”短句号，逗句比仅 1.31；本章已将逗句比压至 {currentLint.commaToPeriodRatio}，彻底打破大模型一逗到底的流畅复句链。
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-900 dark:text-stone-100">
                        02. 清零“动作。“台词””与剧本冒号（9 → {currentLint.actionPeriodQuoteCount}）
                      </dt>
                      <dd className="mt-0.5 text-stone-600 dark:text-stone-400">
                        原二章所有对话段均直接以“引号”开口，不先写动作再接句号引语；本章全部改回直接开口、话中补动作的自然网文对话节奏。
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-900 dark:text-stone-100">
                        03. 删除背景百科科普腔，改用口语心理白描
                      </dt>
                      <dd className="mt-0.5 text-stone-600 dark:text-stone-400">
                        剔除“九重天司命台正使……也难怪……”这类书面总结句，以楚越带烟火气的内省和随口打岔交代五年前死契旧事。
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-stone-900 dark:text-stone-100">
                        04. 严压“的/地”密度（地 {currentLint.diDensityPer100}% · 的 {currentLint.deDensityPer100}%）并达 {currentLint.cjkCharCount.toLocaleString()} 纯汉字
                      </dt>
                      <dd className="mt-0.5 text-stone-600 dark:text-stone-400">
                        严格对齐谢峥浅灰冷眸、素白细抹额、雪白广袖叠玄墨短肩氅与楚越病弱文士设定，全 20 章均已同步完成 ≥3,000 纯汉字与二章过检基因重构。
                      </dd>
                    </div>
                  </dl>
                  <p className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                    可直接点击上方「复制纯正文（送检用）」，粘贴至腾讯朱雀实测验证。
                  </p>
                </div>
              )}

              <div className="p-6 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800">
                <p className="text-xs text-[#9A3412] dark:text-[#D97757] mb-2">
                  节奏与人物拆解
                </p>
                <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100 pb-4 border-b border-stone-200 dark:border-stone-800">
                  本章人物立意与慢热铺垫要点
                </h4>
                <div className="divide-y divide-stone-200 dark:divide-stone-800">
                  {chapter.marginNotes.map((note, idx) => (
                    <div key={idx} className="py-4 first:pt-4 last:pb-0 space-y-1.5">
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        锚点：{note.anchor}
                      </p>
                      <h5 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {note.title}
                      </h5>
                      <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                        {note.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
