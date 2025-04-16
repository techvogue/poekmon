import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon, isDark }) => {
    // Function to get type-specific background color
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

    return (
        <Link to={`/pokemon/${pokemon.id}`} className="block">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl`}>
                <div className="relative">
                    <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-400 to-purple-500 ${isDark ? 'opacity-10' : 'opacity-20'}`}></div>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-32 h-32 mx-auto relative z-10 transform hover:scale-110 transition duration-300"
                    />
                </div>
                <div className="p-6">
                    <h3 className={`text-2xl font-bold text-center capitalize mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {pokemon.name}
                    </h3>
                    <div className="flex justify-center gap-2 mb-4">
                        {pokemon.types.map((type) => (
                            <span
                                key={type.type.name}
                                className={`${getTypeColor(type.type.name)} px-4 py-1 text-sm rounded-full text-white font-medium capitalize shadow-md`}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                    <div className={`grid grid-cols-2 gap-4 ${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                        <div className="text-center">
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Height</p>
                            <p className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{pokemon.height / 10}m</p>
                        </div>
                        <div className="text-center">
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} font-medium`}>Weight</p>
                            <p className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{pokemon.weight / 10}kg</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PokemonCard; 