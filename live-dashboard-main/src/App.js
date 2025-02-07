import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { SocketProvider } from "./context/SocketContext";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import AppModal from "components/appmodal/AppModal";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <SocketProvider>
      <AppModal />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </SocketProvider>
  );
};

export default App;
