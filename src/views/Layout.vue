<!--  -->
<template>
 <div class="draw_bg">
     <side-bar class="sidebar_container"></side-bar>
     <div class="main_container">
         <Header class="header_container"></Header>
         <About class="app_main"></About>
     </div>
 </div>
</template>

<script>
import SideBar from '../components/sidebar/SideBar.vue'
import Header from '../components/header/Header.vue'
import About from '../views/About.vue'
// import variables from '../style/_variables.scss'
export default {
 components: {
    SideBar,
    Header,
    About
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
<style lang="less" scoped>
 .draw_bg {
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
 }
 .sidebar_container {
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    height: 100%;
    background-color: rgba(200,200,200,0.1);
    /deep/.el-menu {
        background-color: rgba(200,200,200,0.1);
    }
     
 }
 .main_container {
    position: absolute;
    top: 0%;
    bottom: 0%;
    margin-left: 25%;
    /* left: 20%; */
    height: 100%;
    width: 75%;
 }
 .header_container {
    position: absolute;
    top: 0%;
    right: 0%;
    height: 60px;
    width: 75%;
    border-bottom: 1px solid #E6E6E6;
     /* background-color: brown; */
 }
 .app_main {
    //  height: 100%;
     width: 100%;
     margin-top: 60px;
 }

</style>