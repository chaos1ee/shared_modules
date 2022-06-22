"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMergedState;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _useEvent = _interopRequireDefault(require("./useEvent"));

var _useLayoutEffect = _interopRequireDefault(require("./useLayoutEffect"));

var _useState5 = _interopRequireDefault(require("./useState"));

/**
 * Similar to `useState` but will use props value if provided.
 * Note that internal use rc-util `useState` hook.
 */
function useMergedState(defaultStateValue, option) {
  var _ref = option || {},
      defaultValue = _ref.defaultValue,
      value = _ref.value,
      onChange = _ref.onChange,
      postState = _ref.postState;

  var _useState = (0, _useState5.default)(function () {
    if (value !== undefined) {
      return value;
    }

    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }

    return typeof defaultStateValue === 'function' ? defaultStateValue() : defaultStateValue;
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      innerValue = _useState2[0],
      setInnerValue = _useState2[1];

  var mergedValue = value !== undefined ? value : innerValue;
  var postMergedValue = postState ? postState(mergedValue) : mergedValue; // setState

  var onChangeFn = (0, _useEvent.default)(onChange);

  var _useState3 = (0, _useState5.default)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      changePrevValue = _useState4[0],
      setChangePrevValue = _useState4[1];

  var triggerChange = (0, _useEvent.default)(function (updater, ignoreDestroy) {
    setChangePrevValue(mergedValue, true);
    setInnerValue(function (prev) {
      var nextValue = typeof updater === 'function' ? updater(prev) : updater;
      return nextValue;
    }, ignoreDestroy);
  }); // Effect to trigger onChange

  (0, _useLayoutEffect.default)(function () {
    if (changePrevValue !== undefined && changePrevValue !== innerValue) {
      onChangeFn === null || onChangeFn === void 0 ? void 0 : onChangeFn(innerValue, changePrevValue);
    }
  }, [changePrevValue, innerValue, onChangeFn]); // Effect of reset value to `undefined`

  var prevValueRef = React.useRef(value);
  React.useEffect(function () {
    if (value === undefined && value !== prevValueRef.current) {
      setInnerValue(value);
    }

    prevValueRef.current = value;
  }, [value]);
  return [postMergedValue, triggerChange];
}