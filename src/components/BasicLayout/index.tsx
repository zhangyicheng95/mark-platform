import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from 'antd';

import SiderNav from './components/siderNav';
import CHeader from './components/header';
import icon from './assets/icon.png';

import styles from './index.less';
import { useLocation, useNavigate } from 'react-router-dom';


const { Header, Content, Sider } = Layout;

// interface Props {
//   route?: any;
// }

const BasicLayout = (props: any) => {
  const {
    children, route
  } = props;
  const navigate = useNavigate();
  const { pathname = '/' } = useLocation();
  useEffect(() => {
    if (pathname === '/') {
      navigate('/mark');
    };
  }, []);

  return (
    <Layout className={styles.layoutWrapper}>
      <CHeader />
      <Layout>
        <SiderNav />
        <Layout className="basic-layout">
          <Content className="basic-layout-content">
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
