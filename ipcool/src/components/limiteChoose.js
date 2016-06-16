export default class LimiteChoose {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.limit = null;
        this.callBack = null;
        this.btnSubmit = null;
        this.errMsg = null;
        this.characterList = null;
        this.init();
    }
    init() {
        this.el = $(this.cfg.el);
        this.limit = this.cfg.limit;
        this.callBack = this.cfg.callBack || null;
        if (this.el.length > 0) {
            this.btnSubmit = this.el.find(".submit");
            this.errMsg = this.el.find(".err_msg");
            this.limitCheck();
            this.submitCheck();
        }
    }
    limitCheck() {
        let self = this;
        let checkboxs = this.el.find("input[type='checkbox']");
        checkboxs.on("click", function() {
            if (self.el.find("input[type='checkbox']:checked").length > self.limit) {
                $(this).attr("checked", false);
            }
        })
    }
    submitCheck() {
        let self = this;
        this.btnSubmit.off("click");
        this.btnSubmit.on("click", function() {
            let curLength = self.el.find("input[type='checkbox']:checked").length;
            if (curLength <= 0) {
                self.errMsg.show().html("请至少选择1个角色");
            } else {
                self.getCharacterList();
                if (self.callBack) {
                    self.callBack();
                }
            }
        })
    }
    getCharacterList() {
        let self = this;
        this.characterList = [];
        let checkboxs = this.el.find("input[type='checkbox']");
        checkboxs.each(function() {
            if ($(this).is(":checked")) {
                self.characterList.push($(this).val());
            }
        })
    }
}
