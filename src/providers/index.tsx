import { ReactNode, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

import { BrowserRouter as Router } from 'react-router-dom';
import {FlowProvider} from './FlowProvider'
import {NotionProvider} from './NotionProvider'


interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <FlowProvider>
        <NotionProvider>
          <Router>{children}</Router>
        </NotionProvider>
      </FlowProvider>
    </Suspense>
  );
}