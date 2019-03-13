<template>
    <div class="inner-ctt">
        <h1>安可业务信息</h1>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-table :data="detailData"
                              show-summary=true
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
                                         label="上会通过情况">
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
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detailData: []
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail(){
            const items = [{
                id: 1,
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

</style>
