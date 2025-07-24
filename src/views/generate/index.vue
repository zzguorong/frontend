<template>
  <div class="app-container">
    <!-- 主要内容区域 -->
    <div class="content-wrapper">
      <el-row :gutter="20">
        <el-col :span="18">
          <!-- 中间主要区域 -->
          <div class="center-panel" ref="centerPanel">
            <!-- 预览区域 -->
            <div class="preview-section">
              <div class="preview-container">
                <div v-if="!previewImage" class="empty-preview"></div>
                <template v-else>
                  <img ref="previewImg" :src="previewImage" class="preview-img" @load="onImageLoad" alt="预览图" />
                  <canvas ref="lassoCanvas" class="lasso-canvas" @mousedown="onCanvasMouseDown"
                    @mousemove="onCanvasMouseMove" @mouseup="onCanvasMouseUp" @mouseleave="onCanvasMouseLeave"
                    @click="onCanvasClick" @dblclick="onCanvasDblClick"
                    @contextmenu.prevent="onCanvasRightClick"></canvas>
                  <canvas ref="paintCanvas" class="paint-canvas" @mousedown.prevent="onPaintMouseDown"
                    @mousemove.prevent="onPaintMouseMove" @mouseup.prevent="onPaintMouseUp"
                    @mouseleave.prevent="onPaintMouseLeave"></canvas>
                </template>
              </div>
            </div>

            <!-- 缩略图区域 -->
            <div class="thumbnail-section">
              <div class="thumbnail-gallery-wrapper" ref="thumbWrapper" @scroll="onThumbScroll">
                <div class="thumbnail-gallery">
                  <!-- 取前 6 个元素渲染。 -->
                  <template v-for="(thumb, index) in thumbnails.slice(0, 6)">
                    <div :key="index" class="thumbnail" :class="{ active: selectedThumbnail === index }"
                      @click="selectThumbnail(thumb, index)">
                      <img v-if="thumb.url" :src="thumb.url" alt="缩略图" class="thumb-img" />
                      <!-- 当无图时显示占位图标 -->
                      <svg-icon v-else icon-class="generateImage" class="placeholder-icon" />
                      <div class="thumbnail-actions" v-if="thumb && thumb.url && index > 1">
                        <svg-icon class="action-icon favorite-icon" icon-class="collection" :style="(favoriteStates[index] || favoriteHoverStates[index])
                          ? { color: '#f56565' }
                          : { color: '#000' }" @click.stop="toggleFavorite(index)"
                          @mouseenter="onFavoriteHover(index, true)" @mouseleave="onFavoriteHover(index, false)" />

                        <svg-icon class="action-icon delete-icon" icon-class="delete" :style="deleteHoverStates[index]
                          ? '{color:#f56565}'
                          : '#000'
                          " @click.stop="deleteThumbnail(index)" @mouseenter="onDeleteHover(index, true)"
                          @mouseleave="onDeleteHover(index, false)" />

                      </div>

                      <!-- 底图标签 -->
                      <div v-if="thumb && index === 0" class="image-label">
                        底图
                      </div>
                      <!-- 语义分割图标签 -->
                      <div v-if="thumb && index === 1" class="image-label">
                        语义分割图
                      </div>
                      <GlobalMask :ref="`globalMask-${thumb.id}`" />
                    </div>
                  </template>
                </div>
              </div>
              <div class="seemore">
                <span @click="goToDetail">查看更多</span>
              </div>
              <!-- 自定义滑条（灰色轨道 + 黑色圆点） -->
              <!-- <div class="thumb-track" ref="thumbTrack">
                <div
                  class="thumb-progress"
                  :style="{ width: thumbScrollLeft + 4 + 'px' }"
                ></div>
                <div
                  class="thumb-dot"
                  ref="thumbDot"
                  :style="{ left: thumbScrollLeft + 'px' }"
                  @mousedown.stop.prevent="startThumbDrag"
                ></div>
              </div> -->
            </div>

            <!-- 生成控制区域 -->
            <div class="generate-container">
              <div class="generate-section">

                <!-- <div class="generate-controls">
                  <span class="control-label">生成图片数量</span>
                  <draggable-progress
                    :percentage.sync="generateCount"
                    :range="5"
                  ></draggable-progress>
                </div> -->
                <div class="generate-btn-container">

                  <div type="primary" size="large" class="generate-btn" :class="{ 'disabled-btn': isGenerating }"
                    @click="!isGenerating && handleGenerate()"
                    :style="{ backgroundColor: isGenerating ? '#bbb' : '#fff' }">
                    {{ isGenerating ? "正在生成中" : "点击生成" }}
                  </div>
                  <el-checkbox class="agree-checkbox" v-model="semanticEnabled" label="启用语义分割"
                    size="medium"></el-checkbox>
                </div>
                <div class="download-controls">
                  <div @click="downloadPNG(previewImage)" :style="{
                    height: '35px',
                    lineHeight: '35px',
                    border: '1px solid #dcdfe6',
                    borderRadius: '5px',
                    width: '120px',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginLeft: '5px',
                    cursor: previewImage ? 'pointer' : 'not-allowed',
                    backgroundColor: previewImage ? '#fff' : '#ccc'
                  }">
                    PNG下载
                  </div>
                  <div @click="downloadPSD" :style="{
                     height: '35px',
                    lineHeight: '35px',
                    border: '1px solid #dcdfe6',
                    borderRadius: '5px',
                    width: '120px',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginLeft: '5px',
                      cursor: canClickPsd ? 'pointer' : 'not-allowed',
                    backgroundColor: canClickPsd ? '#fff' : '#ccc' }"
                    >
                    PSD下载
                    <el-tooltip content="PSD下载功能" placement="top">
                      <svg-icon icon-class="question" class="icon-style"
                        style="position: absolute; right: 15px; top: 10px"></svg-icon>
                      <!-- <i class="question-icon">?</i> -->
                    </el-tooltip>
                  </div>
                </div>
              </div>
              <div style="
                  margin: 0 auto;
                  width: 150px;
                  font-size: 12px;
                  margin-top: 5px;
                  color: #666;
                  display: flex;
                  justify-content: space-between;
                ">
                <span>总可执行任务数量</span><span>3</span>
              </div>
            </div>

            <!-- <div class="detail-link" @click="goToDetail">详情</div> -->
          </div>
        </el-col>
        <el-col :span="6">
          <!-- 右侧工具面板 -->
          <div class="left-panel right-panel">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="生图参数" name="left">
                <div class="panel-style" ref="paramsScroll" data-simplebar simplebar-auto-hide="false">
                  <!-- 提示词 -->
                  <div class="control-section" style="border-radius: 0 0 8px 8px; border-top: none">
                    <div class="section-title">
                      <span>提示词</span>
                      <el-tooltip content="对希望生成的图纸结果进行描述，建议使用名词，并用逗号分隔" placement="top">
                        <svg-icon icon-class="question" class="icon-style"></svg-icon>
                        <!-- <i class="question-icon">?</i> -->
                      </el-tooltip>
                    </div>
                    <el-input v-model="promptText" type="textarea" :rows="3" placeholder="所输入的提示词越精准，生成结果越精准" />
                  </div>
                  <div class="control-section">
                    <!-- 视角类型 -->
                    <div class="section-item" style="margin-bottom: 20px" :class="{ error: formErrors.viewType }">
                      <div class="section-title">
                        <span>视角类型<span class="required-mark">*</span></span>
                        <el-tooltip content="决定生成图纸的角度与视野，包含人视、鸟瞰、工程与室内图四个模块" placement="top">
                          <svg-icon icon-class="question" class="icon-style"></svg-icon>
                          <!-- <i class="question-icon">?</i> -->
                        </el-tooltip>
                      </div>
                      <el-select v-model="viewType" placeholder="选择视角类型" style="width: 100%" @change="updateStyleOptions">
                        <el-option v-for="item in perspectiveOptions" :key="item.id" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <!-- 风格类别 -->
                    <div class="section-item" :class="{ error: formErrors.styleCategory }">
                      <div class="section-title">
                        <span>风格类别<span class="required-mark">*</span></span>
                        <el-tooltip content="基于视角类型四个模块，选择多种预设风格" placement="top">
                          <svg-icon icon-class="question" class="icon-style"></svg-icon>
                          <!-- <i class="question-icon">?</i> -->
                        </el-tooltip>
                      </div>
                      <!--  @change="clearStyleCategoryError"数据写死，目前不需要方法 -->
                      <el-select v-model="styleCategory" placeholder="选择风格" style="width: 100%">
                        <el-option v-for="item in styleOptions" :key="item.value" :label="item.label"
                          :value="item.value"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="control-section">
                    <!-- 上传底图 -->
                    <div class="section-item" style="
                        padding-bottom: 15px;
                        margin-bottom: 15px;
                        border-bottom: 1px solid #dcdfe6;
                      " :class="{ error: formErrors.basemapUrl }">
                      <div class="section-title">
                        <span>上传底图<span class="required-mark">*</span></span>
                        <el-tooltip content="用于生成基础图像。建议上传底图像素<=2048px*2048px" placement="top">
                          <svg-icon icon-class="question" class="icon-style"></svg-icon>
                          <!-- <i class="question-icon">?</i> -->
                        </el-tooltip>
                      </div>
                      <div class="section-content">
                        <upload-file ref="uploadRef" finalApi="/base_image" :imgUrl.sync="basemapUrl" describeText="上传底图"
                          @upload-success="onBasemapUpload($event, 1)" @update:imgUrl="onBasemapUrlUpdate"
                          @delete="onImageDelete(1)"></upload-file>
                        <div class="slider-control-content">
                          <div class="slider-control">
                            <div class="slider-title">
                              <label>控制程度</label>
                              <el-tooltip content="是生成图与底图颜色材质的相似程度" placement="top">
                                <svg-icon icon-class="question" class="icon-style"></svg-icon>
                                <!-- <i class="question-icon">?</i> -->
                              </el-tooltip>
                            </div>
                            <draggable-progress :percentage.sync="baseControlLevel"></draggable-progress>
                          </div>
                          <!-- <div class="slider-control">
                            <div class="slider-title">
                              <label>材质固定</label>
                              <el-tooltip
                                content="是生成图与底图轮廓形状的相似程度"
                                placement="top"
                              >
                                <svg-icon
                                  icon-class="question"
                                  class="icon-style"
                                ></svg-icon>
                              </el-tooltip>
                            </div>
                            <draggable-progress
                              :percentage.sync="materialPercentage"
                            ></draggable-progress>
                          </div> -->
                        </div>
                      </div>
                    </div>
                    <!-- 风格迁移 -->
                    <div class="section-item">
                      <div class="section-title transfer-title">
                        <div class="title-with-tooltip">
                          <span>风格迁移</span>
                          <el-tooltip content="提取参考图中配色、灯光、材质等信息来影响生成内容" placement="top">
                            <svg-icon icon-class="question" class="icon-style"></svg-icon>
                            <!-- <i class="question-icon">?</i> -->
                          </el-tooltip>
                        </div>
                        <!-- 风格迁移开关 -->
                        <el-switch v-model="styleTransferEnabled" />
                      </div>
                      <div class="section-content" v-if="styleTransferEnabled">
                        <upload-file finalApi="/style_image" :imgUrl="styleImgUrl" describeText="上传风格图"
                          @upload-success="onBasemapUpload($event, 2)" @delete="onImageDelete(2)"></upload-file>
                        <div class="slider-control-content">
                          <div class="slider-control">
                            <div class="slider-title">
                              <label>控制程度</label>
                              <el-tooltip content="是生成图与风格图颜色材质的相似程度" placement="top">
                                <svg-icon icon-class="question" class="icon-style"></svg-icon>
                                <!-- <i class="question-icon">?</i> -->
                              </el-tooltip>
                            </div>
                            <draggable-progress :percentage.sync="styleTransferLevel"></draggable-progress>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="control-section" style="margin-bottom: 0">
                    <!-- 分辨率 -->
                    <div class="section-item" style="margin-bottom: 20px">
                      <div class="section-title">分辨率</div>
                      <el-select v-model="resolution" placeholder="选择分辨率" style="width: 100%">
                        <el-option label="标准(1080P)" :value="1"></el-option>
                        <el-option label="大(2k)" :value="2"></el-option>
                        <el-option label="超大(4k)" :value="3"></el-option>
                      </el-select>
                    </div>
                    <!-- 图纸比例 -->
                    <div class="section-item">
                      <div class="section-title">图纸比例</div>
                      <el-select v-model="aspectRatio" placeholder="选择比例" style="width: 100%">
                        <!-- TODO:对接口字段 -->
                        <el-option label="原始比例" value="detect"></el-option>
                        <el-option label="1:1" value="1:1"></el-option>
                        <el-option label="3:2" value="3:2"></el-option>
                        <el-option label="4:3" value="4:3"></el-option>
                        <el-option label="16:9" value="16:9"></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="语义分割" name="right">
                <!-- 语义分割 -->
                <div class="panel-style" ref="paramsScroll" data-simplebar data-simplebar-auto-hide="false">
                  <!-- <div
                    class="section-title"
                    style="justify-content: space-between"
                  >
                    <div>
                      <span style="margin-right: 5px">语义分割</span>
                      <el-tooltip
                        content="可以在底图的基础上更加精准地控制生成图"
                        placement="top"
                      >
                        <svg-icon
                          icon-class="question"
                          class="icon-style"
                        ></svg-icon>
                      </el-tooltip>
                    </div>
                    <el-switch v-model="semanticEnabled" style="float: right" />
                  </div> -->
                  <div class="semantic-controls">
                    <!-- 上传语义分割图 -->
                    <div class="semantic-upload-section">
                      <upload-file finalApi="/segment_image" :imgUrl.sync="semanticImgUrl" describeText="上传语义分割图"
                        @upload-success="onBasemapUpload($event, 3)" @update:imgUrl="onSemanticUrlUpdate"
                        @delete="onImageDelete(3)"></upload-file>
                    </div>
                    <div class="tool-actions">
                      <span :class="[
                        'auto-detect select-type',
                        {
                          disabled:
                            viewType === 'aerial' ||
                            viewType === 'engineering' ||
                            !basemapUrlId,
                        },
                      ]" style="position: relative" @click="automaticRecognition">自动识别
                        <el-tooltip class="auto-identify" content="功能目前只对人视图和室内图开发" placement="top"
                          style="position: absolute; top: 11px; left: 78px">
                          <svg-icon icon-class="question" class="icon-style"></svg-icon>
                          <!-- <i class="question-icon">?</i> -->
                        </el-tooltip>
                      </span>
                    </div>
                  </div>
                  <!-- 工具栏 -->
                  <div class="toolbar">
                    <div class="tool-category">
                      <span class="category-label">工具栏
                        <el-tooltip class="auto-identify" content="‘建筑’，‘天空’等每个要素绘制完需要点击暂存" placement="top"
                          style="position: absolute; top: 2px; left: 47px">
                          <svg-icon icon-class="question" class="icon-style"></svg-icon>
                          <!-- <i class="question-icon">?</i> -->
                        </el-tooltip>
                      </span>
                      <div class="tool-buttons">
                        <!-- <div
                          class="tool-buttons-item"
                          :class="{ active: currentTool === 'smart' }"
                          @click="setTool('smart')"
                          @mouseenter="onToolHover('smart', true)"
                          @mouseleave="onToolHover('smart', false)"
                        >
                          <span
                            >智能选区
                            <svg-icon
                              :icon-class="
                                currentTool === 'smart' || toolHoverStates.smart
                                  ? 'select-area'
                                  : 'select-area'
                              "
                          /></span>
                        </div> -->
                        <div class="tool-buttons-item" :class="{ active: currentTool === 'line' }"
                          @click="setTool('line')" @mouseenter="onToolHover('line', true)"
                          @mouseleave="onToolHover('line', false)">
                          <!-- <span
                            >套索
                            <svg-icon
                              :icon-class="
                                currentTool === 'line' || toolHoverStates.line
                                  ? 'lasso-area'
                                  : 'lasso-area'
                              "
                          /></span> -->
                          <span class="tool-buttons-item-text tip">套索
                            <el-tooltip class="auto-identify" content="鼠标右键结束绘制" placement="top"
                              style="position: absolute; top: 0px; left: 30px">
                              <svg-icon icon-class="question" class="icon-style"></svg-icon>
                              <!-- <i class="question-icon">?</i> -->
                            </el-tooltip><svg-icon icon-class="lasso" /></span>
                        </div>
                        <div class="tool-buttons-item" :class="{ active: currentTool === 'fill' }"
                          @click="setTool('fill')" @mouseenter="onToolHover('fill', true)"
                          @mouseleave="onToolHover('fill', false)">
                          <!-- <span
                            >自由涂抹
                            <svg-icon
                              :icon-class="
                                currentTool === 'fill' || toolHoverStates.fill
                                  ? 'free-apply'
                                  : 'free-apply'
                              "
                          /></span> -->
                          <span class="tool-buttons-item-text">自由涂抹 <svg-icon icon-class="free-apply" /></span>
                        </div>

                        <div class="tool-buttons-item" :class="{ active: currentTool === 'eraser' }"
                          @click="setTool('eraser')" @mouseenter="onToolHover('eraser', true)"
                          @mouseleave="onToolHover('eraser', false)">
                          <!-- <span>
                            擦除
                            <svg-icon
                              :icon-class="
                                currentTool === 'eraser' ||
                                toolHoverStates.eraser
                                  ? 'erase-area'
                                  : 'erase-area'
                              "
                          /></span> -->
                          <span class="tool-buttons-item-text">
                            擦除
                            <svg-icon icon-class="erase-area" /></span>
                        </div>
                        <div class="tool-buttons-item" @click="clearCanvas" @mouseenter="onToolHover('clear', true)"
                          @mouseleave="onToolHover('clear', false)">
                          <!-- <span>
                            清空
                            <svg-icon
                              :icon-class="
                                toolHoverStates.clear
                                  ? 'clear-area'
                                  : 'clear-area'
                              "
                          /></span> -->
                          <span class="tool-buttons-item-text">清空<svg-icon icon-class="clear-area" /></span>
                        </div>
                        <div class="tool-buttons-item" @click="undoCanvas">
                          <span class="tool-buttons-item-text">撤销<svg-icon icon-class="undo" /></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 元素类别 -->
                  <div class="element-category">
                    <span class="category-label">元素类别</span>
                    <!-- 颜色选择 -->
                    <div class="color-palette" v-for="(items, categoryName) in aerialviewGroups">
                      <!-- <div>{{ categoryName }}</div> -->
                      <div class="color-palette-group">
                        <div class="color-palette-item" v-for="item in items" :key="item.label"
                          @click="selectWaterColor(item.color)">
                          <div class="swatches-color" :style="{ background: item.color }"></div>
                          <div class="swatches-name">{{ item.zh }}</div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <!-- 暂存 -->
                  <div class="tool-buttons">
                    <span class="tempo-store select-type" @click="temporaryStore">暂存
                      <el-tooltip class="auto-identify" content="绘制内容将通过点击 [暂存] 同步到预览区。" placement="top"
                        style="position: absolute; top: 11px; left: 237px">
                        <svg-icon icon-class="question" class="icon-style"></svg-icon>
                        <!-- <i class="question-icon">?</i> -->
                      </el-tooltip></span>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import draggableProgress from "@/components/draggableProgress.vue";
