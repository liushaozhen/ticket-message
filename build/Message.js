'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _beeNotification = require('bee-notification');

var _beeNotification2 = _interopRequireDefault(_beeNotification);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultDuration = 1.5;
var defaultTop = 0;
var defaultBottom = 48;
var bottom = 90;
var padding = 30;
var width = 200;
var messageInstance = void 0;
var key = 1;
var clsPrefix = 'u-message';
var noop = function noop() {};

var positionObj = {
    "top": {
        messageStyle: {
            width: "100%"
        },
        notificationStyle: {
            top: defaultTop,
            width: "100%"
        },
        transitionName: 'top'
    },
    "bottom": {
        messageStyle: {
            width: "100%"
        },
        notificationStyle: {
            bottom: defaultBottom,
            width: "100%"
        },
        transitionName: 'bottom'
    },
    "topRight": {
        messageStyle: {
            width: width
        },
        notificationStyle: {
            top: padding,
            right: padding,
            width: width
        },
        transitionName: 'right'
    },
    "bottomRight": {
        messageStyle: {
            width: width
        },
        notificationStyle: {
            bottom: bottom,
            right: padding,
            width: width
        },
        transitionName: 'right'
    },
    "topLeft": {
        messageStyle: {
            width: width
        },
        notificationStyle: {
            top: padding,
            left: padding,
            width: width
        },
        transitionName: 'left'
    },
    "bottomLeft": {
        messageStyle: {
            width: width
        },
        notificationStyle: {
            bottom: bottom,
            left: padding,
            width: width
        },
        transitionName: 'left'
    }
};

function getMessageInstance() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'top';

    var style = positionObj[position].notificationStyle;
    messageInstance = messageInstance || _beeNotification2["default"].newInstance({
        clsPrefix: clsPrefix,
        transitionName: clsPrefix + '-' + positionObj[position].transitionName,
        style: style, // 覆盖原来的样式
        position: ''
    });
    return messageInstance;
}

function notice(content, duration, type, onClose, position) {
    var iconType = {
        info: 'uf uf-i-c-2',
        success: 'uf uf-correct',
        danger: 'uf uf-close-c',
        warning: 'uf uf-exc-t',
        light: 'uf uf-notification',
        dark: 'uf uf-bubble',
        news: 'uf uf-bell',
        infolight: 'uf uf-i-c-2',
        successlight: 'uf uf-correct',
        dangerlight: 'uf uf-close-c',
        warninglight: 'uf uf-exc-t'
    }[type];

    var style = positionObj[position].messageStyle;

    var instance = getMessageInstance(position);

    instance.notice({
        key: key,
        duration: duration,
        color: type,
        style: style,
        content: _react2["default"].createElement(
            'div',
            null,
            _react2["default"].createElement(
                'div',
                { className: clsPrefix + '-notice-description-icon' },
                _react2["default"].createElement('i', { className: (0, _classnames2["default"])(iconType) })
            ),
            _react2["default"].createElement('div', { className: clsPrefix + '-notice-description-content', dangerouslySetInnerHTML: { __html: content } })
        ),
        onClose: onClose
    });
    return function () {
        var target = key++;
        return function () {
            instance.removeNotice(target);
        };
    }();
}

exports["default"] = {
    create: function create(obj) {
        var content = obj.content || '';
        var duration = _typeof(obj.duration) == undefined ? defaultDuration : obj.duration;
        var color = obj.color || 'dark';
        var onClose = obj.onClose || noop;
        var position = obj.position || "top";
        return notice(content, duration, color, onClose, position);
    },
    config: function config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.clsPrefix !== undefined) {
            clsPrefix = options.clsPrefix;
        }
        if (options.defaultBottom !== undefined) {
            defaultBottom = options.defaultBottom;
        }
        if (options.bottom !== undefined) {
            bottom = options.bottom;
        }
        if (options.width !== undefined) {
            bottom = options.width;
        }
    },
    destroy: function destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
module.exports = exports['default'];