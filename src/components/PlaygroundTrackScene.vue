<script setup lang="ts">
import DoodleAthlete from './DoodleAthlete.vue'
defineProps<{ hurdles: boolean }>()
const lanes = [238, 280, 322, 364]
</script>

<template>
  <g>
    <g data-playground-layer="terrain">
      <g transform="rotate(-8 290 290)">
        <path d="M-24 225H602V392H-24Z" fill="#8d9b77"/>
        <path d="M-24 217H602V382H-24Z" :fill="hurdles ? '#548ba5' : '#bd563c'" stroke="#6b6250" stroke-width="1.5"/>
        <path d="M-24 217H602V382H-24Z" fill="url(#playground-grain)"/>
        <path d="M-24 238H602M-24 280H602M-24 322H602M-24 364H602" stroke="#fff3d9" stroke-width="2.2"/>
        <path d="M74 218V382M84 218V382" stroke="#fff3d9" stroke-width="1.7"/>
        <g fill="#fff3d9" font-family="Arial,sans-serif" font-size="20" font-style="italic" font-weight="800">
          <text v-for="(y, i) in lanes.slice(0, 3)" :key="y" x="98" :y="y + 30">{{ i + 1 }}</text>
        </g>
        <path d="M137 371H165M178 371H206M219 371H247M260 371H288M301 371H329M342 371H370M383 371H411M424 371H452" stroke="#edc7a2" stroke-width="1.3" opacity=".5"/>
        <!-- Starting blocks have raised pads, rails and cast shadows. -->
        <g v-for="y in [259, 301, 343]" :key="y" :transform="`translate(48 ${y})`" stroke="#4d635f" stroke-width="1.2" stroke-linejoin="round">
          <path d="M-13 6H19L23 11H-9Z" fill="#344d4d" opacity=".18" stroke="none"/>
          <path d="M-15 4H16" stroke="#b7c5c2" stroke-width="3"/>
          <path d="M-10-1L-2-6 2 3-6 7Z" fill="#e7ebdf"/>
          <path d="M3-4L11-9 15 0 7 4Z" fill="#92a7ab"/>
        </g>
        <g v-if="!hurdles">
          <path d="M487 218H495V382H487Z" fill="#fff4d8"/>
          <path d="M498 218H512V382H498Z" fill="#faf4df"/>
          <path d="M498 218H512V382H498Z" fill="url(#playground-checks)" opacity=".85"/>
          <g fill="#fff4d8" font-family="Arial,sans-serif" font-size="16" font-weight="800">
            <text x="527" y="267">1</text><text x="527" y="309">2</text><text x="527" y="351">3</text>
          </g>
        </g>
        <ellipse cx="313" cy="312" rx="79" ry="7" fill="#25291e" opacity=".15"/>
        <ellipse cx="189" cy="252" rx="33" ry="4" fill="#25291e" opacity=".1"/>
        <DoodleAthlete kind="blob" color="#ed8c73" x="150" y="191" width="75" height="62"/>
        <!-- Each lane has its own freestanding hurdle, with depth and counterweight feet. -->
        <g v-if="hurdles" stroke-linejoin="round">
          <g v-for="(position, i) in [{x:174,y:260},{x:294,y:302},{x:448,y:260},{x:462,y:344},{x:145,y:344}]" :key="i" :transform="`translate(${position.x} ${position.y})`">
            <path d="M-20 3L31 0 42 5-9 9Z" fill="#213e52" opacity=".2"/>
            <path d="M-20-34V1H-7M24-37V-2H37" stroke="#e7e9dc" stroke-width="4"/>
            <path d="M-17-33V-2M27-36V-5" stroke="#abc4ce" stroke-width="1.4"/>
            <path d="M-24-40L29-44V-36L-24-32Z" fill="#8564af" stroke="#5b5281" stroke-width="1"/>
            <path d="M-14-40V-33M1-41V-34M16-42V-35" stroke="#f5f1e6" stroke-width="5"/>
            <path d="M-25 1H-4M22-2H42" stroke="#eeeede" stroke-width="3"/>
          </g>
        </g>
        <g data-playground-layer="athlete">
          <g :transform="hurdles ? 'rotate(-9 315 215)' : 'rotate(-2 315 260)'">
            <DoodleAthlete kind="dog" x="205" :y="hurdles ? 148 : 200" width="229" height="116"/>
          </g>
        </g>
        <g stroke="#fff3da" stroke-width="2.3" stroke-linecap="round" opacity=".8">
          <path :d="hurdles ? 'M177 229H206M169 241H193M181 252H202' : 'M169 278H206M157 289H193M178 300H211'"/>
        </g>
      </g>
    </g>
    <g v-if="!hurdles" data-playground-layer="obstacle">
      <g stroke="#5c6d67" stroke-width="1.7" stroke-linejoin="round">
        <path d="M475 269V165M467 270H486"/>
        <path d="M469 170H482V180H469Z" fill="#657d7b"/>
        <path d="M482 171L489 174V178L482 180Z" fill="#25291e"/>
        <path d="M432 153L514 149V183L432 187Z" fill="#28372f"/>
        <path d="M437 157L509 154" stroke="#eac56c" stroke-width="1"/>
      </g>
      <text x="443" y="178" fill="#f5db84" font-family="monospace" font-size="19" font-weight="800" transform="rotate(-3 443 178)">09.58</text>
    </g>
    <g v-else data-playground-layer="trajectory" stroke="#788995" stroke-width="1.6" stroke-linecap="round">
      <path d="M205 203Q285 107 383 194" stroke-dasharray="4 6"/>
      <path d="M377 185L383 194 372 193"/>
    </g>
  </g>
</template>
