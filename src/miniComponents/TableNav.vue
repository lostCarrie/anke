<template>
    <div>
        <el-date-picker v-model="chooseDate"
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
        <el-select v-model="selectOption" 
                   placeholder="请选择" 
                   clearable
                   style="width:25%;margin-left:2%"
                   @change="selectChange">
            <el-option v-for="item in selectOptions"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
            </el-option>
        </el-select>
        <el-input v-model="searchInput" 
                  placeholder="请输入搜索关键字" 
                  style="width:25%;margin-left:2%;"
                  clearable
                  @change="inputChange"></el-input>
        <el-button icon="el-icon-search" type="primary" style="margin-left:2%;" @click="searchClick"></el-button>
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
            type: Array
        },
        sOption: {
            type: String
        },
        selectOptions: {
            type: Array
        },
        sInput: {
            type: String
        }
    },
    computed: {
        chooseDate: {
            get() {
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
            this.$emit('table-nav', {
                sInput: val
            })
        },
        searchClick() {
            this.$emit('table-nav', {
                cDate: this.chooseDate,
                sOption: this.selectOptions,
                sInput: this.searchInput
            })
        }
    }

}

</script>
<style>
</style>