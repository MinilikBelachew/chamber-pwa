
import { useTranslation } from 'react-i18next';
import { formatName } from '../../../lib/format';

export interface Category {
    id: number;
    categoryName: string;
    companiesCount: number;
}

interface CategoryListItemProps {
    category: Category;
    sectorPhoto?: string;
    index?: number;
    onTap?: () => void;
}

export default function CategoryListItem({ category, sectorPhoto, index = 0, onTap }: CategoryListItemProps) {
    const { t } = useTranslation();

    return (
        <div
            className="flex items-center gap-4 py-3 px-4 active:bg-gray-100 dark:active:bg-gray-800 transition-colors cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-0"
            onClick={onTap}
        >
            {/* Number badge */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {index + 1}
                </span>
            </div>

            {/* Sector image */}
            <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-850 border border-gray-100 dark:border-gray-800">
                <img
                    src={sectorPhoto ? `https://coc.addisanalytics.com/storage/uploads/${sectorPhoto}` : 'https://placehold.co/100x100?text=Sector'}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=Sector';
                    }}
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-black dark:text-white truncate leading-tight">
                    {formatName(category.categoryName)}
                </h3>
                <p className="text-xs text-secondary-foreground/60 dark:text-gray-400 mt-0.5">
                    {category.companiesCount} {t('companies')}
                </p>
            </div>

            {/* View badge */}
            <div className="flex-shrink-0 bg-primary px-4 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    {t('view')}
                </span>
            </div>
        </div>
    );
}
