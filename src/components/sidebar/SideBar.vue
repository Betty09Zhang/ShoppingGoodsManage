<!--  -->
<template>
    <div>
        <el-menu class=""
            mode="vertical"
        >
            <SideBarItem  v-for="item of routes" :item="item" :key="item.path"></SideBarItem> 
        </el-menu>
    </div>
</template>

<script>
import SideBarItem from "./SideBarItem.vue"
import { routes } from "../../router/index"
export default {
 name: 'SideBar',
 components: {
    SideBarItem
 },
 data () {
    return {
        routes
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