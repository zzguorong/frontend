<template>
  <div class="dashboard-container">
    <el-row :gutter="25">
      <el-col :span="12"
        ><div class="dashboard-text">
          <div class="dashboard-text-btn">进入项目</div>
          <div class="dashboard-word"><span>文字介绍</span>

          </div>
          </div>
        </el-col>
      <el-col :span="12"><div class="dashboard-compare"><span>上下动态图对比</span></div></el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 30px;
  .dashboard-text{
    width:100%;
    display: flex;
    flex-direction: column;
    .dashboard-text-btn {
    width: 120px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    background-color: #000;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    margin: 40px 0 50px 0;
  }
  .dashboard-word {
    width:100%;
    background-color: #fff;
    height: 500px;
    border: 1px solid #ccc;
    span{
      display:inline-block;
      margin:80px 0 0 150px;
      font-size:14px;
      color:#aaa
    }

  }
  }
  .dashboard-compare{
    width:100%;
    height:620px;
    background:#fff;
    border:1px solid #ccc;
    span{
      display:inline-block;
      margin:200px 0 0 150px;
      font-size:14px;
      color:#aaa
    }
  }
}
</style>
