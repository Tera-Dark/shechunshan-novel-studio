import skillGuideRaw from '../../story/00_去AI味与网文人味写作Skill.md?raw';
import auditMemoRaw from '../../story/06_创作铁律与动态复查备忘录.md?raw';
import premiseRaw from '../../story/01_核心梗概与三大融合设定.md?raw';
import worldRaw from '../../story/02_世界观与宗门秘辛.md?raw';
import charactersRaw from '../../story/03_角色档案_主角与群像.md?raw';
import outlineRaw from '../../story/04_五卷大纲与双线编年.md?raw';
import commercializationRaw from '../../story/05_千章连载商业化与读者钩子规划.md?raw';

import ch1Raw from '../../story/chapters/第01章_五花肉账单与避雷槐.md?raw';
import ch2Raw from '../../story/chapters/第02章_十五寒毒与渡灵夜.md?raw';
import ch3Raw from '../../story/chapters/第03章_画皮阴契与故人来.md?raw';
import ch4Raw from '../../story/chapters/第04章_一文钱买来的城南怪事.md?raw';
import ch5Raw from '../../story/chapters/第05章_无面画师与错字铜钱.md?raw';
import ch6Raw from '../../story/chapters/第06章_十六寒毒与近身渡气.md?raw';
import trackerForeshadowRaw from '../../story/tracker/01_伏笔追踪总表.md?raw';
import trackerStateRaw from '../../story/tracker/02_角色状态与POV边界矩阵.md?raw';
import trackerRollingRaw from '../../story/tracker/03_滚动摘要与章节质检记录.md?raw';

export type DocCategory =
  | '铁律与文风'
  | '大纲与规划'
  | '世界与角色'
  | '记忆与追踪'
  | '正文草稿';

export interface StoryDocFile {
  id: string;
  path: string;
  filename: string;
  title: string;
  category: DocCategory;
  summary: string;
  content: string;
}

function parseMarkdownChapter(raw: string): { title: string; paragraphs: string[] } {
  const lines = raw.trim().split(/\r?\n/);
  let title = '';
  const bodyLines: string[] = [];

  for (const line of lines) {
    if (!title && line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').trim();
      continue;
    }
    bodyLines.push(line);
  }

  const paragraphs = bodyLines
    .join('\n')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return { title, paragraphs };
}

export const PARSED_CHAPTERS = {
  ch1: parseMarkdownChapter(ch1Raw),
  ch2: parseMarkdownChapter(ch2Raw),
  ch3: parseMarkdownChapter(ch3Raw),
  ch4: parseMarkdownChapter(ch4Raw),
  ch5: parseMarkdownChapter(ch5Raw),
  ch6: parseMarkdownChapter(ch6Raw),
};

