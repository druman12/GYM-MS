import '../../css/TrainerHeader.css';
import { useNavigate } from "react-router-dom";
import { useLoading } from '../LoadingContext';
import { useState, useEffect, useRef } from 'react';
import {toast} from 'react-toastify';
import url from "../../URL/url"

const TrainerHeader = () => {
    const { showLoader, hideLoader } = useLoading();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(sessionStorage.getItem('activeMenu') || ''); // Store active menu in sessionStorage

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const menuRef = useRef(null);

    const trainer_id = sessionStorage.getItem('userId');
    const [trainer, setTrainer] = useState(null);
    const url1 = `${url}api/trainer/${trainer_id}/`;

    useEffect(() => {
        fetch(url1)
            .then(response => response.json())
            .then(data => setTrainer(data))
            .catch(error => console.error('Error fetching trainer data:', error));
    }, [url1]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const handleAction = (path, e = null) => {
        if (e) e.preventDefault();
        setActiveMenu(path); // Set new active menu
        sessionStorage.setItem('activeMenu', path); // Update sessionStorage

        showLoader();
        if (path === '/') {
            toast.success('Logged out successfully');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userType');
            sessionStorage.removeItem('activeMenu'); // Clear active menu on logout
        }
        setTimeout(() => {
            navigate(path);
            hideLoader();
        }, 500);
    };

    return (
        <div className="trainer-header">
            {isMobile ? (
                <>
                    <div className="trainer-profile">
                        <div className="avatar">
                            {trainer && trainer.trainer_profile_photo ? (
                                <img src={trainer.trainer_profile_photo} alt="Trainer Avatar" className="trainer-img" />
                            ) : (
                                <span>Loading...</span>
                            )}
                        </div>
                        <span className="trainer-name">{trainer ? trainer.name : 'Loading...'}</span>
                    </div>
                    <div className="menu-container" ref={menuRef}>
                        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
                        {menuOpen && (
                            <div className="dropdown-menu">
                                <a href="/overview" 
                                   className={activeMenu === "/overview" ? "active" : ""}
                                   onClick={(e) => handleAction('/overview', e)}>Overview</a>
                                <a href="/attendance" 
                                   className={activeMenu === "/attendance" ? "active" : ""}
                                   onClick={(e) => handleAction('/attendance', e)}>Attendance</a>
                                <a href="/batches" 
                                   className={activeMenu === "/batches" ? "active" : ""}
                                   onClick={(e) => handleAction('/batches', e)}>Batches</a>
                                <a href="/personaltraining" 
                                   className={activeMenu === "/personaltraining" ? "active" : ""}
                                   onClick={(e) => handleAction('/personaltraining', e)}>Personal Training</a>
                                <hr />
                                <button className="logout-btn mobile-logout" onClick={() => handleAction('/')}>Log Out</button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <button className="logout-btn" onClick={() => handleAction('/')}>Log Out</button>
            )}
        </div>
    );
};

export default TrainerHeader;
