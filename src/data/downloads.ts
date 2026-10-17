// Set these in .env.local when the store listings are ready.
function storeUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined
  try { const url = new URL(value.trim()); return url.protocol === 'https:' ? url.href : undefined } catch { return undefined }
}
export const downloadUrls = {
  ios: storeUrl(import.meta.env.VITE_APP_STORE_URL) ?? 'https://apps.apple.com/app/id6813016522',
  harmony: storeUrl(import.meta.env.VITE_HARMONY_STORE_URL) ?? 'https://url.cloud.huawei.com/CvXmvSdAXe',
}
export type DownloadPlatform = keyof typeof downloadUrls
