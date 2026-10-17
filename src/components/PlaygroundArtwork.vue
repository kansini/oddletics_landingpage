<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DoodleAthlete from './DoodleAthlete.vue'

defineProps<{ sport: string }>()
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
        obstacle: { x: 15, y: -24, rotation: 4 },
        projectile: { x: 50, y: -50, rotation: -7 },
        distance: { x: -12, y: 55 },
        tower: { x: -4, y: 8 },
        trajectory: { x: 8, y: 25, rotation: 3 },
        diver: { x: 8, y: 58, rotation: 20 },
        water: { x: -8, y: 6, scale: 1.02 },
        ripples: { x: 0, y: -2, scale: 1.35 },
        decor: { x: 12, y: -65, rotation: -4 },
      }
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
      <pattern id="playground-sand" width="19" height="17" patternUnits="userSpaceOnUse"><path d="M3 4H5M12 12H14" stroke="#b7a77a" stroke-width="1.2" stroke-linecap="round"/></pattern>
    </defs>
    <g data-playground-layer="backdrop">
      <path d="M37 181C21 89 114 54 223 66 339 13 478 46 522 139 577 247 514 341 406 357 266 404 93 360 55 295Z" fill="#fffaf0" opacity=".5"/>
      <path d="M37 181C21 89 114 54 223 66 339 13 478 46 522 139 577 247 514 341 406 357 266 404 93 360 55 295Z" fill="url(#playground-grain)"/>
    </g>

    <g v-if="sport === 'sprint' || sport === 'hurdles'" data-playground-layer="terrain">
      <g transform="rotate(-11 290 250)">
        <path d="M-10 210H589V361H-10Z" :fill="sport === 'hurdles' ? '#5487a2' : '#bf5539'" stroke="#25291e" stroke-width="2"/>
        <path d="M-10 254H590M-10 306H590M-10 356H590" stroke="#fff2d5" stroke-width="2"/>
        <path d="M71 211V359M486 211V359" stroke="#fff2d5" stroke-width="3"/>
        <g v-if="sport === 'sprint'"><path d="M462 211H485V360H462Z" fill="#fffaf0"/><path d="M462 211H485V360H462Z" fill="url(#playground-checks)"/></g>
        <g v-else stroke="#25291e" stroke-width="1.5"><path d="M196 210V290M205 210V290M355 210V290M364 210V290M500 210V290M509 210V290" stroke="#eee9d9" stroke-width="6"/><path d="M189 211H215M348 211H374M493 211H519" stroke="#8c68b6" stroke-width="10"/><path d="M185 291H219M345 291H379M489 291H523" stroke="#eee9d9" stroke-width="5"/></g>
        <g fill="#fff1cd" font-family="Arial, sans-serif" font-size="23" font-weight="800" font-style="italic"><text x="95" y="245">1</text><text x="95" y="296">2</text><text x="95" y="345">3</text></g>
        <ellipse cx="304" cy="304" rx="89" ry="9" fill="#25291e" opacity=".14"/>
        <g data-playground-layer="athlete"><DoodleAthlete kind="dog" x="195" :y="sport === 'hurdles' ? 114 : 176" width="239" height="140"/></g>
        <path d="M131 250H173M118 263H153M132 275H167" stroke="#fff1cd" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      </g>

    </g>

    <g v-else-if="sport === 'long-jump' || sport === 'triple-jump'" data-playground-layer="terrain">
      <path d="M-30 291L219 244 237 306-14 357Z" fill="#bd674d" stroke="#25291e" stroke-width="1.7"/>
      <path d="M-15 311L226 265M190 251L203 311" stroke="#fff8e3" stroke-width="4"/>
      <path d="M231 249L541 212 571 324 257 363Z" fill="#d2c188" stroke="#25291e" stroke-width="1.7"/><path d="M244 258L532 224 557 316 266 350Z" fill="#f9eabe"/><path d="M244 258L532 224 557 316 266 350Z" fill="url(#playground-sand)"/>
      <path d="M263 335L541 302M320 327L322 336M380 320L382 329M441 313L443 322M501 306L503 315" stroke="#b6a577" stroke-width="2"/>
      <path v-if="sport === 'long-jump'" d="M128 221Q264 40 426 238" stroke="#8a8c64" stroke-width="2" stroke-dasharray="5 7"/>
      <g v-else><path d="M49 279Q96 153 152 260Q207 113 271 254Q343 35 447 237" stroke="#8a8c64" stroke-width="2" stroke-dasharray="5 7"/><DoodleAthlete kind="dog" x="37" y="212" width="91" height="58" opacity=".13"/><DoodleAthlete kind="dog" x="152" y="185" width="110" height="70" opacity=".22"/></g>
      <g data-playground-layer="athlete"><g transform="rotate(-13 310 180)"><DoodleAthlete kind="dog" x="210" y="113" width="212" height="132"/></g></g>
      <ellipse cx="403" cy="280" rx="38" ry="8" fill="#b6a577" opacity=".25"/>
    </g>

    <g v-else-if="sport === 'high-jump'" data-playground-layer="terrain">
      <path d="M46 307L443 235 550 306 151 385Z" fill="#bccd97"/>
      <path d="M216 267L453 231 509 282 276 324Z" fill="#93a9cc" stroke="#25291e" stroke-width="1.8"/><path d="M276 324L509 282V309L276 351Z" fill="#6c88b0" stroke="#25291e" stroke-width="1.8"/>
      <path d="M185 163V320M431 122V277" stroke="#fdf9e8" stroke-width="7"/><path d="M177 322H199M420 279H445" stroke="#25291e" stroke-width="2"/>
      <path d="M184 173L432 132" stroke="#8767b1" stroke-width="6"/>
      <path d="M123 286Q202 80 335 119" stroke="#7c8860" stroke-width="2" stroke-dasharray="5 7"/>
      <g data-playground-layer="athlete"><g transform="rotate(-27 300 160)"><DoodleAthlete kind="dog" x="192" y="73" width="226" height="136"/></g></g>
      <path d="M364 81L375 70M384 98L400 95M344 65V48" stroke="#b75d3f" stroke-width="3" stroke-linecap="round"/>
    </g>

    <g v-else-if="sport === 'javelin'" data-playground-layer="terrain">
      <path d="M-4 312L539 236 601 343 64 422Z" fill="#c1d29e"/><path d="M-20 291L235 257 261 312-4 355Z" fill="#be6346"/><path d="M196 263L217 320" stroke="#fff9e8" stroke-width="5"/>
      <g data-playground-layer="athlete"><DoodleAthlete kind="frog" color="#2cbd87" x="118" y="151" width="120" height="170"/></g>
      <g data-playground-layer="projectile">
        <path d="M203 164L464 91" stroke="#25291e" stroke-width="5" stroke-linecap="round"/><path d="M203 164L451 95" stroke="#c8a96c" stroke-width="2" stroke-linecap="round"/><path d="M449 89L473 89 456 102Z" fill="#fff9e8" stroke="#25291e" stroke-width="1.5"/>
      </g>
      <path d="M311 157Q420 65 514 151" stroke="#8c9674" stroke-width="2" stroke-dasharray="5 7"/>
      <path d="M318 114L354 104M330 126L348 120M287 114L301 109" stroke="#b89b63" stroke-width="2" stroke-linecap="round"/>
    </g>

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
      <g data-playground-layer="diver"><g transform="rotate(165 365 218)"><DoodleAthlete kind="blob" color="#a87959" x="311" y="153" width="108" height="130"/></g></g>
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
        <g data-playground-layer="ripples"><ellipse cx="368" cy="341" rx="49" ry="8" stroke="#e5fbf4" stroke-width="2" opacity=".8"/><ellipse cx="368" cy="341" rx="31" ry="4" stroke="#e5fbf4" stroke-width="1.5" opacity=".6"/></g>
      </g>
    </g>

    <g v-else-if="sport === 'swimming'" data-playground-layer="terrain">
      <path d="M-20 237L517 175 600 333 31 403Z" fill="#f8f8e8" stroke="#25291e" stroke-width="2"/><path d="M-8 244L511 188 583 325 38 389Z" fill="#169fca"/>
      <path d="M6 279L533 221M26 334L559 274M47 383L579 322" stroke="#fff8e8" stroke-width="4" stroke-dasharray="4 7" stroke-linecap="round"/>
      <path d="M65 260L93 379M157 250L186 368M250 240L280 359M345 228L375 348M440 217L471 337" stroke="#b8f0ee" stroke-width="1" opacity=".25"/>

      <g data-playground-layer="athlete"><g transform="translate(304 229)">
          <ellipse cx="0" cy="30" rx="71" ry="13" stroke="#b8f3ed" stroke-width="2"/><path d="M-18 12C-58-26-35-74-1-73 37-74 54-38 34-10L18 16Z" fill="#096bf5" stroke="#25291e" stroke-width="2"/><ellipse cx="15" cy="-39" rx="12" ry="15" fill="#fffdf3" stroke="#25291e" stroke-width="1.8"/><circle cx="19" cy="-42" r="3" fill="#25291e"/><path d="M-5 10L7 24M-21 5L-29 17" stroke="#25291e" stroke-width="2" stroke-linecap="round"/><path d="M-67 29Q-52 18-37 27T-6 27 24 27 55 27 82 25" stroke="#fffdf3" stroke-width="3" stroke-linecap="round"/>
        </g>
      </g>
      <g fill="#a3e8ee"><circle cx="226" cy="227" r="4"/><circle cx="211" cy="213" r="3"/><circle cx="226" cy="195" r="2"/></g>
    </g>

    <g v-else-if="sport === 'archery'" data-playground-layer="terrain">
      <path d="M28 313Q276 231 560 298L594 398H23Z" fill="#c5d5a5"/>
      <g data-playground-layer="athlete"><DoodleAthlete kind="frog" color="#2cbd87" x="67" y="153" width="124" height="174"/></g>
      <g data-playground-layer="obstacle"><g transform="translate(388 205) rotate(10)"><path d="M-33 76L-65 156M34 77L66 155" stroke="#25291e" stroke-width="9" stroke-linecap="round"/><path d="M-33 76L-65 156M34 77L66 155" stroke="#b18b50" stroke-width="5" stroke-linecap="round"/><ellipse cx="9" rx="84" ry="109" fill="#aa884b" stroke="#25291e" stroke-width="3"/><ellipse rx="84" ry="109" fill="#fcf7e9" stroke="#25291e" stroke-width="3"/><ellipse rx="67" ry="88" fill="#25291e"/><ellipse rx="51" ry="68" fill="#43a1c7"/><ellipse rx="36" ry="48" fill="#ed6755"/><ellipse rx="18" ry="25" fill="#ffda55"/><ellipse rx="7" ry="11" stroke="#bc9c39"/><path d="M-200-25L0 0" stroke="#25291e" stroke-width="5" stroke-linecap="round"/><path d="M-200-25L0 0" stroke="#c4a269" stroke-width="2"/><path d="M-184-24L-208-43-231-43-211-28-234-14-209-13Z" fill="#ffda55" stroke="#25291e" stroke-width="2"/></g>
      </g>
      <path d="M171 206Q206 235 177 264M171 206L177 264" stroke="#9c7741" stroke-width="3"/>
    </g>
    <g data-playground-layer="decor"><path d="M66 113L55 103M78 92L73 75M489 349L506 352M493 335L507 329" stroke="#25291e" stroke-width="2" stroke-linecap="round" opacity=".55"/></g>
  </svg>
</template>
