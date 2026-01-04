import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { cn } from '../../../lib/utils';
import { Button } from '../../../components/ui/Button';

export default function SearchBar() {
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
                "flex items-center bg-white rounded-full border border-primary shadow-sm h-12 px-4 focus-within:ring-2 focus-within:ring-primary/20 transition-all",
                "dark:bg-gray-800 dark:border-primary/50"
            )}>
                <Input
                    type="text"
                    placeholder="Search business..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent h-full px-2"
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:bg-transparent hover:text-primary/80"
                >
                    <Search className="h-5 w-5" />
                </Button>
            </div>
        </form>
    );
}
