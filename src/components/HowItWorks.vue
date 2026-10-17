<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StepArtwork from './StepArtwork.vue'
import { useSitePreferences } from '../composables/preferences'
import type { MessageKey } from '../data/messages'

gsap.registerPlugin(ScrollTrigger)
const { t } = useSitePreferences()
const section = ref<HTMLElement>()
const steps: { label: string; title: MessageKey; text: MessageKey }[] = [
  { label: 'DRAW', title: 'step1Title', text: 'step1Text' },
  { label: 'NAME', title: 'step2Title', text: 'step2Text' },
  { label: 'PLAY', title: 'step3Title', text: 'step3Text' },
]
let context: gsap.Context | undefined
let media: gsap.MatchMedia | undefined

onMounted(() => {
  context = gsap.context(() => {
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.how-progress-fill', { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.how-steps', start: 'top 85%', end: 'bottom 45%', scrub: 0.6 }
      })
      gsap.fromTo('.how-heading-star', { rotation: -30 }, {
        rotation: 65,
        ease: 'none',
        scrollTrigger: { trigger: section.value, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      })
      gsap.utils.toArray<HTMLElement>('.how-step').forEach((step, index) => {
        const sheet = step.querySelector('.step-sheet')!
        const art = step.querySelector('.how-art-depth')!
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: step, start: 'top 92%', end: 'center 60%', scrub: 0.7, invalidateOnRefresh: true }
        })
        timeline.fromTo(sheet, { y: 72, rotation: [ -6, 5, -4 ][index], opacity: 0.3 }, {
          y: 0, rotation: 0, opacity: 1, duration: 1
        }, 0)
        if (index === 0) {
          timeline.fromTo(step.querySelector('.sketch-line')!, { strokeDashoffset: 430 }, { strokeDashoffset: 0, duration: 0.8 }, 0.1)
          step.querySelectorAll<SVGPathElement>('.drawing-dog path').forEach(path => {
            const length = path.getTotalLength()
            gsap.set(path, { strokeDasharray: length })
            timeline.fromTo(path, { strokeDashoffset: length }, { strokeDashoffset: 0, duration: 0.8 }, 0.1)
          })
          timeline.fromTo(step.querySelector('.drawing-pencil')!, { x: -18, y: 25, rotation: -12, svgOrigin: '253 93' }, { x: 0, y: 0, rotation: 0, duration: 0.8 }, 0.1)
        } else if (index === 1) {
          timeline.fromTo(step.querySelector('.athlete-pass')!, { y: 38, rotation: 10 }, { y: 0, rotation: -7, duration: 0.85 }, 0.1)
          timeline.fromTo(step.querySelector('.pass-stamp')!, { scale: 1.5, opacity: 0, rotation: -30 }, { scale: 1, opacity: 1, rotation: 12, duration: 0.25 }, 0.7)
        } else {
          timeline.fromTo(step.querySelector('.step-racer')!, { x: -60 }, { x: 24, duration: 0.9 }, 0.1)
          timeline.fromTo(step.querySelector('.race-confetti')!, { y: 20, opacity: 0 }, { y: -8, opacity: 1, duration: 0.5 }, 0.5)
        }
        // The artwork drifts separately from the sheet's reveal, preserving both transforms.
        gsap.fromTo(art, { y: 14 }, {
          y: -18,
          ease: 'none',
          scrollTrigger: { trigger: step, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
        })
      })
    })
  }, section.value)
})
onBeforeUnmount(() => {
  media?.revert()
  context?.revert()
})
</script>

