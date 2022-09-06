import {
    Typography,
    Container,
    Paper,
    useTheme,
    useMediaQuery,
    Grid,
    Box,
  } from '@mui/material';
  import { ReactNode } from 'react';
  
  type LayoutProps = {
    children: ReactNode;
  };
  
  export function Layout({ children }: LayoutProps): JSX.Element {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:900px)');
  
    return (
      <>
        <Grid container sx={{ background: isMobile ? '' : '#EDE530' }}>
          <Grid
            item
            md={9}
            sx={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!isMobile && (
              <Box
                sx={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  display: 'flex',
                  maxWidth: '1000px',
                }}
              >
              </Box>
            )}
  
            <Container
              component="main"
              maxWidth={isMobile && 'md'}
              sx={{
                display: 'flex',
                flex: 1,
                height: '100%',
                padding: 0,
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-end',
                transform: isMobile ? '' : `translate(30%)`,
              }}
            >
              <Paper
                elevation={5}
                sx={{
                  width: isMobile ? '100vw' : 450,
                  borderRadius: isMobile ? 0 : 5,
                  height: isMobile ? '100vh' : 650,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                {children}
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </>
    );
  }
  