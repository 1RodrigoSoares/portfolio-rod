import { datadogRum } from '@datadog/browser-rum'

export function initDatadog() {
  if (typeof window === 'undefined')  
  {
    console.error('Datadog RUM can only be initialized in the browser')
    return
  }

  if (!process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || !process.env.NEXT_PUBLIC_DATADOG_APP_ID) {
    console.error('Datadog client token or app ID is not defined')
    return
  }

  console.log('Initializing Datadog RUM...')

  datadogRum.init({
    applicationId: '0d26b2b5-bfab-4bc9-ba9f-12394bfbd780',
    clientToken: 'pub479a8f1c24f2a004657120f103d8435b',
    site: 'us5.datadoghq.com',
    service: 'portfolio',
    env: 'prod',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 10,
    defaultPrivacyLevel: 'mask-user-input',
  })

  console.log(process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN)
  console.log(process.env.NEXT_PUBLIC_DATADOG_APP_ID)
  console.log('Datadog RUM initialized')
}
