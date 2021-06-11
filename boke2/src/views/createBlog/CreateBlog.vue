<template>
  <div class="createBlog">
    <Header />
    <div class="create">
      <div class="create__box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="博客标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="博客类别" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="代码" value="代码人生"></el-option>
              <el-option label="生活" value="流年岁月"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="博客封面">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="ruleForm.imageUrl"
                :src="ruleForm.imageUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <quill-editor
              ref="myQuillEditor"
              style="height: 500px"
              :options="editorOption"
              v-model="ruleForm.content"
            >
            </quill-editor>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import Header from "../../components/Header.vue";
import { CreateBlog } from "../../utils/http";
export default {
  components: { Header, quillEditor },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: ["red", "blue"] }, { background: ["#ccc", "block"] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ["clean"], //清除字体样式
            ["image", "video"], //上传图片、上传视频
          ],
        },
        theme: "snow",
        imageResize: {
          displayStales: {
            backgroundColor: "black",
            border: "none",
            color: "white",
          },
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      },
      ruleForm: {
        title: "",
        region: "",
        content: "",
        imageUrl: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入博客标题", trigger: "blur" },
          {
            min: 2,
            max: 80,
            message: "长度在 2 到 80 个字符",
            trigger: "blur",
          },
        ],
        region: [
          { required: true, message: "请选择博客分类", trigger: "change" },
        ],
        content: [
          { required: true, message: "请选择博客内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await CreateBlog(this.ruleForm);
          if (result.data.errno == 0) {
            this.$refs[formName].resetFields();
            this.ruleForm["imageUrl"] = "";
            this.$message({
              message: "创建博客成功！",
              type: "success",
            });
          }
        } else {
          this.$message({
            message: "创建博客失败！",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm["imageUrl"] = res.message.url;
      console.log(file);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.createBlog {
  img {
    width: 150px !important;
    height: 200px !important;
  }
  .create {
    width: 1200px;
    margin: 30px auto;
    .btn {
      margin-top: 150px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
