<template>
    <el-menu :default-openeds=[1,2]
             router
             text-color="#bfcbd9"
             active-text-color="#409EFF"
             background-color="rgb(48, 65, 86)">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">员工工资详情</span>
            </template>
            <el-menu-item-group>
                <!-- <template slot="title">分组一</template>-->
                <el-menu-item index="/TotalTable">汇总工资单</el-menu-item>
                <el-menu-item index="/DetailTable">详细工资单</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">公司信息管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/User">员工信息管理</el-menu-item>
                <el-menu-item index="/BusinessTable">业务信息管理</el-menu-item>
                <el-menu-item index="/ReceiptTable">服务费用汇总</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <!--
        <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">我的</span>
        </el-menu-item>-->
    </el-menu>
</template>
<script>
export default {
    date() {
        return {
            
        }
    }
}
</script>
<style>
.el-menu {
    height: auto;
    min-height: 100%;
}
</style>
