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
          navigate(key, { replace: true });
        }}
        items={menuConfig}
      />
    </Sider>
  );
};

export default SiderNav;
