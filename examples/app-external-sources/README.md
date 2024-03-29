# Plugin Host App With External Sources

Plugins require their distribution to be committed to the CrafterCMS Project repository (for Studio to be able to see the files).
Depending on the size and _dev stack_ of the application and your preferences, this can create undesired commit history.

If you don't mind this, you may use still this template to develop your app and commit the build files to the CrafterCMS Project repository — make sure to review the edits necessary on the `vite.config.ts` file.

If you don't want all the build files checked in your project repo, this example demonstrates how you can use an external hosting for the bulk of the plugin build files,
while still being able to leverage Studio's Plugin Host by simply keeping the entry point of the application on the CrafterCMS Project repository,
while the rest app assets and resources are hosted elsewhere.

Running your app on the Plugin Host, you'll be leveraging Studio's authentication and authorization.

## How to use

- Go into `./examples/app-external-sources`
- Run `yarn install`
  - Make sure the `package.json` `postinstall` script copied the `shared-worker.js` into the `public` directory. Otherwise, please copy manually. The shared worker must be accessible as a resource to the development server.
- Review and understand `vite.config.ts`, `.env.development` and `.env.production`. Modify them according to your setup.
- Run `yarn dev` to preview or modify/develop the application on `http://localhost:3000/studio`
- Run `yarn build` to build the application
- Install the plugin using the CrafterCMS CLI, or using the `/studio/api/2/marketplace/copy` API in Postman or similar. Either way, you can use the following _JSON_ body:
  ```json
  {
    "siteId": "YOUR_SITE_ID",
    "path": "/Users/your/path/to/this/repo"
  }
  ```
- Run `yarn serve` to serve the built application (from `./dist`) on `http://localhost:3000`
- View the deployed app in CrafterCMS at `http://localhost:8080/studio/plugin?site=editorial&pluginId=org.craftercms&type=examples&name=awes&file=index.html`

## Notes

- Make sure your external hosting is CORS-enabled so that when the app running on Studio's origin tries to load the resources on your other host, the browser won't prevent those resources from loading.
- Using `CrafterCMSNextBridge` component (i.e. `@craftercms/studio-ui/components/CrafterCMSNextBridge`) will make your bundle very large.
  The reason is that, at that point, you're creating a complete Studio UI build, which might seem like overkill for a plugin,
  but in doing so, you can use any and all of Studio UI (environment, theme, components and features). If this doesn't suit you, you may
  downscale the approach by not using `CrafterCMSNextBridge`, but at the minimum, it is recommended that your app is wrapped around the `CrafterThemeProvider`
  so that your app looks and feels like Studio. This is only applicable if you're using `@mui/material`, though.
  In any case, you can still use the utils and services from `@craftercms/studio-ui` to interact with Studio's API with minimal bundle impact.
- Make sure you import things from the exact file if you want to minimize the bundle size. For example, if you want to use a component named `X`,
  you could `import { X } from '@craftercms/studio-ui'`, but to minimize bundle size, you should `import X from '@craftercms/studio-ui/components/X'` instead.

Got questions? Join us in Slack https://craftercms.com/slack

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
