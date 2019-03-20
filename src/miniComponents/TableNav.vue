<template>
    <div>
        <el-date-picker 
                :value.sync="chooseDate"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholde="开始日期"
                end-placeholde="结束日期"
                :format="format"
                :value-format="valueFormat"
                :picker-options="pickerOptions"
                style="width:35%"
                @change="pickerChange">
        </el-date-picker>
        <el-select :value.sync="selectOption" placeholder="请选择" style="width:25%;margin-left:2%">
            <el-option v-for="item in selectOptions"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
            </el-option>
        </el-select>
        <el-input :value.sync="searchInput" 
                  placeholder="请输入搜索关键字" 
                  style="width:25%;margin-left:2%;"
                  @change="inputChange"></el-input>
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
        cDate: {
            type: Array,
            default() {
                return []
            }
        },
        sOption: {
            type: String,
            default: ""
        },
        sInput: {
            type: String
        }
    },
    computed: {
        chooseDate: {
            get() {
                console.log('get'+this.cDate)
                return this.cDate
            },
            set(val) {
                this.$emit('update:cDate', val)
            }
        },
        selectOption: {
            get() {
                return this.sOption
            },
            set(val) {
                this.$emit('update:sOption', val)
            }
        },
        searchInput: {
            get() {
                return this.sInput
            },
            set(val) {
                this.$emit('update:sInput', val)
            }
        }
    },
    data() {
        return {
            selectOptions: [
                {key: 'user_id',label: '工号'},
                {key: 'user_name',label: '用户名'},
                {key: 'user_display_name',label: '姓名'},
                {key: 'telephone_num',label: '手机号'},
                {key: 'status',label: '在职状态'},
            ],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一个月',
                    onClick(picker) {
                        var end = new Date();
                        var start = new Date();
                        start.setDate(1);
                        picker.$emit('pick',[start,end]);
                    }
                },
                {
                    text: '上一个月',
                    onClick(picker) {
                        var d = new Date();
                        
                        if(d.getMonth == 0){
                            d.setFullYear(d.getFullYear() -1,0);
                        } else{
                            d.setMonth(d.getMonth());
                        }
                        var end = new Date(d.setDate(0));
                        var start = new Date(d.setDate(1));
                        picker.$emit('pick',[start,end]);
                    }
                }]
            }
        }
    },
    methods: {
        pickerChange(val) {
            this.$emit('table-nav', {
                cDate: val
            })
        },
        selectChange(val) {
            this.$emit('table-nav', {
                sOption: val
            })
        },
        inputChange(val) {
            console.log('inputchange:'+val)
            this.$emit('table-nav', {
                sInput: val
            })
        }
    }

}

</script>
<style>
</style>