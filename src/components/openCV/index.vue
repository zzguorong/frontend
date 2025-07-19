<template>
  <div class="app-container">
    <el-card shadow="never" class="editor-card">
      <div slot="header" class="clearfix">
        <span>OpenCV 图像编辑器</span>
        <el-button-group style="float: right;">
          <el-button size="mini" @click="loadImage">加载图片</el-button>
          <el-button size="mini" @click="saveImage">保存图片</el-button>
          <el-button size="mini" @click="clearAll">清空所有</el-button>
        </el-button-group>
      </div>
      
      <div class="toolbar">
        <el-radio-group v-model="toolMode" size="small">
          <el-radio-button label="select">智能选区</el-radio-button>
          <el-radio-button label="lasso">套索</el-radio-button>
          <el-radio-button label="brush">涂抹</el-radio-button>
          <el-radio-button label="erase">橡皮擦</el-radio-button>
        </el-radio-group>
        
        <el-slider v-model="brushSize" :min="1" :max="50" style="width: 150px; margin-left: 20px;"></el-slider>
        <span class="slider-label">笔刷大小: {{brushSize}}px</span>
        
        <el-color-picker v-model="brushColor" size="small" style="margin-left: 20px;" 
                         v-if="toolMode === 'brush'"></el-color-picker>
      </div>
      
      <div class="canvas-container">
        <canvas id="main-canvas" ref="mainCanvas" 
                @mousedown="startDrawing" 
                @mousemove="draw" 
                @mouseup="stopDrawing" 
                @mouseleave="stopDrawing"></canvas>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'OpenCvImageEditor',
  data() {
    return {
      toolMode: 'select', // select, lasso, brush, erase
      isDrawing: false,
      brushSize: 10,
      brushColor: '#409EFF',
      
      // OpenCV 相关
      cv: null,
      srcMat: null,      // 原始图像
      dstMat: null,      // 处理结果
      maskMat: null,     // 选区掩码
      
      // 绘图相关
      layers: {
        base: null,      // 基础图像层
        drawing: null,   // 绘制层（涂抹/擦除）
        selection: null, // 选区显示层
        temp: null       // 临时绘制层
      },
      lassoPoints: []    // 套索点集合
    }
  },
  mounted() {
    this.initOpenCV();
    this.initCanvas();
  },
  methods: {
    // 初始化 OpenCV
    initOpenCV() {
      if (window.cv) {
        this.cv = window.cv;
        this.$message.success('OpenCV.js 加载成功');
      } else {
        const script = document.createElement('script');
        script.src = 'https://docs.opencv.org/4.5.5/opencv.js';
        script.async = true;
        script.onload = () => {
          this.cv = window.cv;
          this.$message.success('OpenCV.js 加载成功');
        };
        script.onerror = () => {
          this.$message.error('OpenCV.js 加载失败');
        };
        document.body.appendChild(script);
      }
    },
    
    // 初始化画布和图层
    initCanvas() {
      const mainCanvas = this.$refs.mainCanvas;
      mainCanvas.width = 800;
      mainCanvas.height = 600;
      
      // 初始化所有图层
      this.layers.base = this.createLayer();
      this.layers.drawing = this.createLayer();
      this.layers.selection = this.createLayer();
      this.layers.temp = this.createLayer();
      
      // 清空画布
      this.clearCanvas();
    },
    
    // 创建新图层
    createLayer() {
      const canvas = document.createElement('canvas');
      canvas.width = this.$refs.mainCanvas.width;
      canvas.height = this.$refs.mainCanvas.height;
      return canvas;
    },
    
    // 渲染所有图层到主画布
    renderLayers() {
      const ctx = this.$refs.mainCanvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.mainCanvas.width, this.$refs.mainCanvas.height);
      
      // 按顺序渲染各图层
      ctx.drawImage(this.layers.base, 0, 0);
      ctx.drawImage(this.layers.drawing, 0, 0);
      ctx.drawImage(this.layers.selection, 0, 0);
      ctx.drawImage(this.layers.temp, 0, 0);
    },
    
    // 加载图片
    loadImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = event => {
          const img = new Image();
          img.onload = () => {
            // 调整画布大小
            this.resizeCanvas(img.width, img.height);
            
            // 绘制到基础图层
            const ctx = this.layers.base.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // 初始化 OpenCV Mat
            this.initOpenCVMats();
            
            this.$message.success('图片加载成功');
            this.renderLayers();
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
    
    // 调整画布和所有图层大小
    resizeCanvas(width, height) {
      const mainCanvas = this.$refs.mainCanvas;
      mainCanvas.width = width;
      mainCanvas.height = height;
      
      // 调整所有图层大小
      Object.values(this.layers).forEach(layer => {
        layer.width = width;
        layer.height = height;
      });
    },
    
    // 初始化 OpenCV Mat 对象
    initOpenCVMats() {
      if (!this.cv) return;
      
      // 释放之前的 Mat 对象
      if (this.srcMat) this.srcMat.delete();
      if (this.dstMat) this.dstMat.delete();
      if (this.maskMat) this.maskMat.delete();
      
      // 从基础图层创建 Mat
      const imageData = this.layers.base.getContext('2d')
        .getImageData(0, 0, this.layers.base.width, this.layers.base.height);
      
      this.srcMat = this.cv.matFromImageData(imageData);
      this.dstMat = new this.cv.Mat();
      this.maskMat = new this.cv.Mat.zeros(this.srcMat.rows, this.srcMat.cols, this.cv.CV_8UC1);
    },
    
    // 绘图相关方法
    startDrawing(e) {
      if (!this.srcMat) return;
      
      const rect = e.target.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      
      this.isDrawing = true;
      
      // 根据工具类型初始化绘制
      switch (this.toolMode) {
        case 'lasso':
          this.lassoPoints = [[this.lastX, this.lastY]];
          this.clearTempLayer();
          break;
          
        case 'brush':
        case 'erase':
          const ctx = this.layers.drawing.getContext('2d');
          ctx.beginPath();
          ctx.moveTo(this.lastX, this.lastY);
          break;
      }
    },
    
    draw(e) {
      if (!this.isDrawing || !this.srcMat) return;
      
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      switch (this.toolMode) {
        case 'brush':
          this.drawBrush(x, y);
          break;
          
        case 'erase':
          this.drawEraser(x, y);
          break;
          
        case 'lasso':
          this.drawLasso(x, y);
          break;
      }
      
      this.lastX = x;
      this.lastY = y;
    },
    
    stopDrawing() {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      
      // 根据工具类型执行结束操作
      switch (this.toolMode) {
        case 'lasso':
          if (this.lassoPoints.length > 2) {
            this.applyLassoSelection();
          }
          break;
          
        case 'brush':
        case 'erase':
          // 将绘制内容合并到基础图层
          this.mergeDrawingLayer();
          break;
      }
    },
    
    // 绘制画笔
    drawBrush(x, y) {
      const ctx = this.layers.drawing.getContext('2d');
      ctx.strokeStyle = this.brushColor;
      ctx.lineWidth = this.brushSize;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      
      this.renderLayers();
    },
    
    // 绘制橡皮擦
    drawEraser(x, y) {
      const ctx = this.layers.drawing.getContext('2d');
      
      // 使用 destination-out 合成模式实现真正的擦除
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      this.renderLayers();
    },
    
    // 绘制套索路径
    drawLasso(x, y) {
      this.lassoPoints.push([x, y]);
      
      const ctx = this.layers.temp.getContext('2d');
      ctx.clearRect(0, 0, this.layers.temp.width, this.layers.temp.height);
      
      ctx.strokeStyle = '#409EFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.lassoPoints[0][0], this.lassoPoints[0][1]);
      
      for (let i = 1; i < this.lassoPoints.length; i++) {
        ctx.lineTo(this.lassoPoints[i][0], this.lassoPoints[i][1]);
      }
      
      ctx.stroke();
      this.renderLayers();
    },
    
    // 应用套索选区
    applyLassoSelection() {
      if (!this.cv || this.lassoPoints.length < 3) return;
      
      // 创建多边形掩码
      this.maskMat.setTo(0);
      
      const points = this.lassoPoints.map(p => new this.cv.Point(p[0], p[1]));
      const contour = new this.cv.MatVector();
      contour.push_back(new this.cv.Mat.fromArray(points.length, 1, this.cv.CV_32SC2, points.flat()));
      
      this.cv.fillPoly(this.maskMat, contour, new this.cv.Scalar(255));
      
      // 根据模式处理选区
      if (this.toolMode === 'select') {
        this.applySmartSelection();
      } else if (this.toolMode === 'lasso') {
        this.showSelectionArea();
      }
      
      this.lassoPoints = [];
      this.clearTempLayer();
    },
    
    // 应用智能选区 (GrabCut)
    applySmartSelection() {
      const bgdModel = new this.cv.Mat();
      const fgdModel = new this.cv.Mat();
      const rect = new this.cv.Rect(0, 0, this.srcMat.cols, this.srcMat.rows);
      
      // 执行 GrabCut 算法
      this.cv.grabCut(this.srcMat, this.maskMat, rect, bgdModel, fgdModel, 1, this.cv.GC_INIT_WITH_MASK);
      
      // 创建前景掩码
      const foregroundMask = new this.cv.Mat();
      this.cv.compare(this.maskMat, this.cv.GC_PR_FGD, foregroundMask, this.cv.CMP_EQ);
      
      // 提取前景到结果
      this.dstMat = new this.cv.Mat.zeros(this.srcMat.size(), this.srcMat.type());
      this.srcMat.copyTo(this.dstMat, foregroundMask);
      
      // 显示选区
      this.showSelectionArea();
      
      // 释放内存
      bgdModel.delete();
      fgdModel.delete();
      foregroundMask.delete();
    },
    
    // 显示选区区域
    showSelectionArea() {
      const ctx = this.layers.selection.getContext('2d');
      ctx.clearRect(0, 0, this.layers.selection.width, this.layers.selection.height);
      
      // 创建选区可视化
      const selectionMask = new this.cv.Mat();
      this.cv.cvtColor(this.maskMat, selectionMask, this.cv.COLOR_GRAY2RGBA);
      
      // 设置选区显示颜色 (半透明蓝色)
      for (let i = 0; i < selectionMask.rows; i++) {
        for (let j = 0; j < selectionMask.cols; j++) {
          if (selectionMask.ucharPtr(i, j)[0] > 0) {
            selectionMask.ucharPtr(i, j)[0] = 64;   // B
            selectionMask.ucharPtr(i, j)[1] = 158;  // G
            selectionMask.ucharPtr(i, j)[2] = 255;  // R
            selectionMask.ucharPtr(i, j)[3] = 100;  // A
          }
        }
      }
      
      // 绘制选区到选区图层
      const imageData = new ImageData(
        new Uint8ClampedArray(selectionMask.data),
        selectionMask.cols,
        selectionMask.rows
      );
      ctx.putImageData(imageData, 0, 0);
      
      selectionMask.delete();
      this.renderLayers();
    },
    
    // 合并绘制图层到基础图层
    mergeDrawingLayer() {
      const baseCtx = this.layers.base.getContext('2d');
      baseCtx.drawImage(this.layers.drawing, 0, 0);
      
      // 清空绘制图层
      this.clearDrawingLayer();
      
      // 更新 OpenCV Mat
      this.initOpenCVMats();
    },
    
    // 清空临时图层
    clearTempLayer() {
      this.layers.temp.getContext('2d').clearRect(0, 0, this.layers.temp.width, this.layers.temp.height);
      this.renderLayers();
    },
    
    // 清空绘制图层
    clearDrawingLayer() {
      this.layers.drawing.getContext('2d').clearRect(0, 0, this.layers.drawing.width, this.layers.drawing.height);
      this.renderLayers();
    },
    
    // 清空选区图层
    clearSelectionLayer() {
      this.layers.selection.getContext('2d').clearRect(0, 0, this.layers.selection.width, this.layers.selection.height);
      this.renderLayers();
    },
    
    // 清空所有编辑效果
    clearAll() {
      if (!this.srcMat) return;
      
      // 保留基础图像，清空其他所有编辑
      this.clearDrawingLayer();
      this.clearSelectionLayer();
      this.clearTempLayer();
      
      // 重置 OpenCV Mat
      this.initOpenCVMats();
      
      this.$message.success('已清空所有编辑效果');
    },
    
    // 保存图片
    saveImage() {
      if (!this.srcMat) {
        this.$message.warning('没有可保存的图像');
        return;
      }
      
      const link = document.createElement('a');
      link.download = 'opencv-edit-result.png';
      link.href = this.$refs.mainCanvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      this.$message.success('图片保存成功');
    }
  },
  beforeDestroy() {
    // 清理 OpenCV 资源
    if (this.srcMat) this.srcMat.delete();
    if (this.dstMat) this.dstMat.delete();
    if (this.maskMat) this.maskMat.delete();
  }
}
</script>

<style scoped>
.editor-card {
  min-height: calc(100vh - 120px);
}

.toolbar {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.slider-label {
  margin-left: 10px;
  font-size: 14px;
  color: #606266;
}

.canvas-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f7fa;
}

#main-canvas {
  background-color: white;
  cursor: crosshair;
  display: block;
  max-width: 100%;
}
</style>