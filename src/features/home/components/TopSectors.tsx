import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../../../components/ui/Skeleton';
import SectorList from '../../../components/ui/SectorList';

// Define the Sector interface locally for now, or move to a types file
export interface Sector {
    id: number;
    sectorName: string;
    photo: string;
    categoriesCount: number;
}

interface TopSectorsProps {
    sectors: Sector[];
    loading?: boolean;
}

export default function TopSectors({ sectors, loading }: TopSectorsProps) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="space-y-4 px-4">
                <h3 className="text-lg font-bold">Top Sectors</h3>
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4 pb-20">
            <div className="px-4 pt-6 pb-2">
                <h3 className="text-xl font-bold">Top Sectors</h3>
            </div>
            <div className="px-4">
                <SectorList
                    sectors={sectors}
                    onSectorClick={(id) => navigate(`/sector/${id}`)}
                />
            </div>
        </div>
    );
}
