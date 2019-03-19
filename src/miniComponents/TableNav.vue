<template>
    <div>
        <el-date-picker v-model="firstDate"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                class="filter-item"
                style="width:30%">
        </el-date-picker>
        <el-select v-model="searchOption" placeholder="请选择" style="width:25%;margin-left:2%">
            <el-option v-for="item in searchOptions"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
            </el-option>
        </el-select>
        <el-input v-model="search" class="filter-item" placeholder="请输入搜索关键字" style="width:25%;margin-left:2%;"></el-input>
        <el-button icon="el-icon-search" type="primary" style="margin-left:2%;" @click="handleFilter"></el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstDate: '',
            pickerOptions: {
                shortcuts: [{
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setDate(1);
                        picker.$emit('pick',[start,end]);
                    }
                },
                {
                    text: '上一个月',
                    onClick(picker) {
                        const d = new Date();
                        
                        if(d.getMonth == 0){
                            d.setFullYear(d.getFullYear() -1,0);
                        } else{
                            d.setMonth(d.getMonth());
                        }
                        const end = new Date(d.setDate(0));
                        const start = new Date(d.setDate(1));
                        picker.$emit('pick',[start,end]);
                    }
                }]
            }
        }
    }
}

</script>
<style>
</style>