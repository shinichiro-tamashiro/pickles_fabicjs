window.broccoliFieldFabricjs = function() {
    this.mkEditor = function( mod, data, elm, callback ){
        var html = '<div><input type="text" class="form-control"></div>'
                 + '<div style="border:1px solid #ccc;width:100%;height:300px;"><canvas id"canvas"></canvas></div>'
                 + '';
        $(elm).html(html);

        new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
            callback();
        }); });

        return this;
    };
}