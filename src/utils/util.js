import { message } from 'antd';
import { isObject, isArray } from 'lodash-es';

// 是否为开发环境
export const isDev = process.env.NODE_ENV === 'development';

// 后端接口返回数据格式化
export function formatResponse(res = {}) {
  if (res.data && isObject(res.data)) {
    for (const key in res.data) {
      switch (key) {
        case 'error_code':
          res.data.code = res.data.error_code;
          if (res.data.error_code == '000000') {
            res.data.code = 100000;
          }
          delete res.data.error_code;
          break;
        case 'error_msg':
          res.data.msg = res.data.error_msg;
          if (res.data.error_msg == '请求成功') {
            res.data.status = 'success';
          } else {
            res.data.status = 'failed';
          }
          delete res.data.error_msg;
          break;
        default:
          break;
      }
    }
  }
  return res;
}

/**
 * 事件管理
 *
 * ------使用方式------
 * 1、添加事件监听：
 *  eventManager.on('timeChange',function(){
 *      alert('Time is change!');
 *  });
 *
 * 2、触发指定事件监听：
 *  eventManager.emit('timeChange',...args);
 *
 * 3、game over!!!!!
 * @type {{events: {}, on: Function, emit: Function, off: Function}}
 */
export const eventManager = {
  /**
   * 存储事件监听信息
   */
  events: {},
  /**
   * 添加监听
   * @param name
   * @param fn
   */
  on: function (name, fn) {
    this.events[name] = this.events[name] || [];
    this.events[name].push(fn);

    return this;
  },
  /**
   * 触发事件
   * @param name
   * @returns {Event}
   */
  emit: function (name) {
    if (name) {
      const fns = this.events[name] || [];
      const params = [].slice.call(arguments, 1);
      for (let i = 0, l = fns.length; i < l; i++) {
        fns[i].apply(this, params);
      }
    }
    return this;
  },
  /**
   * 移除事件监听
   * @param name
   * @returns {eventManager}
   */
  off: function (name, fn) {
    const events = this.events[name];
    if (name && events) {
      if (fn) {
        for (let i = 0, l = events.length; i < l; i++) {
          if (events[i] == fn) {
            events.splice(i, 1);
            break;
          }
        }
      } else {
        delete this.events[name];
      }
    }
    return this;
  },
};

/** *
 * 将params转为 a=b&c=d 格式
 * @param params
 */
export function parseParamsToUrl(params) {
  let queryParam = null;
  if (params) {
    const keys = Object.keys(params);

    keys.forEach((key) => {
      const _value =
        typeof params[key] === 'object'
          ? JSON.stringify(params[key])
          : params[key];
      queryParam = queryParam
        ? `${queryParam}&${key}=${_value}`
        : `${key}=${_value}`;
    });
  }
  return queryParam;
}

/**
 * 获取地址栏中url后面拼接的参数
 * eg:
 *   浏览器地址栏中的地址：http://1.1.1.1/test.html?owner=2db08226-e2fa-426c-91a1-66e26f62c13f&view=pc
 *   let param=location.search;//?owner=2db08226-e2fa-426c-91a1-66e26f62c13f&view=pc
 *   let ownerId = getUrlParam("owner",param);
 *   let view = getUrlParam("view",param);
 */
