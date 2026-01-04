import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 pb-16 md:pb-0">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
}
