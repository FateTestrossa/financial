<template>
  <div id="user">
    <div class="message">
      <el-button type="primary" @click.native="add" class="btn">添加用户</el-button>
      <el-table :data="data" :height="height" max-height="600" border v-if="data.length">
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="username" label="手机号"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.native="del(scope.$index, scope.row)" type="danger" size="small">移除</el-button>
            <el-button
              @click.native="updata(scope.$index, scope.row)"
              type="primary"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <useMsg v-show="userShow" :rowData="rowData" :upload="upload"/>
  </div>
</template>

<script>
import useMsg from "./common/user-msg";
export default {
  data() {
    return {
      data: [],
      height: 0,
      rowData: {},
      upload: false
    };
  },
  components: {
    useMsg
  },
  methods: {
    updata(index, row) {
      this.rowData = row;
      this.upload = true;
      this.$store.commit("userShow", true);
    },
    add() {
      this.rowData = {};
      this.$store.commit("userShow", true);
    },
    del(index, row) {
      console.log(row);
      this.$instance
        .post("delUser", { id: row.id })
        .then(res => {
          if (res.status === 200) {
            this.$instance
              .post("delUserAllData", { id: row.id })
              .then(res => {
                if (res.status === 200) {
                  this.reload();
                  this.$message({
                    type: "success",
                    message: "删除成功"
                  });
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    reload() {
      this.$instance
        .get("getUserAll")
        .then(response => {
          if (response.status == 200) {
            var res = response.data;
            this.data = res;
            this.name = res[0].name;
            this.height = this.data.length * 57 + 49;
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
  },
  computed: {
    change() {
      return this.$store.state.change;
    },
    userShow() {
      return this.$store.state.userShow;
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
#user {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .message {
    width: 1100px;
    height: 600px;
    .btn {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
