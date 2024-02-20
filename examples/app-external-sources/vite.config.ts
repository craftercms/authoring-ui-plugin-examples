import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const proxyConfig = {
  target: 'http://localhost:8080',
  changeOrigin: false,
  secure: true
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');
  return {
    // The value of `base` should be whatever your external host address is.
    base: mode === 'development' ? '/studio' : 'http://localhost:3000',
    server: {
      port: 3000,
      proxy: {
        '/studio/login': proxyConfig,
        '/studio/api': proxyConfig,
        '/studio/static-assets': proxyConfig,
        '/studio/refresh.json': proxyConfig
      }
    },
    plugins: [
      react(),
      replace({
        preventAssignment: true,
        values: {
          'process.env.REACT_APP_AUTHORING_BASE': JSON.stringify(env.VITE_APP_AUTHORING_BASE),
          'process.env.REACT_APP_GUEST_BASE': JSON.stringify(env.VITE_APP_GUEST_BASE),
          'process.env.PUBLIC_URL': JSON.stringify(env.VITE_APP_PUBLIC_URL)
        }
      }),
      createHtmlPlugin({
        entry: 'src/main.tsx',
        minify: false
      })
    ],
    build: {
      minify: false
    }
  };
});
