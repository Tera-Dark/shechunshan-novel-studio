import { StoryChapter } from '../data/codexData';

export interface LintFinding {
  ruleId: string;
  severity: 'error' | 'warn';
  label: string;
  matches: string[];
}

export type ZhuquePrecheckTier =
  | '低风险 · 贴近二章过检基因'
  | '中风险 · 需压低句长/逗号比'
  | '高风险 · 易触发朱雀疑似AI';

export interface ChapterLintReport {
  chapterId: string;
  title: string;
  charCount: number;
  cjkCharCount: number;
  jinjiangLengthNote: string;
  paragraphCount: number;
  avgParaLen: number;
  avgSentenceLen: number;
  commaToPeriodRatio: number;
  shortFragmentRatio: number;
  sentenceStdDev: number;
  shortSentenceRatio: number;
  deDensityPer100: number;
  diDensityPer100: number;
  colonQuoteCount: number;
  actionPeriodQuoteCount: number;
  splitDialogueCount: number;
  exclamationCount: number;
  zhuqueTier: ZhuquePrecheckTier;
  findings: LintFinding[];
  passed: boolean;
}

const BANNED_AI_CLICHES = [
  '仿佛',
  '宛如',
  '几不可闻',
  '几不可察',
  '微不可闻',
  '微不可察',
  '瞳孔骤缩',
  '瞳孔微微一缩',
  '眼底翻涌',
  '勾起弧度',
  '勾起一抹弧度',
  '骨节泛白',
  '空气凝固',
  '字字千钧',
  '声音低沉微哑',
];

const BANNED_ZHUQUE_AI_FINGERPRINTS = [
  '极轻地',
  '极其自然',
  '极其短暂',
  '极淡地',
  '极浅',
  '悄无声息',
  '泛起一层',
  '透着几分',
  '硬生生',
  '几乎在同一时间',
  '几乎同时',
  '不禁',
  '不由得',
  '不动声色',
  '慢条斯理',
  '不紧不慢',
  '一丝不苟',
  '指节分明',
  '若无其事',
  '若有似无',
  '话音未落',
  '思忖间',
  '不但没',
  '也难怪',
  '——',
  '；',
];

const SCREENPLAY_AI_MARKERS = [
  '下一秒',
  '做完这些',
  '啪地',
  '啪叽',
  '啪嚓',
  '轰隆',
  '嘻嘻',
  '呸呸呸',
  '咕咕哝哝',
  '嗤笑',
  '声气冷硬',
  '倒也不意外',
  '紧接着',
  '只见',
  '只听',
  '却见',
  '此时此刻',
  '随即',
  '随后',
  '陡然',
  '骤然',
];

const BANNED_MODERN_CORP_TERMS = [
  '坏账',
  '天道坏账',
  '审计',
  '核销',
  '清零',
  '高利贷',
  '产业链',
  '进度条',
  '老赖',
  '督查令',
  '记三钱',
  '算二两',
  '一阶',
  '二阶',
  '三阶',
  '四阶',
];

const EARLY_SPOILER_LOCKS: { term: string; maxSafeChapter: number; reason: string }[] = [
  { term: '万劫潭', maxSafeChapter: 25, reason: '卷六归墟掀牌前严禁提前点破万劫潭旧事' },
  { term: '麦饼', maxSafeChapter: 30, reason: '五百年前半块麦饼属卷六核心底牌' },
  { term: '九死劫', maxSafeChapter: 30, reason: '480年前代扛九死劫属卷三/卷六渐进揭秘' },
  { term: '护心符', maxSafeChapter: 20, reason: '九张护心符须于卷一后段至卷三途中陆续缝入' },
  { term: '死刑改判书', maxSafeChapter: 30, reason: '改判书残卷须至卷五司命密库才翻出' },
  { term: '偷拿女儿八字', maxSafeChapter: 7, reason: '第8章地窖探查前严禁旁白剧透赵元德卖女真相' },
];

