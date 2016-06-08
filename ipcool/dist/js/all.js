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

	var _pop_up = __webpack_require__(2);

	var _pop_up2 = _interopRequireDefault(_pop_up);

	var _back_top = __webpack_require__(3);

	var _back_top2 = _interopRequireDefault(_back_top);

	var _hover_delay = __webpack_require__(4);

	var _hover_delay2 = _interopRequireDefault(_hover_delay);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
	    var userMenu = new _hover_delay2.default({
	        el: "#currentUser",
	        target: "#user_menu"
	    });
	    $("#register").on('click', function () {
	        var popReg = new _pop_up2.default({ el: '#popup_sign' });
	        popReg.alert();
	        new _LonginReg2.default({
	            el: '#popup_sign',
	            type: 0
	        });
	    });
	    $("#login").on('click', function () {
	        var popLogin = new _pop_up2.default({ el: "#popup_sign" });
	        popLogin.alert();
	        new _LonginReg2.default({
	            el: "#popup_sign",
	            type: 1
	        });
	    });
	    new _back_top2.default(); //返回顶部
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sign = function () {
	    function Sign(cfg) {
	        _classCallCheck(this, Sign);

	        this.cfg = cfg;
	        this.type = null; // 0 reg 1 login
	        this.el = null;
	        this.boxReg = null;
	        this.boxLogin = null;
	        this.err_msg = null;
	        this.boxValidate = null;
	        this.canClickSendVCB = null;
	        this.init();
	    }

	    _createClass(Sign, [{
	        key: "init",
	        value: function init() {
	            this.el = $("#popup_sign");
	            this.boxReg = $("#register_form");
	            this.boxLogin = $("#login_form");
	            this.err_msg = this.el.find('.err_msg');
	            this.boxValidate = $("#register_form .btn_send_verify_code");
	            this.canClickSendVCB = true; //可以发送验证码
	            this.type = this.cfg.type;
	            this.boxReg.hide();
	            this.boxLogin.hide();
	            this.err_msg.hide();
	            this.checkType(this.type); //检测type
	            this.bindSwitchBtn();
	        }
	    }, {
	        key: "bindSwitchBtn",
	        value: function bindSwitchBtn() {
	            var self = this;
	            this.boxReg.find('.tips_bottom_btn').on('click', function () {
	                self.type = 1;
	                self.checkType(self.type);
	            });
	            this.boxLogin.find('.tips_bottom_btn').on('click', function () {
	                self.type = 0;
	                self.checkType(self.type);
	            });
	        }
	    }, {
	        key: "checkType",
	        value: function checkType(type) {
	            if (type == 0) {
	                // reg
	                this.renderReg();
	            } else if (type == 1) {
	                //login
	                this.renderLogin();
	            }
	        }
	    }, {
	        key: "renderReg",
	        value: function renderReg() {
	            this.boxLogin.hide();
	            this.boxReg.show();
	            this.validateBase(0);
	        }
	    }, {
	        key: "renderLogin",
	        value: function renderLogin() {
	            this.boxReg.hide();
	            this.boxLogin.show();
	            this.validateBase(1);
	        }
	    }, {
	        key: "validateBase",
	        value: function validateBase(type) {
	            // 0 跳入 reg判断 1 跳入 login 判断
	            var self = this;
	            var hasValueRegPhone = false,
	                hasValueRegPwd = false,
	                hasValueLoginPhone = false,
	                hasValueLoginPwd = false;

	            if (type == 0) {
	                //reg
	                this.boxReg.find('input').on("input propertychange", function () {
	                    if ($(this).is("input[name='phone_number']")) {
	                        $(this).val($(this).val().replace(/\D/g, '')); //只能输入数字
	                        if ($(this).val() !== '') {
	                            hasValueRegPhone = true;
	                        }
	                    }
	                    if ($(this).is("input[name='password']")) {
	                        if ($(this).val() !== '') {
	                            hasValueRegPwd = true;
	                        }
	                    }
	                    if (hasValueRegPhone && hasValueRegPwd) {
	                        self.bindBtnValidateReg();
	                    }
	                });
	            } else if (type == 1) {
	                //login
	                this.boxLogin.find('input').on("input propertychange", function () {
	                    if ($(this).is("input[name='phone_number']")) {
	                        $(this).val($(this).val().replace(/\D/g, '')); //只能输入数字
	                        if ($(this).val() !== '') {
	                            hasValueLoginPhone = true;
	                        }
	                    }
	                    if ($(this).is("input[name='password']")) {
	                        if ($(this).val() !== '') {
	                            hasValueLoginPwd = true;
	                        }
	                    }
	                    if (hasValueLoginPhone && hasValueLoginPwd) {
	                        self.loginSubmit();
	                    }
	                });
	            }
	        }
	    }, {
	        key: "bindBtnValidateReg",
	        value: function bindBtnValidateReg() {
	            var self = this;
	            if (this.canClickSendVCB) {
	                this.boxValidate.addClass('active');
	                this.boxValidate.removeAttr("disabled");
	            }
	            this.boxValidate.off('click');
	            this.boxValidate.on('click', function (e) {
	                var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
	                var regPwd = /^[a-zA-Z\d]{6,16}$/;
	                var inputPhone = self.boxReg.find("input[name='phone_number']");
	                var inputPwd = self.boxReg.find("input[name='password']");
	                if (!regPhone.test(inputPhone.val())) {
	                    self.err_msg.show().html("手机号码格式错误");
	                } else if (!regPwd.test(inputPwd.val())) {
	                    self.err_msg.show().html("密码必须为6-16位,字母或数字");
	                } else {
	                    self.err_msg.hide();
	                    self.checkValidate();
	                }
	                return false;
	            });
	        }
	    }, {
	        key: "checkValidate",
	        value: function checkValidate() {
	            var self = this;
	            $.ajax({
	                url: '/user/register/verificationCode',
	                type: 'POST',
	                data: {
	                    mobile: self.boxReg.find("input[name='phone_number']").val()
	                },
	                success: function success(result) {
	                    if (result.error_code == 0) {
	                        self.boxValidate.removeClass('active');
	                        self.boxValidate.attr("disabled", "disabled");
	                        self.canClickSendVCB = false;
	                        self.regSubmit();
	                        settime(self.boxValidate);
	                    } else if (result.error_code > 0) {
	                        self.err_msg.show().html(result.error_msg);
	                    }
	                }
	            });
	            var countdown = 60;

	            function settime(obj) {
	                if (countdown == 0) {
	                    obj.removeAttr("disabled");
	                    obj.addClass("active");
	                    obj.html("重新发送");
	                    countdown = 60;
	                    return;
	                } else {
	                    obj.attr("disabled", "disabled");
	                    obj.html("重新发送" + countdown + 's');
	                    countdown--;
	                }
	                setTimeout(function () {
	                    settime(obj);
	                }, 1000);
	            }
	        }
	    }, {
	        key: "regSubmit",
	        value: function regSubmit() {
	            var self = this;
	            var btnSubmit = this.boxReg.find("button.solid");
	            var lastInput = this.boxReg.find("input[name='verify_code']");
	            btnSubmit.addClass('active');
	            lastInput.off("keydown");
	            lastInput.on("keydown", function (e) {
	                var key = e.which;
	                if (key == 13) {
	                    e.preventDefault();
	                    self.regConfirm();
	                    return false;
	                }
	            });
	            btnSubmit.off('click');
	            btnSubmit.on('click', function () {
	                self.regConfirm();
	                return false;
	            });
	        }
	    }, {
	        key: "regConfirm",
	        value: function regConfirm() {
	            var self = this;
	            $.ajax({
	                url: '/user/register',
	                type: 'POST',
	                data: {
	                    mobile: self.boxReg.find("input[name='phone_number']").val(),
	                    password: self.boxReg.find("input[name='password']").val(),
	                    checkCode: self.boxReg.find("input[name='verify_code']").val()
	                },
	                success: function success(result) {
	                    console.log(result);
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.err_msg.show().html(result.error_msg);
	                    }
	                }
	            });
	        }
	    }, {
	        key: "loginSubmit",
	        value: function loginSubmit() {
	            var self = this;
	            var btnSubmit = this.boxLogin.find("button.solid");
	            var lastInput = this.boxLogin.find("input[name='password']");
	            btnSubmit.addClass('active');

	            lastInput.off("keydown");
	            lastInput.on("keydown", function (e) {
	                var key = e.which;
	                if (key == 13) {
	                    e.preventDefault();
	                    self.loginBeforeAjax();
	                    return false;
	                }
	            });
	            btnSubmit.off("click");
	            btnSubmit.on('click', function (e) {
	                e.preventDefault();
	                self.loginBeforeAjax();
	                return false;
	            });
	        }
	    }, {
	        key: "loginBeforeAjax",
	        value: function loginBeforeAjax() {
	            var self = this;
	            var regPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
	            var regPwd = /^[a-zA-Z\d]{6,16}$/;
	            var inputPhone = self.boxLogin.find("input[name='phone_number']");
	            var inputPwd = self.boxLogin.find("input[name='password']");
	            var inputRememberPwd = self.boxLogin.find("input[name='remember_pwd']");
	            var rememberPwd;
	            if (inputRememberPwd.is(":checked")) {
	                rememberPwd = 1;
	            } else {
	                rememberPwd = 0;
	            }
	            if (!regPhone.test(inputPhone.val())) {
	                self.err_msg.show().html("手机号码格式错误");
	            } else if (!regPwd.test(inputPwd.val())) {
	                self.err_msg.show().html("密码必须为6-16位,字母或数字");
	            } else {
	                self.err_msg.hide();
	                self.loginConfirm(rememberPwd);
	            }
	        }
	    }, {
	        key: "loginConfirm",
	        value: function loginConfirm(cheked) {
	            var self = this;
	            $.ajax({
	                url: '/user/login',
	                type: 'POST',
	                data: {
	                    mobile: self.boxLogin.find("input[name='phone_number']").val(),
	                    password: self.boxLogin.find("input[name='password']").val(),
	                    rememberPwd: cheked
	                },
	                success: function success(result) {
	                    console.log(result);
	                    if (result.error_code == 0) {
	                        location.reload();
	                    } else if (result.error_code > 0) {
	                        self.err_msg.show().html(result.error_msg);
	                    }
	                }
	            });
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
	            this.mask.on('click', function () {
	                self.destory();
	            }); //绑定mask
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
	            this.el.hide();
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
/* 3 */
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
/* 4 */
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