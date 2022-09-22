import { fetchGet, fetchPost, fetchDelete } from '../utils/fetch';
import { guid } from '../utils/util';

const V1 = '';
// 获取首页项目列表
export const getdataList = () => {
  return new Promise((resolve, reject) => {
    resolve({
      code: 100000,
      status: 'success',
      data: [
        {
          name: `项目名称 1`,
          id: guid(),
          desc: '123',
        },
        {
          name: `项目名称 2`,
          id: guid(),
          desc: '123',
        },
        {
          name: `项目名称 3`,
          id: guid(),
          desc: '123',
        },
      ],
    });
  });
};

// 获取任务状态
export const getFlowStatusService = (id: string) => {
  return fetchGet(`${V1}/task/${id}`);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({
  //       '89a9108e-de5f-46a5-bba0-766eaa4af91e': {
  //         Status: 'running',
  //         module_path: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fspider2021625%2F87%2Fw1080h607%2F20210625%2Ff56b-krwipar5348553.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659524772&t=bdb49c369cbd570e9d2e51f66a700d4c',
  //       },
  //       '1dab0c12-0d61-4ba5-9348-632fff07395c': {
  //         Status: 'running',
  //       },
  //     });
  //   }, 2000)
  // });
};

// 业务启动
export const startFlowService = (params: any) => {
  return fetchPost(`${V1}/task/${params.id}`, { body: params });
};

// 业务停止
export const stopFlowService = (id: string) => {
  return fetchDelete(`${V1}/task/${id}`);
};

//手动出发ws推送
export const triggerSocketService = (id: string) => {
  return fetchGet(`${V1}/test_trigger/${id}`);
};
