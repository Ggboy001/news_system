<template>
  <el-header>
    <div class="left">
      <el-icon><Menu /></el-icon>
      <span style="margin-left: 20px">新闻管理后台</span>
    </div>
    <div class="right">
      <span>欢迎 {{ $store.state.userInfo.username }}回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon size="28" color=""><User /></el-icon>
          <el-icon class="el-icon--right">
            <!-- <arrow-down /> -->
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>

            <el-dropdown-item @click="handleExit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { Menu, User } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const handleCenter = () => {
  router.push({
    path: "/center",
  });
};
const handleExit = () => {
  router.push({
    path: "/login",
  });
  localStorage.removeItem("token");
  store.commit("changeUserInfo", {});
};
</script>
<style>
.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left,
.right {
  display: flex;
}
.left i {
  margin: auto;
}
.el-dropdown {
  margin: auto;
}
</style>