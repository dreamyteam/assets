import cropper from './cropper.js'
import Popup from '../components/pop_up.js'

export default class Avatar {
    constructor(cfg) {
        this.cfg = cfg;
        this.input = null; //输入框
        this.preview = null;
        this.bioImage = null; //用户中心右侧头像
        this.navImage = null; //导航右侧头像
        this.init();
    }
    init() {
        this.input = $(this.cfg.input);
        this.preview = $(this.cfg.preview);
        this.bioImage = $(this.cfg.bioImage);
        this.navImage = $(this.cfg.navImage);
        this.inputHandler();
    }
    inputHandler() {
        let self = this;
        let URL = window.URL || window.webkitURL;
        this.input.on("change", function() {
            let files = this.files;
            let file;
            let blobURL;
            let x, y, width;
            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) { // 是图片文件的处理TODO 非图片文件提示
                    var avatar_popup = new Popup({
                        el: "#avatar_popup",
                        callBack: function() {
                            self.uploadImg(file, x, y, width, avatar_popup);
                        }
                    });
                    avatar_popup.alert();
                    blobURL = URL.createObjectURL(file);
                    self.preview.cropper({
                        aspectRatio: 1 / 1,
                        viewMode: 3,
                        dragMode: 'move',
                        guides: false,
                        center: false,
                        scalable: false,
                        zoomable: false,
                        background: false,
                        toggleDragModeOnDblclick: false,
                        crop: function(e) {
                            x = e.x;
                            y = e.y;
                            width = e.width;
                        }
                    }).cropper('replace', blobURL)
                }
            }
        })
    }
    uploadImg(file, x, y, width, popup) {
        let self = this;
        let fd = new FormData();
        fd.append("file", file);
        let data = {
            file: fd,
            x: x,
            y: y,
            width: width
        }
        $.ajax({
            url: '/upload/img',
            type: 'POST',
            processData: false,
            contentType: false,
            data: fd,
            success: function(result) {
                console.log(result);
                if (result.error_code == 0) {
                    let image_url = result.data.image_url;
                    self.setImageUrl(image_url);
                    popup.destory();
                } else if (result.error_code > 0) {
                    console.log(result.error_msg)
                }
            }
        })
    }
    setImageUrl(imgUrl) {
        this.bioImage.attr("src", imgUrl);
        this.navImage.attr("src", imgUrl);
        $.ajax({
            url: '/user/update',
            type: 'POST',
            data: { imageUrl: imgUrl },
            success: function() {}
        })
    }
}
