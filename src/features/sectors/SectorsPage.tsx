import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetPublicCategoriesQuery } from '../../store/api';
import SectorList from '../../components/ui/SectorList';
import SearchBar from '../home/components/SearchBar';
import type { Sector } from '../home/components/TopSectors';
import { Skeleton } from '../../components/ui/Skeleton';

export default function SectorsPage() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetPublicCategoriesQuery();
    const sectors: Sector[] = data?.sectors || [];

    const { t } = useTranslation();

    return (
        <div className="pt-4 min-h-screen pb-20 bg-background text-black dark:text-white">
            <div className="px-4 mb-4">
                <h1 className="text-2xl font-bold">{t('tabs.sector')}</h1>
            </div>

            <div className="px-4 mb-6">
                <SearchBar />
            </div>

            {isLoading ? (
                <div className="space-y-4 px-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-xl" />
                    ))}
                </div>
            ) : error ? (
                <div className="p-8 text-center text-red-500">
                    Failed to load sectors.
                </div>
            ) : (
                <div className="px-4">
                    <SectorList
                        sectors={sectors}
                        onSectorClick={(id) => navigate(`/sector/${id}`)}
                    />
                </div>
            )}
        </div>
    );
}
