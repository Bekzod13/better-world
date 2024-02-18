import { useState } from "react";
import AdminRoutes from "./AdminRoutes";
import { LayoutContext } from "./context/LayoutContext";
import { useUserStore } from "./store/userStore";
import Login from "./views/Auth/Login";

function App() {
  const isAuthorized = useUserStore(state=>state.app.isAuthorized);
  const [sidebar, setSidebar] = useState(false);

  const contextValue = {
    sidebar, setSidebar
  }

  localStorage.setItem('chakra-ui-color-mode', 'light');

  return (
    <LayoutContext.Provider value={contextValue}>
    {
      isAuthorized ? 
      <AdminRoutes/>:
      <Login/>
    }
    </LayoutContext.Provider>
  )
}

export default App
