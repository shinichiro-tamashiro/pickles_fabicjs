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

    this.mkEditor = function( mod, data, elm, callback ){
        var canvasfield = '<div class="drawing">'
                        + '<canvas id="drawarea"></canvas>'
                        + '<div><button id="btnDraw">描画</button><button id="btnDrawEnd">描画終了</button></div>'
                        + '<div><label for="btnColor">カラー</label><input type="color" id="btnColor"></div>'
                        + '<div><label for="lineWidth">線幅</label><span class="widthInfo">1</span><input type="range" value="1" min="1" max="20" id="lineWidth"></div>'
                        + '</div>';
        $(elm).html(canvasfield);

        var drawarea = new fabric.Canvas('drawarea', {
            width: 700,
            height: 500
        });

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
            $('.widthInfo').html(this.value);
        });

        new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
            callback();
        }); });

        return this;
    };
}