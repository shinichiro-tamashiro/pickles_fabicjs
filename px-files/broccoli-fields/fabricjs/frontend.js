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
                     + '<div class="control-block"><button id="btnText" class="control-btn_text">文字入力</button></div>'
                     + '<div class="control-block"><button id="btnGroup" class="control-btn_group">グループ化</button><button id="btnGroupOff" class="control-btn_groupoff">グループ解除</button></div>'
                     + '<div class="control-block"><button id="btnObjDele" class="control-btn_objdele">削除</button></div>'
                     + '<div class="control-block"><button id="btnAllDele" class="control-btn_alldele">全削除</button></div>'
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

    //テキスト入力
    $(document).on('click', '#btnText', function(){
        var textbox = new fabric.Textbox('', {
            left: 50,
            top: 50,
            width: 150,
            fontSize: 20
        });
        drawarea.add(textbox).setActiveObject(textbox);

        return false;
    });

    //オブジェクトグループ化
    $(document).on('click', '#btnGroup', function(){
        if (!drawarea.getActiveObject()) {
            return false;
        }
        if (drawarea.getActiveObject().type !== 'activeSelection') {
            return false;
        }
        drawarea.getActiveObject().toGroup();
        drawarea.requestRenderAll();

        return false;
    });

    //オブジェクトグループ化解除
   $(document).on('click', '#btnGroupOff', function(){
        if (!drawarea.getActiveObject()) {
            return false;
        }
        if (drawarea.getActiveObject().type !== 'group') {
            return false;
        }
        drawarea.getActiveObject().toActiveSelection();
        drawarea.requestRenderAll();

        return false;
    });

    //削除
    $(document).on('click', '#btnObjDele', function(){
        var obj = drawarea.getActiveObjects();
        for(var i in obj){
            drawarea.remove(obj[i]);
        }
        return false;
    });

    //キャンバス内全削除
    $(document).on('click', '#btnAllDele', function(){
        drawarea.clear();
        return false;
    });
}