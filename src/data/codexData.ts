import { PARSED_CHAPTERS } from './chaptersLoader';

export interface VolumeOutline {
  id: string;
  index: string;
  title: string;
  timelineTag: string;
  summary: string;
  keyCase: string;
  emotionalTurn: string;
  foreshadowing: string;
}

export interface CharacterStage {
  era: string;
  title: string;
  appearance: string;
  demeanor: string;
  quote: string;
}

export interface VisualReference {
  src: string;
  label: string;
  note: string;
}

export interface Protagonist {
  id: 'xu' | 'yan';
  name: string;
  courtesyName: string;
  nameOrigin: string;
  roleLabel: string;
  sect: string;
  artifactName: string;
  artifactDesc: string;
  visualSummary: string;
  maskDesign?: string;
  image: string;
  imageCaption: string;
  references: VisualReference[];
  coreTrait: string;
  inPublic: string;
  inPrivate: string;
  stages: {
    past: CharacterStage;
    present: CharacterStage;
  };
  viewOfOther: string;
}

export interface GravityTrope {
  title: string;
  tag: string;
  mechanism: string;
  payoff: string;
}

export interface SectFaction {
  id: string;
  name: string;
  locus: string;
  signatureArt: string;
  reputationSurface: string;
  hiddenTruth: string;
  keyFigure: string;
}

export interface EnsembleMember {
  id: string;
  name: string;
  courtesyAndOrigin?: string;
  alias: string;
  affiliation: string;
  surfaceRole: string;
  hiddenDepth: string;
  signatureLine: string;
}

export interface TimelineEvent {
  year: string;
  line: 'past' | 'present';
  title: string;
  detail: string;
  secretLink: string;
}

export interface MarginNote {
  anchor: string;
  title: string;
  note: string;
}

export interface StoryChapter {
  id: string;
  folio: string;
  volume: string;
  title: string;
  wordCount: string;
  mood: string;
  epigraph: string;
  paragraphs: string[];
  marginNotes: MarginNote[];
}

const BASE_URL = import.meta.env.BASE_URL;

export const ARTWORKS = {
  heroCliff: `${BASE_URL}src/assets/images/hero_wuwang_cliff_1795442721319.jpg`,
  xieZheng: `${BASE_URL}src/assets/images/xiezheng_portrait_1795585832526.jpg`,
  xieZhengMasked: `${BASE_URL}src/assets/images/xiezheng_masked_1795585834436.jpg`,
  chuYueScholar: `${BASE_URL}src/assets/images/chuyue_scholar_1795585838964.jpg`,
  lanternRiver: `${BASE_URL}src/assets/images/scene_lantern_river_1795442721968.jpg`,
};

export const STORY_META = {
  title: '赊春山',
  subtitle: '你我皆是绝境枯木，偏要向天道赊一座春山',
  genre: '约 400 章紧凑修仙耽美企划 · 八大界域副本 · 每章 ≥3,000 纯汉字 · 恶犬骑士攻 × 驯犬执棋受',
  toneFormula: '先立人物再撩拨的慢热拉扯 · 尘埃里的江湖烟火 · 贴近二章过检基因的短句口语白描',
  hook: '五年前，天机第一算楚越替三百六十五名散修背下替劫死契，灵脉尽枯、天籍除名，只靠《太虚定命册》吊着最后五年性命躲进南荒雨巷破铺，却依旧守着不卑不亢的散漫体面。他以为自己躲过了九重天耳目，却不知受《降凡印》压制修为下凡的太渊大司命谢峥早已忍了整整五年——清场天庭、换掉街坊、以心血重铸四重锁脉同心链，只等他保命大限将至便掐点踹门。先是冷肃羁押与克制试探，再随诡案与寒毒步步相逼，直到那只骄傲的落魄野猫渐渐看清恶犬底色下的笨拙偏爱。',
  cpSummary: '披着骑士白袍、在所有人踩受时把最体面台阶铺到他脚边的恶犬攻（谢峥） × 落魄却不折风骨、病骨藏锋反向驯犬的漂亮执棋人受（楚越）',
};

export const GRAVITY_TROPES: GravityTrope[] = [
  {
    title: '忠犬的底色是“恶犬”，顺从才致命性感',
    tag: '蓄谋断退路 / 危险占有欲',
    mechanism:
      '拒绝呆板护卫型忠犬。谢峥从万劫潭死人堆里爬出来，五年前偷改判词、用暗卫替换南荒街坊，本质上是“斩断你所有退路，让你往后只能靠着我一个人活”的黑暗占有欲。',
    payoff:
      '外人面前是九重天冷血杀神，唯独在楚越面前甘愿收起獠牙；只有受遭遇险境或情敌逼近时，那股让人脊背发麻的疯犬护食态才会彻彻底底露出来。',
  },
  {
    title: '受不是花瓶摆设，而是病骨藏锋的驯犬师',
    tag: '智斗交锋 / 反向驯服',
    mechanism:
      '楚越灵脉枯竭、常年畏寒，却是五百年天机榜魁首。他开篇便敏锐察觉金链阵纹流向被私改、以及东屋袖口的焦糊血腥气，步步试探对方五年布局的真实用意。',
    payoff:
      '先立住骄傲体面的人格魅力，再从查案并肩与寒毒危机中一点点顺毛反撩，把单向羁押玩成势均力敌的双向拉扯。',
  },
  {
    title: '四重“同心锁命链”：合情合理的生理性纠缠',
    tag: '慢热渐进 / 拒绝强行发糖',
    mechanism:
      '前三章绝不强行拥抱亲昵，而是先交代清楚两人旧日同僚关系与当下羁押掣肘；随后随链纹四重境递进解锁：初重牵丝分痛三成；二重十六夜寒毒发作被迫贴身渡阳；三重灵犀共鸣；四重命骨同生。',
    payoff:
      '经过前几章的性格立稳与彼此摩擦，等第 6 章寒毒发作不得不贴近汲取纯阳暖意时，生理刚需与心防碰撞才会真正击中读者。',
  },
  {
    title: '修罗场催化 + 50–60 章紧凑副本闭环（400 章零注水）',
    tag: '长篇留存 / 宿敌抢人',
    mechanism:
      '前30章绝不掀光五百年麦饼底牌，先用南荒画皮案与宿敌陆砚寒携“清白赎罪契”登门羞辱，立住人物高下对照与外部危机，再沿八大界域逐卷升级。',
    payoff:
      '每 50–60 章完成一个高能诡案闭环并推高一重锁链秘密，每章硬性不低于 3,000 纯汉字，全书约 400 章（约 125–140 万字）紧凑收束、全程不注水。',
  },
];

