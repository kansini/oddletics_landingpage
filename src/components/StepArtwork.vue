<script setup lang="ts">
import DoodleAthlete from './DoodleAthlete.vue'
import { useSitePreferences } from '../composables/preferences'
defineProps<{ index: number }>()
const { t } = useSitePreferences()
</script>

<template>
  <div v-if="index === 0" class="how-art how-art-draw">
    <svg class="drawing-scene" viewBox="0 0 330 218" aria-hidden="true">
      <defs><pattern id="how-drawing-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="#baa46a" opacity=".5"/></pattern></defs>
      <rect width="330" height="218" fill="url(#how-drawing-dots)"/>
      <g transform="rotate(-6 162 112)"><path d="M63 37H254V187H63Z" fill="#c1a86b" opacity=".24" transform="translate(5 6)"/><path d="M63 37H254V187H63Z" fill="#fffdf3" stroke="#30362b" stroke-width="1.7"/><path d="M80 57H118M80 65H101" stroke="#d1d1bd" stroke-width="2" stroke-linecap="round"/><path d="M86 165Q157 155 227 161" stroke="#c4bc9c" stroke-width="1.4" stroke-linecap="round" fill="none"/></g>
      <path class="sketch-line" d="M42 141C16 101 27 59 49 76S38 121 47 134M272 159C305 123 310 153 297 170S272 173 282 181M91 195Q168 188 225 194" stroke="#8e773e" stroke-width="2" stroke-linecap="round" stroke-dasharray="430" fill="none"/>
      <g class="drawing-pencil" stroke="#30362b" stroke-width="1.8" stroke-linejoin="round"><path d="M253 93L278 46 292 54 266 101 250 111Z" fill="#ed7958"/><path d="M253 93L266 101 250 111Z" fill="#fff3d3"/><path d="M250 111L254 102 259 107Z" fill="#30362b"/><path d="M278 46L283 38Q285 35 288 37L297 42Q300 44 298 47L292 54Z" fill="#fffdf3"/><path d="M259 94L283 51" stroke="#f9c39c"/></g>
    </svg>
    <DoodleAthlete class="drawing-dog" kind="dog"/>
    <span class="drawing-note">{{ t('drawNote') }}</span>
  </div>
  <div v-else-if="index === 1" class="how-art how-art-name">
    <svg class="pass-orbit" viewBox="0 0 330 218" aria-hidden="true"><ellipse cx="165" cy="115" rx="125" ry="68" fill="none" stroke="#8ba4aa" stroke-width="1" stroke-dasharray="4 6" transform="rotate(-17 165 115)"/><path d="M38 94L46 96M42 90V100M281 157L293 159M287 152L285 164" stroke="#547680" stroke-width="2" stroke-linecap="round"/></svg>
    <div class="athlete-pass">
      <span class="pass-tape" aria-hidden="true"/>
      <div class="pass-title">{{ t('stepPassLabel') }}<span>↗</span></div>
      <div class="pass-details"><span class="pass-portrait"><DoodleAthlete kind="dog"/></span><span class="pass-name"><small>{{ t('helloName') }}</small><strong>{{ t('stepAthleteName') }}</strong><span>PLAYER 01</span></span></div>
      <div class="pass-bottom"><span class="pass-barcode" aria-hidden="true"/><span>ODD / 0001</span></div>
    </div>
    <span class="pass-stamp">{{ t('stepReady') }} <span aria-hidden="true">✓</span></span>
  </div>
  <div v-else class="how-art how-art-play">
    <svg class="mini-race-scene" viewBox="0 0 330 218" aria-hidden="true">
      <defs><pattern id="how-finish" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M0 0H8V8H0ZM8 8H16V16H8Z" fill="#25291e"/></pattern></defs>
      <path d="M0 124L330 66V167L0 225Z" fill="#b95136"/><path d="M0 150L330 92M0 185L330 127M0 219L330 161" fill="none" stroke="#f9eed5" stroke-width="2"/>
      <path d="M267 78L281 76V177L267 179Z" fill="#fff7e5"/><path d="M267 78L281 76V177L267 179Z" fill="url(#how-finish)"/>
      <path d="M35 153L67 147M24 164L49 159M53 185L78 180" stroke="#f4b690" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(72 183) rotate(-10)"><ellipse cx="87" cy="0" rx="62" ry="7" fill="#763a2b" opacity=".25"/></g>
      <g class="race-confetti" fill="none" stroke-width="3" stroke-linecap="round"><path d="M76 55L70 46M239 41L246 32M188 47V35M117 28L122 20" stroke="#bc543a"/><path d="M55 78L45 77M273 58L281 62M219 66L226 61M151 31L148 22" stroke="#bc9428"/></g>
      <g transform="translate(244 15) rotate(8)"><path d="M0 13L11 9 14-2 24 4 35 0 37 12 48 18 41 28 42 40 29 41 20 50 11 42-1 43-3 30-12 23Z" fill="#ffda55" stroke="#25291e" stroke-width="1.5"/><path d="M9 24L18 31 30 16" fill="none" stroke="#25291e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>
    </svg>
    <div class="step-racer"><DoodleAthlete kind="dog"/></div>
    <span class="race-caption">GO, LITTLE WEIRDO!</span>
  </div>
</template>

