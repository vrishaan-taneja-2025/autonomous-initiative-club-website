import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import BackgroundEffect from './components/BackgroundEffect';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Team from './pages/Team';
import About from './pages/About';
import Recruitments from './pages/Recruitments';

function AppContent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Mobile menu toggle
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking on a link (mobile)
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Close menu when clicking outside (mobile)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.header-nav') && !event.target.closest('.hamburger')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <ErrorBoundary>
            <div className="app-container">
                {/* Background Effect */}
                <BackgroundEffect />
                
                {/* Header */}
                <header>
                    <div className="header-logo">
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <img src="./Img/logo.svg" alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            <span>Autonomous Initiative Club</span>
                        </Link>
                    </div>
                    
                    <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`} style={{ display: isMenuOpen ? 'flex' : '' }}>
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <Link to="/projects" onClick={closeMenu}>Projects</Link>
                        <Link to="/events" onClick={closeMenu}>Events</Link>
                        <Link to="/team" onClick={closeMenu}>Team</Link>
                        <Link to="/about" onClick={closeMenu}>About Us</Link>
                        <Link to="/recruitments" onClick={closeMenu}>Recruitments</Link>
                    </nav>
                    
                    {/* Hamburger only shows on phones */}
                    <button 
                        className="hamburger" 
                        aria-label="Open menu" 
                        aria-controls="primary-nav" 
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                </header>

                {/* Main Content */}
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/recruitments" element={<Recruitments />} />
                    </Routes>
                </main>
            </div>
        </ErrorBoundary>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