export const VOLUMES: VolumeOutline[] = [
  {
    id: 'vol-1',
    index: '01',
    title: '第一卷 · 南荒赊命铺',
    timelineTag: '第 1–55 章 · 立人试探',
    summary:
      '灵脉尽枯靠《太虚定命册》吊命五年的楚越大限将至，受《降凡印》压制修为的大司命谢峥掐准节点登门锁腕。前三章先立稳人物腔调、旧日渊源与陆砚寒羞辱退场，随后经城南赵府画皮、城西废窑试药、荒村冥婚与鬼窟收网四段紧凑推进，首卷体内替劫死契自 365 消解至 320 道。',
    keyCase: '赵府画皮阴契（第 3–15 章）、城西废窑试药桩（第 16–30 章）、荒村冥婚借寿（第 31–44 章）及鬼窟收网战（第 45–55 章）。',
    emotionalTurn:
      '幕后黑手抓走阿财逼问楚越，谢峥在楚越画押定罪的刹那太渊剑出鞘屠尽鬼窟，转过身却蹲在泥水里替发抖的受仔细系紧狐裘领口；屋檐上陆砚寒冷笑邀约“江南见”。',
    foreshadowing: '门前王猛（王屠户）与李素秋全是五年前暗中调遣的甲等暗卫；太渊剑须“先账后刑”律也解释了为何大司命离不开天机算查案。',
  },
  {
    id: 'vol-2',
    index: '02',
    title: '第二卷 · 江南千灯黑市',
    timelineTag: '第 56–115 章 · 寒毒护食',
    summary:
      '追查画皮与试药源头潜入十里画舫与水下无底鬼市，百晓茶楼盲眼掌柜温疏泠正式登场。同心链晋入【二重 · 寒髓渡阳】：受每月寒毒发作必须紧贴谢峥汲取纯阳灵力方能保命，而陆砚寒趁机设鸿门宴强抢，直接把攻逼入失控边缘。',
    keyCase: '十里画舫沉船赌命局（第 56–75 章）、水下鬼市换命灯（第 76–95 章）、补心丹失窃与暗巷抢人战（第 96–115 章）。',
    emotionalTurn:
      '受被迫在攻怀里咬唇汲取暖意，醒后嘴硬推开；暗巷中陆砚寒拿折扇挑向楚越下颌，彻底激怒谢峥体内压抑已久的恶犬凶性，将其按进墙角宣誓：“他身上拴着我的链子，再伸手就卸了你的胳膊。”',
    foreshadowing: '百晓楼同时丢失了谢峥匿名订的续命草与楚越订的治雷伤玉露膏；沉船密匣摸出北境“长生丹方铜牌”。',
  },
  {
    id: 'vol-3',
    index: '03',
    title: '第三卷 · 北境凌霄剑阁',
    timelineTag: '第 116–175 章 · 交剑缝符',
    summary:
      '杀入极寒冰原剑阁，联手大师兄沈孤遥揭开名门正派拿外门弟子阳寿炼制“长生寿丹”的丑闻。在谢峥日夜纯阳温养下，楚越枯死五年的灵脉首次抽出新芽（首次“枯木逢春”），而剑阁血阵一役更让两人确认了彼此的双向死守。',
    keyCase: '雪原冻尸无魂案（第 116–133 章）、天池长生泉抽寿案（第 134–155 章）、雪原剑冢万寿血阵与沈孤遥觉醒（第 156–175 章）。',
    emotionalTurn:
      '风雪破阵前夕，谢峥双手将刻满三千六百条天规的天律剑奉进受掌心：“哪一条不顺眼自己划掉。”随后毒针袭来撕开外袍内衬，谢峥摸到受偷偷缝进去的九张心血护心符，铁面判官彻底失控红了眼眶。',
    foreshadowing: '剑阁老祖临死前狂笑指向东海：“万劫潭试药的真正主谋，可不在北境。”',
  },
  {
    id: 'vol-4',
    index: '04',
    title: '第四卷 · 东海沉渊蛟宫',
    timelineTag: '第 176–235 章 · 灵犀共鸣',
    summary:
      '追入无归海眼与珊瑚换魂黑市，偏执东海蛟主敖沧寂企图强留楚越破译海眼天机阵，制造新修罗场。同心链正式开启【三重 · 灵犀共鸣】：只要一方动了强烈杀意或渴望，链纹便会在腕骨发烫收紧，再也藏不住克己表皮下的疯魔心绪。',
    keyCase: '珍珠渔村蛟泪换魂（第 176–195 章）、珊瑚黑市原始玉简争夺（第 196–215 章）、无归海眼塌方与水牢强吻（第 216–235 章）。',
    emotionalTurn:
      '海眼塌方之际楚越为救旧部切断感应独自坠渊；大司命疯魔屠尽阻拦海妖捞出浑身湿冷的受，破天荒首次发狠咬破他唇角：“再敢独自去死，我就把整个东海连你一起锁死！”腕骨灼热让受第一次听见对方恐慌如鼓的心跳。',
    foreshadowing: '海眼底打捞出上古司命台最初那批替劫原始玉简，线索直指中州皇城。',
  },
  {
    id: 'vol-5',
    index: '05',
    title: '第五卷 · 中州玉京权谋局',
    timelineTag: '第 236–295 章 · 双强反杀',
    summary:
      '踏入皇城与百年簪缨世家核心。面对陆砚寒联手朝堂贵胄设下的“强夺契与名誉绝杀局”，病骨支离的楚越执紫毫笔借势布阵，联合谢峥当众反杀拆穿陆氏藏私秘阁丑闻，亲手将陆砚寒剥官押入司命大牢！',
    keyCase: '寒门状元文脉盗窃案（第 236–255 章）、皇室长生傀儡案（第 256–275 章）、陆氏藏私秘阁与朝堂大反杀（第 276–295 章）。',
    emotionalTurn:
      '关系迈入“双向明牌撩拨期”。楚越学会透过三重链纹心跳顺毛逗弄这头凶犬，并趁押解交接之便，在司命密库深处翻出了一份笔迹被篡改的五年前《死刑改判书》残卷。',
    foreshadowing: '改判书上的朱批笔迹，与五百年前万劫潭旧案卷宗严丝合缝地对上了。',
  },
  {
    id: 'vol-6',
    index: '06',
    title: '第六卷 · 幽冥无间与归墟镜渊',
    timelineTag: '第 296–340 章 · 归墟掀牌',
    summary:
      '生死簿残页引爆忘川鬼都旧案，两人在归墟镜渊时空崩塌绝境中掀开全书所有底牌：五百年前万劫潭底濒死少年与半块硬麦饼、四百八十年前太渊九死劫死契、五年前改判词与换街坊的漫长蓄谋，所有因果在天光下和盘托出。',
    keyCase: '忘川摆渡买路钱黑幕（第 296–310 章）、生死簿残页十殿审讯（第 311–324 章）、归墟镜渊塌陷与旧卷重审（第 325–340 章）。',
    emotionalTurn:
      '旧锦囊里的陈年麦饼渣掉落，暴露全部卑微过往的谢峥慌乱得一连捡两次没抓稳；楚越红着眼一把拽住他衣领撞进怀里吻上去：“从你第一晚煮那么甜的姜汤我就猜到了——这回换我走过来牵你。”',
    foreshadowing: '同心链正式蜕变为【四重 · 命骨同生】，化作双生护心印生死与共。',
  },
  {
    id: 'vol-7',
    index: '07',
    title: '第七卷 · 九重天司命本台',
    timelineTag: '第 341–380 章 · 破局拆算',
    summary:
      '玉清天尊与司命旧派元老撕破脸皮，调动三千仙官围剿问罪台。这一次再无人独自赴死：楚越当着三界水镜直播摊开千年典命假账铁证，谢峥当众折断大司命玉冠、一剑劈碎千年玄铁算盘，双强并肩杀穿九重天。',
    keyCase: '九重天宿债大审判（第 341–355 章）、玉清天尊窃命政变清算（第 356–370 章）与重立《三界契约律》（第 371–380 章）。',
    emotionalTurn:
      '三千仙官围剿飞雪中，两人背靠背而立，谢峥反手扣紧楚越执笔的手腕冷笑：“世人皆说本君算无遗策——不错，连同今日这一战，我也早就算到他会站在我身边。”',
    foreshadowing: '三百六十五道替劫死契彻底消解殆尽的刹那，楚越枯竭五年的灵脉轰然重塑圆满。',
  },
  {
    id: 'vol-8',
    index: '08',
    title: '第八卷 · 春山返乡录',
    timelineTag: '第 381–400 章 · 返乡春山',
    summary:
      '新《三界契约律》颁行，天下再无典命邪契。两人辞去神籍重返南荒雨巷，翻修破铺为《春山茶肆》。阿财化形历劫、王屠户改行正经卖肉、谢疏淮哭着递茶水，在热气腾腾的烟火拌嘴里收束四百章长卷。',
    keyCase: '新律试行扫尾案、阿财化形历劫与春山茶肆开张风波。',
    emotionalTurn:
      '同心链强束早已解除，可茶肆挂牌那日，楚越晃着早已空无一字的白玉账簿亲手把金链重新扣回两人腕骨，笑眯眯看着替自己剥莲子的前大司命——从被迫锁进三丈，到余生心甘情愿永不相离。',
    foreshadowing: '门前新挂铜铃铛上系着一枚错字旧铜钱，风一吹，便响成一整座春山。',
  },
];

