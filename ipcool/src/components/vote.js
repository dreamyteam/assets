export default class Vote {
    constructor(cfg) {
        this.cfg = cfg;
        this.el = null;
        this.ipId = null;
        this.init();
    }
    init() {
        this.ipId = $('#getIpid').val();
        console.log(this.ipId);
    }

}
