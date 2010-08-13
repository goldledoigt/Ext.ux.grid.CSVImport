Ext.ns("Ext.ux.grid");

Ext.ux.grid.CSVImport = function() {

    var grid = null;
    var strDelimiter = ",";
    var endLine = "\n";

    function csvToArray(strData, strDelimiter){
        var arrData = [[]];
        var arrMatches = null;
        var objPattern = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ), "gi");

        while (arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[ 1 ];
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                arrData.push([]);
            }
            if (arrMatches[2]) {
                var strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
            } else {
                var strMatchedValue = arrMatches[ 3 ];
            }
            arrData[ arrData.length - 1 ].push(strMatchedValue);
        }

        return(arrData);
    }

    function addRow(row) {
        row = csvToArray(row, strDelimiter);
        grid.store.loadData(row, true);
    }

    function processFile(file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var rows = atob(e.target.result.split(",")[1]).split(endLine);
            Ext.each(rows, addRow);
            grid.fireEvent("read", grid, file, rows, reader);
        };
        reader.readAsDataURL(file);
    }

    function onFilesDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.browserEvent.dataTransfer.files;
        if (
            files && files.length &&
            grid.fireEvent("beforedrop", grid, files) !== false
        ) {
            // no defer, no load mask...
            (function() {
                Ext.each(files, processFile);
                grid.fireEvent("drop", grid, files);
            }).defer(50);
        }
    }

    function initDD() {
        grid.body.on({
            scope:grid
            ,dragover:function(e) {
                e.stopPropagation();
                e.preventDefault();
                if (!Ext.isGecko) { // prevents drop in FF ;-(
                  e.browserEvent.dataTransfer.dropEffect = 'copy';
                }
                grid.fireEvent("dragstart", grid);
                return;
            }
            ,dragleave:function(e) {
                e.stopPropagation();
                e.preventDefault();
                grid.fireEvent("dragstop", grid);
                return;
            }
            ,drop:onFilesDrop
        });
    }

    function init(component) {
        grid = component;
        grid.on({afterrender:initDD})
    }
    
    return {init:init};

};
