<template>
    <div class="sponge">
        <el-row>
            <el-col :span="16">
                <table-nav :c-date.sync="listQuery.cDate"
                           :s-option.sync="listQuery.sOption"
                           :s-input.sync="listQuery.sInput"
                           :select-options="selectOptions"
                           @table-nav="getReceipts"/>
            </el-col>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" @click="dialogCreateVisible = true">新增</el-button>
                <el-button icon="el-icon-download" type="primary">下载</el-button>
            </el-col>
        </el-row>
        <!-- 基础表格 -->
        <el-row style="width:100%;height:90%;">
            <el-col :span="24" class="sponge">
                <el-table :data="receipts"
                          stripe
                          fit
                          highlight-current-row
                          show-summary
                          v-loading="loading"
                          element-loading-text="拼命加载中..."
                          style="width:100%;margin-top:20px;"
                          :default-sort="{prop:['oneone','twotwo'],order: 'descending'}"
                          class="main-table">
                    <el-table-column prop="oneone" label="日期" sortable min-width="100px">
                        <template slot-scope="scope">
                            <span> {{ scope.row.oneone | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="twotwo" label="公司" sortable/>
                    <el-table-column prop="threethreel" label="项目类型"/>
                    <el-table-column prop="threethree" label="事项"/>
                    <el-table-column prop="fourfour" label="数额"/>
                    <el-table-column prop="fivefive" label="经办人"/>
                    <el-table-column prop="sixsix" label="接收人"/>
                    <el-table-column prop="sevenseven" label="账户"/>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="removeCurrent(scope.row)">删除</el-button>
                            <el-button type="success" size="small" @click="setCurrent(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination v-show="total>0"
                            :total="total"
                            :page.sync="listQuery.page"
                            :p-size.sync="listQuery.pSize"
                            @pagination="getReceipts"/>
            </el-col>
        </el-row>
        <!-- 创建收款条目 -->
        <el-dialog title="创建收款明细"
                   :visible.sync="dialogCreateVisible"
                   :before-close="handleClose">
            <el-form ref="create" 
                     status-icon 
                     :rules="rules" 
                     :model="createReceipt"
                     label-width="100px"
                     label-position="right">
                <el-form-item label="日期" prop="oneone">
                    <el-date-picker v-model="createReceipt.oneone" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="公司" prop="twotwo">
                    <el-input v-model="createReceipt.twotwo"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="threethreel">
                    <el-select v-model="createReceipt.threethreel" placeholder="请选择项目类型" filterable allow-create>
                        <el-option v-for="item in typeOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事项" prop="threethree">
                    <el-select v-model="createReceipt.threethree" multiple placeholder="请选择事项" filterable allow-create>
                        <el-option v-for="item in professionOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数额" prop="fourfour">
                    <el-input v-model="createReceipt.fourfour"></el-input>
                </el-form-item>
                <el-form-item label="经办人" prop="fivefive">
                    <el-select v-model="createReceipt.fivefive" multiple placeholder="请选择经办人" filterable allow-create>
                        <el-option v-for="item in fivefiveOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收人" prop="sixsix">
                    <el-select v-model="createReceipt.sixsix" multiple placeholder="请选择接收人" filterable allow-create>
                        <el-option v-for="item in sixsixOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户" prop="sevenseven">
                    <el-select v-model="createReceipt.sevenseven" multiple placeholder="请选择账户" filterable allow-create>
                        <el-option v-for="item in sevensevenOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible = false">取消</el-button>
                <el-button @click="createCurrent" type="primary" :loading="createLoading">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改业务信息"
                   :visible.sync="dialogUpdateVisible"
                   :before-close="handleClose">
            <el-form ref="update" status-icon :rules="rules" :model="updateReceipt" label-width="100px" label-position="left">
                <el-form-item label="日期" prop="oneone">
                    <el-date-picker v-model="updateReceipt.oneone" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="公司" prop="twotwo">
                    <el-input v-model="updateReceipt.twotwo"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" prop="threethreel">
                    <el-select v-model="updateReceipt.threethreel" placeholder="请选择项目类型" filterable allow-create>
                        <el-option v-for="item in typeOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事项" prop="threethree">
                    <el-select v-model="updateReceipt.threethree" multiple placeholder="请选择事项" filterable allow-create>
                        <el-option v-for="item in professionOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数额" prop="fourfour">
                    <el-input v-model="updateReceipt.fourfour"></el-input>
                </el-form-item>
                <el-form-item label="经办人" prop="fivefive">
                    <el-select v-model="updateReceipt.fivefive" multiple placeholder="请选择经办人" filterable allow-create>
                        <el-option v-for="item in fivefiveOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收人" prop="sixsix">
                    <el-select v-model="updateReceipt.sixsix" multiple placeholder="请选择接收人" filterable allow-create>
                        <el-option v-for="item in sixsixOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户" prop="sevenseven">
                    <el-select v-model="updateReceipt.sevenseven" multiple placeholder="请选择账户" filterable allow-create>
                        <el-option v-for="item in sevensevenOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
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
import {parseTime} from '../filters'
export default{
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
                {key: 'twotwo', label:'公司'},
                {key: 'threethreel', label:'项目类型'},
                {key: 'threethree', label:'事项'},
                {key: 'fourfour', label:'数额'},
                {key: 'fivefive', label:'经办人'},
                {key: 'sixsix', label:'接收人'},
                {key: 'sevenseven', label:'账户'}
            ],
            receipts: [{
                oneone: new Date(),
                twotwo: 'anke',
                threethree: '现状图',
                fourfour: '10000',
                fivefive: 'Mumu',
                sixsix: 'Carrie',
                sevenseven: '广发'                
            }],
            downdata: [],
            total: 1,
            loading: false,
            dialogCreateVisible: false,
            createLoading: false,
            updateLoading: false,
            dialogUpdateVisible: false,
            createReceipt: {
                id: '',
                twotwo: '',
                threethreel: '',
                threethree: '',
                fourfour: 0,
                fivefive: '',
                sixsix: '',
                sevenseven: '' 
            },
            updateReceipt: {
                id: '',
                twotwo: '',
                threethreel: '',
                threethree: '',
                fourfour: 0,
                fivefive: '',
                sixsix: '',
                sevenseven: '' 
            },
            rules: {
                oneone: [{
                    required: true,
                    trigger: 'blur'
                }],
                twotwo: [{
                    required: true,
                    message: '请输入汇款方名称',
                    trigger: 'blur'
                }, {
                    pattern: /^[\u0391-\uFFE5A-Za-z]+$/,
                    message: '公司只能为汉字或英文'
                }],
                threethreel: [{
                    required: true,
                    trigger: 'blur'
                }],
                threethree: [{
                    required: true,
                    trigger: 'blur'
                }],
                fourfour: [{
                    pattern: /^\d+[\.]{0,1}\d*$/,
                    message: '合同费用只能输入数字'
                }],
                fivefive: [{
                    required: true,
                    trigger: 'blur'
                }],
                sixsix: [{
                    required: true,
                    trigger: 'blur'
                }],
                sevenseven: [{
                    required: true,
                    trigger: 'blur'
                }]
            }
        }
    },
    created:function() {
        this.getReceipts(this.listQuery);
        this.getOptions();
    },
    methods: {
        //获取用户数据
        getReceipts(list){
            this.loading = false;
            var params
            if(arguments.length > 0){
                params = this.listQuery
            }else{
                params = list
            }
            api._getR(params).then(res => {
                if (res.success){
                    if(arguments.length === 0){
                        this.downdata = res.data;
                    }else{
                        this.users = res.data;
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
                        option.label = res.data.employees;
                    }
                    this.fivefiveOptions = this.fivefiveOptions.push(option);
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
            this.$confirm('此操作将永久删除 ' + row.twotwo + '公司此项记录,是否继续？', {
                type: 'warning'
            }).then(() => {
                api._removeR(row).then(res => {
                    this.$message.success('成功删除了' + row.twotwo +'公司此项业务!');
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
            this.updateReceipt.id = row.id;
            this.updateReceipt.oneone = row.oneone;
            this.updateReceipt.twotwo = row.twotwo;
            this.updateReceipt.threethreel = row.threethreel;
            this.updateReceipt.threethree = row.threethree;
            this.updateReceipt.fourfour = row.fourfour;
            this.updateReceipt.fivefive = row.fivefive;
            this.updateReceipt.sixsix = row.sixsix;
            this.updateReceipt.sevenseven = row.sevenseven;
            this.dialogUpdateVisible = true;
        },
        updateCurrent() {
            this.$refs.update.validate((valid) => {
                if(valid) {
                    this.updateLoading = true;
                    api._updateR(this.updateReceipt.id, this.updateReceipt).then(res => {
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
        createCurrent() {
            this.$refs.create.validate((valid) => {
                if(valid) {
                    this.createLoading = true;
                    api._postR(this.createReceipt).then(res => {
                        this.$message.success('创建记录成功！');
                        this.dialogCreateVisible = false;
                        this.createLoading = false;
                        this.reset();
                        this.getReceipts(this.listQuery);
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
        },
    }
}
</script>