export const PROTAGONISTS: Protagonist[] = [
  {
    id: 'yan',
    name: '谢峥',
    courtesyName: '字临渊 · 官号“太渊司命”',
    nameOrigin: '出处：临渊而不慑。风骨峥嵘，临渊断命，威严肃冷。',
    roleLabel: '攻 · 人前铁面杀神 / 人后蓄谋断退路、越爱越露獠牙的重力系忠犬',
    sect: '九重天司命台（最高执掌使）',
    artifactName: '天律剑“太渊”、寒铁镂羽半面与四重同心锁命链',
    artifactDesc: '外人眼中的冷血刑具，其实是谢峥耗时五年亲手私改的绑命誓约——从初重牵丝分痛三成、二重寒髓渡阳、三重灵犀共鸣，一路锁至四重命骨同生。',
    visualSummary: '【脸型】清瘦冷削骨相，下颌利落、眉骨深峻、浅灰冷眸、薄唇微抿；【发饰与抹额】墨发高束配素面玄银发冠，额前微长碎发与双颊长鬓之间半掩一条窄素白玄银细抹额（司命镇心之用）；【衣冠】雪白霜纹广袖长袍叠玄墨短肩氅，肩饰寒银三连环扣与暗青飘带，腰束双层黑革银扣带悬白玉骨饰，手覆墨色露指护手，足蹬净尘白靴。',
    maskDesign: '「寒铁镂羽半面」（临渊镇煞面）：古旧玄银冷铁锻打的上半覆面甲，仅遮眉骨、鼻梁与颧侧，上缘如霜羽枯枝向两侧展翅镂空，眉心嵌菱形窥气孔（隐见素白抹额），独露冷淡浅眸与削薄下颌；旧时初入司命台遮容防窥，今夜探诡阵偶一覆面。',
    image: ARTWORKS.xieZheng,
    imageCaption: 'Fig. 1 — 谢峥（字临渊）定版立绘。高束墨发配半掩素白抹额，雪白霜纹广袖叠玄墨肩氅与暗青丝带，冷峭克制。',
    references: [
      {
        src: ARTWORKS.xieZheng,
        label: '司命正装立绘',
        note: '清瘦冷削脸型、高束碎发与半掩素白细抹额，雪白广袖叠玄墨短肩氅、寒银三连环扣与暗青飘带，手按太渊剑柄。',
      },
      {
        src: ARTWORKS.xieZhengMasked,
        label: '寒铁镂羽半面态',
        note: '古银冷铁锻打的上半覆面甲，霜羽枯枝镂空展翅、眉心菱孔隐现素白抹额，仅露冷淡浅灰眼眸与削薄下颌。',
      },
    ],
    coreTrait: '恶犬底色 × 蓄谋五年 × 冷肃稳重的偏爱。说话绝不油滑，句句切中实处；当所有旧同僚踩楚越落魄时，他冷着脸把人拦到身后、把最体面的台阶铺到他脚边。',
    inPublic: '九重天最令仙官胆寒的铁面判官，下凡受《降凡印》压制修为至金丹—元婴初阶；太渊剑须“先账后刑”律，非天机算画押核实不得出鞘；同朝时戴寒铁镂羽半面且受天律神印遮蔽命格。',
    inPrivate: '暗中替受分流雷劲、拂晨送来不甜腻的滚烫姜汤、拎走咸菜缸底下被浸潮的秘典擦净收好——所有照顾都藏在冷脸和极少言语的行动里；唯独外敌碰受衣袖时，凶光藏都藏不住。',
    stages: {
      past: {
        era: '五百年前 · 万劫潭底',
        title: '无名溃烂且声带烧哑的泥沼孤狼',
        appearance: '遍体鳞伤、满脸毒疤且发不出声的试药少年，死死护着怀里半块硬麦饼，眼底满是野兽般的戒备与血气。',
        demeanor: '楚越随手扔来的那半块麦饼与一句“干干净净来找我”，成了他唯一锚点。后来飞升重塑仙骨改姓为“谢”，戴寒铁镂羽半面同朝为官却一直隐忍不敢相认。',
        quote: '“……等我爬上去。不管要跨过多少具尸体，总有一天，我要站在你退无可退的地方。”',
      },
      present: {
        era: '五年蓄谋 · 锁链同居',
        title: '步步为营却不动声色护食的执掌使',
        appearance: '高束墨发与微长额发下半掩窄素白抹额，雪白霜纹广袖叠玄墨肩氅与暗青丝带，一尘不染立于南荒泥巷；唯有深夜分流雷煞后掩在宽袖里的左腕与对峙陆砚寒时的眼神，泄露了几分隐忍偏执。',
        demeanor: '不急着逼迫，只靠同心链与“先账后刑”律将人稳稳拴在三丈视野内，一边查案消契，一边把对方所有的退路悄悄收进掌心。',
        quote: '“他手腕上系着司命台的锁链，人不归你管，话也轮不到你递。”',
      },
    },
    viewOfOther:
      '谢峥眼里的楚越：“世人都当他是个灵脉尽毁、窝在雨巷里喝冷茶的废人，只有我知道这人骨子里有多清傲——他哪怕只剩一口气也不肯对陆砚寒弯半寸脊梁。既然当年替我扛下死劫却转身忘了个干净，往后这三百六十五道契，便由我一寸一寸盯着他还完。”',
  },
  {
    id: 'xu',
    name: '楚越',
    courtesyName: '字栖寒 · 昔日天机第一算',
    nameOrigin: '出处：拣尽寒枝不肯栖。灵脉自毁，不肯依附天道，栖身寒隅。',
    roleLabel: '受 · 病弱清贵的落魄文士 × 病骨藏锋驯犬执棋人',
    sect: '南荒赊命小铺（原天界天枢殿魁首）',
    artifactName: '“不赊”紫毫、《太虚定命册》、水墨折扇与九张护心符',
    artifactDesc: '虽无灵脉，却凭“天机眼看破乌黑命丝 + 紫毫借阵转嫁反噬业火 + 同心链借剑意”周旋八重界域；同时借《太虚定命册》强封魂火吊命五年。',
    visualSummary: '【病弱文士定版】清瘦单薄、极畏寒气，冷瓷苍白肤色衬着狭长倦怠的眼眸与眼尾淡淡薄红，唇角总带不动声色的文人淡笑；乌发松挽斜插素银枯枝寒梅簪、耳侧垂一缕暗红细辫；南荒常态着宽大玄墨暗云纹文士长袍配半旧黑狐毛领与素银弯月腰佩，手执紫毫命册，破局正装则外罩素白狐裘大氅、轻握水墨折扇。',
    image: ARTWORKS.chuYueScholar,
    imageCaption: 'Fig. 2 — 楚越（字栖寒）素裘执扇文士态定版立绘。玄墨暗金云纹长袍外罩素白狐裘大氅，瘦白手指轻握水墨折扇，疏朗冷艳、锋芒内敛。',
    references: [
      {
        src: ARTWORKS.chuYueScholar,
        label: '素裘执扇文士态',
        note: '动真格与昔日天机魁首态：玄墨暗金云纹长袍外罩素白狐裘大氅，瘦白手指轻握水墨折扇，疏朗冷艳、锋芒内敛。',
      },
    ],
    coreTrait: '病弱书卷气 × 落魄体面 × 算无遗策。绝不苦大仇深、绝不硬卖滑稽算账梗；嘲人绕半个弯却字字见血，自己疼得咽血也要守住文人风骨，敏锐察觉谢峥异样后便顺势试探。',
    inPublic: '面对陆砚寒的居高临下连正眼都懒得给：“玉京山那么大的排场装不下您这柄象牙扇了？特意跑来南荒雨巷里看我喝冷茶？”',
    inPrivate: '被雷煞折磨得脸色惨白依然慢条斯理擦手；看着端汤上门的大司命偏要顺着袖口焦糊血腥气发问，一步步试出对方究竟在图什么。',
    stages: {
      past: {
        era: '五百年前 · 天机魁首',
        title: '鲜衣怒马却敢替苍生扛契的小算官',
        appearance: '墨金暗纹官袍外罩素白狐裘，腰间素银弯月佩与旧铜钱相击作响，批公文总是漏墨出错被某位冷面同僚板着脸训斥，算尽天道机关却唯独对泥沼里的苦命人手软。',
        demeanor: '万劫潭边递出半块麦饼；四百八十年前又悄悄替刚晋升的冷面判官扛下九死绝劫，自己转身拍拍衣袖全当积德。',
        quote: '“小疯子，活着就得把命攥在自己手里——爬出泥坑了，记得干干净净来找我啊！”',
      },
      present: {
        era: '破铺重逢 · 观棋入局',
        title: '看穿异样却不急着点破的执棋手',
        appearance: '冷瓷苍白面色、眼尾常浮一抹病倦薄红，裹着宽大玄墨旧袍与半旧黑狐毛领，发间斜插素银枯枝簪，指间把玩紫毫或水墨旧扇；一上案场眼神立刻锐利如刃。',
        demeanor: '既看破金链流向被私改、也看破谢峥护短得过了头，便借查城南赵府诡案与城西旧窑做局，慢慢撬开这位大司命身上藏了五年的秘密。',
        quote: '“谢峥，当年在天枢殿你最看不得我散漫误事，怎么五年后再见，连陆砚寒递个话头你都要把人轰出门外？”',
      },
    },
    viewOfOther:
      '楚越眼里的谢峥：“五年前的谢峥是一块捂不热的玄铁，可如今住进东屋这位……嘴上还挂着司命律三个字，链子却暗地里往外分流雷劲，袖口还藏着洗不净的血焦味。他到底憋着什么主意？急什么，反正他把我锁在三丈之内，早晚得自己露马脚。”',
  },
];

export const SECTS: SectFaction[] = [
  {
    id: 'simingtai',
    name: '九重天 · 司命台',
    locus: '天界三十三重天之枢 · 掌三界寿元天劫',
    signatureArt: '太渊勘契术 · 以因果算筹裁定修士寿数与仙途劫数',
    reputationSurface: '三界最铁面无私的最高执法殿宇，大司命谢峥更是专斩违契之徒的冷血判官。',
    hiddenTruth: '部分高层早已沦为以命相典、盘剥生人阳寿的巨蠹；而他们畏惧的谢峥，五年前便私改楚越死刑判词并架空核心库房，用五年布局换来今日将人光明正大扣在自己羽翼下。',
    keyFigure: '谢峥（太渊司命）、谢疏淮（执法使）',
  },
  {
    id: 'shemingpu',
    name: '南荒 · 赊命小铺',
    locus: '南荒雨巷尽头 · 门前斜挑一盏缺角破灯笼',
    signatureArt: '民间讨债算术 · 专拆黑心阴契、替死人清算旧账',
    reputationSurface: '一个快要倒闭的破烂神棍铺子，老板体弱多病随时可能断气，街坊邻里倒是个个和善热心。',
    hiddenTruth: '整条巷子的杀猪匠、挑水寡妇与修伞盲老头全是五年前谢峥亲手调遣下来的甲等暗卫——既保护楚越五年不遭暗杀，又不动声色斩断他与外人往来的所有退路。',
    keyFigure: '楚越（栖寒）、阿财（吞金兽）',
  },
  {
    id: 'lushi',
    name: '中州 · 玉京陆氏',
    locus: '中州皇城文脉中心 · 百年书香簪缨世家',
    signatureArt: '玉京点墨诀 · 擅以文气伪造清白契、操纵名门舆论',
    reputationSurface: '礼贤下士、清贵风雅的顶级修仙门阀，少主陆砚寒更是无数世家倾慕的温润君子。',
    hiddenTruth: '陆氏藏私秘阁里关满被以“清白赎罪契”买断折辱的落魄天才；陆砚寒自五百年前大比屈居榜眼后便对楚越生出畸形迷恋，是全书前中期最致命的修罗场引信。',
    keyFigure: '陆砚寒（陆氏少主 / 司命副使）',
  },
  {
    id: 'lingxiao',
    name: '北境 · 凌霄剑阁',
    locus: '极北冰原绝壁 · 天下正道剑修领袖',
    signatureArt: '青云剑诀 · 号称门规森严、最重正邪礼法',
    reputationSurface: '清高孤傲的百年大派，老祖闭关返老还童，弟子个个剑骨峥嵘。',
    hiddenTruth: '所谓“长生灵泉”全靠偷吸寒门弟子的阳寿炼丹续命；大师兄沈孤遥醒悟真相后燃尽剑意破局，也是楚越灵脉首次枯木逢春的关键战局。',
    keyFigure: '沈孤遥（剑阁大师兄）',
  },
  {
    id: 'chenyuan',
    name: '东海 · 沉渊蛟宫',
    locus: '无归海眼深处 · 镇守上古海妖遗脉',
    signatureArt: '蛟泪换魂术 · 以千年泪珠置换神魂与记忆',
    reputationSurface: '与世隔绝的水族重地，历来不问陆上仙门恩怨。',
    hiddenTruth: '海眼镇魂锁底下暗藏上古司命台最初那批替劫契约的原始玉简，同心链也是在此地晋入【三重 · 灵犀共鸣】，彻底撕开两人克己礼法下的真实渴望。',
    keyFigure: '敖沧寂（沉渊蛟主）',
  },
  {
    id: 'baixiaolou',
    name: '江南 · 百晓茶楼',
    locus: '江南十里画舫渡口 · 三教九流情报枢纽',
    signatureArt: '暗账密网 · 只要银子够数，天帝密诏也能查出几分',
    reputationSurface: '说书嗑瓜子的市井茶肆，盲眼女掌柜收钱贪财却爱管闲事。',
    hiddenTruth: '八大界域唯一同时接过谢峥和楚越两个人“绝密私单”的中立之地——一个半夜砸重金买避雷护心草，另一个悄悄买玉露膏藏进对方包袱里。',
    keyFigure: '温疏泠（盲眼女掌柜）',
  },
];

