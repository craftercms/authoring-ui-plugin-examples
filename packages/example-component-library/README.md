# Sample Component Library Plugin

This example demonstrates how to create a CrafterCMS extension that exports various widgets that can be used across Studio UI.

These instructions assume you have a project called `editorial-neue`. Update accordingly if your
project id is something different.

Instructions:
- Run `yarn` on the root
- Use the `example-cra` to test & develop your plugins agilely
  - Run `yarn build` to build the files you can use to test on the test app.
- When ready to deploy run `yarn dist` and copy `dist/*` to `{crafter}/crafter-authoring/data/repos/sites/editorial-neue/sandbox/config/studio/plugins/apps/library`
  - `apps` & `library` can be what ever naming you wish to use
  - `apps` represents the type — or category — of plugin
  - `library` represents the plugin name
- Update your site's `ui.xml` to include the plugins where ever you want them to show them. For example, show them on the right sidebar of the Preview app you may use the config below:
  - **Note**: the id you use on the `<widget />` elements `id` attribute, should match the id of the component as exported on your index.js (see [index.tsx](src/index.tsx))
```xml
<siteUi>
  ...
  <widget id="craftercms.components.ToolsPanel">
    <configuration>
      <widgets>
        ...
        <widget id="org.craftercms.example.viewProjectsPanelButton">
          <plugin site="{site}" type="apps" name="library" file="index.js" />
        </widget>
        <widget id="org.craftercms.example.vanilla">
          <plugin site="{site}" type="apps" name="library" file="index.js" />
        </widget>
```
