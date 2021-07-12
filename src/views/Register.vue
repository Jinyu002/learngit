<template>
  <div>
    <div id="input-modular">
      <h1>注册</h1>
      <div id="tip"></div>

  
      <el-input
        v-model="inputName"
        placeholder='请输入用户名。用户名为4-20个字节，首字母必须为英文，由字母，数字，_组成'
        prefix-icon="el-icon-edit"
        minlength="4"
        maxlength="20"
        @change="checkName()"
        >用户名</el-input>

      <!-- <div v-if="this.messageName.length!=0">ggghgugfcf</div> -->
      <div id="tip">{{ this.messageName }}</div>

      <el-input
        v-model="inputNick"
        placeholder='请输入昵称。昵称为4-20字符，不填则默认为用户名'
        prefix-icon="el-icon-edit"
        minlength="4"
        maxlength="20"
        @change="checkNickname()"
        >昵称</el-input
      >
      <div id="tip">{{ this.messageNick }}</div>

      <el-input
        v-model="inputKey"
        show-password
        placeholder='请输入密码。密码为6-27个字符'
        prefix-icon="el-icon-edit"
        minlength="6"
        maxlength="27"
        @change="checkKey()"
        >密码</el-input
      >
      <div id="tip">{{ this.messageKey }}</div>

      <el-input
        v-model="inputConfirm"
        show-password
        placeholder="请确认密码"
        prefix-icon="el-icon-edit"
        minlength="6"
        maxlength="27"
        @change="checkConfirm()"
        >确认密码</el-input
      >
      <div id="tip">{{ this.messageConfirm }}</div>

      <el-row :gutter="20" id="sex">
        <el-col :span="6"> <div id="decription">性别：</div></el-col>
        <el-col :span="6">
          <el-radio v-model="radio" label="1">男</el-radio></el-col
        >
        <el-col :span="6"
          ><el-radio v-model="radio" label="2">女</el-radio></el-col
        >
      </el-row>
      <div id="tip"></div>

      <div class="block">
        <!-- <span class="demonstration">生日</span> -->
        <el-row>
          <el-col :span="6"> <div id="birthdate">生日:</div></el-col>
          <el-col :span="6"
            ><el-date-picker
              v-model="birth"
              type="date"
              placeholder='选择日期'
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </div>

      <div id="tip"></div>

      <el-row>
        <el-col :span="4"><div id="location">所在地:</div></el-col>
        <el-col :span='4'>
        <div id='description'>
          <v-distpicker 
          @province='checkProcince'
          @city='checkCity'
          @area='checkArea'
          ></v-distpicker>
        </div>
        </el-col>
      </el-row>

      <div id="tip"></div>

      <el-input
        v-model="inputMail"
        placeholder='请输入邮箱。'
        prefix-icon="el-icon-edit"
        @change="checkMail()"
        >邮箱</el-input
      >
      <!-- <div v-if="this.messageName.length!=0">ggghgugfcf</div> -->
      <div id="tip">{{ this.messageMail }}</div>

      <el-row>
        <el-col :span="6">
          <el-button @click="registerconfirm">注册</el-button>
        </el-col>

        <el-col :span="6">
          <el-button @click="gotolink">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "menu1Demo",

  data() {
    return {
      inputName: '', //绑定输入用户名

      inputNick: '', //绑定输入昵称
      inputKey: '', //绑定输入密码

      inputMail: '', //绑定输入邮箱
      inputConfirm: '', //绑定确认密码
      messageName: '', //绑定placeholder，提示用户名输入规则
      messageNick: '', //绑定placeholder，提示昵称输入规则
      messageKey: '', //绑定placeholder，提示用户密码输入规则
      messageMail: '', //绑定placeholder，提示用户邮箱输入
      messageConfirm: '', //绑定placeholder,提示用户确认密码
      radio: '1', //性别选择 1为男性
      messageprovince: '0',
      messagecity: '0',
      messagearea:'0',
      province:'',
      city:'',
      area:'',
      

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      birth: '',
    };
  },
  components: {},
  methods: {
    checkName() {
      //焦点消失 判断用户名输入值
      var regula = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{3,19}");
      if (regula.test(this.inputName)) {
        this.messageName = '';
        //合法
      } else {
        //不合法
        console.log('不合法');
        //不合法红色警告符
        this.messageName =
          '!请输入4-20字符，首字母为英文，由字母、数字、下划线组成';
      }
    },

    checkNickname() {
      var nick = this.inputNick;
      var name = this.inputName;
      if (nick === '') {
        nick = name;
        this.inputNick = this.inputName;
      }
      if (nick.length < 4) {
        console.log('不合法');
        this.messageNick = '昵称太短了';
      } else {
        this.messageNick = '';
      }
    },

    checkKey() {
      var key = this.inputKey;
      var confirm = this.inputConfirm;
      if (key === '') {
        console.log('不合法');
        this.messageKey = '!请输入密码';
      } else {
        this.messageKey = '';
      }
      if (key.length < 6) {
        console.log('不合法');
        this.messageKey = '!密码太短了';
      } else {
        this.messageKey = '';
      }

      if (confirm != key) {
        console.log('不合法');
        this.messageConfirm = '!两次密码不一致';
      } else {
        this.messageConfirm = '';
      }
    },

    checkConfirm() {
      var key = this.inputKey;
      var confirm = this.inputConfirm;
      if (confirm != key) {
        console.log('不合法');
        this.messageConfirm = '!两次密码不一致';
      } else {
        this.messageConfirm = '';
      }
    },

    checkProcince(a) {
      console.log(a)
      this.province=a.value
      this.messageprovince='1'
      
    },

     checkCity(a) {
      console.log(a)
      this.city=a.value
      this.messagecity='1'
    },

     checkArea(a) {
      console.log(a)
      this.area=a.value
      this.messagearea='1'
    },

   checkMail() {
      var regula = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (regula.test(this.inputMail)) {
        //合法
        this.messageMail='';
      } else {
        console.log('不合法');
        this.messageMail = '请输入正确的邮箱格式';
        return false;
      }
    },

    gotolink() {
      this.$router.replace("/login");
    },

    registerconfirm() {
      var name = this.inputName;
      var nick = this.inputNick;
      var key = this.inputKey;
      var kconfirm = this.inputConfirm;
      var mail = this.inputMail;
      var date = this.birth;
      // var testdate = new this.birth();
      // var dateobj_toLocaleDataString = testdate.toLocaleDataString();
      // console.log(dateobj_toLocaleDataString);
       
      console.log(date);
      
      //var city = locate.city;
     

      if (
        // !this.checkName() ||
        // !this.checkNickname() ||
        // !this.checkKey() ||
        // !this.checkConfirm() ||
        // !this.checkMail ||
        name=='' ||
        nick=='' ||
        key=='' ||
        kconfirm=='' ||
        mail=='' ||
        date == '' ||
        this.messageprovince=='0' ||
        this.messagecity=='0' ||
        this.messagearea=='0'
        
        //  !this.checkProcince() ||
        //  !this.checkCity() ||
        //  !this.checkArea()
        
       ) {
        this.$alert('请填写完整注册相关信息', {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else if (
        // this.checkName() ||
        // this.checkNickname() ||
        // this.checkKey() ||
        // this.checkConfirm() ||
        // this.checkMail()
        this.messageName!='' ||
        this.messageNick!='' ||
        this.messageKey!='' ||
        this.messageConfirm!='' ||
        this.messageMail!=''
      ) {
        this.$alert('请按格式填写注册相关信息', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else {
        axios.post('http://localhost:63342/Login/register.php?_ijt=k162tld4qes9hnk7di56oh8s4v',{
          //method:'post',
          username:this.inputName,
          password:this.inputKey,
          nickname:this.inputNick,
          email:this.inputMail,
          birthday:this.birth,
          sex:this.radio,
          province:this.province,
          city:this.city,
          area:this.area,
          
        })
        .then(response=>{
          let res = response.data;
          console.log(res.status);
          if(res.status=='1'){
            console.log('注册成功');
            this.errortip=true;
            this.errortip='注册成功';
            this.$alert("注册成功", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
          }else if(res.status=='0'){
            console.log(res);
            console.log('注册失败，用户名已存在');
            this.errortip=true;
            this.errortip='注册失败';
            this.$alert("注册失败，用户已存在", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
          }else if(res.status=='2'){
            console.log(res);
            console.log('数据后台校验未通过');
            this.errortip=true;
            this.errortip='注册失败';
            this.$alert("数据后台校验未通过，注册失败", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
          }else{
            console.log(res);
            console.log('数据库未连接');
            this.errortip=true;
            this.errortip='注册失败';
            this.$alert("数据库未连接，注册失败", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });

          }
        })
      }
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
  width: 500px;
  color: red;
}
</style>