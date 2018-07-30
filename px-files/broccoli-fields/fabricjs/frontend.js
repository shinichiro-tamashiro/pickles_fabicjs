window.broccoliFieldFabricjs = function() {
    var __dirname = (function() {
        if (document.currentScript) {
            return document.currentScript.src;
        } else {
            var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length-1];
            if (script.src) {
                return script.src;
            }
        }
    })().replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');

    script = document.createElement('script');
    script.src = __dirname + '/fabric.min.js';
    document.head.appendChild(script);

    link = document.createElement('link');
    link.href = __dirname + '/style.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    var drawarea;

    this.mkEditor = function( mod, data, elm, callback ){
        var canvasfield = '<div class="drawing">'
                        + '<canvas id="drawarea"></canvas>'
                        + '<div class="control">'
                        + '<div class="control-block"><button id="btnDraw" class="control-btn_drowstart">手描き開始</button><button id="btnDrawEnd" class="control-btn_drowend">手描き終了</button></div>'
                        + '<div class="control-block"><label for="btnColor">カラー</label><input type="color" id="btnColor" class="control-btn_color"></div>'
                        + '<div class="control-block"><label for="lineWidth">線幅</label>'
                        + '<select name="lineWidth" id="lineWidth" class="control-btn_linewidth">';
        var maxLineWidth = 30;
        for(var i = 1; i <= maxLineWidth; i++) {
            canvasfield += '<option value="' + i + '">' + i + '</option>'; 
        }
        canvasfield += '</select>'
                     + '</div>'
                     + '<div class="control-block"><button id="btnDele" class="control-btn_dele">削除</button></div>'
                     + '</div>';
        $(elm).html(canvasfield);

        drawarea = new fabric.Canvas('drawarea', {
            width: 700,
            height: 500
        });

        if(data) {
            drawarea.loadFromJSON(JSON.parse(data));
        }

        new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
            callback();
        }); });
        return this;
    };

    this.saveEditorContent = function( elm, data, mod, callback, options ){
        options = options || {};
        options.message = options.message || function(msg){};//ユーザーへのメッセージテキストを送信

        if(drawarea.getObjects().length > 0) {
            var fabricJson = drawarea.toJSON();
            var imgUrl = drawarea.toDataURL({format: 'png'});
            fabricJson['previewImgUrl'] = imgUrl;
            var src = JSON.stringify(fabricJson);
        }

        new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
            callback(src);
        }); });
        return this;
    }

    //描画ボタン
    $(document).on('click', '#btnDraw', function(){
        drawarea.isDrawingMode = true;
        return false;
    });

    //描画終了ボタン
    $(document).on('click', '#btnDrawEnd', function(){
        drawarea.isDrawingMode = false;
        return false;
    });

    //線の色指定
    $(document).on('change', '#btnColor', function(){
        drawarea.freeDrawingBrush.color = this.value;
    });

    //線幅指定
    $(document).on('change', '#lineWidth', function(){
        drawarea.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    });

    //削除
    $(document).on('click', '#btnDele', function(){
        //drawarea.clearContext(drawarea.getActiveObjects());
        //return false:
    });
}