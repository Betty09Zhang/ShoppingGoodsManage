<!--  -->
<template>
 <div>
     <side-item-link :to="item.path" v-if="!item.children">
        <el-menu-item :index="item.path" > 
            
            <span slot="title">{{item.name}}</span>
        </el-menu-item>
     </side-item-link>
     <el-submenu :index="item.path" v-else>
        <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
        <side-bar-item  v-for="child of item.children" :item="child" :key="child.path"></side-bar-item>
     </el-submenu>
 </div>
</template>

<script>
import SideItemLink from './SideItemLink.vue'
export default {
 name: 'SideBarItem',
 components: {
    SideItemLink 
 },
 props: {
    item: {
        type: Object
    }
 },
 data () {
  return {
  }
 },

 //方法集合
 methods: {

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
<style lang='scss' scoped>
</style>