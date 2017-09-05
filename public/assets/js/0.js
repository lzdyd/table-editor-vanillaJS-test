webpackJsonp_name_([0],Array(30).concat([
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tableControllers = __webpack_require__(35);

var _tableControllers2 = _interopRequireDefault(_tableControllers);

var _tableRows = __webpack_require__(38);

var _tableRows2 = _interopRequireDefault(_tableRows);

var _table = __webpack_require__(41);

var _table2 = _interopRequireDefault(_table);

var _modalBox = __webpack_require__(42);

var _modalBox2 = _interopRequireDefault(_modalBox);

__webpack_require__(43);

__webpack_require__(44);

var _getData = __webpack_require__(45);

var _getData2 = _interopRequireDefault(_getData);

var _sortData = __webpack_require__(46);

var _sortData2 = _interopRequireDefault(_sortData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tableData = void 0;
var tempTableData = void 0;
var selectedTableRow = void 0;
var selectedTableCell = void 0;
var showConfirmingModalBoxAnswer = void 0;
var lastId = void 0;
var sortedColumn = void 0;

var tableHTMLTag = document.registerElement('table-editor', {
  prototype: Object.create(HTMLElement.prototype)
});

var newHTMLTags = [tableHTMLTag];

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.events = {};
  }

  _createClass(EventEmitter, [{
    key: 'emit',
    value: function emit(eventName, data) {
      var event = this.events[eventName];
      if (event) {
        event.forEach(function (fn) {
          fn.call(null, data);
        });
      }
    }
  }, {
    key: 'subscribe',
    value: function subscribe(eventName, fn) {
      var _this = this;

      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }

      this.events[eventName].push(fn);

      return function () {
        _this.events[eventName] = _this.events[eventName].filter(function (eventFn) {
          return fn !== eventFn;
        });
      };
    }
  }]);

  return EventEmitter;
}();

var Table = function () {
  function Table() {
    var _this2 = this;

    _classCallCheck(this, Table);

    this.elem = document.createElement('div');
    this.elem.className = 'table';

    this.elem.innerHTML = (0, _table2.default)();

    // Because of the promise in get-data.js
    setTimeout(function () {
      tableData = (0, _getData2.default)();
      tempTableData = tableData;
      _this2.renderTableRowsHTML();
    }, 20);

    newHTMLTags.forEach(function (Item) {
      return _this2.elem.insertBefore(new Item(), _this2.elem.lastElementChild);
    });

    var tableControllers = new _tableControllers2.default();
    this.elem.getElementsByTagName('table-editor')[0].appendChild(tableControllers.elem);

    // Add row button
    this.addRowBtn = this.elem.querySelector('#add-row');
    this.addRowBtn.addEventListener('click', function () {
      if (selectedTableRow) {
        var index = Array.prototype.indexOf.call(selectedTableRow.parentNode.children, selectedTableRow);
        _this2.showConfirmingModalBox(index - 1);
      } else {
        _this2.addEmptyRow();
      }
    });

    // Delete row button
    this.deleteRowBtn = this.elem.querySelector('#delete-row');
    this.deleteRowBtn.addEventListener('click', function () {
      if (selectedTableRow) {
        var selectedRowId = selectedTableRow.firstElementChild.value;
        _this2.deleteRow(selectedRowId);
      }
    });

    // Saves value of selected table cell
    this.elem.addEventListener('focus', function (e) {
      if (e.target.classList.contains('table-cell-data')) {
        selectedTableCell = e.target.firstChild.data;
      } else {
        selectedTableCell = null;
      }
    }, true);

    // Updates tableData when table cell loses focus
    // if table cell was changed
    this.elem.addEventListener('blur', function (e) {
      if (e.target.classList.contains('table-cell-data')) {
        if (e.target.firstChild.data !== selectedTableCell) {
          _this2.updateTableData(e);
        }
      }
    }, true);

    // Sorts data
    this.sortDataBtns = this.elem.querySelectorAll('.table-header');
    this.sortDataBtnsArray = Array.from(this.sortDataBtns);

    this.sortDataBtnsArray.forEach(function (item) {
      item.addEventListener('click', function () {
        var sortedData = (0, _sortData2.default)(tableData, item.id, item.dataset.sortState);
        _this2.renderSortedTableRowsHTML(sortedData.people);
        _this2.changeTableHeaderState(sortedData.sortState);
      });
    });

    // Highlights table row onclick
    document.body.addEventListener('click', function (e) {
      if (e.target.parentNode.classList.contains('table-row-data')) {
        _this2.highlightTableRow(e.target.parentNode);
      } else if (!e.target.parentNode.classList.contains('table-controllers-buttons')) {
        _this2.removeHighlightTableRow();
      }
    });

    // Prevents line-breaking from pressing Enter
    this.elem.addEventListener('keypress', function (e) {
      if (e.target.classList.contains('table-cell-data')) {
        if (e.which === 13) {
          e.preventDefault();
        }
      }
    });
  }

  _createClass(Table, [{
    key: 'renderTableRowsHTML',
    value: function renderTableRowsHTML() {
      var tableRowsElems = new _tableRows2.default(tableData).elem.querySelectorAll('.table-row');
      var tableRowsArray = Array.from(tableRowsElems);

      var tableRowsContainer = this.elem.querySelector('#main-table');

      tableRowsArray.forEach(function (item) {
        tableRowsContainer.appendChild(item);
      });

      lastId = tableRowsArray[tableRowsArray.length - 1].firstElementChild.value;
    }
  }, {
    key: 'renderSortedTableRowsHTML',
    value: function renderSortedTableRowsHTML(sortedData) {
      var tableRowsContainer = this.elem.querySelector('#main-table');
      var tableRows = Array.from(tableRowsContainer.querySelectorAll('.table-row-data'));

      tableRows.forEach(function (item, i) {
        var itemChildrenArray = Array.from(item.children);

        itemChildrenArray.forEach(function (childItem) {
          if (childItem.tagName === 'INPUT') {
            childItem.value = sortedData[i].id;
          } else {
            childItem.firstChild.data = sortedData[i][childItem.getAttribute('data-field')];
          }
        });
      });
    }
  }, {
    key: 'changeTableHeaderState',
    value: function changeTableHeaderState(data) {
      var currentSortedColumn = this.elem.querySelector('#' + data.sortFieldId);
      currentSortedColumn.setAttribute('data-sort-state', data.currentSortState);

      if (sortedColumn) {
        sortedColumn.classList.remove('sorted-column');
        sortedColumn = currentSortedColumn;
        currentSortedColumn.classList.add('sorted-column');
      } else {
        sortedColumn = currentSortedColumn;
        sortedColumn.classList.add('sorted-column');
      }
    }
  }, {
    key: 'updateTableData',
    value: function updateTableData(e) {
      var id = e.target.parentNode.firstElementChild.value;
      var newValue = e.target.firstChild.data;
      var field = e.target.getAttribute('data-field');

      //tableData[id][field] = newValue;

      // TODO: rewrite using Object.keys
      for (var key in tableData) {
        if (tableData[key].id === id) {
          tableData[key][field] = newValue;
          break;
        }
      }
    }
  }, {
    key: 'addEmptyRow',
    value: function addEmptyRow(options) {
      lastId = +lastId + 1;
      var emptyRow = {
        id: JSON.stringify(lastId),
        name: ' ',
        age: ' ',
        city: ' '
      };
      if (options) {
        switch (options.pos) {
          case 'insert-before':
            tableData.splice(options.id, 0, emptyRow);
            this.renderNewEmptyRowInsert(options.id);
            break;
          default:
            tableData.splice(+options.id + 1, 0, emptyRow);
            this.renderNewEmptyRowInsert(+options.id + 1);
            break;
        }
      } else {
        tableData.push(emptyRow);
        this.renderNewEmptyRow();
      }
    }

    // TODO: make it look ok

  }, {
    key: 'renderNewEmptyRow',
    value: function renderNewEmptyRow() {
      var emptyRowHTML = new _tableRows2.default([tableData[tableData.length - 1]]).elem.querySelector('.table-row');
      this.elem.querySelector('#main-table').appendChild(emptyRowHTML);
    }
  }, {
    key: 'renderNewEmptyRowInsert',
    value: function renderNewEmptyRowInsert(id) {
      var emptyRowHTML = new _tableRows2.default([tableData[id]]).elem.querySelector('.table-row');
      var mainTable = this.elem.querySelector('#main-table');
      mainTable.insertBefore(emptyRowHTML, mainTable.children[+id + 1]);
    }
  }, {
    key: 'createCover',
    value: function createCover() {
      var coverDiv = document.createElement('div');
      coverDiv.id = 'cover-div';
      document.body.appendChild(coverDiv);

      return coverDiv;
    }
  }, {
    key: 'showConfirmingModalBox',
    value: function showConfirmingModalBox(id) {
      var _this3 = this;

      // TODO: is it okay to do this way??
      var coverDiv = this.createCover();

      var modalBox = document.createElement('div');
      modalBox.classList.add('modal-box');
      modalBox.innerHTML = (0, _modalBox2.default)();
      document.body.appendChild(modalBox);

      // TODO: create separate function for removing form
      modalBox.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
          _this3.addEmptyRow({
            id: id,
            pos: e.target.id
          });
          document.body.removeChild(modalBox);
          coverDiv.parentNode.removeChild(coverDiv);
        } else if (e.target.classList.contains('modal-box')) {
          e.target.parentNode.removeChild(e.target);
          coverDiv.parentNode.removeChild(coverDiv);
        }
      });
    }
  }, {
    key: 'deleteRow',
    value: function deleteRow(id) {
      // TODO: ask confirimg
      var i = 0;
      // TODO: rewrite using object.keys
      for (var key in tableData) {
        if (tableData[key].id === id) {
          break;
        }
        i += 1;
      }

      tableData.splice(i, 1);

      var mainTable = this.elem.querySelector('#main-table');
      var rowToDelete = mainTable.querySelector('input[value="' + id + '"]').parentNode;

      mainTable.removeChild(rowToDelete);

      selectedTableRow = null;
    }
  }, {
    key: 'highlightTableRow',
    value: function highlightTableRow(node) {
      if (selectedTableRow) {
        selectedTableRow.classList.remove('selected');
      }
      selectedTableRow = node;
      selectedTableRow.classList.add('selected');
    }
  }, {
    key: 'removeHighlightTableRow',
    value: function removeHighlightTableRow() {
      if (selectedTableRow) {
        selectedTableRow.classList.remove('selected');
        selectedTableRow = null;
      }
    }
  }]);

  return Table;
}();

