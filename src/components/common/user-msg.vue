<template>
  <div id="use-msg">
    <div class="box">
      <div class="name">
        <span>昵称：</span>
        <el-input class="input" placeholder="请输入昵称" v-model="name" clearable></el-input>
      </div>
      <div class="phone">
        <span>手机号：</span>
        <el-input class="input" placeholder="请输入手机号" v-model="phone" clearable></el-input>
      </div>
      <div class="psd">
        <span>密码：</span>
        <el-input class="input" placeholder="请输入密码" v-model="psd" clearable></el-input>
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
    rowData: {
      type: Object
    },
    upload: {
      type: Boolean
    }
  },
  data() {
    return {
      name: "",
      phone: "",
      psd: ""
    };
  },
  methods: {
    add() {
      if (this.upload) {
        this.$instance
          .post("upUser", {
            name: this.name,
            username: this.phone,
            password: this.psd,
            id: this.rowData.id
          })
          .then(response => {
            if (response.status == 200) {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.$store.commit("change", 1);
              this.$store.commit("userShow", false);
            }
          });
      } else {
        this.$instance
          .post("/addUser", {
            username: this.phone,
            password: this.psd,
            name: this.name
          })
          .then(response => {
            if (response.status == 200) {
              var res = response.data;
              if (res.code == -1) {
                this.$store.commit("userShow", false);
                this.$message({
                  message: "添加失败！",
                  type: "error"
                });
              } else {
                this.$store.commit("change", 1);
                this.$store.commit("userShow", false);
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
              }
            } else {
              this.$store.commit("userShow", false);
              this.$message({
                message: "添加失败！",
                type: "error"
              });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    cancel() {
      this.$store.commit("userShow", false);
    }
  },
  watch: {
    rowData(val) {
      this.name = val.name;
      this.phone = val.username;
      this.psd = val.password;
      this.rowId = val.id;
    }
  }
};
</script>
<style lang="less" scoped>
#use-msg {
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
    height: 300px;
    padding: 30px 30px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 20px #ccc;
    border-radius: 30px;
    background: #fff;
    .name,
    .phone,
    .psd {
      display: flex;
      align-items: center;
      span {
        width: 80px;
      }
      .input {
          flex: 1;
      }
    }
    .btn {
        display: flex;
        justify-content: space-around;
    }
  }
}
</style>
