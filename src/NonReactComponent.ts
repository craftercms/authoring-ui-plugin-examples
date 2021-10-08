import createEmotion from '@emotion/css/create-instance'

const { css, flush } = createEmotion({ key: 'nonreactcomponent' })

export default {
  main({ craftercms, element, configuration }) {
    const store = craftercms.getStore()
    const className = css({
      margin: '.5em',
      padding: '.5em',
      border: '2px solid #000',
      textAlign: 'center',
      color: configuration.fontColor || 'green'
    })
    const user = store.getState().user.username
    element.classList.add(className)
    element.innerHTML = `Hello from the non-react world, ${user}. ${craftercms.getIntl().formatMessage({
      id: 'myTestTranslation',
      defaultMessage: 'Showing the default translation'
    })}.`
    return () => {
      // Component destruction logic
      flush()
    }
  }
}
