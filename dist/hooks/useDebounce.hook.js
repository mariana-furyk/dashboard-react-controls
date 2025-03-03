"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebounce = void 0;
var _react = require("react");
/*
Copyright 2022 Iguazio Systems Ltd.
Licensed under the Apache License, Version 2.0 (the "License") with
an addition restriction as set forth herein. You may not use this
file except in compliance with the License. You may obtain a copy of
the License at http://www.apache.org/licenses/LICENSE-2.0.
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.
In addition, you may not use the software for any purposes that are
illegal under applicable law, and the grant of the foregoing license
under the Apache 2.0 license is conditioned upon your compliance with
such restriction.
*/

const useDebounce = () => {
  const timeout = (0, _react.useRef)(null);
  const lastValue = (0, _react.useRef)(null);
  const lastResult = (0, _react.useRef)(null);
  return (0, _react.useCallback)((validate, time) => {
    return value => {
      return new Promise(resolve => {
        if (timeout.current) {
          timeout.current();
        }
        if (value !== lastValue.current) {
          const timerId = setTimeout(() => {
            lastValue.current = value;
            lastResult.current = validate(value);
            resolve(lastResult.current);
          }, time);
          timeout.current = () => {
            clearTimeout(timerId);
            resolve(true);
          };
        } else {
          resolve(lastResult.current);
        }
      });
    };
  }, []);
};
exports.useDebounce = useDebounce;