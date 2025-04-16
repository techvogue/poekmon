import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600'} shadow-lg transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                className="h-10 w-10"
                                src="/pokeball.png"
                                alt="Pokeball"
                            />
                            <span className={`ml-2 text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>PokéDex</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <div className="flex items-baseline space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')
                                        ? isDark ? 'bg-gray-700 text-white' : 'bg-yellow-600 text-white'
                                        : isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-900 hover:bg-yellow-500 hover:text-white'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard')
                                        ? isDark ? 'bg-gray-700 text-white' : 'bg-yellow-600 text-white'
                                        : isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-900 hover:bg-yellow-500 hover:text-white'
                                    }`}
                            >
                                Pokemon Dashboard
                            </Link>
                        </div>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark
                                    ? 'text-yellow-400 hover:bg-gray-700'
                                    : 'text-gray-900 hover:bg-yellow-500'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
                        >
                            {isDark ? (
                                // Sun Icon
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                // Moon Icon
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleTheme}
                            className={`mr-2 p-2 rounded-full ${isDark
                                    ? 'text-yellow-400 hover:bg-gray-700'
                                    : 'text-gray-900 hover:bg-yellow-500'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
                        >
                            {isDark ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${isDark ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-900 hover:bg-yellow-500'
                                } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500`}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger Icon */}
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Close Icon */}
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')
                                ? isDark ? 'bg-gray-700 text-white' : 'bg-yellow-600 text-white'
                                : isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-900 hover:bg-yellow-500 hover:text-white'
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/dashboard"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard')
                                ? isDark ? 'bg-gray-700 text-white' : 'bg-yellow-600 text-white'
                                : isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-900 hover:bg-yellow-500 hover:text-white'
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        Pokemon Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 