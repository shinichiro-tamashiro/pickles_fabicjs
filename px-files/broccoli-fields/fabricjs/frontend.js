window.broccoliFieldFabricjs = function() {
    this.mkEditor = function( mod, data, elm, callback ){
        var loadFabricjs = function(){
            /*var script = document.createElement('script');
            script.src = 'file:///C:/xampp/htdocs/pickles_fabricjs/px-files/broccoli-fields/fabricjs/fabric.min.js';
            document.head.appendChild(script);*/
            $.ajax({
                url: 'file:///C:/xampp/htdocs/pickles_fabricjs/px-files/broccoli-fields/fabricjs/fabric.min.js',
                dataType: 'script'
            })
            .done(function(){console.log('script')});
        };

        var loadCss = function(){
            /*var link = document.createElement('link');
            link.href = 'file:///C:/xampp/htdocs/pickles_fabricjs/px-files/broccoli-fields/fabricjs/style.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);*/
            $.ajax({
                url: 'file:///C:/xampp/htdocs/pickles_fabricjs/px-files/broccoli-fields/fabricjs/style.css',
                dataType: 'css'
            })
            .done(function(){console.log('css')})
            .fail(function(e){console.log(e)});
        };

        $.when(loadFabricjs(), loadCss())
        .done(function(){
            console.log(typeof fabric);
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
            console.log('done3333333');

            $(document).on('click', '#btnDraw', function(){
                drawarea.isDrawingMode = true;
                return false;
            });

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
        });
        

        /*link.onload = function(){
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

            $(document).on('click', '#btnDraw', function(){
                drawarea.isDrawingMode = true;
                return false;
            });

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
        };*/
    };
}