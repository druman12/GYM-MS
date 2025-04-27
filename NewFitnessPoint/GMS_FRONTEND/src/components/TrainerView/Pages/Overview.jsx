// import "../../../css/Overview.css";
// import Sidebar from "../SideBar";
// import { useState } from "react";
// import TrainerHeader from "../TrainerHeader";
// import {  useEffect } from 'react';
// import url from "../../../URL/url"
// import {useLoading} from "../../LoadingContext";

// function Overview() {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const { showLoader , hideLoader} = useLoading();
//      const trainer_id=sessionStorage.getItem('userId');
//         const [Batches, setBatches] = useState(null);
//         const url1=`${url}api/batches/trainer/${trainer_id}/`
        
//           useEffect(() => {
//             showLoader();
//             fetch(url1)  
//               .then(response => response.json())
//               .then(data => setBatches(data))
//               .catch(error => console.error('Error fetching Batches data:', error))
//               .finally(()=> hideLoader())
//           }, [url1]);

//           const [PT, setPT] = useState(null);
//         const url2=`${url}api/pt/${trainer_id}/`
        
//           useEffect(() => {
//             showLoader()
//             fetch(url2)  
//               .then(response => response.json())
//               .then(data => setPT(data))
//               .catch(error => console.error('Error fetching Batches data:', error))
//               .finally(()=> hideLoader())
//           }, [url2]);

//     return (
//         <div className="overview-container">
//                 <Sidebar />
//             <div className="main-content">
//                 <TrainerHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
//                 <h2 className="overview-title">Dashboard Overview</h2>
//                 <div className="cards-container">
//                     <div className="card">
//                         <p className="card-title">My Batches</p>
//                         <p className="card-number">{Batches ? Batches.batch_count : 'Loading...'}</p>
//                     </div>
//                     <div className="card">
//                         <p className="card-title">PT clients</p>
//                         <p className="card-number">{PT ? PT.PT_count : 'Loading...'}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Overview;

import "../../../css/Overview.css";
import Sidebar from "../SideBar";
import TrainerHeader from "../TrainerHeader";
import { useState, useEffect } from "react";
import url from "../../../URL/url";
import { useLoading } from "../../LoadingContext";

function Overview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showLoader, hideLoader } = useLoading();
  
  const trainer_id = sessionStorage.getItem('userId');
  const [Batches, setBatches] = useState(null);
  const [PT, setPT] = useState(null);

  const url1 = `${url}api/batches/trainer/${trainer_id}/`;
  const url2 = `${url}api/pt/${trainer_id}/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoader();

        // Fetch both URLs in parallel
        const [batchesResponse, ptResponse] = await Promise.all([
          fetch(url1).then(res => res.json()),
          fetch(url2).then(res => res.json())
        ]);

        setBatches(batchesResponse);
        setPT(ptResponse);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        hideLoader(); // Only hide after both API calls are completed
      }
    };

    fetchData();
  }, [url1, url2]);

  return (
    <div className="overview-container">
      <Sidebar />
      <div className="main-content">
        <TrainerHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <h2 className="overview-title">Dashboard Overview</h2>
        <div className="cards-container">
          <div className="card">
            <p className="card-title">My Batches</p>
            <p className="card-number">
              {Batches ? Batches.batch_count : ''}
            </p>
          </div>
          <div className="card">
            <p className="card-title">PT clients</p>
            <p className="card-number">
              {PT ? PT.PT_count : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
