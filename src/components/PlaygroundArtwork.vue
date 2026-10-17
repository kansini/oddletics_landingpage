<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DoodleAthlete from './DoodleAthlete.vue'
import PlaygroundVenue from './PlaygroundVenue.vue'
import PlaygroundTrackScene from './PlaygroundTrackScene.vue'
import PlaygroundJumpScene from './PlaygroundJumpScene.vue'
import PlaygroundFieldScene from './PlaygroundFieldScene.vue'
import PlaygroundSwimScene from './PlaygroundSwimScene.vue'

const props = defineProps<{ sport: string }>()
const scene = ref<SVGSVGElement>()
let context: gsap.Context | undefined
let media: gsap.MatchMedia | undefined
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const stage = scene.value?.closest('.event-stage')
  if (!stage) return
  context = gsap.context(() => {
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const strength = () => window.innerWidth <= 600 ? 0.8 : 1
      const layers: Record<string, { x: number; y: number; rotation?: number; scale?: number }> = {
        backdrop: { x: -10, y: 75, rotation: -2, scale: 1.04 },
        terrain: { x: 0, y: 14 },
        athlete: { x: 24, y: -58, rotation: -3 },
        obstacle: { x: 3, y: -5, rotation: .7 },
        projectile: props.sport === 'archery' ? { x: 7, y: 1 } : { x: 32, y: -24, rotation: -3 },
        distance: { x: -12, y: props.sport === 'diving' ? 55 : 22 },
        tower: { x: -4, y: 8 },
        trajectory: { x: 8, y: 25, rotation: 3 },
        diver: { x: 4, y: 54, rotation: 20 },
        water: { x: -8, y: 6, scale: 1.02 },
        ripples: { x: 0, y: -2, scale: 1.35 },
        decor: { x: 12, y: -65, rotation: -4 },
      }
      const athleteMotion: Record<string, { x: number; y: number; rotation: number }> = {
        sprint: { x: 48, y: -4, rotation: -2 },
        hurdles: { x: 32, y: -25, rotation: -5 },
        'long-jump': { x: 24, y: -26, rotation: -5 },
        'triple-jump': { x: 26, y: -24, rotation: -4 },
        'high-jump': { x: 14, y: -23, rotation: -8 },
        javelin: { x: 9, y: -10, rotation: -3 },
        swimming: { x: 28, y: -5, rotation: -2 },
        archery: { x: 0, y: -5, rotation: -1 },
      }
      if (athleteMotion[props.sport]) layers.athlete = athleteMotion[props.sport]!
      const timeline = gsap.timeline({
        defaults: { ease: 'none', duration: 1, transformOrigin: '50% 50%' },
        scrollTrigger: {
          trigger: stage,
          start: 'top 85%',
          end: 'center 30%',
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      })
      scene.value!.querySelectorAll<SVGGElement>('[data-playground-layer]').forEach(layer => {
        const motion = layers[layer.dataset.playgroundLayer!]!
        timeline.to(layer, {
          x: () => motion.x * strength(),
          y: () => motion.y * strength(),
          rotation: () => (motion.rotation ?? 0) * strength(),
          scale: () => 1 + ((motion.scale ?? 1) - 1) * strength(),
        }, 0)
      })
      // Poster typography has its own depth; navigation and reading copy stay stable.
      timeline.to(stage.querySelector('.event-stage-number'), { y: () => -45 * strength(), rotation: -4 }, 0)
      timeline.to(stage.querySelector('.event-stage-ticket'), { x: () => 10 * strength(), y: () => -32 * strength(), rotation: 3 }, 0)
    })
  }, scene.value)
})
onBeforeUnmount(() => {
  media?.revert()
  context?.revert()
})
</script>

