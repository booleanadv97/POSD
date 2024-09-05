import { Spin, Dropdown, Button } from "antd";
import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { IoMdNotifications, IoIosNotificationsOutline } from "react-icons/io";
import { CheckCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useEffect } from "react";
import { getToken } from "../../helpers";
import { API} from "../../constant";
import { message } from "antd";

const Notifications = () => {
  const { notifications, setNotifications } = useAuthContext();
  const [ hasUnread, setHasUnread] = useState();
  const [ notificationsItems, setNotificationsItems ] = useState();
  const [ isLoading, setLoading] = useState(false);

  const onNotificationClick = async (data) => {
    if(!data.read){
      setLoading(true);
      try {
        const response = await fetch(`${API}/notifications/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            data: {
              read: true,
            }
          }),
        }); 
      } catch (error) {
        console.error(Error);
        message.error("Error While Updating Notification!");
      } finally {
        message.success("The notification has been marked as read.");
        setLoading(false);
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === data.id
              ? { ...notification, read: true }   
              : notification   
          )
        );
      }
    }
  };

  useEffect(() => {
    const notificationsItems = [
      {
        key: 'header',
        label: 'Notifications',
        disabled: true,  
        className: 'menu-header', 
      },
      ...notifications.map(notification => ({
        key: `notification-${notification.id}`,
        label: (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{notification.message}</span>
            {notification.read ? <CheckCircleFilled /> : <CheckCircleOutlined />}
          </div>
        ),
        onClick: () => onNotificationClick(notification),
      })),
      ...notifications.length > 0 ? [{ key: 'divider', type: 'divider' }] : [],  
    ];
    const hasUnread = Array.from(notifications.values()).some(item => item.read === false);
    setHasUnread(hasUnread);

    setNotificationsItems(notificationsItems);
  }, [notifications]);

  
  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Dropdown
        menu={{
        items: notificationsItems,
        style: { width: '300px' },
        }}
        trigger={['click']}
    >
        <Button ghost style={{ border: "none" }} onClick={(e) => e.preventDefault()}>
        { hasUnread ? ( <IoMdNotifications onClick={(e) => e.preventDefault()} size="28"/>) : ( <IoIosNotificationsOutline size="28"/>) }
        </Button>
    </Dropdown>
  )};

export default Notifications;
