import { mapGetters } from 'vuex';
export default {
    render() {
        return <el-form ref='form' model={this.model} {...this.attr} onKeyDown={e => this.onKeyDownchange(e)}>
            {
                this.datalist.map((item, i) => {
                    /* slot 插入位置  */
                    if (i == this.slots) {
                        return <slot></slot>
                    }

                    /* 自定义组件 */
                    if (item.formatF) {
                        return item.formatF(this.custStatus);
                    }
                    /* 渲染组件 */
                    let compoentContent = '';
                    switch (item.type) {
                        case 'input':
                            compoentContent = <el-input vModel={this.model[item.prop]} {...item.attr} />
                            break;
                        case 'select':
                            // eslint-disable-next-line no-case-declarations
                            const optList = item.option;

                            if (optList && optList.length > 3) {
                                compoentContent = <el-select vModel={this.model[item.prop]} {...item.attr} onChange={() => this.handleChange()}>
                                    {
                                        optList.map(opt => {
                                            return <el-option label={opt.label} value={opt.value} {...opt.attr}></el-option>
                                        })
                                    }
                                </el-select>
                                break;
                            } else {
                                compoentContent = <el-radio-group vModel={this.model[item.prop]} {...item.attr} onChange={() => this.handleChange()}>
                                    <el-radio-button label>全部</el-radio-button>
                                    {
                                        optList.map(opt => {
                                            return <el-radio-button label={opt.value} {...opt.attr}> {opt.label} </el-radio-button>
                                        })
                                    }
                                </el-radio-group>
                                break;
                            }
                        case 'time':
                            compoentContent =
                                <el-date-picker
                                    vModel={this.timeValue}
                                    type='daterange'
                                    format='YYYY-MM-DD'
                                    range-separator='-'
                                    start-placeholder='请选择开始时间'
                                    end-placeholder='请选择结束时间'
                                    onChange={() => this.handleChange()}
                                />
                            break

                        default:
                            return '';
                    }
                    return <el-form-item label={item.label} prop={item.prop} v-show={i < this.showItem ? true : this.custStatus}> {compoentContent}   </el-form-item>
                })
            }
            {this.datalist.length < this.slots ? <slot></slot> : ''}
            <el-form-item>
                <el-button icon='el-icon-search' type='primary' onClick={() => this.handleChange()} >查询</el-button>
                <el-button icon='el-icon-refresh' type='primary' onClick={() => this.flash()}>重置</el-button>
                <el-button v-show={this.custStatus == false} icon='el-icon-arrow-down' type='text' onClick={() => { this.custStatus = true }}>展开</el-button>
                <el-button v-show={this.custStatus == true} icon='el-icon-arrow-up' type='text' onClick={() => { this.custStatus = false }} >收起</el-button>
            </el-form-item>
        </el-form >
    },
    computed: {
        ...mapGetters(['enumList']),
    },
    data() {
        return {
            custStatus: false,
            timeValue: [],
            pickerOptions: {
            },
        }
    },
    props: {
        model: {
            type: Object,
            default: () => { }
        }, // 数据对象
        attr: {
            type: Object,
            default: () => { }
        }, // 表单扩展对象
        datalist: {
            type: Array,
            default: () => []
            /* {
                type:   类型        [input select time]
                prop:   字段名
                label:  标题
                attr:   属性        {object}
                option：参数        []
                formatF：  渲染的元素内容如：<div>content<div>
                } */

        }, // 列表对象
        slots: { type: Number, default: 1000 }, // slot 插入位置
        showItem: { type: Number, default: 3 }
    },
    methods: {
        handleChange() {
            this.$emit('change');
        },
        flash() {
            this.timeValue = [];
            this.QueryClose(this.model);
            this.$emit('change');
            this.$emit('flash');
        },
        QueryClose(form) {
            for (const key in form) {
                if (form[key] instanceof Array) {
                    form[key] = [];
                } else {
                    form[key] = '';
                }
            }
        },
        /* 处理回车事件 */
        onKeyDownchange(e) {
            if (e.keyCode == 13) {
                this.handleChange();
            }
        }
    },
}
