<template>
    <div class="login-container">
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm" label-position="left" class="login-form" label-width="70px">
            <div class="title-container">
                <h3 class="title">系统登录</h3>
            </div>
            <el-form-item prop="username" label="用户名">               
                <el-input v-model="loginForm.username"
                          placeholder="请输入用户名"
                          type="text"
                          auto-complete="on"/> 
            </el-form-item>
            <el-form-item prop="password" label="密 码 ">               
                <el-input v-model="loginForm.password"
                          placeholder="请输入密码"
                          :type="passwordType"
                          auto-complete/>
            </el-form-item>
            <el-button type="primary" style="position:relative;left:25%;width:50%;margin-bottom:30px;" @click.native.prevent="handleLogin">
                登录
            </el-button>
        </el-form>
    </div>
</template>
<script>
import { validUsername } from '../../utils/validate'
export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if(!validUsername(value)) {
                callback(new Error('请输入正确的用户名！'))
            }else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if(value.length < 6) {
                callback(new Error('密码不少于6个字符！'))
            }else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin',
                password: '11111111'
            },
            loginRules: {
                username: [{require: true,trigger:'blur',validator: validateUsername}],
                password: [{require: true,trigger:'blur',validator: validatePassword}]
            },
            passwordType: 'password'
        }
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if(valid) {
                    this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                        this.$router.push({ path: '/'})
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }else {
                    console.log('error submit!');
                    return false;
                }
            })
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
        position: relative;
        width:520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            -webkit-appearance: none;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;
            &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: $cursor !important;
            }
        }
    }
    .el-form-item__label {
        color: $light_gray;
        font-weight: bold;
        
    }
}
.title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
}
</style>