export const ENSEMBLE: EnsembleMember[] = [
  {
    id: 'luchenbi',
    name: '陆砚寒（字知遥）',
    courtesyAndOrigin: '出处：砚冰凝寒，远山知遥｜笔墨生寒，雅皮下藏妒念心机，温文外壳裹着幽深执念。',
    alias: '世家伪善宿敌 / 修罗场核心引信',
    affiliation: '中州玉京陆氏 · 司命台副使',
    surfaceRole: '执象牙折扇、满口礼法仁义的世家贵公子，看似怜惜故人落魄，欲动用门阀香火功德替楚越冲抵三成死契。',
    hiddenDepth: '五百年前大比永远被楚越压在榜眼位置，从此生出扭曲嫉妒与病态收藏欲，想用一纸“清白赎罪契”把跌入泥潭的天机魁首买回陆府私藏。每一次贴近挑衅，都会直接逼出谢峥冷戾暴走的凶犬本色。',
    signatureLine: '“五年不见，昔日天机榜魁首竟沦落到这等漏风破巷里糊口？只要你肯签这份清白契随我回中州，这笔死契，我陆氏替你冲抵三成。”',
  },
  {
    id: 'acai',
    name: '阿财',
    alias: '赊命铺首席伙计 / 吞金兽幼崽',
    affiliation: '南荒赊命铺',
    surfaceRole: '嘴馋护短、一听谁骂自家老板就想追着人家鞋后跟骂三条巷子的机灵少年。',
    hiddenDepth: '上古最后一只吞金辟邪兽，对天界法力与肮脏阴契极其敏感；不仅早觉察到这群街坊身上藏着杀气，也是全书唯一敢当面啐陆砚寒一口的护主小兽。',
    signatureLine: '“什么故人，黄鼠狼给鸡拜年罢了！”',
  },
  {
    id: 'wangmeng',
    name: '王猛（王屠户）& 李素秋 & 周三爷',
    alias: '南荒雨巷街坊 / 甲等戍边营旧部',
    affiliation: '原司命台暗卫（五年前亲调）',
    surfaceRole: '一个嗓门洪亮帮修屋瓦的杀猪匠、一个挑水走青石板水花不晃的李大娘、一个守巷口补油纸伞的盲老汉。',
    hiddenDepth: '全是五年前谢峥从戍边营抽调的死忠旧部，暗中清扫刺客、盯着雨巷动静；直至第 4–18 章查案过程中才逐渐暴露老兵刀茧、秘制止血散与旧部退伍渊源。',
    signatureLine: '“楚老板，傍晚趁雨停我顺道拎两片瓦把东屋漏缝补上，省得风往里灌。”',
  },
  {
    id: 'wenbuyu',
    name: '温疏泠（字静湄）',
    courtesyAndOrigin: '出处：疏影横斜水清浅；所谓伊人，在水之湄｜疏而冷眼，泠水含寒；临水默观，目盲心明，坐看局内人辗转沉浮。',
    alias: '百晓楼盲眼掌柜',
    affiliation: '江南百晓茶楼',
    surfaceRole: '坐镇水榭茶楼的盲眼掌柜，语调清冷贪财，却把江南八方风声摸得门儿清。',
    hiddenDepth: '同时拿着谢峥与楚越两份互相隐瞒的抓药密单，冷眼旁观两个聪明人在店门口装作偶遇、暗地里把对方爱吃的糕点和护心药材塞满车厢。',
    signatureLine: '“一个半夜砸重金买纯阳续命草不准留名，另一个后脚就来买专治雷伤的玉露膏——二位这出戏，倒比茶楼说书还有趣。”',
  },
  {
    id: 'xiechangling',
    name: '谢疏淮（字清越）',
    courtesyAndOrigin: '出处：淮水东边旧时月；清越出林泉｜淮水寒波，清越孤直，恪守天条，克制缄默，忠心却不愚钝。',
    alias: '司命台守律神官 / 忠心暗应下属',
    affiliation: '九重天司命台（与谢峥同姓不同宗）',
    surfaceRole: '谢峥麾下最守规矩的执律神官，起初每日抱着《违契逃徒卷宗》，严防死守楚越耍花招。',
    hiddenDepth: '中后期整理密档时意外撞破自家铁面大人五年前亲手签发的《南荒暗卫调遣令》与《死刑改判书》，克制缄默却一眼看破其中深意，从此成了最稳妥的暗中望风人。',
    signatureLine: '“大人当年清洗三座副殿的卷宗，属下已经封进暗库了。外头风紧，您只管安心办事。”',
  },
  {
    id: 'shenzhaoye',
    name: '沈孤遥（字云晏）',
    courtesyAndOrigin: '出处：孤帆远影碧空尽｜剑心孤远，云晏风宁，面上温润，骨子里是剑修独有的孑然。',
    alias: '凌霄剑阁大师兄 / 剑修',
    affiliation: '北境凌霄剑阁',
    surfaceRole: '面上温润、剑法卓绝的名门骄子，深受老祖器重，也是天下年轻剑修仰望的标杆。',
    hiddenDepth: '查案中意外撞破自己常年饮用的灵泉里竟融着同门师弟的阳寿，在信念崩塌后显露出剑修独有的孤远孑然，选择与楚谢二人联手掀翻剑阁长生黑幕。',
    signatureLine: '“若这仙门高台铺的全是同门骨血，那这第一剑阁大师兄的虚名，不当也罢。”',
  },
  {
    id: 'aolin',
    name: '敖沧寂（字玄沄）',
    courtesyAndOrigin: '出处：沧海万古，幽渊沉寂｜沧溟沉寂，玄沄为深水暗流，久居深海寒渊，淡漠疏离，不问凡尘俗事。',
    alias: '东海渊蛟之主 / 东海修罗场催化剂',
    affiliation: '东海沉渊无归蛟宫',
    surfaceRole: '久居深海寒渊的上古蛟族之主，淡漠疏离，历来不问陆上仙门是非。',
    hiddenDepth: '看重楚越能破解海眼镇魂锁的天机算术，曾企图以千年蛟珠为饵将其强留海底蛟宫做“专属算师”，直接触发谢峥三重同心链杀意共鸣彻底暴走。',
    signatureLine: '“陆上那群仙官只知压榨你的病骨，留在我蛟宫寒渊，我拿千年蛟珠替你重续灵脉如何？”',
  },
  {
    id: 'yuqing',
    name: '玉清天尊与司命元老',
    alias: '《赊命契》幕后旧派 / 终极理念政敌',
    affiliation: '三十三重天 · 司命旧派',
    surfaceRole: '维持三界灵气秩序与天律尊严的至高神明，自诩替苍生掌管飞升正道。',
    hiddenDepth: '历经上古天裂惨祸后彻底偏执的理念镜像——坚信“牺牲底层散修供养上层神明才能保住九重天不断绝”，与楚谢二人“身在命债无间，心向春山桃源”展开贯穿全书的哲学对决。',
    signatureLine: '“凡尘蝼蚁生来便是供养天梯的柴薪，楚越，你一人揽下三百死契，也妄想逆天改命？”',
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '五百年前 · 万劫潭',
    line: 'past',
    title: '泥泞死人堆与半块硬麦饼（核心底牌 · 卷六掀开）',
    detail: '万劫潭试药坑底，满脸毒疤且声带烧哑的无名孤狼收到少年楚越扔来的半块麦饼；飞升重塑仙骨后改姓“谢”，以半面面具与天律神印遮蔽命格，彻底堵死同朝相认漏洞。',
    secretLink: '前期绝不剧透，直至第六卷归墟镜渊崩塌才和盘托出，把前期所有孤立占有欲彻底升华为宿命救赎。',
  },
  {
    year: '四百八十年前 · 太渊渡劫',
    line: 'past',
    title: '暗中代扛的太渊九死劫（十六夜寒毒病源）',
    detail: '同朝为官时楚越并未认出他，只当这位阴郁同僚快死在九死劫里太可惜，悄然用自身道果替他扛下必死绝劫——一道极寒劫气由此渗入髓海，埋下日后每月十六非攻纯阳灵力不可压制的寒毒病根。',
    secretLink: '两人的命轨从此时起便暗中死死绞在一起，也是卷二渡灵张力与卷六翻案的核心契机。',
  },
  {
    year: '五年前 · 司命改判',
    line: 'past',
    title: '偷改死刑判词与忍辱五年的三步铺垫',
    detail: '楚越背下三百六十五道替劫死契靠《太虚定命册》吊命五年。谢峥趁夜改判为下凡抵债，随后耗时五年在天庭血洗反扑势力、调遣王猛/李素秋换掉南荒街坊、并心血重铸四重锁脉同心链。',
    secretLink: '直到《太虚定命册》五年保命极限将至，大司命才按《降凡印》压制修为掐点踹门落子。',
  },
  {
    year: '今岁 · 谷雨（第 1–55 章）',
    line: 'present',
    title: '降凡锁腕、先立人物与卷一四段紧凑破局',
    detail: '受“先账后刑”天律限制，大司命必须靠天机算核实因果画押方能拔剑；前三章交代清楚旧日同僚关系与陆砚寒羞辱退场后，两人经赵府画皮、城西废窑试药、荒村冥婚、鬼窟收网四段步步走近，替劫死契自 365 消解至 320 道。',
    secretLink: '先把两个人的魅力和关系立稳，再在寒毒夜与鬼市危机中水到渠成引出 BL 拉扯。',
  },
  {
    year: '中期 · 江南 / 北境 / 东海 / 中州（第 56–295 章）',
    line: 'present',
    title: '二重渡阳、枯木抽芽缝护心符、三重灵犀共鸣',
    detail: '经江南百晓楼、北境剑阁（灵脉首现“抽芽”并曝光九张护心符）至东海海眼水牢强吻，再至中州皇城拆穿陆氏秘阁并翻出改判书残卷——替劫死契逐案消减，灵脉经抽芽、凝脉稳步迈向通窍。',
    secretLink: '每卷 2–3 案紧凑推进、50–60 章一次闭环跃迁，杜绝长篇中段注水。',
  },
  {
    year: '终局 · 幽冥 / 九重天至春山（第 296–400 章）',
    line: 'present',
    title: '归墟掀牌、劈碎铁算盘与春山茶肆',
    detail: '归墟镜渊挑明五百年因果后，两人在九重天同玉清天尊展开理念决战，折断玉冠劈碎千年算盘，三百六十五道死契尽销刹那灵脉重归圆满；新律落地后辞官返乡，重修《春山茶肆》。',
    secretLink: '昔日被逼锁进三丈阴影里的野猫，最终心甘情愿与恶犬共守一整座春山。',
  },
];

