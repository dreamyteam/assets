import Tab from '../components/tab.js'
import Popup from '../components/pop_up.js'
import Validate from '../components/validate.js'

export default class Sign {
    constructor(cfg) {
        this.cfg = cfg;
        this.tab = null;
        this.popup = null;
        this.canSubmit = null;
        this.countdown = null;
        this.init();
    }
    init() {
        let self = this;
        this.el = $(this.cfg.el);
        this.tab = new Tab({
            el: this.el,
            tabNav: ".nav",
            tabContents: ".sign_content",
            onTabGo: function() { //控制返回按钮逻辑
                let btnBack = this.el.find(".btn_back");
                let nav = this.el.find(".nav");
                let curIndex = this.curIndex;
                if (curIndex == 2 || curIndex == 3) {
                    btnBack.show();
                    nav.hide();
                } else {
                    btnBack.hide();
                    nav.show();
                }
                btnBack.on("click", function() {
                    if (curIndex == 2) {
                        self.tab.switchTabNav(0, true);
                    } else if (curIndex == 3) {
                        self.tab.switchTabNav(2, true);
                    }
                })
            }
        })
        this.pupUp = new Popup({ el: this.el });
        this.bindApplicationLayer();
        this.feLogInValidate();
        this.feCheckCodeValidate();
        this.feRegValidate();
    }
    bindApplicationLayer() {
        let self = this;
        $("#popup_sign .forgot_pwd").on("click", function() {
            self.tab.switchTabNav(2, true);
        });
        $("#popup_sign .go_find_pwd").on("click", function() {
            self.tab.switchTabNav(3, true);
        });
        $("#register").on('click', function() {
            self.pupUp.alert();
            self.tab.switchTabNav(1, false);
        });
        $("#login").on('click', function() {
            self.pupUp.alert();
            self.tab.switchTabNav(0, false);
        });
        if ($("#regBottom").length > 0) {
            $("#regBottom").on('click', function() {
                self.pupUp.alert();
                self.tab.switchTabNav(1, false);
            });
        }
    }
    feLogInValidate() { //前端登录验证
        let self = this;
        let el = this.el.find(".nav_login");
        let felogIn = new Validate({
            el: el,
            inputBoxs: ".input_content",
            btnSubmit: "button.submit",
            callBack: function() {
                self.serverLogInValidate(el)
            }
        })
    }
    serverLogInValidate(el) { //后端登录
        let self = this;
        let phone = el.find("input[name='phone_number']").val();
        let pwd = el.find("input[name='password']").val();
        let inputRpwd = el.find("input[name='remember_pwd']");
        let rememberPwd;
        if (inputRpwd.is(":checked")) {
            rememberPwd = 1;
        } else {
            rememberPwd = 0;
        }
        let errMsg = el.find(".err_from_server .err_msg");
        $.ajax({
            url: '/user/login',
            type: 'POST',
            data: {
                mobile: phone,
                password: pwd,
                rememberPwd: rememberPwd
            },
            success: function(result) {
                if (result.error_code == 0) {
                    location.reload();
                } else if (result.error_code > 0) {
                    self.showErr(errMsg, result.error_msg);
                }
            }
        })
    }
    feCheckCodeValidate() { //验证码检验器
        let self = this;
        let el = this.el.find(".nav_reg .verify_container");
        let feCheckCode = new Validate({
            el: el,
            inputBoxs: ".input_content",
            btnSubmit: ".get_verify_code",
            callBack: function() {
                self.sendVerifyCode(el);
            }
        })
    }
    feRegValidate() { //注册前端总检验器
        let self = this;
        let el = this.el.find(".nav_reg");
        let feReg = new Validate({
            el: el,
            inputBoxs: ".input_content",
            btnSubmit: "button.submit",
            callBack: function() {
                self.serverRegValidate(el);
            }
        })
    }
    serverRegValidate(el) {
        let self = this;
        let userName = el.find("input[name='userName']").val();
        let phone = el.find("input[name='phone_number']").val();
        let pwd = el.find("input[name='password']").val();
        let checkCode = el.find("input[name='verify_code']").val();
        let errMsg = el.find(".err_from_server .err_msg");
        $.ajax({
            url: '/user/register',
            type: 'POST',
            data: {
                // userName: userName,
                mobile: phone,
                password: pwd,
                checkCode: checkCode,
            },
            success: function(result) {
                console.log(result);
                if (result.error_code == 0) {
                    location.reload();
                } else if (result.error_code > 0) {
                    self.showErr(errMsg, result.error_msg);
                }
            }
        })
    }
    sendVerifyCode(el) { //发送验证码模块
        let self = this;
        let phone = el.find("input[name='phone_number']").val();
        let btn = el.find(".get_verify_code");
        let errMsg = el.find(".get_verify_code_content .err_msg");
        $.ajax({
            url: '/user/register/verificationCode',
            type: 'POST',
            data: {
                mobile: phone,
            },
            success: function(result) {
                console.log(result);
                if (result.error_code == 0) {
                    self.countdown = 60;
                    self.settime(btn);
                } else if (result.error_code > 0) {
                    self.showErr(errMsg, result.error_msg);
                }
            }
        }); //后端发送验证码
    }
    settime(obj) { //验证码倒数计时
        let self = this;
        if (this.countdown == 0) {
            obj.removeAttr("disabled");
            obj.removeClass("disable");
            obj.html("重新发送");
            this.countdown = 60;
            return;
        } else {
            obj.attr("disabled", "disabled");
            obj.addClass("disable");
            obj.html("重新发送" + this.countdown + 's');
            this.countdown--;
        }
        setTimeout(function() {
            self.settime(obj)
        }, 1000)
    }
    showErr(errMsg, msg) {
        errMsg.show().html(msg);
        setTimeout(function() {
            errMsg.addClass("active");
        }, 100);
    }
}
