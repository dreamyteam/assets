import Popup from '../components/pop_up.js'
import Avatar from '../components/avatar_upload.js'
import Validate from '../components/validate.js'
import LimiteChoose from '../components/limiteChoose.js'

$(function() {
    $("#avatar_mask").on("click", function() {
        var avatar = new Avatar({
            input: '#avatar_input_upload',
            preview: '#avatar_upload',
            bioImage: ".user_avatar_container img",
            navImage: "#currentUser img"
        })
    })

    let applyValidate = new Validate({
        el: "#pwdModify",
        inputBoxs: ".input_content",
        btnSubmit: "input[type='submit']"
    })

    let companyLimite = new LimiteChoose("#company_choose_form", 3);
    let personalLimite = new LimiteChoose("#personal_choose_form", 5);

    //企业机构身份验证 完成后进去银行卡 验证页面
    let cInfoForm = new Validate({
        el: "#c_indentify_form",
        inputBoxs: ".input_content",
        btnSubmit: "input[type='submit']",
        callBack: function() {
            //去到银行验证页面
        }
    })

    let pPopUpConfirm = new Popup({
        title: "我们将在3个工作日内为您完成资料确认",
        content: "丰富您的个人主页将带来职业优势，再次感谢您的耐性等待！",
        btnConfirm: "我知道了",
        callBack: function() {
            console.log("aaaa");
        }
    });

    //个人身份验证 完成后弹窗
    let pInfoForm = new Validate({
        el: "#p_indentify_form",
        inputBoxs: ".input_content",
        btnSubmit: "input[type='submit']",
        callBack: function() {
            pPopUpConfirm.alert();
        }
    })
})