exports.default = Table;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".table-controllers .table-controllers-buttons {\n  position: fixed;\n  top: 0;\n  width: 100%;\n  margin: 0;\n  padding: 20px;\n  background-color: #fff;\n  border-bottom: 2px solid black; }\n  .table-controllers .table-controllers-buttons button {\n    padding: 10px;\n    border-radius: 5px;\n    border: 1px solid #37474f;\n    background-color: transparent;\n    cursor: pointer;\n    transition: .125s linear; }\n    .table-controllers .table-controllers-buttons button:not(:first-child) {\n      margin-left: 5px; }\n    .table-controllers .table-controllers-buttons button:not(:last-child) {\n      margin-right: 5px; }\n    .table-controllers .table-controllers-buttons button:hover {\n      border-color: #78a2f6;\n      background-color: rgba(100, 162, 246, 0.31); }\n    .table-controllers .table-controllers-buttons button:focus {\n      outline: none; }\n\n.table-controllers .main-table {\n  display: table;\n  margin-top: 80px;\n  margin-left: 0px; }\n  .table-controllers .main-table .table-row {\n    display: table-row;\n    transition: .125s linear; }\n    .table-controllers .main-table .table-row .table-cell {\n      display: table-cell;\n      min-width: 85px;\n      padding: 10px;\n      text-align: center;\n      border: 1px solid black; }\n      .table-controllers .main-table .table-row .table-cell:focus {\n        outline: none; }\n    .table-controllers .main-table .table-row .table-header {\n      cursor: pointer;\n      background-color: #f6f6f6;\n      color: #000; }\n    .table-controllers .main-table .table-row .table-header.sorted-column[data-sort-state='discending']::after {\n      content: \" \\2193\"; }\n    .table-controllers .main-table .table-row .table-header.sorted-column[data-sort-state='ascending']::after {\n      content: \" \\2191\"; }\n  .table-controllers .main-table .table-row.selected {\n    background-color: rgba(100, 162, 246, 0.31); }\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".table-rows {\n  margin-bottom: 25px; }\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".table {\n  margin: 0; }\n\n#cover-div {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 9000;\n  width: 100%;\n  height: 100%;\n  background-color: gray;\n  opacity: 0.3; }\n\n.modal-box {\n  position: fixed;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  top: 0;\n  left: 0;\n  z-index: 9999;\n  width: 100%;\n  height: 100%;\n  text-align: center; }\n  .modal-box .modal-box__container {\n    background-color: #fff;\n    width: 400px;\n    height: 120px;\n    line-height: 120px;\n    border: 1px solid black;\n    border-radius: 10px;\n    vertical-align: middle; }\n    .modal-box .modal-box__container button {\n      border-radius: 10px;\n      border: none;\n      padding: 10px 15px;\n      background-color: #0fc300;\n      cursor: pointer;\n      color: #fff; }\n      .modal-box .modal-box__container button:focus {\n        outline: none; }\n      .modal-box .modal-box__container button:first-child {\n        margin-right: 10px; }\n      .modal-box .modal-box__container button:last-child {\n        margin-left: 10px; }\n\n.footer {\n  position: fixed;\n  bottom: 0;\n  width: 100%;\n  padding: 10px;\n  border-top: 1px solid black;\n  background-color: #fff; }\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "html {\n  font-size: 16px;\n  padding: 0;\n  margin: 0; }\n\nbody {\n  height: 3000px; }\n", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tableControllers = __webpack_require__(36);

var _tableControllers2 = _interopRequireDefault(_tableControllers);

__webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableControllers = function TableControllers() {
  _classCallCheck(this, TableControllers);

  this.elem = document.createElement('div');
  this.elem.className = 'table-controllers';
  this.elem.innerHTML = (0, _tableControllers2.default)();
};

