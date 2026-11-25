export interface ForeshadowThread {
  id: string;
  clue: string;
  plantedAt: string;
  targetWindow: string;
  status: '推进中' | '待推进' | '已露端倪' | '已锁定暗格' | '刚埋下' | '未开启' | '待触发';
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
    clue: '王屠户大拇指内侧月牙刀茧、半夜补瓦的军伍做派',
    plantedAt: '第 01 章（及背景）',
    targetWindow: '第 09 章试探刀伤 / 第 36–65 章废窑案',
    status: '待推进',
    constraint: '第 09 章闻出甲等戍边营止血散，卷一中段坐实暗卫身份',
  },
  {
    id: 'F-02',
    clue: '同心锁命链阵纹被私改，暗中向外分流三成十五雷劲',
    plantedAt: '第 01–02 章',
    targetWindow: '卷三剑冢 / 卷六归墟镜渊',
    status: '推进中',
    constraint: '受已察觉流向异常，但尚不知攻耗费五年心血重铸锁链',
  },
  {
    id: 'F-03',
    clue: '晏寒江左袖洗不净的焦糊血腥气与十五夜东屋闷响',
    plantedAt: '第 02 章',
    targetWindow: '第 07 章药罐毒血 / 卷三揭破',
    status: '待推进',
    constraint: '攻替受硬扛三成雷煞所致，维持克制遮掩直至第 07 章煎药被抓包',
  },
  {
    id: 'F-04',
    clue: '赵府亡婢秋棠无影暴毙、朱砂落桩印与赵明珠镜影滞后',
    plantedAt: '第 03–04 章',
    targetWindow: '第 08–15 章（赵府案结案）',
    status: '推进中',
    constraint: '第 08 章地窖前严禁直白剧透“亲父赵元德拿女儿八字抵债”',
  },
  {
    id: 'F-05',
    clue: '街尾修伞盲老头周三爷鬼市“手滑”撑黑漆油纸伞挡毒镖',
    plantedAt: '第 05 章',
    targetWindow: '第 36–65 章 / 卷一收网',
    status: '已露端倪',
    constraint: '仅露一手“手稳”，暂不揭穿司命台斥候旧部底细',
  },
  {
    id: 'F-06',
    clue: '背面“平”字少一竖的残笔错字《太平通宝》，令晏寒江呼吸微顿',
    plantedAt: '第 05 章',
    targetWindow: '第 13–15 章残印 / 第 36–65 章废窑试药',
    status: '已锁定暗格',
    constraint: '连着万劫潭旧试药残党暗桩；第 13–15 章呼应旧印玉牌',
  },
  {
    id: 'F-07',
    clue: '晏寒江怀中除焦糊药味外，还渗着陈年苦涩草药陈香',
    plantedAt: '第 06 章',
    targetWindow: '卷六归墟镜渊',
    status: '刚埋下',
    constraint: '万劫潭试药少年远线伏笔，卷六前绝不剧透',
  },
  {
    id: 'F-08',
    clue: '十六夜九幽寒毒发作需司命纯阳体温渡灵（独立于十五雷煞）',
    plantedAt: '第 02、06 章',
    targetWindow: '卷二二重渡阳 / 卷六归墟',
    status: '推进中',
    constraint: '卷六前绝不点破源于 480 年前代扛太渊九死劫',
  },
  {
    id: 'F-09',
    clue: '九张心血护心符（卷一中后期至卷三途中陆续暗缝入外袍）',
    plantedAt: '待第 20–280 章陆续暗缝',
    targetWindow: '卷三第 351–400 章雪原剑冢',
    status: '未开启',
    constraint: '绝非五年前提前缝好，必须随同行推进暗中添齐',
  },
  {
    id: 'F-10',
    clue: '陆沉璧借司命台勘验玉符卡死执法权，并派暗桩焚毁地窖卷宗',
    plantedAt: '第 08–12 章触发',
    targetWindow: '第 11–15 章赵府收网',
    status: '待触发',
    constraint: '避免与第 03 章撞型，改走阴湿权谋智斗与暗厢贴耳反杀',
  },
];

