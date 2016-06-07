export default class Popup {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.mask = null;
        this.callBack = null;
        this.init();
    }
    init() {
        this.el = $(this.cfg.el);
        this.callBack = this.cfg.callBack || null;
        if ($('#popup_mask').length > 0) {
            this.mask = $('#popup_mask');
        } else {
            this.mask = $("<div class='popup_mask' id='popup_mask'></div>");
        }
        this.bindClose();
    }
    bindClose() {
        var self = this;
        this.mask.on('click', function() {
            self.destory();
        })
        if (this.el.find('button.close')) {
            var btnClose = this.el.find('button.close');
            btnClose.on('click', function() {
                self.destory();
            })
        }
    }
    destory() {
        this.mask.remove();
        this.el.hide();
        if (this.callBack) {
            this.callBack();
        }
    }
    alert() {
        this.mask.appendTo("body");
        this.el.show();
        this.el.addClass("active");
    }
}
