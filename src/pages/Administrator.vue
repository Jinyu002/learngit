<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <div class="sections">
          版块
          <ul>
            <li v-for="section in sections" :key="section.id">
              <!-- <li> -->
              <span>
                {{ section.name }}
              </span>
              <el-button type="text" @click="editSection(section)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteSection(section)"
                >删除</el-button
              >
              <el-button type="text" @click="topSection(section)"
                >置顶</el-button
              >
            </li>
          </ul>
        </div>
      </el-aside>

      <el-container style="height: 700px; border: 1px solid #eee">
        <el-header style="font-size: 15px">
          <el-row>
            <el-col :span="6">
              <el-button type="text" @click="toUsers">已注册用户</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click="addSection">新增版块</el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="text" @click="logout">退出登录</el-button>
            </el-col>
            <!-- <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>编辑版块信息</el-dropdown-item>
          <el-dropdown-item @click="addSection">新增版块</el-dropdown-item>
          <el-dropdown-item>删除版块</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
            <el-col :span="6">
              <span>管理员：{{ loginname }}</span>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <div class="posts">
            <ul>
              <li v-for="post in posts" :key="post.id">
                <!-- <li> -->
                <router-link
                  :to="{
                    name: '/Users',
                    params: { name: post.username, id: post.id },
                  }"
                  :title="post.username"
                >
                  <img src="../assets/image/logo.png" style="max-width: 20px" />
                  <span>
                    {{ post.username }}
                  </span>
                </router-link>
                <router-link
                  :to="{
                    name: '/Post',
                    params: {
                      name: post.username,
                      date: post.created_at,
                      content: post.content,
                      title: post.title,
                      id: post.id,
                    },
                  }"
                  :title="post.title"
                >
                  <span>
                    {{ post.title }}
                  </span>
                  <span>
                    {{ post.created_at }}
                  </span>
                </router-link>
                <el-button type="text" @click="deletePost(post)"
                  >删除</el-button
                >
                <el-button type="text" @click="top(post)">置顶</el-button>
              </li>
            </ul>
          </div>
                      <div class="page-bar">
