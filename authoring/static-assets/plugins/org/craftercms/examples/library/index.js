const { jsx, jsxs } = craftercms.libs?.reactJsxRuntime;
const { useIntl, defineMessages, FormattedMessage } = craftercms.libs.ReactIntl;
const ToolsPanelListItemButton = craftercms.components.ToolsPanelListItemButton && Object.prototype.hasOwnProperty.call(craftercms.components.ToolsPanelListItemButton, 'default') ? craftercms.components.ToolsPanelListItemButton['default'] : craftercms.components.ToolsPanelListItemButton;
const { createAction } = craftercms.libs.ReduxToolkit;
const { useDispatch, useSelector } = craftercms.libs.ReactRedux;
const createEmotion = craftercms.libs.createEmotion && Object.prototype.hasOwnProperty.call(craftercms.libs.createEmotion, 'default') ? craftercms.libs.createEmotion['default'] : craftercms.libs.createEmotion;
const { useState, useEffect, useId, useMemo } = craftercms.libs.React;
const { Box, Grid, Typography, List, ListItem, ListItemText } = craftercms.libs.MaterialUI;
const { fetchAll } = craftercms.services.sites;
const { LoadingState, SiteCard, PathSelector, PathNavigatorTree } = craftercms.components;

var en = {
	"org.craftercms.examples.sitesView.noContentTypesMessage": "There are no content types",
	"org.craftercms.examples.sitesView.numOfContentTypesMessage": "There {total, plural, one {is one content type} other {are {total} content types}}",
	"org.craftercms.examples.sitesView.numOfProjectsMessage": "You have {total, plural, one {one project} other {{total} projects}}",
	"org.craftercms.examples.vanilla.exampleTranslations": "Hello. This text is internationalized.",
	"org.craftercms.examples.vanilla.myProjects": "My Projects",
	"org.craftercms.examples.vanilla.viewProjects": "View my projects"
};

var es = {
	"org.craftercms.examples.sitesView.noContentTypesMessage": "No hay tipos de contenido",
	"org.craftercms.examples.sitesView.numOfContentTypesMessage": "Hay {total, plural, one {un tipo de contenido} other {{total} tipos de contenido}}",
	"org.craftercms.examples.sitesView.numOfProjectsMessage": "Hay {total, plural, one {un proyecto} other {{total} proyectos}}",
	"org.craftercms.examples.vanilla.exampleTranslations": "Hola. Este text esta traducido.",
	"org.craftercms.examples.vanilla.myProjects": "Mis Proyectos",
	"org.craftercms.examples.vanilla.viewProjects": "Ver mis proyectos"
};

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// endregion
// region Widget Dialog
const showWidgetDialog = /*#__PURE__*/ createAction('SHOW_WIDGET_DIALOG');
// endregion

