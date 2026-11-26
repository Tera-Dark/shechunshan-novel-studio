import skillGuideRaw from '../../story/00_去AI味与网文人味写作Skill.md?raw';
import auditMemoRaw from '../../story/06_创作铁律与动态复查备忘录.md?raw';
import premiseRaw from '../../story/01_核心梗概与三大融合设定.md?raw';
import worldRaw from '../../story/02_世界观与宗门秘辛.md?raw';
import charactersRaw from '../../story/03_角色档案_主角与群像.md?raw';
import outlineRaw from '../../story/04_五卷大纲与双线编年.md?raw';
import commercializationRaw from '../../story/05_千章连载商业化与读者钩子规划.md?raw';

import ch1Raw from '../../story/chapters/第01章_替死红灯与白衣客.md?raw';
import ch2Raw from '../../story/chapters/第02章_渡口冷茶与半分阵偏.md?raw';
import ch3Raw from '../../story/chapters/第03章_象牙扇与渡口旧账.md?raw';

import trackerForeshadowRaw from '../../story/tracker/01_伏笔追踪总表.md?raw';
import trackerStateRaw from '../../story/tracker/02_角色状态与POV边界矩阵.md?raw';
import trackerRollingRaw from '../../story/tracker/03_滚动摘要与章节质检记录.md?raw';
import wbCharterRaw from '../../story/writing-base/00_文风基准与去AI味宪章.md?raw';
import wbDictionaryRaw from '../../story/writing-base/01_设定与事实词典.md?raw';
import wbChecklistRaw from '../../story/writing-base/03_章节写作与深度去AI味检查清单.md?raw';
import wbHumanStyleRaw from '../../story/writing-base/04_高人味文风拆解参考.md?raw';
import wbSummaryRaw from '../../story/writing-base/99_章节摘要.md?raw';

import heIndexRaw from '../../story/human-examples/00_收纳目录与归类说明.txt?raw';
import heS1King1Raw from '../../story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/01_孤王忆起和美人的过往.txt?raw';
import heS1King2Raw from '../../story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/02_孤王竟也是个昏君做派.txt?raw';
import heS1King3Raw from '../../story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/03_孤王的美人病了.txt?raw';
import heS1King4Raw from '../../story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/04_孤王的爱妃病重了.txt?raw';
import heS1King5Raw from '../../story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/05_孤王要做名留千史的昏君了.txt?raw';
import heS1Consort1Raw from '../../story/human-examples/系列一_昏君与狸奴妖妃/02_妖妃视角/01_我是个妖妃.txt?raw';
import heS1Consort2Raw from '../../story/human-examples/系列一_昏君与狸奴妖妃/02_妖妃视角/02_我是祸国殃民的妖妃.txt?raw';
import heS2M1Raw from '../../story/human-examples/系列二_主君与稚雀/01_吾姬性柔，深得吾心.txt?raw';
import heS2M2Raw from '../../story/human-examples/系列二_主君与稚雀/02_君侯老矣.txt?raw';
import heS3S1Raw from '../../story/human-examples/系列三_仙侠师徒/01_我是被师尊捡回来的小徒弟.txt?raw';

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
};

