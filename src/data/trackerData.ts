export interface ForeshadowThread {
  id: string;
  clue: string;
  plantedAt: string;
  targetWindow: string;
  status:
    | '推进中'
    | '待推进'
    | '已露端倪'
    | '已锁定暗格'
    | '刚埋下'
    | '未开启'
    | '待触发'
    | '已回收'
    | '已部分回收'
    | '核心活跃';
  constraint: string;
}

export interface CharacterRuntimeState {
  name: string;
  location: string;
  condition: string;
  inventory: string;
  relationshipState: string;
  knows: string[];
  unknownToCharacter: string[];
}

export interface RollingChapterSummary {
  chapter: string;
  title: string;
  timeAnchor: string;
  location: string;
  pov: string;
  digest: string;
  stateDelta: string;
  hook: string;
}

export const FORESHADOW_THREADS: ForeshadowThread[] = [
  {
    id: 'F-01',
    clue: '同心锁命链收口外偏半分，暗藏导气缝替楚越分流三成雷煞',
    plantedAt: '第 01、02 章',
    targetWindow: '第 07 章试线 / 第 16 章雷伤敷药 / 卷六归墟',
    status: '推进中',
    constraint: '楚越已察觉外偏与分流三成，但尚不知谢峥耗时五年以心血重铸四重锁脉的完整内情',
  },
  {
    id: 'F-02',
    clue: '东厢松木桌按裂脆响、袖底焦糊血气与垂低半寸的左袖',
    plantedAt: '第 02 章',
    targetWindow: '第 16 章东屋药罐与半寸雷伤敷药',
    status: '推进中',
    constraint: '楚越已嗅出焦血味但暂未当场撕破，留待第 16 章抓包敷药升温',
  },
  {
    id: 'F-03',
    clue: '停云渡街坊异样：王猛直刀月牙茧、李大娘稳担八十斤、周三爷递伞透盐仓情报',
    plantedAt: '第 02、03 章',
    targetWindow: '第 09 章试探坐实 / 第 18 章攻明牌退伍旧部',
    status: '已露端倪',
    constraint: '严禁提前旁白点破“甲等戍边营暗卫”，须由楚越逐步观察拼图',
  },
  {
    id: 'F-04',
    clue: '谢峥精准报出赊春堂后檐至河边茅棚“两丈七尺”与知晓十六夜寒毒',
    plantedAt: '第 02 章',
    targetWindow: '第 06 章初渡寒毒 / 卷六归墟掀牌',
    status: '核心活跃',
    constraint: '卷六前严禁点破十六寒毒源于 480 年前代扛太渊九死劫',
  },
  {
    id: 'F-05',
    clue: '白露河红灯喜船《借寿换骨契》、三日后回门夜与青泥渡废官窑盐仓老樟木',
    plantedAt: '第 01、03 章',
    targetWindow: '第 04–14 章白露渡首案结案',
    status: '核心活跃',
    constraint: '第 8 章夜探盐仓前严禁剧透换骨池幕后买家',
  },
  {
    id: 'F-06',
    clue: '灰布长衫牙人付茶钱所拍“少了半竖”的错字《太平通宝》铜钱',
    plantedAt: '第 03 章',
    targetWindow: '第 05 章水底暗市缴获 / 卷一盐仓药桩 / 卷六归墟',
    status: '刚埋下',
    constraint: '卷六前正文严禁提前出现“万劫潭”“麦饼”等核心词',
  },
  {
    id: 'F-07',
    clue: '陆砚寒退场狠话：“三天后回门夜，连剑都拔不出来拿什么救人”',
    plantedAt: '第 03 章',
    targetWindow: '第 11–13 章《勘验玉符》锁剑智斗',
    status: '待触发',
    constraint: '伏笔中州陆氏借司命台程序卡死太渊剑出鞘权',
  },
  {
    id: 'F-08',
    clue: '楚越日后沿途暗缝进谢峥外袍内衬的九张心血护心符',
    plantedAt: '待卷一后段至卷三陆续暗缝',
    targetWindow: '卷三第 147–165 章万剑血阵风雪夜',
    status: '未开启',
    constraint: '绝非五年前提前缝好，必须随并肩同行逐步添齐',
  },
];

