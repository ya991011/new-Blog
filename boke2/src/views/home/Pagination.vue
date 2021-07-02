<template>
  <!-- 分页 -->
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageList.PAGESIZE"
      layout="total, prev, pager, next"
      :total="pageList.count"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getBlogList } from "../../utils/http";
export default {
  data() {
    return {
      blogList: {},
      pageList: [],
      total: null,
    };
  },
  methods: {
    async handleCurrentChange(val) {
      const page = { page: val };
      const result = await getBlogList(page);
      console.log(result);
      this.blogList = result.data.data.blogList;
      this.pageList = result.data.data;
      this.total = result.data.data.count;
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
