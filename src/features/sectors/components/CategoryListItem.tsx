
import { ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/Card';

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

export default function CategoryListItem({ category, onTap }: CategoryListItemProps) {
    return (
        <Card
            className="cursor-pointer hover:shadow-md transition-shadow dark:bg-card mb-2"
            onClick={onTap}
        >
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                        {category.categoryName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{category.categoryName}</h3>
                        <p className="text-sm text-gray-500">{category.companiesCount} companies</p>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
        </Card>
    );
}