export const CHAPTERS: StoryChapter[] = [
  {
    id: 'ch-1',
    folio: 'FOLIO I',
    volume: '卷一 · 南荒赊命铺（立人篇）',
    title: PARSED_CHAPTERS.ch1.title || '第一章 雨巷算官与避雷槐',
    wordCount: `约 ${PARSED_CHAPTERS.ch1.paragraphs.join('').length} 字`,
    mood: '江湖烟火 × 关系定调',
    epigraph: '旧日同僚隔着五年荣辱重逢，冷锁落腕，先分尊卑与立场，再埋暗流。',
    paragraphs: PARSED_CHAPTERS.ch1.paragraphs,
    marginNotes: [
      {
        anchor: '“替三百六十五个散修签下替劫死契”',
        title: '先把身份与关系交代清楚',
        note: '开篇不急着发糖，先借南荒破铺的茶火气与谢峥踏雨登门，把楚越是谁、为何落魄、两人昔日在天枢殿是何种同僚交情交代透彻。',
      },
      {
        anchor: '“我就把你院里那几坛酸萝卜全掀了”',
        title: '有血肉的冷肃，绝不讲机械算账梗',
        note: '谢峥擦净《太虚定命册》却冷着脸威胁掀酸萝卜坛子，用真实克制的动作代替“呼吸算二两”的 AI 碎嘴笑料。',
      },
    ],
  },
  {
    id: 'ch-2',
    folio: 'FOLIO II',
    volume: '卷一 · 南荒赊命铺（试探篇）',
    title: PARSED_CHAPTERS.ch2.title || '第二章 十五夜雷与东屋焦香',
    wordCount: `约 ${PARSED_CHAPTERS.ch2.paragraphs.join('').length} 字`,
    mood: '克制交锋 × 暗线留白',
    epigraph: '十五的雷煞悄悄分走了三成，晨起一碗热姜汤，却没有一句多余的便宜话。',
    paragraphs: PARSED_CHAPTERS.ch2.paragraphs,
    marginNotes: [
      {
        anchor: '“别死在南荒”',
        title: '剔除“记三钱账”，还原大司命本色',
        note: '谢峥久居高位、冷硬少言，哪怕心底在意也只会拿“先账后刑要你画押”当借口，绝不说违和的滑稽台词。',
      },
      {
        anchor: '“大司命这袖子里藏着什么味儿”',
        title: '势均力敌的试探拉扯',
        note: '楚越没有急着暧昧贴靠，而是凭嗅觉与洞察反扣大司命命门，为后续第 6 章寒毒发作时的亲近埋下真正让人心痒的张力。',
      },
    ],
  },
  {
    id: 'ch-3',
    folio: 'FOLIO III',
    volume: '卷一 · 南荒赊命铺（护短篇）',
    title: PARSED_CHAPTERS.ch3.title || '第三章 故人折扇与未消契',
    wordCount: `约 ${PARSED_CHAPTERS.ch3.paragraphs.join('').length} 字`,
    mood: '宿敌衬托 × 水到渠成',
    epigraph: '外人踩他落魄，大司命冷着脸将人拦到身后——五年后重逢，这人到底改了什么主意？',
    paragraphs: PARSED_CHAPTERS.ch3.paragraphs,
    marginNotes: [
      {
        anchor: '“当年百官大比次次屈居人下”',
        title: '借陆砚寒写活楚越的过往光芒',
        note: '读过这一章，读者才真正明白楚越曾经何等耀眼，于是更懂得他如今在泥泞里的风骨，以及谢峥那句“人不归你管”分量有多重。',
      },
      {
        anchor: '“再来问本君改了什么主意”',
        title: '水到渠成的 BL 钩子，而非强行按椅调情',
        note: '删掉违和的按椅调情与扯腰带，留在一句冷静却直击心防的反问上，自然把情感拉扯带入城南赵府探案线。',
      },
    ],
  },
  {
    id: 'ch-4',
    folio: 'FOLIO IV',
    volume: '卷一 · 南荒赊命铺（入局篇）',
    title: PARSED_CHAPTERS.ch4.title || '第四章 城南无影尸与妆镜偏',
    wordCount: `约 ${PARSED_CHAPTERS.ch4.paragraphs.join('').length} 字`,
    mood: '江湖物证 × 细处偏心',
    epigraph: '门板底下空无一影，铜镜里慢半拍缩回的裙角，以及迎风回廊里悄然挡在身前的白衣。',
    paragraphs: PARSED_CHAPTERS.ch4.paragraphs,
    marginNotes: [
      {
        anchor: '“一股醋混生石灰的冲鼻味”',
        title: '《燕云》式行规与物证铺陈',
        note: '南荒横死宅院撒灰泼醋、沉水香灰点朱砂落桩印、菱花镜影脚滞后——用市井行话和实在物证撑起诡案寒意，不靠一惊一乍的旁白吓人。',
      },
      {
        anchor: '“不动声色错开半肩，走到了迎风那一侧”',
        title: '不动声色的体贴比嘴炮更有味道',
        note: '楚越故意放慢步子试探金链松紧，大司命既不斥责也不解释，只自然挪到迎风一侧替他挡风。',
      },
    ],
  },
  {
    id: 'ch-5',
    folio: 'FOLIO V',
    volume: '卷一 · 南荒赊命铺（鬼市篇）',
    title: PARSED_CHAPTERS.ch5.title || '第五章 无面画师与错字铜钱',
    wordCount: `约 ${PARSED_CHAPTERS.ch5.paragraphs.join('').length} 字`,
    mood: '奇兵破局 × 暗线重逢',
    epigraph: '无灵脉照样借脏墨定生死门；而那枚少了一竖的《太平通宝》，偏偏叫大司命呼吸一滞。',
    paragraphs: PARSED_CHAPTERS.ch5.paragraphs,
    marginNotes: [
      {
        anchor: '“借你的脏墨，画你的死门”',
        title: '受的高光战力：绝不是等攻救的娇花',
        note: '太渊剑因“先账后刑”律暂时不能乱出鞘，恰好让楚越靠“不赊”紫毫借敌人血墨画反算阵纹破局，聪明又利落。',
      },
      {
        anchor: '“是周三爷“碰巧”把修好的黑漆油纸伞往外一撑”',
        title: '雨巷街坊首次暗中兜底',
        note: '不急着揭穿周三爷的暗卫身份，只留下一记“手滑挡飞毒镖”的闲笔，让老练读者心里咯噔一声笑出来。',
      },
    ],
  },
  {
    id: 'ch-6',
    folio: 'FOLIO VI',
    volume: '卷一 · 南荒赊命铺（渡灵篇）',
    title: PARSED_CHAPTERS.ch6.title || '第六章 十六寒毒与近身渡气',
    wordCount: `约 ${PARSED_CHAPTERS.ch6.paragraphs.join('').length} 字`,
    mood: '生理刚需 × 首次失控拉扯',
    epigraph: '连撑了五章体面骄傲的人，在寒毒撕扯下被迫被揽进滚烫怀里——那一瞬心跳快了一拍的，又何止一人。',
    paragraphs: PARSED_CHAPTERS.ch6.paragraphs,
    marginNotes: [
      {
        anchor: '“经脉受不住隔空硬推”',
        title: '铺垫五章后的水到渠成',
        note: '正因为前五章先把两人的傲骨、防备和护短立稳了，这里在寒毒绝境下被迫近身渡灵时，骄傲与生理渴望厮杀才真正让人上头。',
      },
      {
        anchor: '“苦涩的草药陈香”',
        title: '从焦血味到陈年药香的伏笔递进',
        note: '不仅闻见昨晚替扛雷煞的焦糊味，还第一次贴近到对方藏在白袍底下的陈年药苦——为第 20 章寒髓丸对照与远线伏笔埋下细钩。',
      },
    ],
  },
  {
    id: 'ch-7',
    folio: 'FOLIO VII',
    volume: '卷一 · 南荒赊命铺（试探篇）',
    title: PARSED_CHAPTERS.ch7.title || '第七章 三丈之外的血腥线',
    wordCount: `约 ${PARSED_CHAPTERS.ch7.paragraphs.join('').length} 字`,
    mood: '底线试探 × 失控护短',
    epigraph: '链子越过三丈不勒皮肉，先绷不住破墙杀出来的，是拴在链子另一头的那个人。',
    paragraphs: PARSED_CHAPTERS.ch7.paragraphs,
    marginNotes: [
      {
        anchor: '“居然就那么稳稳停住了”',
        title: '验证锁链真相：虚张声势的刑具',
        note: '楚越故意踩过三丈死线，实证这根法器绝不伤他，由此看破谢峥嘴硬心软的护短底色。',
      },
      {
        anchor: '“下回再自己乱跑，本君就把链子缩成三尺”',
        title: '权谋线与感情线双推',
        note: '顺手拎出陆氏焚卷暗桩，把试探底线与赵府地窖危机无缝焊在一起。',
      },
    ],
  },
  {
    id: 'ch-8',
    folio: 'FOLIO VIII',
    volume: '卷一 · 南荒赊命铺（地窖篇）',
    title: PARSED_CHAPTERS.ch8.title || '第八章 赵府地窖里的生辰八字',
    wordCount: `约 ${PARSED_CHAPTERS.ch8.paragraphs.join('').length} 字`,
    mood: '人性凉薄 × 火场相护',
    epigraph: '画皮案最冷的不是鬼市阴术，而是亲父把女儿三十年阳寿写进抵债账簿的笔迹。',
    paragraphs: PARSED_CHAPTERS.ch8.paragraphs,
    marginNotes: [
      {
        anchor: '“用宽阔的脊背和右臂实打实挡住了”',
        title: '下意识护住左腕旧伤的细节伏笔',
        note: '谢峥宁可用右臂硬接带绿火的断梁，也把左腕藏得严严实实，为第 16 章东屋旧伤埋下连环草蛇灰线。',
      },
      {
        anchor: '“中州私银庄的暗印”',
        title: '把边城私案接入中州暗网',
        note: '从火海抢出的半张残页同时指向中州银庄与鬼市交割时辰，为第 11–12 章反杀做局。',
      },
    ],
  },
  {
    id: 'ch-9',
    folio: 'FOLIO IX',
    volume: '卷一 · 南荒赊命铺（烟火篇）',
    title: PARSED_CHAPTERS.ch9.title || '第九章 王屠户的旧刀伤',
    wordCount: `约 ${PARSED_CHAPTERS.ch9.paragraphs.join('').length} 字`,
    mood: '市井试探 × 洞悉暗桩',
    epigraph: '一条雨巷的排骨与麻油背后，全是五年前不动声色铺好的甲等戍边营暗桩。',
    paragraphs: PARSED_CHAPTERS.ch9.paragraphs,
    marginNotes: [
      {
        anchor: '“甲等戍边营金疮止血散”',
        title: '以微末物证替代旁白科普',
        note: '通过买排骨闻出军营药味、碰翻油葫芦试出李大娘凌空稳手，让楚越自己拼出真相却暂不戳破。',
      },
    ],
  },
  {
    id: 'ch-10',
    folio: 'FOLIO X',
    volume: '卷一 · 南荒赊命铺（撩拨篇）',
    title: PARSED_CHAPTERS.ch10.title || '第十章 月圆前的试探交易',
    wordCount: `约 ${PARSED_CHAPTERS.ch10.paragraphs.join('').length} 字`,
    mood: '反向拿捏 × 暖意松动',
    epigraph: '想让我痛快画押结案？那下回十六夜渡灵，大司命记得多披件厚实夹袄。',
    paragraphs: PARSED_CHAPTERS.ch10.paragraphs,
    marginNotes: [
      {
        anchor: '“下回穿厚些。”',
        title: '暧昧主动权正式倒向受',
        note: '以一杯红糖姜枣茶与一句极干脆的妥协，把冷肃大司命的耳廓泛红写得节制又钩人。',
      },
    ],
  },
  {
    id: 'ch-11',
    folio: 'FOLIO XI',
    volume: '卷一 · 南荒赊命铺（智斗篇）',
    title: PARSED_CHAPTERS.ch11.title || '第十一章 勘验玉符困局',
    wordCount: `约 ${PARSED_CHAPTERS.ch11.paragraphs.join('').length} 字`,
    mood: '公堂交锋 × 律法反击',
    epigraph: '陆砚寒拿司命台勘验玉符封死太渊剑，却忘了昔日天机榜魁首比谁都熟《三界契约律》。',
    paragraphs: PARSED_CHAPTERS.ch11.paragraphs,
    marginNotes: [
      {
        anchor: '“活契现行，不候勘验”',
        title: '以智斗去重，绝不重复第 3 章嘴炮',
        note: '用天律条文对撞卡权阴谋，把主角双方的专业能力（算官懂律 + 司命执法）严丝合缝咬合。',
      },
    ],
  },
  {
    id: 'ch-12',
    folio: 'FOLIO XII',
    volume: '卷一 · 南荒赊命铺（暗厢篇）',
    title: PARSED_CHAPTERS.ch12.title || '第十二章 暗厢贴耳与反杀局',
    wordCount: `约 ${PARSED_CHAPTERS.ch12.paragraphs.join('').length} 字`,
    mood: '盲雾贴耳 × 双强合击',
    epigraph: '剑被锁在鞘中，却锁不住同心链渡过来的那一缕纯阳剑意与黑雾里的贴耳呼吸。',
    paragraphs: PARSED_CHAPTERS.ch12.paragraphs,
    marginNotes: [
      {
        anchor: '“借同心链引一缕纯阳剑意”',
        title: '无灵脉算官与被封剑司命的绝妙配合',
        note: '在盲雾狭小暗厢里完成贴耳借剑意破阵，兼顾高燃战力配合与极强贴近张力。',
      },
    ],
  },
  {
    id: 'ch-13',
    folio: 'FOLIO XIII',
    volume: '卷一 · 南荒赊命铺（对质篇）',
    title: PARSED_CHAPTERS.ch13.title || '第十三章 活契现行与赵府对质',
    wordCount: `约 ${PARSED_CHAPTERS.ch13.paragraphs.join('').length} 字`,
    mood: '庭院撕破 × 玉符碎裂',
    epigraph: '活契原件撞上勘验玉符的刹那，银霜尽碎，太渊剑终于等来了清越龙吟。',
    paragraphs: PARSED_CHAPTERS.ch13.paragraphs,
    marginNotes: [
      {
        anchor: '“玉符上浮现出‘活契现行’四个古拙金字”',
        title: '爽感闭环：用天律打碎官场阴谋',
        note: '赵明珠当庭对质亲父的悲凉与玉符碎裂的凌厉交织，顺势把危机推向血傀反扑高潮。',
      },
    ],
  },
  {
    id: 'ch-14',
    folio: 'FOLIO XIV',
    volume: '卷一 · 南荒赊命铺（破契篇）',
    title: PARSED_CHAPTERS.ch14.title || '第十四章 画押出鞘，死契首消',
    wordCount: `约 ${PARSED_CHAPTERS.ch14.paragraphs.join('').length} 字`,
    mood: '剑出正法 × 枯木微燃',
    epigraph: '朱砂落名，剑断画皮；压了五年的三百六十五道死契，终于松动了第一批十块砖。',
    paragraphs: PARSED_CHAPTERS.ch14.paragraphs,
    marginNotes: [
      {
        anchor: '“三百六十五，变作三百五十五”',
        title: '全书主线里程碑首次跳动',
        note: '首次实实在在消解十道替劫死契并让死灰灵脉生出第一粒火星，给读者清晰的长线成长回报。',
      },
    ],
  },
  {
    id: 'ch-15',
    folio: 'FOLIO XV',
    volume: '卷一 · 南荒赊命铺（余波篇）',
    title: PARSED_CHAPTERS.ch15.title || '第十五章 残印玉牌与掩袖遮眼',
    wordCount: `约 ${PARSED_CHAPTERS.ch15.paragraphs.join('').length} 字`,
    mood: '暗线浮现 × 本能护眼',
    epigraph: '缺角冷石上刻着幽潭与枯棘，而剑光落下的刹那，他下意识抬起白袖遮住了他的眼。',
    paragraphs: PARSED_CHAPTERS.ch15.paragraphs,
    marginNotes: [
      {
        anchor: '“半汪深不见底的漆黑幽潭，潭边斜插着几根干枯扭曲的铁棘”',
        title: '严格守住信息锁：只给视觉意象不剧透地名',
        note: '用冷石纹路与苦药气味暗接远线，同时借抬袖遮眼和剧烈心跳把两人情绪推至新高度。',
      },
    ],
  },
  {
    id: 'ch-16',
    folio: 'FOLIO XVI',
    volume: '卷一 · 南荒赊命铺（敷药篇）',
    title: PARSED_CHAPTERS.ch16.title || '第十六章 东屋药罐与半寸旧伤',
    wordCount: `约 ${PARSED_CHAPTERS.ch16.paragraphs.join('').length} 字`,
    mood: '旧伤揭破 × 温柔立约',
    epigraph: '熬了满屋苦药的雷公藤终究没瞒住，半瓶留着保命的玉露生肌膏，换来一声低稳的“好”。',
    paragraphs: PARSED_CHAPTERS.ch16.paragraphs,
    marginNotes: [
      {
        anchor: '“赫然盘踞着一道半寸多宽、焦黑溃烂的暗紫雷灼伤痕”',
        title: '正式回收 F-03 东屋药罐伏笔',
        note: '从第 2 章铺垫至今的袖口焦血气终于落地，楚越嘴硬心软替人涂药，双向奔赴感拉满。',
      },
    ],
  },
  {
    id: 'ch-17',
    folio: 'FOLIO XVII',
    volume: '卷一 · 城西旧窑案（启幕篇）',
    title: PARSED_CHAPTERS.ch17.title || '第十七章 城西旧窑与无名药渣',
    wordCount: `约 ${PARSED_CHAPTERS.ch17.paragraphs.join('').length} 字`,
    mood: '新案起风 × 错钱再现',
    epigraph: '三个拉柴失忆的码头苦力、三枚少一竖的太平通宝，以及袖褶里一点冷铁灰苦药渣。',
    paragraphs: PARSED_CHAPTERS.ch17.paragraphs,
    marginNotes: [
      {
        anchor: '“黑附子配冷铁灰，这哪是给人治病的方子”',
        title: '无缝切入卷一第二单元：废窑试药桩',
        note: '把赵府案遗留的错字铜钱和残印药味直接串进城西码头奇案，全书主线紧密咬合不散架。',
      },
    ],
  },
  {
    id: 'ch-18',
    folio: 'FOLIO XVIII',
    volume: '卷一 · 城西旧窑案（雨巷篇）',
    title: PARSED_CHAPTERS.ch18.title || '第十八章 盲翁修伞与雨巷旧桩',
    wordCount: `约 ${PARSED_CHAPTERS.ch18.paragraphs.join('').length} 字`,
    mood: '共伞听雨 × 坦诚旧部',
    epigraph: '偏斜的桐油伞被轻轻推回正中；那满巷子的街坊不是监视的眼线，而是五年前无处安放的旧部。',
    paragraphs: PARSED_CHAPTERS.ch18.paragraphs,
    marginNotes: [
      {
        anchor: '“这样便都淋不着了。”',
        title: '雨中推伞与说破街坊底细的双重破冰',
        note: '借周三爷修伞抛出中州灰袍游方药商线索，又在归途雨幕下彻底拆开雨巷退伍旧部的心结。',
      },
    ],
  },
  {
    id: 'ch-19',
    folio: 'FOLIO XIX',
    volume: '卷一 · 城西旧窑案（夜探篇）',
    title: PARSED_CHAPTERS.ch19.title || '第十九章 废窑暗探与冷铁炉灰',
    wordCount: `约 ${PARSED_CHAPTERS.ch19.paragraphs.join('').length} 字`,
    mood: '雨夜潜探 × 湿火破围',
    epigraph: '三座烧着冷铁暗灰的青铜药炉、编号甲乙丙丁的试药活人，以及寒雨里并肩冲出白雾的背影。',
    paragraphs: PARSED_CHAPTERS.ch19.paragraphs,
    marginNotes: [
      {
        anchor: '“甲字三号”',
        title: '直击谢峥隐痛的冰冷编号',
        note: '先账后刑下攻连鞘剑死守窑口，受借湿砖引水炸开白雾摸出成丸与竹牌，动作戏紧凑克制。',
      },
    ],
  },
  {
    id: 'ch-20',
    folio: 'FOLIO XX',
    volume: '卷一 · 城西旧窑案（灯火篇）',
    title: PARSED_CHAPTERS.ch20.title || '第二十章 药丸异香与三丈灯火',
    wordCount: `约 ${PARSED_CHAPTERS.ch20.paragraphs.join('').length} 字`,
    mood: '灯下交心 × 并肩立约',
    epigraph: '碾碎的寒髓丸里飘出他衣襟底下的陈年苦香；可他没有逼问，只推来一碗滚烫姜骨汤。',
    paragraphs: PARSED_CHAPTERS.ch20.paragraphs,
    marginNotes: [
      {
        anchor: '“往后咱俩可得把背靠严实了”',
        title: '前二十章阶段性情感圆满收束',
        note: '受点破药味同源却体贴收匣，三丈之间微亮的淡金锁丝从束缚变成踏实归处，稳稳吊起第 21 章封窑救人悬念。',
      },
    ],
  },
];