import uploadFile from "@/components/uploadFile";
import "simplebar/dist/simplebar.min.css";
import { mapMutations, mapState } from "vuex";
import GlobalMask from '../../layout/components/GlobalMask.vue';

// import laravelEcho from "@/utils/laravel-echo";
import {
  collectImage,
  deleteGeneratedImage,
  deleteImage,
  generateImages,
  getImageDetail,
  getPerspectiveStyle,
  preprocessSegment
} from "@/api/generate";
import { blobUrlToBase64 } from "@/utils/index";
import { downloadPNG } from "@/utils/downLoad";


export default {
  name: "GenerateFile",
  components: { draggableProgress, uploadFile, GlobalMask },
  data() {
    return {
      // 基础控制
      promptText: "",
      viewType: 1, // 选择的视角类型
      styleCategory: "选项1",
      perspectiveOptions: [],// 视角类型
      // 风格类别配置
      styleOptions: [{
        value: '选项1',
        label: '通用类别'
      }],// 初始为空，默认显示"通用类别"
      // 上传控制
      // controlLevel: 5,
      materialFixed: 5,
      basemapUrl: "",
      basemapUrlId: null,
      semanticImgUrlId: null,// 语义分割图Id
      semanticImgUrl: "", // 语义分割图片URL
      basemapUrlBase64: null,
      baseControlLevel: 5,
      // 风格迁移开关
      styleTransferEnabled: false,
      materialPercentage: 5,
      styleTransferLevel: 0,
      styleImgUrl: "",
      styleImageId: null,
      // 图片设置
      resolution: 2,
      aspectRatio: "detect",
      // 生成控制
      generateCount: 1,
      isGenerating: false,
      // 轮询定时器
      pollingTimer: null,
      // 预览图
      previewImage: null,
      thumbnails: Array.from({ length: 6 }, (_, i) => ({
        url: null,
        id: `thumb-${i + 1}`   // 用反引号包裹整个字符串
      })),
      selectedThumbnail: -1,

      // 收藏状态
      favoriteStates: [false, false, false, false, false, false],

      // 悬停状态
      favoriteHoverStates: [false, false, false, false, false, false],
      deleteHoverStates: [false, false, false, false, false, false],

      // 语义分割
      semanticEnabled: false,
      currentTool: "",//line 套索  eraser 擦除  clear清空  fill自由涂抹
      toolHoverStates: {
        smart: false,
        line: false,
        fill: false,
        eraser: false,
        clear: false,
      },

      selectedGroundColor: "#FFE4B5",
      selectedWaterColor: "#87CEEB",
      // 鸟瞰图颜色类别
      aerialviewGroups: {
        "鸟瞰图&人视图&平面": [
          { "label": "sky", "color": "#06E6E6", "zh": "天空" },
          { "label": "building", "color": "#B47878", "zh": "建筑物" },
          { "label": "road", "color": "#8C8C8C", "zh": "道路" },
          { "label": "sidewalk", "color": "#EBFF07", "zh": "人行道" },
          { "label": "water", "color": "#3D6EFA", "zh": "水体" },
          { "label": "tree", "color": "#04C803", "zh": "树" },
          { "label": "grass", "color": "#04FA07", "zh": "草地" },
          { "label": "mountain", "color": "#8FFF8C", "zh": "山体" },
          { "label": "field", "color": "#7009FF", "zh": "田野" },
          { "label": "person", "color": "#96053D", "zh": "人" },
          { "label": "car", "color": "#0066C8", "zh": "汽车" },
        ],

        "室内": [
          { "label": "wall", "color": "#787878", "zh": "墙" },
          { "label": "ceiling", "color": "#787850", "zh": "天花板" },
          { "label": "floor", "color": "#503232", "zh": "地板" },
          { "label": "rug/carpet", "color": "#FF095C", "zh": "地毯" },
          { "label": "bed", "color": "#CC05FF", "zh": "床" },
          { "label": "cabinet", "color": "#E005FF", "zh": "柜子" },
          { "label": "shelf", "color": "#FF0747", "zh": "书架" },
          { "label": "table", "color": "#FF0652", "zh": "桌子" },
          { "label": "chair", "color": "#CC4603", "zh": "椅子" },
          { "label": "sofa", "color": "#0B66FF", "zh": "沙发" },
          { "label": "door", "color": "#08FF33", "zh": "门" },
        ]
      },
      // 表单验证状态
      formErrors: {
        viewType: false,
        styleCategory: false,
        basemapUrl: false,
      },

      // 套索功能增强
      lassoMode: "polygon",
      selectionMode: "new",
      lassoDrawing: false,
      lassoPath: [],
      fixedPoints: [], // 新增：存储固定的点
      tempPoint: null, // 新增：存储临时点（鼠标移动时的点）
      isFirstPoint: true, // 新增：是否是第一个点
      savedCanvasData: null, // 保存的画布数据，用于预览线绘制
      lassoCanvasReady: false,
      mousePosition: { x: 0, y: 0 },
      selections: [], // 保存的选区列表
      currentSelection: null, // 当前活动选区
      selectionVisible: true, // 选区可见性
      featherRadius: 0, // 羽化半径
      tolerance: 10, // 磁性套索容差

      // 自由套索状态
      isMouseDown: false,
      lastDrawTime: 0,

      // 多边形套索拖拽状态
      polygonStartPoint: null, // 鼠标按下的起始点

      // 蚂蚁线动画
      antLineOffset: 0,
      antLineTimer: null,

      // 自由涂抹状态
      paintCanvasReady: false,
      isPainting: false,
      paintPath: [], // 当前涂抹路径
      brushPath: [], // 存储涂抹路径
      brushSize: 20, // 涂抹笔刷大小
      lastPoint: null,
      // 统一的颜色和透明度设置 - 使用完全不透明的颜色确保一致
      baseColor: { r: 87, g: 81, b: 220, a: 1.0 }, // 基础颜色RGBA值，使用不透明确保一致性
      paintColor: "rgba(87,81,220,1.0)", // 与套索工具相同的颜色，完全不透明
      thumbScrollLeft: 0,
      isDraggingThumb: false,
      activeName: "left",

      historyStack: [], // 保存绘图历史
    };
  },
  computed: {
    // 将 Vuex 中保存的参数映射到本组件
    ...mapState("generation", ["generationParams"]),
    canClickPsd() {
      // 遍历thumbnails找到和图像展示区展示的是生成的图地址一样并且有语义分割图才可以点击

            return this.thumbnails.some(item => {
      return item.url === this.previewImage && item.segmentation
    })

    }
  },
  created() {
    // laravelEcho.connector.pusher.connection.bind("connected", () => {
    //   console.log("WebSocket 已连接");
    // });

    getPerspectiveStyle().then((res) => {
      console.log("风格类别", res.data);
      this.perspectiveOptions = res.data.map((item) => ({
        label: item.name,
        value: item.id,
        raw: item,
      }));
      this.viewType = this.perspectiveOptions[0].value;
      this.updateStyleOptions();
    });
    // 如果 Vuex 已经保存过参数，则同步到本页
    this.applyStoredParams();
  },
  watch: {
    // 监听套索模式变化
    lassoMode(newMode) {
      if (this.currentTool === "line") {
        this.showLassoModeMessage();
        this.clearLassoPath();
        this.initLassoCanvas();
      }
    },
    // 风格迁移隐藏时将控制程度置0
    styleTransferEnabled(val) {
      if (val) {
        //非我的项目传值控制
        if (this.styleTransferLevel === 0) {
          this.progress = 5;
        }
      } else {
        this.styleTransferLevel = 0;
      }
    },
    // 以下字段变化时实时保存到 Vuex
    promptText(val) {
      this.saveParam({ promptText: val });
    },
    viewType(val) {
      this.saveParam({ viewType: val });
    },
    styleCategory(val) {
      this.saveParam({ styleCategory: val });
    },
    resolution(val) {
      this.saveParam({ resolution: val });
    },
    aspectRatio(val) {
      this.saveParam({ aspectRatio: val });
    },
    baseControlLevel(val) {
      this.saveParam({ baseControlLevel: val });
    },
    styleTransferLevel(val) {
      this.saveParam({ styleTransferLevel: val });
    },
    basemapUrl(val) {
      this.saveParam({ basemapUrl: val });
    },
    styleImgUrl(val) {
      this.saveParam({ styleImgUrl: val });
    },
    semanticImgUrl(val) {
      this.saveParam({ semanticImgUrl: val });
    },
    basemapUrlId(val) {
      this.saveParam({ basemapUrlId: val });
    },
    styleImageId(val) {
      this.saveParam({ styleImageId: val });
    },
    semanticImgUrlId(val) {
      this.saveParam({ semanticImgUrlId: val });
    },
  },
  mounted() {

    // 组件挂载后设置默认风格类别
    this.initializeStyleCategory();

    // 添加键盘事件监听
    window.addEventListener("keydown", this.handleKeyDown);

    // 初始化滚动圆点位置
    this.$nextTick(() => {
      this.onThumbScroll();
    });
  },
  beforeDestroy() {
    // 移除键盘事件监听
    window.removeEventListener("keydown", this.handleKeyDown);

    // 清除轮询定时器，防止内存泄漏
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
  },
  // 如果组件用了 <keep-alive>，需要在再次激活时同步一次
  activated() {
    // keep-alive 场景下返回页面再次同步
    this.applyStoredParams();
  },
  methods: {
    downloadPNG,
    // 将 Vuex mutation 映射为本地方法
    ...mapMutations("generation", { setParams: "setGenerationParams" }),

    // 保存参数到 Vuex
    saveParam(part) {
      this.setParams({ ...this.generationParams, ...part });
    },
    // 页面激活或首次进入时，把 Vuex 中存储的参数写回表单
    applyStoredParams() {
      console.log("applyStoredParams");
      const p = this.generationParams || {};
      if (!Object.keys(p).length) return;

      this.promptText = p.promptText || this.promptText;
      if (p.viewType) {
        this.viewType = p.viewType;
        // 更新风格选项后再赋值类别
        this.updateStyleOptions();
      }
      // if (p.styleCategory) this.styleCategory = p.styleCategory; 风格类固定显示通用
      if (p.resolution) this.resolution = p.resolution;
      if (p.aspectRatio) this.aspectRatio = p.aspectRatio;
      // 风格迁移控制程度：不为0开启
      if (p.semanticImgUrlId) {
        this.styleTransferLevel = p.styleTransferLevel;
        this.styleTransferEnabled = true;
      }

      if (p.baseControlLevel) this.baseControlLevel = p.baseControlLevel;
      // 清空画廊
      this.thumbnails = Array.from({ length: 6 }, (_, i) => ({
        url: null,
        id: `thumb-${i + 1}`   // 用反引号包裹整个字符串
      }));
      if (p.basemapUrl) {
        this.basemapUrl = p.basemapUrl;
        // 更新缩略图第一个位置（底图）
        this.$set(this.thumbnails, 0, { url: p.basemapUrl });
      }
      if (p.semanticImgUrl) {
        this.semanticImgUrl = p.semanticImgUrl;
        // 更新缩略图第二个位置（语义分割图）
        this.$set(this.thumbnails, 1, { url: p.semanticImgUrl });
        this.previewImage = p.semanticImgUrl;
      }
      if (p.styleImgUrl) this.styleImgUrl = p.styleImgUrl;
      if (p.basemapUrlId) {
        this.basemapUrlId = p.basemapUrlId;
      }
      log
      if (p.semanticImgUrlId) {
        this.semanticImgUrlId = p.semanticImgUrlId;
      }
      if (p.styleImageId) {
        this.styleImageId = p.styleImageId;
      }
      console.log("页面激活或首次进入时this.thumbnails", this.thumbnails);
    },
    // 查看更多
    goToDetail() {
      this.$router.push("/generateDetail");
    },
    // 自动识别
    automaticRecognition() {
      // 若尚未上传底图图则阻止调用
      if (!this.basemapUrl) {
        this.$message.warning("请先上传底图后再使用自动识别");
        return;
      }
      const rawFiles = this.$refs.uploadRef.getRawFiles();
      console.log("rawFiles", rawFiles);
      // 调用后端接口获取 base64 图
      preprocessSegment(rawFiles[0]).then((res) => {
        console.log("automaticRecognition", res);

        // 1. 兼容不同字段结构，优先取 res.data
        let base64Str = res.data;

        // 3. 更新预览图
        if (base64Str) {
          this.previewImage = base64Str;

          // 4. 同步更新缩略图第 2 张（语义分割图）
          this.$set(this.thumbnails, 1, { url: base64Str });

          // 5. 更新分割图 URL 方便后续操作
          this.semanticImgUrl = base64Str;
        }
      });
    },
    updateStyleOptions(e) {
      console.log("updateStyleOptions", e);
      // 保存视角类型


    },
    switchSemantic() {
      console.log("switchSemantic", this.semanticEnabled);
      this.semanticEnabled = !this.semanticEnabled;
    },
    // 十六进制 -> RGB
    hexToRgb(hex) {
      const cleanHex = hex.replace("#", "");
      const bigint = parseInt(cleanHex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    },

    // 获取统一颜色，可自定义透明度（默认 0.6 用于填充/描边）
    getUnifiedColor(opacity = 0.6) {
      const { r, g, b } = this.baseColor;
      return `rgba(${r},${g},${b},${opacity})`;
    },

    // 重新给所有已绘制区域整体着色
    recolorCanvas(rgbaColor) {
      const canvases = [this.$refs.lassoCanvas, this.$refs.paintCanvas];
      canvases.forEach((canvas) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = rgbaColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      });
    },

    // 设置统一的绘制样式 - 确保套索边框为圆角
    setUnifiedDrawStyle(ctx, opacity = 0.6) {
      // 强制使用完全相同的硬编码设置
      const exactColor = "rgba(87, 81, 220, 0.6)"; // 固定颜色，不使用参数

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = exactColor;
      ctx.fillStyle = exactColor;
      ctx.lineCap = "round"; // 圆角端点
      ctx.lineJoin = "round"; // 圆角连接

      // 记录绘制设置到控制台便于调试
      console.log("统一绘制设置:", {
        exactColor,
        globalCompositeOperation: ctx.globalCompositeOperation,
        globalAlpha: ctx.globalAlpha,
      });
    },

    // 统一的填充方法
    drawUnifiedFill(ctx, points, opacity = 0.6) {
      if (!points || points.length < 3) return;

      // 使用完全相同的硬编码设置
      const exactColor = "rgba(87, 81, 220, 0.6)";
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = exactColor;

      // 绘制填充区域
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.fill();
    },

    // 绘制连续的涂抹路径（模拟连续填充效果）
    drawContinuousCircles(ctx, startPoint, endPoint, radius, isEraser = false) {
      // 使用线段连接两点，然后用粗线条模拟填充效果
      ctx.lineWidth = radius * 2; // 线条宽度等于圆的直径
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();

      // 在端点补充圆形确保完整覆盖
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, radius, 0, Math.PI * 2);
      ctx.fill();
    },

    // 列表查询方法
    // fetchSalesOrTransfer(query) {
    //   // 调用导入的接口函数获取数据
    //   salesOrTRansferQuery(query).then((res) => {
    //     this.tableData = res.data.list;
    //   });
    // },
    styleFormat(row) {
      const statusMap = {
        1: "通用",
      };
      return statusMap[row] || "";
    },
    // // 初始化风格类别
    initializeStyleCategory() {
      const options = this.styleOptions;
      if (options.length > 0 && !this.styleCategory) {
        this.styleCategory = options[0].value; // 设置为第一个选项
      }
    },
    // 生成图片
    cleanup() {
      this.isGenerating = false;
      this.$refs["globalMask-thumb-3"][0].hide();
    },

    // 主生成方法
    async handleGenerate() {

      // 1. 重置错误状态
      this.formErrors = {
        viewType: false,
        basemapUrl: false,
      };

      // 2. 检查必填项
      let hasError = false;
      if (!this.viewType) {
        this.formErrors.viewType = true;
        hasError = true;
      }
      if (!this.basemapUrl) {
        this.formErrors.basemapUrl = true;
        hasError = true;
      }
      if (hasError) {
        this.$msgbox({
          title: "请进行有效操作",
          message: "请输入视角类型和上传底图生成图片。",
          confirmButtonText: "返回",
          type: "warning",
          showCancelButton: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
        });
        return;
      }

      // 构造请求体
      const payload = {
        generation_category_id: this.viewType,
        base_image_id: this.basemapUrlId,
        prompt: this.promptText,
        scale: this.resolution,
        // batch_size: 1,
        generate_count: this.generateCount,
        // seg: this.semanticEnabled,
        aspect_ratio: this.aspectRatio,
      };

      // 控制程度不为0时传入
      if (this.baseControlLevel !== 0) {
        payload.base_image_control_weight = this.baseControlLevel;
      }
      // 风格图开关关闭时不传入
      if (this.styleTransferEnabled) {
        if (!this.styleImageId) {
          this.$message.warning("启用风格迁移时请上传风格图");
          return;
        }

        if (this.styleTransferLevel === 0) {
          this.$message.warning("风格迁移控制程度 > 0 时才能启用风格迁移");
          return;
        }

        payload.style_image_control_weight = this.styleTransferLevel;
        payload.style_image_id = this.styleImageId;
      }

      // 判断用户是否启用语义分割
      if (this.semanticEnabled) {
        // 是否上传了语义分割图
        if (this.thumbnails[1] && this.thumbnails[1].url) {
          if (!this.thumbnails[1].url.startsWith('data:') || !this.thumbnails[1].url.includes(';base64,')) {

            const base64 = await blobUrlToBase64(this.thumbnails[1].url);
            this.$set(this.thumbnails, 1, { url: base64 });
            this.semanticImgUrl = base64;
            payload.segment_image = base64;
          } else {
            payload.segment_image = this.thumbnails[1].url
          }

        } else {
          this.$message.warning("启用语义分割时请上传语义分割图");
          return;
        }
      } else {
        // 如果没有启用语义分割，则不传递 segment_image 字段
        // payload.segment_image = null;
      }

      // 3. 开始请求前：设置状态 + 显示遮罩
      this.isGenerating = true;
      //索引 2 位置插入一个图片位置
      this.thumbnails.splice(2, 0, { url: "", id: "globalMask-thumb-3" });
      this.$nextTick(() => {
        this.$refs["globalMask-thumb-3"][0].show("生成中...");
      });
      try {
        const res = await generateImages(payload);
        // 5. 校验接口返回
        if (res && res.generation_request_id) {
          this.$message.success("开始生成图片...");
          this.startPolling(res.generation_request_id); // 轮询生成结果
        }
      } catch (err) {
        // 6. 异常处理
        console.error("生成接口错误:", err);
        this.cleanup();
        // 删除第三个位置
        this.thumbnails.splice(2, 1);
      }
    },

    // ===== 轮询相关 =====
    startPolling(requestId) {
      // 若已有轮询，先清除
      if (this.pollingTimer) {
        clearInterval(this.pollingTimer);
        this.pollingTimer = null;
      }

      this.pollingTimer = setInterval(() => {
        getImageDetail(requestId)
          .then((res) => {
            const status = res.data.status;

            if (status === "completed") {
              // 停止轮询
              clearInterval(this.pollingTimer);
              this.pollingTimer = null;
              const imageUrls = res.data.generated_images.map((item) => item);
              imageUrls.forEach((item, idx) => {
                // 生成图倒序排列，索引为2
                this.thumbnails.splice(2, 1, {...item,semanticImgUrlId: res.data.segment_image_id});
              });
              this.cleanup()
              // 保存 语义分割图
              // 判断后端是否传递回来了语义分割图的URL
              if (res.data && res.data.segment_image_id) {
                this.semanticImgUrlId = res.data.segment_image_id;
              }
              this.$message.success("图片生成完成！");
            } else if (status === "failed") {
              clearInterval(this.pollingTimer);
              this.pollingTimer = null;
              this.$message.error("图片生成失败！");
              this.cleanup()
              // 删除第三个位置
              this.thumbnails.splice(2, 1);
            }
            // 如果是其他状态（比如 "pending"），继续轮询
          })
          .catch((err) => {
            console.error("轮询 getImageDetail 失败", err);
            clearInterval(this.pollingTimer);
            this.pollingTimer = null;
            this.$message.error("生成过程中出现错误，请重试");

            this.cleanup()
            // 删除第三个位置
            this.thumbnails.splice(2, 1);
          });
      }, 4000); // 每4秒轮询一次
    },

    stopPolling() {
      if (this.pollingTimer) {
        clearInterval(this.pollingTimer);
        this.pollingTimer = null;
      }
    },

    // 选择缩略图
    selectThumbnail(params, index) {
      // 若选择底图（索引 0）直接返回
      // if (index === 0) return;

      // 若该缩略图为空，则不做任何操作（不更新预览）
      const thumb = this.thumbnails[index];
      if (!thumb || !thumb.url) {
        return;
      }

      // 仅当非底图 / 语义图且有实际图片时才跳转详情
      // if (index !== 0 && index !== 1) {
      //   console.log("thumb", thumb);
      //   this.$router.push("/generateDetail?id=" + thumb.id);
      // }

      // 更新主预览图
      this.previewImage = params.url;

      // 保存当前画布状态
      const currentCanvasState = {
        paint: this.$refs.paintCanvas
          ? this.$refs.paintCanvas.toDataURL()
          : null,
        lasso: this.fixedPoints,
      };
    },

    downloadPSD() { },

    // 工具选择
    setTool(tool) {
      if (!this.isActionAllowed()) {
        return;
      }

      // 智能选区（smart）与套索工具共享同一套索画布逻辑
      if (tool === "smart") {
        if (!this.previewImage) {
          this.$message.warning("请先上传图片后再使用智能选区");
          return;
        }

        // 若之前已经是智能选区，再次点击表示重新开始
        if (this.currentTool === "smart") {
          this.clearLassoPath();
          this.initLassoCanvas();
        }

        // 初始化套索画布（智能选区同用）
        if (!this.lassoCanvasReady) {
          this.initLassoCanvas();
        }

        // 激活套索画布
        if (this.$refs.lassoCanvas) {
          const lassoCanvas = this.$refs.lassoCanvas;
          lassoCanvas.classList.add("canvas-active");
          lassoCanvas.style.pointerEvents = "auto";
          lassoCanvas.style.zIndex = "200";
        }
        // 停用涂抹画布交互（但保持可见）
        if (this.$refs.paintCanvas) {
          this.$refs.paintCanvas.classList.remove("canvas-active");
          this.$refs.paintCanvas.style.pointerEvents = "none";
          this.$refs.paintCanvas.style.zIndex = "100";
        }

        this.$message.success("智能选区已激活！点击选择区域");
      }
      // 如果选择套索工具，检查是否有预览图片
      else if (tool === "line") {
        // 如果当前已经处于套索模式，再次点击表示"重新开始一次新的套索"
        if (this.currentTool === "line") {
          // 清空之前的套索路径并重置画布
          this.clearLassoPath();
          this.initLassoCanvas();
        }
        if (!this.previewImage) {
          this.$message.warning("请先上传图片后再使用套索工具");
          return;
        }
        this.showLassoModeMessage();
        // 只在画布未初始化时才初始化，保留已有内容
        if (!this.lassoCanvasReady) {
          this.initLassoCanvas();
        }
        // 激活套索画布
        if (this.$refs.lassoCanvas) {
          this.$refs.lassoCanvas.classList.add("canvas-active");
          this.$refs.lassoCanvas.style.pointerEvents = "auto";
          this.$refs.lassoCanvas.style.zIndex = "200";
        }
        // 停用涂抹画布
        if (this.$refs.paintCanvas) {
          this.$refs.paintCanvas.classList.remove("canvas-active");
          this.$refs.paintCanvas.style.pointerEvents = "none";
        }
      } else if (tool === "fill") {
        if (!this.previewImage) {
          this.$message.warning("请先上传图片后再使用自由涂抹工具");
          return;
        }

        // 初始化涂抹画布
        if (!this.paintCanvasReady) {
          this.initPaintCanvas();
        }

        // 保持套索画布可见，但禁用交互（继续处于高层级以展示选区）
        if (this.$refs.lassoCanvas) {
          const lassoCanvas = this.$refs.lassoCanvas;
          lassoCanvas.classList.add("canvas-active");
          lassoCanvas.style.pointerEvents = "none";
          lassoCanvas.style.zIndex = "200"; // 始终高于涂抹画布
        }

        // 激活涂抹画布
        if (this.$refs.paintCanvas) {
          const paintCanvas = this.$refs.paintCanvas;
          paintCanvas.classList.add("canvas-active");
          paintCanvas.style.pointerEvents = "auto";
          paintCanvas.style.cursor = "crosshair";

          // 强制更新画布样式
          this.$nextTick(() => {
            paintCanvas.style.position = "absolute";
            paintCanvas.style.top = "0";
            paintCanvas.style.left = "0";
            paintCanvas.style.width = "100%";
            paintCanvas.style.height = "100%";
            paintCanvas.style.zIndex = "100"; // 保持低于套索画布
          });
        }

        this.$message.success("自由涂抹工具已激活！按住鼠标拖拽进行涂抹");
      } else if (tool === "eraser") {
        if (!this.previewImage) {
          this.$message.warning("请先上传图片后再使用橡皮擦工具");
          return;
        }
        // 初始化涂抹画布（如未初始化）
        if (!this.paintCanvasReady) {
          this.initPaintCanvas();
        }
        // 保持套索画布可见但禁用交互
        if (this.$refs.lassoCanvas) {
          const lassoCanvas = this.$refs.lassoCanvas;
          lassoCanvas.classList.add("canvas-active");
          lassoCanvas.style.pointerEvents = "none";
          lassoCanvas.style.zIndex = "200";
        }
        // 激活涂抹画布
        if (this.$refs.paintCanvas) {
          const paintCanvas = this.$refs.paintCanvas;
          paintCanvas.classList.add("canvas-active");
          paintCanvas.style.pointerEvents = "auto";
          paintCanvas.style.cursor = "crosshair";
          // 确保样式刷新
          this.$nextTick(() => {
            paintCanvas.style.position = "absolute";
            paintCanvas.style.top = "0";
            paintCanvas.style.left = "0";
            paintCanvas.style.width = "100%";
            paintCanvas.style.height = "100%";
            paintCanvas.style.zIndex = "100"; // 保持低于套索画布
          });
        }
        this.$message.success("橡皮擦已激活！按住鼠标拖拽进行擦除");
      } else {
        // 切换到其他工具时停用所有画布
        if (this.$refs.lassoCanvas) {
          const lassoCanvas = this.$refs.lassoCanvas;
          lassoCanvas.classList.remove("canvas-active");
          lassoCanvas.style.pointerEvents = "none";
        }
        if (this.$refs.paintCanvas) {
          const paintCanvas = this.$refs.paintCanvas;
          paintCanvas.classList.remove("canvas-active");
          paintCanvas.style.pointerEvents = "none";
        }
        this.$message.info(`选择工具: ${this.getToolName(tool)}`);
      }

      this.currentTool = tool;
    },

    // 工具悬停处理
    onToolHover(tool, isHover) {
      this.$set(this.toolHoverStates, tool, isHover);
    },

    // 获取工具中文名称
    getToolName(tool) {
      const toolNames = {
        smart: "智能选区",
        line: "套索",
        fill: "自由涂抹",
        eraser: "擦除",
        clear: "清空",
      };
      return toolNames[tool] || tool;
    },

    // 显示套索模式提示消息
    showLassoModeMessage() {
      const messages = {
        freehand: "自由套索已激活！按住鼠标拖拽绘制选区",
        polygon: "多边形套索已激活！点击添加顶点，双击或右键完成",
        magnetic: "磁性套索已激活！按住鼠标拖拽，会自动吸附到边缘",
      };

      const message = messages[this.lassoMode] || "套索工具已激活";
      this.$message.success(message);
    },

    // 键盘事件处理
    handleKeyDown(event) {
      // 只在套索工具激活时响应键盘事件
      if (this.currentTool !== "line" || !this.lassoCanvasReady) {
        return;
      }

      switch (event.key) {
        case "Backspace":
        case "Delete":
          // 撤销部分路径
          event.preventDefault();
          this.undoLastPoint();
          break;
        case "Escape":
          // 清空所有顶点
          event.preventDefault();
          if (this.lassoPath.length > 0) {
            this.clearLassoPath();
            this.initLassoCanvas();
            this.$message.info("已清空直边套索");
          }
          break;
      }
    },

    // 清空画布
    clearCanvas() {
      if (!this.isActionAllowed()) {
        return;
      }
      // 保存当前画布状态到历史栈中
      const canvas = this.$refs.lassoCanvas;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, this.$refs.lassoCanvas.width, this.$refs.lassoCanvas.height);
      this.historyStack.push(imageData);

      // 所有绘制内容（套索、涂抹、擦除）都在同一张画布上，统一清除
      // 清空套索画布（包含所有内容）
      if (this.$refs.lassoCanvas) {
        this.clearLassoPath();
        this.initLassoCanvas();
      }

      // paintCanvas 现在不再使用，无需清除

      this.$message.success("已清空所有选区、涂抹及擦除内容");

      // 停用所有画布交互，要求用户重新选择工具
      if (this.$refs.lassoCanvas) {
        const lassoCanvas = this.$refs.lassoCanvas;
        lassoCanvas.classList.remove("canvas-active");
        lassoCanvas.style.pointerEvents = "none";
      }

      if (this.$refs.paintCanvas) {
        const paintCanvas = this.$refs.paintCanvas;
        paintCanvas.classList.remove("canvas-active");
        paintCanvas.style.pointerEvents = "none";
      }

      // 重置当前工具，让用户显式再次选择
      this.currentTool = "";
    },

    // 撤销画布
    undoCanvas() {
      if (this.historyStack.length === 0) {
        this.$message.warning("没有可撤销的操作");
        return;
      }
      const canvas = this.$refs.lassoCanvas;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const lastImage = this.historyStack.pop();
      ctx.putImageData(lastImage, 0, 0);

      // 重置当前工具，让用户显式再次选择
      this.currentTool = "";
    },
    // 颜色选择
    selectGroundColor(color) {
      this.selectedGroundColor = color;
    },

    selectWaterColor(color) {
      if (!this.isActionAllowed()) {
        return;
      }


      // 若重复点击相同颜色，直接返回，避免再次着色导致视觉加深
      if (color === this.selectedWaterColor) return;

      this.selectedWaterColor = color;

      // 更新基准颜色 (保持 alpha 不变)
      const { r, g, b } = this.hexToRgb(color);
      this.baseColor = { ...this.baseColor, r, g, b };
      this.paintColor = `rgba(${r},${g},${b},1)`;

      // 重新给已绘制区域整体着色 (填充透明度 0.6)
      this.recolorCanvas(this.getUnifiedColor(0.6));
    },

    // 校验是都可以使用语义分割功能
    isActionAllowed() {


      if (this.previewImage !== this.thumbnails[1].url) {
        //不可点击
        this.$message.warning("请从预览区选择语义分割图后操作");
        return false;
      } else {
        return true;
      }
    },

    // 切换收藏状态
    async toggleFavorite(id) {

      try {
        await collectImage({ generated_image_id })
        this.$set(this.favoriteStates, index, !this.favoriteStates[index]);
        const message = this.favoriteStates[index] ? "已收藏" : "取消收藏";
        this.$message.success(`图片 ${index + 1} ${message}`);
        console.log("切换收藏:", index, this.favoriteStates[index]);
      } catch (error) {

      }

    },

    // 收藏悬停处理
    onFavoriteHover(index, isHover) {
      // 设置悬停状态，不影响实际收藏状态
      this.$set(this.favoriteHoverStates, index, isHover);
    },

    // 删除悬停处理
    onDeleteHover(index, isHover) {
      this.$set(this.deleteHoverStates, index, isHover);
    },

    // 删除缩略图
    deleteThumbnail(index) {
      this.$confirm(
        "你确认要删除图片吗？<br/>删除图片，图片将会从系统中移除。",
        "确认删除图片",
        {
          confirmButtonText: "确认删除",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          showConfirmButton: true,
          closeOnClickModal: false,
          closeOnPressEscape: false,
        }
      )
        .then(async () => {

          await deleteGeneratedImage(this.thumbnails[index].id);
          // 确认删除：将对应位置设为null
          this.$set(this.thumbnails, index, { url: null });

          // 如果删除的是当前预览的图片，清空预览
          if (this.selectedThumbnail === index) {
            this.previewImage = null;
            this.selectedThumbnail = -1;
          }

          this.$message.success("删除成功");
          console.log("删除缩略图:", index);
        }

        )
        .catch(() => {
          // 取消删除：弹框消失，不做任何操作
          console.log("取消删除缩略图:", index);
        });
    },

    // 底图上传成功处理
    async onBasemapUpload(uploadData, type) {
      console.log("接收到上传事件:", uploadData);
      // 兼容不同的数据格式
      let imageUrl;
      imageUrl = uploadData.imageUrl;
      // 清除套索路径（图片更换时）
      this.clearLassoPath();
      // 更新底图URL
      if (type === 1) {
        this.basemapUrl = imageUrl;
        this.basemapUrlId = uploadData.res.data.id;
        // 清除底图错误状态
        this.formErrors.basemapUrl = false;

        // 更新缩略图第一个位置（底图）
        this.$set(this.thumbnails, 0, { url: imageUrl });
        // 更新主预览图
        this.previewImage = imageUrl;
      } else if (type === 2) {
        this.styleImageId = uploadData.res.data.id;
        this.styleImgUrl = imageUrl;
        // 清除底图错误状态
        this.formErrors.styleImgUrl = false;
        this.$message.success("风格图上传成功！");
      } else if (type === 3) {
        // ***更新语义分割图URL 用户上传后服务器不保存，使用该图生成后才保存

        // this.semanticImgUrl = imageUrl;
        // this.semanticImgUrlId = uploadData.res.data.id;
        // console.log("semanticImgUrlId", this.semanticImgUrlId);
        // blobUrlToBase64(imageUrl).then(base64 => {
        //   // 更新主预览图
        //   this.previewImage = base64;
        //   // 更新缩略图第二个位置（语义分割图）
        //   this.$set(this.thumbnails, 1, { url: base64 });
        //   this.$message.success("语义分割图上传成功，已更新到缩略图和预览区域！");
        // })
        //   .catch(err => {
        //     this.$message.error("语义分割图上传失败");
        //   });

      }
      // 重新初始化所有canvas以支持工具切换时的叠加效果
      this.$nextTick(() => {
        this.initLassoCanvas();
        this.initPaintCanvas();
      });
      console.log("previewImage", this.previewImage);
      const base64 = await blobUrlToBase64(this.thumbnails[1].url);
      this.basemapUrlBase64 = base64;
    },

    // 底图URL更新处理（备用方法）
    onBasemapUrlUpdate(imageUrl) {
      console.log("底图URL更新:", imageUrl);

      if (!imageUrl) {
        return;
      }

      // 清除底图错误状态
      this.formErrors.basemapUrl = false;

      // 更新缩略图第一个位置（底图）
      this.$set(this.thumbnails, 0, { url: imageUrl });

      // 检查语义分割开关状态，只有开启时才自动传输到语义分割图框
      if (this.semanticEnabled) {
        // 将底图自动传输到语义分割图位置（索引1）
        this.$set(this.thumbnails, 1, { url: imageUrl });
        console.log(
          "语义分割开关已开启，底图已通过URL更新自动传输到语义分割图框"
        );
      } else {
        console.log("语义分割开关未开启，跳过URL更新的自动传输到语义分割图框");
      }

      // 更新主预览图
      this.previewImage = imageUrl;

      console.log("通过URL更新事件更新缩略图成功");
    },

    // 语义分割图上传成功处理
    onSemanticUpload(uploadData) {
      console.log("接收到语义分割图上传事件:", uploadData);

      // 兼容不同的数据格式
      let imageUrl;
      if (typeof uploadData === "string") {
        imageUrl = uploadData;
      } else if (uploadData && uploadData.imageUrl) {
        imageUrl = uploadData.imageUrl;
      } else {
        console.error("无法获取语义分割图片URL:", uploadData);
        this.$message.error("语义分割图片上传失败，无法获取图片URL");
        return;
      }

      // 更新语义分割图URL
      this.semanticImgUrl = imageUrl;

      // 更新缩略图第二个位置（语义分割图）
      this.$set(this.thumbnails, 1, { url: imageUrl });

      // 更新主预览图
      this.previewImage = imageUrl;

      this.$message.success("语义分割图上传成功，已更新到缩略图和预览区域！");
      console.log("语义分割图上传成功，图片URL:", imageUrl);
    },

    // 语义分割图URL更新处理（备用方法）
    onSemanticUrlUpdate(imageUrl) {
      console.log("语义分割图URL更新:", imageUrl);

      if (!imageUrl) {
        return;
      }

      // 更新缩略图第二个位置（语义分割图）
      this.$set(this.thumbnails, 1, { url: imageUrl });

      // 更新主预览图
      this.previewImage = imageUrl;

      console.log("通过URL更新事件更新语义分割图缩略图和预览区域成功");
    },

    // 删除图片处理
    onImageDelete(type) {
      let imageId = "";

      if (type === 1) {
        imageId = this.basemapUrlId;
      } else if (type === 2) {
        imageId = this.styleImageId;
      } else if (type === 3) {
        imageId = this.semanticImgUrlId;
      }

      if (!imageId && type !== 3) {
        this.$message.warning("当前没有可删除的图片！");
        return;
      }

      this.$confirm("确定删除当前图片吗？", "提示", { type: "warning" })
        .then(() => {
          let typeStr = "";
          if (type === 1) typeStr = "base";
          else if (type === 2) typeStr = "style";
          else if (type === 3) typeStr = "segment";

          // 调用删除接口

          if (type === 3 && !imageId) {
            // 语义分割图生图之后才需要调用删除接口
          } else {
            // 调用逻辑
            return deleteImage(typeStr, imageId);
          }
        })
        .then(() => {
          if (type === 1) {
            this.basemapUrl = "";
            this.basemapUrlId = null;
            this.$set(this.thumbnails, 0, { url: "" });
          } else if (type === 2) {
            this.styleImgUrl = "";
            this.styleImageId = null;
          } else if (type === 3) {
            this.semanticImgUrl = "";
            this.semanticImgUrlId = null;
            this.$set(this.thumbnails, 1, { url: "" });
          }
          this.previewImage = "";
          this.$message.success("图片删除成功！");

          // 停用所有画布交互，要求用户重新选择工具
          if (this.$refs.lassoCanvas) {
            const lassoCanvas = this.$refs.lassoCanvas;
            lassoCanvas.classList.remove("canvas-active");
            lassoCanvas.style.pointerEvents = "none";
          }

          if (this.$refs.paintCanvas) {
            const paintCanvas = this.$refs.paintCanvas;
            paintCanvas.classList.remove("canvas-active");
            paintCanvas.style.pointerEvents = "none";
          }

          // 重置当前工具，让用户显式再次选择
          this.currentTool = "";
        })
        .catch(error => {
          this.$message.error("删除失败");
        });
    }
    ,
    // 暂存功能 - 将预览图片传输到语义分割图框
    temporaryStore() {
      if (!this.previewImage) {
        this.$message.warning("请先上传图片后再进行暂存");
        return;
      }
      if (!this.isActionAllowed()) {
        return;
      }

      // 获取背景图和涂抹层引用
      const img = this.$refs.previewImg;
      const lassoCanvas = this.$refs.lassoCanvas;
      if (!img || !lassoCanvas) return;


      // 获取图片在页面中的实际显示宽高
      const imgWidth = img.clientWidth;
      const imgHeight = img.clientHeight;

      // 创建临时canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = imgWidth;
      tempCanvas.height = imgHeight;
      const ctx = tempCanvas.getContext('2d');

      // 画背景图
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      ctx.globalAlpha = 0.6; // 设置透明度
      // **关键：将 lassoCanvas 缩放到背景图大小**
      ctx.drawImage(
        lassoCanvas,
        0, 0, lassoCanvas.width, lassoCanvas.height,
        0, 0, imgWidth, imgHeight
      );

      // 生成 base64
      const mergedImageBase64 = tempCanvas.toDataURL('image/png');
      // 将预览图片传输到语义分割图位置（索引1）
      this.$set(this.thumbnails, 1, { url: mergedImageBase64 });
      this.$message.success("图片已暂存到语义分割图框！");
      // 更新预览区
      this.selectThumbnail(this.thumbnails[1], 1)

      // 重置当前工具，让用户显式再次选择
      this.currentTool = "";
    },

    // 跳转到详情页面
    // goToDetail() {
    //   this.$router.push({
    //     path: "/example/generate/detail",
    //     query: {
    //       promptText: this.promptText,
    //       viewType: this.viewType,
    //       styleCategory: this.styleCategory,
    //     },
    //   });
    // },

    clearStyleCategoryError() {
      this.formErrors.styleCategory = false;
    },

    // 套索功能相关方法
    onImageLoad() {
      this.$nextTick(() => {
        const img = this.$refs.previewImg;
        if (!img) return;

        const container = img.parentNode;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const containerRatio = containerWidth / containerHeight;

        // 设置图片宽高（短边撑满）
        if (containerRatio > imgRatio) {
          img.style.height = '100%';
          img.style.width = 'auto';
        } else {
          img.style.width = '100%';
          img.style.height = 'auto';
        }

        // **计算图片相对于容器的偏移量**
        const offsetLeft = (containerWidth - img.clientWidth) / 2;
        const offsetTop = (containerHeight - img.clientHeight) / 2;

        // **设置 canvas 尺寸和位置**
        const lassoCanvas = this.$refs.lassoCanvas;
        if (lassoCanvas) {
          lassoCanvas.width = img.clientWidth;
          lassoCanvas.height = img.clientHeight;
          lassoCanvas.style.left = `${offsetLeft}px`;
          lassoCanvas.style.top = `${offsetTop}px`;
          lassoCanvas.style.position = 'absolute'; // 确保定位
        }

        // 再初始化画布
        if (!this.lassoCanvasReady) this.initLassoCanvas();
        if (!this.paintCanvasReady) this.initPaintCanvas();
      });
    }

    ,
    initLassoCanvas() {
      this.$nextTick(() => {
        const canvas = this.$refs.lassoCanvas;
        const img = this.$refs.previewImg;

        if (!canvas || !img) {
          return;
        }

        // 设置canvas尺寸与图片显示尺寸一致
        const rect = img.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // 获取绘图上下文，确保与涂抹颜色完全一致
        const ctx = canvas.getContext("2d");
        // 使用完全相同的硬编码设置
        const exactColor = "rgba(87, 81, 220, 0.6)";
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = exactColor;
        ctx.fillStyle = exactColor;
        ctx.lineCap = "butt"; // 改为直线端点
        ctx.lineJoin = "miter"; // 改为尖角连接
        ctx.lineWidth = 2;

        // 清空路径
        this.lassoPath = [];
        this.brushPath = [];
        this.lassoDrawing = false;

        this.lassoCanvasReady = true;
        console.log("画布初始化完成:", canvas.width, "x", canvas.height);
      });
    },

    initPaintCanvas() {
      this.$nextTick(() => {
        const canvas = this.$refs.paintCanvas;
        const img = this.$refs.previewImg;

        if (!canvas || !img) return;

        const rect = img.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "auto";
        canvas.style.cursor = "crosshair";
        canvas.style.zIndex = "100";

        // 设置画布默认状态，确保与套索相同的颜色和透明度
        const unifiedColor = this.getUnifiedColor(); // 使用统一颜色方法
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1.0; // 颜色本身已包含透明度，保持与套索一致
        ctx.strokeStyle = unifiedColor;
        ctx.fillStyle = unifiedColor;
        ctx.lineWidth = this.brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        this.paintCanvasReady = true;
        console.log("涂抹画布初始化完成:", canvas.width, "x", canvas.height);
      });
    },


    // 更新鼠标事件处理函数
    onCanvasMouseDown(e) {
      if (!this.currentTool) return;
      const point = this.getMousePos(e);

      if (this.currentTool === "brush") {
        this.isMouseDown = true;
        this.brushPath = [point];
        this.drawBrushPath();
      } else if (this.currentTool === "line") {
        // 套索工具逻辑
        if (this.isFirstPoint) {
          // 第一个点
          this.fixedPoints = [point];
          this.isFirstPoint = false;
          const canvas = this.$refs.lassoCanvas;
          const ctx = canvas.getContext("2d");
          const savedCanvasData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          this.historyStack.push(savedCanvasData);
          // 绘制第一个点并保存画布状态
          this.drawCurrentPath(this.$refs.lassoCanvas.getContext("2d"), true);

          // 保存当前画布状态，用于预览线绘制

          this.savedCanvasData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
        this.isMouseDown = true;
      }
    },

    onCanvasMouseMove(e) {
      if (!this.currentTool) return;

      const point = this.getMousePos(e);

      if (this.currentTool === "line") {
        // 更新临时点，但只绘制预览线
        this.tempPoint = point;
        this.drawLassoPreview();
      } else if (this.currentTool === "brush" && this.isMouseDown) {
        this.brushPath.push(point);
        this.drawBrushPath();
      }
    },

    onCanvasMouseUp(e) {
      if (!this.currentTool) return;

      if (this.currentTool === "brush") {
        this.isMouseDown = false;
        const point = this.getMousePos(e);
        this.brushPath.push(point);
        this.drawBrushPath();
      } else if (this.currentTool === "line") {
        // 套索工具逻辑
        if (this.isMouseDown) {
          const point = this.getMousePos(e);
          this.fixedPoints.push(point);
          this.isMouseDown = false;

          // 重新绘制完整路径并保存新的画布状态
          this.drawCurrentPath(this.$refs.lassoCanvas.getContext("2d"), true);

          // 保存新的画布状态，用于下一次预览
          const canvas = this.$refs.lassoCanvas;
          const ctx = canvas.getContext("2d");
          this.savedCanvasData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
      }
    },

    onCanvasMouseLeave(e) {
      if (this.currentTool !== "line") return;

      if (this.lassoMode !== "polygon") {
        this.isMouseDown = false;
        this.lassoDrawing = false;
      }
    },

    onCanvasClick(e) {
      if (this.currentTool !== "line") return;

      // 如果点击了起始点且已经有至少3个点，则闭合路径
      if (this.fixedPoints.length >= 3) {
        const point = this.getMousePos(e);
        const startPoint = this.fixedPoints[0];
        const distance = Math.sqrt(
          Math.pow(point.x - startPoint.x, 2) +
          Math.pow(point.y - startPoint.y, 2)
        );

        if (distance < 10) {
          // 如果点击位置靠近起始点
          this.fixedPoints.push(startPoint); // 添加起始点以闭合
          this.drawCurrentPath(this.$refs.lassoCanvas.getContext("2d"), false);
          // 重置状态
          this.isFirstPoint = true;
          this.fixedPoints = [];
          this.tempPoint = null;
        }
      }
    },

    onCanvasDblClick(e) {
      if (this.currentTool !== "line" || this.lassoMode !== "polygon") return;

      // 双击完成多边形
      if (this.lassoPath.length > 2) {
        this.lassoDrawing = false;
        const canvas = this.$refs.lassoCanvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.drawCurrentPath(ctx, false, true);
      }
    },

    onCanvasRightClick(e) {
      if (this.currentTool !== "line") return;
      e.preventDefault();

      // 如果已绘制至少 3 个顶点，则视为确认选区并结束套索
      if (this.fixedPoints && this.fixedPoints.length >= 3) {
        // 闭合路径
        const canvas = this.$refs.lassoCanvas;
        const ctx = canvas.getContext("2d");

        // 不清除画布，直接在已有内容基础上绘制最终填充区域
        // ctx.clearRect(0, 0, canvas.width, canvas.height); // 注释掉清除操作
        this.drawFinalLassoArea(ctx);

        // 完成后重置状态，准备下一次套索
        this.isFirstPoint = true;
        this.fixedPoints = [];
        this.tempPoint = null;
        this.lassoDrawing = false;

        this.$message.success("套索已完成！");

      } else {
        // 点数不足，按原逻辑视为取消
        this.clearLassoPath();
      }
    },

    // 涂抹相关方法
    onPaintMouseDown(e) {
      console.log("Paint mouse down");
      if (!["fill", "eraser"].includes(this.currentTool)) return;

      // 保存当前画布状态,用于撤销
      const tempCanvas = this.$refs.lassoCanvas;
      const teampCtx = tempCanvas.getContext("2d");
      this.savedCanvasData = teampCtx.getImageData(
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );
      this.historyStack.push(this.savedCanvasData);

      // 直接在套索画布上绘制，确保颜色完全一致
      const canvas = this.$refs.lassoCanvas; // 改为使用套索画布
      if (!canvas) return;
      const pos = this.getMousePos(event);
      this.isPainting = true;
      this.lastPoint = { x: pos.x, y: pos.y };

      // 开始新的路径
      const ctx = canvas.getContext("2d");

      if (this.currentTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.lineWidth = this.brushSize;
        ctx.lineCap = "round"; // 擦除使用圆角端点保持平滑
        ctx.lineJoin = "round"; // 擦除使用圆角连接保持平滑

        // 开始新的擦除路径
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      } else {
        // 自由涂抹：使用丝滑的线条绘制
        const exactColor = "rgba(87, 81, 220, 0.6)";
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = exactColor;
        ctx.lineWidth = this.brushSize;
        ctx.lineCap = "round"; // 涂抹使用圆角端点保持平滑
        ctx.lineJoin = "round"; // 涂抹使用圆角连接保持平滑

        // 开始新的路径用于连续绘制
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }
    },

    onPaintMouseMove(e) {
      if (
        !this.isPainting ||
        !["fill", "eraser"].includes(this.currentTool) ||
        !this.lastPoint
      )
        return;

      // 直接在套索画布上绘制，确保颜色完全一致
      const canvas = this.$refs.lassoCanvas; // 改为使用套索画布
      if (!canvas) return;

      const pos = this.getMousePos(event);

      const ctx = canvas.getContext("2d");

      if (this.currentTool === "eraser") {
        // 橡皮擦：使用丝滑的线条擦除
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.lineWidth = this.brushSize;
        ctx.lineCap = "round"; // 擦除使用圆角端点保持平滑
        ctx.lineJoin = "round"; // 擦除使用圆角连接保持平滑

        // 绘制丝滑的擦除线条
        if (this.lastPoint) {
          ctx.beginPath();
          ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
        }
      } else {
        // 自由涂抹：使用丝滑的线条绘制
        const exactColor = "rgba(87, 81, 220, 0.6)";
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1.0;
        ctx.strokeStyle = exactColor;
        ctx.lineWidth = this.brushSize;
        ctx.lineCap = "round"; // 涂抹使用圆角端点保持平滑
        ctx.lineJoin = "round"; // 涂抹使用圆角连接保持平滑

        // 绘制丝滑的连续线条
        if (this.lastPoint) {
          ctx.beginPath();
          ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
        }
      }
      this.lastPoint = { x: pos.x, y: pos.y };

      console.log("Painting at:", pos.x, pos.y);
    },

    onPaintMouseLeave(e) {
      if (e) {
        e.preventDefault(); // 阻止默认事件
      }
      this.isPainting = false;
      this.lastPoint = null;
    },

    onPaintMouseUp() {
      this.isPainting = false;
      this.lastPoint = null;
      console.log("Finished painting");
    },


    // 处理鼠标事件时的坐标转换
    getMousePos(e) {
      const canvas = this.$refs.lassoCanvas;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
    ,

    // 清空涂抹路径（现在在套索画布上）
    clearPaintPath() {
      this.isPainting = false;
      this.paintPath = [];

      // 涂抹内容现在在套索画布上，与套索内容混合，无法单独清除
      // 如需清除涂抹，需要使用清空按钮清除整个画布
      this.$message.info("涂抹内容已与套索融合，请使用清空按钮清除所有内容");
    },

    // ============ 选区管理 ============
    createSelection() {
      if (this.lassoPath.length < 2) return;

      const selection = {
        id: Date.now(),
        path: [...this.lassoPath],
        mode: this.lassoMode,
        feather: this.featherRadius,
        created: new Date(),
      };

      // 根据选区操作模式处理
      switch (this.selectionMode) {
        case "new":
          this.currentSelection = selection;
          break;
        case "add":
          this.addToSelection(selection);
          break;
        case "subtract":
          this.subtractFromSelection(selection);
          break;
        case "intersect":
          this.intersectWithSelection(selection);
          break;
      }

      // 清空当前绘制路径，确保只显示保存的选区
      this.lassoPath = [];
      this.lassoDrawing = false;
      this.polygonStartPoint = null; // 清空起始点

      // 绘制最终的选区并启动蚂蚁线动画
      this.redrawSelectionOnly();
      this.startAntLineAnimation();
    },

    addToSelection(newSelection) {
      if (!this.currentSelection) {
        this.currentSelection = newSelection;
        return;
      }
      console.log("添加到选区");
    },

    subtractFromSelection(newSelection) {
      if (!this.currentSelection) return;
      console.log("从选区减去");
    },

    intersectWithSelection(newSelection) {
      if (!this.currentSelection) return;
      console.log("与选区相交");
    },

    saveSelection() {
      if (!this.currentSelection) {
        this.$message.warning("没有活动选区可保存");
        return;
      }

      this.selections.push({ ...this.currentSelection });
      this.$message.success("选区已保存");
    },

    invertSelection() {
      if (!this.currentSelection) {
        this.$message.warning("没有活动选区可反选");
        return;
      }

      this.$message.success("选区已反选");
    },

    // 蚂蚁线动画
    startAntLineAnimation() {
      if (this.antLineTimer) {
        clearInterval(this.antLineTimer);
      }

      this.antLineTimer = setInterval(() => {
        this.antLineOffset = (this.antLineOffset + 1) % 8;
        if (this.selectionVisible && this.currentSelection) {
          // 只绘制已保存的选区，不绘制当前路径
          this.redrawSelectionOnly();
        }
      }, 100);
    },

    stopAntLineAnimation() {
      if (this.antLineTimer) {
        clearInterval(this.antLineTimer);
        this.antLineTimer = null;
      }
    },

    // 重新绘制选区（保留已有内容，只添加预览）
    redrawSelection(showPreview = false, isComplete = false) {
      const canvas = this.$refs.lassoCanvas;
      const ctx = canvas.getContext("2d");

      // 不清除画布，保留已有的套索背景色和涂抹色
      // 只在上面绘制预览内容

      // 绘制当前选区
      if (this.currentSelection && this.selectionVisible) {
        this.drawSelectionPath(ctx, this.currentSelection, true);
      }

      // 绘制正在绘制的路径预览（只在预览时显示边框，不显示填充）
      if (this.fixedPoints.length > 0) {
        this.drawCurrentPathPreview(ctx, showPreview, isComplete);
      }
    },

    // 只重新绘制已保存的选区（用于蚂蚁线动画）
    redrawSelectionOnly() {
      const canvas = this.$refs.lassoCanvas;
      const ctx = canvas.getContext("2d");

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 只绘制当前选区，不绘制正在绘制的路径
      if (this.currentSelection && this.selectionVisible) {
        console.log("🔄 重新绘制保存的选区，蚂蚁线偏移:", this.antLineOffset);
        this.drawSelectionPath(ctx, this.currentSelection, true);
      }
    },

    // 绘制选区路径
    drawSelectionPath(ctx, selection, withAntLine = false) {
      const path = selection.path;
      if (path.length < 2) return;

      ctx.lineWidth = 2;
      ctx.lineCap = "butt"; // 改为直线端点
      ctx.lineJoin = "miter"; // 改为尖角连接
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over"; // 改为 source-over 避免混合效果

      // 绘制选区边框
      ctx.beginPath();
      if (withAntLine) {
        // 蚂蚁线效果
        ctx.strokeStyle = "#ffffff";
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -this.antLineOffset;
      } else {
        ctx.strokeStyle = this.getUnifiedColor(); // 使用统一颜色方法
        ctx.setLineDash([]);
      }

      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
      }
      ctx.closePath();

      // 填充
      if (selection.feather > 0) {
        // 羽化效果（简化版）
        const gradient = ctx.createRadialGradient(
          path[0].x,
          path[0].y,
          0,
          path[0].x,
          path[0].y,
          selection.feather
        );
        const unifiedColor = this.getUnifiedColor();
        gradient.addColorStop(0, unifiedColor);
        gradient.addColorStop(1, "rgba(87,81,220,0)"); // 透明边缘保持原样
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = this.getUnifiedColor(); // 使用统一颜色方法
      }
      ctx.fill();
      ctx.stroke();

      // 绘制第二层蚂蚁线（黑色）
      if (withAntLine) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -this.antLineOffset + 4;
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      ctx.setLineDash([]);
    },

    // 绘制当前路径预览（只显示边框和顶点，不填充）
    drawCurrentPathPreview(ctx, showPreview, isComplete = false) {
      if (!this.fixedPoints.length) return;

      // 设置预览样式（边框线条）
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 0.8; // 稍微透明一些，区别于已完成的填充
      ctx.strokeStyle = "#5751dc"; // 使用更明显的颜色作为预览
      ctx.fillStyle = "#5751dc";
      ctx.lineCap = "butt"; // 改为直线端点
      ctx.lineJoin = "miter"; // 改为尖角连接
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]); // 虚线边框，表示预览状态

      // 绘制主路径
      ctx.beginPath();
      ctx.moveTo(this.fixedPoints[0].x, this.fixedPoints[0].y);

      // 绘制固定点之间的线段
      for (let i = 1; i < this.fixedPoints.length; i++) {
        ctx.lineTo(this.fixedPoints[i].x, this.fixedPoints[i].y);
      }

      // 如果有临时点，连接到临时点
      if (this.tempPoint) {
        ctx.lineTo(this.tempPoint.x, this.tempPoint.y);
      }

      // 如果有足够的点，闭合路径预览
      if (this.fixedPoints.length >= 2 && this.tempPoint) {
        ctx.lineTo(this.fixedPoints[0].x, this.fixedPoints[0].y);
      }

      ctx.stroke();

      // 恢复实线
      ctx.setLineDash([]);

      // 绘制固定点
      this.fixedPoints.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // 绘制临时点（如果存在）
      if (this.tempPoint) {
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(this.tempPoint.x, this.tempPoint.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 恢复透明度
      ctx.globalAlpha = 1.0;
    },

    // 优化的套索绘制方法，确保边框是平滑直线
    drawCurrentPath(ctx, showPreview, isComplete = false) {
      if (!this.fixedPoints.length) return;

      // 设置统一的颜色和透明度
      const exactColor = "rgba(87, 81, 220, 0.6)";
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;

      // 启用抗锯齿，确保线条平滑
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 先绘制填充区域（如果有足够的点）
      if (this.fixedPoints.length >= 2) {
        ctx.fillStyle = exactColor;
        ctx.beginPath();
        ctx.moveTo(this.fixedPoints[0].x, this.fixedPoints[0].y);

        // 连接所有固定点
        for (let i = 1; i < this.fixedPoints.length; i++) {
          ctx.lineTo(this.fixedPoints[i].x, this.fixedPoints[i].y);
        }

        // 如果有临时点，连接到临时点
        if (this.tempPoint) {
          ctx.lineTo(this.tempPoint.x, this.tempPoint.y);
        }

        // 闭合到起始点
        ctx.lineTo(this.fixedPoints[0].x, this.fixedPoints[0].y);
        ctx.fill();
      }

      // 然后绘制边框 - 确保是完整的一条路径
      ctx.strokeStyle = exactColor;
      ctx.lineCap = "butt"; // 直线端点，确保平滑
      ctx.lineJoin = "miter"; // 尖角连接，确保平滑
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(this.fixedPoints[0].x, this.fixedPoints[0].y);

      // 连接所有固定点
      for (let i = 1; i < this.fixedPoints.length; i++) {
        ctx.lineTo(this.fixedPoints[i].x, this.fixedPoints[i].y);
      }

      // 如果有临时点，连接到临时点
      if (this.tempPoint) {
        ctx.lineTo(this.tempPoint.x, this.tempPoint.y);

        // 如果有足够的点形成闭合路径，回到起始点
        if (this.fixedPoints.length >= 2) {
          ctx.lineTo(this.fixedPoints[0].x, this.fixedPoints[0].y);
        }
      }

      // 绘制边框
      ctx.stroke();

      // 最后绘制固定点
      ctx.fillStyle = exactColor;
      this.fixedPoints.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    },

    // 绘制套索预览（显示预览线和背景色）
    drawLassoPreview() {
      if (!this.fixedPoints.length || !this.tempPoint) return;

      const canvas = this.$refs.lassoCanvas;
      const ctx = canvas.getContext("2d");

      // 保存当前画布状态
      if (!this.savedCanvasData) {
        this.savedCanvasData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
      }

      // 恢复画布到保存的状态（清除之前的预览）
      ctx.putImageData(this.savedCanvasData, 0, 0);

      // 设置绘制样式
      const exactColor = "rgba(87, 81, 220, 0.6)";
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = exactColor;
      ctx.strokeStyle = exactColor;
      ctx.lineWidth = 2;
      ctx.lineCap = "butt"; // 直线端点
      ctx.lineJoin = "miter"; // 尖角连接

      // 如果有足够的点，绘制预览填充区域
      if (this.fixedPoints.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(this.fixedPoints[0].x, this.fixedPoints[0].y);

        // 连接所有固定点
        for (let i = 1; i < this.fixedPoints.length; i++) {
          ctx.lineTo(this.fixedPoints[i].x, this.fixedPoints[i].y);
        }

        // 连接到临时点
        ctx.lineTo(this.tempPoint.x, this.tempPoint.y);

        // 闭合到起始点
        ctx.lineTo(this.fixedPoints[0].x, this.fixedPoints[0].y);

        // 填充预览背景色
        ctx.fill();
      }

      // 绘制预览边框
      ctx.beginPath();
      ctx.moveTo(this.fixedPoints[0].x, this.fixedPoints[0].y);

      // 连接所有固定点
      for (let i = 1; i < this.fixedPoints.length; i++) {
        ctx.lineTo(this.fixedPoints[i].x, this.fixedPoints[i].y);
      }

      // 连接到临时点
      ctx.lineTo(this.tempPoint.x, this.tempPoint.y);

      // 如果有足够的点，显示闭合预览线
      if (this.fixedPoints.length >= 2) {
        ctx.lineTo(this.fixedPoints[0].x, this.fixedPoints[0].y);
      }

      ctx.stroke();

      // 绘制固定点
      ctx.fillStyle = exactColor;
      this.fixedPoints.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // 绘制临时点
      ctx.beginPath();
      ctx.arc(this.tempPoint.x, this.tempPoint.y, 3, 0, Math.PI * 2);
      ctx.fill();
    },

    // 绘制最终套索区域（填充+直线边框）
    drawFinalLassoArea(ctx) {
      if (!this.fixedPoints || this.fixedPoints.length < 3) return;

      // 设置统一的颜色和样式
      const exactColor = "rgba(87, 81, 220, 0.6)";
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = exactColor;
      ctx.strokeStyle = exactColor;
      ctx.lineCap = "butt"; // 直线端点，确保边框是平滑直线
      ctx.lineJoin = "miter"; // 尖角连接，确保边框是平滑直线
      ctx.lineWidth = 2;

      // 启用抗锯齿，确保线条平滑
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 绘制闭合的填充区域
      ctx.beginPath();
      ctx.moveTo(this.fixedPoints[0].x, this.fixedPoints[0].y);

      for (let i = 1; i < this.fixedPoints.length; i++) {
        ctx.lineTo(this.fixedPoints[i].x, this.fixedPoints[i].y);
      }

      ctx.closePath();

      // 先填充，再描边
      ctx.fill();
      ctx.stroke(); // 添加直线边框
    },

    clearLassoPath() {
      this.fixedPoints = [];
      this.tempPoint = null;
      this.isFirstPoint = true;
      this.isMouseDown = false;
      this.lassoDrawing = false;
      this.savedCanvasData = null; // 重置保存的画布数据

      // 清除canvas内容
      this.$nextTick(() => {
        const canvas = this.$refs.lassoCanvas;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    },

    // 撤销最后一个顶点
    undoLastPoint() {
      if (!this.lassoCanvasReady || this.lassoPath.length === 0) {
        return;
      }

      // 删除最后一个顶点
      this.lassoPath.pop();

      if (this.lassoPath.length === 0) {
        this.lassoDrawing = false;
        const canvas = this.$refs.lassoCanvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.$message.info("套索路径已清除");
      } else {
        this.redrawSelection();
        this.$message.info(`已撤销顶点，剩余${this.lassoPath.length}个顶点`);
      }

      console.log("撤销最后一个顶点，剩余顶点数:", this.lassoPath.length);
    },

    // 开始涂抹
    startPaint(pos) {
      const canvas = this.$refs.paintCanvas;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: true });

      // 重置绘制样式，使用与套索相同的颜色变量
      const unifiedColor = this.getUnifiedColor(); // 使用统一颜色方法
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = unifiedColor;
      ctx.fillStyle = unifiedColor;
      ctx.lineWidth = this.brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // 绘制起始点
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, this.brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    },

    // 继续涂抹
    continuePaint(pos) {
      if (!this.isPainting || !this.lastPoint) return;

      const canvas = this.$refs.paintCanvas;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: true });

      // 重置绘制样式，使用与套索相同的颜色变量
      const unifiedColor = this.getUnifiedColor(); // 使用统一颜色方法
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = unifiedColor;
      ctx.fillStyle = unifiedColor;
      ctx.lineWidth = this.brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // 绘制线段
      ctx.beginPath();
      ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      // 在当前点绘制圆形，使线段连接处更平滑
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, this.brushSize / 2, 0, Math.PI * 2);
      ctx.fill();

      // 更新最后一个点
      this.lastPoint = pos;
    },

    drawBrushPath() {
      if (!this.brushPath.length) return;

      const canvas = this.$refs.lassoCanvas;
      const ctx = canvas.getContext("2d");

      // 使用完全相同的硬编码设置
      const exactColor = "rgba(87, 81, 220, 0.6)";
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = exactColor;
      ctx.fillStyle = exactColor;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // 设置绘制状态
      ctx.lineWidth = this.brushSize;

      // 绘制路径
      ctx.beginPath();
      ctx.moveTo(this.brushPath[0].x, this.brushPath[0].y);

      if (this.brushPath.length === 1) {
        // 单点绘制为圆形
        ctx.arc(
          this.brushPath[0].x,
          this.brushPath[0].y,
          this.brushSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      } else {
        // 绘制路径
        for (let i = 1; i < this.brushPath.length; i++) {
          ctx.lineTo(this.brushPath[i].x, this.brushPath[i].y);
        }
        ctx.stroke();
      }
    },

    // 在工具切换时清理不必要的状态
    onToolChange(tool) {
      this.currentTool = tool;
      this.mousePosition = null;

      if (tool === "line") {
        // 切换到套索工具时重置涂抹路径
        this.brushPath = [];
      }
    },

    onThumbScroll() {
      this.$nextTick(() => {
        const wrapper = this.$refs.thumbWrapper;
        const track = this.$refs.thumbTrack;
        if (!wrapper || !track) return;
        const thumbWidth = 8;
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        if (maxScroll <= 0) {
          this.thumbScrollLeft = 0;
          return;
        }
        const ratio = wrapper.scrollLeft / maxScroll;
        const trackWidth = track.clientWidth - thumbWidth;
        this.thumbScrollLeft = ratio * trackWidth;
      });
    },
    // startThumbDrag(e) {
    //   const track = this.$refs.thumbTrack;
    //   if (!track) return;
    //   this.isDraggingThumb = true;
    //   const onMove = (evt) => {
    //     if (!this.isDraggingThumb) return;
    //     const rect = track.getBoundingClientRect();
    //     const thumbWidth = 8;
    //     let x = evt.clientX - rect.left - thumbWidth / 2;
    //     x = Math.max(0, Math.min(x, rect.width - thumbWidth));
    //     this.thumbScrollLeft = x;
    //     // 计算 scrollLeft
    //     const wrapper = this.$refs.thumbWrapper;
    //     if (wrapper) {
    //       const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    //       const ratio = x / (rect.width - thumbWidth);
    //       wrapper.scrollLeft = ratio * maxScroll;
    //     }
    //   };
    //   const onUp = () => {
    //     this.isDraggingThumb = false;
    //     window.removeEventListener("mousemove", onMove);
    //     window.removeEventListener("mouseup", onUp);
    //   };
    //   window.addEventListener("mousemove", onMove);
    //   window.addEventListener("mouseup", onUp);
    // },
  },
};
</script>

