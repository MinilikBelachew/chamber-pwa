import { useSearchParams, Link } from 'react-router-dom';
import { useSearchCompaniesQuery } from '../../store/api';
import { Skeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const page = Number(searchParams.get('page')) || 1;

    const { data, isLoading, error, refetch } = useSearchCompaniesQuery({ query, page });

    if (isLoading) {
        return (
            <div className="p-4 space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-2/3" />
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
                <h3 className="text-lg font-semibold text-red-500 mb-2">Search failed</h3>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        );
    }

    const results = data?.results || [];
    const total = data?.total || 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#111113] pb-24">
            {/* Header */}
            <div className="p-6">
                <h1 className="text-2xl font-bold text-black dark:text-white">Search Results</h1>
                <p className="font-semibold text-gray-500 dark:text-gray-400 mt-2">
                    Found {total} results for "{query}"
                </p>
            </div>

            {/* Results List */}
            {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-lg text-gray-500">No companies found</p>
                </div>
            ) : (
                <div className="px-4 space-y-4">
                    {results.map((company: any) => (
                        <Link
                            to={`/company/${company.id}`}
                            key={company.id}
                            className="block bg-white dark:bg-[#1A1A1A] rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            {/* Image & Badge */}
                            <div className="relative h-44 bg-gray-200">
                                <img
                                    src={company.logo ? `https://coc.addisanalytics.com/storage/uploads/${company.logo}` : 'https://placehold.co/600x400?text=No+Image'}
                                    alt={company.companyName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                                    }}
                                />
                                {company.categoryName && (
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        {company.categoryName}
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold text-black dark:text-white mb-2">{company.companyName}</h3>
                                {company.description && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                                        {company.description}
                                    </p>
                                )}

                                {/* Contact Preview */}
                                {company.addressBook && company.addressBook.length > 0 && (
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold text-black dark:text-gray-300">Contact Info</h4>
                                        {company.addressBook.slice(0, 3).map((contact: any, idx: number) => {
                                            const icon = contact.addresstype?.address_type_icon; // Ensure mapping covers this or adjust api.ts for search results too
                                            // Note: current api.ts Search mapping doesn't deeply map addressBook with addresstype wrapper normalization
                                            // Let's rely on api.ts mapping or raw data.
                                            // Based on previous JSON, raw data has `addresstype`. 
                                            // If api.ts just passes `c.address_book`, we need to handle it here.
                                            const iconUrl = icon ? `https://coc.addisanalytics.com/storage/uploads/${icon}` : null;

                                            return (
                                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {iconUrl && (
                                                        <img src={iconUrl} alt="" className="w-5 h-5 object-contain" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                                                    )}
                                                    <span className="truncate">{contact.address_value}</span>
                                                </div>
                                            )
                                        })}
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
