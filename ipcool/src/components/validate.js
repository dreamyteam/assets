export default class Validate {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.inputBoxs = null; //input 容器 用于查找 input 和 errmsg
        this.btnSubmit = null;
        this.fnSubmit = null;
        this.callBack = null;
        this.init();
    }
    init() {
        this.el = $(this.cfg.el);
        this.inputBoxs = this.el.find(this.cfg.inputBoxs);
        this.btnSubmit = this.el.find(this.cfg.btnSubmit);
        this.callBack = this.cfg.callBack || null;
        this.errMsg = ".err_msg";
        if (this.el.length > 0) {
            this.validateBlur();
            this.checkSubmit();
        }
    }
    setErrMsg(errMsg, errText) {
        errMsg.show().html(errText);
        setTimeout(function() {
            errMsg.addClass("active");
        }, 100);
    }
    removeErrMsg(errMsg) {
        errMsg.removeClass("active").hide().html("");
    }
    checkRequired(obj, parent, canSubmit) {
        let self = this;
        let errMsg = parent.find(this.errMsg);
        if (obj.val() == '') {
            let errText = obj.data("required") ? obj.data("required") : "必填";
            self.setErrMsg(errMsg, errText);
            if (canSubmit) {
                self.canSubmit = false;
            }
        } else {
            self.removeErrMsg(errMsg);
            if (canSubmit) {
                self.canSubmit = true;
            }
        }
    }
    checkMail(obj, parent, canSubmit) {
        let self = this;
        let errMsg = parent.find(this.errMsg);
        let regMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regMail.test(obj.val())) {
            self.setErrMsg(errMsg, "请输入正确的邮箱格式");
            if (canSubmit) {
                self.canSubmit = false;
            }
        } else {
            self.removeErrMsg(errMsg);
            if (canSubmit) {
                self.canSubmit = true;
            }
        }
    }
    checkPhone(obj, parent, canSubmit) {
        let self = this;
        let errMsg = parent.find(this.errMsg);
        let regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;

        if (!regPhone.test(obj.val())) {
            self.setErrMsg(errMsg, "手机号码错误");
            if (canSubmit) {
                self.canSubmit = false;
            }
        } else {
            self.removeErrMsg(errMsg);
            if (canSubmit) {
                self.canSubmit = true;
            }
        }
    }
    checkIdCard(obj, parent, canSubmit) {
        let self = this;
        let errMsg = parent.find(this.errMsg);
        let regId = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;

        if (!regId.test(obj.val())) {
            self.setErrMsg(errMsg, "请输入正确的身份证号码格式");
            if (canSubmit) {
                self.canSubmit = false;
            }
        } else {
            self.removeErrMsg(errMsg);
            if (canSubmit) {
                self.canSubmit = true;
            }
        }
    }
    checkSelected(obj, parent, canSubmit) {
        let self = this;
        let errMsg = parent.find(this.errMsg);
        if (obj.val() == 0) {
            let errText = obj.data("required") ? obj.data("required") : "您需要选择类型";
            self.setErrMsg(errMsg, errText);
            if (canSubmit) {
                self.canSubmit = false;
            }
        } else {
            self.removeErrMsg(errMsg);
            if (canSubmit) {
                self.canSubmit = true;
            }
        }
    }
    checkPwd(obj, parent, canSubmit) {
        let self = this;
        let errMsg = parent.find(this.errMsg);
        var regPwd = /^[a-zA-Z\d]{6,16}$/;
        if (!regPwd.test(obj.val())) {
            self.setErrMsg(errMsg, "密码必须为6-16位字母或数字");
            if (canSubmit) {
                self.canSubmit = false;
            }
        } else {
            self.removeErrMsg(errMsg);
            if (canSubmit) {
                self.canSubmit = true;
            }
        }
    }
    checkCurrentPwd(obj, parent, canSubmit) {
        let self = this;
    }
    checkNewPwd(obj, newPwd, parent, canSubmit) {
        let self = this;
        let errMsg = parent.find(this.errMsg);
        if (obj.val() != newPwd) {
            self.setErrMsg(errMsg, "两次输入密码不一致");
            if (canSubmit) {
                self.canSubmit = false;
            }
        } else {
            self.removeErrMsg(errMsg);
            if (canSubmit) {
                self.canSubmit = true;
            }
        }
    }
    validateBlur() {
        let self = this;
        this.inputBoxs.each(function() {
            let curBox = $(this);
            let curInput = $(this).find("input");
            let errMsg = curBox.find(self.errMsg);
            curInput.on("blur", function() {
                if (curInput.attr("required")) { //检测是否为空
                    self.checkRequired(curInput, curBox, false);
                }
                if (curInput.attr("type") == "email") {
                    self.checkMail(curInput, curBox, false);
                }
                if (curInput.hasClass("input_phone")) {
                    self.checkPhone(curInput, curBox, false);
                }
                if (curInput.hasClass("input_id_card")) {
                    self.checkIdCard(curInput, curBox, false);
                }
                if (curInput.attr("type") == "password") { //验证密码
                    self.checkPwd(curInput, curBox, false);
                    if (curInput.attr("name") == "currentPassword") {
                        self.checkCurrentPwd(curInput, curBox, false)
                    }
                    if (curInput.attr("name") == "newPasswordConfirm") {
                        let newPwd = self.inputBoxs.find("input[name=newPassword]").val();
                        self.checkNewPwd(curInput, newPwd, curBox, true)
                    }
                }
            });
            curInput.on("focus", function() {
                self.removeErrMsg(errMsg);
            });
            // select框
            let curSelect = $(this).find("select");
            curSelect.on("blur", function() {
                if (curSelect.attr("required")) {
                    self.checkSelected(curSelect, curBox, true);
                }
            });
            curSelect.on("focus", function() {
                self.removeErrMsg(errMsg);
            })
        })
    }
    validateSubmit() {
        let self = this;
        this.inputBoxs.each(function() {
            let curBox = $(this);
            let curInput = $(this).find("input");
            if (curInput.attr("required")) { //检测是否为空
                self.checkRequired(curInput, curBox, true);
            }
            if (curInput.attr("type") == "email") {
                self.checkMail(curInput, curBox, true);
            }
            if (curInput.hasClass("input_phone")) {
                self.checkPhone(curInput, curBox, true);
            }
            if (curInput.hasClass("input_id_card")) {
                self.checkIdCard(curInput, curBox, true);
            }
            if (curInput.attr("type") == "password") { //验证密码
                self.checkPwd(curInput, curBox, true);
                if (curInput.attr("name") == "currentPassword") {
                    self.checkCurrentPwd(curInput, curBox, true)
                }
                if (curInput.attr("name") == "newPasswordConfirm") {
                    let newPwd = self.inputBoxs.find("input[name=newPassword]").val();
                    self.checkNewPwd(curInput, newPwd, curBox, true)
                }
            }
            let curSelect = $(this).find("select");
            if (curSelect.attr("required")) {
                self.checkSelected(curSelect, curBox, true);
            }
        })
    }
    checkSubmit() {
        let self = this;
        this.btnSubmit.off("click");
        this.btnSubmit.on("click", function() {
            self.validateSubmit();
            if (!self.canSubmit || $(this).attr("disabled") == "disabled") {
                return false;
                // self.callBack();
            } else {
                if (self.callBack) {
                    self.callBack();
                }
            }
        })
    }
}
