<template>

    <el-date-picker v-model="firstDate"
            type="daterange"
            align="left"
            unlink-panels
            range-separator="至"
            start-placeholde="开始日期"
            end-placeholde="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            class="filter-item">
    </el-date-picker>
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
.filter-item {
    width: 90%;
  }
</style>