export interface WorldRuleCard {
  id: string;
  tag: string;
  title: string;
  points: string[];
}

export interface ChapterBeat {
  chapter: string;
  title: string;
  status: '已定稿' | '待写';
  summary: string;
  tension: string;
}

export const WORLD_SYSTEM_RULES: WorldRuleCard[] = [
  {
    id: 'descent-limit',
    tag: '战力防崩补丁',
    title: '《司命下凡三道禁制》与先账后刑律',
    points: [
      '降凡印压制：神官离界必须压制修为至所处界域阈值（南荒仅限金丹巅峰至元婴初阶），强行破封必遭执法雷反噬神魂与同心链。',
      '太渊剑先账后刑律：因果裁决之剑唯在查清账目、集齐人证物证且经天机官画押定案后方可出鞘——制度锁死大司命离不开楚越破案。',
      '跨界滞后：非动用最高“折玉急令”不可调动天军，破局必须依赖当地暗桩、百工行话与民间线索。',
    ],
  },
  {
    id: 'no-mana-combat',
    tag: '受战力体系',
    title: '楚越“无灵脉算道三策”',
    points: [
      '天机眼看契：一眼看透《赊命契》乌黑命丝、影脚破绽、反噬时辰与施术者命门。',
      '“不赊”紫毫借阵：不耗自身灵力，专在敌招余波与地脉节点画反算阵纹，借敌人灵力引爆其自身阴契反噬业火。',
      '定命册与借剑：危急时以《太虚定命册》冻结一息因果，或经同心链借调一缕太渊纯阳剑意画符破阵。',
    ],
  },
  {
    id: 'dual-progress',
    tag: '400 章双脉消长',
    title: '替劫死契消解（365→0）× 枯木回春五候',
    points: [
      '功德折抵律：世家“冲抵三成死契”靠的是门阀供奉的敕封香火功德碑；主角团每拆一宗《赊命契》救回阳寿，天道便自动消解 10–25 道替劫死契。',
      '枯木回春五候：死灰（卷一二）→ 抽芽（卷三北境）→ 凝脉（卷四五）→ 通窍（卷六）→ 圆满（卷七死契尽销重塑）。',
      '双病源分离：十五天雷源于三百六十五道替劫死契反噬；十六寒毒源于 480 年前代扛九死劫渗入髓海的极寒余毒。',
    ],
  },
  {
    id: 'five-contracts',
    tag: '五宗邪契图谱',
    title: '《人间赊命契》五毒阴契黑行',
    points: [
      '画皮阴契（赊三十年阳寿换容貌天赋，月圆吞影）与借寿冥契（买断穷苦八字配阴婚转死劫）。',
      '长生寿丹契（名门借护山消耗抽外门生机炼丹）与盗文脉契（窃取寒门士子十年气运）。',
      '清白赎罪契（陆氏等顶级门阀买断折辱落魄天才的卖身死契）。',
    ],
  },
];

