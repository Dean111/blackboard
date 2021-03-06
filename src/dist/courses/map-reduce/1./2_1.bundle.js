/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(2))(226);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = react_7de69c5da675c4deed75;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	// 用map处理字符串然后用reduce join字符串
	// 将 this-is-an-example 变为 This Is An Example
	var joined = "this-is-an-example".split("-").map(function (word) {
	     // 用map将每个词的第一个字符变成大写
	     var _word = _toArray(word),
	         head = _word[0],
	         others = _word.slice(1);

	     console.log("head:", head);
	     console.log("others:", others);
	     return head.toUpperCase() + others.reduce(function (x, y) {
	          return x + y;
	     }, "");
	}).reduce(function (s, word) {
	     console.log("reduce: " + word);
	     return s + " " + word;
	});
	console.log(joined);

/***/ }
/******/ ]);