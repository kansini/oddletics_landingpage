<script setup lang="ts">
import DoodleAthlete from './DoodleAthlete.vue'
import { useSitePreferences } from '../composables/preferences'
const { t } = useSitePreferences()
</script>

<template>
  <div class="hero-art stadium-art" role="img" :aria-label="t('heroArtLabel')">
    <svg class="track-scene" viewBox="0 0 760 600" aria-hidden="true">
      <defs>
        <pattern id="stadium-grain" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".65" fill="#20231c" opacity=".11"/></pattern>
        <pattern id="stadium-checks" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M0 0H11V11H0ZM11 11H22V22H11Z" fill="#20231c"/></pattern>
        <clipPath id="pool-clip"><rect x="52" y="102" width="272" height="145" rx="24"/></clipPath>
      </defs>

      <!-- Each wrapper owns scroll motion; nested transforms keep the original composition. -->
      <g data-hero-layer="backdrop">
        <path d="M71 161C72 77 186 49 307 67 430 33 627 49 680 146 722 225 704 293 721 378 739 477 647 538 506 526 375 564 191 546 109 482 35 425 39 348 58 275 35 231 45 193 71 161Z" fill="#f6edcf"/>
        <path d="M71 161C72 77 186 49 307 67 430 33 627 49 680 146 722 225 704 293 721 378 739 477 647 538 506 526 375 564 191 546 109 482 35 425 39 348 58 275 35 231 45 193 71 161Z" fill="url(#stadium-grain)"/>

      </g>

      <!-- A miniature pool and deliberately wonky swimmer borrow the app's palette. -->
      <g data-hero-layer="pool">
        <g transform="rotate(-9 188 177)">
          <rect x="45" y="95" width="286" height="159" rx="30" fill="#fcfbef" stroke="#25291e" stroke-width="2"/>
          <rect x="52" y="102" width="272" height="145" rx="24" fill="#169fc9"/>
          <g clip-path="url(#pool-clip)">
            <path d="M46 151H332M46 202H332" stroke="#fffcef" stroke-width="4" stroke-dasharray="4 7" stroke-linecap="round"/>
            <path d="M60 125H170M216 126H293M80 178H141M229 177H310M55 225H139M207 225H282" stroke="#7fd3e1" stroke-width="2" opacity=".6"/>
            <path d="M81 108L65 247M142 104L127 246M204 104L189 247M266 103L252 247" stroke="#fffcef" stroke-width="1" opacity=".13"/>
          </g>
          <ellipse cx="210" cy="184" rx="49" ry="10" fill="none" stroke="#d4f8f3" stroke-width="2" opacity=".6"/>
          <g class="pool-swimmer">
            <path d="M193 171C174 148 181 120 206 119 228 117 241 134 232 150L220 171 204 178Z" fill="#0868f5" stroke="#25291e" stroke-width="1.8"/>
            <ellipse cx="216" cy="140" rx="8" ry="10" fill="#fffdf5" stroke="#25291e" stroke-width="1.5"/>
            <circle cx="219" cy="138" r="2" fill="#25291e"/>
            <path d="M208 166L218 174M194 165L190 174" stroke="#25291e" stroke-width="1.8" stroke-linecap="round"/>
          </g>
          <path d="M163 177Q174 169 185 176T209 176 233 176 258 175" fill="none" stroke="#fffdf5" stroke-width="3" stroke-linecap="round"/>
          <g fill="#c5f1ee"><circle cx="166" cy="159" r="3"/><circle cx="156" cy="148" r="2"/><circle cx="172" cy="137" r="2"/></g>
        </g>

      </g>

      <!-- Infield, flags and a crowd distilled from the app's stadium graphics. -->
      <g data-hero-layer="infield">
        <path d="M331 101C441 76 604 105 634 192L655 311 270 338 286 204Z" fill="#c7d49a"/>
        <path d="M331 101C441 76 604 105 634 192L655 311 270 338 286 204Z" fill="url(#stadium-grain)"/>
        <path d="M367 146V81M406 141V69M447 143V82" stroke="#62664d" stroke-width="2"/>
        <path d="M368 81L391 87 368 103Z" fill="#f36b49"/><path d="M407 69L431 75 407 91Z" fill="#fcfaf0"/><path d="M448 82L472 88 448 104Z" fill="#498aa7"/>
        <g fill="#6c8060" opacity=".45"><circle cx="327" cy="161" r="4"/><circle cx="342" cy="158" r="4"/><circle cx="357" cy="155" r="4"/><circle cx="373" cy="155" r="4"/><circle cx="389" cy="154" r="4"/><circle cx="405" cy="153" r="4"/></g>

      </g>

      <!-- A large, almost airborne target balances the pool, without UI framing. -->
      <g data-hero-layer="target">
        <g transform="translate(587 146) rotate(13)">
          <path d="M-39 57L-64 118M23 61L42 120" stroke="#25291e" stroke-width="8" stroke-linecap="round"/>
          <path d="M-39 57L-64 118M23 61L42 120" stroke="#b18c4e" stroke-width="4" stroke-linecap="round"/>
          <ellipse cx="6" cy="0" rx="63" ry="75" fill="#a98549" stroke="#25291e" stroke-width="2.5"/>
          <ellipse rx="63" ry="75" fill="#faf6e9" stroke="#25291e" stroke-width="2.5"/>
          <ellipse rx="49" ry="59" fill="#25291e"/>
          <ellipse rx="37" ry="45" fill="#429fc5"/>
          <ellipse rx="26" ry="32" fill="#ed6755"/>
          <ellipse rx="13" ry="17" fill="#ffda55"/>
          <ellipse rx="5" ry="7" fill="none" stroke="#25291e" opacity=".5"/>
          <path d="M-123-32L-2-1" stroke="#25291e" stroke-width="5" stroke-linecap="round"/>
          <path d="M-123-32L-2-1" stroke="#c4a066" stroke-width="2" stroke-linecap="round"/>
          <path d="M-98-26L-117-45-140-48-123-32-144-22-122-17Z" fill="#ffda55" stroke="#25291e" stroke-width="2" stroke-linejoin="round"/>
        </g>

      </g>

      <!-- Broad terracotta lanes are the main stage, rather than a simulated screen. -->
      <g data-hero-layer="track">
        <g transform="rotate(-12 380 350)">
          <path d="M-2 275L664 256 713 475 14 494Z" fill="#aa452f" stroke="#25291e" stroke-width="2" stroke-linejoin="round"/>
          <path d="M-2 264L664 245 713 464 14 483Z" fill="#c65a3d" stroke="#25291e" stroke-width="2" stroke-linejoin="round"/>
          <path d="M-2 264L664 245 713 464 14 483Z" fill="url(#stadium-grain)"/>
          <g fill="none" stroke="#f9efd4" stroke-width="2.5"><path d="M2 319L676 300M6 374L689 355M10 428L701 409"/><path d="M43 263L60 482M637 246L684 465" stroke-width="4"/></g>
          <path d="M610 247L657 467 682 466 635 246Z" fill="#faf6e9"/>
          <path d="M610 247L657 467 682 466 635 246Z" fill="url(#stadium-checks)"/>
          <g fill="#fff3d4" font-family="Arial, sans-serif" font-size="26" font-weight="900" font-style="italic"><text x="70" y="303">1</text><text x="74" y="356">2</text><text x="80" y="411">3</text><text x="86" y="465">4</text></g>
          <g stroke="#f9efd4" stroke-width="2" opacity=".65"><path d="M221 472V481M360 468V477M500 464V473"/></g>
          <g fill="#753422" opacity=".26"><ellipse cx="403" cy="309" rx="43" ry="8"/><ellipse cx="499" cy="366" rx="93" ry="8"/><ellipse cx="295" cy="419" rx="57" ry="8"/><ellipse cx="463" cy="464" rx="34" ry="6"/></g>
          <g fill="none" stroke="#f8d19f" stroke-width="3" stroke-linecap="round" opacity=".7"><path d="M301 278H332M288 289H317M361 341H400M351 352H378M174 391H201M165 402H190"/></g>
          <g data-hero-layer="athletes">
            <DoodleAthlete class="hero-runner runner-one" kind="frog" color="#2cbd87" x="354" y="171" width="104" height="147"/>
            <DoodleAthlete class="hero-runner runner-two" kind="dog" x="390" y="234" width="237" height="153"/>
            <DoodleAthlete class="hero-runner runner-three" kind="blob" color="#f16c69" x="231" y="292" width="139" height="142"/>
            <!-- One small, slightly baffled duck brings the race back to the app's odd humor. -->
            <g transform="translate(441 405)" stroke="#25291e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M0 26C-18 16-21 1-10 2L9 13C17 16 23 10 24 2 22-15 43-20 49-7L48 4C48 20 32 35 15 33Z" fill="#ffda39"/>
              <path d="M48-4L63-7 60 1 48 4Z" fill="#2cbd87"/>
              <circle cx="40" cy="-6" r="2" fill="#25291e" stroke="none"/>
              <path d="M13 32L8 43 0 45M28 31L36 40 45 39" fill="none"/>
            </g>
            <g transform="translate(502 216) rotate(4)"><rect width="97" height="29" rx="5" fill="#ffda55" stroke="#25291e" stroke-width="1.5"/><text x="48.5" y="19" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="800" fill="#25291e">{{ t('artRaceLeader') }}</text><path d="M38 29L44 36 50 29" fill="#ffda55" stroke="#25291e" stroke-width="1.5"/></g>
          </g>

        </g>
      </g>

      <!-- Stadium advertising is a small wink to the actual game. -->
      <g data-hero-layer="sign">
        <g transform="translate(167 202) rotate(-12)">
          <rect width="226" height="35" rx="3" fill="#faf7e9" stroke="#25291e" stroke-width="1.8"/>
          <path d="M0 0H112V35H0Z" fill="#25291e"/>
          <text x="12" y="23" fill="#ffda55" font-family="Arial, sans-serif" font-size="18" font-weight="900">Oddletics</text>
          <text x="168" y="22" fill="#25291e" font-family="Arial, sans-serif" font-size="12" font-weight="800" text-anchor="middle">{{ t('artStadiumBoard') }}</text>
        </g>

      </g>

      <g data-hero-layer="live">
        <g transform="translate(98 55) rotate(-6)">
          <rect width="106" height="34" rx="5" fill="#25291e"/>
          <circle cx="16" cy="17" r="4" fill="#f46555"/>
          <text x="28" y="22" fill="#faf8ed" font-family="Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="2">LIVE</text>
          <path d="M87 11L92 17 87 23" stroke="#ffda55" stroke-width="2" fill="none"/>
        </g>
      </g>
      <g data-hero-layer="badge">
        <g transform="translate(647 353) rotate(9)">
          <path d="M0 0L8-16 21-9 35-18 45-5 62-4 60 13 72 25 61 37 63 53 45 56 36 70 22 61 6 65 1 48-13 39-6 23-12 9Z" fill="#ffda55" stroke="#25291e" stroke-width="2"/>
          <text x="28" y="25" text-anchor="middle" fill="#25291e" font-family="Arial, sans-serif" font-size="22" font-weight="900">100%</text>
          <text x="28" y="43" text-anchor="middle" fill="#25291e" font-family="Arial, sans-serif" font-size="10" font-weight="700">{{ t('artOriginal') }}</text>
        </g>
      </g>
      <g data-hero-layer="doodles">
        <g fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"><path d="M34 284L14 277M37 271L24 255M42 258L37 240M688 88L699 71M701 103L721 97M704 118L728 121"/><path d="M634 527Q664 550 689 522M689 522L677 524M689 522L687 535" stroke-width="1.8"/></g>
        <text x="398" y="558" transform="rotate(3 398 558)" font-family="Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="1.2" fill="var(--hero-note)">{{ t('artCaption') }}</text>
        <g transform="translate(76 493) rotate(-8)" fill="#faf7e9" stroke="#25291e" stroke-width="1.5"><path d="M0 8L8 0 17 7 27 3 30 14 41 19 33 29 35 40 23 42 16 52 6 45-7 47-9 34-19 27-11 17-12 6Z"/><path d="M6 21L13 28 25 14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>
      </g>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.stadium-art {
  width: 116%;
  margin-left: -5%;
  padding-top: 0;
  transform: rotate(-1deg);
  .track-scene { overflow: visible; }
}
.pool-swimmer { animation: swim-bob 2.1s ease-in-out infinite alternate; }
@keyframes swim-bob { to { transform: translateY(-4px) rotate(-1deg); } }
@media (max-width: 1150px) { .stadium-art { width: 125%; margin-left: -10%; } }
@media (max-width: 800px) { .stadium-art { width: 133%; margin-left: -16%; } }
@media (max-width: 600px) { .stadium-art { width: 116%; margin-left: -8%; margin-top: 24px; padding-top: 0; } }
@media (prefers-reduced-motion: reduce) { .pool-swimmer { animation: none; } }
</style>
