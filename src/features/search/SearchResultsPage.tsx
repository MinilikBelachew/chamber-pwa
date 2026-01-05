import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { useSearchCompaniesQuery } from '../../store/api';
import { Skeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';
import { formatName } from '../../lib/format';
import compPlaceholder from '../../assets/compp.jpg';

export default function SearchResultsPage() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const page = Number(searchParams.get('page')) || 1;

    const { data, isLoading, error, refetch } = useSearchCompaniesQuery({ query, page });

    if (isLoading) {
        return (
            <div className="p-4 space-y-4 pt-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3 pt-4">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-2/3" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
                <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                    <Search className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{t('somethingWentWrong')}</h3>
                <p className="text-gray-500 mb-6">{t('error')}</p>
                <Button onClick={() => refetch()} className="rounded-full px-8">
                    {t('retry')}
                </Button>
            </div>
        );
    }

    const results = data?.results || [];
    const total = data?.total || 0;

    return (
        <div className="min-h-screen bg-background pb-24">
            {/* Header */}
            <div className="p-6">
                <h1 className="text-2xl font-bold text-black dark:text-white">{t('tabs.search')}</h1>
                <p className="font-semibold text-gray-500 dark:text-gray-400 mt-2">
                    {t('companies')} ({total})
                </p>
            </div>

            {/* Results List */}
            {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                        <Search className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-xl font-bold text-black dark:text-white">{t('no_companies_found')}</p>
                    <p className="text-gray-500 mt-2">{t('no_results_desc') || 'Try searching for something else'}</p>
                </div>
            ) : (
                <div className="px-4 space-y-6">
                    {results.map((company: any) => (
                        <Link
                            to={`/company/${company.id}`}
                            key={company.id}
                            className="block bg-surface rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all active:scale-[0.98]"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                                <img
                                    src={compPlaceholder}
                                    alt={company.companyName}
                                    className="w-full h-full object-cover"
                                />
                                {company.categoryName && (
                                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                                        {formatName(company.categoryName)}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-black dark:text-white mb-1 leading-tight">
                                    {formatName(company.companyName)}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                                    {formatName(company.categoryName)}
                                </p>

                                {company.description && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed">
                                        {company.description}
                                    </p>
                                )}

                                {/* Contact Preview - exactly matching Flutter CompanySearchCard */}
                                {company.addressBook && company.addressBook.length > 0 && (
                                    <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                            {t('contactInfo')}
                                        </h4>
                                        <div className="space-y-2">
                                            {company.addressBook.slice(0, 3).map((contact: any, idx: number) => {
                                                const icon = contact.addresstype?.address_type_icon;
                                                const value = contact.address_value;
                                                const iconUrl = icon ? `https://coc.addisanalytics.com/storage/uploads/${icon}` : null;

                                                return (
                                                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                                                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                                                            {iconUrl ? (
                                                                <img
                                                                    src={iconUrl}
                                                                    alt=""
                                                                    className="w-4 h-4 object-contain brightness-0 dark:brightness-200 opacity-60"
                                                                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                                                />
                                                            ) : (
                                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                            )}
                                                        </div>
                                                        <span className="truncate">{value}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
