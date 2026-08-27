export const Schema = z.object({
  系统: z.object({
    当前幕次: z.coerce.number().transform(value => (Number.isFinite(value) ? _.clamp(value, 1, 24) : 1)).prefault(1),
    当前时间: z.string().prefault('待初始化'),
    当前场景: z.string().prefault('待初始化'),
  }).prefault({}),
  知情度: z.object({
    王明: z.object({
      知黄莉性奴经历: z.boolean().prefault(false),
      知乐乐堕落: z.enum(['不知', '论坛见闻', '怀疑', '确认', '撞破全知']).prefault('不知'),
      知乐乐13岁伏笔: z.boolean().prefault(false),
      知圣魔论坛依s身份: z.boolean().prefault(false),
      知乐乐怀孕孩子父亲不明: z.boolean().prefault(false),
      知乐乐被设计: z.boolean().prefault(false),
    }).prefault({}),
    乐乐: z.object({
      知王明嫖娼: z.boolean().prefault(false),
      知黄莉与王明关系: z.boolean().prefault(false),
    }).prefault({}),
    黄莉: z.object({
      知乐乐被设计: z.boolean().prefault(false),
    }).prefault({}),
    张蕾: z.object({
      知乐乐被设计: z.boolean().prefault(false),
    }).prefault({}),
    杨芯: z.object({
      知乐乐与李力关系: z.boolean().prefault(false),
      知李力设计乐乐: z.boolean().prefault(false),
    }).prefault({}),
  }).prefault({}),
  身体状态: z.record(
    z.enum(['乐乐', '黄莉', '林诗音', '白灵']),
    z.object({
      当前幕: z.coerce.number().transform(value => (Number.isFinite(value) ? _.clamp(value, 1, 24) : 1)).prefault(1),
    }).prefault({}),
  ).prefault({}),
  关系状态: z.object({
    王明_乐乐: z.enum(['幸福', '隐忍', '分居', '貌合神离', '决裂', '释怀']).prefault('幸福'),
    王明_黄莉: z.enum(['上下级', '暧昧', '偷情', '切割', '重燃', '结婚']).prefault('上下级'),
    乐乐_李力: z.enum(['无', '同事', '被攻略', '性奴', '切割', '再堕', '亡命']).prefault('无'),
  }).prefault({}),
  剧情标记: z.object({
    已触发事件: z.array(z.string()).prefault([]),
    待触发事件: z.array(z.string()).prefault([]),
  }).prefault({}),
}).prefault({});

export type Schema = z.output<typeof Schema>;
