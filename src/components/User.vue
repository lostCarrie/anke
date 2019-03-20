<template>
    <div class="sponge">
        <el-row>
            <el-col :span="16">
                <table-nav></table-nav>
            </el-col>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" @click="dialogCreateVisible = true">新增</el-button>
                <el-button icon="el-icon-delete" type="primary" :disabled="this.selected.length==0" @click="removeUsers()">删除</el-button>
                <el-button icon="el-icon-download" type="primary" @click="handleDownload">下载</el-button>    
            </el-col>
        </el-row>
        <!-- 基础表格 -->
        <el-row style="width:100%;height:90%">
            <el-col :span="24" class="sponge">
                <div class="sponge">
                    <!-- 用户列表 -->
                    <el-table :data="users"
                              stripe
                              style="width:100%;margin-top:20px;"
                              v-loading="loading"
                              element-loading-text="拼命加载中..."
                              :default-sort="{prop: ['user_id','create_time'],order: 'descending'}"
                              @selection-change="tableSelectionChange"
                              class="main-table">
                        <el-table-column type="selection"
                                         width="60">
                        </el-table-column>
                        <el-table-column prop="user_id"
                                         label="工号"
                                         sortable>
                        </el-table-column>
                        <el-table-column prop="user_name"
                                         label="用户名">
                        </el-table-column>
                        <el-table-column prop="user_display_name"
                                         label="姓名">
                        </el-table-column>
                        <el-table-column prop="telephone_num"
                                         label="手机号">
                        </el-table-column>
                        <el-table-column prop="create_time"
                                         label="注册日期"
                                         sortable>
                            <template slot-scope="scope">
                                <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status"
                                         label="在职状态">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.status == 0 ? 'primary' : 'success'" close-transition>{{ scope.row.status == 1 ? "在职" : "离职"}}</el-tag>
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
                    <pagination v-show="total>0" 
                                :total="total"
                                :page.sync="listQuery.page"
                                :p-size.sync="listQuery.pSize"
                                @pagination="getUsers"/>
                                
                </div>
            </el-col>
        </el-row>
        <!-- 创建用户 -->
        <el-dialog title="创建用户"
                   :visible.sync="dialogCreateVisible"
                   width="30%"
                   :before-close="handleClose">
            <el-form ref="create" status-icon :rules="rules" :model="createUser" label-width="100px" label-position="right">
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="createUser.user_name"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="user_display_name">
                    <el-input v-model="createUser.user_display_name"></el-input> 
                </el-form-item>
                <el-form-item label="手机号" prop="telephone_num">
                    <el-input v-model="createUser.telephone_num"></el-input>
                </el-form-item>
                <el-form-item label="是否在职">
                    <el-switch v-model="createUser.status"></el-switch>
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
                <el-form-item label="姓名" prop="user_display_name">
                    <el-input v-model="updateUser.user_display_name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="telephone_num">
                    <el-input v-model="updateUser.telephone_num"></el-input>
                </el-form-item>
                <el-form-item label="是否在职">
                    <el-switch v-model="updateUser.status"></el-switch>
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
import api from '../api/api.js'
import TableNav from '../miniComponents/TableNav.vue'
import Pagination from '../miniComponents/Pagination.vue'
import { parseTime } from '../filters'
// 导出常量、函数、文件、模块，导入时使用import from即可
export default {
    components: {
        TableNav,
        Pagination
    },
    data() {
        return {
            users: [],
            createUser: {
                user_name: '',
                user_display_name: '',
                telephone_num: '',
                status: true
            },
            updateUser: {
                user_id: '',
                user_name: '',
                user_display_name: '',
                telephone_num: '',
                status: true
            },
            rules: {
                user_name: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }, {
                    min: 2,
                    max: 15,
                    message: '长度在2到15个字符'
                }, {
                    pattern: /^[A-Za-z0-9]+$/,
                    message: '用户名只能为字母和数字'
                }],
                user_display_name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 25,
                    message: '长度在3到25个字符'
                }],
                telephone_num: [{
                    pattern: /^1[34578]\d{9}$/,
                    message: '请输入中国国内的手机号'
                }]
            },
            updateRules: {
                user_display_name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }, {
                    min: 3,
                    max: 25,
                    message: '长度在3到25个字符'
                }],
                telephone_num: [{
                    pattern: /^1[34578]\d{9}$/,
                    message: '请输入中国国内的手机号'
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
            selected: [], //已选项
            total: 0,//pagination
            listQuery: {     
                page: 1,
                pSize: 2,
                times: undefined,
                title: undefined,
                contents: undefined
            }
            
        }
    },
    created:function() {
        this.getUsers();
    },
    methods:{
        //获取用户数据
        getUsers(){
            this.loading = false;
            api._get(this.listQuery).then(res => {
                if (res.success){
                    this.users = res.data;
                    this.total = res.total;
                } else {
                    this.$message.error(res.message);
                }
                this.loading = false;
            }, err => {
                console.log(err);
            })
        },
        //删除单个用户
        removeUser(row) {
            this.$confirm('此操作将永久删除用户 ' + row.user_display_name + ',是否继续？', {
                type: 'warning'
            }).then(() => {
                api._remove(row).then(res => {
                    this.$message.success('成功删除了用户' + row.user_display_name +'!');
                    this.getUsers();
                }).catch(res => {
                    this.$message.error('删除失败！');
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
            this.$confirm('此操作将永久删除已选的'+ this.selected.length +'条数据，是否继续？',{
                type: 'warning'
            }).then(() => {
                api._removes(this.selected).then(res => {
                    this.$message.success('删除了'+this.selected.length+'个用户！');
                    this.getUsers();
                }).catch(res => {
                    this.$message.error('删除失败');
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除！'
                });
            });
        },
        //创建新用户
        createUsers() {
            this.$refs.create.validate((valid) => {
                if(valid) {
                    this.createLoading = true;
                    api._post(this.createUser).then(res => {
                        this.$message.success('创建用户成功！');
                        this.dialogCreateVisible = false;
                        this.createLoading = false;
                        this.reset();
                        this.getUsers();
                    }).catch((res) => {
                        var data = res;
                        if(data instanceof Array) {
                            this.$message.error(data[0]["message"]);
                        }else if(data instanceof Object) {
                            this.$message.error(data["message"]);
                        }
                        this.createLoading = false;
                    })   
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
                    api._update(this.updateUser.user_id, this.updateUser).then(res => {
                        this.$message.success('修改用户信息成功！');
                        this.dialogUpdateVisible = false;
                        this.updateLoading = false;
                        this.getUsers();
                    }).catch(res => {
                        var data = res;
                        if(data instanceof Array) {
                            this.$message.error(data[0]["message"]);
                        }else if(data instanceof Object) {
                            this.$message.error(data["message"]);
                        }
                        this.updateLoading = false;
                    })
                }else {
                    return false;
                }
            })
        },
        //编辑当前用户信息
        setCurrent(user) {
            this.updateUser.user_id = user.user_id;
            this.updateUser.user_name = user.user_name;
            this.updateUser.user_display_name = user.user_display_name;
            this.updateUser.telephone_num = user.telephone_num;
            if(user.status){
                this.updateUser.status = true;
            }else {
                this.updateUser.status = false;
            } 
            this.dialogUpdateVisible = true;
        },
        //下载按钮
        handleDownload() {
            import('../vendor/Export2Excel').then(excel => {
                const tHeader = ['工号', '用户名', '姓名', '手机号','注册日期', '在职状态']
                const filterVal = ['user_id', 'user_name', 'user_display_name', 'telephone_num', 'create_time', 'status']
                const data = this.formatJson(filterVal, this.users)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'table-list'
                })
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
            if (j === 'create_time') {
                return parseTime(v[j])
            } else {
                return v[j]
            }
            }))
        },


        //手动关闭提示
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
            }).catch(() => {});
        },
        reset() {
            this.$refs.create.resetFields();
        },
        //记录已选用户
        tableSelectionChange(val) {
            this.selected = val;
        }
    }
}
</script>
<style>
.sponge{
    width:100%;
    height: 100%;
}
.main-table{
    width:100%;
    min-height:90%;
    height:auto;
}
</style>