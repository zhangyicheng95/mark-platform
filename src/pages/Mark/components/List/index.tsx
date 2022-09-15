import React, { useEffect, useRef } from "react";
import { Button, Table } from 'antd';
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
import TooltipDiv from "../../../../components/TooltipDiv";
import BasicTable from "../../../../components/BasicTable";
import moment from "moment";
import { getuid } from "process";
import { guid } from "../../../../utils/util";

const MarkList: React.FC = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(1);
  }, []);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '100%',
      render: (text: any) => {
        return <TooltipDiv title={text} onClick={() => navigate('edit')}>{text}</TooltipDiv>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '102px',
      render: (text: any, record: any) => {
        return (
          <div>
            <a
              onClick={() => {
                navigate('edit');
              }}
            >
              编辑
            </a>
            <span className="operation-line">|</span>
            <a
              onClick={() => {
                navigate('edit');
              }}
            >
              删除
            </a>
          </div>
        );
      },
    },
  ];

  return <div className={styles.markList} >
    <BasicTable
      columns={columns}
      // pagination={null}
      dataSource={[{ name: 'first' }, { name: '第二个' }]}
      rowKey={(record: { id: any }) => {
        return record.id || guid();
      }}
    />
  </div>;
};

export default MarkList;
