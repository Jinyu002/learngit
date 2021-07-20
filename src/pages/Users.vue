<template>
  <div>
    <h1>已注册用户</h1>
    <div calss="posts">
      <ul>
        <li v-for="info in userinfo" :key="info.id">
          <el-row type="flex" justify="center"
            ><el-col :span="2">用户id:{{ info.id }}</el-col>
            <el-col :span="4"> 用户名：{{ info.username }}</el-col>
            <el-col :span="4">昵称：{{ info.nickname }}</el-col>
            <el-col :span="2">发帖数：{{ info.post_number }}</el-col>
            <el-col :span="2">回复数：{{ info.reply_number }}</el-col>
            <el-col :span="2"
              ><el-button type="text" @click="ban(info)"
                >封禁</el-button
              ></el-col
            ></el-row
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  beforeMount: function () {
    this.getData();
  },

  components: {},

  methods: {
    getData() {
      this.$http
        .get(
          "http://localhost/ci-test/public/index.php/Users/listUsers",
          {},
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          this.userinfo = res.data;
          if (res.status == "1") {
            this.userinfo = res.data;
            console.log(this.userinfo);
          }
        });
    },

    ban(info) {
      var vm = this;
      vm.id = info.id;
      console.log(vm.id);
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Users/ban",
          {
            //method:'post',
            userId: vm.id,
          },
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          console.log(res.status);
          if (res.status == "1") {
            this.$alert("封禁成功", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$message({
                  type: "info",
                  message: `action: ${action}`,
                });
              },
            });
          }
        });
    },
  },
};
</script>

<style>
.posts {
  background-color: white;
  padding: 0.5rem;
  margin: 0.5rem 3rem;
}
.posts li {
  list-style: none;
  margin-bottom: 14px;
  border-bottom: 1px solid #e7e7e7;
  line-height: 30px;
}

.posts li span {
  display: inline-block;
  text-align: center;
  width: 130px;
  font-size: 15px;
  margin: 0 10px;
}
.posts a {
  text-decoration: none;
  color: inherit;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.posts li el-button {
  display: inline-block;
  text-align: right;
}
</style>
