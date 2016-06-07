import Paging from '../components/paging.js'
import Sizer from '../components/sizer.js'

$(function() {
    //分页
    var paging = new Paging('#paging');
    let sizer = new Sizer({
        el: "#sizer_search",
        btnToggle:".toggle_sub_sizer",
        subSizer:".sub_sizer_container",
        target:".search_result",

    })
})