<style  lang="scss" scoped>
.app-container {
  /* // 根据顶部导航栏的高度 */
  height: calc(100vh - 70px);
  margin: 0 10px 0 10px;
  padding: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.logo-text {
  font-size: 16px;
  color: #666;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-item {
  cursor: pointer;
  color: #666;
  font-size: 14px;
}

.nav-item.active {
  color: #000;
  font-weight: 500;
}

.subscribe-btn {
  background: #333;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
}

.user-avatar {
  margin-left: 10px;
}

/* 主要内容区域 */
.content-wrapper {
  height: calc(100vh - 70px);
  /* 使内容区域填满视口（与 .app-container 高度保持一致） */
  padding-bottom: 20px;
}

/* 让内部的 el-row 与 el-col 同样撑满高度，确保 center-panel 能继承到 100% 高度 */
.content-wrapper>.el-row,
.content-wrapper>.el-row>.el-col {
  height: 100%;
}

/* 左侧面板 */
.left-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.28s;
  padding: 0;
  /* 移除内边距 */
  overflow-y: hidden;
  overflow-x: hidden;
  /* 防止横向滚动条 */
  scrollbar-width: thin;
  /* FireFox */
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
  height: 100%;
}

.el-textare.a__inner {
  background: #eee !important;
}

.panel-style {
  width: 100%;
  max-width: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: calc(100vh - 70px);
}

