import Popup from '../components/pop_up.js'
import Validate from '../components/validate.js'
import Tab from '../components/tab.js'
import LimiteChoose from '../components/limiteChoose.js'
import FileUpLoad from '../components/file_upload.js'

export default class CompanyIdentify {
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
                let btn_goPrev = this.curContent.find(".go_prev");
                if (curIndex == 1) {
                    self.validateForm();
                    self.uploadFiles();
                    btn_goPrev.on("click", function() {
                        self.tab.switchContent(0, true);
                    })
                }
                if (curIndex == 2) {
                    self.validateBank();
                    btn_goPrev.on("click", function() {
                        self.tab.switchContent(1, true);
                    })
                }
                // add curIndex == 2
            }
        });
        this.chooseCharacter();
    }
    uploadFiles() {
        let file = new FileUpLoad("#c_indentify_form");
    }
    validateForm() {
        let self = this;
        let cInfoForm = new Validate({
            el: "#c_indentify_form",
            inputBoxs: ".input_content",
            btnSubmit: ".submit",
            callBack: function() {
                self.tab.switchContent(2, true);
            }
        });
    }
    validateBank() {
        let self = this;
        let cBankForm = new Validate({
            el: "#c_bank_info",
            inputBoxs: ".input_content",
            btnSubmit: ".submit",
            callBack: function() {
                self.getFormValues();
            }
        });
    }
    getFormValues() {
        let self = this;
        let type = 2;
        let part = this.cList.join(",");
        let realName = this.el.find("input[name=realName]").val();
        let cardNo = this.el.find("input[name=cardNo]").val();
        let email = this.el.find("input[name=email]").val();
        let phone = this.el.find("input[name=phone]").val();
        let cardFront = this.el.find(".card_front").attr("src");
        let cardBack = this.el.find(".card_back").attr("src");
        let companyName = this.el.find("input[name=companyName]").val();
        let businessLicense = this.el.find(".business_license").attr("src");
        let licenseAgreement = this.el.find(".license_agreement").attr("src");
        let bankNo = this.el.find("input[name=bankNo]").val();
        let bankName = this.el.find("input[name=bankName]").val();
        let bankRealyName = this.el.find("input[name=bankRealyName]").val();

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
                companyName: companyName,
                businessLicense: businessLicense,
                licenseAgreement: licenseAgreement,
                bankNo: bankNo,
                bankName: bankName,
                bankRealyName: bankRealyName
            },
            success: function(result) {
                if (result.error_code == 0) {
                    self.postSuccess();
                } else if (result.error_code > 0) {
                    console.log(result.error_msg);
                }
            }
        })
    }
    postSuccess() {
        console.log("提交成功")
    }
    chooseCharacter() {
        let self = this;
        let limit = new LimiteChoose({
            el: "#company_choose_form",
            limit: 3,
            callBack: function() {
                self.cList = this.characterList;
                self.tab.switchContent(1, true);
            }
        })
    }
}
