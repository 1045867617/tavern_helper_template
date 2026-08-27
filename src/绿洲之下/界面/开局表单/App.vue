<script setup lang="ts">
import { ref } from 'vue';
import { useDataStore } from '../store';
import { createChatMessages } from '@types/function/chat_message';
import { triggerSlash } from '@types/function/slash';

const store = useDataStore();
const selected = ref('');

const options = [
  {
    id: 'career',
    title: '投入工作',
    desc: '钻石酒店新项目是个机会，先把它做漂亮，给果果挣幼儿园学费。',
    message: '我决定先专注钻石酒店的项目，把工作做好。',
  },
  {
    id: 'family',
    title: '陪伴家人',
    desc: '乐乐在家等我，果果还小，工作再忙也该多回家。',
    message: '我决定多陪陪乐乐和果果，工作之余留时间给家人。',
  },
  {
    id: 'watch',
    title: '静观其变',
    desc: '感觉最近有什么事不太对劲，先不动声色，看看会发生什么。',
    message: '我打算先静观其变，留意身边的变化。',
  },
];

async function submit() {
  const opt = options.find((o) => o.id === selected.value);
  if (!opt) return;
  await createChatMessages([{ role: 'user', name: '王明', message: opt.message }]);
  triggerSlash('/trigger');
}
</script>

<template>
  <div class="opening-form">
    <div class="form-title">绿洲之下</div>
    <div class="form-sub">东州，某个寻常的早晨，命运正从你脚下展开。</div>

    <div class="options">
      <div
        v-for="opt in options"
        :key="opt.id"
        class="option"
        :class="{ selected: selected === opt.id }"
        @click="selected = opt.id"
      >
        <div class="option-title">{{ opt.title }}</div>
        <div class="option-desc">{{ opt.desc }}</div>
      </div>
    </div>

    <button class="submit" :disabled="!selected" @click="submit">开始</button>
  </div>
</template>

<style scoped>
.opening-form {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background: var(--c-surface, #221f1b);
  border: 1px solid var(--c-border, #3a352e);
  border-radius: 8px;
}
.form-title {
  color: var(--c-primary, #c9a86a);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.form-sub {
  color: var(--c-muted, #8a8276);
  font-size: 12px;
  text-align: center;
  margin: 6px 0 16px;
}
.options { display: flex; flex-direction: column; gap: 8px; }
.option {
  border: 1px solid var(--c-border, #3a352e);
  border-radius: 6px;
  padding: 10px 12px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.option:hover { border-color: var(--c-primary, #c9a86a); }
.option.selected {
  border-color: var(--c-primary, #c9a86a);
  background: rgba(201, 168, 106, 0.1);
}
.option-title { color: var(--c-highlight, #e8e3da); font-size: 14px; font-weight: bold; }
.option-desc { color: var(--c-muted, #8a8276); font-size: 12px; margin-top: 3px; }
.submit {
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: var(--c-primary, #c9a86a);
  color: #1a1816;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}
.submit:disabled { background: #4a453c; color: #8a8276; cursor: not-allowed; }
</style>