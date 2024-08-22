import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const menuItems = [
    ...(user ?  [{ label: 'Home', path: '/' }] : []),
    ...(user ?  [{ label: 'Patterns', path: '/patterns' }] : []),
    ...(!user ?  [{ label: 'Login', path: '/signin' }] : []),
    ...(!user ?  [{ label: 'Register', path: '/signup' }] : []),
    ...(user?.role.name === 'Admin' ? [{ label: 'Admin', path: '/admin' }] : []),
  ];

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[location.pathname]}
      style={{ height: '100%', background: "#03346E", borderRight: 0 }}
    >
      {menuItems.map(item => (
        <Menu.Item key={item.path} icon={<i className="anticon anticon-home" />}>
          <Link style={{ color:'white', textDecoration:'none' }}to={item.path} onClick={item.onClick}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Sidebar;