<ul>
<li v-if="cur>1"><a v-on:click="lastpageClick()">上一页</a></li>
<li v-if="cur==1"><a class="banclick">上一页</a></li>
<li v-for="index in indexs" v-bind:key="index" v-bind:class="{ 'active': cur == index}" >
<a v-on:click="btnClick(index)">{{ index }}</a>
</li>
<li v-if="cur!=all"><a v-on:click="nextpageClick()">下一页</a></li>
<li v-if="cur == all"><a class="banclick">下一页</a></li>
<li><a>共<i>{{all}}</i>页</a></li>
</ul>
</div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: {},
      sections: {},
      sectionName: "",
      sectionInfo: "",
      index:1,
      all: 10,//总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数
    };
  },

  beforeMount() {
    this.getSection();
    this.getData(this.index);
  },
  mounted() {
    this.loginname = this.cookie.getCookie("LoginName");
  },

  components: {
    // sortitems:function(){
    //   return this.items.sort(this.sortNumber)
    // },
    // sortPosts:function(){
    //   return sortByKey(this.posts,'post.sequence')
    // }
  },

  methods: {
    // sortNumber(a,b){
    //   return a-b;
    // },

    // sortByKey(arr,key){
    //   return arr.sort(function(a,b){
    //     var x=a[key];
    //     var y = b[key];
    //     return(x<y)?-1:((x>y)?1:0);
    //   });
    // },
    logout() {
      this.$http.post("http://localhost/ci-test/public/index.php/Users/logout");
      //删除cookie
      this.cookie.clearCookie("LoginName");
      this.$router.replace("/login");
    },

    getData: function(index) {
      this.$http
        .post("http://localhost/ci-test/public/index.php/Post/listPost", {
         //params:{
         page: index,
         limit:'20',
         state:0
        // }
        },
        { emulateJSON: true })
        .then((response) => {
          let res = response.data;
          this.posts = res.data;
          if (res.status == "1") {
            this.posts = res.data;
            this.dataList = [];
            for(let i = 0;i<20;i++){
              this.dataList.push(res.data[i])
            }
            this.all = res.totalPage;//总页数
            console.log(this.all);
            this.cur = res.pageNum;
            this.totalPage = res.totalPage;
          }
        });
    },

    //分页
btnClick: function(data){//页码点击事件
if(data != this.cur){
this.cur = data
}
//根据点击页数请求数据
this.getData(this.cur.toString());
},

nextpageClick: function(){
  this.cur ++;
//根据点击页数请求数据
this.getData(this.cur.toString());
},
lastpageClick: function(){
  this.cur --;
//根据点击页数请求数据
this.getData(this.cur.toString());
},

    getSection() {
      this.$http
        .get(
          "http://localhost/ci-test/public/index.php/Section/listSection",
          {}
        )
        .then((response) => {
          let res = response.data;
          this.sections = res.data;
          if (res.status == "1") {
            this.sections = res.data;
            console.log(this.posts);
          }
        });
    },

    deletePost(post) {
      //获取v-for里的post.id
      var vm = this;
      vm.id = post.id;
      console.log(vm.id);
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Post/deletePost",
          {
            //method:'post',
            postId: vm.id,
          },
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          console.log(res.status);
          if (res.status == "1") {
            this.$alert("删除成功", {
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
    toUsers() {
      this.$router.push("/Users");
    },

    addSection() {
      this.$router.push("/addSection");
    },

    deleteSection(section) {
      var vm = this;
      vm.id = section.id;
      console.log(vm.id);
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Section/deleteSection",
          {
            //method:'post',
            sectionId: vm.id,
          },
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          console.log(res.status);
          if (res.status == "1") {
            this.$alert("删除成功", {
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
    top(post) {
      var vm = this;
      vm.id = post.id;
      console.log(vm.id);
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Post/top",
          {
            //method:'post',
            postId: vm.id,
          },
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          console.log(res.status);
          if (res.status == "1") {
            this.$alert("置顶成功", {
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
    topSection(section) {
      var vm = this;
      vm.id = section.id;
      console.log(vm.id);
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Section/top",
          {
            //method:'post',
            sectionId: vm.id,
          },
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          console.log(res.status);
          if (res.status == "1") {
            this.$alert("置顶成功", {
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

    editSection(section) {
      var vm = this;
      vm.id = section.id;
      this.$prompt("请编辑版块名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        this.$http
          .post(
            "http://localhost/ci-test/public/index.php/Section/editSection",
            {
              sectionId: vm.id,
              sectionName: value,
            },
            { emulateJSON: true }
          )
          .then((response) => {
            let res = response.data;
            console.log(res.status);
            if (res.status == "1") {
              this.$alert("编辑成功", {
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
      });
    },
  },
  computed: {
    //分页
indexs: function(){
var left = 1;
var right = this.all;
var ar = [];
if(this.all>= 5){
if(this.cur > 3 && this.cur < this.all-2){
left = this.cur - 2
right = this.cur + 2
}else{
if(this.cur<=3){
left = 1
right = 5
}else{
right = this.all
left = this.all -4
}
}
}
while (left <= right){
ar.push(left)
left ++
}
return ar
},
    defaultActive() {
      console.log("/" + this.$route.path.split("/").reverse()[0]);
      return "/" + this.$route.path.split("/").reverse()[0];
    },
  },
};
</script>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

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

.sections li {
  list-style: none;
  margin-bottom: 14px;
  border-bottom: 1px solid #e7e7e7;
  line-height: 30px;
}
.sections li span {
  display: inline-block;
  text-align: center;
  width: 40px;
  font-size: 15px;
  margin: 0 10px;
}
.sections a {
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
.sections li el-button {
  display: inline-block;
  text-align: right;
}

.page-bar{
margin:40px auto;
margin-top: 20px;

}
ul,li{
margin: 0px;
padding: 0px;
}
li{
list-style: none
}
.page-bar li:first-child>a {
margin-left: 400px
}
.page-bar a{
border: 1px solid #ddd;
text-decoration: none;
position: relative;
float: left;
padding: 6px 12px;
margin-left: -1px;
line-height: 1.42857143;
color: #5D6062;
cursor: pointer;
margin-right: 20px;
}
.page-bar a:hover{
background-color: #eee;
}
.page-bar a.banclick{
cursor:not-allowed;
}
.page-bar .active a{
color: #fff;
cursor: default;
background-color: #E96463;
border-color: #E96463;
}
.page-bar i{
font-style:normal;
color: #d44950;
margin: 0px 4px;
font-size: 12px;
}
</style>

