<template>
    <el-container>    
        <el-aside>
            <navbar></navbar>
        </el-aside>
        <el-container>
            <el-header>
                <headbar></headbar>
            </el-header>
            <el-main>
                <contents></contents>
            </el-main>
            
        </el-container>
    </el-container>
</template>

<script>
    import Navbar from './Navbar.vue'
    import Contents from './Contents.vue'
    import Headbar from './Headbar.vue'
    export default {
        components: {
            Navbar,
            Contents,
            Headbar
        }
    }
</script>

<style>
.el-header {
    padding: 10px;
    border-bottom: 1px solid #CBCED0;
    height: 50px ! important;
}
.el-main {
    padding: 20px;
}
.el-aside {
    height: 100%;
    width: 200px ! important;
}
.el-container,.el-main,.el-header{
    width: 100%;
    height: 100%;
}
</style>