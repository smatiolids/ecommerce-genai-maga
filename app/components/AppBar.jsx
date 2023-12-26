import { ToggleThemeButton, AppBar } from "react-admin";
import { Typography } from "@mui/material";

const AppBarCustom = (props) => (
  <AppBar {...props}>
    <Typography flex="1" variant="h6" id="react-admin-title">
      The GenAI Store
    </Typography>
    <div class="px-2">
      <img src="magalu-cloud-logo.png" width="180" height="50" />
    </div>
    <div class="px-2">
      <img src="datastax-enterprise_dark-background_horizontal-lockup.png" width="230" height="50" />
    </div>
  </AppBar>
);

export default AppBarCustom;
