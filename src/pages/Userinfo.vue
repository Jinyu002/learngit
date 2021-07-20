<template>
  <div>
    <h1>用户信息</h1>
    <div>用户名： <span v-html="username"></span><br /></div>
    <ul>
      <li v-for="info in userinfo" :key="info.id">
        <div>发布的帖子数：{{ info.post_number }}</div>
        <div>回复的帖子数：{{ info.reply_number }}</div>
      </li>
    </ul>
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
    this.getParams();
    this.getData();
  },
  watch: {
    $route: "getParams",
  },

  methods: {
    //取得路由带来的参数
    getParams: function () {
      var routeUsername = this.$route.params.name;
      var routeId = this.$route.params.id;
      console.log(routeId);
      this.username = routeUsername;
      this.id = routeId;
      console.log(this.username);
    },

    getData() {
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Users/number",
          {
            username: this.username,
          },
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
  },
};
</script>

