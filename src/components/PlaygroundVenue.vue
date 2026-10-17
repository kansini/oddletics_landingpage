<script setup lang="ts">
defineProps<{ sport: string }>()
const crowd = Array.from({ length: 34 }, (_, i) => ({
  x: -8 + i * 18,
  y: 222 - i * .55 + (i % 3) * 3,
  color: ['#96b7b8', '#e2b679', '#d49a91', '#9eacc7', '#b0be8d'][i % 5],
}))
</script>

<template>
  <g data-playground-layer="distance">
    <path d="M-22 215Q64 145 178 189 275 135 385 177 477 135 602 195V284H-22Z" fill="#cbd8b7" opacity=".72"/>
    <path d="M-16 241Q120 177 245 216 383 170 595 211V283H-16Z" fill="#e1e6cd"/>
    <!-- Small tiered stands keep the field scenes in the same world as the diving arena. -->
    <g v-if="sport !== 'archery'" stroke="#b5bea7" stroke-width="1">
      <path d="M-16 218L566 198 595 243-10 270Z" fill="#f5f2df"/>
      <path d="M-10 230L575 210M-5 243L584 223" opacity=".7"/>
      <g v-for="(person, i) in crowd" :key="i" :transform="`translate(${person.x} ${person.y})`" stroke="none" opacity=".65">
        <path d="M-5 4Q0-2 5 4V11H-5Z" :fill="person.color"/>
        <circle r="3.5" :fill="person.color"/>
      </g>
      <path d="M-13 251L595 227V242L-9 269Z" fill="#faf6df"/>
      <path d="M-13 251L595 227" stroke="#8e9c87"/>
      <g fill="#879783" stroke="none" font-family="Arial,sans-serif" font-size="7" font-weight="800" letter-spacing="1.3">
        <text x="67" y="256" transform="rotate(-2 67 256)">ODDLETICS</text>
        <text x="273" y="248" transform="rotate(-2 273 248)">STAY ODD. PLAY ON.</text>
        <text x="470" y="240" transform="rotate(-2 470 240)">REAL GAMES.</text>
      </g>
    </g>
    <g stroke="#8c9e8b" stroke-width="1.6" stroke-linecap="round">
      <path d="M285 194V133M403 186V118M520 191V135"/>
      <path d="M285 134L309 140 308 166 285 160Z" fill="#81bba2" stroke="none"/>
      <path d="M403 119L427 126 426 152 403 145Z" fill="#e89278" stroke="none"/>
      <path d="M520 136L544 142 543 167 520 161Z" fill="#83b8d0" stroke="none"/>
      <path d="M292 146L301 154M293 154L301 146M410 132L419 140M411 140L419 132M527 148L536 156M528 156L536 148" stroke="#fff8e8" stroke-width="1.8"/>
    </g>
    <g v-if="sport === 'archery'" opacity=".55">
      <path d="M-12 261Q155 215 313 241T595 229V296H-12Z" fill="#b8cd9f"/>
      <path d="M44 237V186M51 237V186M35 191H60M35 198H60" stroke="#a4b39d" stroke-width="2"/>
      <g fill="#a4b39d"><rect x="35" y="185" width="4" height="4" rx="1"/><rect x="44" y="185" width="4" height="4" rx="1"/><rect x="53" y="185" width="4" height="4" rx="1"/></g>
    </g>
  </g>
</template>
