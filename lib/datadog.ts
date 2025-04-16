import { datadogRum } from '@datadog/browser-rum'

export function initDatadog() {
  // const appId = process.env.NEXT_PUBLIC_DATADOG_APP_ID;
  // const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;

  // if (!appId || !clientToken) {
  //   console.error('Datadog App ID or Client Token is not defined!');
  //   return;
  // }

  // datadogRum.init({
  //   applicationId: appId,
  //   clientToken: clientToken,
  //   site: 'us5.datadoghq.com',
  //   service: 'portfolio',
  //   env: 'prod',
  //   sessionSampleRate: 100,
  //   sessionReplaySampleRate: 20,
  //   defaultPrivacyLevel: 'mask-user-input',
  // });
}
