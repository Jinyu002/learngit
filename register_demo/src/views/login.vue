<template>
  <div>
    <div id="input-modular">
      <el-input
        v-model="inputName"
        placeholder="请输入用户名。用户名为4-20个字节，首字母必须为英文，由字母，数字，_自组成"
        prefix-icon="el-icon-search"
        minlength="4"
        maxlength="20"  
        @change="onNameChange()"
      >用户名</el-input>
      <!-- <div v-if="this.messageName.length!=0">ggghgugfcf</div> -->
      <div id="tip">{{this.messageName}}</div>

      


      <el-input
        v-model="inputKey"
        placeholder="请输入密码。密码为6-27个字符"
        prefix-icon="el-icon-search"
        minlength="6"
        maxlength="27"
        @change="onKeyChange()"
      >密码</el-input>
       <div id="tip">{{this.messageKey}}</div>

      

     
    
    <el-row>
      
  <el-button @click="gotoregister">注册</el-button>
  <el-button @click="gotolink">登录</el-button>
  
</el-row>




    
    </div>  
  </div>
</template>

<script>

export default {
  name: "menu1Demo",
  data() {
    return {
      inputName: "",//绑定输入用户名
      
      
      inputKey:"",//绑定输入密码
      
      
      
      


      
      };
  },
  components: {
  },
  methods: {
    onNameChange() {
      //焦点消失 判断用户名输入值
      var regula = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{3,19}")
      if(regula.test(this.inputName)){
        //合法
        this.messageName=""

      }else{
        //不合法
        console.log("不合法")
        //不合法红色警告符
        this.messageName="!请输入4-20字符，首字母为英文，由字母、数字、下划线组成"
      }
      
    },

    

    onKeyChange(){
      var key=this.inputKey
      
        if(key===""){
          console.log("不合法")
          this.messageKey="!请输入密码"
        }else{
          this.messageKey=""
        }
        
  

      },


    

    
   

    gotolink(){

      this.$router.replace('/login')
    },

    gotoregister(){

      this.$router.replace('/Register')
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

<style scoped>
>>> div.el-input {
  width: 350px;
  display:block;
  font-size:12px;
}
>>> input.el-input__inner {
  border-width: 0px;
  border-bottom:1px solid blue;
}

#input-modular{
  position: absolute;
  left:200px;
}

#tip{
  width: 350px;
  height:16px;
  display:block;
  font-size:5px;
  margin-top:1px;
  color:red;
}
#sex #location{
  width:350px;
}
#description{
  display: inline-block;
  width:100px;
  color:red;
}
</style>