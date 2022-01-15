"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonteCarloTreeNode = exports.GomokuCore = exports.Board = exports.Piece = void 0;
const GomokuCoreWithAgent_1 = __importDefault(require("./GomokuCoreWithAgent"));
exports.default = GomokuCoreWithAgent_1.default;
var GomokuCore_1 = require("./utils/GomokuCore");
Object.defineProperty(exports, "Piece", { enumerable: true, get: function () { return GomokuCore_1.Piece; } });
Object.defineProperty(exports, "Board", { enumerable: true, get: function () { return GomokuCore_1.Board; } });
Object.defineProperty(exports, "GomokuCore", { enumerable: true, get: function () { return __importDefault(GomokuCore_1).default; } });
var MonteCarloTreeNode_1 = require("./utils/MonteCarloTreeNode");
Object.defineProperty(exports, "MonteCarloTreeNode", { enumerable: true, get: function () { return __importDefault(MonteCarloTreeNode_1).default; } });
//# sourceMappingURL=index.js.map