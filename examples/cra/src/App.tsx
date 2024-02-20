import * as React from 'react';
import { lazy, ReactElement, useState } from 'react';
import { CrafterCMSNextBridge, EnhancedDialog, EnhancedDialogProps } from '@craftercms/studio-ui';
import { Card, CardContent, CardHeader, List, ListItemButton, ListItemText } from '@mui/material';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { CrafterCMSLogo } from '@craftercms/studio-ui/icons';

function App() {
  const [dialog, setDialog] = useState({
    props: { open: false } as EnhancedDialogProps,
    component: null as ReactElement
  });
  const openDialog = (props: Omit<EnhancedDialogProps, 'open'>, component: ReactElement) => {
    setDialog({ props: { open: true, ...props }, component });
  };
  const onCloseDialog = () => {
    setDialog({ props: { open: false }, component: null });
  };
  // You could also import the sample components like this:
  // import { ProjectsView, ContentTypesView, PathExploringView } from 'component-library';
  const listMySites = () => {
    const ProjectsView = lazy(() => import('component-library/build/components/ProjectsView'));
    openDialog({ title: 'My Projects' }, <ProjectsView />);
  };
  const listContentTypes = () => {
    const ContentTypesView = lazy(() => import('component-library/build/components/ContentTypesView'));
    openDialog({ title: 'Content Types' }, <ContentTypesView />);
  };
  const pathExploring = () => {
    const PathExploringView = lazy(() => import('component-library/build/components/PathExploringView'));
    openDialog({ title: 'Content Types' }, <PathExploringView />);
  };
  return (
    <CrafterCMSNextBridge>
      <Card sx={{ maxWidth: '500px', margin: '100px auto' }}>
        <CardHeader title={<CrafterCMSLogo width={150} />} sx={{ textAlign: 'center' }} />
        <CardContent>
          <List>
            <ListItemButton onClick={listMySites}>
              <ListItemText primary="List my projects" />
              <KeyboardArrowRightRoundedIcon />
            </ListItemButton>
            <ListItemButton onClick={listContentTypes}>
              <ListItemText primary="List content types of this project" />
              <KeyboardArrowRightRoundedIcon />
            </ListItemButton>
            <ListItemButton onClick={pathExploring}>
              <ListItemText primary="Choose & explore a directory" />
              <KeyboardArrowRightRoundedIcon />
            </ListItemButton>
            <ListItemButton
              href="https://github.com/craftercms/studio-ui/tree/develop/ui/app/src/components"
              target="_blank"
              rel="noreferrer"
            >
              <ListItemText primary="Explore available components" />
              <OpenInNewRoundedIcon />
            </ListItemButton>
            <ListItemButton
              href="https://github.com/craftercms/studio-ui/tree/develop/ui/app/src/services"
              target="_blank"
              rel="noreferrer"
            >
              <ListItemText primary="Explore available services" />
              <OpenInNewRoundedIcon />
            </ListItemButton>
            <ListItemButton
              href="https://github.com/craftercms/studio-ui/tree/develop/ui/app/src/utils"
              target="_blank"
              rel="noreferrer"
            >
              <ListItemText primary="Explore available utils" />
              <OpenInNewRoundedIcon />
            </ListItemButton>
          </List>
        </CardContent>
      </Card>
      <EnhancedDialog {...dialog.props} onClose={onCloseDialog}>
        {dialog.component}
      </EnhancedDialog>
    </CrafterCMSNextBridge>
  );
}

export default App;