export const STORY_FILES: StoryDocFile[] = [
  {
    id: 'audit',
    path: '/story/06_创作铁律与动态复查备忘录.md',
    filename: '06_创作铁律与动态复查备忘录.md',
    title: '创作铁律与动态复查备忘录',
    category: '铁律与文风',
    summary: '动态复查与防遗忘最高准则：文风配比、六大防穿帮技术桩、保密锁与卷一近景账本。',
    content: auditMemoRaw,
  },
  {
    id: 'skill',
    path: '/story/00_去AI味与网文人味写作Skill.md',
    filename: '00_去AI味与网文人味写作Skill.md',
    title: '去 AI 味与《燕云》江湖烟火写作 Skill',
    category: '铁律与文风',
    summary: '正规平台上架级“江湖烟火 × 轻墨香风”实战规范、现代腔禁词表及可直接复用的 Prompt 模板。',
    content: skillGuideRaw,
  },
  {
    id: 'premise',
    path: '/story/01_核心梗概与三大融合设定.md',
    filename: '01_核心梗概与三大融合设定.md',
    title: '核心梗概与挑剔向设计总纲',
    category: '大纲与规划',
    summary: '书名双层意象、恶犬骑士 × 驯犬执棋人、四重锁脉金链机制与《天官》《燕云》风骨融合法则。',
    content: premiseRaw,
  },
  {
    id: 'outline',
    path: '/story/04_五卷大纲与双线编年.md',
    filename: '04_五卷大纲与双线编年.md',
    title: '八卷千章级分卷详纲（1–1000 章）',
    category: '大纲与规划',
    summary: '加密版 8 大卷详纲：每卷 3–4 个递进诡案撑实 120 章体量，绑定双脉消长与卷末悬念卡点。',
    content: outlineRaw,
  },
  {
    id: 'commercialization',
    path: '/story/05_千章连载商业化与读者钩子规划.md',
    filename: '05_千章连载商业化与读者钩子规划.md',
    title: '千章连载节奏规划与卷一 1–15 章细纲',
    category: '大纲与规划',
    summary: '挑剔向读者的三大避坑指南、120 章循环模型，及第一卷第 1–15 章逐章细纲（含第 11–12 章智斗升级）。',
    content: commercializationRaw,
  },
  {
    id: 'world',
    path: '/story/02_世界观与宗门秘辛.md',
    filename: '02_世界观与宗门秘辛.md',
    title: '世界观、修行禁制与八重界域档案',
    category: '世界与角色',
    summary: '含《降凡印》与先账后刑禁制、功德折抵规则、双病源锚定及替劫死契消解/枯木回春五候。',
    content: worldRaw,
  },
  {
    id: 'characters',
    path: '/story/03_角色档案_主角与群像.md',
    filename: '03_角色档案_主角与群像.md',
    title: '双主角心理、逻辑补丁与全阵营档案',
    category: '世界与角色',
    summary: '同朝未相认五重障碍、五年忍耐真相、玉清天尊理念镜像及卷一赵府/南荒暗卫完整配角卡。',
    content: charactersRaw,
  },
  {
    id: 'ch1',
    path: '/story/chapters/第01章_五花肉账单与避雷槐.md',
    filename: '第01章_五花肉账单与避雷槐.md',
    title: '第 01 章 · 雨巷算官与避雷槐',
    category: '正文草稿',
    summary: '先立人物与关系立场：借南荒破铺烟火与晏寒江踏雨扣链，交代清楚五年前替劫死契与昔日天枢殿旧事。',
    content: ch1Raw,
  },
  {
    id: 'ch2',
    path: '/story/chapters/第02章_十五寒毒与渡灵夜.md',
    filename: '第02章_十五寒毒与渡灵夜.md',
    title: '第 02 章 · 十五夜雷与东屋焦香',
    category: '正文草稿',
    summary: '去掉滑稽记账腔：雷煞分流三成与晨起滚烫姜汤，两人围绕“先账后刑”与袖口焦香展开克制试探。',
    content: ch2Raw,
  },
  {
    id: 'ch3',
    path: '/story/chapters/第03章_画皮阴契与故人来.md',
    filename: '第03章_画皮阴契与故人来.md',
    title: '第 03 章 · 故人折扇与未消契',
    category: '正文草稿',
    summary: '陆沉璧上门羞辱衬出许知微昔日荣光，晏寒江冷面拦人；随后一句“你到底改了什么主意”切入赵府诡案。',
    content: ch3Raw,
  },
  {
    id: 'ch4',
    path: '/story/chapters/第04章_一文钱买来的城南怪事.md',
    filename: '第04章_一文钱买来的城南怪事.md',
    title: '第 04 章 · 城南无影尸与妆镜偏',
    category: '正文草稿',
    summary: '赵府验尸揭出无影丫鬟秋棠与画皮落桩印，菱花铜镜照见慢半拍影脚，回廊里大司命不动声色换到迎风侧挡寒。',
    content: ch4Raw,
  },
  {
    id: 'ch5',
    path: '/story/chapters/第05章_无面画师与错字铜钱.md',
    filename: '第05章_无面画师与错字铜钱.md',
    title: '第 05 章 · 无面画师与错字铜钱',
    category: '正文草稿',
    summary: '三更鬼市遇周三爷雨伞挡毒镖，许知微以“不赊”紫毫借脏墨反烧影祟，并捡得少一竖的古怪《太平通宝》。',
    content: ch5Raw,
  },
  {
    id: 'ch6',
    path: '/story/chapters/第06章_十六寒毒与近身渡气.md',
    filename: '第06章_十六寒毒与近身渡气.md',
    title: '第 06 章 · 十六寒毒与近身渡气',
    category: '正文草稿',
    summary: '归铺后十六寒毒猛烈发作，经脉受不住隔空渡灵，晏寒江被迫将人扣进怀里以体温渡气，首次贴近心防拉扯。',
    content: ch6Raw,
  },
  {
    id: 'tracker-foreshadow',
    path: '/story/tracker/01_伏笔追踪总表.md',
    filename: '01_伏笔追踪总表.md',
    title: '伏笔追踪总表（F-01 至 F-10）',
    category: '记忆与追踪',
    summary: 'Foreshadowing Ledger：记录每条伏笔埋设章回、预期回收区间与防泄底剧透红线。',
    content: trackerForeshadowRaw,
  },
  {
    id: 'tracker-state',
    path: '/story/tracker/02_角色状态与POV边界矩阵.md',
    filename: '02_角色状态与POV边界矩阵.md',
    title: '角色运行态与 POV 知识边界矩阵',
    category: '记忆与追踪',
    summary: '实时锁定每位角色所在位置、身心伤势、随身道具与当前“已知/未知”认知边界。',
    content: trackerStateRaw,
  },
  {
    id: 'tracker-rolling',
    path: '/story/tracker/03_滚动摘要与章节质检记录.md',
    filename: '03_滚动摘要与章节质检记录.md',
    title: '滚动摘要压缩与衔接锚点树',
    category: '记忆与追踪',
    summary: '金字塔上下文压缩记录：逐章提炼时间锚点、状态增量（Delta）与下一轮衔接重点。',
    content: trackerRollingRaw,
  },
];
