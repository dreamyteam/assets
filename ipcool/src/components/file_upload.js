export default class FileUpload {
    constructor(el) {
        this.el = $(el);
        this.inputFiles = null;
        this.init();
    }
    init() {
        this.inputFiles = this.el.find("input[type=file]");
        this.inputChangeHandler();
    }
    inputChangeHandler() {
        let self = this;
        this.inputFiles.each(function() {
            let curInput = $(this);
            let curPreviewBox = curInput.siblings('.preview_image');
            curInput.on("change", function() {
                let files = this.files;
                let file;
                if (files && files.length) {
                    file = files[0];
                }
                self.previewImg(curInput, curPreviewBox, file);
                self.upLoadFiles(curPreviewBox, file);
            })
        })
    }
    previewImg(curInput, curPreviewBox, file) {
        if (!window.FileReader) return; //如果不支持FileReader 则不处理
        let reader = new FileReader();
        reader.onload = function(oFREvent) {
            curPreviewBox.attr("src", oFREvent.target.result).show();
        }
        reader.readAsDataURL(file);
    }
    upLoadFiles(curPreviewBox, file) {
        let self = this;
        let fd = new FormData();
        fd.append("file", file);
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
                    self.setImageUrl(image_url, curPreviewBox);
                } else if (result.error_code > 0) {
                    console.log(result.error_msg);
                }
            }
        })
    }
    setImageUrl(url, curPreviewBox) {
        curPreviewBox.attr("src", url).show();
    }
}
