import { useState } from 'react';
import { Check, Code2, Copy, Download, Eye, FileText } from 'lucide-react';
import { DocCategory, STORY_FILES, StoryDocFile } from '../data/chaptersLoader';
import { MarkdownViewer } from './MarkdownViewer';

const CATEGORIES: readonly ('全部文档' | DocCategory)[] = [
  '全部文档',
  '铁律与文风',
  '大纲与规划',
  '世界与角色',
  '记忆与追踪',
  '正文草稿',
] as const;

export function ExportLibrary() {
  const [filter, setFilter] = useState<'全部文档' | DocCategory>('全部文档');
  const [selectedFile, setSelectedFile] = useState<StoryDocFile>(STORY_FILES[0]);
  const [renderMode, setRenderMode] = useState<'formatted' | 'raw'>('formatted');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleFiles = STORY_FILES.filter((f) =>
    filter === '全部文档' ? true : f.category === filter
  );

  const handleSelectCategory = (cat: '全部文档' | DocCategory) => {
    setFilter(cat);
    const nextList = STORY_FILES.filter((f) =>
      cat === '全部文档' ? true : f.category === cat
    );
    if (nextList.length > 0 && !nextList.some((f) => f.id === selectedFile.id)) {
      setSelectedFile(nextList[0]);
    }
  };

  const handleCopyFile = async (file: StoryDocFile) => {
    try {
      await navigator.clipboard.writeText(file.content);
      setCopiedId(file.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const handleDownloadFile = (file: StoryDocFile) => {
    const blob = new Blob([file.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllBundle = () => {
    const bundled = STORY_FILES.map(
      (f) => `==================================================\n文件：${f.path}\n==================================================\n\n${f.content.trim()}\n`
    ).join('\n\n');
    const blob = new Blob([bundled], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '赊春山_完整企划与正文合集.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="export-library" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs font-folio tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              全书档案分类库 · 原始文档实时同步
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100">
              分类档案审查与导出中心
            </h2>
          </div>

          <button
            type="button"
            onClick={handleDownloadAllBundle}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#9A3412] dark:bg-[#D97757] text-white dark:text-[#161513] hover:bg-[#7C2D12] dark:hover:bg-[#C66545] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>打包导出全套设定与正文 (.md)</span>
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div
            className="inline-flex flex-wrap items-center p-1 bg-[#F1ECE2] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800"
            role="tablist"
            aria-label="筛选文档分类"
          >
            {CATEGORIES.map((cat) => {
              const active = filter === cat;
              const count =
                cat === '全部文档'
                  ? STORY_FILES.length
                  : STORY_FILES.filter((f) => f.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#FBF9F5] dark:bg-[#161513] text-stone-900 dark:text-stone-100 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-folio">
            当前分类共 {visibleFiles.length} 份档案 · 支持排版审阅与纯源码导出
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800">
            {visibleFiles.map((file) => {
              const active = selectedFile.id === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedFile(file);
                    }
                  }}
                  className={`p-4 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F4F0E8] dark:bg-[#1E1C19]'
                      : 'hover:bg-[#F4F0E8]/60 dark:hover:bg-[#1E1C19]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[#9A3412] dark:text-[#D97757]">
                      {file.category}
                    </span>
                    <span className="font-folio text-[11px] text-stone-400 truncate">
                      {file.filename}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 shrink-0 text-stone-500" aria-hidden="true" />
                    <span className="truncate">{file.title}</span>
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {file.summary}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="min-w-0">
                <p className="font-folio text-xs text-stone-500 dark:text-stone-400 truncate">
                  {selectedFile.category} · {selectedFile.path}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-stone-900 dark:text-stone-100 truncate mt-1">
                  {selectedFile.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setRenderMode((prev) =>
                      prev === 'formatted' ? 'raw' : 'formatted'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#161513] text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {renderMode === 'formatted' ? (
                    <>
                      <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>切至源码</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>切至排版阅读</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyFile(selectedFile)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-stone-300 dark:border-stone-700 bg-[#FBF9F5] dark:bg-[#161513] text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  {copiedId === selectedFile.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#14532D] dark:text-emerald-400" aria-hidden="true" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>复制全文</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadFile(selectedFile)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#1C1917] dark:bg-[#EDE8DF] text-[#FBF9F5] dark:text-[#161513] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>下载 .md</span>
                </button>
              </div>
            </div>

            <div className="mt-5 max-h-[600px] overflow-y-auto pr-2">
              {renderMode === 'formatted' ? (
                <MarkdownViewer content={selectedFile.content} />
              ) : (
                <pre className="text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 whitespace-pre-wrap font-editorial">
                  {selectedFile.content}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
