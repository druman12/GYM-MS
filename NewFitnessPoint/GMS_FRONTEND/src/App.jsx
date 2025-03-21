import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoadingProvider } from './components/LoadingContext';
import Home from './components/Home';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import ContactSection from './components/ContactSection';
import Login from './components/Login';

import MemberHome from './components/Member/MemberHome';
import TrainerHome from './components/TrainerView/TrainerHome';
import MemberProfileView from './components/Member/MemberProfileView';

import Overview from './components/TrainerView/Pages/Overview'
import BatchList from './components/TrainerView/Pages/BatchList'
import Attendance from './components//TrainerView/Pages/Attendance'
import PersonalTraining from './components/TrainerView/Pages/PersonalTraining'
import PersonalDetails from './components/Member/PersonalDetails'
import OTPSection from './components/OTPSection';
import ForgotPassword from './components/ForgotPassword';

// Protected Route component
const ProtectedRoute = ({ element, requiredUserType }) => {
  // Get user authentication info from localStorage
  const userId = sessionStorage.getItem('userId');
  const userType = sessionStorage.getItem('userType');
  
  // If user is not authenticated, redirect to login
  if (!userId || !userType) {
    return <Navigate to="/login" replace />;
  }
  
  // If a specific user type is required and doesn't match
  if (requiredUserType && userType !== requiredUserType) {
    // Redirect to appropriate home page based on user type
    if (userType === 'member') {
      return <Navigate to="/member-home" replace />;
    } else if (userType === 'trainer') {
      return <Navigate to="/overview" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  // If authenticated and user type matches or no specific type required
  return element;
};

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path='/login' element={<Login />} />
          <Route path='/otp-verification' element={<OTPSection />} />
          <Route path='/reset-password' element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route 
            path="/overview" 
            element={<ProtectedRoute element={<Overview />} requiredUserType="trainer" />} 
          />
          <Route 
            path="/batches" 
            element={<ProtectedRoute element={<BatchList />} requiredUserType="trainer" />} 
          />
          <Route 
            path="/attendance" 
            element={<ProtectedRoute element={<Attendance />} requiredUserType="trainer" />} 
          />
          <Route 
            path="/personaltraining" 
            element={<ProtectedRoute element={<PersonalTraining />} requiredUserType="trainer" />} 
          />
          
          <Route 
            path="/member-home" 
            element={<ProtectedRoute element={<MemberHome />} requiredUserType="member" />} 
          />
          <Route 
            path="/overview" 
            element={<ProtectedRoute element={<TrainerHome />} requiredUserType="trainer" />} 
          />
          <Route 
            path="/memberprofile" 
            element={<ProtectedRoute element={<MemberProfileView />} requiredUserType="member" />} 
          />
          <Route 
            path="/personalDetails" 
            element={<ProtectedRoute element={<PersonalDetails />} requiredUserType="member" />} 
          />
          
          {/* Catch all - 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;