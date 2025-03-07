import '../../css/TrainerHeader.css'
import { useNavigate } from "react-router-dom";
import { useLoading } from '../LoadingContext';

const TrainerHeader = () => {
    const { showLoader, hideLoader } = useLoading(); // Get loading functions
    const navigate = useNavigate();

  // Function to handle navigation with loading state
  const handleAction = (path, e = null) => {
    if (e) e.preventDefault();
    
    showLoader(); // Show loader before navigation

    // If logging out, clear localStorage
    if (path === '/') {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userType');
    }

    setTimeout(() => {
        navigate(path);
        hideLoader(); // Hide loader after navigation
    }, 500); // Simulated delay
};
    return (
        <div className="trainer-header">
            <button className="logout-btn" onClick={() => handleAction('/')}>Log Out</button>
        </div>
    );
};

export default TrainerHeader;
