import { useNavigate } from 'react-router-dom';
import { formatName } from '../../../lib/format';
import compPlaceholder from '../../../assets/compp.jpg';

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
        <div
            className="flex items-center bg-white dark:bg-surface rounded-2xl p-2 mb-3 shadow-sm active:scale-[0.98] transition-all cursor-pointer border border-gray-100 dark:border-gray-800"
            onClick={() => navigate(`/company/${company.id}`)}
        >
            {/* Company Image Placeholder */}
            <div className="h-[90px] w-[110px] bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden flex-shrink-0">
                <img
                    src={compPlaceholder}
                    alt="Company"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info */}
            <div className="ml-4 flex-1 min-w-0 pr-2">
                <h4 className="font-bold text-[15px] sm:text-base text-black dark:text-white line-clamp-2 leading-tight">
                    {formatName(company.companyName)}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate font-medium">
                    {formatName(company.categoryName)}
                </p>
            </div>

            {/* View Button */}
            <div className="flex-shrink-0 pr-2">
                <div className="bg-primary px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-[11px] font-bold text-white uppercase">
                        View
                    </span>
                </div>
            </div>
        </div>
    );
}


