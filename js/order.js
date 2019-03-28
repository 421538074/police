var xm = new Vue({
    el: "#app",
    data: {
        isstar: true,
        list: [{},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
        ]
    },
    methods: {
        onli() {
            this.isstar = !this.isstar
        }
    },
    created() {

    }
})