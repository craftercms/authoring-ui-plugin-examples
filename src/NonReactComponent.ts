import jss from 'jss'

export default {
  main({ craftercms, element, configuration }) {
    const store = craftercms.getStore()
    const stylesheet = jss.createStyleSheet({
      root: {
        margin: '.5em',
        padding: '.5em',
        border: '2px solid #000',
        'text-align': 'center',
        color: configuration.fontColor || 'green'
      }
    })
    const { classes } = stylesheet.attach()
    const user = store.getState().user.username
    element.classList.add(classes.root)
    element.innerHTML = `Hello from the non-react world, ${user}. ${craftercms.getIntl().formatMessage({
      id: 'myTestTranslation',
      defaultMessage: 'Showing the default translation'
    })}.`
    return () => {
      // Component destruction logic
      stylesheet.detach()
    }
  }
}
