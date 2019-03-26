<template>
    <div class="sponge">
        <el-row>
            <el-col :span="16">
                <table-nav :c-date.sync="listQuery.cDate"
                           :s-option.sync="listQuery.sOption"
                           :select-options="selectOptions"
                           :s-input.sync="listQuery.sInput"
                           @table-nav="getSalary"></table-nav>
            </el-col>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" @click="dialogCreateVisible = true">新增</el-button>
                <el-button icon="el-icon-download" type="primary" @click="handleDownload">下载</el-button>    
            </el-col>
        </el-row>
        <el-row style="width:100%;height:90%;">
            <el-col :span="24" class="sponge">
                <el-table :data="salary"
                          stripe
                          fit
                          highlight-current-row
                          show-summary
                          v-loading="loading"
                          element-loading-text="拼命加载中..."
                          :default-sort="{prop:['totalSlr','projectSlr'],order: 'descending'}"
                          class="main-table">
                    <el-table-column prop="username"
                                        label="姓名">
                    </el-table-column>
                    <el-table-column prop="basicSlr" label="基本工资">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input type="number" class="edit-input" size="small" v-model="scope.row.basicSlr"></el-input>
                            </template>
                            <span v-else>{{ scope.row.basicSlr }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="expertSlr" label="专家工资">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input type="number" class="edit-input" size="small" v-model="scope.row.expertSlr"></el-input>
                            </template>
                            <span v-else>{{ scope.row.expertSlr }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="projectSlr" label="项目工资">
                    </el-table-column>
                    <el-table-column prop="travelExp" label="差旅费">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input type="number" class="edit-input" size="small" v-model="scope.row.travelExp"></el-input>
                            </template>
                            <span v-else>{{ scope.row.travelExp }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="subsidy" label="补贴">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input type="number" class="edit-input" size="small" v-model="scope.row.subsidy"></el-input>
                            </template>
                            <span v-else>{{ scope.row.subsidy }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="other" label="其他">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input type="number" class="edit-input" size="small" v-model="scope.row.other"></el-input>
                            </template>
                            <span v-else>{{ scope.row.other }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalSlr" label="应领工资">
                    </el-table-column>
                    <el-table-column prop="rwdPns" label="奖罚项">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input type="number" class="edit-input" size="small" v-model="scope.row.rwdPns"></el-input>
                            </template>
                            <span v-else>{{ scope.row.rwdPns }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="actualSlr" label="实领工资">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-button size="small" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
                                <el-button size="small" type="success" @click="updateCurrent(scope.row)">确认</el-button>
                            </template>
                            <template v-else>
                                <el-button type="danger" size="small" @click="removeUser(scope.row)">删除</el-button>
                                <el-button type="success" size="small" @click="clickEdit(scope.row)">编辑</el-button>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.project"
                                        size="mini"
                                        border>
                                <el-table-column prop="projName"
                                                    label="项目名称">
                                </el-table-column>
                                <el-table-column prop="stageSlr"
                                                    label="阶段工资">
                                </el-table-column>
                                <el-table-column prop="finishSlr"
                                                    label="完成工资">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total>0"
                            :total="total"
                            :page.sync="listQuery.page"
                            :p-size.sync="listQuery.pSize"
                            @pagination="getSalary"/>
            </el-col>
        </el-row>
        <el-dialog title="创建工资明细"
                   :visible.sync="dialogCreateVisible"
                   :before-close="handleClose">
            <el-form ref="create" 
                     status-icon 
                     :rules="rules" 
                     :model="createSalary"
                     label-width="100px"
                     label-position="right">
                <el-form-item label="日期" prop="oneone">
                    <el-date-picker v-model="createSalary.oneone" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名" prop="username">
                    <el-input v-model="createSalary.username"></el-input>
                </el-form-item>
                <el-form-item label="基本工资" prop="basicSlr">
                    <el-input v-model="createSalary.basicSlr"></el-input>
                </el-form-item>
                <el-form-item label="基本工资" prop="basicSlr">
                    <el-input v-model="createSalary.basicSlr"></el-input>
                </el-form-item>
                <el-form-item label="专家工资" prop="expertSlr">
                    <el-input v-model="createSalary.expertSlr"></el-input>
                </el-form-item>
                <el-form-item label="项目工资" prop="projectSlr">
                    <el-input v-model="createSalary.projectSlr"></el-input>
                </el-form-item>
                <el-form-item label="差率费" prop="travelExp">
                    <el-input v-model="createSalary.travelExp"></el-input>
                </el-form-item>
                <el-form-item label="补贴" prop="subsidy">
                    <el-input v-model="createSalary.subsidy"></el-input>
                </el-form-item>
                <el-form-item label="其他" prop="other">
                    <el-input v-model="createSalary.other"></el-input>
                </el-form-item>
                <el-form-item label="奖罚项" prop="rwdPns">
                    <el-input v-model="createSalary.rwdPns"></el-input>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="dialogCreateVisible = false">取消</el-button>
                <el-button @click="createCurrent" type="primary" :loading="createLoading">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '../api/api.js'
import TableNav from '../miniComponents/TableNav.vue'
import Pagination from '../miniComponents/Pagination.vue'
import { parseTime } from '../filters'
export default {
    components: {
        TableNav,
        Pagination
    },
    data() {
        return {
            listQuery: {
                cDate: undefined,
                sOption: undefined,
                sInput: undefined,
                page: 1,
                pSize: 20
            },
            selectOptions: [
                {key: 'username', label:'姓名'},
                {key: 'basicSlr', label:'基本工资'},
                {key: 'expertSlr', label:'专家工资'},
                {key: 'projectSlr', label:'项目工资'},
                {key: 'travelExp', label:'差旅费'},
                {key: 'subsidy', label:'补贴'},
                {key: 'other', label:'其他'},
                {key: 'totalSlr', label:'应领工资'},
                {key: 'rwdPns', label:'奖罚项'},
                {key: 'actualSlr', label:'实领工资'}
            ],
            createSalary: {
                id: 1,
                oneone: '',
                username: '',
                basicSlr: 0,
                expertSlr: 0,
                projectSlr: 0,
                travelExp: 0,
                subsidy: 0,
                other: 0,
                rwdPns: -9
            },
            rules: {
                username: [{required:true,trigger: 'blur'}],
                basicSlr: [{required:true,trigger: 'blur'},{pattern: /^\d+[\.]{0,1}\d*$/,message: '工资只能输入数字'}]
            },
            salary: [],
            original: [],
            downdata: [],
            total: 1,
            loading: false,
            dialogCreateVisible: false,
            createLoading: false
        }
    },
    created() {
        this.getSalary()
    },
    methods: {
        getSalary(list){
            this.loading = false;
            var params
            if(arguments.length > 0){
                params = this.listQuery
            }else{
                params = list
            }
            api._getS(params).then(res => {
                if (res.success){
                    if(arguments.length === 0){
                        this.downdata = res.data;
                    }else{
                        this.users = res.data.map(v => {
                            this.$set(v, 'edit', false);
                            this.setCurrent(v);
                            return v
                        })
                        this.total = res.total;
                    }                                
                } else {
                    this.$message.error(res.message);
                }
                this.loading = false;
            }, err => {
                console.log(err);
            }) 
            // const items = [{
            //     id: 1,
            //     username: '仔仔',
            //     basicSlr: 123,
            //     expertSlr: 456,
            //     projectSlr: 100,
            //     travelExp: 50,
            //     subsidy: 10,
            //     other: 0,
            //     totalSlr: 739,
            //     rwdPns: -9,
            //     actualSlr: 730,
            //     project: [{
            //         id: 1,
            //         projName: '每日优鲜',
            //         stageSlr: 0,
            //         finishSlr: 100
            //     },
            //     {
            //         id: 2,
            //         projName: '每日优鲜',
            //         stageSlr: 0,
            //         finishSlr: 100
            //     }]
            // },
            // {
            //     id: 2,
            //     username: '仔仔',
            //     basicSlr: 123,
            //     expertSlr: 456,
            //     projectSlr: 100,
            //     travelExp: 50,
            //     subsidy: 10,
            //     other: 0,
            //     totalSlr: 739,
            //     rwdPns: -9,
            //     actualSlr: 730,
            //     project: [{
            //         id: 2,
            //         projName: '每日优鲜',
            //         stageSlr: 0,
            //         finishSlr: 100
            //     }]
            // }]
            // this.salary = items.map(v => {
            //     this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
            //     this.setCurrent(v); //  will be used when user click the cancel botton
            //     return v
            // })
        },
        createCurrent() {
            this.$refs.create.validate((valid) => {
                if(valid) {
                    this.createLoading = true;
                    api._postS(this.createSalary).then(res => {
                        this.$message.success('创建记录成功！');
                        this.dialogCreateVisible = false;
                        this.createLoading = false;
                        this.reset();
                        this.getSalary(this.listQuery);
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
        clickEdit(row) {
            row.edit=!row.edit;
            this.setCurrent(row);
        },
        cancelEdit(row) {
            this.resetCurrent(row);
            row.edit = false;
            this.$message({
                message: '已取消修改！',
                type: 'warning'
            })
        },
        updateCurrent(row) {
            row.edit = false;
            this.setCurrent(row);
            this.loading = true;
            api._updateS(this.updateReceipt.id, row).then(res => {
                this.$message.success('修改工资信息成功！')
                this.loading = false;
                this.getSalary(this.listQuery);
            }).catch(res => {
                var data = res;
                if(data instanceof Array) {
                    this.$message.error(data[0]["message"]);
                }else if(data instanceof Object) {
                    this.$message.error(data["message"]);
                }
                this.loading = false;
            })
        },
        setCurrent(row) {
            this.original.id = row.id;
            this.original.basicSlr = row.basicSlr;
            this.original.expertSlr = row.expertSlr;
            this.original.travelExp = row.travelExp;
            this.original.subsidy = row.subsidy;
            this.original.other = row.other;
            this.original.rwdPns = row.rwdPns;
        },
        resetCurrent(row){
            row.id = this.original.id;
            row.basicSlr = this.original.basicSlr;
            row.expertSlr = this.original.expertSlr;
            row.travelExp = this.original.travelExp;
            row.subsidy = this.original.subsidy;
            row.other = this.original.other;
            row.rwdPns = this.original.rwdPns;
        },
        removeCurrent(row) {
            this.$confirm('此操作将永久删除用户 ' + row.user_display_name + ',是否继续？', {
                type: 'warning'
            }).then(() => {
                api._removeS(row).then(res => {
                    this.$message.success('成功删除了用户' + row.user_display_name +'!');
                    this.getUsers(this.listQuery);
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
        reset() {
            this.$refs.create.resetFields();
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
            }).catch(() => {});
        },
        handleDownload() {
            this.getSalary();
            import('../vendor/Export2Excel').then(excel => {
                var tHeader = ['日期']
                var filterVal = ['oneone']
                for (var i in this.selectOptions) {
                    tHeader.push(this.selectOptions[i].label)
                    filterVal.push(this.selectOptions[i].key)
                }
                const data = this.formatJson(filterVal, this.downdata)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'table-list'
                })
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
            if (j === 'oneone') {
                return parseTime(v[j])
            } else {
                return v[j]
            }
            }))
        }
    }
}
</script>
<style>
.el-input__inner{
    padding: 0 2px;
}
</style>
