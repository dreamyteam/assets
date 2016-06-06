export default class LimiteChoose {
    constructor(el, limit) {
        this.el = $(el);
        this.limit = limit;
        this.btnSubmit = null;
        this.errMsg = null;
        this.init();
    }
    init() {
        if (this.el.length > 0) {
            this.btnSubmit = this.el.find("input[type='submit']");
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
        this.btnSubmit.on("click", function() {
            let curLength = self.el.find("input[type='checkbox']:checked").length;
            if (curLength <= 0) {
                self.errMsg.show().html("请至少选择1个角色");
                return false;
            }
        })
    }
}
