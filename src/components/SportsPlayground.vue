<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSports } from '../data/sports'
import { useSitePreferences } from '../composables/preferences'
import PlaygroundArtwork from './PlaygroundArtwork.vue'

const { t } = useSitePreferences()
const sports = useSports()
const selected = ref(0)
const compact = ref(false)
const root = ref<HTMLElement>()
const sport = computed(() => sports.value[selected.value]!)
const tones: Record<string, string> = {
  sprint: '#f4d795', hurdles: '#d8e5e9', 'long-jump': '#e8dec0',
  'high-jump': '#d8e1bd', javelin: '#e7dfc7', swimming: '#cce5e6',
  diving: '#d3e4e7', archery: '#e4dfc6', 'triple-jump': '#e8d4bd',
}
let viewport: MediaQueryList | undefined
function syncLayout() { compact.value = viewport?.matches ?? false }
onMounted(() => {
  viewport = window.matchMedia('(max-width: 900px)')
  syncLayout()
  viewport.addEventListener('change', syncLayout)
})
onBeforeUnmount(() => viewport?.removeEventListener('change', syncLayout))
function refreshParallax() { ScrollTrigger.refresh() }
function move(offset: number) { selected.value = (selected.value + offset + sports.value.length) % sports.value.length }
function handleKeys(event: KeyboardEvent) {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  if (event.key === 'Home') selected.value = 0
  else if (event.key === 'End') selected.value = sports.value.length - 1
  else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') move((event.key === 'ArrowDown' ? 1 : -1) * (compact.value ? 3 : 1))
  else move(event.key === 'ArrowRight' ? 1 : -1)
  nextTick(() => root.value?.querySelector<HTMLButtonElement>(`#sport-tab-${selected.value}`)?.focus())
}
</script>

