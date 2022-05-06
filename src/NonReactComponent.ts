import createEmotion from '@emotion/css/create-instance';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';

export default {
  main({ craftercms, element, configuration }) {
    const { css, flush } = createEmotion({ key: 'nonreactcomponent' });
    const store = craftercms.getStore();
    const className = css({
      margin: '.5em',
      padding: '.5em',
      border: '2px solid #000',
      textAlign: 'center',
      color: configuration.fontColor ?? 'green'
    });
    const user = store.getState().user.username;
    const button = document.createElement('button');
    button.innerHTML = 'Click for snack';
    button.style.margin = '10px auto 0';
    button.style.display = 'block';
    button.onclick = () => {
      store.dispatch(
        showSystemNotification({
          message: craftercms.utils.i18n.getCurrentIntl().formatMessage({
            id: 'myTestTranslation',
            defaultMessage: 'Showing the default translation'
          })
        })
      );
    };
    element.classList.add(className);
    element.innerHTML = `Hello from the non-react world, ${user}.`;
    element.appendChild(button);
    return () => {
      // Component destruction logic
      flush();
    };
  }
};
