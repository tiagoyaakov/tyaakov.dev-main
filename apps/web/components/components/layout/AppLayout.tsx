import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export default function AppLayout({ children, sidebar }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {sidebar && (
        <aside className="hidden lg:block w-72 border-r border-gray-700 bg-slate-900/50 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-6">
            {sidebar}
          </div>
        </aside>
      )}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
