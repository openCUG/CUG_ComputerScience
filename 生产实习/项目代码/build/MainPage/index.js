(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\access-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/MainPage/index.ux?uxType=page":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\access-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/MainPage/index.ux?uxType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.storage"));

var _system2 = _interopRequireDefault($app_require$("@app-module/system.router"));

var _system3 = _interopRequireDefault($app_require$("@app-module/system.prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  private: {
    aboveAnim: '',
    belowAnim: '',
    maskAnim: '',
    activeIndex: 1,
    toDoList: [{
      name: 'todo事件1',
      start: '2022年1月1日',
      end: '2022年2月1日'
    }, {
      name: 'todo事件2',
      start: '2022年1月1日',
      end: '2022年2月2日'
    }, {
      name: 'todo事件3',
      start: '2022年1月1日',
      end: '2022年2月3日'
    }],
    doingList: [{
      name: '吃饭',
      start: '2022年1月1日',
      end: '2022年1月2日'
    }, {
      name: '睡觉',
      start: '2022年1月1日',
      end: '2022年2月8日'
    }, {
      name: '打豆豆',
      start: '2022年1月1日',
      end: '2022年1月2日'
    }, {
      name: '豆豆哭了',
      start: '2022年1月1日',
      end: '2022年12月13日'
    }],
    doneList: [{
      name: 'done事件1',
      start: '2022年1月1日',
      end: '2022年1月29日'
    }, {
      name: 'done事件2',
      start: '2022年1月1日',
      end: '2022年3月5日'
    }]
  },

  onInit() {
    this.$page.setTitleBar({
      text: 'To Do'
    });
    this.$on('todoItem', evt => {
      if (evt.detail.type == 1) {
        this.toDoList.push(this.doingList[evt.detail.idx]);
        this.doingList.splice(evt.detail.idx, 1);
      }

      if (evt.detail.type == 2) {
        this.toDoList.push(this.doneList[evt.detail.idx]);
        this.doneList.splice(evt.detail.idx, 1);
      }

      this.saveLists();
    });
    this.$on('doingItem', evt => {
      if (evt.detail.type == 0) {
        this.doingList.push(this.toDoList[evt.detail.idx]);
        this.toDoList.splice(evt.detail.idx, 1);
      }

      if (evt.detail.type == 2) {
        this.doingList.push(this.doneList[evt.detail.idx]);
        this.doneList.splice(evt.detail.idx, 1);
      }

      this.saveLists();
    });
    this.$on('doneItem', evt => {
      if (evt.detail.type == 0) {
        this.doneList.push(this.toDoList[evt.detail.idx]);
        this.toDoList.splice(evt.detail.idx, 1);
      }

      if (evt.detail.type == 1) {
        this.doneList.push(this.doingList[evt.detail.idx]);
        this.doingList.splice(evt.detail.idx, 1);
      }

      this.saveLists();
    });
    this.$on('delItem', evt => {
      this.doneList.splice(evt.detail.idx, 1);
      this.saveLists();
    });
  },

  onShow() {
    let that = this;
    this.loadLists(function (data) {
      if (data != '') {
        let list = JSON.parse(data);
        that.toDoList = list.toDoList;
        that.doingList = list.doingList;
        that.doneList = list.doneList;
        let nowDate = new Date();
        that.saveLists();
      }
    });
    this.drawLineCanvas();
    this.drawTimeCanvas();
  },

  changeTabactive(e) {
    this.activeIndex = e.index;
  },

  openInput(name, start, end) {
    this.saveLists(function () {
      _system2.default.push({
        uri: '/Input',
        params: {
          pushName: name,
          pushStart: start,
          pushEnd: end,
          pushType: -1,
          pushIdx: -1
        }
      });
    });
  },

  openCalender(todo, doing, done) {
    let tdEnd = new Array();
    let doingEnd = new Array();
    let doneEnd = new Array();
    let namelist1 = new Array();

    for (let i = 0; i < this.toDoList.length; i++) {
      tdEnd.push(this.toDoList[i].end);
    }

    for (let j = 0; j < this.doingList.length; j++) {
      if (this.doingList[j].name != "未设置") {
        doingEnd.push(this.doingList[j].end);
        namelist1.push(this.doingList[j].name);
      }
    }

    for (let k = 0; k < this.doneList.length; k++) {
      doneEnd.push(this.doneList[k].end);
    }

    console.log(669, namelist1);

    _system2.default.push({
      uri: '/Calendar',
      params: {
        CalToDoList: tdEnd,
        CalDoingList: doingEnd,
        CalDoneList: doneEnd,
        nameList: namelist1
      }
    });
  },

  calRange() {
    return '20220105';
  },

  saveLists(voidCallback = function () {}) {
    let that = this;
    let list = {
      toDoList: this.toDoList,
      doingList: this.doingList,
      doneList: this.doneList
    };

    _system.default.set({
      key: 'msg',
      value: list,
      success: voidCallback(),
      fail: function (data, code) {
        that.$app.$def.makeToast(`handling fail, code = ${code}`);
      }
    });
  },

  loadLists(dataCallback = function () {}) {
    let that = this;

    _system.default.get({
      key: 'msg',
      success: function (data) {
        dataCallback(data);
      },
      fail: function (data, code) {
        that.$app.$def.makeToast(`handling fail, code = ${code}`);
      }
    });
  },

  drawLineCanvas() {
    let min = Math.min(this.toDoList.length, this.doingList.length, this.doneList.length);
    let gap = Math.max(this.toDoList.length, this.doingList.length, this.doneList.length) - min;
    let todo = 320 - (this.toDoList.length - min) / gap * 250;
    let doing = 320 - (this.doingList.length - min) / gap * 250;
    let done = 320 - (this.doneList.length - min) / gap * 250;
    const canvas = this.$element('line-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 750, 350);
    ctx.arc(200, todo, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.moveTo(375, doing);
    ctx.arc(375, doing, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.moveTo(550, done);
    ctx.arc(550, done, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.moveTo(0, 175);
    ctx.bezierCurveTo(100, 175, 100, todo, 200, todo);
    ctx.bezierCurveTo(280, todo, 280, doing, 375, doing);
    ctx.bezierCurveTo(470, doing, 470, done, 550, done);
    ctx.bezierCurveTo(650, done, 650, 175, 750, 175);
    ctx.stroke();
    ctx.font = '28px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.toDoList.length}件 待办`, 200 - 45, todo - 30);
    ctx.fillText(`${this.doingList.length}件 计划内`, 375 - 45, doing - 30);
    ctx.fillText(`${this.doneList.length}件 已完成`, 550 - 45, done - 30);
  },

  drawTimeCanvas() {
    let overtime = 0,
        day = 0,
        week = 0,
        month = 0,
        more = 0;
    const nowDate = new Date();
    const dayDate = new Date();
    dayDate.setTime(dayDate.getTime() + 24 * 60 * 60 * 1000);
    const weekDate = new Date();
    weekDate.setTime(weekDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const monthDate = new Date();
    monthDate.setTime(monthDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    this.toDoList.forEach(function (value) {
      if (value.end == '未设置') {
        more += 1;
      } else {
        let arr = value.end.match(/\d+/g);
        let endDate = new Date(arr[0], arr[1] - 1, arr[2]);
        if (endDate.getTime() > monthDate.getTime()) more += 1;else if (endDate.getTime() > weekDate.getTime()) month += 1;else if (endDate.getTime() > dayDate.getTime()) week += 1;else if (endDate.getTime() > nowDate.getTime()) day += 1;else overtime += 1;
      }
    });
    this.doingList.forEach(function (value) {
      if (value.end == '未设置') {
        more += 1;
      } else {
        let arr = value.end.match(/\d+/g);
        let endDate = new Date(arr[0], arr[1] - 1, arr[2]);
        if (endDate.getTime() > monthDate.getTime()) more += 1;else if (endDate.getTime() > weekDate.getTime()) month += 1;else if (endDate.getTime() > dayDate.getTime()) week += 1;else if (endDate.getTime() > nowDate.getTime()) day += 1;else overtime += 1;
      }
    });
    let total = overtime + day + week + month + more;
    let percentList = [overtime / total, day / total, week / total, month / total, more / total];
    let circleList = [0, ...percentList];

    for (let i = 0; i < 5; i++) circleList[i + 1] += circleList[i];

    const canvas = this.$element('time-canvas');
    const ctx = canvas.getContext('2d');
    const color = ['#303841', '#d72323', '#f9906f', '#fdeff2', '#d6ecf0'];

    for (let i = 0; i < percentList.length; i++) {
      percentList[i] = (percentList[i] * 100).toFixed(0);
      if (percentList[i].length == 1) percentList[i] = '  ' + percentList[i];
    }

    let textList = [`已超时:  ${percentList[0]}%`, `一天内:  ${percentList[1]}%`, `一周内:  ${percentList[2]}%`, `一月内:  ${percentList[3]}%`, `还很远:  ${percentList[4]}%`];
    ctx.clearRect(0, 0, 750, 350);
    ctx.lineWidth = 20;
    ctx.font = '23px';

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = color[i];
      ctx.arc(220, 175, 120, Math.PI * 2 * circleList[i], Math.PI * 2 * circleList[i + 1]);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = color[i];
      ctx.arc(450, 75 + 50 * i, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#f0f8ff';
      ctx.fillText(textList[i], 475, 75 + 50 * i + 6);
    }

    ctx.textAlign = 'center';
    ctx.font = 'bold 55px';
    ctx.fillText(`${total}`, 220, 167);
    ctx.font = '22px';
    ctx.fillStyle = '#f0f8ff';
    ctx.fillText('未完成任务统计', 220, 205);
  },

  aboveSwipe(dir) {
    if (dir.direction == 'left') {
      this.drawLineCanvas();
      this.drawTimeCanvas();
      this.aboveAnim = 'aboveForward';
      this.belowAnim = 'belowForward';
      this.maskAnim = 'maskForward';
    }

    if (dir.direction == 'right') {
      this.aboveAnim = 'aboveReverse';
      this.belowAnim = 'belowReverse';
      this.maskAnim = 'maskReverse';
    }
  }

};
exports.default = _default;
const moduleOwn = exports.default || module.exports;
const accessors = ['public', 'protected', 'private'];

if (moduleOwn.data && accessors.some(function (acc) {
  return moduleOwn[acc];
})) {
  throw new Error('页面VM对象中的属性data不可与"' + accessors.join(',') + '"同时存在，请使用private替换data名称');
} else if (!moduleOwn.data) {
  moduleOwn.data = {};
  moduleOwn._descriptor = {};
  accessors.forEach(function (acc) {
    const accType = typeof moduleOwn[acc];

    if (accType === 'object') {
      moduleOwn.data = Object.assign(moduleOwn.data, moduleOwn[acc]);

      for (const name in moduleOwn[acc]) {
        moduleOwn._descriptor[name] = {
          access: acc
        };
      }
    } else if (accType === 'function') {
      console.warn('页面VM对象中的属性' + acc + '的值不能是函数，请使用对象');
    }
  });
}}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/MainPage/main-page-item.ux?uxType=comp":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/MainPage/main-page-item.ux?uxType=comp ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = _interopRequireDefault($app_require$("@app-module/system.prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  props: ['item', 'idx', 'type'],

  markTodo(idx) {
    this.$dispatch('todoItem', {
      idx: idx,
      type: this.type
    });

    _system.default.showToast({
      message: "已加入待办事项，加油！"
    });
  },

  markDoing(idx) {
    this.$dispatch('doingItem', {
      idx: idx,
      type: this.type
    });

    _system.default.showToast({
      message: "已加入计划内，加油！"
    });
  },

  markDone(idx) {
    this.$dispatch('doneItem', {
      idx: idx,
      type: this.type
    });
    console.log("something done");

    _system.default.showToast({
      message: "任务完成，放松一下吧！"
    });
  },

  delItem(idx) {
    this.$dispatch('delItem', {
      idx: idx
    });

    _system.default.showToast({
      message: "已将任务删除"
    });
  },

  openInput(name, start, end, type, idx) {
    const router = $app_require$('@app-module/system.router');

    router.push({
      uri: '/Input',
      params: {
        pushName: name,
        pushStart: start,
        pushEnd: end,
        pushType: type,
        pushIdx: idx
      }
    });
  }

};
exports.default = _default;}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/MainPage/index.ux?uxType=page":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/MainPage/index.ux?uxType=page ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "@FONT-FACE": {
    "myfont": {
      "fontFamily": "myfont",
      "src": [
        "/Common/MiSans-Normal.ttf"
      ],
      "fontName": "myfont",
      "fontSrc": [
        "/Common/MiSans-Normal.ttf"
      ]
    },
    "myfont-bold": {
      "fontFamily": "myfont-bold",
      "src": [
        "/Common/MiSans-Bold.ttf"
      ],
      "fontName": "myfont-bold",
      "fontSrc": [
        "/Common/MiSans-Bold.ttf"
      ]
    }
  },
  ".header": {
    "height": "200px",
    "width": "750px",
    "flexDirection": "column"
  },
  ".header .header-text": {
    "flexDirection": "column",
    "flex": 1,
    "fontSize": "40px",
    "color": "#FFFFFF",
    "fontWeight": "bold",
    "textAlign": "center",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header-text"
        }
      ]
    }
  },
  ".header .span1": {
    "height": "200px",
    "fontSize": "40px",
    "color": "#000000",
    "textAlign": "center",
    "fontWeight": "bold",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "span1"
        }
      ]
    }
  },
  ".header .span2": {
    "fontSize": "30px",
    "color": "#808080",
    "paddingTop": "20px",
    "paddingRight": "0px",
    "paddingBottom": "0px",
    "paddingLeft": "150px",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "header"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "span2"
        }
      ]
    }
  },
  ".main-page": {
    "backgroundImage": "/Common/bg.png",
    "flexDirection": "column"
  },
  ".main-page .tabs": {
    "flex": 1,
    "marginTop": "20px",
    "marginBottom": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        }
      ]
    }
  },
  ".main-page .tabs .tab-content": {
    "flex": 1,
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-content"
        }
      ]
    },
    "paddingTop": "30px"
  },
  ".main-page .tabs .tab-bar": {
    "height": "100px",
    "width": "600px",
    "marginLeft": "75px",
    "backgroundColor": "rgba(255,255,255,0.7)",
    "borderTopWidth": "5px",
    "borderRightWidth": "5px",
    "borderBottomWidth": "5px",
    "borderLeftWidth": "5px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "borderRadius": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-bar"
        }
      ]
    }
  },
  ".main-page .tabs .tab-text": {
    "textAlign": "center",
    "fontWeight": "bold",
    "fontFamily": "myfont, serif",
    "color": "#808080",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tabs"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "tab-text"
        }
      ]
    },
    "color:active": "#000000",
    "fontWeight:active": "bold",
    "fontFamily:active": "myfont, serif"
  },
  ".main-page .analyze-btn": {
    "height": "100px",
    "width": "100px",
    "borderRadius": "50px",
    "marginLeft": "30px",
    "marginRight": "40px",
    "marginBottom": "50px",
    "backgroundImage": "/Common/analyze.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-btn"
        }
      ]
    }
  },
  ".main-page .add-btn": {
    "height": "100px",
    "width": "100px",
    "borderRadius": "50px",
    "marginLeft": "auto",
    "marginRight": "20px",
    "marginBottom": "50px",
    "backgroundImage": "/Common/add.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "add-btn"
        }
      ]
    }
  },
  ".main-page .calender-btn": {
    "height": "100px",
    "width": "100px",
    "borderRadius": "50px",
    "marginRight": "300px",
    "marginLeft": "20px",
    "marginBottom": "50px",
    "borderTopColor": "#88ada6",
    "borderRightColor": "#88ada6",
    "borderBottomColor": "#88ada6",
    "borderLeftColor": "#88ada6",
    "borderStyle": "solid",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "backgroundImage": "/Common/cal.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "main-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "calender-btn"
        }
      ]
    }
  },
  ".analyze-page": {
    "backgroundImage": "/Common/bg.png",
    "flexDirection": "column"
  },
  ".analyze-page .canvas-container": {
    "flex": 1,
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        }
      ]
    }
  },
  ".analyze-page .canvas-container #line-canvas": {
    "height": "350px",
    "width": "750px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "id",
          "i": false,
          "a": "equals",
          "v": "line-canvas"
        }
      ]
    }
  },
  ".analyze-page .canvas-container #time-canvas": {
    "height": "350px",
    "width": "750px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "id",
          "i": false,
          "a": "equals",
          "v": "time-canvas"
        }
      ]
    }
  },
  ".analyze-page .canvas-container .canvas-text": {
    "height": "70px",
    "fontSize": "30px",
    "marginLeft": "50px",
    "paddingTop": "30px",
    "fontFamily": "myfont, serif",
    "color": "#f0f8ff",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "canvas-text"
        }
      ]
    }
  },
  ".analyze-page .mask-container": {
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask-container"
        }
      ]
    }
  },
  ".analyze-page .mask-container .mask-area": {
    "marginTop": "70px",
    "height": "350px",
    "width": "750px",
    "backgroundColor": "rgba(134,154,204,0.5)",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "analyze-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask-container"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "mask-area"
        }
      ]
    }
  },
  ".aboveForward": {
    "animationName": "aboveForward",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  "@KEYFRAMES": {
    "aboveForward": [
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"-375px\",\"rotateY\":\"-90deg\"}",
        "opacity": 0,
        "time": 100
      }
    ],
    "belowForward": [
      {
        "transform": "{\"translateX\":\"375px\",\"rotateY\":\"90deg\"}",
        "opacity": 0,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 100
      }
    ],
    "maskForward": [
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"750px\"}",
        "time": 100
      }
    ],
    "aboveReverse": [
      {
        "transform": "{\"translateX\":\"-375px\",\"rotateY\":\"-90deg\"}",
        "opacity": 0,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 100
      }
    ],
    "belowReverse": [
      {
        "transform": "{\"translateX\":\"0px\",\"rotateY\":\"0deg\"}",
        "opacity": 1,
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"375px\",\"rotateY\":\"90deg\"}",
        "opacity": 0,
        "time": 100
      }
    ],
    "maskReverse": [
      {
        "transform": "{\"translateX\":\"750px\"}",
        "time": 0
      },
      {
        "transform": "{\"translateX\":\"0px\"}",
        "time": 100
      }
    ]
  },
  ".belowForward": {
    "animationName": "belowForward",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  ".maskForward": {
    "animationName": "maskForward",
    "animationDuration": "600ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1,
    "animationDelay": "600ms"
  },
  ".aboveReverse": {
    "animationName": "aboveReverse",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  ".belowReverse": {
    "animationName": "belowReverse",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  ".maskReverse": {
    "animationName": "maskReverse",
    "animationDuration": "500ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  }
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/MainPage/main-page-item.ux?uxType=comp":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/MainPage/main-page-item.ux?uxType=comp ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "@FONT-FACE": {
    "myfont": {
      "fontFamily": "myfont",
      "src": [
        "/Common/MiSans-Normal.ttf"
      ],
      "fontName": "myfont",
      "fontSrc": [
        "/Common/MiSans-Normal.ttf"
      ]
    },
    "myfont-bold": {
      "fontFamily": "myfont-bold",
      "src": [
        "/Common/MiSans-Bold.ttf"
      ],
      "fontName": "myfont-bold",
      "fontSrc": [
        "/Common/MiSans-Bold.ttf"
      ]
    }
  },
  ".item": {
    "flex": 1,
    "height": "120px",
    "marginBottom": "15px"
  },
  ".item .micro-list": {
    "flex": 1,
    "height": "120px",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        }
      ]
    }
  },
  ".item .micro-list .micro-text": {
    "flex": 1,
    "flexDirection": "column",
    "height": "120px",
    "width": "600px",
    "marginRight": "75px",
    "flexGrow": 0,
    "backgroundColor": "rgba(255,255,255,0.7)",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "borderRadius": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        }
      ]
    }
  },
  ".item .micro-list .micro-text .text1": {
    "height": "65px",
    "marginTop": "5px",
    "paddingLeft": "30px",
    "fontWeight": "bold",
    "fontSize": "38px",
    "color": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text1"
        }
      ]
    }
  },
  ".item .micro-list .micro-text .time": {
    "flexDirection": "row",
    "height": "45px",
    "marginBottom": "5px",
    "paddingLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        }
      ]
    }
  },
  ".item .micro-list .micro-text .time .text2": {
    "width": "320px",
    "fontSize": "23px",
    "marginLeft": "10px",
    "marginRight": "30px",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text2"
        }
      ]
    }
  },
  ".item .micro-list .micro-btn": {
    "flex": 0,
    "height": "100px",
    "width": "60px",
    "backgroundColor": "#f5f5f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-btn"
        }
      ]
    }
  },
  ".item .micro-list-finished": {
    "flex": 1,
    "height": "120px",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list-finished"
        }
      ]
    }
  },
  ".item .micro-list-finished .micro-text": {
    "flex": 1,
    "flexDirection": "column",
    "height": "120px",
    "width": "600px",
    "marginRight": "75px",
    "flexGrow": 0,
    "backgroundColor": "rgba(255,255,255,0.7)",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "borderRadius": "20px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list-finished"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        }
      ]
    }
  },
  ".item .micro-list-finished .micro-text .text1": {
    "height": "65px",
    "marginTop": "5px",
    "paddingLeft": "30px",
    "fontWeight": "bold",
    "fontSize": "38px",
    "color": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list-finished"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text1"
        }
      ]
    }
  },
  ".item .micro-list-finished .micro-text .text1-finished": {
    "height": "65px",
    "marginTop": "5px",
    "paddingLeft": "30px",
    "fontWeight": "bold",
    "fontSize": "38px",
    "textDecoration": "line-through",
    "color": "#000000",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list-finished"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text1-finished"
        }
      ]
    }
  },
  ".item .micro-list-finished .micro-text .time": {
    "flexDirection": "row",
    "height": "45px",
    "marginBottom": "5px",
    "paddingLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list-finished"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        }
      ]
    }
  },
  ".item .micro-list-finished .micro-text .time .text2": {
    "width": "320px",
    "fontSize": "23px",
    "marginLeft": "10px",
    "marginRight": "30px",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list-finished"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-text"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text2"
        }
      ]
    }
  },
  ".item .micro-list-finished .micro-btn": {
    "flex": 0,
    "height": "100px",
    "width": "60px",
    "backgroundColor": "#f5f5f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-list-finished"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "micro-btn"
        }
      ]
    }
  },
  ".date-image": {
    "width": "30px",
    "height": "30px",
    "marginTop": "7px",
    "backgroundImage": "/Common/calendar.png"
  },
  ".uncheck-btn": {
    "width": "40px",
    "height": "40px",
    "marginLeft": "30px",
    "marginRight": "30px",
    "marginTop": "35px",
    "backgroundImage": "/Common/uncheck.png"
  },
  ".checked-btn": {
    "width": "40px",
    "height": "40px",
    "marginLeft": "30px",
    "marginRight": "30px",
    "marginTop": "35px",
    "backgroundImage": "/Common/checked.png"
  },
  ".cancle-btn": {
    "width": "40px",
    "height": "40px",
    "marginLeft": "0px",
    "marginTop": "35px",
    "backgroundImage": "/Common/cancle.png"
  }
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/MainPage/index.ux?uxType=page&importNames[]=main-page-item":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/MainPage/index.ux?uxType=page&importNames[]=main-page-item ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "children": [
    {
      "type": "stack",
      "attr": {},
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": function () {return ['analyze-page', this.belowAnim]},
          "events": {
            "swipe": "aboveSwipe"
          },
          "children": [
            {
              "type": "stack",
              "attr": {},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "canvas-container"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "任务统计:"
                      },
                      "classList": [
                        "canvas-text"
                      ]
                    },
                    {
                      "type": "canvas",
                      "attr": {
                        "id": "line-canvas"
                      },
                      "id": "line-canvas"
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "死线分布:"
                      },
                      "classList": [
                        "canvas-text"
                      ]
                    },
                    {
                      "type": "canvas",
                      "attr": {
                        "id": "time-canvas"
                      },
                      "id": "time-canvas"
                    }
                  ]
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "mask-container"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": function () {return ['mask-area', this.maskAnim]}
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": function () {return ['mask-area', this.maskAnim]}
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": function () {return ['main-page', this.aboveAnim]},
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "header"
              ],
              "events": {
                "swipe": "aboveSwipe"
              }
            },
            {
              "type": "tabs",
              "attr": {
                "index": function () {return this.activeIndex}
              },
              "classList": [
                "tabs"
              ],
              "events": {
                "change": "changeTabactive"
              },
              "children": [
                {
                  "type": "tab-bar",
                  "attr": {},
                  "classList": [
                    "tab-bar"
                  ],
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "value": "待办事项"
                      },
                      "classList": [
                        "tab-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "计划内"
                      },
                      "classList": [
                        "tab-text"
                      ]
                    },
                    {
                      "type": "text",
                      "attr": {
                        "value": "已完成"
                      },
                      "classList": [
                        "tab-text"
                      ]
                    }
                  ]
                },
                {
                  "type": "tab-content",
                  "attr": {},
                  "classList": [
                    "tab-content"
                  ],
                  "children": [
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "item-container"
                      ],
                      "children": [
                        {
                          "type": "list",
                          "attr": {},
                          "classList": [
                            "todo-list"
                          ],
                          "children": [
                            {
                              "type": "block",
                              "attr": {},
                              "repeat": function () {return this.toDoList},
                              "children": [
                                {
                                  "type": "list-item",
                                  "attr": {
                                    "type": "item"
                                  },
                                  "children": [
                                    {
                                      "type": "main-page-item",
                                      "attr": {
                                        "item": function () {return this.$item},
                                        "idx": function () {return this.$idx},
                                        "type": "0"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "item-container"
                      ],
                      "children": [
                        {
                          "type": "list",
                          "attr": {},
                          "classList": [
                            "doing-list"
                          ],
                          "children": [
                            {
                              "type": "block",
                              "attr": {},
                              "repeat": function () {return this.doingList},
                              "children": [
                                {
                                  "type": "list-item",
                                  "attr": {
                                    "type": "item"
                                  },
                                  "children": [
                                    {
                                      "type": "main-page-item",
                                      "attr": {
                                        "item": function () {return this.$item},
                                        "idx": function () {return this.$idx},
                                        "type": "1"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "div",
                      "attr": {},
                      "classList": [
                        "item-container"
                      ],
                      "children": [
                        {
                          "type": "list",
                          "attr": {},
                          "classList": [
                            "done-list"
                          ],
                          "children": [
                            {
                              "type": "block",
                              "attr": {},
                              "repeat": function () {return this.doneList},
                              "children": [
                                {
                                  "type": "list-item",
                                  "attr": {
                                    "type": "item"
                                  },
                                  "children": [
                                    {
                                      "type": "main-page-item",
                                      "attr": {
                                        "item": function () {return this.$item},
                                        "idx": function () {return this.$idx},
                                        "type": "2"
                                      }
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "calender-btn"
                  ],
                  "events": {
                    "click": function (evt) { return this.openCalender('','ok','不设置',evt)}
                  }
                },
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "add-btn"
                  ],
                  "events": {
                    "click": function (evt) { return this.openInput('','ok','不设置',evt)}
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/MainPage/main-page-item.ux?uxType=comp&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/MainPage/main-page-item.ux?uxType=comp& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "item"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "shown": function () {return this.type!=2},
      "classList": [
        "uncheck-btn"
      ],
      "events": {
        "click": function (evt) { return this.markDone(this.idx,evt)}
      }
    },
    {
      "type": "div",
      "attr": {},
      "shown": function () {return this.type==2},
      "classList": [
        "checked-btn"
      ],
      "events": {
        "click": function (evt) { return this.markTodo(this.idx,evt)}
      }
    },
    {
      "type": "list",
      "attr": {},
      "shown": function () {return this.type!=2},
      "classList": [
        "micro-list"
      ],
      "children": [
        {
          "type": "list-item",
          "attr": {
            "type": "item"
          },
          "classList": [
            "micro-text"
          ],
          "events": {
            "click": function (evt) { return this.openInput(this.item.name,this.item.start,this.item.end,this.type,this.idx,evt)}
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return this.item.name}
              },
              "classList": [
                "text1"
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "time"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "date-image"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.item.end}
                  },
                  "classList": [
                    "text2"
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "list",
      "attr": {},
      "shown": function () {return this.type==2},
      "classList": [
        "micro-list-finished"
      ],
      "children": [
        {
          "type": "list-item",
          "attr": {
            "type": "item"
          },
          "classList": [
            "micro-text"
          ],
          "events": {
            "click": function (evt) { return this.openInput(this.item.name,this.item.start,this.item.end,this.type,this.idx,evt)}
          },
          "children": [
            {
              "type": "text",
              "attr": {
                "value": function () {return this.item.name}
              },
              "classList": [
                "text1-finished"
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "time"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "date-image"
                  ]
                },
                {
                  "type": "text",
                  "attr": {
                    "value": function () {return this.item.end}
                  },
                  "classList": [
                    "text2"
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=f:\\Todo_Final\\Todo&type=import!./src/MainPage/main-page-item.ux?uxType=comp&name=main-page-item":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=f:\Todo_Final\Todo&type=import!./src/MainPage/main-page-item.ux?uxType=comp&name=main-page-item ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./main-page-item.ux?uxType=comp */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/MainPage/main-page-item.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./main-page-item.ux?uxType=comp */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/MainPage/main-page-item.ux?uxType=comp")

$app_define$('@app-component/main-page-item', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./main-page-item.ux?uxType=comp& */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/MainPage/main-page-item.ux?uxType=comp&")

     $app_module$.exports.style = $app_style$
})

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************************!*\
  !*** ./src/MainPage/index.ux?uxType=page ***!
  \*******************************************/
__webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=f:\Todo_Final\Todo&type=import!./main-page-item.ux?uxType=comp&name=main-page-item */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=f:\\Todo_Final\\Todo&type=import!./src/MainPage/main-page-item.ux?uxType=comp&name=main-page-item")

var $app_style$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/MainPage/index.ux?uxType=page")

var $app_script$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\access-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\access-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/MainPage/index.ux?uxType=page")

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./index.ux?uxType=page&importNames[]=main-page-item */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/MainPage/index.ux?uxType=page&importNames[]=main-page-item")

     $app_module$.exports.style = $app_style$
})
$app_bootstrap$('@app-component/index',{ packagerVersion: "1.9.8" })
})();

/******/ })()
;
    };
    if (typeof window === "undefined") {
      return createPageHandler();
    }
    else {
      window.createPageHandler = createPageHandler
    }
  })();