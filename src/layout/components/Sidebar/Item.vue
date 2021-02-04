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
    render() {
        return <>
            <svg-icon icon-class={this.icon} />
            <span slot='title'>{this.title}</span>
        </>
    },
}
</script>
