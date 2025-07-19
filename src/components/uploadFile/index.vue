<template>
  <el-upload
    ref="upload"
    class="avatar-uploader"
    :action="actionUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :data="uploadData"
    :headers="uploadHeaders"
  >
    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
    <div v-else class="upload-wrapper">
      <i class="el-icon-plus avatar-uploader-icon" />
      <div class="upload-text">{{ describeText }}</div>
    </div>
  </el-upload>
</template>
<script>
import { getToken } from "@/utils/auth";

export default {
  name: "uploadFile",
  data() {
    return {
      actionUrl: process.env.VUE_APP_BASE_API + this.finalApi,
      uploadData: {
        base_image: "",
        segment_image: "",
        style_image: "",
      },
      uploadHeaders: {
        Accept: "application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  props: {
    imgUrl: {
      type: String,
      default: "",
    },
    describeText: {
      type: String,
      default: "",
    },
    finalApi: {
      type: String,
      default: "",
    },
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

    // 头像上传成功处理（保留原方法以防需要）
    handleAvatarSuccess(res, file) {
      console.log("上传成功:", res, file);
      // Element-UI 成功回调中 file.url 为本地地址 / res.data.url 为服务器地址
      let imageUrl = "";
      if (file && file.url) {
        imageUrl = file.url;
      } else if (res && res.url) {
        imageUrl = res.url;
      }
      // Fallback：本地预览
      if (!imageUrl && file && file.raw) {
        imageUrl = URL.createObjectURL(file.raw);
      }
      this.$emit("update:imgUrl", imageUrl);
      this.$emit("upload-success", { res, file, imageUrl });
      this.$message.success("图片上传成功！");
    },

    beforeAvatarUpload(file) {
      // 将当前文件同步到请求体额外字段
      if (this.finalApi === "/segment_image") {
        this.uploadData.segment_image = file;
      } else if (this.finalApi === "/style_image") {
        this.uploadData.style_image = file;
      } else {
        this.uploadData.base_image = file;
      }
      const isImage = file && file.type && file.type.startsWith("image/");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        this.$message.error("只能上传图片文件!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return true;
    },
  },
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
el-icon-plus:before {
}

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
</style>
