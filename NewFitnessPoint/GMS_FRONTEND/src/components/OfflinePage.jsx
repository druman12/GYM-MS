import { Dumbbell, WifiOff } from 'lucide-react';
import styles from '../css/Offline_page.module.css'; // Import the CSS module

const OfflinePage= () => {
  const handleRetry = () => {
    // Attempt to reload the page to check the connection
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <WifiOff className={styles.wifiIcon} aria-label="Offline icon" />
          <h1 className={styles.title}>Network Disconnected</h1>
          <p className={styles.description}>
            You seem to be offline. Please check your connection.
          </p>
        </div>
        <div className={styles.content}>
          <Dumbbell className={styles.dumbbellIcon} aria-label="Dumbbell icon" />
          <p className={styles.motivationalTitle}>Keep Pushing!</p>
        </div>
        <div className={styles.footer}>
          <button onClick={handleRetry} className={styles.retryButton}>
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
