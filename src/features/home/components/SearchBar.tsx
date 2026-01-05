import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/Button';

export default function SearchBar() {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative z-10 w-full">
            <div className={cn(
                "flex items-center bg-white rounded-full border border-primary shadow-sm h-11 px-4 transition-all",
                "dark:bg-gray-800 dark:border-primary/50"
            )}>
                <Input
                    type="text"
                    placeholder={t('searchBusiness')}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border-none shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent h-full px-2 placeholder:font-bold"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-transparent hover:text-primary/80 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                >
                    <Search className="h-5 w-5" />
                </Button>
            </div>
        </form>
    );
}
