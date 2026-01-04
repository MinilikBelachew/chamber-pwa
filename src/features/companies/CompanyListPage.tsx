import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetCategoryCompaniesQuery } from '../../store/api';
import CompanyListItem from './components/CompanyListItem';
import type { Company } from './components/CompanyListItem';
import { Skeleton } from '../../components/ui/Skeleton';
import { Button } from '../../components/ui/Button';

export default function CompanyListPage() {
    const { categoryId } = useParams();
    const { t } = useTranslation();

    // ... pagination ...
    const page = 1;
    const { data, isLoading, error, refetch } = useGetCategoryCompaniesQuery({
        categoryId: Number(categoryId),
        page
    });

    const companies: Company[] = data?.companies || [];
    const categoryName = data?.categoryName || t('companies');

    if (isLoading) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton className="h-8 w-1/2" />
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28 w-full rounded-xl" />)}
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
                <h3 className="text-lg font-semibold text-red-500 mb-2">{t('somethingWentWrong')}</h3>
                <Button onClick={() => refetch()}>{t('error')}</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-primary px-4 py-4 text-white sticky top-0 z-10 shadow-sm">
                <h1 className="text-xl font-bold">{categoryName}</h1>
            </div>

            <div className="p-4">
                {companies.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">{t('no_companies_found')}</div>
                ) : (
                    companies.map(company => (
                        <CompanyListItem key={company.id} company={company} />
                    ))
                )}
            </div>
        </div>
    );
}
