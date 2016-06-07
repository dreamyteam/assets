import Popup from '../components/pop_up.js'
import Avatar from '../components/avatar_upload.js'
import Validate from '../components/validate.js'
import LimiteChoose from '../components/limiteChoose.js'

$(function() {
    $("#avatar_mask").on("click", function() {
        var avatar = new Avatar({
            input: '#avatar_input_upload',
            preview: '#avatar_upload',
            confrimBtn: "#avatar_upload_submit",
            cancleBtn: "#avatar_upload_cancle",
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
        btnSubmit: "input[type='submit']"
        callBack: function() {
            //去到银行验证页面
        }
    })

    //个人身份验证 完成后弹窗
    let pInfoForm = new Validate({
        el: "#p_indentify_form",
        inputBoxs: ".input_content",
        btnSubmit: "input[type='submit']",
        fnSubmit: function() {
            let p_info_popup = new Popup({
                el: "#p_info_popup",
                callBack: function() {
                    //认证完成 跳转到基本页面 显示等待3个工作日
                    console.log("去下一个页面之类的回调");
                }
            })
            p_info_popup.alert();
            $("#p_info_popup .confrim").on("click", function() {
                p_info_popup.destory();
            })
        }
    })

    
})
