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

	"use strict";

	var _validate = __webpack_require__(4);

	var _validate2 = _interopRequireDefault(_validate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
		var applyValidate = new _validate2.default({
			el: "#applyValidate",
			inputBoxs: ".input_content",
			btnSubmit: "input[type='submit']"
		});
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
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
	                    // return false;
	                    self.callBack();
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

/***/ }
/******/ ]);