import { GoldOutlined, HomeOutlined, VideoCameraOutlined } from "@ant-design/icons";
import React from "react";

export const menuConfig = [
  {
    title: '数据标注',
    label: "标注",
    icon: <HomeOutlined />,
    path: `/mark`,
    key: `/mark`,
  },
  {
    title: '训练器',
    label: "训练器",
    icon: <VideoCameraOutlined />,
    path: `/trainer`,
    key: `/trainer`,
  },
];
