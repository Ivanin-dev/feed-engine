import { useState } from 'react';
import { AppContent } from '@/components/laravel/app-content';
import { AppShell } from '@/components/laravel/app-shell';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({ children }: AppLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <AppShell variant="sidebar">
                <AppSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
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
