<template>
  <div>
    <el-container style="height: 500px; border: 1px solid #eee">
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

      <el-container>
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
    };
  },

  beforeMount() {
    this.getSection();
    this.getData();
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

    getData() {
      this.$http
        .get("http://localhost/ci-test/public/index.php/Post/listPost", {})
        .then((response) => {
          let res = response.data;
          this.posts = res.data;
          if (res.status == "1") {
            this.posts = res.data;
            console.log(this.posts);
          }
        });
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
</style>

