<template>
  <el-page-header @back="goBack" icon="" title="管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 首页 </span>
    </template>
  </el-page-header>

  <el-card class="box-card">
    <el-row>
      <el-col :span="4">
        <el-avatar :size="100" :src="avatarUrl" />
      </el-col>

      <el-col :span="20" style="line-height: 100px">
        <h3>欢迎回来, 来杯风油精提提神吧</h3>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="box-card">
    <div class="card-header">
      <span>公司产品</span>
      <el-button class="button" text>Operation button</el-button>
    </div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script setup>
import { useStore } from "vuex";

import { computed } from "vue";
const store = useStore();
const avatarUrl = computed(() => {
  return store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 50px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>