.control-section {
  margin-bottom: 10px;
  width: 100%;
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #dcdfe6;
  background: #fff;
  /* 去除背景色 */
  border-radius: 8px;
}

.section-item {
  width: 100%;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  gap: 6px;
  text-align: left;
  width: 100%;
}

.section-title i {
  color: #999;
  cursor: pointer;
}

.section-content {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

/* 必填项标识样式 */
.required-mark {
  color: #f56c6c;
  font-weight: bold;
  margin-left: 2px;
}

/* 表单错误状态样式 */
.control-section.error {
  border: 1px solid #f56c6c;
  background-color: #fef0f0;
}

.control-section.error .section-title {
  color: #f56c6c;
}

/* 上传区域 */
.upload-area {
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
}

.upload-area .el-upload-dragger {
  width: 100%;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-area .el-upload__text {
  font-size: 12px;
  color: #666;
}

/* 滑块控制 */
.slider-control-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.slider-control {
  margin-left: 10px;
  width: 100%;
  margin-bottom: 10px;
  max-width: 100%;
  /* 限制最大宽度 */
}

/* 进度条样式 */
::v-deep .slider-control .el-progress {
  width: 95%;
  max-width: 95%;
  /* 限制最大宽度 */
}

::v-deep .slider-control .el-progress-bar {
  width: 100%;
  padding-right: 50px;
  /* 为进度数值留出空间 */
  box-sizing: border-box;
  /* 确保padding计入宽度 */
}

.slider-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;
}

.slider-control label {
  display: block;
  font-size: 12px;
  color: #000;
  width: auto;
}

.slider-title i {
  color: #999;
  cursor: pointer;
  font-size: 12px;
}

/* 风格迁移标题样式 */
.transfer-title {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
}

.title-with-tooltip {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 中间面板 */
.center-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* 让 preview-section 填满 el-col */
  height: 100%;
  gap: 15px;
}

.image-preview-area {
  width: 100%;
  /* 填满 */
  max-width: 100%;
  /* 去掉 600px 限制 */
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.preview-main {
  width: 100%;
  height: 400px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e8e9ea;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.empty-preview {
  text-align: center;
  height: 500px;
  color: #999;
}

.empty-preview i {
  font-size: 48px;
  margin-bottom: 10px;
  display: block;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

/* 套索画布样式 */
.lasso-canvas {
  position: absolute;
  top: 0;
  left: 0;
  cursor: crosshair;
  pointer-events: none;
  z-index: 10;
  user-select: none;
  mix-blend-mode: multiply;
}

.lasso-canvas.canvas-active {
  pointer-events: auto;
  z-index: 12;
}

/* 自由涂抹画布样式 */
.paint-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  /* 默认不接收事件 */
  touch-action: none;
  cursor: crosshair;
  opacity: 1;
  mix-blend-mode: normal;
}

.paint-canvas.canvas-active {
  pointer-events: auto;
  /* 激活时接收事件 */
  z-index: 12;
}

/* 缩略图画廊 */
.thumbnail-gallery-wrapper {
  position: relative;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  /* 防止换行 */
  /* 高度自适应缩略图实际高度 */
}

/* 调整轨道和圆点层级 */
.thumb-track {
  z-index: 2;
}

.thumb-dot {
  z-index: 3;
}

.scroll-dot {
  position: absolute;
  bottom: 0px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #000;
  pointer-events: none;
}

.thumbnail-gallery {
  display: grid;
  /* 使用栅格确保始终展示 6 列占满父级 */
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  width: calc(100% - 50px);
}

.thumbnail {
  width: 100%;
  /* 宽高比 12:7 */
  aspect-ratio: 12 / 7;
  /* 父容器固定比例 */
  border: 1px solid #dcdfe6;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .thumb-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* 保持比例，不裁剪，短边撑满 */
    background-color: #fff;
    /* 留白区域显示底色 */
  }
}

.thumbnail.active {
  border-color: #000;
}

.thumbnail img {
  object-fit: cover;
}

/* 缩略图操作按钮 */
.thumbnail-actions {
  position: absolute;
  top: 4px;
  left: 4px;
  display: flex;
  gap: 4px;
  opacity: 1;
}

.action-icon {
  width: 16px;
  height: 16px;
  padding: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
}

.action-icon:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.9);
}

