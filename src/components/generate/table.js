import { mapGetters } from 'vuex';
export default {
    render() {
        return <el-table data={this.data} on-selection-change={this.selectionChange} {...{ attrs: this.tableAttrs }} >
            {this.isSelection ? <el-table-column type='selection' width='42'></el-table-column> : ''}
            {
                this.params.map(item => {
                    if (!item) return;
                    if (item.permission) {
                        if (!this.roles.includes(item.permission)) return;
                    }

                    return <el-table-column {...{ attrs: item }} formatter={this.formatter.bind(this, item)} render-header={this.renderHeader.bind(this, item)} >
                        {/* <template slot='header' >
                            {this.renderHeader(item)}
                        </template> */}
                    </el-table-column>
                })
            }
        </el-table>
    },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'roles'
        ])
    },
    props: {
        data: Array, // 数据来源
        params: Array,
        tableAttrs: {
            type: Object,
            default: () => ({
                'stripe': true, //  带斑马纹表格
                'header-row-class-name': 'table-header-name',
                'row-class-name': 'table-row-name',
            })
        }, // 表格自定义扩展参数
        isSelection: { type: Boolean, default: true }, // 是否显示多选
        callback: { type: Function, default: () => { } }
    },
    methods: {
        selectionChange(val) {
            this.$emit('selection-change', val);
        },
        /* 渲染内容 */
        formatter(item, row, column, cellValue, index) {
            if (item.formatF) {
                return item.formatF(row, column);
            }
            return item.prop ? row[item.prop] || '' : '';
        },
        /* 渲染表头  */
        renderHeader(item) {
            if (item.labelF) {
                return item.labelF()
            }
            return <span>{item.label}</span>;
        }
    }
}
