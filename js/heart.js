var xm = new Vue({
    el: "#app",
    data: {
        isbook: false,
        isplug: false,
        isshade: false,
        isanswer: false,
        isUser: false,
        isPage: true,
        plugList: [],
        bookList: [],
        tutorialList: [],
        musicList: [],
        list: [],
        musicSort: [], //音乐分类
        bookSort: [], //书籍分类
        tutorialSort: [], //教程分类
        description: '',
        create_at: '',
        name: '',
        data_url: '',
        picture: '',
        download_status: '',
    },
    methods: {
        gouser() { //跳转我的主页
            window.location.href = "user.html"
        },
        goname() { //个人信息
            this.isUser = !this.isUser
        },
        goAnswer() { //通知
            this.isanswer = !this.isanswer
        },
        bookChange(index) { //书籍分类
            var list = this.bookSort
            var book_id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/bookList`,
                async: true,
                data: {
                    page: 1,
                    book_id: book_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.bookList = res.data
                }
            })
        },
        turtorChange(index) { //教程分类
            var list = this.tutorialSort
            var tutorial_id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/tutorialList`,
                async: true,
                data: {
                    page: 1,
                    tutorial_id: tutorial_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList = res.data
                }
            })
        },
        Ychange() { //研判工具
            $.ajax({
                type: "post",
                url: `${api}/index/api/pluginList`,
                async: true,
                data: {
                    page: 1,
                    tool_id: 4
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList = res.data
                }
            })
        },
        Jchange() { //技战法
            $.ajax({
                type: "post",
                url: `${api}/index/api/pluginList`,
                async: true,
                data: {
                    page: 1,
                    tool_id: 5
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.tutorialList = res.data
                }
            })
        },
        openChange(index) {
            var list = this.plugList
            var tool_id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/toolDetail`,
                async: true,
                data: {
                    tool_id: tool_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.isshade = true
                    this.isbook = true
                    this.create_at = res.data.create_at
                    this.description = res.data.create_at
                    this.name = res.data.name
                    this.picture = res.data.picture
                    this.data_url = res.data.data_url
                    this.download_status = res.data.download_status
                }
            })
        },
        upDown(data_url) {
            console.log(data.url)
            // window.open(data_url)
            console.log(window.open(data_url))
        }
    },
    components: {
        "cp-banner": indexBanner,
    },
    created() {
        $.ajax({
            type: "post",
            url: `${api}/index/api/toolCenter`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                console.log(res)
                this.plugList = res.data.plugin
                this.musicList = res.data.music.list
                this.musicSort = res.data.music.sort
                this.bookList = res.data.book.list
                // console.log(this.bookList.length)
                this.bookSort = res.data.book.sort
                this.tutorialList = res.data.tutorial.list
                this.tutorialSort = res.data.tutorial.sort
            }
        })
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },

})



$(function () {
    $(".nav_uu li").each(function (index) {
        $(this).click(function () {
            $("li.blue").removeClass("blue");
            $(this).addClass("blue");
        });
    })
});




$('.nav_uu').on('click', 'li', function (e) {
    var target = e.target;
    var id = $(target).data("to");
    $('html,body').animate({
        scrollTop: $('#' + id).offset().top
    }, 800);
});