.favorite-icon:hover,
.favorite-icon:active {
  color: #ff6b6b !important;
}

.favorite-icon:hover svg,
.favorite-icon:active svg {
  fill: #ff6b6b !important;
  color: #ff6b6b !important;
}

.delete-icon:hover,
.delete-icon:active {
  color: #f56565 !important;
}

.delete-icon:hover svg,
.delete-icon:active svg {
  fill: #f56565 !important;
  color: #f56565 !important;
}

/* SVG图标样式 */
.action-icon svg {
  width: 14px;
  height: 14px;
  transition: all 0.2s ease;
}

/* 图片标签样式 */
.image-label {
  position: absolute;
  top: 4px;
  left: 2px;
  color: #ccc;
  font-size: 10px;
  padding: 2px 4px;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
}

.generate-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100px;
  /* margin-bottom: 20px; */
  width: 100%;
  position: relative;
}

/* 生成控制 */
.generate-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin: 25px auto 10px;
  gap: 10px;
}

::v-deep .agree-checkbox {
  .el-checkbox__label {
    color: #000;
  }

  .link {
    color: #000;
  }
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #000;
  border-color: #000;
}

::v-deep.el-checkbox {
  border: 1px solid #dcdfe6 !important;
}

::v-deep.el-checkbox.is-bordered.el-checkbox--medium {
  padding: 2px 20px 2px 10px !important;
  border-radius: 4px !important;
  height: 24px !important;
}

