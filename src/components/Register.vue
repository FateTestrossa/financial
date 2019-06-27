<template>
  <div id="register">
    <div class="login-box">
      <div class="name">
        <span>昵称:</span>
        <el-input class="input" placeholder="请输入昵称" v-model="name" clearable></el-input>
      </div>
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
      <div class="password">
        <span>确认密码:</span>
        <el-input
          class="input"
          type="password"
          autocomplete="new-password"
          placeholder="请再次输入密码"
          v-model="repeatPassword"
          clearable
        ></el-input>
      </div>

      <div class="btn">
        <el-button class="login" @click.native="back">已有账号</el-button>
        <el-button class="register" type="primary" @click.native="completed">完成注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// import hex_md5 from "../assets/js/md5.js";
export default {
  data() {
    return {
      //文本框绑定数据
      cellphone: "",
      name: "",
      testCode: "",
      password: "",
      repeatPassword: "",
      isGetCode: false, //控制按钮是否允许点击，disabled属性绑定数据
      getCodeText: "获取验证码", //获取验证码按钮文字
      //提示框信息
      toastShow: false,
      toastText: "",
      textShow: false,
      text: "",
      textType: "text",
      clearTelShow: false,
      clearPadShow: false,
      clearNameShow: false,
      clearRpdShow: false
    };
  },
  components: {},
  methods: {
    pageChange() {
      this.width = document.documentElement.clientWidth;
      this.$el.style.setProperty("--width", this.width + "px");
    },
    back() {
      this.$router.push("/login");
    },
    //完成注册，注册成功同时登陆
    //测试完成
    completed() {
      var _this = this;
      if (this.name === "") {
        this.$message({
          message: "昵称不能为空",
          type: "error"
        });
      } else if (this.cellphone == "") {
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
      } else if (this.password == "") {
        //验证码正确时验证密码，this.password获取用户输入的密码
        this.$message({
          message: "密码不能为空",
          type: "error"
        });
      } else if (this.repeatPassword !== this.password) {
        this.$message({
          message: "两次密码不一致",
          type: "error"
        });
      } else {
        //验证密码格式是否正确(长度在6-16位,必须由字母、数字、特殊符号组成)
        _this.$instance
          .post(
            // 发送请求，注册成功，直接登陆
            "/addUser",
            {
              username: this.cellphone,
              password: this.password,
              name: this.name
            }
          )
          .then(function(response) {
            if (response.status == 200) {
              var res = response.data;
              if (res.code == -1) {
                _this.$message({
                  message: "注册失败！",
                  type: "error"
                });
              } else {
                _this.$message({
                  message: "注册成功，将转到登陆页面！",
                  type: "success"
                });
                setTimeout(function() {
                  //转到登陆页面
                  _this.$router.push("/login");
                }, 3000);
              }
            } else {
              _this.$message({
                message: "注册失败！",
                type: "error"
              });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }
  },
  mounted: function() {
    this.password = "";
    this.pageChange();
    this.height = document.documentElement.clientHeight;
    this.$el.style.setProperty("--height", this.height + "px");
    window.onresize = () => {
      this.pageChange();
    };
  }
};
</script>
<style lang="less" scope>
@media screen and (max-width: 1200px) {
  #register {
    width: 1200px !important;
  }
}
#register {
  position: relative;
  display: flex;
  width: var(--width);
  height: var(--height);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/login.jpg") no-repeat;
  .login-box {
    width: 600px;
    height: 500px;
    padding: 0 30px;
    box-sizing: border-box;
    border-radius: 10px;
    background: linear-gradient(
      220deg,
      rgba(53, 53, 53, 0.8),
      rgba(80, 80, 114, 0.8) 50%,
      rgba(58, 57, 57, 0.5) 100%
    );
    .name,
    .phone,
    .password {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      margin-top: 40px;
      span {
        color: #fff;
      }
      .input {
        width: 450px;
        margin-left: 10px;
      }
    }
    .btn {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-top: 50px;
      .register,
      .login {
        width: 145px;
        height: 40px;
        margin: 0;
        padding: 0;
        font-size: 16px;
      }
    }
  }
}
</style>
