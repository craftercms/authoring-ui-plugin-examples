import createEmotion from '@emotion/css/create-instance';
import { showSystemNotification } from '@craftercms/studio-ui/state/actions/system';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  systemNotification: {
    id: 'org.craftercms.example.vanilla.exampleTranslations',
    defaultMessage: 'Hello. This text is internationalized.'
  }
});

export default {
  main({ craftercms, element, configuration }) {
    const { css, flush } = createEmotion({ key: 'vanilla_component' });
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
    button.innerText = 'Click for snack';
    button.style.margin = '10px auto 0';
    button.style.display = 'block';
    button.onclick = () => {
      store.dispatch(
        showSystemNotification({
          message: craftercms.utils.i18n.getCurrentIntl().formatMessage(messages.systemNotification)
        })
      );
    };
    element.classList.add(className);
    element.innerHTML = `Hello from vanilla component, ${user}.`;
    element.appendChild(button);
    return () => {
      // Component destruction logic
      flush();
    };
  }
};