::v-deep.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #dcdfe6 !important;
}

::v-deep.el-checkbox.el-checkbox__label {
  font-size: 16px;
  color: #000 !important;
}

::v-deep.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #000 !important;
  border-color: #000 !important;
}

::v-deep.el-checkbox.is-bordered.is-checked {
  border: 1px solid #000 !important;
}

::v-deep.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #000000 !important;
  border: 1px solid #000 !important;
}

/* 对勾样式 */
::v-deep.el-checkbox__inner::after {
  border: 3px solid #fff;
  border-left: 0;
  border-top: 0;
  left: 6px;
  top: 3px;
}

/* 勾选后的边框和背景颜色改为黑色 */
::v-deep.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #000 !important;
  /* 黑色背景 */
  border-color: #000 !important;
  /* 黑色边框 */
}

/* 勾选符号颜色（白色对比黑底） */
::v-deep.el-checkbox__input.is-checked .el-checkbox__inner::after {
  border-color: #fff !important;
}

.generate-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.generate-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 18px;
}

.download-controls {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  right: 0;
  gap: 14px;
  flex: 1;
  z-index: 10;
}

.control-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
}

.count-slider {
  width: 150px;
}

.generate-btn {
  width: 200px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #000;
  color: #000;
  font-size: 18px;
  text-align: center;
  border-radius: 22px;
  cursor: pointer;
}

