"use client";

import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { type Router, type Navigation, PageContainer } from '@toolpad/core';
import { isAuthen } from '@/app/lib/sessionlib';
import { useRouter } from 'next/router';

const NAVIGATION: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
    },
];

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

export default async function SystemLayout(props: Readonly<{ children: React.ReactNode }>) {
    // CHECK AUTHEN
    const forceRouter = useRouter();
    const authen = await isAuthen();
    if (!authen) forceRouter.push('/pages/public/login');

    // MAIN PROCESS
    const [pathname, setPathname] = React.useState('/dashboard');
    const router = React.useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return (
        <html lang="en">
            <body>
                <AppProvider
                    navigation={NAVIGATION}
                    router={router}
                    theme={theme}
                    branding={{
                        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                        title: 'MUI',
                    }}
                >
                    <DashboardLayout>
                        <PageContainer>{props.children}</PageContainer>
                    </DashboardLayout>
                </AppProvider>
            </body>
        </html>
    );
}
