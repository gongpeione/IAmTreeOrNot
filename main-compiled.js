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
            log(this.wrap);
            log(this.upload);
            log(this.process);

            this.init();
        }

        _createClass(DragUpload, [{
            key: 'init',
            value: function init() {

                var self = this,
                    files = void 0,
                    file = void 0,
                    img = void 0,
                    name = void 0,
                    size = void 0,
                    li = void 0,
                    html = void 0;

                log(self.upload);
                self.upload.addEventListener('drop', function (event) {

                    event.preventDefault();

                    log(event);

                    files = event.dataTransfer.files;

                    if (!files.length) return;

                    file = files[0];

                    if (file.type.indexOf('image') < 0) {
                        alert('File is not an image');
                        return;
                    }

                    img = window.URL.createObjectURL(files[0]);
                    name = file.name;
                    size = Math.floor(file.size / 1024);

                    li = document.createElement('li');

                    html = '\n                <div class="img-cover" style="background-image: url(\'' + img + '\')">\n                    <div class="info">\n                        <header>\n                            <h3>' + name + '</h3>\n                            <p>' + size + '</p>\n                        </header>\n                        <div class="link">\n                            <div>\n                                <label for="thumb">Thumb: <input type="text" id="thumb"></label>\n                            </div>\n                            <div>\n                                <label for="large">Large: <input type="text" id="large"></label>\n                            </div>\n                        </div>\n                    </div>\n                </div>';

                    li.innerHTML = html;

                    self.process.appendChild(li);
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