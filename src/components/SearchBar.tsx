import { useState } from 'react';

interface SearchBarProps {
    onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!city) return;
        onSearch(city);
        setCity('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={city}
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
                className="p-2 rounded-md border w-64 text-black bg-white shadow-md"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
