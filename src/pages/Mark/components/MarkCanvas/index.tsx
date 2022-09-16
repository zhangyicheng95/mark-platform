import React, { useEffect, useRef, useState } from "react";
import { Button, message, Spin } from 'antd';
import styles from "./index.less";
import markIcon from '../../../../assets/marker.png';

const AILabel = require('ailabel');
const CONTAINER_ID = 'mark-canvas';
let timer: string | number | NodeJS.Timeout | null | undefined = null;
let gMap: any | null = null;
let gFirstFeatureLayer: any | null = null;
let gFirstMaskLayer: any | null = null;
let gFirstImageLayer: any | null = null;
let drawingStyle: any = {}; // 绘制过程中样式

const MarkCanvas: React.FC = (props: any) => {
  const markRef = useRef<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      const dom = document.getElementById(CONTAINER_ID);
      const img = new Image();
      img.src = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphoto.orsoon.com%2F180824%2FEPS-180824_223%2F219qYP0XCj_small.jpg&refer=http%3A%2F%2Fphoto.orsoon.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665744790&t=17e932b12a8992341d78bc1f40f96d0b';
      img.width = 800;
      // img.height = 800;
      // 声明容器
      gMap = new AILabel.Map(CONTAINER_ID, {
        size: { width: dom?.clientWidth, height: dom?.clientHeight },
        center: { x: 400, y: 200 },
        zoom: 800,
        mode: 'PAN', // 绘制线段
        refreshDelayWhenZooming: true, // 缩放时是否允许刷新延时，性能更优
        zoomWhenDrawing: true,
        panWhenDrawing: true,
        zoomWheelRatio: 5, // 控制滑轮缩放缩率[0, 10), 值越小，则缩放越快，反之越慢
        withHotKeys: true // 关闭快捷键
      });
      gMap.events.on('drawDone', (type: any, data: any) => {
        console.log('--type, data--', type, data);
        if (type === 'MARKER') {
          const marker = new AILabel.Marker(
            `${+new Date()}`, // id
            {
              src: markIcon,
              position: data,
              offset: {
                x: -16,
                y: 32
              }
            }, // markerInfo
            { name: '第一个marker注记' } // props
          );
          marker.events.on('click', (marker: any) => {
            console.log('marker click');
            gMap.markerLayer.removeMarkerById(marker.id);
          });
          gMap.markerLayer.addMarker(marker);
        } else if (type === 'POINT') {
          const pointFeature = new AILabel.Feature.Point(
            `${+new Date()}`, // id
            { ...data, sr: 3 }, // shape
            { name: '第一个矢量图层' }, // props
            drawingStyle // style
          );
          gFirstFeatureLayer.addFeature(pointFeature);
        } else if (type === 'CIRCLE') {
          // data 代表r半径shape；data1代表sr半径shape
          const circleFeature = new AILabel.Feature.Circle(
            `${+new Date()}`, // id
            data, // data1代表屏幕坐标 shape
            { name: '第一个矢量图层' }, // props
            { fillStyle: '#F4A460', strokeStyle: '#D2691E', lineWidth: 2 } // style
          );
          gFirstFeatureLayer.addFeature(circleFeature);
        } else if (type === 'LINE') {
          const scale = gMap.getScale();
          const width = drawingStyle.lineWidth / scale;
          const lineFeature = new AILabel.Feature.Line(
            `${+new Date()}`, // id
            { ...data, width }, // shape
            { name: '第一个矢量图层' }, // props
            drawingStyle // style
          );
          gFirstFeatureLayer.addFeature(lineFeature);
        } else if (type === 'POLYLINE') {
          const scale = gMap.getScale();
          const width = drawingStyle.lineWidth / scale;
          const polylineFeature = new AILabel.Feature.Polyline(
            `${+new Date()}`, // id
            { points: data, width }, // shape
            { name: '第一个矢量图层' }, // props
            drawingStyle // style
          );
          gFirstFeatureLayer.addFeature(polylineFeature);
        } else if (type === 'RECT') {
          const rectFeature = new AILabel.Feature.Rect(
            `${+new Date()}`, // id
            data, // shape
            { name: '矢量图形' }, // props
            drawingStyle // style
          );
          gFirstFeatureLayer.addFeature(rectFeature);
        } else if (type === 'POLYGON') {
          const polygonFeature = new AILabel.Feature.Polygon(
            `${+new Date()}`, // id
            { points: data }, // shape
            { name: '矢量图形' }, // props
            drawingStyle // style
          );
          gFirstFeatureLayer.addFeature(polygonFeature);
        } else if (type === 'DRAWMASK') {
          const scale = gMap.getScale();
          const width = drawingStyle.lineWidth / scale;
          const drawMaskAction = new AILabel.Mask.Draw(
            `${+new Date()}`, // id
            '铅笔',
            { points: data, width }, // shape
            { name: '港币', price: '1元' }, // props
            drawingStyle // style
          );
          gFirstMaskLayer.addAction(drawMaskAction);
        } else if (type === 'CLEARMASK') {
          const scale = gMap.getScale();
          const width = drawingStyle.lineWidth / scale;
          const clearMaskAction = new AILabel.Mask.Clear(
            `${+new Date()}`, // id
            { points: data, width } // shape
          );
          gFirstMaskLayer.addAction(clearMaskAction);
        }
      });
      // 显示一张图片
      gFirstImageLayer = new AILabel.Layer.Image(
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
      // 图片层相关事件监听
      gFirstImageLayer.events.on('loadStart', (a: any, b: any) => {
        console.log('--loadStart--', a, b);
        setLoading(true);
      });
      gFirstImageLayer.events.on('loadEnd', (a: any, b: any) => {
        console.log('--loadEnd--', a, b);
        setLoading(false);
      });
      gFirstImageLayer.events.on('loadError', (a: any, b: any) => {
        console.log('--loadError--', a, b);
        message.error('图片加载失败');
        setLoading(false);
      });
      // 添加到gMap对象
      gMap.addLayer(gFirstImageLayer);

      gFirstFeatureLayer = new AILabel.Layer.Feature(
        'first-layer-feature', // id
        { name: '第一个矢量图层' }, // props
        { zIndex: 10 } // style
      );
      gMap.addLayer(gFirstFeatureLayer);
      gFirstMaskLayer = new AILabel.Layer.Mask(
        'first-layer-mask', // id
        { name: '第一个涂抹图层' }, // props
        { zIndex: 11, opacity: .5 } // style
      );
      gMap.addLayer(gFirstMaskLayer);

      window.addEventListener('resize', () => gMap && gMap.resize());
    }, 300);
    return () => {
      destroy();
    }
  }, []);

  function zoomIn() {
    gMap.zoomIn();
  }
  function zoomOut() {
    gMap.zoomOut();
  }
  function getRle() {
    const rleData = gFirstMaskLayer.getRleData({ x: 0, y: 0, width: 500, height: 354 });
    console.log('--rleData--', rleData);
  }
  function setMode(mode: any) {
    gMap.setMode(mode);
    // 后续对应模式处理
    switch (gMap.mode) {
      case 'PAN': {
        break;
      }
      case 'MARKER': {
        // 忽略
        break;
      }
      case 'POINT': {
        drawingStyle = { fillStyle: '#9370DB' };
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      case 'CIRCLE': {
        drawingStyle = { fillStyle: '#9370DB', strokeStyle: '#0000FF', lineWidth: 2 };
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      case 'LINE': {
        drawingStyle = { strokeStyle: '#FF00FF', lineJoin: 'round', lineCap: 'round', lineWidth: 10, arrow: false };
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      case 'POLYLINE': {
        drawingStyle = { strokeStyle: '#FF1493', lineJoin: 'round', lineCap: 'round', lineWidth: 10 }
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      case 'RECT': {
        drawingStyle = { strokeStyle: '#0f0', lineWidth: 1 }
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      case 'POLYGON': {
        drawingStyle = { strokeStyle: '#00f', fillStyle: '#0f0', globalAlpha: .3, lineWidth: 1, fill: true, stroke: true }
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      case 'DRAWMASK': {
        drawingStyle = { strokeStyle: 'rgba(255, 0, 0, .5)', fillStyle: '#00f', lineWidth: 50 }
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      case 'CLEARMASK': {
        drawingStyle = { fillStyle: '#00f', lineWidth: 30 }
        gMap.setDrawingStyle(drawingStyle);
        break;
      }
      default:
        break;
    }
  }

  // 导出图片上护具
  async function exportImage(type: any) {
    console.log(gMap)
    const imagedata = await gMap.exportLayersToImage(
      { x: 0, y: 0, width: 500, height: 354 },
      { type, format: 'image/png' }
    );
    console.log(imagedata)
    const imageDom = new Image();
    if (type === 'base64') {
      // 导出base64格式
      imageDom.src = imagedata;
    }
    else {
      // 导出blob格式
      const url = URL.createObjectURL(imagedata);
      imageDom.src = url;
      imageDom.onload = () => { URL.revokeObjectURL(url); }
    }

    let aLink = document.createElement('a');
    aLink.style.display = 'none';
    aLink.href = imageDom.src;
    aLink.download = 'export.png';
    // 触发点击-然后移除
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  }

  // 获取所有features
  function getFeatures() {
    const allFeatures = gFirstFeatureLayer.getAllFeatures();
    console.log('--allFeatures--', allFeatures);
  }

  // 实例销毁
  function destroy() {
    gMap && gMap.destroy();
    window.removeEventListener('resize', () => gMap && gMap.resize());
  }
  const btnList = [
    {
      title: '平移',
      event: () => { setMode('PAN'); },
    },
    {
      title: '标注',
      event: () => { setMode('MARKER'); },
    },
    {
      title: '点',
      event: () => { setMode('POINT'); },
    },
    {
      title: '线段',
      event: () => { setMode('LINE'); },
    },
    {
      title: '多线段',
      event: () => { setMode('POLYLINE'); },
    },
    {
      title: '圆',
      event: () => { setMode('CIRCLE'); },
    },
    {
      title: '矩形',
      event: () => { setMode('RECT'); },
    },
    {
      title: '多边形',
      event: () => { setMode('POLYGON'); },
    },
    {
      title: '获取标注数据',
      event: () => { getFeatures(); },
    },
    {
      title: '导出base64图片',
      event: () => { exportImage('base64'); },
    },
    {
      title: '导出blob图片',
      event: () => { exportImage('blob'); },
    },
    {
      title: '涂抹',
      event: () => { setMode('DRAWMASK'); },
    },
    {
      title: '擦除',
      event: () => { setMode('CLEARMASK'); },
    },
    {
      title: '获取rle数据',
      event: () => { getRle(); },
    }
  ];

  return <div className={styles.markCanvas} ref={markRef}>
    <Spin spinning={loading} tip="Loading...">
      <div className="btn-box flex-box">
        {btnList.map((item: any, index: number) => {
          const { title, event } = item;
          return <Button key={index} onClick={() => event && event(gMap)} style={{ marginRight: 10 }}>
            {title}
          </Button>
        })}
      </div>
      <div className="canvas-box" id={CONTAINER_ID} />
    </Spin>
  </div>;
};

export default MarkCanvas;
