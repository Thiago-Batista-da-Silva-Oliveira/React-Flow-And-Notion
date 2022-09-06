import { ReactNode, Suspense } from 'react';
import { CircularProgress, Box, CssBaseline } from '@mui/material';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import {FlowProvider} from './FlowProvider'
import {NotionProvider} from './NotionProvider'
import { Notifications } from '../components/Notification';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../lib/react-query';
import { AuthProvider } from './AuthProvider';


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
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools position="bottom-right" />
            )}
      <Notifications />
      <AuthProvider>
      <FlowProvider>
        <NotionProvider>
          <Router>{children}</Router>
        </NotionProvider>
      </FlowProvider>
      </AuthProvider>
      </QueryClientProvider>
    </Suspense>
  );
}