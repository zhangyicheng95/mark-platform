import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Layout, Menu, Tooltip, Dropdown, Button } from 'antd';
import { LaptopOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import styles from './index.less';

const { Header, Content, Sider } = Layout;
const { SubMenu, ItemGroup, Divider } = Menu;

const CHeader = (props: any) => {
  return (
    <Header className={`${styles.basicLayoutHeader} flex-box`}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="left-menu">
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      <Dropdown overlay={settingList}>
        <Button icon={<SettingOutlined />} />
      </Dropdown>
    </Header>
  );
};

export default CHeader;

const settingList = (
  <Menu onClick={(val) => {

  }}>
    <Menu.Item key="info">个人中心</Menu.Item>
    <Divider />
    <Menu.Item key="logout">退出登录</Menu.Item>
  </Menu>
);
