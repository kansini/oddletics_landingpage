<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import HeroTrack from './components/HeroTrack.vue'
import DoodleAthlete from './components/DoodleAthlete.vue'
import DrawingDemo from './components/DrawingDemo.vue'
import HowItWorks from './components/HowItWorks.vue'
import DownloadBadge from './components/DownloadBadge.vue'
import {useSitePreferences} from './composables/preferences'
import SportsPlayground from './components/SportsPlayground.vue'
import ThemeStadiumTransition from './components/ThemeStadiumTransition.vue'
import {downloadUrls, getDownloadPlatforms, type DownloadPlatform} from './data/downloads'
import type {MessageKey} from './data/messages'

gsap.registerPlugin(ScrollTrigger)
const {locale, theme, t, toggleTheme} = useSitePreferences()
const root = ref<HTMLElement>()
const themeTransition = ref<InstanceType<typeof ThemeStadiumTransition>>()
const themeSwitching = ref(false)
const mobileMenu = ref(false)
const openFaq = ref<number | null>(0)
const isScrolled = ref(false)
const downloadDialog = ref<HTMLDialogElement>()
const dialogTrigger = ref<HTMLElement | null>(null)
const pendingPlatform = ref<DownloadPlatform>('ios')
const visibleDownloadPlatforms = getDownloadPlatforms(typeof navigator === 'undefined' ? undefined : navigator)
const faqs: { q: MessageKey; a: MessageKey }[] = [
  {q: 'faq1q', a: 'faq1a'}, {q: 'faq2q', a: 'faq2a'},
  {q: 'faq3q', a: 'faq3a'}, {q: 'faq4q', a: 'faq4a'},
]
let media: gsap.MatchMedia | undefined
let context: gsap.Context | undefined

async function switchStadiumTheme() {
  if (themeSwitching.value) return
  if (!themeTransition.value) {
    toggleTheme();
    return
  }
  // Spotlight the largest visible scene, including when switching halfway down the page.
  const width = window.innerWidth, height = window.innerHeight
  let focus = {x: width / 2, y: height / 2}
  let largestArea = 0
  root.value?.querySelectorAll<HTMLElement>('.hero-art, .event-stage, .demo-workspace, .friends-illustration, .faq-list, .final-store-buttons').forEach(element => {
    const rect = element.getBoundingClientRect()
    const left = Math.max(0, rect.left), right = Math.min(width, rect.right)
    const top = Math.max(80, rect.top), bottom = Math.min(height, rect.bottom)
    const area = Math.max(0, right - left) * Math.max(0, bottom - top)
    if (area > largestArea) {
      largestArea = area;
      focus = {x: (left + right) / 2, y: (top + bottom) / 2}
    }
  })
  themeSwitching.value = true
  try {
    await themeTransition.value.play(toggleTheme, theme.value === 'light', focus)
  } finally {
    themeSwitching.value = false
  }
}

function closeMenu() {
  mobileMenu.value = false
}

