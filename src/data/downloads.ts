// Set these in .env.local when the store listings are ready.
function storeUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined
  try { const url = new URL(value.trim()); return url.protocol === 'https:' ? url.href : undefined } catch { return undefined }
}
export const androidRelease = {
  version: '1.6.1',
  fileName: 'oddletics_v_1.6.1.apk',
}

export const downloadUrls = {
  ios: storeUrl(import.meta.env.VITE_APP_STORE_URL) ?? 'https://apps.apple.com/app/id6813016522',
  harmony: storeUrl(import.meta.env.VITE_HARMONY_STORE_URL) ?? 'https://url.cloud.huawei.com/CvXmvSdAXe',
  android: `${import.meta.env.BASE_URL}${androidRelease.fileName}`,
}
export type DownloadPlatform = keyof typeof downloadUrls
export const downloadNameKeys = {ios: 'appStore', harmony: 'harmonyStore', android: 'androidStore'} as const

interface DownloadDevice {
  userAgent?: string
  platform?: string
  userAgentData?: {platform?: string}
}

export function getDownloadPlatforms(device?: DownloadDevice): DownloadPlatform[] {
  const identity = [device?.userAgent, device?.userAgentData?.platform, device?.platform].filter(Boolean).join(' ')

  // Match the OS explicitly; a Huawei device or ArkWeb browser alone isn't sufficient.
  if (/\b(?:OpenHarmony|HarmonyOS|OHOS)\b/i.test(identity)) return ['harmony']
  if (/\b(?:Windows|Android)\b/i.test(identity)) return ['android']
  if (/\b(?:iPhone|iPad|iPod|iOS|iPadOS|Macintosh|Mac OS X|macOS|MacIntel|MacPPC)\b/i.test(identity)) return ['ios']

  return ['ios', 'harmony', 'android']
}
