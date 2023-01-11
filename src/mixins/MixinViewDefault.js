export default {
    data() {
        return {}
    },
    computed: {},
    methods: {

        getCreateCollectUrl(form) {

            const baseUrl = `${webgca.clientUrl}/rh/formularios/coleta/#`;

            const formEssentials = {
                descricao: encodeURIComponent(form.descricao),
                id: form.id,
                slug: form.slug,
                titulo: encodeURIComponent(form.titulo),
            };

            const redirectUrl = `/coletas/criar`;

            const formEncoded = btoa(JSON.stringify(formEssentials));

            return `${baseUrl}${redirectUrl}?form=${formEncoded}`;

        },

        getScaleDescriptionById(id, scales) {

            let ret = id;

            const scaleItem = scales.filter(
                item => {
                    return item.id === id;
                }
            );

            if (scaleItem.length > 0) {
                ret = scaleItem[0].descricao;
            }

            return ret;

        },

    }, //methods
    watch: {}, //watch
    beforeRouteEnter(to, from, next) {
        next(
            vm => {}
        );
    }, //beforeRouteEnter
    beforeRouteUpdate(to, from, next) {
        next();
    }, //beforeRouteUpdate
    beforeRouteLeave(to, from, next) {
        next();
    }, //beforeRouteLeave
    created() {}, //created
    mounted() {
        this.$root.axiosClassInstance.setVm(this);
    } //mounted
}