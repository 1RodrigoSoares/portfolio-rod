import { datadogRum } from '@datadog/browser-rum'
import { reactPlugin } from '@datadog/browser-rum-react'

export function initDatadog() {
  if (typeof window === 'undefined') return

  datadogRum.init({
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID!,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!,
    site: 'us5.datadoghq.com',
    service: 'portfolio',
    env: 'prod',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 10,
    defaultPrivacyLevel: 'mask-user-input',
    plugins: [reactPlugin({ router: true })],
  })
}
