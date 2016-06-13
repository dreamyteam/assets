export default class Tab {
    constructor(cfg) {
        this.cfg = cfg;
        this.init();
    }
    init() {
        this.el = $(this.cfg.el);
        this.tabNav = this.el.find(this.cfg.tabNav);
        this.tabContents = this.el.find(this.cfg.tabContents);
        this.tabNavList = this.tabNav.find("li");
        this.contentList = this.tabContents.find("li");
        this.trigger = this.cfg.trigger || "click";
        this.curIndex = 0;
        this.onTabGo = this.cfg.onTabGo || null;
        this.checkTrigger();
    }
    checkTrigger() {
        let self = this;
        if (this.trigger == "mouseover") {
            this.tabNavList.each(function() {
                $(this).on("mouseover", function() {
                    let index = $(this).index();
                    self.switchTabNav(index);
                })
            })
        } else if (this.trigger == "click") {
            this.tabNavList.each(function() {
                $(this).on("click", function() {
                    let index = $(this).index();
                    self.switchTabNav(index);
                })
            })
        }
    }
    switchTabNav(index) {
        this.tabNavList.each(function() { $(this).removeClass('active'); });
        this.tabNavList.eq(index).addClass('active');
        this.switchContent(index, true);
        this.curIndex = index;
    }
    switchContent(index, animate) {
        this.curIndex = index;
        this.contentList.each(function() { $(this).removeClass('active animate'); });
        this.contentList.eq(index).addClass('active');
        if (animate) {
            this.contentList.eq(index).addClass('animate');
        }

        this.onTabGo();

    }
    onTabGo() {

    }
}
