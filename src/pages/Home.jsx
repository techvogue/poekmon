import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[90vh] w-full">
                {/* Hero Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/pokemon-hero.jpg"
                        alt="Pokemon Collection"
                        className="w-full h-[90vh] object-fill object-center"
                    />

                    <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex items-center ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                            <span className="block mb-2">Welcome to the</span>
                            <span className="block text-yellow-400 dark:text-yellow-500">Ultimate PokéDex</span>
                        </h1>
                        <p className="mt-3 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 pb-10">
                            Explore the vast world of Pokémon, discover their abilities, stats, and more in our comprehensive Pokémon database.
                        </p>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Explore Pokémon
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-yellow-600 dark:text-yellow-500 font-semibold tracking-wide uppercase">Features</h2>
                        <p className="mt-2 text-3xl md:text-4xl font-extrabold">
                            Everything you need to know about Pokémon
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl">
                                <div className="w-12 h-12 rounded-md bg-yellow-400 dark:bg-yellow-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-medium">Comprehensive Database</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Access detailed information about every Pokémon, including stats, abilities, and moves.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl">
                                <div className="w-12 h-12 rounded-md bg-yellow-400 dark:bg-yellow-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-medium">Interactive Experience</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Listen to Pokémon cries and explore their various forms and appearances.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl">
                                <div className="w-12 h-12 rounded-md bg-yellow-400 dark:bg-yellow-500 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-medium">Advanced Stats</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    View detailed statistics and compare Pokémon abilities and performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;