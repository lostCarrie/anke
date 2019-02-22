<template>
    <div>
        <h1>Hello,Vue!简单的增删改查</h1>
        <!-- 基础表格 -->
        <el-row>
            <el-col :span="22"  :offset="1">
                <div style="margin-top:30px;">
                    <!-- 操作 -->
                    <ul class="fr">
                        <li>
                            <el-button type="primary" @click="dialogCreateVisible = true"><i class="el-icon-plus icons"></i>添加用户</el-button>
                            <el-button type="danger" icon="el-icon-delete" :disabled="this.selected.length==0" @click="removeUsers()">删除用户</el-button>
                        </li>
                    </ul>
                    <!-- 用户列表 -->
                    <el-col :span="24" style="height:20px;"></el-col>
                    <el-table :data="users"
                              stripe
                              style="width:100%;margin-top:20px;"
                              height="443"
                              v-loading="loading"
                              element-loading-text="拼命加载中..."
                              :default-sort="{prop: ['username','create_time'],order: 'descending'}"
                              @selection-change="tableSelectionChange">
                        <el-table-column type="selection"
                                         width="60">
                        </el-table-column>
                        <el-table-column prop="username"
                                         label="用户名"
                                         sortable
                                         width="100">
                        </el-table-column>
                        <el-table-column prop="name"
                                         label="姓名"
                                         width="80">
                        </el-table-column>
                        <el-table-column prop="phone"
                                         label="手机">
                        </el-table-column>
                        <el-table-column prop="email"
                                         label="邮箱">
                        </el-table-column>
                        <el-table-column prop="create_time"
                                         label="注册日期"
                                         sortable>
                        </el-table-column>
                        <el-table-column prop="is_active"
                                         label="状态"
                                         width="75">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.is_active === true ? 'primary' : 'success'" close-transition>{{ scope.row.is_active}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作"
                                         width="250">          
                            <template slot-scope="scope">
                                <el-button type="danger" size="small" @click="removeUser(scope.row)">删除</el-button>
                                <el-button type="success" size="small" @click="setCurrent(scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>
        <!-- 创建用户 -->
        <el-dialog title="创建用户"
                   :visible.sync="dialogCreateVisible"
                   width="30%"
                   :before-close="handleClose">
            <el-form ref="create" status-icon :rules="rules" :model="createUser" label-width="100px" label-position="right">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="createUser.username"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="createUser.name"></el-input> 
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="createUser.password"
                              type="password">
                    </el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="createUser.checkPass"
                              type="password">
                    </el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="createUser.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="createUser.email"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="createUser.is_active"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible=false">取消</el-button>
                <el-button :loading="createLoading" @click="createUsers" type="primary">确定</el-button>
            </div>
        </el-dialog>
        <!-- 修改用户用户信息 -->
        <el-dialog title="修改用户"
                   :visible.sync="dialogUpdateVisible"
                   :before-close="handleClose">
            <el-form ref="update" :model="updateUser" :rules="updateRules" label-width="100px" label-position="right">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="updateUser.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="updateUser.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="updateUser.email"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="updateUser.is_active"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="dialogUpdateVisible = false">取消</el-button>
                <el-button :loading="updateLoading" type="primary" @click="updateUsers">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 导出常量、函数、文件、模块，导入时使用import from即可
