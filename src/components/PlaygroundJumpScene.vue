<script setup lang="ts">
import DoodleAthlete from './DoodleAthlete.vue'
defineProps<{ sport: string }>()
</script>

<template>
  <g v-if="sport === 'high-jump'">
    <g data-playground-layer="terrain">
      <path d="M-12 312L435 247 594 343 122 417Z" fill="#afc596"/>
      <path d="M-12 312L435 247 594 343 122 417Z" fill="url(#playground-grass)"/>
      <path d="M-28 346C62 321 128 303 176 275" stroke="#f6f3dd" stroke-width="27"/>
      <path d="M-28 346C62 321 128 303 176 275" stroke="#be7456" stroke-width="23"/>
      <path d="M-28 346C62 321 128 303 176 275" stroke="#f6f3dd" stroke-width="1.5" stroke-dasharray="12 8"/>
      <path d="M247 343L482 308 527 328 284 370Z" fill="#425d62" opacity=".16"/>
      <!-- A padded, stitched landing mat with a front apron and carry handles. -->
      <g stroke="#4d647b" stroke-width="1.7" stroke-linejoin="round">
        <path d="M229 270L452 237 510 278 279 316Z" fill="#a9c0d8"/>
        <path d="M279 316L510 278V318L279 359Z" fill="#6e91b5"/>
        <path d="M229 270L279 316V359L229 311Z" fill="#8aa8c6"/>
        <path d="M243 271L451 246 493 277 281 308Z" fill="#b5cbdc" stroke="#cfdfdf" stroke-width="1"/>
        <path d="M306 263L354 296M375 254L423 285M281 327L503 291M291 314V352M365 302V339M437 290V327" stroke="#d5e0e0" stroke-width="1" stroke-dasharray="3 3" opacity=".8"/>
        <path d="M319 333V340H335V330M410 318V325H426V315" stroke="#425f7b" stroke-width="2"/>
      </g>
      <g fill="#faf5df" stroke="#b5814a" stroke-width="1">
        <path d="M126 318L137 293 146 315Z" fill="#e2a267"/><ellipse cx="137" cy="317" rx="15" ry="3"/>
      </g>
      <path d="M95 332L102 328M116 324L123 320M147 305L153 300" stroke="#fff9e6" stroke-width="3" stroke-linecap="round"/>
    </g>
    <g data-playground-layer="obstacle">
      <g stroke="#607479" stroke-width="1.5" stroke-linejoin="round">
        <path d="M207 319V151L216 149V318Z" fill="#f6f4e8"/>
        <path d="M448 282V116L457 114V281Z" fill="#f6f4e8"/>
        <path d="M209 168H215M209 185H213M209 202H215M209 219H213M209 236H215M209 253H213M209 270H215M450 133H456M450 150H454M450 167H456M450 184H454M450 201H456M450 218H454M450 235H456" stroke-width="1"/>
        <path d="M192 319H231M435 283H473" stroke="#e8eadb" stroke-width="5"/>
        <path d="M211 172L453 137" stroke="#6c5690" stroke-width="5"/>
        <path d="M212 171L452 136" stroke="#a889c8" stroke-width="2"/>
        <path d="M269 164L280 162M327 155L338 153M385 147L396 145" stroke="#faf1dc" stroke-width="5"/>
      </g>
      <g transform="translate(465 174) rotate(-7)"><rect width="37" height="23" rx="3" fill="#fcf4d9" stroke="#7c8b75"/><text x="18.5" y="15" fill="#667661" font-family="monospace" font-size="10" font-weight="700" text-anchor="middle">2.10</text></g>
    </g>
    <g data-playground-layer="trajectory" stroke="#83916b" stroke-width="1.8" stroke-linecap="round">
      <path d="M139 282C170 246 175 170 258 146" stroke-dasharray="4 6"/>
      <path d="M246 143L258 146 251 156"/>
    </g>
    <g data-playground-layer="athlete"><g transform="rotate(-26 335 155)"><DoodleAthlete kind="dog" x="234" y="95" width="209" height="119"/></g></g>
    <path d="M363 95L373 83M386 111L401 106M341 82L340 67" stroke="#ae7956" stroke-width="2" stroke-linecap="round"/>
  </g>

  <g v-else>
    <g data-playground-layer="terrain">
      <path d="M-28 307L266 255 284 318-8 378Z" fill="#997a58"/>
      <path d="M-28 299L263 248 279 311-8 368Z" fill="#bd6b50" stroke="#79694f" stroke-width="1.5"/>
      <path d="M-12 313L266 264M-8 350L275 297" stroke="#fff0d7" stroke-width="2"/>
      <path d="M218 256L231 320" stroke="#faf5df" stroke-width="11"/>
      <path d="M224 255L237 318" stroke="#4b5548" stroke-width="2"/>
      <path d="M-8 358L14 354M39 349L61 345M86 340L108 336M133 331L155 327M180 322L202 318" stroke="#e8ac89" stroke-width="1.2"/>
      <!-- Timber sides, textured sand and a receding distance ruler. -->
      <g stroke="#9f9467" stroke-width="1.5" stroke-linejoin="round">
        <path d="M251 259L531 224 576 332 278 379Z" fill="#c6b57f"/>
        <path d="M278 379L576 332V344L278 391Z" fill="#ac9d65"/>
        <path d="M251 259L278 379V391L251 271Z" fill="#d9c894"/>
        <path d="M264 267L523 235 561 325 287 368Z" fill="#faeac0"/>
        <path d="M264 267L523 235 561 325 287 368Z" fill="url(#playground-sand)" stroke="none"/>
        <path d="M274 278L532 246M278 291L537 259M282 304L541 272M286 317L546 285M290 330L551 298M294 343L555 311" stroke="#daca99" stroke-width=".8" opacity=".65"/>
        <path d="M288 357L551 317M312 352L314 362M365 344L367 354M418 336L420 346M471 328L473 338M524 320L526 330"/>
      </g>
      <g fill="#918962" font-family="Arial,sans-serif" font-size="10" font-weight="800" transform="rotate(-8 400 345)"><text x="316" y="355">5</text><text x="369" y="355">6</text><text x="422" y="355">7</text><text x="475" y="355">8</text><text x="528" y="355">m</text></g>
      <g fill="#b5a274" opacity=".5"><ellipse cx="424" cy="296" rx="31" ry="5" transform="rotate(-8 424 296)"/><ellipse cx="405" cy="310" rx="14" ry="4"/><ellipse cx="435" cy="306" rx="12" ry="4"/></g>
      <path d="M460 281L468 271M471 292L485 286M448 274L451 263" stroke="#c9b783" stroke-width="2" stroke-linecap="round"/>
      <!-- The rake and marker flag give the landing area a human scale. -->
      <g stroke="#8a8060" stroke-width="1.7" stroke-linecap="round">
        <path d="M500 374L550 350M539 346L553 356M541 345L538 350M546 348L543 353M551 352L548 357"/>
        <path d="M514 232V188"/>
        <path d="M514 189L536 194 514 207Z" fill="#e79370" stroke="none"/>
      </g>
    </g>
    <g data-playground-layer="trajectory">
      <g v-if="sport === 'triple-jump'">
        <path d="M41 283Q90 177 144 265Q200 147 263 251Q346 83 442 257" stroke="#9a9570" stroke-width="1.8" stroke-dasharray="4 6" stroke-linecap="round"/>
        <DoodleAthlete kind="dog" x="48" y="212" width="84" height="51" opacity=".15"/>
        <DoodleAthlete kind="dog" x="167" y="177" width="103" height="66" opacity=".24"/>
        <g fill="#8b8662" font-family="monospace" font-size="8" letter-spacing="1"><text x="83" y="298" transform="rotate(-10 83 298)">HOP</text><text x="174" y="282" transform="rotate(-10 174 282)">STEP</text><text x="317" y="251" transform="rotate(-8 317 251)">JUMP</text></g>
        <g fill="#fff5da" stroke="#aaa079" stroke-width="1"><circle cx="44" cy="284" r="5"/><circle cx="144" cy="266" r="5"/><circle cx="263" cy="251" r="5"/></g>
      </g>
      <path v-else d="M147 270Q278 74 442 257" stroke="#9a9570" stroke-width="1.8" stroke-dasharray="4 6" stroke-linecap="round"/>
    </g>
    <g data-playground-layer="athlete"><g :transform="sport === 'triple-jump' ? 'rotate(-9 365 186)' : 'rotate(-13 327 189)'"><DoodleAthlete kind="dog" :x="sport === 'triple-jump' ? 277 : 226" y="129" width="205" height="121"/></g></g>
    <g stroke="#b4a373" stroke-width="1.8" stroke-linecap="round"><path d="M434 244L440 230M447 249L458 240M422 239L421 227"/></g>
  </g>
</template>
