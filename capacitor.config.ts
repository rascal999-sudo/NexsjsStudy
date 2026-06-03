import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'nextjs-microblog',
  webDir: 'out', // ここを 'public' から 'out' に変更
};

export default config;
