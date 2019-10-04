"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _roleManagerApi = _interopRequireDefault(require("../docs/role-manager-api.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  app.use((0, _morgan["default"])('dev'));
}

var DEBUG = (0, _debug["default"])('dev');
var PORT = process.env.PORT || 5000;
app.use('/api/v1/docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_roleManagerApi["default"]));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.get('/', function (req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Role-Manager...'
  });
});
app.get(function (req, res, next) {
  var error = new Error('resource not found');
  error.status = 404;
  next();
});
app.get(function (error, req, res) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: 'an error occurred while loading this page'
    }
  });
});
app.listen(PORT, function () {
  return DEBUG("Server running on port ".concat(PORT));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map