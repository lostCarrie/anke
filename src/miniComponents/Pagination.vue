<template>
    <div>
        <el-pagination
            :background="background"
            :layout="layout"
            :page-sizes="pageSizes"
            :total="total"
            v-bind="$attrs"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        background: {
            type: Boolean,
            default:true
        },
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        pageSizes: {
            type: Array,
            default() {
                return [2, 20, 50, 100]
            }
        },
        total: {
            required: true,
            type: Number
        },
        page: {
            type: Number,
            default: 1
        },
        pSize: {
            type: Number,
            default: 20
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get() {
                return this.pSize
            },
            set(val) {
                this.$emit('update:pSize', val)
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination',{
                page: this.currentPage,
                pSize: this.val
            })
        },
        handleCurrentChange(val) {
            this.$emit('pagination', {
                page: val,
                pSize: this.pageSize
            })
        }
    }
}

</script>
