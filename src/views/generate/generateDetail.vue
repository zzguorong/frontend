<template>
  <div class="generate-detail-container">
    <div class="content-wrapper">
      <el-row :gutter="20">
        <el-col :span="18">
          <!-- 中间预览区域 -->
          <div ref="previewArea" class="center-preview-area">
            <!-- 预览主区域 -->
            <div class="main-preview">
              <div v-if="!currentPreviewImage" class="empty-preview">
                <!-- <i class="el-icon-picture"></i>
                <p>暂无预览图片</p> -->
              </div>
              <img v-else :src="currentPreviewImage" alt="预览图" class="preview-image">
              <!-- 预览图操作按钮 -->
              <div class="preview-actions">
                <svg-icon :class="['preview-action-icon', 'return-icon']" icon-class="return" @click="handlePreviewReturn"
                  @mouseenter="onPreviewReturnHover(true)" @mouseleave="onPreviewReturnHover(false)" />
              </div>
            </div>
            <!-- 传输到底图按钮 -->
            <div class="transfer-action">
              <div type="default" class="transfer-btn" @click="keepBaseGenerate">
                保留底图生图
                <el-tooltip content="保留底图保留参数,调整图纸的细节" placement="top">
                  <svg-icon icon-class="question" class="icon-style" style="position: absolute; right: 18px; top: 15px" />
                </el-tooltip>
              </div>
              <div class="download-controls">
                <div :style="{
                    height: '35px',
                    lineHeight: '35px',
                    border: '1px solid #dcdfe6',
                    borderRadius: '5px',
                    width: '120px',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginLeft: '5px',
                    cursor: currentPreviewImage ? 'pointer' : 'not-allowed',
                    backgroundColor: currentPreviewImage ? '#fff' : '#ccc'
                  }" @click="downloadPNG(currentPreviewImage)">
                  PNG下载
                </div>
                <div :style="{
                     height: '35px',
                    lineHeight: '35px',
                    border: '1px solid #dcdfe6',
                    borderRadius: '5px',
                    width: '120px',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginLeft: '5px',
                      cursor: currentPreviewImage ? 'pointer' : 'not-allowed',
                    backgroundColor: currentPreviewImage ? '#fff' : '#ccc' }" @click="downloadPSD">
                  PSD下载
                  <el-tooltip content="PSD下载功能" placement="top">
                    <svg-icon icon-class="question" class="icon-style"
                      style="position: absolute; right: 15px; top: 10px" />
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="params-panel">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="我的项目" name="left">
                <!-- 画廊面板 -->
                <div class="gallery-panel" data-simplebar data-simplebar-auto-hide="false">
                  <simplebar>
                  <div class="gallery-section">
                    <div class="section-favorate">
                      <div class="gallery-actions">
                        <div class="gallery-icon-box">
                          <svg-icon :class="[
                            'gallery-action-icon',
                            'favorite-gallery-icon',
                            { active: galleryFavoriteActive },
                          ]" icon-class="collection" :style="{
  color:
    galleryFavoriteActive || galleryFavoriteHover
      ? '#f56565'
      : '#000',
}" @click="toggleGalleryFavorite" @mouseenter="onGalleryFavoriteHover(true)"
                            @mouseleave="onGalleryFavoriteHover(false)" />
                        </div>
                      </div>
                    </div>

                    <div class="gallery-list">
                      <!-- 空状态提示 -->
                      <div v-if="showOnlyFavorites && filteredGalleryItems.length === 0
                        " class="empty-gallery">
                        <i class="el-icon-heart" />
                        <p>暂无收藏的图册</p>
                        <p class="hint">收藏图册后将在此处显示</p>
                      </div>

                      <!-- 画廊列表 -->
                      <div v-for="(
                          dateGroup, displayDateIndex
                        ) in filteredGalleryItems" :key="displayDateIndex" class="date-group">
                        <!-- 日期标题 -->
                        <div class="date-header">
                          {{ dateGroup.date }}
                        </div>

                        <!-- 该日期下的所有图片项目 -->
                        <div v-for="(
                            item, displayItemIndex
                          ) in dateGroup.galleryItem" :key="`${displayDateIndex}-${displayItemIndex}`"
                          class="gallery-item" :class="{
                            active:
                              currentImageIndex ===
                              getGlobalIndexForDisplay(
                                displayDateIndex,
                                displayItemIndex
                              ),
                          }" @click="
  handleGalleryItemClick(
    displayDateIndex,
    displayItemIndex,
    item
  )
  ">
                          <!-- 图片预览 -->
                          <div class="item-preview">
                            <img v-if="item.image" :src="item.image" alt="画廊图片">
                            <div v-else class="empty-item" />

                            <!-- 图片数量标识 -->
                            <!-- <div class="image-count-badge">
                              {{ item.images ? item.images.length : 1 }}
                            </div> -->
                          </div>

                          <!-- 操作按钮 -->
                          <div class="thumbnail-actions">
                            <div class="gallery-icon-wrapper">
                              <svg-icon class="action-icon favorite-icon" icon-class="collection" :style="{
                                color: getFavoriteStateForDisplay(
                                  displayDateIndex,
                                  displayItemIndex,
                                  item
                                )
                                  ? '#f56565'
                                  : '#000',
                              }" @click.stop="
  toggleFavoriteForDisplay(
    displayDateIndex,
    displayItemIndex,
    item
  )
  " />
                            </div>
                            <div class="gallery-icon-wrapper">
                              <svg-icon class="action-icon delete-icon" icon-class="delete" :style="{
                                color: getDeleteHoverStateForDisplay(
                                  displayDateIndex,
                                  displayItemIndex,
                                  item
                                )
                                  ? '#f56565'
                                  : '#000',
                              }" @click.stop="
  deleteThumbnailForDisplay(
    displayDateIndex,
    displayItemIndex,
    item
  )
  " @mouseenter="
    onDeleteHoverForDisplay(
      displayDateIndex,
      displayItemIndex,
      item,
      true
    )
    " @mouseleave="
    onDeleteHoverForDisplay(
      displayDateIndex,
      displayItemIndex,
      item,
      false
    )
    " />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </simplebar>
                </div>
              </el-tab-pane>
              <el-tab-pane label="项目参数" name="right">
                <div ref="paramsScroll" class="project-panel" data-simplebar>
                  <!-- 项目参数 -->
                  <div class="params-section">
                    <!-- 提示词 -->
                    <div class="param-item horizontal-item">
                      <div class="base-style">
                        <label>提示词</label>
                        <el-input v-model="projectParameters.promptText" type="textarea" :rows="4" placeholder="请输入提示词" />
                      </div>
                    </div>
                    <!-- 视角类型 -->
                    <div class="param-item horizontal-item">
                      <div class="base-style">
                        <label>视角类型</label>
                        <!-- <div class="button-group">
                          <span
                            v-for="option in viewTypeOptions"
                            :key="option.value"
                            size="small"
                          >
                            {{ option.label }}
                          </span>
                        </div> -->
                        <div class="button-group">
                          <span>
                            {{ viewTypeFormat(projectParameters.viewType) }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- 风格类别 -->
                    <div class="param-item horizontal-item">
                      <div class="base-style">
                        <label>风格类别</label>
                        <!-- <div class="button-group">
                          <span
                            v-for="option in styleCategoryOptions"
                            :key="option.value"
                            size="small"
                          >
                            {{ option.label }}
                          </span>
                        </div> -->
                        <div class="button-group">
                          <span>
                            通用类别
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- 底图控制程度 -->
                    <!-- 底图材质固定 -->
                    <div class="param-item horizontal-item">
                      <div class="base-style">
                        <label>底图控制程度</label>
                        <div class="button-group">
                          <span>
                            {{ projectParameters.baseControlLevel }}
                          </span>
                        </div>
                      </div>
                      <!-- <div class="base-style">
                        <label>底图材质固定</label>
                        <div class="button-group">
                          <span>
                            {{ materialFixed }}
                          </span>
                        </div>
                      </div> -->
                    </div>

                    <!-- 风格迁移控制程度 -->
                    <div class="param-item horizontal-item">
                      <div class="base-style">
                        <label>风格迁移控制程度</label>
                        <div class="button-group">
                          <span>
                            {{ semanticImgUrlId ? projectParameters.styleTransferLevel : 0 }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- 分辨率 -->
                    <!-- 图纸比例 -->
                    <div class="param-item horizontal-item">
                      <div class="base-style">
                        <label>分辨率</label>
                        <div class="button-group">
                          <span>
                            {{ scaleFormat(projectParameters.resolution) }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="param-item horizontal-item">
                      <div class="base-style">
                        <label>图纸比例</label>
                        <div class="button-group">
                          <span>
                            {{ projectParameters.aspectRatio == 'detect' ? '原始比例' : projectParameters.aspectRatio }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- 保留参数按钮 -->
                    <div class="save-params-btn" @click="saveParams">
                      保留参数生图
                      <el-tooltip content="更换底图保留参数，生成类似风格的图框" placement="top">
                        <svg-icon icon-class="question" class="icon-style"
                          style="position: absolute; right: 13px; top: 11px" />
                      </el-tooltip>
                    </div>
                  </div>

                  <!-- 语义分割元素 -->
                  <!-- <div class="params-section"> -->
                  <!-- <div class="section-title">语义分割元素</div> -->
                  <!-- 线稿图 -->
                  <!-- <div class="param-item">
                      <div class="base-style">
                        <label>线稿图</label>
                        <div class="segmentation-image">
                          <img src="" alt="" />
                        </div>
                      </div>
                    </div> -->
                  <!-- 语义分割图 -->
                  <!-- <div class="param-item" style="margin-top: 15px">
                      <div class="base-style">
                        <label>语义分割图</label>
                        <div class="segmentation-image">
                          <img src="" alt="" />
                        </div>
                      </div>
                    </div> -->
                  <!-- </div> -->
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
import {
  deleteGeneratedImage,
  favoriteGeneratedImage,
  generateBaseImage,
  getGalleryImages,
  getProjectDetail,
  getUserFavoriteImages,
  unfavoriteGeneratedImage
} from '@/api/generate';
import 'simplebar/dist/simplebar.min.css';
import { downloadPNG } from "@/utils/downLoad";

export default {
  name: 'GenerateDetail',
  data() {
    return {
      // 左侧参数
      materialFixed: 10,
      // 预览相关
      currentPreviewImage: '',
      currentImageIndex: 0, // 当前选中的画廊项目索引
      currentImageInSet: 0, // 当前显示的是该项目images数组中的第几张图片

      // 选项数据
      viewTypeOptions: [{ label: '室内图', value: '4' }],
      styleCategoryOptions: [{ label: '通用', value: '通用' }],

      // 画廊数据
      // galleryItems: [
      //   {
      //     date: "2025-06-12-01",
      //     galleryItem: [
      //       {
      //         image: require("@/assets/images/a.jpg"), // 使用require正确引入图片
      //         images: [
      //           {
      //             src: require("@/assets/images/a.jpg"),
      //             isCollect: false,
      //           },
      //           { src: require("@/assets/images/b.jpg"), isCollect: false },
      //           {
      //             src: require("@/assets/images/c.jpg"),
      //             isCollect: false,
      //           },
      //         ],
      //         isFavorite: false,
      //       },
      //       {
      //         image: require("@/assets/images/d.jpg"), // 使用require正确引入图片
      //         images: [
      //           {
      //             src: require("@/assets/images/d.jpg"),
      //             isCollect: false,
      //           },
      //           {
      //             src: require("@/assets/images/e.jpg"),
      //             isCollect: false,
      //           },
      //         ],
      //         isFavorite: false,
      //       },
      //     ],
      //   },
      //   {
      //     date: "2025.06-07-01",
      //     galleryItem: [
      //       {
      //         image: require("@/assets/images/f.jpg"), // 使用require正确引入图片
      //         images: [
      //           {
      //             src: require("@/assets/images/f.jpg"),
      //             isCollect: false,
      //           },
      //           {
      //             src: require("@/assets/images/g.jpg"),
      //             isCollect: false,
      //           },
      //           {
      //             src: require("@/assets/images/h.jpg"),
      //             isCollect: false,
      //           },
      //         ],
      //         isFavorite: false,
      //       },
      //       {
      //         image: require("@/assets/images/i.jpg"), // 使用require正确引入图片
      //         images: [
      //           {
      //             src: require("@/assets/images/i.jpg"),
      //             isCollect: false,
      //           },
      //           {
      //             src: require("@/assets/images/j.jpg"),
      //             isCollect: false,
      //           },
      //         ],
      //         isFavorite: false,
      //       },
      //     ],
      //   },
      // ],
      galleryItems: [],
      // 收藏状态 - 使用二维数组匹配新的数据结构
      favoriteStates: [
        [false, false], // 第一个日期组的2个项目
        [false, false] // 第二个日期组的2个项目
      ],

      // 悬停状态 - 使用二维数组匹配新的数据结构
      favoriteHoverStates: [
        [false, false], // 第一个日期组的2个项目
        [false, false] // 第二个日期组的2个项目
      ],
      deleteHoverStates: [
        [false, false], // 第一个日期组的2个项目
        [false, false] // 第二个日期组的2个项目
      ],
      // 画廊标题图标状态
      galleryFavoriteActive: false,
      galleryFavoriteHover: false,
      // 画廊筛选状态
      showOnlyFavorites: false,
      // 预览图操作按钮状态
      previewReturnHover: false,
      resizeObserver: null,
      activeName: 'left',
      pollingTimer: null,
      generatedImageId: null,
      semanticImgUrlId: null,
      semanticImgUrl: null,
      styleImageId: null,
      styleImgUrl: null,
      projectParameters: {}
    };
  },
  computed: {
    // 获取当前选中项目的详细信息
    currentItemDetails() {
      // 如果currentImageIndex为-1或画廊为空，返回null
      if (this.currentImageIndex < 0 || this.galleryItems.length === 0) {
        return null;
      }

      const { dateIndex, itemIndex } = this.getDateAndItemIndex(
        this.currentImageIndex
      );
      if (
        this.galleryItems[dateIndex] &&
        this.galleryItems[dateIndex].galleryItem[itemIndex]
      ) {
        return {
          dateIndex,
          itemIndex,
          item: this.galleryItems[dateIndex].galleryItem[itemIndex]
        };
      }
      return null;
    },

    // 过滤后的画廊数据
    filteredGalleryItems() {
      if (!this.showOnlyFavorites) {
        // 不筛选，显示所有数据
        return this.galleryItems;
      }

      // 筛选收藏的图册
      const filtered = [];

      for (
        let dateIndex = 0;
        dateIndex < this.galleryItems.length;
        dateIndex++
      ) {
        const dateGroup = this.galleryItems[dateIndex];
        const filteredItems = [];

        for (
          let itemIndex = 0;
          itemIndex < dateGroup.galleryItem.length;
          itemIndex++
        ) {
          // 检查该图册是否被收藏
          if (
            this.favoriteStates[dateIndex] &&
            this.favoriteStates[dateIndex][itemIndex]
          ) {
            filteredItems.push({
              ...dateGroup.galleryItem[itemIndex],
              originalDateIndex: dateIndex,
              originalItemIndex: itemIndex
            });
          }
        }

        // 如果该日期组有收藏的图册，则添加到过滤结果中
        if (filteredItems.length > 0) {
          filtered.push({
            ...dateGroup,
            galleryItem: filteredItems
          });
        }
      }

      return filtered;
    }
  },
  // 生命周期钩子
  // 在组件挂载时加载画廊图片
  mounted() {
    this.loadGalleryImages().then(() => {
      // 初始化显示最后一张图片
      if (
        !this.$route.query.id &&
        this.galleryItems.length > 0
      ) {
        // 显示第一个日期组
        // 找到第一个日期组
        const firstDateIndex = 0;
        const firstDateGroup = this.galleryItems[firstDateIndex];

        // 确保第一个日期组有图片
        if (firstDateGroup.galleryItem.length > 0) {
          // 找到该日期组内的第一个项目
          const firstItemIndex = 0;
          // 计算全局索引
          const globalIndex = this.getGlobalIndex(firstDateIndex, firstItemIndex);
          // 选中第一个图片
          this.selectGalleryItem(globalIndex, firstDateIndex, firstItemIndex);
        }
      }
    });

    // 如果有项目ID，则获取项目详情
    if (this.$route.query.id) {
      getProjectDetail(this.$route.query.id).then((res) => {
        console.log('getProjectDetail', res);
        const generationRequest = res.generation_request;
        this.generatedImageId = res.id;
        this.projectParameters.promptText = generationRequest.prompt;
        this.projectParameters.aspectRatio = generationRequest.aspect_ratio;
        this.projectParameters.baseControlLevel = parseInt(
          generationRequest.base_image_control
        );
        this.projectParameters.viewType =
          generationRequest.generation_categories.id;
        this.projectParameters.resolution = generationRequest.scale;
        this.projectParameters.styleTransferLevel = parseInt(
          generationRequest.style_image_control
        );
        this.projectParameters.styleCategory =
          generationRequest.generation_categories.id;
        this.currentPreviewImage = res.url;
        (this.semanticImgUrlId = generationRequest.segment_image_id);
        (this.styleImageId = generationRequest.style_image_id);
      });
    }
    // getProjectDetail(1).then((res) => {

    // });

    // 阻止参数滚动区域到达边界后继续滚动父容器
    //   this.$nextTick(() => {
    //     const elWrapper = this.$refs.paramsScroll;
    //     if (!elWrapper) return;
    //     // SimpleBar 会创建 content-wrapper，可直接监听 wrapper
    //     const scrollEl =
    //       elWrapper.querySelector(".simplebar-content-wrapper") || elWrapper;
    //     const wheelHandler = (e) => {
    //       const delta = e.deltaY;
    //       if (
    //         (delta > 0 &&
    //           scrollEl.scrollTop + scrollEl.clientHeight >=
    //             scrollEl.scrollHeight) ||
    //         (delta < 0 && scrollEl.scrollTop <= 0)
    //       ) {
    //         e.preventDefault();
    //       }
    //     };
    //     scrollEl.addEventListener("wheel", wheelHandler, { passive: false });
    //     // 保存引用以便销毁
    //     this._paramsWheelHandler = wheelHandler;
    //   });
  },

  // beforeDestroy() {
  //   // 移除滚轮监听
  //   const elWrapper = this.$refs.paramsScroll;
  //   if (elWrapper && this._paramsWheelHandler) {
  //     const scrollEl =
  //       elWrapper.querySelector(".simplebar-content-wrapper") || elWrapper;
  //     scrollEl.removeEventListener("wheel", this._paramsWheelHandler);
  //   }
  // },

  methods: {
    downloadPNG,
    /**
     * 加载画廊图片数据
     */
    async loadGalleryImages() {
      try {
        const res = await Promise.all([
          getGalleryImages(),
          this.getUserFavoriteImages()
        ]);
        const generationImages = res[0].data;
        const userFavoriteImages = res[1]?.favorites || [];
        console.log('Loading gallery images:', generationImages);
        console.log('Loading userFavorite images:', userFavoriteImages);

        // 转换数据并按日期分组
        this.galleryItems = this.transformAndGroupGalleryData(generationImages);
        // 初始化状态数组
        this.initializeStateArrays();
        // 如果有用户收藏的图片，更新收藏状态
        if (userFavoriteImages.length > 0) {
          this.galleryItems.forEach((dateGroup, dateIndex) => {
            dateGroup.galleryItem.forEach((item, itemIndex) => {
              // 检查当前项目是否在用户收藏列表中
              const isFavorite = userFavoriteImages.some(
                (fav) => fav === item.images[0].generatedImageId
              );
              // 更新收藏状态
              item.isFavorite = isFavorite;
              if (this.favoriteStates[dateIndex]) {
                this.favoriteStates[dateIndex][itemIndex] = isFavorite;
              } else {
                // 如果没有对应的日期组，初始化状态数组
                this.favoriteStates[dateIndex] = [];
                this.favoriteStates[dateIndex][itemIndex] = isFavorite;
              }
            });
          });
        }
      } catch (error) {
        console.error('Failed to load gallery images:', error);
        this.$message.error('加载图片失败');
      }
    },

    /**
     * 获取用户收藏的生成图片列表
     */
    async getUserFavoriteImages() {
      try {
        const res = await getUserFavoriteImages();
        const favoriteImages = res.data;
        console.log('获取用户收藏的生成图片列表:', favoriteImages);

        return favoriteImages;
      } catch (error) {
        console.error('获取用户收藏的生成图片列表失败:', error);
      }
    },

    /**
     * 转换并分组画廊数据
     * @param {Array} generationImages 原始图片数据
     * @returns {Array} 转换后的分组数据
     */
    transformAndGroupGalleryData(generationImages) {
      const mappedItems = generationImages
        .filter((item) => item.generated_images && item.generated_images.length)
        .map(this.transformGalleryItem);
      return this.groupItemsByDate(mappedItems);
    },

    /**
     * 转换单个画廊项目
     * @param {Object} item 原始项目数据
     * @returns {Object} 转换后的项目数据
     */
    transformGalleryItem(item) {
      const generatedImage = item.generated_images[0];
      return {
        date: generatedImage.created_at.split('T')[0],
        galleryItem: [{
          image: generatedImage.url,
          images: [{
            src: generatedImage.url,
            generatedImageId: generatedImage.id,
            isCollect: false
          }],
          projectParameters: this.extractProjectParameters(item),
          semanticImgUrl: item.segment_images?.url || null,
          semanticImgUrlId: item.segment_images?.id || null,
          styleImgUrl: item.style_images?.url || null,
          styleImageId: item.style_image_id,
          isFavorite: false,
          created_at: generatedImage.created_at // 添加创建时间用于排序
        }]
      };
    },

    /**
     * 提取项目参数
     * @param {Object} item 原始项目数据
     * @returns {Object} 项目参数对象
     */
    extractProjectParameters(item) {
      return {
        promptText: item.prompt,
        aspectRatio: item.aspect_ratio,
        baseControlLevel: parseInt(item.base_image_control),
        styleTransferLevel: parseInt(item.style_image_control),
        generation_categories: item.generation_categories,
        resolution: item.scale,
        viewType: item.generation_categories.id,
        styleCategory: item.generation_categories.id
      };
    },

    /**
     * 按日期分组项目并按日期倒序排序
     * @param {Array} items 映射后的项目数组
     * @returns {Array} 按日期分组并倒序排序的数组
     */
    groupItemsByDate(items) {
      // 使用 Map 进行分组，提高查找效率
      const groupMap = new Map();

      // 按日期分组
      items.forEach(item => {
        const date = item.date;
        if (groupMap.has(date)) {
          groupMap.get(date).galleryItem.push(...item.galleryItem);
        } else {
          groupMap.set(date, {
            date,
            galleryItem: [...item.galleryItem]
          });
        }
      });

      // 对每个日期分组内的项目按 created_at 倒序排序
      groupMap.forEach(group => {
        group.galleryItem.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
      });

      // 转换为数组并按日期倒序排序（最新日期在前）
      return Array.from(groupMap.values()).sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },

    /**
     * 初始化状态数组
     */
    initializeStateArrays() {
      this.favoriteStates = this.galleryItems.map(dateGroup =>
        new Array(dateGroup.galleryItem.length).fill(false)
      );
      this.favoriteHoverStates = this.galleryItems.map(dateGroup =>
        new Array(dateGroup.galleryItem.length).fill(false)
      );
      this.deleteHoverStates = this.galleryItems.map(dateGroup =>
        new Array(dateGroup.galleryItem.length).fill(false)
      );
    },

    viewTypeFormat(row) {
      const statusMap = {
        1: '鸟瞰图小尺寸',
        2: '鸟瞰图大尺寸',
        3: '人视图',
        4: '平面图',
        5: '室内图'
      };
      return statusMap[row] || '';
    },
    styleTypeFormat(row) {
      const statusMap = {
        1: '通用',
        2: '大尺寸'
      };
      return statusMap[row] || '';
    },
    scaleFormat(row) {
      const statusMap = {
        1: '标准(1080P)',
        2: '大(2k)',
        3: '超大(4k)'
      };
      return statusMap[row] || '';
    },
    // 辅助方法：获取全局索引
    getGlobalIndex(dateIndex, itemIndex) {
      let globalIndex = 0;
      for (let i = 0; i < dateIndex; i++) {
        globalIndex += this.galleryItems[i].galleryItem.length;
      }
      globalIndex += itemIndex;
      return globalIndex;
    },

    // 辅助方法：获取收藏状态
    getFavoriteState(dateIndex, itemIndex) {
      return (
        this.favoriteStates[dateIndex] &&
        this.favoriteStates[dateIndex][itemIndex]
      );
    },

    // 辅助方法：获取收藏悬停状态
    getFavoriteHoverState(dateIndex, itemIndex) {
      return (
        this.favoriteHoverStates[dateIndex] &&
        this.favoriteHoverStates[dateIndex][itemIndex]
      );
    },

    // 辅助方法：获取删除悬停状态
    getDeleteHoverState(dateIndex, itemIndex) {
      return (
        this.deleteHoverStates[dateIndex] &&
        this.deleteHoverStates[dateIndex][itemIndex]
      );
    },

    // 辅助方法：根据全局索引获取日期和项目索引
    getDateAndItemIndex(globalIndex) {
      let currentIndex = 0;
      for (
        let dateIndex = 0;
        dateIndex < this.galleryItems.length;
        dateIndex++
      ) {
        for (
          let itemIndex = 0;
          itemIndex < this.galleryItems[dateIndex].galleryItem.length;
          itemIndex++
        ) {
          if (currentIndex === globalIndex) {
            return { dateIndex, itemIndex };
          }
          currentIndex++;
        }
      }
      return { dateIndex: 0, itemIndex: 0 };
    },

    // 获取显示项目的原始索引
    getOriginalIndices(displayDateIndex, displayItemIndex, item) {
      if (
        this.showOnlyFavorites &&
        item.originalDateIndex !== undefined &&
        item.originalItemIndex !== undefined
      ) {
        return {
          dateIndex: item.originalDateIndex,
          itemIndex: item.originalItemIndex
        };
      }
      return { dateIndex: displayDateIndex, itemIndex: displayItemIndex };
    },

    // 获取显示项目的全局索引
    getGlobalIndexForDisplay(displayDateIndex, displayItemIndex) {
      const displayData = this.filteredGalleryItems;
      let globalIndex = 0;

      for (let i = 0; i < displayDateIndex; i++) {
        globalIndex += displayData[i].galleryItem.length;
      }
      globalIndex += displayItemIndex;

      // 如果在筛选模式下，需要映射到原始数据的全局索引
      if (this.showOnlyFavorites) {
        const item =
          displayData[displayDateIndex].galleryItem[displayItemIndex];
        const { dateIndex, itemIndex } = this.getOriginalIndices(
          displayDateIndex,
          displayItemIndex,
          item
        );
        return this.getGlobalIndex(dateIndex, itemIndex);
      }

      return globalIndex;
    },

    // 处理画廊项目点击事件
    handleGalleryItemClick(displayDateIndex, displayItemIndex, item) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      const globalIndex = this.getGlobalIndex(dateIndex, itemIndex);
      this.selectGalleryItem(globalIndex, dateIndex, itemIndex);
    },

    // 显示项目的收藏状态方法
    getFavoriteStateForDisplay(displayDateIndex, displayItemIndex, item) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      return this.getFavoriteState(dateIndex, itemIndex);
    },

    getFavoriteHoverStateForDisplay(displayDateIndex, displayItemIndex, item) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      return this.getFavoriteHoverState(dateIndex, itemIndex);
    },

    getDeleteHoverStateForDisplay(displayDateIndex, displayItemIndex, item) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      return this.getDeleteHoverState(dateIndex, itemIndex);
    },

    // 显示项目的交互方法
    toggleFavoriteForDisplay(displayDateIndex, displayItemIndex, item) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      this.toggleFavorite(dateIndex, itemIndex);
    },

    onFavoriteHoverForDisplay(
      displayDateIndex,
      displayItemIndex,
      item,
      isHover
    ) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      this.onFavoriteHover(dateIndex, itemIndex, isHover);
    },

    onDeleteHoverForDisplay(displayDateIndex, displayItemIndex, item, isHover) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      this.onDeleteHover(dateIndex, itemIndex, isHover);
    },

    deleteThumbnailForDisplay(displayDateIndex, displayItemIndex, item) {
      const { dateIndex, itemIndex } = this.getOriginalIndices(
        displayDateIndex,
        displayItemIndex,
        item
      );
      this.deleteThumbnail(dateIndex, itemIndex);
    },

    // 根据newState不同状态，调用对应API：封装调用收藏API与取消收藏API的处理逻辑
    postFavoriteState(generatedImageId, newState) {
      if (newState) {
        // 收藏状态：调用收藏API
        return favoriteGeneratedImage(generatedImageId).then(() => {
          console.log('收藏成功');
          return true; // 返回成功状态
        }).catch((error) => {
          console.error('收藏失败:', error);
          this.$message.error('收藏失败，请稍后再试');
          throw error; // 重新抛出错误以便调用方处理
        });
      } else {
        // 取消收藏状态：调用取消收藏API
        return unfavoriteGeneratedImage(generatedImageId).then(() => {
          console.log('取消收藏成功');
          return true; // 返回成功状态
        }).catch((error) => {
          console.error('取消收藏失败:', error);
          this.$message.error('取消收藏失败，请稍后再试');
          throw error; // 重新抛出错误以便调用方处理
        });
      }
    },

    // 切换收藏状态
    toggleFavorite(dateIndex, itemIndex) {
      console.log('=== 点击收藏按钮 ===');
      console.log('日期索引:', dateIndex, '项目索引:', itemIndex);

      // 确保状态数组存在
      if (!this.favoriteStates[dateIndex]) {
        this.$set(this.favoriteStates, dateIndex, []);
      }

      console.log('切换前状态:', this.favoriteStates[dateIndex][itemIndex]);

      // 切换收藏状态
      const newState = !this.favoriteStates[dateIndex][itemIndex];
      // 根据newState不同状态，调用对应API；API返回成功后更新状态
      this.postFavoriteState(
        this.galleryItems[dateIndex].galleryItem[itemIndex].images[0]
          .generatedImageId,
        newState
      )
        .then(() => {
          // 更新收藏状态
          this.$set(this.favoriteStates[dateIndex], itemIndex, newState);

          // 同步更新数据源中的收藏字段
          const targetItem =
            this.galleryItems[dateIndex] &&
            this.galleryItems[dateIndex].galleryItem[itemIndex];
          if (targetItem) {
            // 记录文件夹级收藏状态
            this.$set(targetItem, 'isFavorite', newState);

            // 同步更新内部图片收藏标记
            if (Array.isArray(targetItem.images)) {
              targetItem.images.forEach((img, idx) => {
                // 若对象是简单字符串则跳过
                if (img && typeof img === 'object') {
                  this.$set(targetItem.images[idx], 'isCollect', newState);
                }
              });
            }
          }

          console.log('切换后状态:', newState);
          console.log('完整状态数组:', JSON.stringify(this.favoriteStates));

          // 根据新状态显示消息和切换图标
          const globalIndex = this.getGlobalIndex(dateIndex, itemIndex);
          if (newState) {
            // 收藏状态：显示 favorate-active 图标
            this.$message.success(`图片 ${globalIndex + 1} 已收藏`);
            console.log(
              `图片 ${globalIndex + 1} 已收藏，应该显示 favorate-active 图标`
            );
          } else {
            // 取消收藏状态：显示 favorate 图标
            this.$message.success(`图片 ${globalIndex + 1} 取消收藏`);
            console.log(`图片 ${globalIndex + 1} 取消收藏，应该显示 favorate 图标`);
          }
        })
        .catch((error) => {
          console.error('切换收藏状态失败:', error);
          // 如果API调用失败，保持原状态不变
        });

      // 强制更新组件
      this.$forceUpdate();

      // 如果当前是筛选模式，检查筛选结果是否变为空
      if (this.showOnlyFavorites) {
        this.updatePreviewAfterFilter();
      }

      console.log('=== 收藏状态切换完成 ===');
    },
    // 收藏悬停处理
    onFavoriteHover(dateIndex, itemIndex, isHover) {
      // 确保状态数组存在
      if (!this.favoriteHoverStates[dateIndex]) {
        this.$set(this.favoriteHoverStates, dateIndex, []);
      }
      // 设置悬停状态，不影响实际收藏状态
      this.$set(this.favoriteHoverStates[dateIndex], itemIndex, isHover);
    },
    // 删除悬停处理
    onDeleteHover(dateIndex, itemIndex, isHover) {
      // 确保状态数组存在
      if (!this.deleteHoverStates[dateIndex]) {
        this.$set(this.deleteHoverStates, dateIndex, []);
      }
      this.$set(this.deleteHoverStates[dateIndex], itemIndex, isHover);
    },

    // 画廊标题图标交互方法
    toggleGalleryFavorite() {
      this.showOnlyFavorites = !this.showOnlyFavorites;
      this.galleryFavoriteActive = this.showOnlyFavorites;

      const message = this.showOnlyFavorites
        ? '已筛选收藏图册'
        : '显示全部图册';
      this.$message.success(message);
      console.log('画廊筛选状态:', this.showOnlyFavorites);

      // 处理筛选状态变化后的预览图
      this.updatePreviewAfterFilter();
    },

    // 筛选后更新预览图
    updatePreviewAfterFilter() {
      if (this.showOnlyFavorites) {
        // 筛选模式：检查是否有收藏图册
        if (this.filteredGalleryItems.length === 0) {
          // 没有收藏图册，清空预览图
          console.log('筛选结果为空，清空预览图');
          this.currentPreviewImage = '';
          this.currentImageIndex = -1;
          this.currentImageInSet = 0;
        } else {
          // 检查当前预览的图册是否在筛选结果中
          const currentlyInFiltered = this.isCurrentItemInFilteredResults();

          if (currentlyInFiltered) {
            // 当前图册在筛选结果中，保持当前显示
            console.log('当前图册在收藏筛选结果中，保持显示');
            // 不需要做任何操作，保持当前状态
          } else {
            // 当前图册不在筛选结果中，检查是否还有其他收藏图册
            if (this.filteredGalleryItems.length > 0) {
              // 切换到第一个收藏图册
              const firstItem = this.filteredGalleryItems[0].galleryItem[0];
              const { dateIndex, itemIndex } = this.getOriginalIndices(
                0,
                0,
                firstItem
              );
              const globalIndex = this.getGlobalIndex(dateIndex, itemIndex);
              this.selectGalleryItem(globalIndex, dateIndex, itemIndex);
              console.log('当前图册不在收藏筛选结果中，切换到第一个收藏图册');
            } else {
              // 没有收藏图册了，清空预览图
              console.log('取消收藏后没有收藏图册了，清空预览图');
              this.currentPreviewImage = '';
              this.currentImageIndex = -1;
              this.currentImageInSet = 0;
            }
          }
        }
      } else {
        // 显示全部模式：检查是否还有图册
        if (
          this.galleryItems.length === 0 ||
          this.galleryItems.every(
            (dateGroup) => dateGroup.galleryItem.length === 0
          )
        ) {
          // 画廊完全为空，清空预览图
          this.currentPreviewImage = '';
          this.currentImageIndex = -1;
          this.currentImageInSet = 0;
        } else if (this.currentImageIndex >= 0) {
          // 重新选择当前项目以确保索引正确
          const { dateIndex, itemIndex } = this.getDateAndItemIndex(
            this.currentImageIndex
          );
          this.selectGalleryItem(this.currentImageIndex, dateIndex, itemIndex);
        } else {
          // 选择第一个可用图册
          for (
            let dateIndex = 0;
            dateIndex < this.galleryItems.length;
            dateIndex++
          ) {
            if (this.galleryItems[dateIndex].galleryItem.length > 0) {
              this.selectGalleryItem(0, dateIndex, 0);
              break;
            }
          }
        }
      }
    },

    // 检查当前图册是否在筛选结果中
    isCurrentItemInFilteredResults() {
      if (this.currentImageIndex < 0) {
        return false;
      }

      const { dateIndex, itemIndex } = this.getDateAndItemIndex(
        this.currentImageIndex
      );

      // 检查当前图册是否被收藏
      if (
        this.favoriteStates[dateIndex] &&
        this.favoriteStates[dateIndex][itemIndex]
      ) {
        return true;
      }

      return false;
    },

    onGalleryFavoriteHover(isHover) {
      this.galleryFavoriteHover = isHover;
    },

    // 预览图操作按钮交互方法
    handlePreviewReturn() {
      // 返回到generate/index页面
      this.$router.push('/generate');
      console.log('返回到generate/index页面');
    },

    onPreviewReturnHover(isHover) {
      this.previewReturnHover = isHover;
    },

    // 删除缩略图（画廊项目）
    deleteThumbnail(dateIndex, itemIndex) {
      const globalIndex = this.getGlobalIndex(dateIndex, itemIndex);
      this.$confirm(
        '你确认要删除图片吗？<br/>删除图片，图片将会从系统中移除。',
        '确认删除图片',
        {
          confirmButtonText: '确认删除',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          showConfirmButton: true,
          closeOnClickModal: false,
          closeOnPressEscape: false
        }
      )
        .then(() => {
          // 调用删除生图API，成功后再更新页面状态
          const generatedImageId = this.galleryItems[dateIndex].galleryItem[itemIndex].images[0].generatedImageId;
          console.log('准备删除生成图片ID:', generatedImageId);
          deleteGeneratedImage(generatedImageId).then(() => {
            // 确认删除：删除对应的画廊项目
            this.galleryItems[dateIndex].galleryItem.splice(itemIndex, 1);

            // 同时删除状态数组中的对应元素
            this.favoriteStates[dateIndex].splice(itemIndex, 1);
            this.favoriteHoverStates[dateIndex].splice(itemIndex, 1);
            this.deleteHoverStates[dateIndex].splice(itemIndex, 1);

            // 如果整个日期组没有项目了，删除日期组
            if (this.galleryItems[dateIndex].galleryItem.length === 0) {
              this.galleryItems.splice(dateIndex, 1);
              this.favoriteStates.splice(dateIndex, 1);
              this.favoriteHoverStates.splice(dateIndex, 1);
              this.deleteHoverStates.splice(dateIndex, 1);
            }

            // 如果删除的是当前显示的项目，需要重新设置预览图片
            if (globalIndex === this.currentImageIndex) {
              // 计算总项目数
              let totalItems = 0;
              for (let i = 0; i < this.galleryItems.length; i++) {
                totalItems += this.galleryItems[i].galleryItem.length;
              }

              if (totalItems > 0) {
                const newIndex = Math.min(globalIndex, totalItems - 1);
                const { dateIndex: newDateIndex, itemIndex: newItemIndex } =
                  this.getDateAndItemIndex(newIndex);
                this.selectGalleryItem(newIndex, newDateIndex, newItemIndex);
              } else {
                // 画廊完全为空，清空预览图
                this.currentPreviewImage = '';
                this.currentImageIndex = -1;
                this.currentImageInSet = 0;
              }
            } else if (globalIndex < this.currentImageIndex) {
              this.currentImageIndex--;
            }

            this.$message.success('删除成功');
            console.log('删除画廊项目:', dateIndex, itemIndex);
          }).catch((error) => {
            console.error('删除画廊项目失败:', error);
            this.$message.error('删除失败，请稍后再试');
          });
        })
        .catch(() => {
          // 取消删除：弹框消失，不做任何操作
          console.log('取消删除画廊项目:', dateIndex, itemIndex);
        });
    },
    // 选择画廊项目
    selectGalleryItem(globalIndex, dateIndex, itemIndex) {
      this.currentImageIndex = globalIndex;
      this.currentImageInSet = 0; // 重置为显示第一张图片
      const selectedItem = this.galleryItems[dateIndex].galleryItem[itemIndex];

      if (
        selectedItem &&
        selectedItem.images &&
        selectedItem.images.length > 0
      ) {
        // 优先显示images数组中的图片
        this.currentPreviewImage = selectedItem.images[0].src;
        this.projectParameters = { ...selectedItem.projectParameters };
        console.log('selectedItem', selectedItem);
        // this.baseImageId = selectedItem.baseImageId;
        this.generatedImageId = selectedItem.images[0].generatedImageId;
        this.semanticImgUrlId = selectedItem.semanticImgUrlId;
        this.semanticImgUrl = selectedItem.semanticImgUrl;
        this.styleImageId = selectedItem.styleImageId;
        this.styleImgUrl = selectedItem.styleImgUrl;
      } else if (selectedItem && selectedItem.image) {
        // 如果没有images数组，显示单张image
        this.currentPreviewImage = selectedItem.image;
      } else {
        this.currentPreviewImage = '';
      }
    },

    downloadPSD() {
      this.$message.success('开始下载PSD格式');
    },
    // 保留参数生图
    saveParams() {
      this.$message.success('参数已保存');
      const params = {
        promptText: this.projectParameters.promptText,
        viewType: this.projectParameters.viewType,
        styleCategory: this.projectParameters.styleCategory,
        styleTransferLevel: this.projectParameters.styleTransferLevel,
        resolution: this.projectParameters.resolution,
        aspectRatio: this.projectParameters.aspectRatio,
        styleImgUrl: this.currentPreviewImage,
        styleImageId: this.styleImageId
      };
      this.$store.commit('generation/setGenerationParams', params);
      this.$router.push('/generate');
    },
    // 保留底图生图
    keepBaseGenerate() {
      // 这里可以添加实际的生成逻辑
      generateBaseImage({
        generated_image_id: this.generatedImageId
      }).then((res) => {
        console.log(this.projectParameters.viewType, 'this.projectParameters.viewType,')
        const params = {
          promptText: this.projectParameters.promptText,
          viewType: this.projectParameters.viewType,
          styleCategory: this.projectParameters.styleCategory,
          styleTransferLevel: this.projectParameters.styleTransferLevel,
          resolution: this.projectParameters.resolution,
          aspectRatio: this.projectParameters.aspectRatio,
          baseControlLevel: this.projectParameters.baseControlLevel,
          basemapUrl: res.data.url,
          basemapUrlId: res.data.id,
          semanticImgUrl: this.semanticImgUrl,
          semanticImgUrlId: this.semanticImgUrlId,
          styleImgUrl: this.styleImgUrl,
          styleImageId: this.styleImageId
        };
        this.$store.commit('generation/setGenerationParams', params);
        this.$router.push('/generate');
      });
    }
  }
};
</script>

