
import '../../css/PersonalTraining.css';

const PersonalTraining = () => {
  return (
    <div className="trainer-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="trainer-profile">
          <div className="trainer-avatar">
            <img src="/placeholder.svg?height=80&width=80" alt="Trainer" />
          </div>
          <div className="trainer-name">Trainer name</div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <a href="/overviews">Overviews</a>
            </li>
            <li>
              <a href="/attendance">Attendance</a>
            </li>
            <li>
              <a href="/batches">Batches</a>
            </li>
            <li>
              <a href="/personal-training" className="active">
                Personal training
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        <header className="header">
          <button className="logout-button">Log Out</button>
        </header>

        <main className="content">
          <div className="table-container">
            <table className="client-table">
              <thead>
                <tr>
                  <th>name</th>
                  <th>membership type</th>
                  <th>Join date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John show</td>
                  <td>Premium</td>
                  <td>dd/mm/yyyy</td>
                </tr>
                <tr>
                  <td>John show</td>
                  <td>Premium</td>
                  <td>dd/mm/yyyy</td>
                </tr>
                <tr>
                  <td>John show</td>
                  <td>Premium</td>
                  <td>dd/mm/yyyy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PersonalTraining

