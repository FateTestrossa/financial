<template>
  <div id="look-psd">
    <div class="look-box">
      <div class="phone">
        <span>账号:</span>
        <el-input class="input" placeholder="输入您的手机号" v-model="cellphone" clearable></el-input>
      </div>
      <div class="verificationCode">
        <span>验证码:</span>
        <el-input class="input" placeholder="请输入验证码" v-model="testCode" clearable></el-input>
      </div>
      <div class="codeBtn">
        <el-button
          type="primary"
          style="padding:0 7px;height:30px"
          @click.native="getCode"
        >{{getCodeText}}</el-button>
      </div>
      <div class="next">
        <el-button class="nextBtn" type="primary" @click.native="setNewPSD">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: "",
      cellphone: "",
      testCode: "",
      isGetCode: false, //s是否允许获取验证码
      getCodeText: "获取验证码", //获取验证码按钮文字
      toastShow: false,
      toastText: ""
    };
  },
  methods: {
    pageChange() {
      this.width = document.documentElement.clientWidth;
      this.$el.style.setProperty("--width", this.width + "px");
    },
    back() {
      this.$router.push("/login");
    },
    //一分钟后可再次点击获取验证码按钮
    setClickAgain() {
      this.isGetCode = true;
      var time = 60;
      var _this = this;
      //每一秒改变按钮text
      var setText = window.setInterval(function() {
        _this.getCodeText = (time--).toString() + "秒后可重新发送";
        //去掉定时器的方法
        if (time == -1) {
          _this.isGetCode = false;
          _this.getCodeText = "获取验证码";
          window.clearInterval(setText);
        }
      }, 1000);
    },
    getCode() {
      var _this = this;
      //验证是否为空
      if (this.cellphone === "") {
        this.toastShow = true;
        this.toastText = "手机号不能为空";
      } else {
        //验证手机号吗格式是否正确
        var tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
        var re = new RegExp(tel);
        if (re.test(this.cellphone)) {
          //验证该手机账号是否存在过
          _this.$instance
            .post("user/testPhone", {
              phone: _this.cellphone
            })
            .then(function(response) {
              console.log(response);
              if (response.status == 200) {
                var res = response.data;
                if (res.code == 404) {
                  _this.toastShow = true;
                  _this.toastText = "该手机号未注册过";
                } else {
                  //一分钟后可再次点击获取验证码按钮
                  _this.setClickAgain();
                  //获得验证码
                  _this.$instance
                    .post("user/sendSMS", {
                      phone: _this.cellphone
                    })
                    .then(function(response) {
                      console.log(response);
                      if (response.status == 200) {
                        var res = response.data;
                        if (res.code === 200) {
                          _this.code = res.message;
                        } else if (res.code === 400) {
                          _this.toastShow = true;
                          _this.toastText = "验证码发送失败！";
                        }
                      }
                    })
                    .catch(function(err) {
                      console.log(err);
                    });
                }
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          this.toastShow = true;
          this.toastText = "手机号格式错误！";
        }
      }
    },
    //测试完成
    setNewPSD() {
      //验证码不为空，且正确
      if (this.testCode == "") {
        this.$message({
          message: "验证码不能为空！",
          type: "error"
        });
      } else {
        if (this.testCode == this.code) {
          this.$router.push("/setnewPSD");
        } else {
          this.$message({
            message: "验证码错误！",
            type: "error"
          });
        }
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
  }
};
</script>

<style lang="less" scoped>
#look-psd {
  position: relative;
  display: flex;
  width: var(--width);
  height: var(--height);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/img/login.jpg") no-repeat;
  .look-box {
    width: 550px;
    height: 400px;
    border-radius: 10px;
    padding: 0 20px;
    box-sizing: border-box;
    background: linear-gradient(
      220deg,
      rgba(53, 53, 53, 0.8),
      rgba(80, 80, 114, 0.8) 50%,
      rgba(58, 57, 57, 0.5) 100%
    );
    .phone,
    .verificationCode {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      margin-top: 50px;
      span {
        color: #fff;
      }
      .input {
        width: 400px;
      }
    }
    .codeBtn {
      margin: 10px 0;
      text-align: right;
    }
    .next {
      margin-top: 50px;
      text-align: center;
      .nextBtn {
        width: 300px;
        font-size: 20px;
      }
    }
  }
}
</style>
