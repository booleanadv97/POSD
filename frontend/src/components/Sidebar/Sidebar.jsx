import React, { useContext } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const menuItems = [
    ...(user ?  [{ label: 'Home', path: '/' }] : []),
    ...(user ?  [{ label: 'Patterns', path: '/patterns' }] : []),
    ...(user ?  [{ label: 'Contexts', path: '/patterns/contexts' }] : []),
    ...(user ?  [{ label: 'CWEs', path: '/cwes' }] : []),
    ...(user ?  [{ label: 'GDPR Articles', path: '/gdprarticles' }] : []),
    ...(!user ?  [{ label: 'Login', path: '/signin' }] : []),
    ...(!user ?  [{ label: 'Register', path: '/signup' }] : []),
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