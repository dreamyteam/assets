import Popup from '../components/pop_up.js'
import Avatar from '../components/avatar_upload.js'

$(function() {
    $("#avatar_mask").on("click",function(){
        var avatar = new Avatar({
            input: '#avatar_input_upload',
            preview: '#avatar_upload',
            confrimBtn: "#avatar_upload_submit",
            cancleBtn: "#avatar_upload_cancle",
            bioImage:".user_avatar_container img",
            navImage:"#currentUser img"
        })
    })
})
