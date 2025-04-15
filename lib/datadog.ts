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
    applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID!,
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!,
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
