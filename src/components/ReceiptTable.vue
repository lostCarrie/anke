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
                    <el-table-column prop="threethree" label="事项"/>
                    <el-table-column prop="fourfour" label="数额"/>
                    <el-table-column prop="fivefive" label="经办人"/>
                    <el-table-column prop="sixsix" label="接收人"/>
                    <el-table-column prop="sevenseven" label="账户"/>
                    <el-table-column label="操作" width="250">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="removeReceipt(scope.row)">删除</el-button>
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
                   width="30%"
                   :before-close="handleClose">
            <el-form ref="create" 
                     status-icon 
                     :rules="rules" 
                     :model="createReceipt"
                     label-width="100px"
                     label-position="right">

            </el-form>
            <div>
                <el-button @click="dialogCreateVisible = false">取消</el-button>
                <el-button @click="createReceipt" type="primary" :loading="createLoading">确定</el-button>
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
            total: 1,
            loading: false,
            dialogCreateVisible: false,
            createLoading: false
        }
    },
    created:function() {
        this.getReceipts(this.listQuery);
    },
    methods: {
        getThen(res){
            var data
            if(res.success) {
                if(params){
                    this.receipts = res.data;
                    this.total = res.total;
                }else{
                    data = res.data
                }
            }else {
                this.$message.error(res.message);
            }
            this.loading = false;
            return data
        },
        getReceipts(list) {
            var params,data;
            this.loading = true;
            if(list === undefined){
                params = list;
            }else {
                params = this.listQuery;
            }
            api._getR(params).then(getThen(res), err => {
                console.log(err);
            })
            return this.getThen(res)()
        },
        removeReceipt(row) {

        },
        setCurrent(row) {

        },
        createReceipt() {

        },
        handleClose() {

        }
    }
}
</script>