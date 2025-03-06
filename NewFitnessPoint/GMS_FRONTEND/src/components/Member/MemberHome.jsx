import MemberHeader from '../Member/MemberHeader';
import ExerciseList from '../Member/ExerciseList';
import DietList from '../Member/DietList';

function MemberHome() {
    return (
      <>
       <MemberHeader />
        <ExerciseList />
        <DietList />
      </>
    )
  }
  
  export default MemberHome;