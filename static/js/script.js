Ext.onReady(function() {

    // BASIC

    new Ext.grid.GridPanel({
        renderTo:"basic"
        ,width:500
        ,height:400
        ,plugins:[new Ext.ux.grid.CSVImport()]
        ,store:new Ext.data.ArrayStore({
            fields:["a", "b", "c", "d", "e", "f", "g", "h", "i"]
        })
        ,columns:[
            {dataIndex:"a", header:"A"}
            ,{dataIndex:"b", header:"B"}
            ,{dataIndex:"c", header:"C"}
            ,{dataIndex:"d", header:"D"}
            ,{dataIndex:"e", header:"E"}
            ,{dataIndex:"f", header:"F"}
            ,{dataIndex:"g", header:"G"}
            ,{dataIndex:"h", header:"H"}
            ,{dataIndex:"i", header:"I"}
        ]
    });

    // ADVANCED

    new Ext.grid.GridPanel({
        renderTo:"advanced"
        ,width:500
        ,height:400
        ,plugins:[new Ext.ux.grid.CSVImport()]
        ,store:new Ext.data.ArrayStore({
            fields:["a", "b", "c", "d", "e", "f", "g", "h", "i"]
        })
        ,columns:[
            new Ext.grid.RowNumberer()
            ,{dataIndex:"a", header:"A"}
            ,{dataIndex:"b", header:"B"}
            ,{dataIndex:"c", header:"C"}
            ,{dataIndex:"d", header:"D"}
            ,{dataIndex:"e", header:"E"}
            ,{dataIndex:"f", header:"F"}
            ,{dataIndex:"g", header:"G"}
            ,{dataIndex:"h", header:"H"}
            ,{dataIndex:"i", header:"I"}
        ]
        ,listeners:{
            dragstart:function(grid) {
                grid.view.scroller.setStyle("background-color", "#FFFDF6");
            }
            ,dragstop:function(grid) {
                grid.view.scroller.setStyle("background-color", "#FFFFFF");
            }
            ,beforedrop:function(grid, files) {
                if (!grid.mask) {
                    grid.mask = new Ext.LoadMask(
                        grid.body
                        ,{msg:"Loading data, please wait..."}
                    );
                }
                grid.mask.show();
                // return false to cancel import
            }
            ,drop:function(grid, files) {
                grid.view.scroller.setStyle("background-color", "#FFFFFF");
            }
            ,read:function(grid, file, content, reader) {
                grid.mask.hide();
            }
        }
    });

});
