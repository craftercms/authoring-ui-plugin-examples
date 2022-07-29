import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { LoadingState } from '@craftercms/studio-ui';
import useContentTypeList from '@craftercms/studio-ui/hooks/useContentTypeList';
import { FormattedMessage } from 'react-intl';

export interface ContentTypesViewProps {}

export function ContentTypesView(props: ContentTypesViewProps) {
  /**
   * You could also...
   * - `useContentTypes()` to get the content types as a lookup table of content types indexed by their id.
   * - Fetch them "manually":
   *      import { fetchContentTypes } from '@craftercms/studio-ui/services/contentTypes';
   *      import { ContentType } from '@craftercms/studio-ui';
   *      const [contentTypes, setContentTypes] = useState<ContentType[]>();
   *      fetchContentTypes().subscribe((contentTypes) => setContentTypes(contentTypes))
   * */
  const contentTypes = useContentTypeList();
  if (!contentTypes) {
    return <LoadingState />;
  }
  const numOfTypes = contentTypes.length;
  return (
    <Box sx={{ p: 1 }}>
      <List>
        {contentTypes.map((contentType) => (
          <ListItem key={contentType.id}>
            <ListItemText primary={contentType.name} />
          </ListItem>
        ))}
      </List>
      <Typography variant="body2" textAlign="center">
        {numOfTypes ? (
          <FormattedMessage
            id="org.craftercms.example.sitesView.numOfContentTypesMessage"
            defaultMessage="There {total, plural, one {is one content type} other {are {total} content types}}"
            values={{ total: numOfTypes }}
          />
        ) : (
          <FormattedMessage
            id="org.craftercms.example.sitesView.noContentTypesMessage"
            defaultMessage="There are no content types"
          />
        )}
      </Typography>
    </Box>
  );
}

export default ContentTypesView;
