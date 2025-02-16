import '../../css/PersonalDetails.css';

const PersonalDetails = () => {
  return (
    <div className="personal-details-container">
      <h2>Personal Details</h2>
      <div className="personal-details">
        <p><strong>Name:</strong> Person full name</p>
        <p><strong>Date Of Birth:</strong> dd/mm/yyyy</p>
        <p><strong>Gender:</strong> M/F</p>
        <p><strong>Height/Weight:</strong> 000cm/00KG</p>
        <p><strong>Occupation:</strong> XYZ</p>
        <p><strong>Address:</strong> XYZ</p>
        <p><strong>Telephone:</strong> 1234567890</p>
        <p><strong>Email:</strong> memberemail@gmail.com</p>
      </div>
    </div>
  );
};

export default PersonalDetails;
