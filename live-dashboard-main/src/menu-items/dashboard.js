// assets
import { IconHome } from "@tabler/icons";

// constant
const icons = { IconHome };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/",
      icon: icons.IconHome,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
