import { Dropdown, Image } from "antd";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { removeToken } from "../../helpers";
import { AVATAR_API } from "../../constant";
import { useNavigate, Link } from "react-router-dom";

const UserMenu = () => {
    const { user, setUser} = useAuthContext();
    const [ profileItems, setProfileItems ] = useState();
    const navigate = useNavigate();
    const handleLogout = () => {
        removeToken();
        setUser(undefined);
        navigate("/signin", { replace: true });
    };

    useEffect(() => {
        const staticMenuItems = [
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
            onClick: handleLogout,  
          },
        ];
        setProfileItems(staticMenuItems);
    }, []);

    return (
        <Dropdown
            menu={{
            items: profileItems,
            }}
            trigger={['click']}
        >
            <a onClick={(e) => e.preventDefault()}>
            <Image  
                className="social_image"
                preview={false}
                src={
                    user.avatar_url ??
                    `${AVATAR_API}?name=${user.username}&background=1890ff&color=fff`
                }
                />
            </a>
        </Dropdown>
    )
};

export default UserMenu;
