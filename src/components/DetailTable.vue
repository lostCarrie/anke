<template>
    <div class="inner-ctt">
        <h1>详细工资单</h1>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-table :data="detailData"
                              show-summary
                              highlight-current-row
                              fit>
                        <el-table-column prop="username"
                                         label="姓名">
                        </el-table-column>
                        <el-table-column prop="basicSlr"
                                         label="基本工资">
                        </el-table-column>
                        <el-table-column prop="expertSlr"
                                         label="专家工资">
                        </el-table-column>
                        <el-table-column prop="projectSlr"
                                         label="项目工资">
                        </el-table-column>
                        <el-table-column prop="travelExp"
                                         label="差旅费">
                        </el-table-column>
                        <el-table-column prop="subsidy"
                                         label="补贴">
                        </el-table-column>
                        <el-table-column prop="other"
                                         label="其他">
                        </el-table-column>
                        <el-table-column prop="totalSlr"
                                         label="应领工资">
                        </el-table-column>
                        <el-table-column prop="rwdPns"
                                         label="奖罚项">
                            <template slot-scope="scope">
                                <template v-if="scope.row.edit">
                                    <el-input class="edit-input" size="small" v-model="scope.row.rwdPns"></el-input>
                                </template>
                                <span v-else>{{ scope.row.rwdPns }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actualSlr"
                                         label="实领工资">
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