export default {
    name: '',
    data() {
        var validatePass = (rule, value, callback) => {
            if(value === '') {
                callback(new Error('请再次输入密码'));
            }else if(value !== this.createUser.password) {
                callback(new Error('两次输入密码不一致！'));
            }else {
                callback();
            }
        }
        return {
            users: [{
                id: 1,
                username: '111',
                name: '222',
                phone: '333',
                email: '444',
                create_time: '0821',
                is_active: true
            },
            {
                id: 2,
                username: '222',
                name: '222',
                phone: '333',
                email: '444',
                create_time: '1111',
                is_active: true
            },
            {
                id: 3,
                username: '333',
                name: '222',
                phone: '333',
                email: '444',
                create_time: '0324',
                is_active: false
            }],
            createUser: {
                id: '',
                username: '',
                name: '',
                password: '',
                checkPass: '',
                phone: '33333333',
                email: '',
                is_active: true
            },
            updateUser: {
                id: '',
                name: '',
                phone: '',
                email: '',
                is_active: true
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 15,
                    message: '长度在3到15个字符'
                }],
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 25,
                    message: '长度在3到25个字符'
                }, {
                    pattern: /^[A-Za-z0-9]+$/,
                    message: '用户名只能为字母和数字'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    min: 6,
                    max: 25,
                    message: '长度在6到25个字符'
                }],
                checkPass: [{
                    require: true,
                    message: '请再次输入密码',
                    trigger: 'blur'
                }, {
                    validator: validatePass
                }],
                email: [{
                    type: 'email',
                    message: '邮件格式不正确'
                }],
                phone: [{
                    pattern: /^1[34578]\d{9}$/,
                    message: '请输入中国国内的手机号'
                }]
            },
            updateRules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 15,
                    message: '长度在 3 到 15 个字符'
                }],
                email: [{
                    type: 'email',
                    message: '邮箱格式不正确'
                }],
                phone: [{
                    pattern: /^1[34578]\d{9}$/,
                    message: '请输入中国国内的手机号码'
                }]
            },
            filter: {
                sorts: ''
            },
            loading: false,
            createLoading: false,
            updateLoading: false,
            dialogCreateVisible: false,
            dialogUpdateVisible: false,
            selected: [] //已选项
        }
    },
    methods:{
        getUsers(){
            this.loading = true;
            this.users = this.users;
            this.loading = false;
        },
        /*
        tableSortChange(val) {
            if(val.prop != null) {
                if(val.order === 'descending') {
                    this.filter.sorts = '-' + val.prop;
                } else {
                    this.filter.sorts = '' + val.prop;
                }
            } else {
                    this.filter.sorts = '';
                }
                this.getUsers();
        },*/
        //记录已选用户
        tableSelectionChange(val) {
            this.selected = val;
        },
        //删除单个用户
        removeUser(row) {
            this.$confirm('此操作将永久删除用户 ' + row.username + ',是否继续？', {
                type: 'warning'
            }).then(() => {
                this.users.forEach((element, i) => {
                    if(element.username == row.username) {
                        this.users.splice(i,1)
                    }
                });
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！'
                });
            });
        },
        //删除多个用户
        removeUsers(){
            this.$confirm('此操作将永久删除已选的'+ this.selected.length +'条数据，是否继续？','提示',{
                type: 'warning'
            }).then(() => {
                for(let i = 0; i < this.selected.length; i++) {
                    let s = this.selected[i];
                    this.users.forEach((element,index) => {
                        if(s.username == element.username) {
                            this.users.splice(index,1)
                        }
                    });
                }
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！'
                })
            });
        },
        //手动关闭提示
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
            }).catch(() => {});
        },
        getuuid(){
            var uid = [];
            var hexDigits = "_";
            for(var i = 0; i < 32; i++) {
                uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
            }
            uid[6] = "4";
            uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
            var uuid = uid.join("");
            return uuid;
        },
        //创建新用户
        createUsers() {
            this.$refs.create.validate((valid) => {
                if(valid) {
                    this.createUser.id = this.getuuid();
                    this.createLoading = true;
                    this.users.push(this.createUser);
                    this.$message.success("添加用户成功！");
                    this.dialogCreateVisible = false;
                    this.createLoading = false;
                }else {
                    return false;
                }
            })
        },
        //更新用户
        updateUsers() {
            this.$refs.update.validate((valid) => {
                if(valid) {
                    this.updateLoading = true;
                    this.users.forEach((element) => {
                        if(element.id == this.updateUser.id) {
                            element.name = this.updateUser.name;
                            element.phone = this.updateUser.phone;
                            element.email = this.updateUser.email;
                            element.is_active = this.updateUser.is_active;
                        }
                    })
                    this.$message.success('修改用户信息成功');
                    this.updateLoading = false;
                    this.dialogUpdateVisible = false;
                }else {
                    return false;
                }
            })
        },
        //编辑当前用户信息
        setCurrent(user) {
            this.updateUser.id = user.id;
            this.updateUser.name = user.name;
            this.updateUser.phone = user.phone;
            this.updateUser.email = user.email;
            this.updateUser.is_active = user.is_active;
            this.dialogUpdateVisible = true;
        }
    }
}
</script>
<style>
ul li{
    list-style: none
}
.fr{float:right}
</style>