import { Link } from 'react-router-dom';
import { QrCode, Moon, Sun, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeProvider';

export default function Header() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-primary text-white shadow-sm transition-all hidden lg:flex">
            {/* Desktop Navigation - visible on lg and up */}
            <div className="flex h-16 items-center px-6 w-full max-w-7xl mx-auto justify-between">
                <Link to="/" className="text-2xl font-bold tracking-tight">
                    {t('chambersOfCommerce').split('\n')[0]}
                </Link>

                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium hover:text-white/80 transition-colors">
                        {t('tabs.home')}
                    </Link>
                    <Link to="/sectors" className="text-sm font-medium hover:text-white/80 transition-colors">
                        {t('tabs.sector')}
                    </Link>
                    <Link to="/contact" className="text-sm font-medium hover:text-white/80 transition-colors">
                        {t('tabs.contact')}
                    </Link>
                    <div className="flex items-center gap-3 ml-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </button>

                        <Link to="/scan" className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
                            <QrCode className="h-4 w-4" />
                            <span>{t('tabs.scan')}</span>
                        </Link>

                        <Link to="/settings" className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Settings">
                            <Settings className="h-5 w-5" />
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
