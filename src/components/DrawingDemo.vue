<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import DoodleAthlete from './DoodleAthlete.vue'
import { useSitePreferences } from '../composables/preferences'
import type { MessageKey } from '../data/messages'
const { t } = useSitePreferences()

type Stroke = { points: { x: number; y: number }[]; color: string }
const board = ref<SVGSVGElement>()
const raceTrack = ref<HTMLElement>()
const strokes = ref<Stroke[]>([])
const color = ref('#292e23')
const colors = ['#292e23', '#f16c46', '#788bc5', '#27b77c']
const colorNames: MessageKey[] = ['inkBlack', 'inkCoral', 'inkBlue', 'inkGreen']
const activePointer = ref<number | null>(null)
const stage = ref<'draw' | 'racing' | 'finished'>('draw')
const statusKey = ref<MessageKey>('demoInitial')
const announcement = computed(() => stage.value === 'finished' ? t('demoPlace', { rank: ranking.value }) + t(ranking.value === 1 ? 'demoWin' : 'demoFinish') : t(statusKey.value))
const ranking = ref(1)
let timeline: gsap.core.Timeline | undefined
const hasSample = ref(true)
const hasDrawing = computed(() => hasSample.value || strokes.value.length > 0)
const paths = computed(() => strokes.value.map(stroke => ({ color: stroke.color, d: stroke.points.map((point, index) => `${index ? 'L' : 'M'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ') })))

function startStroke(event: PointerEvent) {
  if (stage.value !== 'draw' || activePointer.value !== null || (event.pointerType === 'mouse' && event.button !== 0)) return
  activePointer.value = event.pointerId
  hasSample.value = false
  board.value?.setPointerCapture(event.pointerId)
  strokes.value.push({ points: [], color: color.value })
  moveStroke(event)
  const point = strokes.value[strokes.value.length - 1]?.points[0]
  if (point) strokes.value[strokes.value.length - 1]!.points.push({ x: point.x + 0.1, y: point.y + 0.1 })
}
function moveStroke(event: PointerEvent) {
  if (activePointer.value !== event.pointerId || !board.value) return
  const matrix = board.value.getScreenCTM()?.inverse()
  if (!matrix) return
  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix)
  const stroke = strokes.value[strokes.value.length - 1]
  if (stroke) stroke.points.push({ x: Math.max(8, Math.min(472, point.x)), y: Math.max(8, Math.min(252, point.y)) })
}
function endStroke(event: PointerEvent) {
  if (activePointer.value !== event.pointerId) return
  if (board.value?.hasPointerCapture(event.pointerId)) board.value.releasePointerCapture(event.pointerId)
  activePointer.value = null
}
function clearDrawing() { strokes.value = []; hasSample.value = false; statusKey.value = 'demoCleared' }
function undo() { if (strokes.value.length) strokes.value.pop(); else hasSample.value = false }
function useSample() { strokes.value = []; hasSample.value = true; statusKey.value = 'demoSample' }
async function startRace() {
  if (!hasDrawing.value || stage.value !== 'draw') return
  activePointer.value = null
  stage.value = 'racing'
  statusKey.value = 'demoRacing'
  ranking.value = 1 + Math.floor(Math.random() * 3)
  await nextTick()
  const racers = raceTrack.value?.querySelectorAll<HTMLElement>('.mini-racer')
  if (!racers?.length || !raceTrack.value) return
  const distance = Math.max(80, raceTrack.value.clientWidth - 130)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timeline = gsap.timeline({ onComplete: () => {
    stage.value = 'finished'
  } })
  const times = [3.3 + (ranking.value - 1) * 0.6, ranking.value === 1 ? 4.1 : 3.3, ranking.value === 3 ? 3.8 : 4.5]
  racers.forEach((racer, index) => {
    timeline!.to(racer, { x: distance, duration: reducedMotion ? 0.15 : times[index], ease: 'power1.inOut' }, 0.45)
    if (!reducedMotion) timeline!.to(racer.querySelector('.mini-athlete'), { y: -9, rotation: 4, duration: 0.13, repeat: Math.floor(times[index]! / 0.13) - 1, yoyo: true, ease: 'sine.inOut' }, 0.45)
  })
}
function resetRace() { timeline?.kill(); stage.value = 'draw'; statusKey.value = 'demoReset' }
onBeforeUnmount(() => timeline?.kill())
</script>

<template>
  <div class="demo-workspace">
    <div class="demo-topbar"><span><i class="status-dot" /> {{ t('demoTitle') }}</span><span class="micro">NO RULES. JUST DOODLES.</span></div>
    <div class="demo-body">
      <div v-if="stage === 'draw'" class="drawing-board">
        <span class="board-label">{{ t('boardTitle') }}</span>
        <svg ref="board" viewBox="0 0 480 260" :aria-label="t('boardLabel')" role="img" @pointerdown="startStroke" @pointermove="moveStroke" @pointerup="endStroke" @pointercancel="endStroke" @lostpointercapture="activePointer = null">
          <path v-for="(path, index) in paths" :key="index" :d="path.d" fill="none" :stroke="path.color" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
          <text v-if="!hasDrawing" x="240" y="135" text-anchor="middle" fill="#a5aa98" font-size="17" pointer-events="none">{{ t('boardEmpty') }}</text>
        </svg>
        <DoodleAthlete v-if="hasSample" class="board-sample" kind="dog" />
        <span class="board-hint">{{ t('boardHint') }}</span>
      </div>
      <div v-else ref="raceTrack" class="mini-track" :class="{ finished: stage === 'finished' }" :aria-label="t('raceLabel')">
        <div class="mini-finish" />
        <div v-for="lane in 3" :key="lane" class="mini-lane"><span class="lane-number">0{{ lane }}</span><div class="mini-racer"><div class="mini-athlete"><DoodleAthlete v-if="lane === 1 && hasSample" kind="dog" /><svg v-else-if="lane === 1" viewBox="0 0 480 260"><path v-for="(path, index) in paths" :key="index" :d="path.d" fill="none" :stroke="path.color" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg><DoodleAthlete v-else :kind="lane === 2 ? 'frog' : 'blob'" /></div><span v-if="lane === 1" class="you-tag">{{ t('you') }}</span></div></div>
      </div>
    </div>
    <div class="drawing-tools">
      <div class="color-palette" :aria-label="t('colorsLabel')"><button v-for="(ink, index) in colors" :key="ink" :style="{ '--ink': ink }" :class="{ selected: color === ink }" :aria-label="t(colorNames[index]!)" :aria-pressed="color === ink" :disabled="stage !== 'draw'" @click="color = ink" /></div>
      <div class="edit-tools"><button :disabled="stage !== 'draw' || !hasDrawing" :aria-label="t('undoLabel')" @click="undo">↶ <span>{{ t('undo') }}</span></button><button :disabled="stage !== 'draw' || !hasDrawing" @click="clearDrawing">{{ t('clear') }}</button></div>
    </div>
    <div class="demo-bottom"><p aria-live="polite" role="status">{{ announcement }}</p><div><button v-if="stage === 'draw'" class="text-button" @click="useSample">{{ t('borrow') }}</button><button v-if="stage === 'draw'" class="button button-dark button-small" :disabled="!hasDrawing" @click="startRace">{{ t('raceStart') }} <span>↗</span></button><button v-else class="button button-dark button-small" :disabled="stage === 'racing'" @click="resetRace">{{ t(stage === 'racing' ? 'raceRunning' : 'raceAgain') }}</button></div></div>
  </div>
  <p class="demo-disclaimer">{{ t('demoDisclaimer') }}</p>
</template>
