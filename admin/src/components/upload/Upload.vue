<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleURL"
  >
    <img v-if="props.avatar" :src="updateavatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>
<script setup>
import { computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
const emit = defineEmits(["getAvatarFile"]);
const props = defineProps({ avatar: String }); //图片不会预览显示，因为这个props.avatar是只读的
const handleURL = (file) => {
  //选择图片之后可以显示出来
  // props.avatar = URL.createObjectURL(file.raw);//这个错了，avatar的作用是判断进入的时候有没有avatar，如果没有就显示默认图片
  emit("getAvatarFile", file.raw);
};

const updateavatar = computed(() => {
  return props.avatar.includes("blob")
    ? props.avatar
    : "http://localhost:3000" + props.avatar;
});
</script>
<style lang="scss" scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>