function updateScrolledState() {
  isScrolled.value = window.scrollY > 24
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

watch([locale, openFaq], async () => {
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
      // Separate SVG wrappers preserve the entrance, original rotations and athlete bounces.
      const depthStrength = () => window.innerWidth <= 600 ? 0.65 : 1
      const layers = [
        {name: 'backdrop', x: -15, y: 130, rotation: -2, scale: 1.04},
        {name: 'infield', x: 5, y: 75, rotation: 1, scale: 1.02},
        {name: 'pool', x: -55, y: 45, rotation: -7, scale: 1},
        {name: 'target', x: 45, y: -70, rotation: 10, scale: 1.04},
        {name: 'track', x: 18, y: -45, rotation: 2, scale: 1},
        {name: 'athletes', x: 36, y: -30, rotation: -1, scale: 1},
        {name: 'sign', x: -32, y: -65, rotation: -5, scale: 1},
        {name: 'live', x: -35, y: -120, rotation: -12, scale: 1.06},
        {name: 'badge', x: 55, y: -150, rotation: 14, scale: 1.1},
        {name: 'doodles', x: 12, y: -95, rotation: -3, scale: 1},
      ]
      const heroParallax = gsap.timeline({
        defaults: {ease: 'none', transformOrigin: '50% 50%'},
        scrollTrigger: {
          trigger: '.hero-art',
          start: 'clamp(top bottom)',
          end: 'center top',
          scrub: 0.65,
          invalidateOnRefresh: true
        }
      })
      layers.forEach(layer => {
        heroParallax.to(`[data-hero-layer="${layer.name}"]`, {
          x: () => layer.x * depthStrength(),
          y: () => layer.y * depthStrength(),
          rotation: () => layer.rotation * depthStrength(),
          scale: () => 1 + (layer.scale - 1) * depthStrength()
        }, 0)
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
      // Scroll parallax belongs to a wrapper so it can compose with the marquee loop.
      gsap.fromTo('.ticker-scroll', {x: 0}, {
        x: () => -Math.min(window.innerWidth * 0.25, 300),
        ease: 'none',
        scrollTrigger: {
          trigger: '.ticker',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      })
      const friendsStrength = () => window.innerWidth <= 600 ? 0.55 : 1
      const friendsParallax = gsap.timeline({
        defaults: {duration: 1, ease: 'none', transformOrigin: '50% 50%'},
        scrollTrigger: {
          trigger: '.friends-illustration',
          start: 'top 90%',
          end: 'bottom 15%',
          scrub: 0.65,
          invalidateOnRefresh: true
        }
      })
      // Animate positioning wrappers so each character keeps its drawn-in tilt.
      const friendsLayers = [
        {name: 'backdrop', x: 0, y: 45, rotation: 4, scale: 0.06},
        {name: 'frog', x: -24, y: -75, rotation: -10, scale: 0},
        {name: 'dog', x: 26, y: -35, rotation: 8, scale: 0},
        {name: 'star', x: -28, y: -115, rotation: -14, scale: 0},
        {name: 'blob', x: 30, y: -80, rotation: 12, scale: 0},
        {name: 'bubble', x: 14, y: -125, rotation: 6, scale: 0},
      ]
      friendsLayers.forEach(layer => {
        friendsParallax.fromTo(`[data-friend-layer="${layer.name}"]`, {
          x: () => -layer.x * friendsStrength() / 2,
          y: () => -layer.y * friendsStrength() / 2,
          rotation: () => -layer.rotation * friendsStrength() / 2,
          scale: () => 1 - layer.scale * friendsStrength() / 2
        }, {
          x: () => layer.x * friendsStrength() / 2,
          y: () => layer.y * friendsStrength() / 2,
          rotation: () => layer.rotation * friendsStrength() / 2,
          scale: () => 1 + layer.scale * friendsStrength() / 2
        }, 0)
      })
      const sectionStrength = () => window.innerWidth <= 600 ? 0.45 : 1
      type SectionLayer = { name: string; y: number; mobileY?: number; x?: number; rotation?: number }

      function addSectionParallax(trigger: string, sectionLayers: SectionLayer[], end = 'bottom 12%') {
        const timeline = gsap.timeline({
          defaults: {duration: 1, ease: 'none', transformOrigin: '50% 50%'},
          scrollTrigger: {
            trigger,
            start: 'top 88%',
            end,
            scrub: 0.65,
            invalidateOnRefresh: true
          }
        })
        sectionLayers.forEach(layer => {
          const travelY = () => (window.innerWidth <= 600 ? layer.mobileY ?? layer.y : layer.y) * sectionStrength()
          timeline.fromTo(`[data-section-layer="${layer.name}"]`, {
            x: () => -(layer.x ?? 0) * sectionStrength() / 2,
            y: () => -travelY() / 2,
            rotation: () => -(layer.rotation ?? 0) * sectionStrength() / 2
          }, {
            x: () => (layer.x ?? 0) * sectionStrength() / 2,
            y: () => travelY() / 2,
            rotation: () => (layer.rotation ?? 0) * sectionStrength() / 2
          }, 0)
        })
      }

      // Inner layers compose with reveal animations and preserve the drawing board's hit area.
      addSectionParallax('#play', [
        {name: 'play-index', y: -24},
        {name: 'play-title', y: -58},
        {name: 'play-copy', y: -18},
        {name: 'play-star', x: 24, y: -110, rotation: 65},
        {name: 'play-arrow', x: 14, y: -38, rotation: -18},
        {name: 'play-board', y: 36},
      ])
      addSectionParallax('.faq-section', [
        {name: 'faq-index', y: -20},
        {name: 'faq-title', y: -46},
        {name: 'faq-copy', y: -18},
        {name: 'faq-mark', x: 18, y: -100, rotation: -16},
        {name: 'faq-list', y: 32},
      ])
      // Clamp the last section to the page end so its full motion remains reachable.
      addSectionParallax('#download', [
        {name: 'download-index', y: -62},
        {name: 'download-title', y: -36},
        {name: 'download-copy', y: -18},
        {name: 'download-left', x: 32, y: -120, mobileY: -65, rotation: 18},
        {name: 'download-right', x: -36, y: -170, mobileY: -100, rotation: -22},
      ], 'clamp(bottom 25%)')
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
                  :aria-busy="themeSwitching" :aria-disabled="themeSwitching || undefined"
                  @click="switchStadiumTheme">
            <span class="theme-icon" :class="{ 'is-switching': themeSwitching }">
              <svg v-if="theme === 'light'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                   stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 13A9 9 0 0 1 11 3 9 9 0 1 0 21 13Z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
                   stroke-linecap="round"
                   aria-hidden="true">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2V4M12 20V22M2 12H4M20 12H22M5 5L6.5 6.5M17.5 17.5L19 19M5 19L6.5 17.5M17.5 6.5L19 5"/>
              </svg>
            </span>
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
              <div class="hero-store-buttons" :class="{'has-multiple': visibleDownloadPlatforms.length > 1}">
                <DownloadBadge v-for="platform in visibleDownloadPlatforms" :key="platform" :platform="platform"
                               @unavailable="showDownload"/>
              </div>
              <a class="hero-secondary" href="#play"><span class="play-icon" aria-hidden="true">↗</span><span
                  class="hero-secondary-label">{{ t('navPlay') }}</span></a></div>
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
        <div class="ticker-scroll">
          <div class="ticker-track"><span v-for="i in 12" :key="i" :aria-hidden="i > 1 ? true : undefined">{{
              t('tickerOne')
            }} <b>✳</b> {{ t('tickerTwo') }} <b>✳</b> STAY ODD. PLAY ON. <b>✳</b></span></div>
        </div>
      </div>
      <HowItWorks/>
      <SportsPlayground/>
      <section id="play" class="play-section section-space wrap" aria-labelledby="play-title">
        <div class="play-intro" data-reveal><p class="eyebrow section-index" data-section-layer="play-index">03 / YOUR
          TURN TO BE ODD</p><span
            class="little-star" aria-hidden="true"><span data-section-layer="play-star">✳</span></span>
          <h2 id="play-title" data-section-layer="play-title">{{ t('playTitle1') }}<br/>{{ t('playTitle2') }}<span
              class="handwritten-underline">{{ t('playTitleAccent') }}</span>{{ t('playTitle3') }}</h2>
          <p class="multiline" data-section-layer="play-copy">{{ t('playIntro') }}</p>
          <div class="play-aside"><span data-section-layer="play-arrow">↪</span>
            <p>{{ t('playAside') }}<br/><strong>{{ t('playAsideBold') }}</strong></p></div>
        </div>
        <div class="demo-container" data-reveal>
          <div data-section-layer="play-board">
            <DrawingDemo/>
          </div>
        </div>
      </section>
      <section class="friends-section wrap">
        <div class="friends-illustration">
          <div class="friend-layer" data-friend-layer="frog">
            <DoodleAthlete kind="frog" color="#27b77c"/>
          </div>
          <div class="friend-layer" data-friend-layer="dog">
            <DoodleAthlete kind="dog"/>
          </div>
          <div class="friend-layer" data-friend-layer="star">
            <DoodleAthlete kind="star" color="#ffd166"/>
          </div>
          <div class="friend-layer" data-friend-layer="blob">
            <DoodleAthlete kind="blob" color="#c1c8eb"/>
          </div>
          <div class="friends-bubble-layer" data-friend-layer="bubble"><span
              class="friends-bubble">{{ t('friendsBubble') }}</span></div>
          <div class="friends-backdrop" data-friend-layer="backdrop" aria-hidden="true"></div>
        </div>
        <div data-reveal><p class="eyebrow section-index">BETTER WHEN WE’RE ODD TOGETHER</p>
          <h2 class="multiline">{{ t('friendsTitle') }}</h2>
          <p class="multiline">{{ t('friendsText') }}</p><a href="#play" class="text-link">{{ t('friendsCta') }}
            <span>↗</span></a></div>
      </section>
      <section class="faq-section section-space wrap" aria-labelledby="faq-title">
        <div class="faq-intro" data-reveal><p class="eyebrow section-index" data-section-layer="faq-index">04 / A FEW
          LITTLE QUESTIONS</p>
          <h2 id="faq-title" data-section-layer="faq-title">{{ t('faqTitle') }}</h2>
          <p class="faq-aside" data-section-layer="faq-copy">{{ t('faqAside') }}</p>
          <div class="faq-mark" aria-hidden="true">
            <svg data-section-layer="faq-mark" viewBox="0 0 140 160" fill="none" stroke="currentColor"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M28 48C25 18 48 8 73 13 107 17 117 50 96 70L74 89Q63 98 68 117" stroke-width="3"/>
              <path d="M38 43C38 25 54 21 67 23M105 91L115 85M113 106L127 106M99 118L109 125" stroke-width="1.6"/>
              <ellipse cx="69" cy="139" rx="6" ry="6.5" stroke-width="2.5"/>
            </svg>
          </div>
        </div>
        <div class="faq-list" data-reveal>
          <div data-section-layer="faq-list">
            <article v-for="(faq, index) in faqs" :key="faq.q" class="faq-item"
                     :class="{ expanded: openFaq === index }">
              <h3>
                <button :id="`faq-button-${index}`" :aria-expanded="openFaq === index"
                        :aria-controls="`faq-answer-${index}`" @click="openFaq = openFaq === index ? null : index">
                  {{ t(faq.q) }}<span aria-hidden="true">{{ openFaq === index ? '−' : '+' }}</span></button>
              </h3>
              <div v-show="openFaq === index" :id="`faq-answer-${index}`" role="region"
                   :aria-labelledby="`faq-button-${index}`"><p>{{ t(faq.a) }}</p></div>
            </article>
          </div>
        </div>
      </section>
      <section id="download" class="final-section">
        <div class="wrap final-inner" data-reveal>
          <div class="final-doodle left-doodle" aria-hidden="true">
            <div class="final-doodle-depth" data-section-layer="download-left">
              <DoodleAthlete kind="frog" color="#27b77c"/>
            </div>
          </div>
          <div class="final-doodle right-doodle" aria-hidden="true">
            <div class="final-doodle-depth" data-section-layer="download-right">
              <DoodleAthlete kind="dog" color="#faf8ef"/>
            </div>
          </div>
          <p class="eyebrow" data-section-layer="download-index">THE WORLD NEEDS YOUR KIND OF ODD.</p>
          <h2 data-section-layer="download-title">{{ t('finalTitle1') }}<br/>{{ t('finalTitle2') }}<span>{{
              t('finalTitleAccent')
            }}</span>{{ t('finalTitle3') }}</h2>
          <p class="final-description" data-section-layer="download-copy">{{ t('finalText') }}</p>
          <div class="final-store-buttons">
            <DownloadBadge platform="ios" @unavailable="showDownload"/>
            <DownloadBadge platform="harmony" @unavailable="showDownload"/>
          </div>
          <p class="download-status">{{
              t(downloadUrls.ios || downloadUrls.harmony ? 'finalDownload' : 'storePending')
            }}</p><a class="final-play-link" href="#play">{{ t('finalCta') }} <span>↗</span></a></div>
      </section>
    </main>
    <div class="footer-background">
      <footer class="site-footer wrap"><a class="brand footer-brand" href="#"><span class="brand-name">{{
          t('brand')
        }}<span>ODDLETICS</span></span></a>
        <p>{{ t('footerTag') }}</p>
        <a class="footer-contact" href="mailto:flood_flink@163.com">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="3"/>
            <path d="m4 7 6.7 5a2.2 2.2 0 0 0 2.6 0L20 7"/>
          </svg>
          <span>{{ t('contactUs') }}</span>
          <strong>flood_flink@163.com</strong>
        </a>
        <span class="micro">© {{ new Date().getFullYear() }} ODDLETICS</span><a href="#"
                                                                                class="back-top"
                                                                                :aria-label="t('backTop')">{{
            t('backTop')
          }} <span>↑</span></a></footer>
      <nav class="footer-projects wrap" :aria-label="t('moreApps')">
        <span class="footer-projects-label">{{ t('moreApps') }}</span>
        <a href="https://art-detective.netlify.app/" target="_blank" rel="noopener noreferrer">
          <span class="footer-project-name">{{ t('artDetectiveName') }}</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10"/></svg>
        </a>
        <a href="https://silver-salt.netlify.app/" target="_blank" rel="noopener noreferrer">
          <span class="footer-project-name">{{ t('silverSaltName') }}</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10"/></svg>
        </a>
        <a href="https://foggy-mirror.netlify.app/" target="_blank" rel="noopener noreferrer">
          <span class="footer-project-name">{{ t('foggyMirrorName') }}</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10"/></svg>
        </a>
      </nav>
    </div>
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
    <ThemeStadiumTransition ref="themeTransition"/>
  </div>
</template>
