<template>
    <el-container style="border: 1px solid #eee">
        <el-header style="background-color: #B3C0D1;color:#333;line-height: 60px">津市安可安全技术咨询服务有限公司</el-header>
        <el-container>
            <el-aside style="background-color: rgb(238, 241, 246)">
                <navbar></navbar>
            </el-aside>
            <el-container>
                <el-main>
                    <contents></contents>
                </el-main>
                <el-footer></el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import Navbar from './Navbar.vue'
    import Contents from './Contents.vue'
    export default {
        components: {
            Navbar,
            Contents
        }
    }
</script>

<style>
.el-main {
    padding: 0px;
}
</style>