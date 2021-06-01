import ReactComponent from './ReactComponent'
import NonReactComponent from './NonReactComponent'
import en from './i18n/translations/en.json'
import es from './i18n/translations/es.json'
// import PluginDescriptor from '@craftercms/studio-ui'

const plugin /*: PluginDescriptor */ = {
  id: 'org.craftercms.sampleComponentLibraryPlugin',
  name: 'Sample component library',
  description: 'An example plugin of a component library',
  author: 'Roy Art',
  logo: null,
  locales: {
    en,
    es
  },
  apps: [
    {
      route: '/yada-yada',
      widget: { id: 'org.craftercms.sampleComponentLibraryPlugin.components.reactComponent' }
    }
  ],
  widgets: {
    'org.craftercms.sampleComponentLibraryPlugin.components.reactComponent': ReactComponent,
    'org.craftercms.sampleComponentLibraryPlugin.components.nonReactComponent': NonReactComponent
  },
  scripts: [
    {
      src: 'https://code.jquery.com/jquery-3.5.1.min.js',
      integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
      crossorigin: 'anonymous'
    },
    'script.js'
  ],
  stylesheets: ['index.css'],
  themes: []
}

export default plugin
