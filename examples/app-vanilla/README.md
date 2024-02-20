# Plugin Host Vanilla Example

This example demonstrates a simple app that runs on the Plugin Host page.

**Note**: this example assumes your project is called `editorial`. If you have a different project name, update the path and url below accordingly.

Install the plugin from local sources using the CrafterCMS CLI, or using the `/studio/api/2/marketplace/copy` API in Postman or similar. Either way, you can use the following _JSON_ body:

```json
{
  "siteId": "YOUR_SITE_ID",
  "path": "/Users/your/path/to/this/repo"
}
```

View the deployed app in CrafterCMS at `http://localhost:8080/studio/plugin?site=editorial&pluginId=org.craftercms&type=examples&name=vanilla`, where `PLUGIN_ID` is the plugin ID used in the plugin descriptor file

To learn more on creating plugins in CrafterCMS, see [CrafterCMS plugins documentation](https://docs.craftercms.org/current/by-role/developer/composable/extensions/plugins.html)
