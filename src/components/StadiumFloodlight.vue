<script setup lang="ts">
defineProps<{ tilt: number }>()

// Uneven cells and a second pencil line keep the lamp in the doodle athletes' world.
const cells = [
  { x: 31, y: 42, angle: -3, shape: 'M2 1Q15-1 28 1L29 15Q15 18 1 16Z' },
  { x: 72, y: 39, angle: 2, shape: 'M1 2L27 0Q30 6 28 16L2 17Q-1 9 1 2Z' },
  { x: 113, y: 38, angle: -2, shape: 'M2 1L28 2 27 16Q14 18 1 15Z' },
  { x: 32, y: 66, angle: 2, shape: 'M1 1Q14-1 28 2L27 16 2 17Z' },
  { x: 73, y: 64, angle: -2, shape: 'M2 2L28 0Q30 8 27 16L1 17Z' },
  { x: 114, y: 63, angle: 3, shape: 'M1 2L27 1 29 16Q14 18 2 15Z' },
]
</script>

<template>
  <svg class="stadium-fixture" viewBox="0 0 180 124" fill="none" stroke="#25291e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M83-12Q85 8 83 32L95 33Q94 11 96-12" fill="#b9c1a6"/>
    <path d="M88-6L89 21M77 13L102 15" stroke="#faf5df" stroke-width="1.5"/>
    <g :transform="`rotate(${tilt} 90 61)`">
      <!-- A slightly wonky U-shaped stand, rather than precision hardware. -->
      <path d="M23 75L24 98Q24 104 32 105L143 103Q154 102 155 94L156 74" stroke="#25291e" stroke-width="8"/>
      <path d="M23 75L24 98Q24 104 32 105L143 103Q154 102 155 94L156 74" stroke="#aeb89b" stroke-width="3.5"/>
      <path d="M84 104L85 127 97 126 95 104" fill="#b9c1a6"/>
      <circle cx="90" cy="108" r="3" fill="#25291e" stroke="none"/>

      <path d="M22 32L151 28Q158 28 158 35L161 83Q161 90 154 91L25 94Q17 94 18 85L16 40Q15 33 22 32Z" fill="#fff7db"/>
      <path d="M26 41L147 37 150 80 28 85Z" fill="#495340" stroke-width="2"/>
      <path d="M24 36Q78 32 144 33M24 89L103 87" stroke="#b5bc9d" stroke-width="1.2"/>
      <path d="M153 43L155 76" stroke="#a1ac8d" stroke-width="1.3"/>
      <g v-for="(cell, i) in cells" :key="`off-${i}`" :transform="`translate(${cell.x} ${cell.y}) rotate(${cell.angle} 15 9)`">
        <path :d="cell.shape" fill="#748068" stroke-width="1.7"/>
        <path d="M7 6L22 5M10 11L19 10" stroke="#a7b08f" stroke-width="1.1" opacity=".55"/>
      </g>

      <g class="stadium-bulbs">
        <g v-for="(cell, i) in cells" :key="`on-${i}`" :transform="`translate(${cell.x} ${cell.y}) rotate(${cell.angle} 15 9)`">
          <path :d="cell.shape" fill="var(--stadium-light, #ffda72)" stroke-width="1.7"/>
          <path d="M6 6L21 4M9 11L18 9" stroke="#fffdf0" stroke-width="2.3"/>
        </g>
        <!-- Loose sun-ray marks disappear with the light. -->
        <path d="M5 43L-5 38M6 68L-5 72M169 35L179 28M171 60L184 61M46 111L42 119M135 110L142 118" stroke="#d9ae45" stroke-width="2.4"/>
      </g>
      <path d="M142 87L147 84M143 83L147 88" stroke="#a9b191" stroke-width="1.1"/>
    </g>
  </svg>
</template>
