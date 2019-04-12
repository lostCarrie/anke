<template>
    <div>
        <el-form ref="loginForm" :model="loginForm">
            <div>
                <h3 class="title">系统登录</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon-class="user"/>
                </span>
                <el-input v-model="loginForm.username"
                          :placeholder="请输入用户名"
                          type="text"
                          auto-complete="on"/> 
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password"/>
                </span>
                <el-input v-model="loginForm.password"
                          :placeholder="请输入密码"
                          :type="passwordType"
                          auto-complete/>
                <span class="show-pwd" @click="showPwd">
                    <svg-icon icon-class="passwordType === 'password'? 'eye': 'eye-open'"/>
                </span>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {
                username: 'admin',
                password: '11111111'
            },
            passwordType: 'password'
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width:30px;
    display: inline-block;
}
</style>