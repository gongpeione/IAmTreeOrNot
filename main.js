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
            this.imgCounter = 0;

            /*let local = localStorage.getItem('list') || '';

            this.process.innerHTML = local;*/

            this.init();
        }

        init() {

            let self = this,
                files,
                uploadBtn = $('.upload-btn', self.upload);

            self.upload.addEventListener('drop', (event) => {

                event.preventDefault();

                files = event.dataTransfer.files;

                self.handle(files);
            });

            uploadBtn.addEventListener('change', (event) => {
                self.handle(uploadBtn.files);
            });
        }

        handle(files) {

            let self = this,
                file,
                img,
                name,
                size,
                li,
                html,
                formData,
                xhr,
                i;

            if(!files || !files.length) return;

            file = files[0];

            for (i = 0; i < files.length; i++) {

                file = files[i];

                if(file.type.indexOf('image') < 0) {
                    alert('File is not an image');
                    return;
                }

                img = window.URL.createObjectURL(file);
                name = file.name;
                size = Math.floor(file.size / 1024);
                size = size > 1024 ? (size / 1024).toFixed(2) + ' MB' : size + ' KB';

                let id = 'pic-' + self.imgCounter++
                li = document.createElement('li');
                li.id = id;

                html = `
                <div class="img-cover loading" style="background-image: url('${img}')">
                    <div class="info">
                        <header>
                            <h3>${name}</h3>
                            <p>${size}</p>
                        </header>
                        <div class="link">
                            <div>
                                <label class="thumb-label">Thumb</label><input type="text" class="thumb">
                            </div>
                            <div>
                                <label class="large-label">Large</label><input type="text" class="large">
                            </div>
                        </div>
                    </div>
                </div>`;

                li.innerHTML = html;

                self.process.appendChild(li);

                formData = new FormData();
                formData.append('pic', file);

                new Promise((resolve, reject) => {

                    xhr = new XMLHttpRequest();
                    xhr.open('post', 'http://geeku.work/wbu/u/upload.php', true);
                    xhr.send(formData);

                    xhr.onreadystatechange = () => {
                        if(xhr.readyState == 4) {
                            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                                resolve(JSON.parse(xhr.responseText));
                            }
                        }
                    };

                }).then((data) => {

                    if(data.status) {
                        let className = $('#' + id + ' .img-cover', self.process).className,
                            thumb = $('#' + id + ' .thumb', self.process),
                            large = $('#' + id + ' .large', self.process),
                            thumbLabel = $('#' + id + ' .thumb-label', self.process),
                            largeLabel = $('#' + id + ' .large-label', self.process);

                        $('#' + id + ' .img-cover', self.process).className =className.replace('loading', '');
                        thumb.value = data.thumb;
                        large.value = data.large;

                        thumbLabel.addEventListener('click', () => {
                            window.open(data.thumb);
                        });

                        largeLabel.addEventListener('click', () => {
                            window.open(data.large);
                        });

                        //localStorage.setItem('list', self.process.innerHTML);

                    } else {
                        alert(data.msg);
                    }
                });
            }


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
