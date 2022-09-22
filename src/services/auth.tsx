import { isDev } from '../utils/util';

// 访问gateway获取权限
export const getAuthApi = () => {
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
    resolve({
      code: 200,
      data: {
        userName: '张意诚',
        passWord: '123456'
      }
    });
    // }, 2000);
  });
  let url = '';
  if (isDev) { // 如果是开发环境，不走网关和douc，走mock接口
      url = '/get/auth';
  } else {
      // 解决ie兼容性问题
      const apiDomain = `${window.location.protocol  }//${  window.location.hostname  }${window.location.port ? `:${  window.location.port}` : ''}`;
      url = `${apiDomain}/gateway/api/v1/auth?module=datalake-compute`;
  }
  // return fetchGet(url);

};
