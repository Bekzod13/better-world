import { useEffect, useState } from "react";
import AdminRoutes from "./AdminRoutes";
import { LayoutContext } from "./context/LayoutContext";
import { useUserStore } from "./store/userStore";
import Login from "./views/Auth/Login";
import Loader from "./components/Loader";

function App() {
  const isAuthorized = useUserStore(state => state.app.isAuthorized);
  const [sidebar, setSidebar] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const contextValue = {
    sidebar, setSidebar,
    refreshing, setRefreshing,
  }

 const handleRefresh = () => {
    if(window.screenY < 80)
    {
      setRefreshing(true);
      setTimeout(() => {
        window.location.reload();
        setRefreshing(false);
      }, 2000);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleRefresh);
    return () => {
      window.removeEventListener('scroll', handleRefresh);
    };
  }, []);

  localStorage.setItem('chakra-ui-color-mode', 'light');

  return (
    <LayoutContext.Provider value={contextValue}>
      <>
          {refreshing ? (
            <Loader/>
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