<template>
  <section id="how" ref="section" class="how-section section-space wrap" aria-labelledby="how-title">
    <div class="how-heading">
      <div class="how-heading-copy">
        <p class="eyebrow section-index">01 / WHAT’S THE ODD?</p>
        <h2 id="how-title">{{ t('howTitleFirst') }}<br/><span class="how-highlight">{{ t('howTitleAccent') }}<svg viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true"><path d="M3 12Q93 1 216 7M20 17Q107 8 200 13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg></span>{{ t('howTitleLast') }}</h2>
      </div>
      <div class="how-heading-aside">
        <span class="how-heading-star" aria-hidden="true">✳</span>
        <p class="multiline">{{ t('howIntro') }}</p>
        <span class="how-heading-note">3 STEPS. ZERO RULES.</span>
      </div>
    </div>
    <div class="how-steps">
      <div class="how-progress" aria-hidden="true"><span class="how-progress-fill"/><i/><i/><i/></div>
      <article v-for="(step, index) in steps" :key="step.label" class="how-step" :class="`how-step-${index + 1}`">
        <div class="step-sheet">
          <div class="how-step-header"><span class="how-step-number">0{{ index + 1 }}</span><span>{{ step.label }}<small>YOUR ODD JOURNEY</small></span><span class="how-step-mark" aria-hidden="true">{{ ['↗', '✳', '⚑'][index] }}</span></div>
          <div class="how-art-window"><div class="how-art-depth"><StepArtwork :index="index"/></div></div>
          <div class="how-step-copy"><h3>{{ t(step.title) }}</h3><p class="multiline">{{ t(step.text) }}</p></div>
          <div class="how-step-footer"><span>ODDLETICS / 00{{ index + 1 }}</span><span aria-hidden="true">{{ index === 2 ? '↗' : '→' }}</span></div>
        </div>
      </article>
    </div>
    <div class="how-bottom"><p>{{ t('howFooter') }}</p><a href="#play" class="text-link">{{ t('drawCta') }}<span>↗</span></a></div>
  </section>
</template>