<style scoped>
.generate-detail-container {
  height: calc(100vh - 70px);
  margin: 0 10px;
  padding: 0;
}

/* 顶部导航 */
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: white;
  border: 1px solid #dcdfe6;
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
}

/* 让内部的 el-row 与 el-col 同样撑满高度，确保 center-panel 能继承到 100% 高度 */
.content-wrapper>.el-row,
.content-wrapper>.el-row>.el-col {
  height: 100%;
}

/* 左侧参数面板 */
.params-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.28s;
  padding: 0;
  /* 移除内边距 */
  height: 100%;
  overflow-x: hidden;
  /* 防止横向滚动条 */
  overflow-y: hidden;
  scrollbar-width: thin;
  /* FireFox */
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
  border-radius: 8px;
  position: relative;
  /* 为绝对定位的子元素提供定位上下文 */
}

/* .params-panel-top {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  height: calc(100vh - 400px);
  background: #fff;
  box-sizing: border-box;
} */
/* 问号图标样式 */
.question-icon {
  width: 16px;
  height: 16px;
  background: transparent !important;
  color: #000 !important;
  border: 1px solid #000 !important;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  line-height: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
}

.question-icon:hover {
  color: #000;
  border-color: #000;
  transform: scale(1.1);
}

.params-section {
  width: 100%;
  padding: 15px 15px 80px 15px;
  /* 底部添加额外间距 */
  border-radius: 8px;
  background: #fff;
}

