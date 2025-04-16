import axios from 'axios';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const { isDark } = useTheme();
    const [allPokemon, setAllPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const cardsContainerRef = useRef(null);
    const ITEMS_PER_PAGE = 20;

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchAllPokemon = async () => {
        try {
            setLoading(true);
            // Fetch all 151 Pokemon at once
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
            const pokemonData = await Promise.all(
                response.data.results.map(async (pokemon) => {
                    const details = await axios.get(pokemon.url);
                    return details.data;
                })
            );
            setAllPokemon(pokemonData);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch Pokemon data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        // Reset to first page when search term changes
        setCurrentPage(1);
    }, [searchTerm]);

    useEffect(() => {
        if (!loading && allPokemon.length > 0) {
            const cards = cardsContainerRef.current?.querySelectorAll('.pokemon-card');
            if (cards) {
                gsap.set(cards, {
                    opacity: 0,
                    y: 30
                });

                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: "power2.out"
                });
            }
        }
    }, [loading, currentPage, searchTerm]);

    const filteredPokemon = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

    const handlePageClick = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = windowWidth < 640 ? 1 : 3;

        let startPage = Math.max(1, currentPage - maxPagesToShow);
        let endPage = Math.min(totalPages, currentPage + maxPagesToShow);

        if (currentPage <= maxPagesToShow) {
            endPage = Math.min(totalPages, 2 * maxPagesToShow + 1);
        }
        if (currentPage > totalPages - maxPagesToShow) {
            startPage = Math.max(1, totalPages - 2 * maxPagesToShow);
        }

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => handlePageClick(1)}
                    className={`px-3 py-1 rounded-lg ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pageNumbers.push(
                    <span key="start-ellipsis" className={`px-3 py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 rounded-lg ${i === currentPage
                        ? isDark ? 'bg-blue-800 text-white' : 'bg-blue-700 text-white'
                        : isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <span key="end-ellipsis" className={`px-3 py-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        ...
                    </span>
                );
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={`px-3 py-1 rounded-lg ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} flex items-center justify-center`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'} animate-pulse`}>Loading Pokemon...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} flex items-center justify-center`}>
                <div className="text-2xl font-bold text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} py-12`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>Pokemon Explorer</h1>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg`}>Discover and search through your favorite Pokemon</p>
                </div>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search Pokemon..."
                            className={`w-full px-6 py-3 rounded-full ${isDark
                                ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-blue-400'
                                : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-blue-500'
                                } shadow-md focus:outline-none focus:ring-2 transition-colors duration-200`}
                        />
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className={`w-6 h-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {filteredPokemon.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="w-32 h-32 mb-6">
                            <svg className={`w-full h-full ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>No Pokemon Found</h2>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg mb-6 text-center max-w-md`}>
                            {searchTerm
                                ? `We couldn't find any Pokemon matching "${searchTerm}". Try searching with a different name.`
                                : "No Pokemon are currently available. Please try again later."
                            }
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className={`px-6 py-3 ${isDark
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white rounded-lg transition duration-300 flex items-center gap-2`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentPokemon.map((pokemon) => (
                                <div key={pokemon.id} className="pokemon-card">
                                    <PokemonCard pokemon={pokemon} isDark={isDark} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex flex-col items-center gap-4 mt-8">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageClick(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg ${currentPage !== 1
                                        ? isDark
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                        : isDark
                                            ? 'bg-gray-700 text-gray-400'
                                            : 'bg-gray-300 text-gray-500'
                                        } text-white cursor-${currentPage !== 1 ? 'pointer' : 'not-allowed'}`}
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-1">
                                    {renderPageNumbers()}
                                </div>

                                <button
                                    onClick={() => handlePageClick(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg ${currentPage !== totalPages
                                        ? isDark
                                            ? 'bg-blue-600 hover:bg-blue-700'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                        : isDark
                                            ? 'bg-gray-700 text-gray-400'
                                            : 'bg-gray-300 text-gray-500'
                                        } text-white cursor-${currentPage !== totalPages ? 'pointer' : 'not-allowed'}`}
                                >
                                    Next
                                </button>
                            </div>
                            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                Page {currentPage} of {totalPages}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PokemonList; 