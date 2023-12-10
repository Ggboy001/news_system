<template>
  <el-page-header icon="" title="用户管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 添加用户</span>
    </template>
  </el-page-header>
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
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="userForm.password" />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="userForm.gender" class="m-2" placeholder="Select">
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

    <el-form-item label="角色" prop="role">
      <el-select v-model="userForm.role" class="m-2" placeholder="Select">
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="头像" prop="">
      <el-card>
        <el-avatar shape="square" :size="100" src="" />
      </el-card>
    </el-form-item>

    <el-form-item>
      <el-button style="margin: 30px 50px" type="primary" @click="submitForm"
        >添加人员</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import postForm from "@/util/postform";
const router = useRouter();
const userForm = reactive({
  username: "",
  password: "",
  gender: 0,
  role: 1,
  introduction: "",
  avatar: "",
});
const roleOptions = [
  { label: "管理员", value: 1 },
  { label: "编辑", value: 2 },
];
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
const userFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],

  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "blur" }],
  introduction: [
    { required: true, message: "请输入个人介绍", trigger: "blur" },
  ],
});
const userFormRef = ref();
const submitForm = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      //   axios.post("/user/adduser", userForm);
      postForm("/adminapi/user/add", userForm);
      ElMessage.success("添加成功");
      router.push("/user-manage/userlist");
    }
  });
};
</script>
<style>
.demo-ruleForm {
  margin-top: 40px;
}
</style>