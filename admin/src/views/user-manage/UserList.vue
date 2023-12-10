<template>
  <el-page-header icon="" title="用户管理">
    <template #content>
      <span class="text-large font-600 mr-3"> 用户列表</span>
    </template>
    <el-card>
      <el-table :data="userList" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="头像" width="180">
          <!-- 自定义一个模板,可以在这个模板中放任何你想放的,不止时数据 -->
          <template #default="scope">
            <div>
              <span v-if="scope.row.avatar">
                <el-avatar
                  size="default"
                  :src="'http://localhost:3000' + scope.row.avatar"
                ></el-avatar>
              </span>
              <span v-else> <el-avatar size="default"></el-avatar></span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="角色" width="">
          <!-- 自定义一个模板,可以在这个模板中放任何你想放的,不止时数据 -->
          <template #default="scope">
            <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">
              管理员</el-tag
            >
            <el-tag v-else class="ml-2" type="success"> 编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >更改</el-button
            >
            <el-popconfirm
              title="你确定要删除吗?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="编辑用户">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择">
            <el-option label="管理员" :value="1" />
            <el-option label="编辑" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select
            v-model="userForm.gender"
            placeholder="Please select a zone"
          >
            <el-option label="保密" :value="0" />
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input
            v-model="userForm.introduction"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-page-header>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
let userList = ref([]);
const dialogFormVisible = ref(false);
const userFormRef = ref();
const formLabelWidth = "140px";
let userForm = ref({
  _id: "",
  username: "",
  gender: 1,
  role: 1,
  introduction: "",
});
onMounted(async () => {
  await getList();
});
const getList = () => {
  axios.get("/adminapi/user/list").then((res) => {
    userList.value = res.data; //需要加一个.value
  });
};
const handleEdit = (user) => {
  userForm.value = user;
  dialogFormVisible.value = true;
};
const handleDelete = async (user) => {
  await axios.delete(`/adminapi/user/${user._id}`);
  await getList();
  //重新加载页面//性能最慢
  //重新请求数据//取中
  //本地删除//性能最好
};
const userFormRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],

  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  role: [{ required: true, message: "请选择角色", trigger: "blur" }],
});
const handleConfirm = () => {
  userFormRef.value.validate((valid) => {
    if (valid) {
      axios.put(`/adminapi/user/list`, userForm.value).then((res) => {
        getList();
        dialogFormVisible.value = false;
      });

      ElMessage.success("更改成功");
    }
  });
};
</script>
<style scoped>
.el-card {
  margin-top: 50px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
