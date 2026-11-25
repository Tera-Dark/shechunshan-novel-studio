import { useState } from 'react';
import { ENSEMBLE, GRAVITY_TROPES, PROTAGONISTS, Protagonist } from '../data/codexData';
import { ResilientArtwork } from './ResilientArtwork';

type CharacterSubPage = 'yan' | 'xu' | 'ensemble' | 'craft';

export function ProtagonistDossier() {
  const [subPage, setSubPage] = useState<CharacterSubPage>('yan');

  const activeProtagonist: Protagonist | undefined =
    subPage === 'yan' || subPage === 'xu'
      ? PROTAGONISTS.find((p) => p.id === subPage)
      : undefined;

  return (
    <section id="protagonists" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div>
            <p className="text-xs font-folio tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              人物志 · 独立分类档案
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-stone-900 dark:text-stone-100">
              鲜活众生相：各有脾性，各有渊源
            </h2>
          </div>

          <div
            className="inline-flex flex-wrap items-center p-1 bg-[#F1ECE2] dark:bg-[#23201C] border border-stone-200 dark:border-stone-800"
            role="tablist"
            aria-label="切换人物子页面"
          >
            {[
              { key: 'yan', label: '晏寒江 · 完整档案' },
              { key: 'xu', label: '许知微 · 完整档案' },
              { key: 'ensemble', label: '宿敌与南荒群像' },
              { key: 'craft', label: '人物张力与写作法则' },
            ].map((tab) => {
              const active = subPage === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSubPage(tab.key as CharacterSubPage)}
                  className={`px-4 py-2 text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
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
        </div>

        {activeProtagonist && (
          <div className="mt-10 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-5">
                <ResilientArtwork
                  src={activeProtagonist.image}
                  alt={`${activeProtagonist.name}人物设定立绘`}
                  caption={activeProtagonist.imageCaption}
                  aspectClass="aspect-[3/4]"
                />
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="pb-6 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3">
                    <span>{activeProtagonist.roleLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeProtagonist.sect}</span>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-4">
                    <h3 className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100">
                      {activeProtagonist.name}
                    </h3>
                    <span className="text-base text-stone-600 dark:text-stone-400">
                      {activeProtagonist.courtesyName}
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-stone-700 dark:text-stone-300">
                    {activeProtagonist.coreTrait}
                  </p>
                </div>

                <dl className="divide-y divide-stone-200 dark:divide-stone-800 text-sm">
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                    <dt className="font-semibold text-stone-900 dark:text-stone-100">
                      随身重器
                    </dt>
                    <dd className="sm:col-span-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {activeProtagonist.artifactName}
                      </span>
                      <span aria-hidden="true"> — </span>
                      {activeProtagonist.artifactDesc}
                    </dd>
                  </div>
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                    <dt className="font-semibold text-stone-900 dark:text-stone-100">
                      人前风貌
                    </dt>
                    <dd className="sm:col-span-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                      {activeProtagonist.inPublic}
                    </dd>
                  </div>
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                    <dt className="font-semibold text-stone-900 dark:text-stone-100">
                      私下暗面
                    </dt>
                    <dd className="sm:col-span-3 text-stone-700 dark:text-stone-300 leading-relaxed">
                      {activeProtagonist.inPrivate}
                    </dd>
                  </div>
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4">
                    <dt className="font-semibold text-[#9A3412] dark:text-[#D97757]">
                      彼眼中的此人
                    </dt>
                    <dd className="sm:col-span-3 text-stone-800 dark:text-stone-200 leading-relaxed">
                      {activeProtagonist.viewOfOther}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-6">
                前尘与现世对照（完整展开）
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {[activeProtagonist.stages.past, activeProtagonist.stages.present].map(
                  (stage) => (
                    <article
                      key={stage.era}
                      className="p-6 lg:p-8 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-5"
                    >
                      <div>
                        <p className="text-xs text-[#9A3412] dark:text-[#D97757] tracking-wider mb-1.5">
                          {stage.era} · {stage.title}
                        </p>
                        <blockquote className="text-lg italic text-stone-900 dark:text-stone-100 leading-relaxed pt-2">
                          {stage.quote}
                        </blockquote>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-stone-200 dark:border-stone-800 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                        <div>
                          <h5 className="font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
                            形貌衣冠
                          </h5>
                          <p>{stage.appearance}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-stone-900 dark:text-stone-100 mb-1.5">
                            性情行止
                          </h5>
                          <p>{stage.demeanor}</p>
                        </div>
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {subPage === 'ensemble' && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {ENSEMBLE.map((member, idx) => (
              <article
                key={member.id}
                className={`p-6 lg:p-7 border border-stone-200 dark:border-stone-800 flex flex-col justify-between ${
                  idx === 0
                    ? 'md:col-span-2 bg-[#F4F0E8] dark:bg-[#1E1C19]'
                    : 'bg-[#FBF9F5] dark:bg-[#191714]'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                    <span>{member.alias}</span>
                    <span aria-hidden="true">·</span>
                    <span>{member.affiliation}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                    {member.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 mb-3">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      表象：
                    </span>
                    {member.surfaceRole}
                  </p>
                  <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300 mb-4">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      里层：
                    </span>
                    {member.hiddenDepth}
                  </p>
                </div>
                <p className="pt-3 border-t border-stone-200/70 dark:border-stone-800/70 text-sm italic text-[#9A3412] dark:text-[#D97757]">
                  {member.signatureLine}
                </p>
              </article>
            ))}
          </div>
        )}

        {subPage === 'craft' && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {GRAVITY_TROPES.map((item, idx) => (
              <div
                key={item.title}
                className="p-6 lg:p-8 bg-[#F4F0E8] dark:bg-[#1E1C19] border border-stone-200 dark:border-stone-800 space-y-3"
              >
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                  <span className="font-folio">0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.tag}</span>
                </div>
                <h4 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    设定脉络：
                  </span>
                  {item.mechanism}
                </p>
                <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span className="font-semibold text-[#9A3412] dark:text-[#D97757]">
                    张力落点：
                  </span>
                  {item.payoff}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
