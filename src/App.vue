<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import HeroTrack from './components/HeroTrack.vue'
import DoodleAthlete from './components/DoodleAthlete.vue'
import DrawingDemo from './components/DrawingDemo.vue'
import StepArtwork from './components/StepArtwork.vue'
import DownloadBadge from './components/DownloadBadge.vue'
import {useSitePreferences} from './composables/preferences'
import {useSports} from './data/sports'
import {downloadUrls, type DownloadPlatform} from './data/downloads'
import type {MessageKey} from './data/messages'

gsap.registerPlugin(ScrollTrigger)
const {locale, theme, t, toggleTheme} = useSitePreferences()
const root = ref<HTMLElement>()
const mobileMenu = ref(false)
const selectedSport = ref(0)
const openFaq = ref<number | null>(0)
const isScrolled = ref(false)
const downloadDialog = ref<HTMLDialogElement>()
const dialogTrigger = ref<HTMLElement | null>(null)
const pendingPlatform = ref<DownloadPlatform>('ios')
const sports = useSports()
const sport = computed(() => sports.value[selectedSport.value]!)
const steps: { title: MessageKey; text: MessageKey }[] = [
  {title: 'step1Title', text: 'step1Text'},
  {title: 'step2Title', text: 'step2Text'},
  {title: 'step3Title', text: 'step3Text'},
]
const faqs: { q: MessageKey; a: MessageKey }[] = [
  {q: 'faq1q', a: 'faq1a'}, {q: 'faq2q', a: 'faq2a'},
  {q: 'faq3q', a: 'faq3a'}, {q: 'faq4q', a: 'faq4a'},
]
let media: gsap.MatchMedia | undefined
let context: gsap.Context | undefined

function closeMenu() {
  mobileMenu.value = false
}

function updateScrolledState() {
  isScrolled.value = window.scrollY > 24
}

function handleSportKeys(event: KeyboardEvent) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  if (event.key === 'Home') selectedSport.value = 0
  else if (event.key === 'End') selectedSport.value = sports.value.length - 1
  else selectedSport.value = (selectedSport.value + (event.key === 'ArrowRight' ? 1 : -1) + sports.value.length) % sports.value.length
  nextTick(() => document.getElementById(`sport-tab-${selectedSport.value}`)?.focus())
}

function showDownload(event: MouseEvent, platform: DownloadPlatform) {
  pendingPlatform.value = platform
  dialogTrigger.value = event.currentTarget as HTMLElement
  downloadDialog.value?.showModal()
}

function closeDownload() {
  downloadDialog.value?.close()
}

function restoreFocus() {
  dialogTrigger.value?.focus()
}

watch(locale, async () => {
  await nextTick();
  ScrollTrigger.refresh()
})
onMounted(() => {
  updateScrolledState()
  window.addEventListener('scroll', updateScrolledState, {passive: true})
  context = gsap.context(() => {
    media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-copy > *', {
        opacity: 0,
        y: 26,
        duration: 0.85,
        stagger: 0.11,
        ease: 'power3.out',
        clearProps: 'all'
      })
      gsap.from('.hero-art', {
        opacity: 0,
        y: 35,
        rotation: 3,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        clearProps: 'opacity,transform'
      })
      gsap.to('.runner-one', {
        y: -9,
        rotation: -2,
        transformOrigin: '50% 80%',
        duration: 0.42,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.to('.runner-two', {
        y: -12,
        rotation: 2,
        transformOrigin: '50% 80%',
        duration: 0.32,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.to('.runner-three', {
        y: -7,
        rotation: -3,
        transformOrigin: '50% 80%',
        duration: 0.48,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
        gsap.from(element, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {trigger: element, start: 'top 91%', once: true},
          clearProps: 'all'
        })
      })
    })
  }, root.value)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrolledState)
  media?.revert()
  context?.revert()
})
</script>

