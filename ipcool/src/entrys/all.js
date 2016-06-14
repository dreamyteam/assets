import SignIn from '../components/LonginReg.js'
import Popup from '../components/pop_up.js'
import BackTop from '../components/back_top.js';
import HoverDelay from '../components/hover_delay.js';

$(function() {
    let userMenu = new HoverDelay({
        el:"#currentUserTrigger",
        target:"#user_menu"
    });
    new BackTop(); //返回顶部
    let sign = new SignIn({ el: "#popup_sign" })
})
