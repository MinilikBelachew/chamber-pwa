import { useParams, useNavigate } from 'react-router-dom';
import { useGetSectorCategoriesQuery } from '../../store/api';
import { Skeleton } from '../../components/ui/Skeleton';
import CategoryListItem from './components/CategoryListItem';
import AdsCarousel from '../../components/ui/AdsCarousel';

export default function SectorCategoriesPage() {
    const { sectorId } = useParams();
    const navigate = useNavigate();
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
        <div className="pb-20 bg-gray-50 min-h-screen">
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
            <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold mb-4 ml-2">Categories</h2>
                {sector.categories?.map((category: any, index: number) => (
                    <CategoryListItem
                        key={category.id}
                        category={category}
                        onTap={() => navigate(`/company-list/${category.id}`)}
                    />
                ))}
            </div>
        </div>
    );
}
