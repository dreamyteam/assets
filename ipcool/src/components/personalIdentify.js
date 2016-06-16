import Popup from '../components/pop_up.js'
import Validate from '../components/validate.js'
import Tab from '../components/tab.js'
import LimiteChoose from '../components/limiteChoose.js'
import FileUpLoad from '../components/file_upload.js'

export default class PersonalIdentify {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.tab = null;
        this.cList = null;
        this.init();
    }
    init() {
        let self = this;
        this.el = $(this.cfg.el);
        this.tab = new Tab({
            el: this.el,
            tabContents: ".user_identify_container",
            onTabGo: function() {
                let curIndex = this.curIndex;
                if (curIndex == 1) {
                    self.validateForm();
                    self.uploadFiles();
                    let btn_goPrev = this.curContent.find(".go_prev");
                    btn_goPrev.on("click", function() {
                        self.tab.switchContent(0, true);
                    })
                }
            }
        });
        this.chooseCharacter();
    }
    uploadFiles() {
        let file = new FileUpLoad("#p_indentify_form");
    }
    validateForm() {
        let self = this;
        //个人身份验证 完成后弹窗
        let pInfoForm = new Validate({
            el: "#p_indentify_form",
            inputBoxs: ".input_content",
            btnSubmit: ".submit",
            callBack: function() {
                // pPopUpConfirm.alert();
                self.getFormValues();
            }
        });
    }
    getFormValues() {
        let self = this;
        let type = 1;
        let part = this.cList.join(",");
        let realName = this.el.find("input[name=realName]").val();
        let cardNo = this.el.find("input[name=cardNo]").val();
        let email = this.el.find("input[name=email]").val();
        let phone = this.el.find("input[name=phone]").val();
        let cardFront = this.el.find(".card_front").attr("src");
        let cardBack = this.el.find(".card_back").attr("src");
        let professionInfo = this.el.find(".profession_info").attr("src");
        $.ajax({
                url: '/user/authApply',
                type: 'POST',
                data: {
                    type: type,
                    part: part,
                    userName: realName,
                    cardNo: cardNo,
                    email: email,
                    phone: phone,
                    cardFront: cardFront,
                    cardBack: cardBack,
                    professionInfo: professionInfo
                },
                success: function(result) {
                    if (result.error_code == 0) {
                        self.postSuccess();
                    } else if (result.error_code > 0) {
                        console.log(result.error_msg);
                    }
                }
            })
            // console.log(
            //     "part:" + part +
            //     "\nrealName:" + realName +
            //     "\ncardNo:" + cardNo +
            //     "\nemail:" + email +
            //     "\nphone:" + phone +
            //     "\ncardFront:" + cardFront +
            //     "\ncardBack:" + cardBack +
            //     "\nprofessionInfo" + professionInfo
            // )
    }
    postSuccess() {
        let pPopUpConfirm = new Popup({
            title: "我们将在3个工作日内为您完成资料确认",
            content: "丰富您的个人主页将带来职业优势，再次感谢您的耐性等待！",
            btnConfirm: "我知道了",
            callBack: function() {
                console.log("aaaa");
            }
        });
    }
    chooseCharacter() {
        let self = this;
        let personalLimite = new LimiteChoose({
            el: "#personal_choose_form",
            limit: 5,
            callBack: function() {
                self.cList = this.characterList;
                self.tab.switchContent(1, true);
            }
        })
    }
}
