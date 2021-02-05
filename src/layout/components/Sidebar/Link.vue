
<script>
import { isExternal } from '@/utils/validate'

export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    render() {
        if (isExternal(this.to)) {
            return <a href={this.to} target='_blank' rel='noopener'> {this.$slots.default()}     </a>
        } else {
            return <router-link to={this.to}> {this.$slots.default()} </router-link>
        }
    },
}
</script>
