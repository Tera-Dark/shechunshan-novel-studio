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
import ch7Raw from '../../story/chapters/第07章_三丈之外的血腥线.md?raw';
import ch8Raw from '../../story/chapters/第08章_赵府地窖里的生辰八字.md?raw';
import ch9Raw from '../../story/chapters/第09章_王屠户的旧刀伤.md?raw';
import ch10Raw from '../../story/chapters/第10章_月圆前的试探交易.md?raw';
import ch11Raw from '../../story/chapters/第11章_勘验玉符困局.md?raw';
import ch12Raw from '../../story/chapters/第12章_暗厢贴耳与反杀局.md?raw';
import ch13Raw from '../../story/chapters/第13章_活契现行与赵府对质.md?raw';
import ch14Raw from '../../story/chapters/第14章_画押出鞘，死契首消.md?raw';
import ch15Raw from '../../story/chapters/第15章_残印玉牌与掩袖遮眼.md?raw';
import ch16Raw from '../../story/chapters/第16章_东屋药罐与半寸旧伤.md?raw';
import ch17Raw from '../../story/chapters/第17章_城西旧窑与无名药渣.md?raw';
import ch18Raw from '../../story/chapters/第18章_盲翁修伞与雨巷旧桩.md?raw';
import ch19Raw from '../../story/chapters/第19章_废窑暗探与冷铁炉灰.md?raw';
import ch20Raw from '../../story/chapters/第20章_药丸异香与三丈灯火.md?raw';

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
  ch7: parseMarkdownChapter(ch7Raw),
  ch8: parseMarkdownChapter(ch8Raw),
  ch9: parseMarkdownChapter(ch9Raw),
  ch10: parseMarkdownChapter(ch10Raw),
  ch11: parseMarkdownChapter(ch11Raw),
  ch12: parseMarkdownChapter(ch12Raw),
  ch13: parseMarkdownChapter(ch13Raw),
  ch14: parseMarkdownChapter(ch14Raw),
  ch15: parseMarkdownChapter(ch15Raw),
  ch16: parseMarkdownChapter(ch16Raw),
  ch17: parseMarkdownChapter(ch17Raw),
  ch18: parseMarkdownChapter(ch18Raw),
  ch19: parseMarkdownChapter(ch19Raw),
  ch20: parseMarkdownChapter(ch20Raw),
};

