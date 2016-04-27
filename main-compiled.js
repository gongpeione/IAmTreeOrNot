'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Gong on 2016/4/26.
 */

(function (window, document) {
    "use strict";

    var DragUpload = function () {
        function DragUpload(param) {
            _classCallCheck(this, DragUpload);

            this.wrap = $(param.wrap);
            this.upload = $('#upload', this.wrap);
            this.process = $('#upload-list', this.wrap);
            this.imgCounter = 0;

            /*let local = localStorage.getItem('list') || '';
              this.process.innerHTML = local;*/

            this.init();
        }

        _createClass(DragUpload, [{
            key: 'init',
            value: function init() {

                var self = this,
                    files = void 0,
                    uploadBtn = $('.upload-btn', self.upload);

                self.upload.addEventListener('drop', function (event) {

                    event.preventDefault();

                    files = event.dataTransfer.files;

                    self.handle(files);
                });

                uploadBtn.addEventListener('change', function (event) {
                    self.handle(uploadBtn.files);
                });
            }
        }, {
            key: 'handle',
            value: function handle(files) {

                var self = this,
                    file = void 0,
                    img = void 0,
                    name = void 0,
                    size = void 0,
                    li = void 0,
                    html = void 0,
                    formData = void 0,
                    xhr = void 0;

                if (!files || !files.length) return;

                file = files[0];

                if (file.type.indexOf('image') < 0) {
                    alert('File is not an image');
                    return;
                }

                img = window.URL.createObjectURL(files[0]);
                name = file.name;
                size = Math.floor(file.size / 1024);
                size = size > 1024 ? (size / 1024).toFixed(2) + ' MB' : size + ' KB';

                var id = 'pic-' + self.imgCounter++;
                li = document.createElement('li');
                li.id = id;

                html = '\n                <div class="img-cover loading" style="background-image: url(\'' + img + '\')">\n                    <div class="info">\n                        <header>\n                            <h3>' + name + '</h3>\n                            <p>' + size + '</p>\n                        </header>\n                        <div class="link">\n                            <div>\n                                <label class="thumb-label">Thumb</label><input type="text" class="thumb">\n                            </div>\n                            <div>\n                                <label class="large-label">Large</label><input type="text" class="large">\n                            </div>\n                        </div>\n                    </div>\n                </div>';

                li.innerHTML = html;

                self.process.appendChild(li);

                formData = new FormData();
                formData.append('pic', file);

                new Promise(function (resolve, reject) {

                    xhr = new XMLHttpRequest();
                    xhr.open('post', 'u/upload.php', true);
                    xhr.send(formData);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4) {
                            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                                resolve(JSON.parse(xhr.responseText));
                            }
                        }
                    };
                }).then(function (data) {

                    if (data.status) {
                        var className = $('#' + id + ' .img-cover', self.process).className,
                            thumb = $('#' + id + ' .thumb', self.process),
                            large = $('#' + id + ' .large', self.process),
                            thumbLabel = $('#' + id + ' .thumb-label', self.process),
                            largeLabel = $('#' + id + ' .large-label', self.process);

                        $('#' + id + ' .img-cover', self.process).className = className.replace('loading', '');
                        thumb.value = data.thumb;
                        large.value = data.large;

                        thumbLabel.addEventListener('click', function () {
                            window.open(data.thumb);
                        });

                        largeLabel.addEventListener('click', function () {
                            window.open(data.large);
                        });

                        //localStorage.setItem('list', self.process.innerHTML);
                    } else {
                            alert(data.msg);
                        }
                });
            }
        }]);

        return DragUpload;
    }();

    new DragUpload({
        wrap: '#wrap',
        upload: '.upload-area',
        process: '#upload-list'
    });

    //Remove document dragxxx event
    var dragx = ['dragenter', 'dragover', 'dragleave', 'drop'];
    dragx.forEach(function (item) {
        document.addEventListener(item, function (event) {
            event.preventDefault();
        });
    });

    function $(selector, context) {
        if (context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }

    function $$(selector, context) {
        if (context) {
            return context.querySelectorAll(selector);
        }
        return document.querySelectorAll(selector);
    }

    function log(c) {
        console.log(c);
    }
})(window, document);

//# sourceMappingURL=main-compiled.js.map