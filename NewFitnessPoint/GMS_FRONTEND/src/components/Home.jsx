import Header from './Header'
import HeroSection from './HeroSection'
import OwnerSection from './OwnerSection'
import TrainersSection from './TrainersSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

// import TrainerHome from "./TrainerView/TrainerHome";


  function Home() {
    return (
      <>
        <Header /> 
        <HeroSection /> 
        <OwnerSection />
        <TrainersSection />
        <ContactSection />
        <Footer />
        {/* <TrainerHome /> */}
        
      </>
    )
  }
  
  export default Home;