import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import useEvent from './useEvent';
import useLayoutEffect from './useLayoutEffect';
import useState from './useState';
/**
 * Similar to `useState` but will use props value if provided.
 * Note that internal use rc-util `useState` hook.
 */

export default function useMergedState(defaultStateValue, option) {
  var _ref = option || {},
      defaultValue = _ref.defaultValue,
      value = _ref.value,
      onChange = _ref.onChange,
      postState = _ref.postState;

  var _useState = useState(function () {
    if (value !== undefined) {
      return value;
    }

    if (defaultValue !== undefined) {
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }

    return typeof defaultStateValue === 'function' ? defaultStateValue() : defaultStateValue;
  }),
      _useState2 = _slicedToArray(_useState, 2),
      innerValue = _useState2[0],
      setInnerValue = _useState2[1];

  var mergedValue = value !== undefined ? value : innerValue;
  var postMergedValue = postState ? postState(mergedValue) : mergedValue; // setState

  var onChangeFn = useEvent(onChange);

  var _useState3 = useState(),
      _useState4 = _slicedToArray(_useState3, 2),
      changePrevValue = _useState4[0],
      setChangePrevValue = _useState4[1];

  var triggerChange = useEvent(function (updater, ignoreDestroy) {
    setChangePrevValue(mergedValue, true);
    setInnerValue(function (prev) {
      var nextValue = typeof updater === 'function' ? updater(prev) : updater;
      return nextValue;
    }, ignoreDestroy);
  }); // Effect to trigger onChange

  useLayoutEffect(function () {
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