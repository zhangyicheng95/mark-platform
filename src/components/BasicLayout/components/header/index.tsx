import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Layout, Menu, Tooltip, Dropdown, Button } from 'antd';
import { LaptopOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import icon from '../../assets/app.png'

import styles from './index.less';

const { Header, Content, Sider } = Layout;
const { SubMenu, ItemGroup, Divider } = Menu;

const CHeader = (props: any) => {
  return (
    <Header className={`${styles.basicLayoutHeader} flex-box`}>
      <div className="left-menu flex-box">
        <img src={icon} alt="icon" className="header-icon" />
        <span className="header-title">2D数据标注平台</span>
      </div>
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