exports.default = TableControllers;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(7);
module.exports = (Handlebars['default'] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"table-controllers-buttons\">\r\n    <button id=\"save-data\">Сохранить данные</button>\r\n    <button id=\"add-row\">Добавить строку</button>\r\n    <button id=\"delete-row\">Удалить строку</button>\r\n</div>\r\n\r\n<div id=\"main-table\" class=\"table main-table\">\r\n\r\n    <div class=\"table-row\">\r\n\r\n        <div class=\"table-cell table-header\" id=\"sort-name\" data-sort-state=\"ascending\">Name</div>\r\n        <div class=\"table-cell table-header\" id=\"sort-age\" data-sort-state=\"ascending\">Age</div>\r\n        <div class=\"table-cell table-header\" id=\"sort-city\" data-sort-state=\"ascending\">City</div>\r\n\r\n    </div>\r\n\r\n</div>";
},"useData":true});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(31, function() {
			var newContent = __webpack_require__(31);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tableRows = __webpack_require__(39);

var _tableRows2 = _interopRequireDefault(_tableRows);

__webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Exports table data
 * @constructor
 * @param {obj} data - Parsed JSON data
 */

var TableControllers = function TableControllers(data) {
  _classCallCheck(this, TableControllers);

  this.elem = document.createElement('div');
  this.elem.className = 'table-rows';
  this.elem.innerHTML = (0, _tableRows2.default)({ people: data });
};

exports.default = TableControllers;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(7);
module.exports = (Handlebars['default'] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n    <div class=\"table-row table-row-data\">\r\n        <input type=\"hidden\" name=\"id\" value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"table-cell table-cell-data table-cell-name\" data-field=\"name\" contenteditable>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\r\n        <div class=\"table-cell table-cell-data table-cell-age\" data-field=\"age\" contenteditable>"
    + alias4(((helper = (helper = helpers.age || (depth0 != null ? depth0.age : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"age","hash":{},"data":data}) : helper)))
    + "</div>\r\n        <div class=\"table-cell table-cell-data table-cell-city\" data-field=\"city\" contenteditable>"
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "</div>\r\n    </div>\r\n\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.people : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(32, function() {
			var newContent = __webpack_require__(32);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(7);
module.exports = (Handlebars['default'] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"footer\">Footer</div>";
},"useData":true});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(7);
module.exports = (Handlebars['default'] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal-box__container\">\r\n    <button id=\"insert-before\">Вставить до</button>\r\n    <button id=\"insert-after\">Вставить после</button>\r\n</div>\r\n";
},"useData":true});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(33, function() {
			var newContent = __webpack_require__(33);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(34, function() {
			var newContent = __webpack_require__(34);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return obj;
};

var get = function get(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(Error(xhr.statusText));
      }
    };

    xhr.onerror = function () {
      return reject(Error('Network error'));
    };

    xhr.send();
  });
};

var obj = void 0;

