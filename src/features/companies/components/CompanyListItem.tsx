import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export interface Company {
    id: number;
    companyName: string;
    categoryName: string;
    ads: any[]; // Using any for now, refine later
}

interface CompanyListItemProps {
    company: Company;
}

export default function CompanyListItem({ company }: CompanyListItemProps) {
    const navigate = useNavigate();

    return (
        <Card
            className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow dark:bg-card mb-3"
            onClick={() => navigate(`/company/${company.id}`)}
        >
            <CardContent className="p-2 flex items-center">
                <div className="h-[100px] w-[120px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                        src="https://placehold.co/120x100?text=Company" // Placeholder as in Flutter it was a local asset 'compp.jpg'
                        alt={company.companyName}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                    <h4 className="font-semibold text-base line-clamp-2 leading-tight">
                        {formatCompanyName(company.companyName)}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {formatCompanyName(company.categoryName)}
                    </p>
                </div>
                <div className="hidden sm:block ml-2">
                    <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                        View
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function formatCompanyName(name: string) {
    if (!name) return '';
    return name.split(' ').map(word =>
        word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
    ).join(' ');
}
