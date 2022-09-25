"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/graphql";
exports.ids = ["pages/api/graphql"];
exports.modules = {

/***/ "@graphql-yoga/node":
/*!*************************************!*\
  !*** external "@graphql-yoga/node" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("@graphql-yoga/node");;

/***/ }),

/***/ "(api)/./pages/api/graphql.ts":
/*!******************************!*\
  !*** ./pages/api/graphql.ts ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _graphql_yoga_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @graphql-yoga/node */ \"@graphql-yoga/node\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_graphql_yoga_node__WEBPACK_IMPORTED_MODULE_0__]);\n_graphql_yoga_node__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst server = (0,_graphql_yoga_node__WEBPACK_IMPORTED_MODULE_0__.createServer)({\n    schema: {\n        typeDefs: /* GraphQL */ `\n      type Query {\n        hello: String\n      }\n    `,\n        resolvers: {\n            Query: {\n                hello: ()=>\"Hello from Yoga!\"\n            }\n        }\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (server);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ3JhcGhxbC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFrRDtBQUVsRCxNQUFNQyxNQUFNLEdBQUdELGdFQUFZLENBQUM7SUFDMUJFLE1BQU0sRUFBRTtRQUNOQyxRQUFRLEVBQUUsV0FBVyxHQUFHLENBQUM7Ozs7SUFJekIsQ0FBQztRQUNEQyxTQUFTLEVBQUU7WUFDVEMsS0FBSyxFQUFFO2dCQUNMQyxLQUFLLEVBQUUsSUFBTSxrQkFBa0I7YUFDaEM7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVGLGlFQUFlTCxNQUFNLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWItc3RhcnRlci8uL3BhZ2VzL2FwaS9ncmFwaHFsLnRzP2VhMWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VydmVyIH0gZnJvbSBcIkBncmFwaHFsLXlvZ2Evbm9kZVwiO1xuXG5jb25zdCBzZXJ2ZXIgPSBjcmVhdGVTZXJ2ZXIoe1xuICBzY2hlbWE6IHtcbiAgICB0eXBlRGVmczogLyogR3JhcGhRTCAqLyBgXG4gICAgICB0eXBlIFF1ZXJ5IHtcbiAgICAgICAgaGVsbG86IFN0cmluZ1xuICAgICAgfVxuICAgIGAsXG4gICAgcmVzb2x2ZXJzOiB7XG4gICAgICBRdWVyeToge1xuICAgICAgICBoZWxsbzogKCkgPT4gXCJIZWxsbyBmcm9tIFlvZ2EhXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmVyO1xuXG4iXSwibmFtZXMiOlsiY3JlYXRlU2VydmVyIiwic2VydmVyIiwic2NoZW1hIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJRdWVyeSIsImhlbGxvIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/graphql.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/graphql.ts"));
module.exports = __webpack_exports__;

})();