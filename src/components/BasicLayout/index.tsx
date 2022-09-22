import React, { useEffect, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';
import SiderNav from './components/siderNav';
import CHeader from './components/header';
import styles from './index.less';


const { Content, } = Layout;

interface Props {

}

const BasicLayout: React.FC<Props> = (props: any) => {
  const {
    children,
  } = props;
  const navigate = useNavigate();
  const { pathname = '/' } = useLocation();
  useEffect(() => {
    console.log(pathname)
    if (pathname === '/') {
      navigate('/mark');
    };
  }, [pathname]);

  return (
    <Layout className={styles.layoutWrapper}>
      <CHeader />
      <Layout>
        {
          pathname.indexOf('/mark/edit') > -1 ?
            null :
            <SiderNav />
        }
        <Layout className="basic-layout">
          <Content className="basic-layout-content" style={pathname.indexOf('/mark/edit') > -1 ? { padding: 8 } : {}}>
            <Breadcrumb className='basic-layout-breadcrumb'>
              {
                (pathname.split('/') || []).map((path, index) => {
                  if (!path) return null;
                  return <Breadcrumb.Item key={path}>
                    <a onClick={() => {
                      if (index === pathname.split('/').length - 1) return;
                      navigate(path)
                    }}>{path}</a>
                  </Breadcrumb.Item>
                })
              }
            </Breadcrumb>
            <div className="basic-layout-body">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
