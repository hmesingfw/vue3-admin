
import GenerateForm from '@/components/generate/form.js';
import GenerateTable from '@/components/generate/table.js';

// import GenerateLabel from '@/components/Generate/label';
import GenerateHandle from '@/components/generate/handle';

export default (app) => {
    app.component('GForm', GenerateForm);
    app.component('GTable', GenerateTable);
    // app.component('GenerateLabel', GenerateLabel);
    app.component('GHandle', GenerateHandle);
}
