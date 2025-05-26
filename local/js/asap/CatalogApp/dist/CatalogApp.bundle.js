/* eslint-disable */
(function (exports,ui_vue3,ui_vue3_pinia,lodash) {
  'use strict';

  function _regeneratorRuntime() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == babelHelpers["typeof"](value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
  var store = ui_vue3_pinia.createPinia();
  var useCatalogStore = ui_vue3_pinia.defineStore('catalog', {
    state: function state() {
      return {
        query: '',
        products: [],
        filter: {},
        filters: {
          brands: [],
          delivery: ''
        },
        sorting: {},
        sort: '',
        pagination: {
          currentPage: 1
        },
        loading: false
      };
    },
    getters: {
      getParams: function getParams(state) {
        return {
          query: state.query,
          sort: state.sort,
          page: state.pagination.currentPage,
          filters: state.filters
        };
      }
    },
    actions: {
      fetchCatalog: function fetchCatalog() {
        var _arguments = arguments,
          _this = this;
        return babelHelpers.asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var params, url, responce, data;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                params = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : _this.getParams;
                _this.loading = true;
                _context.prev = 2;
                url = _this.buildUrl(params);
                console.log(url);
                _context.next = 7;
                return fetch(url);
              case 7:
                responce = _context.sent;
                _context.next = 10;
                return responce.json();
              case 10:
                data = _context.sent;
                _this.products = data.items;
                _this.sorting = data.sorting;
                _this.filter = data.filter;
                _this.pagination = data.pagination;
                console.log(data);
                _context.next = 21;
                break;
              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
              case 21:
                _context.prev = 21;
                _this.loading = false;
                return _context.finish(21);
              case 24:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[2, 18, 21, 24]]);
        }))();
      },
      buildUrl: function buildUrl(_ref) {
        var query = _ref.query,
          sort = _ref.sort,
          page = _ref.page,
          filters = _ref.filters;
        var params = new URLSearchParams();
        if (query) params.append('q', query);
        if (sort) params.append('sort', sort);
        if (page) params.append('page', page);
        if (filters.brands.length) {
          var brands = filters.brands.join(',');
          params.append('brands', brands);
        }
        if (filters.delivery) params.append('delivery', filters.delivery);
        return "https://managers.intercolor.asap-lp.ru/api/v1/catalog/section/?".concat(params.toString());
      },
      setQuery: function setQuery(query) {
        if (this.query === query) return;
        this.query = query;
        this.pagination.currentPage = 1;
        if (query) {
          this.fetchCatalog();
        }
      },
      setPage: function setPage(page) {
        if (this.pagination.currentPage === page) return;
        this.pagination.currentPage = page;
        this.fetchCatalog();
      },
      setSort: function setSort(option) {
        if (this.sort === option.name) return;
        this.pagination.currentPage = 1;
        this.sort = option.name;
        this.fetchCatalog();
      },
      setFliters: function setFliters(filters) {
        // if (JSON.stringify(this.filters) === JSON.stringify(filters)) {
        //   return;
        // }
        console.log('setFliters', filters);
        this.filters = filters;
        this.pagination.currentPage = 1;
        this.fetchCatalog();
      },
      clearFilters: function clearFilters() {
        this.filters.brands = {};
        this.filters.delivery = '';
      }
    }
  });

  var Accordion = {
    data: function data() {
      return {
        isOpen: true
      };
    },
    methods: {
      toggleAccordeon: function toggleAccordeon() {
        this.isOpen = !this.isOpen;
      }
    },
    template: "\n    <div class=\"accordion\" :class=\"{'accordion--active': isOpen}\">\n      <div class=\"accordion__header\" @click=\"toggleAccordeon\">\n        <slot name=\"title\"/>\n        <svg class=\"accordion__icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\">\n          <path d=\"M8 10L12 14L16 10\" stroke=\"#323232\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        </svg>\n      </div>\n      <div class=\"accordion__container\">\n        <slot name=\"content\"/>        \n      </div>\n    </div>\n  "
  };

  var Filter = {
    components: {
      Accordion: Accordion
    },
    props: {
      filters: {
        type: Object,
        "default": function _default() {
          return {};
        }
      }
    },
    emits: ['updateFilters', 'clearFilters'],
    data: function data() {
      return {
        selectedFilters: {
          brands: [],
          delivery: ''
        }
      };
    },
    computed: {
      filtersCount: function filtersCount() {
        var count = 0;
        var brands = this.selectedFilters.brands.length;
        var delivery = this.selectedFilters.delivery ? 1 : 0;
        count = brands + delivery;
        return count;
      }
    },
    methods: {
      applyFilters: function applyFilters() {
        this.$emit('updateFilters', this.selectedFilters);
      },
      clearFilters: function clearFilters() {
        this.selectedFilters.brands = [];
        this.selectedFilters.delivery = '';
        this.$emit('clearFilters');
      }
    },
    template: "\n    <div class=\"filter\">\n      <a class=\"filter__all-category\" href=\"\">\n        <svg class=\"filter__all-category-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n          <path d=\"M7.08301 5.00065H17.083\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M2.91699 5.00065H3.75033\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M2.91699 10.0007H3.75033\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M2.91699 15.0007H3.75033\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M7.08301 10.0007H17.083\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M7.08301 15.0007H17.083\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        </svg>\n        \u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438\n      </a>\n      <Accordion class=\"filter__separator\">\n        <template #title>\n          <p>\u0411\u0440\u0435\u043D\u0434</p>\n        </template>\n        <template #content>\n          <div class=\"filter__group-container\">\n            <div class=\"v-checkbox\" v-for=\"filter in filters.manufacturer\" :key=\"filter.id\">\n              <label class=\"v-checkbox__label v-checkbox__input-wrap\">\n                <input class=\"v-checkbox__input\" type=\"checkbox\" name=\"brand\" :value=\"filter.name\" v-model=\"selectedFilters.brands\"/>\n                <svg class=\"v-checkbox__icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\">\n                  <path d=\"M20 6.5L9 17.5L4 12.5\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                </svg>\n                {{filter.name}}\n              </label>\n            </div>\n          </div>\n        </template>\n      </Accordion>\n      <Accordion class=\"filter__separator\">\n        <template #title>\n          <p>\u0421\u0440\u043E\u043A \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438</p>\n        </template>\n        <template #content>\n          <div class=\"filter__group-container\">\n            <div class=\"v-checkbox\" v-for=\"filter in filters.delivery\" :key=\"filter.id\">\n              <label class=\"v-checkbox__label v-checkbox__input-wrap\">\n                <input class=\"radio\" name=\"delivery\" type=\"radio\" :value=\"filter.value\" v-model=\"selectedFilters.delivery\"/>\n                {{filter.value}}\n              </label>\n            </div>\n          </div>          \n        </template>\n      </Accordion>\n      <div class=\"filter__buttons\">\n        <button class=\"btn btn--dark btn--text\" @click=\"applyFilters\">\n          \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\n          <span v-if=\"filtersCount\">({{filtersCount}})</span>          \n        </button>\n        <button class=\"filter__button-reset btn btn--text\" @click=\"clearFilters\">\n          \u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C\n        </button>\n      </div>\n    </div>\n  "
  };

  var Pagination = {
    props: {
      pagination: {
        type: Object,
        "default": function _default() {
          return {};
        }
      }
    },
    emits: ['updatePage'],
    methods: {
      onChangePage: function onChangePage(page) {
        if (page == 0 || page > this.pagination.totalPages || this.pagination.currentPage == page) return;
        this.$emit('updatePage', page);
      }
    },
    template: "\n    <nav>\n      <ul class=\"pagination__list\">\n        <li>\n          <button class=\"page-btn page-btn--first\" @click=\"onChangePage(1)\">\n            <svg\n              width=\"20\"\n              height=\"20\"\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <path\n                d=\"M13.5 16L17.5 12L13.5 8\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M6.5 17L11.5 12L6.5 7\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </svg>\n          </button>\n        </li>\n        <li>\n          <button class=\"page-btn page-btn--prev\" @click=\"onChangePage(pagination.currentPage - 1)\">\n            <svg\n              width=\"20\"\n              height=\"20\"\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <path\n                d=\"M8 10L12 14L16 10\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </svg>\n          </button>\n        </li>\n\n        <li v-for=\"page in 5\">\n          <button class=\"page-btn\" :class=\"{'page-btn--active': page == pagination.currentPage }\" @click=\"onChangePage(page)\">{{page}}</button>\n        </li>\n\n        <li>\n          <div class=\"page-btn--ellipsis\">\n            <svg\n              width=\"20\"\n              height=\"20\"\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <path\n                d=\"M18.5027 18.5002C18.5027 18.7765 18.2788 19.0004 18.0025 19.0004C17.7263 19.0004 17.5023 18.7765 17.5023 18.5002C17.5023 18.224 17.7263 18 18.0025 18C18.2788 18 18.5027 18.224 18.5027 18.5002\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M12.5002 18.5002C12.5002 18.7765 12.2762 19.0004 12 19.0004C11.7237 19.0004 11.4998 18.7765 11.4998 18.5002C11.4998 18.224 11.7237 18 12 18C12.2762 18 12.5002 18.224 12.5002 18.5002\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M6.49773 18.5002C6.49773 18.7765 6.27378 19.0004 5.99752 19.0004C5.72127 19.0004 5.49731 18.7765 5.49731 18.5002C5.49731 18.224 5.72127 18 5.99752 18C6.27378 18 6.49773 18.224 6.49773 18.5002\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </svg>\n          </div>\n        </li>\n\n        <li>\n          <button class=\"page-btn\" :class=\"{'page-btn--active': pagination.currentPage == pagination.totalPages }\" @click=\"onChangePage(pagination.totalPages)\">{{pagination.totalPages}}</button>\n        </li>\n\n        <li>\n          <button class=\"page-btn page-btn--next\" @click=\"onChangePage(pagination.currentPage + 1)\">\n            <svg\n              width=\"20\"\n              height=\"20\"\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <path\n                d=\"M8 10L12 14L16 10\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </svg>\n          </button>\n        </li>\n        <li>\n          <button class=\"page-btn page-btn--last\" @click=\"onChangePage(pagination.totalPages)\">\n            <svg\n              width=\"20\"\n              height=\"20\"\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              xmlns=\"http://www.w3.org/2000/svg\"\n            >\n              <path\n                d=\"M13.5 16L17.5 12L13.5 8\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n              <path\n                d=\"M6.5 17L11.5 12L6.5 7\"\n                stroke=\"var(--color-stroke-dark)\"\n                stroke-width=\"1.5\"\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n              />\n            </svg>\n          </button>\n        </li>\n      </ul>\n    </nav>\n  "
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var ProductList = {
    components: {
      Pagination: Pagination
    },
    computed: _objectSpread({}, ui_vue3_pinia.mapState(useCatalogStore, ['products', 'pagination'])),
    methods: _objectSpread({}, ui_vue3_pinia.mapActions(useCatalogStore, ['setPage'])),
    template: "\n    <div>      \n      <div v-if=\"products.length\" class=\"product-list\">\n        <ul class=\"\">\n          <li v-for=\"product in products\" :key=\"product.id\" class=\"list__item product-item\">\n            <div class=\"product-item__info\">\n              <div class=\"card card-thumb\">\n                <img\n                  class=\"card-thumb__img\"\n                  :src=\"product.image\"\n                  alt=\"\"\n                />\n              </div>\n              <div>\n                <div class=\"product-item__title\">{{product.name}}</div>\n                <div class=\"product-item__sku caption\">\u0410\u0440\u0442. {{product.sku}}</div>\n              </div>\n            </div>\n\n            <div class=\"product-item__stock\">\n              <div class=\"product-item__stock-storage\">\n                <span class=\"caption\">\u041C\u043E\u0441\u043A\u0432\u0430:</span><span class=\"label-2\">116 000</span>\n              </div>\n              <div class=\"product-item__stock-storage\">\n                <span class=\"caption\">\u0421.\u041F\u0435\u0442\u0435\u0440\u0431:</span\n                ><span class=\"label-2\">116 000</span>\n              </div>\n            </div>\n\n            <div class=\"input-container input-container--quantity\">\n              <div class=\"input-field quantity-input\">\n                <button class=\"quantity-control\" data-action=\"minus\">\n                  <svg\n                    width=\"20\"\n                    height=\"20\"\n                    viewBox=\"0 0 20 20\"\n                    fill=\"none\"\n                    xmlns=\"http://www.w3.org/2000/svg\"\n                  >\n                    <path\n                      d=\"M5.28516 10H14.7132\"\n                      stroke=\"#323232\"\n                      stroke-width=\"1.5\"\n                      stroke-linecap=\"round\"\n                      stroke-linejoin=\"round\"\n                    />\n                  </svg>\n                </button>\n                <input type=\"number\" class=\"quantity-value\" value=\"100000\" />\n                <button class=\"quantity-control\" data-action=\"plus\">\n                  <svg\n                    width=\"20\"\n                    height=\"20\"\n                    viewBox=\"0 0 20 20\"\n                    fill=\"none\"\n                    xmlns=\"http://www.w3.org/2000/svg\"\n                  >\n                    <path\n                      d=\"M5.28516 10H14.7132\"\n                      stroke=\"#323232\"\n                      stroke-width=\"1.5\"\n                      stroke-linecap=\"round\"\n                      stroke-linejoin=\"round\"\n                    />\n                    <path\n                      d=\"M9.9992 5.28595V14.714\"\n                      stroke=\"#323232\"\n                      stroke-width=\"1.5\"\n                      stroke-linecap=\"round\"\n                      stroke-linejoin=\"round\"\n                    />\n                  </svg>\n                </button>\n              </div>\n            </div>\n\n            <div class=\"product-item__price number-1\">2 250 000 \u20BD</div>\n\n            <button class=\"btn btn--icon-only--large btn--dark\">\n              <svg\n                width=\"20\"\n                height=\"20\"\n                viewBox=\"0 0 24 24\"\n                fill=\"none\"\n                xmlns=\"http://www.w3.org/2000/svg\"\n              >\n                <path\n                  d=\"M5.96905 6.625L5.30205 3.625H3.37305\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"1.5\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n                <path\n                  fill-rule=\"evenodd\"\n                  clip-rule=\"evenodd\"\n                  d=\"M7.73099 14.835L5.96899 6.625H18.627C19.264 6.625 19.738 7.212 19.605 7.835L18.103 14.835C18.004 15.296 17.597 15.625 17.125 15.625H8.70799C8.23699 15.625 7.82999 15.296 7.73099 14.835Z\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"1.5\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n                <path\n                  d=\"M17.465 19.25C17.258 19.25 17.09 19.418 17.092 19.625C17.092 19.832 17.26 20 17.467 20C17.674 20 17.842 19.832 17.842 19.625C17.841 19.418 17.673 19.25 17.465 19.25\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"1.5\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n                <path\n                  d=\"M8.85605 19.25C8.64905 19.25 8.48105 19.418 8.48305 19.625C8.48205 19.832 8.65005 20 8.85705 20C9.06405 20 9.23205 19.832 9.23205 19.625C9.23205 19.418 9.06405 19.25 8.85605 19.25\"\n                  stroke=\"currentColor\"\n                  stroke-width=\"1.5\"\n                  stroke-linecap=\"round\"\n                  stroke-linejoin=\"round\"\n                />\n              </svg>\n            </button>\n          </li>\n        </ul>\n        <Pagination :pagination=\"pagination\" @update-page=\"setPage\"/>\n      </div>\n      <div v-else class=\"product-list-empty\">\n          \u041D\u0430\u0439\u0434\u0435\u043D\u043E 0 \u0442\u043E\u0432\u0430\u0440\u043E\u0432\n      </div>\n    </div>    \n  "
  };

  var Search = {
    props: {
      query: String
    },
    emits: ['updateQuery'],
    data: function data() {
      return {
        searchQuery: ''
      };
    },
    watch: {
      searchQuery: function searchQuery() {
        this.debouncedSearch();
      }
    },
    methods: {
      search: function search() {
        if (this.searchQuery !== this.query) {
          this.$emit('updateQuery', this.searchQuery);
        }
      }
    },
    created: function created() {
      this.debouncedSearch = lodash.debounce(this.search, 300);
    },
    unmounted: function unmounted() {
      this.debouncedSearch.cancel();
    },
    template: "\n    <div class=\"catalog-search\">\n      <input\n        type=\"search\"\n        class=\"catalog-search__input input-field input-search input-search--tall\"\n        v-model.trim=\"searchQuery\"\n      />\n      <button class=\"catalog-search__submit btn btn--dark btn--text--large\" @click=\"debouncedSearch\">\n        \u041D\u0430\u0439\u0442\u0438\n      </button>\n    </div>\n  "
  };

  var Select = {
    props: {
      options: {
        type: Array,
        "default": function _default() {
          return [];
        }
      }
    },
    emits: ['updateSelect'],
    data: function data() {
      return {
        selectedOptionValue: null,
        selectedOptionOrder: null,
        selectedOptionName: null,
        isOpen: false
      };
    },
    computed: {
      getOption: function getOption() {
        return this.selectedOptionValue || 'По умолчанию';
      }
    },
    methods: {
      toggleOption: function toggleOption(option) {
        if (this.selectedOptionName == option.name) {
          this.isOpen = false;
          return;
        }
        console.log(option);
        this.selectedOptionName = option.name;
        this.selectedOptionValue = option.value;
        this.selectedOptionOrder = option.order;
        this.$emit('updateSelect', option);
        this.isOpen = false;
      },
      toggleSelect: function toggleSelect() {
        this.isOpen = !this.isOpen;
      },
      getOrderType: function getOrderType() {
        var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        return order === 'asc' ? 'v-select__order-icon--rotate' : '';
      },
      handleClickOutside: function handleClickOutside(event) {
        if (!this.$refs.select.contains(event.target)) {
          this.isOpen = false;
        }
      }
    },
    mounted: function mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    unmounted: function unmounted() {
      document.removeEventListener('click', this.handleClickOutside);
    },
    template: "\n    <div class=\"v-select v-select--small\" :class=\"{'v-select--active': isOpen}\" ref=\"select\">\n      <button class=\"v-select__trigger\" :class=\"{'v-select__trigger--active': isOpen}\" aria-haspopup=\"listbox\" @click=\"toggleSelect\">\n        {{getOption}}\n        <svg v-if=\"selectedOptionOrder\" :class=\"getOrderType(selectedOptionOrder)\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\">\n          <path d=\"M12 5V19\" stroke=\"#323232\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          <path d=\"M6.99902 9.99905L12 4.99805L17.001 9.99905\" stroke=\"#323232\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n        </svg>\n      </button>\n      <Transition name=\"select-fade-slide\">\n        <ul v-show=\"isOpen\" class=\"v-select__options\" role=\"listbox\">\n          <li\n            class=\"v-select__option\"\n            :class=\"{'v-select__option--selected': selectedOptionName === option.name}\"\n            role=\"option\"\n            v-for=\"option in options\"\n            :key=\"option.name\"\n            @click=\"toggleOption(option)\"\n          >\n            {{option.value}}\n            <svg v-if=\"option.order\" :class=\"getOrderType(option.order)\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path d=\"M12 5V19\" stroke=\"#323232\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n              <path d=\"M6.99902 9.99905L12 4.99805L17.001 9.99905\" stroke=\"#323232\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            </svg>            \n            <svg v-if=\"selectedOptionName === option.name\" class=\"v-select__active-icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\">\n              <path d=\"M20 6.5L9 17.5L4 12.5\" stroke=\"#323232\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            </svg>\n          </li>\n        </ul>\n      </Transition>\n    </div>\n  "
  };

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var CatalogPage = {
    components: {
      ProductList: ProductList,
      Search: Search,
      Filter: Filter,
      Select: Select
    },
    props: {
      params: {
        type: Object,
        "default": function _default() {
          return {};
        }
      }
    },
    computed: _objectSpread$1({}, ui_vue3_pinia.mapState(useCatalogStore, ['query', 'filter', 'sorting'])),
    methods: _objectSpread$1({}, ui_vue3_pinia.mapActions(useCatalogStore, ['setQuery', 'setSort', 'setFliters', 'clearFilters'])),
    template: "\n    <div class=\"catalog-page\">\n      <Search class=\"catalog-page__search\" :query=\"query\" @update-query=\"setQuery\"/>\n      <div class=\"catalog-page__header-container\">\n        <h1>\u041A\u0430\u0442\u0430\u043B\u043E\u0433</h1>\n        <Select :options=\"sorting.sort\" @update-select=\"setSort\"/>\n      </div>\n      <Filter class=\"catalog-page__filter\" :filters=\"filter.characteristics\" @update-filters=\"setFliters\" clear-filters=\"clearFilters\"/>\n      <ProductList />\n    </div>\n  "
  };

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  var _app = /*#__PURE__*/new WeakMap();
  var _data = /*#__PURE__*/new WeakMap();
  var CatalogApp = /*#__PURE__*/function () {
    function CatalogApp(rootNode, data) {
      babelHelpers.classCallCheck(this, CatalogApp);
      _classPrivateFieldInitSpec(this, _app, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _data, {
        writable: true,
        value: void 0
      });
      this.rootNode = document.querySelector(rootNode);
      babelHelpers.classPrivateFieldSet(this, _data, data);
    }
    babelHelpers.createClass(CatalogApp, [{
      key: "init",
      value: function init() {
        this.initApp();
      }
    }, {
      key: "initApp",
      value: function initApp() {
        var context = this;
        babelHelpers.classPrivateFieldSet(this, _app, ui_vue3.BitrixVue.createApp({
          name: 'CatalogApp',
          components: {
            CatalogPage: CatalogPage
          },
          data: function data() {
            return {
              params: babelHelpers.classPrivateFieldGet(context, _data)
            };
          },
          methods: _objectSpread$2({}, ui_vue3_pinia.mapActions(useCatalogStore, ['fetchCatalog'])),
          beforeCreate: function beforeCreate() {
            this.$bitrix.Application.set(context);
          },
          created: function created() {
            this.fetchCatalog();
          },
          template: "<CatalogPage :params='params'/>"
        }));
        babelHelpers.classPrivateFieldGet(this, _app).use(store);
        babelHelpers.classPrivateFieldGet(this, _app).mount(this.rootNode);
      }
    }]);
    return CatalogApp;
  }();

  exports.CatalogApp = CatalogApp;

}((this.BX = this.BX || {}),BX.Vue3,BX.Vue3.Pinia,BX));
//# sourceMappingURL=CatalogApp.bundle.js.map