export const STORY_FILES: StoryDocFile[] = [
  {
    id: 'audit',
    path: '/story/06_创作铁律与动态复查备忘录.md',
    filename: '06_创作铁律与动态复查备忘录.md',
    title: '创作铁律与动态复查备忘录',
    category: '铁律与文风',
    summary: '重构版创作铁律：400 章体量、每章 ≥3,000 纯汉字、卡兹克人味叙事红线与新第 1–3 章剧情账本。',
    content: auditMemoRaw,
  },
  {
    id: 'wb-charter',
    path: '/story/writing-base/00_文风基准与去AI味宪章.md',
    filename: '00_文风基准与去AI味宪章.md',
    title: '编写基地 · 文风基准与去 AI 味宪章',
    category: '铁律与文风',
    summary: '白描、留白、潜台词与自然人味虚构叙事基准，严禁翻案句、破折号、黑话与模板段式。',
    content: wbCharterRaw,
  },
  {
    id: 'wb-checklist',
    path: '/story/writing-base/03_章节写作与深度去AI味检查清单.md',
    filename: '03_章节写作与深度去AI味检查清单.md',
    title: '编写基地 · 单章四阶段去 AI 味检查清单',
    category: '铁律与文风',
    summary: '写前准备 → 创作硬约束 → 深度去 AI 味与脚本门禁 → 摘要落盘与质检复核。',
    content: wbChecklistRaw,
  },
  {
    id: 'wb-dictionary',
    path: '/story/writing-base/01_设定与事实词典.md',
    filename: '01_设定与事实词典.md',
    title: '编写基地 · 设定与事实词典（重构版）',
    category: '记忆与追踪',
    summary: '严禁现场编数：锁定白露河停云渡赊春堂硬数字、时间线、视觉锚点与 POV 知识边界。',
    content: wbDictionaryRaw,
  },
  {
    id: 'wb-summary',
    path: '/story/writing-base/99_章节摘要.md',
    filename: '99_章节摘要.md',
    title: '编写基地 · 后果驱动型章节摘要底本',
    category: '记忆与追踪',
    summary: '记录新第 1–3 章关键后果、人物已知/未知与未了事项，供后续章节精准续写。',
    content: wbSummaryRaw,
  },
  {
    id: 'skill',
    path: '/story/00_去AI味与网文人味写作Skill.md',
    filename: '00_去AI味与网文人味写作Skill.md',
    title: '去 AI 味与网文人味写作 Skill',
    category: '铁律与文风',
    summary: '真人视角叙事原则、困惑度与句长起伏控制、晋江 3000 字/章标准与人工“毛刺感”规范。',
    content: skillGuideRaw,
  },
  {
    id: 'premise',
    path: '/story/01_核心梗概与三大融合设定.md',
    filename: '01_核心梗概与三大融合设定.md',
    title: '核心梗概与挑剔向设计总纲',
    category: '大纲与规划',
    summary: '书名双层意象、恶犬骑士 × 驯犬执棋人、四重锁脉金链机制与江湖仙侠风骨融合法则。',
    content: premiseRaw,
  },
  {
    id: 'outline',
    path: '/story/04_五卷大纲与双线编年.md',
    filename: '04_五卷大纲与双线编年.md',
    title: '八卷 400 章全新重构总纲（1–400 章）',
    category: '大纲与规划',
    summary: '全新重构 8 大卷详纲：白露渡诡船起手至春山赊茶录收官，每卷三段紧凑诡案绑定双脉消长。',
    content: outlineRaw,
  },
  {
    id: 'commercialization',
    path: '/story/05_千章连载商业化与读者钩子规划.md',
    filename: '05_千章连载商业化与读者钩子规划.md',
    title: '400 章连载节奏蓝图与卷一细纲（1–30 章）',
    category: '大纲与规划',
    summary: '开篇十秒入局动态节奏模型，及全新第一卷《白露渡诡船》前 30 章逐章细纲。',
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
    summary: '完整保留双主角与核心群像档案，同步更新卷一白露河停云渡单元配角卡（林大、林穗、水鬼牙人）。',
    content: charactersRaw,
  },
  {
    id: 'ch1',
    path: '/story/chapters/第01章_替死红灯与白衣客.md',
    filename: '第01章_替死红灯与白衣客.md',
    title: '第 01 章 · 替死红灯与白衣客',
    category: '正文草稿',
    summary: '4,703 纯汉字 · 全新重构开篇：三月十五暴雨夜白露河红灯喜船索命，楚越截船破灯遇谢峥压灯扣链。',
    content: ch1Raw,
  },
  {
    id: 'ch2',
    path: '/story/chapters/第02章_渡口冷茶与半分阵偏.md',
    filename: '第02章_渡口冷茶与半分阵偏.md',
    title: '第 02 章 · 渡口冷茶与半分阵偏',
    category: '正文草稿',
    summary: '5,893 纯汉字 · 赊春堂查出金链外偏半分暗抽三成雷煞、东厢桌裂焦血气，王猛送鳜鱼认表弟，谢峥熬姜汤切脉点破十六寒毒。',
    content: ch2Raw,
  },
  {
    id: 'ch3',
    path: '/story/chapters/第03章_象牙扇与渡口旧账.md',
    filename: '第03章_象牙扇与渡口旧账.md',
    title: '第 03 章 · 象牙扇与渡口旧账',
    category: '正文草稿',
    summary: '5,060 纯汉字 · 陆砚寒携《清白赎罪契》登门羞辱反遭折扇斥退，周三爷赠伞点出青泥渡盐仓老樟木与错字铜钱，共伞赴查。',
    content: ch3Raw,
  },
  {
    id: 'wb-human-style',
    path: '/story/writing-base/04_高人味文风拆解参考.md',
    filename: '04_高人味文风拆解参考.md',
    title: '高人味文风拆解与实操参考',
    category: '铁律与文风',
    summary: '纯人工笔迹写作法：松弛说书人旁白、接地气生活流对话与 AI 套组排查。',
    content: wbHumanStyleRaw,
  },
  {
    id: 'he-index',
    path: '/story/human-examples/00_收纳目录与归类说明.txt',
    filename: '00_收纳目录与归类说明.txt',
    title: '人文写作示例合集 · 总目录与归类说明',
    category: '铁律与文风',
    summary: '三大系列共 10 篇独立拆分的纯人工高人味写作示例索引（昏君与狸奴妖妃、主君与稚雀、仙侠师徒）。',
    content: heIndexRaw,
  },
  {
    id: 'he-s1-king-01',
    path: '/story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/01_孤王忆起和美人的过往.txt',
    filename: '01_孤王忆起和美人的过往.txt',
    title: '例文参考 · 系列一（孤王视角 01）孤王忆起和美人的过往',
    category: '铁律与文风',
    summary: '昏君与狸奴妖妃系列：凯旋雪地初遇狸奴，带回营帐许诺打天下。',
    content: heS1King1Raw,
  },
  {
    id: 'he-s1-king-02',
    path: '/story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/02_孤王竟也是个昏君做派.txt',
    filename: '02_孤王竟也是个昏君做派.txt',
    title: '例文参考 · 系列一（孤王视角 02）孤王竟也是个昏君做派',
    category: '铁律与文风',
    summary: '昏君与狸奴妖妃系列：宠幸狸奴美人，持剑为美人诛杀进谏大臣。',
    content: heS1King2Raw,
  },
  {
    id: 'he-s1-king-03',
    path: '/story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/03_孤王的美人病了.txt',
    filename: '03_孤王的美人病了.txt',
    title: '例文参考 · 系列一（孤王视角 03）孤王的美人病了',
    category: '铁律与文风',
    summary: '昏君与狸奴妖妃系列：美人染病戚戚垂泪，孤王持剑为取大臣心。',
    content: heS1King3Raw,
  },
  {
    id: 'he-s1-king-04',
    path: '/story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/04_孤王的爱妃病重了.txt',
    filename: '04_孤王的爱妃病重了.txt',
    title: '例文参考 · 系列一（孤王视角 04）孤王的爱妃病重了',
    category: '铁律与文风',
    summary: '昏君与狸奴妖妃系列：爱妃病重惧色衰，巫祝入殿行祭祈之礼。',
    content: heS1King4Raw,
  },
  {
    id: 'he-s1-king-05',
    path: '/story/human-examples/系列一_昏君与狸奴妖妃/01_孤王视角/05_孤王要做名留千史的昏君了.txt',
    filename: '05_孤王要做名留千史的昏君了.txt',
    title: '例文参考 · 系列一（孤王视角 05）孤王要做名留千史的昏君了',
    category: '铁律与文风',
    summary: '昏君与狸奴妖妃系列：美人气息危殆，孤王不顾鬼神剜心炙羹。',
    content: heS1King5Raw,
  },
  {
    id: 'he-s1-consort-01',
    path: '/story/human-examples/系列一_昏君与狸奴妖妃/02_妖妃视角/01_我是个妖妃.txt',
    filename: '01_我是个妖妃.txt',
    title: '例文参考 · 系列一（妖妃视角 01）我是个妖妃',
    category: '铁律与文风',
    summary: '昏君与狸奴妖妃系列：试探求赐鸩酒，大王挥剑护短共枕眠。',
    content: heS1Consort1Raw,
  },
  {
    id: 'he-s1-consort-02',
    path: '/story/human-examples/系列一_昏君与狸奴妖妃/02_妖妃视角/02_我是祸国殃民的妖妃.txt',
    filename: '02_我是祸国殃民的妖妃.txt',
    title: '例文参考 · 系列一（妖妃视角 02）我是祸国殃民的妖妃',
    category: '铁律与文风',
    summary: '昏君与狸奴妖妃系列：病重蜷于狐裘，大王衔血哺渡、歌谣哄睡。',
    content: heS1Consort2Raw,
  },
  {
    id: 'he-s2-01',
    path: '/story/human-examples/系列二_主君与稚雀/01_吾姬性柔，深得吾心.txt',
    filename: '01_吾姬性柔，深得吾心.txt',
    title: '例文参考 · 系列二（主君与稚雀 01）吾姬性柔，深得吾心',
    category: '铁律与文风',
    summary: '主君与稚雀系列：稚雀惧枯骨虫窟，向主君求长生不老金丹。',
    content: heS2M1Raw,
  },
  {
    id: 'he-s2-02',
    path: '/story/human-examples/系列二_主君与稚雀/02_君侯老矣.txt',
    filename: '02_君侯老矣.txt',
    title: '例文参考 · 系列二（主君与稚雀 02）君侯老矣',
    category: '铁律与文风',
    summary: '主君与稚雀系列：君侯垂老而稚雀鲜活，笑问“尚能饭否”。',
    content: heS2M2Raw,
  },
  {
    id: 'he-s3-01',
    path: '/story/human-examples/系列三_仙侠师徒/01_我是被师尊捡回来的小徒弟.txt',
    filename: '01_我是被师尊捡回来的小徒弟.txt',
    title: '例文参考 · 系列三（仙侠师徒 01）我是被师尊捡回来的小徒弟',
    category: '铁律与文风',
    summary: '仙侠师徒系列：仙尊故去三年后魔尊逼婚，金铃震响引师尊弑生剑横空护徒。',
    content: heS3S1Raw,
  },
  {
    id: 'tracker-foreshadow',
    path: '/story/tracker/01_伏笔追踪总表.md',
    filename: '01_伏笔追踪总表.md',
    title: '伏笔追踪总表（重构版 F-01 至 F-08）',
    category: '记忆与追踪',
    summary: '记录新第 01–03 章全部伏笔回收窗口与防泄底剧透红线。',
    content: trackerForeshadowRaw,
  },
  {
    id: 'tracker-state',
    path: '/story/tracker/02_角色状态与POV边界矩阵.md',
    filename: '02_角色状态与POV边界矩阵.md',
    title: '角色运行态与 POV 知识边界矩阵',
    category: '记忆与追踪',
    summary: '截至新第 03 章末实时锁定每位角色位置、伤势、随身道具与当前“已知/未知”认知边界。',
    content: trackerStateRaw,
  },
  {
    id: 'tracker-rolling',
    path: '/story/tracker/03_滚动摘要与章节质检记录.md',
    filename: '03_滚动摘要与章节质检记录.md',
    title: '滚动摘要压缩与章节质检记录（1–3 章）',
    category: '记忆与追踪',
    summary: '逐章记录新第 1–3 章纯汉字数、人味质检结果、状态增量（Delta）与章尾钩子。',
    content: trackerRollingRaw,
  },
];
