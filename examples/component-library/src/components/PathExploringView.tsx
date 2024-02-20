import React, { useId, useState } from 'react';
import { Box } from '@mui/material';
import { PathNavigatorTree, PathSelector } from '@craftercms/studio-ui';

export interface PathExploringViewProps {}

export function PathExploringView(props: PathExploringViewProps) {
  const [path, setPath] = useState('');
  const id = useId();
  return (
    <Box sx={{ p: 1, minHeight: '30vh' }}>
      <PathSelector value={path} disabled={false} onPathSelected={setPath} stripXmlIndex={false} />
      {path && <PathNavigatorTree id={`${id}_${path}`} label="Explorer" rootPath={path} initialCollapsed={false} />}
    </Box>
  );
}

export default PathExploringView;
