<template>
  <el-page-header icon="" title="新闻管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 添加新闻</span>
    </template>
  </el-page-header>
  <el-form
    ref="newFormRef"
    :model="newForm"
    :rules="newFormRules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="newForm.title" />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <Editor @textChange="textChange"></Editor>
    </el-form-item>
    <el-form-item label="类别" prop="category">
      <el-select v-model="newForm.category" class="m-2" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="封面" prop="cover">
      <Upload @getAvatarFile="getAvatarFile" :avatar="newForm.cover" />
    </el-form-item>
    <el-form-item>
      <el-button style="margin: 30px auto" type="primary" @click="submitForm"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Upload from "@/components/upload/Upload.vue";
import Editor from "@/components/editor/Editor.vue";
const router = useRouter();
const newFormRef = ref();
const options = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知通告",
    value: 3,
  },
];
const getAvatarFile = (file) => {
  newForm.cover = URL.createObjectURL(file); //又是这种细节问题，草，麻烦下次复制的时候记得看清楚
  newForm.file = file;
};
const newForm = reactive({
  title: "",
  content: "",
  category: 1, //1 最新动态，2 典型案例，3通知公告
  cover: "",
  file: null, //保存图片文件，返还给后端
  isPublish: 0, //0未发布
});
const newFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请输入类别", trigger: "blur" }],
});
const textChange = (content) => {
  newForm.content = content;
};
const submitForm = () => {
  newFormRef.value.validate((valid) => {
    if (valid) {
      // 这里提交含有文件的表单逻辑
      const params = new FormData();
      for (let key in newForm) {
        params.append(key, newForm[key]);
      }
      axios
        .post("/adminapi/news/list", params, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          router.push("/news-manage/newslist");
          //   store.commit("changeUserInfo", res.data.data);
          ElMessage.success("提交成功");
        });
    }
  });
};
</script>
<style>
.el-form {
  margin-top: 50px;
}
</style>