<template>
  <div id="myeditor"></div>
</template>

<script setup>
import E from "wangeditor";

import { onMounted, ref, defineEmits } from "vue";
const emit = defineEmits(["textChange"]);
onMounted(() => {
  const editor = new E("#myeditor");
  editor.create();
  editor.config.onchange = function (newHtml) {
    emit("textChange", newHtml);
  };
});
</script>

<style>
</style>