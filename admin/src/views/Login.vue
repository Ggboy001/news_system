<template>
  <div id="app">
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
    />

    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="{
        background: {
          color: {
            value: '#2d3a4b',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 6,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }"
    />

    <div class="formContainer">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin: 30px auto"
            type="primary"
            @click="submitForm()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { loadSlim } from "tsparticles-slim";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// import request from "@/util/axios_config";
import axios from "axios";
import { useStore } from "vuex";
const particlesInit = async (engine) => {
  //await loadFull(engine);
  await loadSlim(engine);
};

const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};

const router = useRouter();
const store = useStore();
const loginForm = reactive({
  username: "",
  password: "",
});
const loginFormRef = ref(); //表单的引用对象
const loginRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
});
const submitForm = () => {
  //表单校验

  loginFormRef.value.validate((valid) => {
    if (valid) {
      // const { username, password } = loginForm;
      // request({
      //   url: "adminapi/user/login",
      //   method: "post",
      //   params: { username, <pass></pass>word },
      // }).then((res) => {
      //   if (res.status === 200) {
      //     console.log(res);
      //   }
      // });
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        store.commit("changeUserInfo", res);
        router.push("/index");
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 260px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: 0.4);
  text-align: center;
  padding: 50px 80px 50px 50px;

  border-radius: 10px;
}
</style>