import axios from 'axios';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import PokemonCard from '../components/PokemonCard';

const Dashboard = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const cardsContainerRef = useRef(null);

    const setupAnimation = () => {
        const cards = cardsContainerRef.current?.querySelectorAll('.pokemon-card');
        if (cards) {
            gsap.set(cards, {
                opacity: 0,
                y: 30
            });

            cards.forEach((card, index) => {
                gsap.to(card, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    ease: "power1.out",
                    delay: index * 0.05
                });
            });
        }
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
                const pokemonData = await Promise.all(
                    response.data.results.map(async (pokemon) => {
                        const details = await axios.get(pokemon.url);
                        return details.data;
                    })
                );
                setPokemonList(pokemonData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch Pokemon data');
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    useEffect(() => {
        if (!loading && pokemonList.length > 0) {
            setupAnimation();
        }
    }, [loading, pokemonList]);

    const filteredPokemon = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">Loading...</div>;
    if (error) return <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] text-red-500">{error}</div>;

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gray-100 p-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search Pokemon..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredPokemon.map(pokemon => (
                        <div key={pokemon.id} className="pokemon-card">
                            <PokemonCard pokemon={pokemon} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 