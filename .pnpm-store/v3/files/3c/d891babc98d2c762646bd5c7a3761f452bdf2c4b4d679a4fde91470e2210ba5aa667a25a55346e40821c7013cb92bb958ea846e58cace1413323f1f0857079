"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoStyleItemContext = exports.NoFormStyle = exports.FormProvider = exports.FormItemPrefixContext = exports.FormItemInputContext = exports.FormContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _rcFieldForm = require("rc-field-form");

var _omit = _interopRequireDefault(require("rc-util/lib/omit"));

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FormContext = /*#__PURE__*/React.createContext({
  labelAlign: 'right',
  vertical: false,
  itemRef: function itemRef() {}
});
exports.FormContext = FormContext;
var NoStyleItemContext = /*#__PURE__*/React.createContext(null);
exports.NoStyleItemContext = NoStyleItemContext;

var FormProvider = function FormProvider(props) {
  var providerProps = (0, _omit["default"])(props, ['prefixCls']);
  return /*#__PURE__*/React.createElement(_rcFieldForm.FormProvider, (0, _extends2["default"])({}, providerProps));
};

exports.FormProvider = FormProvider;
var FormItemPrefixContext = /*#__PURE__*/React.createContext({
  prefixCls: ''
});
exports.FormItemPrefixContext = FormItemPrefixContext;
var FormItemInputContext = /*#__PURE__*/React.createContext({});
exports.FormItemInputContext = FormItemInputContext;

var NoFormStyle = function NoFormStyle(_ref) {
  var children = _ref.children,
      status = _ref.status,
      override = _ref.override;
  var formItemInputContext = (0, React.useContext)(FormItemInputContext);
  var newFormItemInputContext = (0, React.useMemo)(function () {
    var newContext = (0, _extends2["default"])({}, formItemInputContext);

    if (override) {
      delete newContext.isFormItemInput;
    }

    if (status) {
      delete newContext.status;
      delete newContext.hasFeedback;
      delete newContext.feedbackIcon;
    }

    return newContext;
  }, [status, override, formItemInputContext]);
  return /*#__PURE__*/React.createElement(FormItemInputContext.Provider, {
    value: newFormItemInputContext
  }, children);
};

exports.NoFormStyle = NoFormStyle;