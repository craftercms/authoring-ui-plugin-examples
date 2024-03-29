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
    // If you're NOT using an external host, you can use the following line instead. Also need to uncomment the plugin code below (on the `plugins` section).
    // base: mode === 'development' ? '/studio' : '/PLUGIN_FILE_URL/',
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
      }),
      // region Plugin File Url Replace Plugin
      // If you're NOT using an external host, you can use the following plugin together with the suggested `base` property above.
      // Make sure to replace the placeholders on the `replace` function with your actual values.
      /* (function () {
        const replace = (code) => code.replace(
          /\/PLUGIN_FILE_URL\//g,
          // Replace placeholders here:
          '/studio/1/plugin/file?siteId=YOUR_SITE&type=YOUR_TYPE&name=YOUR_NAME&pluginId=YOUR_PLUGIN_ID&filename='
        );
        return {
          name: 'ReplaceCrafterCMSPluginFileUrl',
          generateBundle(_, bundle) {
            for (const fileName in bundle) {
              const chunk = bundle[fileName];
              if (chunk.type === 'chunk') {
                chunk.code = replace(chunk.code);
              }
            }
          },
          transformIndexHtml(html) {
            return replace(html);
          }
        };
      })() */
      // endregion
    ],
    build: {
      minify: false
    }
  };
});
