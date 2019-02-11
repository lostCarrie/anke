<template>
    <div>
        <h1>Hello,Vue!简单的增删改查</h1>
        <el-row>
            <el-col :span="22"  :offset="1">
                <div class="bg-purple" style="margin-top:30px;">
                    <!-- 操作 -->
                    <ul>
                        <li>
                            <el-button type="primary"><i class="el-icon-plus iconss"></i>添加用户</el-button>
                            <el-button type="danger" icon="el-icon-delete" disabled>删除用户</el-button>
                        </li>
                    </ul>
                    <!-- 用户列表 -->
                    <el-col :span="24" style="height:20px;"></el-col>
                    <el-table :data="users"
                              stripe
                              style="width:100%;margin-top:20px;"
                              height="443"
                              >
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column prop="username"
                                         label="用户名"
                                         sortable="custom">
                        </el-table-column>
                        <el-table-column prop="name"
                                         label="姓名">
                        </el-table-column>
                        <el-table-column prop="phone"
                                         label="手机">
                        </el-table-column>
                        <el-table-column prop="email"
                                         label="邮箱">
                        </el-table-column>
                        <el-table-column prop="create_time"
                                         label="注册日期"
                                         sortable="custom">
                        </el-table-column>
                        <el-table-column prop="is_active"
                                         label="状态"
                                         width="75"
                                         inline-template>
                            <el-tag close-transition></el-tag>
                        </el-table-column>
                        <el-table-column label="操作"
                                         width="250">          
                            <span>
                                <el-button type="danger" size="small">删除</el-button>
                                <el-button type="success" size="small">编辑</el-button>
                            </span>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 导出常量、函数、文件、模块，导入时使用import from即可
export default {
    name: '',
    data() {
        return {
            users: [{
                username: '111',
                name: '222',
                phone: '333',
                email: '444',
                create_time: '555',
                is_active: 1
            }]
        }
    }
}
</script>
<style>
ul li{
    list-style: none
}
</style>
