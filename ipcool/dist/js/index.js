/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*****************************!*\
  !*** ./src/entrys/index.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _tab = __webpack_require__(/*! ../components/tab.js */ 2);
	
	var _tab2 = _interopRequireDefault(_tab);
	
	var _slide_tab = __webpack_require__(/*! ../components/slide_tab.js */ 7);
	
	var _slide_tab2 = _interopRequireDefault(_slide_tab);
	
	var _pop_up = __webpack_require__(/*! ../components/pop_up.js */ 3);
	
	var _pop_up2 = _interopRequireDefault(_pop_up);
	
	var _LonginReg = __webpack_require__(/*! ../components/LonginReg.js */ 1);
	
	var _LonginReg2 = _interopRequireDefault(_LonginReg);
	
	var _hover_delay = __webpack_require__(/*! ../components/hover_delay.js */ 6);
	
	var _hover_delay2 = _interopRequireDefault(_hover_delay);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	$(function () {
	
	    var userMenu = new _hover_delay2.default({
	        el: "#currentUser",
	        target: "#user_menu"
	    });
	
	    setTimeout(function () {
	        $("#loading").hide();
	        $("#home_page").show();
	        setTimeout(function () {
	            $("#home_page").addClass("active");
	        }, 100);
	        $("#home_page").fullpage({
	            verticalCentered: false,
	            afterLoad: function afterLoad(anchorLink, index) {
	                $(".sec_" + index).addClass('active');
	            }
	        });
	    }, 800);
	
	    var sec2Tab = new _tab2.default({
	        el: "#sec_2_tab",
	        tabNav: ".tab_nav",
	        tabContents: ".tab_content",
	        trigger: "mouseover"
	    });
	    var sec3Tab = new _tab2.default({
	        el: "#sec_3_tab",
	        tabNav: ".sec_3_list",
	        tabContents: ".sec_3_list_summary",
	        trigger: "mouseover"
	    });
	    var sec5SlideTab = new _slide_tab2.default({
	        el: "#sec_5_tab_slide",
	        box: ".sec_5_tab_slide_nav",
	        li: ".single_logo",
	        tabContents: ".sec_5_tab_slide_content",
	        trigger: "click"
	    });
	    var sec6SlideTab = new _slide_tab2.default({
	        el: "#sec_6_product",
	        box: ".sec_6_product_list",
	        prev: ".prev",
	        next: ".next",
	        li: ".single_product"
	    });
	
	    var sign = new _LonginReg2.default({ el: "#popup_sign" });
	});

