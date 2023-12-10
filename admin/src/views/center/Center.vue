<template>
  <el-page-header icon="" title="管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 个人中心 </span>
    </template>
  </el-page-header>

  <el-row :gutter="20" style="margin-top: 20px">
    <el-col :span="8">
      <el-card class="box-card" style="text-align: center">
        <el-avatar :size="100" :src="avatarUrl" />
        <h3>{{ store.state.userInfo.username }}</h3>
        <h3>管理员</h3>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <template #header>
          <span class="card-header"> 个人首页 </span>
        </template>
        <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userFormRules"
          label-width="120px"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select
              v-model="userForm.gender"
              class="m-2"
              placeholder="Select"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="个人介绍" prop="introduction">
            <el-input
              v-model="userForm.introduction"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <Upload @getAvatarFile="getAvatarFile" :avatar="userForm.avatar" />
          </el-form-item>

          <el-form-item>
            <el-button
              style="margin: 30px auto"
              type="primary"
              @click="submitForm"
              >更新</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import Upload from "@/components/upload/Upload.vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import { computed, ref, reactive } from "vue";
// import request from "@/util/axios_config";
import axios from "axios";
const store = useStore();
const { username, gender, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
//性别对象
const options = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar, //上传文件后显示图片
  file: null, //用于提交给后端保存的字段
});
const userFormRules = {
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [
    { required: true, message: "请介绍一下自己吧", trigger: "blur" },
  ],
  avatar: [{ required: true, message: "来个头像", trigger: "blur" }],
};

const avatarUrl = computed(() => {
  return store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png";
});
const getAvatarFile = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const submitForm = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      //这里提交含有文件的表单逻辑
      const params = new FormData();
      for (let key in userForm) {
        params.append(key, userForm[key]);
      }

      axios
        .post("/adminapi/user/upload", params, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          store.commit("changeUserInfo", res.data.data);
          ElMessage.success("更新成功");
        });
    }
  });
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 20px;
}
.el-row .box-card {
  text-align: center;
}
</style>