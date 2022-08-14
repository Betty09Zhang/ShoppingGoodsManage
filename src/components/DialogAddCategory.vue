<template>
  <el-dialog
    :title="type == 'add' ? '添加分类' : '修改分类'"
    :visible="visible"
    width="400px"
    @close="handleClose"
    :modal-append-to-body=false
  >
    <el-form :model="ruleForm" :rules="rules" ref="formRef" label-width="100px" class="good-form">
      <el-form-item label="分类名称" prop="name" required>
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="rank" required>
        <el-input type="number" max="20" v-model="ruleForm.rank"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import axios from '../utils/axios'
export default {
  name: 'DialogAddCategory',
  props: {
    type: String,
    reload: Function,
    categoryId: Number
  },
  data() {
    let validateName = (rule, value, callback) => {
      if (!value || value.trim === '') {
        callback(new Error('名称不能为空'))
      } 
      if (value.length >= 20) {
        callback(new Error('名称长度不能大于20'))
      }
      callback()
    }
    let validateOrder = (rule, value, callback) => {
      if (!value) {
        callback(new Error('排序值不能为空'))
      } validateOrder
      if (value > 20 || value <= 0) {
        callback(new Error('排序值在1~20之间'))
      }
      callback()
    }
    return {
      visible: false,
      categoryLevel: 1,
      ruleForm: {
        name: '',
        rank: 1
      },
      rules: {
        name: [
          { validator: validateName, trigger: ['blur','change'] }
        ],
        rank: [
          { validator: validateOrder, trigger: ['blur','change'] }
        ]
      },
      id: ''
    }
  },
  computed: {
    // parentId() {
    //   const { parentId } = this.$route.query
    //   return parentId!=undefined ? parentId : 0
    // }
  },
  methods: {
    submitForm() {
      const _this = this
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (_this.type == 'add') {
            axios.post('/categories/create', {
              parentId: _this.parentId,
              categoryName: _this.ruleForm.name,
              sortOrder: _this.ruleForm.rank
            }).then(() => {
              // ElMessage.success('添加成功')
              _this.$notify({
                title: '添加成功',
                message: 'Success'
              });
              _this.visible = false
              if (_this.reload) _this.reload()
            })
          } else {
            axios.put('/categories/update', {
              categoryId: _this.id,
              categoryName:_this.ruleForm.name,
              sortOrder: _this.ruleForm.rank
            }).then(() => {
               _this.$notify({
                title: '修改成功',
                message: 'Success'
              });
              _this.visible = false
              if (_this.reload) _this.reload()
            })
          }
        }
      })
    },
       // 获取详情
    getDetail(id) {
      const _this = this
      axios.get(`/categories/${id}`).then(res => {
        const result = res.data && res.data[0]
        _this.ruleForm = {
          name: result.categoryName,
          rank: result.sortOrder
        }
        _this.parentId = result.parentId
      })
    },
    handleClose() {
      this.$refs['formRef'].resetFields();
      this.visible = false
    },
        // 关闭弹窗
    close () {
      this.visible = false
    },
      // 开启弹窗
    open (id) {
      this.visible = true
      if (id) {
        this.id = id
        this.getDetail(id)
      } else {
        // 新增类目，从路由获取父分类id 和 分类级别
        const { parentId = 0 } = this.$route.query
        this.ruleForm = {
          name: '',
          rank: ''
        }
        this.parentId = parentId
        // state.categoryLevel = level
      }
    }
  }
}
</script>