.generate-btn:hover {
  background: #000 !important;
  color: #fff;
}

.generate-btn.disabled-btn:hover {
  background: inherit !important;
  color: inherit !important;
  cursor: not-allowed;
}

.progress-tip {
  margin-top: 10px;
  padding: 8px 16px;
  background: #f0f9ff;
  border: 1px solid #b3e5fc;
  border-radius: 6px;
  font-size: 12px;
  color: #0277bd;
}

/* 详情链接样式 */
.detail-link {
  margin-top: 20px;
  cursor: pointer;
  color: #000;
  font-size: 14px;
  text-decoration: underline;
  transition: all 0.3s ease;
  text-align: center;
}

.detail-link:hover {
  color: #66b1ff;
  transform: translateY(-1px);
}

.semantic-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 0 0 8px 8px;
  width: 100%;
  height: 150px;
  padding: 15px 30px;
  margin-bottom: 10px;
}

.semantic-upload-section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.tool-label {
  font-size: 12px;
  color: #666;
}

::v-deep.semantic-upload-section .avatar-uploader {
  width: 150px !important;
  height: 120px !important;
}

::v-deep.semantic-upload-section .avatar-uploader-icon {
  width: 150px !important;
  height: 120px !important;
}

::v-deep.semantic-upload-section .upload-wrapper {
  width: 150px !important;
  height: 120px !important;
}

