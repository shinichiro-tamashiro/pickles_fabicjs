window.broccoliFieldFabricjs = function() {
    this.mkEditor = function( mod, data, elm, callback ){
        var script = document.createElement('script');
        script.src = 'file:///C:/xampp/htdocs/pickles_fabricjs/px-files/broccoli-fields/fabricjs/fabric.min.js';
        document.head.appendChild(script);
        var link = document.createElement('link');
        link.href = 'file:///C:/xampp/htdocs/pickles_fabricjs/px-files/broccoli-fields/fabricjs/style.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        script.onload = function(){
            var canvasfield = '<div class="drowing">'
                            + '<canvas id="drowarea"></canvas>'
                            + '</div>';
            $(elm).html(canvasfield);

            var drowarea = new fabric.Canvas('drowarea', {
                width: 500,
                height: 500,
                isDrawingMode: true
            });

            new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
                callback();
            }); });

            return this;
        };
    };
}