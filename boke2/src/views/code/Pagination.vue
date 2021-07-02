<template>
  <!-- 分页 -->
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageList.pagesize"
      layout="total, prev, pager, next"
      :total="pageList.count"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getCodeBlog } from "../../utils/http";
export default {
  data() {
    return {
      codeBlog: [],
      pageList: {},
    };
  },
  created() {},
  methods: {
    async handleCurrentChange(val) {
      const page = { page: val };
      const result = await getCodeBlog(page);
      console.log(result);
      this.codeBlog = result.data.data.codeBlog;
      this.pageList = result.data.data;
      this.$emit("event", this.codeBlog);
    },
  },
};
</script>

<style scoped lang="scss">
.block {
  background: none;
  color: #333;
}
</style>
