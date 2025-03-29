import MemberHeader from '../Member/MemberHeader';
import ExerciseList from '../Member/ExerciseList';
import DietList from '../Member/DietList';
import Footer from '../Footer';

function MemberHome() {
    return (
      <>
       <MemberHeader />
        <ExerciseList />
        <DietList />
        <Footer />
      </>
    )
  }
  
  export default MemberHome;