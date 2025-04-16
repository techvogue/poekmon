import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const PokemonDetail = () => {
    const { id } = useParams();
    const { isDark } = useTheme();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon(response.data);

                if (response.data.cries && response.data.cries.latest) {
                    setAudio(new Audio(response.data.cries.latest));
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch Pokemon details');
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    const toggleSound = () => {
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        } else {
            audio.play().catch(error => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    };

    // Add event listener for when audio finishes playing naturally
    useEffect(() => {
        if (!audio) return;

        const handleAudioEnd = () => {
            setIsPlaying(false);
            audio.currentTime = 0;
        };

        audio.addEventListener('ended', handleAudioEnd);

        // Cleanup function
        return () => {
            audio.pause();
            audio.currentTime = 0;
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [audio]);

    const getTypeColor = (type) => {
        const typeColors = {
            normal: 'bg-gray-400',
            fire: 'bg-red-500',
            water: 'bg-blue-500',
            electric: 'bg-yellow-400',
            grass: 'bg-green-500',
            ice: 'bg-blue-200',
            fighting: 'bg-red-700',
            poison: 'bg-purple-500',
            ground: 'bg-yellow-600',
            flying: 'bg-indigo-300',
            psychic: 'bg-pink-500',
            bug: 'bg-green-400',
            rock: 'bg-yellow-700',
            ghost: 'bg-purple-700',
            dragon: 'bg-indigo-600',
            dark: 'bg-gray-800',
            steel: 'bg-gray-500',
            fairy: 'bg-pink-300'
        };
        return typeColors[type] || 'bg-gray-200';
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} flex items-center justify-center`}>
                <div className={`text-2xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'} animate-pulse`}>Loading Pokemon...</div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} flex items-center justify-center`}>
                <div className="text-2xl font-bold text-red-500">{error || 'Pokemon not found'}</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'} py-12`}>
            <div className="container mx-auto px-4">
                <div className={`max-w-4xl mx-auto ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden`}>
                    {/* Header with back button and sound controls */}
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <div className="flex items-center justify-between">
                            <Link to="/dashboard" className="flex items-center text-white hover:text-blue-100 transition duration-300">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Pokedex
                            </Link>
                            {audio && (
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-medium">
                                        {isPlaying ? "Stop Pokemon Cry" : "Play Pokemon Cry"}
                                    </span>
                                    <button
                                        onClick={toggleSound}
                                        className={`p-3 rounded-full transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${isPlaying
                                            ? 'bg-red-500 hover:bg-red-600'
                                            : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                                            }`}
                                    >
                                        {isPlaying ? (
                                            <PauseIcon className="w-6 h-6" />
                                        ) : (
                                            <PlayIcon className="w-6 h-6" />
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rest of the Pokemon detail content */}
                    <div className="p-6">
                        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                                {/* Left Column - Basic Info */}
                                <div>
                                    <div className="text-center mb-8">
                                        <img
                                            src={pokemon.sprites.front_default}
                                            alt={pokemon.name}
                                            className="w-64 h-64 mx-auto"
                                        />
                                        <h1 className={`text-4xl font-bold capitalize mt-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            {pokemon.name}
                                        </h1>
                                        <div className="flex justify-center gap-2 mt-4">
                                            {pokemon.types.map((type) => (
                                                <span
                                                    key={type.type.name}
                                                    className={`${getTypeColor(type.type.name)} px-4 py-2 text-sm rounded-full text-white font-medium capitalize`}
                                                >
                                                    {type.type.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Height</p>
                                            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{pokemon.height / 10}m</p>
                                        </div>
                                        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</p>
                                            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{pokemon.weight / 10}kg</p>
                                        </div>
                                        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Base Experience</p>
                                            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{pokemon.base_experience}</p>
                                        </div>
                                        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>ID</p>
                                            <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>#{pokemon.id}</p>
                                        </div>
                                    </div>

                                    {/* Abilities */}
                                    <div className="mb-8">
                                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Abilities</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            {pokemon.abilities.map((ability) => (
                                                <div key={ability.ability.name} className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Ability</p>
                                                    <p className={`text-lg font-semibold capitalize ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                        {ability.ability.name.replace(/-/g, ' ')}
                                                    </p>
                                                    {ability.is_hidden && (
                                                        <span className="text-xs text-blue-400">(Hidden Ability)</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Stats and Moves */}
                                <div>
                                    {/* Stats */}
                                    <div className="mb-8">
                                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Stats</h2>
                                        <div className="space-y-4">
                                            {pokemon.stats.map((stat) => (
                                                <div key={stat.stat.name}>
                                                    <div className="flex justify-between mb-1">
                                                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} capitalize`}>
                                                            {stat.stat.name.replace(/-/g, ' ')}
                                                        </span>
                                                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                            {stat.base_stat}
                                                        </span>
                                                    </div>
                                                    <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5`}>
                                                        <div
                                                            className="bg-blue-600 h-2.5 rounded-full"
                                                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Moves */}
                                    <div>
                                        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Moves</h2>
                                        <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                                            {pokemon.moves.map((move) => (
                                                <div
                                                    key={move.move.name}
                                                    className={`${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} p-3 rounded-lg transition-colors`}
                                                >
                                                    <p className={`text-sm font-medium capitalize ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                        {move.move.name.replace(/-/g, ' ')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail; 