export function getUrlParam(name, param) {
  if (!param) {
    return null;
  }
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = param.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 导出动态文件方法
 * @param {*buffer} content 返回的文件内容（二进制流）
 * @param {*string} filename 文件名
 * @param {*string} type 文件类型
 */
export const funDownload = (content, filename, type = 'word') => {
  const docType = {
    excel: 'application/zip', // excel默认都是返回zip格式文件
    word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
  // 创建隐藏的可导出链接
  const eleLink = document.createElement('a');
  eleLink.download = filename;
  eleLink.style.display = 'none';
  // 字符内容转变成blob地址
  const blob = new Blob([content], { type: docType[type] });
  eleLink.href = URL.createObjectURL(blob);
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
};

// 取值共用方法
export const commValue = (value) => {
  let unit = '';
  if (value >= 1000) {
    value /= 1000; // 千
    if (value >= 1000000) {
      value /= 1000000;
      value = value.toFixed(2);
      unit = 'B';
    } else if (value >= 1000) {
      value /= 1000;
      value = value.toFixed(2);
      unit = 'M';
    } else if (value >= 10) {
      value /= 10;
      value = value.toFixed(2);
      unit = 'W';
    } else {
      value = value.toFixed(2);
      unit = 'K';
    }
  } else {
    value = value.toFixed(2);
  }
  return {
    value,
    unit,
  };
};

// 生成唯一id,8位数
export const guid = () => {
  return 'xxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * uuid,32位
 */
export const getuid = () => {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  var uuid = s.join('');
  return uuid;
};

// 获取ie版本
export function IEVersion() {
  // 取得浏览器的userAgent字符串
  const { userAgent } = navigator;
  // 判断是否为Safari浏览器
  const isSafari =
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  // 判断是否为小于IE11的浏览器
  const isLessIE11 =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
  // 判断是否为IE的Edge浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isLessIE11;
  // 判断是否为IE11浏览器
  const isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isLessIE11) {
    const IEReg = new RegExp('MSIE (\\d+\\.\\d+);');
    // 正则表达式匹配浏览器的userAgent字符串中MSIE后的数字部分，，这一步不可省略！！！
    IEReg.test(userAgent);
    // 取正则表达式中第一个小括号里匹配到的值
    const IEVersionNum = parseFloat(RegExp.$1);
    if (IEVersionNum === 7) {
      // IE7
      return 7;
    }
    if (IEVersionNum === 8) {
      // IE8
      return 8;
    }
    if (IEVersionNum === 9) {
      // IE9
      return 9;
    }
    if (IEVersionNum === 10) {
      // IE10
      return 10;
    }
    // IE版本<7
    return 6;
  }
  if (isEdge) {
    // edge
    return 'edge';
  }
  if (isIE11) {
    // IE11
    return 11;
  }
  if (isSafari) {
    return 'safari';
  }
  // 不是ie浏览器
  return -1;
}

export function formatDate(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return fmt;
}

/**
 * 获取字符串中某个字符出现的次数
 * @param scrstr  源字符串
 * @param armstr  特殊字符
 * @returns {number}
 */
export function getStrCount(scrstr, armstr) {
  let count = 0;
  if (scrstr) {
    while (scrstr.indexOf(armstr) !== -1) {
      scrstr = scrstr.replace(armstr, '');
      count++;
    }
    return count;
  }
}

/**
 * 判断当前浏览类型
 */
export function BrowserType() {
  const { userAgent } = navigator; // 取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
  const isIE =
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera; // 判断是否IE浏览器
  const isEdge =
    userAgent.indexOf('Windows NT 6.1; Trident/7.0;') > -1 && !isIE; // 判断是否IE的Edge浏览器
  const isFF = userAgent.indexOf('Firefox') > -1; // 判断是否Firefox浏览器
  const isSafari =
    userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1; // 判断是否Safari浏览器
  const isChrome =
    userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; // 判断Chrome浏览器

  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = parseFloat(RegExp.$1);
    if (fIEVersion == 7) {
      return 'IE7';
    }
    if (fIEVersion == 8) {
      return 'IE8';
    }
    if (fIEVersion == 9) {
      return 'IE9';
    }
    if (fIEVersion == 10) {
      return 'IE10';
    }
    if (fIEVersion == 11) {
      return 'IE11';
    }
    return '0';
    // IE版本过低
  } // isIE end

  if (isFF) {
    return 'FF';
  }
  if (isOpera) {
    return 'Opera';
  }
  if (isSafari) {
    return 'Safari';
  }
  if (isChrome) {
    return 'Chrome';
  }
  if (isEdge) {
    return 'Edge';
  }
}

export function formatTimeToDate(date = 0) {
  let newDate = date / 1000;
  if (newDate < 60) {
    newDate = `${parseInt(newDate)}s`;
  } else if (newDate >= 60 && newDate < 60 * 60) {
    newDate = `${parseInt(newDate / 60)}m${formatTimeToDate(
      (newDate % 60) * 1000
    )}`;
  } else if (newDate >= 60 * 60 && newDate < 60 * 60 * 24) {
    newDate = `${parseInt(newDate / (60 * 60))}h${formatTimeToDate(
      (newDate % (60 * 60)) * 1000
    )}`;
  } else {
    newDate = `${parseInt(newDate / (60 * 60 * 24))}d${formatTimeToDate(
      (newDate % (60 * 60 * 24)) * 1000
    )}`;
  }
  return newDate;
}

/**
 * 数字转汉字
 * @param num
 * @returns {string}
 */
export function numberParseChina(num) {
  const changeNum = [
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
  ];
  const unit = ['', '十', '百', '千', '万'];
  num = parseInt(num);
  const getWan = (temp) => {
    const strArr = temp.toString().split('').reverse();
    let newNum = '';
    for (let i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ''
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
          ? ''
          : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
        newNum;
    }
    return newNum;
  };
  const overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = `0${noWan}`;
  }
  return overWan ? `${getWan(overWan)}万${getWan(noWan)}` : getWan(num);
}

/**
 * 数组去重
 * @param arr
 * @returns {unknown[]}
 */
