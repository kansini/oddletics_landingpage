<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ tilt: number }>()
const id = useId()
const modules = Array.from({ length: 6 }, (_, i) => ({ x: 22 + (i % 3) * 45, y: 39 + Math.floor(i / 3) * 23 }))
const diodes = Array.from({ length: 6 }, (_, i) => ({ x: 12 + (i % 3) * 7.5, y: 6.5 + Math.floor(i / 3) * 5.2 }))
</script>

<template>
  <svg class="stadium-fixture" viewBox="0 0 180 124" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <defs>
      <linearGradient :id="`${id}-metal`" x1="90" y1="29" x2="90" y2="88" gradientUnits="userSpaceOnUse">
        <stop stop-color="#71867c"/><stop offset=".18" stop-color="#405a50"/><stop offset="1" stop-color="#253e34"/>
      </linearGradient>
      <linearGradient :id="`${id}-glass`" x2="0" y2="1">
        <stop stop-color="#c8d6be" stop-opacity=".55"/><stop offset=".48" stop-color="#647e6c" stop-opacity=".16"/><stop offset="1" stop-color="#142f26" stop-opacity=".6"/>
      </linearGradient>
      <radialGradient :id="`${id}-glow`">
        <stop offset=".3" stop-color="var(--stadium-light, #ffe09b)" stop-opacity=".22"/><stop offset="1" stop-color="var(--stadium-light, #ffe09b)" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <!-- A fixed mounting stem, cable and cast-metal swivel cradle. -->
    <path d="M85-12H96V31H85Z" fill="#526b60" stroke="#b9c8b3" stroke-width="1.3"/>
    <path d="M88-9V27M60 9H120" stroke="#d4ddc9" stroke-width="1" opacity=".55"/>
    <path d="M96-5C112 9 104 25 132 31S164 43 165 59" stroke="#1b3229" stroke-width="3.5"/>
    <path d="M97-5C113 9 105 25 133 31S165 43 166 59" stroke="#869b89" stroke-width="1"/>
    <g :transform="`rotate(${tilt} 90 61)`">
      <path d="M18 60V94Q18 101 27 104L140 107Q155 107 158 96V59" stroke="#1b322a" stroke-width="7"/>
      <path d="M18 60V94Q18 101 27 104L140 107Q155 107 158 96V59" stroke="#7f9584" stroke-width="3"/>
      <path d="M45 105L80 116H101L131 107" stroke="#a3b59e" stroke-width="1.4"/>
      <path d="M86 111H95V127H86Z" fill="#405d4c" stroke="#a3b59e" stroke-width="1.3"/>
      <circle cx="90" cy="113" r="5.5" fill="#536f5b" stroke="#bbc9af" stroke-width="1.3"/>
      <path d="M88 113H92" stroke="#1d372a" stroke-width="1.2"/>

      <!-- The beveled housing has a sun visor, cooling fins and recessed screws. -->
      <path d="M21 30L160 32 171 40V87L161 94 25 92 13 83Z" fill="#203b30" stroke="#b1c2a8" stroke-width="1.4"/>
      <path d="M161 35L171 40V87L161 94Z" fill="#182f25" stroke="#647e69" stroke-width="1"/>
      <path d="M165 46L170 48M165 53L170 55M165 60L170 62M165 67L170 69M165 74L170 76M165 81L170 83" stroke="#78917a" stroke-width="1"/>
      <rect x="12" y="29" width="150" height="58" rx="5" :fill="`url(#${id}-metal)`" stroke="#c6d2b9" stroke-width="1.6"/>
      <rect x="17" y="34" width="140" height="48" rx="3" fill="#1c3329" stroke="#82977e" stroke-width=".9"/>
      <path d="M10 28L157 27 166 35 16 37Z" fill="#819785" stroke="#c2cfb4" stroke-width="1.3"/>
      <path d="M17 29L152 28" stroke="#e0e6cf" stroke-width=".8" opacity=".8"/>
      <path d="M22 90L156 92" stroke="#9eaf94" stroke-width=".8" opacity=".5"/>
      <g v-for="(screw, i) in [{x:19,y:34},{x:155,y:34},{x:19,y:82},{x:155,y:82}]" :key="`bolt-${i}`">
        <circle :cx="screw.x" :cy="screw.y" r="1.6" fill="#bac8ae" stroke="#263f30" stroke-width=".6"/>
        <path :d="`M${screw.x - .7} ${screw.y}h1.4`" stroke="#40583e" stroke-width=".6"/>
      </g>

      <!-- Six faceted reflector modules remain legible after the LEDs go dark. -->
      <g v-for="(cell, i) in modules" :key="`reflector-${i}`" :transform="`translate(${cell.x} ${cell.y})`">
        <rect width="39" height="18" rx="2.3" fill="#405b48" stroke="#8fa184" stroke-width=".7"/>
        <path d="M2 2H37L31 6H8Z" fill="#a1b195" opacity=".55"/>
        <path d="M2 16H37L31 12H8Z" fill="#172f22" opacity=".8"/>
        <path d="M2 2L8 6V12L2 16ZM37 2L31 6V12L37 16Z" fill="#7a9379" opacity=".35"/>
        <rect x="8" y="5" width="23" height="8" rx="1" fill="#162e23"/>
        <rect x="2" y="2" width="35" height="14" rx="1.5" :fill="`url(#${id}-glass)`"/>
        <path d="M5 4H12M30 14H34" stroke="#d7e1c5" stroke-width=".55" opacity=".5"/>
      </g>
      <g class="stadium-bulbs">
        <ellipse cx="89" cy="59" rx="87" ry="39" :fill="`url(#${id}-glow)`"/>
        <g v-for="(cell, i) in modules" :key="`light-${i}`" :transform="`translate(${cell.x} ${cell.y})`">
          <rect x="2" y="2" width="35" height="14" rx="2" fill="var(--stadium-light, #ffe09b)" opacity=".5"/>
          <path d="M5 3H34L29 6H10ZM5 15H34L29 12H10Z" fill="#fffce5" opacity=".55"/>
          <circle v-for="(diode, j) in diodes" :key="j" :cx="diode.x" :cy="diode.y" r="1.7" fill="#fffce8" stroke="#d5b36b" stroke-width=".5"/>
          <path d="M3 3H36M3 16H36" stroke="#fff6ca" stroke-width=".5" opacity=".8"/>
        </g>
      </g>

      <g fill="#667e63" stroke="#c1d0ad" stroke-width="1">
        <circle cx="12" cy="61" r="4"/><circle cx="163" cy="61" r="4"/>
        <path d="M10 61H14M161 61H165" stroke="#253e2e"/>
      </g>
      <rect x="69" y="88" width="35" height="5" rx="1" fill="#162d22"/>
      <text x="86.5" y="91.7" fill="#c7d1ae" font-family="monospace" font-size="3.1" letter-spacing=".6" text-anchor="middle">ODD / 06</text>
      <path d="M138 88L141 92H135Z" fill="#cdb77b"/>
    </g>
  </svg>
</template>
