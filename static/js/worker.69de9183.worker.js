!function(){var t={228:function(t){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n},t.exports.__esModule=!0,t.exports.default=t.exports},858:function(t){t.exports=function(t){if(Array.isArray(t))return t},t.exports.__esModule=!0,t.exports.default=t.exports},646:function(t,e,r){var n=r(228);t.exports=function(t){if(Array.isArray(t))return n(t)},t.exports.__esModule=!0,t.exports.default=t.exports},506:function(t){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t},t.exports.__esModule=!0,t.exports.default=t.exports},575:function(t){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},t.exports.__esModule=!0,t.exports.default=t.exports},913:function(t){function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t},t.exports.__esModule=!0,t.exports.default=t.exports},842:function(t,e,r){var n=r(754),o=r(67),i=r(585);t.exports=function(t){var e=o();return function(){var r,o=n(t);if(e){var a=n(this).constructor;r=Reflect.construct(o,arguments,a)}else r=o.apply(this,arguments);return i(this,r)}},t.exports.__esModule=!0,t.exports.default=t.exports},525:function(t,e,r){var n=r(331);function o(){return"undefined"!==typeof Reflect&&Reflect.get?(t.exports=o=Reflect.get,t.exports.__esModule=!0,t.exports.default=t.exports):(t.exports=o=function(t,e,r){var o=n(t,e);if(o){var i=Object.getOwnPropertyDescriptor(o,e);return i.get?i.get.call(arguments.length<3?t:r):i.value}},t.exports.__esModule=!0,t.exports.default=t.exports),o.apply(this,arguments)}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},754:function(t){function e(r){return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},205:function(t,e,r){var n=r(489);t.exports=function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&n(t,e)},t.exports.__esModule=!0,t.exports.default=t.exports},67:function(t){t.exports=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}},t.exports.__esModule=!0,t.exports.default=t.exports},860:function(t){t.exports=function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)},t.exports.__esModule=!0,t.exports.default=t.exports},884:function(t){t.exports=function(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,u=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return i}},t.exports.__esModule=!0,t.exports.default=t.exports},521:function(t){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},206:function(t){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},t.exports.__esModule=!0,t.exports.default=t.exports},585:function(t,e,r){var n=r(8).default,o=r(506);t.exports=function(t,e){if(e&&("object"===n(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return o(t)},t.exports.__esModule=!0,t.exports.default=t.exports},489:function(t){function e(r,n){return t.exports=e=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r,n)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},38:function(t,e,r){var n=r(858),o=r(884),i=r(379),a=r(521);t.exports=function(t,e){return n(t)||o(t,e)||i(t,e)||a()},t.exports.__esModule=!0,t.exports.default=t.exports},331:function(t,e,r){var n=r(754);t.exports=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=n(t)););return t},t.exports.__esModule=!0,t.exports.default=t.exports},319:function(t,e,r){var n=r(646),o=r(860),i=r(379),a=r(206);t.exports=function(t){return n(t)||o(t)||i(t)||a()},t.exports.__esModule=!0,t.exports.default=t.exports},8:function(t){function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},379:function(t,e,r){var n=r(228);t.exports=function(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}},t.exports.__esModule=!0,t.exports.default=t.exports},272:function(t,e,r){"use strict";var n=r(575).default,o=r(913).default,i=r(525).default,a=r(754).default,u=r(205).default,s=r(842).default,l=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var f=l(r(629)),c=l(r(323)),p=function(t){u(r,t);var e=s(r);function r(){var t;return n(this,r),(t=e.call(this)).node=new c.default,t}return o(r,[{key:"getNextNode",value:function(t,e){var r=this.node.children.get([t,e].toString());return r||(r=new c.default([t,e],this.node),this.node.children.set([t,e].toString(),r)),r}},{key:"move",value:function(t,e){var n=i(a(r.prototype),"move",this).call(this,t,e);return n&&(this.node=this.getNextNode(t,e)),n}},{key:"withdraw",value:function(){var t=i(a(r.prototype),"withdraw",this).call(this);return t&&(this.node=this.node.parent),t}},{key:"reset",value:function(){for(i(a(r.prototype),"reset",this).call(this);this.node.parent;)this.node=this.node.parent}},{key:"search",value:function(){return this.node.move?(this.node.mcts(),this.node.bestMove()):[7,7]}}]),r}(f.default);e.default=p},568:function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.MonteCarloTreeNode=e.GomokuCore=e.Board=e.Piece=void 0;var o=n(r(272));e.default=o.default;var i=r(629);Object.defineProperty(e,"Piece",{enumerable:!0,get:function(){return i.Piece}}),Object.defineProperty(e,"Board",{enumerable:!0,get:function(){return i.Board}}),Object.defineProperty(e,"GomokuCore",{enumerable:!0,get:function(){return n(i).default}});var a=r(323);Object.defineProperty(e,"MonteCarloTreeNode",{enumerable:!0,get:function(){return n(a).default}})},629:function(t,e,r){"use strict";var n,o=r(575).default,i=r(913).default;Object.defineProperty(e,"__esModule",{value:!0}),e.Board=e.Piece=void 0,function(t){t[t.EMPTY=0]="EMPTY",t[t.BLACK=1]="BLACK",t[t.WHITE=2]="WHITE",t[t.BOARDER=3]="BOARDER"}(n=e.Piece||(e.Piece={}));var a=function(){function t(){o(this,t),this.data=new Uint8Array(t.SIZE*t.SIZE)}return i(t,[{key:"get",value:function(e,r){return e<0||e>=t.SIZE||r<0||r>=t.SIZE?n.BOARDER:this.data[e*t.SIZE+r]}},{key:"set",value:function(e,r,n){e<0||e>=t.SIZE||r<0||r>=t.SIZE||(this.data[e*t.SIZE+r]=n)}}]),t}();e.Board=a,a.SIZE=15;var u=function(){function t(){o(this,t),this.board=new a,this.history=[],this.winner=n.EMPTY}return i(t,[{key:"getBoardAt",value:function(t,e){return this.board.get(t,e)}},{key:"setBoardAt",value:function(t,e,r){this.board.set(t,e,r)}},{key:"getCurrentPlayer",value:function(){return this.history.length%2===0?n.BLACK:n.WHITE}},{key:"getLastMove",value:function(){return 0===this.history.length?null:this.history[this.history.length-1]}},{key:"pushMove",value:function(t,e){this.history.push([t,e])}},{key:"popMove",value:function(){var t=this.history.pop();return t||null}},{key:"getWinner",value:function(){return this.winner}},{key:"checkWinner",value:function(t,e,r){for(var n=-5;n<5;n+=1)if(this.getBoardAt(t,e+n)===r){for(var o=n;this.getBoardAt(t,e+n+1)===r;)n+=1;if(n-o+1>=5)return void(this.winner=r)}for(var i=-5;i<5;i+=1)if(this.getBoardAt(t+i,e)===r){for(var a=i;this.getBoardAt(t+i+1,e)===r;)i+=1;if(i-a+1>=5)return void(this.winner=r)}for(var u=-5;u<5;u+=1)if(this.getBoardAt(t+u,e+u)===r){for(var s=u;this.getBoardAt(t+u+1,e+u+1)===r;)u+=1;if(u-s+1>=5)return void(this.winner=r)}for(var l=-5;l<5;l+=1)if(this.getBoardAt(t+l,e-l)===r){for(var f=l;this.getBoardAt(t+l+1,e-l-1)===r;)l+=1;if(l-f+1>=5)return void(this.winner=r)}}},{key:"move",value:function(t,e){var r=this.getCurrentPlayer();return this.getBoardAt(t,e)===n.EMPTY?(this.setBoardAt(t,e,r),this.pushMove(t,e),this.checkWinner(t,e,r),r):null}},{key:"withdraw",value:function(){var t=this.popMove();return t&&this.setBoardAt(t[0],t[1],n.EMPTY),this.winner=n.EMPTY,t}},{key:"reset",value:function(){this.board=new a,this.history=[],this.winner=n.EMPTY}}],[{key:"fromHistory",value:function(e){for(var r=new t,n=0;n<e.length-1;n+=1)r.setBoardAt(e[n][0],e[n][1],r.getCurrentPlayer()),r.pushMove(e[n][0],e[n][1]);return r.move(e[e.length-1][0],e[e.length-1][1]),r}}]),t}();e.default=u},323:function(t,e,r){"use strict";var n=r(38).default,o=r(575).default,i=r(913).default,a=r(319).default,u=this&&this.__createBinding||(Object.create?function(t,e,r,n){void 0===n&&(n=r),Object.defineProperty(t,n,{enumerable:!0,get:function(){return e[r]}})}:function(t,e,r,n){void 0===n&&(n=r),t[n]=e[r]}),s=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),l=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)"default"!==r&&Object.prototype.hasOwnProperty.call(t,r)&&u(e,t,r);return s(e,t),e};Object.defineProperty(e,"__esModule",{value:!0});var f=l(r(629)),c={total:0,selection:0,expansion:0,simulation:{total:0,preparation:0,playout:0},backpropagation:0};function p(t){for(var e=a(t),r=0;r<t.length;r+=1){var n=Math.floor(Math.random()*t.length),o=[e[n],e[r]];e[r]=o[0],e[n]=o[1]}return e}var d=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;o(this,t),this.move=e,this.parent=r,this.children=new Map,this.visits=0,this.wins=0}return i(t,[{key:"approxWinningRate",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e-8;return this.wins/(this.visits+t)}},{key:"ucb1",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e-8;return this.approxWinningRate(t)+Math.sqrt(2*Math.log(this.parent?this.parent.visits:0)/(this.visits+t))}},{key:"select",value:function(){var t=-1/0,e=null;return this.children.forEach((function(r){var n=r.ucb1();(!e||t<n)&&(t=n,e=r)})),e}},{key:"completeHistory",value:function(){for(var t=[],e=this;e.parent;)e.move&&t.unshift(e.move),e=e.parent;return t}},{key:"expansionMoves",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.completeHistory(),e=new Set,r=0;r<t.length;r+=1)e.add(t[r].toString());for(var o=new Set,i=[],a=0;a<t.length;a+=1)for(var u=-1;u<=1;u+=1)for(var s=-1;s<=1;s+=1){var l=n(t[a],2),c=l[0],d=l[1],h=[c+u,d+s];!e.has(h.toString())&&!o.has(h.toString())&&h[0]>=0&&h[0]<f.Board.SIZE&&h[1]>=0&&h[1]<f.Board.SIZE&&(o.add(h.toString()),i.push(h))}return p(i)}},{key:"expand",value:function(){if(!(this.children.size>0||this.visits<10||1===this.approxWinningRate(0)))for(var e=this.expansionMoves(),r=0;r<e.length;r+=1){var n=new t(e[r],this);this.children.set(e[r].toString(),n)}}},{key:"simulationMoves",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.completeHistory(),e=new Set,r=0;r<t.length;r+=1)e.add(t[r].toString());for(var n=[],o=0;o<f.Board.SIZE;o+=1)for(var i=0;i<f.Board.SIZE;i+=1)e.has([o,i].toString())||n.push([o,i]);return p(n)}},{key:"simulate",value:function(){var t=Date.now(),e=this.completeHistory(),r=f.default.fromHistory(e),o=(e.length-1)%2===0?f.Piece.BLACK:f.Piece.WHITE;if(r.getWinner()!==f.Piece.EMPTY)return{player:o,winner:r.getWinner()};c.simulation.preparation+=Date.now()-t,t=Date.now();for(var i=this.simulationMoves(e),a=0;a<i.length;a+=1){var u=n(i[a],2),s=u[0],l=u[1];if(r.move(s,l),r.getWinner()!==f.Piece.EMPTY)return c.simulation.playout+=Date.now()-t,t=Date.now(),{player:o,winner:r.getWinner()}}return c.simulation.playout+=Date.now()-t,t=Date.now(),{player:o,winner:f.Piece.EMPTY}}},{key:"backpropagate",value:function(t){var e=t.player,r=t.winner;this.visits+=1,this.wins+=e===r?1:0,this.parent&&this.parent.backpropagate({player:e===f.Piece.BLACK?f.Piece.WHITE:f.Piece.BLACK,winner:r})}},{key:"mcts",value:function(){for(var t=0,e=Date.now();Date.now()-e<3e3&&t<5e4;){for(var r=this,n=Date.now();r.children.size>0;)r=r.select();c.selection+=Date.now()-n,n=Date.now(),r.visits>10&&1!==r.approxWinningRate(0)&&(r.expand(),r=r.select()),c.expansion+=Date.now()-n,n=Date.now();for(var o=0;o<1;o+=1){var i=r.simulate();t+=1,c.simulation.total+=Date.now()-n,n=Date.now(),r.backpropagate(i),c.backpropagation+=Date.now()-n,n=Date.now()}}c.total+=Date.now()-e,console.log("Simulation time report (ms): ".concat(JSON.stringify(c))),console.log("Simulation count: ".concat(t))}},{key:"bestMove",value:function(){var t=-1/0,e=null;return this.children.forEach((function(r){var n=r.approxWinningRate();(!e||t<n)&&(t=n,e=r.move)})),e}}]),t}();e.default=d}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,{a:e}),e},r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function e(e,r){if(e){if("string"===typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,r):void 0}}function n(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i=[],a=!0,u=!1;try{for(r=r.call(t);!(a=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);a=!0);}catch(s){u=!0,o=s}finally{try{a||null==r.return||r.return()}finally{if(u)throw o}}return i}}(t,r)||e(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t,e){return i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},i(t,e)}function a(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function u(t,e,r){return u=a()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&i(o,r.prototype),o},u.apply(null,arguments)}function s(r){return function(e){if(Array.isArray(e))return t(e)}(r)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(r)||e(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var l=Symbol("Comlink.proxy"),f=Symbol("Comlink.endpoint"),c=Symbol("Comlink.releaseProxy"),p=Symbol("Comlink.thrown"),d=function(t){return"object"===typeof t&&null!==t||"function"===typeof t},h=new Map([["proxy",{canHandle:function(t){return d(t)&&t[l]},serialize:function(t){var e=new MessageChannel,r=e.port1,n=e.port2;return v(t,r),[n,[n]]},deserialize:function(t){return t.start(),x(t,[],e);var e}}],["throw",{canHandle:function(t){return d(t)&&p in t},serialize:function(t){var e=t.value;return[e instanceof Error?{isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:{isError:!1,value:e},[]]},deserialize:function(t){if(t.isError)throw Object.assign(new Error(t.value.message),t.value);throw t.value}}]]);function v(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:self;e.addEventListener("message",(function r(i){if(i&&i.data){var a,l=Object.assign({path:[]},i.data),f=l.id,c=l.type,d=l.path,h=(i.data.argumentList||[]).map(E);try{var m=d.slice(0,-1).reduce((function(t,e){return t[e]}),t),x=d.reduce((function(t,e){return t[e]}),t);switch(c){case"GET":a=x;break;case"SET":m[d.slice(-1)[0]]=E(i.data.value),a=!0;break;case"APPLY":a=x.apply(m,h);break;case"CONSTRUCT":var g;a=_(u(x,s(h)));break;case"ENDPOINT":var b=new MessageChannel,S=b.port1,P=b.port2;v(t,P),a=w(S,[S]);break;case"RELEASE":a=void 0;break;default:return}}catch(g){a=o({value:g},p,0)}Promise.resolve(a).catch((function(t){return o({value:t},p,0)})).then((function(t){var o=n(M(t),2),i=o[0],a=o[1];e.postMessage(Object.assign(Object.assign({},i),{id:f}),a),"RELEASE"===c&&(e.removeEventListener("message",r),y(e))}))}})),e.start&&e.start()}function y(t){(function(t){return"MessagePort"===t.constructor.name})(t)&&t.close()}function m(t){if(t)throw new Error("Proxy has been released and is not useable")}function x(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},o=!1,i=new Proxy(r,{get:function(r,n){if(m(o),n===c)return function(){return S(t,{type:"RELEASE",path:e.map((function(t){return t.toString()}))}).then((function(){y(t),o=!0}))};if("then"===n){if(0===e.length)return{then:function(){return i}};var a=S(t,{type:"GET",path:e.map((function(t){return t.toString()}))}).then(E);return a.then.bind(a)}return x(t,[].concat(s(e),[n]))},set:function(r,i,a){m(o);var u=n(M(a),2),l=u[0],f=u[1];return S(t,{type:"SET",path:[].concat(s(e),[i]).map((function(t){return t.toString()})),value:l},f).then(E)},apply:function(r,i,a){m(o);var u=e[e.length-1];if(u===f)return S(t,{type:"ENDPOINT"}).then(E);if("bind"===u)return x(t,e.slice(0,-1));var s=n(g(a),2),l=s[0],c=s[1];return S(t,{type:"APPLY",path:e.map((function(t){return t.toString()})),argumentList:l},c).then(E)},construct:function(r,i){m(o);var a=n(g(i),2),u=a[0],s=a[1];return S(t,{type:"CONSTRUCT",path:e.map((function(t){return t.toString()})),argumentList:u},s).then(E)}});return i}function g(t){var e,r=t.map(M);return[r.map((function(t){return t[0]})),(e=r.map((function(t){return t[1]})),Array.prototype.concat.apply([],e))]}var b=new WeakMap;function w(t,e){return b.set(t,e),t}function _(t){return Object.assign(t,o({},l,!0))}function M(t){var r,o=function(t,r){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=e(t))||r&&t&&"number"===typeof t.length){n&&(t=n);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return u=t.done,t},e:function(t){s=!0,a=t},f:function(){try{u||null==n.return||n.return()}finally{if(s)throw a}}}}(h);try{for(o.s();!(r=o.n()).done;){var i=n(r.value,2),a=i[0],u=i[1];if(u.canHandle(t)){var s=n(u.serialize(t),2);return[{type:"HANDLER",name:a,value:s[0]},s[1]]}}}catch(l){o.e(l)}finally{o.f()}return[{type:"RAW",value:t},b.get(t)||[]]}function E(t){switch(t.type){case"HANDLER":return h.get(t.name).deserialize(t.value);case"RAW":return t.value}}function S(t,e,r){return new Promise((function(n){var o=new Array(4).fill(0).map((function(){return Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)})).join("-");t.addEventListener("message",(function e(r){r.data&&r.data.id&&r.data.id===o&&(t.removeEventListener("message",e),n(r.data))})),t.start&&t.start(),t.postMessage(Object.assign({id:o},e),r)}))}var P=r(568);v(new(r.n(P)()))}()}();
//# sourceMappingURL=worker.69de9183.worker.js.map