export const CHARACTER_STATES: CharacterRuntimeState[] = [
  {
    name: '楚越',
    location: '停云渡青石街赊春堂门前，正与谢峥共撑黑竹油纸伞前往上游青泥渡',
    condition: '替劫死契 365/365；灵脉“死灰”；因昨夜三成雷煞被暗分流且清晨饮下红糖姜汤，气色较往常十五次日好转，但今晚十六夜寒毒迫在眉睫',
    inventory: '玄墨暗云纹旧袍、“不赊”紫毫笔、两枚旧铜钱（《太虚定命册》已于第 1 章抛还谢峥）',
    relationshipState: '敏锐察觉锁链外偏、焦血味与陆氏门前极度护短，既戒备又生出刨根问底的试探兴致',
    knows: [
      '谢峥领《降凡印》压制修为至金丹巅峰、太渊剑须天机官画押方能出鞘',
      '左腕同心链收口外偏半分，昨夜暗抽三成雷煞往东厢，且谢峥袖底藏着焦糊与血腥气',
      '王猛有军中直刀月牙茧、李大娘脚下极稳、周三爷通晓上游盐仓樟木料与错字铜钱',
      '林穗所签《借寿换骨契》三日后迎回门夜，线索指向青泥渡废官窑盐仓与灰布牙人',
    ],
    unknownToCharacter: [
      '谢峥＝五百年前万劫潭底啃麦饼的无名试药少年',
      '十六夜寒毒源自四百八十年前自己暗中代扛太渊九死劫',
      '谢峥五年前私改《死刑改判书》与亲调退伍旧部守停云渡的完整布局',
    ],
  },
  {
    name: '谢峥',
    location: '停云渡青石街，右手撑黑竹油纸伞往楚越头顶偏过大半尺，右肩半落细雨中',
    condition: '受《降凡印》压制修为（金丹巅峰—元婴初阶）；昨夜硬扛三成雷煞翻倍反噬致左腕隐伤，藏于垂低半寸的左袖之中',
    inventory: '白鞘无穗太渊剑、收回擦净的《太虚定命册》、初重同心链另一端、周三爷所赠黑竹桐油大伞',
    relationshipState: '冷面稳守三丈界线，默默认下“远房表弟”称呼并替受挡掉陆砚寒，暗中戒备今晚十六寒毒',
    knows: [
      '楚越已察觉锁链外偏、焦血味与街坊异样，但尚未摸透自己五年布局的真正动机',
      '陆砚寒折扇受辱必生报复，极可能在三日后回门夜前借司命台律令设卡',
    ],
    unknownToCharacter: [
      '青泥渡废官窑盐仓背后牵扯的南荒活人试药桩与中州灰袍药商具体落脚点',
      '陆砚寒将于何时何处放出《勘验玉符》锁剑',
    ],
  },
  {
    name: '陆砚寒 / 阿财 / 停云渡街坊',
    location: '停云渡青石街 / 赊春堂灶房 / 渡口鱼摊菜担与修伞棚',
    condition: '陆砚寒象牙折扇被折断半寸狼狈撤离；阿财留守赊春堂照看鳜鱼与嫩油菜；林大父女暂安于河滩住处',
    inventory: '缺角象牙折扇与《清白赎罪契》（陆砚寒）；两条大鳜鱼与半碗剩姜汤（阿财）；青泥渡盐仓与错字铜钱线索',
    relationshipState: '陆氏与楚谢彻底撕破脸皮，停云渡街坊暗中配合把表弟身份坐实并递出上游盐仓线索',
    knows: [
      '陆砚寒已确认谢峥亲自下凡锁腕并护着楚越，正筹划借《勘验玉符》卡死太渊剑',
      '周三爷已认出红灯喜船老樟木出自青泥渡盐仓，且牙人付过缺竖《太平通宝》',
    ],
    unknownToCharacter: [
      '阿财尚不知王猛、李大娘、周三爷三人其实是甲等退伍旧部',
      '陆砚寒尚不知停云渡街坊均为谢峥五年前暗中安置',
    ],
  },
];

export const ROLLING_SUMMARIES: RollingChapterSummary[] = [
  {
    chapter: '第 01 章',
    title: '替死红灯与白衣客',
    timeAnchor: '三月十五暴雨夜',
    location: '白露河停云渡泥滩',
    pov: '楚越',
    digest: '老船工林大跪求救签下《借寿换骨契》的独女林穗，楚越开价二十文加干河虾揣紫毫下河截红灯喜船，雷煞撞脉之际谢峥踏雨压灯扣下初重同心链并收回《太虚定命册》。',
    stateDelta: '扣下初重金链（三丈约束）；立定先账后刑之约；受滑倒被扶时察觉锁链漏出古怪凉意。',
    hook: '两人冒雨押着残灯线索返回停云渡“赊春堂”破水阁。',
  },
  {
    chapter: '第 02 章',
    title: '渡口冷茶与半分阵偏',
    timeAnchor: '三月十五子时至十六清晨',
    location: '停云渡赊春堂水阁',
    pov: '楚越',
    digest: '阿财挥秃扫帚护主；受试探茅棚距离被精准报出两丈七尺，灯下查出金链外偏半分；子时雷煞暗抽三成致东厢桌裂溢焦血气；清晨王猛送鳜鱼认表弟，谢峥煮姜汤切脉预警今晚十六寒毒。',
    stateDelta: '坐实锁链私改分流与东厢暗伤；点破今晚十六夜寒毒危机；王猛露直刀月牙茧。',
    hook: '刚咽下滚烫姜汤，街口已传来官轿与象牙折扇声。',
  },
  {
    chapter: '第 03 章',
    title: '象牙扇与渡口旧账',
    timeAnchor: '三月十六上午',
    location: '停云渡青石街赊春堂门前',
    pov: '楚越',
    digest: '李大娘塞油菜认表弟；陆砚寒乘四抬软轿携《清白赎罪契》羞辱被楚越踩痛榜眼旧疮，抬扇逼近遭谢峥徒手折断扇尖亮链斥退；周三爷赠黑竹大伞透出青泥渡废官窑盐仓老樟木与缺竖错字《太平通宝》。',
    stateDelta: '陆砚寒放下三日后回门夜狠话撤离；锁定青泥渡盐仓与错字铜钱线索；共撑一伞入雨。',
    hook: '楚越直问五年改了什么主意，谢峥偏伞罩住他邀赴青泥渡查船。',
  },
];
