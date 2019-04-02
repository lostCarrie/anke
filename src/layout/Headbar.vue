<template>
    <div>
        <div class="left-menu">
            <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
            <span class="hamburger-container">河津市安可安全技术咨询服务有限公司</span>
        </div>
        <div class="right-menu">
            <i class="el-icon-more"></i>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import hamburger from '../miniComponents/Hamburger.vue'
export default {
    components: {
        hamburger
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('toggleSideBar');
        }
    }
}
</script>

<style>
.left-menu {
    float: left;
}
.right-menu {
    float: right;
}
.hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
}
</style>
