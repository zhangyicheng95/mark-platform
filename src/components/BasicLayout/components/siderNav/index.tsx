import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Layout, Menu, Tooltip, Dropdown, Popover } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  VideoCameraOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { menuConfig } from "./config/siderNav";
import icon from "../../assets/icon.png";
import styles from "./index.less";

const { Sider } = Layout;
const iconList: any = {
  home: <HomeOutlined />,
  collect: <VideoCameraOutlined />,
  resource: <GoldOutlined />,
};

// interface Props {

// }

const SiderNav = (props: any) => {
  const navigate = useNavigate();
  const { pathname = "/home" } = useLocation();

  const selectedKeys = useMemo(() => {
    return `/${pathname.split("/")[1]}`;
  }, [pathname]);

  return (
    <Sider className={styles.basicLayoutSider}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKeys !== "/" ? selectedKeys : "/home"]}
        onClick={({ key }) => {
          navigate(key);
        }}
      >
        {menuConfig.map((menu) => {
          const { name, path, id, icon = "", check } = menu;
          return (
            <Menu.Item key={path}>
              <Popover placement="right" content={name} className="flex-box">
                {iconList[icon]}
                <span style={{ marginLeft: 10, }}>{name}</span>
              </Popover>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default SiderNav;
