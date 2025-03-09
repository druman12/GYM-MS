import "../../../css/Overview.css";
import Sidebar from "../SideBar";
import { useState } from "react";
import TrainerHeader from "../TrainerHeader";
import {  useEffect } from 'react';

function Overview() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
     const trainer_id=sessionStorage.getItem('userId');
        const [Batches, setBatches] = useState(null);
        const url1=`http://127.0.0.1:8000/api/batches/trainer/${trainer_id}/`
        
          useEffect(() => {
            fetch(url1)  // Replace with your actual API URL
              .then(response => response.json())
              .then(data => setBatches(data))
              .catch(error => console.error('Error fetching Batches data:', error));
          }, [url1]);

          const [PT, setPT] = useState(null);
        const url2=`http://127.0.0.1:8000/api/pt/${trainer_id}/`
        
          useEffect(() => {
            fetch(url2)  // Replace with your actual API URL
              .then(response => response.json())
              .then(data => setPT(data))
              .catch(error => console.error('Error fetching Batches data:', error));
          }, [url2]);

    return (
        <div className="overview-container">
                <Sidebar />
            <div className="main-content">
                <TrainerHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <h2 className="overview-title">Dashboard Overview</h2>
                <div className="cards-container">
                    <div className="card">
                        <p className="card-title">My Batches</p>
                        <p className="card-number">{Batches ? Batches.batch_count : 'Loading...'}</p>
                    </div>
                    <div className="card">
                        <p className="card-title">PT clients</p>
                        <p className="card-number">{PT ? PT.PT_count : 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
