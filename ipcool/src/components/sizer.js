import Loader from '../components/loader.js';

export default class Sizer {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.target = null;
        this.btnToggle = null;
        this.subSizer = null;
        this.typeList = [];
        this.url = null;
        this.init();
    }
    init() {
        this.el = $(this.cfg.el);
        this.target = $(this.cfg.target);
        this.btnToggle = this.el.find(this.cfg.btnToggle);
        this.subSizer = this.el.find(this.cfg.subSizer);
        this.url = window.location.href;
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
        let self = this;
        this.el.find("input[type=checkbox]").each(function() {
            $(this).on("click", function() {
                let curValue = $(this).val();
                if ($(this).is(":checked")) {
                    self.typeList.push(curValue);
                } else {
                    self.typeList.splice($.inArray(curValue, self.typeList), 1);
                }
                self.requestPage();
            })
        })
    }
    requestPage() {
        let self = this;
        let url = self.url;
        if (self.typeList.length) {
            let type = "&type=[";
            for (let i = 0; i < self.typeList.length; i++) {
                type += '"' + self.typeList[i] + '",';
            }
            type = type.substring(0, type.length - 1);
            type += "]";
            url = url + type;
        } 
        console.log(url);
        window.location.href = url;
    }
}
