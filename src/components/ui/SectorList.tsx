import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatName } from '../../lib/format';
import { Card, CardContent } from './Card';
import type { Sector } from '../../features/home/components/TopSectors';

interface SectorListProps {
    sectors: Sector[];
    onSectorClick: (id: number) => void;
}

export default function SectorList({ sectors, onSectorClick }: SectorListProps) {
    const { t } = useTranslation();

    return (
        <div className="space-y-3">
            {sectors.map((sector) => (
                <Card
                    key={sector.id}
                    className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:bg-surface"
                    onClick={() => onSectorClick(sector.id)}
                >
                    <CardContent className="p-2 flex items-center">
                        <div className="h-[100px] w-[120px] bg-gray-100 dark:bg-[#2A2A2A] rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                src={`https://coc.addisanalytics.com/storage/uploads/${sector.photo}`}
                                alt={sector.sectorName}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/120x100?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="ml-4 flex-1">
                            <h4 className="font-semibold text-lg line-clamp-2 leading-tight text-black dark:text-white">
                                {formatName(sector.sectorName.replace(',', ' '))}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {sector.categoriesCount} {t('categories')}
                            </p>
                        </div>
                        <ChevronRight className="text-primary w-7 h-7 mr-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}


