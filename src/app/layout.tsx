import theme from '@/theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';
import { TanStackQueryProvider } from '@/app/TanStackQueryProvider';

export const metadata: Metadata = {
  title: 'BLA Pokedex',
  description: 'Frontend exercise for BLA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackQueryProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100dvh',
                }}
              >
                <main> {children}</main>
              </Box>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
