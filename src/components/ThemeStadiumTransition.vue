<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import StadiumFloodlight from './StadiumFloodlight.vue'

const visible = ref(false)
const nextDark = ref(false)
const phase = ref('blackout')
const overlay = ref<HTMLElement>()
const lampLayouts = {
  desktop: [
    { left: 9, angle: -16 }, { left: 35, angle: -5 },
    { left: 65, angle: 5 }, { left: 91, angle: 16 },
  ],
  mobile: [{ left: 18, angle: -12 }, { left: 82, angle: 12 }],
}
const lamps = ref(lampLayouts.desktop)
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
  const activeLamps = window.matchMedia('(max-width: 600px)').matches ? lampLayouts.mobile : lampLayouts.desktop
  lamps.value = activeLamps
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
  const rigs = element.querySelectorAll('.stadium-rig')
  const aims = element.querySelectorAll('.stadium-aim')
  const bulbs = element.querySelectorAll('.stadium-bulbs')
  const beams = element.querySelectorAll('.stadium-beam')
  gsap.set(blackout, { opacity: 0, '--stadium-radius': '-140px' })
  gsap.set(rigs, { opacity: 0, y: -34 })
  gsap.set(aims, { rotation: (i) => activeLamps[i]!.angle * (dark ? 1 : 1.45) })
  gsap.set(bulbs, { opacity: dark ? 1 : .08 })
  gsap.set(beams, { opacity: 0, scaleY: .65, xPercent: -50 })
  await new Promise<void>(resolve => {
    resolveTransition = resolve
    timeline = gsap.timeline({ onComplete: finish })
      .to(rigs, { opacity: 1, y: 0, duration: .16, stagger: .025, ease: 'power2.out' }, 0)
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
        .to(beams, { opacity: .35, scaleY: 1, duration: .38, stagger: .025, ease: 'power2.out' }, .36)
        .to(aims, { rotation: (i) => activeLamps[i]!.angle, duration: .38, stagger: .025, ease: 'power2.out' }, .36)
        .to(blackout, { '--stadium-radius': `${Math.hypot(window.innerWidth, window.innerHeight) + 140}px`, duration: .56, ease: 'power2.inOut' }, .41)
        .to(beams, { opacity: 0, duration: .22, ease: 'power2.in' }, .8)
        .to(blackout, { opacity: 0, duration: .12 }, .92)
    }
    timeline.to(rigs, { opacity: 0, y: -18, duration: .18, ease: 'power2.in' }, .87)
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
    <div v-for="(lamp, i) in lamps" :key="i" class="stadium-rig" :style="{left: `${lamp.left}%`}">
      <div class="stadium-aim">
        <div class="stadium-beam"/>
        <StadiumFloodlight :tilt="0"/>
      </div>
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
  --stadium-lamp-width: clamp(68px, 10vw, 134px);
  position: absolute; top: -16px; width: var(--stadium-lamp-width); transform: translateX(-50%);
}
.stadium-aim {
  position: relative;
  width: 100%;
  aspect-ratio: 180 / 124;
  /* The doodle's light-face centre is (90, 61) in its 180 × 124 viewBox. */
  transform-origin: 50% 49.193548%;
}
.stadium-fixture { display: block; position: relative; z-index: 1; width: 100%; overflow: visible; }
.stadium-beam {
  position: absolute; left: 50%; top: 49.193548%; width: 54vw; height: 110vh; transform-origin: 50% 0;
  clip-path: polygon(calc(50% - var(--stadium-lamp-width) * .34) 0, calc(50% + var(--stadium-lamp-width) * .34) 0, 100% 100%, 0 100%);
  background: linear-gradient(to bottom, color-mix(in srgb, var(--stadium-light) 50%, transparent), transparent 90%);
  mix-blend-mode: screen;
}
@media (max-width: 600px) {
  .stadium-rig { --stadium-lamp-width: 68px; top: -7px; }
  .stadium-beam { width: 90vw; }
}
</style>
