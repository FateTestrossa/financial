<template>
  <div id="Home">
    <div class="home-body">
      <div class="home-left">
        <div class="user-management" @click="user">用户管理</div>
        <div class="expenditure-management" @click="expenditure">支出管理</div>
        <div class="revenue-rmanagement" @click="revenue">收入管理</div>
      </div>
      <div class="home-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {};
  },
  methods: {
    user() {
      this.$router.push({ name: "user" });
    },
    expenditure() {
      this.$router.push({ name: "expenditure" });
    },
    revenue() {
      this.$router.push({ name: "revenue" });
    }
  },
  mounted() {
    if (!window.localStorage.userId) {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang="less">
#Home {
  width: 100%;
  height: 100%;
  display: flex;
  .home-body {
    flex: 1;
    display: flex;
    .home-left {
      width: 300px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(
        220deg,
        rgba(0, 0, 0, 0.8),
        rgba(0, 0, 0, 0.9)
      );
      overflow: hidden;
      .user-management,
      .expenditure-management,
      .revenue-rmanagement {
        color: #fff;
        font-size: 30px;
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background: rgba(255, 255, 255, .1);
          cursor: pointer;
        }
      }
    }
    .home-right {
      flex: 1;
    }
  }
}
</style>
