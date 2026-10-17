<script setup lang="ts">
import DoodleAthlete from './DoodleAthlete.vue'
defineProps<{ archery: boolean }>()
</script>

<template>
  <g>
    <g data-playground-layer="terrain">
      <path d="M-22 306L453 236 603 350 104 423Z" fill="#bfd09d"/>
      <path d="M-22 306L453 236 603 350 104 423Z" fill="url(#playground-grass)"/>
      <g v-if="!archery">
        <path d="M-32 320L208 278 227 327-13 376Z" fill="#bc694c"/>
        <path d="M-25 331L211 288M-16 363L224 317" stroke="#fff5db" stroke-width="2"/>
        <path d="M196 283Q215 300 215 329" stroke="#fff5db" stroke-width="4"/>
        <path d="M216 302L501 248M216 302L561 367" stroke="#f4f2d8" stroke-width="1.6"/>
        <path d="M311 285Q347 316 329 343M391 269Q438 315 417 358M470 253Q526 306 506 372" stroke="#f4f2d8" stroke-width="1.5" stroke-dasharray="6 4"/>
        <g fill="#7e8d64" font-family="Arial,sans-serif" font-size="11" font-weight="800"><text x="313" y="359" transform="rotate(9 313 359)">60</text><text x="402" y="375" transform="rotate(9 402 375)">70</text><text x="490" y="391" transform="rotate(9 490 391)">80 m</text></g>
        <g stroke="#7e8d64" stroke-width="1.4"><path d="M478 276V245"/><path d="M478 246L499 251 478 259Z" fill="#e39772" stroke="none"/><path d="M461 279L488 275"/></g>
        <g transform="translate(397 218) rotate(-7)" stroke="#8a8f6c" stroke-width="1.3"><path d="M0 0L-10 25H28L19 0Z" fill="#f7f2d7"/><text x="9" y="18" fill="#6f7c5c" stroke="none" font-family="Arial,sans-serif" font-size="10" font-weight="800" text-anchor="middle">70</text></g>
        <ellipse cx="186" cy="321" rx="44" ry="6" fill="#566847" opacity=".16"/>
      </g>
      <g v-else>
        <path d="M-10 345L195 305 216 352 12 399Z" fill="#c9bf94"/>
        <path d="M-10 345L195 305 216 352 12 399Z" fill="url(#playground-sand)" opacity=".45"/>
        <path d="M177 310L197 355" stroke="#fff9e6" stroke-width="5"/>
        <path d="M193 331L468 292" stroke="#f5f2d9" stroke-width="1.3" stroke-dasharray="5 7"/>
        <path d="M249 300L239 325H271L263 300ZM319 288L309 313H341L333 288Z" fill="#f8f5df"/>
        <g fill="#899074" font-family="Arial,sans-serif" font-size="10" font-weight="800"><text x="247" y="318">30</text><text x="317" y="306">50</text></g>
        <ellipse cx="147" cy="334" rx="47" ry="6" fill="#566847" opacity=".14"/>
        <ellipse cx="432" cy="365" rx="77" ry="9" fill="#566847" opacity=".13"/>
        <path d="M525 322V270M517 279L546 284" stroke="#7f9476" stroke-width="1.7"/><path d="M519 273L548 280 537 286 519 279Z" fill="#e9a47e"/>
      </g>
      <g stroke="#97ac7d" stroke-width="1.2" stroke-linecap="round"><path d="M274 381L271 374M274 381L280 375M463 399L460 393M463 399L469 392M526 303L523 296M526 303L531 297"/></g>
    </g>

    <g data-playground-layer="athlete">
      <g v-if="archery" transform="translate(37 25)" stroke="#6b5c41" stroke-width="1.5" stroke-linejoin="round">
        <path d="M116 236L99 210 94 216 108 245Z" fill="#ab8261"/>
        <path d="M105 218L88 189M110 215L97 183M115 213L107 184"/>
        <path d="M85 190L87 182 94 189M94 184L98 177 103 185M104 185L108 178 113 186" fill="#ecbd67"/>
      </g>
      <DoodleAthlete kind="frog" color="#2cbd87" :x="archery ? 105 : 133" :y="archery ? 180 : 168" width="109" height="158"/>
      <g v-if="archery" stroke-linecap="round" stroke-linejoin="round">
        <path d="M181 251Q201 256 222 233" stroke="#29433a" stroke-width="8"/>
        <path d="M181 251Q201 256 222 233" stroke="#2cbd87" stroke-width="5"/>
        <path d="M209 195Q239 229 213 270" stroke="#514e38" stroke-width="4"/>
        <path d="M209 195Q237 229 213 270" stroke="#ba9056" stroke-width="2"/>
        <path d="M209 195L201 233 213 270" stroke="#f8f1d9" stroke-width="1.2"/>
        <path d="M223 224L226 242" stroke="#785e3c" stroke-width="5"/>
        <path d="M189 228L218 232" stroke="#25291e" stroke-width="1.6"/>
      </g>
    </g>

    <g v-if="!archery" data-playground-layer="projectile">
      <g stroke-linecap="round" stroke-linejoin="round">
        <path d="M205 181L464 108" stroke="#383b2b" stroke-width="4.5"/>
        <path d="M205 180L452 111" stroke="#d2b577" stroke-width="2"/>
        <path d="M451 106L477 104 457 117Z" fill="#edf0de" stroke="#58665d" stroke-width="1.2"/>
        <path d="M236 169L242 178M241 168L247 176M246 167L252 175M251 165L257 173" stroke="#a46e55" stroke-width="2"/>
        <path d="M272 158L304 149M286 168L313 160M321 142L342 136" stroke="#a79465" stroke-width="1.6" opacity=".6"/>
      </g>
    </g>
    <g v-if="!archery" data-playground-layer="trajectory" stroke="#9b9b73" stroke-width="1.6" stroke-linecap="round"><path d="M346 151Q437 98 512 180" stroke-dasharray="4 6"/><path d="M500 176L512 180 511 168"/></g>

    <!-- A full target face: ten scoring rings, a timber easel and an embedded arrow. -->
    <g v-if="archery" data-playground-layer="obstacle">
      <g transform="translate(420 230) rotate(8)" stroke-linejoin="round">
        <path d="M-36 73L-65 142M32 77L65 140M37 81L81 132" stroke="#4c513a" stroke-width="8" stroke-linecap="round"/>
        <path d="M-36 73L-65 142M32 77L65 140M37 81L81 132" stroke="#b18e58" stroke-width="4.5" stroke-linecap="round"/>
        <path d="M-49 112H48" stroke="#a37f49" stroke-width="5"/>
        <ellipse cx="8" rx="81" ry="105" fill="#b39561" stroke="#303728" stroke-width="2.5"/>
        <ellipse rx="81" ry="105" fill="#f8f2e6" stroke="#303728" stroke-width="2.5"/>
        <ellipse rx="73" ry="95" stroke="#a8a393" stroke-width="1"/>
        <ellipse rx="65" ry="84" fill="#444542" stroke="#7a7a70" stroke-width="1"/>
        <ellipse rx="57" ry="74" stroke="#96988b" stroke-width="1"/>
        <ellipse rx="49" ry="63" fill="#439dc1" stroke="#397e9b" stroke-width="1"/>
        <ellipse rx="41" ry="53" stroke="#286a88" stroke-width="1"/>
        <ellipse rx="33" ry="42" fill="#eb7460" stroke="#b95649" stroke-width="1"/>
        <ellipse rx="25" ry="32" stroke="#b95649" stroke-width="1"/>
        <ellipse rx="17" ry="22" fill="#f4d26c" stroke="#b69843" stroke-width="1"/>
        <ellipse rx="9" ry="12" stroke="#b69843" stroke-width="1"/>
        <path d="M-3 0H3M0-3V3" stroke="#af8c37" stroke-width=".9"/>
        <circle cy="-99" r="1.5" fill="#5a5e4c"/><circle cy="99" r="1.5" fill="#5a5e4c"/>
        <g data-playground-layer="projectile">
          <path d="M-157-21L-2-3" stroke="#3d402e" stroke-width="4" stroke-linecap="round"/>
          <path d="M-157-21L-2-3" stroke="#d3b373" stroke-width="1.8"/>
          <path d="M-144-19L-160-33-181-35-167-22-184-13-162-12Z" fill="#f3ce6d" stroke="#4c4f37" stroke-width="1.6"/>
          <path d="M-168-28L-158-22M-173-17L-159-20" stroke="#a4863a" stroke-width="1"/>
          <circle cx="-2" cy="-3" r="3" fill="#4c4f37"/>
        </g>
      </g>
    </g>
  </g>
</template>
