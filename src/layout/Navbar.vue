<template>
    <el-menu default-active="1" router="true">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">员工工资详情</span>
            </template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="/TotalTable">汇总工资单</el-menu-item>
                <el-menu-item index="/DetailTable">详细工资单</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">我的</span>
        </el-menu-item>
    </el-menu>
</template>