<style scoped lang="scss">
.how-section {
  padding-block: 112px 82px;
}
.how-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 45px;
  margin-bottom: 47px;
}
.how-heading .section-index {
  margin-bottom: 22px;
}
.how-heading h2 {
  font-size: clamp(36px, 4.2vw, 58px);
  line-height: 1.36;
  font-weight: 900;
  letter-spacing: -2px;
}
.how-highlight {
  position: relative;
  display: inline-block;
  margin-right: 5px;
  svg {
    position: absolute;
    bottom: -4px;
    left: -3%;
    width: 106%;
    height: 15px;
    color: #b68131;
  }
}
.how-heading-aside {
  position: relative;
  padding-right: 22px;
  padding-bottom: 6px;
  > p {
    font-size: 13px;
    line-height: 1.95;
    color: var(--muted);
  }
}
.how-heading-star {
  display: block;
  width: fit-content;
  font: 55px/1 Arial, sans-serif;
  color: #ba563d;
  margin-bottom: 20px;
}
.how-heading-note {
  display: block;
  margin-top: 15px;
  font: 9px/1.5 'SFMono-Regular', Consolas, monospace;
  letter-spacing: 1.6px;
  color: var(--muted);
}
.how-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 26px;
  padding-top: 28px;
}
.how-progress {
  position: absolute;
  top: 0;
  left: 22px;
  right: 22px;
  height: 2px;
  background: var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
  > i {
    position: relative;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ink);
  }
}
.how-progress-fill {
  position: absolute;
  inset: 0;
  background: var(--ink);
  transform-origin: left center;
}
.how-step {
  min-width: 0;
  position: relative;
}
.how-step-2 {
  padding-top: 42px;
}
.how-step-3 {
  padding-top: 15px;
}
.step-sheet {
  border: 1.5px solid var(--ink);
  border-radius: 9px;
  background: var(--paper);
  box-shadow: 5px 6px 0 var(--shadow);
  overflow: hidden;
}
.how-step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 21px 14px;
  color: var(--ink);
  > span:nth-child(2) {
    font: 800 12px/1.2 Arial, sans-serif;
    letter-spacing: 1.8px;
  }
  small {
    display: block;
    margin-top: 6px;
    font: 7px/1.3 'SFMono-Regular', Consolas, monospace;
    color: var(--muted);
    letter-spacing: .7px;
  }
}
.how-step-number {
  font: 800 43px/.95 Arial, sans-serif;
  letter-spacing: -3px;
}
.how-step-mark {
  margin-left: auto;
  font: 27px/1 Arial, sans-serif;
}
.how-art-window {
  height: 218px;
  margin-inline: 12px;
  border-radius: 4px;
  overflow: hidden;
}
.how-art-depth {
  height: 100%;
}
.how-step-copy {
  padding: 22px 22px 19px;
  h3 {
    font-size: 19px;
    font-weight: 800;
    letter-spacing: -.6px;
  }
  > p {
    margin-top: 11px;
    font-size: 12px;
    line-height: 1.95;
    color: var(--muted);
  }
}
.how-step-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 22px;
  padding-block: 13px;
  border-top: 1px dashed var(--line);
  > span:first-child {
    font: 8px/1.4 'SFMono-Regular', Consolas, monospace;
    letter-spacing: 1px;
    color: var(--muted);
  }
  > span:last-child {
    font-size: 19px;
  }
}
.how-bottom {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  > p {
    font-size: 13px;
    color: var(--muted);
  }
  .text-link {
    margin-top: 0;
    font-size: 12px;
  }
}
:global(:root[lang='en'] .how-heading h2) {
  font-size: clamp(35px,4vw,55px);
  letter-spacing: -2px;
}
:global(:root[lang='en'] .how-step-copy h3) {
  font-size: 18px;
}
:global(:root[lang='en'] .how-step-copy > p) {
  white-space: normal;
}
@media (max-width: 1100px) {
  .how-steps {
    gap: 18px;
  }
  .how-step-header {
    padding-inline: 16px;
    gap: 9px;
    small {
      font-size: 6px;
    }
  }
  .how-step-number {
    font-size: 38px;
  }
  .how-art-window {
    height: 195px;
    margin-inline: 9px;
  }
  .how-step-copy {
    padding-inline: 16px;
    h3 {
      font-size: 16px;
    }
    > p {
      font-size: 11px;
    }
  }
  .how-step-footer {
    margin-inline: 16px;
  }
}
@media (max-width: 800px) {
  .how-section {
    padding-block: 80px 65px;
  }
  .how-heading {
    gap: 24px;
  }
  .how-heading h2 {
    font-size: 39px;
  }
  .how-heading-aside {
    padding-right: 0;
    > p {
      font-size: 11px;
    }
  }
  .how-heading-star {
    font-size: 43px;
    margin-bottom: 16px;
  }
  .how-step-header {
    padding: 15px 12px 12px;
    gap: 8px;
    > span:nth-child(2) {
      font-size: 10px;
      letter-spacing: 1px;
    }
    small {
      letter-spacing: 0;
      font-size: 5px;
    }
  }
  .how-step-number {
    font-size: 30px;
    letter-spacing: -2px;
  }
  .how-step-mark {
    font-size: 20px;
  }
  .how-art-window {
    height: 172px;
    margin-inline: 7px;
  }
  .how-step-copy {
    padding: 17px 12px;
    h3 {
      font-size: 14px;
    }
    > p {
      font-size: 10px;
      white-space: normal;
    }
  }
  .how-step-footer {
    margin-inline: 12px;
    > span:first-child {
      font-size: 6px;
      letter-spacing: .5px;
    }
  }
  :global(:root[lang='en'] .how-step-copy h3) {
    font-size: 15px;
  }
}
@media (max-width: 600px) {
  .how-section {
    padding-block: 61px 51px;
  }
  .how-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
    margin-bottom: 30px;
  }
  .how-heading .section-index {
    font-size: 9px;
    margin-bottom: 19px;
  }
  .how-heading h2 {
    font-size: 39px;
  }
  .how-heading-aside {
    width: 100%;
    padding: 0;
    > p {
      font-size: 12px;
    }
  }
  .how-heading-star {
    position: absolute;
    right: 17px;
    top: 0;
    margin: 0;
    font-size: 47px;
  }
  .how-heading-note {
    font-size: 8px;
    margin-top: 12px;
  }
  .how-steps {
    grid-template-columns: minmax(0,1fr);
    gap: 25px;
    padding-top: 0;
  }
  .how-progress {
    display: none;
  }
  .how-step-2,.how-step-3 {
    padding-top: 0;
  }
  .how-step-header {
    padding: 19px 20px 14px;
    gap: 14px;
    > span:nth-child(2) {
      font-size: 12px;
      letter-spacing: 1.6px;
    }
    small {
      font-size: 7px;
      letter-spacing: .6px;
    }
  }
  .how-step-number {
    font-size: 42px;
  }
  .how-step-mark {
    font-size: 28px;
  }
  .how-art-window {
    height: 214px;
    margin-inline: 11px;
  }
  .how-step-copy {
    padding: 21px 21px 17px;
    h3 {
      font-size: 20px;
    }
    > p {
      font-size: 12px;
      white-space: pre-line;
    }
  }
  .how-step-footer {
    margin-inline: 21px;
    > span:first-child {
      font-size: 8px;
      letter-spacing: 1px;
    }
  }
  .how-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 31px;
    > p {
      font-size: 12px;
    }
    .text-link {
      font-size: 12px;
    }
  }
  :global(:root[lang='en'] .how-heading h2) {
    font-size: 36px;
  }
  :global(:root[lang='en'] .how-step-copy h3) {
    font-size: 20px;
  }
  :global(:root[lang='en'] .how-step-copy > p) {
    white-space: normal;
  }
}
</style>
