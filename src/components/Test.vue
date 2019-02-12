<template>
<div>
    <el-row span="22" offset="1">
        <el-col>
            <el-table style="width:100%" :data="tableData">
                <el-table-column prop="aaa"
                                 label="bbb">
                </el-table-column>
                <el-table-column label="ccc">
                    <template slot-scope="scope">
                    <el-button>ddd</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            tableData: [{
                aaa: 1
            }]
        }
    }
    
}
</script>