/**
 * Created by Gong on 2016/4/26.
 */

(function(window, document) {
    "use strict";

    class DragUpload {

        constructor(param) {
            this.wrap = $(param.wrap);
            this.upload = $('#upload', this.wrap);
            this.process = $('#upload-list', this.wrap);
            log(this.wrap);
            log(this.upload);
            log(this.process);

            this.init();
        }

        init() {

            let self = this,
                files,
                file,
                img,
                name,
                size,
                li,
                html;

            log(self.upload);
            self.upload.addEventListener('drop', (event) => {

                event.preventDefault();

                log(event);

                files = event.dataTransfer.files;

                if(!files.length) return;

                file = files[0];

                if(file.type.indexOf('image') < 0) {
                    alert('File is not an image');
                    return;
                }

                img = window.URL.createObjectURL(files[0]);
                name = file.name;
                size = Math.floor(file.size / 1024);

                li = document.createElement('li');

                html = `
                <div class="img-cover" style="background-image: url('${img}')">
                    <div class="info">
                        <header>
                            <h3>${name}</h3>
                            <p>${size}</p>
                        </header>
                        <div class="link">
                            <div>
                                <label for="thumb">Thumb: <input type="text" id="thumb"></label>
                            </div>
                            <div>
                                <label for="large">Large: <input type="text" id="large"></label>
                            </div>
                        </div>
                    </div>
                </div>`;

                li.innerHTML = html;

                self.process.appendChild(li);
            });
        }
    }

    new DragUpload({
        wrap: '#wrap',
        upload: '.upload-area',
        process: '#upload-list'
    });

    //Remove document dragxxx event
    const dragx = ['dragenter', 'dragover', 'dragleave', 'drop'];
    dragx.forEach((item) => {
        document.addEventListener(item, (event) => {
            event.preventDefault();
        });
    });

    function $(selector, context) {
        if(context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }

    function $$(selector, context) {
        if(context) {
            return context.querySelectorAll(selector);
        }
        return document.querySelectorAll(selector);
    }

    function log(c) {
        console.log(c);
    }
})(window, document);
