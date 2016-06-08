export default class Popup {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.mask = null;
        this.callBack = null;
        this.init();
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
        if ($('#popup_mask').length > 0) {
            this.mask = $('#popup_mask');
        } else {
            this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
        }
    }
    bindUI() {
        let self = this;
        this.mask.on('click', function() { self.destory(); }) //绑定mask
        if (this.el.find('button.close').length > 0) { //绑定关闭按钮
            let btnClose = this.el.find('button.close');
            btnClose.on('click', function() {
                self.destory();
            })
        }
        if (this.el.find('button.confirm').length > 0) { //绑定确认按钮
            let btnConfirm = this.el.find("button.confirm");
            btnConfirm.on("click", function() {
                self.destructor();
            })
        }
        if (this.el.find('button.cancle').length > 0) {
            let btnCancle = this.el.find("button.cancle");
            btnCancle.on("click", function() {
                self.destory();
            })
        }
    }
    destructor() {
        if (this.callBack) {
            this.callBack();
        }
        this.destory();
    }
    destory() {
        this.mask.remove();
        this.el.hide();
    }
    alert() {
        this.mask.appendTo("body");
        this.el.show();
        this.el.addClass("active");
    }
}
