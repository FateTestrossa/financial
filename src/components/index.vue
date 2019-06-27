<template>
  <div id="index">
    <div class="home-header">
      <h1 @click="back">家庭理财系统</h1>
      <div class="user">
        <div class="user-info" @click="person">
          <img src="../assets/img/business.jpg">
          <span class="name">{{name}}</span>
        </div>
        <el-button type="primary" @click.native="exit">退出</el-button>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      width: "",
      height: "",
      name: "", //昵称
      nowDate: null
    };
  },
  methods: {
    pageChange() {
      this.width = document.documentElement.clientWidth;
      this.$el.style.setProperty("--width", this.width + "px");
    },
    back() {
      this.$router.push({ name: "home" });
    },
    exit() {
      //退出登陆
      this.$router.push("/login");
    },
    person() {
      this.$router.push({ name: "person" });
    },
    reload() {
      //获取昵称、手机号 测试完成
      //获取头像、昵称、手机号
      var _this = this;
      this.$instance
        .post("getUser", { userId: window.localStorage.userId })
        .then(function(response) {
          if (response.status == 200) {
            var res = response.data;
            _this.name = res[0].name;
            // document.getElementsByTagName("img")[0].src=res.user.icon;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    this.reload();
    this.pageChange();
    this.height = document.documentElement.clientHeight;
    this.$el.style.setProperty("--height", this.height + "px");
    window.onresize = () => {
      this.pageChange();
    };
  },
  created() {
    this.nowDate = new Date();
    this.nowDate = this.$moment(this.nowDate).format("YYYY-MM-DD");
    this.$store.commit("nowDate", this.nowDate);
  },
  computed: {
    recordShow() {
      return this.$store.state.recordShow;
    }
  }
};
</script>
<style lang="less" scoped>
#index {
  position: relative;
  width: var(--width);
  height: var(--height);
  display: flex;
  flex-direction: column;
  .home-header {
    height: 50px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(
      220deg,
      rgba(53, 53, 53, 0.8),
      rgba(58, 57, 57, 0.5)
    );
    h1 {
      color: rgb(46, 46, 46);
      cursor: pointer;
    }
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        .name {
          margin: 0 0 0 10px;
          color: #fff;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
