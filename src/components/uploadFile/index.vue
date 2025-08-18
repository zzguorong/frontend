<template>
  <el-upload
    ref="upload"
    v-loading="realLoading"
    class="avatar-uploader"
    :action="actionUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :before-upload="beforeAvatarUpload"
    :data="uploadData"
    :headers="uploadHeaders"
  >
    <div v-if="imgUrl" style="position: relative; display: inline-block;">
      <img :src="imgUrl" class="avatar">
      <!-- 删除按钮 -->
      <i class="el-icon-close delete-btn" @click.stop.prevent="handleDelete" />
    </div>
    <div v-else class="upload-wrapper">
      <i class="el-icon-plus avatar-uploader-icon" />
      <div class="upload-text">{{ describeText }}</div>
    </div>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth';

export default {
  name: 'UploadFile',
  props: {
    imgUrl: { type: String, default: '' },
    describeText: { type: String, default: '' },
    finalApi: { type: String, default: '' },
    // 新增：父组件可传 loading
    loading: { type: Boolean, default: null }
  },
  data() {
    return {
      actionUrl: process.env.VUE_APP_BASE_API + this.finalApi,
      uploadData: {
        base_image: '',
        segment_image: '',
        style_image: ''
      },
      uploadHeaders: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + getToken()
      },
      selfLoading: false // 内部默认loading
    };
  },
  computed: {
    realLoading() {
      // 如果父组件传了loading，就用父的；否则用自己的
      return this.loading !== null ? this.loading : this.selfLoading;
    }
  },
  methods: {
    // 自定义上传方法，不发送网络请求
    // customUpload(options) {
    //   const file = options.file;
    //   console.log("自定义上传处理:", options);

    //   // 直接处理文件，不向服务器发送请求
    //   try {
    //     const imageUrl = URL.createObjectURL(file);

    //     // 模拟上传成功
    //     this.$emit("update:imgUrl", imageUrl);
    //     this.$emit("upload-success", {
    //       type: "1",
    //       res: { success: true },
    //       file: { raw: file },
    //       imageUrl,
    //     });

    //     this.$message.success("图片上传成功！");
    //     console.log("本地图片处理成功:", imageUrl);
    //   } catch (error) {
    //     console.error("图片处理失败:", error);
    //     this.$message.error("图片处理失败！");
    //   }
    // },

    // 头像上传失败处理
    handleAvatarError(err, file) {
      if (this.loading === null) this.selfLoading = false;

      this.$emit('upload-error', { err, file });
      this.$message.error('图片上传失败！');
    },
    // 头像上传成功处理（保留原方法以防需要）
    handleAvatarSuccess(res, file) {
      if (this.loading === null) this.selfLoading = false;
      console.log('上传成功:', res, file);
      // Element-UI 成功回调中 file.url 为本地地址 / res.data.url 为服务器地址
      let imageUrl = '';
      if (file && file.url) {
        imageUrl = file.url;
      } else if (res && res.url) {
        imageUrl = res.url;
      }
      // Fallback：本地预览
      if (!imageUrl && file && file.raw) {
        imageUrl = URL.createObjectURL(file.raw);
      }
      if (this.loading === null) this.selfLoading = false;
      // 更新父组件的 imgUrl
      this.$emit('update:imgUrl', imageUrl);
      this.$emit('upload-success', { res, file, imageUrl });
      // this.$message.success("图片上传成功！");
    },
    beforeAvatarUpload(file) {
      // 将当前文件同步到请求体额外字段
      if (this.finalApi === '/segment_image') {
        this.uploadData.segment_image = file;
      } else if (this.finalApi === '/style_image') {
        this.uploadData.style_image = file;
      } else {
        this.uploadData.base_image = file;
      }
      const isImage = file && file.type && file.type.startsWith('image/');
      const isLt500M = file.size / 1024 / 1024 < 50;
      if (!isImage) {
        this.$message.error('只能上传图片文件!');
        return false;
      }
      if (!isLt500M) {
        this.$message.error('上传图片大小不能超过 50MB!');
        return false;
      }
      if (this.loading === null) this.selfLoading = true;
      return true;
    },
    // 新增：删除按钮事件
    handleDelete() {
      this.$emit('delete');
    },
    getRawFiles() {
      return this.$refs.upload.uploadFiles.map(f => f.raw);
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.upload-wrapper {
  width: 100px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  position: relative;
}

.avatar-uploader-icon {
  width: 100px;
  height: 80px;
  font-size: 20px;
  color: #dcdfe6;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
}

.avatar-uploader-icon:after {
  content: "+";
  width: 15px;
  height: 15px;
  border: 1px solid #dcdfe6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #dcdfe6;
  margin-top: -10px;
}

.avatar-uploader-icon:before {
  display: none;
}

.upload-text {
  position: absolute;
  bottom: 15px;
  font-size: 12px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 80px;
  display: block;
  border-radius: 6px;
  border: 1px solid #dcdfe6;
}

.avatar-uploader {
  height: 80px;
}

el-icon-plus:before {}

.upload-progress {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 90px !important;
}

.upload-progress :deep(.el-progress-bar__outer) {
  height: 2px !important;
}

.upload-progress :deep(.el-progress-bar__inner) {
  transition: width 0.3s ease;
}

.avatar-uploader .delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  background-color: rgba(128, 128, 128, 0.6);
  /* 半透明灰色背景 */
  border-radius: 50%;
  color: #fff;
  /* 白色叉叉 */
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.avatar-uploader .delete-btn:hover {
  background-color: rgba(128, 128, 128, 0.9);
}
</style>
