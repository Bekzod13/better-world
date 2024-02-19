import { useState } from "react";
import AdminRoutes from "./AdminRoutes";
import { LayoutContext } from "./context/LayoutContext";
import { useUserStore } from "./store/userStore";
import Login from "./views/Auth/Login";

function App() {
  const isAuthorized = useUserStore(state => state.app.isAuthorized);
  const [sidebar, setSidebar] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const contextValue = {
    sidebar, setSidebar
  }

  const handleSwipeToTop = (event) => {
    if (event.deltaY < -50) {
      setRefreshing(true);
        window.location.reload();
      setTimeout(() => {
        setRefreshing(false);
      }, 3000);
    }
  };


  localStorage.setItem('chakra-ui-color-mode', 'light');

  return (
    <LayoutContext.Provider value={contextValue}>
      <>
      <div
          style={{ minHeight: '0', overflowY: 'auto' }}
          onTouchMove={handleSwipeToTop}
        ></div>
          {refreshing ? (
            <div>Loading...</div>
          ) : (
            <>
                {
                isAuthorized ? 
                <AdminRoutes/>:
                <Login/>
              }
            </>
          )}
        </>
    </LayoutContext.Provider>
  )
}

export default App
