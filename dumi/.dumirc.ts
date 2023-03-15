import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'npro',
    logo: '/logo.png',
    footer: false,
    rtl: false,
  },
  resolve: {
    codeBlockMode: 'passive',
  },
});