export const LOGIC_AUDIT_PATCHES: WorldRuleCard[] = [
  {
    id: 'non-recognition',
    tag: '马甲铁壁补丁',
    title: '480 年前同朝为官，为何楚越没认出他？',
    points: [
      '万劫潭少年当年无名无姓、满脸毒疤溃烂且声带被试药烧哑。',
      '飞升后渡劫重塑仙骨容貌蜕变并改姓为“谢”；初入司命台常年戴遮住上半张脸眉骨与鼻梁颧侧的寒铁镂羽半面面具防窥。',
      '司命主官受“天律神印”遮蔽命格，天机榜魁首都算不到其过去，故当年只当他是怪脾气同僚顺手替他扛了一劫。',
    ],
  },
  {
    id: 'five-years-delay',
    tag: '蓄谋时间线补丁',
    title: '改判死刑后，谢峥为何硬忍五年才下凡？',
    points: [
      '天庭清场：在九重天顶住玉清天尊与陆氏派系追查，血洗并架空司命库卷宗房防止二次复审。',
      '布控南荒：亲调王猛（王屠户）、李素秋（李大娘）与周三爷替换巷口街坊，斩断外敌与退路。',
      '心血炼链：耗时五年以心血重铸四重锁脉同心锁命链，掐准《太虚定命册》五年保命极限将尽方才踹门落子。',
    ],
  },
  {
    id: 'tgcf-craft',
    tag: '《天官》神韵 × 《燕云》江湖',
    title: '去皮留骨四大融入法则（零抄袭红线）',
    points: [
      '尘埃里的体面幽默：受虽窝在漏雨破铺子拿秘典垫咸菜缸，却从不苦情，带着跌不碎的贵气与市井鲜活笑意。',
      '极端偏心铺台阶：外人踩受落魄时，攻不动声色撑回他全部体面，烟火日常下藏着五百年凝望与恶犬独占欲。',
      '先立人、后撩情：剔除开篇机械记账腔与强行发糖，让人物腔调、百工风物与物证留白把情感自然烘热。',
    ],
  },
  {
    id: 'spoiler-locks',
    tag: '保密锁与节奏控制',
    title: '绝不提前剧透清单（分卷解锁）',
    points: [
      '卷一（1–55 章）：由赵府画皮、城西废窑试药、荒村冥婚、鬼窟收网四段紧凑撑实，第 11–12 章用勘验玉符智斗去重。',
      '卷三（116–175 章）：先回收雪夜交剑立誓与卷一至卷三途中心血暗缝的九张护心符。',
      '卷六（296–340 章）：归墟镜渊彻底掀开万劫潭麦饼、太渊九死劫死契与五年《死刑改判书》底牌。',
    ],
  },
];

