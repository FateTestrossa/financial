<template>
  <div id="login">
    <h1>欢迎使用家庭理财系统</h1>
    <div class="login-box">
      <div class="phone">
        <span>账号:</span>
        <el-input class="input" placeholder="请输入手机号" v-model="cellphone" clearable></el-input>
      </div>
      <div class="password">
        <span>密码:</span>
        <el-input
          class="input"
          type="password"
          autocomplete="new-password"
          placeholder="请输入密码,长度在6-16位,由字母、数字、特殊符号组成"
          v-model="password"
          clearable
        ></el-input>
      </div>
      <div class="forget-psd" @click="lookPSD">忘记密码？</div>
      <div class="btn">
        <el-button class="register" @click.native="register">注册</el-button>
        <el-button class="login" type="primary" @click.native="login">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import hex_md5 from "../assets/js/md5.js";

export default {
  data() {
    return {
      width: "",
      height: "",
      cellphone: "", //文本框绑定数据
      password: "",
      toastShow: false,
      toastText: "",
      toastType: "warn",
      clearTelShow: false,
      clearPadShow: false
    };
  },
  components: {},
  methods: {
    pageChange() {
      this.width = document.documentElement.clientWidth;
      this.$el.style.setProperty("--width", this.width + "px");
    },
    register() {
      this.$router.push("/register");
    },
    lookPSD() {
      this.$router.push("/lookPSD");
    },
    //登陆
    //测试完成
    login() {
      var _this = this;

      //验证手机号不为空，格式正确且该账号存在
      if (this.cellphone === "") {
        this.$message({
          message: "手机号不能为空",
          type: "error"
        });
      } else if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          this.cellphone
        )
      ) {
        this.$message({
          message: "手机号格式错误",
          type: "error"
        });
      } else if (this.password === "") {
        this.$message({
          message: "密码不能为空",
          type: "error"
        });
      } else {
        //验证该手机账号是否注册过
        _this.$instance
          .post("login", {
            name: this.cellphone,
            password: _this.password
          })
          .then(function(response) {
            if (response.status == 200) {
              var res = response.data;
              if (res.code == -1) {
                _this.$message({
                  message: "用户名或密码错误!",
                  type: "error"
                });
              } else {
                // 登陆成功
                _this.$message({
                  message: "登陆成功",
                  type: "success"
                });
                window.localStorage.removeItem("userId");
                window.localStorage.setItem("userId", res[0].id);
                _this.$router.push({ name: "expenditure" });
              }
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  },
  mounted: function() {
    this.pageChange();
    this.height = document.documentElement.clientHeight;
    this.$el.style.setProperty("--height", this.height + "px");
    window.onresize = () => {
      this.pageChange();
    };
    this.$instance
      .post("getUser", { userId: window.localStorage.userId })
      .then(response => {
        if (response.status == 200) {
          var res = response.data;
          this.cellphone = res[0].username;
          this.password = res[0].password;
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>
<style scoped lang="less">
@media screen and (max-width: 1200px) {
  #login {
    width: 1200px !important;
  }
}
#login {
  position: relative;
  display: flex;
  width: var(--width);
  height: var(--height);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/login.jpg") no-repeat;
  h1 {
    position: absolute;
    top: 50px;
    margin: 0;
    color: #c9f1f9;
    font-size: 100px;
    font-style: italic;
  }
  .login-box {
    width: 600px;
    height: 500px;
    border-radius: 10px;
    background: linear-gradient(
      220deg,
      rgba(53, 53, 53, 0.8),
      rgba(80, 80, 114, 0.8) 50%,
      rgba(58, 57, 57, 0.5) 100%
    );
    .phone,
    .password {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      margin-top: 80px;
      span {
        color: #fff;
      }
      .input {
        width: 500px;
        margin-left: 10px;
      }
    }
    .btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-top: 130px;
      .register,
      .login {
        width: 145px;
        height: 40px;
        margin: 0;
        padding: 0;
        font-size: 16px;
      }
    }
    .forget-psd {
      text-align: right;
      padding-top: 10px;
      padding-right: 15px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
