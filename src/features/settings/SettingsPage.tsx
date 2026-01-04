import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeProvider';
import { Moon, Sun, LogIn, UserPlus, Layers, QrCode, Home, Mail, Info, ChevronRight, Languages, X, Check } from 'lucide-react';

const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
    { code: 'om', name: 'Oromiffa', nativeName: 'Afaan Oromoo' },
    { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
    { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

export default function SettingsPage() {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

    const isDark = theme === 'dark';

    const MenuItem = ({ icon: Icon, title, onClick, value }: { icon: any, title: string, onClick: () => void, value?: string }) => (
        <div
            onClick={onClick}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl mb-3 cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-black dark:text-white">{title}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-sm text-gray-500">{value}</span>}
                <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
        </div>
    );

    const Divider = () => <div className="h-px bg-gray-200 dark:bg-gray-700 my-4 mx-4" />;

    // Get current language name
    const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#111113] pb-24 relative">
            {/* Language Modal */}
            {isLanguageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl w-full max-w-sm max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-black dark:text-white">{t('profile.languages')}</h2>
                            <button onClick={() => setIsLanguageModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-2">
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        i18n.changeLanguage(lang.code);
                                        setIsLanguageModalOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl mb-1 transition-colors ${i18n.language === lang.code
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-gray-200'
                                        }`}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">{lang.nativeName}</span>
                                        <span className="text-xs opacity-70">{lang.name}</span>
                                    </div>
                                    {i18n.language === lang.code && <Check className="w-5 h-5" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="p-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-black dark:text-white">{t('tabs.settings')}</h1>
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-full bg-blue-100 dark:bg-gray-800 flex items-center justify-center text-black dark:text-white transition-colors"
                >
                    {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
            </div>

            <div className="px-4">
                {/* Auth */}
                <div className="mb-6">
                    <MenuItem
                        icon={LogIn}
                        title={t('profile.logIn')}
                        onClick={() => window.open('https://bd.ethiopianchamber.com/', '_blank')}
                    />
                </div>

                <Divider />

                <div className="mb-6">
                    <MenuItem
                        icon={UserPlus}
                        title={t('profile.registerYourCompany')}
                        onClick={() => navigate('/contact')}
                    />
                </div>

                <Divider />

                <div className="mb-6">
                    <MenuItem
                        icon={Languages}
                        title={t('profile.languages')}
                        value={currentLang.nativeName}
                        onClick={() => setIsLanguageModalOpen(true)}
                    />
                </div>

                <Divider />

                {/* Shortcuts */}
                <div className="mb-6">
                    <MenuItem icon={Layers} title={t('tabs.sector')} onClick={() => navigate('/sectors')} />
                    <MenuItem icon={QrCode} title={t('tabs.scan')} onClick={() => navigate('/scan')} />
                    <MenuItem icon={Home} title={t('tabs.home')} onClick={() => navigate('/')} />
                    <MenuItem icon={Mail} title={t('tabs.contact')} onClick={() => navigate('/contact')} />
                </div>

                <Divider />

                {/* About */}
                <div className="mb-6">
                    <MenuItem icon={Info} title={t('profile.about')} onClick={() => navigate('/about')} />
                </div>
            </div>
        </div>
    );
}
