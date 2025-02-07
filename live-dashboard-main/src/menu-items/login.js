// assets
import { IconLogin2 } from '@tabler/icons-react';

// constant
const icons = {
  IconLogin2
};

// ==============================|| EXTRA login MENU ITEMS ||============================== //

const login = {
  id: "login",
  title: "Login",
  // caption: "login Caption",
  type: "group",
  children: [
    {
      id: "login",
      title: "Login",
      type: "collapse",
      icon: icons.IconLogin2,

      children: [
        {
          id: "login3",
          title: "Login",
          type: "item",
          url: "/login",
          target: true,
        },
        // {
        //   id: "register3",
        //   title: "Register",
        //   type: "item",
        //   url: "/register",
        //   target: true,
        // },
      ],
    },
  ],
};

export default login;
