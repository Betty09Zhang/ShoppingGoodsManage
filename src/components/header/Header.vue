<!--  -->
<template>
 <div class="bread_title">
    <span style="margin-left:5px" v-if="show">{{title}}</span>
    <i class="el-icon-back"  @click="goBack" v-else>返回上一级</i>
    <span class="login">登录</span>
 </div>
</template>

<script>
export default {
 name: 'Header',
 data () {
  return {
    title: '',
    parentId: 0,
    id: '',
    show: true,
    login: ''
  }
 },
 mounted() {
    this.title = this.$route.name
 },
 methods: {
    isGoBack() {
        if (this.parentId && this.parentId!=0) {
            return true
        }
        if (this.id) {
            return true
        }
        return false
    }
 },
 watch: {
    $route: {
        handler(val) {
            const { parentId, id } = this.$route.query
            if (!parentId && id) {
                this.show = false
            } else if (!id && parentId > 0) {
                this.show = false
            } else if (parentId == 0) {
                this.show = false
            } else {
                this.show = true
                this.title = val.name
            }
        }
    }
 },

 //方法集合
 methods: {
    goBack() {
        this.$router.back()
    }
 },

 //生命周期 - 创建完成（可以访问当前this实例）
 created(){

 },

 //生命周期 - 挂载完成（可以访问DOM元素）
 mounted(){

 },
 //生命周期 - 创建之前
 beforeCreate(){

 },
 //生命周期 - 挂载之前
 beforeMount(){

 },
 //生命周期 - 更新之前
 beforeUpdate(){

 },
 //生命周期 - 更新之后
 updated(){

 },
 //生命周期 - 销毁之前
 beforeDestroy(){

 },
 //生命周期 - 销毁完成
 destroyed(){

 },
 //如果页面有keep-alive缓存功能，该函数会触发
 activated(){

 }
}

</script>
<style lang="less" scoped>
.bread_title {
    display: flex;
    align-items: center;
    cursor: default;
    position: relative;
    .login {
        position: absolute;
        right: 30px;
        font-weight: bold;
    }
    

}
</style>