import { datadogRum } from '@datadog/browser-rum'
import { reactPlugin } from '@datadog/browser-rum-react'

export function initDatadog() {
  console.log('Initializing Datadog RUM...')
  if (typeof window === 'undefined')  
  {
    console.error('Datadog RUM can only be initialized in the browser')
    return
  }

  if (!process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || !process.env.NEXT_PUBLIC_DATADOG_APP_ID) {
    console.error('Datadog client token or app ID is not defined')
    return
  }

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
  
  console.log('Client Token:', process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN)
  console.log('App ID:', process.env.NEXT_PUBLIC_DATADOG_APP_ID)
  console.log('Datadog RUM initialized')
}
