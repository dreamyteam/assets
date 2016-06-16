import Popup from '../components/pop_up.js'
import Avatar from '../components/avatar_upload.js'
import Validate from '../components/validate.js'
import LimiteChoose from '../components/limiteChoose.js'
import PersonalIdentify from '../components/personalIdentify.js'

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
        el: "#personal_identify_container"
    })


    let companyLimite = new LimiteChoose("#company_choose_form", 3);
    //企业机构身份验证 完成后进去银行卡 验证页面
    let cInfoForm = new Validate({
        el: "#c_indentify_form",
        inputBoxs: ".input_content",
        btnSubmit: "input[type='submit']",
        callBack: function() {
            //去到银行验证页面
        }
    })


})