<template>
  <div ref="root" class="site-shell">
    <a class="skip-link" href="#main">{{ t('skip') }}</a>
    <div class="header-background" :class="{ 'is-scrolled': isScrolled }">
      <header class="site-header wrap">
        <a class="brand" href="#" :aria-label="t('home')">
          <span class="brand-mark"><img src="/app-icon.png" alt="" aria-hidden="true"/></span>
          <span class="brand-name">{{ t('brand') }}<span>ODDLETICS</span></span>
        </a>
        <nav class="desktop-nav" :aria-label="t('mainNav')"><a href="#how">{{ t('navAbout') }}</a><a
            href="#events">{{ t('navEvents') }}</a><a href="#play">{{ t('navPlay') }} <span>↗</span></a></nav>
        <div class="header-actions">
          <div class="language-switch" role="group" :aria-label="t('language')">
            <button :aria-pressed="locale === 'zh'" :class="{ active: locale === 'zh' }" lang="zh-CN"
                    @click="locale = 'zh'">中
            </button>
            <span aria-hidden="true">/</span>
            <button :aria-pressed="locale === 'en'" :class="{ active: locale === 'en' }" lang="en"
                    @click="locale = 'en'">EN
            </button>
          </div>
          <button class="theme-toggle" :aria-label="t(theme === 'light' ? 'switchDark' : 'switchLight')"
                  :title="t(theme === 'light' ? 'switchDark' : 'switchLight')" :aria-pressed="theme === 'dark'"
                  @click="toggleTheme">
            <svg v-if="theme === 'light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 13A9 9 0 0 1 11 3 9 9 0 1 0 21 13Z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                 aria-hidden="true">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2V4M12 20V22M2 12H4M20 12H22M5 5L6.5 6.5M17.5 17.5L19 19M5 19L6.5 17.5M17.5 6.5L19 5"/>
            </svg>
          </button>
          <a class="button button-dark nav-cta" href="#download">{{ t('navDownload') }}</a>
          <button class="menu-toggle" :aria-expanded="mobileMenu" aria-controls="mobile-navigation"
                  :aria-label="t(mobileMenu ? 'closeMenu' : 'openMenu')" @click="mobileMenu = !mobileMenu">
            {{ t(mobileMenu ? 'close' : 'menu') }} {{ mobileMenu ? '×' : '☰' }}
          </button>
        </div>
        <nav v-if="mobileMenu" id="mobile-navigation" class="mobile-nav" :aria-label="t('mobileNav')"><a href="#how"
                                                                                                         @click="closeMenu">{{
            t('navAbout')
          }}</a><a href="#events" @click="closeMenu">{{ t('navEvents') }}</a><a href="#play"
                                                                                @click="closeMenu">{{ t('navPlay') }}
          ↗</a><a href="#download" @click="closeMenu">{{ t('navDownload') }} ↗</a></nav>
      </header>
    </div>
    <main id="main">
      <div class="hero-background">
        <section class="hero wrap" aria-labelledby="hero-title">
          <div class="hero-copy">
            <div class="eyebrow"><span class="status-dot"/> {{ t('heroEyebrow') }}</div>
            <h1 id="hero-title">{{ t('heroLine1') }}<br/><span class="headline-highlight">{{ t('heroLine2') }}<svg
                viewBox="0 0 440 23" preserveAspectRatio="none" aria-hidden="true"><path
                d="M6 13Q180-2 434 10M31 21Q245 10 403 17" fill="none" stroke="currentColor" stroke-width="5"
                stroke-linecap="round"/></svg></span></h1>
            <p class="hero-description multiline">{{ t('heroDescription') }}</p>
            <div class="hero-actions">
              <DownloadBadge platform="ios" @unavailable="showDownload"/>
              <a class="hero-secondary" href="#play"><span class="play-icon">↗</span>{{ t('navPlay') }}</a></div>
            <div class="hero-footnote"><span class="tiny-doodles"><DoodleAthlete kind="frog" color="#27b77c"/><DoodleAthlete
                kind="dog"/><DoodleAthlete kind="blob" color="#bdc6f1"/></span><span>{{
                t('heroFootnote')
              }}<small>{{ t('heroFootnoteSmall') }}</small></span></div>
          </div>
          <HeroTrack/>
          <div class="hero-bottom"><span>{{ t('heroBottom') }}</span><a href="#how">{{ t('explore') }}
            <span>↓</span></a><span class="micro">A LITTLE ODD. A LOT OF FUN.</span></div>
        </section>
      </div>
      <div class="ticker" :aria-label="t('tickerLabel')">
        <div class="ticker-track"><span v-for="i in 4" :key="i" :aria-hidden="i > 1 ? true : undefined">{{
            t('tickerOne')
          }} <b>✳</b> {{ t('tickerTwo') }} <b>✳</b> STAY ODD. PLAY ON. <b>✳</b></span></div>
      </div>
      <section id="how" class="how-section section-space wrap" aria-labelledby="how-title">
        <div class="section-heading" data-reveal>
          <div><p class="eyebrow section-index">01 / WHAT’S THE ODD?</p>
            <h2 id="how-title">{{ t('howTitleFirst') }}<span class="serif-word">{{
                t('howTitleAccent')
              }}</span>{{ t('howTitleLast') }}</h2></div>
          <p class="multiline">{{ t('howIntro') }}</p></div>
        <div class="steps-grid">
          <article v-for="(step, index) in steps" :key="step.title" class="step" data-reveal>
            <StepArtwork :index="index"/>
            <div class="step-label"><span>0{{ index + 1 }}</span>
              <h3>{{ t(step.title) }}</h3></div>
            <p class="multiline">{{ t(step.text) }}</p></article>
        </div>
      </section>
      <section id="events" class="events-section section-space" aria-labelledby="events-title">
        <div class="wrap">
          <div class="section-heading" data-reveal>
            <div><p class="eyebrow section-index">02 / PICK YOUR PLAYGROUND</p>
              <h2 id="events-title">{{ t('eventsTitleFirst') }}<br class="mobile-break"/>{{
                  t('eventsTitleMiddle')
                }}<span class="circled-word">{{ t('eventsTitleAccent') }}<svg viewBox="0 0 230 70"
                                                                              preserveAspectRatio="none"
                                                                              aria-hidden="true"><ellipse cx="115"
                                                                                                          cy="36"
                                                                                                          rx="111"
                                                                                                          ry="31"
                                                                                                          fill="none"
                                                                                                          stroke="currentColor"
                                                                                                          stroke-width="2"
                                                                                                          transform="rotate(-4 115 36)"/></svg></span>{{
                  t('eventsTitleLast')
                }}
              </h2>
            </div>
            <p class="multiline">{{ t('eventsIntro') }}</p></div>
          <div class="sports-tabs" role="tablist" :aria-label="t('chooseSport')" @keydown="handleSportKeys">
            <button v-for="(event, index) in sports" :id="`sport-tab-${index}`" :key="event.file" role="tab"
                    :aria-selected="selectedSport === index" aria-controls="sport-panel"
                    :tabindex="selectedSport === index ? 0 : -1" :class="{ active: selectedSport === index }"
                    @click="selectedSport = index">{{ event.title }}
            </button>
          </div>
          <div id="sport-panel" class="sport-panel" role="tabpanel" :aria-labelledby="`sport-tab-${selectedSport}`"
               tabindex="0">
            <Transition name="sport-fade" mode="out-in">
              <div :key="sport.file" class="sport-panel-inner">
                <div class="sport-info"><span class="sport-tag">{{ sport.tag }} <span>↗</span></span>
                  <p class="micro">{{ sport.en }}</p>
                  <h3>{{ sport.line }}</h3>
                  <p class="sport-description">{{ sport.text }}</p><a class="text-link" href="#play">{{ t('sportCta') }}
                    <span>↗</span></a></div>
                <div class="sport-visual" :class="`sport-${sport.file}`">
                  <div class="sport-orbit"/>
                  <div class="sport-orbit orbit-two"/>
                  <span class="sport-visual-label">ODDLETICS<br/>{{ sport.note }}</span><img
                    :src="`/sports/${sport.file}.svg`" :alt="t('sportArtAlt', { sport: sport.title })" width="512"
                    height="512" loading="lazy"/><span class="sport-number">0{{ selectedSport + 1 }}</span><span
                    class="sport-visual-note">{{ t('sportNote') }}</span></div>
              </div>
            </Transition>
          </div>
        </div>
      </section>
      <section id="play" class="play-section section-space wrap" aria-labelledby="play-title">
        <div class="play-intro" data-reveal><p class="eyebrow section-index">03 / YOUR TURN TO BE ODD</p><span
            class="little-star" aria-hidden="true">✳</span>
          <h2 id="play-title">{{ t('playTitle1') }}<br/>{{ t('playTitle2') }}<span
              class="handwritten-underline">{{ t('playTitleAccent') }}</span>{{ t('playTitle3') }}</h2>
          <p class="multiline">{{ t('playIntro') }}</p>
          <div class="play-aside"><span>↪</span>
            <p>{{ t('playAside') }}<br/><strong>{{ t('playAsideBold') }}</strong></p></div>
        </div>
        <div class="demo-container" data-reveal>
          <DrawingDemo/>
        </div>
      </section>
      <section class="friends-section wrap" data-reveal>
        <div class="friends-illustration">
          <DoodleAthlete kind="frog" color="#27b77c"/>
          <DoodleAthlete kind="dog"/>
          <DoodleAthlete kind="star" color="#ffd166"/>
          <DoodleAthlete kind="blob" color="#c1c8eb"/>
          <span class="friends-bubble">{{ t('friendsBubble') }}</span></div>
        <div><p class="eyebrow section-index">BETTER WHEN WE’RE ODD TOGETHER</p>
          <h2 class="multiline">{{ t('friendsTitle') }}</h2>
          <p class="multiline">{{ t('friendsText') }}</p><a href="#play" class="text-link">{{ t('friendsCta') }}
            <span>↗</span></a></div>
      </section>
      <section class="faq-section section-space wrap" aria-labelledby="faq-title">
        <div data-reveal><p class="eyebrow section-index">04 / A FEW LITTLE QUESTIONS</p>
          <h2 id="faq-title">{{ t('faqTitle') }}</h2>
          <p class="faq-aside">{{ t('faqAside') }}</p></div>
        <div class="faq-list" data-reveal>
          <article v-for="(faq, index) in faqs" :key="faq.q" class="faq-item" :class="{ expanded: openFaq === index }">
            <h3>
              <button :id="`faq-button-${index}`" :aria-expanded="openFaq === index"
                      :aria-controls="`faq-answer-${index}`" @click="openFaq = openFaq === index ? null : index">
                {{ t(faq.q) }}<span aria-hidden="true">{{ openFaq === index ? '−' : '+' }}</span></button>
            </h3>
            <div v-show="openFaq === index" :id="`faq-answer-${index}`" role="region"
                 :aria-labelledby="`faq-button-${index}`"><p>{{ t(faq.a) }}</p></div>
          </article>
        </div>
      </section>
      <section id="download" class="final-section">
        <div class="wrap final-inner" data-reveal>
          <DoodleAthlete class="final-doodle left-doodle" kind="frog" color="#27b77c"/>
          <DoodleAthlete class="final-doodle right-doodle" kind="dog" color="#faf8ef"/>
          <p class="eyebrow">THE WORLD NEEDS YOUR KIND OF ODD.</p>
          <h2>{{ t('finalTitle1') }}<br/>{{ t('finalTitle2') }}<span>{{
              t('finalTitleAccent')
            }}</span>{{ t('finalTitle3') }}</h2>
          <p class="final-description">{{ t('finalText') }}</p>
          <div class="final-store-buttons">
            <DownloadBadge platform="ios" @unavailable="showDownload"/>
            <DownloadBadge platform="harmony" @unavailable="showDownload"/>
          </div>
          <p class="download-status">{{
              t(downloadUrls.ios || downloadUrls.harmony ? 'finalDownload' : 'storePending')
            }}</p><a class="final-play-link" href="#play">{{ t('finalCta') }} <span>↗</span></a></div>
      </section>
    </main>
    <div class="footer-background"><footer class="site-footer wrap"><a class="brand footer-brand" href="#"><span class="brand-name">{{
        t('brand')
      }}<span>ODDLETICS</span></span></a>
      <p>{{ t('footerTag') }}</p><span class="micro">© {{ new Date().getFullYear() }} ODDLETICS</span><a href="#"
                                                                                                         class="back-top"
                                                                                                         :aria-label="t('backTop')">{{
          t('backTop')
        }} <span>↑</span></a></footer></div>
    <dialog ref="downloadDialog" class="download-dialog" aria-labelledby="download-title" @close="restoreFocus"
            @click="event => { if (event.target === downloadDialog) closeDownload() }">
      <button class="dialog-close" :aria-label="t('closeDialog')" @click="closeDownload">×</button>
      <DoodleAthlete kind="frog" color="#27b77c"/>
      <p class="eyebrow">WARMING UP…</p>
      <h2 id="download-title">{{ t('downloadTitle') }}</h2>
      <p class="multiline">{{
          t('downloadText', {platform: t(pendingPlatform === 'ios' ? 'appStore' : 'harmonyStore')})
        }}</p><a class="button button-green" href="#play" @click="closeDownload">{{ t('goStudio') }} <span>↗</span></a>
    </dialog>
  </div>
</template>
