(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./resources/js/Pages/Create.tsx":
/*!***************************************!*\
  !*** ./resources/js/Pages/Create.tsx ***!
  \***************************************/
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
var react_hook_form_1 = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.js");
var Create = function () {
    var _a = react_hook_form_1.useForm(), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.errors;
    var _b = react_1.useState(""), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState(""), review = _c[0], setReview = _c[1];
    var _d = react_1.useState(""), genre = _d[0], setGenre = _d[1];
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
    var onAddMovie = function (data) {
        var url = "";
        if (review !== "") {
            url = "/api/v1/Movies?title=" + title + "&review=" + review + "&genre=" + genre;
        }
        else {
            url = "/api/v1/Movies?title=" + title + "&genre=" + genre;
        }
        axios_1.default
            .post(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(function (response) {
            window.location.href = "/";
        })
            .catch(function (ex) {
            var error = ex.response.status === 404
                ? "Resource not found"
                : "An unexpected error has occurred";
            //setLoading(false);
        });
    };
    return (react_1.default.createElement("div", { className: "container" },
        react_1.default.createElement("form", { onSubmit: handleSubmit(onAddMovie), method: "post" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12" },
                    react_1.default.createElement("div", { className: "form-group" },
                        react_1.default.createElement("strong", null, "Title:"),
                        react_1.default.createElement("input", { type: "text", name: "title", className: "form-control", placeholder: "Title", onChange: getTitle, value: title, ref: register({ required: true }) }),
                        errors.title && errors.title.type === "required" && (react_1.default.createElement("div", { className: "alert alert-warning" }, "Your must enter your title.")))),
                react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12" },
                    react_1.default.createElement("div", { className: "form-group" },
                        react_1.default.createElement("strong", null, "Review:"),
                        react_1.default.createElement("input", { type: "text", name: "review", className: "form-control", placeholder: "Review", onChange: getReview, value: review, ref: register({ required: true }) }),
                        errors.review && errors.review.type === "required" && (react_1.default.createElement("div", { className: "alert alert-warning" }, "Your must enter your review.")))),
                react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12" },
                    react_1.default.createElement("div", { className: "form-group" },
                        react_1.default.createElement("strong", null, "Genre:"),
                        react_1.default.createElement("input", { type: "text", name: "genre", className: "form-control", placeholder: "Genre", onChange: getGenre, value: genre, ref: register({ required: true }) }),
                        errors.genre && errors.genre.type === "required" && (react_1.default.createElement("div", { className: "alert alert-warning" }, "Your must enter your genre.")))),
                react_1.default.createElement("div", { className: "col-xs-12 col-sm-12 col-md-12 text-center" },
                    react_1.default.createElement("button", { type: "submit", className: "btn btn-primary" }, "Submit"))))));
};
exports.default = Create;


/***/ })

}]);