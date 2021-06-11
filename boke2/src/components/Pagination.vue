<template>
  <!-- 分页 -->
  <div class="block">
    <el-pagination
      :background="true"
      :page-size="blogList.PAGESIZE"
      layout="total, prev, pager, next"
      :total="blogList.count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlogList } from "../utils/http";
export default {
  data() {
    return {
      currentPage4: 4,
      blogList: {},
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    async handleCurrentChange(val) {
      const page = { page: val };
      const result = await getBlogList(page);
      console.log(result);
      this.blogList = result.data.data.blogList;
      this.$emit("event", this.blogList);
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
