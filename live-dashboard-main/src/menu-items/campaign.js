// assets
import { IconDashboard } from "@tabler/icons";

// constant
const icons = { IconDashboard };

// ==============================|| CAMPAIGN MENU ITEMS ||============================== //

const campaigns = {
  id: "campaigns",
  title: "Campaigns",
  type: "group",
  children: [
    {
      id: "campaigns",
      title: "My Campaigns",
      type: "item",
      url: "/audience",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
  ],
};

export default campaigns;
