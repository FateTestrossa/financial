<template>
  <div id="personal">
    <div class="message">
      <div>
        <span>昵称</span>
        <span :class="{active: name}">{{name}}</span>
      </div>
      <div>
        <span>手机号</span>
        <span>{{phone}}</span>
      </div>
      <div>
        <span>总收入</span>
        <span>{{sumIncome}}</span>
      </div>
      <div>
        <span>总支出</span>
        <span>{{sumPay}}</span>
      </div>
      <div>
        <span>今日收入</span>
        <span>{{nowDayIncome?nowDayIncome:'今日暂无支出'}}</span>
      </div>
      <div>
        <span>今日支出</span>
        <span>{{nowDayPay?nowDayPay:'今日暂无支出'}}</span>
      </div>
      <div>
        <span>本周收入</span>
        <span>{{nowWeekIncome?nowWeekIncome:'本周暂无支出'}}</span>
      </div>
      <div>
        <span>本周支出</span>
        <span>{{nowWeekPay?nowWeekPay:'本周暂无支出'}}</span>
      </div>
      <div>
        <span>本月收入</span>
        <span>{{nowMonthIncome?nowMonthIncome:'本月暂无收入'}}</span>
      </div>
      <div>
        <span>本月支出</span>
        <span>{{nowMonthPay?nowMonthPay:'本月暂无支出'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      phone: "", // 手机号
      nowMonthIncome: "0.0", //本月收入
      nowMonthPay: "0.0", //本月支出
      budgetBalance: "0.0", //预算余额
      nowDayIncome: "0.0", //今天收入
      nowDayPay: "0.0", //今天支出
      nowWeekIncome: "0.0", //本周收入
      nowWeekPay: "0.0", //本周支出
      sumPay: "0.0", //总支出
      sumIncome: "0.0" //总收入
    };
  },
  methods: {},
  mounted() {
    this.$instance
      .post("getHome", { userId: parseInt(window.localStorage.userId) })
      .then(response => {
        //获取信息显示
        var res = response.data;
        console.log(res);
        if (response.status == 200) {
          this.name = res.user.name;
          this.phone = res.user.username;
          this.nowMonthIncome = res.nowMonthIncome;
          this.nowMonthPay = res.nowMonthPay;
          this.budgetBalance = res.budgetBalance;
          this.nowDayIncome = res.nowDayIncome;
          this.nowDayPay = res.nowDayPay;
          this.nowWeekIncome = res.nowWeekIncome;
          this.nowWeekPay = res.nowWeekPay;
          this.sumIncome = res.sumIncome;
          this.sumPay = res.sumPay;
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>
<style lang="less" scoped>
#personal {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .message {
    width: 960px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    div {
      flex: 1;
      padding: 0 50px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #e5e9ef;
      &:first-of-type {
        border-top: none;
      }
    }
  }
  .active {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
