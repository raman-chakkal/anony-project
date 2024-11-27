import React, { useState } from 'react';
import { getArticles } from '../services/api';
import ArticleCard from '../components/ArticleCard';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const data = await getArticles(query);
        setResults(data);
    };

    return (
        <div>
            <h2>Search Articles</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by title or tags"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="search-results">
                {results.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default Search;
