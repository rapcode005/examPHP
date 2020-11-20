(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/js/Pages/Pagination.tsx":
/*!*******************************************!*\
  !*** ./resources/js/Pages/Pagination.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
var react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
exports.Pagination = function (_a) {
    var total = _a.total, totalPerPage = _a.totalPerPage, ClickHandler = _a.ClickHandler;
    var pageNumbers = [];
    for (var i = 1; i <= Math.ceil(total / totalPerPage); i++) {
        pageNumbers.push(i);
    }
    return (react_1.default.createElement("nav", null,
        react_1.default.createElement("ul", { className: 'pagination' }, pageNumbers.map(function (number) { return (react_1.default.createElement("li", { key: number, className: 'page-item' },
            react_1.default.createElement("a", { onClick: function () { return ClickHandler(number); }, className: 'page-link touch' }, number))); }))));
};


/***/ })

}]);