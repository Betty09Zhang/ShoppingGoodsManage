<template>
  <div class="add">
    <el-card class="add-container">
      <el-form :model="goodForm" :rules="rules" ref="goodRef" label-width="100px" class="goodForm">
        <el-form-item required label="商品分类">
          <el-cascader :placeholder="defaultCate" style="width: 300px" :props="category" @change="handleChangeCate" v-model="categoryId"></el-cascader>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input style="width: 300px" v-model="goodForm.goodsName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input style="width: 300px" type="textarea" v-model="goodForm.goodsIntro" placeholder="请输入商品简介(100字)"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="originalPrice">
          <el-input type="number" min="0" style="width: 300px" v-model="goodForm.originalPrice" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stockNum">
          <el-input type="number" min="0" style="width: 300px" v-model="goodForm.stockNum" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="goodsSellStatus">
          <el-radio-group v-model="goodForm.goodsSellStatus">
            <el-radio :label="0">上架</el-radio>
            <el-radio :label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item required label="商品主图" prop="goodsCoverImg">
          <el-upload
            class="avatar-uploader"
            action="#"
            accept="jpg,jpeg,png"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleUrlSuccess"
          >
            <img style="width: 100px; height: 100px; border: 1px solid #e9e9e9;" v-if="goodForm.goodsCoverImg" :src="goodForm.goodsCoverImg | prefix" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{ id ? '立即修改' : '立即创建' }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// import WangEditor from 'wangeditor'
