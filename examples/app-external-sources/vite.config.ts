import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import copy from 'rollup-plugin-copy';

// Switch this accordingly
const useExternalSources = true;

const proxyConfig = {
  target: 'http://localhost:8080',
  changeOrigin: false,
  secure: true
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');
  return {
    base:
      mode === 'development'
        ? // In development, we need this so that the authentication from localhost:8080 falls through to our localhost:{devServerPort}.
          '/studio'
        : useExternalSources
        ? // The value of `base` should be whatever your external host address is.
          'http://localhost:3000'
        : // If you're NOT using an external host, you can use the following line instead, which
          // works together with the little `replacePluginFileUrl` rollup plugin (invoked and declared below).
          '/PLUGIN_FILE_URL/',
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
      createHtmlPlugin({ entry: 'src/main.tsx', minify: false }),
      useExternalSources
        ? // If you're using external sources, you'd deploy only `index.html` to your CrafterCMS project, and serve the rest from your external server.
          copy({
            hook: 'closeBundle',
            // Once your index is at this target dest, use the `crafter-cli copy-plygin` or `/studio/api/2/marketplace/copy` API to deploy.
            targets: [
              { src: './dist/index.html', dest: '../../authoring/static-assets/plugins/org/craftercms/examples/awes' }
            ]
          })
        : // If you're NOT using an external host, you can use this plugin with the suggested `base` property above.
          // Make sure to replace the arguments with the values that correspond to your environment.
          replacePluginFileUrl({
            siteId: 'editorial',
            type: 'examples',
            name: 'awes',
            pluginId: 'org.craftercms'
          })
    ],
    build: {
      minify: false,
      emptyOutDir: true,
      outDir: useExternalSources
        ? // If you're using external sources, you'd need to deploy `dist` to your server. This example is served from right from `dist` by invoking `yarn serve`.
          'dist'
        : // If not using external sources, the entire build gets deployed to your CrafterCMS project. Using the path below, will put the build where you can simply
          // invoke/use the `crafter-cli copy-plygin` or `/studio/api/2/marketplace/copy` API to deploy.
          '../../authoring/static-assets/plugins/org/craftercms/examples/awes'
    }
  };
});

interface ReplacePluginFileUrlArgs {
  siteId: string;
  type: string;
  name: string;
  pluginId: string;
}

function replacePluginFileUrl({ siteId, type, name, pluginId }: ReplacePluginFileUrlArgs) {
  const replacement = `/studio/1/plugin/file?siteId=${siteId}&type=${type}&name=${name}&pluginId=${pluginId}&filename=`;
  const replacement2 = `${replacement}assets/`;
  const replace = (code: string) => code.replace(/\/PLUGIN_FILE_URL\//g, replacement);
  return {
    name: 'Replace Plugin File Url',
    generateBundle(_, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk') {
          chunk.code = replace(chunk.code).replace(/import.*?\(?(["'])((\.{1,2}\/).*)\1/g, (match) => {
            return match.replace(/\.{1,2}\//, replacement2);
          });
        }
      }
    },
    transformIndexHtml(html) {
      return replace(html);
    }
  };
}