export const STORY_FILES: StoryDocFile[] = [
  {
    id: 'audit',
    path: '/story/06_创作铁律与动态复查备忘录.md',
    filename: '06_创作铁律与动态复查备忘录.md',
    title: '创作铁律与动态复查备忘录',
    category: '铁律与文风',
    summary: '动态复查与防遗忘最高准则：晋江 3000 字铁律、文风配比、六大防穿帮技术桩与第 1–20 章剧情账本。',
    content: auditMemoRaw,
  },
  {
    id: 'skill',
    path: '/story/00_去AI味与网文人味写作Skill.md',
    filename: '00_去AI味与网文人味写作Skill.md',
    title: '去 AI 味与反朱雀检测写作 Skill',
    category: '铁律与文风',
    summary: '含腾讯朱雀三大检测特征（困惑度/突发性/局部指纹）、晋江 3000 字/章标准与人工“毛刺感”规范。',
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
    title: '千章连载节奏规划与卷一细纲',
    category: '大纲与规划',
    summary: '挑剔向读者的三大避坑指南、120 章循环模型，及第一卷前段逐章细纲（含智斗升级）。',
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
    title: '第 01 章 · 五花肉账单与避雷槐',
    category: '正文草稿',
    summary: '约 3900 字反朱雀精修：雨巷烟火开篇、避雷槐断雨与谢峥携《降凡印》登门扣链。',
    content: ch1Raw,
  },
  {
    id: 'ch2',
    path: '/story/chapters/第02章_十五寒毒与渡灵夜.md',
    filename: '第02章_十五寒毒与渡灵夜.md',
    title: '第 02 章 · 十五夜雷与东屋焦香（朱雀过检原稿）',
    category: '正文草稿',
    summary: '原样保留的腾讯朱雀 100% 人工特征过检基准章：十五雷煞分流三成与拂晓滚烫姜汤。',
    content: ch2Raw,
  },
  {
    id: 'ch3',
    path: '/story/chapters/第03章_画皮阴契与故人来.md',
    filename: '第03章_画皮阴契与故人来.md',
    title: '第 03 章 · 画皮阴契与故人来',
    category: '正文草稿',
    summary: '约 3300 字反朱雀扩修：陆砚寒上门羞辱衬出楚越昔日荣光，谢峥亮链斥退切入赵府案。',
    content: ch3Raw,
  },
  {
    id: 'ch4',
    path: '/story/chapters/第04章_一文钱买来的城南怪事.md',
    filename: '第04章_一文钱买来的城南怪事.md',
    title: '第 04 章 · 一文钱买来的城南怪事',
    category: '正文草稿',
    summary: '约 3060 字反朱雀扩修：赵府验尸揭出秋棠无影尸与妆镜影滞，回廊里大司命换位挡风。',
    content: ch4Raw,
  },
  {
    id: 'ch5',
    path: '/story/chapters/第05章_无面画师与错字铜钱.md',
    filename: '第05章_无面画师与错字铜钱.md',
    title: '第 05 章 · 无面画师与错字铜钱',
    category: '正文草稿',
    summary: '约 3250 字反朱雀扩修：三更鬼市周三爷撑伞挡镖，紫毫借脏墨反烧影祟，拾得缺竖错字钱。',
    content: ch5Raw,
  },
  {
    id: 'ch6',
    path: '/story/chapters/第06章_十六寒毒与近身渡气.md',
    filename: '第06章_十六寒毒与近身渡气.md',
    title: '第 06 章 · 十六寒毒与近身渡气',
    category: '正文草稿',
    summary: '约 2810 字反朱雀扩修：十六寒毒猛爆被迫怀中渡灵，首嗅大司命衣襟深处陈年苦药味。',
    content: ch6Raw,
  },
  {
    id: 'ch7',
    path: '/story/chapters/第07章_三丈之外的血腥线.md',
    filename: '第07章_三丈之外的血腥线.md',
    title: '第 07 章 · 三丈之外的血腥线',
    category: '正文草稿',
    summary: '受故意踩过三丈死线试探链纹惩戒，攻破土墙拍散火符拎回身侧，搜得陆氏焚卷密笺。',
    content: ch7Raw,
  },
  {
    id: 'ch8',
    path: '/story/chapters/第08章_赵府地窖里的生辰八字.md',
    filename: '第08章_赵府地窖里的生辰八字.md',
    title: '第 08 章 · 赵府地窖里的生辰八字',
    category: '正文草稿',
    summary: '夜探地窖揭破亲父典卖女儿八字抵债真相；陆氏纵绿火灭口，攻以右臂挡梁护受抢出残页。',
    content: ch8Raw,
  },
  {
    id: 'ch9',
    path: '/story/chapters/第09章_王屠户的旧刀伤.md',
    filename: '第09章_王屠户的旧刀伤.md',
    title: '第 09 章 · 王屠户的旧刀伤',
    category: '正文草稿',
    summary: '借买排骨麻油试探街坊，看破甲等戍边营金疮止血散与李大娘稳手，坐实雨巷暗卫。',
    content: ch9Raw,
  },
  {
    id: 'ch10',
    path: '/story/chapters/第10章_月圆前的试探交易.md',
    filename: '第10章_月圆前的试探交易.md',
    title: '第 10 章 · 月圆前的试探交易',
    category: '正文草稿',
    summary: '受按住茶盏拿画押调侃立约“下回十六夜穿厚些”，大司命耳廓泛红应下并斟红糖姜枣茶。',
    content: ch10Raw,
  },
  {
    id: 'ch11',
    path: '/story/chapters/第11章_勘验玉符困局.md',
    filename: '第11章_勘验玉符困局.md',
    title: '第 11 章 · 勘验玉符困局',
    category: '正文草稿',
    summary: '周平持《勘验玉符》封锁太渊剑；受背出《三界契约律》第十九条“活契现行”立下赌约。',
    content: ch11Raw,
  },
  {
    id: 'ch12',
    path: '/story/chapters/第12章_暗厢贴耳与反杀局.md',
    filename: '第12章_暗厢贴耳与反杀局.md',
    title: '第 12 章 · 暗厢贴耳与反杀局',
    category: '正文草稿',
    summary: '三更夜袭鬼市画舫暗厢，盲雾中受贴耳低语、借同心链引一缕太渊剑意入紫毫破阵夺原契。',
    content: ch12Raw,
  },
  {
    id: 'ch13',
    path: '/story/chapters/第13章_活契现行与赵府对质.md',
    filename: '第13章_活契现行与赵府对质.md',
    title: '第 13 章 · 活契现行与赵府对质',
    category: '正文草稿',
    summary: '清晨赵府对质，赵明珠亲听父亲认罪，活契怨煞当众震碎《勘验玉符》，无面画师催血傀灭口。',
    content: ch13Raw,
  },
  {
    id: 'ch14',
    path: '/story/chapters/第14章_画押出鞘，死契首消.md',
    filename: '第14章_画押出鞘，死契首消.md',
    title: '第 14 章 · 画押出鞘，死契首消',
    category: '正文草稿',
    summary: '楚越朱砂画押定案，太渊剑合法出鞘斩血傀断阴契，替劫死契首消十道（365 → 355）。',
    content: ch14Raw,
  },
  {
    id: 'ch15',
    path: '/story/chapters/第15章_残印玉牌与掩袖遮眼.md',
    filename: '第15章_残印玉牌与掩袖遮眼.md',
    title: '第 15 章 · 残印玉牌与掩袖遮眼',
    category: '正文草稿',
    summary: '破土地庙围堵无面画师，夺得刻有幽潭枯棘的缺角冷石玉牌，攻斩杀前本能抬袖遮住受双眼。',
    content: ch15Raw,
  },
  {
    id: 'ch16',
    path: '/story/chapters/第16章_东屋药罐与半寸旧伤.md',
    filename: '第16章_东屋药罐与半寸旧伤.md',
    title: '第 16 章 · 东屋药罐与半寸旧伤',
    category: '正文草稿',
    summary: '东屋屏风翻倒露出雷公藤药罐；受卷开攻左袖见半寸雷灼旧伤，亲手敷玉露生肌膏立约。',
    content: ch16Raw,
  },
  {
    id: 'ch17',
    path: '/story/chapters/第17章_城西旧窑与无名药渣.md',
    filename: '第17章_城西旧窑与无名药渣.md',
    title: '第 17 章 · 城西旧窑与无名药渣',
    category: '正文草稿',
    summary: '码头苦力往城西旧窑拉柴后失忆青甲；受查出阴寒药虚脉、错字《太平通宝》与冷铁灰药渣。',
    content: ch17Raw,
  },
  {
    id: 'ch18',
    path: '/story/chapters/第18章_盲翁修伞与雨巷旧桩.md',
    filename: '第18章_盲翁修伞与雨巷旧桩.md',
    title: '第 18 章 · 盲翁修伞与雨巷旧桩',
    category: '正文草稿',
    summary: '周三爷点破“冷铁灰烧活松”与中州灰袍药商旧闻；雨中共伞点破雨巷退伍旧部渊源。',
    content: ch18Raw,
  },
  {
    id: 'ch19',
    path: '/story/chapters/第19章_废窑暗探与冷铁炉灰.md',
    filename: '第19章_废窑暗探与冷铁炉灰.md',
    title: '第 19 章 · 废窑暗探与冷铁炉灰',
    category: '正文草稿',
    summary: '雨夜潜探旧窑撞见《寒髓丸》青铜药炉与活人试药桩，攻连鞘剑死守，受引湿火炸雾夺证。',
    content: ch19Raw,
  },
  {
    id: 'ch20',
    path: '/story/chapters/第20章_药丸异香与三丈灯火.md',
    filename: '第20章_药丸异香与三丈灯火.md',
    title: '第 20 章 · 药丸异香与三丈灯火',
    category: '正文草稿',
    summary: '油灯下碾碎《寒髓丸》认出与攻身上旧药同源，受体贴收匣不逼问，共饮姜汤定下并肩之约。',
    content: ch20Raw,
  },
  {
    id: 'tracker-foreshadow',
    path: '/story/tracker/01_伏笔追踪总表.md',
    filename: '01_伏笔追踪总表.md',
    title: '伏笔追踪总表（F-01 至 F-11）',
    category: '记忆与追踪',
    summary: 'Foreshadowing Ledger：记录第 01–20 章全部伏笔回收进度与防泄底剧透红线。',
    content: trackerForeshadowRaw,
  },
  {
    id: 'tracker-state',
    path: '/story/tracker/02_角色状态与POV边界矩阵.md',
    filename: '02_角色状态与POV边界矩阵.md',
    title: '角色运行态与 POV 知识边界矩阵',
    category: '记忆与追踪',
    summary: '截至第 20 章末实时锁定每位角色位置、身心伤势、随身道具与当前“已知/未知”认知边界。',
    content: trackerStateRaw,
  },
  {
    id: 'tracker-rolling',
    path: '/story/tracker/03_滚动摘要与章节质检记录.md',
    filename: '03_滚动摘要与章节质检记录.md',
    title: '滚动摘要压缩与衔接锚点树（1–20 章）',
    category: '记忆与追踪',
    summary: '金字塔上下文压缩记录：逐章提炼 1–20 章时间锚点、状态增量（Delta）与衔接重点。',
    content: trackerRollingRaw,
  },
];
