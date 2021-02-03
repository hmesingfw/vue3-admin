<template>
    <div>
        <div>表单：</div>
        <g-form :model="data" :datalist="datalist" :attr="dataAttr" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableLoading: false,
            data: {
                name: '1',
                min: ''
            },
            dataAttr: {
                'label-width': '100px',
                inline: true,
                size: 'mini',
            },
            datalist: [
                { type: 'input', prop: 'name', label: '姓', attr: { maxlength: 13, 'show-word-limit': true, } },
                { type: 'input', prop: 'min', label: '名', attr: { maxlength: 13, 'show-word-limit': true, } },
                {
                    type: 'select', prop: 'gender', label: '性别', attr: { placeholder: '请选择活动区域', clearable: true, style: { width: '100%' } },
                    option: [{ label: '男', value: 1 }, { label: '女', value: 2 }, { label: '未知', value: 3, attr: { disabled: true, } }]
                },
                { type: 'time', label: '项目时间', prop: '' },
                {
                    formatF: (status) => <el-form-item label='活动名称1' v-show={status}>
                        <el-input vModel={this.data.name}></el-input>
                    </el-form-item>
                }, {
                    formatF: (status) => <el-form-item label='活动名称2' v-show={status}>
                        <el-input vModel={this.data.name}></el-input>
                    </el-form-item>
                }, {
                    formatF: (status) => <el-form-item label='活动名称3' v-show={status}>
                        <el-input vModel={this.data.name}></el-input>
                    </el-form-item>
                }, {
                    formatF: (status) => <el-form-item label='活动名称4' v-show={status}>
                        <el-input vModel={this.data.name}></el-input>
                    </el-form-item>
                },
            ]
        }
    },
    created() {
        this.query();
    },
    methods: {
        HandleDelete() { },
        query() {

        },
    },
}
</script>

<style>
</style>
