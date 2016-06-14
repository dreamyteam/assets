export default class Popup {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.mask = null;
        this.callBack = null;
    }
    init() {
        this.callBack = this.cfg.callBack || null;
        this.renderUI();
        this.bindUI();
    }
    renderUI() {
        if (this.cfg.el) {
            this.el = $(this.cfg.el);
        } else {
            this.el = $(
                    "<div class='popup_box normal'>" +
                    "<button class='close'></button>" +
                    "<h3 class='title'>" + this.cfg.title + "</h3>" +
                    "<p class='sub_title'>" + this.cfg.content + "</p>" +
                    "</div>"
                )
                //添加按钮们
            if (this.cfg.btnConfirm) {
                let btnConfirm = $("<button class='confirm'>" + this.cfg.btnConfirm + "</button>");
                this.el.append(btnConfirm);
            }
            if (this.cfg.btnCancle) {
                let btnCancle = $("<button class='cancle'>" + this.cfg.btnCancle + "</button>");
                this.el.append(btnCancle);
            }
        }
        this.el.appendTo("body").hide(); //初始化添加到dom并隐藏
        this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
        this.mask.appendTo("body");
        this.el.show();
        this.el.addClass("active");
    }
    bindUI() {
        let self = this;
        this.mask.on("click", function() {
            self.destory();
        });
        this.el.delegate("button.close", "click", function() {
            self.destory();
        }).delegate("button.confirm", "click", function() {
            self.destructor();
        }).delegate("button.cancle", "click", function() {
            self.destory();
        })
    }
    destructor() {
        if (this.callBack) {
            this.callBack();
        }
        this.destory();
    }
    destory() {
        this.mask && this.mask.off().remove();
        this.el.removeClass("active").hide().off();
    }
    alert() {
        this.init();
    }
}