export function lintStoryChapters(chapters: StoryChapter[]): ChapterLintReport[] {
  return chapters.map((ch, idx) => {
    const chapterNum = idx + 1;
    const fullText = ch.paragraphs.join('\n');
    const compactText = ch.paragraphs.join('');
    const charCount = compactText.length;
    const cjkCharCount = (compactText.match(/[\u4e00-\u9fff]/g) ?? []).length;
    const paragraphCount = ch.paragraphs.length;
    const avgParaLen =
      paragraphCount > 0 ? Math.round((charCount / paragraphCount) * 10) / 10 : 0;

    const shortFragments = ch.paragraphs.filter((p) => p.trim().length <= 4).length;
    const shortFragmentRatio =
      paragraphCount > 0 ? Math.round((shortFragments / paragraphCount) * 100) : 0;

    const sentences = compactText
      .split(/[。！？]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const lengths = sentences.map((s) => s.length);
    const meanLen =
      lengths.length > 0
        ? lengths.reduce((sum, n) => sum + n, 0) / lengths.length
        : 0;
    const avgSentenceLen = Math.round(meanLen * 10) / 10;

    const variance =
      lengths.length > 0
        ? lengths.reduce((sum, n) => sum + Math.pow(n - meanLen, 2), 0) /
          lengths.length
        : 0;
    const sentenceStdDev = Math.round(Math.sqrt(variance) * 10) / 10;

    const shortSentenceCount = lengths.filter((len) => len <= 14).length;
    const shortSentenceRatio =
      lengths.length > 0
        ? Math.round((shortSentenceCount / lengths.length) * 100)
        : 0;

    const commas = (compactText.match(/，/g) ?? []).length;
    const periods = Math.max(1, (compactText.match(/。/g) ?? []).length);
    const commaToPeriodRatio = Math.round((commas / periods) * 100) / 100;

    const deMatches = compactText.match(/的/g) ?? [];
    const diMatches = compactText.match(/地/g) ?? [];
    const deDensityPer100 =
      charCount > 0 ? Math.round((deMatches.length / charCount) * 1000) / 10 : 0;
    const diDensityPer100 =
      charCount > 0 ? Math.round((diMatches.length / charCount) * 1000) / 10 : 0;

    const colonQuoteCount = (fullText.match(/：“/g) ?? []).length;
    const actionPeriodQuoteCount = ch.paragraphs.filter((p) =>
      /^[^“”\n]+[。，]“/.test(p.trim())
    ).length;
    const exclamationCount = (fullText.match(/！/g) ?? []).length;
    const splitDialogueMatches =
      fullText.match(/”[^“”\n]{2,35}[，。]“/g) ?? [];
    const splitDialogueCount = splitDialogueMatches.length;

    const findings: LintFinding[] = [];

    const jinjiangLengthNote =
      cjkCharCount >= 3000
        ? `纯汉字 ${cjkCharCount.toLocaleString()} 字 · 达标 ≥3000`
        : `纯汉字 ${cjkCharCount.toLocaleString()} 字 · 未满 3000 硬线`;

    if (cjkCharCount < 3000) {
      findings.push({
        ruleId: 'jinjiang-length',
        severity: 'error',
        label: `单章纯汉字未满 3000 硬线（当前 ${cjkCharCount} 字）`,
        matches: ['硬性要求：全书 400 章每章纯汉字必须 ≥ 3000 字'],
      });
    }

    if (actionPeriodQuoteCount > 0) {
      findings.push({
        ruleId: 'action-period-quote',
        severity: 'warn',
        label: `命中“动作句号+引语”伪装式 AI 模板（${actionPeriodQuoteCount} 处）`,
        matches: ['对照第02章过检基因（0次），对话段须直接以引号起头或动作独立成段'],
      });
    }

    if (avgSentenceLen > 23.5) {
      findings.push({
        ruleId: 'avg-sentence-len',
        severity: 'warn',
        label: `平均句长偏长（${avgSentenceLen} 字/句）`,
        matches: ['对照第02章过检基因（19.3 字/句），建议多打句号拆短，压至 23.5 以下'],
      });
    }

    if (commaToPeriodRatio > 1.48) {
      findings.push({
        ruleId: 'comma-period-ratio',
        severity: 'warn',
        label: `逗号/句号比偏高（${commaToPeriodRatio}）`,
        matches: ['对照第02章过检基因（1.31），连环逗号长句易触朱雀 AI 判定，建议压至 1.48 以下'],
      });
    }

    if (diDensityPer100 > 0.2) {
      findings.push({
        ruleId: 'di-density',
        severity: 'warn',
        label: `“地”字副词偏多（每百字 ${diDensityPer100} 个）`,
        matches: ['对照第02章过检基因（0.0/百字），改用裸动词，压至 0.2 以下'],
      });
    }

    const clicheHits = BANNED_AI_CLICHES.filter((term) => fullText.includes(term));
    if (clicheHits.length > 0) {
      findings.push({
        ruleId: 'ai-cliche',
        severity: 'error',
        label: '命中 AI 高频套话黑名单',
        matches: clicheHits,
      });
    }

    const zhuqueHits = BANNED_ZHUQUE_AI_FINGERPRINTS.filter((term) =>
      fullText.includes(term)
    );
    if (zhuqueHits.length > 0) {
      findings.push({
        ruleId: 'zhuque-fingerprint',
        severity: 'warn',
        label: '命中朱雀高频 AI 句式/逻辑指纹',
        matches: zhuqueHits,
      });
    }

    const screenplayHits = SCREENPLAY_AI_MARKERS.filter((term) =>
      fullText.includes(term)
    );
    if (screenplayHits.length > 0) {
      findings.push({
        ruleId: 'screenplay-sfx',
        severity: 'warn',
        label: '命中大模型剧本拟声词 / 机械过渡词',
        matches: screenplayHits,
      });
    }

    const modernHits = BANNED_MODERN_CORP_TERMS.filter((term) => fullText.includes(term));
    if (modernHits.length > 0) {
      findings.push({
        ruleId: 'modern-corp',
        severity: 'error',
        label: '命中禁用现代财经/系统腔或记死账梗',
        matches: modernHits,
      });
    }

    const spoilerHits = EARLY_SPOILER_LOCKS.filter(
      (lock) => chapterNum <= lock.maxSafeChapter && fullText.includes(lock.term)
    ).map((lock) => `${lock.term}（${lock.reason}）`);

    if (spoilerHits.length > 0) {
      findings.push({
        ruleId: 'spoiler-lock',
        severity: 'error',
        label: '触发信息锁 / 提前剧透越界',
        matches: spoilerHits,
      });
    }

    if (colonQuoteCount > 0) {
      findings.push({
        ruleId: 'colon-dialogue-template',
        severity: 'warn',
        label: `“动作+冒号+引语”剧本句式（${colonQuoteCount} 次）`,
        matches: ['对照第02章过检基因，必须清零'],
      });
    }

    if (exclamationCount > 2) {
      findings.push({
        ruleId: 'exclamation-density',
        severity: 'warn',
        label: `感叹号偏密（${exclamationCount} 处）`,
        matches: ['建议压至 2 处以内'],
      });
    }

    if (deDensityPer100 > 3.2) {
      findings.push({
        ruleId: 'de-density',
        severity: 'warn',
        label: `“的”字定语密度偏高（每百字 ${deDensityPer100} 个）`,
        matches: ['对照第02章过检基因（2.1/百字），建议压至 3.2 以下'],
      });
    }

    const hasError = findings.some((f) => f.severity === 'error');

    const riskPoints =
      (hasError ? 4 : 0) +
      (actionPeriodQuoteCount > 0 ? 2 : 0) +
      (avgSentenceLen > 23.5 ? 2 : 0) +
      (commaToPeriodRatio > 1.48 ? 2 : 0) +
      (diDensityPer100 > 0.2 ? 1 : 0) +
      (colonQuoteCount > 0 ? 2 : 0) +
      (zhuqueHits.length > 0 ? 2 : 0) +
      (screenplayHits.length > 0 ? 2 : 0);

    const zhuqueTier: ZhuquePrecheckTier =
      riskPoints === 0
        ? '低风险 · 贴近二章过检基因'
        : riskPoints <= 2
          ? '中风险 · 需压低句长/逗号比'
          : '高风险 · 易触发朱雀疑似AI';

    return {
      chapterId: ch.id,
      title: ch.title,
      charCount,
      cjkCharCount,
      jinjiangLengthNote,
      paragraphCount,
      avgParaLen,
      avgSentenceLen,
      commaToPeriodRatio,
      shortFragmentRatio,
      sentenceStdDev,
      shortSentenceRatio,
      deDensityPer100,
      diDensityPer100,
      colonQuoteCount,
      actionPeriodQuoteCount,
      splitDialogueCount,
      exclamationCount,
      zhuqueTier,
      findings,
      passed: !hasError && findings.length === 0,
    };
  });
}
