var xm = new Vue({
    el: "#app",
    data: {
        isrole: true, //选择登录角色
        ispolice: false, //警员登录
        ismatron: false, //管理登录
        isorder: false, //接单员登录
        Oname: '',
        Opsw: '',
        ip: '',
        Pname: '',
        Ppsw: '',
    },
    methods: {
        goBack: function () {
            this.ispolice = false
            this.ismatron = false
            this.isorder = false
            this.isrole = true
        },
        goOrder: function () {
            this.isrole = false
            this.isorder = true
        },
        goPolice: function () {
            this.isrole = false
            this.ispolice = true
            var ip = returnCitySN["cip"]
            this.ip =ip
        },
        goMatron: function () {
            this.isrole = false
            this.ismatron = true
        },
        orderEnter: function () { //接单员登录
            $.ajax({
                type: "post",
                url: `${api}/index/api/receiverLogin`,
                async: true,
                data: {
                    name: this.Oname,
                    password: this.Opsw
                },
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                }
            })
        },
        policeEnter: function () { //警员登录
            $.ajax({
                type: "post",
                url: `${api}/index/api/policeLogin`,
                async: true,
                data: {
                    ip: ip,
                    name: this.Pname,
                    password: this.Ppsw
                },
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                }
            })
        }
    },
    created() {

    }
})