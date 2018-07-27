module.exports = function() {
    this.bind = function( fieldData, mode, mod, callback ){
        var rtn = '';
        try {
            //rtn = utils79.toStr(fieldData);
            var fabricJson = JSON.parse(fieldData);
            rtn = '<img src="' + fabricJson.previewImgUrl + '">';
        } catch (e) {
            rtn = '[error fabricjs]';
        }
        if( mode == 'canvas' && !rtn.length ){
            rtn = '<span style="color:#999;background-color:#ddd;font-size:10px;padding:0 1em;max-width:100%;overflow:hidden;white-space:nowrap;">(ダブルクリックして編集してください)</span>';
        }

        new Promise(function(rlv){rlv();}).then(function(){ return new Promise(function(rlv, rjt){
            callback(rtn);
        }); });
        return this;
    }
}