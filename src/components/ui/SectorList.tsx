
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from './Card';
import type { Sector } from '../../features/home/components/TopSectors';

interface SectorListProps {
    sectors: Sector[];
    onSectorClick: (id: number) => void;
}

export default function SectorList({ sectors, onSectorClick }: SectorListProps) {
    return (
        <div className="space-y-3">
            {sectors.map((sector) => (
                <Card
                    key={sector.id}
                    className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer dark:bg-card"
                    onClick={() => onSectorClick(sector.id)}
                >
                    <CardContent className="p-2 flex items-center">
                        <div className="h-[100px] w-[120px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                            <h4 className="font-semibold text-lg line-clamp-2 leading-tight">
                                {formatSectorName(sector.sectorName)}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                                {sector.categoriesCount} categories
                            </p>
                        </div>
                        <ChevronRight className="text-primary w-6 h-6 mr-2" />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function formatSectorName(name: string) {
    if (!name) return '';
    return name.split(',').map(part =>
        part.trim().split(' ').map(word =>
            word.toLowerCase() === 'and' ? 'and' : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ')
    ).join(', ');
}
