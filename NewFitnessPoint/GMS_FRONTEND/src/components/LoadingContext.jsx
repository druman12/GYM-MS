import { createContext, useState, useContext } from 'react';
import { Audio } from 'react-loader-spinner';

// Create the context
const LoadingContext = createContext({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {}
});

// Create a provider component
// eslint-disable-next-line react/prop-types
export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  // Function to show loader
  const showLoader = () => setIsLoading(true);
  
  // Function to hide loader
  const hideLoader = () => setIsLoading(false);

  const value = {
    isLoading,
    showLoader,
    hideLoader
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      
      {/* Global loader overlay */}
      {isLoading && (
        <div className="loader-overlay">
          <div className="loader-container">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="#ff416c"
              ariaLabel="loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <p>Loading...</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

// Custom hook to use the loading context
// eslint-disable-next-line react-refresh/only-export-components
export function useLoading() {
  const context = useContext(LoadingContext);
  
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  
  return context;
}