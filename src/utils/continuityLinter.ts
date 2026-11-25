import { StoryChapter } from '../data/codexData';

export interface LintFinding {
  ruleId: string;
  severity: 'error' | 'warn';
  label: string;
  matches: string[];
}

export interface ChapterLintReport {
  chapterId: string;
  title: string;
  charCount: number;
  paragraphCount: number;
  shortFragmentRatio: number;
  sentenceStdDev: number;
  shortSentenceRatio: number;
  deDensityPer100: number;
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
  '——',
  '；',
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
  { term: '万劫潭', maxSafeChapter: 15, reason: '卷六归墟掀牌前严禁提前点破万劫潭旧事' },
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
    const paragraphCount = ch.paragraphs.length;

    const shortFragments = ch.paragraphs.filter((p) => p.trim().length <= 4).length;
    const shortFragmentRatio =
      paragraphCount > 0 ? Math.round((shortFragments / paragraphCount) * 100) : 0;

    // Anti-Zhuque Burstiness & Modifier Density metrics
    const sentences = compactText
      .split(/[。！？]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const lengths = sentences.map((s) => s.length);
    const meanLen =
      lengths.length > 0
        ? lengths.reduce((sum, n) => sum + n, 0) / lengths.length
        : 0;
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

    const deMatches = compactText.match(/[的地]/g) ?? [];
    const deDensityPer100 =
      charCount > 0 ? Math.round((deMatches.length / charCount) * 1000) / 10 : 0;

    const findings: LintFinding[] = [];

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
        label: '命中朱雀高频 AI 句式/副词指纹',
        matches: zhuqueHits,
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

    const splitDialogueMatches =
      fullText.match(/”[^“”\n]{2,35}，“/g) ?? [];
    const splitDialogueCount = splitDialogueMatches.length;

    if (shortFragmentRatio > 15) {
      findings.push({
        ruleId: 'choppy-fragments',
        severity: 'warn',
        label: `极短碎句成段占比偏高（${shortFragmentRatio}%）`,
        matches: ['建议维持在 15% 以下以保正统连载文气'],
      });
    }

    if (splitDialogueCount > 7) {
      findings.push({
        ruleId: 'split-dialogue-sandwich',
        severity: 'warn',
        label: `重复“台词+动作+台词”三明治句式过多（${splitDialogueCount} 次）`,
        matches: ['易触发朱雀疑似 AI 判定，建议改用裸对话或自然停顿，压至 7 次以下'],
      });
    }

    if (deDensityPer100 > 5.5) {
      findings.push({
        ruleId: 'de-density',
        severity: 'warn',
        label: `“的/地”修饰词密度偏高（每百字 ${deDensityPer100} 个）`,
        matches: ['建议砍掉多重定语，压至 5.5 以下以提升人工特征'],
      });
    }

    const hasError = findings.some((f) => f.severity === 'error');

    return {
      chapterId: ch.id,
      title: ch.title,
      charCount,
      paragraphCount,
      shortFragmentRatio,
      sentenceStdDev,
      shortSentenceRatio,
      deDensityPer100,
      findings,
      passed: !hasError && findings.length === 0,
    };
  });
}
