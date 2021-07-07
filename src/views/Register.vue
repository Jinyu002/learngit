<template>
  <div>
    <div id="input-modular">
      <el-input
        v-model="inputName"
        placeholder="请输入用户名。用户名为4-20个字节，首字母必须为英文，由字母，数字，_自组成"
        prefix-icon="el-icon-edit"
        minlength="4"
        maxlength="20"
        @change="onNameChange()"
        >用户名</el-input
      >
      <!-- <div v-if="this.messageName.length!=0">ggghgugfcf</div> -->
      <div id="tip">{{ this.messageName }}</div>

      <el-input
        v-model="inputNick"
        placeholder="请输入昵称。昵称为4-20字符，不填则默认为用户名"
        prefix-icon="el-icon-edit"
        minlength="4"
        maxlength="20"
        @change="onNicknameChange()"
        >昵称</el-input
      >
      <div id="tip">{{ this.messageNick }}</div>

      <el-input
        v-model="inputKey"
        placeholder="请输入密码。密码为6-27个字符"
        prefix-icon="el-icon-edit"
        minlength="6"
        maxlength="27"
        @change="onKeyChange()"
        >密码</el-input
      >
      <div id="tip">{{ this.messageKey }}</div>

      <el-input
        v-model="inputConfirm"
        placeholder="请确认密码"
        prefix-icon="el-icon-edit"
        minlength="6"
        maxlength="27"
        @change="onConfirmChange()"
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
            ><el-date-picker v-model="birth" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-row>
      </div>

      <div id="tip"></div>

      <!-- <el-row :gutter="20" id="location">
        <el-col :span="8">
          <el-select v-model="value1" filterable placeholder="请选择">
            <el-option
              v-for="item in province"
              :key="item.value"
              :lbel="item.label"
              :value="item.value"
            >
            </el-option> </el-select
          >省
        </el-col>
        <el-col :span="8">
          <el-select v-model="value2" filterable placeholder="请选择">
            <el-option
              v-for="item in city"
              :key="item.value"
              :lbel="item.label"
              :value="item.value"
            >
            </el-option> </el-select
          >市
        </el-col>
        <el-col :span="8">
          <el-select v-model="value3" filterable placeholder="请选择">
            <el-option
              v-for="item in area"
              :key="item.value"
              :lbel="item.label"
              :value="item.value"
            >
            </el-option> </el-select
          >区
        </el-col>
      </el-row>
      <div id="tip"></div> -->
      <el-row>
        <el-col :span="4"><div id="location">所在地:</div></el-col>

        <v-distpicker>display: inline-block;</v-distpicker>
      </el-row>

      <el-input
        v-model="inputMail"
        placeholder="请输入邮箱。"
        prefix-icon="el-icon-edit"
        @change="onMailChange()"
        >邮箱</el-input
      >
      <!-- <div v-if="this.messageName.length!=0">ggghgugfcf</div> -->
      <div id="tip">{{ this.messageMail }}</div>

      <el-row>
        <el-col :span="6">
          <el-button>注册</el-button>
        </el-col>

        <el-col :span="6">
          <el-button @click="gotolink">登录</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu1Demo",

  data() {
    return {
      inputName: "", //绑定输入用户名

      inputNick: "", //绑定输入昵称
      inputKey: "", //绑定输入密码

      inputMail: "", //绑定输入邮箱
      inputConfirm: "", //绑定确认密码
      messageName: "", //绑定placeholder，提示用户名输入规则
      messageNick: "", //绑定placeholder，提示昵称输入规则
      messageKey: "", //绑定placeholder，提示用户密码输入规则
      messageMail: "", //绑定placeholder，提示用户邮箱输入
      messageConfirm: "", //绑定placeholder,提示用户确认密码
      radio: "1", //性别选择 1为男性

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      birth: "",

      province: [
        {
          //省的可选项
          value: "江苏",
          label: "江苏",
        },
        {
          value: "黑龙江",
          label: "黑龙江",
        },
        {
          value: "山东",
          label: "山东",
        },
        {
          value: "北京",
          label: "北京",
        },
        {
          value: "天津",
          label: "天津",
        },
      ],
      value1: "",

      city: [
        {
          //城市的可选项
          value: "南京",
          label: "南京",
        },
        {
          value: "哈尔滨",
          label: "哈尔滨",
        },
        {
          value: "北京",
          label: "上海",
        },
      ],
      value2: "",

      area: [
        {
          //区的可选项
          value: "江宁",
          label: "江宁",
        },
        {
          value: "秦淮",
          label: "秦淮",
        },
        {
          value: "玄武",
          label: "玄武",
        },
        {
          value: "鼓楼",
          label: "鼓楼",
        },
        {
          value: "朝阳",
          label: "朝阳",
        },
      ],
      value3: "",
    };
  },
  components: {},
  methods: {
    onNameChange() {
      //焦点消失 判断用户名输入值
      var regula = new RegExp("^[a-zA-Z][a-zA-Z0-9_]{3,19}");
      if (regula.test(this.inputName)) {
        this.messageName = "";
        //合法
      } else {
        //不合法
        console.log("不合法");
        //不合法红色警告符
        this.messageName =
          "!请输入4-20字符，首字母为英文，由字母、数字、下划线组成";
      }
    },

    onNicknameChange() {
      var nick = this.inputNick;
      var name = this.inputName;
      if (nick === "") {
        nick = name;
        this.inputNick = this.inputName;
      }
      if (nick.length < 4) {
        console.log("不合法");
        this.messageNick = "昵称太短了";
      } else {
        this.messageNick = "";
      }
    },

    onKeyChange() {
      var key = this.inputKey;
      var confirm = this.inputConfirm;
      if (key === "") {
        console.log("不合法");
        this.messageKey = "!请输入密码";
      } else {
        this.messageKey = "";
      }
      if (key.length < 6) {
        console.log("不合法");
        this.messageKey = "!密码太短了";
      } else {
        this.messageKey = "";
      }

      if (confirm != key) {
        console.log("不合法");
        this.messageConfirm = "!两次密码不一致";
      } else {
        this.messageConfirm = "";
      }
    },

    onConfirmChange() {
      var key = this.inputKey;
      var confirm = this.inputConfirm;
      if (confirm != key) {
        console.log("不合法");
        this.messageConfirm = "!两次密码不一致";
      } else {
        this.messageConfirm = "";
      }
    },

    onMailChange() {
      var regula = new RegExp(
        "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
      );
      if (regula.test(this.inputMail)) {
        //合法
      } else {
        console.log("不合法");
        this.messageMail = '请输入正确的邮箱格式';
      }
    },

    gotolink() {
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