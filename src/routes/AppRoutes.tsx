import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HomePage from '../features/home/HomePage';
import SectorsPage from '../features/sectors/SectorsPage';
import SectorCategoriesPage from '../features/sectors/SectorCategoriesPage';
import CompanyListPage from '../features/companies/CompanyListPage';
import CompanyDetailPage from '../features/company_detail/CompanyDetailPage';
import SearchResultsPage from '../features/search/SearchResultsPage';
import ScannerPage from '../features/scanner/ScannerPage';
import ContactPage from '../features/contact/ContactPage';
import SettingsPage from '../features/settings/SettingsPage';
import AboutPage from '../features/settings/AboutPage';


export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/sectors" element={<SectorsPage />} />
                <Route path="/sector/:sectorId" element={<SectorCategoriesPage />} />
                {/* Placeholder routes for now */}
                <Route path="/company-list/:categoryId" element={<CompanyListPage />} />
                <Route path="/company/:companyId" element={<CompanyDetailPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/scan" element={<ScannerPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
        </Routes>
    );
}
