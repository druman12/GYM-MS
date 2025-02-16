import "../../../css/SideBar.css";


function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile">
        <div className="avatar"></div>
        <span className="trainer-name">Trainer name</span>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#overviews">Overviews</a>
          </li>
          <li>
            <a href="#attendance" className="active">
              Attendance
            </a>
          </li>
          <li>
            <a href="#batches">Batches</a>
          </li>
          <li>
            <a href="#personal-training">Personal training</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar

