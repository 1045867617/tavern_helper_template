<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();
const expanded = ref(false);

const act = computed(() => store.data.系统?.当前幕次 ?? 1);

const stageLabel = computed(() => {
  const a = act.value;
  if (a >= 1 && a <= 7) return '幸福与暗涌';
  if (a >= 8 && a <= 10) return '堕落与怀疑';
  if (a >= 11 && a <= 14) return '沉沦与重圆';
  if (a >= 15 && a <= 18) return '貌合神离与决裂';
  if (a >= 19 && a <= 21) return '真相与入狱';
  return '翻盘与结局';
});

const wangLel = computed(() => store.data.关系状态?.王明_乐乐 ?? '幸福');
const wangHuang = computed(() => store.data.关系状态?.王明_黄莉 ?? '上下级');
const lelLili = computed(() => store.data.关系状态?.乐乐_李力 ?? '无');

const bodyStages = computed(() => {
  const bs = store.data.身体状态 ?? {};
  return [
    { name: '乐乐', stage: bs.乐乐?.当前幕 ?? 1 },
    { name: '黄莉', stage: bs.黄莉?.当前幕 ?? 1 },
    { name: '林诗音', stage: bs.林诗音?.当前幕 ?? 1 },
    { name: '白灵', stage: bs.白灵?.当前幕 ?? 1 },
  ];
});

const knowledgeItems = computed(() => {
  const k = store.data.知情度 ?? {};
  const wm = k.王明 ?? {};
  const ll = k.乐乐 ?? {};
  const hl = k.黄莉 ?? {};
  return [
    { label: '王明·知黄莉经历', value: wm.知黄莉性奴经历 ? '知' : '不知' },
    { label: '王明·知乐乐堕落', value: wm.知乐乐堕落 ?? '不知' },
    { label: '王明·知乐乐13岁伏笔', value: wm.知乐乐13岁伏笔 ? '知' : '不知' },
    { label: '王明·知乐乐被设计', value: wm.知乐乐被设计 ? '知' : '不知' },
    { label: '乐乐·知王明嫖娼', value: ll.知王明嫖娼 ? '知' : '不知' },
    { label: '乐乐·知黄莉与王明', value: ll.知黄莉与王明关系 ? '知' : '不知' },
    { label: '黄莉·知乐乐被设计', value: hl.知乐乐被设计 ? '知' : '不知' },
  ];
});

const storyMarked = computed(() => {
  const m = store.data.剧情标记 ?? {};
  return {
    done: m.已触发事件 ?? [],
    pending: m.待触发事件 ?? [],
  };
});

const dangerLevel = computed(() => {
  const lelStage = store.data.身体状态?.乐乐?.当前幕 ?? 1;
  if (lelStage >= 11) return 'danger';
  if (lelStage >= 9) return 'accent';
  return 'normal';
});

function relClass(v: string) {
  if (['幸福', '结婚', '重燃', '释怀'].includes(v)) return 'happy';
  if (['决裂', '再堕', '亡命', '貌合神离'].includes(v)) return 'bad';
  if (['偷情', '性奴', '暧昧'].includes(v)) return 'warn';
  return '';
}

function stageClass(s: number) {
  if (s >= 11) return 'danger';
  if (s >= 9) return 'warn';
  return 'happy';
}
</script>

<template>
  <div class="status-bar" :class="dangerLevel">
    <div class="title-bar" @click="expanded = !expanded">
      <div class="title-left">
        <span class="title-name">绿洲之下</span>
        <span class="title-act">第{{ act }}幕 · {{ stageLabel }}</span>
      </div>
      <div class="title-right">
        <span class="badge" :class="relClass(wangLel)">王明×乐乐：{{ wangLel }}</span>
        <span class="chevron">{{ expanded ? '▲' : '▼' }}</span>
      </div>
    </div>

    <div v-if="expanded" class="expand-area">
      <div class="section">
        <div class="section-title">关系状态</div>
        <div class="grid">
          <div class="cell">
            <span class="cell-label">王明 × 乐乐</span>
            <span class="cell-value" :class="relClass(wangLel)">{{ wangLel }}</span>
          </div>
          <div class="cell">
            <span class="cell-label">王明 × 黄莉</span>
            <span class="cell-value">{{ wangHuang }}</span>
          </div>
          <div class="cell">
            <span class="cell-label">乐乐 × 李力</span>
            <span class="cell-value" :class="{ danger: lelLili === '性奴' || lelLili === '再堕' }">{{ lelLili }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">身体状态幕次</div>
        <div class="grid">
          <div v-for="b in bodyStages" :key="b.name" class="cell">
            <span class="cell-label">{{ b.name }}</span>
            <span class="cell-value" :class="stageClass(b.stage)">{{ b.stage }}幕</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">知情度</div>
        <div class="grid knowledge">
          <div v-for="k in knowledgeItems" :key="k.label" class="cell">
            <span class="cell-label">{{ k.label }}</span>
            <span class="cell-value" :class="k.value === '不知' ? 'muted' : 'known'">{{ k.value }}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">剧情标记</div>
        <div class="story-block">
          <div v-if="storyMarked.done.length" class="story-group">
            <span class="story-label">已触发</span>
            <span v-for="e in storyMarked.done" :key="e" class="story-tag done">{{ e }}</span>
          </div>
          <div v-if="storyMarked.pending.length" class="story-group">
            <span class="story-label">待触发</span>
            <span v-for="e in storyMarked.pending" :key="e" class="story-tag pending">{{ e }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  border: 1px solid var(--c-border);
  border-radius: 6px;
  background: var(--c-surface);
  overflow: hidden;
  transition: border-color 0.4s;
}
.status-bar.danger { border-color: var(--c-danger); }
.status-bar.accent { border-color: var(--c-accent); }

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
}
.title-bar:hover { background: rgba(255, 255, 255, 0.03); }

.title-left { display: flex; align-items: baseline; gap: 10px; }
.title-name { color: var(--c-primary); font-weight: bold; font-size: 14px; }
.title-act { color: var(--c-muted); }

.title-right { display: flex; align-items: center; gap: 10px; }
.chevron { color: var(--c-muted); font-size: 10px; }

.badge {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  background: var(--c-background);
}
.badge.happy { color: var(--c-primary); }
.badge.warn { color: var(--c-accent); }
.badge.bad { color: var(--c-danger); }

.expand-area { padding: 0 12px 12px; }

.section { margin-top: 10px; }
.section-title {
  font-size: 12px;
  color: var(--c-muted);
  border-bottom: 1px solid var(--c-border);
  padding-bottom: 4px;
  margin-bottom: 8px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 6px;
}
.grid.knowledge { grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }

.cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--c-background);
  border-radius: 4px;
  padding: 5px 8px;
}
.cell-label { font-size: 11px; color: var(--c-muted); }
.cell-value { font-size: 13px; color: var(--c-highlight); }
.cell-value.happy { color: var(--c-primary); }
.cell-value.warn { color: var(--c-accent); }
.cell-value.danger { color: var(--c-danger); }
.cell-value.muted { color: var(--c-muted); }
.cell-value.known { color: var(--c-primary); }

.story-block { display: flex; flex-direction: column; gap: 6px; }
.story-group { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.story-label { font-size: 11px; color: var(--c-muted); }
.story-tag {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 3px;
}
.story-tag.done { background: rgba(201, 168, 106, 0.15); color: var(--c-primary); }
.story-tag.pending { background: rgba(122, 59, 46, 0.2); color: var(--c-accent); }
</style>