export const CHARACTER_STATES: CharacterRuntimeState[] = [
  {
    name: '许知微',
    location: '南荒雨巷赊命小铺堂屋（被揽在怀中渡气）',
    condition: '灵脉死灰期；刚经历十五雷煞与十六夜寒毒反扑，寒毒暂压、体虚发困',
    inventory: '素青旧狐裘、“不赊”紫毫、圆边旧铜钱、《太虚定命册》、抽屉暗格内缺竖《太平通宝》',
    relationshipState: '戒备未消但身体本能贪恋救命暖意，已开口反撩大司命怀里像炭盆',
    knows: [
      '同心链阵纹被人私改，暗中分流三成雷劲',
      '晏寒江袖底有焦糊血腥气与陈年草药苦味',
      '赵府亡婢中画皮落桩印，赵明珠镜影滞后，赵元德护账房心虚',
      '周三爷手稳得不像普通瞎老汉；无面画师遗落错字《太平通宝》',
    ],
    unknownToCharacter: [
      '晏寒江＝五百年前万劫潭啃硬麦饼的小狼',
      '十六寒毒源于480年前自己代扛太渊九死劫',
      '整条巷子街坊均为晏寒江亲调的甲等戍边营暗卫',
    ],
  },
  {
    name: '晏寒江',
    location: '南荒雨巷赊命小铺堂屋',
    condition: '受《降凡印》压制修为（金丹—元婴初阶）；左腕掩着代扛三成雷煞的焦伤；心跳略快半拍',
    inventory: '天律剑“太渊”、雪白单衫、初重同心链另一端（刚随体温暗收半寸）',
    relationshipState: '首次撤去隔空渡灵距离将人紧扣怀中护心，表面克制只吐三字“别说话”',
    knows: [
      '许知微无灵脉却能用“不赊”紫毫借脏墨反烧影祟',
      '缺竖《太平通宝》的铸造路数（故意瞒称不曾见过）',
      '陆沉璧在背后觊觎许知微且与赵府案暗有勾连',
    ],
    unknownToCharacter: [
      '赵府地窖深处具体藏着谁的生辰八字与陆氏焚卷暗桩人手',
      '无面画师在南荒城外暗设的活人试药桩点位',
    ],
  },
  {
    name: '陆沉璧 / 赵府 / 暗卫街坊',
    location: '城南赵府 & 南荒雨巷各自据点',
    condition: '陆沉璧被斥退后酝酿借“勘验玉符”卡权；赵元德惊慌未定随时可能毁证',
    inventory: '陆氏香火功德牌；赵府菱花铜镜与地窖账册；周三爷黑漆油纸伞、王猛金疮止血散',
    relationshipState: '赵府正处风暴中心；王猛与周三爷隐于暗处静待第 07–09 章推进',
    knows: [
      '陆沉璧知赵府牵扯画皮阴契且有人命案',
      '赵元德已知主角团看破女儿镜中异状',
    ],
    unknownToCharacter: [
      '赵元德不知许知微已通过鬼市追踪到朱砂桃胶来源',
      '陆沉璧尚不知晏寒江早将南荒暗卫全数替换',
    ],
  },
];

export const ROLLING_SUMMARIES: RollingChapterSummary[] = [
  {
    chapter: '第 01 章',
    title: '雨巷算官与避雷槐',
    timeAnchor: '三月十五午后（阴雨）',
    location: '南荒雨巷赊命小铺',
    pov: '许知微',
    digest: '借王屠户送肉补瓦、阿财泼茶立住雨巷市井底色；雷劈老槐，晏寒江携《降凡印》登门交代五年前替劫死契旧事，落链入住东屋并收净《太虚定命册》。',
    stateDelta: '许知微被扣初重金链（三丈约束）；晏寒江入住东屋。',
    hook: '阿财纳闷大司命擦书手稳不像抓犯人，许知微点排骨淡笑留白。',
  },
  {
    chapter: '第 02 章',
    title: '十五夜雷与东屋焦香',
    timeAnchor: '十五子时至十六拂晓',
    location: '赊命铺西屋 / 堂屋',
    pov: '许知微',
    digest: '子时雷煞反噬，金链暗分流三成；东屋传闷响与焦糊血腥气。拂晓晏寒江端热姜汤探脉，借“先账后刑”迫受去城南查案。',
    stateDelta: '受察觉金链分流与袖口焦糊血腥味；点明今晚十六寒毒危机。',
    hook: '许知微咽下姜汤起身，赴城南会一会昨晚死人的赵府。',
  },
  {
    chapter: '第 03 章',
    title: '故人折扇与未消契',
    timeAnchor: '十六日上午',
    location: '赊命铺院门',
    pov: '许知微',
    digest: '陆沉璧携“清白赎罪契”羞辱并欲挑衣袖，彻底带出许知微昔日魁首风光；晏寒江冷面亮链斥退陆沉璧，甩出赵府呈文带受查案。',
    stateDelta: '宿敌陆沉璧退场并抛出城南画皮死讯；关系转为带疑试探。',
    hook: '受直问“五年改了什么主意”，攻答“还清一半再来问”。',
  },
  {
    chapter: '第 04 章',
    title: '城南无影尸与妆镜偏',
    timeAnchor: '十六日午后',
    location: '城南赵府',
    pov: '许知微',
    digest: '偏厢验亡婢秋棠无影尸身与朱砂落桩印；回廊里晏寒江自然换到背风侧挡寒；菱花铜镜照见赵明珠影脚滞后半拍，赵元德腿软护账房。',
    stateDelta: '锁定画皮阴契作案手法与朱砂桃胶气味；确定赵明珠中契。',
    hook: '相约天黑后往三更鬼市走一遭。',
  },
  {
    chapter: '第 05 章',
    title: '无面画师与错字铜钱',
    timeAnchor: '十六日三更过后',
    location: '南荒三更鬼市',
    pov: '许知微',
    digest: '入鬼市遇周三爷指路“朱砂桃胶”；阿财送蓑衣遇无面画师放影祟突袭，许知微以“不赊”紫毫借脏墨破阵烧祟，周三爷“手滑”撑伞挡掉毒镖。',
    stateDelta: '捡得缺竖《太平通宝》错字铜钱；盲先生遁走；周三爷露一手。',
    hook: '晏寒江看铜钱呼吸微顿却口称不曾见过，撑伞护人回铺。',
  },
  {
    chapter: '第 06 章',
    title: '十六寒毒与近身渡气',
    timeAnchor: '十六日四更至天明前',
    location: '赊命铺堂屋',
    pov: '许知微',
    digest: '归铺后十六寒毒猛烈发作，隔空渡气险碎经脉，晏寒江被迫将人揽进怀中以纯阳体温绵密渡灵；受闻见更深层陈年药苦与微快心跳。',
    stateDelta: '首次贴身渡灵与孤傲卸防；腕间金链随体温悄然收合半寸。',
    hook: '许知微调侃怀里像炭盆，晏寒江替裹狐裘只回三字“别说话”。',
  },
];
