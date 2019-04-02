<template>
    <div class="sponge">
        <el-row>
            <el-col :span="16">
                <table-nav :c-date.sync="listQuery.cDate"
                           :s-option.sync="listQuery.sOption"
                           :select-options="selectOptions"
                           :s-input.sync="listQuery.sInput"
                           @table-nav="getBusiness"></table-nav>
            </el-col>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" @click="dialogCreateVisible = true">新增</el-button>
                <el-button icon="el-icon-download" type="primary" @click="handleDownload">下载</el-button>    
            </el-col>
        </el-row>
        <el-row style="width:100%;height:90%;">
            <el-col :span="24" class="sponge">
                <el-table :data="business"
                          stripe
                          fit
                          highlight-current-row
                          show-summary
                          v-loading="loading"
                          element-loading-text="拼命加载中..."
                          :default-sort="{prop:['oneone','twotwo'],order: 'descending'}"
                          class="main-table">
                    <el-table-column prop="start_time"
                                        label="开始日期">
                    </el-table-column>
                    <el-table-column prop="end_time"
                                        label="结束日期">
                    </el-table-column>
                    <el-table-column prop="second_party"
                                        label="公司">
                    </el-table-column>
                    <el-table-column prop="type_name"
                                        label="项目类型">
                    </el-table-column>
                    <el-table-column prop="profession_name"
                                        label="事项">
                    </el-table-column>
                    <el-table-column prop="employees"
                                        label="参与人员">
                    </el-table-column>
                    <el-table-column prop="passed"
                                        label="上会情况">
                    </el-table-column>
                    <el-table-column prop="contract_fee"
                                        label="合同费用">
                    </el-table-column>
                    <el-table-column prop="review_fee"
                                        label="评审费用">
                    </el-table-column>
                    <el-table-column prop="pure_income"
                                        label="付款金额">
                    </el-table-column>
                    <el-table-column prop="balance"
                                        label="差额">
                    </el-table-column>
                    <el-table-column prop="if_paid"
                                        label="是否付清">
                    </el-table-column>
                    <el-table-column label="操作"
                                     width="150">          
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="removeCurrent(scope.row)">删除</el-button>
                            <el-button type="success" size="small" @click="setCurrent(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.project"
                                        size="mini"
                                        border>
                                <el-table-column prop="projName"
                                                    label="付款次数">
                                </el-table-column>
                                <el-table-column prop="finishSlr"
                                                    label="付款金额">
                                </el-table-column>
                                <el-table-column prop="finishSlr"
                                                    label="经办人">
                                </el-table-column>
                                <el-table-column prop="finishSlr"
                                                    label="接收人">
                                </el-table-column>
                                <el-table-column prop="finishSlr"
                                                    label="账户">
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total>0"
                            :total="total"
                            :page.sync="listQuery.page"
                            :p-size.sync="listQuery.pSize"
                            @pagination="getBusiness"/>
            </el-col>
        </el-row>
        <el-dialog title="创建新业务"
                   :visible.sync="dialogCreateVisible"
                   :before-close="handleClose">
            <el-form ref="create" status-icon :rules="rules" :model="createBusiness" label-width="100px" label-position="right">
                <el-form-item label="开始日期" prop="start_time">
                    <el-date-picker v-model="createBusiness.start_time" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="end_time">
                    <el-date-picker v-model="createBusiness.end_time" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="公司" prop="second_party">
                    <el-input v-model="createBusiness.second_party"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type_name">
                    <el-select v-model="createBusiness.type_name" placeholder="请选择项目类型" filterable allow-create>
                        <el-option v-for="item in typeOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事项" prop="profession_name">
                    <el-select v-model="createBusiness.profession_name" multiple placeholder="请选择事项" filterable allow-create>
                        <el-option v-for="item in professionOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参与人员" prop="employees">
                    <el-select v-model="createBusiness.employees" multiple placeholder="请选择参与人员" filterable allow-create>
                        <el-option v-for="item in employeesOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上会情况">
                    <el-switch v-model="createBusiness.passed"></el-switch>
                </el-form-item>
                <el-form-item label="合同费用" prop="contract_fee">
                    <el-input v-model="createBusiness.contract_fee"></el-input>
                </el-form-item>
                <el-form-item label="评审费用" prop="review_fee">
                    <el-input v-model="createBusiness.review_fee"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible=false">取消</el-button>
                <el-button :loading="createLoading" @click="createCurrent" type="primary">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改业务信息"
                   :visible.sync="dialogUpdateVisible"
                   :before-close="handleClose">
            <el-form ref="update" status-icon :rules="rules" :model="updateBusiness" label-width="100px" label-position="left">
                <el-form-item label="开始日期" prop="start_time">
                    <el-date-picker v-model="updateBusiness.start_time" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="end_time">
                    <el-date-picker v-model="updateBusiness.end_time" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="公司" prop="second_party">
                    <el-input v-model="updateBusiness.second_party"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="type_name">
                    <el-select v-model="updateBusiness.type_name" placeholder="请选择项目类型" filterable allow-create>
                        <el-option v-for="item in typeOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事项" prop="profession_name">
                    <el-select v-model="updateBusiness.profession_name" multiple placeholder="请选择事项" filterable allow-create>
                        <el-option v-for="item in professionOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参与人员" prop="employees">
                    <el-select v-model="updateBusiness.employees" multiple placeholder="请选择参与人员" filterable allow-create>
                        <el-option v-for="item in employeesOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上会情况">
                    <el-switch v-model="updateBusiness.passed"></el-switch>
                </el-form-item>
                <el-form-item label="合同费用" prop="contract_fee">
                    <el-input v-model="updateBusiness.contract_fee"></el-input>
                </el-form-item>
                <el-form-item label="评审费用" prop="review_fee">
                    <el-input v-model="updateBusiness.review_fee"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">取消</el-button>
                <el-button :loading="updateLoading" @click="updateCurrent" type="primary">确定</el-button>
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
                {key: 'start_time', label:'公司'},
                {key: 'end_time', label:'项目类型'},
                {key: 'second_party', label:'公司'},
                {key: 'type_name', label:'项目类型'},
                {key: 'profession_name', label:'事项'},
                {key: 'employees', label:'参与人员'},
                {key: 'passed', label:'上会情况'},
                {key: 'contract_fee', label:'合同费用'},
                {key: 'review_fee', label:'评审费用'},
                {key: 'pure_income', label:'付款金额'},
                {key: 'balance', label:'差额'},
                {key: 'if_paid', label:'是否付清'},
            ],
            typeOptions: [],
            professionOptions: [],
            employeesOptions: [],
            business: [],
            downdata: [],
            total: 1,
            loading: false,
            dialogCreateVisible: false,
            createLoading: false,
            updateLoading: false,
            dialogUpdateVisible: false,
            createBusiness: {
                id: '',
                start_time: '',
                end_time: '',
                second_party: '',
                type_name: '',
                profession_name: '',
                employees: '',
                passed: false,
                contract_fee: 0,
                review_fee: 0
            },
            updateBusiness: {
                id: '',
                start_time: '',
                end_time: '',
                second_party: '',
                type_name: '',
                profession_name: '',
                employees: '',
                passed: false,
                contract_fee: 0,
                review_fee: 0
            },
            rules: {
                second_party: [{
                    required: true,
                    message: '请输入合作方名称',
                    trigger: 'blur'
                }, {
                    pattern: /^[\u0391-\uFFE5A-Za-z]+$/,
                    message: '公司只能为汉字或英文'
                }],
                type_name: [{
                    required: true,
                    trigger: 'blur'
                }],
                profession_name: [{
                    required: true,
                    trigger: 'blur'
                }],
                employees: [{
                    required: true,
                    trigger: 'blur'
                }],
                contract_fee: [{
                    pattern: /^\d+[\.]{0,1}\d*$/,
                    message: '合同费用只能输入数字'
                }],
                review_fee: [{
                    pattern: /^\d+[\.]{0,1}\d*$/,
                    message: '合同费用只能输入数字'
                }]
            }
        }
    },
    created() {
        this.getBusiness(this.listQuery);
        this.getOptions();
    },
    methods: {
        getBusiness(list){
            this.loading = false;
            var params
            if(arguments.length > 0){
                params = this.listQuery
            }else{
                params = list
            }
            api._getB(params).then(res => {
                if (res.success){
                    if(arguments.length === 0){
                        this.downdata = res.data;
                    }else{
                        this.business = res.data;
                        this.total = res.total;
                    }                                
                } else {
                    this.$message.error(res.message);
                }
                this.loading = false;
            }, err => {
                console.log(err);
            }) 
        },
        getOptions() {
            var option = {}
            api._get().then(res => {
                if(res.success){
                    for(let i in res.data) {
                        option.key = res.data.id;
                        option.label = res.data.second_party;
                    }
                    this.employeesOptions = this.employeesOptions.push(option);
                } else {
                    this.message.error(res.message);
                }
            }, err => {
                console.log(err);
            });
            api._getT().then(res => {
                if(res.success){
                    for(let i in res.data) {
                        option.key = res.data.id;
                        option.label = res.data.type_name;
                    }
                    this.typeOptions = this.typeOptions.push(option);
                } else {
                    this.message.error(res.message);
                }
            }, err => {
                console.log(err);
            });
            api._getP().then(res => {
                if(res.success){
                    for(let i in res.data) {
                        option.key = res.data.id;
                        option.label = res.data.profession_name;
                    }
                    this.professionOptions = this.professionOptions.push(option);
                } else {
                    this.message.error(res.message);
                }
            }, err => {
                console.log(err);
            })
        },
        removeCurrent(row) {
            this.$confirm('此操作将永久删除 ' + row.second_party + '公司此项业务,是否继续？', {
                type: 'warning'
            }).then(() => {
                api._removeB(row).then(res => {
                    this.$message.success('成功删除了' + row.second_party +'公司此项业务!');
                    this.getBusiness(this.listQuery);
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
        setCurrent(row) {
            this.updateBusiness.id = row.id;
            this.updateBusiness.start_time = row.start_time;
            this.updateBusiness.end_time = row.end_time;
            this.updateBusiness.second_party = row.second_party;
            this.updateBusiness.type_name = row.type_name;
            this.updateBusiness.profession_name = row.profession_name;
            this.updateBusiness.employees = row.employees;
            this.updateBusiness.contract_fee = row.contract_fee;
            this.updateBusiness.review_fee = row.review_fee;
            if(row.passed){
                this.updateBusiness.passed = true;
            }else {
                this.updateBusiness.passed = false;
            } 
            this.dialogUpdateVisible = true;
        },
        createCurrent() {
            this.$refs.create.validate((valid) => {
                if(valid) {
                    this.createLoading = true;
                    api._postB(this.createBusiness).then(res => {
                        this.$message.success('创建业务成功！');
                        this.dialogCreateVisible = false;
                        this.createLoading = false;
                        this.reset();
                        this.getBusiness(this.listQuery);
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
        updateCurrent() {
            this.$refs.update.validate((valid) => {
                if(valid) {
                    this.updateLoading = true;
                    api._updateB(this.updateBusiness.id, this.updateBusiness).then(res => {
                        this.$message.success('修改用户信息成功！');
                        this.dialogUpdateVisible = false;
                        this.updateLoading = false;
                        this.getBusiness(this.listQuery);
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
        reset() {
            this.$refs.create.resetFields();
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
            }).catch(() => {});
        },
        handleDownload() {
            this.getBusiness();
            import('../vendor/Export2Excel').then(excel => {
                var tHeader = ['注册日期']
                var filterVal = ['create_time']
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
            if (j === 'start_time' || j === 'end_time') {
                return parseTime(v[j])
            } else {
                return v[j]
            }
            }))
        },
    }
}
</script>