import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { fetchAll } from '@craftercms/studio-ui/services/sites';
import { LoadingState, PagedArray, Site, SiteCard } from '@craftercms/studio-ui';
import { FormattedMessage } from 'react-intl';

export interface ProjectsViewProps {}

export function ProjectsView(props: ProjectsViewProps) {
  const [sites, setSites] = useState<PagedArray<Site>>();
  useEffect(() => {
    const subscription = fetchAll().subscribe((sites) => setSites(sites));
    return () => subscription.unsubscribe();
  }, []);
  if (!sites) {
    return <LoadingState />;
  }
  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        {sites.map((site) => (
          <Grid key={site.id} item>
            <SiteCard
              site={site}
              onSiteClick={() => undefined}
              onDeleteSiteClick={null}
              onEditSiteClick={null}
              onPublishButtonClick={null}
              publishingStatus={false}
              onDuplicateSiteClick={null}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" textAlign="center">
        <FormattedMessage
          id="org.craftercms.examples.sitesView.numOfProjectsMessage"
          defaultMessage="You have {total, plural, one {one project} other {{total} projects}}"
          values={{ total: sites.total }}
        />
      </Typography>
    </Box>
  );
}

export default ProjectsView;
