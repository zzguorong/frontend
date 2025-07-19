<template>
  <div class="canvas-container" @contextmenu.prevent>
    <div class="toolbar">
      <button @click="setMode('select')" :class="{ active: mode === 'select' }" :disabled="!isCanvasReady">选择</button>
      <button @click="setMode('lasso')" :class="{ active: mode === 'lasso' }" :disabled="!isCanvasReady">套索选择</button>
      <button @click="setMode('smart')" :class="{ active: mode === 'smart' }" :disabled="!isCanvasReady">智能选择</button>
      <button @click="setMode('brush')" :class="{ active: mode === 'brush' }" :disabled="!isCanvasReady">涂抹</button>
      <button @click="setMode('erase')" :class="{ active: mode === 'erase' }" :disabled="!isCanvasReady">擦除</button>
      <button @click="addRandomShape" :disabled="!isCanvasReady">添加形状</button>
      <button @click="clearCanvas" :disabled="!isCanvasReady">清空画布</button>
      <div class="color-picker">
        <label>颜色:</label>
        <input type="color" v-model="brushColor" @change="updateBrush" :disabled="!isCanvasReady">
      </div>
      <div class="brush-size">
        <label>笔刷大小:</label>
        <input type="range" v-model="brushWidth" min="1" max="50" @input="updateBrush" :disabled="!isCanvasReady">
      </div>
    </div>
    <canvas ref="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'FabricCanvas',
  props: {
    backgroundImage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      canvas: null,
      mode: 'select',
      isDrawing: false,
      lassoPath: null,
      brushColor: '#000000',
      brushWidth: 5,
      objectsBeforeErase: [],
      eraserBrush: null,
      isCanvasReady: false,
      lassoPoints: [],
      tempLine: null,
      eraserPath: null,
      currentPath: null,
      lastEraserPoint: null,
      drawingCanvas: null,
      drawingContext: null,
    };
  },
  watch: {
    backgroundImage: {
      handler(newVal) {
        if (this.isCanvasReady && newVal) {
          this.addBackgroundImage();
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 等待 fabric.js 加载完成
    this.waitForFabric();
  },
  methods: {
    waitForFabric() {
      if (window.fabric) {
        this.initCanvas();
      } else {
        setTimeout(() => this.waitForFabric(), 100);
      }
    },
    async initCanvas() {
      try {
        await this.$nextTick();
        
        const canvasElement = this.$refs.canvas;
        if (!canvasElement) {
          throw new Error('Canvas element not found');
        }

        this.canvas = new window.fabric.Canvas(canvasElement, {
          isDrawingMode: false,
          selection: true,
          preserveObjectStacking: true
        });

        // 创建用于绘制的离屏画布
        this.drawingCanvas = document.createElement('canvas');
        this.drawingCanvas.width = this.canvas.width;
        this.drawingCanvas.height = this.canvas.height;
        this.drawingContext = this.drawingCanvas.getContext('2d');

        // 创建橡皮擦画笔
        this.eraserBrush = new window.fabric.PencilBrush(this.canvas);
        this.eraserBrush.color = 'rgba(255, 255, 255, 1)';
        this.eraserBrush.width = this.brushWidth;
        
        // 事件监听
        this.canvas.on('mouse:down', this.onMouseDown);
        this.canvas.on('mouse:move', this.onMouseMove);
        this.canvas.on('mouse:up', this.onMouseUp);
        this.canvas.on('path:created', this.onPathCreated);

        // 标记 canvas 已准备就绪
        this.isCanvasReady = true;
        this.updateBrush();

        // 添加背景图片
        this.addBackgroundImage();
      } catch (error) {
        console.error('Error initializing Fabric.js:', error);
        this.isCanvasReady = false;
      }
    },
    onPathCreated(e) {
      if (this.mode === 'erase') {
        const eraserPath = e.path;
        
        // 获取所有可擦除的对象（涂抹的路径）
        const objects = this.canvas.getObjects().filter(obj => {
          return obj.type === 'path' && 
                 obj !== eraserPath && 
                 obj.stroke === 'rgba(33, 150, 243, 0.3)';
        });

        // 遍历所有对象检查相交
        objects.forEach(obj => {
          if (this.checkIntersection(obj, eraserPath)) {
            // 获取原始路径的点
            const originalPoints = obj.path;
            if (!originalPoints) return;

            // 创建新的路径点数组
            let newPoints = [];
            let currentSegment = [];
            
            // 遍历原始路径的每个点
            for (let i = 0; i < originalPoints.length; i++) {
              const point = originalPoints[i];
              
              if (point[0] === 'M' || point[0] === 'L') {
                const x = point[1];
                const y = point[2];
                
                // 检查点是否在擦除路径内
                if (!this.isPointInPath(x, y, eraserPath)) {
                  // 如果点不在擦除路径内，保留这个点
                  if (currentSegment.length === 0) {
                    currentSegment.push(['M', x, y]);
                  } else {
                    currentSegment.push(['L', x, y]);
                  }
                } else {
                  // 如果点在擦除路径内，结束当前段
                  if (currentSegment.length > 1) {
                    newPoints = newPoints.concat(currentSegment);
                  }
                  currentSegment = [];
                }
              }
            }
            
            // 添加最后一段
            if (currentSegment.length > 1) {
              newPoints = newPoints.concat(currentSegment);
            }

            // 如果有剩余的点，创建新的路径
            if (newPoints.length > 0) {
              const newPath = new window.fabric.Path(newPoints, {
                stroke: obj.stroke,
                strokeWidth: obj.strokeWidth,
                fill: null,
                selectable: false,
                evented: false
              });
              this.canvas.add(newPath);
            }

            // 移除原始路径
            this.canvas.remove(obj);
          }
        });

        // 移除橡皮擦路径
        this.canvas.remove(eraserPath);
        this.canvas.renderAll();
      }
    },
    checkIntersection(obj1, obj2) {
      if (!obj1 || !obj2) return false;

      // 获取对象的边界框
      const rect1 = obj1.getBoundingRect();
      const rect2 = obj2.getBoundingRect();

      // 检查边界框是否相交
      return !(rect2.left > rect1.left + rect1.width ||
               rect2.left + rect2.width < rect1.left ||
               rect2.top > rect1.top + rect1.height ||
               rect2.top + rect2.height < rect1.top);
    },
    isPointInPath(x, y, path) {
      const pathBounds = path.getBoundingRect();
      const point = { x, y };
      
      // 首先检查点是否在路径的边界框内
      if (x < pathBounds.left || x > pathBounds.left + pathBounds.width ||
          y < pathBounds.top || y > pathBounds.top + pathBounds.height) {
        return false;
      }

      // 获取橡皮擦的宽度
      const eraserWidth = path.strokeWidth || this.brushWidth;
      
      // 遍历橡皮擦路径的所有点
      const eraserPoints = path.path;
      for (let i = 0; i < eraserPoints.length; i++) {
        const eraserPoint = eraserPoints[i];
        if (eraserPoint[0] === 'M' || eraserPoint[0] === 'L') {
          const dx = x - eraserPoint[1];
          const dy = y - eraserPoint[2];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // 如果点在橡皮擦宽度范围内，认为它被擦除
          if (distance <= eraserWidth / 2) {
            return true;
          }
        }
      }
      
      return false;
    },
    addSampleObjects() {
      if (!this.canvas || !window.fabric) return;

      // 添加一些示例对象
      const rect = new window.fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: 'red',
        angle: 0,
        id: uuidv4()
      });

      const circle = new window.fabric.Circle({
        left: 300,
        top: 100,
        radius: 50,
        fill: 'blue',
        id: uuidv4()
      });

      const triangle = new window.fabric.Triangle({
        left: 500,
        top: 100,
        width: 100,
        height: 100,
        fill: 'green',
        id: uuidv4()
      });

      const text = new window.fabric.Text('可编辑文字', {
        left: 100,
        top: 250,
        fontSize: 30,
        fill: 'purple',
        id: uuidv4()
      });

      this.canvas.add(rect, circle, triangle, text);
      this.canvas.renderAll();
    },
    addRandomShape() {
      const shapes = ['rect', 'circle', 'triangle', 'text'];
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      let shape;

      switch (randomShape) {
        case 'rect':
          shape = new window.fabric.Rect({
            left: Math.random() * 600,
            top: Math.random() * 400,
            width: 50 + Math.random() * 100,
            height: 50 + Math.random() * 100,
            fill: this.getRandomColor(),
            angle: Math.random() * 360,
            id: uuidv4()
          });
          break;
        case 'circle':
          shape = new window.fabric.Circle({
            left: Math.random() * 600,
            top: Math.random() * 400,
            radius: 30 + Math.random() * 50,
            fill: this.getRandomColor(),
            id: uuidv4()
          });
          break;
        case 'triangle':
          shape = new window.fabric.Triangle({
            left: Math.random() * 600,
            top: Math.random() * 400,
            width: 50 + Math.random() * 100,
            height: 50 + Math.random() * 100,
            fill: this.getRandomColor(),
            id: uuidv4()
          });
          break;
        case 'text':
          shape = new window.fabric.Text('文字' + Math.floor(Math.random() * 100), {
            left: Math.random() * 600,
            top: Math.random() * 400,
            fontSize: 20 + Math.random() * 30,
            fill: this.getRandomColor(),
            id: uuidv4()
          });
          break;
      }

      this.canvas.add(shape);
      this.canvas.renderAll();
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    setMode(mode) {
      if (!this.canvas || !this.isCanvasReady) {
        console.warn('Canvas is not ready');
        return;
      }

      this.mode = mode;
      
      // 重置画布状态
      this.canvas.isDrawingMode = false;
      this.canvas.selection = false;
      this.canvas.defaultCursor = 'default';
      this.canvas.discardActiveObject();

      // 清除套索相关的状态
      if (this.lassoPath) {
        this.canvas.remove(this.lassoPath);
        this.lassoPath = null;
      }
      if (this.tempLine) {
        this.canvas.remove(this.tempLine);
        this.tempLine = null;
      }
      this.lassoPoints = [];
      this.isDrawing = false;

      this.canvas.renderAll();

      switch (mode) {
        case 'select':
          this.canvas.selection = true;
          this.canvas.defaultCursor = 'default';
          break;
        case 'lasso':
          this.canvas.defaultCursor = 'crosshair';
          break;
        case 'smart':
          this.canvas.defaultCursor = 'crosshair';
          break;
        case 'brush':
          this.canvas.isDrawingMode = true;
          const brush = new window.fabric.PencilBrush(this.canvas);
          brush.color = 'rgba(33, 150, 243, 0.3)';
          brush.width = this.brushWidth;
          this.canvas.freeDrawingBrush = brush;
          this.canvas.defaultCursor = 'crosshair';
          break;
        case 'erase':
          this.canvas.isDrawingMode = true;
          this.canvas.freeDrawingBrush = this.eraserBrush;
          this.canvas.defaultCursor = 'crosshair';
          break;
      }
    },
    updateBrush() {
      if (!this.canvas || !this.isCanvasReady) return;

      if (this.mode === 'brush') {
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new window.fabric.PencilBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = 'rgba(33, 150, 243, 0.3)';
        this.canvas.freeDrawingBrush.width = parseInt(this.brushWidth);
      } else if (this.mode === 'erase') {
        this.canvas.isDrawingMode = false;
      } else {
        this.canvas.isDrawingMode = false;
      }
    },
    onMouseDown(options) {
      if (this.mode === 'lasso') {
        const pointer = this.canvas.getPointer(options.e);
        
        if (!this.isDrawing) {
          this.isDrawing = true;
          this.lassoPoints = [];
          
          this.lassoPath = new window.fabric.Polygon([
            { x: pointer.x, y: pointer.y }
          ], {
            strokeWidth: 2,
            stroke: '#2196F3',
            fill: 'rgba(33, 150, 243, 0.3)',
            selectable: false,
            evented: false,
            objectCaching: false,
            perPixelTargetFind: true
          });
          
          this.lassoPoints.push({ x: pointer.x, y: pointer.y });
          this.canvas.add(this.lassoPath);
        } else {
          this.lassoPoints.push({ x: pointer.x, y: pointer.y });
          this.lassoPath.set({
            points: [...this.lassoPoints]
          });
        }

        if (this.tempLine) {
          this.canvas.remove(this.tempLine);
        }

        this.canvas.renderAll();
      } else if (this.mode === 'smart') {
        this.smartSelect(options);
      } else if (this.mode === 'erase') {
        this.isDrawing = true;
        const pointer = this.canvas.getPointer(options.e);
        
        // 保存当前所有路径到离屏画布
        this.savePathsToOffscreen();
        
        // 开始擦除
        this.drawingContext.globalCompositeOperation = 'destination-out';
        this.drawingContext.beginPath();
        this.drawingContext.arc(pointer.x, pointer.y, this.brushWidth / 2, 0, Math.PI * 2);
        this.drawingContext.fill();
        
        // 更新显示
        this.updateDisplay();
      }
    },
    onMouseMove(options) {
      if (this.isDrawing && this.mode === 'lasso' && this.lassoPath) {
        // 原有的套索逻辑保持不变
        const pointer = this.canvas.getPointer(options.e);
        
        if (this.tempLine) {
          this.canvas.remove(this.tempLine);
        }

        const lastPoint = this.lassoPoints[this.lassoPoints.length - 1];
        this.tempLine = new window.fabric.Line([
          lastPoint.x,
          lastPoint.y,
          pointer.x,
          pointer.y
        ], {
          strokeWidth: 2,
          stroke: '#2196F3',
          selectable: false,
          evented: false
        });
        
        if (this.lassoPoints.length > 2) {
          const tempPoints = [...this.lassoPoints, { x: pointer.x, y: pointer.y }];
          this.lassoPath.set({
            points: tempPoints
          });
        }

        this.canvas.add(this.tempLine);
        this.canvas.renderAll();
      } else if (this.isDrawing && this.mode === 'erase') {
        const pointer = this.canvas.getPointer(options.e);
        
        // 继续擦除
        this.drawingContext.beginPath();
        this.drawingContext.arc(pointer.x, pointer.y, this.brushWidth / 2, 0, Math.PI * 2);
        this.drawingContext.fill();
        
        // 更新显示
        this.updateDisplay();
      }
    },
    onMouseUp(event) {
      if (this.isDrawing && this.mode === 'lasso' && this.lassoPath && event.button === 2) {
        // 原有的套索结束逻辑保持不变
        this.isDrawing = false;
        
        if (this.tempLine) {
          this.canvas.remove(this.tempLine);
          this.tempLine = null;
        }

        if (this.lassoPoints.length > 2) {
          const firstPoint = this.lassoPoints[0];
          const points = [...this.lassoPoints, firstPoint];
          
          this.lassoPath.set({
            points: points,
            closed: true
          });

          this.selectObjectsInPath();

          setTimeout(() => {
            if (this.lassoPath) {
              this.canvas.remove(this.lassoPath);
              this.lassoPath = null;
              this.canvas.renderAll();
            }
          }, 300);
        }
      } else if (this.mode === 'erase') {
        this.isDrawing = false;
        
        // 将离屏画布的内容转换为新的路径
        this.convertOffscreenToPath();
      }
    },
    selectObjectsInPath() {
      if (!this.lassoPath) return;
      
      const objects = this.canvas.getObjects().filter(obj => {
        // 排除套索路径本身和底图
        return obj !== this.lassoPath && obj.type !== 'image';
      });
      
      const selectedObjects = objects.filter(obj => {
        return this.isObjectInPath(obj, this.lassoPath);
      });
      
      if (selectedObjects.length > 0) {
        if (selectedObjects.length === 1) {
          this.canvas.setActiveObject(selectedObjects[0]);
        } else {
          const selection = new window.fabric.ActiveSelection(selectedObjects, {
            canvas: this.canvas
          });
          this.canvas.setActiveObject(selection);
        }
        this.canvas.requestRenderAll();
      }
    },
    isObjectInPath(obj, path) {
      const objBounds = obj.getBoundingRect(true, true);
      const points = [
        { x: objBounds.left, y: objBounds.top },
        { x: objBounds.left + objBounds.width, y: objBounds.top },
        { x: objBounds.left + objBounds.width, y: objBounds.top + objBounds.height },
        { x: objBounds.left, y: objBounds.top + objBounds.height },
        { x: objBounds.left + objBounds.width / 2, y: objBounds.top + objBounds.height / 2 } // 中心点
      ];
      
      // 检查对象的边界点是否在路径内
      return points.some(point => {
        return this.canvas.containsPoint(point, path);
      });
    },
    smartSelect(options) {
      const pointer = this.canvas.getPointer(options.e);
      const clickedObject = this.canvas.findTarget(options.e);
      
      if (clickedObject) {
        // 选择相似的对象
        const similarObjects = this.findSimilarObjects(clickedObject);
        const sel = new window.fabric.ActiveSelection(similarObjects, {
          canvas: this.canvas
        });
        this.canvas.setActiveObject(sel);
        this.canvas.requestRenderAll();
      } else {
        // 如果点击空白处，清除选择
        this.canvas.discardActiveObject();
        this.canvas.requestRenderAll();
      }
    },
    findSimilarObjects(referenceObject) {
      const similarObjects = [];
      const tolerance = 0.2; // 相似度容忍度
      
      this.canvas.forEachObject(obj => {
        if (obj === referenceObject) {
          similarObjects.push(obj);
          return;
        }
        
        // 比较对象的属性
        let similarityScore = 0;
        const totalProperties = 4; // 我们比较的属性数量
        
        // 比较填充颜色
        if (obj.fill && referenceObject.fill && 
            this.colorDistance(obj.fill, referenceObject.fill) < 0.2) {
          similarityScore++;
        }
        
        // 比较类型
        if (obj.type === referenceObject.type) {
          similarityScore++;
        }
        
        // 比较大小（在20%范围内）
        const refSize = referenceObject.getBoundingRect();
        const objSize = obj.getBoundingRect();
        const sizeDiff = Math.abs(refSize.width - objSize.width) / refSize.width + 
                         Math.abs(refSize.height - objSize.height) / refSize.height;
        if (sizeDiff < 0.4) { // 宽度和高度差异总和小于40%
          similarityScore++;
        }
        
        // 比较旋转角度（在20度范围内）
        const angleDiff = Math.abs((obj.angle || 0) - (referenceObject.angle || 0));
        if (angleDiff < 20 || angleDiff > 340) { // 考虑360度环绕
          similarityScore++;
        }
        
        // 如果相似度超过阈值，则选择
        if (similarityScore / totalProperties >= 0.75) {
          similarObjects.push(obj);
        }
      });
      
      return similarObjects;
    },
    colorDistance(color1, color2) {
      // 将颜色转换为RGB
      const rgb1 = this.hexToRgb(color1);
      const rgb2 = this.hexToRgb(color2);
      
      if (!rgb1 || !rgb2) return 1; // 如果颜色格式不支持，返回最大距离
      
      // 计算欧几里得距离（归一化到0-1）
      const dr = rgb1.r - rgb2.r;
      const dg = rgb1.g - rgb2.g;
      const db = rgb1.b - rgb2.b;
      return Math.sqrt(dr*dr + dg*dg + db*db) / 441.67; // 441.67 = sqrt(255^2 * 3)
    },
    hexToRgb(hex) {
      // 扩展简写颜色 #RGB 到 #RRGGBB
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },
    clearCanvas() {
      if (!this.canvas) return;
      
      // 保存当前所有对象
      const objects = this.canvas.getObjects();
      
      // 找到底图（第一个添加的图片）
      const baseImage = objects.find(obj => obj.type === 'image');
      
      // 清除画布
      this.canvas.clear();
      
      // 如果有底图，重新添加
      if (baseImage) {
        this.canvas.add(baseImage);
        baseImage.sendToBack();
      } else if (this.backgroundImage) {
        // 如果没有底图但有背景图片URL，重新添加
        this.addBackgroundImage();
      }
      
      // 渲染画布
      this.canvas.renderAll();
    },
    addBackgroundImage() {
      if (!this.backgroundImage) return;

      window.fabric.Image.fromURL(this.backgroundImage, (img) => {
        // 设置图片大小以填充整个画布
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // 计算缩放比例以保持宽高比
        const scaleX = canvasWidth / img.width;
        const scaleY = canvasHeight / img.height;
        const scale = Math.max(scaleX, scaleY);
        
        // 设置图片属性
        img.set({
          scaleX: scale,
          scaleY: scale,
          originX: 'center',
          originY: 'center',
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          selectable: false,
          evented: false,
          hasControls: false,
          hasBorders: false,
          lockMovementX: true,
          lockMovementY: true,
          lockRotation: true,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true,
          hoverCursor: 'default'
        });

        // 保存背景图片引用
        this.backgroundImage = img;
        
        // 将图片添加到画布
        this.canvas.add(img);
        
        // 将图片发送到最底层
        img.sendToBack();
        
        // 渲染画布
        this.canvas.renderAll();
      }, { crossOrigin: 'anonymous' });
    },
    savePathsToOffscreen() {
      // 清空离屏画布
      this.drawingContext.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
      
      // 获取所有涂抹的路径，排除背景图片
      const paths = this.canvas.getObjects().filter(obj => 
        obj.type === 'path' && obj.stroke === 'rgba(33, 150, 243, 0.3)'
      );
      
      // 将所有路径绘制到离屏画布
      paths.forEach(path => {
        const pathCanvas = document.createElement('canvas');
        pathCanvas.width = this.canvas.width;
        pathCanvas.height = this.canvas.height;
        const pathContext = pathCanvas.getContext('2d');
        
        path.render(pathContext);
        this.drawingContext.drawImage(pathCanvas, 0, 0);
      });
      
      // 只移除涂抹路径，保留背景图片
      paths.forEach(path => this.canvas.remove(path));
    },
    updateDisplay() {
      // 创建新的 Fabric.js 图像对象
      window.fabric.Image.fromURL(this.drawingCanvas.toDataURL(), img => {
        // 只移除之前的涂抹图像，保留背景图片
        const oldImages = this.canvas.getObjects().filter(obj => 
          obj.type === 'image' && obj !== this.backgroundImage
        );
        oldImages.forEach(img => this.canvas.remove(img));
        
        // 添加新图像
        this.canvas.add(img);
        // 确保背景图片始终在最底层
        if (this.backgroundImage) {
          this.backgroundImage.sendToBack();
        }
        this.canvas.renderAll();
      });
    },
    convertOffscreenToPath() {
      // 将离屏画布的内容转换为 Fabric.js 路径
      const imageData = this.drawingContext.getImageData(
        0, 0, this.drawingCanvas.width, this.drawingCanvas.height
      );
      
      // 创建新的路径对象
      const path = new window.fabric.Path(this.imageDataToPath(imageData), {
        stroke: 'rgba(33, 150, 243, 0.3)',
        strokeWidth: this.brushWidth,
        fill: null,
        selectable: false,
        evented: false
      });
      
      // 添加到画布
      this.canvas.add(path);
      this.canvas.renderAll();
    },
    imageDataToPath(imageData) {
      // 将图像数据转换为路径数据
      const path = [];
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 0) { // 如果像素不透明
            if (path.length === 0) {
              path.push(['M', x, y]);
            } else {
              path.push(['L', x, y]);
            }
          }
        }
      }
      
      return path;
    },
  },
  beforeDestroy() {
    if (this.canvas) {
      this.canvas.dispose();
      this.canvas = null;
    }
  }
};
</script>

<style scoped>
.canvas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.toolbar {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.toolbar button {
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
}

.toolbar button.active {
  background: #3498db;
  color: white;
  border-color: #2980b9;
}

.color-picker, .brush-size {
  display: flex;
  align-items: center;
  gap: 5px;
}

#canvas {
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>