import Popup from '../components/pop_up.js'
import Avatar from '../components/avatar_upload.js'
import Validate from '../components/validate.js'
import LimiteChoose from '../components/limiteChoose.js'
import PersonalIdentify from '../components/personalIdentify.js'
import CompanyIdentify from '../components/companyIdentify.js'
import Tab from '../components/tab.js'

$(function() {
    $("#avatar_mask").on("click", function() {
        var avatar = new Avatar({
            input: '#avatar_input_upload',
            preview: '#avatar_upload',
            bioImage: ".user_avatar_container img",
            navImage: "#currentUser img"
        })
    })
    let pwdValidate = new Validate({
            el: "#pwdModify",
            inputBoxs: ".input_content",
            btnSubmit: "input[type='submit']"
        })
        //个人身份验证开始
    let personalForms = new PersonalIdentify({
            el: "#personal_identify_container",
        })
        //企业身份验证开始
    let companyForms = new CompanyIdentify({
        el: "#company_identify_container",
    })

    let userState = new Tab({
        el: "#user_state_container",
        tabContents: ".user_state_content",
        onTabGo: function() {
            if (this.curIndex == 1) {
                $(".go_prev").on("click", function() {
                    userState.switchContent(0, false);
                })
            }
        }
    })
    $("button.start_identify").on("click", function() {
        userState.switchContent(1, false);
    });

    let pPopUpConfirm = new Popup({
        title: "提示",
        content: "修改认证信息将重新完成认证，在修改完成前用户将使用修改前的相关信息",
        btnConfirm: "继续修改",
        btnCancle: "放弃修改",
        callBack: function() {
            userState.switchContent(1, false);
        }
    });

    $(".identify_success_container button.submit").on("click", function() {
        pPopUpConfirm.alert();
    })

})
