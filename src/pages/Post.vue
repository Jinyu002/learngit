<template>
  <div>
    <el-container>
      <el-header
        ><div style="text-align: center">
          <el-button @click="edit">编辑</el-button>
          <el-button @click="deletePost">删除</el-button>
        </div></el-header
      >
      <el-main>
        <span v-html="title"></span><br />
        <div style="margin: 20px 0"></div>
        <div>作者： <span v-html="author"></span><br /></div>
        <div style="margin: 20px 0"></div>
        <div>发布时间： <span v-html="date"></span><br /></div>
        <div style="margin: 20px 0"></div>
        <div class="content">
        <el-container>
          <main>
        <span v-html="content"></span>
          </main>
        </el-container>
        </div>
        <div style="margin: 20px 0"></div>
        <div class="posts">
          <el-container v-for="reply in replies" :key="reply.id">
            <el-header height="5px"></el-header>
            <el-container>
              <el-aside width="200px">{{ reply.username }}</el-aside>
              <el-container>
                <el-main
                  ><el-row>{{ reply.content }}</el-row>
                </el-main>
                <el-footer
                  ><el-row type="flex" justify="end"
                    ><el-col :span="2" type="flex" justify="end"
                      >{{ reply.floor }}楼</el-col
                    ><el-col :span="4.5" type="flex" justify="end">{{
                      reply.created_at
                    }}</el-col></el-row
                  ></el-footer
                >
              </el-container>
            </el-container>
          </el-container>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
        <div style="text-align: right; margin: 0">
          <el-button type="primary" @click="reply">回复</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>>

<script>
export default {
  data() {
    return {
      loginname: "",
      textarea: "",
      replies: {},
    };
  },

  // created:function(){
  //     this.getParams();
  //     this.getReply();
  // },

  mounted() {
    this.getParams();

    this.loginname = this.cookie.getCookie("LoginName");
    this.getReply();
  },

  watch: {
    $route: "getParams",
  },

  components: {},

  methods: {
    //取得路由带来的参数
    getParams: function () {
      var routeUsername = this.$route.params.name;
      var routeDate = this.$route.params.date;
      var routeContent = this.$route.params.content;
      var routeTitle = this.$route.params.title;
      var routeId = this.$route.params.id;

      this.title = routeTitle;
      this.author = routeUsername;
      this.date = routeDate;
      this.content = routeContent;
      this.id = routeId;
      console.log(routeUsername);
    },

    edit() {
      console.log(this.loginname);
      console.log(this.author);
      if (this.loginname != this.author) {
        this.$alert("非发帖人，无权限编辑", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      } else {
        this.$prompt("请修改内容", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }).then(({ value }) => {
          this.$http
            .post(
              "http://localhost/ci-test/public/index.php/Post/editPost",
              {
                content: value,
                postId: this.id,
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
      }
    },

    deletePost() {
      if (this.loginname != this.author) {
        this.$alert("非发帖人，无权限删除", {
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
            "http://localhost/ci-test/public/index.php/Post/deletePost",
            {
              //method:'post',
              postId: this.id,
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
                  this.$router.push("/Hello");
                },
              });
            }
          });
      }
    },

    reply() {
      var username = this.cookie.getCookie("LoginName");
      var content = this.textarea;
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
      } else if (content == "") {
        this.$alert("回复内容不能为空", {
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
            "http://localhost/ci-test/public/index.php/Post/reply",
            {
              username: username,
              postId: this.id,
              content: this.textarea,
            },
            { emulateJSON: true }
          )
          .then((response) => {
            let res = response.data;
            console.log(res.status);
            if (res.status == "1") {
              this.$alert("回复成功", {
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

    getReply() {
      this.$http
        .post(
          "http://localhost/ci-test/public/index.php/Post/listReply",
          {
            postId: this.id,
          },
          { emulateJSON: true }
        )
        .then((response) => {
          let res = response.data;
          // this.replies = res.data;
          if (res.status == "1") {
            this.replies = res.data;
            console.log(res.data);
          }
        });
    },
  },
};
</script>

<style>
.content {
  background-color: white;
  padding: 0.5rem;
  margin: 0.5rem 3rem;
}

.content span{
  display: inline-block;
  text-align: center;
  width: 1350px;
  font-size: 20px;
  /* margin: 0 10px; */

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
.posts ul li img {
  text-align: left;
  width: 1rem;
  height: 1rem;
}
.posts li span {
  display: inline-block;
  text-align: center;
  width: 70px;
  font-size: 20px;
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
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-footer {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 100px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px;
}
</style>