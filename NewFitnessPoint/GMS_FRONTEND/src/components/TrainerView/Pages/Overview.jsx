import "../../../css/Overview.css";
import Sidebar from "../SideBar";
import { useState } from "react";
import TrainerHeader from "../TrainerHeader";

function Overview() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="overview-container">
                <Sidebar />
            <div className="main-content">
                <TrainerHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <h2 className="overview-title">Dashboard Overview</h2>
                <div className="cards-container">
                    <div className="card">
                        <p className="card-title">My Batches</p>
                        <p className="card-number">3</p>
                    </div>
                    <div className="card">
                        <p className="card-title">PT clients</p>
                        <p className="card-number">5</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
