import en from './i18n/translations/en.json';
import es from './i18n/translations/es.json';
import { PluginDescriptor } from '@craftercms/studio-ui';
import ViewProjectsPanelButton from './components/ViewProjectsPanelButton';
import Vanilla from './components/Vanilla';
import ProjectsView from './components/ProjectsView';
import PathExploringView from './components/PathExploringView';
import ContentTypesView from './components/ContentTypesView';

const plugin: PluginDescriptor = {
  id: 'org.craftercms.example.componentLibrary',
  locales: {
    en,
    es
  },
  widgets: {
    'org.craftercms.example.vanilla': Vanilla,
    'org.craftercms.example.projectsView': ProjectsView,
    'org.craftercms.example.contentTypesView': ContentTypesView,
    'org.craftercms.example.pathExploringView': PathExploringView,
    'org.craftercms.example.viewProjectsPanelButton': ViewProjectsPanelButton
  },
  scripts: [
    // Below are examples of how to load scripts into the Studio runtime
    // {
    //   src: 'https://code.jquery.com/jquery-3.5.1.min.js',
    //   integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
    //   crossorigin: 'anonymous'
    // },
    // 'script.js'
  ],
  stylesheets: [
    // Examples of how to load stylesheets into the Studio runtime
    // 'index.css'
  ]
};

export { Vanilla, ProjectsView, ContentTypesView, PathExploringView, ViewProjectsPanelButton };

export default plugin;