<template>
  <section id="events" ref="root" class="playground-section section-space" aria-labelledby="events-title">
    <div class="wrap">
      <div class="playground-heading" data-reveal>
        <div><p class="eyebrow section-index">02 / PICK YOUR PLAYGROUND</p><h2 id="events-title">{{ t('eventsTitleFirst') }}<br/>{{ t('eventsTitleMiddle') }}<span class="playground-highlight">{{ t('eventsTitleAccent') }}<svg viewBox="0 0 230 64" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="115" cy="32" rx="112" ry="28" fill="none" stroke="currentColor" stroke-width="1.7" transform="rotate(-4 115 32)"/></svg></span>{{ t('eventsTitleLast') }}</h2></div>
        <div class="playground-heading-aside"><span class="playground-total" aria-hidden="true">09<span>↗</span></span><p class="multiline">{{ t('eventsIntro') }}</p></div>
      </div>
      <div class="playground-board">
        <div class="playground-directory">
          <div class="directory-heading"><span>{{ t('eventsDirectory') }}</span><span>01 — 09</span></div>
          <div class="event-menu" role="tablist" :aria-label="t('chooseSport')" :aria-orientation="compact ? 'horizontal' : 'vertical'" @keydown="handleKeys">
            <button v-for="(event, index) in sports" :id="`sport-tab-${index}`" :key="event.file" type="button" role="tab" :aria-selected="selected === index" :tabindex="selected === index ? 0 : -1" aria-controls="sport-panel" :class="{active: selected === index}" @click="selected = index">
              <span class="event-menu-number">0{{ index + 1 }}</span><img :src="`/sports/${event.file}.svg`" alt="" width="40" height="40" aria-hidden="true"/><span class="event-menu-title">{{ event.title }}</span><span class="event-menu-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
          <p class="directory-note">{{ t('eventsDirectoryNote') }}</p>
        </div>
        <div id="sport-panel" class="event-detail" role="tabpanel" :aria-labelledby="`sport-tab-${selected}`" tabindex="0">
          <div class="event-panel-header"><span>{{ t('eventsPoster') }}</span><span>EVENT <b>{{ String(selected + 1).padStart(2, '0') }}</b> / 09</span></div>
          <Transition name="playground-swap" mode="out-in" @after-enter="refreshParallax">
            <div :key="sport.file" class="event-poster">
              <div class="event-stage" :class="`event-stage-${sport.file}`" :style="{'--event-tone': tones[sport.file]}" role="img" :aria-label="t('sportArtAlt', {sport: sport.title})">
                <span class="event-stage-kicker">ODD ATHLETES.<br/>REAL GAMES.</span><span class="event-stage-number" aria-hidden="true">0{{ selected + 1 }}</span>
                <strong class="event-stage-title">{{ sport.title }}</strong>
                <PlaygroundArtwork :sport="sport.file"/>
                <span class="event-stage-ticket">LET’S PLAY<span>↗</span></span><span class="event-stage-note">{{ sport.note }}</span>
              </div>
              <div class="event-story"><span class="event-category">{{ sport.tag }}<span aria-hidden="true">✳</span></span><p class="event-english">{{ sport.en }}</p><h3 class="multiline">{{ sport.line }}</h3><p class="event-description">{{ sport.text }}</p><a href="#play" class="event-cta">{{ t('sportCta') }}<span>↗</span></a><p class="event-story-note">{{ t('sportNote') }}</p></div>
            </div>
          </Transition>
          <div class="event-panel-footer"><span>DRAW ONCE. PLAY NINE WAYS.</span><div class="event-pager"><button type="button" :aria-label="t('previousSport')" @click="move(-1)">←</button><span>{{ String(selected + 1).padStart(2, '0') }}<i>/ 09</i></span><button type="button" :aria-label="t('nextSport')" @click="move(1)">→</button></div></div>
        </div>
      </div>
      <div class="playground-bottom"><span>EVERY BODY IS AN ATHLETE.</span><p><strong>9</strong>{{ t('eventsTotal') }}</p></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.playground-section {
  background: var(--surface-alt);
  border-block: 1px solid var(--line);
  padding-block: 93px 58px;
}
.playground-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 35px;
  margin-bottom: 43px;
}
.playground-heading h2 {
  font-size: clamp(32px,3.2vw,45px);
  line-height: 1.5;
  letter-spacing: -1.8px;
  font-weight: 850;
}
.playground-heading .section-index {
  margin-bottom: 21px;
}
.playground-highlight {
  position: relative;
  display: inline-block;
  margin-inline: 8px;
  svg {
    position: absolute;
    inset: -3% -7%;
    width: 114%;
    height: 112%;
    color: #b08538;
  }
}
.playground-heading-aside {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 6px;
  > p {
    color: var(--muted);
    font-size: 12px;
    line-height: 1.9;
  }
}
.playground-total {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font: 800 83px/.9 Arial,sans-serif;
  letter-spacing: -7px;
  color: transparent;
  -webkit-text-stroke: 1px var(--strong-line);
  > span {
    color: var(--ink);
    -webkit-text-stroke: 0;
    font-size: 24px;
    line-height: 1;
    letter-spacing: 0;
  }
}
.playground-board {
  display: grid;
  grid-template-columns: 230px minmax(0,1fr);
  background: var(--paper);
  border: 1.5px solid var(--ink);
  border-radius: 10px;
  box-shadow: 6px 7px 0 var(--shadow);
  overflow: hidden;
}
.playground-directory {
  border-right: 1px solid var(--ink);
  display: flex;
  flex-direction: column;
}
.directory-heading {
  min-height: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 9px;
  padding: 15px 17px;
  border-bottom: 1px solid var(--line);
  > span:first-child {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: .8px;
  }
  > span:last-child {
    font: 8px/1.4 monospace;
    color: var(--muted);
  }
}
.event-menu {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  button {
    min-height: 48px;
    display: flex;
    align-items: center;
    gap: 9px;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 4px 9px;
    text-align: left;
    transition: background .2s,border-color .2s;
    img {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
    }
    &:hover {
      background: var(--surface-alt);
      border-color: var(--line);
    }
    &.active {
      background: #ffd166;
      color: #20231c;
      border-color: #20231c;
      .event-menu-number,.event-menu-arrow {
        color: #20231c;
      }
      .event-menu-arrow {
        opacity: 1;
      }
    }
  }
}
.event-menu-number {
  font: 8px/1.4 monospace;
  color: var(--muted);
}
.event-menu-title {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}
.event-menu-arrow {
  margin-left: auto;
  opacity: 0;
  font-size: 16px;
}
.directory-note {
  font-size: 9px;
  line-height: 1.8;
  color: var(--muted);
  padding: 11px 17px 18px;
  margin-top: auto;
  border-top: 1px dashed var(--line);
}
.event-detail {
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.event-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 49px;
  border-bottom: 1px solid var(--line);
  padding: 13px 23px;
  font: 8px/1.4 monospace;
  letter-spacing: 1px;
  color: var(--muted);
  b {
    color: var(--ink);
    margin-inline: 4px;
  }
}
.event-poster {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0,1.15fr) minmax(0,1fr);
  min-height: 449px;
}
.event-stage {
  position: relative;
  isolation: isolate;
  min-width: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: var(--event-tone);
  color: #25291e;
  border-right: 1px solid var(--line);
}
.playground-artwork {
  width: 120%;
  max-width: none;
  margin-left: -10%;
  flex-shrink: 0;
}
.event-stage-kicker {
  position: absolute;
  top: 23px;
  left: 24px;
  font: 800 10px/1.5 Arial,sans-serif;
  letter-spacing: 1.2px;
  color: #25291e8c;
}
.event-stage-number {
  position: absolute;
  top: 14px;
  right: 21px;
  font: 800 69px/1 Arial,sans-serif;
  letter-spacing: -5px;
  opacity: .12;
}
.event-stage-title {
  position: absolute;
  top: 81px;
  left: 24px;
  z-index: 1;
  font-size: clamp(30px, 3.1vw, 44px);
  font-weight: 900;
  letter-spacing: -1.6px;
  line-height: 1.1;
}
.event-stage-ticket {
  position: absolute;
  bottom: 52px;
  left: 22px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 9px 12px;
  border: 1.5px solid #25291e;
  background: #fff9e9;
  border-radius: 3px;
  box-shadow: 3px 3px 0 #25291e;
  font-size: 13px;
  font-weight: 800;
  transform: rotate(-6deg);
  > span {
    font-size: 19px;
    line-height: 1;
  }
}
.event-stage-note {
  position: absolute;
  bottom: 18px;
  right: 20px;
  font: 8px/1.5 monospace;
  letter-spacing: .8px;
  color: #25291e9c;
}
.event-story {
  padding: 29px 27px 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}
