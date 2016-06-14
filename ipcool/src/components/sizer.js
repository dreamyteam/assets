import Loader from '../components/loader.js';

export default class Sizer {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.target = null;
        this.btnToggle = null;
        this.subSizer = null;
        this.init();
    }
    init() {
        this.el = $(this.cfg.el);
        this.target = $(this.cfg.target);
        this.btnToggle = this.el.find(this.cfg.btnToggle);
        this.subSizer = this.el.find(this.cfg.subSizer);
        this.bindToggleBtn();
        this.bindSizer();
    }
    bindToggleBtn() {
        let self = this;
        let subSizerHeght = this.subSizer.height() + 1; //修正1px边框 并记录高度
        let spread = false; //初始化展开 为否
        self.subSizer.css({
            "height": "0px",
            "border-bottom": "none"
        })
        self.btnToggle.removeClass("active");
        function offSpread() {
            self.subSizer.animate({
                "height": "0px",
            }).css({
                "border-bottom": "none"
            })
            self.btnToggle.removeClass("active");
        }
        function onSpread() {
            self.subSizer.animate({
                "height": subSizerHeght + "px",
            }).css({
                "border-bottom": "1px solid #eee"
            })
            self.btnToggle.addClass("active");
        }
        this.btnToggle.on("click", function() {
            if (spread) { // 收起逻辑
                offSpread();
            } else { //展开逻辑
                onSpread();
            }
            spread = !spread;
        })
    }
    bindSizer() {
        this.el.find("input[type=checkbox]").each(function() {
            $(this).on("click", function() {
                let loader = new Loader({
                    parent: ".search_loading"
                })
                loader.showLoading();
                // loader.hideLoading();
            })
        })
    }
}
