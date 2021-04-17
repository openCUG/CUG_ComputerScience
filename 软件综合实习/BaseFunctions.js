require([
    "dojo/dom",
    "esri/Color",
    "dojo/keys",
    "esri/config",
    "esri/sniff",
    "esri/basemaps",
    "dojo/parser",
    "esri/map",
    "esri/dijit/Bookmarks",
    "esri/dijit/Search",
    "esri/dijit/HomeButton",
    "esri/dijit/LocateButton",
    "esri/dijit/BasemapToggle",
    "esri/dijit/OverviewMap",
    "esri/dijit/Scalebar",
    "esri/SnappingManager",
    "esri/dijit/Measurement",
    "esri/layers/FeatureLayer",
    "dijit/TitlePane",
    "dijit/form/CheckBox",
    "dijit/layout/BorderContainer", 
    "dijit/layout/ContentPane",
    "dojo/domReady!"
    ],
    function (dom,Color,keys,esriConfig, has,esriBasemaps,parser,Map, Bookmarks,Search,HomeButton,
            LocateButton,BasemapToggle,OverviewMap,Scalebar,SnappingManager, Measurement){

        esriBasemaps.delorme = {

            baseMapLayers: [
                //初始化中国矢量地图服务
                { url: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer" }
            ],
            //缩略图
            thumbnailUrl: "Imgs/shiliang.jpg",
            title: "矢量图"
        };

        parser.parse(); 

        var map = new Map("map", {

            // 设置地图为从网络掉用下的中国地图
            basemap:'delorme',
            center: [114.3996484, 30.52428033],
            zoom: 15
        });

        // 创建书签控件
        // 将能否编辑设置为true
        var bookmarks = new Bookmarks({
            map: map,
            bookmarks: [],
            editable: true
        }, "bookmarks");

        // 设置搜索控件
        var search = new Search({
            map: map
        }, "search");
        search.startup();

        // 设置一键返回按钮
        var home = new HomeButton({
            map: map
        }, "HomeButton");
        home.startup();

        // 设置定位按钮
        geoLocate = new LocateButton({
            map: map
        }, "LocateButton");
        geoLocate.startup();

        // 设置卫星图切换控件
        var toggle = new BasemapToggle({
            map: map,
            basemap: "satellite"
        }, "BasemapToggle");
        toggle.startup();

        // 设置鹰眼控件
        var overviewMapDijit = new OverviewMap({
            map: map,
            visible: true,
            attachTo: "bottom-left"
        });
        overviewMapDijit.startup();

        // 设置比例尺
        var scalebar = new Scalebar({
            map: map,
            scalebarUnit: "metric",
            visible: true,
            attachTo:"bottom-right"
        });

        // 预设书签数据对象
        var bookmarkJSON = {

            first: {
                "extent": {
                    "xmin": -12975100,
                    "ymin": 3993900,
                    "xmax": -12964100,
                    "ymax": 4019500,
                    "spatialReference": {
                        "wkid": 102100,
                        "latestWkid": 3857
                    }
                },
                "name": "Palm Springs, CA"
            },
            second: {
                "extent": {
                    "xmin": -13052100,
                    "ymin": 4024900,
                    "xmax": -13041100,
                    "ymax": 4050500,
                    "spatialReference": {
                        "wkid": 102100,
                        "latestWkid": 3857
                    }
                },
                "name": "Redlands, California"
            },
            third: {
                "extent": {
                    "xmin": -13048800,
                    "ymin": 3844800,
                    "xmax": -13037800,
                    "ymax": 3870400,
                    "spatialReference": {
                        "wkid": 102100,
                        "latestWkid": 3857
                    }
                },
                "name": "San Diego, CA"
            },
        };

        // 把书签的数据对象发送给书签
        Object.keys(bookmarkJSON).forEach(function (bookmark){
            bookmarks.addBookmark(bookmarkJSON[bookmark]);
        });

        // 设置测量工具控件
        var measurement = new Measurement({
            map: map
        }, dom.byId("measurementDiv"));
        measurement.startup();
    
});