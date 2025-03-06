import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './components/LoadingContext';
import Home from './components/Home';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import ContactSection from './components/ContactSection';
import Login from './components/Login';
import MemberHome from './components/Member/MemberHome';
import TrainerHome from './components/TrainerView/TrainerHome';
import MemberProfileView from './components/Member/MemberProfileView';


function App() {
  return (
    <LoadingProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/member-home" element={<MemberHome />} />
        <Route path="/trainer-home" element={<TrainerHome />} />
        <Route path="/memberprofile" element={<MemberProfileView />} />
      </Routes>
    </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
