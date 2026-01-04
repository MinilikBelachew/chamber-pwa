import { MapPin, Mail, Phone, Globe, Inbox, Linkedin, Facebook, Twitter, Youtube, Send } from 'lucide-react';


export default function ContactPage() {
    const handleOpenLink = (url: string) => {
        window.open(url, '_blank', 'noreferrer');
    };

    const contacts = [
        { icon: MapPin, text: 'Sarbet, Addis Ababa', action: () => handleOpenLink('https://maps.google.com') },
        { icon: Mail, text: 'info@ethiopianchamber.com', action: () => handleOpenLink('mailto:info@ethiopianchamber.com') },
        { icon: Phone, text: '+251 11 551 8240', action: () => handleOpenLink('tel:+251115518240') },
        { icon: Globe, text: 'www.ethiopianchamber.com', action: () => handleOpenLink('https://www.ethiopianchamber.com') },
        { icon: Inbox, text: 'P.O.Box: 517', action: undefined },
    ];

    const socials = [
        { icon: Linkedin, url: 'https://www.linkedin.com/company/ethiopian-chamber-of-commerce-and-sectoral-associations' },
        { icon: Facebook, url: 'https://www.facebook.com/EthiopianChamberCommerce' },
        { icon: Twitter, url: 'https://twitter.com/EthioChamber' },
        { icon: Youtube, url: 'https://www.youtube.com/channel/UC...' },
        { icon: Send, url: 'https://t.me/EthioChamber' },
    ];

    return (
        <div className="bg-[#9BD1E5] dark:bg-[#111113] min-h-screen text-black dark:text-white pb-24">
            <div className="pt-24 pb-12 text-center">
                <h1 className="text-3xl font-bold tracking-widest uppercase">Contact Us</h1>
            </div>

            <div className="bg-[#F1F5F9] dark:bg-[#1A1A1A] rounded-t-[30px] min-h-[70vh] px-6 pt-8 pb-20">
                <p className="text-center mb-8 text-black dark:text-white">
                    Contact us for more information, questions or suggestions
                </p>

                <div className="space-y-4 max-w-md mx-auto">
                    {contacts.map((contact, index) => (
                        <div
                            key={index}
                            onClick={contact.action}
                            className={`flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm ${contact.action ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
                        >
                            <div className="w-10 h-10 bg-[#4E99C1]/10 rounded-full flex items-center justify-center text-[#4E99C1]">
                                <contact.icon className="w-5 h-5" />
                            </div>
                            <span className="ml-4 font-medium text-black dark:text-gray-200">{contact.text}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center gap-4">
                    {socials.map((social, index) => (
                        <button
                            key={index}
                            onClick={() => handleOpenLink(social.url)}
                            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform text-[#4E99C1]"
                        >
                            <social.icon className="w-5 h-5" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
