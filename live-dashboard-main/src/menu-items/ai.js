// assets
import { IconUserScan } from '@tabler/icons-react';

// constant
const icons = { IconUserScan };

// ==============================|| AI MENU ITEMS ||============================== //

const aitools = {
  id: "aitools",
  title: "AI Tools",
  type: "group",
  children: [
    {
      id: "persona",
      title: "Forecasting",
      type: "item",
      url: "/audience",
      icon: icons.IconUserScan,
      breadcrumbs: false,
    },
    // {
    //   id: "abtest",
    //   title: "A/B Testing",
    //   type: "item",
    //   url: "/audience",
    //   icon: icons.IconDashboard,
    //   breadcrumbs: false,
    // },
  ],
};

export default aitools;
