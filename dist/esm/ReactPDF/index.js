var _excluded = ["file", "error", "loading", "noData", "className"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useReducer } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Input, Tooltip, Spin, Space } from 'antd';
import { LeftOutlined, RightOutlined, PlusOutlined, MinusOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import cls from 'classnames';
import "./index.less";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
pdfjs.GlobalWorkerOptions.workerSrc = "./pdfJs/2.12.313/pdf.worker.js";
var initialState = {
  pageNumber: 1,
  pageNumberInput: 1,
  pageNumberFocus: false,
  numPages: 1,
  pageWidth: 600,
  fullscreen: false
};

function reducer(state, action) {
  return _objectSpread(_objectSpread({}, state), action);
}

export function ReactPDF(_ref) {
  var file = _ref.file,
      _ref$error = _ref.error,
      error = _ref$error === void 0 ? '加载PDF文件失败。' : _ref$error,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? '加载中...' : _ref$loading,
      _ref$noData = _ref.noData,
      noData = _ref$noData === void 0 ? '未指定 PDF 文件。' : _ref$noData,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded);

  var _useReducer = useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      pageNumber = _useReducer2$.pageNumber,
      pageNumberInput = _useReducer2$.pageNumberInput,
      pageNumberFocus = _useReducer2$.pageNumberFocus,
      numPages = _useReducer2$.numPages,
      pageWidth = _useReducer2$.pageWidth,
      fullscreen = _useReducer2$.fullscreen,
      dispatch = _useReducer2[1];

  var onDocumentLoadSuccess = function onDocumentLoadSuccess(_ref2) {
    var numPages = _ref2.numPages;
    dispatch({
      numPages: numPages
    });
  };

  var lastPage = function lastPage() {
    if (pageNumber === 1) {
      return;
    }

    var page = pageNumber - 1;
    dispatch({
      pageNumber: page,
      pageNumberInput: page
    });
  };

  var nextPage = function nextPage() {
    if (pageNumber === numPages) {
      return;
    }

    var page = pageNumber + 1;
    dispatch({
      pageNumber: page,
      pageNumberInput: page
    });
  };

  var onPageNumberFocus = function onPageNumberFocus(e) {
    dispatch({
      pageNumberFocus: true
    });
  };

  var onPageNumberBlur = function onPageNumberBlur(e) {
    dispatch({
      pageNumberFocus: false,
      pageNumberInput: pageNumber
    });
  };

  var onPageNumberChange = function onPageNumberChange(e) {
    var value = e.target.value;
    value = value <= 0 ? 1 : value;
    value = value >= numPages ? numPages : value;
    dispatch({
      pageNumberInput: value
    });
  };

  var toPage = function toPage(e) {
    dispatch({
      pageNumber: Number(e.target.value)
    });
  };

  var pageZoomOut = function pageZoomOut() {
    if (pageWidth <= 600) {
      return;
    }

    dispatch({
      pageWidth: pageWidth * 0.8
    });
  };

  var pageZoomIn = function pageZoomIn() {
    dispatch({
      pageWidth: pageWidth * 1.2
    });
  };

  var pageFullscreen = function pageFullscreen() {
    if (fullscreen) {
      dispatch({
        fullscreen: false,
        pageWidth: 600
      });
    } else {
      dispatch({
        fullscreen: true,
        pageWidth: window.screen.width - 40
      });
    }
  };

  return /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({
    className: cls('go-pdf-view', className)
  }, props), {}, {
    children: [/*#__PURE__*/_jsx("div", {
      className: 'go-page-container',
      children: /*#__PURE__*/_jsx(Document, {
        file: file,
        onLoadSuccess: onDocumentLoadSuccess,
        loading: /*#__PURE__*/_jsx(Spin, {
          size: "large",
          tip: loading
        }),
        noData: noData,
        error: error,
        children: /*#__PURE__*/_jsx(Page, {
          pageNumber: pageNumber,
          width: pageWidth,
          loading: /*#__PURE__*/_jsx(Spin, {
            size: "large"
          })
        })
      })
    }), /*#__PURE__*/_jsx("div", {
      className: 'go-page-tool',
      children: /*#__PURE__*/_jsxs(Space, {
        children: [/*#__PURE__*/_jsx(Tooltip, {
          title: pageNumber === 1 ? '已是第一页' : '上一页',
          children: /*#__PURE__*/_jsx(LeftOutlined, {
            onClick: lastPage
          })
        }), /*#__PURE__*/_jsx(Input, {
          value: pageNumberFocus ? pageNumberInput : pageNumber,
          onFocus: onPageNumberFocus,
          onBlur: onPageNumberBlur,
          onChange: onPageNumberChange,
          onPressEnter: toPage,
          type: "number"
        }), ' ', "/ ", numPages, /*#__PURE__*/_jsx(Tooltip, {
          title: pageNumber === numPages ? '已是最后一页' : '下一页',
          children: /*#__PURE__*/_jsx(RightOutlined, {
            onClick: nextPage
          })
        }), /*#__PURE__*/_jsx(Tooltip, {
          title: "\u653E\u5927",
          children: /*#__PURE__*/_jsx(PlusOutlined, {
            onClick: pageZoomIn
          })
        }), /*#__PURE__*/_jsx(Tooltip, {
          title: "\u7F29\u5C0F",
          children: /*#__PURE__*/_jsx(MinusOutlined, {
            onClick: pageZoomOut
          })
        }), /*#__PURE__*/_jsx(Tooltip, {
          title: fullscreen ? '恢复默认' : '适合窗口',
          children: fullscreen ? /*#__PURE__*/_jsx(FullscreenExitOutlined, {
            onClick: pageFullscreen
          }) : /*#__PURE__*/_jsx(FullscreenOutlined, {
            onClick: pageFullscreen
          })
        })]
      })
    })]
  }));
}