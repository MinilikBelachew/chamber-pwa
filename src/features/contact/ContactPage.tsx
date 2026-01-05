import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone, Globe, Inbox, Linkedin, Facebook, Twitter, Youtube, Send } from 'lucide-react';

export default function ContactPage() {
    const { t } = useTranslation();

    const handleOpenLink = (url: string) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const contacts = [
        { icon: MapPin, text: 'Mexico Square, Addis Ababa, Ethiopia', action: () => handleOpenLink('https://www.google.com/maps/search/?api=1&query=Ethiopian+Chamber+of+Commerce+Mexico+Square') },
        { icon: Mail, text: 'info@ethiopianchamber.com', action: () => handleOpenLink('mailto:info@ethiopianchamber.com') },
        { icon: Phone, text: '+251 11 551 8240', action: () => handleOpenLink('tel:+251115518240') },
        { icon: Globe, text: 'www.ethiopianchamber.com', action: () => handleOpenLink('https://www.ethiopianchamber.com') },
        { icon: Inbox, text: 'P.O.Box: 517', action: undefined },
    ];

    const socials = [
        { icon: Linkedin, url: 'https://www.linkedin.com/company/ethiopian-chamber-of-commerce-and-sectoral-associations' },
        { icon: Facebook, url: 'https://www.facebook.com/EthiopianChamberCommerce' },
        { icon: Twitter, url: 'https://twitter.com/EthioChamber' },
        { icon: Youtube, url: 'https://www.youtube.com/channel/UC6Y2E9rW8Z-G2_zG1G6v6Pw' },
        { icon: Send, url: 'https://t.me/EthioChamber' },
    ];

    return (
        <div className="bg-[#9BD1E5] dark:bg-[#111113] min-h-screen text-black dark:text-white pb-24">
            <div className="pt-24 pb-12 text-center">
                <h1 className="text-3xl font-bold tracking-widest uppercase">{t('contactUs')}</h1>
            </div>

            <div className="bg-[#F1F5F9] dark:bg-[#1A1A1A] rounded-t-[30px] min-h-[70vh] px-6 pt-10 pb-20">
                <p className="text-center mb-10 text-black dark:text-white font-medium">
                    {t('contactPrompt')}
                </p>

                <div className="space-y-4 max-w-md mx-auto">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            onClick={contact.action}
                            className={`flex items-center p-5 bg-white dark:bg-surface rounded-2xl shadow-sm border border-transparent dark:border-gray-800 ${contact.action ? 'cursor-pointer active:scale-[0.98] transition-all' : ''}`}
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                <contact.icon className="w-6 h-6" />
                            </div>
                            <span className="ml-4 font-bold text-sm sm:text-base text-gray-800 dark:text-gray-200">{contact.text}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center gap-3">
                    {socials.map((social, index) => (
                        <button
                            key={index}
                            onClick={() => handleOpenLink(social.url)}
                            className="w-12 h-12 bg-white dark:bg-surface rounded-full flex items-center justify-center shadow-sm border border-transparent dark:border-gray-800 hover:scale-110 active:scale-95 transition-all text-primary"
                        >
                            <social.icon className="w-5 h-5 fill-current" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

