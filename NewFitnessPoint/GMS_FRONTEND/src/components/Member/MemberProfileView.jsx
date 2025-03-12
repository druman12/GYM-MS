import MemberHeader from './MemberHeader';
import PersonalDetails from './PersonalDetails';
import BMIReport from './BMIReport';
// import Attendance from './Attendance';
import '../../css/MemberProfileView.css';
import Footer from '../../components/Footer'

function MemberProfileView() {
  return (
    <>
      <MemberHeader />
      <PersonalDetails />
      <BMIReport />
      <Footer />
     
    </>
  );
}

export default MemberProfileView;
