import * as React from 'react';
import { useIntl } from 'react-intl';
import ToolsPanelListItemButton from '@craftercms/studio-ui/components/ToolsPanelListItemButton';
import { showWidgetDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import { useDispatch } from 'react-redux';

export function ViewSitesPanelButton() {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  return (
    <ToolsPanelListItemButton
      icon={{ id: '@mui/icons-material/AutoAwesomeMotionOutlined' }}
      onClick={() =>
        dispatch(
          showWidgetDialog({
            title: formatMessage({
              id: 'viewMySites',
              defaultMessage: 'View my sites'
            }),
            widget: {
              id: 'org.craftercms.sample.sitesView'
            }
          })
        )
      }
      title={formatMessage({
        id: 'viewMySites',
        defaultMessage: 'View my sites'
      })}
    />
  );
}

export default ViewSitesPanelButton;
