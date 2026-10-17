<script setup lang="ts">
const floats = Array.from({ length: 47 }, (_, i) => i)
</script>

<template>
  <g>
    <g data-playground-layer="terrain">
      <!-- The deck, glazed pool wall and deep-blue timing end stay grounded. -->
      <path d="M-25 263L487 206 608 344 52 420Z" fill="#78bdce" stroke="#5f8288" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M-25 250L487 193 608 330 52 406Z" fill="#f4f4e4" stroke="#6f9291" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M54 407L608 330V343L54 420Z" fill="#5cb6cd"/>
      <path d="M83 403V416M123 398V411M163 392V405M203 387V400M243 381V394M283 376V389M323 370V383M363 365V378M403 359V372M443 354V367M483 348V361M523 343V356M563 337V350" stroke="#badfe0" stroke-width="1.5"/>
      <path d="M-11 259L481 204 587 326 59 391Z" fill="#1ba6ce"/>
      <path d="M-11 259L481 204 587 326 59 391Z" fill="url(#playground-water)"/>
      <path d="M481 204L587 326 577 327 472 205Z" fill="#087eac"/>
      <path d="M111 250L145 375M210 239L247 363M309 228L349 350M408 217L452 338" stroke="#75d7e2" stroke-width="1" opacity=".45"/>
      <path d="M16 281L499 228M34 323L536 269M54 369L575 312" stroke="#087ca5" stroke-width="8" opacity=".13"/>
      <g stroke="#b9f0ee" stroke-width="1.8" stroke-linecap="round" opacity=".7"><path d="M61 275Q80 269 104 272M133 301Q154 295 177 298M388 291Q411 284 433 287M274 356Q301 348 326 350M91 352Q110 346 131 349M416 240Q436 235 453 237"/></g>
      <!-- Individual floating discs change from blue to red near the finish. -->
      <g v-for="(lane, row) in [{x:4,y:280},{x:25,y:326},{x:46,y:372}]" :key="row">
        <path :d="`M${lane.x} ${lane.y}L${lane.x + 516} ${lane.y - 59}`" stroke="#496f88" stroke-width="1.2"/>
        <ellipse v-for="i in floats" :key="i" :cx="lane.x + i * 11.2" :cy="lane.y - i * 1.28" rx="4.1" ry="2.7" :fill="i > 39 ? '#ed7158' : Math.floor(i / 5) % 2 ? '#f6f8e8' : '#3972c5'" stroke="#1786ae" stroke-width=".45"/>
      </g>
      <!-- Raised starting blocks have non-slip tops, numbers and slanted footrests. -->
      <g v-for="(block, i) in [{x:478,y:209},{x:514,y:250},{x:551,y:293}]" :key="i" :transform="`translate(${block.x} ${block.y})`" stroke="#5a7f88" stroke-width="1.3" stroke-linejoin="round">
        <path d="M-10 3L6 0V-20L-10-17Z" fill="#dce6df"/>
        <path d="M6 0L17 5V-16L6-20Z" fill="#9ebcc4"/>
        <path d="M-16-23L6-26 23-18 0-14Z" fill="#5c8cac"/>
        <path d="M-16-23L0-14V-10L-16-19Z" fill="#c5dae0"/>
        <path d="M0-14L23-18V-14L0-10Z" fill="#eef1e3"/>
        <path d="M-9-23L7-19M-4-24L12-20M1-24L17-21" stroke="#bed5dc" stroke-width=".8"/>
        <text x="-6" y="-3" fill="#426d83" stroke="none" font-family="Arial,sans-serif" font-size="8" font-weight="800">{{ i + 1 }}</text>
      </g>
      <g stroke="#7c9ba0" stroke-width="2" stroke-linecap="round" fill="none">
        <path d="M82 374V352Q82 341 91 342L99 344V365M105 370V349Q105 338 114 339L122 341V362"/>
        <path d="M88 361L111 358M89 369L112 366" stroke-width="2.5"/>
      </g>
    </g>

    <g data-playground-layer="obstacle">
      <path d="M324 167L502 179" stroke="#758e8e" stroke-width="1.2"/>
      <g v-for="i in 10" :key="i"><path :d="`M${326 + i * 16} ${167 + i * 1.08}l12 .9-6 16Z`" :fill="i % 2 ? '#f6f3df' : '#83b4c7'"/></g>
    </g>
    <g data-playground-layer="athlete">
      <g transform="translate(313 259)">
        <ellipse cx="1" cy="27" rx="61" ry="10" fill="#087da9" opacity=".22"/>
        <ellipse cx="1" cy="27" rx="74" ry="14" stroke="#a2e3e8" stroke-width="1.5" opacity=".7"/>
        <!-- This blue one-eyed doodle echoes the swimmer in the app. -->
        <path d="M-19 12C-54-12-49-51-23-65 1-79 34-65 42-37 47-17 34-2 17 12Z" fill="#147aeb" stroke="#29433a" stroke-width="1.8"/>
        <path d="M-24-60Q-35-39-29-23" stroke="#65b8f2" stroke-width="1.3" opacity=".7"/>
        <ellipse cx="15" cy="-37" rx="12" ry="15" fill="#fffcef" stroke="#29433a" stroke-width="1.6"/>
        <circle cx="19" cy="-39" r="3" fill="#29433a"/>
        <path d="M25-11L38-6M-11 10L-3 25M-26 6L-32 18" stroke="#29433a" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M-64 26Q-50 17-35 25T-6 25 24 25 53 25 79 23" stroke="#effbf0" stroke-width="3" stroke-linecap="round"/>
        <path d="M-41 34Q-17 42 15 34M43 33L56 30" stroke="#9be3e5" stroke-width="1.5" stroke-linecap="round"/>
        <g fill="#c0eff0"><circle cx="-59" cy="3" r="3.5"/><circle cx="-72" cy="-10" r="2.6"/><circle cx="-55" cy="-21" r="2"/><circle cx="-81" cy="6" r="1.5"/></g>
      </g>
    </g>
    <g data-playground-layer="ripples" stroke="#d8f5ed" stroke-linecap="round">
      <path d="M169 330Q191 318 215 327M157 338Q190 326 224 335" stroke-width="1.7" opacity=".7"/>
      <path d="M420 304Q444 294 470 301" stroke-width="1.5" opacity=".6"/>
    </g>
  </g>
</template>
