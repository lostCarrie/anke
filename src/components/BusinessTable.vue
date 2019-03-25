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
                          style="width:100%;margin-top:20px;"
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
                    <el-table-column label="操作" width="250">
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
                   width="30%"
                   :before-close="handleClose">
            <el-form ref="create" status-icon :rules="rules" :model="createBusiness" label-width="100px" label-position="left">
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
                    <el-select v-model="createBusiness.type_name" placeholder="请选择项目类型">
                        <el-option v-for="item in typeOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="事项" prop="profession_name">
                    <el-select v-model="createBusiness.profession_name" multiple placeholder="请选择事项">
                        <el-option v-for="item in professionOptions"
                                   :key="item.key"
                                   :label="item.label"
                                   :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参与人员" prop="employees">
                    <el-select v-model="createBusiness.employees" multiple placeholder="请选择事项">
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
                <el-form-item label="付款金额" prop="pure_income">
                    <el-input v-model="createBusiness.pure_income"></el-input>
                </el-form-item>
                <el-form-item label="差额" prop="balance">
                    <el-input v-model="createBusiness.balance"></el-input>
                </el-form-item>
                <el-form-item label="是否付清">
                    <el-input v-model="createBusiness.if_paid"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible=false">取消</el-button>
                <el-button :loading="createLoading" @click="createCurrent" type="primary">确定</el-button>
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
                {key: 'twotwo', label:'公司'},
                {key: 'twotwo', label:'项目类型'},
                {key: 'threethree', label:'事项'},
                {key: 'fourfour', label:'参与人员'},
                {key: 'fivefive', label:'上会情况'},
                {key: 'sixsix', label:'合同费用'},
                {key: 'sixsix', label:'评审费用'},
                {key: 'sevenseven', label:'付款金额'},
                {key: 'sixsix', label:'差额'},
                {key: 'sixsix', label:'是否付清'},
            ],
            total: 1,
            loading: false,
            dialogCreateVisible: false,
            createLoading: false,
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
                review_fee: 0,
                pure_income: 0,
                balance: 0,
                if_paid: false
            }
        }
    },
    created() {
        this.getBusiness(this.listQuery)
    },
    methods: {
        // getDetail(){
        //     const items = [{
        //         id: 1,
        //         username: '2019-1-2',
        //         basicSlr: '仔仔公司',
        //         expertSlr: '矿山项目',
        //         projectSlr: '应急预案',
        //         travelExp: '小猴叔叔',
        //         subsidy: 0,
        //         other: 0,
        //         totalSlr: '否',
        //         rwdPns: -9,
        //         actualSlr: '通过',
        //         project: [{
        //             id: 1,
        //             projName: '每日优鲜',
        //             stageSlr: 0,
        //             finishSlr: 100
        //         },
        //         {
        //             id: 2,
        //             projName: '每日优鲜',
        //             stageSlr: 0,
        //             finishSlr: 100
        //         }]
        //     },
        //     {
        //         id: 2,
        //         username: '仔仔',
        //         basicSlr: 123,
        //         expertSlr: 456,
        //         projectSlr: 100,
        //         travelExp: 50,
        //         subsidy: 10,
        //         other: 0,
        //         totalSlr: 739,
        //         rwdPns: -9,
        //         actualSlr: 730,
        //         project: [{
        //             id: 2,
        //             projName: '每日优鲜',
        //             stageSlr: 0,
        //             finishSlr: 100
        //         }]
        //     }]
        // },
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
        removeCurrent(row) {

        },
        setCurrent(row) {

        },
        createCurrent() {

        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(() => {
                done();
            }).catch(() => {});
        },
        handleDownload() {
        }
    }
}
</script>

<style>
.inner-ctt {
    width: 100%;
    height: 100%;
}
.edit-input {
    padding-right: 5px;
}
.filter-item {
    width: 90%;
  }
</style>
