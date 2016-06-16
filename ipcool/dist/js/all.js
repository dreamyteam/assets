/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _LonginReg = __webpack_require__(1);

	var _LonginReg2 = _interopRequireDefault(_LonginReg);

	var _pop_up = __webpack_require__(3);

	var _pop_up2 = _interopRequireDefault(_pop_up);

	var _back_top = __webpack_require__(5);

	var _back_top2 = _interopRequireDefault(_back_top);

	var _hover_delay = __webpack_require__(6);

	var _hover_delay2 = _interopRequireDefault(_hover_delay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
	    var userMenu = new _hover_delay2.default({
	        el: "#currentUserTrigger",
	        target: "#user_menu"
	    });
	    new _back_top2.default(); //返回顶部
	    var sign = new _LonginReg2.default({ el: "#popup_sign" });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _tab = __webpack_require__(2);

	var _tab2 = _interopRequireDefault(_tab);

	var _pop_up = __webpack_require__(3);

	var _pop_up2 = _interopRequireDefault(_pop_up);

	var _validate = __webpack_require__(4);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sign = function () {
	    function Sign(cfg) {
	        _classCallCheck(this, Sign);

	        this.cfg = cfg;
	        this.tab = null;
	        this.popup = null;
	        this.canSubmit = null;
	        this.countdown = null;
	        this.userId = null;
	        this.init();
	    }

	    _createClass(Sign, [{
	        key: 'init',
	        value: function init() {
	            var self = this;
	            this.el = $(this.cfg.el);
	            this.tab = new _tab2.default({
	                el: this.el,
	                tabNav: ".nav",
	                tabContents: ".sign_content",
	                onTabGo: function onTabGo() {
	                    //控制返回按钮，注册登录是否显示逻辑
	                    var btnBack = this.el.find(".btn_back");
	                    var nav = this.el.find(".nav");
	                    var curIndex = this.curIndex;
	                    if (curIndex == 2 || curIndex == 3) {
	                        btnBack.show();
	                        nav.hide();
	                    } else {
	                        btnBack.hide();
	                        nav.show();
	                    }
	                    btnBack.on("click", function () {
	                        if (curIndex == 2) {
	                            self.tab.switchTabNav(0, true);
	                        } else if (curIndex == 3) {
	                            self.tab.switchTabNav(2, true);
	                        }
	                    });
	                }
	            });
	            this.pupUp = new _pop_up2.default({ el: this.el });
	            this.bindApplicationLayer();
	            this.feLogInValidate(); //登录
	            this.feRegVCValidate(); //注册发送验证码
	            this.feRegValidate(); //注册
	            this.feFindPwdVCValidate(); // 找回密码发送验证码
	            this.feFindPwdValidate(); //验证找回密码验证码
	            this.feResetPwd();
	        }
	    }, {
	        key: 'bindApplicationLayer',
	        value: function bindApplicationLayer() {
	            var self = this;
	            $("#popup_sign .forgot_pwd").on("click", function () {
	                self.tab.switchTabNav(2, true);
	            });
	            $("#register").on('click', function () {
	                self.pupUp.alert();
	                self.tab.switchTabNav(1, false);
	            });
	            $("#login").on('click', function () {
	                self.pupUp.alert();
	                self.tab.switchTabNav(0, false);
	            });
	            if ($("#regBottom").length > 0) {
	                $("#regBottom").on('click', function () {
	                    self.pupUp.alert();
	                    self.tab.switchTabNav(1, false);
	                });
	            }
	        }
	    }, {
	        key: 'feLogInValidate',
	        value: function feLogInValidate() {
	            //前端登录验证
	            var self = this;
	            var el = this.el.find(".nav_login");
	            var felogIn = new _validate2.default({
	                el: el,
	                inputBoxs: ".input_content",
	                btnSubmit: "button.submit",
	                callBack: function callBack() {
	                    self.serverLogInValidate(el);
	                }
	            });
	        }
	    }, {
	        key: 'serverLogInValidate',
	        value: function serverLogInValidate(el) {
	            //后端登录
	            var self = this;
	            var phone = el.find("input[name='phone_number']").val();
	            var pwd = el.find("input[name='password']").val();
	            var inputRpwd = el.find("input[name='remember_pwd']");
	            var rememberPwd = void 0;
	            if (inputRpwd.is(":checked")) {
	                rememberPwd = 1;
	            } else {
	                rememberPwd = 0;
	            }
	            var errMsg = el.find(".err_from_server .err_msg");
	            $.ajax({
	                url: '/user/login',
	                type: 'POST',
	                data: {
	                    mobile: phone,
	                    password: pwd,
	                    rememberPwd: rememberPwd
	                },
	                success: function success(result) {
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.showErr(errMsg, result.error_msg);
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'feRegVCValidate',
	        value: function feRegVCValidate() {
	            //注册验证码验证器
	            var self = this;
	            var el = this.el.find(".nav_reg .verify_container");
	            var feCheckCode = new _validate2.default({
	                el: el,
	                inputBoxs: ".input_content",
	                btnSubmit: ".get_verify_code",
	                callBack: function callBack() {
	                    self.sendVerifyCode(el);
	                }
	            });
	        }
	    }, {
	        key: 'feRegValidate',
	        value: function feRegValidate() {
	            //注册前端总检验器
	            var self = this;
	            var el = this.el.find(".nav_reg");
	            var feReg = new _validate2.default({
	                el: el,
	                inputBoxs: ".input_content",
	                btnSubmit: "button.submit",
	                callBack: function callBack() {
	                    self.checkValidateCode(el, function () {
	                        self.serverRegValidate(el);
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'serverRegValidate',
	        value: function serverRegValidate(el) {
	            var self = this;
	            var userName = el.find("input[name='userName']").val();
	            var phone = el.find("input[name='phone_number']").val();
	            var pwd = el.find("input[name='password']").val();
	            var errMsg = el.find(".get_verify_code_content .err_msg");
	            $.ajax({
	                url: '/user/register',
	                type: 'POST',
	                data: {
	                    userName: userName,
	                    mobile: phone,
	                    password: pwd
	                },
	                success: function success(result) {
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.showErr(errMsg, result.error_msg);
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'feFindPwdVCValidate',
	        value: function feFindPwdVCValidate() {
	            //前端找回密码 发送验证码验证
	            var self = this;
	            var el = this.el.find(".nav_find_pwd .verify_container");
	            var feFindPwd = new _validate2.default({
	                el: el,
	                inputBoxs: ".input_content",
	                btnSubmit: ".get_verify_code",
	                callBack: function callBack() {
	                    self.sendVerifyCode(el);
	                }
	            });
	        }
	    }, {
	        key: 'feFindPwdValidate',
	        value: function feFindPwdValidate() {
	            //找回密码验证
	            var self = this;
	            var el = this.el.find(".nav_find_pwd");
	            var feFindPwd = new _validate2.default({
	                el: el,
	                inputBoxs: ".input_content",
	                btnSubmit: "button.submit",
	                callBack: function callBack() {
	                    self.checkValidateCode(el, function () {
	                        self.serverCheckPhoneNumber(el);
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'serverCheckPhoneNumber',
	        value: function serverCheckPhoneNumber(el) {
	            var self = this;
	            var phone = el.find("input[name='phone_number']").val();
	            var errMsg = el.find(".get_verify_code_content .err_msg");
	            $.ajax({
	                url: '/user/getpwd/doCheckPhone',
	                type: 'POST',
	                data: {
	                    mobile: phone
	                },
	                success: function success(result) {
	                    if (result.error_code == 0) {
	                        self.userId = result.data.userId;
	                        self.tab.switchTabNav(3, true);
	                    } else if (result.error_code > 0) {
	                        self.showErr(errMsg, result.error_msg);
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'feResetPwd',
	        value: function feResetPwd() {
	            var self = this;
	            var el = this.el.find(".nav_reset_pwd");
	            var feResetPwd = new _validate2.default({
	                el: el,
	                inputBoxs: ".input_content",
	                btnSubmit: "button.submit",
	                callBack: function callBack() {
	                    self.serverResetPwd(el);
	                }
	            });
	        }
	    }, {
	        key: 'serverResetPwd',
	        value: function serverResetPwd(el) {
	            var self = this;
	            var newPassword = el.find("input[name='newPassword']").val();
	            var newPasswordConfirm = el.find("input[name='newPasswordConfirm']").val();
	            var errMsg = el.find(".err_from_server .err_msg");
	            $.ajax({
	                url: '/user/getpwd/doPwd',
	                type: 'POST',
	                data: {
	                    userId: this.userId,
	                    newPassword: newPassword,
	                    newPasswordConfirm: newPasswordConfirm
	                },
	                success: function success(result) {
	                    console.log(result);
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.showErr(errMsg, result.error_msg);
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'checkValidateCode',
	        value: function checkValidateCode(el, cb) {
	            //验证验证码模块
	            var self = this;
	            var phone = el.find("input[name='phone_number']").val();
	            var checkCode = el.find("input[name='verify_code']").val();
	            var errMsg = el.find(".verify_code_content .err_msg");
	            $.ajax({
	                url: '/user/register/checkPhoneCode',
	                type: 'POST',
	                data: {
	                    mobile: phone,
	                    checkCode: checkCode
	                },
	                success: function success(result) {
	                    if (result.error_code == 0) {
	                        if (typeof cb == "function") {
	                            cb();
	                        }
	                    } else if (result.error_code > 0) {
	                        self.showErr(errMsg, result.error_msg);
	                    }
	                }
	            }); //验证码检测器
	        }
	    }, {
	        key: 'sendVerifyCode',
	        value: function sendVerifyCode(el) {
	            //发送验证码模块
	            var self = this;
	            var phone = el.find("input[name='phone_number']").val();
	            var btn = el.find(".get_verify_code");
	            var errMsg = el.find(".get_verify_code_content .err_msg");
	            var url = void 0;
	            $.ajax({
	                url: '/user/register/verificationCode',
	                type: 'POST',
	                data: {
	                    mobile: phone
	                },
	                success: function success(result) {
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
	    }, {
	        key: 'settime',
	        value: function settime(obj) {
	            //验证码倒数计时
	            var self = this;
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
	            setTimeout(function () {
	                self.settime(obj);
	            }, 1000);
	        }
	    }, {
	        key: 'showErr',
	        value: function showErr(errMsg, msg) {
	            errMsg.show().html(msg);
	            setTimeout(function () {
	                errMsg.addClass("active");
	            }, 100);
	        }
	    }]);

	    return Sign;
	}();

	exports.default = Sign;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Tab = function () {
	    function Tab(cfg) {
	        _classCallCheck(this, Tab);

	        this.cfg = cfg;
	        this.curNav = null;
	        this.curContent = null;
	        this.init();
	    }

	    _createClass(Tab, [{
	        key: "init",
	        value: function init() {
	            this.el = $(this.cfg.el);
	            this.tabNav = this.el.find(this.cfg.tabNav);
	            this.tabContents = this.el.find(this.cfg.tabContents);
	            this.tabNavList = this.tabNav.find("li");
	            this.contentList = this.tabContents.find("li");
	            this.trigger = this.cfg.trigger || "click";
	            this.curIndex = 0;
	            this.onTabGo = this.cfg.onTabGo || null;
	            this.checkTrigger();
	        }
	    }, {
	        key: "checkTrigger",
	        value: function checkTrigger() {
	            var self = this;
	            if (this.trigger == "mouseover") {
	                this.tabNavList.each(function () {
	                    $(this).on("mouseover", function () {
	                        var index = $(this).index();
	                        self.switchTabNav(index);
	                    });
	                });
	            } else if (this.trigger == "click") {
	                this.tabNavList.each(function () {
	                    $(this).on("click", function () {
	                        var index = $(this).index();
	                        self.switchTabNav(index, true);
	                    });
	                });
	            }
	        }
	    }, {
	        key: "switchTabNav",
	        value: function switchTabNav(index, animate) {
	            this.tabNavList.each(function () {
	                $(this).removeClass('active');
	            });
	            this.curNav = this.tabNavList.eq(index);
	            this.curNav.addClass('active');
	            this.switchContent(index, animate);
	            this.curIndex = index;
	        }
	    }, {
	        key: "switchContent",
	        value: function switchContent(index, animate) {
	            this.curIndex = index;
	            this.contentList.each(function () {
	                $(this).removeClass('active animate');
	            });
	            this.curContent = this.contentList.eq(index);
	            this.curContent.addClass('active');
	            if (animate) {
	                this.contentList.eq(index).addClass('animate');
	            }
	            if (this.onTabGo) {
	                this.onTabGo();
	            }
	        }
	    }]);

	    return Tab;
	}();

	exports.default = Tab;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Popup = function () {
	    function Popup(cfg) {
	        _classCallCheck(this, Popup);

	        this.cfg = cfg;
	        this.el = null;
	        this.mask = null;
	        this.callBack = null;
	    }

	    _createClass(Popup, [{
	        key: "init",
	        value: function init() {
	            this.callBack = this.cfg.callBack || null;
	            this.renderUI();
	            this.bindUI();
	        }
	    }, {
	        key: "renderUI",
	        value: function renderUI() {
	            if (this.cfg.el) {
	                this.el = $(this.cfg.el);
	            } else {
	                this.el = $("<div class='popup_box normal'>" + "<button class='close'></button>" + "<h3 class='title'>" + this.cfg.title + "</h3>" + "<p class='content'>" + this.cfg.content + "</p>" + "</div>");
	                //添加按钮们
	                if (this.cfg.btnConfirm) {
	                    var btnConfirm = $("<button class='confirm'>" + this.cfg.btnConfirm + "</button>");
	                    this.el.append(btnConfirm);
	                }
	                if (this.cfg.btnCancle) {
	                    var btnCancle = $("<button class='cancle'>" + this.cfg.btnCancle + "</button>");
	                    this.el.append(btnCancle);
	                }
	            }
	            this.el.appendTo("body").hide(); //初始化添加到dom并隐藏
	            this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
	            this.mask.appendTo("body");
	            this.el.show();
	            this.el.addClass("active");
	        }
	    }, {
	        key: "bindUI",
	        value: function bindUI() {
	            var self = this;
	            this.mask.on("click", function () {
	                self.destory();
	            });
	            this.el.delegate("button.close", "click", function () {
	                self.destory();
	            }).delegate("button.confirm", "click", function () {
	                self.destructor();
	            }).delegate("button.cancle", "click", function () {
	                self.destory();
	            });
	        }
	    }, {
	        key: "destructor",
	        value: function destructor() {
	            if (this.callBack) {
	                this.callBack();
	            }
	            this.destory();
	        }
	    }, {
	        key: "destory",
	        value: function destory() {
	            this.mask && this.mask.off().remove();
	            this.el.removeClass("active").hide().off();
	        }
	    }, {
	        key: "alert",
	        value: function alert() {
	            this.init();
	        }
	    }]);

	    return Popup;
	}();

	exports.default = Popup;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Validate = function () {
	    function Validate(cfg) {
	        _classCallCheck(this, Validate);

	        this.cfg = cfg;
	        this.el = null;
	        this.inputBoxs = null; //input 容器 用于查找 input 和 errmsg
	        this.btnSubmit = null;
	        this.fnSubmit = null;
	        this.callBack = null;
	        this.init();
	    }

	    _createClass(Validate, [{
	        key: "init",
	        value: function init() {
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
	    }, {
	        key: "setErrMsg",
	        value: function setErrMsg(errMsg, errText) {
	            errMsg.show().html(errText);
	            setTimeout(function () {
	                errMsg.addClass("active");
	            }, 100);
	        }
	    }, {
	        key: "removeErrMsg",
	        value: function removeErrMsg(errMsg) {
	            errMsg.removeClass("active").hide().html("");
	        }
	    }, {
	        key: "checkRequired",
	        value: function checkRequired(obj, parent, canSubmit) {
	            var self = this;
	            var errMsg = parent.find(this.errMsg);
	            if (obj.val() == '') {
	                var errText = obj.data("required") ? obj.data("required") : "必填";
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
	    }, {
	        key: "checkMail",
	        value: function checkMail(obj, parent, canSubmit) {
	            var self = this;
	            var errMsg = parent.find(this.errMsg);
	            var regMail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
	    }, {
	        key: "checkPhone",
	        value: function checkPhone(obj, parent, canSubmit) {
	            var self = this;
	            var errMsg = parent.find(this.errMsg);
	            var regPhone = /^0?1[3|4|5|8|7][0-9]\d{8}$/;

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
	    }, {
	        key: "checkIdCard",
	        value: function checkIdCard(obj, parent, canSubmit) {
	            var self = this;
	            var errMsg = parent.find(this.errMsg);
	            var regId = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;

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
	    }, {
	        key: "checkSelected",
	        value: function checkSelected(obj, parent, canSubmit) {
	            var self = this;
	            var errMsg = parent.find(this.errMsg);
	            if (obj.val() == 0) {
	                var errText = obj.data("required") ? obj.data("required") : "您需要选择类型";
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
	    }, {
	        key: "checkPwd",
	        value: function checkPwd(obj, parent, canSubmit) {
	            var self = this;
	            var errMsg = parent.find(this.errMsg);
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
	    }, {
	        key: "checkCurrentPwd",
	        value: function checkCurrentPwd(obj, parent, canSubmit) {
	            var self = this;
	        }
	    }, {
	        key: "checkNewPwd",
	        value: function checkNewPwd(obj, newPwd, parent, canSubmit) {
	            var self = this;
	            var errMsg = parent.find(this.errMsg);
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
	    }, {
	        key: "validateBlur",
	        value: function validateBlur() {
	            var self = this;
	            this.inputBoxs.each(function () {
	                var curBox = $(this);
	                var curInput = $(this).find("input");
	                var errMsg = curBox.find(self.errMsg);
	                curInput.on("blur", function () {
	                    if (curInput.attr("required")) {
	                        //检测是否为空
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
	                    if (curInput.attr("type") == "password") {
	                        //验证密码
	                        self.checkPwd(curInput, curBox, false);
	                        if (curInput.attr("name") == "currentPassword") {
	                            self.checkCurrentPwd(curInput, curBox, false);
	                        }
	                        if (curInput.attr("name") == "newPasswordConfirm") {
	                            var newPwd = self.inputBoxs.find("input[name=newPassword]").val();
	                            self.checkNewPwd(curInput, newPwd, curBox, true);
	                        }
	                    }
	                });
	                curInput.on("focus", function () {
	                    self.removeErrMsg(errMsg);
	                });
	                // select框
	                var curSelect = $(this).find("select");
	                curSelect.on("blur", function () {
	                    if (curSelect.attr("required")) {
	                        self.checkSelected(curSelect, curBox, true);
	                    }
	                });
	                curSelect.on("focus", function () {
	                    self.removeErrMsg(errMsg);
	                });
	            });
	        }
	    }, {
	        key: "validateSubmit",
	        value: function validateSubmit() {
	            var self = this;
	            this.inputBoxs.each(function () {
	                var curBox = $(this);
	                var curInput = $(this).find("input");
	                if (curInput.attr("required")) {
	                    //检测是否为空
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
	                if (curInput.attr("type") == "password") {
	                    //验证密码
	                    self.checkPwd(curInput, curBox, true);
	                    if (curInput.attr("name") == "currentPassword") {
	                        self.checkCurrentPwd(curInput, curBox, true);
	                    }
	                    if (curInput.attr("name") == "newPasswordConfirm") {
	                        var newPwd = self.inputBoxs.find("input[name=newPassword]").val();
	                        self.checkNewPwd(curInput, newPwd, curBox, true);
	                    }
	                }
	                var curSelect = $(this).find("select");
	                if (curSelect.attr("required")) {
	                    self.checkSelected(curSelect, curBox, true);
	                }
	            });
	        }
	    }, {
	        key: "checkSubmit",
	        value: function checkSubmit() {
	            var self = this;
	            this.btnSubmit.off("click");
	            this.btnSubmit.on("click", function () {
	                self.validateSubmit();
	                if (!self.canSubmit || $(this).attr("disabled") == "disabled") {
	                    return false;
	                    // self.callBack();
	                } else {
	                        if (self.callBack) {
	                            self.callBack();
	                        }
	                    }
	            });
	        }
	    }]);

	    return Validate;
	}();

	exports.default = Validate;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BackTop = function () {
	    function BackTop(contrastElement) {
	        _classCallCheck(this, BackTop);

	        //参照元素
	        this.boundingBox = null;
	        this.contrastElement = $(contrastElement || '.container');
	        this.init();
	    }

	    _createClass(BackTop, [{
	        key: 'init',
	        value: function init() {
	            if ($("#gotoTop").length > 0) {
	                this.renderUI();
	                this.syncUI();
	                this.toTop();
	            }
	        }
	    }, {
	        key: 'renderUI',
	        value: function renderUI() {
	            if ($('#gotoTop').length > 0) {
	                this.boundingBox = $('#gotoTop');
	            } else {
	                this.boundingBox = $("<div id='gotoTop'><button class='back_to_top'></button><a class='feedback' href='/about/feedback'></a></div>");
	                this.boundingBox.appendTo(document.body);
	            }
	            // 先消失
	            this.boundingBox.hide();
	            this.show();
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            var self = this;
	            $(window).scroll(function () {
	                var top = $(document).scrollTop();
	                if (top > 400) {
	                    self.boundingBox.fadeIn(200);
	                } else if (top < 400) {
	                    self.boundingBox.fadeOut(200);
	                }
	            });
	        }
	    }, {
	        key: 'syncUI',
	        value: function syncUI() {
	            var self = this;
	            var cLeft = this.contrastElement.offset().left;
	            var cWidth = this.contrastElement.width();
	            this.boundingBox.css({
	                left: cLeft + cWidth + 20 + 'px'
	            });
	            $(window).resize(function () {
	                var cLeft = self.contrastElement.offset().left;
	                var cWidth = self.contrastElement.width();

	                self.boundingBox.css({
	                    left: cLeft + cWidth + 20 + 'px'
	                });
	            });
	        }
	    }, {
	        key: 'toTop',
	        value: function toTop() {
	            var self = this;
	            this.boundingBox.find('button.back_to_top').on('click', function () {
	                $('html,body').animate({ scrollTop: 0 }, 500);
	            });
	        }
	    }]);

	    return BackTop;
	}();

	exports.default = BackTop;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HoverDelay = function () {
	    function HoverDelay(cfg) {
	        _classCallCheck(this, HoverDelay);

	        this.cfg = cfg;
	        this.el = null;
	        this.target = null;
	        this.init();
	    }

	    _createClass(HoverDelay, [{
	        key: "init",
	        value: function init() {
	            this.el = $(this.cfg.el);
	            this.target = $(this.cfg.target);
	            this.bindUI();
	        }
	    }, {
	        key: "bindUI",
	        value: function bindUI() {
	            var self = this;
	            var timer = null;
	            this.el.hover(function () {
	                self.targetShow();
	                clearInterval(timer); //关键
	            }, function () {
	                timer = setTimeout(function () {
	                    self.targetHide();
	                }, 1000);
	            });

	            this.target.hover(function () {
	                clearInterval(timer);
	            }, function () {
	                timer = setTimeout(function () {
	                    self.targetHide();
	                }, 1000);
	            });
	        }
	    }, {
	        key: "targetShow",
	        value: function targetShow() {
	            var self = this;
	            self.target.show();
	            setTimeout(function () {
	                self.target.addClass("active");
	            }, 1);
	        }
	    }, {
	        key: "targetHide",
	        value: function targetHide() {
	            var self = this;
	            self.target.removeClass("active");
	            setTimeout(function () {
	                self.target.hide();
	            }, 300);
	        }
	    }]);

	    return HoverDelay;
	}();

	exports.default = HoverDelay;

/***/ }
/******/ ]);