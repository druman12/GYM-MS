import MemberHeader from './MemberHeader';
import PersonalDetails from './PersonalDetails';
import BMIReport from './BMIReport';
// import Attendance from './Attendance';
import '../../css/MemberProfileView.css';
import Footer from '../../components/Footer'
import AttendanceCalendar from './AttendanceCalender';

function MemberProfileView() {
  return (
    <>
      <MemberHeader />
      <PersonalDetails />
      <BMIReport />
      <AttendanceCalendar />
      <Footer />
     
    </>
  );
}

export default MemberProfileView;
