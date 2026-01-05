import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useGetCompanyDetailQuery } from '../../store/api';
import ContactInfoItem from './components/ContactInfoItem';
import type { AddressBookEntry } from './components/ContactInfoItem';
import AdsCarousel from '../../components/ui/AdsCarousel';
import { Skeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatName } from '../../lib/format';
import compPlaceholder from '../../assets/compp.jpg';

export default function CompanyDetailPage() {
    const { t } = useTranslation();
    const { companyId } = useParams();
    const { data: company, isLoading, error, refetch } = useGetCompanyDetailQuery(Number(companyId));
    const qrRef = useRef<HTMLDivElement>(null);

    // ... handleDownloadQr (keep existing logic) ...
    const handleDownloadQr = () => {
        const svg = qrRef.current?.querySelector('svg');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.download = `company_qr_${companyId}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            };
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6 pb-20">
                <Skeleton className="h-[240px] w-full" />
                <div className="px-6 space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                    <Skeleton className="h-24 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (error || !company) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
                <h3 className="text-lg font-semibold text-red-500 mb-2">{t('somethingWentWrong')}</h3>
                <Button onClick={() => refetch()}>{t('error')}</Button>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[240px] w-full">
                <img
                    src={compPlaceholder}
                    alt={company.companyName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                    <h1 className="text-2xl font-bold text-white drop-shadow-md">
                        {formatName(company.companyName)}
                    </h1>
                    <p className="text-white/90 text-sm font-medium mt-1 drop-shadow-md">
                        {formatName(company.categoryName)}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col">
                {/* Ads Carousel */}
                {company.ads && company.ads.length > 0 && (
                    <div className="mt-4">
                        <AdsCarousel ads={company.ads} />
                    </div>
                )}

                {/* Contact Info */}
                <div className="pt-8 pb-4 px-10">
                    <h2 className="text-2xl font-bold text-black dark:text-white">Contact Information</h2>
                </div>

                <div className="space-y-1">
                    {company.addressBook?.map((contact: AddressBookEntry, index: number) => (
                        <ContactInfoItem key={index} contact={contact} />
                    ))}
                </div>

                {/* Location */}
                {company.location && (
                    <div className="mt-8 mx-10">
                        <div className="bg-yellow-200 rounded-full py-2.5 px-4 flex justify-center text-center">
                            <span className="text-sm font-medium text-black">{company.location}</span>
                        </div>
                    </div>
                )}

                {/* Map Image */}
                {company.mapImage && (
                    <div className="mt-6 mx-10">
                        <img
                            src={`https://coc.addisanalytics.com/storage/uploads/${company.mapImage}`}
                            alt="Location Map"
                            className="w-full h-[220px] object-contain bg-gray-50 dark:bg-gray-800 rounded-lg"
                        />
                    </div>
                )}

                {/* Additional Info */}
                {company.additionalInfo && Object.keys(company.additionalInfo).length > 0 && (
                    <div className="mt-8 mx-10">
                        <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Additional Information</h3>
                        <div className="space-y-4">
                            {Object.entries(company.additionalInfo).map(([key, value]) => (
                                <div key={key} className="bg-gray-100 dark:bg-surface border border-transparent dark:border-gray-800 rounded-2xl p-4 transition-colors">
                                    <h4 className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                                        {key.replace(/_/g, ' ')}
                                    </h4>
                                    <p className="text-[15px] font-medium text-black dark:text-white leading-relaxed">{String(value)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* QR Code Section */}
                <div className="mt-10 mb-20 flex flex-col items-center px-4">
                    <div className="bg-white p-4 rounded-xl shadow-lg mb-6" ref={qrRef}>
                        <QRCodeSVG
                            value={`https://coc.addisanalytics.com/companyDetail/${company.id}`}
                            size={200}
                        />
                    </div>

                    <Button
                        onClick={handleDownloadQr}
                        className="mb-8 bg-primary hover:bg-primary/90 text-white gap-2 px-6"
                    >
                        <Download className="w-4 h-4" />
                        Download QR Code
                    </Button>

                    <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">Scan to View Company</h3>
                    <p className="text-center text-gray-500 max-w-xs">
                        Use your phone camera to scan this QR code and view this company profile on your mobile device.
                    </p>
                </div>
            </div>
        </div>
    );
}
