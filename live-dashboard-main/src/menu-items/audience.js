// assets
import { IconUsersGroup } from '@tabler/icons-react';
// constant
const icons = { IconUsersGroup  };

// ==============================|| AUDIENCE MENU ITEMS ||============================== //

const audience = {
  id: "audience",
  title: "Data/Segmentation",
  type: "group",
  children: [
    {
      id: "audience",
      title: "Demographic Segmentation",
      type: "item",
      url: "/audience",
      icon: icons.IconUsersGroup,
      breadcrumbs: false,
    },
  ],
};

export default audience;