export function unique(arr) {
  return Array.from(new Set(arr));
}

/**
 * 英文1个字符长度，中文2个字符长度
 * @param str
 * @returns {number}
 */
export function strlen(str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

/**
 * 是否国际化英文
 * @return {string}
 */
export function IntlFormatMessage(id = '') {
  return !!window._intl_ && window._intl_.formatMessage({ id: id });
}

/**
 * 是否国际化英文
 * @return {boolean}
 */
export function IsInternationalization() {
  return localStorage.getItem('language') === 'en';
}

/**
 * 公共导出方法，支持ie10
 * @param data
 * @param name
 */
export function downFileFun(data = '{}', name = '') {
  const blob = new Blob([data], { type: 'application/x-sql;charset=UTF-8' });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, name);
  } else {
    const a = document.createElement('a');
    a.download = name;
    a.style.display = 'none';
    a.href = URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

/**
 * 判断当前是macos/windows/linux
 * @returns
 */
export function processPlatform() {
  if (process?.env?._PLATFORM === 'darwin') {
    //macos
    return 'mac';
  } else if (process?.env?._PLATFORM === 'win32') {
    //windows
    return 'win';
  } else {
    //linux
    return 'lin';
  }
}

// 格式方法
// 公共方法
export function transitionJsonToString(jsonObj, callback) {
  // 转换后的jsonObj受体对象
  let _jsonObj = null;
  // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
  if (Object.prototype.toString.call(jsonObj) !== '[object String]') {
    try {
      _jsonObj = JSON.stringify(jsonObj);
    } catch (error) {
      // 转换失败错误信息
      console.error('您传递的json数据格式有误，请核对...');
      console.error(error);
      callback(error);
    }
  } else {
    try {
      // jsonObj = jsonObj.replace(/(\')/g, '\"');
      _jsonObj = JSON.stringify(JSON.parse(jsonObj));
    } catch (error) {
      // 转换失败错误信息
      console.error('您传递的json数据格式有误，请核对...');
      console.error(error);
      callback(error);
    }
  }
  return _jsonObj;
}

// callback为数据格式化错误的时候处理函数
export function formatJson(jsonObj, callback) {
  // 正则表达式匹配规则变量
  const reg = null;
  // 转换后的字符串变量
  let formatted = '';
  // 换行缩进位数
  let pad = 0;
  // 一个tab对应空格位数
  const PADDING = '    ';
  // json对象转换为字符串变量
  let jsonString = transitionJsonToString(jsonObj, callback);
  if (!jsonString) {
    return jsonString;
  }
  // 存储需要特殊处理的字符串段
  const _index = [];
  // 存储需要特殊处理的“再数组中的开始位置变量索引
  let _indexStart = null;
  // 存储需要特殊处理的“再数组中的结束位置变量索引
  let _indexEnd = null;
  // 将jsonString字符串内容通过\r\n符分割成数组
  let jsonArray = [];
  // 正则匹配到{,}符号则在两边添加回车换行
  jsonString = jsonString.replace(/([\{\}])/g, '\r\n$1\r\n');
  // 正则匹配到[,]符号则在两边添加回车换行
  jsonString = jsonString.replace(/([\[\]])/g, '\r\n$1\r\n');
  // 正则匹配到,符号则在两边添加回车换行
  jsonString = jsonString.replace(/(\,)/g, '$1\r\n');
  // 正则匹配到要超过一行的换行需要改为一行
  jsonString = jsonString.replace(/(\r\n\r\n)/g, '\r\n');
  // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
  jsonString = jsonString.replace(/\r\n\,/g, ',');
  // 特殊处理双引号中的内容
  jsonArray = jsonString.split('\r\n');
  jsonArray.forEach((node, index) => {
    // 获取当前字符串段中"的数量
    const num = node.match(/\"/g) ? node.match(/\"/g).length : 0;
    // 判断num是否为奇数来确定是否需要特殊处理
    if (num % 2 && !_indexStart) {
      _indexStart = index;
    }
    if (num % 2 && _indexStart && _indexStart != index) {
      _indexEnd = index;
    }
    // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
    if (_indexStart && _indexEnd) {
      _index.push({
        start: _indexStart,
        end: _indexEnd,
      });
      _indexStart = null;
      _indexEnd = null;
    }
  });
  // 开始处理双引号中的内容，将多余的"去除
  _index.reverse().forEach((item, index) => {
    const newArray = jsonArray.slice(item.start, item.end + 1);
    jsonArray.splice(item.start, item.end + 1 - item.start, newArray.join(''));
  });
  // 奖处理后的数组通过\r\n连接符重组为字符串
  jsonString = jsonArray.join('\r\n');
  // 将匹配到:后为回车换行加大括号替换为冒号加大括号
  jsonString = jsonString.replace(/\:\r\n\{/g, ':{');
  // 将匹配到:后为回车换行加中括号替换为冒号加中括号
  jsonString = jsonString.replace(/\:\r\n\[/g, ':[');
  // 将上述转换后的字符串再次以\r\n分割成数组
  jsonArray = jsonString.split('\r\n');
  // 将转换完成的字符串根据PADDING值来组合成最终的形态
  jsonArray.forEach((item, index) => {
    let i = 0;
    // 表示缩进的位数，以tab作为计数单位
    let indent = 0;
    // 表示缩进的位数，以空格作为计数单位
    let padding = '';
    if (item.match(/\{$/) || item.match(/\[$/)) {
      // 匹配到以{和[结尾的时候indent加1
      indent += 1;
    } else if (
      item.match(/\}$/) ||
      item.match(/\]$/) ||
      item.match(/\},$/) ||
      item.match(/\],$/)
    ) {
      // 匹配到以}和]结尾的时候indent减1
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }
    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }
    formatted += `${padding + item}\r\n`;
    pad += indent;
  });
  // 返回的数据需要去除两边的空格
  return formatted.trim();
}

export function getFileMimeType(file, num) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      try {
        let buffer = [...Buffer.from(event.target.result)];
        // 仅要文件的前四位就够了
        buffer = buffer.splice(0, 4);
        buffer.forEach((num, i, arr) => {
          arr[i] = num.toString(16).padStart(2, '0');
        });
        // 7b226122 : json的16进制类型
        // 7b5c7274 : jar的16进制类型
        resolve(buffer.join('') === num);
      } catch (e) {
        // 读取文件头出错 默认不是合法文件类型
        reject();
      }
    };
  });
}

