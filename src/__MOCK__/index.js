// 输出所有的mock类
const mock = [
  {
    request: {
      url: '/api/home/list',
      method: 'get'
    },
    response: {
      status: 'success',
      data: [
        {
          author: 'sany',
          bugs: 'https://gitlab.com/QIVG/MultiTestPlugin/issues',
          category: '图像录入 TestCategory',
          repository: 'https://gitlab.com/QIVG/MultiTestPlugin',
          config: {
            class: 'MultiTestPlugin',
            module: 'main.py'
          }
        }
      ]
    }
  }
];
export default mock;

