<template>
    <g-table v-loading="tableLoading" :data="tableData" :params="tableParams" @selection-change="val => multipleSelection = val" />
</template>

<script>
export default {
    data() {
        return {
            tableLoading: false,
            tableData: [],
            multipleSelection: [], // 多选选中的值
            tableParams: [
                { prop: 'fileName', label: '文件名', },
                { prop: 'saveName', label: '文件名', },
                { prop: 'savePath', label: '文件路径', },
                { prop: 'ext', label: '后缀', },
                { prop: 'mime', label: 'mime', },
                {
                    prop: 'size', label: '文件大小', width: 100,
                },
                {
                    prop: 'md5', label: 'md5',
                },
                {
                    prop: 'status', label: '操作', width: 160,
                    formatF: row => <div>
                        <el-button type='text' on-click={() => this.HandleDelete(this.apiUrl, row, this.query)} icon='el-icon-delete'>删除</el-button>
                    </div>
                },],
        }
    },
    created() {
        this.query();
    },
    methods: {
        HandleDelete() { },
        query() {
            this.tableLoading = true;
            setTimeout(() => {
                this.tableData = [{ fileName: 'z123', saveName: 'zhangsan', savePath: '1' }, { fileName: 'xc1', saveName: 'zhangsan', savePath: '1' },];
                this.tableLoading = false;
            }, 2000)
        },
    },
}
</script>

<style>
</style>