<template>
  <svg ref="scene" class="playground-artwork" viewBox="0 0 580 430" fill="none" aria-hidden="true">
    <defs>
      <pattern id="playground-checks" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 0H10V10H0ZM10 10H20V20H10Z" fill="#25291e"/></pattern>
      <pattern id="playground-grain" width="15" height="15" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".65" fill="#25291e" opacity=".12"/></pattern>
      <pattern id="diving-water" width="63" height="27" patternUnits="userSpaceOnUse"><path d="M5 8Q17 4 29 8M39 21Q49 17 60 20" stroke="#a4e9ef" stroke-width="2" stroke-linecap="round" opacity=".65"/></pattern>
      <pattern id="playground-grass" width="43" height="31" patternUnits="userSpaceOnUse"><path d="M8 17l-2-4m2 4 3-3M31 26l-2-4m2 4 3-3" stroke="#92ac79" stroke-width=".8" opacity=".45"/></pattern>
      <pattern id="playground-water" width="69" height="37" patternUnits="userSpaceOnUse"><path d="M2 8Q17 1 35 7M43 27Q54 21 67 24M17 25l12-2" stroke="#a9e6e7" stroke-width="1.7" stroke-linecap="round" opacity=".55"/><path d="M30 4L44 16 62 9M8 28L19 35 36 28" stroke="#66c9dc" stroke-width=".9" opacity=".35"/></pattern>
      <pattern id="playground-sand" width="19" height="17" patternUnits="userSpaceOnUse"><path d="M3 4H5M12 12H14" stroke="#b7a77a" stroke-width="1.2" stroke-linecap="round"/></pattern>
    </defs>
    <g data-playground-layer="backdrop">
      <path d="M37 181C21 89 114 54 223 66 339 13 478 46 522 139 577 247 514 341 406 357 266 404 93 360 55 295Z" fill="#fffaf0" opacity=".5"/>
      <path d="M37 181C21 89 114 54 223 66 339 13 478 46 522 139 577 247 514 341 406 357 266 404 93 360 55 295Z" fill="url(#playground-grain)"/>
    </g>

    <PlaygroundVenue v-if="sport !== 'diving'" :sport="sport"/>
    <PlaygroundTrackScene v-if="sport === 'sprint' || sport === 'hurdles'" :hurdles="sport === 'hurdles'"/>
    <PlaygroundJumpScene v-else-if="['long-jump', 'triple-jump', 'high-jump'].includes(sport)" :sport="sport"/>
    <PlaygroundFieldScene v-else-if="sport === 'javelin' || sport === 'archery'" :archery="sport === 'archery'"/>
    <PlaygroundSwimScene v-else-if="sport === 'swimming'"/>

    <!-- A dedicated ten-metre platform scene: open water, concrete towers and a head-first somersault. -->
    <g v-else-if="sport === 'diving'">
      <g data-playground-layer="distance">
        <path d="M-12 280Q83 208 195 247 288 188 387 239 471 192 591 251V346H-12Z" fill="#c6d7ba"/>
        <path d="M169 283Q282 233 402 270 497 226 585 263V332H169Z" fill="#dce5c8"/>
        <g stroke="#82938b" stroke-width="1.7" stroke-linecap="round">
          <path d="M238 262V203M432 257V191M510 262V214"/>
          <path d="M238 204L263 210 262 239 238 233Z" fill="#89c2a0" stroke="none"/>
          <path d="M432 192L458 199 457 230 432 222Z" fill="#ee8b74" stroke="none"/>
          <path d="M510 215L535 220 534 248 510 243Z" fill="#7eb8d4" stroke="none"/>
        </g>
        <g fill="#faf7e8" opacity=".8"><path d="M245 218L256 226M246 227L255 217" stroke="#faf7e8" stroke-width="2"/><path d="M439 206L450 214M440 215L449 205" stroke="#faf7e8" stroke-width="2"/></g>
        <g opacity=".55">
          <g fill="#98b7b8"><circle cx="209" cy="281" r="4"/><circle cx="247" cy="279" r="4"/><circle cx="284" cy="279" r="4"/><circle cx="408" cy="279" r="4"/><circle cx="445" cy="278" r="4"/><circle cx="483" cy="279" r="4"/><circle cx="522" cy="280" r="4"/></g>
          <g fill="#e5b883"><circle cx="226" cy="276" r="4"/><circle cx="266" cy="277" r="4"/><circle cx="424" cy="274" r="4"/><circle cx="465" cy="276" r="4"/><circle cx="503" cy="275" r="4"/></g>
          <path d="M203 289H290M401 288H531" stroke="#faf8e9" stroke-width="7" stroke-linecap="round"/>
        </g>

      </g>

      <!-- The two levels and cantilevered deck distinguish platform diving from a springboard. -->
      <g data-playground-layer="tower">
        <g stroke="#5a6c70" stroke-width="1.6" stroke-linejoin="round">
          <path d="M-15 262L60 252 62 337-15 347Z" fill="#d3d9d7"/>
          <path d="M60 252L77 247 78 332 62 337Z" fill="#acbac0"/>
          <path d="M-20 249L81 237 101 247-6 261Z" fill="#f8f7ee"/>
          <path d="M-6 261L101 247V254L-6 268Z" fill="#abb9c0"/>
          <path d="M-10 246V229L65 221V238M-10 237L65 229M16 226V243M40 224V241" fill="none" stroke="#6c8b91" stroke-width="2.5"/>
          <path d="M100 158L141 153V321L100 328Z" fill="#e4e4da"/>
          <path d="M141 153L162 145V313L141 321Z" fill="#adbac0"/>
          <path d="M92 138L242 125 263 132 111 147Z" fill="#faf8ed"/>
          <path d="M111 147L263 132V143L111 160Z" fill="#b7c3c9"/>
          <path d="M92 138L111 147V160L92 151Z" fill="#d2d9d9"/>
          <path d="M104 137V112L192 104V129M104 124L192 116M132 110V135M162 107V132" fill="none" stroke="#6c8b91" stroke-width="2.5"/>
        </g>
        <g fill="#718488" font-family="Arial, sans-serif" text-anchor="middle"><text x="120" y="221" font-size="22" font-weight="800">10</text><text x="120" y="236" font-size="12" font-weight="700">m</text></g>

      </g>

      <!-- Faint poses show the rotation; the main bear is inverted above the landing point. -->
      <g data-playground-layer="trajectory">
        <path d="M260 127C283 102 315 97 342 124S384 177 373 210" stroke="#637d78" stroke-width="1.8" stroke-dasharray="4 6" stroke-linecap="round"/>
        <g opacity=".12" transform="rotate(36 286 135)"><DoodleAthlete kind="blob" color="#a87959" x="264" y="107" width="45" height="55"/></g>
        <g opacity=".2" transform="rotate(102 333 139)"><DoodleAthlete kind="blob" color="#a87959" x="309" y="110" width="48" height="58"/></g>
      </g>
      <path d="M389 183L400 190M395 169L407 174M309 217H320M302 229H314" stroke="#637d78" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
      <path d="M318 83Q353 77 371 102M371 102L360 100M371 102L369 91" stroke="#25291e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- The dive pool has reflective water and tiled edges, without racing lane ropes. -->
      <g data-playground-layer="water">
        <path d="M-24 337L487 287 607 338 46 416Z" fill="#f7f9ee" stroke="#5a6c70" stroke-width="1.8"/>
        <path d="M-10 347L483 300 590 340 50 401Z" fill="#27b6df"/>
        <path d="M-10 347L483 300 590 340 50 401Z" fill="url(#diving-water)"/>
        <path d="M50 401L590 340V352L50 414Z" fill="#078fbd"/>
        <path d="M82 397V411M132 391V405M182 386V399M232 380V394M282 375V388M332 369V383M382 364V377M432 358V371M482 352V366M532 346V360" stroke="#76d9e8" stroke-width="2"/>
        <path d="M109 344L126 384M150 340L171 379" stroke="#057fab" stroke-width="8" stroke-linecap="round" opacity=".15"/>
        <path d="M269 331Q305 326 331 330M154 367Q203 358 237 362M427 330Q455 324 480 328" stroke="#c1f1f2" stroke-width="2" stroke-linecap="round" opacity=".7"/>
        <!-- Share the pool's coordinate space and paint the diver above its far rim. -->
        <g transform="translate(12 24)">
          <g data-playground-layer="diver"><g transform="rotate(165 365 218)"><DoodleAthlete kind="blob" color="#a87959" x="311" y="153" width="108" height="130"/></g></g>
        </g>
        <g data-playground-layer="ripples"><ellipse cx="368" cy="341" rx="49" ry="8" stroke="#e5fbf4" stroke-width="2" opacity=".8"/><ellipse cx="368" cy="341" rx="31" ry="4" stroke="#e5fbf4" stroke-width="1.5" opacity=".6"/></g>
      </g>
    </g>

    <g data-playground-layer="decor"><path d="M66 113L55 103M78 92L73 75M489 349L506 352M493 335L507 329" stroke="#25291e" stroke-width="2" stroke-linecap="round" opacity=".55"/></g>
  </svg>
</template>
