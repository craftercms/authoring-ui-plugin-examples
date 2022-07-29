(function (craftercms) {
  const {
    libs: {
      // Various libraries can be accessed via `craftercms.libs`
      // Other libs like MaterialUI, rxjs, emotion (createEmotion) are also in libs
      React: { createElement, useState, Fragment, useEffect },
      ReactDOMClient: { createRoot },
      MaterialUI: { Button, Typography, Divider },
      ReactRedux: { useSelector }
    },
    // You can access CrafterCMS components through `craftercms.components`.
    // They are also published through npm for those kinds of dev stacks.
    components: { CrafterCMSNextBridge, ErrorState, EnhancedDialog, DialogBody },
    // You could use CrafterCMS services through `craftercms.services`.
    // They are also published through npm for those kinds of dev stacks.
    services: { sites: sitesServices }
  } = craftercms;

  let elem = document.createElement('div');
  let root = createRoot(elem);

  document.body.appendChild(elem);

  function App() {
    const [sites, setSites] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const version = useSelector((state) => state.env.version);
    const user = useSelector((state) => state.user);
    useEffect(() => {
      sitesServices.fetchAll().subscribe((sites) => {
        setSites(sites);
      });
    }, []);
    // region render
    // You could use JSX by setting up transpilation and deploying the transpiled output
    // instead of the source file.
    return createElement(
      'div',
      { style: { textAlign: 'center', margin: '50px auto' } },
      createElement(ErrorState, {
        imageUrl: '/studio/static-assets/images/content_creation.svg',
        title: 'Vanilla Plugin',
        message: `Hello, ${user?.firstName ?? 'anonymous'}`,
        styles: { image: { width: 250 } }
      }),
      createElement(Divider),
      sites
        ? createElement(
            Fragment,
            {},
            createElement(Typography, {}, 'Your Sites'),
            createElement(Typography, {}, sites.map((site) => site.name).join(', '))
          )
        : createElement('p', {}, 'Fetching sites...'),
      createElement(Divider),
      createElement(
        Button,
        {
          onClick() {
            setShowModal(true);
          }
        },
        'Show CrafterCMS Version'
      ),
      createElement(
        EnhancedDialog,
        {
          title: 'CrafterCMS Version',
          open: showModal,
          onClose() {
            setShowModal(false);
          }
        },
        createElement(DialogBody, {}, `You're running CrafterCMS version ${version}`)
      )
    );
    // endregion
  }

  root.render(createElement(CrafterCMSNextBridge, {}, createElement(App)));
})(window.craftercms);