/***/ },
/* 1 */
/*!*************************************!*\
  !*** ./src/components/LonginReg.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tab = __webpack_require__(/*! ../components/tab.js */ 2);
	
	var _tab2 = _interopRequireDefault(_tab);
	
	var _pop_up = __webpack_require__(/*! ../components/pop_up.js */ 3);
	
	var _pop_up2 = _interopRequireDefault(_pop_up);
	
	var _validate = __webpack_require__(/*! ../components/validate.js */ 4);
	
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
	        this.init();
	    }
	
	    _createClass(Sign, [{
	        key: 'init',
	        value: function init() {
	            var self = this;
	            this.el = $(this.cfg.el);
	            this.tab = new _tab2.default({
	                el: this.el,
	                tabContents: ".sign_content",
	                onTabGo: function onTabGo() {
	                    //控制返回按钮逻辑
	                    var btnBack = this.el.find(".btn_back");
	                    var curIndex = this.curIndex;
	                    if (curIndex == 2 || curIndex == 3) {
	                        btnBack.show();
	                    } else {
	                        btnBack.hide();
	                    }
	                    btnBack.on("click", function () {
	                        if (curIndex == 2) {
	                            self.tab.switchContent(0, true);
	                        } else if (curIndex == 3) {
	                            self.tab.switchContent(2, true);
	                        }
	                    });
	                }
	            });
	            this.pupUp = new _pop_up2.default({ el: this.el });
	            this.bindApplicationLayer();
	            this.feLogInValidate();
	            this.feCheckCodeValidate();
	            this.feRegValidate();
	        }
	    }, {
	        key: 'bindApplicationLayer',
	        value: function bindApplicationLayer() {
	            var self = this;
	            $("#popup_sign .nav .login").on("click", function () {
	                self.tab.switchContent(0, true);
	            });
	            $("#popup_sign .nav .reg").on("click", function () {
	                self.tab.switchContent(1, true);
	            });
	            $("#popup_sign .forgot_pwd").on("click", function () {
	                self.tab.switchContent(2, true);
	            });
	            // $("#popup_sign .go_find_pwd").on("click", function() {
	            //     self.tab.switchContent(3, true);
	            // });
	            $("#register").on('click', function () {
	                self.pupUp.alert();
	                self.tab.switchContent(1, false);
	            });
	            $("#login").on('click', function () {
	                self.pupUp.alert();
	                self.tab.switchContent(0, false);
	            });
	            if ($("#regBottom").length > 0) {
	                $("#regBottom").on('click', function () {
	                    self.pupUp.alert();
	                    self.tab.switchContent(1, false);
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
	        key: 'feCheckCodeValidate',
	        value: function feCheckCodeValidate() {
	            //验证码检验器
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
	                    self.serverRegValidate(el);
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
	            var checkCode = el.find("input[name='verify_code']").val();
	            var errMsg = el.find(".err_from_server .err_msg");
	            $.ajax({
	                url: '/user/register',
	                type: 'POST',
	                data: {
	                    // userName: userName,
	                    mobile: phone,
	                    password: pwd,
	                    checkCode: checkCode
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
	        key: 'sendVerifyCode',
	        value: function sendVerifyCode(el) {
	            //发送验证码模块
	            var self = this;
	            var phone = el.find("input[name='phone_number']").val();
	            var btn = el.find(".get_verify_code");
	            var errMsg = el.find(".get_verify_code_content .err_msg");
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
/*!*******************************!*\
  !*** ./src/components/tab.js ***!
  \*******************************/
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
	                        self.switchTabNav(index);
	                    });
	                });
	            }
	        }
	    }, {
	        key: "switchTabNav",
	        value: function switchTabNav(index) {
	            this.tabNavList.each(function () {
	                $(this).removeClass('active');
	            });
	            this.tabNavList.eq(index).addClass('active');
	            this.switchContent(index, true);
	            this.curIndex = index;
	        }
	    }, {
	        key: "switchContent",
	        value: function switchContent(index, animate) {
	            this.curIndex = index;
	            this.contentList.each(function () {
	                $(this).removeClass('active animate');
	            });
	            this.contentList.eq(index).addClass('active');
	            if (animate) {
	                this.contentList.eq(index).addClass('animate');
	            }
	
	            this.onTabGo();
	        }
	    }, {
	        key: "onTabGo",
	        value: function onTabGo() {}
	    }]);
	
	    return Tab;
	}();
	
	exports.default = Tab;

/***/ },
/* 3 */
/*!**********************************!*\
  !*** ./src/components/pop_up.js ***!
  \**********************************/
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
	        this.init();
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
	                this.el = $("<div class='popup_box normal'>" + "<button class='close'></button>" + "<h3 class='title'>" + this.cfg.title + "</h3>" + "<p class='sub_title'>" + this.cfg.content + "</p>" + "</div>");
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
	            if ($('#popup_mask').length > 0) {
	                this.mask = $('#popup_mask');
	            } else {
	                this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
	            }
	        }
	    }, {
	        key: "bindUI",
	        value: function bindUI() {
	            var self = this;
	            this.mask.off("click");
	            this.mask.on("click", function () {
	                self.destory();
	            });
	            if (this.el.find('button.close').length > 0) {
	                //绑定关闭按钮
	                var btnClose = this.el.find('button.close');
	                btnClose.on('click', function () {
	                    self.destory();
	                });
	            }
	            if (this.el.find('button.confirm').length > 0) {
	                //绑定确认按钮
	                var btnConfirm = this.el.find("button.confirm");
	                btnConfirm.on("click", function () {
	                    self.destructor();
	                });
	            }
	            if (this.el.find('button.cancle').length > 0) {
	                var btnCancle = this.el.find("button.cancle");
	                btnCancle.on("click", function () {
	                    self.destory();
	                });
	            }
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
	            this.mask.remove();
	            this.el.removeClass("active").hide();
	        }
	    }, {
	        key: "alert",
	        value: function alert() {
	            this.mask.appendTo("body");
	            this.el.show();
	            this.el.addClass("active");
	        }
	    }]);
	
	    return Popup;
	}();
	
	exports.default = Popup;

/***/ },
/* 4 */
/*!************************************!*\
  !*** ./src/components/validate.js ***!
  \************************************/
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
	            var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
	
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
/* 5 */,
/* 6 */
/*!***************************************!*\
  !*** ./src/components/hover_delay.js ***!
  \***************************************/
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

