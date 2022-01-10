(function(){
    
    var createPageHandler = function() {
      return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\access-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/Input/index.ux?uxType=page":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\access-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./src/Input/index.ux?uxType=page ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _service = _interopRequireDefault($app_require$("@app-module/service.asr"));

var _system = _interopRequireDefault($app_require$("@app-module/system.storage"));

var _system2 = _interopRequireDefault($app_require$("@app-module/system.vibrator"));

var _system3 = _interopRequireDefault($app_require$("@app-module/system.router"));

var _system4 = _interopRequireDefault($app_require$("@app-module/system.prompt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  private: {
    eventName: '',
    nameBackUp: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    checked: false,
    enabled: false,
    scale: '',
    task_status_text: '',
    popIdx: -1
  },
  protected: {
    pushName: '',
    pushStart: '',
    pushEnd: '',
    pushType: '',
    pushIdx: '',
    contents: [{
      content: '待办事项',
      iconPath: '/Common/todo.png'
    }, {
      content: '计划内',
      iconPath: '/Common/doing.png'
    }, {
      content: '已完成',
      iconPath: '/Common/done.png'
    }],
    placementArr: ['topLeft', 'top', 'topRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight'],
    popoverWidth: 198,
    triggerSize: [175, 69],
    offset: [0, 0],
    arrowSpace: 21
  },

  handleClick(data) {
    const {
      event,
      index
    } = data.detail;
    this.popIdx = index;
    if (index == 0) this.task_status_text = '设为待办事项';else if (index == 1) this.task_status_text = '设为计划内';else if (index == 2) this.task_status_text = '设为已完成';else this.task_status_text = '设置任务状态';
  },

  onInit() {
    this.$page.setTitleBar({
      text: '添加任务'
    });
    this.initAsr();
    this.initTime();
    this.eventName = this.pushName;
    this.popType = this.pushType;
    if (this.popType == 0) this.task_status_text = '已设为待办';else if (this.popType == 1) this.task_status_text = '已设为计划内';else if (this.popType == 2) this.task_status_text = '已设为已完成';else this.task_status_text = '设置任务状态';

    if (this.pushStart != 'ok') {
      let list2 = this.pushStart.split('&');
      this.start_date = list2[0];
      this.start_time = list2[1];
    }

    if (this.pushEnd != '不设置') {
      let list1 = this.pushEnd.split('&');
      this.end_date = list1[0];
      this.end_time = list1[1];
    }
  },

  onDestroy() {
    _service.default.close();
  },

  initTime() {
    const date = new Date();
    const Y = date.getFullYear();
    const M = date.getMonth() + 1;
    const D = date.getDate();
    const H = date.getHours();
    const m = date.getMinutes();
    this.start_date = Y + '-' + M + '-' + D;
    this.start_time = H + ':' + m;
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    const TY = date.getFullYear();
    const TM = date.getMonth() + 1;
    const TD = date.getDate();
    const TH = date.getHours();
    const Tm = date.getMinutes();
    this.end_date = "设置截止时间";
    this.end_time = TH + ':' + Tm;
  },

  initAsr() {
    let that = this;

    _service.default.init({
      fail: function () {
        that.$app.$def.makeToast('语音识别模块初始化失败！');
      }
    });

    _service.default.onpartialresult = ({
      result
    }) => {
      this.eventName = this.nameBackUp + `${result}`;
    };

    _service.default.oncompleteresult = ({
      result
    }) => {
      this.eventName = this.nameBackUp + `${result.match(/\[(.*)\]/)[1]}`;
    };

    _service.default.onerror = error => {
      this.text = `onerror: ${error}`;
    };
  },

  startAsr() {
    let that = this;
    this.scale = 'scale';
    this.nameBackUp = this.eventName;

    _service.default.start({
      success: function () {
        _system2.default.vibrate({
          mode: 'short'
        });

        _system2.default.vibrate({
          mode: 'short'
        });

        _system2.default.vibrate({
          mode: 'short'
        });
      },
      fail: function (data, code) {
        that.eventName = `start fail, code=${code}, data=${data}`;
      }
    });
  },

  endAsr() {
    let that = this;
    this.scale = 'stop';

    _service.default.stop({
      success: function () {},
      fail: function (data, code) {
        that.eventName = `stop fail, code=${code}, data=${data}`;
      }
    });
  },

  updateValue(evt) {
    this.eventName = evt.value;
  },

  addEvent() {
    if (this.eventName === '') {
      this.$app.$def.makeToast('请输入待办事项名！');
    } else if (this.popIdx === -1) {
      this.$app.$def.makeToast('请设置任务状态！');
    } else {
      let start = this.start_date + '&' + this.start_time;
      let end = this.end_date == "设置截止时间" ? '未设置' : this.end_date;
      let popType = this.popIdx;
      let that = this;

      _system.default.get({
        key: 'msg',
        success: function (data) {
          if (data != '') {
            let list = JSON.parse(data);
            if (that.pushType == 0) list.toDoList.splice(that.pushIdx, 1);else if (that.pushType == 1) list.doingList.splice(that.pushIdx, 1);else if (that.pushType == 2) list.doneList.splice(that.pushIdx, 1);

            if (popType == 0) {
              _system4.default.showToast({
                message: "已将任务添加至待办事项！"
              });

              list.toDoList.push({
                name: that.eventName,
                start: start,
                end: end
              });
            } else if (popType == 1) {
              _system4.default.showToast({
                message: "已将任务添加至计划内！"
              });

              list.doingList.push({
                name: that.eventName,
                start: start,
                end: end
              });
            } else if (popType == 2) {
              _system4.default.showToast({
                message: "已将任务添加至已完成！"
              });

              list.doneList.push({
                name: that.eventName,
                start: start,
                end: end
              });
            }

            _system.default.set({
              key: 'msg',
              value: list,
              success: function () {
                that.eventName = '';

                _system3.default.back();
              },
              fail: function (data, code) {
                that.$app.$def.makeToast(`handling fail, code = ${code}`);
              }
            });
          }
        },
        fail: function (data, code) {
          that.$app.$def.makeToast(`handling fail, code = ${code}`);
        }
      });
    }
  },

  delEvent() {
    if (this.eventName === '') {
      this.$app.$def.makeToast('任务为空，无法删除');
      return;
    }

    let that = this;

    _system.default.get({
      key: 'msg',
      success: function (data) {
        if (data != '') {
          let list = JSON.parse(data);
          if (that.pushType == 0) list.toDoList.splice(that.pushIdx, 1);else if (that.pushType == 1) list.doingList.splice(that.pushIdx, 1);else if (that.pushType == 2) list.doneList.splice(that.pushIdx, 1);

          _system.default.set({
            key: 'msg',
            value: list,
            success: function () {
              that.eventName = '';

              _system4.default.showToast({
                message: "已将任务删除！"
              });

              _system3.default.back();
            },
            fail: function (data, code) {
              that.$app.$def.makeToast(`handling fail, code = ${code}`);
            }
          });
        }
      },
      fail: function (data, code) {
        that.$app.$def.makeToast(`handling fail, code = ${code}`);
      }
    });
  },

  getStartDate(e) {
    this.start_date = e.year + '-' + (e.month + 1) + '-' + e.day;
  },

  getStartTime(e) {
    this.start_time = e.hour + ':' + e.minute;
  },

  getEndDate(e) {
    this.end_date = e.year + '年' + (e.month + 1) + '月' + e.day + '日';
  },

  getEndTime(e) {
    this.end_time = e.hour + ':' + e.minute;
  },

  turnChecked() {
    this.checked = !this.checked;
  },

  enableAsrBtn() {
    this.enabled = !this.enabled;
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

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./node_modules/qaui/src/components/icon/index.ux?uxType=comp":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./node_modules/qaui/src/components/icon/index.ux?uxType=comp ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icon = __webpack_require__(/*! ./icon */ "./node_modules/qaui/src/components/icon/icon.js");

var _default = {
  data() {
    return {
      iconMap: _icon.icons,
      ratio: 1
    };
  },

  props: {
    type: {
      default: 'empty'
    },
    size: {
      default: 14
    },
    color: {
      default: ''
    }
  },

  onInit() {
    const designWidth = this.$app.$def.manifest.config.designWidth || 750;
    this.ratio = designWidth / 360;
  },

  unescapeFontIconCode(iconCode = '') {
    let entity = '&#x' + iconCode;
    return unescape(entity.replace(/&#x/g, '%u').replace(/;/g, ''));
  }

};
exports.default = _default;}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./node_modules/qaui/src/components/popover/index.ux?uxType=comp":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./node_modules/qaui/src/components/popover/index.ux?uxType=comp ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = function __scriptModule__ (module, exports, $app_require$){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  data() {
    return {
      isMenuShow: false,
      isPress: false,
      pressKey: -1,
      arrangeDirectionClass: 'qaui-popover-wrap-menu-column',
      alignClass: 'qaui-popover-wrap-menu-center',
      arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-bottom',
      arrowBoxClass: '',
      arrowMarginStyle: {},
      isBefore: true,
      menuStyleObj: {},
      menuOffset: {
        top: 0,
        left: 0
      },
      innerArrowSpace: 10,
      ratio: 1
    };
  },

  props: {
    contents: {
      type: Array,

      default() {
        return [];
      }

    },
    placement: {
      type: String,
      default: 'bottom'
    },
    popoverWidth: {
      type: Number,
      default: 0
    },
    triggerSize: {
      type: Array,

      default() {
        return [];
      }

    },
    offset: {
      type: Array,

      default() {
        return [];
      }

    },
    arrowSpace: {
      type: Number,
      default: 10
    }
  },
  computed: {
    computedClass() {
      return idx => {
        if (idx === this.contents.length - 1) {
          return 'border-bottom-radius';
        }

        if (idx === 0) {
          return 'border-top-radius';
        }

        return '';
      };
    }

  },

  onInit() {
    const designWidth = this.$app.$def.manifest.config.designWidth || 750;
    this.ratio = designWidth / 360;
    this.menuStyleObj = {
      width: this.popoverWidth + 'px',
      height: this.contents.length * 36 * this.ratio + 'px'
    };
  },

  clickItem(ev) {
    const idx = ev.currentTarget._attr.key;
    this.$emit('menuItemTap', {
      event: ev,
      index: idx
    });
    ev.stopPropagation();
  },

  pressColor(ev) {
    this.pressKey = ev.currentTarget._attr.key;
  },

  unpressedColor(ev) {
    this.pressKey = -1;
  },

  clickTrigger(ev) {
    if (!this.isMenuShow) {
      const x = parseInt(ev.clientX) - parseInt(ev.offsetX),
            y = parseInt(ev.clientY) - parseInt(ev.offsetY);
      this.showPreviousOperations(x, y);
      this.showMenu();
    } else {
      this.hideMenu();
    }

    ev.stopPropagation();
  },

  hideMenu() {
    if (this.isMenuShow) {
      this.isMenuShow = false;
    }
  },

  showMenu() {
    if (!this.isMenuShow) {
      this.isMenuShow = true;
    }
  },

  addClass(obj) {
    this.arrangeDirectionClass = obj.arrangeDirectionClass;
    this.alignClass = obj.alignClass;
    this.arrowDirectionClass = obj.arrowDirectionClass;
  },

  computedArrowMargin(max) {
    if (this.arrowSpace < 10) {
      this.innerArrowSpace = 10;
    } else if (this.arrowSpace > max - 7) {
      this.innerArrowSpace = max - 7;
    } else if (this.arrowSpace >= 10 && this.arrowSpace <= max - 7) {
      this.innerArrowSpace = this.arrowSpace;
    }

    return this.innerArrowSpace;
  },

  showPreviousOperations(x, y) {
    const str = this.placement.toLowerCase(),
          defaultMargin = 10 * this.ratio,
          arrowHeight = 8 * this.ratio,
          menuWidth = parseInt(this.menuStyleObj.width),
          menuHeight = parseInt(this.menuStyleObj.height),
          triggerWidth = this.triggerSize[0],
          triggerHeight = this.triggerSize[1],
          offsetX = this.offset[0],
          offsetY = this.offset[1];

    switch (str) {
      case 'top':
        this.isBefore = false;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-column',
          alignClass: 'qaui-popover-wrap-menu-center',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-top'
        });
        this.arrowBoxClass = 'arrow-horizontal-size';
        this.menuOffset = {
          left: x + triggerWidth / 2 - menuWidth / 2 + offsetX + 'px',
          top: y - menuHeight - defaultMargin - arrowHeight + offsetY + 'px'
        };
        break;

      case 'topleft':
        this.isBefore = false;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-column',
          alignClass: 'qaui-popover-wrap-menu-start',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-top'
        });
        this.arrowBoxClass = 'arrow-horizontal-size';
        this.arrowMarginStyle = {
          marginLeft: this.computedArrowMargin(menuWidth / 2) + 'px'
        };
        this.menuOffset = {
          left: x + offsetX + 'px',
          top: y - menuHeight - defaultMargin - arrowHeight + offsetY + 'px'
        };
        break;

      case 'topright':
        this.isBefore = false;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-column',
          alignClass: 'qaui-popover-wrap-menu-end',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-top'
        });
        this.arrowBoxClass = 'arrow-horizontal-size';
        this.arrowMarginStyle = {
          marginRight: this.computedArrowMargin(menuWidth / 2) + 'px'
        };
        this.menuOffset = {
          left: x - menuWidth + triggerWidth + offsetX + 'px',
          top: y - menuHeight - defaultMargin - arrowHeight + offsetY + 'px'
        };
        break;

      case 'bottom':
        this.isBefore = true;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-column',
          alignClass: 'qaui-popover-wrap-menu-center',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-bottom'
        });
        this.arrowBoxClass = 'arrow-horizontal-size';
        this.menuOffset = {
          left: x + triggerWidth / 2 - menuWidth / 2 + offsetX + 'px',
          top: y + triggerHeight + defaultMargin + offsetY + 'px'
        };
        break;

      case 'bottomleft':
        this.isBefore = true;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-column',
          alignClass: 'qaui-popover-wrap-menu-start',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-bottom'
        });
        this.arrowBoxClass = 'arrow-horizontal-size';
        this.arrowMarginStyle = {
          marginLeft: this.computedArrowMargin(menuWidth / 2) + 'px'
        };
        this.menuOffset = {
          left: x + offsetX + 'px',
          top: y + triggerHeight + defaultMargin + offsetY + 'px'
        };
        break;

      case 'bottomright':
        this.isBefore = true;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-column',
          alignClass: 'qaui-popover-wrap-menu-end',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-bottom'
        });
        this.arrowBoxClass = 'arrow-horizontal-size';
        this.arrowMarginStyle = {
          marginRight: this.computedArrowMargin(menuWidth / 2) + 'px'
        };
        this.menuOffset = {
          left: x - menuWidth + triggerWidth + offsetX + 'px',
          top: y + triggerHeight + defaultMargin + offsetY + 'px'
        };
        break;

      case 'left':
        this.isBefore = false;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-row',
          alignClass: 'qaui-popover-wrap-menu-center',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-left'
        });
        this.arrowBoxClass = 'arrow-vertical-size';
        this.menuOffset = {
          left: x - menuWidth - defaultMargin - arrowHeight + offsetX + 'px',
          top: y + triggerHeight / 2 - menuHeight / 2 + offsetY + 'px'
        };
        break;

      case 'lefttop':
        this.isBefore = false;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-row',
          alignClass: 'qaui-popover-wrap-menu-start',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-left'
        });
        this.arrowBoxClass = 'arrow-vertical-size';
        this.arrowMarginStyle = {
          marginTop: this.computedArrowMargin(menuHeight / 2) + 'px'
        };
        this.menuOffset = {
          left: x - menuWidth - defaultMargin - arrowHeight + offsetX + 'px',
          top: y + offsetY + 'px'
        };
        break;

      case 'leftbottom':
        this.isBefore = false;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-row',
          alignClass: 'qaui-popover-wrap-menu-end',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-left'
        });
        this.arrowBoxClass = 'arrow-vertical-size';
        this.arrowMarginStyle = {
          marginBottom: this.computedArrowMargin(menuHeight / 2) + 'px'
        };
        this.menuOffset = {
          left: x - menuWidth - defaultMargin - arrowHeight + offsetX + 'px',
          top: y - menuHeight + triggerHeight + offsetY + 'px'
        };
        break;

      case 'right':
        this.isBefore = true;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-row',
          alignClass: 'qaui-popover-wrap-menu-center',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-right'
        });
        this.arrowBoxClass = 'arrow-vertical-size';
        this.menuOffset = {
          left: x + triggerWidth + defaultMargin + offsetX + 'px',
          top: y + triggerHeight / 2 - menuHeight / 2 + offsetY + 'px'
        };
        break;

      case 'righttop':
        this.isBefore = true;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-row',
          alignClass: 'qaui-popover-wrap-menu-start',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-right'
        });
        this.arrowBoxClass = 'arrow-vertical-size';
        this.arrowMarginStyle = {
          marginTop: this.computedArrowMargin(menuHeight / 2) + 'px'
        };
        this.menuOffset = {
          left: x + triggerWidth + defaultMargin + offsetX + 'px',
          top: y + offsetY + 'px'
        };
        break;

      case 'rightbottom':
        this.isBefore = true;
        this.addClass({
          arrangeDirectionClass: 'qaui-popover-wrap-menu-row',
          alignClass: 'qaui-popover-wrap-menu-end',
          arrowDirectionClass: 'qaui-popover-wrap-menu-arrow-right'
        });
        this.arrowBoxClass = 'arrow-vertical-size';
        this.arrowMarginStyle = {
          marginBottom: this.computedArrowMargin(menuHeight / 2) + 'px'
        };
        this.menuOffset = {
          left: x + triggerWidth + defaultMargin + offsetX + 'px',
          top: y - menuHeight + triggerHeight + offsetY + 'px'
        };
        break;

      default:
        break;
    }
  }

};
exports.default = _default;}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./node_modules/qaui/src/components/icon/index.ux?uxType=comp":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./node_modules/qaui/src/components/icon/index.ux?uxType=comp ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "@FONT-FACE": {
    "iconfont": {
      "fontFamily": "iconfont",
      "src": [
        "/node_modules/qaui/src/components/icon/icomoon.ttf"
      ],
      "fontName": "iconfont",
      "fontSrc": [
        "/node_modules/qaui/src/components/icon/icomoon.ttf"
      ]
    }
  },
  ".font-icon": {
    "fontFamily": "iconfont",
    "textAlign": "center"
  }
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./node_modules/qaui/src/components/popover/index.ux?uxType=comp":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./node_modules/qaui/src/components/popover/index.ux?uxType=comp ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  ".qaui-popover-wrap": {
    "position": "fixed",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%",
    "justifyContent": "flex-start",
    "alignItems": "flex-start"
  },
  ".qaui-popover-wrap-menu": {
    "position": "absolute"
  },
  ".qaui-popover-wrap-menu-column": {
    "flexDirection": "column"
  },
  ".qaui-popover-wrap-menu-row": {
    "flexDirection": "row"
  },
  ".qaui-popover-wrap-menu-start": {
    "alignItems": "flex-start"
  },
  ".qaui-popover-wrap-menu-center": {
    "alignItems": "center"
  },
  ".qaui-popover-wrap-menu-end": {
    "alignItems": "flex-end"
  },
  ".qaui-popover-wrap-menu .arrow-size": {
    "justifyContent": "center",
    "alignItems": "center",
    "width": "29.16666667px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "arrow-size"
        }
      ]
    }
  },
  ".qaui-popover-wrap-menu .arrow-horizontal-size": {
    "justifyContent": "center",
    "alignItems": "center",
    "width": "29.16666667px",
    "height": "16.66666667px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "arrow-horizontal-size"
        }
      ]
    }
  },
  ".qaui-popover-wrap-menu .arrow-vertical-size": {
    "justifyContent": "center",
    "alignItems": "center",
    "width": "29.16666667px",
    "height": "29.16666667px",
    "marginLeft": "-6.25px",
    "marginRight": "-6.25px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "arrow-vertical-size"
        }
      ]
    }
  },
  ".qaui-popover-wrap-menu-arrow": {
    "width": "35.41666667px",
    "height": "16.66666667px"
  },
  ".qaui-popover-wrap-menu-arrow-top": {
    "transform": "{\"rotate\":\"0deg\"}"
  },
  ".qaui-popover-wrap-menu-arrow-bottom": {
    "transform": "{\"rotate\":\"180deg\"}"
  },
  ".qaui-popover-wrap-menu-arrow-left": {
    "transform": "{\"rotate\":\"-90deg\"}"
  },
  ".qaui-popover-wrap-menu-arrow-right": {
    "transform": "{\"rotate\":\"90deg\"}"
  },
  ".qaui-popover-wrap-menu-list": {
    "flexDirection": "column",
    "borderRadius": "12.5px",
    "backgroundColor": "#ffffff"
  },
  ".qaui-popover-wrap-menu-list-box": {
    "paddingTop": "0px",
    "paddingRight": "12.5px",
    "paddingBottom": "0px",
    "paddingLeft": "12.5px"
  },
  ".qaui-popover-wrap-menu-list-box-item": {
    "width": "100%",
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "alignItems": "center",
    "height": "75px",
    "paddingTop": "18.75px",
    "paddingRight": "0px",
    "paddingBottom": "18.75px",
    "paddingLeft": "0px",
    "borderTopWidth": "2.08333333px",
    "borderTopStyle": "solid",
    "borderTopColor": "#f2f2f2"
  },
  ".qaui-popover-wrap-menu-list-box-item-image": {
    "width": "100%",
    "height": "100%"
  },
  ".qaui-popover-wrap-menu-list-box-item-icon": {
    "flexShrink": 0,
    "width": "33.33333333px",
    "height": "33.33333333px",
    "marginTop": "0px",
    "marginRight": "-2.08333333px",
    "marginBottom": "0px",
    "marginLeft": "8.33333333px"
  },
  ".qaui-popover-wrap-menu-list-box-item-content": {
    "height": "35.41666667px",
    "marginTop": "0px",
    "marginRight": "8.33333333px",
    "marginBottom": "0px",
    "marginLeft": "8.33333333px",
    "color": "#4d4d4d",
    "fontSize": "29.16666667px",
    "lineHeight": "35.41666667px",
    "lines": 1,
    "textOverflow": "ellipsis"
  },
  ".qaui-popover-wrap-menu-list-box-item .text-last": {
    "height": "37.5px",
    "lineHeight": "37.5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu-list-box-item"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "text-last"
        }
      ]
    }
  },
  ".qaui-popover-wrap-menu-list-box .no-top-border": {
    "borderTopWidth": "2.08333333px",
    "borderTopStyle": "solid",
    "borderTopColor": "rgba(0,0,0,0)",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu-list-box"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "no-top-border"
        }
      ]
    }
  },
  ".qaui-popover-wrap-menu-list .border-top-radius": {
    "borderTopLeftRadius": "12.5px",
    "borderTopRightRadius": "12.5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "border-top-radius"
        }
      ]
    }
  },
  ".qaui-popover-wrap-menu-list .border-bottom-radius": {
    "borderBottomLeftRadius": "12.5px",
    "borderBottomRightRadius": "12.5px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "border-bottom-radius"
        }
      ]
    }
  },
  ".qaui-popover-wrap-menu-list .press-color": {
    "backgroundColor": "#f2f2f2",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-wrap-menu-list"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "press-color"
        }
      ]
    }
  }
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/Input/index.ux?uxType=page":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./src/Input/index.ux?uxType=page ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  ".input-page": {
    "flexDirection": "column",
    "backgroundImage": "/Common/bg.png"
  },
  ".input-page > text": {
    "height": "200px",
    "fontSize": "50px",
    "color": "#ffffff",
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
          "v": "input-page"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".input-page .input-area": {
    "marginTop": "auto",
    "paddingLeft": "50px",
    "paddingRight": "50px",
    "flexDirection": "column",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        }
      ]
    }
  },
  ".input-page .input-area .task-area": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-area"
        }
      ]
    }
  },
  ".input-page .input-area .task-area .add-btn": {
    "width": "150px",
    "height": "80px",
    "fontSize": "35px",
    "borderRadius": "25px",
    "color": "#ffffff",
    "backgroundColor": "#473cb1",
    "alignSelf": "flex-end",
    "marginBottom": "30px",
    "marginLeft": "300px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-area"
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
  ".input-page .input-area .ddl-area": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-area"
        }
      ]
    }
  },
  ".input-page .input-area .ddl-area .ddl": {
    "fontSize": "25px",
    "color": "#000000",
    "marginTop": "5px",
    "flexWrap": "nowrap",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "ddl"
        }
      ]
    }
  },
  ".input-page .input-area .event-input": {
    "height": "100px",
    "marginTop": "60px",
    "borderRadius": "20px",
    "backgroundColor": "rgba(255,255,255,0.8)",
    "borderTopWidth": "5px",
    "borderRightWidth": "5px",
    "borderBottomWidth": "5px",
    "borderLeftWidth": "5px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "event-input"
        }
      ]
    }
  },
  ".input-page .input-area .event-input > input": {
    "flexGrow": 1,
    "paddingTop": "10px",
    "paddingRight": "30px",
    "paddingBottom": "10px",
    "paddingLeft": "30px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "event-input"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "input"
        }
      ]
    }
  },
  ".input-page .input-area .blank-space": {
    "height": "30px",
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "blank-space"
        }
      ]
    }
  },
  ".input-page .input-area .asr-area": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-area"
        }
      ]
    }
  },
  ".input-page .input-area .asr-area .asr-input": {
    "flexDirection": "row",
    "height": "70px",
    "width": "310px",
    "borderRadius": "20px",
    "marginBottom": "30px",
    "backgroundColor": "#ffffff",
    "borderTopWidth": "3px",
    "borderRightWidth": "3px",
    "borderBottomWidth": "3px",
    "borderLeftWidth": "3px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-input"
        }
      ]
    }
  },
  ".input-page .input-area .asr-area .asr-input > text": {
    "width": "250px",
    "fontSize": "30px",
    "color": "#000000",
    "textAlign": "center",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-input"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".input-page .input-area .asr-area .asr-input .asr-image": {
    "width": "40px",
    "height": "40px",
    "borderRadius": "20px",
    "marginTop": "12px",
    "marginLeft": "15px",
    "flexShrink": 0,
    "backgroundImage": "/Common/asr.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-input"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-image"
        }
      ]
    }
  },
  ".input-page .input-area .delete-image": {
    "width": "100px",
    "height": "100px",
    "borderRadius": "50px",
    "marginTop": "12px",
    "marginBottom": "30px",
    "marginLeft": "auto",
    "flexShrink": 0,
    "backgroundColor": "#fdeff2",
    "backgroundImage": "/Common/delete.png",
    "borderTopColor": "#e9dfe5",
    "borderRightColor": "#e9dfe5",
    "borderBottomColor": "#e9dfe5",
    "borderLeftColor": "#e9dfe5",
    "borderStyle": "solid",
    "borderTopWidth": "1px",
    "borderRightWidth": "1px",
    "borderBottomWidth": "1px",
    "borderLeftWidth": "1px",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "delete-image"
        }
      ]
    }
  },
  ".input-page .input-area .time-area": {
    "flexDirection": "row",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input": {
    "flexDirection": "row",
    "height": "70px",
    "width": "310px",
    "marginLeft": "30px",
    "borderRadius": "20px",
    "marginBottom": "30px",
    "backgroundColor": "#ffffff",
    "borderTopWidth": "3px",
    "borderRightWidth": "3px",
    "borderBottomWidth": "3px",
    "borderLeftWidth": "3px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input .date-image": {
    "width": "40px",
    "height": "40px",
    "marginTop": "12px",
    "marginLeft": "15px",
    "flexShrink": 0,
    "backgroundImage": "/Common/calendar.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date-image"
        }
      ]
    }
  },
  ".input-page .input-area .time-area .time-input .date-picker": {
    "width": "250px",
    "right": "50%",
    "flex": 0,
    "fontFamily": "myfont, serif",
    "color": "#000000",
    "textAlign": "center",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-input"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "date-picker"
        }
      ]
    }
  },
  ".input-page .input-area .time-area > text": {
    "width": "120px",
    "fontSize": "30px",
    "color": "#000000",
    "textAlign": "center",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "time-area"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".input-page .input-area .asr-btn": {
    "flex": 0,
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-page"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "input-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "asr-btn"
        }
      ]
    }
  },
  ".normal-text": {
    "paddingTop": "50px",
    "paddingBottom": "50px",
    "width": "250px",
    "flexWrap": "nowrap",
    "fontSize": "35px",
    "fontWeight": "bold",
    "fontFamily": "myfont, serif",
    "color": "#000000"
  },
  ".btn-check": {
    "width": "40px",
    "height": "40px",
    "marginTop": "50px",
    "marginRight": "10px",
    "marginBottom": "25px",
    "marginLeft": "225px",
    "borderRadius": "20px",
    "borderTopWidth": "2px",
    "borderRightWidth": "2px",
    "borderBottomWidth": "2px",
    "borderLeftWidth": "2px",
    "borderTopColor": "#808080",
    "borderRightColor": "#808080",
    "borderBottomColor": "#808080",
    "borderLeftColor": "#808080"
  },
  ".btn-checked": {
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "backgroundImage": "/Common/checked.png"
  },
  ".add-image": {
    "width": "50px",
    "height": "50px",
    "marginTop": "25px",
    "marginRight": "25px",
    "marginBottom": "25px",
    "marginLeft": "25px",
    "borderTopWidth": "0px",
    "borderRightWidth": "0px",
    "borderBottomWidth": "0px",
    "borderLeftWidth": "0px",
    "flexShrink": 0,
    "backgroundImage": "/Common/submit.png"
  },
  ".asr-image2": {
    "width": "40px",
    "height": "40px",
    "borderRadius": "48px",
    "flexShrink": 0,
    "backgroundImage": "/Common/asr.png"
  },
  ".asr-btn-enabled": {
    "flex": 0,
    "height": "40px",
    "width": "40px",
    "borderRadius": "20px",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "marginLeft": "15px",
    "marginTop": "12px",
    "backgroundImage": "/Common/asr_scale.png",
    "backgroundColor": "#ffffff"
  },
  ".asr-btn-disabled": {
    "flex": 0,
    "height": "40px",
    "width": "40px",
    "borderRadius": "20px",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "marginLeft": "15px",
    "marginTop": "12px",
    "backgroundImage": "/Common/asr.png",
    "backgroundColor": "#ffffff"
  },
  ".task-status-area": {
    "flexDirection": "row"
  },
  ".task-status-area .pop-change": {
    "flexDirection": "row",
    "height": "70px",
    "width": "296px",
    "borderRadius": "20px",
    "marginBottom": "30px",
    "backgroundColor": "#ffffff",
    "borderTopWidth": "3px",
    "borderRightWidth": "3px",
    "borderBottomWidth": "3px",
    "borderLeftWidth": "3px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-status-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "pop-change"
        }
      ]
    }
  },
  ".task-status-area .pop-change > text": {
    "width": "250px",
    "fontSize": "30px",
    "textAlign": "center",
    "fontFamily": "myfont, serif",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-status-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "pop-change"
        },
        {
          "t": "child"
        },
        {
          "t": "t",
          "n": "text"
        }
      ]
    }
  },
  ".task-status-area .pop-change .qaui-popover-trigger": {
    "flexDirection": "row",
    "height": "70px",
    "width": "310px",
    "borderRadius": "20px",
    "marginBottom": "30px",
    "backgroundColor": "#ffffff",
    "borderTopWidth": "3px",
    "borderRightWidth": "3px",
    "borderBottomWidth": "3px",
    "borderLeftWidth": "3px",
    "borderStyle": "solid",
    "borderTopColor": "#eef0f5",
    "borderRightColor": "#eef0f5",
    "borderBottomColor": "#eef0f5",
    "borderLeftColor": "#eef0f5",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-status-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "pop-change"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "qaui-popover-trigger"
        }
      ]
    }
  },
  ".task-status-area .pop-change .rootText": {
    "width": "248px",
    "height": "64px",
    "borderRadius": "12px",
    "fontSize": "30px",
    "color": "#000000",
    "textAlign": "center",
    "lineHeight": "69px",
    "backgroundColor": "#ffffff",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-status-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "pop-change"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "rootText"
        }
      ]
    }
  },
  ".task-status-area .pop-change .change-image": {
    "flex": 0,
    "height": "40px",
    "width": "40px",
    "borderRadius": "20px",
    "marginTop": "12px",
    "marginLeft": "15px",
    "backgroundImage": "/Common/change.png",
    "_meta": {
      "ruleDef": [
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "task-status-area"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "pop-change"
        },
        {
          "t": "d"
        },
        {
          "t": "a",
          "n": "class",
          "i": false,
          "a": "element",
          "v": "change-image"
        }
      ]
    }
  },
  ".scale": {
    "animationName": "scale",
    "animationDuration": "200ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  },
  "@KEYFRAMES": {
    "scale": [
      {
        "transform": "{\"scaleX\":1,\"scaleY\":1}",
        "time": 0
      },
      {
        "transform": "{\"scaleX\":1.35,\"scaleY\":1.35}",
        "time": 100
      }
    ],
    "stop": [
      {
        "transform": "{\"scaleX\":1.2,\"scaleY\":1.2}",
        "time": 0
      },
      {
        "transform": "{\"scaleX\":1,\"scaleY\":1}",
        "time": 100
      }
    ]
  },
  ".stop": {
    "animationName": "stop",
    "animationDuration": "100ms",
    "animationFillMode": "forwards",
    "animationTimingFunction": "linear",
    "animationIterationCount": 1
  }
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./node_modules/qaui/src/components/icon/index.ux?uxType=comp&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./node_modules/qaui/src/components/icon/index.ux?uxType=comp& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "text",
  "attr": {
    "value": function () {return this.unescapeFontIconCode(this.iconMap[this.type])}
  },
  "classList": [
    "font-icon"
  ],
  "style": {
    "fontSize": function () {return '' + (this.size*this.ratio) + 'px'},
    "color": function () {return this.color}
  }
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./node_modules/qaui/src/components/popover/index.ux?uxType=comp&importNames[]=q-icon":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./node_modules/qaui/src/components/popover/index.ux?uxType=comp&importNames[]=q-icon ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "qaui-popover"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "shown": function () {return this.isMenuShow},
      "classList": [
        "qaui-popover-wrap"
      ],
      "events": {
        "click": "hideMenu"
      },
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": function () {return ['qaui-popover-wrap-menu', this.arrangeDirectionClass, this.alignClass]},
          "style": function () {return this.menuOffset},
          "children": [
            {
              "type": "div",
              "attr": {},
              "shown": function () {return this.isBefore},
              "classList": function () {return [this.arrowBoxClass]},
              "style": function () {return this.arrowMarginStyle},
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": "/node_modules/qaui/src/common/images/arrow.png"
                  },
                  "classList": function () {return ['qaui-popover-wrap-menu-arrow', this.arrowDirectionClass]}
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "qaui-popover-wrap-menu-list"
              ],
              "style": function () {return this.menuStyleObj},
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "repeat": function () {return this.contents},
                  "classList": function () {return ['qaui-popover-wrap-menu-list-box', this.pressKey===this.$idx?'press-color':'', this.computedClass(this.$idx)]},
                  "children": [
                    {
                      "type": "div",
                      "attr": {
                        "key": function () {return this.$idx}
                      },
                      "classList": function () {return ['qaui-popover-wrap-menu-list-box-item', (this.pressKey===this.$idx-1||this.$idx===0)?'no-top-border':'']},
                      "events": {
                        "touchstart": "pressColor",
                        "touchend": "unpressedColor",
                        "click": "clickItem"
                      },
                      "children": [
                        {
                          "type": "div",
                          "attr": {},
                          "shown": function () {return this.$item.iconPath||this.$item.icon},
                          "classList": [
                            "qaui-popover-wrap-menu-list-box-item-icon"
                          ],
                          "children": [
                            {
                              "type": "image",
                              "attr": {
                                "src": function () {return this.$item.iconPath}
                              },
                              "shown": function () {return this.$item.iconPath&&!this.$item.icon},
                              "classList": [
                                "qaui-popover-wrap-menu-list-box-item-image"
                              ]
                            },
                            {
                              "type": "q-icon",
                              "attr": {
                                "type": function () {return this.$item.icon.type||'performance-mode-fill'},
                                "size": "16",
                                "color": function () {return this.$item.icon.color}
                              },
                              "shown": function () {return this.$item.icon}
                            }
                          ]
                        },
                        {
                          "type": "text",
                          "attr": {
                            "value": function () {return this.$item.content}
                          },
                          "classList": function () {return ['qaui-popover-wrap-menu-list-box-item-content', this.$idx===this.contents.length-1?'text-last':'']}
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
              "shown": function () {return !this.isBefore},
              "classList": function () {return [this.arrowBoxClass]},
              "style": function () {return this.arrowMarginStyle},
              "children": [
                {
                  "type": "image",
                  "attr": {
                    "src": "/node_modules/qaui/src/common/images/arrow.png"
                  },
                  "classList": function () {return ['qaui-popover-wrap-menu-arrow', this.arrowDirectionClass]}
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
        "qaui-popover-trigger"
      ],
      "events": {
        "click": "clickTrigger"
      },
      "children": [
        {
          "type": "slot",
          "attr": {
            "name": "trigger"
          }
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/Input/index.ux?uxType=page&importNames[]=q-popover":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./src/Input/index.ux?uxType=page&importNames[]=q-popover ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {
  "type": "div",
  "attr": {},
  "classList": [
    "input-page"
  ],
  "children": [
    {
      "type": "div",
      "attr": {},
      "classList": [
        "input-area"
      ],
      "children": [
        {
          "type": "div",
          "attr": {},
          "classList": [
            "event-input"
          ],
          "children": [
            {
              "type": "input",
              "attr": {
                "type": "text",
                "placeholder": "添加任务",
                "value": function () {return this.eventName}
              },
              "events": {
                "change": "updateValue"
              }
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "add-image"
              ],
              "events": {
                "click": "addEvent"
              }
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "blank-space"
          ],
          "children": [
            {
              "type": "text",
              "attr": {}
            }
          ]
        },
        {
          "type": "div",
          "attr": {},
          "classList": [
            "asr-area"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "asr-input"
              ],
              "events": {
                "touchstart": "startAsr",
                "touchend": "endAsr"
              },
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": function () {return ['asr-btn', this.scale, this.enabled?'asr-btn-enabled':'asr-btn-disabled']}
                },
                {
                  "type": "text",
                  "attr": {
                    "value": "长按语音输入"
                  }
                }
              ]
            },
            {
              "type": "div",
              "attr": {},
              "classList": [
                "time-area"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "time-input"
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
                      "type": "picker",
                      "attr": {
                        "type": "date",
                        "value": function () {return this.end_date}
                      },
                      "classList": [
                        "date-picker"
                      ],
                      "events": {
                        "change": "getEndDate"
                      }
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
            "task-status-area"
          ],
          "children": [
            {
              "type": "div",
              "attr": {},
              "classList": [
                "pop-change"
              ],
              "children": [
                {
                  "type": "div",
                  "attr": {},
                  "classList": [
                    "change-image"
                  ]
                },
                {
                  "type": "q-popover",
                  "attr": {
                    "id": "popoverText",
                    "contents": function () {return this.contents},
                    "placement": function () {return this.placementArr[1]},
                    "popoverWidth": function () {return this.popoverWidth},
                    "triggerSize": function () {return this.triggerSize},
                    "offset": function () {return this.offset},
                    "arrowSpace": function () {return this.arrowSpace}
                  },
                  "id": "popoverText",
                  "events": {
                    "menu-item-tap": "handleClick"
                  },
                  "children": [
                    {
                      "type": "text",
                      "attr": {
                        "slot": "trigger",
                        "value": function () {return this.task_status_text}
                      },
                      "classList": [
                        "rootText"
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
                "delete-image"
              ],
              "events": {
                "click": "delEvent"
              }
            }
          ]
        }
      ]
    }
  ]
}

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=f:\\Todo_Final\\Todo&type=import!./node_modules/qaui/src/components/icon/index.ux?uxType=comp&name=q-icon":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=f:\Todo_Final\Todo&type=import!./node_modules/qaui/src/components/icon/index.ux?uxType=comp&name=q-icon ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


var $app_style$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./node_modules/qaui/src/components/icon/index.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./node_modules/qaui/src/components/icon/index.ux?uxType=comp")

$app_define$('@app-component/q-icon', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./index.ux?uxType=comp& */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./node_modules/qaui/src/components/icon/index.ux?uxType=comp&")

     $app_module$.exports.style = $app_style$
})

/***/ }),

/***/ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=f:\\Todo_Final\\Todo&type=import!./node_modules/qaui/src/components/popover/index.ux?uxType=comp&name=q-popover":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=f:\Todo_Final\Todo&type=import!./node_modules/qaui/src/components/popover/index.ux?uxType=comp&name=q-popover ***!
  \************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=f:\Todo_Final\Todo&type=import!../icon/index.ux?uxType=comp&name=q-icon */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=f:\\Todo_Final\\Todo&type=import!./node_modules/qaui/src/components/icon/index.ux?uxType=comp&name=q-icon")

var $app_style$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./index.ux?uxType=comp */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./node_modules/qaui/src/components/popover/index.ux?uxType=comp")

var $app_script$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./index.ux?uxType=comp */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./node_modules/qaui/src/components/popover/index.ux?uxType=comp")

$app_define$('@app-component/q-popover', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./index.ux?uxType=comp&importNames[]=q-icon */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./node_modules/qaui/src/components/popover/index.ux?uxType=comp&importNames[]=q-icon")

     $app_module$.exports.style = $app_style$
})

/***/ }),

/***/ "./node_modules/qaui/src/components/icon/icon.js":
/*!*******************************************************!*\
  !*** ./node_modules/qaui/src/components/icon/icon.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.icons = void 0;
const icons = {
  'qrcode-fill': 'e918',
  'barcode-fill': 'e919',
  'secure-pay-fill': 'e91a',
  'tag-fill': 'e91b',
  'ticket-fill': 'e91c',
  'bookkeeping-fill': 'e91d',
  'bill-fill': 'e91e',
  'shopping-cart-fill': 'e91f',
  qrcode: 'e920',
  barcode: 'e921',
  'secure-pay': 'e922',
  tag: 'e923',
  ticket: 'e924',
  bookkeeping: 'e925',
  bill: 'e926',
  'shopping-cart': 'e927',
  'sim-1-fill': 'e928',
  'sim-2-fill': 'e929',
  'sim-fill': 'e92a',
  'theme-sms-fill': 'e92b',
  'hang-on-fill': 'e92c',
  'intercept-sms-fill': 'e92d',
  'aggregate-info-fill': 'e92e',
  'reply-all-fill': 'e92f',
  'recent-contact-fill': 'e930',
  'delete-contact-fill': 'e931',
  'send-fill': 'e932',
  'cancel-group-fill': 'e933',
  'call-forwarding-fill': 'e934',
  'reply-fill': 'e935',
  'restore-sms-fill': 'e936',
  'restore-call-records-fill': 'e937',
  'my-contact-fill': 'e938',
  'reject-mail-fill': 'e939',
  'dial-fill': 'e93a',
  'hang-up-fill': 'e93b',
  'revoke-fill': 'e93c',
  'inbox-fill': 'e93d',
  'unread-mail-fill': 'e93e',
  'mark-number-fill': 'e93f',
  'switch-card-fill': 'e940',
  'add-contact-fill': 'e941',
  'message-fill': 'e942',
  'video-off-fill': 'e943',
  'video-on-fill': 'e944',
  'remove-member-fill': 'e945',
  'group-fill': 'e946',
  'group-chat-fill': 'e947',
  'contact-fill': 'e948',
  'calling-fill': 'e949',
  'louder-call-fill': 'e94a',
  'call-secretary-fill': 'e94b',
  'call-records-fill': 'e94c',
  'mail-fill': 'e94d',
  'umbrella-fill': 'e94e',
  'blacklist-fill': 'e94f',
  'sim-1': 'e950',
  'sim-2': 'e951',
  sim: 'e952',
  'theme-sms': 'e953',
  'hang-on': 'e954',
  'intercept-sms': 'e955',
  'aggregate-info': 'e956',
  'reply-all': 'e957',
  'recent-contact': 'e958',
  'delete-contact': 'e959',
  send: 'e95a',
  'cancel-group': 'e95b',
  'call-forwarding': 'e95c',
  reply: 'e95d',
  'restore-sms': 'e95e',
  'restore-call-records': 'e95f',
  'my-contact': 'e960',
  'reject-mail': 'e961',
  dial: 'e962',
  'hang-up': 'e963',
  revoke: 'e964',
  inbox: 'e965',
  'unread-mail': 'e966',
  'mark-number': 'e967',
  'switch-card': 'e968',
  'add-contact': 'e969',
  message: 'e96a',
  'video-off': 'e96b',
  'video-on': 'e96c',
  'remove-member': 'e96d',
  group: 'e96e',
  'group-chat': 'e96f',
  contact: 'e970',
  calling: 'e971',
  'louder-call': 'e972',
  'call-secretary': 'e973',
  'call-records': 'e974',
  mail: 'e975',
  umbrella: 'e976',
  blacklist: 'e977',
  'usb-fill': 'e978',
  'wifi-forget-fill': 'e979',
  'wifi-disconnect-fill': 'e97a',
  'wifi-link-fill': 'e97b',
  'wifi-lock-fill': 'e97c',
  'wifi-fill': 'e97d',
  'scan-fill': 'e980',
  'bluetooth-off-fill': 'e983',
  'bluetooth-fill': 'e984',
  'bluetooth-network-fill': 'e985',
  'flight-mode-fill': 'e986',
  usb: 'e987',
  'wifi-forget': 'e988',
  'wifi-disconnect': 'e989',
  'wifi-link': 'e98a',
  'wifi-lock': 'e98b',
  wifi: 'e98c',
  'stop-casting': 'e98d',
  scan: 'e98e',
  casting: 'e98f',
  'bluetooth-off': 'e990',
  bluetooth: 'e991',
  'bluetooth-network': 'e992',
  'flight-mode': 'e993',
  'strongbox-fill': 'e994',
  'memory-card-fill': 'e995',
  'office-bag-fill': 'e996',
  'printer-fill': 'e999',
  'key-fill': 'e99e',
  'keyboard-fill': 'e99f',
  'mouse-fill': 'e9a0',
  strongbox: 'e9a1',
  'memory-card': 'e9a2',
  'office-bag': 'e9a3',
  ppt: 'e9a4',
  printer: 'e9a5',
  tv: 'e9a6',
  laptop: 'e9a7',
  key: 'e9a8',
  keyboard: 'e9a9',
  mouse: 'e9aa',
  'dlan-fill': 'e9ab',
  'jovi-fill': 'e9ac',
  'nfc-fill': 'e9ad',
  'switch-phone-fill': 'e9ae',
  'topic-fill': 'e9af',
  'homepage-fill': 'e9b0',
  'theme-fill': 'e9b1',
  'events-fill': 'e9b2',
  'cloud-service-fill': 'e9b3',
  'brightness-fill': 'e9b4',
  'today-fill': 'e9b5',
  'low-battery-fill': 'e9b6',
  'memo-fill': 'e9b7',
  'full-view-fill': 'e9b8',
  'shutdown-fill': 'e9b9',
  'split-screen-fill': 'e9ba',
  'category-fill': 'e9bb',
  'multi-select-fill': 'e9bc',
  'do-not-disturb-fill': 'e9bd',
  'card-recommend-fill': 'e9be',
  'card-manage-fill': 'e9bf',
  'feedback-fill': 'e9c2',
  'other-screen-fill': 'e9c3',
  'background-fill': 'e9c4',
  'shop-fill': 'e9c5',
  'scenes-fill': 'e9c6',
  'wallpaper-fill': 'e9c7',
  'outlook-fill': 'e9c8',
  'weather-fill': 'e9c9',
  'secure-fill': 'e9ca',
  't-shirt-fill': 'e9cb',
  'grid-view-fill': 'e9cc',
  'recording-fill': 'e9cd',
  'wechat-fill': 'e9ce',
  'fast-charge-fill': 'e9cf',
  'performance-mode-fill': 'e9d0',
  'floating-ball-fill': 'e9d1',
  'my-expression-fill': 'e9d2',
  'screenshot-fill': 'e9d3',
  'flashlight-off-fill': 'e9d4',
  'flashlight-on-fill': 'e9d5',
  'compass-fill': 'e9d6',
  'fingerprint-fill': 'e9d7',
  'top-list-fill': 'e9d8',
  'control-center-fill': 'e9d9',
  'recommend-fill': 'e9da',
  'motor-mode-fill': 'e9db',
  'radio-fill': 'e9dc',
  'digital-health-fill': 'e9dd',
  'new-memo-fill': 'e9de',
  'accessible-operation-fill': 'e9df',
  'calendar-fill': 'e9e0',
  'schedule-fill': 'e9e1',
  'month-view-fill': 'e9e2',
  'browser-fill': 'e9e8',
  'dark-mode-fill': 'e9e9',
  'game-fill': 'e9ea',
  'game-data-fill': 'e9eb',
  'ebook-fill': 'e9ec',
  'rect-screenshot-fill': 'e9ed',
  'skills-fill': 'e9ee',
  'brush-fill': 'e9ef',
  'manage-fill': 'e9f0',
  'gourmet-fill': 'e9f1',
  'translate-fill': 'e9f2',
  'auto-brightness-fill': 'e9f5',
  'unlock-fill': 'e9f6',
  'tap-fill': 'e9f7',
  'calculator-fill': 'e9f8',
  'recognize-things-fill': 'e9f9',
  'power-saving-fill': 'e9fa',
  'interest-fill': 'e9fb',
  'notification-off-fill': 'e9fe',
  'notification-on-fill': 'e9ff',
  'config-fill': 'ea00',
  'restart-fill': 'ea01',
  'lock-fill': 'ea02',
  'long-screenshot-fill': 'ea03',
  'view-picture-fill': 'ea04',
  'music-fill': 'ea05',
  'color-fill': 'ea06',
  'home-fill': 'ea07',
  'drive-mode-fill': 'ea08',
  dlan: 'ea09',
  jovi: 'ea0a',
  nfc: 'ea0b',
  'switch-phone': 'ea0c',
  topic: 'ea0d',
  homepage: 'ea0e',
  theme: 'ea0f',
  events: 'ea10',
  'cloud-service': 'ea11',
  brightness: 'ea12',
  today: 'ea13',
  'low-battery': 'ea14',
  memo: 'ea15',
  'full-view': 'ea16',
  shutdown: 'ea17',
  'split-screen': 'ea18',
  category: 'ea19',
  'multi-select': 'ea1a',
  'do-not-disturb': 'ea1b',
  'card-recommend': 'ea1c',
  'card-manage': 'ea1d',
  reverse: 'ea1e',
  feedback: 'ea1f',
  'other-screen': 'ea20',
  background: 'ea21',
  shop: 'ea22',
  scenes: 'ea23',
  wallpaper: 'ea24',
  outlook: 'ea25',
  weather: 'ea26',
  secure: 'ea27',
  't-shirt': 'ea28',
  'grid-view': 'ea29',
  recording: 'ea2a',
  wechat: 'ea2b',
  'fast-charge': 'ea2c',
  'performance-mode': 'ea2d',
  'floating-ball': 'ea2e',
  'my-expression': 'ea2f',
  screenshot: 'ea30',
  'flashlight-off': 'ea31',
  'flashlight-on': 'ea32',
  compass: 'ea33',
  fingerprint: 'ea34',
  'top-list': 'ea35',
  'control-conter': 'ea36',
  recommend: 'ea37',
  'motor-mode': 'ea38',
  radio: 'ea39',
  'digital-health': 'ea3a',
  'new-memo': 'ea3b',
  'assessible-operation': 'ea3c',
  calendar: 'ea3d',
  schedule: 'ea3e',
  'month-view': 'ea3f',
  'positive-screen-1': 'ea40',
  'positive-screen-2': 'ea41',
  browser: 'ea42',
  'dark-mode': 'ea43',
  game: 'ea44',
  'game-data': 'ea45',
  ebook: 'ea46',
  'rect-screenshot': 'ea47',
  skills: 'ea48',
  brush: 'ea49',
  manage: 'ea4a',
  gourmet: 'ea4b',
  translate: 'ea4c',
  backsides: 'ea4d',
  'auto-brightness': 'ea4e',
  unlock: 'ea4f',
  tap: 'ea50',
  caculator: 'ea51',
  'recognize-things': 'ea52',
  'power-saving': 'ea53',
  interest: 'ea54',
  remote: 'ea55',
  'notification-off': 'ea56',
  'notification-on': 'ea57',
  config: 'ea58',
  restart: 'ea59',
  lock: 'ea5a',
  'long-screenshot': 'ea5b',
  'view-picture': 'ea5c',
  music: 'ea5d',
  color: 'ea5e',
  home: 'ea5f',
  'drive-mode': 'ea60',
  'previous-step-fill': 'ea62',
  'upload-fill': 'ea63',
  'next-step-fill': 'ea64',
  'download-fill': 'ea65',
  'save-fill': 'ea66',
  'close-circle-fill': 'ea67',
  'share-fill': 'ea68',
  'diversion-fill': 'ea69',
  'list-fill': 'ea6a',
  'delete-fill': 'ea6b',
  'refresh-fill': 'ea6c',
  'forward-arrow-fill': 'ea6d',
  'manual-fill': 'ea6e',
  'check-fill': 'ea6f',
  'history-fill': 'ea70',
  'combine-fill': 'ea71',
  'help-fill': 'ea72',
  'drag-fill': 'ea73',
  'sort-fill': 'ea74',
  'search-fill': 'ea75',
  'shrink-fill': 'ea76',
  'rotate-fill': 'ea77',
  'more-fill': 'ea78',
  'menu-fill': 'ea79',
  'plus-fill': 'ea7a',
  'add-fill': 'ea7b',
  'clear-fill': 'ea7c',
  'move-fill': 'ea7d',
  'move-in-fill': 'ea7e',
  'remove-fill': 'ea7f',
  'edit-fill': 'ea80',
  'adjust-fill': 'ea81',
  'move-out-fill': 'ea82',
  'setting-fill': 'ea83',
  'info-fill': 'ea84',
  'backward-fill': 'ea85',
  'backward-arrow-fill': 'ea86',
  'exit-fill': 'ea87',
  'choose-fill': 'ea88',
  'previous-step': 'ea89',
  upload: 'ea8a',
  'next-step': 'ea8b',
  download: 'ea8c',
  save: 'ea8d',
  close: 'ea8e',
  'close-circle': 'ea8f',
  share: 'ea90',
  diversion: 'ea91',
  list: 'ea92',
  delete: 'ea93',
  refresh: 'ea94',
  'forward-arrow': 'ea95',
  'forward-arrow-circle': 'ea96',
  manual: 'ea97',
  check: 'ea98',
  history: 'ea99',
  combine: 'ea9a',
  help: 'ea9c',
  drag: 'ea9d',
  sort: 'ea9e',
  search: 'ea9f',
  shrink: 'eaa0',
  rotate: 'eaa1',
  more: 'eaa2',
  menu: 'eaa3',
  plus: 'eaa4',
  add: 'eaa5',
  clear: 'eaa6',
  move: 'eaa7',
  'move-in': 'eaa8',
  remove: 'eaa9',
  edit: 'eaab',
  adjust: 'eaac',
  'move-out': 'eaad',
  setting: 'eaae',
  info: 'eaaf',
  backward: 'eab0',
  'backward-arrow': 'eab1',
  exit: 'eab2',
  'world-clock-fill': 'eab4',
  'time-fill': 'eab5',
  'stopwatch-fill': 'eab6',
  'timing-fill': 'eab7',
  'timer-fill': 'eab8',
  'clock-fill': 'eab9',
  'clock-off-fill': 'eaba',
  'wold-clock': 'eabb',
  time: 'eabc',
  stopwatch: 'eabd',
  timing: 'eabf',
  clock: 'eac0',
  'clock-off': 'eac1',
  'invisible-fill': 'eac2',
  'cut-fill': 'eac3',
  'copy-fill': 'eac4',
  'font-size-fill': 'eac5',
  'text-fill': 'eac6',
  'visible-fill': 'eac7',
  'paste-fill': 'eac8',
  'link-fill': 'eac9',
  'attachment-fill': 'eaca',
  invisible: 'eacb',
  cut: 'eacc',
  copy: 'eacd',
  'font-size': 'eace',
  text: 'eacf',
  visible: 'ead0',
  paste: 'ead1',
  link: 'ead2',
  attachment: 'ead3',
  'transport-fill': 'ead4',
  'archive-fill': 'ead5',
  'backup-fill': 'ead6',
  'file-fill': 'ead7',
  'file-transfer-fill': 'ead8',
  'document-fill': 'ead9',
  'add-folder-fill': 'eada',
  transport: 'eadb',
  archive: 'eadc',
  backup: 'eadd',
  file: 'eade',
  'file-transfer': 'eadf',
  document: 'eae0',
  'add-folder': 'eae1',
  'image-fill': 'eae2',
  'scanner-fill': 'eae3',
  'scan-card-fill': 'eae4',
  'scan-shopping-fill': 'eae5',
  'take-photo-fill': 'eae6',
  'alipay-scan-fill': 'eae7',
  'ar-scan-fill': 'eae8',
  'picture-scan-fill': 'eae9',
  'switch-camera-fill': 'eaec',
  'video-compression-fill': 'eaed',
  'beautify-fill': 'eaee',
  'top-recognize-fill': 'eaef',
  'face-recognize-fill': 'eaf0',
  image: 'eaf1',
  scanner: 'eaf2',
  'scan-card': 'eaf3',
  'scan-shopping': 'eaf4',
  'take-photo': 'eaf5',
  'alipay-scan': 'eaf6',
  'ar-scan': 'eaf7',
  'picture-scan': 'eaf8',
  'switch-camera': 'eafb',
  'video-compression': 'eafc',
  beautify: 'eafd',
  'top-recognize': 'eafe',
  'face-recognize': 'eaff',
  'full-screen-fill': 'eb00',
  'disk-fill': 'eb01',
  'noise-fill': 'eb02',
  'screen-record-fill': 'eb03',
  'play-fill': 'eb04',
  'exit-full-screen-fill': 'eb05',
  'pause-fill': 'eb06',
  'picture-in-picture-fill': 'eb07',
  'video-fill': 'eb08',
  'audio-fill': 'eb09',
  'full-screen': 'eb0a',
  disk: 'eb0b',
  noise: 'eb0c',
  'screen-record': 'eb0d',
  play: 'eb0e',
  'exit-full-screen': 'eb0f',
  pause: 'eb10',
  'picture-in-picture': 'eb11',
  video: 'eb12',
  audio: 'eb13',
  'location-fill': 'eb14',
  'navigator-fill': 'eb15',
  location: 'eb16',
  navigator: 'eb17',
  'volume-off-fill': 'eb18',
  'volume-on-fill': 'eb19',
  'voice-off-fill': 'eb1a',
  'voice-on-fill': 'eb1b',
  'voice-broadcast-off-fill': 'eb1c',
  'voice-broadcast-on-fill': 'eb1d',
  'ring-fill': 'eb1e',
  'ring-off-fill': 'eb1f',
  'vibrate-fill': 'eb20',
  'volume-down-fill': 'eb21',
  'volume-up-fill': 'eb22',
  'vlolume-off': 'eb23',
  'volume-on': 'eb24',
  'voice-off': 'eb25',
  'voice-on': 'eb26',
  'voice-broadcast-on-off': 'eb27',
  'voice-broadcast-on': 'eb28',
  ring: 'eb29',
  'ring-off': 'eb2a',
  vibrate: 'eb2b',
  'volume-down': 'eb2c',
  'volume-up': 'eb2d',
  'dislove-fill': 'e900',
  'love-fill': 'e901',
  'pinned-fill': 'e902',
  'favorate-fill': 'e903',
  'flag-fill': 'e904',
  'flow-fill': 'e905',
  'like-fill': 'e906',
  'heat-fill': 'e907',
  'crown-fill': 'e908',
  'red-packet-fill': 'e909',
  'back-to-top-fill': 'e90a',
  'filter-fill': 'e90b',
  dislove: 'e90c',
  love: 'e90d',
  pinned: 'e90e',
  favorite: 'e90f',
  flag: 'e910',
  flow: 'e911',
  like: 'e912',
  heat: 'e913',
  crown: 'e914',
  'red-packet': 'e915',
  'back-to-top': 'e916',
  filter: 'e917'
};
exports.icons = icons;

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
/*!****************************************!*\
  !*** ./src/Input/index.ux?uxType=page ***!
  \****************************************/
__webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\ux-loader.js?cwd=f:\Todo_Final\Todo&type=import!../../node_modules/qaui/src/components/popover/index.ux?uxType=comp&name=q-popover */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\ux-loader.js?cwd=f:\\Todo_Final\\Todo&type=import!./node_modules/qaui/src/components/popover/index.ux?uxType=comp&name=q-popover")

var $app_style$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\style-loader.js?index=0&type=style!less-loader!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=style!./index.ux?uxType=page */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\style-loader.js?index=0&type=style!./node_modules/less-loader/dist/cjs.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=style!./src/Input/index.ux?uxType=page")

var $app_script$ = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\script-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\module-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\babel-loader\lib\index.js?cwd=f:\Todo_Final\Todo&cacheDirectory&plugins[]=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\babel-plugin-jsx.js&comments=false&configFile=d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\packager\babel.config.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\access-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=script!./index.ux?uxType=page */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\script-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\module-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\babel-loader\\lib\\index.js?cwd=f:\\Todo_Final\\Todo&cacheDirectory&plugins[]=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\babel-plugin-jsx.js&comments=false&configFile=d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\packager\\babel.config.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\access-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=script!./src/Input/index.ux?uxType=page")

$app_define$('@app-component/index', [], function($app_require$, $app_exports$, $app_module$) {
     $app_script$($app_module$, $app_exports$, $app_require$)
         if ($app_exports$.__esModule && $app_exports$.default) {
            $app_module$.exports = $app_exports$.default
        }
     $app_module$.exports.template = __webpack_require__(/*! !d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\template-loader.js!d:\Quick App IDE\resources\app\extensions\hap-debugger\node_modules.asar\@hap-toolkit\dsl-xvm\lib\loaders\fragment-loader.js?index=0&type=template!./index.ux?uxType=page&importNames[]=q-popover */ "d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\template-loader.js!d:\\Quick App IDE\\resources\\app\\extensions\\hap-debugger\\node_modules.asar\\@hap-toolkit\\dsl-xvm\\lib\\loaders\\fragment-loader.js?index=0&type=template!./src/Input/index.ux?uxType=page&importNames[]=q-popover")

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