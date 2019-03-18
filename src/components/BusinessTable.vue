<template>
    <div class="inner-ctt">
        <el-row>
            <el-col :span="8">
                <table-nav></table-nav>
            </el-col>
            <el-col :span="8">
                <el-input v-model="search"
                  class="filter-item"
                  placeholder="输入关键字"></el-input>
            </el-col>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary" @click="enen">新增</el-button>
                <el-button icon="el-icon-delete" type="primary">删除</el-button>
                <el-button icon="el-icon-download" type="primary" @click="handleDownload">下载</el-button>    
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-table :data="detailData.filter(data => !search || data.username.includes(search))"
                              show-summary
                              highlight-current-row
                              fit>
                        <el-table-column prop="username"
                                         label="日期">
                        </el-table-column>
                        <el-table-column prop="basicSlr"
                                         label="公司">
                        </el-table-column>
                        <el-table-column prop="expertSlr"
                                         label="项目类型">
                        </el-table-column>
                        <el-table-column prop="projectSlr"
                                         label="事项">
                        </el-table-column>
                        <el-table-column prop="travelExp"
                                         label="参与人员">
                        </el-table-column>
                        <el-table-column prop="actualSlr"
                                         label="上会情况">
                        </el-table-column>
                        <el-table-column prop="subsidy"
                                         label="合同费用">
                        </el-table-column>
                        <el-table-column prop="other"
                                         label="评审费用">
                        </el-table-column>
                        <el-table-column prop="totalSlr"
                                         label="付款金额">
                        </el-table-column>
                        <el-table-column prop="totalSlr"
                                         label="差额">
                        </el-table-column>
                        <el-table-column prop="totalSlr"
                                         label="是否付清">
                        </el-table-column>
                         <el-table-column label="操作" width="120px">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.edit" size="mini" icon="el-icon-circle-close-outline" type="warning" @click="cancelEdit(scope.row)"></el-button>
                                <el-button v-if="scope.row.edit" size="mini" type="success"  icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)"></el-button>
                                <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="clickEdit(scope.row)">编辑</el-button>
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
                                    <el-table-column prop="stageSlr"
                                                     label="预付金额">
                                    </el-table-column>
                                    <el-table-column prop="finishSlr"
                                                     label="付款金额">
                                    </el-table-column>
                                    <el-table-column prop="finishSlr"
                                                     label="经办">
                                    </el-table-column>
                                    <el-table-column prop="finishSlr"
                                                     label="付款方式">
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-sizes="[20,50,100]"
                                   :page-size="20"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="total">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import TableNav from '../miniComponents/TableNav.vue'

export default {
    components: {
        TableNav
    },
    data() {
        return {
            detailData: [],
            search: '',
            currentPage: 1,
            total: 0
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        enen() {
            console.log('enen');
        },
        getDetail(){
            const items = [{
                id: 1,
                username: '2019-1-2',
                basicSlr: '仔仔公司',
                expertSlr: '矿山项目',
                projectSlr: '应急预案',
                travelExp: '小猴叔叔',
                subsidy: 0,
                other: 0,
                totalSlr: '否',
                rwdPns: -9,
                actualSlr: '通过',
                project: [{
                    id: 1,
                    projName: '每日优鲜',
                    stageSlr: 0,
                    finishSlr: 100
                },
                {
                    id: 2,
                    projName: '每日优鲜',
                    stageSlr: 0,
                    finishSlr: 100
                }]
            },
            {
                id: 2,
                username: '仔仔',
                basicSlr: 123,
                expertSlr: 456,
                projectSlr: 100,
                travelExp: 50,
                subsidy: 10,
                other: 0,
                totalSlr: 739,
                rwdPns: -9,
                actualSlr: 730,
                project: [{
                    id: 2,
                    projName: '每日优鲜',
                    stageSlr: 0,
                    finishSlr: 100
                }]
            }]
            this.detailData = items.map(v=> {
                this.$set(v, 'edit', false)
                v.originalRwdPns = v.rwdPns
                return v
            })
            this.total = this.detailData.length;
        },
        clickEdit(row) {
            row.edit=!row.edit;
        },
        cancelEdit(row) {
            row.rwdPns = row.originalRwdPns;
            row.edit = false;
            this.$message({
                message: '已取消修改！',
                type: 'warning'
            })
        },
        confirmEdit(row) {
            row.edit = false;
            row.originalRwdPns = row.rwdPns;
            this.$message({
                message: '修改成功！',
                type: 'success'
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val}条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页： ${val}`);
        },
        handleDownload() {
            console.log('coming');
            import('../vendor/Export2Excel').then(excel => {
                const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
                const filterVal = ['username', 'title', 'type', 'importance', 'status']
                const data = this.formatJson(filterVal, this.detailData)
                excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: 'table-list'
                })
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                
                } else {
                return v[j]
                }
            }))
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