export const unitFormatTime = {
  SECOND: 1,
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 24 * 60 * 60,
};

/**
 *  深度比较两个对象是否相同
 * @param {Object} oldData
 * @param {Object} newData
 */
export function equalsObj(oldData, newData) {
  try {
    // 类型为基本类型时,如果相同,则返回true
    if (oldData === newData) return true;
    if (
      isObject(oldData) &&
      isObject(newData) &&
      Object.keys(oldData).length === Object.keys(newData).length
    ) {
      // 类型为对象并且元素个数相同

      // 遍历所有对象中所有属性,判断元素是否相同
      for (const key in oldData) {
        if (oldData?.hasOwnProperty(key)) {
          if (!equalsObj(oldData[key], newData[key]))
            // 对象中具有不相同属性 返回false
            return false;
        }
      }
    } else if (isArray(oldData) && oldData.length === newData.length) {
      // 类型为数组并且数组长度相同

      for (let i = 0, { length } = oldData; i < length; i++) {
        if (!equalsObj(oldData[i], newData[i]))
          // 如果数组元素中具有不相同元素,返回false
          return false;
      }
    } else {
      // 其它类型,均返回false
      return false;
    }

    // 走到这里,说明数组或者对象中所有元素都相同,返回true
    return true;
  } catch (err) {
    return false;
  }
}
/**
 * 复制到剪切板
 * @param {any} str
 */
export function copyUrlToClipBoard(str) {
  var input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', str);
  input.select();
  document.execCommand('copy'); // 执行浏览器复制命令
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    console.log('复制成功');
    message.success('已复制到剪切板');
  }
  document.body.removeChild(input);
}
/**
 * 延迟
 * @param {*} time
 */
export const delay = async (time = 300) => {
  await new Promise((resolve) => setTimeout(resolve, time));
};

/**
 * 深比较两个对象，并返回不同项
 * @param {*} object
 * @param {*} other
 * @returns
 */
export function funDifference(object, other) {
  let diff = {};
  let vChildren;
  for (var key in object) {
    if (
      typeof object[key] === 'object' &&
      typeof other[key] === 'object' &&
      object[key] &&
      other[key]
    ) {
      vChildren = funDifference(object[key], other[key]);
      if (Object.keys(vChildren).length > 0) {
        diff[key] = vChildren;
      }
    } else if (object[key] !== other[key]) {
      diff[key] = object[key];
    }
  }
  return diff;
}

/**
 * 节流
 * @param {*} fn
 * @param {*} wait
 * @returns
 */
export const debounce = (fn, wait) => {
  let timer,
    startTimeStamp = 0;
  let now = new Date().getTime();
  let interval = now - startTimeStamp;

  if (interval < wait) {
    console.log('ignore');
  } else {
    setTimeout(() => {
      fn();
      clearTimeout(timer);
      timer = null;
      startTimeStamp = now;
      // run(wait);
    }, wait);
  }
};
