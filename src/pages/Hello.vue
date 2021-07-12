<head></head>
<template>
  <div>

    <h1>Hello</h1>
    <div id="tip"></div>
    <div id="tip"></div>
    <div>当前登录人：{{loginname}}</div>
    <div id="tip"></div>
    <div id="tip"></div>
    <el-button @click="gotologin">退出登录</el-button>
        
      
  </div>
</template>


<script>
 
export default {
  name: "menu1Demo",
  data() {
    return {
        loginname:"" 
    };
  },
  
 

  mounted(){
      this.loginname = this.cookie.getCookie("LoginName");
  },
  components: {},
  methods: {
    
    gotologin() {
      this.$http.post("http://localhost:63342/Login/logout.php?_ijt=ra23q9aabitr7t5mig83rkkhvl",)
      //删除cookie
      this.cookie.clearCookie("LoginName");
      this.$router.replace("/login");
    },
  },
  computed: {
    defaultActive() {
      console.log("/" + this.$route.path.split("/").reverse()[0]);
      return "/" + this.$route.path.split("/").reverse()[0];
    },
  },
};
</script>

<style  scoped>
>>> div.el-input {
  width: 350px;
  display: block;
  font-size: 12px;
}
>>> input.el-input__inner {
  border-width: 0px;
  border-bottom: 1px solid blue;
}

#input-modular {
  position: absolute;
  left: 200px;
}

#tip {
  width: 350px;
  height: 16px;
  display: block;
  font-size: 5px;
  margin-top: 1px;
  color: red;
}
#sex #location {
  width: 350px;
}
#description {
  display: inline-block;
  width: 100px;
  color: red;
}
</style>