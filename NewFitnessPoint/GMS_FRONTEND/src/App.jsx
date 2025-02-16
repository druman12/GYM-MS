import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Gallery from './components/Gallery/Gallery';
import About from './components/About/About';
import ContactSection from './components/ContactSection';
import Login from './components/Login';
// import Login from './components/Login'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
