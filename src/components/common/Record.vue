<template>
  <div id="record">
    <div class="box">
      <div class="msg">
        <div class="msg-content">
          <span>选择类型：</span>
          <el-cascader
            class="msg-type"
            expand-trigger="hover"
            :options="options"
            @change="handleChange"
            v-model="typeName"
          ></el-cascader>
        </div>
        <div class="msg-content">
          <span>金额：</span>
          <el-input  class="msg-money" placeholder="请输入金额" v-model="money" clearable></el-input>
        </div>
        <div class="msg-content">
          <span>备注：</span>
          <el-input  class="msg-remake" placeholder="备注" v-model="remake" clearable></el-input>
        </div>
      </div>
      <div class="btn">
        <el-button type="primary" @click.native="add">确定</el-button>
        <el-button type="info" @click.native="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    member: {
      type: Number
    },
    type: {
      type: String
    },
    rowData: {
      type: Object
    },
    upload: {
      type: Boolean
    }
  },
  data() {
    return {
      options: [
        {
          value: "餐饮",
          label: "餐饮",
          children: [
            {
              value: "夜宵",
              label: "夜宵"
            },
            {
              value: "餐饮其他",
              label: "餐饮其他"
            },
            {
              value: "零食",
              label: "零食"
            },
            {
              value: "油盐酱醋",
              label: "油盐酱醋"
            }
          ]
        },
        {
          value: "交通",
          label: "交通",
          children: [
            {
              value: "打车",
              label: "打车"
            },
            {
              value: "公交",
              label: "公交"
            },
            {
              value: "地铁",
              label: "地铁"
            },
            {
              value: "加油",
              label: "加油"
            },
            {
              value: "停车费",
              label: "停车费"
            },
            {
              value: "过路过桥",
              label: "过路过桥"
            },
            {
              value: "罚款赔偿",
              label: "罚款赔偿"
            },
            {
              value: "保养维修",
              label: "保养维修"
            },
            {
              value: "火车",
              label: "火车"
            },
            {
              value: "船舶",
              label: "船舶"
            },
            {
              value: "自行车",
              label: "自行车"
            },
            {
              value: "交通其他",
              label: "交通其他"
            },
            {
              value: "车险",
              label: "车险"
            },
            {
              value: "驾照费用",
              label: "驾照费用"
            },
            {
              value: "长途汽车",
              label: "长途汽车"
            }
          ]
        },
        {
          value: "购物",
          label: "购物",
          children: [
            {
              value: "服饰鞋包",
              label: "服饰鞋包"
            },
            {
              value: "家居百货",
              label: "家居百货"
            },
            {
              value: "电子数码",
              label: "电子数码"
            },
            {
              value: "化妆护肤",
              label: "化妆护肤"
            },
            {
              value: "珠宝首饰",
              label: "珠宝首饰"
            },
            {
              value: "电器",
              label: "电器"
            },
            {
              value: "家居家纺",
              label: "家居家纺"
            },
            {
              value: "报刊书籍",
              label: "报刊书籍"
            },
            {
              value: "文具玩具",
              label: "文具玩具"
            },
            {
              value: "购物其他",
              label: "购物其他"
            },
            {
              value: "烟酒",
              label: "烟酒"
            },
            {
              value: "宝宝用品",
              label: "宝宝用品"
            },
            {
              value: "保健用品",
              label: "保健用品"
            },
            {
              value: "摄影文印",
              label: "摄影文印"
            }
          ]
        },
        {
          value: "娱乐",
          label: "娱乐",
          children: [
            {
              value: "ktv",
              label: "ktv"
            },
            {
              value: "电影",
              label: "电影"
            },
            {
              value: "网游电玩",
              label: "网游电玩"
            },
            {
              value: "电视",
              label: "电视"
            },
            {
              value: "运动健身",
              label: "运动健身"
            },
            {
              value: "洗浴足浴",
              label: "洗浴足浴"
            },
            {
              value: "茶酒咖啡",
              label: "茶酒咖啡"
            },
            {
              value: "旅游度假",
              label: "旅游度假"
            },
            {
              value: "歌舞演出",
              label: "歌舞演出"
            },
            {
              value: "娱乐其他",
              label: "娱乐其他"
            },
            {
              value: "花鸟宠物",
              label: "花鸟宠物"
            },
            {
              value: "麻将棋牌",
              label: "麻将棋牌"
            },
            {
              value: "聚会玩乐",
              label: "聚会玩乐"
            }
          ]
        },
        {
          value: "医教",
          label: "医教",
          children: [
            {
              value: "医疗用品",
              label: "医疗用品"
            },
            {
              value: "培训考试",
              label: "培训考试"
            },
            {
              value: "学杂教材",
              label: "学杂教材"
            },
            {
              value: "助学贷款",
              label: "助学贷款"
            },
            {
              value: "家教补习",
              label: "家教补习"
            },
            {
              value: "挂号门诊",
              label: "挂号门诊"
            },
            {
              value: "养生保健",
              label: "养生保健"
            },
            {
              value: "住院费",
              label: "住院费"
            },
            {
              value: "养老院",
              label: "养老院"
            },
            {
              value: "学费",
              label: "学费"
            },
            {
              value: "幼儿教育",
              label: "幼儿教育"
            },
            {
              value: "出国留学",
              label: "出国留学"
            },
            {
              value: "医教其他",
              label: "医教其他"
            }
          ]
        },
        {
          value: "居家",
          label: "居家",
          children: [
            {
              value: "手机电话",
              label: "手机电话"
            },
            {
              value: "电脑宽带",
              label: "电脑宽带"
            },
            {
              value: "房款房贷",
              label: "房款房贷"
            },
            {
              value: "物业",
              label: "物业"
            },
            {
              value: "住宿房租",
              label: "住宿房租"
            },
            {
              value: "材料建材",
              label: "材料建材"
            },
            {
              value: "家政服务",
              label: "家政服务"
            },
            {
              value: "快递邮政",
              label: "快递邮政"
            },
            {
              value: "生活其他",
              label: "生活其他"
            },
            {
              value: "美发美容",
              label: "美发美容"
            },
            {
              value: "保险费",
              label: "保险费"
            },
            {
              value: "消费贷款",
              label: "消费贷款"
            },
            {
              value: "税费手续费",
              label: "税费手续费"
            },
            {
              value: "漏记款",
              label: "漏记款"
            },
            {
              value: "婚庆摄影",
              label: "婚庆摄影"
            },
            {
              value: "生活费",
              label: "生活费"
            }
          ]
        },
        {
          value: "投资",
          label: "投资",
          children: [
            {
              value: "证券期货",
              label: "证券期货"
            },
            {
              value: "保险",
              label: "保险"
            },
            {
              value: "出资",
              label: "出资"
            },
            {
              value: "贵金属",
              label: "贵金属"
            },
            {
              value: "投资其他",
              label: "投资其他"
            },
            {
              value: "外汇",
              label: "外汇"
            },
            {
              value: "收藏品",
              label: "收藏品"
            },
            {
              value: "利息支出",
              label: "利息支出"
            },
            {
              value: "基金",
              label: "基金"
            },
            {
              value: "P2P",
              label: "P2P"
            },
            {
              value: "银行存款",
              label: "银行存款"
            },
            {
              value: "理财产品",
              label: "理财产品"
            },
            {
              value: "余额宝",
              label: "余额宝"
            },
            {
              value: "股票",
              label: "股票"
            }
          ]
        },
        {
          value: "人情",
          label: "人情",
          children: [
            {
              value: "礼金红包",
              label: "礼金红包"
            },
            {
              value: "物品",
              label: "物品"
            },
            {
              value: "慈善捐款",
              label: "慈善捐款"
            },
            {
              value: "代付款",
              label: "代付款"
            },
            {
              value: "人情其他",
              label: "人情其他"
            },
            {
              value: "请客",
              label: "请客"
            },
            {
              value: "孝敬",
              label: "孝敬"
            },
            {
              value: "给予",
              label: "给予"
            },
            {
              value: "养老院",
              label: "养老院"
            }
          ]
        },
        {
          value: "生意",
          label: "生意",
          children: [
            {
              value: "进货采购",
              label: "进货采购"
            },
            {
              value: "人工支出",
              label: "人工支出"
            },
            {
              value: "材料辅料",
              label: "材料辅料"
            },
            {
              value: "工程付款",
              label: "工程付款"
            },
            {
              value: "交通运输",
              label: "交通运输"
            },
            {
              value: "运营费",
              label: "运营费"
            },
            {
              value: "会务费",
              label: "会务费"
            },
            {
              value: "办公费用",
              label: "办公费用"
            },
            {
              value: "营销广告",
              label: "营销广告"
            },
            {
              value: "店面租金",
              label: "店面租金"
            },
            {
              value: "注册登记",
              label: "注册登记"
            },
            {
              value: "生意其他",
              label: "生意其他"
            }
          ]
        }
      ],
      money: "",
      remake: "",
      recordReason: [],
      typeName: [],
      rowId: 0
    };
  },
  methods: {
    handleChange(val) {
      this.recordReason = val;
    },
    add() {
      var _this = this;
      if (this.upload) {
        this.$instance
          .post("upUserData", {
            num: _this.money,
            typename: _this.typeName,
            remake: _this.remake,
            type: _this.type,
            id: _this.rowId
          })
          .then(function(response) {
            if (response.status == 200) {
              _this.$message({
                type: "success",
                message: "修改成功"
              });
              _this.$store.commit("change", 1);
              _this.$store.commit("recordShow", false);
            }
          });
      } else {
        //记账
        this.$instance
          .post("bill/addBill", {
            num: _this.money,
            member: _this.member,
            typeName: _this.recordReason,
            remake: _this.remake,
            time: this.$store.state.nowDate,
            type: _this.type,
            userId: window.localStorage.userId
          })
          .then(function(response) {
            if (response.status == 200) {
              _this.$message({
                type: "success",
                message: "记账成功"
              });
              _this.$store.commit("change", 1);
              _this.$store.commit("recordShow", false);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    cancel() {
      this.$store.commit("recordShow", false);
    }
  },
  watch: {
    rowData(val) {
      this.money = val.num;
      this.remake = val.remake;
      if (val.typeName) {
        this.typeName = val.typeName.split(",");
      } else {
        this.typeName = []
      }
      this.rowId = val.id;
    }
  }
};
</script>
<style lang="less" scoped>
#record {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  z-index: 999;
  .box {
    width: 300px;
    height: 270px;
    padding: 30px 30px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 20px #ccc;
    border-radius: 30px;
    background: #fff;
    .msg {
      .msg-content {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          width: 80px;
        }
        .msg-type,
        .msg-money,
        .msg-remake {
          flex: 1;
        }
      }
    }
    .btn {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
