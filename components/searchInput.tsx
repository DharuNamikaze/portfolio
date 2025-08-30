// components/SearchInput.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SearchInputProps {
    placeholder?: string;
    className?: string;
}

export function SearchInput({
    placeholder = "Search posts...",
    className = "dark:bg-black p-2 rounded-2xl border-2 border-neutral-300 focus:shadow-xl bg-white ring-white"
}: SearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') ?? '');

    useEffect(() => {
        // Debounce the search with 500ms delay
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (search.trim()) {
                params.set('search', search.trim());
            } else {
                params.delete('search');
            }

            // Update URL without full page reload
            router.replace(`/blog?${params.toString()}`);
        }, 300);

        // Cleanup timeout on component unmount or search change
        return () => clearTimeout(timeoutId);
    }, [search, router, searchParams]);

    return (
        <div className="relative">
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={className}
                placeholder={placeholder}
                title="Search"
            />
        </div>
    );
}