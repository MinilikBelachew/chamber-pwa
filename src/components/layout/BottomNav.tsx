import { NavLink } from 'react-router-dom';
import { Home, Layers, QrCode, Phone, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export default function BottomNav() {
    const { t } = useTranslation();

    const navItems = [
        { name: t('tabs.sector'), path: '/sectors', icon: Layers },
        { name: t('tabs.scan'), path: '/scan', icon: QrCode },
        { name: t('tabs.home'), path: '/', icon: Home, isFab: true },
        { name: t('tabs.contact'), path: '/contact', icon: Phone },
        { name: t('tabs.settings'), path: '/settings', icon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 lg:hidden pb-safe">
            <div className="grid h-full grid-cols-5 mx-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group transition-colors",
                                isActive ? "text-primary dark:text-primary" : "text-gray-500 dark:text-gray-400",
                                item.isFab && "relative"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {item.isFab ? (
                                    <div className={cn(
                                        "absolute -top-6 bg-primary text-white p-3 rounded-full shadow-lg transition-transform",
                                        isActive ? "scale-110" : "scale-100"
                                    )}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                ) : (
                                    <item.icon className={cn("w-6 h-6 mb-1 transition-colors", isActive && "fill-current/20")} />
                                )}
                                <span className={cn(
                                    "text-xs font-medium truncate max-w-full transition-colors",
                                    item.isFab && "mt-8"
                                )}>
                                    {item.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
