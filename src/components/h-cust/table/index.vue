<template>
    <div :ref="ref" class="h-table">
        <el-row class="h-table-handle" type="flex" justify="space-between">
            <div>
                <el-button type="primary" icon="el-icon-plus">新增</el-button>
            </div>
            <div class="right-handle">
                <el-dropdown trigger="click" @command="changeCommand">
                    <el-tooltip effect="dark" content="密度" placement="top">
                        <i class="el-icon-finished h-icon" />
                    </el-tooltip>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item :disabled="tableSize == ''" command>默认</el-dropdown-item>
                            <el-dropdown-item v-if="elementSize != 'medium'" :disabled="tableSize == 'medium'" command="medium">宽松</el-dropdown-item>
                            <el-dropdown-item v-if="elementSize != 'small'" :disabled="tableSize == 'small'" command="small">中等</el-dropdown-item>
                            <el-dropdown-item v-if="elementSize != 'mini'" :disabled="tableSize == 'mini'" command="mini">紧凑</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-tooltip effect="dark" content="刷新" placement="top">
                    <i class="el-icon-refresh h-icon" @click="tableReflash(1000)" />
                </el-tooltip>
                <!-- <el-tooltip effect="dark" content="列设置" placement="top">
                            <i class="el-icon-setting h-icon" />
                </el-tooltip>-->
                <el-popover placement="bottom" :width="240" trigger="click" popper-class="h-table-col-settings">
                    <el-row type="flex" justify="space-between" align="middle" class="h-table-col-settings__header">
                        <div>
                            <el-checkbox v-model="settingCheckAll" :indeterminate="isIndeterminate" @change="changeColSettingAll">列展示</el-checkbox>
                        </div>
                        <el-button type="text">重置</el-button>
                    </el-row>
                    <el-row class="h-table-col-settings__group">
                        <draggable v-model="colSettings" draggable=".drag" animation="300" @end="handleSettingsCol()">
                            <div v-for="(item, i) in colSettings" :key="i" class="item" :class="{'drag':item.prop != 'selection'}">
                                <i :class="item.prop == 'selection' ? 'el-icon-menu' : 'el-icon-rank'" />
                                <el-checkbox v-model="item.status" @change="handleSettingsCol">{{ item.label }}</el-checkbox>
                            </div>
                        </draggable>
                    </el-row>

                    <template #reference>
                        <i class="el-icon-setting h-icon" />
                    </template>
                </el-popover>
            </div>
        </el-row>
        <h-main v-if="tableStatus" ref="hCustTableRef" v-model:selection="selection" v-loading="tableLoading" :data="tableData" :table-attrs="setupTableAttrs" :params="colSettings" />
        <div class="h-page">
            <el-pagination
                :current-page="pageData.page"
                :page-sizes="page.sizes"
                :page-size="pageData.size"
                :layout="page.layout"
                :total="pageData.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick } from 'vue'
