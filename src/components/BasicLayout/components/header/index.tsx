import React, { Fragment, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Layout, Menu, Tooltip, Dropdown, Button, Modal, Form, message, Input } from 'antd';
import { LaptopOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import icon from '../../assets/app.png'
import styles from './index.less';

const { Header, } = Layout;
const { Divider } = Menu;

const CHeader = (props: any) => {
  const [form] = Form.useForm();
  const { validateFields, } = form;
  const [settingVisible, setSettingVisible] = useState(false);

  return (
    <Fragment>
      <Header className={`${styles.basicLayoutHeader} flex-box`}>
        <div className="left-menu flex-box">
          <img src={icon} alt="icon" className="header-icon" />
          <span className="header-title" onClick={() => setSettingVisible(true)}>2D数据标注平台</span>
        </div>
        {/* <Dropdown overlay={settingList}>
          <Button icon={<SettingOutlined />} />
        </Dropdown> */}
      </Header>

      {settingVisible ? (
        <Modal
          visible={settingVisible}
          title="修改服务端端口地址"
          onOk={() => {
            validateFields()
              .then((values) => {
                const { ipUrl } = values;
                localStorage.setItem('ipUrl', ipUrl);
                window.location.reload();
              })
              .catch((err) => {
                const { errorFields = [] } = err;
                errorFields[0] && message.error(`${errorFields[0].errors[0]} 是必填项`);
              });
          }}
          onCancel={() => {
            setSettingVisible(false);
          }}
          okText="确认"
          getContainer={false}
        >
          <div className="canvas-toolbar-setting-modal-body">
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              // layout={'vertical'}
              scrollToFirstError
            >
              <Form.Item
                name="ipUrl"
                label="服务端地址"
                initialValue={localStorage.getItem('ipUrl') || undefined}
                rules={[{ required: true, message: '服务端地址' }]}
              >
                <Input placeholder="localhost:8866" />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      ) : null}
    </Fragment>
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
