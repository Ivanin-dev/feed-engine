import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { AppHeader } from '../../components/layout/AppHeader';
import { AppSidebar } from '../../components/layout/AppSidebar';
import { AppContent } from '@/components/laravel/app-content';
import { AppShell } from '@/components/laravel/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({ children }: AppLayoutProps) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <AppShell variant="sidebar">
            {auth.user && (
                <AppSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}
            <AppContent
                variant="sidebar"
                className="relative h-screen overflow-y-auto"
            >
                <AppHeader
                    isSidebarOpen={isSidebarOpen}
                    onSidebarToggle={() => setIsSidebarOpen((open) => !open)}
                />
                {children}
            </AppContent>
        </AppShell>
    );
}
