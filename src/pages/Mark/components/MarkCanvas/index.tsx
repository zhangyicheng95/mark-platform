import React, { useEffect, useRef } from "react";
import { Button } from 'antd';
import styles from "./index.less";

const AILabel = require('ailabel');
const CONTAINER_ID = 'mark-canvas';
const MarkCanvas: React.FC = (props: any) => {
  useEffect(() => {
    const dom = document.getElementById(CONTAINER_ID);
    const img = new Image();
    img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphoto.orsoon.com%2F180824%2FEPS-180824_223%2F219qYP0XCj_small.jpg&refer=http%3A%2F%2Fphoto.orsoon.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665744790&t=17e932b12a8992341d78bc1f40f96d0b';
    // img.width = 600;
    // img.height = 400;
    console.log(img, dom);
    // 声明容器
    const gMap = new AILabel.Map(CONTAINER_ID, {
      center: { x: 300, y: 100 },
      zoom: 800,
      mode: 'PAN' // 绘制线段
    });
    // 显示一张图片
    const gFirstImageLayer = new AILabel.Layer.Image(
      'first-layer-image', // id
      {
        src: img.src,
        width: img.width,
        height: img.height,
        position: { // 图片左上角坐标
          x: 0,
          y: 0
        }
      }, // imageInfo
      { name: '第一个图片图层' }, // props
      { zIndex: 5 } // style
    );
    gMap.addLayer(gFirstImageLayer);
  }, []);

  return <div className={styles.markCanvas} id={CONTAINER_ID} >

  </div>;
};

export default MarkCanvas;
