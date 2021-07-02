<template>
  <div class="login">
    <div class="login__box">
      <el-card class="card">
        <div class="box">
          <div class="box__title">用户登录</div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            label-position="left"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input v-model="ruleForm.pass" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >登录</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { post } from "../../utils/http";
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        pass: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const result = await post(this.ruleForm);
            console.log(result);
            if (result.data.errno == 0) {
              const token = result.data.data.token;
              window.sessionStorage.setItem("token", token);
              const userInfo = {
                id: result.data.data.result.id,
                username: result.data.data.result.username,
              };
              window.sessionStorage.setItem(
                "userInfo",
                JSON.stringify(userInfo)
              );
              this.$router.push("/");
            }
          } catch {
            console.log("no ok");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  .login__box {
    position: relative;
    width: 100%;
    height: 100vh;
    .login__title {
      font-size: 20px;
    }
    .card {
      width: 800px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 30px;
      .box {
        width: 400px;
        margin: 0 auto;
        .box__title {
          font-size: 16px;
          color: #3a8ee6;
        }
      }
    }
  }
}
</style>