<style scoped lang="scss">
.how-art {
  position: relative;
  width: 100%;
  height: 100%;
  color: #25291e;
  overflow: visible;
  > svg {
    width: 100%;
    height: 100%;
  }
}
.how-art-draw {
  background: #f4e2ac;
}
.drawing-scene {
  position: absolute;
  inset: 0;
}
.how-art-draw > .drawing-dog {
  position: absolute;
  width: 48%;
  height: 43%;
  left: 25%;
  top: 34%;
  transform: rotate(-6deg);
}
.drawing-note {
  position: absolute;
  left: 16px;
  top: 13px;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: .5px;
  transform: rotate(-5deg);
  color: #856f3f;
}
.how-art-name {
  background: #dce9ed;
  display: grid;
  place-items: center;
}
.pass-orbit {
  position: absolute;
  inset: 0;
}
.athlete-pass {
  position: relative;
  width: 75%;
  max-width: 266px;
  border: 1.5px solid #25291e;
  border-radius: 5px;
  background: #fffdf3;
  transform: rotate(-7deg);
  box-shadow: 4px 5px 0 #54768026;
  padding: 11px 13px 9px;
}
.pass-tape {
  position: absolute;
  width: 64px;
  height: 20px;
  left: calc(50% - 32px);
  top: -12px;
  transform: rotate(8deg);
  background: #ffd166bf;
  border-inline: 1px dashed #b49243;
}
.pass-title {
  font: 700 8px/1.4 Arial,sans-serif;
  letter-spacing: 1px;
  border-bottom: 1px solid #dedbcb;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  > span {
    font-size: 13px;
    line-height: 1;
  }
}
.pass-details {
  display: flex;
  align-items: center;
  gap: 11px;
  padding-block: 13px;
}
.pass-portrait {
  width: 65px;
  height: 64px;
  display: grid;
  place-items: center;
  background: #f4e2ac;
  border: 1px solid #e4ce95;
  border-radius: 3px;
  flex-shrink: 0;
  svg {
    width: 92%;
    height: 65%;
  }
}
.pass-name {
  display: grid;
  gap: 5px;
  small {
    font-size: 6px;
    letter-spacing: 1px;
  }
  strong {
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: -.6px;
  }
  > span {
    font: 7px/1.2 monospace;
    letter-spacing: 1px;
    color: #727464;
  }
}
.pass-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #dedbcb;
  padding-top: 7px;
  gap: 9px;
  > span:last-child {
    font: 7px/1.2 monospace;
    letter-spacing: .8px;
  }
}
.pass-barcode {
  height: 15px;
  width: 70px;
  background: repeating-linear-gradient(90deg,#25291e 0 1px,transparent 1px 3px,#25291e 3px 6px,transparent 6px 8px,#25291e 8px 10px,transparent 10px 12px);
}
.pass-stamp {
  position: absolute;
  right: 9px;
  bottom: 19px;
  padding: 7px 10px;
  border: 2px solid #b3553d;
  border-radius: 3px;
  color: #b3553d;
  background: #fffdf3e8;
  font-size: 11px;
  font-weight: 800;
  transform: rotate(12deg);
  > span {
    margin-left: 5px;
  }
}
.how-art-play {
  background: #f2e7cf;
}
.mini-race-scene {
  position: absolute;
  inset: 0;
}
.step-racer {
  position: absolute;
  left: 21%;
  top: 40%;
  width: 53%;
  height: 43%;
  transform: rotate(-10deg);
  svg {
    width: 100%;
    height: 100%;
  }
}
.race-caption {
  position: absolute;
  bottom: 8px;
  left: 13px;
  font: 700 7px/1.4 Arial,sans-serif;
  letter-spacing: 1.3px;
  color: #fff5de;
  transform: rotate(-10deg);
}
@media (min-width: 601px) and (max-width: 1100px) {
  .athlete-pass {
    width: 82%;
    padding: 9px 10px 7px;
  }
  .pass-title {
    font-size: 6px;
    padding-bottom: 6px;
    letter-spacing: .5px;
  }
  .pass-details {
    gap: 8px;
    padding-block: 10px;
  }
  .pass-portrait {
    width: 49px;
    height: 49px;
  }
  .pass-name {
    gap: 4px;
    strong {
      font-size: 16px;
    }
    small {
      font-size: 5px;
      letter-spacing: .5px;
    }
  }
  .pass-stamp {
    font-size: 9px;
    right: 5px;
    bottom: 16px;
    padding: 6px;
  }
  .pass-bottom > span:last-child {
    font-size: 6px;
    letter-spacing: 0;
  }
  .pass-barcode {
    width: 52px;
    height: 12px;
  }
}
@media (min-width: 601px) and (max-width: 800px) {
  .drawing-note {
    font-size: 6px;
    left: 8px;
    top: 14px;
  }
  .athlete-pass {
    padding: 8px 8px 6px;
    width: 86%;
  }
  .pass-title {
    font-size: 5px;
  }
  .pass-portrait {
    width: 40px;
    height: 43px;
  }
  .pass-name strong {
    font-size: 13px;
  }
  .pass-name > span {
    font-size: 5px;
  }
  .pass-bottom > span:last-child {
    font-size: 5px;
  }
  .pass-barcode {
    width: 42px;
  }
  .pass-stamp {
    font-size: 8px;
    padding: 5px;
  }
  .race-caption {
    font-size: 5px;
    left: 8px;
  }
}
@media (max-width: 370px) {
  .athlete-pass {
    width: 80%;
    padding-inline: 10px;
  }
  .pass-title {
    font-size: 7px;
    letter-spacing: .5px;
  }
  .pass-details {
    gap: 9px;
  }
  .pass-portrait {
    width: 53px;
    height: 55px;
  }
  .pass-name strong {
    font-size: 16px;
  }
}
</style>
