import { Dropdown, Menu, Space, Image } from "antd";
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

  const menu = (
    <Menu>
      <Menu.Item>
      <Link style={{textDecoration:"none"}} to="/profile">View profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Space className="header_space">
      <Link style={{textDecoration: "none"}} to="/">
        <div className="icon-with-text">
          <TbUserShield size={64} className="icon" />
          <span className="icon-text">POSD</span>
        </div>
      </Link>
      <Space className="auth_buttons">
        {user ? (
          <>
            <Space className="photo_user">
              <Dropdown overlay={menu} trigger={['click']}>
              <Image
                className="social_image"
                preview={false}
                src={
                  user.avatar_url ??
                  `${AVATAR_API}?name=${user.username}&background=1890ff&color=fff`
                }
              />
            </Dropdown>
            </Space>
          </>
        ) : (
          <>
           
          </>
        )}
      </Space>
    </Space>
  );
};

export default AppHeader;
