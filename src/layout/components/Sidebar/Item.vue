<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        console.log(props);
        return <>
            <svg-icon icon-class={props.icon} />
            <span slot='title'>{props.title}</span>
        </>
    }
}
</script>
