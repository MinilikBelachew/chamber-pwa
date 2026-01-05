import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://coc.addisanalytics.com/api/' }),
    endpoints: (builder) => ({
        getPublicCategories: builder.query<any, void>({
            query: () => 'public/categories',
            transformResponse: (response: any) => {
                const data = response.data;
                return {
                    sectors: data.categories.map((s: any) => ({
                        id: s.id,
                        sectorName: s.sector_name,
                        photo: s.photo,
                        categoriesCount: s.categories_count,
                    })),
                    ads: data.ads?.map((a: any) => ({
                        id: a.id,
                        photo: a.ad_banner || a.photo,
                        link: a.link,
                    })) || [],
                };
            },
        }),
        getSectorCategories: builder.query<any, number>({
            query: (sectorId) => `public/sector/${sectorId}/categories`,
            transformResponse: (response: any) => {
                const data = response.data;
                const info = data.sector_info || data || {};
                return {
                    id: info.id,
                    sectorName: info.sector_name || info.name,
                    photo: info.photo,
                    categories: data.categories?.map((c: any) => ({
                        id: c.id,
                        categoryName: c.category_name,
                        companiesCount: parseInt(c.companies_count || '0', 10),
                    })) || [],
                    ads: data.ads?.map((a: any) => ({
                        id: a.id,
                        photo: a.ad_banner || a.photo,
                        link: a.link,
                    })) || [],
                };
            }
        }),
        getCategoryCompanies: builder.query<any, { categoryId: number; page: number }>({
            query: ({ categoryId, page }) => `public/category/${categoryId}/companies?page=${page}`,
            transformResponse: (response: any) => {
                const data = response.data;
                const companies = data.companies?.map((c: any) => ({
                    id: c.id,
                    companyName: c.company_name,
                    categoryName: c.categorie?.categoryName || c.categorie?.category_name || c.category_name,
                    ads: [], // Todo map ads
                    // Add other fields if needed
                })) || [];

                return {
                    companies,
                    categoryName: companies[0]?.categoryName,
                    ads: data.ads || []
                };
            }
        }),
        searchCompanies: builder.query<any, { query: string; page: number }>({
            query: ({ query, page }) => ({
                url: `public/companies/search?page=${page}`,
                method: 'POST',
                body: { name: query },
            }),
            transformResponse: (response: any) => {
                // Search likely returns similar structure, verify if needed. 
                // Assuming standard structure for search
                const data = response.data; // Check search wrapper
                // Flutter search implementation: SearchResponseModel.fromJson(response.data)
                // SearchResponseModel usually has `data` list or similar. 
                // Will assume 'data' is the list or { companies: [] }. 
                // Let's check search response structure briefly if possible.
                // For now, mapping broadly.
                return {
                    results: data?.data?.map((c: any) => ({
                        id: c.id,
                        companyName: c.company_name,
                        categoryName: c.categorie?.category_name || c.category_name,
                        logo: c.company_logo,
                        description: c.description || '', // Assuming description might be there or not
                        addressBook: c.address_book || [],
                        // Map other fields as needed for the UI
                    })) || [],
                    total: data?.total || 0,
                };
            }
        }),
        getCompanyDetail: builder.query<any, number>({
            query: (companyId) => `public/company/${companyId}`,
            transformResponse: (response: any) => {
                const data = response.data; // Usually detail is directly in data or data.company
                // Flutter detail: CompanyDetailModel.fromJson(response.data)
                // Let's assume it returns the object directly or nested.
                // If nested in data, access it.
                // Flutter: return CompanyDetailModel.fromJson(response.data as Map...);
                // Usually response.data is the body.
                return {
                    id: data.id,
                    companyName: data.company_name,
                    categoryName: data.categorie?.category_name || data.category_name,
                    logo: data.logo,
                    description: data.description,
                    addressBook: data.address_book?.map((a: any) => ({
                        addressTypeName: a.addresstype?.address_type_name || '',
                        addressTypeIcon: a.addresstype?.address_type_icon || '',
                        addressValue: a.address_value
                    })) || [],
                    location: data.location,
                    mapImage: data.map_image,
                    additionalInfo: data.additional_info,
                    ads: data.ads || []
                };
            }
        }),
        registerCompany: builder.mutation<any, { name: string; email: string; phone: string }>({
            query: (data) => ({
                url: 'contact',
                method: 'POST',
                body: {
                    ...data,
                    message: 'Register',
                    status: 'pending',
                },
            }),
        }),
    }),
});

export const {
    useGetPublicCategoriesQuery,
    useGetSectorCategoriesQuery,
    useGetCategoryCompaniesQuery,
    useSearchCompaniesQuery,
    useGetCompanyDetailQuery,
    useRegisterCompanyMutation,
} = api;