function ViewProjectsPanelButton() {
    var formatMessage = useIntl().formatMessage;
    var dispatch = useDispatch();
    return (jsx(ToolsPanelListItemButton, { icon: { id: '@mui/icons-material/AutoAwesomeMotionOutlined' }, onClick: function () {
            return dispatch(showWidgetDialog({
                title: formatMessage({
                    id: 'org.craftercms.examples.vanilla.myProjects',
                    defaultMessage: 'My Projects'
                }),
                widget: {
                    id: 'org.craftercms.examples.projectsView'
                }
            }));
        }, title: formatMessage({
            id: 'org.craftercms.examples.vanilla.viewProjects',
            defaultMessage: 'View my projects'
        }) }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const showSystemNotification = /*#__PURE__*/ createAction('SHOW_SYSTEM_NOTIFICATION');
// endregion

var messages = defineMessages({
    systemNotification: {
        id: 'org.craftercms.examples.vanilla.exampleTranslations',
        defaultMessage: 'Hello. This text is internationalized.'
    }
});
var Vanilla = {
    main: function (_a) {
        var _b;
        var craftercms = _a.craftercms, element = _a.element, configuration = _a.configuration;
        var _c = createEmotion({ key: 'vanilla_component' }), css = _c.css, flush = _c.flush;
        var store = craftercms.getStore();
        var className = css({
            margin: '.5em',
            padding: '.5em',
            border: '2px solid #000',
            textAlign: 'center',
            color: (_b = configuration.fontColor) !== null && _b !== void 0 ? _b : 'green'
        });
        var user = store.getState().user.username;
        var button = document.createElement('button');
        button.innerText = 'Click for snack';
        button.style.margin = '10px auto 0';
        button.style.display = 'block';
        button.onclick = function () {
            store.dispatch(showSystemNotification({
                message: craftercms.utils.i18n.getCurrentIntl().formatMessage(messages.systemNotification)
            }));
        };
        element.classList.add(className);
        element.innerHTML = "Hello from vanilla component, ".concat(user, ".");
        element.appendChild(button);
        return function () {
            // Component destruction logic
            flush();
        };
    }
};

function ProjectsView(props) {
    var _a = useState(), sites = _a[0], setSites = _a[1];
    useEffect(function () {
        var subscription = fetchAll().subscribe(function (sites) { return setSites(sites); });
        return function () { return subscription.unsubscribe(); };
    }, []);
    if (!sites) {
        return jsx(LoadingState, {});
    }
    return (jsxs(Box, { sx: { p: 1 }, children: [jsx(Grid, { container: true, spacing: 2, children: sites.map(function (site) { return (jsx(Grid, { item: true, children: jsx(SiteCard, { site: site, onSiteClick: function () { return undefined; }, onDeleteSiteClick: null, onEditSiteClick: null, onPublishButtonClick: null, publishingStatus: false, onDuplicateSiteClick: null }) }, site.id)); }) }), jsx(Typography, { variant: "body2", textAlign: "center", children: jsx(FormattedMessage, { id: "org.craftercms.examples.sitesView.numOfProjectsMessage", defaultMessage: "You have {total, plural, one {one project} other {{total} projects}}", values: { total: sites.total } }) })] }));
}

function PathExploringView(props) {
    var _a = useState(''), path = _a[0], setPath = _a[1];
    var id = useId();
    return (jsxs(Box, { sx: { p: 1, minHeight: '30vh' }, children: [jsx(PathSelector, { value: path, disabled: false, onPathSelected: setPath, stripXmlIndex: false }), path && jsx(PathNavigatorTree, { id: "".concat(id, "_").concat(path), label: "Explorer", rootPath: path, initialCollapsed: false })] }));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const useSelection =
  useSelector ;

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const contentTypeDropTargetsResponse = /*#__PURE__*/ createAction('CONTENT_TYPE_DROP_TARGETS_RESPONSE');
const FETCH_CONTENT_TYPES = 'FETCH_CONTENT_TYPES';
const fetchContentTypes = /*#__PURE__*/ createAction(FETCH_CONTENT_TYPES);
/*#__PURE__*/ createAction(contentTypeDropTargetsResponse.type);
// endregion

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useContentTypes() {
  const dispatch = useDispatch();
  const site = useActiveSiteId();
  const { byId, isFetching } = useSelection((state) => state.contentTypes);
  useEffect(() => {
    if (!byId && site && isFetching === null) {
      dispatch(fetchContentTypes());
    }
  }, [dispatch, site, byId, isFetching]);
  return byId;
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useContentTypeList(filterFn = null) {
  const byId = useContentTypes();
  return useMemo(
    () => {
      if (!byId) {
        return null;
      } else {
        const list = Object.values(byId);
        return Boolean(filterFn) ? list.filter(filterFn) : list;
      }
    },
    // Filter omitted purposely to facilitate use without need
    // to memoize filterFn on the consumer side
    // eslint-disable-next-line
    [byId]
  );
}

function ContentTypesView(props) {
    /**
     * You could also...
     * - `useContentTypes()` to get the content types as a lookup table of content types indexed by their id.
     * - Fetch them "manually":
     *      const { fetchContentTypes } = craftercms.services.contentTypes;
     *      const { ContentType } = craftercms.components;
     *      const [contentTypes, setContentTypes] = useState<ContentType[]>();
     *      fetchContentTypes().subscribe((contentTypes) => setContentTypes(contentTypes))
     * */
    var contentTypes = useContentTypeList();
    if (!contentTypes) {
        return jsx(LoadingState, {});
    }
    var numOfTypes = contentTypes.length;
    return (jsxs(Box, { sx: { p: 1 }, children: [jsx(List, { children: contentTypes.map(function (contentType) { return (jsx(ListItem, { children: jsx(ListItemText, { primary: contentType.name }) }, contentType.id)); }) }), jsx(Typography, { variant: "body2", textAlign: "center", children: numOfTypes ? (jsx(FormattedMessage, { id: "org.craftercms.examples.sitesView.numOfContentTypesMessage", defaultMessage: "There {total, plural, one {is one content type} other {are {total} content types}}", values: { total: numOfTypes } })) : (jsx(FormattedMessage, { id: "org.craftercms.examples.sitesView.noContentTypesMessage", defaultMessage: "There are no content types" })) })] }));
}

var plugin = {
    id: 'org.craftercms.examples.componentLibrary',
    locales: {
        en: en,
        es: es
    },
    widgets: {
        'org.craftercms.examples.vanilla': Vanilla,
        'org.craftercms.examples.projectsView': ProjectsView,
        'org.craftercms.examples.contentTypesView': ContentTypesView,
        'org.craftercms.examples.pathExploringView': PathExploringView,
        'org.craftercms.examples.viewProjectsPanelButton': ViewProjectsPanelButton
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

export { ContentTypesView, PathExploringView, ProjectsView, Vanilla, ViewProjectsPanelButton, plugin as default };
