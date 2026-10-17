<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import StadiumFloodlight from './StadiumFloodlight.vue'

const visible = ref(false)
const nextDark = ref(false)
const phase = ref('blackout')
const overlay = ref<HTMLElement>()
const lamps = [9, 35, 65, 91]
let timeline: gsap.core.Timeline | undefined
let motionPreference: MediaQueryList | undefined
let pendingCommit: (() => void) | undefined
let resolveTransition: (() => void) | undefined

function commitTheme() {
  const commit = pendingCommit
  pendingCommit = undefined
  commit?.()
}
function finish() {
  timeline?.kill()
  timeline = undefined
  commitTheme()
  document.documentElement.classList.remove('stadium-lights-out')
  visible.value = false
  const resolve = resolveTransition
  resolveTransition = undefined
  resolve?.()
}
function updateMotionPreference() { if (motionPreference?.matches) finish() }

async function play(commit: () => void, dark: boolean, focus: {x: number; y: number}) {
  if (visible.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { commit(); return }
  nextDark.value = dark
  document.documentElement.classList.toggle('stadium-lights-out', dark)
  phase.value = dark ? 'lights-out' : 'blackout'
  pendingCommit = commit
  visible.value = true
  await nextTick()
  const element = overlay.value
  if (!element || !visible.value) { finish(); return }
  element.style.setProperty('--stadium-focus-x', `${focus.x}px`)
  element.style.setProperty('--stadium-focus-y', `${focus.y}px`)
  const blackout = element.querySelector('.stadium-blackout')
  const fixtures = element.querySelectorAll('.stadium-fixture')
  const bulbs = element.querySelectorAll('.stadium-bulbs')
  const beams = element.querySelectorAll('.stadium-beam')
  const sweep = [-14, -5, 5, 14]
  gsap.set(blackout, { opacity: 0, '--stadium-radius': '-140px' })
  gsap.set(fixtures, { opacity: 0, y: -34 })
  gsap.set(bulbs, { opacity: dark ? 1 : .08 })
  gsap.set(beams, { opacity: 0, scaleY: .65, xPercent: -50, rotation: (i) => sweep[i]! * 1.8 })
  await new Promise<void>(resolve => {
    resolveTransition = resolve
    timeline = gsap.timeline({ onComplete: finish })
      .to(fixtures, { opacity: 1, y: 0, duration: .16, stagger: .025, ease: 'power2.out' }, 0)
    if (dark) {
      // Lights only lose brightness on the way to night; no relighting or expanding reveal.
      timeline
        .to(bulbs, { opacity: .025, duration: .12, stagger: .065, ease: 'power2.in' }, .12)
        .call(() => {
          commitTheme()
          phase.value = 'night'
        }, [], .4)
    } else {
      timeline
        .to(blackout, { opacity: .98, duration: .25, ease: 'power2.in' }, .03)
        .call(() => { commitTheme(); phase.value = 'relight' }, [], .29)
        .to(bulbs, { opacity: 1, duration: .1, stagger: { amount: .08, from: 'center' }, ease: 'power2.out' }, .34)
        .to(beams, { opacity: .35, scaleY: 1, rotation: (i) => sweep[i]!, duration: .38, stagger: .025, ease: 'power2.out' }, .36)
        .to(blackout, { '--stadium-radius': `${Math.hypot(window.innerWidth, window.innerHeight) + 140}px`, duration: .56, ease: 'power2.inOut' }, .41)
        .to(beams, { opacity: 0, duration: .22, ease: 'power2.in' }, .8)
        .to(blackout, { opacity: 0, duration: .12 }, .92)
    }
    timeline.to(fixtures, { opacity: 0, y: -18, duration: .18, ease: 'power2.in' }, .87)
  })
}
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', updateMotionPreference)
})
onBeforeUnmount(() => {
  motionPreference?.removeEventListener('change', updateMotionPreference)
  finish()
})
defineExpose({ play })
</script>

<template>
  <div v-if="visible" ref="overlay" class="stadium-transition" :class="{ 'to-night': nextDark }" :data-phase="phase" aria-hidden="true">
    <div class="stadium-blackout"/>
    <div v-for="(left, i) in lamps" :key="`beam-${i}`" class="stadium-beam" :style="{left: `${left}%`}"/>
    <div v-for="(left, i) in lamps" :key="i" class="stadium-rig" :style="{left: `${left}%`}">
      <StadiumFloodlight :tilt="i < 2 ? -8 : 8"/>
    </div>
  </div>
</template>

<style scoped>
.stadium-transition {
  --stadium-light: #fff9dd;
  position: fixed; inset: 0; z-index: 100; overflow: hidden; pointer-events: none;
}
.stadium-transition.to-night { --stadium-light: #ffe09b; }
.stadium-blackout {
  position: absolute; inset: 0; background: #0c1512;
  -webkit-mask-image: radial-gradient(circle at var(--stadium-focus-x) var(--stadium-focus-y), transparent var(--stadium-radius), #000 calc(var(--stadium-radius) + 110px));
  mask-image: radial-gradient(circle at var(--stadium-focus-x) var(--stadium-focus-y), transparent var(--stadium-radius), #000 calc(var(--stadium-radius) + 110px));
}
.to-night .stadium-blackout { -webkit-mask-image: none; mask-image: none; }
.stadium-rig {
  position: absolute; top: -16px; width: clamp(68px, 10vw, 134px); transform: translateX(-50%);
}
.stadium-fixture { display: block; width: 100%; overflow: visible; }
.stadium-beam {
  position: absolute; top: 22px; width: 54vw; height: 110vh; transform-origin: 50% 0;
  clip-path: polygon(49% 0, 51% 0, 100% 100%, 0 100%);
  background: linear-gradient(to bottom, color-mix(in srgb, var(--stadium-light) 50%, transparent), transparent 90%);
  mix-blend-mode: screen;
}
@media (max-width: 600px) {
  .stadium-rig { width: 68px; top: -7px; }
  .stadium-beam { width: 90vw; }
}
</style>
