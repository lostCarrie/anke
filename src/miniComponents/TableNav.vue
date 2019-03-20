<template>
    <div>
        <el-date-picker 
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                :format="format"
                :value-format="valueFormat"
                :picker-options="pickerOptions"
                style="width:35%"
                :value.sync="value"
                @change="handleChange">
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
    name: 'TableNav',
    props: {
        format: {
            type: String,
            default: "yyyy/M/d"
        },
        valueFormat: {
            type: String,
            default: "yyyy-MM-dd"
        },
        chooseDate: {
            type: String,
            default: ""
        }
    },
    computed: {
        value: {
            get() {
                return this.chooseDate
            },
            set(val) {
                this.$emit('update:chooseDate', val)
            }
        }
    },
    data() {
        return {
            searchOptions: [
                {key: 'user_id',label: '工号'},
                {key: 'user_name',label: '用户名'},
                {key: 'user_display_name',label: '姓名'},
                {key: 'telephone_num',label: '手机号'},
                {key: 'status',label: '在职状态'},
            ],
            searchOption:'',
            search:'',
            chooseDate: '',
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
    },
    methods: {
        handleChange() {
            console.log(this.chooseDate)
        }
    }

}

</script>
<style>
</style>