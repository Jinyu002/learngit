<template>
  <div>
    <h1>新增版块</h1>
    <el-input
      v-model="inputName"
      placeholder="请输入版块名称"
      minlength="4"
      maxlength="20"
    ></el-input>

    <el-input
      v-model="inputInfo"
      placeholder="请输入新版块描述"
      minlength="6"
      maxlength="27"
    ></el-input>
    <div><el-button @click="add">提交</el-button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputName: "",
      inputInfo: "",
    };
  },

  components: {},

  methods: {
    add() {
      var name = this.inputName;
      var info = this.inputInfo;
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Section/addSection",
          {
            name: name,
            info: info,
          },
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          console.log(res.status);
          if (res.status == "1") {
            this.$alert("添加成功", {
              confirmButtonText: "确定",
              callback: (action) => {
                this.$message({
                  type: "info",
                  message: `action: ${action}`,
                });
                this.$router.replace("/Administrator");
              },
            });
          }
        });
    },
  },
};
</script>

