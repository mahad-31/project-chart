// material-ui
import { useTheme } from "@mui/material/styles";

import logo from "assets/images/logo.svg";

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return <img src={logo} alt="Juggle" width="100" />;
};

export default Logo;
