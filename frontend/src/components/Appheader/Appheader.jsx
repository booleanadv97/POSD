import { Space} from "antd";
import React from "react";
import { TbUserShield } from "react-icons/tb";
import { Link } from "react-router-dom";
import Notifications  from "./Notifications";
import UserMenu from "./UserMenu";
import { useAuthContext } from "../../context/AuthContext";
const AppHeader = () => {
  const { user } = useAuthContext();
  return (
    <Space className="header_space">
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="icon-with-text">
          <TbUserShield size={64} />
          <span className="icon-text">POSD</span>
        </div>
      </Link>
      <Space className="auth_buttons">
        {user ? (
          <Space>
            <Notifications/>
            <UserMenu/>
          </Space>
        ) : (
          <></>
        )}
      </Space>
    </Space>
  );
};

export default AppHeader;
