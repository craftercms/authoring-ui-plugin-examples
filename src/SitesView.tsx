import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { fetchAll } from '@craftercms/studio-ui/services/sites';
import { PagedArray, Site, SiteCard } from '@craftercms/studio-ui';

export interface SitesViewProps {}

export function SitesView(props: SitesViewProps) {
  const [sites, setSites] = useState<PagedArray<Site>>();
  useEffect(() => {
    const subscription = fetchAll().subscribe((sites) => setSites(sites));
    return () => subscription.unsubscribe();
  }, []);
  if (!sites) {
    return (
      <Box sx={{ height: '100%', minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
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
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="body2" textAlign="center">
        You have {sites.total} site{sites.total > 1 ? 's' : ''}
      </Typography>
    </Box>
  );
}

export default SitesView;
