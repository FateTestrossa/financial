<template>
  <div id="revenue">
    <div class="message" ref="message">
      <el-button type="primary" @click.native="add" class="btn">记一笔</el-button>
      <div class="no-messag" v-show="data.length == 0">目前没有收入数据</div>
      <el-table :data="data" :height="height" max-height="600" border v-if="data.length">
        <el-table-column prop="time" label="日期"></el-table-column>
        <el-table-column prop="typeName" label="类型"></el-table-column>
        <el-table-column prop="remake" label="备注"></el-table-column>
        <el-table-column prop="num" label="金额"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="cancel(scope.$index, scope.row)" type="danger" size="small">移除</el-button>
            <el-button @click="updata(scope.$index, scope.row)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <record :member="member" type="收入" :rowData="rowData" :upload="upload" v-show="recordShow"/>
  </div>
</template>

<script>
import Record from "./common/Record";
export default {
  components: {
    Record
  },
  data() {
    return {
      data: [],
      height: 0,
      member: 0,
      rowData: {},
      upload: false
    };
  },
  methods: {
    updata(index, row) {
      this.rowData = row;
      this.upload = true;
      this.$store.commit("recordShow", true);
    },
    cancel(index, row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$instance.post("delUserData", { id: row.id }).then(response => {
            if (response.status == 200) {
              this.$store.commit("change", 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.reload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      this.rowData = {};
      this.$store.commit("recordShow", true);
    },
    reload() {
      this.$instance
        .post("getUserIncome", {
          userId: parseInt(window.localStorage.userId)
        })
        .then(response => {
          //获取信息显示
          var res = response.data;
          if (res.length) {
            this.member = parseInt(res[0].member);
            this.data = res.map(item => {
              delete item.userId;
              return item;
            });
            this.height = this.data.length * 57 + 49;
          } else {
            this.data = res
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.reload();
  },
  computed: {
    change() {
      return this.$store.state.change;
    },
    recordShow() {
      return this.$store.state.recordShow;
    }
  },
  watch: {
    change() {
      this.reload();
    }
  }
};
</script>

<style lang="less" scoped>
#revenue {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .message {
    width: 1100px;
    height: 600px;
    .no-messag {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      color: #eee;
      font-size: 100px;
      text-align: center;
    }
    .btn {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
