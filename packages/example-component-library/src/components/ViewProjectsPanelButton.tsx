import * as React from 'react';
import { useIntl } from 'react-intl';
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { useDispatch } from 'react-redux';

export function ViewProjectsPanelButton() {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  return (
    <ToolsPanelListItemButton
      icon={{ id: '@mui/icons-material/AutoAwesomeMotionOutlined' }}
      onClick={() =>
        dispatch(
          showWidgetDialog({
            title: formatMessage({
              id: 'org.craftercms.examples.vanilla.myProjects',
              defaultMessage: 'My Projects'
            }),
            widget: {
              id: 'org.craftercms.examples.projectsView'
            }
          })
        )
      }
      title={formatMessage({
        id: 'org.craftercms.examples.vanilla.viewProjects',
        defaultMessage: 'View my projects'
      })}
    />
  );
}

export default ViewProjectsPanelButton;
