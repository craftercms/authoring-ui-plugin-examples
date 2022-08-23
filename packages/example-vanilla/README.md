# Plugin Host Vanilla Example

This example demonstrates a standalone app plugin destined to run on CrafterCMS Plugin Host page.

**Note**: this example assumes your project is called `editorial-neue`. If you have a different project name, update the path and url below accordingly.

- Deploy the `index.js` to CrafterCMS by creating a plugin using the `index.js` file with CATEGORY set to `apps`
  and NAME set to `example-vanilla`, then install it via the `crafter-cli` command `copy-plugin`.
   
- View the deployed app in CrafterCMS at `http://localhost:8080/studio/plugin?site=editorial-neue&pluginId=PLUGIN_ID&type=apps&name=example-vanilla`, where `PLUGIN_ID` is the plugin ID used in the plugin descriptor file

To learn more on creating plugins in CrafterCMS, see [CrafterCMS plugins documentation](https://docs.craftercms.org/en/4.0/developers/extensions/plugins.html) 