export const VOL1_BEATS: ChapterBeat[] = [
  {
    chapter: '第 01 章',
    title: '雨巷算官与避雷槐',
    status: '已定稿',
    summary: '借南荒雨巷生计与阿财/王屠户侧写立住楚越脾性；谢峥携《降凡印》登门扣链，交代清楚五年前替劫死契旧事与两人昔日同僚渊源。',
    tension: '先立人物与关系立场，去掉滑稽算账梗，擦净旧书与掀坛威胁尽显冷肃。',
  },
  {
    chapter: '第 02 章',
    title: '十五夜雷与东屋焦香',
    status: '已定稿',
    summary: '子时雷煞反噬，金链暗中分流三成；晨起谢峥静默端来热姜汤并把脉查探，两人围绕“先账后刑”与袖口焦糊血腥气首次过招。',
    tension: '克制交锋取代强行暧昧，以细节暗涌勾出“大司命究竟图什么”的悬念。',
  },
  {
    chapter: '第 03 章',
    title: '故人折扇与未消契',
    status: '已定稿',
    summary: '陆砚寒携“清白赎罪契”上门羞辱，带出楚越昔日魁首荣辱；谢峥亮链冷斥撵人，人走后楚越直问五年变故，接入城南赵府诡案。',
    tension: '外部宿敌反衬护短重量，水到渠成把 BL 拉扯带入查案同行。',
  },
  {
    chapter: '第 04 章',
    title: '城南无影尸与妆镜偏',
    status: '已定稿',
    summary: '两人赴赵府验尸查案（赵明珠贴身丫鬟秋棠无影暴毙，无缝承接第 3 章钩子）；菱花妆镜照见影子慢半拍且看穿赵元德藏私。',
    tension: '以醋石灰与朱砂落桩印写实查案，背风回廊里大司命不动声色换位挡寒。',
  },
  {
    chapter: '第 05 章',
    title: '无面画师与错字铜钱',
    status: '已定稿',
    summary: '摸进三更鬼市画摊遇修伞盲老头周三爷暗中挡镖；画皮影兽突袭阿财，受首次用“不赊”紫毫借脏墨反噬击溃影祟。',
    tension: '坐实受“无灵脉照样能打”的高能战力，捡到令谢峥呼吸一滞的错字铜钱。',
  },
  {
    chapter: '第 06 章',
    title: '十六寒毒与近身渡气',
    status: '已定稿',
    summary: '回铺子夜十六寒毒爆发，经脉受不住隔空渡气，谢峥将人扣进怀里以纯阳本源硬压寒潮，半昏迷间受闻见更深处的旧血药香。',
    tension: '经过五章铺垫后首次贴身渡灵，生理刚需与心防交锋自然水到渠成。',
  },
  {
    chapter: '第 07 章',
    title: '三丈之外的血腥线',
    status: '已定稿',
    summary: '受踩着三丈极限跑进废巷诱敌暗测链纹惩戒；金链刚绷紧一寸，谢峥直接破墙杀到并拎回身侧，搜得陆氏焚卷密笺。',
    tension: '试探攻的底线：链子绝不勒伤受，但受超界一步攻会先失控。',
  },
  {
    chapter: '第 08 章',
    title: '赵府地窖里的生辰八字',
    status: '已定稿',
    summary: '夜探地窖揭破悲剧真相：亲父赵元德偷拿女儿八字典去抵沉船债；现场突遭陆氏绿火焚毁，攻以右臂挡梁护受抢出残页。',
    tension: '照见至亲背叛的人性凉薄，把暗算线索扣回中州银庄与陆砚寒。',
  },
  {
    chapter: '第 09 章',
    title: '王屠户的旧刀伤',
    status: '已定稿',
    summary: '借买排骨麻油试探街坊，闻出王屠户甲等戍边营金疮止血散，见李大娘凌空稳接油葫芦，彻底坐实整条街都是谢峥旧部。',
    tension: '受心里亮如明镜却忍住不戳破，开始享受棋局反控感。',
  },
  {
    chapter: '第 10 章',
    title: '月圆前的试探交易',
    status: '已定稿',
    summary: '受按住茶盏拿画押作筹码调侃：“下回渡灵别只披单衣，冻着我算谁的？”攻耳廓泛红应下“下回穿厚些”并斟姜枣茶。',
    tension: '暧昧主动权正式倒向受，敲定次日巡检司守株待兔之策。',
  },
  {
    chapter: '第 11–12 章',
    title: '勘验玉符困局与暗厢贴耳',
    status: '已定稿',
    summary: '周平持《勘验玉符》封锁太渊剑；受背出《三界契约律》第十九条立赌约，夜袭鬼市画舫暗厢贴耳借剑意破阵拿人夺原契。',
    tension: '用智斗权谋与暗厢贴耳呼吸感引爆双强配合爽点。',
  },
  {
    chapter: '第 13–15 章',
    title: '赵府结案、死契首消与残印遮眼',
    status: '已定稿',
    summary: '清晨赵府对质震碎玉符，受画押定案、太渊剑出鞘斩血傀破阴契，死契首消十道（365→355）；土地庙获幽潭枯棘冷石玉牌，攻抬袖替受遮眼。',
    tension: '第一单元圆满闭环，严格守住信息锁不泄底，自然接入暗线。',
  },
  {
    chapter: '第 16 章',
    title: '东屋药罐与半寸旧伤',
    status: '已定稿',
    summary: '阿财撞翻东屋屏风露出雷公藤药罐；受卷开攻左袖见半寸焦黑雷灼旧伤，亲手敷玉露生肌膏并立约往后不准瞒伤。',
    tension: '回收 F-03 伏笔，双向心防彻底松动。',
  },
  {
    chapter: '第 17–18 章',
    title: '城西旧窑药渣与盲翁修伞',
    status: '已定稿',
    summary: '码头苦力拉柴失忆青甲牵出错字铜钱与冷铁灰药渣；周三爷点破中州灰袍游方药商旧闻，归途共伞点破雨巷退伍旧部渊源。',
    tension: '无缝转入卷一第二单元【城西废窑试药案】，烟火日常与暗流齐推。',
  },
  {
    chapter: '第 19–20 章',
    title: '废窑夜探、寒髓异香与三丈灯火',
    status: '已定稿',
    summary: '夜探废窑夺得“甲字三号”竹牌与《寒髓丸》；归铺油灯下受认出药味与攻旧药同源却体贴不逼问，共喝姜汤立下并肩之约。',
    tension: '二十章情感节点圆满收束，定下明早封窑救人硬钩子。',
  },
  {
    chapter: '第 21–25 章',
    title: '突击封窑救人、解毒溯源与灰袍药商现身',
    status: '待写',
    summary: '次晨借王屠户通官府以查私铸铜钱突击封窑救出两名昏迷散修，受配药稳毒问出试药契约真相，顺藤摸瓜锁定中州灰袍药商在南荒的暗桩。',
    tension: '废窑案正式进入收网筹备与中州势力正面碰撞。',
  },
];
