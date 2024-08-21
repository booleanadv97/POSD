import { Button, Space, Image } from "antd";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { TbUserShield } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { removeToken } from "../../helpers";
import { AVATAR_API } from "../../constant";


const AppHeader = () => {
  function UserDropdown() {
    return (
      <Dropdown>
        <Dropdown.Toggle className="custom-dropdown-menu" size="sm">
        {user.username}
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item size="sm" href="/profile">View profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item size="sm" onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    navigate("/signin", { replace: true });
  };
  return (
    <Space className="header_space">
      <div className="icon_text">
        <Button className="icon_logo" href="/" type="link"> 
          <TbUserShield size={64}/> 
        </Button>
        <span className="logo_text">POSD</span>
      </div>
      <Space className="auth_buttons">
        {user ? (
          <>
            <Space className="photo_user">
              <Image
                className="social_image"
                preview={false}
                src={
                  user.avatar_url ??
                  `${AVATAR_API}?name=${user.username}&background=1890ff&color=fff`
                }
              />
              <UserDropdown/>
            </Space>
          </>
        ) : (
          <>
            <Button className="auth_button_login" href="/signin" type="link">
              Login
            </Button>
            <Button
              className="auth_button_signUp"
              href="/signup"
              type="primary"
            >
              SignUp
            </Button>
          </>
        )}
      </Space>
    </Space>
  );
};

export default AppHeader;
