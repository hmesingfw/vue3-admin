
import Table from './table/index.vue'
import QueryForm from './query-form/index.js'
import Drawer from './drawer/index.vue'
import ImageMatting from './image-matting'

export default (app) => {
    app.component('HTable', Table);
    app.component('HQueryForm', QueryForm);
    app.component('HDrawer', Drawer);
    app.component('HImageMatting', ImageMatting);
}
