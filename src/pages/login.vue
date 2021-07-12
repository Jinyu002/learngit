<head></head>
<template>
  <div>
    <div id="input-modular">
      <h1>登录</h1>
      <div id="tip"></div>
      <el-input
        v-model="inputName"
        placeholder="请输入用户名。用户名为4-20个字节，首字母必须为英文，由字母，数字，_自组成"
        prefix-icon="el-icon-search"
        minlength="4"
        maxlength="20"
        @change="checkName()"
        >用户名</el-input
      >
      <!-- <div v-if="this.messageName.length!=0">ggghgugfcf</div> -->
      <div id="tip">{{ this.messageName }}</div>

      <el-input
        v-model="inputKey"
        show-password
        placeholder="请输入密码。密码为6-27个字符"
        prefix-icon="el-icon-search"
        minlength="6"
        maxlength="27"
        @change="checkKey()"
        >密码</el-input
      >
      <div id="tip">{{ this.messageKey }}</div>

      <el-row>
        <el-button @click="gotoregister">注册</el-button>
        <el-button @click="login">登录</el-button>
      </el-row>
    </div>
  </div>
</template>


<script>
//import axios from "axios";
export default {
  name: "menu1Demo",
  data() {
    return {
      inputName: "", //绑定输入用户名
      inputKey: "", //绑定输入密码
      messageName: "",
      messageKey: "",
    };
  },
  components: {},
  methods: {
    checkName() {
      //焦点消失 判断用户名输入值
      var regula = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{3,19}");
      if (!regula.test(this.inputName)) {
        //合法
        console.log("不合法");
        this.messageName =
          "!请输入4-20字符，首字母为英文，由字母、数字、下划线组成";
        return false;
        // this.messageName ='';
      } else {
        //不合法
        // console.log("不合法");
        //不合法红色警告符
        // this.messageName =
        //   "!请输入4-20字符，首字母为英文，由字母、数字、下划线组成";
        this.messageName = "";
        return true;
      }
    },

    checkKey() {
      var key = this.inputKey;

      if (key == "") {
        console.log("不合法");
        this.messageKey = "!请输入密码";
        return false;
      } else {
        this.messageKey = "";
        return true;
      }
    },
    login() {
      var name = this.inputName;
      var key = this.inputKey;
      if (name == "" || key == "") {
        this.$alert("请填写完整信息", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else if (!this.checkName() || !this.checkKey()) {
        this.$alert("请按格式填写信息", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else {
        // axios.post
        this.$http.post(
            "http://localhost:63342/Login/login.php?_ijt=koic5lvbvbkerk0hju1h5dve99",
            {
              //method:'post',
              username: this.inputName,
              password: this.inputKey,
            }
          )
          .then((response) => {
            let res = response.data;
            console.log(res.status);
            if (res.status == "1") {
              let loginInfo = {
                LoginName: this.inputName,
              };
              this.cookie.setCookie(loginInfo, 7);
              console.log("登陆成功");
              this.errortip = true;
              this.errortip = "登陆成功";
              this.$alert("登录成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$message({
                    type: "info",
                    message: `action: ${action}`,
                  });
                  this.$router.push("/Hello");
                },
              });
          //     axios
          // .get(
          //   "http://localhost:63342/Login/login.php?_ijt=koic5lvbvbkerk0hju1h5dve99",
          //   {

          //   })
            } else {
              console.log(res);
              console.log("登陆失败");
              this.errortip = true;
              this.errortip = "登陆失败";
              this.$alert(res.msg, {
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
      }
    },

    gotoregister() {
      this.$router.replace("/Register");
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
  left: 600px;
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