.event-category {
  display: inline-flex;
  align-items: center;
  gap: 17px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 9px;
  font-size: 10px;
  font-weight: 600;
  > span {
    color: #ae7741;
    font-size: 18px;
    line-height: 1;
  }
}
.event-english {
  font: 7px/1.6 monospace;
  letter-spacing: 1px;
  color: var(--muted);
  margin-top: 28px;
}
.event-story h3 {
  font-size: clamp(23px,2.05vw,29px);
  line-height: 1.55;
  letter-spacing: -.9px;
  margin-top: 9px;
  font-weight: 850;
}
.event-description {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.95;
  margin-top: 17px;
}
.event-cta {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 21px;
  background: var(--ink);
  color: var(--paper);
  border: 1px solid var(--ink);
  border-radius: 4px;
  padding: 13px 15px;
  margin-top: 26px;
  font-size: 12px;
  font-weight: 650;
  transition: transform .2s,box-shadow .2s;
  > span {
    font-size: 20px;
    line-height: 1;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 3px 4px 0 var(--accent);
  }
}
.event-story-note {
  font-size: 9px;
  color: var(--muted);
  margin-top: auto;
  padding-top: 23px;
}
.event-panel-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  border-top: 1px solid var(--line);
  padding: 10px 18px;
  min-height: 52px;
  > span {
    font: 7px/1.5 monospace;
    letter-spacing: 1px;
    color: var(--muted);
  }
}
.event-pager {
  display: flex;
  align-items: center;
  gap: 14px;
  button {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: 50%;
    font-size: 17px;
    transition: background .2s;
    &:hover {
      background: var(--accent);
      color: #25291e;
      border-color: #25291e;
    }
  }
  > span {
    font: 9px/1.4 monospace;
    white-space: nowrap;
  }
  i {
    color: var(--muted);
    font-style: normal;
    margin-left: 6px;
  }
}
.playground-bottom {
  margin-top: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  > span {
    font: 8px/1.5 monospace;
    letter-spacing: 1.3px;
    color: var(--muted);
  }
  > p {
    font-size: 10px;
    color: var(--muted);
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  strong {
    font: 800 16px/1 Arial,sans-serif;
    color: var(--ink);
  }
}
.playground-swap-enter-active,.playground-swap-leave-active {
  transition: opacity .15s ease,transform .15s ease;
}
.playground-swap-enter-from {
  opacity: 0;
  transform: translateY(7px);
}
.playground-swap-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
:global(:root[lang='en'] .playground-heading h2) {
  font-size: clamp(31px,3.05vw,43px);
  letter-spacing: -1.7px;
}
:global(:root[lang='en'] .event-story h3) {
  font-size: 28px;
  letter-spacing: -1px;
}
:global(:root[lang='en'] .event-menu-title) {
  font-size: 11px;
}
@media (max-width: 1150px) {
  .playground-board {
    grid-template-columns: 199px minmax(0,1fr);
  }
  .event-menu {
    padding: 7px;
    button {
      gap: 6px;
      padding-inline: 7px;
      img {
        width: 28px;
        height: 28px;
      }
    }
  }
  .event-menu-title {
    font-size: 11px;
  }
  .playground-heading-aside {
    gap: 14px;
    > p {
      font-size: 11px;
    }
  }
  .playground-total {
    font-size: 69px;
  }
  .event-story {
    padding: 27px 21px 21px;
  }
  .event-story h3 {
    font-size: 24px;
  }
  .event-description {
    font-size: 11px;
  }
  .event-cta {
    padding-inline: 11px;
    font-size: 10px;
    gap: 15px;
  }
  .event-stage-kicker {
    left: 18px;
    font-size: 9px;
  }
  .event-stage-number {
    font-size: 58px;
    right: 16px;
  }
  :global(:root[lang='en'] .event-story h3) {
    font-size: 25px;
  }
  :global(:root[lang='en'] .event-menu-title) {
    font-size: 10px;
  }
}
@media (max-width: 900px) {
  .playground-section {
    padding-block: 75px 50px;
  }
  .playground-heading {
    align-items: flex-start;
    gap: 25px;
  }
  .playground-heading h2 {
    font-size: 32px;
  }
  .playground-heading-aside {
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
    padding-top: 5px;
  }
  .playground-total {
    font-size: 58px;
  }
  .playground-board {
    grid-template-columns: minmax(0,1fr);
  }
  .playground-directory {
    border-right: 0;
    border-bottom: 1px solid var(--ink);
  }
  .directory-heading {
    padding-inline: 18px;
    min-height: 42px;
  }
  .event-menu {
    display: grid;
    grid-template-columns: repeat(3,minmax(0,1fr));
    gap: 5px;
    padding: 10px;
    button {
      min-height: 49px;
      gap: 9px;
      img {
        width: 34px;
        height: 34px;
      }
    }
  }
  .event-menu-title {
    font-size: 12px;
  }
  .directory-note {
    display: none;
  }
  .event-poster {
    min-height: 415px;
  }
  .event-stage-ticket {
    bottom: 47px;
  }
  .event-story {
    padding: 27px;
  }
  .event-story h3 {
    font-size: 27px;
  }
  .event-description {
    font-size: 11px;
  }
  .event-cta {
    font-size: 11px;
  }
  :global(:root[lang='en'] .event-menu-title) {
    font-size: 11px;
  }
}
@media (max-width: 600px) {
  .playground-section {
    padding-block: 62px 41px;
  }
  .playground-heading {
    flex-direction: column;
    gap: 22px;
    margin-bottom: 29px;
  }
  .playground-heading .section-index {
    font-size: 8px;
    margin-bottom: 18px;
  }
  .playground-heading h2 {
    font-size: clamp(27px,7.4vw,40px);
    letter-spacing: -1.5px;
    line-height: 1.7;
  }
  .playground-highlight {
    margin-inline: 5px;
  }
  .playground-heading-aside {
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 19px;
    padding: 0;
    > p {
      font-size: 11px;
    }
  }
  .playground-total {
    font-size: 56px;
    letter-spacing: -4px;
    gap: 6px;
    > span {
      font-size: 17px;
    }
  }
  .playground-board {
    border-radius: 7px;
    box-shadow: 4px 5px 0 var(--shadow);
  }
  .directory-heading {
    padding-inline: 12px;
    min-height: 40px;
    > span:first-child {
      font-size: 9px;
    }
  }
  .event-menu {
    padding: 7px;
    gap: 4px;
    button {
      min-height: 64px;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      padding: 7px 3px;
      position: relative;
      img {
        width: 28px;
        height: 28px;
      }
    }
  }
  .event-menu-number {
    position: absolute;
    top: 6px;
    left: 5px;
    font-size: 6px;
  }
  .event-menu-title {
    font-size: 10px;
  }
  .event-menu-arrow {
    display: none;
  }
  .event-panel-header {
    min-height: 41px;
    padding: 12px;
    font-size: 6px;
    letter-spacing: .5px;
  }
  .event-poster {
    grid-template-columns: minmax(0,1fr);
    min-height: 636px;
  }
  .event-stage {
    min-height: 307px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .playground-artwork {
    width: 108%;
    margin-left: -4%;
  }
  .event-stage-kicker {
    left: 17px;
    top: 17px;
    font-size: 8px;
  }
  .event-stage-number {
    right: 15px;
    top: 11px;
    font-size: 57px;
  }
  .event-stage-title {
    top: 65px;
    left: 17px;
    font-size: 30px;
  }
  .event-stage-diving .event-stage-title {
    top: 45px;
  }
  .event-stage-ticket {
    left: 16px;
    bottom: 40px;
    font-size: 12px;
    padding: 7px 10px;
  }
  .event-stage-note {
    bottom: 12px;
    right: 15px;
    font-size: 7px;
  }
  .event-story {
    padding: 25px 23px 24px;
  }
  .event-category {
    font-size: 10px;
  }
  .event-english {
    margin-top: 21px;
    font-size: 7px;
  }
  .event-story h3 {
    font-size: 28px;
    margin-top: 8px;
  }
  .event-description {
    font-size: 12px;
    line-height: 1.9;
    margin-top: 14px;
  }
  .event-cta {
    margin-top: 22px;
    font-size: 12px;
    padding: 13px 16px;
  }
  .event-story-note {
    padding-top: 17px;
    font-size: 9px;
  }
  .event-panel-footer {
    padding: 9px 12px;
    > span {
      font-size: 5px;
      letter-spacing: .5px;
      max-width: 120px;
    }
  }
  .event-pager {
    gap: 9px;
    button {
      width: 34px;
      height: 34px;
    }
    > span {
      font-size: 8px;
    }
  }
  .playground-bottom {
    align-items: flex-start;
    > span {
      font-size: 6px;
      letter-spacing: .6px;
    }
    > p {
      font-size: 8px;
      gap: 4px;
    }
    strong {
      font-size: 13px;
    }
  }
  :global(:root[lang='en'] .playground-heading h2) {
    font-size: 29px;
    letter-spacing: -1.3px;
  }
  :global(:root[lang='en'] .event-menu-title) {
    font-size: 9px;
  }
  :global(:root[lang='en'] .event-story h3) {
    font-size: 29px;
  }
}
</style>