.section-favorate {
  position: sticky;
  top: 0;
  right: 0;
  z-index: 99;
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 画廊操作图标样式 */
.gallery-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}

.gallery-icon-box {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.gallery-icon-wrapper {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.gallery-action-icon {
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
}

.gallery-action-icon:hover {
  transform: scale(1.1);
}

.gallery-action-icon.active {
  transform: scale(1.1);
}

/* 爱心图标特殊样式 */
.favorite-gallery-icon.active,
.favorite-gallery-icon:hover {
  color: #ff6b6b;
}

.favorite-gallery-icon.active svg,
.favorite-gallery-icon:hover svg {
  fill: #ff6b6b;
  color: #ff6b6b;
}

/* 加号图标特殊样式 */
.plus-gallery-icon.active,
.plus-gallery-icon:hover {
  color: #52c41a;
}

.plus-gallery-icon.active svg,
.plus-gallery-icon:hover svg {
  fill: #52c41a;
  color: #52c41a;
}

/* 深度选择器确保SVG样式生效 */
.gallery-actions .favorite-gallery-icon.active /deep/ svg,
.gallery-actions .favorite-gallery-icon:hover /deep/ svg,
.gallery-actions .favorite-gallery-icon.active /deep/ svg *,
.gallery-actions .favorite-gallery-icon:hover /deep/ svg * {
  fill: #ff6b6b !important;
  color: #ff6b6b !important;
  stroke: #ff6b6b !important;
}

.gallery-actions .plus-gallery-icon.active /deep/ svg,
.gallery-actions .plus-gallery-icon:hover /deep/ svg,
.gallery-actions .plus-gallery-icon.active /deep/ svg *,
.gallery-actions .plus-gallery-icon:hover /deep/ svg * {
  fill: #52c41a !important;
  color: #52c41a !important;
  stroke: #52c41a !important;
}

/* 确保图标在各种状态下的颜色 */
.gallery-action-icon * {
  transition: all 0.3s ease;
}

.gallery-action-icon svg {
  width: 14px;
  height: 14px;
}

/* 水平布局的参数项 */
.horizontal-item {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

/* Vue 2 深度选择器语法 */
.horizontal-item /deep/ .el-textarea__inner {
  font-size: 12px;
  margin: 0 0 20px 5px !important;
  padding: 5px;
  color: #000;
  background: #eee;
  height: 120px;
}

.segmentation-image {
  width: 110px;
  height: 80px;
  border: 1px solid #ccc;
}

.base-style {
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base-style label {
  display: block;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  flex-shrink: 0;
  text-align: left;
  font-weight: 500;
}

.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0;
  font-size: 12px;
}

.button-group span {
  border: 1px solid #ccc;
  color: #000;
  display: inline-block;
  padding: 5px 2px;
  border-radius: 8px;
  padding: 0 10px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background: #eee;
}

.save-params-btn {
  font-size: 18px;
  width: 180px;
  text-align: center;
  color: #000;
  background: #fff;
  border-radius: 5px;
  padding: 8px 0;
  border: 1px solid #ccc;
  cursor: pointer;
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 中间预览区域 */
.center-preview-area {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  /* 让内部 .preview-actions 绝对定位时以此容器为参考 */
  /* 高度由 JS 动态计算，不再使用 aspect-ratio */
  height: 100%;
}

.main-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  /* width: 100%; */
  height: calc(100% - 200px);
  background: white;
  border: 1px solid #dcdfe6;
  /* max-height: 500px; */
  position: relative;
}

.empty-preview {
  /* 同样使用 flex 以便文本居中 */
  position: relative;
  display: inline-block;
  margin: 10px;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  max-height: 400px;
  background: #fff;
}

.empty-preview i {
  width: 100%;
  max-height: 400px;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 预览图操作按钮样式 */
.preview-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 10;
}

.preview-action-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 50%;
  color: #777;
}

.preview-action-icon:hover {
  /* transform: scale(1.1); */
  background: #777;
  color: #fff;
}

.preview-action-icon svg:hover {
  fill: #fff !important;
}

.preview-action-icon svg {
  fill: #ccc !important;
  width: 16px;
  height: 16px;
  transition: all 0.3s ease;
}

.nav-arrows {
  width: 90px;
  position: absolute;
  bottom: 20px;
  /* 距底部 15px */
  left: 50%;
  /* 水平居中 */
  display: flex;
  justify-content: space-between;
  transform: translateX(-50%);
  /* 以自身宽度居中 */
  pointer-events: none;
}

/* 图片翻页 */
.nav-btn {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(238, 238, 238, 0.5);
  border: none;
  padding: 5px;
  pointer-events: auto;
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  border: 1px solid #ccc;
}

.nav-btn:hover {
  background: rgba(238, 238, 238, 0.7);
}

.nav-btn:disabled {
  background: rgba(0, 0, 0, 0.2);
  cursor: not-allowed;
}

.prev-btn::before,
.next-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 15px;
  border: solid #333;
  border-width: 0 2px 2px 0;
  transform-origin: center;
}

.prev-btn::before {
  transform: translate(-30%, -50%) rotate(135deg);
}

.next-btn::before {
  transform: translate(-70%, -50%) rotate(-45deg);
}

.transfer-action {
  /* 置于 .center-preview-area 正下方 60px（按钮高度约 40px + 间距） */
  width: 100%;
  margin-top: 15px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 60px;
}

.transfer-btn {
  padding: 12px 40px;
  border-radius: 25px;
  border: 1px solid #000;
  color: #000;
  background: white;
  transition: all 0.3s;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
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

.transfer-btn:hover {
  background: #333;
  color: white;
}

/* 右侧画廊面板 */
.gallery-panel,
.project-panel {
  width: 100%;
  max-width: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.28s;
  padding: 0;
  /* 移除内边距 */
  height: calc(100vh - 180px);
  /* 减去tabs 标题高度48px + 边距12px + 收藏栏30px + 顶栏70px + 生图按钮区域 60px*/
  overflow-x: hidden;
  /* 防止横向滚动条 */
  /* 移除 overflow-y，让 simplebar 处理滚动 */
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 0 0 8px 8px;
}

.project-panel {
  /* height: calc(100vh - 28px); 与gallery-panel保持一致 */
  justify-content: space-between;
  padding-bottom: 80px;
  /* 为底部固定按钮留出空间 */
}

.gallery-section {
  width: 100%;
  padding: 15px;
  flex: 1;
  /* 让内容区域占据剩余空间 */
  min-height: 0;
  /* 确保flex子元素能正确收缩 */
  height: 100%;
}

/* .gallery-list {
  margin-top: 20px;
} */

/* 空状态提示样式 */
.empty-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #999;
}

.empty-gallery i {
  font-size: 48px;
  margin-bottom: 16px;
  color: #ddd;
}

.empty-gallery p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.empty-gallery .hint {
  font-size: 12px;
  color: #bbb;
  margin-top: 8px;
}

/* 日期分组样式 */
.date-group {
  margin-bottom: 15px;
}

.date-header {
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
  padding: 0px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gallery-item {
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.gallery-item:hover {
  border-color: #ccc;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.gallery-item.active {
  border-color: #000;
  background: #f0f9ff;
}

/* 画册操作按钮 */
.thumbnail-actions {
  position: absolute;
  top: 5px;
  left: 5px;
  display: flex;
  gap: 3px;
  opacity: 1;
}

.icon-style {
  font-size: 13px;
  position: absolute;
  right: -18px;
  color: #000;
}

/* SVG图标样式 */
.thumbnail-actions .action-icon svg {
  transition: all 0.2s ease;
}

.thumbnail-actions .action-icon:hover {
  transform: scale(1.1);
}

.thumbnail-actions .favorite-icon:hover,
.thumbnail-actions .favorite-icon:active {
  color: #ff6b6b !important;
}

.thumbnail-actions .favorite-icon:hover svg,
.thumbnail-actions .favorite-icon:active svg {
  fill: #ff6b6b !important;
  color: #ff6b6b !important;
}

/* 收藏状态下的红色爱心 - 增加优先级 */
.thumbnail-actions .favorite-icon.favorited,
.thumbnail-actions .favorite-icon.favorited svg,
.thumbnail-actions .favorite-icon.favorited .svg-icon,
.thumbnail-actions .favorite-icon.favorited use {
  color: #ff6b6b !important;
  fill: #ff6b6b !important;
  stroke: #ff6b6b !important;
}

.thumbnail-actions .favorite-icon.favorited:hover,
.thumbnail-actions .favorite-icon.favorited:hover svg,
.thumbnail-actions .favorite-icon.favorited:hover .svg-icon,
.thumbnail-actions .favorite-icon.favorited:hover use {
  color: #ff4757 !important;
  fill: #ff4757 !important;
  stroke: #ff4757 !important;
}

/* 强制设置已收藏状态的SVG图标颜色 */
.thumbnail-actions .favorite-icon[style*="color: #ff6b6b"] svg,
.thumbnail-actions .favorite-icon[style*="color: #ff6b6b"] svg *,
.thumbnail-actions .favorite-icon[style*="color: #ff6b6b"] use,
.thumbnail-actions .favorite-icon[style*="color: #ff6b6b"] path,
.thumbnail-actions .favorite-icon[style*="color: #ff6b6b"] circle,
.thumbnail-actions .favorite-icon[style*="color: #ff6b6b"] polygon {
  color: #ff6b6b !important;
  fill: #ff6b6b !important;
  stroke: #ff6b6b !important;
}

/* 使用深度选择器强制设置已收藏状态 */
.thumbnail-actions .favorite-icon.favorited /deep/ svg,
.thumbnail-actions .favorite-icon.favorited /deep/ svg *,
.thumbnail-actions .favorite-icon.favorited /deep/ use,
.thumbnail-actions .favorite-icon.favorited /deep/ path {
  color: #ff6b6b !important;
  fill: #ff6b6b !important;
  stroke: #ff6b6b !important;
}

/* 最强力的选择器 - 覆盖所有可能的样式 */
.thumbnail-actions .favorite-icon.favorited * {
  color: #ff6b6b !important;
  fill: #ff6b6b !important;
  stroke: #ff6b6b !important;
}

.thumbnail-actions .delete-icon:hover,
.thumbnail-actions .delete-icon:active {
  color: #f56565 !important;
}

.thumbnail-actions .delete-icon:hover svg,
.thumbnail-actions .delete-icon:active svg {
  fill: #f56565 !important;
  color: #f56565 !important;
}

.item-date {
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
}

.item-preview {
  width: 100%;
  height: 120px;
  background: #efefef;
  overflow: hidden;
  box-sizing: border-box;
}

.item-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.empty-item {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
}

/* 图片数量标识样式 */
.image-count-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: bold;
  line-height: 1;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.image-count-badge:before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  z-index: -1;
}

.item-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.action-icon {
  font-size: 12px;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-icon:hover {
  transform: scale(1.1);
}

.action-icon.active {
  color: #ff6b6b;
}

::v-deep.app-main[data-v-078753dd] {
  background-color: #f5f5f5 !important;
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

::v-deep .params-panel .el-tabs--card>.el-tabs__header .el-tabs__item {
  color: #ccc;
  flex: 1 1 0;
  /* 等宽 */
  text-align: center;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  /* 保持上方边框整合 */
  height: 48px;
  /* 固定高度 */
  line-height: 48px;
  /* 文本垂直居中 */
  padding: 0;
  /* 统一内边距，避免撑高 */
  border-radius: 8px 8px 0 0;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  color: #000 !important;
  background: #fff;
  font-weight: bold;
}

::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item:hover {
  color: #000;
  font-weight: bold;
}

/* ===== Tabs 占满宽度 ===== */
::v-deep .params-panel .el-tabs--card>.el-tabs__header .el-tabs__nav-wrap,
::v-deep .params-panel .el-tabs--card>.el-tabs__header .el-tabs__nav-scroll,
::v-deep .params-panel .el-tabs--card>.el-tabs__header .el-tabs__nav {
  flex: 1 1 0 !important;
  width: 100% !important;
}

/* 调整 nav 为 flex 布局并添加标签间距 */
::v-deep .params-panel .el-tabs--card>.el-tabs__header .el-tabs__nav {
  display: flex !important;
  gap: 5px;
}

/* 标签等宽，占满可用空间 */
::v-deep .params-panel .el-tabs--card>.el-tabs__header .el-tabs__item {
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

/* 让 Card 类型 Tabs 宽度占满 params-panel */
::v-deep .params-panel>.el-tabs.el-tabs--card.el-tabs--top {
  width: 100%;
}

/* 预览图也加圆角 */
.preview-image {
  overflow: hidden;
}
</style>
