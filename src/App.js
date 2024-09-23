import React from 'react';
import {BrowserRouter as Router, Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {AppProvider} from "./AppContext";
import Home from './components/Home';
import Notes from './components/Notes';
import Themes from './components/Themes';
import TelegramSetup from './components/TelegramSetup';
import './style/App.css';
import {useSwipeable} from "react-swipeable";
import PreloadImages from "./PreloadImages";

function Navbar() {
    const location = useLocation();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''} style={{
                        fontFamily: "Garamond, monospace",
                        fontWeight: "bold"
                    }}>
                        Notes
                    </Link>
                </li>
                <li>
                    <Link to="/themes" className={location.pathname === '/themes' ? 'active' : ''} style={{
                        fontFamily: "Garamond, monospace",
                        fontWeight: "bold"
                    }}>
                        Themes
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

function SwipeableViews() {
    const navigate = useNavigate();
    const location = useLocation();

    const routes = ['/', '/themes'];
    const currentIndex = routes.indexOf(location.pathname);

    const navigateToNextPage = () => {
        if (currentIndex >= 0 && currentIndex < routes.length - 1) {
            const nextIndex = currentIndex + 1;
            navigate(routes[nextIndex]);
        }
    };

    const navigateToPreviousPage = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            navigate(routes[prevIndex]);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            console.log("Swiped left");
            navigateToNextPage();
        },
        onSwipedRight: () => {
            console.log("Swiped right");
            navigateToPreviousPage();
        },
    });

    return (
        <div {...swipeHandlers} style={{height: '100vh'}}>
            <Routes>
                <Route index path="/" element={<Notes/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/themes" element={<Themes/>}/>
            </Routes>
        </div>
    );
}

function App() {
    return (
        <AppProvider>
            <PreloadImages/>
            <Router basename="/knowledge-webapp">
                <div className="App">
                    <TelegramSetup/>
                    <div className="container">
                        <Navbar/>
                        <SwipeableViews/>
                    </div>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;