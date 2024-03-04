import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bricksinc.plugins.clipboard',
  appName: 'brx-clipboard',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
