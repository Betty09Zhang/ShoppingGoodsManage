<template>
  <div>
    <el-card class="category-container">
    <template #header>
      <div class="header">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="formData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="分类名称"
      >
      </el-table-column>
      <el-table-column
        prop="sortOrder"
        label="排序值"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.categoryId)">修改</a>
          <a style="cursor: pointer; margin-right: 10px" @click="handleNext(scope.row)">下级分类</a>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteOne(scope.row.categoryId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
    />
  </el-card>
  <DialogAddCategory ref='addGood' :reload="getCategory" :type="type"></DialogAddCategory>
  </div>

 
</template>

<script>
// import { onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
// import { useRoute, useRouter } from 'vue-router'
// import { ElMessage } from 'element-plus'
import DialogAddCategory from '../DialogAddCategory.vue'
import axios from '../../utils/axios'
import { handleTime } from '../../utils/utils'
export default {
  name: 'Category',
  components: {
    DialogAddCategory
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      loading: false,
      parentId: 0,
      type: '',
      formData: [],
      total: 0,
      levelNumber: 1
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
      // 获取分类列表
    getCategory () {
      const { parentId = 0, pageSize = 10, currentPage = 1, levelNumber = 1 } = this.$route.query
      this.loading = true
      axios.get('/categories/findByPagination', {
        params: {
          pageNumber: currentPage,
          pageSize: pageSize,
          parentId: parentId
        }
      }).then(res => {
        const { data: {data, meta}, status} = res
        if (status == 200) {
          this.tableData = data
          this.formData = this.tableData.map(item => {
            if (item.createTime) {
              item.createTime = handleTime(item.createTime)
            }
            return item
          })
          this.total = meta.total
          this.loading = false
        }
      })
    },
    changePage(val){
      this.currentPage = val
      this.getCategory()
    },  
    handleNext(item){
      const levelNumber = item.categoryLevel + 1
      if (levelNumber == 4) {
        // ElMessage.error('没有下一级')
          this.$notify({
            title: '没有下一级',
            message:'error Operation',
            type:'error'
          });
        return
      }
      this.$router.push({
        name: `catagoryManage`,
        query: {
          // level: levelNumber,
          parentId: item.categoryId
        }
      })
    },
    handleEdit(id) {
      this.type = 'edit'
      // addGood.value.open(id)
      this.$refs.addGood.open(id)
    },
       // 添加分类
    handleAdd (){
      this.type = 'add'
      this.$refs.addGood.open()
    },
    // 选择项
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除
    handleDelete () {
      if (!this.multipleSelection.length) {
        this.$notify({
            title: '请选择删除选项',
          });
        return
      }
      axios.delete('/categories/delete', {
        data: {
          ids: this.multipleSelection.map(i => i.categoryId)
        }
      }).then((resp) => {
        if (resp && resp.status == 200) {
          this.$notify({
            title: '删除成功',
            message: 'Success'
          });
          this.getCategory()
        } else {
          this.$notify({
            title: '删除失败',
            message: 'Success'
          });
        }
      })
    },
    // 单个删除
    handleDeleteOne (id) {
      axios.delete('/categories/delete', {
        data: {
          ids: [id]
        }
      }).then((resp) => {
        if (resp && resp.status == 200) {
          this.$notify({
            title: '删除成功',
            message: 'Success'
          });
        } else {
          this.$notify({
            title: '删除失败',
            message: 'Failure'
          });
        }
        this.getCategory()
      })
    },
    unwatch() {
      // onUnmounted
      this.$router.afterEach((to) => {
        if (['category', 'level2', 'level3'].includes(to.name)) {
          this.getCategory()
        }
      })
    }
  },
  watch: {
    $route: {
      handler() {
        const parentId = this.$route.query.parentId
        this.getCategory()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .category-container {
    min-height: 100%;
  }
  /* .el-card.is-always-shadow {
    min-height: 100%!important;
  } */
</style>