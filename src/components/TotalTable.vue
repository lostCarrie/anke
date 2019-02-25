<template>
    <div>
        <h1>工资表</h1>
        <el-row>
            <el-col :span="22" offset="1">
                <div>
                    <el-table :data="tableData"
                              height="250"
                              strip
                              style="width: 100%">
                        <el-table-column prop="id"
                                         label="序号">
                        </el-table-column>
                        <el-table-column prop="username"
                                         label="姓名">
                        </el-table-column>
                        <el-table-column prop="salary"
                                         label="工资">
                        </el-table-column>
                        <el-table-column label="操作"
                                         width="100">
                            <template slot-scope="scope">
                                <el-button type="success" size="small">编辑</el-button>
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
            tableData: [{
                id:1,
                username: '仔仔',
                salary: 12345
            }]
        }
        
    }
}

</script>
