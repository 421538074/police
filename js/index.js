var xm = new Vue({
    el: "#app",
    data: {
        show: false,
        isshade: false,
        isent: -1, //查看文章
        isnum: false, //通知显示数字
        ismore: false, //更多
        isforum: false, //论坛
        isCase: false, //报备
        isCreat: false, //创建
        isChatting: false, //编辑
        isCroom: false, //聊天室   
        iscommonly: false, //常用聊天室
        isauditing: false, //审核中
        isall: false, //全部报备
        iscomment: false, //评论
        isreply: false, //回复
        isspeak: false, //查看回复
        ispass: false, //修改密码
        isshow: false, //报备TAG
        isNone: false, //未搜索到
        ForumCate: [], //论坛分类
        titleList: [{}, {}], //论坛列表
        allList: [], //报备列表
        infoList: [{}], //论坛关键词
        list: [],
        chatList: [], //聊天列表
        roomList: [{}],
        comlist: [{}, {}], //评论列表
        seelist: [], //查看回复
        roomList: [], //聊天类型分类
        repairSorts: [], //保修类型
        allRoom: [], //所有聊天室
        current: 0,
        changeRed: -1,
        currentActive: -1,
        oneIndex: -1,
        currentIndex: 0,
        commentActive: -1,
        Ptitle: '', //论坛标题
        Pcontent: '', //论坛内容
        Pcomment: '', //评论内容
        keyWords: '', //搜索关键词
        Troom: '', //聊天室标题
        Ctitle: '', //常用聊天室标题
        Ctopic_name: '', //常用聊天室标题
        roomName: '', //修改聊天室名称,
        replyComment:'',//回复评论的内容,
        currentComment:{}//当前查看的评论

    },
    methods: {
        goClose() { //关闭遮罩
            this.isshade = false
            this.isforum = false
            this.isCase = false
            this.isCreat = false
            this.isCroom = false
            this.iscommonly = false
            this.isall = false
            this.isshade = false
            this.isChatting = false
            this.isspeak = false
            $("body").removeClass("bod")

        },
        gouser() { //跳转我的主页
            window.location.href = "user.html"
        },
        readChange(item, index, e) { //产看文章
            console.log(index)
            if (item.entable) {
                Vue.set(item, 'entable',
                    false);
            } else {
                Vue.set(item, 'entable', true);
            }

        },
        comChange(index) { //查看评论
            this.commentActive = this.commentActive == index ? -1 : index
        },
        goname() { //个人信息
            $(".header_two").slideToggle("400");
        },
        goAnswer() { //通知
            $(".answer").slideToggle("400");
        },
        gospeak(post_id,comment_id,index) { //回复
            this.currentActive = this.currentActive == index ? -1 : index;
            this.post_id = post_id;
            this.comment_id = comment_id;
            
        },
        gospeak1(index) { //查看回复  回复
            this.oneIndex = this.oneIndex == index ? -1 : index
        },
        goPass() { //修改密码
            this.isshade = true
            this.ispass = true
        },
        writeReply() { //写论坛
            this.isshade = true
            this.isforum = true
            $("body").addClass("bod")
            // $.ajax({
            //     type: "post",
            //     url: `${api}/index/api/infoList`,
            //     async: true,
            //     data: {},
            //     dataType: 'json',
            //     success: (res) => {
            //         console.log(res);
            //         this.infoList = res.data;
            //     }
            // })
        },
        reportChange() { //打开报备
            this.isshade = true
            this.isCase = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/repairSorts`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    this.repairSorts = res.data;
                }
            })
        },
        reChange() { //报备
            var userContent = $(".wishContent").val();
            $.ajax({
                type: "post",
                url: `${api}/index/api/publishRepair`,
                async: true,
                data: {
                    repair_sort: 1,
                    content: userContent
                },
                dataType: 'json',
                success: (res) => {
                    this.roomList = res.data;
                }
            })
        },
        allChange() { //所有报备
            this.isshade = true
            this.isall = true
        },
        creatChange() { //打开创建聊天室
            this.isshade = true
            this.isCreat = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/chatroomSort`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    this.roomList = res.data;
                }
            })
        },
        creatRoom() { //创建聊天室
            var myselect = document.getElementById("myselect");
            var index = myselect.selectedIndex;
            var list = this.roomList
            var id = list[index].id
            $.ajax({
                type: "post",
                url: `${api}/index/api/createChatroom`,
                async: true,
                data: {
                    topic_id: id,
                    title: this.Troom
                },
                dataType: 'json',
                success: (res) => {
                    this.isCreat = false
                    this.isshade = false
                }
            })
        },
        goInchange(index) { //进入聊天室
            var list = this.chatList
            var id = list[index].id
            sessionStorage.setItem('userInfo', id);
            $.ajax({
                type: "post",
                url: `${api}/index/api/joinChatroom`,
                async: true,
                data: {
                    chatroom_id: id
                },
                dataType: 'json',
                success: (res) => {}
            })
            // 聊天室详情
            $.ajax({
                type: "post",
                url: `${api}/index/api/chatroomDetail`,
                async: true,
                data: {
                    chatroom_id: id
                },
                dataType: 'json',
                success: (res) => {
                    this.isshade = true
                    this.iscommonly = true
                    this.Ctitle = res.data.chat.title
                    this.Ctopic_name = res.data.chat.topic_name
                    this.user = res.data.user.nickname
                }
            })
        },
        JoinChange(index) {
            var list = this.roomList
            var id = list[index].id
            sessionStorage.setItem('userInfo', id);
            $.ajax({
                type: "post",
                url: `${api}/index/api/joinChatroom`,
                async: true,
                data: {
                    chatroom_id: id
                },
                dataType: 'json',
                success: (res) => {
                    this.isshade = true
                    this.iscommonly = true
                }
            })
            // 聊天室详情
            $.ajax({
                type: "post",
                url: `${api}/index/api/chatroomDetail`,
                async: true,
                data: {
                    chatroom_id: id
                },
                dataType: 'json',
                success: (res) => {
                    this.Ctitle = res.data.chat.title
                    this.Ctopic_name = res.data.chat.topic_name
                    this.user = res.data.user.nickname
                }
            })
        },
        allChat() { //所有聊天室
            this.isshade = true
            this.isCroom = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/chatroomLists`,
                async: true,
                data: {
                    topic_id: 1
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.allRoom = res.data.sort
                    this.roomList = res.data.list
                }
            })
        },
        goRoom(index) { //聊天室分类
            this.current = index;
            var list = this.allRoom
            var topic_id = list[index].id

            $.ajax({
                type: "post",
                url: `${api}/index/api/chatroomLists`,
                async: true,
                data: {
                    topic_id: topic_id
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res)
                    this.roomList = res.data.list
                }
            })
        },
        lookchange(post_id,comment_id) { //查看回复
            this.currentComment = this.titleList.filter((posts) => {
                return posts.id == post_id
            })[0].comment_list.filter((comments) => {
                return comments.id == comment_id;
            })[0];
            this.isshade = true
            this.isspeak = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/comments`,
                async: true,
                data: {
                    post_id: post_id,
                    comment_id: comment_id,
                },
                dataType: 'json',
                success: (res) => {
                    console.log(res);
                    this.seelist = res.data;
                }
            })
        },
        editChange() { //编辑聊天
            this.iscommonly = false
            this.isChatting = true
            $.ajax({
                type: "post",
                url: `${api}/index/api/chatroomSort`,
                async: true,
                data: {},
                dataType: 'json',
                success: (res) => {
                    this.roomList = res.data;
                }
            })
        },
        confirm() { //确认修改
            var myselect = document.getElementById("myselect");
            var index = myselect.selectedIndex;
            var list = this.roomList
            var id = list[index].id
            var chatId = sessionStorage.getItem('userInfo', id);
            $.ajax({
                type: "post",
                url: `${api}/index/api/editChatroom`,
                data: {
                    topic_id: id,
                    title: this.roomName,
                    chat_id: chatId
                },
                dataType: 'json',
                success: (res) => {
                    this.isChatting = false
                    this.isshade = false
                }
            })
        },
        btnChange(index) { //写论坛 点击添加颜色
            this.changeRed = index;
        },
        tagChange() { //我的报备
            this.isshow = !this.isshow
            if (this.isshow) {
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/myRepair`,
                    data: {},
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        this.allList = res.data
                    }
                })
            } else {
                $.ajax({
                    type: "post",
                    url: `${api}/index/api/repairList`,
                    data: {},
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        this.allList = res.data
                    }
                })
            }
        },
        bannerChange(index) { // 获取论坛分类
            if (index != this.currentIndex) {
                this.currentIndex = index;
            }
            var list = this.ForumCate
            var id = list[index].id
            console.log(id)
            $.ajax({
                type: "post",
                url: `${api}/index/api/getForumList`,
                data: {
                    cate_id: id
                },
                dataType: 'json',
                success: (res) => {
                    this.titleList =res.result
                }
            })
        },
        pulishChange() { //发布论坛
            $.ajax({
                type: "post",
                url: `${api}/index/api/publishPost`,
                data: {
                    info_id: 1,
                    title: this.Ptitle,
                    content: this.Ptitle
                },
                dataType: 'json',
                success: (res) => {
                    this.allList = res.data;
                    this.goClose();
                }
            })
        },
        commentChange(post_id,comment_id) { //发布评论
            if(comment_id) {
                if(this.replyComment.trim() == '') {
                    alert('请输入回复内容');
                    return false;
                }
                $.ajax({
                    url:`${api}/index/api/replayComment`,
                    type:'post',
                    dataType:'json',
                    data:{
                        post_id:post_id,
                        comment_id:comment_id,
                        content:this.replyComment
                    },
                    success:(res) => {
                        this.replyComment = '';
                        this.currentActive = -1;
                    },
                    error:(err) => {
    
                    }
                })
            }
            else {
                if (this.Pcomment !== "") {
                    $.ajax({
                        type: "post",
                        url: `${api}/index/api/publishComment`,
                        data: {
                            post_id: post_id,
                            content: this.Pcomment
                        },
                        dataType: 'json',
                        success: (res) => {
                            this.allList = res.data
                            this.Pcomment = ""
                            this.bannerChange(this.currentIndex);
                        }
                    })
                } else {
                    alert("请填写内容")
                }   
            }

        },
        searchChange() { //搜素
            $.ajax({
                type: "post",
                url: `${api}/index/api/postSearch`,
                data: {
                    keyWords: this.keyWords
                },
                dataType: 'json',
                success: (res) => {
                    this.titleList = res.data;
                    if (res.msg == "暂无数据！") {
                        this.isNone = true
                    } else {
                        this.isNone = false
                    }
                }
            })
        },
    },
    created() {
        // 获取论坛分类
        $.ajax({
            type: "post",
            url: `${api}/index/api/getForumCate`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.ForumCate = res.result;
                this.bannerChange(0);
            }
        });

        // 所有报备
        $.ajax({
            type: "post",
            url: `${api}/index/api/repairList`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.allList = res.data
            }
        })
        // 聊天
        $.ajax({
            type: "post",
            url: `${api}/index/api/chatroomList`,
            async: true,
            data: {},
            dataType: 'json',
            success: (res) => {
                this.chatList = res.data
            }
        })
    },
    filters: {
        filterTime(time) {
            var date = new Date(time * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
        }
    },
})






$(".icon-jiacu").click(function () {
    $("#Ftext").toggleClass("thick");
})

$(".icon-Italic").click(function () {
    $("#Ftext").toggleClass("skew");
})

$(".icon-Underline").click(function () {
    $("#Ftext").toggleClass("under");
})

$("#testSelect").click(function () {
    var id = $('#testSelect option:selected').val();
    if (id == 1) {
        $("#Ftext").css("font-size", "12px");
    } else if (id == 2) {
        $("#Ftext").css("font-size", "14px");
    } else if (id == 3) {
        $("#Ftext").css("font-size", "16px");
    } else if (id == 4) {
        $("#Ftext").css("font-size", "18px");
    } else if (id == 5) {
        $("#Ftext").css("font-size", "20px");
    }
})



$(".More").click(function () {
    xm.ismore = !xm.ismore
})

$(".More").siblings().click(function () {
    console.log(111)
    $(".banner_more").hide()
})


//封装一个限制字数方法
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}

//监听输入
$(".wishContent").on('input propertychange', function () {
    var userDesc = $(this).val();
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 60);
    } else {
        len = 0
    }
    $(".wordsNum").html('60字以内' + len + '/60');
});