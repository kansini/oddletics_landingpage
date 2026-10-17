<script setup lang="ts">
import DoodleAthlete from './DoodleAthlete.vue'
import { useSitePreferences } from '../composables/preferences'
const { t } = useSitePreferences()
</script>

<template>
  <div class="hero-art" role="img" :aria-label="t('heroArtLabel')">
    <div class="art-note">{{ t('artNote') }}</div>
    <svg class="track-scene" viewBox="0 0 740 580" aria-hidden="true">
      <defs>
        <pattern id="field-dots" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#ad7d29" opacity=".35" /></pattern>
        <pattern id="finish-check" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="11" height="11" fill="#292e23" /><rect x="11" y="11" width="11" height="11" fill="#292e23" /></pattern>
      </defs>
      <path d="M89 150Q85 91 161 80L564 69Q657 74 670 155L687 405Q691 476 607 492L132 502Q59 499 57 424Z" fill="#f3bc55" />
      <path d="M89 150Q85 91 161 80L564 69Q657 74 670 155L687 405Q691 476 607 492L132 502Q59 499 57 424Z" fill="url(#field-dots)" />
      <g transform="rotate(-13 370 290)">
        <rect x="-18" y="182" width="781" height="263" rx="130" fill="#faf4e6" stroke="#34392d" stroke-width="2.5" />
        <rect x="10" y="213" width="724" height="201" rx="99" fill="none" stroke="#b7bea8" stroke-width="1.5" />
        <rect x="38" y="245" width="667" height="137" rx="68" fill="none" stroke="#b7bea8" stroke-width="1.5" />
        <path d="M114 279H636M113 345H641" stroke="#b7bea8" stroke-width="1.5" />
        <rect x="581" y="182" width="33" height="263" fill="url(#finish-check)" />
        <path d="M579 182V445M616 182V445" stroke="#34392d" stroke-width="2" />
        <g fill="#838873" font-size="23" font-family="monospace"><text x="101" y="265">01</text><text x="82" y="332">02</text><text x="101" y="396">03</text></g>
        <path d="M177 224H212M163 234H193M165 298H203M146 310H180M163 368H197" stroke="#8d9780" stroke-width="3" stroke-linecap="round" />
        <ellipse cx="403" cy="274" rx="56" ry="8" fill="#d4d8c7" />
        <ellipse cx="334" cy="338" rx="53" ry="8" fill="#d4d8c7" />
        <ellipse cx="426" cy="403" rx="48" ry="8" fill="#d4d8c7" />
        <DoodleAthlete class="hero-runner runner-one" kind="frog" color="#27b77c" x="306" y="135" width="190" height="175" />
        <DoodleAthlete class="hero-runner runner-two" kind="dog" x="219" y="195" width="226" height="209" />
        <DoodleAthlete class="hero-runner runner-three" kind="blob" color="#bdc6f1" x="339" y="274" width="179" height="165" />
      </g>
      <g transform="rotate(9 577 104)"><rect x="507" y="79" width="133" height="45" rx="4" fill="#fffdf5" stroke="#292e23" stroke-width="2" /><text x="523" y="108" font-family="monospace" font-size="21" font-weight="700" fill="#292e23">LET’S GO!</text></g>
      <g transform="translate(594 420) rotate(12)"><path d="M-2 0L13-14L22 0L40-4L41 13L54 21L40 34L43 49L25 51L14 66L1 53L-17 54L-18 34L-32 23L-16 11L-17-5Z" fill="#27b77c" stroke="#292e23" stroke-width="2" /><text x="-6" y="35" font-size="24" fill="#292e23">✦</text></g>
      <path d="M75 102L57 82M66 113L39 107M87 93L85 68M654 348L682 337M657 362L690 363" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" />
      <path d="M215 75Q207 29 165 40M165 40L178 29M165 40L184 44" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round" />
      <text x="76" y="39" font-size="14" fill="var(--hero-note)" transform="rotate(-8 76 39)">{{ t('artNoRules') }}</text>
    </svg>
    <div class="runner-card"><span class="runner-avatar"><DoodleAthlete kind="dog" /></span><div><span class="micro">{{ t('popular') }}</span><strong>{{ t('dogName') }}</strong></div><span class="runner-tag">P1</span></div>
    <span class="art-caption">{{ t('artCaption') }}</span>
  </div>
</template>
