import '../../../css/Overview.css'

const Overview = () => {
  return (
    <div className="overview-container">
      <h2 className="overview-title">Overview</h2>
      <div className="cards-container">
        <div className="card">
          <p className="card-title">My Batches</p>
          <p className="card-number">3</p>
        </div>
        <div className="card">
          <p className="card-title">PT Clients</p>
          <p className="card-number">5</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
