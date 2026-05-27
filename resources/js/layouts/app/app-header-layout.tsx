import type { AppLayoutProps } from '@/types';
import { AppContent } from '../../components/laravel/app-content';
import { AppHeader } from '../../components/laravel/app-header';
import { AppShell } from '../../components/laravel/app-shell';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
