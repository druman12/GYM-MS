import MemberHeader from './MemberHeader';
import PersonalDetails from './PersonalDetails';
import BMIReport from './BMIReport';
// import Attendance from './Attendance';
import '../../css/MemberProfileView.css';

function MemberProfileView() {
  return (
    <>
      <MemberHeader />
      <PersonalDetails />
      <BMIReport />
     
    </>
  );
}

export default MemberProfileView;
