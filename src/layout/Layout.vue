<template>
    <el-container :class="classObj">    
        <el-aside>
            <navbar></navbar>
        </el-aside>
        <el-container class="main-container">
            <el-header>
                <headbar></headbar>
            </el-header>
            <el-main>
                <contents></contents>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Navbar from './Navbar.vue'
    import Contents from './Contents.vue'
    import Headbar from './Headbar.vue'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            Navbar,
            Contents,
            Headbar
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                }
            }
        }
    }
</script>

<style>

</style>