/***/ },
/* 7 */
/*!*************************************!*\
  !*** ./src/components/slide_tab.js ***!
  \*************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SlideTab = function () {
	    function SlideTab(cfg) {
	        _classCallCheck(this, SlideTab);
	
	        this.cfg = cfg;
	        this.el = null; //容器元素
	        this.box = null; //container元素
	        this.prev = null; //前一个 按钮
	        this.next = null; //后一个 按钮
	        this.autoPlay = null;
	        this.canClick = null;
	        this.lis = null; //单体
	        this.liWidth = null; //单个li 的宽度
	        this.currentIndex = null; //当前第一个index
	        this.tabContents = null; //是否有底部
	        this.trigger = null;
	        this.init();
	    }
	
	    _createClass(SlideTab, [{
	        key: "init",
	        value: function init() {
	            var self = this;
	            this.el = $(this.cfg.el);
	            this.prev = this.el.find(this.cfg.prev) || null;
	            this.next = this.el.find(this.cfg.next) || null;
	            this.box = this.el.find(this.cfg.box) || null;
	            this.box.html(this.box.html() + this.box.html());
	            this.lis = this.box.find(this.cfg.li) || null;
	            this.liWidth = this.lis.eq(0).width();
	            this.tabContents = this.el.find(this.cfg.tabContents) || null;
	            this.trigger = this.cfg.trigger || "btn";
	            this.currentIndex = 0;
	            this.canClick = true;
	
	            this.resize();
	            this.bindUI();
	        }
	    }, {
	        key: "resize",
	        value: function resize() {
	            // 重置容器宽度
	            this.liWidth = this.lis.eq(0).width();
	            var ulWidth = this.liWidth * this.lis.length;
	            this.box.css({ width: ulWidth + 'px' });
	
	            var currentOffsetLeft = this.currentIndex * this.liWidth;
	            this.box.css({ left: -currentOffsetLeft + "px" });
	
	            if (this.tabContents) {
	                this.switchTabContents(this.currentIndex + 2);
	            }
	        }
	    }, {
	        key: "bindUI",
	        value: function bindUI() {
	            var self = this;
	
	            if (this.trigger == "btn") {
	                this.prev.off("click");
	                this.prev.on("click", function () {
	                    self.checkProsition();
	                    self.move(-1);
	                });
	                this.next.off("click");
	                this.next.on("click", function () {
	                    self.checkProsition();
	                    self.move(1);
	                });
	            } else if (this.trigger == "click") {
	                this.lis.each(function () {
	                    $(this).on("click", function () {
	                        self.checkProsition();
	                        self.clickMove($(this).index());
	                    });
	                });
	            }
	            $(window).on("resize", function () {
	                self.resize();
	            });
	        }
	    }, {
	        key: "checkProsition",
	        value: function checkProsition() {
	            var offsetLeft = this.box.position().left; //ul 的 offsetLeft
	            var ulWidth = -this.box.width() / 2; //重要 宽度不可能是负数
	            if (offsetLeft < ulWidth) {
	                this.box.css("left", -this.liWidth + "px");
	            }
	            if (offsetLeft >= 0) {
	                console.log("重置了");
	                this.box.css("left", ulWidth + "px");
	            }
	        }
	    }, {
	        key: "move",
	        value: function move(direction) {
	            //-1是后退 1是前进
	            var self = this;
	            if (this.canClick) {
	                var boxLeft = this.box.position().left;
	                if (direction > 0) {
	                    //后退
	                    var left = boxLeft - this.liWidth;
	                    this.currentIndex++;
	                    if (this.currentIndex >= 5) {
	                        this.currentIndex = 0;
	                    }
	                } else if (direction < 0) {
	                    var left = boxLeft + this.liWidth;
	                    this.currentIndex--;
	                    if (this.currentIndex < 0) {
	                        this.currentIndex = 4;
	                    }
	                }
	                this.canClick = false;
	                this.box.animate({ left: left + "px" }, function () {
	                    self.canClick = true;
	                });
	            }
	        }
	    }, {
	        key: "clickMove",
	        value: function clickMove(index) {
	            var self = this;
	            var myIndex = index;
	            if (myIndex > 4) {
	                myIndex = myIndex - 5;
	            }
	            if (this.canClick) {
	                var left = void 0;
	                if (myIndex < 3) {
	                    left = -(myIndex + 3) * this.liWidth;
	                } else {
	                    left = -(myIndex - 2) * this.liWidth;
	                }
	
	                this.canClick = false;
	                this.box.animate({ left: left + "px" }, function () {
	                    self.canClick = true;
	                });
	            }
	            if (this.tabContents) {
	                this.switchTabContents(myIndex);
	            }
	        }
	    }, {
	        key: "switchTabContents",
	        value: function switchTabContents(index) {
	            var tabContentsList = this.tabContents.find("li");
	            tabContentsList.each(function () {
	                $(this).removeClass('active');
	            });
	            tabContentsList.eq(index).addClass('active');
	        }
	    }]);
	
	    return SlideTab;
	}();
	
	exports.default = SlideTab;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map