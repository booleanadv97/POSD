import { Dropdown, Space, Image } from "antd";
import React from "react";
import { TbUserShield } from "react-icons/tb";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import { AVATAR_API } from "../../constant";

const AppHeader = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    navigate("/signin", { replace: true });
  };

  // Define the menu items using the `items` prop
  const menuItems = [
    {
      key: 'profile',
      label: <Link style={{ textDecoration: "none" }} to="/profile">View profile</Link>,
    },
    {
      type: 'divider',  // Add a divider between items
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: handleLogout,  // Attach the logout handler directly
    },
  ];

  // Use the `menu` prop in the Dropdown component
  return (
    <Space className="header_space">
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="icon-with-text">
          <TbUserShield size={64} className="icon" />
          <span className="icon-text">POSD</span>
        </div>
      </Link>
      <Space className="auth_buttons">
        {user ? (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <Image  
                className="social_image"
                preview={false}
                src={
                  user.avatar_url ??
                  `${AVATAR_API}?name=${user.username}&background=1890ff&color=fff`
                }
              />
          </Dropdown>
        ) : (
          <></>
        )}
      </Space>
    </Space>
  );
};

export default AppHeader;