::v-deep.content-wrapper .upload-wrapper {
  border: none !important;
}

::v-deep.semantic-upload-section .avatar {
  width: 150px !important;
  height: 120px !important;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
}

.tool-actions {
  width: 100px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
}

/* 公共样式：选择视角/模式的按钮 */
.select-type {
  position: relative;
  font-size: 12px;
  display: inline-block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #000;
  /* 默认字体颜色 */
  background-color: #fff;
  /* 默认背景色 */
}

/* 自动检测状态 */
.select-type.auto-detect {
  /* 特殊样式可在这里单独覆盖 */
}

/* 临时存储状态 */
.select-type.tempo-store {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

.auto-detect:hover,
.tempo-store:hover,
.auto-detect:active,
.tempo-store:active {
  background-color: #000;
  color: #fff;
  border-color: #000;
}

/* 禁用状态样式（鸟瞰图和工程图时） */
.auto-detect.disabled {
  background-color: #f5f5f5;
  color: #000;
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.auto-detect.disabled:hover,
.auto-detect.disabled:active {
  background-color: #f5f5f5;
  color: #000;
  border-color: #d9d9d9;
}

.auto-detect {
  position: relative;
}

/* 工具栏 */
.toolbar {
  width: 100%;
  margin-bottom: 0;
}

.tool-category {
  width: 100%;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 15px 30px;
}

.category-label {
  display: block;
  font-size: 14px;
  color: #000;
  margin-bottom: 12px;
  position: relative;
}

.tool-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
}

.tool-buttons .tool-buttons-item {
  width: 46%;
  padding: 6px 11px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-buttons-item-text {
  margin-left: 20px;
}

.tip {
  position: relative;
}

.tool-buttons .tool-buttons-item:hover {
  color: #000;
  background-color: #ecf5ff;
}

.tool-buttons .tool-buttons-item.active {
  color: #000;
  background-color: #ecf5ff;
}

.tool-buttons-item span {
  position: relative;
}

.tool-buttons-item .svg-icon {
  position: absolute;
  top: 0px;
  left: -24px;
  width: 15px;
  height: 15px;
}

/* 暂存 */
.save {
  width: 100%;
  margin-top: 10px;
}

/* 套索配置面板 */
.lasso-config {
  background: #efefef;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #e8e9ea;
}

.config-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
  flex-wrap: wrap;
}

.config-row:last-child {
  margin-bottom: 0;
}

.config-label {
  font-size: 12px;
  color: #666;
  min-width: 60px;
  flex-shrink: 0;
}

.unit {
  font-size: 12px;
  color: #999;
  margin-left: 4px;
}

/* 元素类别 */
.element-category {
  margin: 15px 0 30px 0;
  width: 100%;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 15px 30px;
}

/* 颜色选择 */
.color-palette {
  border: 1px solid #dcdfe6;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 6px;
  background: #eee;
  padding: 10px;
  flex-direction: column;
  margin-bottom: 10px;
}

.color-palette-group {
  display: flex;
  flex-wrap: wrap;

  .color-palette-item {
    width: 25%;
    display: flex;
    margin-bottom: 8px;
    /* 垂直间隔 */
    cursor: pointer;
  }
}


.swatches-color {
  width: 15px;
  height: 25px;
  border: 1px solid #dcdfe6;
  border-radius: 8px 0 0 8px;
}

.swatches-name {
  width: 40px;
  height: 25px;
  border: 1px solid #dcdfe6;
  border-left: none;
  font-size: 12px;
  line-height: 25px;
  text-align: center;
  background: #fff;
}

.lasso-canvas.canvas-active,
.paint-canvas.canvas-active {
  pointer-events: auto;
  /* 激活时接收事件 */
  z-index: 12;
}

.canvas-container {
  position: relative;
  width: fit-content;
  height: fit-content;
}

.preview-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #fff;
  border: 1px solid #dcdfe6;
  flex: 1 1 auto;
  /* 纵向弹性填充剩余空间 */
  min-height: 0;
  /* 允许在小屏时继续收缩 */
}

.preview-container {
  position: relative;
  display: inline-block;
  margin: 10px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: #fff;
  /* 居中显示 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-container img {
  /* 动态指定短边100% */
  /* width: 100%; */
  /* object-position: left top; */
  /* max-height: 500px; */
}

.empty-preview {
  width: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909399;
}

.empty-preview i {
  font-size: 48px;
  margin-bottom: 10px;
}

.empty-preview p {
  font-size: 14px;
  margin: 0;
}

.preview-img {
  display: block;
  max-width: 100%;
  height: auto;
  min-height: 500px;
  min-height: 400px;
  object-fit: contain;
}

.lasso-canvas,
.paint-canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  touch-action: none;
  /* 去掉百分百，lasso-canvas画布和图片大小保持一致 */
  /* width: 100%;
  height: 100%; */
}

.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
}

::v-deep.content-wrapper .el-textarea__inner {
  background: #eee;
  color: #848484;
  font-size: 12px;
  height: 80px;
  padding: 5px 10px;
}

::v-deep.content-wrapper .el-input__inner {
  color: #000;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
}

::v-deep.el-select .el-input .el-select__caret {
  margin-top: 5px;
}

::v-deep.el-switch.is-checked .el-switch__core {
  border-color: #000;
  background-color: #000;
}

/* 隐藏 Edge、IE、Firefox */
.thumbnail-gallery-wrapper {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* 缩略图整体容器 */
.thumbnail-section {
  position: relative;
  width: 100%;
  /* 高度自适应缩略图实际尺寸 */
}

/* "查看更多"按钮固定在缩略图最右侧 */
.seemore {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0 10px;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  font-size: 12px;
  border-radius: 6px;
}

.thumb-track {
  position: absolute;
  top: calc(100% + 15px);
  /* 位于缩略图区域下方 15px */
  /* 左侧偏移 = 两列缩略图宽度 + 两个 gap(12px) */
  left: calc(33.333% + 5px);
  /* 从第3张开始 */
  right: 0;
  height: 2px;
  background: #d0d0d0;
  border-radius: 2px !important;
  z-index: 2;
}

.thumb-dot {
  position: absolute;
  top: -1px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
  z-index: 3;
}

.thumb-dot {
  z-index: 3;
}

.thumb-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  background: #333;
  border-radius: 2px;
}

/* 覆盖固定高度：让左右侧内容块充满并可滚动 */
.left-panel .panel-style {
  overflow-y: auto;
  margin-bottom: 0;
  /* 去除底部空隙 */
  width: 100% !important;
  /* 避免超出产生横向滚动 */
  max-width: 100% !important;
  box-sizing: border-box;
  /* padding计入宽度 */
  overflow-x: hidden !important;
}

.icon-style {
  font-size: 13px;
}

/* 预览图片高度覆盖 */
.preview-img {
  min-height: 500px !important;
}

/* 去除 el-tabs card 类型自带的边框 */
::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
  background: #efefef;
  border: none;
}

::v-deep .el-tabs--card>.el-tabs__header {
  background: #fff;
  margin: 0;
  border-bottom: none;
}

::v-deep .right-panel .el-tabs--card>.el-tabs__header .el-tabs__item {
  color: #000 !important;
  flex: 1 1 0;
  /* 等宽 */
  text-align: center;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  /* 保持上方边框整合 */
  margin-right: 5px !important;
  /* 间距 5px */
  height: 48px;
  /* 固定高度 */
  line-height: 48px;
  /* 文本垂直居中 */
  padding: 0;
  /* 统一内边距，避免撑高 */
  border-radius: 8px 8px 0 0;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {

  background: #fff;
  font-weight: bold;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item:hover {
  color: #000;
  font-weight: bold;
}

/* ===== Tabs 占满宽度 ===== */
::v-deep .right-panel .el-tabs--card>.el-tabs__header .el-tabs__nav-wrap,
::v-deep .right-panel .el-tabs--card>.el-tabs__header .el-tabs__nav-scroll,
::v-deep .right-panel .el-tabs--card>.el-tabs__header .el-tabs__nav {
  flex: 1 1 0 !important;
  width: 100% !important;
}

/* 调整 nav 为 flex 布局并添加标签间距 */
::v-deep .right-panel .el-tabs--card>.el-tabs__header .el-tabs__nav {
  display: flex !important;
  gap: 5px;
}

/* 让 Card 类型 Tabs 宽度占满 params-panel */
::v-deep .el-tabs.el-tabs--card.el-tabs--top {
  width: 100%;
}

/* 标签等宽，占满可用空间 */
::v-deep .right-panel .el-tabs--card>.el-tabs__header .el-tabs__item {
  flex: 1 1 0;
  margin: 0 !important;
  /* 由 gap 控制间距 */
}

/* 选中状态 – 文字下划线 */
::v-deep .el-tabs__item.is-active {
  text-decoration: underline;
  /* 开启下划线 */
  text-decoration-color: #000;
  /* 线条颜色 */
  text-decoration-thickness: 2px;
  /* 线条粗细（浏览器支持程度较好） */
  text-underline-offset: 6px;
  /* 线条与文字的垂直距离，可按需微调 */
}

/* 如果想在 hover 时也有同样效果 */
::v-deep .el-tabs__item:hover {
  text-decoration: underline;
  text-decoration-color: #000;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
}

/* 无图占位图标 */
.placeholder-icon {
  width: 20px;
  height: 20px;
  color: #000;
}

.placeholder-icon svg {
  width: 100%;
  height: 100%;
}
</style>
