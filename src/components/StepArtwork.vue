<script setup lang="ts">
import DoodleAthlete from './DoodleAthlete.vue'
import { useSitePreferences } from '../composables/preferences'
defineProps<{ index: number }>()
const { t } = useSitePreferences()
</script>
<template>
<div v-if="index === 0" class="step-art draw-art"><svg viewBox="0 0 330 205" aria-hidden="true"><path d="M72 38L245 31L255 177L83 185Z" fill="#fffdf6" stroke="#30362b" stroke-width="2" /><path d="M94 63L126 62M96 73L115 72" stroke="#c5c9b9" stroke-width="2" /><path d="M260 51L270 43L283 59L274 68L250 87L245 78Z" fill="#c2e88d" stroke="#30362b" stroke-width="2" /><path d="M245 78L241 91L251 87M269 48L277 57" stroke="#30362b" stroke-width="2" /><path d="M36 85L44 89L40 97L33 92ZM283 130L291 133M287 124V139" stroke="#30362b" stroke-width="2" /></svg><DoodleAthlete class="drawn-sample" kind="dog" /><span class="art-handwriting">{{ t('drawNote') }}</span></div>
<div v-else-if="index === 1" class="step-art name-art"><DoodleAthlete kind="blob" color="#c3cbec" /><div class="name-sticker"><span>{{ t('helloName') }}</span><strong>{{ t('cloudName') }}</strong><span class="sticker-star">✧</span></div></div>
<div v-else-if="index === 2" class="step-art podium-art"><svg viewBox="0 0 330 205" aria-hidden="true"><path d="M56 184V150H123V112H205V155H269V184" fill="#d2e6ab" stroke="#30362b" stroke-width="2" /><text x="157" y="152" font-size="25" font-family="monospace" fill="#30362b">1</text><text x="79" y="177" font-size="20" font-family="monospace" fill="#30362b">2</text><text x="229" y="180" font-size="20" font-family="monospace" fill="#30362b">3</text><path d="M94 43L88 54M236 40L243 50M219 72L231 73M108 78L99 81M164 23V34" stroke="#f16c46" stroke-width="3" stroke-linecap="round" /></svg><DoodleAthlete kind="frog" color="#e3edc8" /></div>
</template>
