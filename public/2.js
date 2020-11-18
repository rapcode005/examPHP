(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./resources/js/Pages/Edit.tsx":
/*!*************************************!*\
  !*** ./resources/js/Pages/Edit.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
var Edit = function () {
    var params = new URLSearchParams(window.location.search);
    var _a = react_1.useState(0), id = _a[0], setId = _a[1];
    var _b = react_1.useState(""), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState(""), review = _c[0], setReview = _c[1];
    var _d = react_1.useState(""), genre = _d[0], setGenre = _d[1];
    react_1.useEffect(function () {
        axios_1.default
            .get("/api/v1/Movies/" + params.get('id'), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(function (response) {
            setTitle(response.data.title);
            setId(response.data.id);
            setReview(response.data.review);
            setGenre(response.data.genre);
            //set(response.data[0].title);
            //setTitle(response.data[0].title);
            //setLoading(false);
        })
            .catch(function (ex) {
            var error = ex === 404
                ? "Resource not found"
                : "An unexpected error has occurred";
            //setError(error);
            //setLoading(false);
        });
    }, []);
    var getTitle = function (e) {
        var title = e.target.value;
        setTitle(title);
    };
    var getReview = function (e) {
        var review = e.target.value;
        setReview(review);
    };
    var getGenre = function (e) {
        var genre = e.target.value;
        setGenre(genre);
    };
    var onEditMovie = function (event) {
        var url = "";
        if (review !== "") {
            url = "/api/v1/Movies/" + id + "?title=" + title + "&review=" + review + "&genre=" + genre;
        }
        else {
            url = "/api/v1/Movies/" + id + "?title=" + title + "&genre=" + genre;
        }
        axios_1.default
            .put(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(function (response) {
            window.location.href = "/home";
        })
            .catch(function (ex) {
            //const error =
            //ex.response.status === 404
            //? "Resource not found"
            //: "An unexpected error has occurred";
            //setLoading(false);
        });
    };
    return (react_1.default.createElement("div", { className: "container" },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12" },
                react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("strong", null, "Title:"),
                    react_1.default.createElement("input", { type: "text", name: "title", className: "form-control", placeholder: "Title", onChange: getTitle, value: title }))),
            react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12" },
                react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("strong", null, "Review:"),
                    react_1.default.createElement("input", { type: "text", name: "review", className: "form-control", placeholder: "Review", onChange: getReview, value: review }))),
            react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12" },
                react_1.default.createElement("div", { className: "form-group" },
                    react_1.default.createElement("strong", null, "Genre:"),
                    react_1.default.createElement("input", { type: "text", name: "genre", className: "form-control", placeholder: "Genre", onChange: getGenre, value: genre }))),
            react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12 text-center" },
                react_1.default.createElement("button", { type: "submit", onClick: function (e) { return onEditMovie(e); }, className: "btn btn-primary" }, "Submit")))));
};
exports.default = Edit;


/***/ })

}]);