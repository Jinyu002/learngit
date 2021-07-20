<head></head>
<template>
  <div>
    <h1>Hello</h1>

    <el-container>
      <el-header
        ><el-row type="flex" justify="center">
          <el-col :span="20">当前登录人：{{ loginname }}</el-col>
          <el-col :span="4"
            >我的
            <el-dropdown>
              <i class="el-icon-caret-bottom" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><el-link type="myPost" @mypost="gotomyPost"
                    >我的帖子</el-link
                  ></el-dropdown-item
                >
                <el-dropdown-item
                  ><el-link type="myHomepage" @homepage="gotomyHomepage"
                    >我的主页</el-link
                  ></el-dropdown-item
                >
                <el-dropdown-item></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-dropdown>
        <i class="el-icon-caret-bottom" style="margin-right: 20px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的帖子</el-dropdown-item>
          <el-dropdown-item>我的主页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
          </el-col>
          <el-col :span="4"
            ><el-link type="logout" @click="gotologin">退出登录</el-link>
          </el-col>
        </el-row></el-header
      >
      <el-container style="height: 600px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <div id="tip"></div>
          <el-menu :default-openeds="['1', '3']">
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-film"></i>论坛版块</template
              >
              <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item
                  v-for="section in sections"
                  :key="section.id"
                  @click="gotoMainlandMovies"
                  >{{ section.name }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container style="height: 600px; border: 1px solid #eee">
          <el-main>
            <div class="posts">
              <ul>
                <li v-for="post in posts" :key="post.id">
                  <!-- <router-link :to="{ name: 'user_info', params: { name: post.author.loginname }}" :title="post.author_id"> -->
                  <router-link
                    :to="{
                      name: '/Userinfo',
                      params: { name: post.username, id: post.id },
                    }"
                    :title="post.username"
                  >
                    <img
                      src="../assets/image/logo.png"
                      style="max-width: 20px"
                    />
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
                    <span> {{ post.title }} </span
                    ><span> {{ post.created_at }} </span>
                  </router-link>
                </li>
              </ul>
            </div>
            <el-input
              placeholder="请输入内容"
              v-model="inputTitle"
              maxlength="50"
              clearable
            >
            </el-input>
            <div style="margin: 20px 0"></div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
            <div style="margin: 20px 0"></div>
            <el-row>
              <el-col :span="1">
                <el-button type="primary" @click="publish">发表</el-button>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  name: "menu1Demo",
  data() {
    return {
      loginname: "",
      inputTitle: "",
      textarea: "",
      posts: {},
      sections: {},
    };
  },

  beforeMount() {
    this.getData();
    this.getSection();
  },

  mounted() {
    this.loginname = this.cookie.getCookie("LoginName");
  },
  components: {},
  methods: {
    gotologin() {
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

    publish() {
      var username = this.cookie.getCookie("LoginName");
      var title = this.inputTitle;
      console.log(username);
      if (username == null) {
        this.$alert("请先登录", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
            this.$router.push("/login");
          },
        });
      } else if (title == "") {
        this.$alert("标题不能为空", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else {
        this.$http
          .post(
            "http://localhost/ci-test/public/index.php/Post/publishPost",
            {
              username: username,
              title: this.inputTitle,
              content: this.textarea,
            },
            { emulateJSON: true }
          )
          .then((response) => {
            let res = response.data;
            console.log(res.status);
            if (res.status == "1") {
              this.$alert("发表成功", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$message({
                    type: "info",
                    message: `action: ${action}`,
                  });
                },
              });
            } else {
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
.posts ul li img {
  text-align: left;
  width: 1rem;
  height: 1rem;
}
.posts li span {
  display: inline-block;
  text-align: center;
  width: 300px;
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

/* >>> div.el-input {
  width: 350px;
  display: block;
  font-size: 12px;
} */
/* >>> input.el-input__inner {
  border-width: 0px;
  border-bottom: 1px solid blue;
} */

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.inputStyle {
  text-align: center;
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