get('./data.json').then(function (response) {
  obj = JSON.parse(response).people;
}).catch(function (error) {
  return console.error(error);
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tableData, sortFieldId, sortState) {
  return sortData(tableData, sortFieldId, sortState);
};

var sortData = function sortData(tableData, sortFieldId, sortState) {
  var sortedData = {};

  var arr = Array.from(tableData);
  var sortField = sortFieldId.split('-')[1];

  var currentSortState = sortState;

  var compare = function compare(a, b) {
    return sortState === 'ascending' ? a[sortField][0].toLowerCase() < b[sortField][0].toLowerCase() : a[sortField][0].toLowerCase() > b[sortField][0].toLowerCase();
  };

  var compareNumbers = function compareNumbers(a, b) {
    return sortState === 'ascending' ? +a[sortField] < +b[sortField] : +a[sortField] > +b[sortField];
  };

  sortField === 'age' ? arr.sort(compareNumbers) : arr.sort(compare);

  sortedData.people = arr;

  if (currentSortState === 'ascending') {
    currentSortState = 'discending';
  } else {
    currentSortState = 'ascending';
  }

  sortedData.sortState = {
    sortFieldId: sortFieldId,
    currentSortState: currentSortState
  };

  return sortedData;
};

/***/ })
]));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9mcm9udGVuZC90YWJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90YWJsZS1jb250cm9sbGVycy90YWJsZS1jb250cm9sbGVycy5zY3NzIiwid2VicGFjazovLy8uL3RhYmxlLXJvd3MvdGFibGUtcm93cy5zY3NzIiwid2VicGFjazovLy8uL3RhYmxlL3RhYmxlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY29tbW9uL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3RhYmxlLWNvbnRyb2xsZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3RhYmxlLWNvbnRyb2xsZXJzL3RhYmxlLWNvbnRyb2xsZXJzLmhicyIsIndlYnBhY2s6Ly8vLi90YWJsZS1jb250cm9sbGVycy90YWJsZS1jb250cm9sbGVycy5zY3NzPzA2ZDgiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3RhYmxlLXJvd3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdGFibGUtcm93cy90YWJsZS1yb3dzLmhicyIsIndlYnBhY2s6Ly8vLi90YWJsZS1yb3dzL3RhYmxlLXJvd3Muc2Nzcz83ZDA4Iiwid2VicGFjazovLy8uL3RhYmxlL3RhYmxlLmhicyIsIndlYnBhY2s6Ly8vLi90YWJsZS9tb2RhbC1ib3guaGJzIiwid2VicGFjazovLy8uL3RhYmxlL3RhYmxlLnNjc3M/NjQxZiIsIndlYnBhY2s6Ly8vLi9jb21tb24vc3R5bGUuc2Nzcz9lZDZkIiwid2VicGFjazovLy9mcm9udGVuZC90YWJsZS9nZXQtZGF0YS5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvdGFibGUvc29ydC1kYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFRhYmxlQ29udHJvbGxlcnMgZnJvbSAnLi4vdGFibGUtY29udHJvbGxlcnMnO1xuaW1wb3J0IFRhYmxlUm93cyBmcm9tICcuLi90YWJsZS1yb3dzJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGFibGUuaGJzJztcbmltcG9ydCB0ZW1wbGF0ZU1vZGFsQm94IGZyb20gJy4vbW9kYWwtYm94Lmhicyc7XG5pbXBvcnQgJy4vdGFibGUuc2Nzcyc7XG5pbXBvcnQgJy4uL2NvbW1vbi9zdHlsZS5zY3NzJztcblxuaW1wb3J0IGdldERhdGEgZnJvbSAnLi9nZXQtZGF0YSc7XG5pbXBvcnQgc29ydERhdGEgZnJvbSAnLi9zb3J0LWRhdGEnO1xuXG5sZXQgdGFibGVEYXRhO1xubGV0IHRlbXBUYWJsZURhdGE7XG5sZXQgc2VsZWN0ZWRUYWJsZVJvdztcbmxldCBzZWxlY3RlZFRhYmxlQ2VsbDtcbmxldCBzaG93Q29uZmlybWluZ01vZGFsQm94QW5zd2VyO1xubGV0IGxhc3RJZDtcbmxldCBzb3J0ZWRDb2x1bW47XG5cbmNvbnN0IHRhYmxlSFRNTFRhZyA9IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgndGFibGUtZWRpdG9yJywge1xuICBwcm90b3R5cGU6IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKVxufSk7XG5cbmNvbnN0IG5ld0hUTUxUYWdzID0gW3RhYmxlSFRNTFRhZ107XG5cbmNsYXNzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZXZlbnRzID0ge307XG4gIH1cblxuICBlbWl0KGV2ZW50TmFtZSwgZGF0YSkge1xuICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LmZvckVhY2goKGZuKSA9PiB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgZGF0YSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUoZXZlbnROYW1lLCBmbikge1xuICAgIGlmICghdGhpcy5ldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKGV2ZW50Rm4gPT4gZm4gIT09IGV2ZW50Rm4pO1xuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmVsZW0uY2xhc3NOYW1lID0gJ3RhYmxlJztcblxuICAgIHRoaXMuZWxlbS5pbm5lckhUTUwgPSB0ZW1wbGF0ZSgpO1xuXG4gICAgLy8gQmVjYXVzZSBvZiB0aGUgcHJvbWlzZSBpbiBnZXQtZGF0YS5qc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGFibGVEYXRhID0gZ2V0RGF0YSgpO1xuICAgICAgdGVtcFRhYmxlRGF0YSA9IHRhYmxlRGF0YTtcbiAgICAgIHRoaXMucmVuZGVyVGFibGVSb3dzSFRNTCgpO1xuICAgIH0sIDIwKTtcblxuICAgIG5ld0hUTUxUYWdzLmZvckVhY2goSXRlbSA9PiB0aGlzLmVsZW0uaW5zZXJ0QmVmb3JlKG5ldyBJdGVtKCksIHRoaXMuZWxlbS5sYXN0RWxlbWVudENoaWxkKSk7XG5cbiAgICBjb25zdCB0YWJsZUNvbnRyb2xsZXJzID0gbmV3IFRhYmxlQ29udHJvbGxlcnMoKTtcbiAgICB0aGlzLmVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RhYmxlLWVkaXRvcicpWzBdLmFwcGVuZENoaWxkKHRhYmxlQ29udHJvbGxlcnMuZWxlbSk7XG5cbiAgICAvLyBBZGQgcm93IGJ1dHRvblxuICAgIHRoaXMuYWRkUm93QnRuID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcm93Jyk7XG4gICAgdGhpcy5hZGRSb3dCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRUYWJsZVJvdykge1xuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoc2VsZWN0ZWRUYWJsZVJvdy5wYXJlbnROb2RlLmNoaWxkcmVuLFxuICAgICAgICAgIHNlbGVjdGVkVGFibGVSb3cpO1xuICAgICAgICB0aGlzLnNob3dDb25maXJtaW5nTW9kYWxCb3goaW5kZXggLSAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkRW1wdHlSb3coKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIERlbGV0ZSByb3cgYnV0dG9uXG4gICAgdGhpcy5kZWxldGVSb3dCdG4gPSB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignI2RlbGV0ZS1yb3cnKTtcbiAgICB0aGlzLmRlbGV0ZVJvd0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmIChzZWxlY3RlZFRhYmxlUm93KSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUm93SWQgPSBzZWxlY3RlZFRhYmxlUm93LmZpcnN0RWxlbWVudENoaWxkLnZhbHVlO1xuICAgICAgICB0aGlzLmRlbGV0ZVJvdyhzZWxlY3RlZFJvd0lkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNhdmVzIHZhbHVlIG9mIHNlbGVjdGVkIHRhYmxlIGNlbGxcbiAgICB0aGlzLmVsZW0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFibGUtY2VsbC1kYXRhJykpIHtcbiAgICAgICAgc2VsZWN0ZWRUYWJsZUNlbGwgPSBlLnRhcmdldC5maXJzdENoaWxkLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3RlZFRhYmxlQ2VsbCA9IG51bGw7XG4gICAgICB9XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICAvLyBVcGRhdGVzIHRhYmxlRGF0YSB3aGVuIHRhYmxlIGNlbGwgbG9zZXMgZm9jdXNcbiAgICAvLyBpZiB0YWJsZSBjZWxsIHdhcyBjaGFuZ2VkXG4gICAgdGhpcy5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFibGUtY2VsbC1kYXRhJykpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmZpcnN0Q2hpbGQuZGF0YSAhPT0gc2VsZWN0ZWRUYWJsZUNlbGwpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVRhYmxlRGF0YShlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIHRydWUpO1xuXG4gICAgLy8gU29ydHMgZGF0YVxuICAgIHRoaXMuc29ydERhdGFCdG5zID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1oZWFkZXInKTtcbiAgICB0aGlzLnNvcnREYXRhQnRuc0FycmF5ID0gQXJyYXkuZnJvbSh0aGlzLnNvcnREYXRhQnRucyk7XG5cbiAgICB0aGlzLnNvcnREYXRhQnRuc0FycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNvcnRlZERhdGEgPSBzb3J0RGF0YSh0YWJsZURhdGEsIGl0ZW0uaWQsIGl0ZW0uZGF0YXNldC5zb3J0U3RhdGUpO1xuICAgICAgICB0aGlzLnJlbmRlclNvcnRlZFRhYmxlUm93c0hUTUwoc29ydGVkRGF0YS5wZW9wbGUpO1xuICAgICAgICB0aGlzLmNoYW5nZVRhYmxlSGVhZGVyU3RhdGUoc29ydGVkRGF0YS5zb3J0U3RhdGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBIaWdobGlnaHRzIHRhYmxlIHJvdyBvbmNsaWNrXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYmxlLXJvdy1kYXRhJykpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRUYWJsZVJvdyhlLnRhcmdldC5wYXJlbnROb2RlKTtcbiAgICAgIH0gZWxzZSBpZiAoIWUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWJsZS1jb250cm9sbGVycy1idXR0b25zJykpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVIaWdobGlnaHRUYWJsZVJvdygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUHJldmVudHMgbGluZS1icmVha2luZyBmcm9tIHByZXNzaW5nIEVudGVyXG4gICAgdGhpcy5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3RhYmxlLWNlbGwtZGF0YScpKSB7XG4gICAgICAgIGlmIChlLndoaWNoID09PSAxMykge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyVGFibGVSb3dzSFRNTCgpIHtcbiAgICBjb25zdCB0YWJsZVJvd3NFbGVtcyA9IG5ldyBUYWJsZVJvd3ModGFibGVEYXRhKS5lbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1yb3cnKTtcbiAgICBjb25zdCB0YWJsZVJvd3NBcnJheSA9IEFycmF5LmZyb20odGFibGVSb3dzRWxlbXMpO1xuXG4gICAgY29uc3QgdGFibGVSb3dzQ29udGFpbmVyID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJyNtYWluLXRhYmxlJyk7XG5cbiAgICB0YWJsZVJvd3NBcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICB0YWJsZVJvd3NDb250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgfSk7XG5cbiAgICBsYXN0SWQgPSB0YWJsZVJvd3NBcnJheVt0YWJsZVJvd3NBcnJheS5sZW5ndGggLSAxXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZTtcbiAgfVxuXG4gIHJlbmRlclNvcnRlZFRhYmxlUm93c0hUTUwoc29ydGVkRGF0YSkge1xuICAgIGNvbnN0IHRhYmxlUm93c0NvbnRhaW5lciA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKCcjbWFpbi10YWJsZScpO1xuICAgIGNvbnN0IHRhYmxlUm93cyA9IEFycmF5LmZyb20odGFibGVSb3dzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1yb3ctZGF0YScpKTtcblxuICAgIHRhYmxlUm93cy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICBjb25zdCBpdGVtQ2hpbGRyZW5BcnJheSA9IEFycmF5LmZyb20oaXRlbS5jaGlsZHJlbik7XG5cbiAgICAgIGl0ZW1DaGlsZHJlbkFycmF5LmZvckVhY2goKGNoaWxkSXRlbSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGRJdGVtLnRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICBjaGlsZEl0ZW0udmFsdWUgPSBzb3J0ZWREYXRhW2ldLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaWxkSXRlbS5maXJzdENoaWxkLmRhdGEgPSBzb3J0ZWREYXRhW2ldW2NoaWxkSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlVGFibGVIZWFkZXJTdGF0ZShkYXRhKSB7XG4gICAgY29uc3QgY3VycmVudFNvcnRlZENvbHVtbiA9IHRoaXMuZWxlbS5xdWVyeVNlbGVjdG9yKGAjJHtkYXRhLnNvcnRGaWVsZElkfWApO1xuICAgIGN1cnJlbnRTb3J0ZWRDb2x1bW4uc2V0QXR0cmlidXRlKCdkYXRhLXNvcnQtc3RhdGUnLCBkYXRhLmN1cnJlbnRTb3J0U3RhdGUpO1xuXG4gICAgaWYgKHNvcnRlZENvbHVtbikge1xuICAgICAgc29ydGVkQ29sdW1uLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRlZC1jb2x1bW4nKTtcbiAgICAgIHNvcnRlZENvbHVtbiA9IGN1cnJlbnRTb3J0ZWRDb2x1bW47XG4gICAgICBjdXJyZW50U29ydGVkQ29sdW1uLmNsYXNzTGlzdC5hZGQoJ3NvcnRlZC1jb2x1bW4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc29ydGVkQ29sdW1uID0gY3VycmVudFNvcnRlZENvbHVtbjtcbiAgICAgIHNvcnRlZENvbHVtbi5jbGFzc0xpc3QuYWRkKCdzb3J0ZWQtY29sdW1uJyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVGFibGVEYXRhKGUpIHtcbiAgICBjb25zdCBpZCA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQudmFsdWU7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBlLnRhcmdldC5maXJzdENoaWxkLmRhdGE7XG4gICAgY29uc3QgZmllbGQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmllbGQnKTtcblxuICAgIC8vdGFibGVEYXRhW2lkXVtmaWVsZF0gPSBuZXdWYWx1ZTtcblxuICAgIC8vIFRPRE86IHJld3JpdGUgdXNpbmcgT2JqZWN0LmtleXNcbiAgICBmb3IgKGxldCBrZXkgaW4gdGFibGVEYXRhKSB7XG4gICAgICBpZiAodGFibGVEYXRhW2tleV0uaWQgPT09IGlkKSB7XG4gICAgICAgIHRhYmxlRGF0YVtrZXldW2ZpZWxkXSA9IG5ld1ZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGRFbXB0eVJvdyhvcHRpb25zKSB7XG4gICAgbGFzdElkID0gK2xhc3RJZCArIDE7XG4gICAgY29uc3QgZW1wdHlSb3cgPSB7XG4gICAgICBpZDogSlNPTi5zdHJpbmdpZnkobGFzdElkKSxcbiAgICAgIG5hbWU6ICcgJyxcbiAgICAgIGFnZTogJyAnLFxuICAgICAgY2l0eTogJyAnXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgc3dpdGNoIChvcHRpb25zLnBvcykge1xuICAgICAgICBjYXNlICdpbnNlcnQtYmVmb3JlJzpcbiAgICAgICAgICB0YWJsZURhdGEuc3BsaWNlKG9wdGlvbnMuaWQsIDAsIGVtcHR5Um93KTtcbiAgICAgICAgICB0aGlzLnJlbmRlck5ld0VtcHR5Um93SW5zZXJ0KG9wdGlvbnMuaWQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRhYmxlRGF0YS5zcGxpY2UoK29wdGlvbnMuaWQgKyAxLCAwLCBlbXB0eVJvdyk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJOZXdFbXB0eVJvd0luc2VydCgrb3B0aW9ucy5pZCArIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0YWJsZURhdGEucHVzaChlbXB0eVJvdyk7XG4gICAgICB0aGlzLnJlbmRlck5ld0VtcHR5Um93KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETzogbWFrZSBpdCBsb29rIG9rXG4gIHJlbmRlck5ld0VtcHR5Um93KCkge1xuICAgIGNvbnN0IGVtcHR5Um93SFRNTCA9IG5ldyBUYWJsZVJvd3MoW3RhYmxlRGF0YVt0YWJsZURhdGEubGVuZ3RoIC0gMV1dKS5lbGVtLnF1ZXJ5U2VsZWN0b3IoJy50YWJsZS1yb3cnKTtcbiAgICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignI21haW4tdGFibGUnKS5hcHBlbmRDaGlsZChlbXB0eVJvd0hUTUwpO1xuICB9XG5cbiAgcmVuZGVyTmV3RW1wdHlSb3dJbnNlcnQoaWQpIHtcbiAgICBjb25zdCBlbXB0eVJvd0hUTUwgPSBuZXcgVGFibGVSb3dzKFt0YWJsZURhdGFbaWRdXSkuZWxlbS5xdWVyeVNlbGVjdG9yKCcudGFibGUtcm93Jyk7XG4gICAgY29uc3QgbWFpblRhYmxlID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJyNtYWluLXRhYmxlJyk7XG4gICAgbWFpblRhYmxlLmluc2VydEJlZm9yZShlbXB0eVJvd0hUTUwsIG1haW5UYWJsZS5jaGlsZHJlblsraWQgKyAxXSk7XG4gIH1cblxuICBjcmVhdGVDb3ZlcigpIHtcbiAgICBjb25zdCBjb3ZlckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvdmVyRGl2LmlkID0gJ2NvdmVyLWRpdic7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3ZlckRpdik7XG5cbiAgICByZXR1cm4gY292ZXJEaXY7XG4gIH1cblxuICBzaG93Q29uZmlybWluZ01vZGFsQm94KGlkKSB7XG4gICAgLy8gVE9ETzogaXMgaXQgb2theSB0byBkbyB0aGlzIHdheT8/XG4gICAgY29uc3QgY292ZXJEaXYgPSB0aGlzLmNyZWF0ZUNvdmVyKCk7XG5cbiAgICBjb25zdCBtb2RhbEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1vZGFsQm94LmNsYXNzTGlzdC5hZGQoJ21vZGFsLWJveCcpO1xuICAgIG1vZGFsQm94LmlubmVySFRNTCA9IHRlbXBsYXRlTW9kYWxCb3goKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsQm94KTtcblxuICAgIC8vIFRPRE86IGNyZWF0ZSBzZXBhcmF0ZSBmdW5jdGlvbiBmb3IgcmVtb3ZpbmcgZm9ybVxuICAgIG1vZGFsQm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09PSAnQlVUVE9OJykge1xuICAgICAgICB0aGlzLmFkZEVtcHR5Um93KHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBwb3M6IGUudGFyZ2V0LmlkXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG1vZGFsQm94KTtcbiAgICAgICAgY292ZXJEaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjb3ZlckRpdik7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtYm94JykpIHtcbiAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlLnRhcmdldCk7XG4gICAgICAgIGNvdmVyRGl2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY292ZXJEaXYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZGVsZXRlUm93KGlkKSB7XG4gICAgLy8gVE9ETzogYXNrIGNvbmZpcmltZ1xuICAgIGxldCBpID0gMDtcbiAgICAvLyBUT0RPOiByZXdyaXRlIHVzaW5nIG9iamVjdC5rZXlzXG4gICAgZm9yIChsZXQga2V5IGluIHRhYmxlRGF0YSkge1xuICAgICAgaWYgKHRhYmxlRGF0YVtrZXldLmlkID09PSBpZCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGkgKz0gMTtcbiAgICB9XG5cbiAgICB0YWJsZURhdGEuc3BsaWNlKGksIDEpO1xuXG4gICAgY29uc3QgbWFpblRhYmxlID0gdGhpcy5lbGVtLnF1ZXJ5U2VsZWN0b3IoJyNtYWluLXRhYmxlJyk7XG4gICAgY29uc3Qgcm93VG9EZWxldGUgPSBtYWluVGFibGUucXVlcnlTZWxlY3RvcihgaW5wdXRbdmFsdWU9XCIke2lkfVwiXWApLnBhcmVudE5vZGU7XG5cbiAgICBtYWluVGFibGUucmVtb3ZlQ2hpbGQocm93VG9EZWxldGUpO1xuXG4gICAgc2VsZWN0ZWRUYWJsZVJvdyA9IG51bGw7XG4gIH1cblxuICBoaWdobGlnaHRUYWJsZVJvdyhub2RlKSB7XG4gICAgaWYgKHNlbGVjdGVkVGFibGVSb3cpIHtcbiAgICAgIHNlbGVjdGVkVGFibGVSb3cuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gICAgc2VsZWN0ZWRUYWJsZVJvdyA9IG5vZGU7XG4gICAgc2VsZWN0ZWRUYWJsZVJvdy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgcmVtb3ZlSGlnaGxpZ2h0VGFibGVSb3coKSB7XG4gICAgaWYgKHNlbGVjdGVkVGFibGVSb3cpIHtcbiAgICAgIHNlbGVjdGVkVGFibGVSb3cuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgIHNlbGVjdGVkVGFibGVSb3cgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3RhYmxlL2luZGV4LmpzIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRhYmxlLWNvbnRyb2xsZXJzIC50YWJsZS1jb250cm9sbGVycy1idXR0b25zIHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgYmxhY2s7IH1cXG4gIC50YWJsZS1jb250cm9sbGVycyAudGFibGUtY29udHJvbGxlcnMtYnV0dG9ucyBidXR0b24ge1xcbiAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMzNzQ3NGY7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRyYW5zaXRpb246IC4xMjVzIGxpbmVhcjsgfVxcbiAgICAudGFibGUtY29udHJvbGxlcnMgLnRhYmxlLWNvbnRyb2xsZXJzLWJ1dHRvbnMgYnV0dG9uOm5vdCg6Zmlyc3QtY2hpbGQpIHtcXG4gICAgICBtYXJnaW4tbGVmdDogNXB4OyB9XFxuICAgIC50YWJsZS1jb250cm9sbGVycyAudGFibGUtY29udHJvbGxlcnMtYnV0dG9ucyBidXR0b246bm90KDpsYXN0LWNoaWxkKSB7XFxuICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7IH1cXG4gICAgLnRhYmxlLWNvbnRyb2xsZXJzIC50YWJsZS1jb250cm9sbGVycy1idXR0b25zIGJ1dHRvbjpob3ZlciB7XFxuICAgICAgYm9yZGVyLWNvbG9yOiAjNzhhMmY2O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAxNjIsIDI0NiwgMC4zMSk7IH1cXG4gICAgLnRhYmxlLWNvbnRyb2xsZXJzIC50YWJsZS1jb250cm9sbGVycy1idXR0b25zIGJ1dHRvbjpmb2N1cyB7XFxuICAgICAgb3V0bGluZTogbm9uZTsgfVxcblxcbi50YWJsZS1jb250cm9sbGVycyAubWFpbi10YWJsZSB7XFxuICBkaXNwbGF5OiB0YWJsZTtcXG4gIG1hcmdpbi10b3A6IDgwcHg7XFxuICBtYXJnaW4tbGVmdDogMHB4OyB9XFxuICAudGFibGUtY29udHJvbGxlcnMgLm1haW4tdGFibGUgLnRhYmxlLXJvdyB7XFxuICAgIGRpc3BsYXk6IHRhYmxlLXJvdztcXG4gICAgdHJhbnNpdGlvbjogLjEyNXMgbGluZWFyOyB9XFxuICAgIC50YWJsZS1jb250cm9sbGVycyAubWFpbi10YWJsZSAudGFibGUtcm93IC50YWJsZS1jZWxsIHtcXG4gICAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcbiAgICAgIG1pbi13aWR0aDogODVweDtcXG4gICAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjazsgfVxcbiAgICAgIC50YWJsZS1jb250cm9sbGVycyAubWFpbi10YWJsZSAudGFibGUtcm93IC50YWJsZS1jZWxsOmZvY3VzIHtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7IH1cXG4gICAgLnRhYmxlLWNvbnRyb2xsZXJzIC5tYWluLXRhYmxlIC50YWJsZS1yb3cgLnRhYmxlLWhlYWRlciB7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxuICAgICAgY29sb3I6ICMwMDA7IH1cXG4gICAgLnRhYmxlLWNvbnRyb2xsZXJzIC5tYWluLXRhYmxlIC50YWJsZS1yb3cgLnRhYmxlLWhlYWRlci5zb3J0ZWQtY29sdW1uW2RhdGEtc29ydC1zdGF0ZT0nZGlzY2VuZGluZyddOjphZnRlciB7XFxuICAgICAgY29udGVudDogXFxcIiBcXFxcMjE5M1xcXCI7IH1cXG4gICAgLnRhYmxlLWNvbnRyb2xsZXJzIC5tYWluLXRhYmxlIC50YWJsZS1yb3cgLnRhYmxlLWhlYWRlci5zb3J0ZWQtY29sdW1uW2RhdGEtc29ydC1zdGF0ZT0nYXNjZW5kaW5nJ106OmFmdGVyIHtcXG4gICAgICBjb250ZW50OiBcXFwiIFxcXFwyMTkxXFxcIjsgfVxcbiAgLnRhYmxlLWNvbnRyb2xsZXJzIC5tYWluLXRhYmxlIC50YWJsZS1yb3cuc2VsZWN0ZWQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTYyLCAyNDYsIDAuMzEpOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90YWJsZS1jb250cm9sbGVycy90YWJsZS1jb250cm9sbGVycy5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGFibGUtcm93cyB7XFxuICBtYXJnaW4tYm90dG9tOiAyNXB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90YWJsZS1yb3dzL3RhYmxlLXJvd3Muc2Nzc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRhYmxlIHtcXG4gIG1hcmdpbjogMDsgfVxcblxcbiNjb3Zlci1kaXYge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHotaW5kZXg6IDkwMDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxuICBvcGFjaXR5OiAwLjM7IH1cXG5cXG4ubW9kYWwtYm94IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1vei1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogOTk5OTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuICAubW9kYWwtYm94IC5tb2RhbC1ib3hfX2NvbnRhaW5lciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIHdpZHRoOiA0MDBweDtcXG4gICAgaGVpZ2h0OiAxMjBweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEyMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcbiAgICAubW9kYWwtYm94IC5tb2RhbC1ib3hfX2NvbnRhaW5lciBidXR0b24ge1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgICAgYm9yZGVyOiBub25lO1xcbiAgICAgIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGZjMzAwO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgIC5tb2RhbC1ib3ggLm1vZGFsLWJveF9fY29udGFpbmVyIGJ1dHRvbjpmb2N1cyB7XFxuICAgICAgICBvdXRsaW5lOiBub25lOyB9XFxuICAgICAgLm1vZGFsLWJveCAubW9kYWwtYm94X19jb250YWluZXIgYnV0dG9uOmZpcnN0LWNoaWxkIHtcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDsgfVxcbiAgICAgIC5tb2RhbC1ib3ggLm1vZGFsLWJveF9fY29udGFpbmVyIGJ1dHRvbjpsYXN0LWNoaWxkIHtcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4OyB9XFxuXFxuLmZvb3RlciB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90YWJsZS90YWJsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJodG1sIHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7IH1cXG5cXG5ib2R5IHtcXG4gIGhlaWdodDogMzAwMHB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9jb21tb24vc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGFibGUtY29udHJvbGxlcnMuaGJzJztcclxuaW1wb3J0ICcuL3RhYmxlLWNvbnRyb2xsZXJzLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVDb250cm9sbGVycyB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZWxlbS5jbGFzc05hbWUgPSAndGFibGUtY29udHJvbGxlcnMnO1xyXG4gICAgdGhpcy5lbGVtLmlubmVySFRNTCA9IHRlbXBsYXRlKCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC90YWJsZS1jb250cm9sbGVycy9pbmRleC5qcyIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnRTovV2ViL1dvcmsvVGVjaG5vc2Vydi90YWJsZS1lZGl0b3ItdmFuaWxsYWpzL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbJ2RlZmF1bHQnXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJ0YWJsZS1jb250cm9sbGVycy1idXR0b25zXFxcIj5cXHJcXG4gICAgPGJ1dHRvbiBpZD1cXFwic2F2ZS1kYXRhXFxcIj7QodC+0YXRgNCw0L3QuNGC0Ywg0LTQsNC90L3Ri9C1PC9idXR0b24+XFxyXFxuICAgIDxidXR0b24gaWQ9XFxcImFkZC1yb3dcXFwiPtCU0L7QsdCw0LLQuNGC0Ywg0YHRgtGA0L7QutGDPC9idXR0b24+XFxyXFxuICAgIDxidXR0b24gaWQ9XFxcImRlbGV0ZS1yb3dcXFwiPtCj0LTQsNC70LjRgtGMINGB0YLRgNC+0LrRgzwvYnV0dG9uPlxcclxcbjwvZGl2PlxcclxcblxcclxcbjxkaXYgaWQ9XFxcIm1haW4tdGFibGVcXFwiIGNsYXNzPVxcXCJ0YWJsZSBtYWluLXRhYmxlXFxcIj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidGFibGUtcm93XFxcIj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRhYmxlLWNlbGwgdGFibGUtaGVhZGVyXFxcIiBpZD1cXFwic29ydC1uYW1lXFxcIiBkYXRhLXNvcnQtc3RhdGU9XFxcImFzY2VuZGluZ1xcXCI+TmFtZTwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidGFibGUtY2VsbCB0YWJsZS1oZWFkZXJcXFwiIGlkPVxcXCJzb3J0LWFnZVxcXCIgZGF0YS1zb3J0LXN0YXRlPVxcXCJhc2NlbmRpbmdcXFwiPkFnZTwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidGFibGUtY2VsbCB0YWJsZS1oZWFkZXJcXFwiIGlkPVxcXCJzb3J0LWNpdHlcXFwiIGRhdGEtc29ydC1zdGF0ZT1cXFwiYXNjZW5kaW5nXFxcIj5DaXR5PC9kaXY+XFxyXFxuXFxyXFxuICAgIDwvZGl2PlxcclxcblxcclxcbjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90YWJsZS1jb250cm9sbGVycy90YWJsZS1jb250cm9sbGVycy5oYnNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RhYmxlLWNvbnRyb2xsZXJzLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vdGFibGUtY29udHJvbGxlcnMuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90YWJsZS1jb250cm9sbGVycy5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RhYmxlLWNvbnRyb2xsZXJzL3RhYmxlLWNvbnRyb2xsZXJzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RhYmxlLXJvd3MuaGJzJztcclxuaW1wb3J0ICcuL3RhYmxlLXJvd3Muc2Nzcyc7XHJcblxyXG4vKipcclxuICogRXhwb3J0cyB0YWJsZSBkYXRhXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAcGFyYW0ge29ian0gZGF0YSAtIFBhcnNlZCBKU09OIGRhdGFcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZUNvbnRyb2xsZXJzIHtcclxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XHJcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZWxlbS5jbGFzc05hbWUgPSAndGFibGUtcm93cyc7XHJcbiAgICB0aGlzLmVsZW0uaW5uZXJIVE1MID0gdGVtcGxhdGUoeyBwZW9wbGU6IGRhdGEgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC90YWJsZS1yb3dzL2luZGV4LmpzIiwidmFyIEhhbmRsZWJhcnMgPSByZXF1aXJlKCdFOi9XZWIvV29yay9UZWNobm9zZXJ2L3RhYmxlLWVkaXRvci12YW5pbGxhanMvbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSAoSGFuZGxlYmFyc1snZGVmYXVsdCddIHx8IEhhbmRsZWJhcnMpLnRlbXBsYXRlKHtcIjFcIjpmdW5jdGlvbihjb250YWluZXIsZGVwdGgwLGhlbHBlcnMscGFydGlhbHMsZGF0YSkge1xuICAgIHZhciBoZWxwZXIsIGFsaWFzMT1kZXB0aDAgIT0gbnVsbCA/IGRlcHRoMCA6IChjb250YWluZXIubnVsbENvbnRleHQgfHwge30pLCBhbGlhczI9aGVscGVycy5oZWxwZXJNaXNzaW5nLCBhbGlhczM9XCJmdW5jdGlvblwiLCBhbGlhczQ9Y29udGFpbmVyLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgcmV0dXJuIFwiXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInRhYmxlLXJvdyB0YWJsZS1yb3ctZGF0YVxcXCI+XFxyXFxuICAgICAgICA8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJpZFxcXCIgdmFsdWU9XFxcIlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5pZCB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAuaWQgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImlkXCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIlxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ0YWJsZS1jZWxsIHRhYmxlLWNlbGwtZGF0YSB0YWJsZS1jZWxsLW5hbWVcXFwiIGRhdGEtZmllbGQ9XFxcIm5hbWVcXFwiIGNvbnRlbnRlZGl0YWJsZT5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMubmFtZSB8fCAoZGVwdGgwICE9IG51bGwgPyBkZXB0aDAubmFtZSA6IGRlcHRoMCkpICE9IG51bGwgPyBoZWxwZXIgOiBhbGlhczIpLCh0eXBlb2YgaGVscGVyID09PSBhbGlhczMgPyBoZWxwZXIuY2FsbChhbGlhczEse1wibmFtZVwiOlwibmFtZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRhYmxlLWNlbGwgdGFibGUtY2VsbC1kYXRhIHRhYmxlLWNlbGwtYWdlXFxcIiBkYXRhLWZpZWxkPVxcXCJhZ2VcXFwiIGNvbnRlbnRlZGl0YWJsZT5cIlxuICAgICsgYWxpYXM0KCgoaGVscGVyID0gKGhlbHBlciA9IGhlbHBlcnMuYWdlIHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5hZ2UgOiBkZXB0aDApKSAhPSBudWxsID8gaGVscGVyIDogYWxpYXMyKSwodHlwZW9mIGhlbHBlciA9PT0gYWxpYXMzID8gaGVscGVyLmNhbGwoYWxpYXMxLHtcIm5hbWVcIjpcImFnZVwiLFwiaGFzaFwiOnt9LFwiZGF0YVwiOmRhdGF9KSA6IGhlbHBlcikpKVxuICAgICsgXCI8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInRhYmxlLWNlbGwgdGFibGUtY2VsbC1kYXRhIHRhYmxlLWNlbGwtY2l0eVxcXCIgZGF0YS1maWVsZD1cXFwiY2l0eVxcXCIgY29udGVudGVkaXRhYmxlPlwiXG4gICAgKyBhbGlhczQoKChoZWxwZXIgPSAoaGVscGVyID0gaGVscGVycy5jaXR5IHx8IChkZXB0aDAgIT0gbnVsbCA/IGRlcHRoMC5jaXR5IDogZGVwdGgwKSkgIT0gbnVsbCA/IGhlbHBlciA6IGFsaWFzMiksKHR5cGVvZiBoZWxwZXIgPT09IGFsaWFzMyA/IGhlbHBlci5jYWxsKGFsaWFzMSx7XCJuYW1lXCI6XCJjaXR5XCIsXCJoYXNoXCI6e30sXCJkYXRhXCI6ZGF0YX0pIDogaGVscGVyKSkpXG4gICAgKyBcIjwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG5cIjtcbn0sXCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICB2YXIgc3RhY2sxO1xuXG4gIHJldHVybiAoKHN0YWNrMSA9IGhlbHBlcnMuZWFjaC5jYWxsKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwIDogKGNvbnRhaW5lci5udWxsQ29udGV4dCB8fCB7fSksKGRlcHRoMCAhPSBudWxsID8gZGVwdGgwLnBlb3BsZSA6IGRlcHRoMCkse1wibmFtZVwiOlwiZWFjaFwiLFwiaGFzaFwiOnt9LFwiZm5cIjpjb250YWluZXIucHJvZ3JhbSgxLCBkYXRhLCAwKSxcImludmVyc2VcIjpjb250YWluZXIubm9vcCxcImRhdGFcIjpkYXRhfSkpICE9IG51bGwgPyBzdGFjazEgOiBcIlwiKTtcbn0sXCJ1c2VEYXRhXCI6dHJ1ZX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGFibGUtcm93cy90YWJsZS1yb3dzLmhic1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vdGFibGUtcm93cy5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RhYmxlLXJvd3Muc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90YWJsZS1yb3dzLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGFibGUtcm93cy90YWJsZS1yb3dzLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnRTovV2ViL1dvcmsvVGVjaG5vc2Vydi90YWJsZS1lZGl0b3ItdmFuaWxsYWpzL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbJ2RlZmF1bHQnXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJmb290ZXJcXFwiPkZvb3RlcjwvZGl2PlwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90YWJsZS90YWJsZS5oYnNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBIYW5kbGViYXJzID0gcmVxdWlyZSgnRTovV2ViL1dvcmsvVGVjaG5vc2Vydi90YWJsZS1lZGl0b3ItdmFuaWxsYWpzL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL3J1bnRpbWUuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gKEhhbmRsZWJhcnNbJ2RlZmF1bHQnXSB8fCBIYW5kbGViYXJzKS50ZW1wbGF0ZSh7XCJjb21waWxlclwiOls3LFwiPj0gNC4wLjBcIl0sXCJtYWluXCI6ZnVuY3Rpb24oY29udGFpbmVyLGRlcHRoMCxoZWxwZXJzLHBhcnRpYWxzLGRhdGEpIHtcbiAgICByZXR1cm4gXCI8ZGl2IGNsYXNzPVxcXCJtb2RhbC1ib3hfX2NvbnRhaW5lclxcXCI+XFxyXFxuICAgIDxidXR0b24gaWQ9XFxcImluc2VydC1iZWZvcmVcXFwiPtCS0YHRgtCw0LLQuNGC0Ywg0LTQvjwvYnV0dG9uPlxcclxcbiAgICA8YnV0dG9uIGlkPVxcXCJpbnNlcnQtYWZ0ZXJcXFwiPtCS0YHRgtCw0LLQuNGC0Ywg0L/QvtGB0LvQtTwvYnV0dG9uPlxcclxcbjwvZGl2PlxcclxcblwiO1xufSxcInVzZURhdGFcIjp0cnVlfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90YWJsZS9tb2RhbC1ib3guaGJzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90YWJsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RhYmxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vdGFibGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90YWJsZS90YWJsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9zdHlsZS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21tb24vc3R5bGUuc2Nzc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgZ2V0ID0gKHVybCkgPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgdXJsKTtcclxuXHJcbiAgICB4aHIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZWplY3QoRXJyb3IoeGhyLnN0YXR1c1RleHQpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjdChFcnJvcignTmV0d29yayBlcnJvcicpKTtcclxuXHJcbiAgICB4aHIuc2VuZCgpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxubGV0IG9iajtcclxuXHJcbmdldCgnLi9kYXRhLmpzb24nKVxyXG4gIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgb2JqID0gSlNPTi5wYXJzZShyZXNwb25zZSkucGVvcGxlO1xyXG4gIH0pXHJcbiAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC90YWJsZS9nZXQtZGF0YS5qcyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc29ydERhdGEgPSAodGFibGVEYXRhLCBzb3J0RmllbGRJZCwgc29ydFN0YXRlKSA9PiB7XG4gIGNvbnN0IHNvcnRlZERhdGEgPSB7fTtcblxuICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKHRhYmxlRGF0YSk7XG4gIGNvbnN0IHNvcnRGaWVsZCA9IHNvcnRGaWVsZElkLnNwbGl0KCctJylbMV07XG5cbiAgbGV0IGN1cnJlbnRTb3J0U3RhdGUgPSBzb3J0U3RhdGU7XG5cbiAgY29uc3QgY29tcGFyZSA9IChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIChzb3J0U3RhdGUgPT09ICdhc2NlbmRpbmcnKSA/IGFbc29ydEZpZWxkXVswXS50b0xvd2VyQ2FzZSgpIDwgYltzb3J0RmllbGRdWzBdLnRvTG93ZXJDYXNlKClcbiAgICAgIDogYVtzb3J0RmllbGRdWzBdLnRvTG93ZXJDYXNlKCkgPiBiW3NvcnRGaWVsZF1bMF0udG9Mb3dlckNhc2UoKTtcbiAgfTtcblxuICBjb25zdCBjb21wYXJlTnVtYmVycyA9IChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIChzb3J0U3RhdGUgPT09ICdhc2NlbmRpbmcnKSA/ICthW3NvcnRGaWVsZF0gPCArYltzb3J0RmllbGRdIDogK2Fbc29ydEZpZWxkXSA+ICtiW3NvcnRGaWVsZF07XG4gIH07XG5cbiAgKHNvcnRGaWVsZCA9PT0gJ2FnZScpID8gYXJyLnNvcnQoY29tcGFyZU51bWJlcnMpIDogYXJyLnNvcnQoY29tcGFyZSk7XG5cbiAgc29ydGVkRGF0YS5wZW9wbGUgPSBhcnI7XG5cbiAgaWYgKGN1cnJlbnRTb3J0U3RhdGUgPT09ICdhc2NlbmRpbmcnKSB7XG4gICAgY3VycmVudFNvcnRTdGF0ZSA9ICdkaXNjZW5kaW5nJztcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50U29ydFN0YXRlID0gJ2FzY2VuZGluZyc7XG4gIH1cblxuICBzb3J0ZWREYXRhLnNvcnRTdGF0ZSA9IHtcbiAgICBzb3J0RmllbGRJZCxcbiAgICBjdXJyZW50U29ydFN0YXRlXG4gIH07XG5cbiAgcmV0dXJuIHNvcnRlZERhdGE7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodGFibGVEYXRhLCBzb3J0RmllbGRJZCwgc29ydFN0YXRlKSB7XG4gIHJldHVybiBzb3J0RGF0YSh0YWJsZURhdGEsIHNvcnRGaWVsZElkLCBzb3J0U3RhdGUpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3RhYmxlL3NvcnQtZGF0YS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7OztBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUE5UEE7Ozs7OztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDekJBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BOzs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pCQTtBQUNBOzs7OztBQTZCQTtBQUNBO0FBQ0E7QUFDQTtBQS9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBOzs7Ozs7O0FDNUJBO0FBQ0E7Ozs7O0FBb0NBO0FBQ0E7QUFDQTtBQUNBO0FBdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTs7O0EiLCJzb3VyY2VSb290IjoiIn0=