import http from '@/config/axios-config'
import hMain from './main'
import { VueDraggableNext } from 'vue-draggable-next'
import { ElMessage } from 'element-plus'
import { size } from '@/plugins/element'
export default {
    components: {
        hMain, draggable: VueDraggableNext,
    },
    props: {
        // 请求地址
        url: { type: String },
        ref: { type: String, default: 'hCustRef' },
        // 数据来源
        params: Array,
        // 表格自定义扩展参数
        tableAttrs: { type: Object, default: () => { } },
        // 多选的值
        selection: { type: Array, default: () => [] },
        page: {
            type: Object, default: () => ({
                size: 10,
                sizes: [10, 20, 30, 50],
                layout: 'total, sizes, prev, pager, next, jumper'
            })
        }
    },
    data() {
        return {
            elementSize: size,
        }
    },
    setup(props, { attrs, slots, emit }) {
        const tableLoading = ref(false);
        const tableStatus = ref(true); // 表格if
        const tableData = ref([]); // 列表数据
        const tableSize = ref(''); // 列表大小
        const pageData = reactive({ total: 0, page: 1, size: 10 }); // 分页参数
        const colSettings = ref([]); // 列的设置参数
        const isIndeterminate = ref(false); // 列的设置参数,  用以表示 checkbox 的不确定状态，一般用于实现全选的效果
        const settingCheckAll = ref(true); // 列的设置参数, 多选状态
        /* 处理对象，加载初始化值 */
        const setupTableAttrs = reactive({
            'stripe': true, //  带斑马纹表格
            'header-row-class-name': 'h-table-header-name',
            'row-class-name': 'table-row-name',
            size: tableSize.value,
            ...props.tableAttrs,
        })
        onMounted(() => {
            query();
            initSettingsCol();
        })
        /* 查询列表
        * parentParams 父组件查询传参
        */
        async function query(parentParams = {}) {
            /* 传页码赋值 */
            if (parentParams.page) pageData.page = parentParams.page;
            if (parentParams.size) pageData.size = parentParams.size;
            /* 查询参数 */
            const params = {
                page: pageData.page,
                size: pageData.size,
                ...parentParams,
            }
            tableLoading.value = true;
            try {
                const res = await http.get(props.url, { params: params });
                if (res.code == 200) {
                    const data = res.data;
                    tableData.value = data.list;
                    pageData.total = data.total;
                } else {
                    ElMessage.info(res.message)
                }
                tableLoading.value = false;
            } catch (err) {
                console.log(err);
                tableLoading.value = false;
            }
        }

        /* 操作分页 */
        function handleSizeChange(val) {
            pageData.size = val;
            query();
        }
        function handleCurrentChange(val) {
            pageData.page = val;
            query();
        }
        /* 改变表格的大小 */
        function changeCommand(command) {
            setupTableAttrs.size = command;
            tableSize.value = command;
            tableReflash();
        }
        /* 重新刷新table
        *  time  列表刷新时间  number 毫秒
        */
        async function tableReflash(time = 0) {
            tableLoading.value = true;
            tableStatus.value = false;
            await nextTick();
            tableStatus.value = true;
            if (time > 0) {
                setTimeout(() => { tableLoading.value = false; }, time)
            } else {
                tableLoading.value = false;
            }
        }
        /* 初始化设置列设置参数 */
        function initSettingsCol() {
            try {
                const localSettings = localStorage.getItem('col-settings-' + props.ref);
                if (localSettings) {
                    const array = JSON.parse(localSettings);
                    const retArray = array.map(item => {
                        const data = props.params.filter(p => p.prop == item.prop);
                        return {
                            ...data[0],
                            status: item.status,
                        }
                    })
                    colSettings.value = retArray;
                    return;
                }
            } catch (error) {
                console.log(error);
            }
            colSettings.value = props.params.map(item => {
                return {
                    ...item,
                    status: true,
                }
            });
        }

        /* 设置列参数方法 */
        function handleSettingsCol(status) {
            isIndeterminate.value = colSettings.value.some(item => item.status !== status); // indeterminate 属性用以表示 checkbox 的不确定状态
            settingCheckAll.value = colSettings.value.every(item => item.status === true);

            try {
                const str = JSON.stringify(colSettings.value)
                localStorage.setItem('col-settings-' + props.ref, str)
            } catch (error) {
                console.log(error);
            }

            tableReflash(500);
        }
        /* 列设置，全选操作 */
        function changeColSettingAll(status) {
            isIndeterminate.value = false;
            colSettings.value = props.params.map(item => {
                return {
                    ...item,
                    status: status,
                }
            });
            tableReflash(500);
        }

        /* 获取分页信息 */
        emit('get-page', pageData);
        return {
            query,
            tableLoading,
            tableStatus,
            tableData,
            setupTableAttrs,
            pageData,
            handleSizeChange,
            handleCurrentChange,
            tableSize,
            changeCommand,
            tableReflash,
            colSettings, handleSettingsCol,
            isIndeterminate, settingCheckAll, changeColSettingAll
        }
    },
    methods: {
        // 获取table ref 对象
        getTableRef() {
            return this.$refs.hCustTableRef.getTableRef();
        }
    },
}
</script>
