(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/Pages/Home.tsx":
/*!*************************************!*\
  !*** ./resources/js/Pages/Home.tsx ***!
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
var Pagination_1 = __webpack_require__(/*! ./Pagination */ "./resources/js/Pages/Pagination.tsx");
var axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
var inertia_react_1 = __webpack_require__(/*! @inertiajs/inertia-react */ "./node_modules/@inertiajs/inertia-react/dist/index.js");
var Home = function () {
    var defaultProps = [];
    var _a = react_1.useState(defaultProps), data = _a[0], setData = _a[1];
    var _b = react_1.useState(0), totalV = _b[0], setTotal = _b[1];
    var _c = react_1.useState(0), totalPerPageV = _c[0], setTotalPerPage = _c[1];
    var _d = react_1.useState(0), currPage = _d[0], setCurrPage = _d[1];
    var _e = react_1.useState(""), search = _e[0], setSearch = _e[1];
    //const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    ///const [error, setError]: [string, (error: string) => void] = useState("");
    //const onDeleteMovie = (event: React.FormEvent, id: number) => {
    var getSearch = function (e) {
        var search = e.target.value;
        setSearch(search);
    };
    var onSearchMovie = function (event, val) {
        axios_1.default
            .get("/api/v1/movies/search?w=" + val, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(function (response) {
            setData(response.data.data);
            setTotalPerPage(response.data.per_page);
            setTotal(response.data.total);
            setCurrPage(response.data.current_page);
        });
        return false;
    };
    var onDeleteMovie = function (id) {
        axios_1.default
            .delete("/api/v1/Movies/" + id, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(function (response) {
            setData(data.filter(function (item) {
                return item.id !== id;
            }));
        });
    };
    var refresh = function (page) {
        var url = "";
        if (page !== null && typeof page !== undefined)
            url = "/api/v1/Movies?page=" + page;
        else
            url = "/api/v1/Movies";
        axios_1.default
            .get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(function (response) {
            setData(response.data.data);
            setTotalPerPage(response.data.per_page);
            setTotal(response.data.total);
            setCurrPage(response.data.current_page);
        });
    };
    react_1.useEffect(function () {
        refresh();
    }, []);
    var paginate = function (pageNumber) {
        refresh(pageNumber);
    };
    var _f = react_1.useState(1), curHeadClick = _f[0], setCurHeadClick = _f[1];
    var onSort = function (header) {
        var d = 0;
        var url = "";
        if (curHeadClick === 1) {
            setCurHeadClick(0);
            d = 0;
        }
        else {
            setCurHeadClick(1);
            d = 1;
        }
        if (search == "") {
            url = "/api/v1/movies/sort?s=" + header + "&g=" + d;
        }
        else
            url = "/api/v1/movies/sort?s=" + header + "&g=" + d + "&w=" + search;
        axios_1.default.
            get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
            .then(function (response) {
            setData(response.data.data);
            setTotalPerPage(response.data.per_page);
            setTotal(response.data.total);
            setCurrPage(response.data.current_page);
        });
    };
    return (react_1.default.createElement("div", { className: "container mt-4" },
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "active-cyan-4 mb-4" },
                react_1.default.createElement("input", { className: "form-control", type: "text", placeholder: "Search", "aria-label": "Search", onChange: getSearch, value: search, onKeyUp: function (e) { return onSearchMovie(e, search); } })),
            react_1.default.createElement("div", { className: "col-md-4" },
                react_1.default.createElement("a", { className: "btn btn-success", href: "/create" }, "Add New Movie")),
            react_1.default.createElement("table", { className: "table table-bordered" },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", null,
                        react_1.default.createElement("th", { onClick: function () { return onSort(0); } }, "Title"),
                        react_1.default.createElement("th", { onClick: function () { return onSort(1); } }, "Genre"),
                        react_1.default.createElement("th", { onClick: function () { return onSort(2); } }, "Review"),
                        react_1.default.createElement("th", null, "Action"))),
                react_1.default.createElement("tbody", null, data.map(function (datas, i) {
                    return (react_1.default.createElement("tr", { key: i },
                        react_1.default.createElement("td", null, datas.title),
                        react_1.default.createElement("td", null, datas.genre),
                        react_1.default.createElement("td", null, datas.review),
                        react_1.default.createElement("td", null,
                            react_1.default.createElement("div", { className: "row" },
                                react_1.default.createElement("div", { className: "col-md-3" },
                                    react_1.default.createElement("a", { className: "btn btn-outline-success my-2 my-sm-0", onClick: function () { onDeleteMovie(datas.id); } }, "Delete")),
                                react_1.default.createElement("div", { className: "col-md-3" },
                                    react_1.default.createElement(inertia_react_1.InertiaLink, { href: "/edit?id=" + datas.id, className: "btn btn-outline-success my-2 my-sm-0" }, "Edit"))))));
                })))),
        react_1.default.createElement(Pagination_1.Pagination, { totalPerPage: totalPerPageV, total: totalV, ClickHandler: paginate })));
};
exports.default = Home;


/***/ }),

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