import axios from '@/utils/axios'
import { uploadImgServer} from '../../utils/index'
// import { prefix } from '../../utils/utils'
export default {
  name: 'AddGood',
  data() {
    return {
      uploadImgServer,
      token: '',
      id: '',
      defaultCate: '',
      goodForm: {
        goodsName: '',
        goodsIntro: '',
        originalPrice: '',
        sellingPrice: '',
        stockNum: '',
        goodsSellStatus: 0,
        goodsCoverImg: '',
        tag: ''
      },
      rules: {
        goodsCoverImg: [
          { required: 'true', message: '请上传主图', trigger: ['change'] }
        ],
        goodsName: [
          { required: 'true', message: '请填写商品名称', trigger: ['change'] }
        ],
        originalPrice: [
          { required: 'true', message: '请填写商品价格', trigger: ['change'] }
        ],
        sellingPrice: [
          { required: 'true', message: '请填写商品售价', trigger: ['change'] }
        ],
        stockNum: [
          { required: 'true', message: '请填写商品库存', trigger: ['change'] }
        ],
      },
      categoryId: '',
      category: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level = 0, value } = node
          axios.get('/categories/findByPagination', {
            params: {
              pageNumber: 1,
              pageSize: 1000,
              // categoryLevel: level + 1,
              parentId: value || 0
            }
          }).then(res => {
            const { data: {data:list, meta}, status} = res
            const nodes = list.map(item => ({
              value: item.categoryId,
              label: item.categoryName
            }))
            resolve(nodes)
          })
        }
      }
    }
  },
  mounted() {
    // instance = new WangEditor(editor.value)
    //   instance.config.showLinkImg = false
    //   instance.config.showLinkImgAlt = false
    //   instance.config.showLinkImgHref = false
    //   instance.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
    //   instance.config.uploadFileName = 'file'
    //   instance.config.uploadImgHeaders = {
    //     token: state.token
    //   }
    //   // 图片返回格式不同，需要自定义返回格式
    //   instance.config.uploadImgHooks = {
    //     // 图片上传并返回了结果，想要自己把图片插入到编辑器中
    //     // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
    //     customInsert: function(insertImgFn, result) {
    //       console.log('result', result)
    //       // result 即服务端返回的接口
    //       // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
    //       if (result.data && result.data.length) {
    //         result.data.forEach(item => insertImgFn(item))
    //       }
    //     }
    //   }
    //   instance.config.uploadImgServer = uploadImgsServer
    //   Object.assign(instance.config, {
    //     onchange() {
    //       console.log('change')
    //     },
    //   })
    //   instance.create()
    this.getProductById()
    
  },
  watch: {
    $route: {
      handler() {
        this.getProductById()
      },
      deep: true
    }
  },
  methods: {
    // prefix(url) {
    //   if (url && url.startsWith('http')) {
    //     return url
    //   } else {
    //     url = `http://127.0.0.1:3333${url}`
    //     return url
    //   }
    // },
    getProductById() {
      const _this = this
      const { id } = this.$route.query
      if (id) {
        axios.get(`/product/${id}`).then(res => {
          if (res.status == 200 && res.data) {
            const { product, party } = res.data
            // const product = res.data[0]
            _this.goodForm = {
              goodsName: product.productName,
              goodsIntro: product.productDescription,
              originalPrice: product.productPrice,
              stockNum: product.productStock,
              goodsSellStatus: product.productStatus,
              goodsCoverImg: product.productImg,
              categoryId: product.categoryId
            }
            _this.categoryId = product.categoryId
            _this.defaultCate = party
          }
         
        })
      }
    },
    isLeaf (categoryId) {
      return new Promise((resolve, reject) => {
        axios.get('/categories/isLeaf', {
          params: {
            categoryId
          }
        }).then(resp => {
          if (resp.status == 200) {
            resolve(resp.result)
          }
        })
      })
    },
    submitAdd(){
      const _this = this
      const { id } = this.$route.query
      const msg = id ? '修改成功' : '添加成功'
      const errMsg = id ? '修改失败' : '添加失败'
      this.$refs.goodRef.validate((vaild) => {
        if (vaild) {
          // 默认新增用 post 方法
          let httpOption = axios.post
          let params = {
            categoryId: this.categoryId,
            productImg: this.goodForm.goodsCoverImg,
            // goodsDetailContent: instance.txt.html(),
            productDescription: this.goodForm.goodsIntro,
            productName: this.goodForm.goodsName,
            productStatus: this.goodForm.goodsSellStatus,
            productPrice: this.goodForm.originalPrice,
            // sellingPrice: this.goodForm.sellingPrice,
            productStock: this.goodForm.stockNum
            // tag: this.goodForm.tag
          }
          console.log('params', params)
          // if (id) {
          //   params.goodsId = id
          //   // 修改商品使用 put 方法
          //   httpOption = axios.put
          // }
          if (id) {
            params.productId = parseInt(id)
            axios.put('/product/update',params).then((resp) => {
              if (resp && resp.status == 200) {
                _this.$notify({
                  message: msg,
                  type:'success'
                });
                _this.$router.push({ path: '/goodsManage' })
              } else {
                _this.$notify({
                  message: errMsg,
                  type:'error'
                });
              }
            })
          } else {
            axios.post('/product/create', params).then((resp) => {
              if (resp && resp.status == 200) {
                _this.$notify({
                  message: msg,
                  type:'success'
                });
                _this.$router.push({ path: '/goodsManage' })
              } else {
                _this.$notify({
                  message: errMsg,
                  type:'error'
                });
              }
            })
          }
        }
      })
    },
    handleBeforeUpload (file){
      const _this = this
      const sufix = file.name.split('.')[1] || ''
      const isLt2M = file.size / 1024 / 1024 < 2;
      let fd = new FormData()
      fd.append('file', file)
      if (!['jpg', 'jpeg', 'png'].includes(sufix)) {
        this.$message.error('请上传 jpg、jpeg、png 格式的图片');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false
      }
      axios.post(uploadImgServer, fd).then(re => {
        const data = re.data
        if (data.status = 200) {
          _this.goodForm.goodsCoverImg = data.imgURL
        }
      })
    },
    handleUrlSuccess(res, file){
      // this.goodForm.goodsCoverImg = val.data || ''
      this.goodForm.goodsCoverImg = URL.createObjectURL(file.raw);
    },
    handleChangeCate (val){
      this.categoryId = val[val.length - 1] || 0
    }
  }
}
</script>

<style scoped>
  .add {
    display: flex;
  }
  .add-container {
    flex: 1;
    height: 100%;
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    padding: 32px 17px;
  }
</style>