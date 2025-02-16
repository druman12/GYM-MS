import "../../css/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-content">
        <div className="aboutus-image"></div>
        <div className="aboutus-text">
          <h2>About Us</h2>
          <p>
            <strong>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </strong>{" "}
            The point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
      </div>

      <div className="aboutus-bottom">
        <div className="aboutus-box">
          <h3>Mission</h3>
          <p>
            Students practice at their own pace, first filling in gaps in their
            understanding and then accelerating their learning.
          </p>
        </div>
        <div className="aboutus-box">
          <h3>Vision</h3>
          <p>
            Created by experts, library of trusted practice and lessons covers
            math, science, and more. Always free for learners and teachers.
          </p>
        </div>
        <div className="aboutus-box">
          <h3>Goals</h3>
          <p>
            Teachers can identify gaps in their students’ understanding, tailor
            instruction, and meet the needs of every student.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
