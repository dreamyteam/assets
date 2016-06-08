export default class Loader {
    constructor(cfg) {
        this.cfg = cfg;
        this.parent = null;
        this.dom = null;
        this.width = null;
        this.init();
    }
    init() {
        this.parent = $(this.cfg.parent);
        this.width = this.cfg.width || 40;
        this.dom = $(
            "<svg class='myLoader' width = '" + this.width + "px' height = '" + this.width + "px' viewBox = '0 0 50 50'>" +
            "<path fill='#00a69d' d = 'M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z' ></path>" +
            "</svg>")
    }
    showLoading() {
        if (this.parent.find('.myLoader').length <= 0) {
            this.dom.appendTo(this.parent);
        }
    }
    hideLoading() {
        this.dom.remove();
    }
}
