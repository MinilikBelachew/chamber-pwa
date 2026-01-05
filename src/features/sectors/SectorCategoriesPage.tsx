import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetSectorCategoriesQuery } from '../../store/api';
import { Skeleton } from '../../components/ui/Skeleton';
import CategoryListItem from './components/CategoryListItem';
import AdsCarousel from '../../components/ui/AdsCarousel';

export default function SectorCategoriesPage() {
    const { sectorId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { data: sector, isLoading, error } = useGetSectorCategoriesQuery(Number(sectorId));

    if (isLoading) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton className="h-[288px] w-full rounded-xl" />
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
            </div>
        );
    }

    if (error || !sector) {
        return <div className="p-10 text-center text-red-500">Failed to load sector categories.</div>;
    }

    return (
        <div className="pb-20 bg-background min-h-screen">
            {/* Hero Image */}
            <div className="relative h-[250px] w-full">
                <img
                    src={`https://coc.addisanalytics.com/storage/uploads/${sector.photo}`}
                    className="w-full h-full object-cover"
                    alt={sector.sectorName}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x250?text=Sector';
                    }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                    <h1 className="text-3xl font-bold text-white shadow-black drop-shadow-md">
                        {sector.sectorName}
                    </h1>
                </div>
            </div>

            {/* Ads Carousel */}
            {sector.ads && sector.ads.length > 0 && (
                <div className="mt-4">
                    <AdsCarousel ads={sector.ads} />
                </div>
            )}

            {/* Categories List */}
            <div className="bg-surface mx-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800">
                <div className="p-4 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold text-black dark:text-white">{t('categories')}</h2>
                </div>
                {sector.categories?.map((category: any, index: number) => (
                    <CategoryListItem
                        key={category.id}
                        category={category}
                        sectorPhoto={sector.photo}
                        index={index}
                        onTap={() => navigate(`/company-list/${category.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
