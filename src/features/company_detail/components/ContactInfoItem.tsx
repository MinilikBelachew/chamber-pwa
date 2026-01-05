import { Phone, Mail, Globe, Send, MessageCircle, FileText } from 'lucide-react';

export interface AddressBookEntry {
    addressTypeName: string;
    addressTypeIcon: string;
    addressValue: string;
}

interface ContactInfoItemProps {
    contact: AddressBookEntry;
}

export default function ContactInfoItem({ contact }: ContactInfoItemProps) {
    const type = contact.addressTypeName.toLowerCase();

    const getIcon = () => {
        switch (true) {
            case type.includes('email'):
            case type === 'e-mail':
                return Mail;
            case type.includes('phone'):
            case type === 'tel':
            case type === 'mob':
                return Phone;
            case type === 'web':
                return Globe;
            case type === 'whatsapp':
                return MessageCircle;
            case type === 'telegram':
                return Send;
            default:
                return FileText;
        }
    };

    const IconComp = getIcon();

    const handleClick = () => {
        const value = contact.addressValue;
        let href = '';

        if (type.includes('email') || type === 'e-mail') {
            href = `mailto:${value}`;
        } else if (type === 'web') {
            href = value.startsWith('http') ? value : `https://${value}`;
        } else if (type === 'telegram') {
            href = 'https://t.me/'; // Flutter app just opens t.me main page?
        } else if (type === 'whatsapp') {
            href = 'https://whatsapp.com';
        } else if (type.includes('phone') || type === 'tel' || type === 'mob') {
            href = `tel:+${value.replace(/\D/g, '')}`; // clean status
        }

        if (href) {
            window.open(href, '_blank', 'noreferrer');
        }
    };

    return (
        <div
            onClick={handleClick}
            className="mx-10 my-1 p-4 flex items-center bg-white dark:bg-surface rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-transparent dark:border-gray-800"
        >
            <div className="w-7 h-7 flex items-center justify-center text-primary">
                <img
                    src={`https://coc.addisanalytics.com/storage/uploads/${contact.addressTypeIcon}`}
                    alt={contact.addressTypeName}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                />
                <IconComp className="hidden w-6 h-6" />
            </div>
            <div className="ml-6 flex-1 font-bold text-base truncate text-black dark:text-white">
                {contact.addressValue}
            </div>
        </div>
    );
}
