<script setup lang="ts">
import {computed} from 'vue'
import appGalleryIcon from '../assets/img/app_gallery.svg'
import {androidRelease, downloadNameKeys, downloadUrls, type DownloadPlatform} from '../data/downloads'
import {useSitePreferences} from '../composables/preferences.ts'

const props = defineProps<{ platform: DownloadPlatform }>()
const emit = defineEmits<{ unavailable: [event: MouseEvent, platform: DownloadPlatform] }>()
const {t, locale} = useSitePreferences()
const url = computed(() => downloadUrls[props.platform])
const name = computed(() => t(downloadNameKeys[props.platform]))
const isApk = computed(() => props.platform === 'android')

function activate(event: MouseEvent) {
  if (!url.value) emit('unavailable', event, props.platform)
}
</script>

<template>
  <component :is="url ? 'a' : 'button'" :href="url" :type="url ? undefined : 'button'"
             :target="url && !isApk ? '_blank' : undefined" :rel="url && !isApk ? 'noopener noreferrer' : undefined"
             :download="url && isApk ? androidRelease.fileName : undefined" class="store-badge"
             :class="`store-badge-${platform}`"
             :aria-label="`${name} · ${t(url ? (isApk ? 'downloadApk' : 'storeAvailable') : 'storePending')}`" @click="activate">
    <svg v-if="platform === 'ios'" viewBox="0 0 32 38" class="store-icon" fill="currentColor" aria-hidden="true">
      <path
          d="M24.3 20.1c0-4.4 3.6-6.6 3.8-6.7-2.1-3.1-5.4-3.5-6.6-3.5-2.8-.3-5.5 1.7-6.9 1.7-1.4 0-3.6-1.7-5.9-1.6-3 .1-5.8 1.7-7.4 4.4-3.2 5.5-.8 13.7 2.3 18.2 1.5 2.2 3.3 4.6 5.7 4.5 2.3-.1 3.2-1.5 6-1.5s3.6 1.5 6 1.4c2.5 0 4.1-2.2 5.6-4.4 1.7-2.5 2.4-4.9 2.5-5-0.1 0-5.1-2-5.1-7.5ZM19.8 7c1.3-1.6 2.2-3.8 2-6-1.9.1-4.2 1.3-5.6 2.9-1.2 1.4-2.3 3.6-2 5.7 2.1.2 4.3-1.1 5.6-2.6Z"/>
    </svg>
    <svg v-else-if="isApk" viewBox="0 0 32 32" class="store-icon android-icon" fill="currentColor" aria-hidden="true">
      <path d="M1 27a15 15 0 0 1 30 0Z"/>
      <path d="m6 5 5 9m15-9-5 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="10" cy="21" r="1.5" fill="#fff"/>
      <circle cx="22" cy="21" r="1.5" fill="#fff"/>
    </svg>
    <img v-else :src="appGalleryIcon" class="store-icon harmony-icon" alt="" aria-hidden="true"/>
    <span v-if="platform === 'ios'"><small>{{ t('storeTop') }}</small><strong>{{ name }}</strong></span>
    <span v-else-if="isApk"><small>{{ t('downloadApk') }} · v{{ androidRelease.version }}</small><strong>Android</strong></span>
    <span v-else class="harmony-copy"><span
        class="harmony-title">{{ locale === 'en' ? 'Download on the' : '下载' }}</span><span
        class="harmony-subtitle">{{ 'AppGallery' }}</span></span>
  </component>
</template>
