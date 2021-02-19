<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-menu">
            <el-tooltip content="全屏" effect="dark" placement="bottom">
                <screenfull id="screenfull" class="right-menu-item hover-effect" />
            </el-tooltip>

            <el-divider direction="vertical" />

            <div class="right-menu-item">2021年12月19日 星期五</div>

            <el-divider direction="vertical" />

            <el-dropdown trigger="click">
                <div class="right-menu-item hover-effect">
                    <span>张三</span>
                    <i class="el-icon-caret-bottom" />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <router-link to="/dashboard">
                            <el-dropdown-item>首页</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided>
                            <span style="display:block;" @click="logout">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <el-divider direction="vertical" />

            <div class="right-menu-item" @click="logout">退出</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import { createUniqueString } from '@/utils'

export default {
    components: {
        Breadcrumb,
        Hamburger,
        Screenfull,
    },
    computed: {
        ...mapGetters([
            'sidebar',
        ])
    },
    created() {
        console.log(createUniqueString());
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async logout() {
            await this.$store.dispatch('user/logout')
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            color: #5a5e66;
            font-size: 14px;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .vertical {
            display: inline-block;
            height: 100%;
        }
    }
}
</style>
