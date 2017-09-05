var main =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp_name_"];
/******/ 	window["webpackJsonp_name_"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate_name_"];
/******/ 	this["webpackHotUpdate_name_"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "a629179c53a876f07e0f"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(8)(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFNLE1BQU0sR0FBRztBQUNiLEtBQUcsRUFBRSxPQUFPO0FBQ1osS0FBRyxFQUFFLE1BQU07QUFDWCxLQUFHLEVBQUUsTUFBTTtBQUNYLEtBQUcsRUFBRSxRQUFRO0FBQ2IsS0FBRyxFQUFFLFFBQVE7QUFDYixLQUFHLEVBQUUsUUFBUTtBQUNiLEtBQUcsRUFBRSxRQUFRO0NBQ2QsQ0FBQzs7QUFFRixJQUFNLFFBQVEsR0FBRyxZQUFZO0lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUM7O0FBRTdCLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUN2QixTQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUNwQjs7QUFFTSxTQUFTLE1BQU0sQ0FBQyxHQUFHLG9CQUFtQjtBQUMzQyxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN6QyxTQUFLLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUM1QixVQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDM0QsV0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUM5QjtLQUNGO0dBQ0Y7O0FBRUQsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs7Ozs7O0FBS2hELElBQUksVUFBVSxHQUFHLG9CQUFTLEtBQUssRUFBRTtBQUMvQixTQUFPLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQztDQUNwQyxDQUFDOzs7QUFHRixJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNuQixVQUlNLFVBQVUsR0FKaEIsVUFBVSxHQUFHLFVBQVMsS0FBSyxFQUFFO0FBQzNCLFdBQU8sT0FBTyxLQUFLLEtBQUssVUFBVSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssbUJBQW1CLENBQUM7R0FDcEYsQ0FBQztDQUNIO1FBQ08sVUFBVSxHQUFWLFVBQVU7Ozs7O0FBSVgsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxVQUFTLEtBQUssRUFBRTtBQUN0RCxTQUFPLEFBQUMsS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixHQUFHLEtBQUssQ0FBQztDQUNqRyxDQUFDOzs7OztBQUdLLFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDcEMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxRQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEIsYUFBTyxDQUFDLENBQUM7S0FDVjtHQUNGO0FBQ0QsU0FBTyxDQUFDLENBQUMsQ0FBQztDQUNYOztBQUdNLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0FBQ3ZDLE1BQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFOztBQUU5QixRQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQzNCLGFBQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3hCLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3pCLGFBQU8sRUFBRSxDQUFDO0tBQ1gsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2xCLGFBQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7Ozs7QUFLRCxVQUFNLEdBQUcsRUFBRSxHQUFHLE1BQU0sQ0FBQztHQUN0Qjs7QUFFRCxNQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUFFLFdBQU8sTUFBTSxDQUFDO0dBQUU7QUFDOUMsU0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztDQUM3Qzs7QUFFTSxTQUFTLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDN0IsTUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQ3pCLFdBQU8sSUFBSSxDQUFDO0dBQ2IsTUFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMvQyxXQUFPLElBQUksQ0FBQztHQUNiLE1BQU07QUFDTCxXQUFPLEtBQUssQ0FBQztHQUNkO0NBQ0Y7O0FBRU0sU0FBUyxXQUFXLENBQUMsTUFBTSxFQUFFO0FBQ2xDLE1BQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0IsT0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDdkIsU0FBTyxLQUFLLENBQUM7Q0FDZDs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLFNBQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRU0sU0FBUyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO0FBQ2pELFNBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSSxFQUFFLENBQUM7Q0FDcEQiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBlc2NhcGUgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJzwnOiAnJmx0OycsXG4gICc+JzogJyZndDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgXCInXCI6ICcmI3gyNzsnLFxuICAnYCc6ICcmI3g2MDsnLFxuICAnPSc6ICcmI3gzRDsnXG59O1xuXG5jb25zdCBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgICBwb3NzaWJsZSA9IC9bJjw+XCInYD1dLztcblxuZnVuY3Rpb24gZXNjYXBlQ2hhcihjaHIpIHtcbiAgcmV0dXJuIGVzY2FwZVtjaHJdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKG9iai8qICwgLi4uc291cmNlICovKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQga2V5IGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbaV0sIGtleSkpIHtcbiAgICAgICAgb2JqW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5leHBvcnQgbGV0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xubGV0IGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcbi8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmIChpc0Z1bmN0aW9uKC94LykpIHtcbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydCB7aXNGdW5jdGlvbn07XG4vKiBlc2xpbnQtZW5hYmxlIGZ1bmMtc3R5bGUgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpID8gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEFycmF5XScgOiBmYWxzZTtcbn07XG5cbi8vIE9sZGVyIElFIHZlcnNpb25zIGRvIG5vdCBkaXJlY3RseSBzdXBwb3J0IGluZGV4T2Ygc28gd2UgbXVzdCBpbXBsZW1lbnQgb3VyIG93biwgc2FkbHkuXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkgeyByZXR1cm4gc3RyaW5nOyB9XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShiYWRDaGFycywgZXNjYXBlQ2hhcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gIGlmICghdmFsdWUgJiYgdmFsdWUgIT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICBsZXQgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJsb2NrUGFyYW1zKHBhcmFtcywgaWRzKSB7XG4gIHBhcmFtcy5wYXRoID0gaWRzO1xuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kQ29udGV4dFBhdGgoY29udGV4dFBhdGgsIGlkKSB7XG4gIHJldHVybiAoY29udGV4dFBhdGggPyBjb250ZXh0UGF0aCArICcuJyA6ICcnKSArIGlkO1xufVxuIl19


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  var loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2V4Y2VwdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsSUFBTSxVQUFVLEdBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFbkcsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUNoQyxNQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUc7TUFDdEIsSUFBSSxZQUFBO01BQ0osTUFBTSxZQUFBLENBQUM7QUFDWCxNQUFJLEdBQUcsRUFBRTtBQUNQLFFBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixVQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTFCLFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7R0FDeEM7O0FBRUQsTUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7O0FBRzFELE9BQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ2hELFFBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDOUM7OztBQUdELE1BQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFO0FBQzNCLFNBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7R0FDMUM7O0FBRUQsTUFBSTtBQUNGLFFBQUksR0FBRyxFQUFFO0FBQ1AsVUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Ozs7QUFJdkIsVUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQ3pCLGNBQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxlQUFLLEVBQUUsTUFBTTtBQUNiLG9CQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7T0FDSixNQUFNO0FBQ0wsWUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7T0FDdEI7S0FDRjtHQUNGLENBQUMsT0FBTyxHQUFHLEVBQUU7O0dBRWI7Q0FDRjs7QUFFRCxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7O3FCQUVuQixTQUFTIiwiZmlsZSI6ImV4Y2VwdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIGxldCBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbjtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICBsZXQgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4Y2VwdGlvbjtcbiJdfQ==


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".table-load-form {\n  box-sizing: border-box;\n  height: 100vh;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: url(\"/public/assets/img/table-load-from-background.png\");\n  background-size: contain;\n  font-family: Calibri; }\n  .table-load-form form {\n    width: 500px;\n    text-align: center;\n    border-radius: 5px;\n    background-color: #f9f9f9;\n    overflow: hidden;\n    box-shadow: 1px 1px 5px 0 #000000; }\n    .table-load-form form .load-form__title {\n      padding: 10px;\n      font-size: 48px;\n      background-color: #f0f0f0; }\n    .table-load-form form #load-table {\n      position: relative;\n      margin: 20px;\n      padding: 15px 45px;\n      box-shadow: 0px 4px 2px -2px #000000;\n      border: 1px solid #1e9d24;\n      border-radius: 10px;\n      background-color: #4bc651;\n      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.17) 0%, rgba(255, 255, 255, 0.17) 100%);\n      border: none;\n      outline: none;\n      cursor: pointer;\n      color: #fff; }\n      .table-load-form form #load-table:active {\n        top: 1px;\n        box-shadow: inset 0 5px 2px -2px rgba(255, 255, 255, 0.46); }\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _helpers = __webpack_require__(14);

var _decorators = __webpack_require__(22);

var _logger = __webpack_require__(24);

var _logger2 = _interopRequireDefault(_logger);

var VERSION = '4.0.10';
exports.VERSION = VERSION;
var COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0'
};

exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  }
};

var log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2Jhc2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7cUJBQTRDLFNBQVM7O3lCQUMvQixhQUFhOzs7O3VCQUNFLFdBQVc7OzBCQUNSLGNBQWM7O3NCQUNuQyxVQUFVOzs7O0FBRXRCLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQzs7QUFDekIsSUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7OztBQUU1QixJQUFNLGdCQUFnQixHQUFHO0FBQzlCLEdBQUMsRUFBRSxhQUFhO0FBQ2hCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxlQUFlO0FBQ2xCLEdBQUMsRUFBRSxVQUFVO0FBQ2IsR0FBQyxFQUFFLGtCQUFrQjtBQUNyQixHQUFDLEVBQUUsaUJBQWlCO0FBQ3BCLEdBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQzs7O0FBRUYsSUFBTSxVQUFVLEdBQUcsaUJBQWlCLENBQUM7O0FBRTlCLFNBQVMscUJBQXFCLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7QUFDbkUsTUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLE1BQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQztBQUMvQixNQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBSSxFQUFFLENBQUM7O0FBRW5DLGtDQUF1QixJQUFJLENBQUMsQ0FBQztBQUM3Qix3Q0FBMEIsSUFBSSxDQUFDLENBQUM7Q0FDakM7O0FBRUQscUJBQXFCLENBQUMsU0FBUyxHQUFHO0FBQ2hDLGFBQVcsRUFBRSxxQkFBcUI7O0FBRWxDLFFBQU0scUJBQVE7QUFDZCxLQUFHLEVBQUUsb0JBQU8sR0FBRzs7QUFFZixnQkFBYyxFQUFFLHdCQUFTLElBQUksRUFBRSxFQUFFLEVBQUU7QUFDakMsUUFBSSxnQkFBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ3RDLFVBQUksRUFBRSxFQUFFO0FBQUUsY0FBTSwyQkFBYyx5Q0FBeUMsQ0FBQyxDQUFDO09BQUU7QUFDM0Usb0JBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUM1QixNQUFNO0FBQ0wsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7S0FDekI7R0FDRjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLElBQUksRUFBRTtBQUMvQixXQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDM0I7O0FBRUQsaUJBQWUsRUFBRSx5QkFBUyxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBQ3ZDLFFBQUksZ0JBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUN0QyxvQkFBTyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzdCLE1BQU07QUFDTCxVQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtBQUNsQyxjQUFNLHlFQUEwRCxJQUFJLG9CQUFpQixDQUFDO09BQ3ZGO0FBQ0QsVUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7S0FDL0I7R0FDRjtBQUNELG1CQUFpQixFQUFFLDJCQUFTLElBQUksRUFBRTtBQUNoQyxXQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDNUI7O0FBRUQsbUJBQWlCLEVBQUUsMkJBQVMsSUFBSSxFQUFFLEVBQUUsRUFBRTtBQUNwQyxRQUFJLGdCQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFVLEVBQUU7QUFDdEMsVUFBSSxFQUFFLEVBQUU7QUFBRSxjQUFNLDJCQUFjLDRDQUE0QyxDQUFDLENBQUM7T0FBRTtBQUM5RSxvQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQy9CLE1BQU07QUFDTCxVQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM1QjtHQUNGO0FBQ0QscUJBQW1CLEVBQUUsNkJBQVMsSUFBSSxFQUFFO0FBQ2xDLFdBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUM5QjtDQUNGLENBQUM7O0FBRUssSUFBSSxHQUFHLEdBQUcsb0JBQU8sR0FBRyxDQUFDOzs7UUFFcEIsV0FBVztRQUFFLE1BQU0iLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlRnJhbWUsIGV4dGVuZCwgdG9TdHJpbmd9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuL2V4Y2VwdGlvbic7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdEhlbHBlcnN9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge3JlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnN9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcblxuZXhwb3J0IGNvbnN0IFZFUlNJT04gPSAnNC4wLjEwJztcbmV4cG9ydCBjb25zdCBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydCBjb25zdCBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuY29uc3Qgb2JqZWN0VHlwZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG5leHBvcnQgZnVuY3Rpb24gSGFuZGxlYmFyc0Vudmlyb25tZW50KGhlbHBlcnMsIHBhcnRpYWxzLCBkZWNvcmF0b3JzKSB7XG4gIHRoaXMuaGVscGVycyA9IGhlbHBlcnMgfHwge307XG4gIHRoaXMucGFydGlhbHMgPSBwYXJ0aWFscyB8fCB7fTtcbiAgdGhpcy5kZWNvcmF0b3JzID0gZGVjb3JhdG9ycyB8fCB7fTtcblxuICByZWdpc3RlckRlZmF1bHRIZWxwZXJzKHRoaXMpO1xuICByZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzKHRoaXMpO1xufVxuXG5IYW5kbGViYXJzRW52aXJvbm1lbnQucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogSGFuZGxlYmFyc0Vudmlyb25tZW50LFxuXG4gIGxvZ2dlcjogbG9nZ2VyLFxuICBsb2c6IGxvZ2dlci5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGhlbHBlcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuaGVscGVycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGVscGVyc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckhlbHBlcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lLCBwYXJ0aWFsKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKGBBdHRlbXB0aW5nIHRvIHJlZ2lzdGVyIGEgcGFydGlhbCBjYWxsZWQgXCIke25hbWV9XCIgYXMgdW5kZWZpbmVkYCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobmFtZSkgPT09IG9iamVjdFR5cGUpIHtcbiAgICAgIGlmIChmbikgeyB0aHJvdyBuZXcgRXhjZXB0aW9uKCdBcmcgbm90IHN1cHBvcnRlZCB3aXRoIG11bHRpcGxlIGRlY29yYXRvcnMnKTsgfVxuICAgICAgZXh0ZW5kKHRoaXMuZGVjb3JhdG9ycywgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVjb3JhdG9yc1tuYW1lXSA9IGZuO1xuICAgIH1cbiAgfSxcbiAgdW5yZWdpc3RlckRlY29yYXRvcjogZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbmV4cG9ydCBsZXQgbG9nID0gbG9nZ2VyLmxvZztcblxuZXhwb3J0IHtjcmVhdGVGcmFtZSwgbG9nZ2VyfTtcbiJdfQ==


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(13)['default'];


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

var _tableLoadForm = __webpack_require__(11);

var _tableLoadForm2 = _interopRequireDefault(_tableLoadForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableLoadForm = new _tableLoadForm2.default();

document.body.appendChild(tableLoadForm.elem);

document.getElementById('load-table').onclick = function () {
  document.body.removeChild(tableLoadForm.elem);

  __webpack_require__.e/* require.ensure */(0).then((function (require) {
    var Table = __webpack_require__(30).default;

    var table = new Table();

    document.body.appendChild(table.elem);
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

//import Table from './table';
//const Table = require('./table').default;

//const table = new Table();

//document.body.appendChild(table.elem);
//document.body.insertBefore(table.elem, document.body.getElementsByTagName('script')[0]);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(2, function() {
			var newContent = __webpack_require__(2);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tableLoadForm = __webpack_require__(12);

var _tableLoadForm2 = _interopRequireDefault(_tableLoadForm);

__webpack_require__(29);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableLoadForm = function TableLoadForm() {
  _classCallCheck(this, TableLoadForm);

  this.elem = document.createElement('div');
  this.elem.className = 'table-load-form';

  this.elem.innerHTML = (0, _tableLoadForm2.default)();

  this.elem.querySelector('.load-form').addEventListener('click', function (e) {
    e.preventDefault();
  });
};

exports.default = TableLoadForm;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Handlebars = __webpack_require__(7);
module.exports = (Handlebars['default'] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form action=\"\" class=\"load-form\">\r\n    <div class=\"load-form__title\"><span>Table Editor</span></div>\r\n    <button id=\"load-table\">Load Table</button>\r\n</form>";
},"useData":true});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _handlebarsBase = __webpack_require__(6);

var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(25);

var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

var _handlebarsException = __webpack_require__(1);

var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

var _handlebarsUtils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_handlebarsUtils);

var _handlebarsRuntime = __webpack_require__(26);

var runtime = _interopRequireWildcard(_handlebarsRuntime);

var _handlebarsNoConflict = __webpack_require__(27);

var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

var inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9oYW5kbGViYXJzLnJ1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OEJBQXNCLG1CQUFtQjs7SUFBN0IsSUFBSTs7Ozs7b0NBSU8sMEJBQTBCOzs7O21DQUMzQix3QkFBd0I7Ozs7K0JBQ3ZCLG9CQUFvQjs7SUFBL0IsS0FBSzs7aUNBQ1Esc0JBQXNCOztJQUFuQyxPQUFPOztvQ0FFSSwwQkFBMEI7Ozs7O0FBR2pELFNBQVMsTUFBTSxHQUFHO0FBQ2hCLE1BQUksRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTFDLE9BQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLElBQUUsQ0FBQyxVQUFVLG9DQUFhLENBQUM7QUFDM0IsSUFBRSxDQUFDLFNBQVMsbUNBQVksQ0FBQztBQUN6QixJQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNqQixJQUFFLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDOztBQUU3QyxJQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUNoQixJQUFFLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQzNCLFdBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7R0FDbkMsQ0FBQzs7QUFFRixTQUFPLEVBQUUsQ0FBQztDQUNYOztBQUVELElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixrQ0FBVyxJQUFJLENBQUMsQ0FBQzs7QUFFakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7cUJBRVIsSUFBSSIsImZpbGUiOiJoYW5kbGViYXJzLnJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBiYXNlIGZyb20gJy4vaGFuZGxlYmFycy9iYXNlJztcblxuLy8gRWFjaCBvZiB0aGVzZSBhdWdtZW50IHRoZSBIYW5kbGViYXJzIG9iamVjdC4gTm8gbmVlZCB0byBzZXR1cCBoZXJlLlxuLy8gKFRoaXMgaXMgZG9uZSB0byBlYXNpbHkgc2hhcmUgY29kZSBiZXR3ZWVuIGNvbW1vbmpzIGFuZCBicm93c2UgZW52cylcbmltcG9ydCBTYWZlU3RyaW5nIGZyb20gJy4vaGFuZGxlYmFycy9zYWZlLXN0cmluZyc7XG5pbXBvcnQgRXhjZXB0aW9uIGZyb20gJy4vaGFuZGxlYmFycy9leGNlcHRpb24nO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi9oYW5kbGViYXJzL3V0aWxzJztcbmltcG9ydCAqIGFzIHJ1bnRpbWUgZnJvbSAnLi9oYW5kbGViYXJzL3J1bnRpbWUnO1xuXG5pbXBvcnQgbm9Db25mbGljdCBmcm9tICcuL2hhbmRsZWJhcnMvbm8tY29uZmxpY3QnO1xuXG4vLyBGb3IgY29tcGF0aWJpbGl0eSBhbmQgdXNhZ2Ugb3V0c2lkZSBvZiBtb2R1bGUgc3lzdGVtcywgbWFrZSB0aGUgSGFuZGxlYmFycyBvYmplY3QgYSBuYW1lc3BhY2VcbmZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgbGV0IGhiID0gbmV3IGJhc2UuSGFuZGxlYmFyc0Vudmlyb25tZW50KCk7XG5cbiAgVXRpbHMuZXh0ZW5kKGhiLCBiYXNlKTtcbiAgaGIuU2FmZVN0cmluZyA9IFNhZmVTdHJpbmc7XG4gIGhiLkV4Y2VwdGlvbiA9IEV4Y2VwdGlvbjtcbiAgaGIuVXRpbHMgPSBVdGlscztcbiAgaGIuZXNjYXBlRXhwcmVzc2lvbiA9IFV0aWxzLmVzY2FwZUV4cHJlc3Npb247XG5cbiAgaGIuVk0gPSBydW50aW1lO1xuICBoYi50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG5sZXQgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbm5vQ29uZmxpY3QoaW5zdCk7XG5cbmluc3RbJ2RlZmF1bHQnXSA9IGluc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IGluc3Q7XG4iXX0=


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helpersBlockHelperMissing = __webpack_require__(15);

var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

var _helpersEach = __webpack_require__(16);

var _helpersEach2 = _interopRequireDefault(_helpersEach);

var _helpersHelperMissing = __webpack_require__(17);

var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

var _helpersIf = __webpack_require__(18);

var _helpersIf2 = _interopRequireDefault(_helpersIf);

var _helpersLog = __webpack_require__(19);

var _helpersLog2 = _interopRequireDefault(_helpersLog);

var _helpersLookup = __webpack_require__(20);

var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

var _helpersWith = __webpack_require__(21);

var _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7eUNBQXVDLGdDQUFnQzs7OzsyQkFDOUMsZ0JBQWdCOzs7O29DQUNQLDBCQUEwQjs7Ozt5QkFDckMsY0FBYzs7OzswQkFDYixlQUFlOzs7OzZCQUNaLGtCQUFrQjs7OzsyQkFDcEIsZ0JBQWdCOzs7O0FBRWxDLFNBQVMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO0FBQy9DLHlDQUEyQixRQUFRLENBQUMsQ0FBQztBQUNyQywyQkFBYSxRQUFRLENBQUMsQ0FBQztBQUN2QixvQ0FBc0IsUUFBUSxDQUFDLENBQUM7QUFDaEMseUJBQVcsUUFBUSxDQUFDLENBQUM7QUFDckIsMEJBQVksUUFBUSxDQUFDLENBQUM7QUFDdEIsNkJBQWUsUUFBUSxDQUFDLENBQUM7QUFDekIsMkJBQWEsUUFBUSxDQUFDLENBQUM7Q0FDeEIiLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZWdpc3RlckJsb2NrSGVscGVyTWlzc2luZyBmcm9tICcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnO1xuaW1wb3J0IHJlZ2lzdGVyRWFjaCBmcm9tICcuL2hlbHBlcnMvZWFjaCc7XG5pbXBvcnQgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nIGZyb20gJy4vaGVscGVycy9oZWxwZXItbWlzc2luZyc7XG5pbXBvcnQgcmVnaXN0ZXJJZiBmcm9tICcuL2hlbHBlcnMvaWYnO1xuaW1wb3J0IHJlZ2lzdGVyTG9nIGZyb20gJy4vaGVscGVycy9sb2cnO1xuaW1wb3J0IHJlZ2lzdGVyTG9va3VwIGZyb20gJy4vaGVscGVycy9sb29rdXAnO1xuaW1wb3J0IHJlZ2lzdGVyV2l0aCBmcm9tICcuL2hlbHBlcnMvd2l0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIHJlZ2lzdGVyQmxvY2tIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJFYWNoKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJIZWxwZXJNaXNzaW5nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJJZihpbnN0YW5jZSk7XG4gIHJlZ2lzdGVyTG9nKGluc3RhbmNlKTtcbiAgcmVnaXN0ZXJMb29rdXAoaW5zdGFuY2UpO1xuICByZWdpc3RlcldpdGgoaW5zdGFuY2UpO1xufVxuIl19


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = { data: data };
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBc0QsVUFBVTs7cUJBRWpELFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZFLFFBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPO1FBQ3pCLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDcEIsYUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDakIsTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUMvQyxhQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QixNQUFNLElBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUMzQixVQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNmLGlCQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCOztBQUVELGVBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTCxlQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN0QjtLQUNGLE1BQU07QUFDTCxVQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixZQUFJLElBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdFLGVBQU8sR0FBRyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztPQUN4Qjs7QUFFRCxhQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJibG9jay1oZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGNyZWF0ZUZyYW1lLCBpc0FycmF5fSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgbGV0IGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmIChjb250ZXh0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZm4odGhpcyk7XG4gICAgfSBlbHNlIGlmIChjb250ZXh0ID09PSBmYWxzZSB8fCBjb250ZXh0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgICBvcHRpb25zLmlkcyA9IFtvcHRpb25zLm5hbWVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnMuZWFjaChjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbnZlcnNlKHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGxldCBkYXRhID0gY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5uYW1lKTtcbiAgICAgICAgb3B0aW9ucyA9IHtkYXRhOiBkYXRhfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = __webpack_require__(0);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    var fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }

    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        var priorKey = undefined;

        for (var key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O3FCQUErRSxVQUFVOzt5QkFDbkUsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksQ0FBQyxPQUFPLEVBQUU7QUFDWixZQUFNLDJCQUFjLDZCQUE2QixDQUFDLENBQUM7S0FDcEQ7O0FBRUQsUUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUU7UUFDZixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87UUFDekIsQ0FBQyxHQUFHLENBQUM7UUFDTCxHQUFHLEdBQUcsRUFBRTtRQUNSLElBQUksWUFBQTtRQUNKLFdBQVcsWUFBQSxDQUFDOztBQUVoQixRQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUMvQixpQkFBVyxHQUFHLHlCQUFrQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ2pGOztBQUVELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxHQUFHLG1CQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQzs7QUFFRCxhQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN6QyxVQUFJLElBQUksRUFBRTtBQUNSLFlBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUN6QixZQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7O0FBRW5CLFlBQUksV0FBVyxFQUFFO0FBQ2YsY0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3hDO09BQ0Y7O0FBRUQsU0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzdCLFlBQUksRUFBRSxJQUFJO0FBQ1YsbUJBQVcsRUFBRSxtQkFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7T0FDL0UsQ0FBQyxDQUFDO0tBQ0o7O0FBRUQsUUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQzFDLFVBQUksZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNwQixhQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxjQUFJLENBQUMsSUFBSSxPQUFPLEVBQUU7QUFDaEIseUJBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQy9DO1NBQ0Y7T0FDRixNQUFNO0FBQ0wsWUFBSSxRQUFRLFlBQUEsQ0FBQzs7QUFFYixhQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtBQUN2QixjQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Ozs7QUFJL0IsZ0JBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQiwyQkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDaEM7QUFDRCxvQkFBUSxHQUFHLEdBQUcsQ0FBQztBQUNmLGFBQUMsRUFBRSxDQUFDO1dBQ0w7U0FDRjtBQUNELFlBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtBQUMxQix1QkFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO09BQ0Y7S0FDRjs7QUFFRCxRQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDWCxTQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCOztBQUVELFdBQU8sR0FBRyxDQUFDO0dBQ1osQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoiZWFjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwZW5kQ29udGV4dFBhdGgsIGJsb2NrUGFyYW1zLCBjcmVhdGVGcmFtZSwgaXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEV4Y2VwdGlvbiBmcm9tICcuLi9leGNlcHRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignZWFjaCcsIGZ1bmN0aW9uKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY29udGV4dFBhdGg7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoKG9wdGlvbnMuZGF0YS5jb250ZXh0UGF0aCwgb3B0aW9ucy5pZHNbMF0pICsgJy4nO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQpKSB7IGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7IH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dFtmaWVsZF0sIGZpZWxkXSwgW2NvbnRleHRQYXRoICsgZmllbGQsIG51bGxdKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgJiYgdHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoaXNBcnJheShjb250ZXh0KSkge1xuICAgICAgICBmb3IgKGxldCBqID0gY29udGV4dC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSBpbiBjb250ZXh0KSB7XG4gICAgICAgICAgICBleGVjSXRlcmF0aW9uKGksIGksIGkgPT09IGNvbnRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJpb3JLZXk7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGNvbnRleHQpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAvLyBXZSdyZSBydW5uaW5nIHRoZSBpdGVyYXRpb25zIG9uZSBzdGVwIG91dCBvZiBzeW5jIHNvIHdlIGNhbiBkZXRlY3RcbiAgICAgICAgICAgIC8vIHRoZSBsYXN0IGl0ZXJhdGlvbiB3aXRob3V0IGhhdmUgdG8gc2NhbiB0aGUgb2JqZWN0IHR3aWNlIGFuZCBjcmVhdGVcbiAgICAgICAgICAgIC8vIGFuIGl0ZXJtZWRpYXRlIGtleXMgYXJyYXkuXG4gICAgICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmlvcktleSA9IGtleTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByaW9yS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBleGVjSXRlcmF0aW9uKHByaW9yS2V5LCBpIC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgcmV0ID0gaW52ZXJzZSh0aGlzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

exports['default'] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozt5QkFBc0IsY0FBYzs7OztxQkFFckIsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsaUNBQWdDO0FBQ3ZFLFFBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7O0FBRTFCLGFBQU8sU0FBUyxDQUFDO0tBQ2xCLE1BQU07O0FBRUwsWUFBTSwyQkFBYyxtQkFBbUIsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDdkY7R0FDRixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJoZWxwZXItbWlzc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi4vZXhjZXB0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbigvKiBbYXJncywgXW9wdGlvbnMgKi8pIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gQSBtaXNzaW5nIGZpZWxkIGluIGEge3tmb299fSBjb25zdHJ1Y3QuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTb21lb25lIGlzIGFjdHVhbGx5IHRyeWluZyB0byBjYWxsIHNvbWV0aGluZywgYmxvdyB1cC5cbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ01pc3NpbmcgaGVscGVyOiBcIicgKyBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdLm5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH0pO1xufVxuIl19


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function (conditional, options) {
    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztxQkFBa0MsVUFBVTs7cUJBRTdCLFVBQVMsUUFBUSxFQUFFO0FBQ2hDLFVBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMzRCxRQUFJLGtCQUFXLFdBQVcsQ0FBQyxFQUFFO0FBQUUsaUJBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQUU7Ozs7O0FBS3RFLFFBQUksQUFBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxJQUFLLGVBQVEsV0FBVyxDQUFDLEVBQUU7QUFDdkUsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCLE1BQU07QUFDTCxhQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7R0FDRixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQy9ELFdBQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztHQUN2SCxDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJpZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNFbXB0eSwgaXNGdW5jdGlvbn0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignaWYnLCBmdW5jdGlvbihjb25kaXRpb25hbCwgb3B0aW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkgeyBjb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsLmNhbGwodGhpcyk7IH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCghb3B0aW9ucy5oYXNoLmluY2x1ZGVaZXJvICYmICFjb25kaXRpb25hbCkgfHwgaXNFbXB0eShjb25kaXRpb25hbCkpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmZuKHRoaXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3VubGVzcycsIGZ1bmN0aW9uKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwge2ZuOiBvcHRpb25zLmludmVyc2UsIGludmVyc2U6IG9wdGlvbnMuZm4sIGhhc2g6IG9wdGlvbnMuaGFzaH0pO1xuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
        options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log.apply(instance, args);
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsa0NBQWlDO0FBQzlELFFBQUksSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsVUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qjs7QUFFRCxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxRQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtBQUM5QixXQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDNUIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO0FBQ3JELFdBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM1QjtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7O0FBRWhCLFlBQVEsQ0FBQyxHQUFHLE1BQUEsQ0FBWixRQUFRLEVBQVMsSUFBSSxDQUFDLENBQUM7R0FDeEIsQ0FBQyxDQUFDO0NBQ0oiLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvZycsIGZ1bmN0aW9uKC8qIG1lc3NhZ2UsIG9wdGlvbnMgKi8pIHtcbiAgICBsZXQgYXJncyA9IFt1bmRlZmluZWRdLFxuICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2FyZ3VtZW50cy5sZW5ndGggLSAxXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICAgIH1cblxuICAgIGxldCBsZXZlbCA9IDE7XG4gICAgaWYgKG9wdGlvbnMuaGFzaC5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuaGFzaC5sZXZlbDtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGEubGV2ZWwgIT0gbnVsbCkge1xuICAgICAgbGV2ZWwgPSBvcHRpb25zLmRhdGEubGV2ZWw7XG4gICAgfVxuICAgIGFyZ3NbMF0gPSBsZXZlbDtcblxuICAgIGluc3RhbmNlLmxvZyguLi4gYXJncyk7XG4gIH0pO1xufVxuIl19


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports['default'] = function (instance) {
  instance.registerHelper('lookup', function (obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQWUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFdBQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJsb29rdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnN0YW5jZSkge1xuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcignbG9va3VwJywgZnVuY3Rpb24ob2JqLCBmaWVsZCkge1xuICAgIHJldHVybiBvYmogJiYgb2JqW2ZpZWxkXTtcbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    var fn = options.fn;

    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUErRSxVQUFVOztxQkFFMUUsVUFBUyxRQUFRLEVBQUU7QUFDaEMsVUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFFBQUksa0JBQVcsT0FBTyxDQUFDLEVBQUU7QUFBRSxhQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUFFOztBQUUxRCxRQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUVwQixRQUFJLENBQUMsZUFBUSxPQUFPLENBQUMsRUFBRTtBQUNyQixVQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hCLFVBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQy9CLFlBQUksR0FBRyxtQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2hGOztBQUVELGFBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRTtBQUNqQixZQUFJLEVBQUUsSUFBSTtBQUNWLG1CQUFXLEVBQUUsbUJBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7T0FDaEUsQ0FBQyxDQUFDO0tBQ0osTUFBTTtBQUNMLGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QjtHQUNGLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6IndpdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcGVuZENvbnRleHRQYXRoLCBibG9ja1BhcmFtcywgY3JlYXRlRnJhbWUsIGlzRW1wdHksIGlzRnVuY3Rpb259IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbihjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29udGV4dCkpIHsgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTsgfVxuXG4gICAgbGV0IGZuID0gb3B0aW9ucy5mbjtcblxuICAgIGlmICghaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgbGV0IGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBjcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBkYXRhLmNvbnRleHRQYXRoID0gYXBwZW5kQ29udGV4dFBhdGgob3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoLCBvcHRpb25zLmlkc1swXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmbihjb250ZXh0LCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _decoratorsInline = __webpack_require__(23);

var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Z0NBQTJCLHFCQUFxQjs7OztBQUV6QyxTQUFTLHlCQUF5QixDQUFDLFFBQVEsRUFBRTtBQUNsRCxnQ0FBZSxRQUFRLENBQUMsQ0FBQztDQUMxQiIsImZpbGUiOiJkZWNvcmF0b3JzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZ2lzdGVySW5saW5lIGZyb20gJy4vZGVjb3JhdG9ycy9pbmxpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyhpbnN0YW5jZSkge1xuICByZWdpc3RlcklubGluZShpbnN0YW5jZSk7XG59XG5cbiJdfQ==


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

exports['default'] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7cUJBQXFCLFVBQVU7O3FCQUVoQixVQUFTLFFBQVEsRUFBRTtBQUNoQyxVQUFRLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzNFLFFBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ25CLFdBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFNBQUcsR0FBRyxVQUFTLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRS9CLFlBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7QUFDbEMsaUJBQVMsQ0FBQyxRQUFRLEdBQUcsY0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxRCxZQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLGlCQUFTLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUM5QixlQUFPLEdBQUcsQ0FBQztPQUNaLENBQUM7S0FDSDs7QUFFRCxTQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDOztBQUU3QyxXQUFPLEdBQUcsQ0FBQztHQUNaLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZXh0ZW5kfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVyRGVjb3JhdG9yKCdpbmxpbmUnLCBmdW5jdGlvbihmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIGxldCByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24oY29udGV4dCwgb3B0aW9ucykge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcGFydGlhbHMgc3RhY2sgZnJhbWUgcHJpb3IgdG8gZXhlYy5cbiAgICAgICAgbGV0IG9yaWdpbmFsID0gY29udGFpbmVyLnBhcnRpYWxzO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBleHRlbmQoe30sIG9yaWdpbmFsLCBwcm9wcy5wYXJ0aWFscyk7XG4gICAgICAgIGxldCByZXQgPSBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3JpZ2luYWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHByb3BzLnBhcnRpYWxzW29wdGlvbnMuYXJnc1swXV0gPSBvcHRpb25zLmZuO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG4iXX0=


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _utils = __webpack_require__(0);

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};

exports['default'] = logger;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL2xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O3FCQUFzQixTQUFTOztBQUUvQixJQUFJLE1BQU0sR0FBRztBQUNYLFdBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztBQUM3QyxPQUFLLEVBQUUsTUFBTTs7O0FBR2IsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUM3QixVQUFJLFFBQVEsR0FBRyxlQUFRLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDOUQsVUFBSSxRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2pCLGFBQUssR0FBRyxRQUFRLENBQUM7T0FDbEIsTUFBTTtBQUNMLGFBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO09BQzdCO0tBQ0Y7O0FBRUQsV0FBTyxLQUFLLENBQUM7R0FDZDs7O0FBR0QsS0FBRyxFQUFFLGFBQVMsS0FBSyxFQUFjO0FBQy9CLFNBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUVsQyxRQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLEVBQUU7QUFDL0UsVUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxVQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFOztBQUNwQixjQUFNLEdBQUcsS0FBSyxDQUFDO09BQ2hCOzt3Q0FQbUIsT0FBTztBQUFQLGVBQU87OztBQVEzQixhQUFPLENBQUMsTUFBTSxPQUFDLENBQWYsT0FBTyxFQUFZLE9BQU8sQ0FBQyxDQUFDO0tBQzdCO0dBQ0Y7Q0FDRixDQUFDOztxQkFFYSxNQUFNIiwiZmlsZSI6ImxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5kZXhPZn0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbihsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbGV2ZWxNYXAgPSBpbmRleE9mKGxvZ2dlci5tZXRob2RNYXAsIGxldmVsLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgaWYgKGxldmVsTWFwID49IDApIHtcbiAgICAgICAgbGV2ZWwgPSBsZXZlbE1hcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldmVsID0gcGFyc2VJbnQobGV2ZWwsIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGV2ZWw7XG4gIH0sXG5cbiAgLy8gQ2FuIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGhvc3QgZW52aXJvbm1lbnRcbiAgbG9nOiBmdW5jdGlvbihsZXZlbCwgLi4ubWVzc2FnZSkge1xuICAgIGxldmVsID0gbG9nZ2VyLmxvb2t1cExldmVsKGxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9nZ2VyLmxvb2t1cExldmVsKGxvZ2dlci5sZXZlbCkgPD0gbGV2ZWwpIHtcbiAgICAgIGxldCBtZXRob2QgPSBsb2dnZXIubWV0aG9kTWFwW2xldmVsXTtcbiAgICAgIGlmICghY29uc29sZVttZXRob2RdKSB7ICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuICAgICAgY29uc29sZVttZXRob2RdKC4uLm1lc3NhZ2UpOyAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjtcbiJdfQ==


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDdEI7O0FBRUQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUN2RSxTQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0NBQ3pCLENBQUM7O3FCQUVhLFVBQVUiLCJmaWxlIjoic2FmZS1zdHJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnJyArIHRoaXMuc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2FmZVN0cmluZztcbiJdfQ==


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = __webpack_require__(0);

var Utils = _interopRequireWildcard(_utils);

var _exception = __webpack_require__(1);

var _exception2 = _interopRequireDefault(_exception);

var _base = __webpack_require__(6);

function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      var obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };

  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function (options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQXVCLFNBQVM7O0lBQXBCLEtBQUs7O3lCQUNLLGFBQWE7Ozs7b0JBQzhCLFFBQVE7O0FBRWxFLFNBQVMsYUFBYSxDQUFDLFlBQVksRUFBRTtBQUMxQyxNQUFNLGdCQUFnQixHQUFHLFlBQVksSUFBSSxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUN2RCxlQUFlLDBCQUFvQixDQUFDOztBQUUxQyxNQUFJLGdCQUFnQixLQUFLLGVBQWUsRUFBRTtBQUN4QyxRQUFJLGdCQUFnQixHQUFHLGVBQWUsRUFBRTtBQUN0QyxVQUFNLGVBQWUsR0FBRyx1QkFBaUIsZUFBZSxDQUFDO1VBQ25ELGdCQUFnQixHQUFHLHVCQUFpQixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVELFlBQU0sMkJBQWMseUZBQXlGLEdBQ3ZHLHFEQUFxRCxHQUFHLGVBQWUsR0FBRyxtREFBbUQsR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNoSyxNQUFNOztBQUVMLFlBQU0sMkJBQWMsd0ZBQXdGLEdBQ3RHLGlEQUFpRCxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUNuRjtHQUNGO0NBQ0Y7O0FBRU0sU0FBUyxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTs7QUFFMUMsTUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNSLFVBQU0sMkJBQWMsbUNBQW1DLENBQUMsQ0FBQztHQUMxRDtBQUNELE1BQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQ3ZDLFVBQU0sMkJBQWMsMkJBQTJCLEdBQUcsT0FBTyxZQUFZLENBQUMsQ0FBQztHQUN4RTs7QUFFRCxjQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDOzs7O0FBSWxELEtBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFNUMsV0FBUyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUN2RCxRQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEIsYUFBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsVUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsZUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7T0FDdkI7S0FDRjs7QUFFRCxXQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RFLFFBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFeEUsUUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDakMsYUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6RixZQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzNEO0FBQ0QsUUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ2xCLFVBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsQixZQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUMsY0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM1QixrQkFBTTtXQUNQOztBQUVELGVBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztBQUNELGNBQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzNCO0FBQ0QsYUFBTyxNQUFNLENBQUM7S0FDZixNQUFNO0FBQ0wsWUFBTSwyQkFBYyxjQUFjLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRywwREFBMEQsQ0FBQyxDQUFDO0tBQ2pIO0dBQ0Y7OztBQUdELE1BQUksU0FBUyxHQUFHO0FBQ2QsVUFBTSxFQUFFLGdCQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDMUIsVUFBSSxFQUFFLElBQUksSUFBSSxHQUFHLENBQUEsQUFBQyxFQUFFO0FBQ2xCLGNBQU0sMkJBQWMsR0FBRyxHQUFHLElBQUksR0FBRyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsQ0FBQztPQUM3RDtBQUNELGFBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2xCO0FBQ0QsVUFBTSxFQUFFLGdCQUFTLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDN0IsVUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMxQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLFlBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDeEMsaUJBQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO09BQ0Y7S0FDRjtBQUNELFVBQU0sRUFBRSxnQkFBUyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLGFBQU8sT0FBTyxPQUFPLEtBQUssVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO0tBQ3hFOztBQUVELG9CQUFnQixFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7QUFDeEMsaUJBQWEsRUFBRSxvQkFBb0I7O0FBRW5DLE1BQUUsRUFBRSxZQUFTLENBQUMsRUFBRTtBQUNkLFVBQUksR0FBRyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQixTQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDdkMsYUFBTyxHQUFHLENBQUM7S0FDWjs7QUFFRCxZQUFRLEVBQUUsRUFBRTtBQUNaLFdBQU8sRUFBRSxpQkFBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUU7QUFDbkUsVUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7VUFDakMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsVUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLFdBQVcsSUFBSSxtQkFBbUIsRUFBRTtBQUN4RCxzQkFBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO09BQzNGLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRTtBQUMxQixzQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDOUQ7QUFDRCxhQUFPLGNBQWMsQ0FBQztLQUN2Qjs7QUFFRCxRQUFJLEVBQUUsY0FBUyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzNCLGFBQU8sS0FBSyxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ3ZCLGFBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO09BQ3ZCO0FBQ0QsYUFBTyxLQUFLLENBQUM7S0FDZDtBQUNELFNBQUssRUFBRSxlQUFTLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDN0IsVUFBSSxHQUFHLEdBQUcsS0FBSyxJQUFJLE1BQU0sQ0FBQzs7QUFFMUIsVUFBSSxLQUFLLElBQUksTUFBTSxJQUFLLEtBQUssS0FBSyxNQUFNLEFBQUMsRUFBRTtBQUN6QyxXQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ3ZDOztBQUVELGFBQU8sR0FBRyxDQUFDO0tBQ1o7O0FBRUQsZUFBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDOztBQUU1QixRQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJO0FBQ2pCLGdCQUFZLEVBQUUsWUFBWSxDQUFDLFFBQVE7R0FDcEMsQ0FBQzs7QUFFRixXQUFTLEdBQUcsQ0FBQyxPQUFPLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOztBQUNoQyxRQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV4QixPQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUU7QUFDNUMsVUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDaEM7QUFDRCxRQUFJLE1BQU0sWUFBQTtRQUNOLFdBQVcsR0FBRyxZQUFZLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDL0QsUUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFO0FBQzFCLFVBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsQixjQUFNLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7T0FDM0YsTUFBTTtBQUNMLGNBQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO09BQ3BCO0tBQ0Y7O0FBRUQsYUFBUyxJQUFJLENBQUMsT0FBTyxnQkFBZTtBQUNsQyxhQUFPLEVBQUUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDckg7QUFDRCxRQUFJLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0RyxXQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDL0I7QUFDRCxLQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFakIsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFTLE9BQU8sRUFBRTtBQUM3QixRQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUNwQixlQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRWxFLFVBQUksWUFBWSxDQUFDLFVBQVUsRUFBRTtBQUMzQixpQkFBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ3RFO0FBQ0QsVUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUU7QUFDekQsaUJBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztPQUM1RTtLQUNGLE1BQU07QUFDTCxlQUFTLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFDcEMsZUFBUyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0FBQ3RDLGVBQVMsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztLQUMzQztHQUNGLENBQUM7O0FBRUYsS0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUNsRCxRQUFJLFlBQVksQ0FBQyxjQUFjLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDL0MsWUFBTSwyQkFBYyx3QkFBd0IsQ0FBQyxDQUFDO0tBQy9DO0FBQ0QsUUFBSSxZQUFZLENBQUMsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3JDLFlBQU0sMkJBQWMseUJBQXlCLENBQUMsQ0FBQztLQUNoRDs7QUFFRCxXQUFPLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztHQUNqRixDQUFDO0FBQ0YsU0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFTSxTQUFTLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtBQUM1RixXQUFTLElBQUksQ0FBQyxPQUFPLEVBQWdCO1FBQWQsT0FBTyx5REFBRyxFQUFFOztBQUNqQyxRQUFJLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDM0IsUUFBSSxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE9BQU8sS0FBSyxTQUFTLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUEsQUFBQyxFQUFFO0FBQ2hHLG1CQUFhLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDMUM7O0FBRUQsV0FBTyxFQUFFLENBQUMsU0FBUyxFQUNmLE9BQU8sRUFDUCxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQ3JDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUNwQixXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUN4RCxhQUFhLENBQUMsQ0FBQztHQUNwQjs7QUFFRCxNQUFJLEdBQUcsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzs7QUFFekUsTUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDakIsTUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDeEMsTUFBSSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsSUFBSSxDQUFDLENBQUM7QUFDNUMsU0FBTyxJQUFJLENBQUM7Q0FDYjs7QUFFTSxTQUFTLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUN4RCxNQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1osUUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLGdCQUFnQixFQUFFO0FBQ3JDLGFBQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3pDLE1BQU07QUFDTCxhQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUM7R0FDRixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTs7QUFFekMsV0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7QUFDdkIsV0FBTyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDckM7QUFDRCxTQUFPLE9BQU8sQ0FBQztDQUNoQjs7QUFFTSxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs7QUFFdkQsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUUsU0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDdkIsTUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ2YsV0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztHQUN2RTs7QUFFRCxNQUFJLFlBQVksWUFBQSxDQUFDO0FBQ2pCLE1BQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLElBQUksRUFBRTs7QUFDckMsYUFBTyxDQUFDLElBQUksR0FBRyxrQkFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRXpDLFVBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUM7QUFDcEIsa0JBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsbUJBQW1CLENBQUMsT0FBTyxFQUFnQjtZQUFkLE9BQU8seURBQUcsRUFBRTs7OztBQUkvRixlQUFPLENBQUMsSUFBSSxHQUFHLGtCQUFZLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxlQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDO0FBQ3BELGVBQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztPQUM3QixDQUFDO0FBQ0YsVUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0FBQ2YsZUFBTyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztPQUNwRTs7R0FDRjs7QUFFRCxNQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksWUFBWSxFQUFFO0FBQ3pDLFdBQU8sR0FBRyxZQUFZLENBQUM7R0FDeEI7O0FBRUQsTUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO0FBQ3pCLFVBQU0sMkJBQWMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUMsQ0FBQztHQUM1RSxNQUFNLElBQUksT0FBTyxZQUFZLFFBQVEsRUFBRTtBQUN0QyxXQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDbEM7Q0FDRjs7QUFFTSxTQUFTLElBQUksR0FBRztBQUFFLFNBQU8sRUFBRSxDQUFDO0NBQUU7O0FBRXJDLFNBQVMsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDL0IsTUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUEsQUFBQyxFQUFFO0FBQzlCLFFBQUksR0FBRyxJQUFJLEdBQUcsa0JBQVksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLFFBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0dBQ3JCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDYjs7QUFFRCxTQUFTLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO0FBQ3pFLE1BQUksRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUNoQixRQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUYsU0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDM0I7QUFDRCxTQUFPLElBQUksQ0FBQztDQUNiIiwiZmlsZSI6InJ1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBFeGNlcHRpb24gZnJvbSAnLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgQ09NUElMRVJfUkVWSVNJT04sIFJFVklTSU9OX0NIQU5HRVMsIGNyZWF0ZUZyYW1lIH0gZnJvbSAnLi9iYXNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIGNvbnN0IGNvbXBpbGVyUmV2aXNpb24gPSBjb21waWxlckluZm8gJiYgY29tcGlsZXJJbmZvWzBdIHx8IDEsXG4gICAgICAgIGN1cnJlbnRSZXZpc2lvbiA9IENPTVBJTEVSX1JFVklTSU9OO1xuXG4gIGlmIChjb21waWxlclJldmlzaW9uICE9PSBjdXJyZW50UmV2aXNpb24pIHtcbiAgICBpZiAoY29tcGlsZXJSZXZpc2lvbiA8IGN1cnJlbnRSZXZpc2lvbikge1xuICAgICAgY29uc3QgcnVudGltZVZlcnNpb25zID0gUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgICAgY29tcGlsZXJWZXJzaW9ucyA9IFJFVklTSU9OX0NIQU5HRVNbY29tcGlsZXJSZXZpc2lvbl07XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUZW1wbGF0ZSB3YXMgcHJlY29tcGlsZWQgd2l0aCBhbiBvbGRlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICtcbiAgICAgICAgICAgICdQbGVhc2UgdXBkYXRlIHlvdXIgcHJlY29tcGlsZXIgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgcnVudGltZVZlcnNpb25zICsgJykgb3IgZG93bmdyYWRlIHlvdXIgcnVudGltZSB0byBhbiBvbGRlciB2ZXJzaW9uICgnICsgY29tcGlsZXJWZXJzaW9ucyArICcpLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBVc2UgdGhlIGVtYmVkZGVkIHZlcnNpb24gaW5mbyBzaW5jZSB0aGUgcnVudGltZSBkb2Vzbid0IGtub3cgYWJvdXQgdGhpcyByZXZpc2lvbiB5ZXRcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGEgbmV3ZXIgdmVyc2lvbiBvZiBIYW5kbGViYXJzIHRoYW4gdGhlIGN1cnJlbnQgcnVudGltZS4gJyArXG4gICAgICAgICAgICAnUGxlYXNlIHVwZGF0ZSB5b3VyIHJ1bnRpbWUgdG8gYSBuZXdlciB2ZXJzaW9uICgnICsgY29tcGlsZXJJbmZvWzFdICsgJykuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ05vIGVudmlyb25tZW50IHBhc3NlZCB0byB0ZW1wbGF0ZScpO1xuICB9XG4gIGlmICghdGVtcGxhdGVTcGVjIHx8ICF0ZW1wbGF0ZVNwZWMubWFpbikge1xuICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1Vua25vd24gdGVtcGxhdGUgb2JqZWN0OiAnICsgdHlwZW9mIHRlbXBsYXRlU3BlYyk7XG4gIH1cblxuICB0ZW1wbGF0ZVNwZWMubWFpbi5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWMubWFpbl9kO1xuXG4gIC8vIE5vdGU6IFVzaW5nIGVudi5WTSByZWZlcmVuY2VzIHJhdGhlciB0aGFuIGxvY2FsIHZhciByZWZlcmVuY2VzIHRocm91Z2hvdXQgdGhpcyBzZWN0aW9uIHRvIGFsbG93XG4gIC8vIGZvciBleHRlcm5hbCB1c2VycyB0byBvdmVycmlkZSB0aGVzZSBhcyBwc3VlZG8tc3VwcG9ydGVkIEFQSXMuXG4gIGVudi5WTS5jaGVja1JldmlzaW9uKHRlbXBsYXRlU3BlYy5jb21waWxlcik7XG5cbiAgZnVuY3Rpb24gaW52b2tlUGFydGlhbFdyYXBwZXIocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICAgIGNvbnRleHQgPSBVdGlscy5leHRlbmQoe30sIGNvbnRleHQsIG9wdGlvbnMuaGFzaCk7XG4gICAgICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICAgICAgb3B0aW9ucy5pZHNbMF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhcnRpYWwgPSBlbnYuVk0ucmVzb2x2ZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcbiAgICBsZXQgcmVzdWx0ID0gZW52LlZNLmludm9rZVBhcnRpYWwuY2FsbCh0aGlzLCBwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbCAmJiBlbnYuY29tcGlsZSkge1xuICAgICAgb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdID0gZW52LmNvbXBpbGUocGFydGlhbCwgdGVtcGxhdGVTcGVjLmNvbXBpbGVyT3B0aW9ucywgZW52KTtcbiAgICAgIHJlc3VsdCA9IG9wdGlvbnMucGFydGlhbHNbb3B0aW9ucy5uYW1lXShjb250ZXh0LCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICBpZiAob3B0aW9ucy5pbmRlbnQpIHtcbiAgICAgICAgbGV0IGxpbmVzID0gcmVzdWx0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAoIWxpbmVzW2ldICYmIGkgKyAxID09PSBsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaW5lc1tpXSA9IG9wdGlvbnMuaW5kZW50ICsgbGluZXNbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gbGluZXMuam9pbignXFxuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgbGV0IGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgaWYgKCEobmFtZSBpbiBvYmopKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oJ1wiJyArIG5hbWUgKyAnXCIgbm90IGRlZmluZWQgaW4gJyArIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgbG9va3VwOiBmdW5jdGlvbihkZXB0aHMsIG5hbWUpIHtcbiAgICAgIGNvbnN0IGxlbiA9IGRlcHRocy5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChkZXB0aHNbaV0gJiYgZGVwdGhzW2ldW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZGVwdGhzW2ldW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBsYW1iZGE6IGZ1bmN0aW9uKGN1cnJlbnQsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY3VycmVudCA9PT0gJ2Z1bmN0aW9uJyA/IGN1cnJlbnQuY2FsbChjb250ZXh0KSA6IGN1cnJlbnQ7XG4gICAgfSxcblxuICAgIGVzY2FwZUV4cHJlc3Npb246IFV0aWxzLmVzY2FwZUV4cHJlc3Npb24sXG4gICAgaW52b2tlUGFydGlhbDogaW52b2tlUGFydGlhbFdyYXBwZXIsXG5cbiAgICBmbjogZnVuY3Rpb24oaSkge1xuICAgICAgbGV0IHJldCA9IHRlbXBsYXRlU3BlY1tpXTtcbiAgICAgIHJldC5kZWNvcmF0b3IgPSB0ZW1wbGF0ZVNwZWNbaSArICdfZCddO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgcHJvZ3JhbXM6IFtdLFxuICAgIHByb2dyYW06IGZ1bmN0aW9uKGksIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICAgIGxldCBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0sXG4gICAgICAgICAgZm4gPSB0aGlzLmZuKGkpO1xuICAgICAgaWYgKGRhdGEgfHwgZGVwdGhzIHx8IGJsb2NrUGFyYW1zIHx8IGRlY2xhcmVkQmxvY2tQYXJhbXMpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFwcm9ncmFtV3JhcHBlcikge1xuICAgICAgICBwcm9ncmFtV3JhcHBlciA9IHRoaXMucHJvZ3JhbXNbaV0gPSB3cmFwUHJvZ3JhbSh0aGlzLCBpLCBmbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcHJvZ3JhbVdyYXBwZXI7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIGxldCBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgKHBhcmFtICE9PSBjb21tb24pKSB7XG4gICAgICAgIG9iaiA9IFV0aWxzLmV4dGVuZCh7fSwgY29tbW9uLCBwYXJhbSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSxcbiAgICAvLyBBbiBlbXB0eSBvYmplY3QgdG8gdXNlIGFzIHJlcGxhY2VtZW50IGZvciBudWxsLWNvbnRleHRzXG4gICAgbnVsbENvbnRleHQ6IE9iamVjdC5zZWFsKHt9KSxcblxuICAgIG5vb3A6IGVudi5WTS5ub29wLFxuICAgIGNvbXBpbGVySW5mbzogdGVtcGxhdGVTcGVjLmNvbXBpbGVyXG4gIH07XG5cbiAgZnVuY3Rpb24gcmV0KGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICBsZXQgZGVwdGhzLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0LyosIG9wdGlvbnMqLykge1xuICAgICAgcmV0dXJuICcnICsgdGVtcGxhdGVTcGVjLm1haW4oY29udGFpbmVyLCBjb250ZXh0LCBjb250YWluZXIuaGVscGVycywgY29udGFpbmVyLnBhcnRpYWxzLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICB9XG4gICAgbWFpbiA9IGV4ZWN1dGVEZWNvcmF0b3JzKHRlbXBsYXRlU3BlYy5tYWluLCBtYWluLCBjb250YWluZXIsIG9wdGlvbnMuZGVwdGhzIHx8IFtdLCBkYXRhLCBibG9ja1BhcmFtcyk7XG4gICAgcmV0dXJuIG1haW4oY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0LmlzVG9wID0gdHJ1ZTtcblxuICByZXQuX3NldHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5wYXJ0aWFsKSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLmhlbHBlcnMsIGVudi5oZWxwZXJzKTtcblxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IGNvbnRhaW5lci5tZXJnZShvcHRpb25zLnBhcnRpYWxzLCBlbnYucGFydGlhbHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRlbXBsYXRlU3BlYy51c2VQYXJ0aWFsIHx8IHRlbXBsYXRlU3BlYy51c2VEZWNvcmF0b3JzKSB7XG4gICAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuZGVjb3JhdG9ycywgZW52LmRlY29yYXRvcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaGVscGVycyA9IG9wdGlvbnMuaGVscGVycztcbiAgICAgIGNvbnRhaW5lci5wYXJ0aWFscyA9IG9wdGlvbnMucGFydGlhbHM7XG4gICAgICBjb250YWluZXIuZGVjb3JhdG9ycyA9IG9wdGlvbnMuZGVjb3JhdG9ycztcbiAgICB9XG4gIH07XG5cbiAgcmV0Ll9jaGlsZCA9IGZ1bmN0aW9uKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignbXVzdCBwYXNzIGJsb2NrIHBhcmFtcycpO1xuICAgIH1cbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZURlcHRocyAmJiAhZGVwdGhzKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCdtdXN0IHBhc3MgcGFyZW50IGRlcHRocycpO1xuICAgIH1cblxuICAgIHJldHVybiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIHRlbXBsYXRlU3BlY1tpXSwgZGF0YSwgMCwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gIH07XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwUHJvZ3JhbShjb250YWluZXIsIGksIGZuLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gIGZ1bmN0aW9uIHByb2coY29udGV4dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsXG4gICAgICAgIG9wdGlvbnMuZGF0YSB8fCBkYXRhLFxuICAgICAgICBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSxcbiAgICAgICAgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgaWYgKCFwYXJ0aWFsKSB7XG4gICAgaWYgKG9wdGlvbnMubmFtZSA9PT0gJ0BwYXJ0aWFsLWJsb2NrJykge1xuICAgICAgcGFydGlhbCA9IG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdO1xuICAgIH1cbiAgfSBlbHNlIGlmICghcGFydGlhbC5jYWxsICYmICFvcHRpb25zLm5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIGEgZHluYW1pYyBwYXJ0aWFsIHRoYXQgcmV0dXJuZWQgYSBzdHJpbmdcbiAgICBvcHRpb25zLm5hbWUgPSBwYXJ0aWFsO1xuICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW3BhcnRpYWxdO1xuICB9XG4gIHJldHVybiBwYXJ0aWFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW52b2tlUGFydGlhbChwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gIC8vIFVzZSB0aGUgY3VycmVudCBjbG9zdXJlIGNvbnRleHQgdG8gc2F2ZSB0aGUgcGFydGlhbC1ibG9jayBpZiB0aGlzIHBhcnRpYWxcbiAgY29uc3QgY3VycmVudFBhcnRpYWxCbG9jayA9IG9wdGlvbnMuZGF0YSAmJiBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXTtcbiAgb3B0aW9ucy5wYXJ0aWFsID0gdHJ1ZTtcbiAgaWYgKG9wdGlvbnMuaWRzKSB7XG4gICAgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoID0gb3B0aW9ucy5pZHNbMF0gfHwgb3B0aW9ucy5kYXRhLmNvbnRleHRQYXRoO1xuICB9XG5cbiAgbGV0IHBhcnRpYWxCbG9jaztcbiAgaWYgKG9wdGlvbnMuZm4gJiYgb3B0aW9ucy5mbiAhPT0gbm9vcCkge1xuICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBnZXQgYWNjZXNzIHRvIGN1cnJlbnRQYXJ0aWFsQmxvY2sgZnJvbSB0aGUgY2xvc3VyZVxuICAgIGxldCBmbiA9IG9wdGlvbnMuZm47XG4gICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQsIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAvLyBpLmUuIHRoZSBwYXJ0IGluc2lkZSB0aGUgYmxvY2sgb2YgdGhlIHBhcnRpYWwgY2FsbC5cbiAgICAgIG9wdGlvbnMuZGF0YSA9IGNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICByZXR1cm4gZm4oY29udGV4dCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgIG9wdGlvbnMucGFydGlhbHMgPSBVdGlscy5leHRlbmQoe30sIG9wdGlvbnMucGFydGlhbHMsIGZuLnBhcnRpYWxzKTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEV4Y2VwdGlvbignVGhlIHBhcnRpYWwgJyArIG9wdGlvbnMubmFtZSArICcgY291bGQgbm90IGJlIGZvdW5kJyk7XG4gIH0gZWxzZSBpZiAocGFydGlhbCBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnRpYWwoY29udGV4dCwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IHJldHVybiAnJzsgfVxuXG5mdW5jdGlvbiBpbml0RGF0YShjb250ZXh0LCBkYXRhKSB7XG4gIGlmICghZGF0YSB8fCAhKCdyb290JyBpbiBkYXRhKSkge1xuICAgIGRhdGEgPSBkYXRhID8gY3JlYXRlRnJhbWUoZGF0YSkgOiB7fTtcbiAgICBkYXRhLnJvb3QgPSBjb250ZXh0O1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiBleGVjdXRlRGVjb3JhdG9ycyhmbiwgcHJvZywgY29udGFpbmVyLCBkZXB0aHMsIGRhdGEsIGJsb2NrUGFyYW1zKSB7XG4gIGlmIChmbi5kZWNvcmF0b3IpIHtcbiAgICBsZXQgcHJvcHMgPSB7fTtcbiAgICBwcm9nID0gZm4uZGVjb3JhdG9yKHByb2csIHByb3BzLCBjb250YWluZXIsIGRlcHRocyAmJiBkZXB0aHNbMF0sIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgIFV0aWxzLmV4dGVuZChwcm9nLCBwcm9wcyk7XG4gIH1cbiAgcmV0dXJuIHByb2c7XG59XG4iXX0=


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* global window */


exports.__esModule = true;

exports['default'] = function (Handlebars) {
  /* istanbul ignore next */
  var root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUNlLFVBQVMsVUFBVSxFQUFFOztBQUVsQyxNQUFJLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU07TUFDdEQsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7O0FBRWxDLFlBQVUsQ0FBQyxVQUFVLEdBQUcsWUFBVztBQUNqQyxRQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ2xDLFVBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO0tBQy9CO0FBQ0QsV0FBTyxVQUFVLENBQUM7R0FDbkIsQ0FBQztDQUNIIiwiZmlsZSI6Im5vLWNvbmZsaWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdpbmRvdyAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oSGFuZGxlYmFycykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBsZXQgcm9vdCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogd2luZG93LFxuICAgICAgJEhhbmRsZWJhcnMgPSByb290LkhhbmRsZWJhcnM7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIEhhbmRsZWJhcnMubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChyb290LkhhbmRsZWJhcnMgPT09IEhhbmRsZWJhcnMpIHtcbiAgICAgIHJvb3QuSGFuZGxlYmFycyA9ICRIYW5kbGViYXJzO1xuICAgIH1cbiAgICByZXR1cm4gSGFuZGxlYmFycztcbiAgfTtcbn1cbiJdfQ==

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(3, function() {
			var newContent = __webpack_require__(3);
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhNjI5MTc5YzUzYTg3NmYwN2UwZiIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9leGNlcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9ub3JtYWxpemUuY3NzL25vcm1hbGl6ZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vdGFibGUtbG9hZC1mb3JtL3RhYmxlLWxvYWQtZm9ybS5zY3NzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9iYXNlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9tYWluLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzPzNkZjUiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3RhYmxlLWxvYWQtZm9ybS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90YWJsZS1sb2FkLWZvcm0vdGFibGUtbG9hZC1mb3JtLmhicyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy9ibG9jay1oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2VhY2guanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy9oZWxwZXItbWlzc2luZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2lmLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvbG9nLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9zYWZlLXN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL25vLWNvbmZsaWN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi90YWJsZS1sb2FkLWZvcm0vdGFibGUtbG9hZC1mb3JtLnNjc3M/NGY0NyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wX25hbWVfXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBleGVjdXRlTW9kdWxlcykge1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW10sIHJlc3VsdDtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcbiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB0aGlzW1wid2VicGFja0hvdFVwZGF0ZV9uYW1lX1wiXTtcbiBcdHRoaXNbXCJ3ZWJwYWNrSG90VXBkYXRlX25hbWVfXCJdID0gXHJcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xyXG4gXHRcdGlmKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XHJcbiBcdH0gO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuIFx0XHRzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCI7XHJcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XHJcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcclxuIFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XHJcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gXHRcdFx0aWYodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKVxyXG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XHJcbiBcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcclxuIFx0XHRcdFx0cmVxdWVzdC5vcGVuKFwiR0VUXCIsIHJlcXVlc3RQYXRoLCB0cnVlKTtcclxuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XHJcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcclxuIFx0XHRcdH0gY2F0Y2goZXJyKSB7XHJcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiBcdFx0XHRcdGlmKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xyXG4gXHRcdFx0XHRpZihyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gXHRcdFx0XHRcdC8vIHRpbWVvdXRcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSBpZihyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XHJcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxyXG4gXHRcdFx0XHRcdHJlc29sdmUoKTtcclxuIFx0XHRcdFx0fSBlbHNlIGlmKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xyXG4gXHRcdFx0XHRcdC8vIG90aGVyIGZhaWx1cmVcclxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0Ly8gc3VjY2Vzc1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiBcdFx0XHRcdFx0fSBjYXRjaChlKSB7XHJcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XHJcbiBcdFx0XHRcdFx0XHRyZXR1cm47XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG5cbiBcdFxyXG4gXHRcclxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xyXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcImE2MjkxNzljNTNhODc2ZjA3ZTBmXCI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcclxuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XHJcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xyXG4gXHR2YXIgaG90Q3VycmVudENoaWxkTW9kdWxlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0aWYoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcclxuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XHJcbiBcdFx0XHRpZihtZS5ob3QuYWN0aXZlKSB7XHJcbiBcdFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcclxuIFx0XHRcdFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPCAwKVxyXG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xyXG4gXHRcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPCAwKVxyXG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XHJcbiBcdFx0XHR9IGVsc2Uge1xyXG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXF1ZXN0ICsgXCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICsgbW9kdWxlSWQpO1xyXG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XHJcbiBcdFx0fTtcclxuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xyXG4gXHRcdFx0cmV0dXJuIHtcclxuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xyXG4gXHRcdFx0XHR9LFxyXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9O1xyXG4gXHRcdH07XHJcbiBcdFx0Zm9yKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJiBuYW1lICE9PSBcImVcIikge1xyXG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInJlYWR5XCIpXHJcbiBcdFx0XHRcdGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XHJcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XHJcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcclxuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XHJcbiBcdFx0XHRcdHRocm93IGVycjtcclxuIFx0XHRcdH0pO1xyXG4gXHRcclxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcclxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xyXG4gXHRcdFx0XHRpZihob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XHJcbiBcdFx0XHRcdFx0aWYoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xyXG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XHJcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fTtcclxuIFx0XHRyZXR1cm4gZm47XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXHJcbiBcdFx0dmFyIGhvdCA9IHtcclxuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcclxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXHJcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxyXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXHJcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcclxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxyXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxyXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxyXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGlmKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpXHJcbiBcdFx0XHRcdFx0aG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xyXG4gXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcclxuIFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxyXG4gXHRcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXHJcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG4gXHRcdFx0XHRlbHNlXHJcbiBcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcclxuIFx0XHRcdFx0aWYodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIilcclxuIFx0XHRcdFx0XHRob3QuX3NlbGZEZWNsaW5lZCA9IHRydWU7XHJcbiBcdFx0XHRcdGVsc2UgaWYodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcclxuIFx0XHRcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxyXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcclxuIFx0XHRcdFx0ZWxzZVxyXG4gXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0ZGlzcG9zZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xyXG4gXHRcdFx0fSxcclxuIFx0XHRcdHJlbW92ZURpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XHJcbiBcdFx0XHRcdGlmKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcclxuIFx0XHRcdH0sXHJcbiBcdFxyXG4gXHRcdFx0Ly8gTWFuYWdlbWVudCBBUElcclxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcclxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcclxuIFx0XHRcdHN0YXR1czogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHRpZighbCkgcmV0dXJuIGhvdFN0YXR1cztcclxuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcclxuIFx0XHRcdH0sXHJcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XHJcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XHJcbiBcdFx0XHR9LFxyXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xyXG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90U3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0fSxcclxuIFx0XHJcbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcclxuIFx0XHRcdGRhdGE6IGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXVxyXG4gXHRcdH07XHJcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xyXG4gXHRcdHJldHVybiBob3Q7XHJcbiBcdH1cclxuIFx0XHJcbiBcdHZhciBob3RTdGF0dXNIYW5kbGVycyA9IFtdO1xyXG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RTZXRTdGF0dXMobmV3U3RhdHVzKSB7XHJcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBob3RTdGF0dXNIYW5kbGVycy5sZW5ndGg7IGkrKylcclxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcclxuIFx0fVxyXG4gXHRcclxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XHJcbiBcdHZhciBob3RDaHVua3NMb2FkaW5nID0gMDtcclxuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xyXG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcclxuIFx0dmFyIGhvdEF2YWlsYWJsZUZpbGVzTWFwID0ge307XHJcbiBcdHZhciBob3REZWZlcnJlZDtcclxuIFx0XHJcbiBcdC8vIFRoZSB1cGRhdGUgaW5mb1xyXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xyXG4gXHRcclxuIFx0ZnVuY3Rpb24gdG9Nb2R1bGVJZChpZCkge1xyXG4gXHRcdHZhciBpc051bWJlciA9ICgraWQpICsgXCJcIiA9PT0gaWQ7XHJcbiBcdFx0cmV0dXJuIGlzTnVtYmVyID8gK2lkIDogaWQ7XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdENoZWNrKGFwcGx5KSB7XHJcbiBcdFx0aWYoaG90U3RhdHVzICE9PSBcImlkbGVcIikgdGhyb3cgbmV3IEVycm9yKFwiY2hlY2soKSBpcyBvbmx5IGFsbG93ZWQgaW4gaWRsZSBzdGF0dXNcIik7XHJcbiBcdFx0aG90QXBwbHlPblVwZGF0ZSA9IGFwcGx5O1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xyXG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoIXVwZGF0ZSkge1xyXG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xyXG4gXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXAgPSB7fTtcclxuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XHJcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XHJcbiBcdFxyXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcclxuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiBcdFx0XHRcdGhvdERlZmVycmVkID0ge1xyXG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXHJcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcclxuIFx0XHRcdFx0fTtcclxuIFx0XHRcdH0pO1xyXG4gXHRcdFx0aG90VXBkYXRlID0ge307XHJcbiBcdFx0XHRmb3IodmFyIGNodW5rSWQgaW4gaW5zdGFsbGVkQ2h1bmtzKVxyXG4gXHRcdFx0eyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmUtYmxvY2tzXHJcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXHJcbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdFx0aWYoaG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0XHR9XHJcbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG4gXHRcclxuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gXHRcdGlmKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXHJcbiBcdFx0XHRyZXR1cm47XHJcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcclxuIFx0XHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHRpZigtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XHJcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XHJcbiBcdFx0aWYoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XHJcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcclxuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XHJcbiBcdFx0fVxyXG4gXHR9XHJcbiBcdFxyXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xyXG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xyXG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xyXG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcclxuIFx0XHRpZighZGVmZXJyZWQpIHJldHVybjtcclxuIFx0XHRpZihob3RBcHBseU9uVXBkYXRlKSB7XHJcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xyXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXHJcbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XHJcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gXHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XHJcbiBcdFx0XHR9KS50aGVuKFxyXG4gXHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcclxuIFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XHJcbiBcdFx0XHRcdH0sXHJcbiBcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xyXG4gXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHQpO1xyXG4gXHRcdH0gZWxzZSB7XHJcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcclxuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9XHJcbiBcdH1cclxuIFx0XHJcbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcclxuIFx0XHRpZihob3RTdGF0dXMgIT09IFwicmVhZHlcIikgdGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xyXG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgY2I7XHJcbiBcdFx0dmFyIGk7XHJcbiBcdFx0dmFyIGo7XHJcbiBcdFx0dmFyIG1vZHVsZTtcclxuIFx0XHR2YXIgbW9kdWxlSWQ7XHJcbiBcdFxyXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcclxuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xyXG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XHJcbiBcdFxyXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XHJcbiBcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXHJcbiBcdFx0XHRcdFx0aWQ6IGlkXHJcbiBcdFx0XHRcdH07XHJcbiBcdFx0XHR9KTtcclxuIFx0XHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xyXG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XHJcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcclxuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdGlmKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKG1vZHVsZS5ob3QuX21haW4pIHtcclxuIFx0XHRcdFx0XHRyZXR1cm4ge1xyXG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXHJcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xyXG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcclxuIFx0XHRcdFx0XHRpZighcGFyZW50KSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcclxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHRcdH07XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSA+PSAwKSBjb250aW51ZTtcclxuIFx0XHRcdFx0XHRpZihwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXHJcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xyXG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xyXG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcclxuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcclxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXHJcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcclxuIFx0XHRcdFx0XHR9KTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcclxuIFx0XHRcdHJldHVybiB7XHJcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcclxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxyXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcclxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXHJcbiBcdFx0XHR9O1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xyXG4gXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcclxuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xyXG4gXHRcdFx0XHRpZihhLmluZGV4T2YoaXRlbSkgPCAwKVxyXG4gXHRcdFx0XHRcdGEucHVzaChpdGVtKTtcclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXHJcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxyXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xyXG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcclxuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xyXG4gXHRcclxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xyXG4gXHRcdFx0Y29uc29sZS53YXJuKFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiKTtcclxuIFx0XHR9O1xyXG4gXHRcclxuIFx0XHRmb3IodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xyXG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XHJcbiBcdFx0XHRcdHZhciByZXN1bHQ7XHJcbiBcdFx0XHRcdGlmKGhvdFVwZGF0ZVtpZF0pIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0fSBlbHNlIHtcclxuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XHJcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXHJcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcclxuIFx0XHRcdFx0XHR9O1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XHJcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcclxuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XHJcbiBcdFx0XHRcdGlmKHJlc3VsdC5jaGFpbikge1xyXG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRzd2l0Y2gocmVzdWx0LnR5cGUpIHtcclxuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBjaGFpbkluZm8pO1xyXG4gXHRcdFx0XHRcdFx0YnJlYWs7XHJcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XHJcbiBcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXHJcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIiBpbiBcIiArIHJlc3VsdC5wYXJlbnRJZCArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vblVuYWNjZXB0ZWQpXHJcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRpZighb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxyXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mbyk7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcclxuIFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMub25BY2NlcHRlZClcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XHJcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcclxuIFx0XHRcdFx0XHRcdGJyZWFrO1xyXG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkRpc3Bvc2VkKVxyXG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcclxuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XHJcbiBcdFx0XHRcdFx0XHRicmVhaztcclxuIFx0XHRcdFx0XHRkZWZhdWx0OlxyXG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRpZihhYm9ydEVycm9yKSB7XHJcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XHJcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHRcdGlmKGRvQXBwbHkpIHtcclxuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHRcdFx0XHRmb3IobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcclxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcclxuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLCByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKTtcclxuIFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdFx0aWYoZG9EaXNwb3NlKSB7XHJcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XHJcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XHJcbiBcdFx0XHRcdH1cclxuIFx0XHRcdH1cclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cclxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XHJcbiBcdFx0Zm9yKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcclxuIFx0XHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkKVxyXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XHJcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXHJcbiBcdFx0XHRcdH0pO1xyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXHJcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcclxuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XHJcbiBcdFx0XHRpZihob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcclxuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xyXG4gXHRcdFx0fVxyXG4gXHRcdH0pO1xyXG4gXHRcclxuIFx0XHR2YXIgaWR4O1xyXG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xyXG4gXHRcdHdoaWxlKHF1ZXVlLmxlbmd0aCA+IDApIHtcclxuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XHJcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdGlmKCFtb2R1bGUpIGNvbnRpbnVlO1xyXG4gXHRcclxuIFx0XHRcdHZhciBkYXRhID0ge307XHJcbiBcdFxyXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXHJcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xyXG4gXHRcdFx0XHRjYihkYXRhKTtcclxuIFx0XHRcdH1cclxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcclxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XHJcbiBcdFxyXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXHJcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XHJcbiBcdFxyXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHJcbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxyXG4gXHRcdFx0Zm9yKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcclxuIFx0XHRcdFx0aWYoIWNoaWxkKSBjb250aW51ZTtcclxuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcclxuIFx0XHRcdFx0aWYoaWR4ID49IDApIHtcclxuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxyXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xyXG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcclxuIFx0XHRmb3IobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcclxuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xyXG4gXHRcdFx0XHRpZihtb2R1bGUpIHtcclxuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0XHRmb3IoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xyXG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xyXG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XHJcbiBcdFx0XHRcdFx0XHRpZihpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xyXG4gXHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0fVxyXG4gXHRcdFx0fVxyXG4gXHRcdH1cclxuIFx0XHJcbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xyXG4gXHRcclxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XHJcbiBcdFxyXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxyXG4gXHRcdGZvcihtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XHJcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xyXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XHJcbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XHJcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKSkge1xyXG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcclxuIFx0XHRcdFx0aWYobW9kdWxlKSB7XHJcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XHJcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XHJcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XHJcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xyXG4gXHRcdFx0XHRcdFx0aWYoY2IpIHtcclxuIFx0XHRcdFx0XHRcdFx0aWYoY2FsbGJhY2tzLmluZGV4T2YoY2IpID49IDApIGNvbnRpbnVlO1xyXG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGZvcihpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XHJcbiBcdFx0XHRcdFx0XHR0cnkge1xyXG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XHJcbiBcdFx0XHRcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLm9uRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcclxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXHJcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0XHRcdH1cclxuIFx0XHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yID0gZXJyO1xyXG4gXHRcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xyXG4gXHRcdGZvcihpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XHJcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xyXG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xyXG4gXHRcdFx0dHJ5IHtcclxuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XHJcbiBcdFx0XHR9IGNhdGNoKGVycikge1xyXG4gXHRcdFx0XHRpZih0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gXHRcdFx0XHRcdHRyeSB7XHJcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xyXG4gXHRcdFx0XHRcdH0gY2F0Y2goZXJyMikge1xyXG4gXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xyXG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxyXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxyXG4gXHRcdFx0XHRcdFx0XHRcdG9yZ2luYWxFcnJvcjogZXJyXHJcbiBcdFx0XHRcdFx0XHRcdH0pO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xyXG4gXHRcdFx0XHRcdFx0XHRpZighZXJyb3IpXHJcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnIyO1xyXG4gXHRcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdFx0aWYoIWVycm9yKVxyXG4gXHRcdFx0XHRcdFx0XHRlcnJvciA9IGVycjtcclxuIFx0XHRcdFx0XHR9XHJcbiBcdFx0XHRcdH0gZWxzZSB7XHJcbiBcdFx0XHRcdFx0aWYob3B0aW9ucy5vbkVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcclxuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXHJcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxyXG4gXHRcdFx0XHRcdFx0fSk7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHRcdGlmKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcclxuIFx0XHRcdFx0XHRcdGlmKCFlcnJvcilcclxuIFx0XHRcdFx0XHRcdFx0ZXJyb3IgPSBlcnI7XHJcbiBcdFx0XHRcdFx0fVxyXG4gXHRcdFx0XHR9XHJcbiBcdFx0XHR9XHJcbiBcdFx0fVxyXG4gXHRcclxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxyXG4gXHRcdGlmKGVycm9yKSB7XHJcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xyXG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuIFx0XHR9XHJcbiBcdFxyXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XHJcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcclxuIFx0XHR9KTtcclxuIFx0fVxyXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdHMgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MTogMFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhID09PSAwKSB7XG4gXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHsgcmVzb2x2ZSgpOyB9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRDaHVua0RhdGFbMl07XG4gXHRcdH1cblxuIFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdH0pO1xuIFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlO1xuXG4gXHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiBcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjAwMDA7XG5cbiBcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdH1cbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbiBcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUsIDEyMDAwMCk7XG4gXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdGZ1bmN0aW9uIG9uU2NyaXB0Q29tcGxldGUoKSB7XG4gXHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0Y2h1bmtbMV0obmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuJykpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gXHRcdHJldHVybiBwcm9taXNlO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvcHVibGljL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSg4KShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhNjI5MTc5YzUzYTg3NmYwN2UwZiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuZXhwb3J0cy5pbmRleE9mID0gaW5kZXhPZjtcbmV4cG9ydHMuZXNjYXBlRXhwcmVzc2lvbiA9IGVzY2FwZUV4cHJlc3Npb247XG5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xuZXhwb3J0cy5jcmVhdGVGcmFtZSA9IGNyZWF0ZUZyYW1lO1xuZXhwb3J0cy5ibG9ja1BhcmFtcyA9IGJsb2NrUGFyYW1zO1xuZXhwb3J0cy5hcHBlbmRDb250ZXh0UGF0aCA9IGFwcGVuZENvbnRleHRQYXRoO1xudmFyIGVzY2FwZSA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnLFxuICBcIidcIjogJyYjeDI3OycsXG4gICdgJzogJyYjeDYwOycsXG4gICc9JzogJyYjeDNEOydcbn07XG5cbnZhciBiYWRDaGFycyA9IC9bJjw+XCInYD1dL2csXG4gICAgcG9zc2libGUgPSAvWyY8PlwiJ2A9XS87XG5cbmZ1bmN0aW9uIGVzY2FwZUNoYXIoY2hyKSB7XG4gIHJldHVybiBlc2NhcGVbY2hyXTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKG9iaiAvKiAsIC4uLnNvdXJjZSAqLykge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2ldLCBrZXkpKSB7XG4gICAgICAgIG9ialtrZXldID0gYXJndW1lbnRzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZXhwb3J0cy50b1N0cmluZyA9IHRvU3RyaW5nO1xuLy8gU291cmNlZCBmcm9tIGxvZGFzaFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jlc3RpZWpzL2xvZGFzaC9ibG9iL21hc3Rlci9MSUNFTlNFLnR4dFxuLyogZXNsaW50LWRpc2FibGUgZnVuYy1zdHlsZSAqL1xudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuLy8gZmFsbGJhY2sgZm9yIG9sZGVyIHZlcnNpb25zIG9mIENocm9tZSBhbmQgU2FmYXJpXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICBleHBvcnRzLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbi8qIGVzbGludC1lbmFibGUgZnVuYy1zdHlsZSAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IHRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nIDogZmFsc2U7XG59O1xuXG5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuLy8gT2xkZXIgSUUgdmVyc2lvbnMgZG8gbm90IGRpcmVjdGx5IHN1cHBvcnQgaW5kZXhPZiBzbyB3ZSBtdXN0IGltcGxlbWVudCBvdXIgb3duLCBzYWRseS5cblxuZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5W2ldID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlRXhwcmVzc2lvbihzdHJpbmcpIHtcbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gZG9uJ3QgZXNjYXBlIFNhZmVTdHJpbmdzLCBzaW5jZSB0aGV5J3JlIGFscmVhZHkgc2FmZVxuICAgIGlmIChzdHJpbmcgJiYgc3RyaW5nLnRvSFRNTCkge1xuICAgICAgcmV0dXJuIHN0cmluZy50b0hUTUwoKTtcbiAgICB9IGVsc2UgaWYgKHN0cmluZyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSBlbHNlIGlmICghc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RyaW5nICsgJyc7XG4gICAgfVxuXG4gICAgLy8gRm9yY2UgYSBzdHJpbmcgY29udmVyc2lvbiBhcyB0aGlzIHdpbGwgYmUgZG9uZSBieSB0aGUgYXBwZW5kIHJlZ2FyZGxlc3MgYW5kXG4gICAgLy8gdGhlIHJlZ2V4IHRlc3Qgd2lsbCBkbyB0aGlzIHRyYW5zcGFyZW50bHkgYmVoaW5kIHRoZSBzY2VuZXMsIGNhdXNpbmcgaXNzdWVzIGlmXG4gICAgLy8gYW4gb2JqZWN0J3MgdG8gc3RyaW5nIGhhcyBlc2NhcGVkIGNoYXJhY3RlcnMgaW4gaXQuXG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmc7XG4gIH1cblxuICBpZiAoIXBvc3NpYmxlLnRlc3Qoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmc7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKGJhZENoYXJzLCBlc2NhcGVDaGFyKTtcbn1cblxuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlICYmIHZhbHVlICE9PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYW1lKG9iamVjdCkge1xuICB2YXIgZnJhbWUgPSBleHRlbmQoe30sIG9iamVjdCk7XG4gIGZyYW1lLl9wYXJlbnQgPSBvYmplY3Q7XG4gIHJldHVybiBmcmFtZTtcbn1cblxuZnVuY3Rpb24gYmxvY2tQYXJhbXMocGFyYW1zLCBpZHMpIHtcbiAgcGFyYW1zLnBhdGggPSBpZHM7XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZENvbnRleHRQYXRoKGNvbnRleHRQYXRoLCBpZCkge1xuICByZXR1cm4gKGNvbnRleHRQYXRoID8gY29udGV4dFBhdGggKyAnLicgOiAnJykgKyBpZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDNWMGFXeHpMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3UVVGQlFTeEpRVUZOTEUxQlFVMHNSMEZCUnp0QlFVTmlMRXRCUVVjc1JVRkJSU3hQUVVGUE8wRkJRMW9zUzBGQlJ5eEZRVUZGTEUxQlFVMDdRVUZEV0N4TFFVRkhMRVZCUVVVc1RVRkJUVHRCUVVOWUxFdEJRVWNzUlVGQlJTeFJRVUZSTzBGQlEySXNTMEZCUnl4RlFVRkZMRkZCUVZFN1FVRkRZaXhMUVVGSExFVkJRVVVzVVVGQlVUdEJRVU5pTEV0QlFVY3NSVUZCUlN4UlFVRlJPME5CUTJRc1EwRkJRenM3UVVGRlJpeEpRVUZOTEZGQlFWRXNSMEZCUnl4WlFVRlpPMGxCUTNaQ0xGRkJRVkVzUjBGQlJ5eFhRVUZYTEVOQlFVTTdPMEZCUlRkQ0xGTkJRVk1zVlVGQlZTeERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTjJRaXhUUVVGUExFMUJRVTBzUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0RFFVTndRanM3UVVGRlRTeFRRVUZUTEUxQlFVMHNRMEZCUXl4SFFVRkhMRzlDUVVGdFFqdEJRVU16UXl4UFFVRkxMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVkQlFVY3NVMEZCVXl4RFFVRkRMRTFCUVUwc1JVRkJSU3hEUVVGRExFVkJRVVVzUlVGQlJUdEJRVU42UXl4VFFVRkxMRWxCUVVrc1IwRkJSeXhKUVVGSkxGTkJRVk1zUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlR0QlFVTTFRaXhWUVVGSkxFMUJRVTBzUTBGQlF5eFRRVUZUTEVOQlFVTXNZMEZCWXl4RFFVRkRMRWxCUVVrc1EwRkJReXhUUVVGVExFTkJRVU1zUTBGQlF5eERRVUZETEVWQlFVVXNSMEZCUnl4RFFVRkRMRVZCUVVVN1FVRkRNMFFzVjBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4SFFVRkhMRk5CUVZNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXp0UFFVTTVRanRMUVVOR08wZEJRMFk3TzBGQlJVUXNVMEZCVHl4SFFVRkhMRU5CUVVNN1EwRkRXanM3UVVGRlRTeEpRVUZKTEZGQlFWRXNSMEZCUnl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExGRkJRVkVzUTBGQlF6czdPenM3TzBGQlMyaEVMRWxCUVVrc1ZVRkJWU3hIUVVGSExHOUNRVUZUTEV0QlFVc3NSVUZCUlR0QlFVTXZRaXhUUVVGUExFOUJRVThzUzBGQlN5eExRVUZMTEZWQlFWVXNRMEZCUXp0RFFVTndReXhEUVVGRE96czdRVUZIUml4SlFVRkpMRlZCUVZVc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJUdEJRVU51UWl4VlFVbE5MRlZCUVZVc1IwRkthRUlzVlVGQlZTeEhRVUZITEZWQlFWTXNTMEZCU3l4RlFVRkZPMEZCUXpOQ0xGZEJRVThzVDBGQlR5eExRVUZMTEV0QlFVc3NWVUZCVlN4SlFVRkpMRkZCUVZFc1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eERRVUZETEV0QlFVc3NiVUpCUVcxQ0xFTkJRVU03UjBGRGNFWXNRMEZCUXp0RFFVTklPMUZCUTA4c1ZVRkJWU3hIUVVGV0xGVkJRVlU3T3pzN08wRkJTVmdzU1VGQlRTeFBRVUZQTEVkQlFVY3NTMEZCU3l4RFFVRkRMRTlCUVU4c1NVRkJTU3hWUVVGVExFdEJRVXNzUlVGQlJUdEJRVU4wUkN4VFFVRlBMRUZCUVVNc1MwRkJTeXhKUVVGSkxFOUJRVThzUzBGQlN5eExRVUZMTEZGQlFWRXNSMEZCU1N4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eExRVUZMTEdkQ1FVRm5RaXhIUVVGSExFdEJRVXNzUTBGQlF6dERRVU5xUnl4RFFVRkRPenM3T3p0QlFVZExMRk5CUVZNc1QwRkJUeXhEUVVGRExFdEJRVXNzUlVGQlJTeExRVUZMTEVWQlFVVTdRVUZEY0VNc1QwRkJTeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNSMEZCUnl4SFFVRkhMRXRCUVVzc1EwRkJReXhOUVVGTkxFVkJRVVVzUTBGQlF5eEhRVUZITEVkQlFVY3NSVUZCUlN4RFFVRkRMRVZCUVVVc1JVRkJSVHRCUVVOb1JDeFJRVUZKTEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhMUVVGTExFVkJRVVU3UVVGRGRFSXNZVUZCVHl4RFFVRkRMRU5CUVVNN1MwRkRWanRIUVVOR08wRkJRMFFzVTBGQlR5eERRVUZETEVOQlFVTXNRMEZCUXp0RFFVTllPenRCUVVkTkxGTkJRVk1zWjBKQlFXZENMRU5CUVVNc1RVRkJUU3hGUVVGRk8wRkJRM1pETEUxQlFVa3NUMEZCVHl4TlFVRk5MRXRCUVVzc1VVRkJVU3hGUVVGRk96dEJRVVU1UWl4UlFVRkpMRTFCUVUwc1NVRkJTU3hOUVVGTkxFTkJRVU1zVFVGQlRTeEZRVUZGTzBGQlF6TkNMR0ZCUVU4c1RVRkJUU3hEUVVGRExFMUJRVTBzUlVGQlJTeERRVUZETzB0QlEzaENMRTFCUVUwc1NVRkJTU3hOUVVGTkxFbEJRVWtzU1VGQlNTeEZRVUZGTzBGQlEzcENMR0ZCUVU4c1JVRkJSU3hEUVVGRE8wdEJRMWdzVFVGQlRTeEpRVUZKTEVOQlFVTXNUVUZCVFN4RlFVRkZPMEZCUTJ4Q0xHRkJRVThzVFVGQlRTeEhRVUZITEVWQlFVVXNRMEZCUXp0TFFVTndRanM3T3pzN1FVRkxSQ3hWUVVGTkxFZEJRVWNzUlVGQlJTeEhRVUZITEUxQlFVMHNRMEZCUXp0SFFVTjBRanM3UVVGRlJDeE5RVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGTkxFTkJRVU1zUlVGQlJUdEJRVUZGTEZkQlFVOHNUVUZCVFN4RFFVRkRPMGRCUVVVN1FVRkRPVU1zVTBGQlR5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRkZCUVZFc1JVRkJSU3hWUVVGVkxFTkJRVU1zUTBGQlF6dERRVU0zUXpzN1FVRkZUU3hUUVVGVExFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVVTdRVUZETjBJc1RVRkJTU3hEUVVGRExFdEJRVXNzU1VGQlNTeExRVUZMTEV0QlFVc3NRMEZCUXl4RlFVRkZPMEZCUTNwQ0xGZEJRVThzU1VGQlNTeERRVUZETzBkQlEySXNUVUZCVFN4SlFVRkpMRTlCUVU4c1EwRkJReXhMUVVGTExFTkJRVU1zU1VGQlNTeExRVUZMTEVOQlFVTXNUVUZCVFN4TFFVRkxMRU5CUVVNc1JVRkJSVHRCUVVNdlF5eFhRVUZQTEVsQlFVa3NRMEZCUXp0SFFVTmlMRTFCUVUwN1FVRkRUQ3hYUVVGUExFdEJRVXNzUTBGQlF6dEhRVU5rTzBOQlEwWTdPMEZCUlUwc1UwRkJVeXhYUVVGWExFTkJRVU1zVFVGQlRTeEZRVUZGTzBGQlEyeERMRTFCUVVrc1MwRkJTeXhIUVVGSExFMUJRVTBzUTBGQlF5eEZRVUZGTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1FVRkRMMElzVDBGQlN5eERRVUZETEU5QlFVOHNSMEZCUnl4TlFVRk5MRU5CUVVNN1FVRkRka0lzVTBGQlR5eExRVUZMTEVOQlFVTTdRMEZEWkRzN1FVRkZUU3hUUVVGVExGZEJRVmNzUTBGQlF5eE5RVUZOTEVWQlFVVXNSMEZCUnl4RlFVRkZPMEZCUTNaRExGRkJRVTBzUTBGQlF5eEpRVUZKTEVkQlFVY3NSMEZCUnl4RFFVRkRPMEZCUTJ4Q0xGTkJRVThzVFVGQlRTeERRVUZETzBOQlEyWTdPMEZCUlUwc1UwRkJVeXhwUWtGQmFVSXNRMEZCUXl4WFFVRlhMRVZCUVVVc1JVRkJSU3hGUVVGRk8wRkJRMnBFTEZOQlFVOHNRMEZCUXl4WFFVRlhMRWRCUVVjc1YwRkJWeXhIUVVGSExFZEJRVWNzUjBGQlJ5eEZRVUZGTEVOQlFVRXNSMEZCU1N4RlFVRkZMRU5CUVVNN1EwRkRjRVFpTENKbWFXeGxJam9pZFhScGJITXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKamIyNXpkQ0JsYzJOaGNHVWdQU0I3WEc0Z0lDY21Kem9nSnlaaGJYQTdKeXhjYmlBZ0p6d25PaUFuSm14ME95Y3NYRzRnSUNjK0p6b2dKeVpuZERzbkxGeHVJQ0FuWENJbk9pQW5KbkYxYjNRN0p5eGNiaUFnWENJblhDSTZJQ2NtSTNneU56c25MRnh1SUNBbllDYzZJQ2NtSTNnMk1Ec25MRnh1SUNBblBTYzZJQ2NtSTNnelJEc25YRzU5TzF4dVhHNWpiMjV6ZENCaVlXUkRhR0Z5Y3lBOUlDOWJKancrWENJbllEMWRMMmNzWEc0Z0lDQWdJQ0J3YjNOemFXSnNaU0E5SUM5YkpqdytYQ0luWUQxZEx6dGNibHh1Wm5WdVkzUnBiMjRnWlhOallYQmxRMmhoY2loamFISXBJSHRjYmlBZ2NtVjBkWEp1SUdWelkyRndaVnRqYUhKZE8xeHVmVnh1WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWlhoMFpXNWtLRzlpYWk4cUlDd2dMaTR1YzI5MWNtTmxJQ292S1NCN1hHNGdJR1p2Y2lBb2JHVjBJR2tnUFNBeE95QnBJRHdnWVhKbmRXMWxiblJ6TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ1ptOXlJQ2hzWlhRZ2EyVjVJR2x1SUdGeVozVnRaVzUwYzF0cFhTa2dlMXh1SUNBZ0lDQWdhV1lnS0U5aWFtVmpkQzV3Y205MGIzUjVjR1V1YUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoaGNtZDFiV1Z1ZEhOYmFWMHNJR3RsZVNrcElIdGNiaUFnSUNBZ0lDQWdiMkpxVzJ0bGVWMGdQU0JoY21kMWJXVnVkSE5iYVYxYmEyVjVYVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdiMkpxTzF4dWZWeHVYRzVsZUhCdmNuUWdiR1YwSUhSdlUzUnlhVzVuSUQwZ1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnp0Y2JseHVMeThnVTI5MWNtTmxaQ0JtY205dElHeHZaR0Z6YUZ4dUx5OGdhSFIwY0hNNkx5OW5hWFJvZFdJdVkyOXRMMkpsYzNScFpXcHpMMnh2WkdGemFDOWliRzlpTDIxaGMzUmxjaTlNU1VORlRsTkZMblI0ZEZ4dUx5b2daWE5zYVc1MExXUnBjMkZpYkdVZ1puVnVZeTF6ZEhsc1pTQXFMMXh1YkdWMElHbHpSblZ1WTNScGIyNGdQU0JtZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuWm5WdVkzUnBiMjRuTzF4dWZUdGNiaTh2SUdaaGJHeGlZV05ySUdadmNpQnZiR1JsY2lCMlpYSnphVzl1Y3lCdlppQkRhSEp2YldVZ1lXNWtJRk5oWm1GeWFWeHVMeW9nYVhOMFlXNWlkV3dnYVdkdWIzSmxJRzVsZUhRZ0tpOWNibWxtSUNocGMwWjFibU4wYVc5dUtDOTRMeWtwSUh0Y2JpQWdhWE5HZFc1amRHbHZiaUE5SUdaMWJtTjBhVzl1S0haaGJIVmxLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyWjFibU4wYVc5dUp5QW1KaUIwYjFOMGNtbHVaeTVqWVd4c0tIWmhiSFZsS1NBOVBUMGdKMXR2WW1wbFkzUWdSblZ1WTNScGIyNWRKenRjYmlBZ2ZUdGNibjFjYm1WNGNHOXlkQ0I3YVhOR2RXNWpkR2x2Ym4wN1hHNHZLaUJsYzJ4cGJuUXRaVzVoWW14bElHWjFibU10YzNSNWJHVWdLaTljYmx4dUx5b2dhWE4wWVc1aWRXd2dhV2R1YjNKbElHNWxlSFFnS2k5Y2JtVjRjRzl5ZENCamIyNXpkQ0JwYzBGeWNtRjVJRDBnUVhKeVlYa3VhWE5CY25KaGVTQjhmQ0JtZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnS0haaGJIVmxJQ1ltSUhSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI5aWFtVmpkQ2NwSUQ4Z2RHOVRkSEpwYm1jdVkyRnNiQ2gyWVd4MVpTa2dQVDA5SUNkYmIySnFaV04wSUVGeWNtRjVYU2NnT2lCbVlXeHpaVHRjYm4wN1hHNWNiaTh2SUU5c1pHVnlJRWxGSUhabGNuTnBiMjV6SUdSdklHNXZkQ0JrYVhKbFkzUnNlU0J6ZFhCd2IzSjBJR2x1WkdWNFQyWWdjMjhnZDJVZ2JYVnpkQ0JwYlhCc1pXMWxiblFnYjNWeUlHOTNiaXdnYzJGa2JIa3VYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdhVzVrWlhoUFppaGhjbkpoZVN3Z2RtRnNkV1VwSUh0Y2JpQWdabTl5SUNoc1pYUWdhU0E5SURBc0lHeGxiaUE5SUdGeWNtRjVMbXhsYm1kMGFEc2dhU0E4SUd4bGJqc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tHRnljbUY1VzJsZElEMDlQU0IyWVd4MVpTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHazdYRzRnSUNBZ2ZWeHVJQ0I5WEc0Z0lISmxkSFZ5YmlBdE1UdGNibjFjYmx4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1pYTmpZWEJsUlhod2NtVnpjMmx2YmloemRISnBibWNwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJ6ZEhKcGJtY2dJVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnTHk4Z1pHOXVKM1FnWlhOallYQmxJRk5oWm1WVGRISnBibWR6TENCemFXNWpaU0IwYUdWNUozSmxJR0ZzY21WaFpIa2djMkZtWlZ4dUlDQWdJR2xtSUNoemRISnBibWNnSmlZZ2MzUnlhVzVuTG5SdlNGUk5UQ2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJSE4wY21sdVp5NTBiMGhVVFV3b0tUdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tITjBjbWx1WnlBOVBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnSnljN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNnaGMzUnlhVzVuS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnYzNSeWFXNW5JQ3NnSnljN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1JtOXlZMlVnWVNCemRISnBibWNnWTI5dWRtVnljMmx2YmlCaGN5QjBhR2x6SUhkcGJHd2dZbVVnWkc5dVpTQmllU0IwYUdVZ1lYQndaVzVrSUhKbFoyRnlaR3hsYzNNZ1lXNWtYRzRnSUNBZ0x5OGdkR2hsSUhKbFoyVjRJSFJsYzNRZ2QybHNiQ0JrYnlCMGFHbHpJSFJ5WVc1emNHRnlaVzUwYkhrZ1ltVm9hVzVrSUhSb1pTQnpZMlZ1WlhNc0lHTmhkWE5wYm1jZ2FYTnpkV1Z6SUdsbVhHNGdJQ0FnTHk4Z1lXNGdiMkpxWldOMEozTWdkRzhnYzNSeWFXNW5JR2hoY3lCbGMyTmhjR1ZrSUdOb1lYSmhZM1JsY25NZ2FXNGdhWFF1WEc0Z0lDQWdjM1J5YVc1bklEMGdKeWNnS3lCemRISnBibWM3WEc0Z0lIMWNibHh1SUNCcFppQW9JWEJ2YzNOcFlteGxMblJsYzNRb2MzUnlhVzVuS1NrZ2V5QnlaWFIxY200Z2MzUnlhVzVuT3lCOVhHNGdJSEpsZEhWeWJpQnpkSEpwYm1jdWNtVndiR0ZqWlNoaVlXUkRhR0Z5Y3l3Z1pYTmpZWEJsUTJoaGNpazdYRzU5WEc1Y2JtVjRjRzl5ZENCbWRXNWpkR2x2YmlCcGMwVnRjSFI1S0haaGJIVmxLU0I3WEc0Z0lHbG1JQ2doZG1Gc2RXVWdKaVlnZG1Gc2RXVWdJVDA5SURBcElIdGNiaUFnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnZlNCbGJITmxJR2xtSUNocGMwRnljbUY1S0haaGJIVmxLU0FtSmlCMllXeDFaUzVzWlc1bmRHZ2dQVDA5SURBcElIdGNiaUFnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lIMWNibjFjYmx4dVpYaHdiM0owSUdaMWJtTjBhVzl1SUdOeVpXRjBaVVp5WVcxbEtHOWlhbVZqZENrZ2UxeHVJQ0JzWlhRZ1puSmhiV1VnUFNCbGVIUmxibVFvZTMwc0lHOWlhbVZqZENrN1hHNGdJR1p5WVcxbExsOXdZWEpsYm5RZ1BTQnZZbXBsWTNRN1hHNGdJSEpsZEhWeWJpQm1jbUZ0WlR0Y2JuMWNibHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR0pzYjJOclVHRnlZVzF6S0hCaGNtRnRjeXdnYVdSektTQjdYRzRnSUhCaGNtRnRjeTV3WVhSb0lEMGdhV1J6TzF4dUlDQnlaWFIxY200Z2NHRnlZVzF6TzF4dWZWeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdZWEJ3Wlc1a1EyOXVkR1Y0ZEZCaGRHZ29ZMjl1ZEdWNGRGQmhkR2dzSUdsa0tTQjdYRzRnSUhKbGRIVnliaUFvWTI5dWRHVjRkRkJoZEdnZ1B5QmpiMjUwWlhoMFVHRjBhQ0FySUNjdUp5QTZJQ2NuS1NBcklHbGtPMXh1ZlZ4dUlsMTlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgZXJyb3JQcm9wcyA9IFsnZGVzY3JpcHRpb24nLCAnZmlsZU5hbWUnLCAnbGluZU51bWJlcicsICdtZXNzYWdlJywgJ25hbWUnLCAnbnVtYmVyJywgJ3N0YWNrJ107XG5cbmZ1bmN0aW9uIEV4Y2VwdGlvbihtZXNzYWdlLCBub2RlKSB7XG4gIHZhciBsb2MgPSBub2RlICYmIG5vZGUubG9jLFxuICAgICAgbGluZSA9IHVuZGVmaW5lZCxcbiAgICAgIGNvbHVtbiA9IHVuZGVmaW5lZDtcbiAgaWYgKGxvYykge1xuICAgIGxpbmUgPSBsb2Muc3RhcnQubGluZTtcbiAgICBjb2x1bW4gPSBsb2Muc3RhcnQuY29sdW1uO1xuXG4gICAgbWVzc2FnZSArPSAnIC0gJyArIGxpbmUgKyAnOicgKyBjb2x1bW47XG4gIH1cblxuICB2YXIgdG1wID0gRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbWVzc2FnZSk7XG5cbiAgLy8gVW5mb3J0dW5hdGVseSBlcnJvcnMgYXJlIG5vdCBlbnVtZXJhYmxlIGluIENocm9tZSAoYXQgbGVhc3QpLCBzbyBgZm9yIHByb3AgaW4gdG1wYCBkb2Vzbid0IHdvcmsuXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGVycm9yUHJvcHMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXNbZXJyb3JQcm9wc1tpZHhdXSA9IHRtcFtlcnJvclByb3BzW2lkeF1dO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgRXhjZXB0aW9uKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKGxvYykge1xuICAgICAgdGhpcy5saW5lTnVtYmVyID0gbGluZTtcblxuICAgICAgLy8gV29yayBhcm91bmQgaXNzdWUgdW5kZXIgc2FmYXJpIHdoZXJlIHdlIGNhbid0IGRpcmVjdGx5IHNldCB0aGUgY29sdW1uIHZhbHVlXG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbHVtbicsIHtcbiAgICAgICAgICB2YWx1ZTogY29sdW1uLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKG5vcCkge1xuICAgIC8qIElnbm9yZSBpZiB0aGUgYnJvd3NlciBpcyB2ZXJ5IHBhcnRpY3VsYXIgKi9cbiAgfVxufVxuXG5FeGNlcHRpb24ucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEV4Y2VwdGlvbjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMlY0WTJWd2RHbHZiaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN08wRkJRMEVzU1VGQlRTeFZRVUZWTEVkQlFVY3NRMEZCUXl4aFFVRmhMRVZCUVVVc1ZVRkJWU3hGUVVGRkxGbEJRVmtzUlVGQlJTeFRRVUZUTEVWQlFVVXNUVUZCVFN4RlFVRkZMRkZCUVZFc1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6czdRVUZGYmtjc1UwRkJVeXhUUVVGVExFTkJRVU1zVDBGQlR5eEZRVUZGTEVsQlFVa3NSVUZCUlR0QlFVTm9ReXhOUVVGSkxFZEJRVWNzUjBGQlJ5eEpRVUZKTEVsQlFVa3NTVUZCU1N4RFFVRkRMRWRCUVVjN1RVRkRkRUlzU1VGQlNTeFpRVUZCTzAxQlEwb3NUVUZCVFN4WlFVRkJMRU5CUVVNN1FVRkRXQ3hOUVVGSkxFZEJRVWNzUlVGQlJUdEJRVU5RTEZGQlFVa3NSMEZCUnl4SFFVRkhMRU5CUVVNc1MwRkJTeXhEUVVGRExFbEJRVWtzUTBGQlF6dEJRVU4wUWl4VlFVRk5MRWRCUVVjc1IwRkJSeXhEUVVGRExFdEJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTTdPMEZCUlRGQ0xGZEJRVThzU1VGQlNTeExRVUZMTEVkQlFVY3NTVUZCU1N4SFFVRkhMRWRCUVVjc1IwRkJSeXhOUVVGTkxFTkJRVU03UjBGRGVFTTdPMEZCUlVRc1RVRkJTU3hIUVVGSExFZEJRVWNzUzBGQlN5eERRVUZETEZOQlFWTXNRMEZCUXl4WFFVRlhMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXpzN08wRkJSekZFTEU5QlFVc3NTVUZCU1N4SFFVRkhMRWRCUVVjc1EwRkJReXhGUVVGRkxFZEJRVWNzUjBGQlJ5eFZRVUZWTEVOQlFVTXNUVUZCVFN4RlFVRkZMRWRCUVVjc1JVRkJSU3hGUVVGRk8wRkJRMmhFTEZGQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eEhRVUZITEVOQlFVTXNWVUZCVlN4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU03UjBGRE9VTTdPenRCUVVkRUxFMUJRVWtzUzBGQlN5eERRVUZETEdsQ1FVRnBRaXhGUVVGRk8wRkJRek5DTEZOQlFVc3NRMEZCUXl4cFFrRkJhVUlzUTBGQlF5eEpRVUZKTEVWQlFVVXNVMEZCVXl4RFFVRkRMRU5CUVVNN1IwRkRNVU03TzBGQlJVUXNUVUZCU1R0QlFVTkdMRkZCUVVrc1IwRkJSeXhGUVVGRk8wRkJRMUFzVlVGQlNTeERRVUZETEZWQlFWVXNSMEZCUnl4SlFVRkpMRU5CUVVNN096czdRVUZKZGtJc1ZVRkJTU3hOUVVGTkxFTkJRVU1zWTBGQll5eEZRVUZGTzBGQlEzcENMR05CUVUwc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeEZRVUZGTEZGQlFWRXNSVUZCUlR0QlFVTndReXhsUVVGTExFVkJRVVVzVFVGQlRUdEJRVU5pTEc5Q1FVRlZMRVZCUVVVc1NVRkJTVHRUUVVOcVFpeERRVUZETEVOQlFVTTdUMEZEU2l4TlFVRk5PMEZCUTB3c1dVRkJTU3hEUVVGRExFMUJRVTBzUjBGQlJ5eE5RVUZOTEVOQlFVTTdUMEZEZEVJN1MwRkRSanRIUVVOR0xFTkJRVU1zVDBGQlR5eEhRVUZITEVWQlFVVTdPMGRCUldJN1EwRkRSanM3UVVGRlJDeFRRVUZUTEVOQlFVTXNVMEZCVXl4SFFVRkhMRWxCUVVrc1MwRkJTeXhGUVVGRkxFTkJRVU03TzNGQ1FVVnVRaXhUUVVGVElpd2labWxzWlNJNkltVjRZMlZ3ZEdsdmJpNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWx4dVkyOXVjM1FnWlhKeWIzSlFjbTl3Y3lBOUlGc25aR1Z6WTNKcGNIUnBiMjRuTENBblptbHNaVTVoYldVbkxDQW5iR2x1WlU1MWJXSmxjaWNzSUNkdFpYTnpZV2RsSnl3Z0oyNWhiV1VuTENBbmJuVnRZbVZ5Snl3Z0ozTjBZV05ySjEwN1hHNWNibVoxYm1OMGFXOXVJRVY0WTJWd2RHbHZiaWh0WlhOellXZGxMQ0J1YjJSbEtTQjdYRzRnSUd4bGRDQnNiMk1nUFNCdWIyUmxJQ1ltSUc1dlpHVXViRzlqTEZ4dUlDQWdJQ0FnYkdsdVpTeGNiaUFnSUNBZ0lHTnZiSFZ0Ymp0Y2JpQWdhV1lnS0d4dll5a2dlMXh1SUNBZ0lHeHBibVVnUFNCc2IyTXVjM1JoY25RdWJHbHVaVHRjYmlBZ0lDQmpiMngxYlc0Z1BTQnNiMk11YzNSaGNuUXVZMjlzZFcxdU8xeHVYRzRnSUNBZ2JXVnpjMkZuWlNBclBTQW5JQzBnSnlBcklHeHBibVVnS3lBbk9pY2dLeUJqYjJ4MWJXNDdYRzRnSUgxY2JseHVJQ0JzWlhRZ2RHMXdJRDBnUlhKeWIzSXVjSEp2ZEc5MGVYQmxMbU52Ym5OMGNuVmpkRzl5TG1OaGJHd29kR2hwY3l3Z2JXVnpjMkZuWlNrN1hHNWNiaUFnTHk4Z1ZXNW1iM0owZFc1aGRHVnNlU0JsY25KdmNuTWdZWEpsSUc1dmRDQmxiblZ0WlhKaFlteGxJR2x1SUVOb2NtOXRaU0FvWVhRZ2JHVmhjM1FwTENCemJ5QmdabTl5SUhCeWIzQWdhVzRnZEcxd1lDQmtiMlZ6YmlkMElIZHZjbXN1WEc0Z0lHWnZjaUFvYkdWMElHbGtlQ0E5SURBN0lHbGtlQ0E4SUdWeWNtOXlVSEp2Y0hNdWJHVnVaM1JvT3lCcFpIZ3JLeWtnZTF4dUlDQWdJSFJvYVhOYlpYSnliM0pRY205d2MxdHBaSGhkWFNBOUlIUnRjRnRsY25KdmNsQnliM0J6VzJsa2VGMWRPMXh1SUNCOVhHNWNiaUFnTHlvZ2FYTjBZVzVpZFd3Z2FXZHViM0psSUdWc2MyVWdLaTljYmlBZ2FXWWdLRVZ5Y205eUxtTmhjSFIxY21WVGRHRmphMVJ5WVdObEtTQjdYRzRnSUNBZ1JYSnliM0l1WTJGd2RIVnlaVk4wWVdOclZISmhZMlVvZEdocGN5d2dSWGhqWlhCMGFXOXVLVHRjYmlBZ2ZWeHVYRzRnSUhSeWVTQjdYRzRnSUNBZ2FXWWdLR3h2WXlrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVzYVc1bFRuVnRZbVZ5SUQwZ2JHbHVaVHRjYmx4dUlDQWdJQ0FnTHk4Z1YyOXlheUJoY205MWJtUWdhWE56ZFdVZ2RXNWtaWElnYzJGbVlYSnBJSGRvWlhKbElIZGxJR05oYmlkMElHUnBjbVZqZEd4NUlITmxkQ0IwYUdVZ1kyOXNkVzF1SUhaaGJIVmxYRzRnSUNBZ0lDQXZLaUJwYzNSaGJtSjFiQ0JwWjI1dmNtVWdibVY0ZENBcUwxeHVJQ0FnSUNBZ2FXWWdLRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNrZ2UxeHVJQ0FnSUNBZ0lDQlBZbXBsWTNRdVpHVm1hVzVsVUhKdmNHVnlkSGtvZEdocGN5d2dKMk52YkhWdGJpY3NJSHRjYmlBZ0lDQWdJQ0FnSUNCMllXeDFaVG9nWTI5c2RXMXVMRnh1SUNBZ0lDQWdJQ0FnSUdWdWRXMWxjbUZpYkdVNklIUnlkV1ZjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbU52YkhWdGJpQTlJR052YkhWdGJqdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDBnWTJGMFkyZ2dLRzV2Y0NrZ2UxeHVJQ0FnSUM4cUlFbG5ibTl5WlNCcFppQjBhR1VnWW5KdmQzTmxjaUJwY3lCMlpYSjVJSEJoY25ScFkzVnNZWElnS2k5Y2JpQWdmVnh1ZlZ4dVhHNUZlR05sY0hScGIyNHVjSEp2ZEc5MGVYQmxJRDBnYm1WM0lFVnljbTl5S0NrN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElFVjRZMlZ3ZEdsdmJqdGNiaUpkZlE9PVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9leGNlcHRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiEgbm9ybWFsaXplLmNzcyB2Ny4wLjAgfCBNSVQgTGljZW5zZSB8IGdpdGh1Yi5jb20vbmVjb2xhcy9ub3JtYWxpemUuY3NzICovXFxuXFxuLyogRG9jdW1lbnRcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGxpbmUgaGVpZ2h0IGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBQcmV2ZW50IGFkanVzdG1lbnRzIG9mIGZvbnQgc2l6ZSBhZnRlciBvcmllbnRhdGlvbiBjaGFuZ2VzIGluXFxuICogICAgSUUgb24gV2luZG93cyBQaG9uZSBhbmQgaW4gaU9TLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgbGluZS1oZWlnaHQ6IDEuMTU7IC8qIDEgKi9cXG4gIC1tcy10ZXh0LXNpemUtYWRqdXN0OiAxMDAlOyAvKiAyICovXFxuICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IC8qIDIgKi9cXG59XFxuXFxuLyogU2VjdGlvbnNcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgbWFyZ2luIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqL1xcblxcbmJvZHkge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKi9cXG5cXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxubmF2LFxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIENvcnJlY3QgdGhlIGZvbnQgc2l6ZSBhbmQgbWFyZ2luIG9uIGBoMWAgZWxlbWVudHMgd2l0aGluIGBzZWN0aW9uYCBhbmRcXG4gKiBgYXJ0aWNsZWAgY29udGV4dHMgaW4gQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgbWFyZ2luOiAwLjY3ZW0gMDtcXG59XFxuXFxuLyogR3JvdXBpbmcgY29udGVudFxcbiAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUuXFxuICovXFxuXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxubWFpbiB7IC8qIDEgKi9cXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgbWFyZ2luIGluIElFIDguXFxuICovXFxuXFxuZmlndXJlIHtcXG4gIG1hcmdpbjogMWVtIDQwcHg7XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIEZpcmVmb3guXFxuICogMi4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZSBhbmQgSUUuXFxuICovXFxuXFxuaHIge1xcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7IC8qIDEgKi9cXG4gIGhlaWdodDogMDsgLyogMSAqL1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgaW5oZXJpdGFuY2UgYW5kIHNjYWxpbmcgb2YgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvZGQgYGVtYCBmb250IHNpemluZyBpbiBhbGwgYnJvd3NlcnMuXFxuICovXFxuXFxucHJlIHtcXG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2UsIG1vbm9zcGFjZTsgLyogMSAqL1xcbiAgZm9udC1zaXplOiAxZW07IC8qIDIgKi9cXG59XFxuXFxuLyogVGV4dC1sZXZlbCBzZW1hbnRpY3NcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIDEuIFJlbW92ZSB0aGUgZ3JheSBiYWNrZ3JvdW5kIG9uIGFjdGl2ZSBsaW5rcyBpbiBJRSAxMC5cXG4gKiAyLiBSZW1vdmUgZ2FwcyBpbiBsaW5rcyB1bmRlcmxpbmUgaW4gaU9TIDgrIGFuZCBTYWZhcmkgOCsuXFxuICovXFxuXFxuYSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgLyogMSAqL1xcbiAgLXdlYmtpdC10ZXh0LWRlY29yYXRpb24tc2tpcDogb2JqZWN0czsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBSZW1vdmUgdGhlIGJvdHRvbSBib3JkZXIgaW4gQ2hyb21lIDU3LSBhbmQgRmlyZWZveCAzOS0uXFxuICogMi4gQWRkIHRoZSBjb3JyZWN0IHRleHQgZGVjb3JhdGlvbiBpbiBDaHJvbWUsIEVkZ2UsIElFLCBPcGVyYSwgYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5hYmJyW3RpdGxlXSB7XFxuICBib3JkZXItYm90dG9tOiBub25lOyAvKiAxICovXFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgLyogMiAqL1xcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmUgZG90dGVkOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFByZXZlbnQgdGhlIGR1cGxpY2F0ZSBhcHBsaWNhdGlvbiBvZiBgYm9sZGVyYCBieSB0aGUgbmV4dCBydWxlIGluIFNhZmFyaSA2LlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBpbmhlcml0O1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCB3ZWlnaHQgaW4gQ2hyb21lLCBFZGdlLCBhbmQgU2FmYXJpLlxcbiAqL1xcblxcbmIsXFxuc3Ryb25nIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluaGVyaXRhbmNlIGFuZCBzY2FsaW5nIG9mIGZvbnQgc2l6ZSBpbiBhbGwgYnJvd3NlcnMuXFxuICogMi4gQ29ycmVjdCB0aGUgb2RkIGBlbWAgZm9udCBzaXppbmcgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmNvZGUsXFxua2JkLFxcbnNhbXAge1xcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZSwgbW9ub3NwYWNlOyAvKiAxICovXFxuICBmb250LXNpemU6IDFlbTsgLyogMiAqL1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzdHlsZSBpbiBBbmRyb2lkIDQuMy0uXFxuICovXFxuXFxuZGZuIHtcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG59XFxuXFxuLyoqXFxuICogQWRkIHRoZSBjb3JyZWN0IGJhY2tncm91bmQgYW5kIGNvbG9yIGluIElFIDktLlxcbiAqL1xcblxcbm1hcmsge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMDtcXG4gIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZm9udCBzaXplIGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zbWFsbCB7XFxuICBmb250LXNpemU6IDgwJTtcXG59XFxuXFxuLyoqXFxuICogUHJldmVudCBgc3ViYCBhbmQgYHN1cGAgZWxlbWVudHMgZnJvbSBhZmZlY3RpbmcgdGhlIGxpbmUgaGVpZ2h0IGluXFxuICogYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbnN1YixcXG5zdXAge1xcbiAgZm9udC1zaXplOiA3NSU7XFxuICBsaW5lLWhlaWdodDogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuXFxuc3ViIHtcXG4gIGJvdHRvbTogLTAuMjVlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHRvcDogLTAuNWVtO1xcbn1cXG5cXG4vKiBFbWJlZGRlZCBjb250ZW50XFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKi9cXG5cXG5hdWRpbyxcXG52aWRlbyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGlPUyA0LTcuXFxuICovXFxuXFxuYXVkaW86bm90KFtjb250cm9sc10pIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBoZWlnaHQ6IDA7XFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgYm9yZGVyIG9uIGltYWdlcyBpbnNpZGUgbGlua3MgaW4gSUUgMTAtLlxcbiAqL1xcblxcbmltZyB7XFxuICBib3JkZXItc3R5bGU6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIEhpZGUgdGhlIG92ZXJmbG93IGluIElFLlxcbiAqL1xcblxcbnN2Zzpub3QoOnJvb3QpIHtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi8qIEZvcm1zXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiAxLiBDaGFuZ2UgdGhlIGZvbnQgc3R5bGVzIGluIGFsbCBicm93c2VycyAob3BpbmlvbmF0ZWQpLlxcbiAqIDIuIFJlbW92ZSB0aGUgbWFyZ2luIGluIEZpcmVmb3ggYW5kIFNhZmFyaS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQsXFxub3B0Z3JvdXAsXFxuc2VsZWN0LFxcbnRleHRhcmVhIHtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmOyAvKiAxICovXFxuICBmb250LXNpemU6IDEwMCU7IC8qIDEgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxLjE1OyAvKiAxICovXFxuICBtYXJnaW46IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogU2hvdyB0aGUgb3ZlcmZsb3cgaW4gSUUuXFxuICogMS4gU2hvdyB0aGUgb3ZlcmZsb3cgaW4gRWRnZS5cXG4gKi9cXG5cXG5idXR0b24sXFxuaW5wdXQgeyAvKiAxICovXFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuLyoqXFxuICogUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBFZGdlLCBGaXJlZm94LCBhbmQgSUUuXFxuICogMS4gUmVtb3ZlIHRoZSBpbmhlcml0YW5jZSBvZiB0ZXh0IHRyYW5zZm9ybSBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmJ1dHRvbixcXG5zZWxlY3QgeyAvKiAxICovXFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuXFxuLyoqXFxuICogMS4gUHJldmVudCBhIFdlYktpdCBidWcgd2hlcmUgKDIpIGRlc3Ryb3lzIG5hdGl2ZSBgYXVkaW9gIGFuZCBgdmlkZW9gXFxuICogICAgY29udHJvbHMgaW4gQW5kcm9pZCA0LlxcbiAqIDIuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICovXFxuXFxuYnV0dG9uLFxcbmh0bWwgW3R5cGU9XFxcImJ1dHRvblxcXCJdLCAvKiAxICovXFxuW3R5cGU9XFxcInJlc2V0XFxcIl0sXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdIHtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogYnV0dG9uOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgYm9yZGVyIGFuZCBwYWRkaW5nIGluIEZpcmVmb3guXFxuICovXFxuXFxuYnV0dG9uOjotbW96LWZvY3VzLWlubmVyLFxcblt0eXBlPVxcXCJidXR0b25cXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwicmVzZXRcXFwiXTo6LW1vei1mb2N1cy1pbm5lcixcXG5bdHlwZT1cXFwic3VibWl0XFxcIl06Oi1tb3otZm9jdXMtaW5uZXIge1xcbiAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgcGFkZGluZzogMDtcXG59XFxuXFxuLyoqXFxuICogUmVzdG9yZSB0aGUgZm9jdXMgc3R5bGVzIHVuc2V0IGJ5IHRoZSBwcmV2aW91cyBydWxlLlxcbiAqL1xcblxcbmJ1dHRvbjotbW96LWZvY3VzcmluZyxcXG5bdHlwZT1cXFwiYnV0dG9uXFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInJlc2V0XFxcIl06LW1vei1mb2N1c3JpbmcsXFxuW3R5cGU9XFxcInN1Ym1pdFxcXCJdOi1tb3otZm9jdXNyaW5nIHtcXG4gIG91dGxpbmU6IDFweCBkb3R0ZWQgQnV0dG9uVGV4dDtcXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgcGFkZGluZyBpbiBGaXJlZm94LlxcbiAqL1xcblxcbmZpZWxkc2V0IHtcXG4gIHBhZGRpbmc6IDAuMzVlbSAwLjc1ZW0gMC42MjVlbTtcXG59XFxuXFxuLyoqXFxuICogMS4gQ29ycmVjdCB0aGUgdGV4dCB3cmFwcGluZyBpbiBFZGdlIGFuZCBJRS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBjb2xvciBpbmhlcml0YW5jZSBmcm9tIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gSUUuXFxuICogMy4gUmVtb3ZlIHRoZSBwYWRkaW5nIHNvIGRldmVsb3BlcnMgYXJlIG5vdCBjYXVnaHQgb3V0IHdoZW4gdGhleSB6ZXJvIG91dFxcbiAqICAgIGBmaWVsZHNldGAgZWxlbWVudHMgaW4gYWxsIGJyb3dzZXJzLlxcbiAqL1xcblxcbmxlZ2VuZCB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyAvKiAxICovXFxuICBjb2xvcjogaW5oZXJpdDsgLyogMiAqL1xcbiAgZGlzcGxheTogdGFibGU7IC8qIDEgKi9cXG4gIG1heC13aWR0aDogMTAwJTsgLyogMSAqL1xcbiAgcGFkZGluZzogMDsgLyogMyAqL1xcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDsgLyogMSAqL1xcbn1cXG5cXG4vKipcXG4gKiAxLiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKiAyLiBBZGQgdGhlIGNvcnJlY3QgdmVydGljYWwgYWxpZ25tZW50IGluIENocm9tZSwgRmlyZWZveCwgYW5kIE9wZXJhLlxcbiAqL1xcblxcbnByb2dyZXNzIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jazsgLyogMSAqL1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgZGVmYXVsdCB2ZXJ0aWNhbCBzY3JvbGxiYXIgaW4gSUUuXFxuICovXFxuXFxudGV4dGFyZWEge1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxufVxcblxcbi8qKlxcbiAqIDEuIEFkZCB0aGUgY29ycmVjdCBib3ggc2l6aW5nIGluIElFIDEwLS5cXG4gKiAyLiBSZW1vdmUgdGhlIHBhZGRpbmcgaW4gSUUgMTAtLlxcbiAqL1xcblxcblt0eXBlPVxcXCJjaGVja2JveFxcXCJdLFxcblt0eXBlPVxcXCJyYWRpb1xcXCJdIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IC8qIDEgKi9cXG4gIHBhZGRpbmc6IDA7IC8qIDIgKi9cXG59XFxuXFxuLyoqXFxuICogQ29ycmVjdCB0aGUgY3Vyc29yIHN0eWxlIG9mIGluY3JlbWVudCBhbmQgZGVjcmVtZW50IGJ1dHRvbnMgaW4gQ2hyb21lLlxcbiAqL1xcblxcblt0eXBlPVxcXCJudW1iZXJcXFwiXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcXG5bdHlwZT1cXFwibnVtYmVyXFxcIl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xcbiAgaGVpZ2h0OiBhdXRvO1xcbn1cXG5cXG4vKipcXG4gKiAxLiBDb3JyZWN0IHRoZSBvZGQgYXBwZWFyYW5jZSBpbiBDaHJvbWUgYW5kIFNhZmFyaS5cXG4gKiAyLiBDb3JyZWN0IHRoZSBvdXRsaW5lIHN0eWxlIGluIFNhZmFyaS5cXG4gKi9cXG5cXG5bdHlwZT1cXFwic2VhcmNoXFxcIl0ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7IC8qIDEgKi9cXG4gIG91dGxpbmUtb2Zmc2V0OiAtMnB4OyAvKiAyICovXFxufVxcblxcbi8qKlxcbiAqIFJlbW92ZSB0aGUgaW5uZXIgcGFkZGluZyBhbmQgY2FuY2VsIGJ1dHRvbnMgaW4gQ2hyb21lIGFuZCBTYWZhcmkgb24gbWFjT1MuXFxuICovXFxuXFxuW3R5cGU9XFxcInNlYXJjaFxcXCJdOjotd2Via2l0LXNlYXJjaC1jYW5jZWwtYnV0dG9uLFxcblt0eXBlPVxcXCJzZWFyY2hcXFwiXTo6LXdlYmtpdC1zZWFyY2gtZGVjb3JhdGlvbiB7XFxuICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxufVxcblxcbi8qKlxcbiAqIDEuIENvcnJlY3QgdGhlIGluYWJpbGl0eSB0byBzdHlsZSBjbGlja2FibGUgdHlwZXMgaW4gaU9TIGFuZCBTYWZhcmkuXFxuICogMi4gQ2hhbmdlIGZvbnQgcHJvcGVydGllcyB0byBgaW5oZXJpdGAgaW4gU2FmYXJpLlxcbiAqL1xcblxcbjo6LXdlYmtpdC1maWxlLXVwbG9hZC1idXR0b24ge1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBidXR0b247IC8qIDEgKi9cXG4gIGZvbnQ6IGluaGVyaXQ7IC8qIDIgKi9cXG59XFxuXFxuLyogSW50ZXJhY3RpdmVcXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qXFxuICogQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gSUUgOS0uXFxuICogMS4gQWRkIHRoZSBjb3JyZWN0IGRpc3BsYXkgaW4gRWRnZSwgSUUsIGFuZCBGaXJlZm94LlxcbiAqL1xcblxcbmRldGFpbHMsIC8qIDEgKi9cXG5tZW51IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4vKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIGFsbCBicm93c2Vycy5cXG4gKi9cXG5cXG5zdW1tYXJ5IHtcXG4gIGRpc3BsYXk6IGxpc3QtaXRlbTtcXG59XFxuXFxuLyogU2NyaXB0aW5nXFxuICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRSA5LS5cXG4gKi9cXG5cXG5jYW52YXMge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4vKipcXG4gKiBBZGQgdGhlIGNvcnJlY3QgZGlzcGxheSBpbiBJRS5cXG4gKi9cXG5cXG50ZW1wbGF0ZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKiBIaWRkZW5cXG4gICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xcblxcbi8qKlxcbiAqIEFkZCB0aGUgY29ycmVjdCBkaXNwbGF5IGluIElFIDEwLS5cXG4gKi9cXG5cXG5baGlkZGVuXSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi50YWJsZS1sb2FkLWZvcm0ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tb3otYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogdXJsKFxcXCIvcHVibGljL2Fzc2V0cy9pbWcvdGFibGUtbG9hZC1mcm9tLWJhY2tncm91bmQucG5nXFxcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICBmb250LWZhbWlseTogQ2FsaWJyaTsgfVxcbiAgLnRhYmxlLWxvYWQtZm9ybSBmb3JtIHtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYm94LXNoYWRvdzogMXB4IDFweCA1cHggMCAjMDAwMDAwOyB9XFxuICAgIC50YWJsZS1sb2FkLWZvcm0gZm9ybSAubG9hZC1mb3JtX190aXRsZSB7XFxuICAgICAgcGFkZGluZzogMTBweDtcXG4gICAgICBmb250LXNpemU6IDQ4cHg7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDsgfVxcbiAgICAudGFibGUtbG9hZC1mb3JtIGZvcm0gI2xvYWQtdGFibGUge1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICBtYXJnaW46IDIwcHg7XFxuICAgICAgcGFkZGluZzogMTVweCA0NXB4O1xcbiAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMnB4IC0ycHggIzAwMDAwMDtcXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMWU5ZDI0O1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzRiYzY1MTtcXG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gdG9wLCByZ2JhKDAsIDAsIDAsIDAuMTcpIDAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTcpIDEwMCUpO1xcbiAgICAgIGJvcmRlcjogbm9uZTtcXG4gICAgICBvdXRsaW5lOiBub25lO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICBjb2xvcjogI2ZmZjsgfVxcbiAgICAgIC50YWJsZS1sb2FkLWZvcm0gZm9ybSAjbG9hZC10YWJsZTphY3RpdmUge1xcbiAgICAgICAgdG9wOiAxcHg7XFxuICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDVweCAycHggLTJweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNDYpOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi90YWJsZS1sb2FkLWZvcm0vdGFibGUtbG9hZC1mb3JtLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuSGFuZGxlYmFyc0Vudmlyb25tZW50ID0gSGFuZGxlYmFyc0Vudmlyb25tZW50O1xuLy8gaXN0YW5idWwgaWdub3JlIG5leHRcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgX2V4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vZXhjZXB0aW9uJyk7XG5cbnZhciBfZXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4Y2VwdGlvbik7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG52YXIgX2RlY29yYXRvcnMgPSByZXF1aXJlKCcuL2RlY29yYXRvcnMnKTtcblxudmFyIF9sb2dnZXIgPSByZXF1aXJlKCcuL2xvZ2dlcicpO1xuXG52YXIgX2xvZ2dlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9sb2dnZXIpO1xuXG52YXIgVkVSU0lPTiA9ICc0LjAuMTAnO1xuZXhwb3J0cy5WRVJTSU9OID0gVkVSU0lPTjtcbnZhciBDT01QSUxFUl9SRVZJU0lPTiA9IDc7XG5cbmV4cG9ydHMuQ09NUElMRVJfUkVWSVNJT04gPSBDT01QSUxFUl9SRVZJU0lPTjtcbnZhciBSRVZJU0lPTl9DSEFOR0VTID0ge1xuICAxOiAnPD0gMS4wLnJjLjInLCAvLyAxLjAucmMuMiBpcyBhY3R1YWxseSByZXYyIGJ1dCBkb2Vzbid0IHJlcG9ydCBpdFxuICAyOiAnPT0gMS4wLjAtcmMuMycsXG4gIDM6ICc9PSAxLjAuMC1yYy40JyxcbiAgNDogJz09IDEueC54JyxcbiAgNTogJz09IDIuMC4wLWFscGhhLngnLFxuICA2OiAnPj0gMi4wLjAtYmV0YS4xJyxcbiAgNzogJz49IDQuMC4wJ1xufTtcblxuZXhwb3J0cy5SRVZJU0lPTl9DSEFOR0VTID0gUkVWSVNJT05fQ0hBTkdFUztcbnZhciBvYmplY3RUeXBlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbmZ1bmN0aW9uIEhhbmRsZWJhcnNFbnZpcm9ubWVudChoZWxwZXJzLCBwYXJ0aWFscywgZGVjb3JhdG9ycykge1xuICB0aGlzLmhlbHBlcnMgPSBoZWxwZXJzIHx8IHt9O1xuICB0aGlzLnBhcnRpYWxzID0gcGFydGlhbHMgfHwge307XG4gIHRoaXMuZGVjb3JhdG9ycyA9IGRlY29yYXRvcnMgfHwge307XG5cbiAgX2hlbHBlcnMucmVnaXN0ZXJEZWZhdWx0SGVscGVycyh0aGlzKTtcbiAgX2RlY29yYXRvcnMucmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycyh0aGlzKTtcbn1cblxuSGFuZGxlYmFyc0Vudmlyb25tZW50LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEhhbmRsZWJhcnNFbnZpcm9ubWVudCxcblxuICBsb2dnZXI6IF9sb2dnZXIyWydkZWZhdWx0J10sXG4gIGxvZzogX2xvZ2dlcjJbJ2RlZmF1bHQnXS5sb2csXG5cbiAgcmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uIHJlZ2lzdGVySGVscGVyKG5hbWUsIGZuKSB7XG4gICAgaWYgKF91dGlscy50b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHtcbiAgICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgaGVscGVycycpO1xuICAgICAgfVxuICAgICAgX3V0aWxzLmV4dGVuZCh0aGlzLmhlbHBlcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhlbHBlcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJIZWxwZXI6IGZ1bmN0aW9uIHVucmVnaXN0ZXJIZWxwZXIobmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmhlbHBlcnNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbiByZWdpc3RlclBhcnRpYWwobmFtZSwgcGFydGlhbCkge1xuICAgIGlmIChfdXRpbHMudG9TdHJpbmcuY2FsbChuYW1lKSA9PT0gb2JqZWN0VHlwZSkge1xuICAgICAgX3V0aWxzLmV4dGVuZCh0aGlzLnBhcnRpYWxzLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0aWFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnQXR0ZW1wdGluZyB0byByZWdpc3RlciBhIHBhcnRpYWwgY2FsbGVkIFwiJyArIG5hbWUgKyAnXCIgYXMgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhcnRpYWxzW25hbWVdID0gcGFydGlhbDtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJQYXJ0aWFsOiBmdW5jdGlvbiB1bnJlZ2lzdGVyUGFydGlhbChuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMucGFydGlhbHNbbmFtZV07XG4gIH0sXG5cbiAgcmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uIHJlZ2lzdGVyRGVjb3JhdG9yKG5hbWUsIGZuKSB7XG4gICAgaWYgKF91dGlscy50b1N0cmluZy5jYWxsKG5hbWUpID09PSBvYmplY3RUeXBlKSB7XG4gICAgICBpZiAoZm4pIHtcbiAgICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ0FyZyBub3Qgc3VwcG9ydGVkIHdpdGggbXVsdGlwbGUgZGVjb3JhdG9ycycpO1xuICAgICAgfVxuICAgICAgX3V0aWxzLmV4dGVuZCh0aGlzLmRlY29yYXRvcnMsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlY29yYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG4gIH0sXG4gIHVucmVnaXN0ZXJEZWNvcmF0b3I6IGZ1bmN0aW9uIHVucmVnaXN0ZXJEZWNvcmF0b3IobmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLmRlY29yYXRvcnNbbmFtZV07XG4gIH1cbn07XG5cbnZhciBsb2cgPSBfbG9nZ2VyMlsnZGVmYXVsdCddLmxvZztcblxuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmNyZWF0ZUZyYW1lID0gX3V0aWxzLmNyZWF0ZUZyYW1lO1xuZXhwb3J0cy5sb2dnZXIgPSBfbG9nZ2VyMlsnZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMkpoYzJVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN2NVSkJRVFJETEZOQlFWTTdPM2xDUVVNdlFpeGhRVUZoT3pzN08zVkNRVU5GTEZkQlFWYzdPekJDUVVOU0xHTkJRV003TzNOQ1FVTnVReXhWUVVGVk96czdPMEZCUlhSQ0xFbEJRVTBzVDBGQlR5eEhRVUZITEZGQlFWRXNRMEZCUXpzN1FVRkRla0lzU1VGQlRTeHBRa0ZCYVVJc1IwRkJSeXhEUVVGRExFTkJRVU03T3p0QlFVVTFRaXhKUVVGTkxHZENRVUZuUWl4SFFVRkhPMEZCUXpsQ0xFZEJRVU1zUlVGQlJTeGhRVUZoTzBGQlEyaENMRWRCUVVNc1JVRkJSU3hsUVVGbE8wRkJRMnhDTEVkQlFVTXNSVUZCUlN4bFFVRmxPMEZCUTJ4Q0xFZEJRVU1zUlVGQlJTeFZRVUZWTzBGQlEySXNSMEZCUXl4RlFVRkZMR3RDUVVGclFqdEJRVU55UWl4SFFVRkRMRVZCUVVVc2FVSkJRV2xDTzBGQlEzQkNMRWRCUVVNc1JVRkJSU3hWUVVGVk8wTkJRMlFzUTBGQlF6czdPMEZCUlVZc1NVRkJUU3hWUVVGVkxFZEJRVWNzYVVKQlFXbENMRU5CUVVNN08wRkJSVGxDTEZOQlFWTXNjVUpCUVhGQ0xFTkJRVU1zVDBGQlR5eEZRVUZGTEZGQlFWRXNSVUZCUlN4VlFVRlZMRVZCUVVVN1FVRkRia1VzVFVGQlNTeERRVUZETEU5QlFVOHNSMEZCUnl4UFFVRlBMRWxCUVVrc1JVRkJSU3hEUVVGRE8wRkJRemRDTEUxQlFVa3NRMEZCUXl4UlFVRlJMRWRCUVVjc1VVRkJVU3hKUVVGSkxFVkJRVVVzUTBGQlF6dEJRVU12UWl4TlFVRkpMRU5CUVVNc1ZVRkJWU3hIUVVGSExGVkJRVlVzU1VGQlNTeEZRVUZGTEVOQlFVTTdPMEZCUlc1RExHdERRVUYxUWl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVNM1FpeDNRMEZCTUVJc1NVRkJTU3hEUVVGRExFTkJRVU03UTBGRGFrTTdPMEZCUlVRc2NVSkJRWEZDTEVOQlFVTXNVMEZCVXl4SFFVRkhPMEZCUTJoRExHRkJRVmNzUlVGQlJTeHhRa0ZCY1VJN08wRkJSV3hETEZGQlFVMHNjVUpCUVZFN1FVRkRaQ3hMUVVGSExFVkJRVVVzYjBKQlFVOHNSMEZCUnpzN1FVRkZaaXhuUWtGQll5eEZRVUZGTEhkQ1FVRlRMRWxCUVVrc1JVRkJSU3hGUVVGRkxFVkJRVVU3UVVGRGFrTXNVVUZCU1N4blFrRkJVeXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEV0QlFVc3NWVUZCVlN4RlFVRkZPMEZCUTNSRExGVkJRVWtzUlVGQlJTeEZRVUZGTzBGQlFVVXNZMEZCVFN3eVFrRkJZeXg1UTBGQmVVTXNRMEZCUXl4RFFVRkRPMDlCUVVVN1FVRkRNMFVzYjBKQlFVOHNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFTkJRVU1zUTBGQlF6dExRVU0xUWl4TlFVRk5PMEZCUTB3c1ZVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNSMEZCUnl4RlFVRkZMRU5CUVVNN1MwRkRla0k3UjBGRFJqdEJRVU5FTEd0Q1FVRm5RaXhGUVVGRkxEQkNRVUZUTEVsQlFVa3NSVUZCUlR0QlFVTXZRaXhYUVVGUExFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1IwRkRNMEk3TzBGQlJVUXNhVUpCUVdVc1JVRkJSU3g1UWtGQlV5eEpRVUZKTEVWQlFVVXNUMEZCVHl4RlFVRkZPMEZCUTNaRExGRkJRVWtzWjBKQlFWTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhMUVVGTExGVkJRVlVzUlVGQlJUdEJRVU4wUXl4dlFrRkJUeXhKUVVGSkxFTkJRVU1zVVVGQlVTeEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMHRCUXpkQ0xFMUJRVTA3UVVGRFRDeFZRVUZKTEU5QlFVOHNUMEZCVHl4TFFVRkxMRmRCUVZjc1JVRkJSVHRCUVVOc1F5eGpRVUZOTEhsRlFVRXdSQ3hKUVVGSkxHOUNRVUZwUWl4RFFVRkRPMDlCUTNaR08wRkJRMFFzVlVGQlNTeERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhQUVVGUExFTkJRVU03UzBGREwwSTdSMEZEUmp0QlFVTkVMRzFDUVVGcFFpeEZRVUZGTERKQ1FVRlRMRWxCUVVrc1JVRkJSVHRCUVVOb1F5eFhRVUZQTEVsQlFVa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UjBGRE5VSTdPMEZCUlVRc2JVSkJRV2xDTEVWQlFVVXNNa0pCUVZNc1NVRkJTU3hGUVVGRkxFVkJRVVVzUlVGQlJUdEJRVU53UXl4UlFVRkpMR2RDUVVGVExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNTMEZCU3l4VlFVRlZMRVZCUVVVN1FVRkRkRU1zVlVGQlNTeEZRVUZGTEVWQlFVVTdRVUZCUlN4alFVRk5MREpDUVVGakxEUkRRVUUwUXl4RFFVRkRMRU5CUVVNN1QwRkJSVHRCUVVNNVJTeHZRa0ZCVHl4SlFVRkpMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFbEJRVWtzUTBGQlF5eERRVUZETzB0QlF5OUNMRTFCUVUwN1FVRkRUQ3hWUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMRVZCUVVVc1EwRkJRenRMUVVNMVFqdEhRVU5HTzBGQlEwUXNjVUpCUVcxQ0xFVkJRVVVzTmtKQlFWTXNTVUZCU1N4RlFVRkZPMEZCUTJ4RExGZEJRVThzU1VGQlNTeERRVUZETEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRIUVVNNVFqdERRVU5HTEVOQlFVTTdPMEZCUlVzc1NVRkJTU3hIUVVGSExFZEJRVWNzYjBKQlFVOHNSMEZCUnl4RFFVRkRPenM3VVVGRmNFSXNWMEZCVnp0UlFVRkZMRTFCUVUwaUxDSm1hV3hsSWpvaVltRnpaUzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN1kzSmxZWFJsUm5KaGJXVXNJR1Y0ZEdWdVpDd2dkRzlUZEhKcGJtZDlJR1p5YjIwZ0p5NHZkWFJwYkhNbk8xeHVhVzF3YjNKMElFVjRZMlZ3ZEdsdmJpQm1jbTl0SUNjdUwyVjRZMlZ3ZEdsdmJpYzdYRzVwYlhCdmNuUWdlM0psWjJsemRHVnlSR1ZtWVhWc2RFaGxiSEJsY25OOUlHWnliMjBnSnk0dmFHVnNjR1Z5Y3ljN1hHNXBiWEJ2Y25RZ2UzSmxaMmx6ZEdWeVJHVm1ZWFZzZEVSbFkyOXlZWFJ2Y25OOUlHWnliMjBnSnk0dlpHVmpiM0poZEc5eWN5YzdYRzVwYlhCdmNuUWdiRzluWjJWeUlHWnliMjBnSnk0dmJHOW5aMlZ5Snp0Y2JseHVaWGh3YjNKMElHTnZibk4wSUZaRlVsTkpUMDRnUFNBbk5DNHdMakV3Snp0Y2JtVjRjRzl5ZENCamIyNXpkQ0JEVDAxUVNVeEZVbDlTUlZaSlUwbFBUaUE5SURjN1hHNWNibVY0Y0c5eWRDQmpiMjV6ZENCU1JWWkpVMGxQVGw5RFNFRk9SMFZUSUQwZ2UxeHVJQ0F4T2lBblBEMGdNUzR3TG5KakxqSW5MQ0F2THlBeExqQXVjbU11TWlCcGN5QmhZM1IxWVd4c2VTQnlaWFl5SUdKMWRDQmtiMlZ6YmlkMElISmxjRzl5ZENCcGRGeHVJQ0F5T2lBblBUMGdNUzR3TGpBdGNtTXVNeWNzWEc0Z0lETTZJQ2M5UFNBeExqQXVNQzF5WXk0MEp5eGNiaUFnTkRvZ0p6MDlJREV1ZUM1NEp5eGNiaUFnTlRvZ0p6MDlJREl1TUM0d0xXRnNjR2hoTG5nbkxGeHVJQ0EyT2lBblBqMGdNaTR3TGpBdFltVjBZUzR4Snl4Y2JpQWdOem9nSno0OUlEUXVNQzR3SjF4dWZUdGNibHh1WTI5dWMzUWdiMkpxWldOMFZIbHdaU0E5SUNkYmIySnFaV04wSUU5aWFtVmpkRjBuTzF4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z1NHRnVaR3hsWW1GeWMwVnVkbWx5YjI1dFpXNTBLR2hsYkhCbGNuTXNJSEJoY25ScFlXeHpMQ0JrWldOdmNtRjBiM0p6S1NCN1hHNGdJSFJvYVhNdWFHVnNjR1Z5Y3lBOUlHaGxiSEJsY25NZ2ZId2dlMzA3WEc0Z0lIUm9hWE11Y0dGeWRHbGhiSE1nUFNCd1lYSjBhV0ZzY3lCOGZDQjdmVHRjYmlBZ2RHaHBjeTVrWldOdmNtRjBiM0p6SUQwZ1pHVmpiM0poZEc5eWN5QjhmQ0I3ZlR0Y2JseHVJQ0J5WldkcGMzUmxja1JsWm1GMWJIUklaV3h3WlhKektIUm9hWE1wTzF4dUlDQnlaV2RwYzNSbGNrUmxabUYxYkhSRVpXTnZjbUYwYjNKektIUm9hWE1wTzF4dWZWeHVYRzVJWVc1a2JHVmlZWEp6Ulc1MmFYSnZibTFsYm5RdWNISnZkRzkwZVhCbElEMGdlMXh1SUNCamIyNXpkSEoxWTNSdmNqb2dTR0Z1Wkd4bFltRnljMFZ1ZG1seWIyNXRaVzUwTEZ4dVhHNGdJR3h2WjJkbGNqb2diRzluWjJWeUxGeHVJQ0JzYjJjNklHeHZaMmRsY2k1c2IyY3NYRzVjYmlBZ2NtVm5hWE4wWlhKSVpXeHdaWEk2SUdaMWJtTjBhVzl1S0c1aGJXVXNJR1p1S1NCN1hHNGdJQ0FnYVdZZ0tIUnZVM1J5YVc1bkxtTmhiR3dvYm1GdFpTa2dQVDA5SUc5aWFtVmpkRlI1Y0dVcElIdGNiaUFnSUNBZ0lHbG1JQ2htYmlrZ2V5QjBhSEp2ZHlCdVpYY2dSWGhqWlhCMGFXOXVLQ2RCY21jZ2JtOTBJSE4xY0hCdmNuUmxaQ0IzYVhSb0lHMTFiSFJwY0d4bElHaGxiSEJsY25NbktUc2dmVnh1SUNBZ0lDQWdaWGgwWlc1a0tIUm9hWE11YUdWc2NHVnljeXdnYm1GdFpTazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhSb2FYTXVhR1ZzY0dWeWMxdHVZVzFsWFNBOUlHWnVPMXh1SUNBZ0lIMWNiaUFnZlN4Y2JpQWdkVzV5WldkcGMzUmxja2hsYkhCbGNqb2dablZ1WTNScGIyNG9ibUZ0WlNrZ2UxeHVJQ0FnSUdSbGJHVjBaU0IwYUdsekxtaGxiSEJsY25OYmJtRnRaVjA3WEc0Z0lIMHNYRzVjYmlBZ2NtVm5hWE4wWlhKUVlYSjBhV0ZzT2lCbWRXNWpkR2x2YmlodVlXMWxMQ0J3WVhKMGFXRnNLU0I3WEc0Z0lDQWdhV1lnS0hSdlUzUnlhVzVuTG1OaGJHd29ibUZ0WlNrZ1BUMDlJRzlpYW1WamRGUjVjR1VwSUh0Y2JpQWdJQ0FnSUdWNGRHVnVaQ2gwYUdsekxuQmhjblJwWVd4ekxDQnVZVzFsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJ3WVhKMGFXRnNJRDA5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0dCQmRIUmxiWEIwYVc1bklIUnZJSEpsWjJsemRHVnlJR0VnY0dGeWRHbGhiQ0JqWVd4c1pXUWdYQ0lrZTI1aGJXVjlYQ0lnWVhNZ2RXNWtaV1pwYm1Wa1lDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQjBhR2x6TG5CaGNuUnBZV3h6VzI1aGJXVmRJRDBnY0dGeWRHbGhiRHRjYmlBZ0lDQjlYRzRnSUgwc1hHNGdJSFZ1Y21WbmFYTjBaWEpRWVhKMGFXRnNPaUJtZFc1amRHbHZiaWh1WVcxbEtTQjdYRzRnSUNBZ1pHVnNaWFJsSUhSb2FYTXVjR0Z5ZEdsaGJITmJibUZ0WlYwN1hHNGdJSDBzWEc1Y2JpQWdjbVZuYVhOMFpYSkVaV052Y21GMGIzSTZJR1oxYm1OMGFXOXVLRzVoYldVc0lHWnVLU0I3WEc0Z0lDQWdhV1lnS0hSdlUzUnlhVzVuTG1OaGJHd29ibUZ0WlNrZ1BUMDlJRzlpYW1WamRGUjVjR1VwSUh0Y2JpQWdJQ0FnSUdsbUlDaG1iaWtnZXlCMGFISnZkeUJ1WlhjZ1JYaGpaWEIwYVc5dUtDZEJjbWNnYm05MElITjFjSEJ2Y25SbFpDQjNhWFJvSUcxMWJIUnBjR3hsSUdSbFkyOXlZWFJ2Y25NbktUc2dmVnh1SUNBZ0lDQWdaWGgwWlc1a0tIUm9hWE11WkdWamIzSmhkRzl5Y3l3Z2JtRnRaU2s3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIUm9hWE11WkdWamIzSmhkRzl5YzF0dVlXMWxYU0E5SUdadU8xeHVJQ0FnSUgxY2JpQWdmU3hjYmlBZ2RXNXlaV2RwYzNSbGNrUmxZMjl5WVhSdmNqb2dablZ1WTNScGIyNG9ibUZ0WlNrZ2UxeHVJQ0FnSUdSbGJHVjBaU0IwYUdsekxtUmxZMjl5WVhSdmNuTmJibUZ0WlYwN1hHNGdJSDFjYm4wN1hHNWNibVY0Y0c5eWRDQnNaWFFnYkc5bklEMGdiRzluWjJWeUxteHZaenRjYmx4dVpYaHdiM0owSUh0amNtVmhkR1ZHY21GdFpTd2diRzluWjJWeWZUdGNiaUpkZlE9PVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIENyZWF0ZSBhIHNpbXBsZSBwYXRoIGFsaWFzIHRvIGFsbG93IGJyb3dzZXJpZnkgdG8gcmVzb2x2ZVxuLy8gdGhlIHJ1bnRpbWUgb24gYSBzdXBwb3J0ZWQgcGF0aC5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2Nqcy9oYW5kbGViYXJzLnJ1bnRpbWUnKVsnZGVmYXVsdCddO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnbm9ybWFsaXplLmNzcyc7XG5cbmltcG9ydCBUYWJsZUxvYWRGb3JtIGZyb20gJy4vdGFibGUtbG9hZC1mb3JtJztcblxuY29uc3QgdGFibGVMb2FkRm9ybSA9IG5ldyBUYWJsZUxvYWRGb3JtKCk7XG5cbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFibGVMb2FkRm9ybS5lbGVtKTtcblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZC10YWJsZScpLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGFibGVMb2FkRm9ybS5lbGVtKTtcblxuICByZXF1aXJlLmVuc3VyZShbXSwgKHJlcXVpcmUpID0+IHtcbiAgICBjb25zdCBUYWJsZSA9IHJlcXVpcmUoJy4vdGFibGUnKS5kZWZhdWx0O1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgVGFibGUoKTtcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFibGUuZWxlbSk7XG4gIH0pO1xufTtcblxuXG4vL2ltcG9ydCBUYWJsZSBmcm9tICcuL3RhYmxlJztcbi8vY29uc3QgVGFibGUgPSByZXF1aXJlKCcuL3RhYmxlJykuZGVmYXVsdDtcblxuLy9jb25zdCB0YWJsZSA9IG5ldyBUYWJsZSgpO1xuXG4vL2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFibGUuZWxlbSk7XG4vL2RvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRhYmxlLmVsZW0sIGRvY3VtZW50LmJvZHkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9tYWluLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9ub3JtYWxpemUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9ub3JtYWxpemUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm9ybWFsaXplLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL25vcm1hbGl6ZS5jc3Mvbm9ybWFsaXplLmNzc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RhYmxlLWxvYWQtZm9ybS5oYnMnO1xyXG5pbXBvcnQgJy4vdGFibGUtbG9hZC1mb3JtLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVMb2FkRm9ybSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuZWxlbS5jbGFzc05hbWUgPSAndGFibGUtbG9hZC1mb3JtJztcclxuXHJcbiAgICB0aGlzLmVsZW0uaW5uZXJIVE1MID0gdGVtcGxhdGUoKTtcclxuXHJcbiAgICB0aGlzLmVsZW0ucXVlcnlTZWxlY3RvcignLmxvYWQtZm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC90YWJsZS1sb2FkLWZvcm0vaW5kZXguanMiLCJ2YXIgSGFuZGxlYmFycyA9IHJlcXVpcmUoJ0U6L1dlYi9Xb3JrL1RlY2hub3NlcnYvdGFibGUtZWRpdG9yLXZhbmlsbGFqcy9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9ydW50aW1lLmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IChIYW5kbGViYXJzWydkZWZhdWx0J10gfHwgSGFuZGxlYmFycykudGVtcGxhdGUoe1wiY29tcGlsZXJcIjpbNyxcIj49IDQuMC4wXCJdLFwibWFpblwiOmZ1bmN0aW9uKGNvbnRhaW5lcixkZXB0aDAsaGVscGVycyxwYXJ0aWFscyxkYXRhKSB7XG4gICAgcmV0dXJuIFwiPGZvcm0gYWN0aW9uPVxcXCJcXFwiIGNsYXNzPVxcXCJsb2FkLWZvcm1cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJsb2FkLWZvcm1fX3RpdGxlXFxcIj48c3Bhbj5UYWJsZSBFZGl0b3I8L3NwYW4+PC9kaXY+XFxyXFxuICAgIDxidXR0b24gaWQ9XFxcImxvYWQtdGFibGVcXFwiPkxvYWQgVGFibGU8L2J1dHRvbj5cXHJcXG48L2Zvcm0+XCI7XG59LFwidXNlRGF0YVwiOnRydWV9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RhYmxlLWxvYWQtZm9ybS90YWJsZS1sb2FkLWZvcm0uaGJzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmpbJ2RlZmF1bHQnXSA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBfaGFuZGxlYmFyc0Jhc2UgPSByZXF1aXJlKCcuL2hhbmRsZWJhcnMvYmFzZScpO1xuXG52YXIgYmFzZSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9oYW5kbGViYXJzQmFzZSk7XG5cbi8vIEVhY2ggb2YgdGhlc2UgYXVnbWVudCB0aGUgSGFuZGxlYmFycyBvYmplY3QuIE5vIG5lZWQgdG8gc2V0dXAgaGVyZS5cbi8vIChUaGlzIGlzIGRvbmUgdG8gZWFzaWx5IHNoYXJlIGNvZGUgYmV0d2VlbiBjb21tb25qcyBhbmQgYnJvd3NlIGVudnMpXG5cbnZhciBfaGFuZGxlYmFyc1NhZmVTdHJpbmcgPSByZXF1aXJlKCcuL2hhbmRsZWJhcnMvc2FmZS1zdHJpbmcnKTtcblxudmFyIF9oYW5kbGViYXJzU2FmZVN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oYW5kbGViYXJzU2FmZVN0cmluZyk7XG5cbnZhciBfaGFuZGxlYmFyc0V4Y2VwdGlvbiA9IHJlcXVpcmUoJy4vaGFuZGxlYmFycy9leGNlcHRpb24nKTtcblxudmFyIF9oYW5kbGViYXJzRXhjZXB0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hhbmRsZWJhcnNFeGNlcHRpb24pO1xuXG52YXIgX2hhbmRsZWJhcnNVdGlscyA9IHJlcXVpcmUoJy4vaGFuZGxlYmFycy91dGlscycpO1xuXG52YXIgVXRpbHMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfaGFuZGxlYmFyc1V0aWxzKTtcblxudmFyIF9oYW5kbGViYXJzUnVudGltZSA9IHJlcXVpcmUoJy4vaGFuZGxlYmFycy9ydW50aW1lJyk7XG5cbnZhciBydW50aW1lID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2hhbmRsZWJhcnNSdW50aW1lKTtcblxudmFyIF9oYW5kbGViYXJzTm9Db25mbGljdCA9IHJlcXVpcmUoJy4vaGFuZGxlYmFycy9uby1jb25mbGljdCcpO1xuXG52YXIgX2hhbmRsZWJhcnNOb0NvbmZsaWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hhbmRsZWJhcnNOb0NvbmZsaWN0KTtcblxuLy8gRm9yIGNvbXBhdGliaWxpdHkgYW5kIHVzYWdlIG91dHNpZGUgb2YgbW9kdWxlIHN5c3RlbXMsIG1ha2UgdGhlIEhhbmRsZWJhcnMgb2JqZWN0IGEgbmFtZXNwYWNlXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gIHZhciBoYiA9IG5ldyBiYXNlLkhhbmRsZWJhcnNFbnZpcm9ubWVudCgpO1xuXG4gIFV0aWxzLmV4dGVuZChoYiwgYmFzZSk7XG4gIGhiLlNhZmVTdHJpbmcgPSBfaGFuZGxlYmFyc1NhZmVTdHJpbmcyWydkZWZhdWx0J107XG4gIGhiLkV4Y2VwdGlvbiA9IF9oYW5kbGViYXJzRXhjZXB0aW9uMlsnZGVmYXVsdCddO1xuICBoYi5VdGlscyA9IFV0aWxzO1xuICBoYi5lc2NhcGVFeHByZXNzaW9uID0gVXRpbHMuZXNjYXBlRXhwcmVzc2lvbjtcblxuICBoYi5WTSA9IHJ1bnRpbWU7XG4gIGhiLnRlbXBsYXRlID0gZnVuY3Rpb24gKHNwZWMpIHtcbiAgICByZXR1cm4gcnVudGltZS50ZW1wbGF0ZShzcGVjLCBoYik7XG4gIH07XG5cbiAgcmV0dXJuIGhiO1xufVxuXG52YXIgaW5zdCA9IGNyZWF0ZSgpO1xuaW5zdC5jcmVhdGUgPSBjcmVhdGU7XG5cbl9oYW5kbGViYXJzTm9Db25mbGljdDJbJ2RlZmF1bHQnXShpbnN0KTtcblxuaW5zdFsnZGVmYXVsdCddID0gaW5zdDtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gaW5zdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekxuSjFiblJwYldVdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN096czdPRUpCUVhOQ0xHMUNRVUZ0UWpzN1NVRkJOMElzU1VGQlNUczdPenM3YjBOQlNVOHNNRUpCUVRCQ096czdPMjFEUVVNelFpeDNRa0ZCZDBJN096czdLMEpCUTNaQ0xHOUNRVUZ2UWpzN1NVRkJMMElzUzBGQlN6czdhVU5CUTFFc2MwSkJRWE5DT3p0SlFVRnVReXhQUVVGUE96dHZRMEZGU1N3d1FrRkJNRUk3T3pzN08wRkJSMnBFTEZOQlFWTXNUVUZCVFN4SFFVRkhPMEZCUTJoQ0xFMUJRVWtzUlVGQlJTeEhRVUZITEVsQlFVa3NTVUZCU1N4RFFVRkRMSEZDUVVGeFFpeEZRVUZGTEVOQlFVTTdPMEZCUlRGRExFOUJRVXNzUTBGQlF5eE5RVUZOTEVOQlFVTXNSVUZCUlN4RlFVRkZMRWxCUVVrc1EwRkJReXhEUVVGRE8wRkJRM1pDTEVsQlFVVXNRMEZCUXl4VlFVRlZMRzlEUVVGaExFTkJRVU03UVVGRE0wSXNTVUZCUlN4RFFVRkRMRk5CUVZNc2JVTkJRVmtzUTBGQlF6dEJRVU42UWl4SlFVRkZMRU5CUVVNc1MwRkJTeXhIUVVGSExFdEJRVXNzUTBGQlF6dEJRVU5xUWl4SlFVRkZMRU5CUVVNc1owSkJRV2RDTEVkQlFVY3NTMEZCU3l4RFFVRkRMR2RDUVVGblFpeERRVUZET3p0QlFVVTNReXhKUVVGRkxFTkJRVU1zUlVGQlJTeEhRVUZITEU5QlFVOHNRMEZCUXp0QlFVTm9RaXhKUVVGRkxFTkJRVU1zVVVGQlVTeEhRVUZITEZWQlFWTXNTVUZCU1N4RlFVRkZPMEZCUXpOQ0xGZEJRVThzVDBGQlR5eERRVUZETEZGQlFWRXNRMEZCUXl4SlFVRkpMRVZCUVVVc1JVRkJSU3hEUVVGRExFTkJRVU03UjBGRGJrTXNRMEZCUXpzN1FVRkZSaXhUUVVGUExFVkJRVVVzUTBGQlF6dERRVU5ZT3p0QlFVVkVMRWxCUVVrc1NVRkJTU3hIUVVGSExFMUJRVTBzUlVGQlJTeERRVUZETzBGQlEzQkNMRWxCUVVrc1EwRkJReXhOUVVGTkxFZEJRVWNzVFVGQlRTeERRVUZET3p0QlFVVnlRaXhyUTBGQlZ5eEpRVUZKTEVOQlFVTXNRMEZCUXpzN1FVRkZha0lzU1VGQlNTeERRVUZETEZOQlFWTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJRenM3Y1VKQlJWSXNTVUZCU1NJc0ltWnBiR1VpT2lKb1lXNWtiR1ZpWVhKekxuSjFiblJwYldVdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpwYlhCdmNuUWdLaUJoY3lCaVlYTmxJR1p5YjIwZ0p5NHZhR0Z1Wkd4bFltRnljeTlpWVhObEp6dGNibHh1THk4Z1JXRmphQ0J2WmlCMGFHVnpaU0JoZFdkdFpXNTBJSFJvWlNCSVlXNWtiR1ZpWVhKeklHOWlhbVZqZEM0Z1RtOGdibVZsWkNCMGJ5QnpaWFIxY0NCb1pYSmxMbHh1THk4Z0tGUm9hWE1nYVhNZ1pHOXVaU0IwYnlCbFlYTnBiSGtnYzJoaGNtVWdZMjlrWlNCaVpYUjNaV1Z1SUdOdmJXMXZibXB6SUdGdVpDQmljbTkzYzJVZ1pXNTJjeWxjYm1sdGNHOXlkQ0JUWVdabFUzUnlhVzVuSUdaeWIyMGdKeTR2YUdGdVpHeGxZbUZ5Y3k5ellXWmxMWE4wY21sdVp5YzdYRzVwYlhCdmNuUWdSWGhqWlhCMGFXOXVJR1p5YjIwZ0p5NHZhR0Z1Wkd4bFltRnljeTlsZUdObGNIUnBiMjRuTzF4dWFXMXdiM0owSUNvZ1lYTWdWWFJwYkhNZ1puSnZiU0FuTGk5b1lXNWtiR1ZpWVhKekwzVjBhV3h6Snp0Y2JtbHRjRzl5ZENBcUlHRnpJSEoxYm5ScGJXVWdabkp2YlNBbkxpOW9ZVzVrYkdWaVlYSnpMM0oxYm5ScGJXVW5PMXh1WEc1cGJYQnZjblFnYm05RGIyNW1iR2xqZENCbWNtOXRJQ2N1TDJoaGJtUnNaV0poY25NdmJtOHRZMjl1Wm14cFkzUW5PMXh1WEc0dkx5QkdiM0lnWTI5dGNHRjBhV0pwYkdsMGVTQmhibVFnZFhOaFoyVWdiM1YwYzJsa1pTQnZaaUJ0YjJSMWJHVWdjM2x6ZEdWdGN5d2diV0ZyWlNCMGFHVWdTR0Z1Wkd4bFltRnljeUJ2WW1wbFkzUWdZU0J1WVcxbGMzQmhZMlZjYm1aMWJtTjBhVzl1SUdOeVpXRjBaU2dwSUh0Y2JpQWdiR1YwSUdoaUlEMGdibVYzSUdKaGMyVXVTR0Z1Wkd4bFltRnljMFZ1ZG1seWIyNXRaVzUwS0NrN1hHNWNiaUFnVlhScGJITXVaWGgwWlc1a0tHaGlMQ0JpWVhObEtUdGNiaUFnYUdJdVUyRm1aVk4wY21sdVp5QTlJRk5oWm1WVGRISnBibWM3WEc0Z0lHaGlMa1Y0WTJWd2RHbHZiaUE5SUVWNFkyVndkR2x2Ymp0Y2JpQWdhR0l1VlhScGJITWdQU0JWZEdsc2N6dGNiaUFnYUdJdVpYTmpZWEJsUlhod2NtVnpjMmx2YmlBOUlGVjBhV3h6TG1WelkyRndaVVY0Y0hKbGMzTnBiMjQ3WEc1Y2JpQWdhR0l1VmswZ1BTQnlkVzUwYVcxbE8xeHVJQ0JvWWk1MFpXMXdiR0YwWlNBOUlHWjFibU4wYVc5dUtITndaV01wSUh0Y2JpQWdJQ0J5WlhSMWNtNGdjblZ1ZEdsdFpTNTBaVzF3YkdGMFpTaHpjR1ZqTENCb1lpazdYRzRnSUgwN1hHNWNiaUFnY21WMGRYSnVJR2hpTzF4dWZWeHVYRzVzWlhRZ2FXNXpkQ0E5SUdOeVpXRjBaU2dwTzF4dWFXNXpkQzVqY21WaGRHVWdQU0JqY21WaGRHVTdYRzVjYm01dlEyOXVabXhwWTNRb2FXNXpkQ2s3WEc1Y2JtbHVjM1JiSjJSbFptRjFiSFFuWFNBOUlHbHVjM1E3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdsdWMzUTdYRzRpWFgwPVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy5ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnJlZ2lzdGVyRGVmYXVsdEhlbHBlcnMgPSByZWdpc3RlckRlZmF1bHRIZWxwZXJzO1xuLy8gaXN0YW5idWwgaWdub3JlIG5leHRcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2hlbHBlcnNCbG9ja0hlbHBlck1pc3NpbmcgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmxvY2staGVscGVyLW1pc3NpbmcnKTtcblxudmFyIF9oZWxwZXJzQmxvY2tIZWxwZXJNaXNzaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlbHBlcnNCbG9ja0hlbHBlck1pc3NpbmcpO1xuXG52YXIgX2hlbHBlcnNFYWNoID0gcmVxdWlyZSgnLi9oZWxwZXJzL2VhY2gnKTtcblxudmFyIF9oZWxwZXJzRWFjaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzRWFjaCk7XG5cbnZhciBfaGVscGVyc0hlbHBlck1pc3NpbmcgPSByZXF1aXJlKCcuL2hlbHBlcnMvaGVscGVyLW1pc3NpbmcnKTtcblxudmFyIF9oZWxwZXJzSGVscGVyTWlzc2luZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzSGVscGVyTWlzc2luZyk7XG5cbnZhciBfaGVscGVyc0lmID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lmJyk7XG5cbnZhciBfaGVscGVyc0lmMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlbHBlcnNJZik7XG5cbnZhciBfaGVscGVyc0xvZyA9IHJlcXVpcmUoJy4vaGVscGVycy9sb2cnKTtcblxudmFyIF9oZWxwZXJzTG9nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlbHBlcnNMb2cpO1xuXG52YXIgX2hlbHBlcnNMb29rdXAgPSByZXF1aXJlKCcuL2hlbHBlcnMvbG9va3VwJyk7XG5cbnZhciBfaGVscGVyc0xvb2t1cDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oZWxwZXJzTG9va3VwKTtcblxudmFyIF9oZWxwZXJzV2l0aCA9IHJlcXVpcmUoJy4vaGVscGVycy93aXRoJyk7XG5cbnZhciBfaGVscGVyc1dpdGgyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaGVscGVyc1dpdGgpO1xuXG5mdW5jdGlvbiByZWdpc3RlckRlZmF1bHRIZWxwZXJzKGluc3RhbmNlKSB7XG4gIF9oZWxwZXJzQmxvY2tIZWxwZXJNaXNzaW5nMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcbiAgX2hlbHBlcnNFYWNoMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcbiAgX2hlbHBlcnNIZWxwZXJNaXNzaW5nMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcbiAgX2hlbHBlcnNJZjJbJ2RlZmF1bHQnXShpbnN0YW5jZSk7XG4gIF9oZWxwZXJzTG9nMlsnZGVmYXVsdCddKGluc3RhbmNlKTtcbiAgX2hlbHBlcnNMb29rdXAyWydkZWZhdWx0J10oaW5zdGFuY2UpO1xuICBfaGVscGVyc1dpdGgyWydkZWZhdWx0J10oaW5zdGFuY2UpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096czdlVU5CUVhWRExHZERRVUZuUXpzN096c3lRa0ZET1VNc1owSkJRV2RDT3pzN08yOURRVU5RTERCQ1FVRXdRanM3T3p0NVFrRkRja01zWTBGQll6czdPenN3UWtGRFlpeGxRVUZsT3pzN096WkNRVU5hTEd0Q1FVRnJRanM3T3pzeVFrRkRjRUlzWjBKQlFXZENPenM3TzBGQlJXeERMRk5CUVZNc2MwSkJRWE5DTEVOQlFVTXNVVUZCVVN4RlFVRkZPMEZCUXk5RExIbERRVUV5UWl4UlFVRlJMRU5CUVVNc1EwRkJRenRCUVVOeVF5d3lRa0ZCWVN4UlFVRlJMRU5CUVVNc1EwRkJRenRCUVVOMlFpeHZRMEZCYzBJc1VVRkJVU3hEUVVGRExFTkJRVU03UVVGRGFFTXNlVUpCUVZjc1VVRkJVU3hEUVVGRExFTkJRVU03UVVGRGNrSXNNRUpCUVZrc1VVRkJVU3hEUVVGRExFTkJRVU03UVVGRGRFSXNOa0pCUVdVc1VVRkJVU3hEUVVGRExFTkJRVU03UVVGRGVrSXNNa0pCUVdFc1VVRkJVU3hEUVVGRExFTkJRVU03UTBGRGVFSWlMQ0ptYVd4bElqb2lhR1ZzY0dWeWN5NXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0J5WldkcGMzUmxja0pzYjJOclNHVnNjR1Z5VFdsemMybHVaeUJtY205dElDY3VMMmhsYkhCbGNuTXZZbXh2WTJzdGFHVnNjR1Z5TFcxcGMzTnBibWNuTzF4dWFXMXdiM0owSUhKbFoybHpkR1Z5UldGamFDQm1jbTl0SUNjdUwyaGxiSEJsY25NdlpXRmphQ2M3WEc1cGJYQnZjblFnY21WbmFYTjBaWEpJWld4d1pYSk5hWE56YVc1bklHWnliMjBnSnk0dmFHVnNjR1Z5Y3k5b1pXeHdaWEl0YldsemMybHVaeWM3WEc1cGJYQnZjblFnY21WbmFYTjBaWEpKWmlCbWNtOXRJQ2N1TDJobGJIQmxjbk12YVdZbk8xeHVhVzF3YjNKMElISmxaMmx6ZEdWeVRHOW5JR1p5YjIwZ0p5NHZhR1ZzY0dWeWN5OXNiMmNuTzF4dWFXMXdiM0owSUhKbFoybHpkR1Z5VEc5dmEzVndJR1p5YjIwZ0p5NHZhR1ZzY0dWeWN5OXNiMjlyZFhBbk8xeHVhVzF3YjNKMElISmxaMmx6ZEdWeVYybDBhQ0JtY205dElDY3VMMmhsYkhCbGNuTXZkMmwwYUNjN1hHNWNibVY0Y0c5eWRDQm1kVzVqZEdsdmJpQnlaV2RwYzNSbGNrUmxabUYxYkhSSVpXeHdaWEp6S0dsdWMzUmhibU5sS1NCN1hHNGdJSEpsWjJsemRHVnlRbXh2WTJ0SVpXeHdaWEpOYVhOemFXNW5LR2x1YzNSaGJtTmxLVHRjYmlBZ2NtVm5hWE4wWlhKRllXTm9LR2x1YzNSaGJtTmxLVHRjYmlBZ2NtVm5hWE4wWlhKSVpXeHdaWEpOYVhOemFXNW5LR2x1YzNSaGJtTmxLVHRjYmlBZ2NtVm5hWE4wWlhKSlppaHBibk4wWVc1alpTazdYRzRnSUhKbFoybHpkR1Z5VEc5bktHbHVjM1JoYm1ObEtUdGNiaUFnY21WbmFYTjBaWEpNYjI5cmRYQW9hVzV6ZEdGdVkyVXBPMXh1SUNCeVpXZHBjM1JsY2xkcGRHZ29hVzV6ZEdGdVkyVXBPMXh1ZlZ4dUlsMTlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdibG9ja0hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuICAgIHZhciBpbnZlcnNlID0gb3B0aW9ucy5pbnZlcnNlLFxuICAgICAgICBmbiA9IG9wdGlvbnMuZm47XG5cbiAgICBpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGZuKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dCA9PT0gZmFsc2UgfHwgY29udGV4dCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKF91dGlscy5pc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICBpZiAoY29udGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICAgIG9wdGlvbnMuaWRzID0gW29wdGlvbnMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaGVscGVycy5lYWNoKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGludmVyc2UodGhpcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmRhdGEgJiYgb3B0aW9ucy5pZHMpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBfdXRpbHMuY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IF91dGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMubmFtZSk7XG4gICAgICAgIG9wdGlvbnMgPSB7IGRhdGE6IGRhdGEgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyaGxiSEJsY25NdllteHZZMnN0YUdWc2NHVnlMVzFwYzNOcGJtY3Vhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3T3p0eFFrRkJjMFFzVlVGQlZUczdjVUpCUldwRUxGVkJRVk1zVVVGQlVTeEZRVUZGTzBGQlEyaERMRlZCUVZFc1EwRkJReXhqUVVGakxFTkJRVU1zYjBKQlFXOUNMRVZCUVVVc1ZVRkJVeXhQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTzBGQlEzWkZMRkZCUVVrc1QwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eFBRVUZQTzFGQlEzcENMRVZCUVVVc1IwRkJSeXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZET3p0QlFVVndRaXhSUVVGSkxFOUJRVThzUzBGQlN5eEpRVUZKTEVWQlFVVTdRVUZEY0VJc1lVRkJUeXhGUVVGRkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTMEZEYWtJc1RVRkJUU3hKUVVGSkxFOUJRVThzUzBGQlN5eExRVUZMTEVsQlFVa3NUMEZCVHl4SlFVRkpMRWxCUVVrc1JVRkJSVHRCUVVNdlF5eGhRVUZQTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVOMFFpeE5RVUZOTEVsQlFVa3NaVUZCVVN4UFFVRlBMRU5CUVVNc1JVRkJSVHRCUVVNelFpeFZRVUZKTEU5QlFVOHNRMEZCUXl4TlFVRk5MRWRCUVVjc1EwRkJReXhGUVVGRk8wRkJRM1JDTEZsQlFVa3NUMEZCVHl4RFFVRkRMRWRCUVVjc1JVRkJSVHRCUVVObUxHbENRVUZQTEVOQlFVTXNSMEZCUnl4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFOQlF6bENPenRCUVVWRUxHVkJRVThzVVVGQlVTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzA5QlEyaEVMRTFCUVUwN1FVRkRUQ3hsUVVGUExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0UFFVTjBRanRMUVVOR0xFMUJRVTA3UVVGRFRDeFZRVUZKTEU5QlFVOHNRMEZCUXl4SlFVRkpMRWxCUVVrc1QwRkJUeXhEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU12UWl4WlFVRkpMRWxCUVVrc1IwRkJSeXh0UWtGQldTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRja01zV1VGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4NVFrRkJhMElzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzBGQlF6ZEZMR1ZCUVU4c1IwRkJSeXhGUVVGRExFbEJRVWtzUlVGQlJTeEpRVUZKTEVWQlFVTXNRMEZCUXp0UFFVTjRRanM3UVVGRlJDeGhRVUZQTEVWQlFVVXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03UzBGRE4wSTdSMEZEUml4RFFVRkRMRU5CUVVNN1EwRkRTaUlzSW1acGJHVWlPaUppYkc5amF5MW9aV3h3WlhJdGJXbHpjMmx1Wnk1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdZWEJ3Wlc1a1EyOXVkR1Y0ZEZCaGRHZ3NJR055WldGMFpVWnlZVzFsTENCcGMwRnljbUY1ZlNCbWNtOXRJQ2N1TGk5MWRHbHNjeWM3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdaMWJtTjBhVzl1S0dsdWMzUmhibU5sS1NCN1hHNGdJR2x1YzNSaGJtTmxMbkpsWjJsemRHVnlTR1ZzY0dWeUtDZGliRzlqYTBobGJIQmxjazFwYzNOcGJtY25MQ0JtZFc1amRHbHZiaWhqYjI1MFpYaDBMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lDQWdiR1YwSUdsdWRtVnljMlVnUFNCdmNIUnBiMjV6TG1sdWRtVnljMlVzWEc0Z0lDQWdJQ0FnSUdadUlEMGdiM0IwYVc5dWN5NW1ianRjYmx4dUlDQWdJR2xtSUNoamIyNTBaWGgwSUQwOVBTQjBjblZsS1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnWm00b2RHaHBjeWs3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2hqYjI1MFpYaDBJRDA5UFNCbVlXeHpaU0I4ZkNCamIyNTBaWGgwSUQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJwYm5abGNuTmxLSFJvYVhNcE8xeHVJQ0FnSUgwZ1pXeHpaU0JwWmlBb2FYTkJjbkpoZVNoamIyNTBaWGgwS1NrZ2UxeHVJQ0FnSUNBZ2FXWWdLR052Ym5SbGVIUXViR1Z1WjNSb0lENGdNQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9iM0IwYVc5dWN5NXBaSE1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQnZjSFJwYjI1ekxtbGtjeUE5SUZ0dmNIUnBiMjV6TG01aGJXVmRPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdsdWMzUmhibU5sTG1obGJIQmxjbk11WldGamFDaGpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCcGJuWmxjbk5sS0hSb2FYTXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCcFppQW9iM0IwYVc5dWN5NWtZWFJoSUNZbUlHOXdkR2x2Ym5NdWFXUnpLU0I3WEc0Z0lDQWdJQ0FnSUd4bGRDQmtZWFJoSUQwZ1kzSmxZWFJsUm5KaGJXVW9iM0IwYVc5dWN5NWtZWFJoS1R0Y2JpQWdJQ0FnSUNBZ1pHRjBZUzVqYjI1MFpYaDBVR0YwYUNBOUlHRndjR1Z1WkVOdmJuUmxlSFJRWVhSb0tHOXdkR2x2Ym5NdVpHRjBZUzVqYjI1MFpYaDBVR0YwYUN3Z2IzQjBhVzl1Y3k1dVlXMWxLVHRjYmlBZ0lDQWdJQ0FnYjNCMGFXOXVjeUE5SUh0a1lYUmhPaUJrWVhSaGZUdGNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjbVYwZFhKdUlHWnVLR052Ym5SbGVIUXNJRzl3ZEdsdmJuTXBPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNTlYRzRpWFgwPVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2Jsb2NrLWhlbHBlci1taXNzaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4vLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG52YXIgX2V4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uL2V4Y2VwdGlvbicpO1xuXG52YXIgX2V4Y2VwdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leGNlcHRpb24pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2VhY2gnLCBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ011c3QgcGFzcyBpdGVyYXRvciB0byAjZWFjaCcpO1xuICAgIH1cblxuICAgIHZhciBmbiA9IG9wdGlvbnMuZm4sXG4gICAgICAgIGludmVyc2UgPSBvcHRpb25zLmludmVyc2UsXG4gICAgICAgIGkgPSAwLFxuICAgICAgICByZXQgPSAnJyxcbiAgICAgICAgZGF0YSA9IHVuZGVmaW5lZCxcbiAgICAgICAgY29udGV4dFBhdGggPSB1bmRlZmluZWQ7XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IF91dGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKSArICcuJztcbiAgICB9XG5cbiAgICBpZiAoX3V0aWxzLmlzRnVuY3Rpb24oY29udGV4dCkpIHtcbiAgICAgIGNvbnRleHQgPSBjb250ZXh0LmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSkge1xuICAgICAgZGF0YSA9IF91dGlscy5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4ZWNJdGVyYXRpb24oZmllbGQsIGluZGV4LCBsYXN0KSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBkYXRhLmtleSA9IGZpZWxkO1xuICAgICAgICBkYXRhLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIGRhdGEuZmlyc3QgPSBpbmRleCA9PT0gMDtcbiAgICAgICAgZGF0YS5sYXN0ID0gISFsYXN0O1xuXG4gICAgICAgIGlmIChjb250ZXh0UGF0aCkge1xuICAgICAgICAgIGRhdGEuY29udGV4dFBhdGggPSBjb250ZXh0UGF0aCArIGZpZWxkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldCA9IHJldCArIGZuKGNvbnRleHRbZmllbGRdLCB7XG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGJsb2NrUGFyYW1zOiBfdXRpbHMuYmxvY2tQYXJhbXMoW2NvbnRleHRbZmllbGRdLCBmaWVsZF0sIFtjb250ZXh0UGF0aCArIGZpZWxkLCBudWxsXSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0ICYmIHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKF91dGlscy5pc0FycmF5KGNvbnRleHQpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBjb250ZXh0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgIGlmIChpIGluIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24oaSwgaSwgaSA9PT0gY29udGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwcmlvcktleSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgIGlmIChjb250ZXh0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIC8vIFdlJ3JlIHJ1bm5pbmcgdGhlIGl0ZXJhdGlvbnMgb25lIHN0ZXAgb3V0IG9mIHN5bmMgc28gd2UgY2FuIGRldGVjdFxuICAgICAgICAgICAgLy8gdGhlIGxhc3QgaXRlcmF0aW9uIHdpdGhvdXQgaGF2ZSB0byBzY2FuIHRoZSBvYmplY3QgdHdpY2UgYW5kIGNyZWF0ZVxuICAgICAgICAgICAgLy8gYW4gaXRlcm1lZGlhdGUga2V5cyBhcnJheS5cbiAgICAgICAgICAgIGlmIChwcmlvcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByaW9yS2V5ID0ga2V5O1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpb3JLZXkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGV4ZWNJdGVyYXRpb24ocHJpb3JLZXksIGkgLSAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICByZXQgPSBpbnZlcnNlKHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXZaV0ZqYUM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3TzNGQ1FVRXJSU3hWUVVGVk96dDVRa0ZEYmtVc1kwRkJZenM3T3p0eFFrRkZja0lzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1ZVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eE5RVUZOTEVWQlFVVXNWVUZCVXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8wRkJRM3BFTEZGQlFVa3NRMEZCUXl4UFFVRlBMRVZCUVVVN1FVRkRXaXhaUVVGTkxESkNRVUZqTERaQ1FVRTJRaXhEUVVGRExFTkJRVU03UzBGRGNFUTdPMEZCUlVRc1VVRkJTU3hGUVVGRkxFZEJRVWNzVDBGQlR5eERRVUZETEVWQlFVVTdVVUZEWml4UFFVRlBMRWRCUVVjc1QwRkJUeXhEUVVGRExFOUJRVTg3VVVGRGVrSXNRMEZCUXl4SFFVRkhMRU5CUVVNN1VVRkRUQ3hIUVVGSExFZEJRVWNzUlVGQlJUdFJRVU5TTEVsQlFVa3NXVUZCUVR0UlFVTktMRmRCUVZjc1dVRkJRU3hEUVVGRE96dEJRVVZvUWl4UlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFbEJRVWtzVDBGQlR5eERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTXZRaXhwUWtGQlZ5eEhRVUZITEhsQ1FVRnJRaXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEZkQlFWY3NSVUZCUlN4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRPMHRCUTJwR096dEJRVVZFTEZGQlFVa3NhMEpCUVZjc1QwRkJUeXhEUVVGRExFVkJRVVU3UVVGQlJTeGhRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVUZGT3p0QlFVVXhSQ3hSUVVGSkxFOUJRVThzUTBGQlF5eEpRVUZKTEVWQlFVVTdRVUZEYUVJc1ZVRkJTU3hIUVVGSExHMUNRVUZaTEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVOc1F6czdRVUZGUkN4aFFVRlRMR0ZCUVdFc1EwRkJReXhMUVVGTExFVkJRVVVzUzBGQlN5eEZRVUZGTEVsQlFVa3NSVUZCUlR0QlFVTjZReXhWUVVGSkxFbEJRVWtzUlVGQlJUdEJRVU5TTEZsQlFVa3NRMEZCUXl4SFFVRkhMRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRMnBDTEZsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRMjVDTEZsQlFVa3NRMEZCUXl4TFFVRkxMRWRCUVVjc1MwRkJTeXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU42UWl4WlFVRkpMRU5CUVVNc1NVRkJTU3hIUVVGSExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTTdPMEZCUlc1Q0xGbEJRVWtzVjBGQlZ5eEZRVUZGTzBGQlEyWXNZMEZCU1N4RFFVRkRMRmRCUVZjc1IwRkJSeXhYUVVGWExFZEJRVWNzUzBGQlN5eERRVUZETzFOQlEzaERPMDlCUTBZN08wRkJSVVFzVTBGQlJ5eEhRVUZITEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1QwRkJUeXhEUVVGRExFdEJRVXNzUTBGQlF5eEZRVUZGTzBGQlF6ZENMRmxCUVVrc1JVRkJSU3hKUVVGSk8wRkJRMVlzYlVKQlFWY3NSVUZCUlN4dFFrRkJXU3hEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVOQlFVTXNSVUZCUlN4TFFVRkxMRU5CUVVNc1JVRkJSU3hEUVVGRExGZEJRVmNzUjBGQlJ5eExRVUZMTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1QwRkRMMFVzUTBGQlF5eERRVUZETzB0QlEwbzdPMEZCUlVRc1VVRkJTU3hQUVVGUExFbEJRVWtzVDBGQlR5eFBRVUZQTEV0QlFVc3NVVUZCVVN4RlFVRkZPMEZCUXpGRExGVkJRVWtzWlVGQlVTeFBRVUZQTEVOQlFVTXNSVUZCUlR0QlFVTndRaXhoUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRVZCUVVVc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlR0QlFVTjJReXhqUVVGSkxFTkJRVU1zU1VGQlNTeFBRVUZQTEVWQlFVVTdRVUZEYUVJc2VVSkJRV0VzUTBGQlF5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNc1MwRkJTeXhQUVVGUExFTkJRVU1zVFVGQlRTeEhRVUZITEVOQlFVTXNRMEZCUXl4RFFVRkRPMWRCUXk5RE8xTkJRMFk3VDBGRFJpeE5RVUZOTzBGQlEwd3NXVUZCU1N4UlFVRlJMRmxCUVVFc1EwRkJRenM3UVVGRllpeGhRVUZMTEVsQlFVa3NSMEZCUnl4SlFVRkpMRTlCUVU4c1JVRkJSVHRCUVVOMlFpeGpRVUZKTEU5QlFVOHNRMEZCUXl4alFVRmpMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVU3T3pzN1FVRkpMMElzWjBKQlFVa3NVVUZCVVN4TFFVRkxMRk5CUVZNc1JVRkJSVHRCUVVNeFFpd3lRa0ZCWVN4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTTdZVUZEYUVNN1FVRkRSQ3h2UWtGQlVTeEhRVUZITEVkQlFVY3NRMEZCUXp0QlFVTm1MR0ZCUVVNc1JVRkJSU3hEUVVGRE8xZEJRMHc3VTBGRFJqdEJRVU5FTEZsQlFVa3NVVUZCVVN4TFFVRkxMRk5CUVZNc1JVRkJSVHRCUVVNeFFpeDFRa0ZCWVN4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTEVsQlFVa3NRMEZCUXl4RFFVRkRPMU5CUTNSRE8wOUJRMFk3UzBGRFJqczdRVUZGUkN4UlFVRkpMRU5CUVVNc1MwRkJTeXhEUVVGRExFVkJRVVU3UVVGRFdDeFRRVUZITEVkQlFVY3NUMEZCVHl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJRM0pDT3p0QlFVVkVMRmRCUVU4c1IwRkJSeXhEUVVGRE8wZEJRMW9zUTBGQlF5eERRVUZETzBOQlEwb2lMQ0ptYVd4bElqb2laV0ZqYUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdZWEJ3Wlc1a1EyOXVkR1Y0ZEZCaGRHZ3NJR0pzYjJOclVHRnlZVzF6TENCamNtVmhkR1ZHY21GdFpTd2dhWE5CY25KaGVTd2dhWE5HZFc1amRHbHZibjBnWm5KdmJTQW5MaTR2ZFhScGJITW5PMXh1YVcxd2IzSjBJRVY0WTJWd2RHbHZiaUJtY205dElDY3VMaTlsZUdObGNIUnBiMjRuTzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlocGJuTjBZVzVqWlNrZ2UxeHVJQ0JwYm5OMFlXNWpaUzV5WldkcGMzUmxja2hsYkhCbGNpZ25aV0ZqYUNjc0lHWjFibU4wYVc5dUtHTnZiblJsZUhRc0lHOXdkR2x2Ym5NcElIdGNiaUFnSUNCcFppQW9JVzl3ZEdsdmJuTXBJSHRjYmlBZ0lDQWdJSFJvY205M0lHNWxkeUJGZUdObGNIUnBiMjRvSjAxMWMzUWdjR0Z6Y3lCcGRHVnlZWFJ2Y2lCMGJ5QWpaV0ZqYUNjcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUd4bGRDQm1iaUE5SUc5d2RHbHZibk11Wm00c1hHNGdJQ0FnSUNBZ0lHbHVkbVZ5YzJVZ1BTQnZjSFJwYjI1ekxtbHVkbVZ5YzJVc1hHNGdJQ0FnSUNBZ0lHa2dQU0F3TEZ4dUlDQWdJQ0FnSUNCeVpYUWdQU0FuSnl4Y2JpQWdJQ0FnSUNBZ1pHRjBZU3hjYmlBZ0lDQWdJQ0FnWTI5dWRHVjRkRkJoZEdnN1hHNWNiaUFnSUNCcFppQW9iM0IwYVc5dWN5NWtZWFJoSUNZbUlHOXdkR2x2Ym5NdWFXUnpLU0I3WEc0Z0lDQWdJQ0JqYjI1MFpYaDBVR0YwYUNBOUlHRndjR1Z1WkVOdmJuUmxlSFJRWVhSb0tHOXdkR2x2Ym5NdVpHRjBZUzVqYjI1MFpYaDBVR0YwYUN3Z2IzQjBhVzl1Y3k1cFpITmJNRjBwSUNzZ0p5NG5PMXh1SUNBZ0lIMWNibHh1SUNBZ0lHbG1JQ2hwYzBaMWJtTjBhVzl1S0dOdmJuUmxlSFFwS1NCN0lHTnZiblJsZUhRZ1BTQmpiMjUwWlhoMExtTmhiR3dvZEdocGN5azdJSDFjYmx4dUlDQWdJR2xtSUNodmNIUnBiMjV6TG1SaGRHRXBJSHRjYmlBZ0lDQWdJR1JoZEdFZ1BTQmpjbVZoZEdWR2NtRnRaU2h2Y0hScGIyNXpMbVJoZEdFcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdaMWJtTjBhVzl1SUdWNFpXTkpkR1Z5WVhScGIyNG9abWxsYkdRc0lHbHVaR1Y0TENCc1lYTjBLU0I3WEc0Z0lDQWdJQ0JwWmlBb1pHRjBZU2tnZTF4dUlDQWdJQ0FnSUNCa1lYUmhMbXRsZVNBOUlHWnBaV3hrTzF4dUlDQWdJQ0FnSUNCa1lYUmhMbWx1WkdWNElEMGdhVzVrWlhnN1hHNGdJQ0FnSUNBZ0lHUmhkR0V1Wm1seWMzUWdQU0JwYm1SbGVDQTlQVDBnTUR0Y2JpQWdJQ0FnSUNBZ1pHRjBZUzVzWVhOMElEMGdJU0ZzWVhOME8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoamIyNTBaWGgwVUdGMGFDa2dlMXh1SUNBZ0lDQWdJQ0FnSUdSaGRHRXVZMjl1ZEdWNGRGQmhkR2dnUFNCamIyNTBaWGgwVUdGMGFDQXJJR1pwWld4a08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSEpsZENBOUlISmxkQ0FySUdadUtHTnZiblJsZUhSYlptbGxiR1JkTENCN1hHNGdJQ0FnSUNBZ0lHUmhkR0U2SUdSaGRHRXNYRzRnSUNBZ0lDQWdJR0pzYjJOclVHRnlZVzF6T2lCaWJHOWphMUJoY21GdGN5aGJZMjl1ZEdWNGRGdG1hV1ZzWkYwc0lHWnBaV3hrWFN3Z1cyTnZiblJsZUhSUVlYUm9JQ3NnWm1sbGJHUXNJRzUxYkd4ZEtWeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR052Ym5SbGVIUWdKaVlnZEhsd1pXOW1JR052Ym5SbGVIUWdQVDA5SUNkdlltcGxZM1FuS1NCN1hHNGdJQ0FnSUNCcFppQW9hWE5CY25KaGVTaGpiMjUwWlhoMEtTa2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JxSUQwZ1kyOXVkR1Y0ZEM1c1pXNW5kR2c3SUdrZ1BDQnFPeUJwS3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2FTQnBiaUJqYjI1MFpYaDBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxlR1ZqU1hSbGNtRjBhVzl1S0drc0lHa3NJR2tnUFQwOUlHTnZiblJsZUhRdWJHVnVaM1JvSUMwZ01TazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCc1pYUWdjSEpwYjNKTFpYazdYRzVjYmlBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnYTJWNUlHbHVJR052Ym5SbGVIUXBJSHRjYmlBZ0lDQWdJQ0FnSUNCcFppQW9ZMjl1ZEdWNGRDNW9ZWE5QZDI1UWNtOXdaWEowZVNoclpYa3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUJYWlNkeVpTQnlkVzV1YVc1bklIUm9aU0JwZEdWeVlYUnBiMjV6SUc5dVpTQnpkR1Z3SUc5MWRDQnZaaUJ6ZVc1aklITnZJSGRsSUdOaGJpQmtaWFJsWTNSY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUhSb1pTQnNZWE4wSUdsMFpYSmhkR2x2YmlCM2FYUm9iM1YwSUdoaGRtVWdkRzhnYzJOaGJpQjBhR1VnYjJKcVpXTjBJSFIzYVdObElHRnVaQ0JqY21WaGRHVmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklHRnVJR2wwWlhKdFpXUnBZWFJsSUd0bGVYTWdZWEp5WVhrdVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NISnBiM0pMWlhrZ0lUMDlJSFZ1WkdWbWFXNWxaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JsZUdWalNYUmxjbUYwYVc5dUtIQnlhVzl5UzJWNUxDQnBJQzBnTVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQndjbWx2Y2t0bGVTQTlJR3RsZVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2tyS3p0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnYVdZZ0tIQnlhVzl5UzJWNUlDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmxlR1ZqU1hSbGNtRjBhVzl1S0hCeWFXOXlTMlY1TENCcElDMGdNU3dnZEhKMVpTazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYVNBOVBUMGdNQ2tnZTF4dUlDQWdJQ0FnY21WMElEMGdhVzUyWlhKelpTaDBhR2x6S1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdjbVYwTzF4dUlDQjlLVHRjYm4xY2JpSmRmUT09XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvZWFjaC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuLy8gaXN0YW5idWwgaWdub3JlIG5leHRcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX2V4Y2VwdGlvbiA9IHJlcXVpcmUoJy4uL2V4Y2VwdGlvbicpO1xuXG52YXIgX2V4Y2VwdGlvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leGNlcHRpb24pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2hlbHBlck1pc3NpbmcnLCBmdW5jdGlvbiAoKSAvKiBbYXJncywgXW9wdGlvbnMgKi97XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIEEgbWlzc2luZyBmaWVsZCBpbiBhIHt7Zm9vfX0gY29uc3RydWN0LlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU29tZW9uZSBpcyBhY3R1YWxseSB0cnlpbmcgdG8gY2FsbCBzb21ldGhpbmcsIGJsb3cgdXAuXG4gICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnTWlzc2luZyBoZWxwZXI6IFwiJyArIGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV0ubmFtZSArICdcIicpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyaGxiSEJsY25NdmFHVnNjR1Z5TFcxcGMzTnBibWN1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenQ1UWtGQmMwSXNZMEZCWXpzN096dHhRa0ZGY2tJc1ZVRkJVeXhSUVVGUkxFVkJRVVU3UVVGRGFFTXNWVUZCVVN4RFFVRkRMR05CUVdNc1EwRkJReXhsUVVGbExFVkJRVVVzYVVOQlFXZERPMEZCUTNaRkxGRkJRVWtzVTBGQlV5eERRVUZETEUxQlFVMHNTMEZCU3l4RFFVRkRMRVZCUVVVN08wRkJSVEZDTEdGQlFVOHNVMEZCVXl4RFFVRkRPMHRCUTJ4Q0xFMUJRVTA3TzBGQlJVd3NXVUZCVFN3eVFrRkJZeXh0UWtGQmJVSXNSMEZCUnl4VFFVRlRMRU5CUVVNc1UwRkJVeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRWRCUVVjc1IwRkJSeXhEUVVGRExFTkJRVU03UzBGRGRrWTdSMEZEUml4RFFVRkRMRU5CUVVNN1EwRkRTaUlzSW1acGJHVWlPaUpvWld4d1pYSXRiV2x6YzJsdVp5NXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0JGZUdObGNIUnBiMjRnWm5KdmJTQW5MaTR2WlhoalpYQjBhVzl1Snp0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0b2FXNXpkR0Z1WTJVcElIdGNiaUFnYVc1emRHRnVZMlV1Y21WbmFYTjBaWEpJWld4d1pYSW9KMmhsYkhCbGNrMXBjM05wYm1jbkxDQm1kVzVqZEdsdmJpZ3ZLaUJiWVhKbmN5d2dYVzl3ZEdsdmJuTWdLaThwSUh0Y2JpQWdJQ0JwWmlBb1lYSm5kVzFsYm5SekxteGxibWQwYUNBOVBUMGdNU2tnZTF4dUlDQWdJQ0FnTHk4Z1FTQnRhWE56YVc1bklHWnBaV3hrSUdsdUlHRWdlM3RtYjI5OWZTQmpiMjV6ZEhKMVkzUXVYRzRnSUNBZ0lDQnlaWFIxY200Z2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0F2THlCVGIyMWxiMjVsSUdseklHRmpkSFZoYkd4NUlIUnllV2x1WnlCMGJ5QmpZV3hzSUhOdmJXVjBhR2x1Wnl3Z1lteHZkeUIxY0M1Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmVHTmxjSFJwYjI0b0owMXBjM05wYm1jZ2FHVnNjR1Z5T2lCY0lpY2dLeUJoY21kMWJXVnVkSE5iWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0F0SURGZExtNWhiV1VnS3lBblhDSW5LVHRjYmlBZ0lDQjlYRzRnSUgwcE8xeHVmVnh1SWwxOVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2hlbHBlci1taXNzaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2lmJywgZnVuY3Rpb24gKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKF91dGlscy5pc0Z1bmN0aW9uKGNvbmRpdGlvbmFsKSkge1xuICAgICAgY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbC5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgYmVoYXZpb3IgaXMgdG8gcmVuZGVyIHRoZSBwb3NpdGl2ZSBwYXRoIGlmIHRoZSB2YWx1ZSBpcyB0cnV0aHkgYW5kIG5vdCBlbXB0eS5cbiAgICAvLyBUaGUgYGluY2x1ZGVaZXJvYCBvcHRpb24gbWF5IGJlIHNldCB0byB0cmVhdCB0aGUgY29uZHRpb25hbCBhcyBwdXJlbHkgbm90IGVtcHR5IGJhc2VkIG9uIHRoZVxuICAgIC8vIGJlaGF2aW9yIG9mIGlzRW1wdHkuIEVmZmVjdGl2ZWx5IHRoaXMgZGV0ZXJtaW5lcyBpZiAwIGlzIGhhbmRsZWQgYnkgdGhlIHBvc2l0aXZlIHBhdGggb3IgbmVnYXRpdmUuXG4gICAgaWYgKCFvcHRpb25zLmhhc2guaW5jbHVkZVplcm8gJiYgIWNvbmRpdGlvbmFsIHx8IF91dGlscy5pc0VtcHR5KGNvbmRpdGlvbmFsKSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuaW52ZXJzZSh0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuZm4odGhpcyk7XG4gICAgfVxuICB9KTtcblxuICBpbnN0YW5jZS5yZWdpc3RlckhlbHBlcigndW5sZXNzJywgZnVuY3Rpb24gKGNvbmRpdGlvbmFsLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLmhlbHBlcnNbJ2lmJ10uY2FsbCh0aGlzLCBjb25kaXRpb25hbCwgeyBmbjogb3B0aW9ucy5pbnZlcnNlLCBpbnZlcnNlOiBvcHRpb25zLmZuLCBoYXNoOiBvcHRpb25zLmhhc2ggfSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMmhsYkhCbGNuTXZhV1l1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN096dHhRa0ZCYTBNc1ZVRkJWVHM3Y1VKQlJUZENMRlZCUVZNc1VVRkJVU3hGUVVGRk8wRkJRMmhETEZWQlFWRXNRMEZCUXl4alFVRmpMRU5CUVVNc1NVRkJTU3hGUVVGRkxGVkJRVk1zVjBGQlZ5eEZRVUZGTEU5QlFVOHNSVUZCUlR0QlFVTXpSQ3hSUVVGSkxHdENRVUZYTEZkQlFWY3NRMEZCUXl4RlFVRkZPMEZCUVVVc2FVSkJRVmNzUjBGQlJ5eFhRVUZYTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wdEJRVVU3T3pzN08wRkJTM1JGTEZGQlFVa3NRVUZCUXl4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEpRVUZKTEVOQlFVTXNWMEZCVnl4SlFVRkxMR1ZCUVZFc1YwRkJWeXhEUVVGRExFVkJRVVU3UVVGRGRrVXNZVUZCVHl4UFFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzB0QlF6bENMRTFCUVUwN1FVRkRUQ3hoUVVGUExFOUJRVThzUTBGQlF5eEZRVUZGTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1MwRkRla0k3UjBGRFJpeERRVUZETEVOQlFVTTdPMEZCUlVnc1ZVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eFJRVUZSTEVWQlFVVXNWVUZCVXl4WFFVRlhMRVZCUVVVc1QwRkJUeXhGUVVGRk8wRkJReTlFTEZkQlFVOHNVVUZCVVN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RlFVRkZMRmRCUVZjc1JVRkJSU3hGUVVGRExFVkJRVVVzUlVGQlJTeFBRVUZQTEVOQlFVTXNUMEZCVHl4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFTkJRVU1zUlVGQlJTeEZRVUZGTEVsQlFVa3NSVUZCUlN4UFFVRlBMRU5CUVVNc1NVRkJTU3hGUVVGRExFTkJRVU1zUTBGQlF6dEhRVU4yU0N4RFFVRkRMRU5CUVVNN1EwRkRTaUlzSW1acGJHVWlPaUpwWmk1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdhWE5GYlhCMGVTd2dhWE5HZFc1amRHbHZibjBnWm5KdmJTQW5MaTR2ZFhScGJITW5PMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaWhwYm5OMFlXNWpaU2tnZTF4dUlDQnBibk4wWVc1alpTNXlaV2RwYzNSbGNraGxiSEJsY2lnbmFXWW5MQ0JtZFc1amRHbHZiaWhqYjI1a2FYUnBiMjVoYkN3Z2IzQjBhVzl1Y3lrZ2UxeHVJQ0FnSUdsbUlDaHBjMFoxYm1OMGFXOXVLR052Ym1ScGRHbHZibUZzS1NrZ2V5QmpiMjVrYVhScGIyNWhiQ0E5SUdOdmJtUnBkR2x2Ym1Gc0xtTmhiR3dvZEdocGN5azdJSDFjYmx4dUlDQWdJQzh2SUVSbFptRjFiSFFnWW1Wb1lYWnBiM0lnYVhNZ2RHOGdjbVZ1WkdWeUlIUm9aU0J3YjNOcGRHbDJaU0J3WVhSb0lHbG1JSFJvWlNCMllXeDFaU0JwY3lCMGNuVjBhSGtnWVc1a0lHNXZkQ0JsYlhCMGVTNWNiaUFnSUNBdkx5QlVhR1VnWUdsdVkyeDFaR1ZhWlhKdllDQnZjSFJwYjI0Z2JXRjVJR0psSUhObGRDQjBieUIwY21WaGRDQjBhR1VnWTI5dVpIUnBiMjVoYkNCaGN5QndkWEpsYkhrZ2JtOTBJR1Z0Y0hSNUlHSmhjMlZrSUc5dUlIUm9aVnh1SUNBZ0lDOHZJR0psYUdGMmFXOXlJRzltSUdselJXMXdkSGt1SUVWbVptVmpkR2wyWld4NUlIUm9hWE1nWkdWMFpYSnRhVzVsY3lCcFppQXdJR2x6SUdoaGJtUnNaV1FnWW5rZ2RHaGxJSEJ2YzJsMGFYWmxJSEJoZEdnZ2IzSWdibVZuWVhScGRtVXVYRzRnSUNBZ2FXWWdLQ2doYjNCMGFXOXVjeTVvWVhOb0xtbHVZMngxWkdWYVpYSnZJQ1ltSUNGamIyNWthWFJwYjI1aGJDa2dmSHdnYVhORmJYQjBlU2hqYjI1a2FYUnBiMjVoYkNrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdmNIUnBiMjV6TG1sdWRtVnljMlVvZEdocGN5azdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ2Y0hScGIyNXpMbVp1S0hSb2FYTXBPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNWNiaUFnYVc1emRHRnVZMlV1Y21WbmFYTjBaWEpJWld4d1pYSW9KM1Z1YkdWemN5Y3NJR1oxYm1OMGFXOXVLR052Ym1ScGRHbHZibUZzTENCdmNIUnBiMjV6S1NCN1hHNGdJQ0FnY21WMGRYSnVJR2x1YzNSaGJtTmxMbWhsYkhCbGNuTmJKMmxtSjEwdVkyRnNiQ2gwYUdsekxDQmpiMjVrYVhScGIyNWhiQ3dnZTJadU9pQnZjSFJwYjI1ekxtbHVkbVZ5YzJVc0lHbHVkbVZ5YzJVNklHOXdkR2x2Ym5NdVptNHNJR2hoYzJnNklHOXdkR2x2Ym5NdWFHRnphSDBwTzF4dUlDQjlLVHRjYm4xY2JpSmRmUT09XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvaWYuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIGluc3RhbmNlLnJlZ2lzdGVySGVscGVyKCdsb2cnLCBmdW5jdGlvbiAoKSAvKiBtZXNzYWdlLCBvcHRpb25zICove1xuICAgIHZhciBhcmdzID0gW3VuZGVmaW5lZF0sXG4gICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIGxldmVsID0gMTtcbiAgICBpZiAob3B0aW9ucy5oYXNoLmxldmVsICE9IG51bGwpIHtcbiAgICAgIGxldmVsID0gb3B0aW9ucy5oYXNoLmxldmVsO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YS5sZXZlbCAhPSBudWxsKSB7XG4gICAgICBsZXZlbCA9IG9wdGlvbnMuZGF0YS5sZXZlbDtcbiAgICB9XG4gICAgYXJnc1swXSA9IGxldmVsO1xuXG4gICAgaW5zdGFuY2UubG9nLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyaGxiSEJsY25NdmJHOW5MbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN2NVSkJRV1VzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1ZVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eExRVUZMTEVWQlFVVXNhME5CUVdsRE8wRkJRemxFTEZGQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVNc1UwRkJVeXhEUVVGRE8xRkJRMnhDTEU5QlFVOHNSMEZCUnl4VFFVRlRMRU5CUVVNc1UwRkJVeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTTVReXhUUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1UwRkJVeXhEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVN1FVRkROME1zVlVGQlNTeERRVUZETEVsQlFVa3NRMEZCUXl4VFFVRlRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF6dExRVU42UWpzN1FVRkZSQ3hSUVVGSkxFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTTdRVUZEWkN4UlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUzBGQlN5eEpRVUZKTEVsQlFVa3NSVUZCUlR0QlFVTTVRaXhYUVVGTExFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNN1MwRkROVUlzVFVGQlRTeEpRVUZKTEU5QlFVOHNRMEZCUXl4SlFVRkpMRWxCUVVrc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eExRVUZMTEVsQlFVa3NTVUZCU1N4RlFVRkZPMEZCUTNKRUxGZEJRVXNzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRXRCUVVzc1EwRkJRenRMUVVNMVFqdEJRVU5FTEZGQlFVa3NRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhMUVVGTExFTkJRVU03TzBGQlJXaENMRmxCUVZFc1EwRkJReXhIUVVGSExFMUJRVUVzUTBGQldpeFJRVUZSTEVWQlFWTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1IwRkRlRUlzUTBGQlF5eERRVUZETzBOQlEwb2lMQ0ptYVd4bElqb2liRzluTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2laWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0b2FXNXpkR0Z1WTJVcElIdGNiaUFnYVc1emRHRnVZMlV1Y21WbmFYTjBaWEpJWld4d1pYSW9KMnh2Wnljc0lHWjFibU4wYVc5dUtDOHFJRzFsYzNOaFoyVXNJRzl3ZEdsdmJuTWdLaThwSUh0Y2JpQWdJQ0JzWlhRZ1lYSm5jeUE5SUZ0MWJtUmxabWx1WldSZExGeHVJQ0FnSUNBZ0lDQnZjSFJwYjI1eklEMGdZWEpuZFcxbGJuUnpXMkZ5WjNWdFpXNTBjeTVzWlc1bmRHZ2dMU0F4WFR0Y2JpQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnTFNBeE95QnBLeXNwSUh0Y2JpQWdJQ0FnSUdGeVozTXVjSFZ6YUNoaGNtZDFiV1Z1ZEhOYmFWMHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHeGxkQ0JzWlhabGJDQTlJREU3WEc0Z0lDQWdhV1lnS0c5d2RHbHZibk11YUdGemFDNXNaWFpsYkNBaFBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCc1pYWmxiQ0E5SUc5d2RHbHZibk11YUdGemFDNXNaWFpsYkR0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0c5d2RHbHZibk11WkdGMFlTQW1KaUJ2Y0hScGIyNXpMbVJoZEdFdWJHVjJaV3dnSVQwZ2JuVnNiQ2tnZTF4dUlDQWdJQ0FnYkdWMlpXd2dQU0J2Y0hScGIyNXpMbVJoZEdFdWJHVjJaV3c3WEc0Z0lDQWdmVnh1SUNBZ0lHRnlaM05iTUYwZ1BTQnNaWFpsYkR0Y2JseHVJQ0FnSUdsdWMzUmhibU5sTG14dlp5Z3VMaTRnWVhKbmN5azdYRzRnSUgwcE8xeHVmVnh1SWwxOVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9oZWxwZXJzL2xvZy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ2xvb2t1cCcsIGZ1bmN0aW9uIChvYmosIGZpZWxkKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmpbZmllbGRdO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJobGJIQmxjbk12Ykc5dmEzVndMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN2NVSkJRV1VzVlVGQlV5eFJRVUZSTEVWQlFVVTdRVUZEYUVNc1ZVRkJVU3hEUVVGRExHTkJRV01zUTBGQlF5eFJRVUZSTEVWQlFVVXNWVUZCVXl4SFFVRkhMRVZCUVVVc1MwRkJTeXhGUVVGRk8wRkJRM0pFTEZkQlFVOHNSMEZCUnl4SlFVRkpMRWRCUVVjc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEhRVU14UWl4RFFVRkRMRU5CUVVNN1EwRkRTaUlzSW1acGJHVWlPaUpzYjI5cmRYQXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKbGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaWhwYm5OMFlXNWpaU2tnZTF4dUlDQnBibk4wWVc1alpTNXlaV2RwYzNSbGNraGxiSEJsY2lnbmJHOXZhM1Z3Snl3Z1puVnVZM1JwYjI0b2IySnFMQ0JtYVdWc1pDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdlltb2dKaVlnYjJKcVcyWnBaV3hrWFR0Y2JpQWdmU2s3WEc1OVhHNGlYWDA9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvbG9va3VwLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJIZWxwZXIoJ3dpdGgnLCBmdW5jdGlvbiAoY29udGV4dCwgb3B0aW9ucykge1xuICAgIGlmIChfdXRpbHMuaXNGdW5jdGlvbihjb250ZXh0KSkge1xuICAgICAgY29udGV4dCA9IGNvbnRleHQuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICB2YXIgZm4gPSBvcHRpb25zLmZuO1xuXG4gICAgaWYgKCFfdXRpbHMuaXNFbXB0eShjb250ZXh0KSkge1xuICAgICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAob3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuaWRzKSB7XG4gICAgICAgIGRhdGEgPSBfdXRpbHMuY3JlYXRlRnJhbWUob3B0aW9ucy5kYXRhKTtcbiAgICAgICAgZGF0YS5jb250ZXh0UGF0aCA9IF91dGlscy5hcHBlbmRDb250ZXh0UGF0aChvcHRpb25zLmRhdGEuY29udGV4dFBhdGgsIG9wdGlvbnMuaWRzWzBdKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZuKGNvbnRleHQsIHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgYmxvY2tQYXJhbXM6IF91dGlscy5ibG9ja1BhcmFtcyhbY29udGV4dF0sIFtkYXRhICYmIGRhdGEuY29udGV4dFBhdGhdKVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmludmVyc2UodGhpcyk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJobGJIQmxjbk12ZDJsMGFDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3TzNGQ1FVRXJSU3hWUVVGVk96dHhRa0ZGTVVVc1ZVRkJVeXhSUVVGUkxFVkJRVVU3UVVGRGFFTXNWVUZCVVN4RFFVRkRMR05CUVdNc1EwRkJReXhOUVVGTkxFVkJRVVVzVlVGQlV5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZPMEZCUTNwRUxGRkJRVWtzYTBKQlFWY3NUMEZCVHl4RFFVRkRMRVZCUVVVN1FVRkJSU3hoUVVGUExFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVGRk96dEJRVVV4UkN4UlFVRkpMRVZCUVVVc1IwRkJSeXhQUVVGUExFTkJRVU1zUlVGQlJTeERRVUZET3p0QlFVVndRaXhSUVVGSkxFTkJRVU1zWlVGQlVTeFBRVUZQTEVOQlFVTXNSVUZCUlR0QlFVTnlRaXhWUVVGSkxFbEJRVWtzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRPMEZCUTNoQ0xGVkJRVWtzVDBGQlR5eERRVUZETEVsQlFVa3NTVUZCU1N4UFFVRlBMRU5CUVVNc1IwRkJSeXhGUVVGRk8wRkJReTlDTEZsQlFVa3NSMEZCUnl4dFFrRkJXU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdRVUZEYWtNc1dVRkJTU3hEUVVGRExGZEJRVmNzUjBGQlJ5eDVRa0ZCYTBJc1QwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVWQlFVVXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETzA5QlEyaEdPenRCUVVWRUxHRkJRVThzUlVGQlJTeERRVUZETEU5QlFVOHNSVUZCUlR0QlFVTnFRaXhaUVVGSkxFVkJRVVVzU1VGQlNUdEJRVU5XTEcxQ1FVRlhMRVZCUVVVc2JVSkJRVmtzUTBGQlF5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRMRWxCUVVrc1NVRkJTU3hKUVVGSkxFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTTdUMEZEYUVVc1EwRkJReXhEUVVGRE8wdEJRMG9zVFVGQlRUdEJRVU5NTEdGQlFVOHNUMEZCVHl4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dExRVU01UWp0SFFVTkdMRU5CUVVNc1EwRkJRenREUVVOS0lpd2labWxzWlNJNkluZHBkR2d1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnBiWEJ2Y25RZ2UyRndjR1Z1WkVOdmJuUmxlSFJRWVhSb0xDQmliRzlqYTFCaGNtRnRjeXdnWTNKbFlYUmxSbkpoYldVc0lHbHpSVzF3ZEhrc0lHbHpSblZ1WTNScGIyNTlJR1p5YjIwZ0p5NHVMM1YwYVd4ekp6dGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNG9hVzV6ZEdGdVkyVXBJSHRjYmlBZ2FXNXpkR0Z1WTJVdWNtVm5hWE4wWlhKSVpXeHdaWElvSjNkcGRHZ25MQ0JtZFc1amRHbHZiaWhqYjI1MFpYaDBMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lDQWdhV1lnS0dselJuVnVZM1JwYjI0b1kyOXVkR1Y0ZENrcElIc2dZMjl1ZEdWNGRDQTlJR052Ym5SbGVIUXVZMkZzYkNoMGFHbHpLVHNnZlZ4dVhHNGdJQ0FnYkdWMElHWnVJRDBnYjNCMGFXOXVjeTVtYmp0Y2JseHVJQ0FnSUdsbUlDZ2hhWE5GYlhCMGVTaGpiMjUwWlhoMEtTa2dlMXh1SUNBZ0lDQWdiR1YwSUdSaGRHRWdQU0J2Y0hScGIyNXpMbVJoZEdFN1hHNGdJQ0FnSUNCcFppQW9iM0IwYVc5dWN5NWtZWFJoSUNZbUlHOXdkR2x2Ym5NdWFXUnpLU0I3WEc0Z0lDQWdJQ0FnSUdSaGRHRWdQU0JqY21WaGRHVkdjbUZ0WlNodmNIUnBiMjV6TG1SaGRHRXBPMXh1SUNBZ0lDQWdJQ0JrWVhSaExtTnZiblJsZUhSUVlYUm9JRDBnWVhCd1pXNWtRMjl1ZEdWNGRGQmhkR2dvYjNCMGFXOXVjeTVrWVhSaExtTnZiblJsZUhSUVlYUm9MQ0J2Y0hScGIyNXpMbWxrYzFzd1hTazdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQm1iaWhqYjI1MFpYaDBMQ0I3WEc0Z0lDQWdJQ0FnSUdSaGRHRTZJR1JoZEdFc1hHNGdJQ0FnSUNBZ0lHSnNiMk5yVUdGeVlXMXpPaUJpYkc5amExQmhjbUZ0Y3loYlkyOXVkR1Y0ZEYwc0lGdGtZWFJoSUNZbUlHUmhkR0V1WTI5dWRHVjRkRkJoZEdoZEtWeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ2Y0hScGIyNXpMbWx1ZG1WeWMyVW9kR2hwY3lrN1hHNGdJQ0FnZlZ4dUlDQjlLVHRjYm4xY2JpSmRmUT09XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2hlbHBlcnMvd2l0aC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5yZWdpc3RlckRlZmF1bHREZWNvcmF0b3JzID0gcmVnaXN0ZXJEZWZhdWx0RGVjb3JhdG9ycztcbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9kZWNvcmF0b3JzSW5saW5lID0gcmVxdWlyZSgnLi9kZWNvcmF0b3JzL2lubGluZScpO1xuXG52YXIgX2RlY29yYXRvcnNJbmxpbmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVjb3JhdG9yc0lubGluZSk7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRGVmYXVsdERlY29yYXRvcnMoaW5zdGFuY2UpIHtcbiAgX2RlY29yYXRvcnNJbmxpbmUyWydkZWZhdWx0J10oaW5zdGFuY2UpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMMlJsWTI5eVlYUnZjbk11YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3WjBOQlFUSkNMSEZDUVVGeFFqczdPenRCUVVWNlF5eFRRVUZUTEhsQ1FVRjVRaXhEUVVGRExGRkJRVkVzUlVGQlJUdEJRVU5zUkN4blEwRkJaU3hSUVVGUkxFTkJRVU1zUTBGQlF6dERRVU14UWlJc0ltWnBiR1VpT2lKa1pXTnZjbUYwYjNKekxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVcxd2IzSjBJSEpsWjJsemRHVnlTVzVzYVc1bElHWnliMjBnSnk0dlpHVmpiM0poZEc5eWN5OXBibXhwYm1Vbk8xeHVYRzVsZUhCdmNuUWdablZ1WTNScGIyNGdjbVZuYVhOMFpYSkVaV1poZFd4MFJHVmpiM0poZEc5eWN5aHBibk4wWVc1alpTa2dlMXh1SUNCeVpXZHBjM1JsY2tsdWJHbHVaU2hwYm5OMFlXNWpaU2s3WEc1OVhHNWNiaUpkZlE9PVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9kZWNvcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgaW5zdGFuY2UucmVnaXN0ZXJEZWNvcmF0b3IoJ2lubGluZScsIGZ1bmN0aW9uIChmbiwgcHJvcHMsIGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIHZhciByZXQgPSBmbjtcbiAgICBpZiAoIXByb3BzLnBhcnRpYWxzKSB7XG4gICAgICBwcm9wcy5wYXJ0aWFscyA9IHt9O1xuICAgICAgcmV0ID0gZnVuY3Rpb24gKGNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHBhcnRpYWxzIHN0YWNrIGZyYW1lIHByaW9yIHRvIGV4ZWMuXG4gICAgICAgIHZhciBvcmlnaW5hbCA9IGNvbnRhaW5lci5wYXJ0aWFscztcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gX3V0aWxzLmV4dGVuZCh7fSwgb3JpZ2luYWwsIHByb3BzLnBhcnRpYWxzKTtcbiAgICAgICAgdmFyIHJldCA9IGZuKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgICAgICBjb250YWluZXIucGFydGlhbHMgPSBvcmlnaW5hbDtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJvcHMucGFydGlhbHNbb3B0aW9ucy5hcmdzWzBdXSA9IG9wdGlvbnMuZm47XG5cbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJSbFkyOXlZWFJ2Y25NdmFXNXNhVzVsTG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN096czdjVUpCUVhGQ0xGVkJRVlU3TzNGQ1FVVm9RaXhWUVVGVExGRkJRVkVzUlVGQlJUdEJRVU5vUXl4VlFVRlJMRU5CUVVNc2FVSkJRV2xDTEVOQlFVTXNVVUZCVVN4RlFVRkZMRlZCUVZNc1JVRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeFRRVUZUTEVWQlFVVXNUMEZCVHl4RlFVRkZPMEZCUXpORkxGRkJRVWtzUjBGQlJ5eEhRVUZITEVWQlFVVXNRMEZCUXp0QlFVTmlMRkZCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVVVGQlVTeEZRVUZGTzBGQlEyNUNMRmRCUVVzc1EwRkJReXhSUVVGUkxFZEJRVWNzUlVGQlJTeERRVUZETzBGQlEzQkNMRk5CUVVjc1IwRkJSeXhWUVVGVExFOUJRVThzUlVGQlJTeFBRVUZQTEVWQlFVVTdPMEZCUlM5Q0xGbEJRVWtzVVVGQlVTeEhRVUZITEZOQlFWTXNRMEZCUXl4UlFVRlJMRU5CUVVNN1FVRkRiRU1zYVVKQlFWTXNRMEZCUXl4UlFVRlJMRWRCUVVjc1kwRkJUeXhGUVVGRkxFVkJRVVVzVVVGQlVTeEZRVUZGTEV0QlFVc3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRCUVVNeFJDeFpRVUZKTEVkQlFVY3NSMEZCUnl4RlFVRkZMRU5CUVVNc1QwRkJUeXhGUVVGRkxFOUJRVThzUTBGQlF5eERRVUZETzBGQlF5OUNMR2xDUVVGVExFTkJRVU1zVVVGQlVTeEhRVUZITEZGQlFWRXNRMEZCUXp0QlFVTTVRaXhsUVVGUExFZEJRVWNzUTBGQlF6dFBRVU5hTEVOQlFVTTdTMEZEU0RzN1FVRkZSQ3hUUVVGTExFTkJRVU1zVVVGQlVTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eFBRVUZQTEVOQlFVTXNSVUZCUlN4RFFVRkRPenRCUVVVM1F5eFhRVUZQTEVkQlFVY3NRMEZCUXp0SFFVTmFMRU5CUVVNc1EwRkJRenREUVVOS0lpd2labWxzWlNJNkltbHViR2x1WlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbWx0Y0c5eWRDQjdaWGgwWlc1a2ZTQm1jbTl0SUNjdUxpOTFkR2xzY3ljN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUtHbHVjM1JoYm1ObEtTQjdYRzRnSUdsdWMzUmhibU5sTG5KbFoybHpkR1Z5UkdWamIzSmhkRzl5S0NkcGJteHBibVVuTENCbWRXNWpkR2x2YmlobWJpd2djSEp2Y0hNc0lHTnZiblJoYVc1bGNpd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lHeGxkQ0J5WlhRZ1BTQm1ianRjYmlBZ0lDQnBaaUFvSVhCeWIzQnpMbkJoY25ScFlXeHpLU0I3WEc0Z0lDQWdJQ0J3Y205d2N5NXdZWEowYVdGc2N5QTlJSHQ5TzF4dUlDQWdJQ0FnY21WMElEMGdablZ1WTNScGIyNG9ZMjl1ZEdWNGRDd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lDQWdJQ0F2THlCRGNtVmhkR1VnWVNCdVpYY2djR0Z5ZEdsaGJITWdjM1JoWTJzZ1puSmhiV1VnY0hKcGIzSWdkRzhnWlhobFl5NWNiaUFnSUNBZ0lDQWdiR1YwSUc5eWFXZHBibUZzSUQwZ1kyOXVkR0ZwYm1WeUxuQmhjblJwWVd4ek8xeHVJQ0FnSUNBZ0lDQmpiMjUwWVdsdVpYSXVjR0Z5ZEdsaGJITWdQU0JsZUhSbGJtUW9lMzBzSUc5eWFXZHBibUZzTENCd2NtOXdjeTV3WVhKMGFXRnNjeWs3WEc0Z0lDQWdJQ0FnSUd4bGRDQnlaWFFnUFNCbWJpaGpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnSUNBZ0lDQWdZMjl1ZEdGcGJtVnlMbkJoY25ScFlXeHpJRDBnYjNKcFoybHVZV3c3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhRN1hHNGdJQ0FnSUNCOU8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhCeWIzQnpMbkJoY25ScFlXeHpXMjl3ZEdsdmJuTXVZWEpuYzFzd1hWMGdQU0J2Y0hScGIyNXpMbVp1TzF4dVhHNGdJQ0FnY21WMGRYSnVJSEpsZER0Y2JpQWdmU2s3WEc1OVhHNGlYWDA9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL2RlY29yYXRvcnMvaW5saW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBsb2dnZXIgPSB7XG4gIG1ldGhvZE1hcDogWydkZWJ1ZycsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSxcbiAgbGV2ZWw6ICdpbmZvJyxcblxuICAvLyBNYXBzIGEgZ2l2ZW4gbGV2ZWwgdmFsdWUgdG8gdGhlIGBtZXRob2RNYXBgIGluZGV4ZXMgYWJvdmUuXG4gIGxvb2t1cExldmVsOiBmdW5jdGlvbiBsb29rdXBMZXZlbChsZXZlbCkge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgbGV2ZWxNYXAgPSBfdXRpbHMuaW5kZXhPZihsb2dnZXIubWV0aG9kTWFwLCBsZXZlbC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIGlmIChsZXZlbE1hcCA+PSAwKSB7XG4gICAgICAgIGxldmVsID0gbGV2ZWxNYXA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXZlbCA9IHBhcnNlSW50KGxldmVsLCAxMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxldmVsO1xuICB9LFxuXG4gIC8vIENhbiBiZSBvdmVycmlkZGVuIGluIHRoZSBob3N0IGVudmlyb25tZW50XG4gIGxvZzogZnVuY3Rpb24gbG9nKGxldmVsKSB7XG4gICAgbGV2ZWwgPSBsb2dnZXIubG9va3VwTGV2ZWwobGV2ZWwpO1xuXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBsb2dnZXIubG9va3VwTGV2ZWwobG9nZ2VyLmxldmVsKSA8PSBsZXZlbCkge1xuICAgICAgdmFyIG1ldGhvZCA9IGxvZ2dlci5tZXRob2RNYXBbbGV2ZWxdO1xuICAgICAgaWYgKCFjb25zb2xlW21ldGhvZF0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIG1ldGhvZCA9ICdsb2cnO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWVzc2FnZSA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgbWVzc2FnZVtfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIGNvbnNvbGVbbWV0aG9kXS5hcHBseShjb25zb2xlLCBtZXNzYWdlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBsb2dnZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDJ4dloyZGxjaTVxY3lKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN08zRkNRVUZ6UWl4VFFVRlRPenRCUVVVdlFpeEpRVUZKTEUxQlFVMHNSMEZCUnp0QlFVTllMRmRCUVZNc1JVRkJSU3hEUVVGRExFOUJRVThzUlVGQlJTeE5RVUZOTEVWQlFVVXNUVUZCVFN4RlFVRkZMRTlCUVU4c1EwRkJRenRCUVVNM1F5eFBRVUZMTEVWQlFVVXNUVUZCVFRzN08wRkJSMklzWVVGQlZ5eEZRVUZGTEhGQ1FVRlRMRXRCUVVzc1JVRkJSVHRCUVVNelFpeFJRVUZKTEU5QlFVOHNTMEZCU3l4TFFVRkxMRkZCUVZFc1JVRkJSVHRCUVVNM1FpeFZRVUZKTEZGQlFWRXNSMEZCUnl4bFFVRlJMRTFCUVUwc1EwRkJReXhUUVVGVExFVkJRVVVzUzBGQlN5eERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRMRU5CUVVNN1FVRkRPVVFzVlVGQlNTeFJRVUZSTEVsQlFVa3NRMEZCUXl4RlFVRkZPMEZCUTJwQ0xHRkJRVXNzUjBGQlJ5eFJRVUZSTEVOQlFVTTdUMEZEYkVJc1RVRkJUVHRCUVVOTUxHRkJRVXNzUjBGQlJ5eFJRVUZSTEVOQlFVTXNTMEZCU3l4RlFVRkZMRVZCUVVVc1EwRkJReXhEUVVGRE8wOUJRemRDTzB0QlEwWTdPMEZCUlVRc1YwRkJUeXhMUVVGTExFTkJRVU03UjBGRFpEczdPMEZCUjBRc1MwRkJSeXhGUVVGRkxHRkJRVk1zUzBGQlN5eEZRVUZqTzBGQlF5OUNMRk5CUVVzc1IwRkJSeXhOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEV0QlFVc3NRMEZCUXl4RFFVRkRPenRCUVVWc1F5eFJRVUZKTEU5QlFVOHNUMEZCVHl4TFFVRkxMRmRCUVZjc1NVRkJTU3hOUVVGTkxFTkJRVU1zVjBGQlZ5eERRVUZETEUxQlFVMHNRMEZCUXl4TFFVRkxMRU5CUVVNc1NVRkJTU3hMUVVGTExFVkJRVVU3UVVGREwwVXNWVUZCU1N4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRExGTkJRVk1zUTBGQlF5eExRVUZMTEVOQlFVTXNRMEZCUXp0QlFVTnlReXhWUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZPenRCUVVOd1FpeGpRVUZOTEVkQlFVY3NTMEZCU3l4RFFVRkRPMDlCUTJoQ096dDNRMEZRYlVJc1QwRkJUenRCUVVGUUxHVkJRVTg3T3p0QlFWRXpRaXhoUVVGUExFTkJRVU1zVFVGQlRTeFBRVUZETEVOQlFXWXNUMEZCVHl4RlFVRlpMRTlCUVU4c1EwRkJReXhEUVVGRE8wdEJRemRDTzBkQlEwWTdRMEZEUml4RFFVRkRPenR4UWtGRllTeE5RVUZOSWl3aVptbHNaU0k2SW14dloyZGxjaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN2FXNWtaWGhQWm4wZ1puSnZiU0FuTGk5MWRHbHNjeWM3WEc1Y2JteGxkQ0JzYjJkblpYSWdQU0I3WEc0Z0lHMWxkR2h2WkUxaGNEb2dXeWRrWldKMVp5Y3NJQ2RwYm1adkp5d2dKM2RoY200bkxDQW5aWEp5YjNJblhTeGNiaUFnYkdWMlpXdzZJQ2RwYm1adkp5eGNibHh1SUNBdkx5Qk5ZWEJ6SUdFZ1oybDJaVzRnYkdWMlpXd2dkbUZzZFdVZ2RHOGdkR2hsSUdCdFpYUm9iMlJOWVhCZ0lHbHVaR1Y0WlhNZ1lXSnZkbVV1WEc0Z0lHeHZiMnQxY0V4bGRtVnNPaUJtZFc1amRHbHZiaWhzWlhabGJDa2dlMXh1SUNBZ0lHbG1JQ2gwZVhCbGIyWWdiR1YyWld3Z1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdJQ0JzWlhRZ2JHVjJaV3hOWVhBZ1BTQnBibVJsZUU5bUtHeHZaMmRsY2k1dFpYUm9iMlJOWVhBc0lHeGxkbVZzTG5SdlRHOTNaWEpEWVhObEtDa3BPMXh1SUNBZ0lDQWdhV1lnS0d4bGRtVnNUV0Z3SUQ0OUlEQXBJSHRjYmlBZ0lDQWdJQ0FnYkdWMlpXd2dQU0JzWlhabGJFMWhjRHRjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJR3hsZG1Wc0lEMGdjR0Z5YzJWSmJuUW9iR1YyWld3c0lERXdLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z2JHVjJaV3c3WEc0Z0lIMHNYRzVjYmlBZ0x5OGdRMkZ1SUdKbElHOTJaWEp5YVdSa1pXNGdhVzRnZEdobElHaHZjM1FnWlc1MmFYSnZibTFsYm5SY2JpQWdiRzluT2lCbWRXNWpkR2x2Ymloc1pYWmxiQ3dnTGk0dWJXVnpjMkZuWlNrZ2UxeHVJQ0FnSUd4bGRtVnNJRDBnYkc5bloyVnlMbXh2YjJ0MWNFeGxkbVZzS0d4bGRtVnNLVHRjYmx4dUlDQWdJR2xtSUNoMGVYQmxiMllnWTI5dWMyOXNaU0FoUFQwZ0ozVnVaR1ZtYVc1bFpDY2dKaVlnYkc5bloyVnlMbXh2YjJ0MWNFeGxkbVZzS0d4dloyZGxjaTVzWlhabGJDa2dQRDBnYkdWMlpXd3BJSHRjYmlBZ0lDQWdJR3hsZENCdFpYUm9iMlFnUFNCc2IyZG5aWEl1YldWMGFHOWtUV0Z3VzJ4bGRtVnNYVHRjYmlBZ0lDQWdJR2xtSUNnaFkyOXVjMjlzWlZ0dFpYUm9iMlJkS1NCN0lDQWdMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRiR2x1WlNCdWJ5MWpiMjV6YjJ4bFhHNGdJQ0FnSUNBZ0lHMWxkR2h2WkNBOUlDZHNiMmNuTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnWTI5dWMyOXNaVnR0WlhSb2IyUmRLQzR1TG0xbGMzTmhaMlVwT3lBZ0lDQXZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXNhVzVsSUc1dkxXTnZibk52YkdWY2JpQWdJQ0I5WEc0Z0lIMWNibjA3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUd4dloyZGxjanRjYmlKZGZRPT1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9oYW5kbGViYXJzL2Rpc3QvY2pzL2hhbmRsZWJhcnMvbG9nZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBCdWlsZCBvdXQgb3VyIGJhc2ljIFNhZmVTdHJpbmcgdHlwZVxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZnVuY3Rpb24gU2FmZVN0cmluZyhzdHJpbmcpIHtcbiAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gU2FmZVN0cmluZy5wcm90b3R5cGUudG9IVE1MID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJycgKyB0aGlzLnN0cmluZztcbn07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFNhZmVTdHJpbmc7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMeTR1THk0dUwyeHBZaTlvWVc1a2JHVmlZWEp6TDNOaFptVXRjM1J5YVc1bkxtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3UVVGRFFTeFRRVUZUTEZWQlFWVXNRMEZCUXl4TlFVRk5MRVZCUVVVN1FVRkRNVUlzVFVGQlNTeERRVUZETEUxQlFVMHNSMEZCUnl4TlFVRk5MRU5CUVVNN1EwRkRkRUk3TzBGQlJVUXNWVUZCVlN4RFFVRkRMRk5CUVZNc1EwRkJReXhSUVVGUkxFZEJRVWNzVlVGQlZTeERRVUZETEZOQlFWTXNRMEZCUXl4TlFVRk5MRWRCUVVjc1dVRkJWenRCUVVOMlJTeFRRVUZQTEVWQlFVVXNSMEZCUnl4SlFVRkpMRU5CUVVNc1RVRkJUU3hEUVVGRE8wTkJRM3BDTEVOQlFVTTdPM0ZDUVVWaExGVkJRVlVpTENKbWFXeGxJam9pYzJGbVpTMXpkSEpwYm1jdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2THlCQ2RXbHNaQ0J2ZFhRZ2IzVnlJR0poYzJsaklGTmhabVZUZEhKcGJtY2dkSGx3WlZ4dVpuVnVZM1JwYjI0Z1UyRm1aVk4wY21sdVp5aHpkSEpwYm1jcElIdGNiaUFnZEdocGN5NXpkSEpwYm1jZ1BTQnpkSEpwYm1jN1hHNTlYRzVjYmxOaFptVlRkSEpwYm1jdWNISnZkRzkwZVhCbExuUnZVM1J5YVc1bklEMGdVMkZtWlZOMGNtbHVaeTV3Y205MGIzUjVjR1V1ZEc5SVZFMU1JRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJSEpsZEhWeWJpQW5KeUFySUhSb2FYTXVjM1J5YVc1bk8xeHVmVHRjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnVTJGbVpWTjBjbWx1Wnp0Y2JpSmRmUT09XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3NhZmUtc3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmNoZWNrUmV2aXNpb24gPSBjaGVja1JldmlzaW9uO1xuZXhwb3J0cy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuZXhwb3J0cy53cmFwUHJvZ3JhbSA9IHdyYXBQcm9ncmFtO1xuZXhwb3J0cy5yZXNvbHZlUGFydGlhbCA9IHJlc29sdmVQYXJ0aWFsO1xuZXhwb3J0cy5pbnZva2VQYXJ0aWFsID0gaW52b2tlUGFydGlhbDtcbmV4cG9ydHMubm9vcCA9IG5vb3A7XG4vLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKG9iaikgeyBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7IHJldHVybiBvYmo7IH0gZWxzZSB7IHZhciBuZXdPYmogPSB7fTsgaWYgKG9iaiAhPSBudWxsKSB7IGZvciAodmFyIGtleSBpbiBvYmopIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07IH0gfSBuZXdPYmpbJ2RlZmF1bHQnXSA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbnZhciBfdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBVdGlscyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF91dGlscyk7XG5cbnZhciBfZXhjZXB0aW9uID0gcmVxdWlyZSgnLi9leGNlcHRpb24nKTtcblxudmFyIF9leGNlcHRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhjZXB0aW9uKTtcblxudmFyIF9iYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG5cbmZ1bmN0aW9uIGNoZWNrUmV2aXNpb24oY29tcGlsZXJJbmZvKSB7XG4gIHZhciBjb21waWxlclJldmlzaW9uID0gY29tcGlsZXJJbmZvICYmIGNvbXBpbGVySW5mb1swXSB8fCAxLFxuICAgICAgY3VycmVudFJldmlzaW9uID0gX2Jhc2UuQ09NUElMRVJfUkVWSVNJT047XG5cbiAgaWYgKGNvbXBpbGVyUmV2aXNpb24gIT09IGN1cnJlbnRSZXZpc2lvbikge1xuICAgIGlmIChjb21waWxlclJldmlzaW9uIDwgY3VycmVudFJldmlzaW9uKSB7XG4gICAgICB2YXIgcnVudGltZVZlcnNpb25zID0gX2Jhc2UuUkVWSVNJT05fQ0hBTkdFU1tjdXJyZW50UmV2aXNpb25dLFxuICAgICAgICAgIGNvbXBpbGVyVmVyc2lvbnMgPSBfYmFzZS5SRVZJU0lPTl9DSEFOR0VTW2NvbXBpbGVyUmV2aXNpb25dO1xuICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1RlbXBsYXRlIHdhcyBwcmVjb21waWxlZCB3aXRoIGFuIG9sZGVyIHZlcnNpb24gb2YgSGFuZGxlYmFycyB0aGFuIHRoZSBjdXJyZW50IHJ1bnRpbWUuICcgKyAnUGxlYXNlIHVwZGF0ZSB5b3VyIHByZWNvbXBpbGVyIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIHJ1bnRpbWVWZXJzaW9ucyArICcpIG9yIGRvd25ncmFkZSB5b3VyIHJ1bnRpbWUgdG8gYW4gb2xkZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVyVmVyc2lvbnMgKyAnKS4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVXNlIHRoZSBlbWJlZGRlZCB2ZXJzaW9uIGluZm8gc2luY2UgdGhlIHJ1bnRpbWUgZG9lc24ndCBrbm93IGFib3V0IHRoaXMgcmV2aXNpb24geWV0XG4gICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVGVtcGxhdGUgd2FzIHByZWNvbXBpbGVkIHdpdGggYSBuZXdlciB2ZXJzaW9uIG9mIEhhbmRsZWJhcnMgdGhhbiB0aGUgY3VycmVudCBydW50aW1lLiAnICsgJ1BsZWFzZSB1cGRhdGUgeW91ciBydW50aW1lIHRvIGEgbmV3ZXIgdmVyc2lvbiAoJyArIGNvbXBpbGVySW5mb1sxXSArICcpLicpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0ZW1wbGF0ZSh0ZW1wbGF0ZVNwZWMsIGVudikge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoIWVudikge1xuICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdObyBlbnZpcm9ubWVudCBwYXNzZWQgdG8gdGVtcGxhdGUnKTtcbiAgfVxuICBpZiAoIXRlbXBsYXRlU3BlYyB8fCAhdGVtcGxhdGVTcGVjLm1haW4pIHtcbiAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnVW5rbm93biB0ZW1wbGF0ZSBvYmplY3Q6ICcgKyB0eXBlb2YgdGVtcGxhdGVTcGVjKTtcbiAgfVxuXG4gIHRlbXBsYXRlU3BlYy5tYWluLmRlY29yYXRvciA9IHRlbXBsYXRlU3BlYy5tYWluX2Q7XG5cbiAgLy8gTm90ZTogVXNpbmcgZW52LlZNIHJlZmVyZW5jZXMgcmF0aGVyIHRoYW4gbG9jYWwgdmFyIHJlZmVyZW5jZXMgdGhyb3VnaG91dCB0aGlzIHNlY3Rpb24gdG8gYWxsb3dcbiAgLy8gZm9yIGV4dGVybmFsIHVzZXJzIHRvIG92ZXJyaWRlIHRoZXNlIGFzIHBzdWVkby1zdXBwb3J0ZWQgQVBJcy5cbiAgZW52LlZNLmNoZWNrUmV2aXNpb24odGVtcGxhdGVTcGVjLmNvbXBpbGVyKTtcblxuICBmdW5jdGlvbiBpbnZva2VQYXJ0aWFsV3JhcHBlcihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgICAgY29udGV4dCA9IFV0aWxzLmV4dGVuZCh7fSwgY29udGV4dCwgb3B0aW9ucy5oYXNoKTtcbiAgICAgIGlmIChvcHRpb25zLmlkcykge1xuICAgICAgICBvcHRpb25zLmlkc1swXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFydGlhbCA9IGVudi5WTS5yZXNvbHZlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIHZhciByZXN1bHQgPSBlbnYuVk0uaW52b2tlUGFydGlhbC5jYWxsKHRoaXMsIHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHJlc3VsdCA9PSBudWxsICYmIGVudi5jb21waWxlKSB7XG4gICAgICBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV0gPSBlbnYuY29tcGlsZShwYXJ0aWFsLCB0ZW1wbGF0ZVNwZWMuY29tcGlsZXJPcHRpb25zLCBlbnYpO1xuICAgICAgcmVzdWx0ID0gb3B0aW9ucy5wYXJ0aWFsc1tvcHRpb25zLm5hbWVdKGNvbnRleHQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICE9IG51bGwpIHtcbiAgICAgIGlmIChvcHRpb25zLmluZGVudCkge1xuICAgICAgICB2YXIgbGluZXMgPSByZXN1bHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIGlmICghbGluZXNbaV0gJiYgaSArIDEgPT09IGwpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpbmVzW2ldID0gb3B0aW9ucy5pbmRlbnQgKyBsaW5lc1tpXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBsaW5lcy5qb2luKCdcXG4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBfZXhjZXB0aW9uMlsnZGVmYXVsdCddKCdUaGUgcGFydGlhbCAnICsgb3B0aW9ucy5uYW1lICsgJyBjb3VsZCBub3QgYmUgY29tcGlsZWQgd2hlbiBydW5uaW5nIGluIHJ1bnRpbWUtb25seSBtb2RlJyk7XG4gICAgfVxuICB9XG5cbiAgLy8gSnVzdCBhZGQgd2F0ZXJcbiAgdmFyIGNvbnRhaW5lciA9IHtcbiAgICBzdHJpY3Q6IGZ1bmN0aW9uIHN0cmljdChvYmosIG5hbWUpIHtcbiAgICAgIGlmICghKG5hbWUgaW4gb2JqKSkge1xuICAgICAgICB0aHJvdyBuZXcgX2V4Y2VwdGlvbjJbJ2RlZmF1bHQnXSgnXCInICsgbmFtZSArICdcIiBub3QgZGVmaW5lZCBpbiAnICsgb2JqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBsb29rdXA6IGZ1bmN0aW9uIGxvb2t1cChkZXB0aHMsIG5hbWUpIHtcbiAgICAgIHZhciBsZW4gPSBkZXB0aHMubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoZGVwdGhzW2ldICYmIGRlcHRoc1tpXVtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGRlcHRoc1tpXVtuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbGFtYmRhOiBmdW5jdGlvbiBsYW1iZGEoY3VycmVudCwgY29udGV4dCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBjdXJyZW50ID09PSAnZnVuY3Rpb24nID8gY3VycmVudC5jYWxsKGNvbnRleHQpIDogY3VycmVudDtcbiAgICB9LFxuXG4gICAgZXNjYXBlRXhwcmVzc2lvbjogVXRpbHMuZXNjYXBlRXhwcmVzc2lvbixcbiAgICBpbnZva2VQYXJ0aWFsOiBpbnZva2VQYXJ0aWFsV3JhcHBlcixcblxuICAgIGZuOiBmdW5jdGlvbiBmbihpKSB7XG4gICAgICB2YXIgcmV0ID0gdGVtcGxhdGVTcGVjW2ldO1xuICAgICAgcmV0LmRlY29yYXRvciA9IHRlbXBsYXRlU3BlY1tpICsgJ19kJ107XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0sXG5cbiAgICBwcm9ncmFtczogW10sXG4gICAgcHJvZ3JhbTogZnVuY3Rpb24gcHJvZ3JhbShpLCBkYXRhLCBkZWNsYXJlZEJsb2NrUGFyYW1zLCBibG9ja1BhcmFtcywgZGVwdGhzKSB7XG4gICAgICB2YXIgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldLFxuICAgICAgICAgIGZuID0gdGhpcy5mbihpKTtcbiAgICAgIGlmIChkYXRhIHx8IGRlcHRocyB8fCBibG9ja1BhcmFtcyB8fCBkZWNsYXJlZEJsb2NrUGFyYW1zKSB7XG4gICAgICAgIHByb2dyYW1XcmFwcGVyID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4sIGRhdGEsIGRlY2xhcmVkQmxvY2tQYXJhbXMsIGJsb2NrUGFyYW1zLCBkZXB0aHMpO1xuICAgICAgfSBlbHNlIGlmICghcHJvZ3JhbVdyYXBwZXIpIHtcbiAgICAgICAgcHJvZ3JhbVdyYXBwZXIgPSB0aGlzLnByb2dyYW1zW2ldID0gd3JhcFByb2dyYW0odGhpcywgaSwgZm4pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2dyYW1XcmFwcGVyO1xuICAgIH0sXG5cbiAgICBkYXRhOiBmdW5jdGlvbiBkYXRhKHZhbHVlLCBkZXB0aCkge1xuICAgICAgd2hpbGUgKHZhbHVlICYmIGRlcHRoLS0pIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5fcGFyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgbWVyZ2U6IGZ1bmN0aW9uIG1lcmdlKHBhcmFtLCBjb21tb24pIHtcbiAgICAgIHZhciBvYmogPSBwYXJhbSB8fCBjb21tb247XG5cbiAgICAgIGlmIChwYXJhbSAmJiBjb21tb24gJiYgcGFyYW0gIT09IGNvbW1vbikge1xuICAgICAgICBvYmogPSBVdGlscy5leHRlbmQoe30sIGNvbW1vbiwgcGFyYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG4gICAgLy8gQW4gZW1wdHkgb2JqZWN0IHRvIHVzZSBhcyByZXBsYWNlbWVudCBmb3IgbnVsbC1jb250ZXh0c1xuICAgIG51bGxDb250ZXh0OiBPYmplY3Quc2VhbCh7fSksXG5cbiAgICBub29wOiBlbnYuVk0ubm9vcCxcbiAgICBjb21waWxlckluZm86IHRlbXBsYXRlU3BlYy5jb21waWxlclxuICB9O1xuXG4gIGZ1bmN0aW9uIHJldChjb250ZXh0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgcmV0Ll9zZXR1cChvcHRpb25zKTtcbiAgICBpZiAoIW9wdGlvbnMucGFydGlhbCAmJiB0ZW1wbGF0ZVNwZWMudXNlRGF0YSkge1xuICAgICAgZGF0YSA9IGluaXREYXRhKGNvbnRleHQsIGRhdGEpO1xuICAgIH1cbiAgICB2YXIgZGVwdGhzID0gdW5kZWZpbmVkLFxuICAgICAgICBibG9ja1BhcmFtcyA9IHRlbXBsYXRlU3BlYy51c2VCbG9ja1BhcmFtcyA/IFtdIDogdW5kZWZpbmVkO1xuICAgIGlmICh0ZW1wbGF0ZVNwZWMudXNlRGVwdGhzKSB7XG4gICAgICBpZiAob3B0aW9ucy5kZXB0aHMpIHtcbiAgICAgICAgZGVwdGhzID0gY29udGV4dCAhPSBvcHRpb25zLmRlcHRoc1swXSA/IFtjb250ZXh0XS5jb25jYXQob3B0aW9ucy5kZXB0aHMpIDogb3B0aW9ucy5kZXB0aHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXB0aHMgPSBbY29udGV4dF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpbihjb250ZXh0IC8qLCBvcHRpb25zKi8pIHtcbiAgICAgIHJldHVybiAnJyArIHRlbXBsYXRlU3BlYy5tYWluKGNvbnRhaW5lciwgY29udGV4dCwgY29udGFpbmVyLmhlbHBlcnMsIGNvbnRhaW5lci5wYXJ0aWFscywgZGF0YSwgYmxvY2tQYXJhbXMsIGRlcHRocyk7XG4gICAgfVxuICAgIG1haW4gPSBleGVjdXRlRGVjb3JhdG9ycyh0ZW1wbGF0ZVNwZWMubWFpbiwgbWFpbiwgY29udGFpbmVyLCBvcHRpb25zLmRlcHRocyB8fCBbXSwgZGF0YSwgYmxvY2tQYXJhbXMpO1xuICAgIHJldHVybiBtYWluKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG4gIHJldC5pc1RvcCA9IHRydWU7XG5cbiAgcmV0Ll9zZXR1cCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLnBhcnRpYWwpIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMuaGVscGVycywgZW52LmhlbHBlcnMpO1xuXG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gY29udGFpbmVyLm1lcmdlKG9wdGlvbnMucGFydGlhbHMsIGVudi5wYXJ0aWFscyk7XG4gICAgICB9XG4gICAgICBpZiAodGVtcGxhdGVTcGVjLnVzZVBhcnRpYWwgfHwgdGVtcGxhdGVTcGVjLnVzZURlY29yYXRvcnMpIHtcbiAgICAgICAgY29udGFpbmVyLmRlY29yYXRvcnMgPSBjb250YWluZXIubWVyZ2Uob3B0aW9ucy5kZWNvcmF0b3JzLCBlbnYuZGVjb3JhdG9ycyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5oZWxwZXJzID0gb3B0aW9ucy5oZWxwZXJzO1xuICAgICAgY29udGFpbmVyLnBhcnRpYWxzID0gb3B0aW9ucy5wYXJ0aWFscztcbiAgICAgIGNvbnRhaW5lci5kZWNvcmF0b3JzID0gb3B0aW9ucy5kZWNvcmF0b3JzO1xuICAgIH1cbiAgfTtcblxuICByZXQuX2NoaWxkID0gZnVuY3Rpb24gKGksIGRhdGEsIGJsb2NrUGFyYW1zLCBkZXB0aHMpIHtcbiAgICBpZiAodGVtcGxhdGVTcGVjLnVzZUJsb2NrUGFyYW1zICYmICFibG9ja1BhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ211c3QgcGFzcyBibG9jayBwYXJhbXMnKTtcbiAgICB9XG4gICAgaWYgKHRlbXBsYXRlU3BlYy51c2VEZXB0aHMgJiYgIWRlcHRocykge1xuICAgICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ211c3QgcGFzcyBwYXJlbnQgZGVwdGhzJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdyYXBQcm9ncmFtKGNvbnRhaW5lciwgaSwgdGVtcGxhdGVTcGVjW2ldLCBkYXRhLCAwLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgfTtcbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gd3JhcFByb2dyYW0oY29udGFpbmVyLCBpLCBmbiwgZGF0YSwgZGVjbGFyZWRCbG9ja1BhcmFtcywgYmxvY2tQYXJhbXMsIGRlcHRocykge1xuICBmdW5jdGlvbiBwcm9nKGNvbnRleHQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuXG4gICAgdmFyIGN1cnJlbnREZXB0aHMgPSBkZXB0aHM7XG4gICAgaWYgKGRlcHRocyAmJiBjb250ZXh0ICE9IGRlcHRoc1swXSAmJiAhKGNvbnRleHQgPT09IGNvbnRhaW5lci5udWxsQ29udGV4dCAmJiBkZXB0aHNbMF0gPT09IG51bGwpKSB7XG4gICAgICBjdXJyZW50RGVwdGhzID0gW2NvbnRleHRdLmNvbmNhdChkZXB0aHMpO1xuICAgIH1cblxuICAgIHJldHVybiBmbihjb250YWluZXIsIGNvbnRleHQsIGNvbnRhaW5lci5oZWxwZXJzLCBjb250YWluZXIucGFydGlhbHMsIG9wdGlvbnMuZGF0YSB8fCBkYXRhLCBibG9ja1BhcmFtcyAmJiBbb3B0aW9ucy5ibG9ja1BhcmFtc10uY29uY2F0KGJsb2NrUGFyYW1zKSwgY3VycmVudERlcHRocyk7XG4gIH1cblxuICBwcm9nID0gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcyk7XG5cbiAgcHJvZy5wcm9ncmFtID0gaTtcbiAgcHJvZy5kZXB0aCA9IGRlcHRocyA/IGRlcHRocy5sZW5ndGggOiAwO1xuICBwcm9nLmJsb2NrUGFyYW1zID0gZGVjbGFyZWRCbG9ja1BhcmFtcyB8fCAwO1xuICByZXR1cm4gcHJvZztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICBpZiAoIXBhcnRpYWwpIHtcbiAgICBpZiAob3B0aW9ucy5uYW1lID09PSAnQHBhcnRpYWwtYmxvY2snKSB7XG4gICAgICBwYXJ0aWFsID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnRpYWwgPSBvcHRpb25zLnBhcnRpYWxzW29wdGlvbnMubmFtZV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCFwYXJ0aWFsLmNhbGwgJiYgIW9wdGlvbnMubmFtZSkge1xuICAgIC8vIFRoaXMgaXMgYSBkeW5hbWljIHBhcnRpYWwgdGhhdCByZXR1cm5lZCBhIHN0cmluZ1xuICAgIG9wdGlvbnMubmFtZSA9IHBhcnRpYWw7XG4gICAgcGFydGlhbCA9IG9wdGlvbnMucGFydGlhbHNbcGFydGlhbF07XG4gIH1cbiAgcmV0dXJuIHBhcnRpYWw7XG59XG5cbmZ1bmN0aW9uIGludm9rZVBhcnRpYWwocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucykge1xuICAvLyBVc2UgdGhlIGN1cnJlbnQgY2xvc3VyZSBjb250ZXh0IHRvIHNhdmUgdGhlIHBhcnRpYWwtYmxvY2sgaWYgdGhpcyBwYXJ0aWFsXG4gIHZhciBjdXJyZW50UGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhICYmIG9wdGlvbnMuZGF0YVsncGFydGlhbC1ibG9jayddO1xuICBvcHRpb25zLnBhcnRpYWwgPSB0cnVlO1xuICBpZiAob3B0aW9ucy5pZHMpIHtcbiAgICBvcHRpb25zLmRhdGEuY29udGV4dFBhdGggPSBvcHRpb25zLmlkc1swXSB8fCBvcHRpb25zLmRhdGEuY29udGV4dFBhdGg7XG4gIH1cblxuICB2YXIgcGFydGlhbEJsb2NrID0gdW5kZWZpbmVkO1xuICBpZiAob3B0aW9ucy5mbiAmJiBvcHRpb25zLmZuICE9PSBub29wKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIG9wdGlvbnMuZGF0YSA9IF9iYXNlLmNyZWF0ZUZyYW1lKG9wdGlvbnMuZGF0YSk7XG4gICAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIGdldCBhY2Nlc3MgdG8gY3VycmVudFBhcnRpYWxCbG9jayBmcm9tIHRoZSBjbG9zdXJlXG4gICAgICB2YXIgZm4gPSBvcHRpb25zLmZuO1xuICAgICAgcGFydGlhbEJsb2NrID0gb3B0aW9ucy5kYXRhWydwYXJ0aWFsLWJsb2NrJ10gPSBmdW5jdGlvbiBwYXJ0aWFsQmxvY2tXcmFwcGVyKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAvLyBSZXN0b3JlIHRoZSBwYXJ0aWFsLWJsb2NrIGZyb20gdGhlIGNsb3N1cmUgZm9yIHRoZSBleGVjdXRpb24gb2YgdGhlIGJsb2NrXG4gICAgICAgIC8vIGkuZS4gdGhlIHBhcnQgaW5zaWRlIHRoZSBibG9jayBvZiB0aGUgcGFydGlhbCBjYWxsLlxuICAgICAgICBvcHRpb25zLmRhdGEgPSBfYmFzZS5jcmVhdGVGcmFtZShvcHRpb25zLmRhdGEpO1xuICAgICAgICBvcHRpb25zLmRhdGFbJ3BhcnRpYWwtYmxvY2snXSA9IGN1cnJlbnRQYXJ0aWFsQmxvY2s7XG4gICAgICAgIHJldHVybiBmbihjb250ZXh0LCBvcHRpb25zKTtcbiAgICAgIH07XG4gICAgICBpZiAoZm4ucGFydGlhbHMpIHtcbiAgICAgICAgb3B0aW9ucy5wYXJ0aWFscyA9IFV0aWxzLmV4dGVuZCh7fSwgb3B0aW9ucy5wYXJ0aWFscywgZm4ucGFydGlhbHMpO1xuICAgICAgfVxuICAgIH0pKCk7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkICYmIHBhcnRpYWxCbG9jaykge1xuICAgIHBhcnRpYWwgPSBwYXJ0aWFsQmxvY2s7XG4gIH1cblxuICBpZiAocGFydGlhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IF9leGNlcHRpb24yWydkZWZhdWx0J10oJ1RoZSBwYXJ0aWFsICcgKyBvcHRpb25zLm5hbWUgKyAnIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9IGVsc2UgaWYgKHBhcnRpYWwgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgIHJldHVybiBwYXJ0aWFsKGNvbnRleHQsIG9wdGlvbnMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gaW5pdERhdGEoY29udGV4dCwgZGF0YSkge1xuICBpZiAoIWRhdGEgfHwgISgncm9vdCcgaW4gZGF0YSkpIHtcbiAgICBkYXRhID0gZGF0YSA/IF9iYXNlLmNyZWF0ZUZyYW1lKGRhdGEpIDoge307XG4gICAgZGF0YS5yb290ID0gY29udGV4dDtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gZXhlY3V0ZURlY29yYXRvcnMoZm4sIHByb2csIGNvbnRhaW5lciwgZGVwdGhzLCBkYXRhLCBibG9ja1BhcmFtcykge1xuICBpZiAoZm4uZGVjb3JhdG9yKSB7XG4gICAgdmFyIHByb3BzID0ge307XG4gICAgcHJvZyA9IGZuLmRlY29yYXRvcihwcm9nLCBwcm9wcywgY29udGFpbmVyLCBkZXB0aHMgJiYgZGVwdGhzWzBdLCBkYXRhLCBibG9ja1BhcmFtcywgZGVwdGhzKTtcbiAgICBVdGlscy5leHRlbmQocHJvZywgcHJvcHMpO1xuICB9XG4gIHJldHVybiBwcm9nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUx5NHVMeTR1TDJ4cFlpOW9ZVzVrYkdWaVlYSnpMM0oxYm5ScGJXVXVhbk1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096czdPenM3T3pzN096czdjVUpCUVhWQ0xGTkJRVk03TzBsQlFYQkNMRXRCUVVzN08zbENRVU5MTEdGQlFXRTdPenM3YjBKQlF6aENMRkZCUVZFN08wRkJSV3hGTEZOQlFWTXNZVUZCWVN4RFFVRkRMRmxCUVZrc1JVRkJSVHRCUVVNeFF5eE5RVUZOTEdkQ1FVRm5RaXhIUVVGSExGbEJRVmtzU1VGQlNTeFpRVUZaTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJRenROUVVOMlJDeGxRVUZsTERCQ1FVRnZRaXhEUVVGRE96dEJRVVV4UXl4TlFVRkpMR2RDUVVGblFpeExRVUZMTEdWQlFXVXNSVUZCUlR0QlFVTjRReXhSUVVGSkxHZENRVUZuUWl4SFFVRkhMR1ZCUVdVc1JVRkJSVHRCUVVOMFF5eFZRVUZOTEdWQlFXVXNSMEZCUnl4MVFrRkJhVUlzWlVGQlpTeERRVUZETzFWQlEyNUVMR2RDUVVGblFpeEhRVUZITEhWQ1FVRnBRaXhuUWtGQlowSXNRMEZCUXl4RFFVRkRPMEZCUXpWRUxGbEJRVTBzTWtKQlFXTXNlVVpCUVhsR0xFZEJRM1pITEhGRVFVRnhSQ3hIUVVGSExHVkJRV1VzUjBGQlJ5eHRSRUZCYlVRc1IwRkJSeXhuUWtGQlowSXNSMEZCUnl4SlFVRkpMRU5CUVVNc1EwRkJRenRMUVVOb1N5eE5RVUZOT3p0QlFVVk1MRmxCUVUwc01rSkJRV01zZDBaQlFYZEdMRWRCUTNSSExHbEVRVUZwUkN4SFFVRkhMRmxCUVZrc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNRMEZCUXp0TFFVTnVSanRIUVVOR08wTkJRMFk3TzBGQlJVMHNVMEZCVXl4UlFVRlJMRU5CUVVNc1dVRkJXU3hGUVVGRkxFZEJRVWNzUlVGQlJUczdRVUZGTVVNc1RVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU5TTEZWQlFVMHNNa0pCUVdNc2JVTkJRVzFETEVOQlFVTXNRMEZCUXp0SFFVTXhSRHRCUVVORUxFMUJRVWtzUTBGQlF5eFpRVUZaTEVsQlFVa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1NVRkJTU3hGUVVGRk8wRkJRM1pETEZWQlFVMHNNa0pCUVdNc01rSkJRVEpDTEVkQlFVY3NUMEZCVHl4WlFVRlpMRU5CUVVNc1EwRkJRenRIUVVONFJUczdRVUZGUkN4alFVRlpMRU5CUVVNc1NVRkJTU3hEUVVGRExGTkJRVk1zUjBGQlJ5eFpRVUZaTEVOQlFVTXNUVUZCVFN4RFFVRkRPenM3TzBGQlNXeEVMRXRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zWVVGQllTeERRVUZETEZsQlFWa3NRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenM3UVVGRk5VTXNWMEZCVXl4dlFrRkJiMElzUTBGQlF5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVU4c1JVRkJSVHRCUVVOMlJDeFJRVUZKTEU5QlFVOHNRMEZCUXl4SlFVRkpMRVZCUVVVN1FVRkRhRUlzWVVGQlR5eEhRVUZITEV0QlFVc3NRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxFOUJRVThzUlVGQlJTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRiRVFzVlVGQlNTeFBRVUZQTEVOQlFVTXNSMEZCUnl4RlFVRkZPMEZCUTJZc1pVRkJUeXhEUVVGRExFZEJRVWNzUTBGQlF5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNN1QwRkRka0k3UzBGRFJqczdRVUZGUkN4WFFVRlBMRWRCUVVjc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eGpRVUZqTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSU3hQUVVGUExFVkJRVVVzVDBGQlR5eEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMEZCUTNSRkxGRkJRVWtzVFVGQlRTeEhRVUZITEVkQlFVY3NRMEZCUXl4RlFVRkZMRU5CUVVNc1lVRkJZU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVWQlFVVXNUMEZCVHl4RlFVRkZMRTlCUVU4c1JVRkJSU3hQUVVGUExFTkJRVU1zUTBGQlF6czdRVUZGZUVVc1VVRkJTU3hOUVVGTkxFbEJRVWtzU1VGQlNTeEpRVUZKTEVkQlFVY3NRMEZCUXl4UFFVRlBMRVZCUVVVN1FVRkRha01zWVVGQlR5eERRVUZETEZGQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFZEJRVWNzUjBGQlJ5eERRVUZETEU5QlFVOHNRMEZCUXl4UFFVRlBMRVZCUVVVc1dVRkJXU3hEUVVGRExHVkJRV1VzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0QlFVTjZSaXhaUVVGTkxFZEJRVWNzVDBGQlR5eERRVUZETEZGQlFWRXNRMEZCUXl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zVDBGQlR5eEZRVUZGTEU5QlFVOHNRMEZCUXl4RFFVRkRPMHRCUXpORU8wRkJRMFFzVVVGQlNTeE5RVUZOTEVsQlFVa3NTVUZCU1N4RlFVRkZPMEZCUTJ4Q0xGVkJRVWtzVDBGQlR5eERRVUZETEUxQlFVMHNSVUZCUlR0QlFVTnNRaXhaUVVGSkxFdEJRVXNzUjBGQlJ5eE5RVUZOTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wRkJReTlDTEdGQlFVc3NTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRkxFTkJRVU1zUjBGQlJ5eExRVUZMTEVOQlFVTXNUVUZCVFN4RlFVRkZMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVWQlFVVTdRVUZETlVNc1kwRkJTU3hEUVVGRExFdEJRVXNzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRWRCUVVjc1EwRkJReXhMUVVGTExFTkJRVU1zUlVGQlJUdEJRVU0xUWl4clFrRkJUVHRYUVVOUU96dEJRVVZFTEdWQlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhQUVVGUExFTkJRVU1zVFVGQlRTeEhRVUZITEV0QlFVc3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOMFF6dEJRVU5FTEdOQlFVMHNSMEZCUnl4TFFVRkxMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzA5QlF6TkNPMEZCUTBRc1lVRkJUeXhOUVVGTkxFTkJRVU03UzBGRFppeE5RVUZOTzBGQlEwd3NXVUZCVFN3eVFrRkJZeXhqUVVGakxFZEJRVWNzVDBGQlR5eERRVUZETEVsQlFVa3NSMEZCUnl3d1JFRkJNRVFzUTBGQlF5eERRVUZETzB0QlEycElPMGRCUTBZN096dEJRVWRFTEUxQlFVa3NVMEZCVXl4SFFVRkhPMEZCUTJRc1ZVRkJUU3hGUVVGRkxHZENRVUZUTEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVN1FVRkRNVUlzVlVGQlNTeEZRVUZGTEVsQlFVa3NTVUZCU1N4SFFVRkhMRU5CUVVFc1FVRkJReXhGUVVGRk8wRkJRMnhDTEdOQlFVMHNNa0pCUVdNc1IwRkJSeXhIUVVGSExFbEJRVWtzUjBGQlJ5eHRRa0ZCYlVJc1IwRkJSeXhIUVVGSExFTkJRVU1zUTBGQlF6dFBRVU0zUkR0QlFVTkVMR0ZCUVU4c1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzB0QlEyeENPMEZCUTBRc1ZVRkJUU3hGUVVGRkxHZENRVUZUTEUxQlFVMHNSVUZCUlN4SlFVRkpMRVZCUVVVN1FVRkROMElzVlVGQlRTeEhRVUZITEVkQlFVY3NUVUZCVFN4RFFVRkRMRTFCUVUwc1EwRkJRenRCUVVNeFFpeFhRVUZMTEVsQlFVa3NRMEZCUXl4SFFVRkhMRU5CUVVNc1JVRkJSU3hEUVVGRExFZEJRVWNzUjBGQlJ5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RlFVRkZPMEZCUXpWQ0xGbEJRVWtzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRTFCUVUwc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4SlFVRkpMRVZCUVVVN1FVRkRlRU1zYVVKQlFVOHNUVUZCVFN4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETzFOQlEzaENPMDlCUTBZN1MwRkRSanRCUVVORUxGVkJRVTBzUlVGQlJTeG5Ra0ZCVXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRk8wRkJRMnBETEdGQlFVOHNUMEZCVHl4UFFVRlBMRXRCUVVzc1ZVRkJWU3hIUVVGSExFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1QwRkJUeXhEUVVGRE8wdEJRM2hGT3p0QlFVVkVMRzlDUVVGblFpeEZRVUZGTEV0QlFVc3NRMEZCUXl4blFrRkJaMEk3UVVGRGVFTXNhVUpCUVdFc1JVRkJSU3h2UWtGQmIwSTdPMEZCUlc1RExFMUJRVVVzUlVGQlJTeFpRVUZUTEVOQlFVTXNSVUZCUlR0QlFVTmtMRlZCUVVrc1IwRkJSeXhIUVVGSExGbEJRVmtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXp0QlFVTXhRaXhUUVVGSExFTkJRVU1zVTBGQlV5eEhRVUZITEZsQlFWa3NRMEZCUXl4RFFVRkRMRWRCUVVjc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGRrTXNZVUZCVHl4SFFVRkhMRU5CUVVNN1MwRkRXanM3UVVGRlJDeFpRVUZSTEVWQlFVVXNSVUZCUlR0QlFVTmFMRmRCUVU4c1JVRkJSU3hwUWtGQlV5eERRVUZETEVWQlFVVXNTVUZCU1N4RlFVRkZMRzFDUVVGdFFpeEZRVUZGTEZkQlFWY3NSVUZCUlN4TlFVRk5MRVZCUVVVN1FVRkRia1VzVlVGQlNTeGpRVUZqTEVkQlFVY3NTVUZCU1N4RFFVRkRMRkZCUVZFc1EwRkJReXhEUVVGRExFTkJRVU03VlVGRGFrTXNSVUZCUlN4SFFVRkhMRWxCUVVrc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTTdRVUZEY0VJc1ZVRkJTU3hKUVVGSkxFbEJRVWtzVFVGQlRTeEpRVUZKTEZkQlFWY3NTVUZCU1N4dFFrRkJiVUlzUlVGQlJUdEJRVU40UkN4elFrRkJZeXhIUVVGSExGZEJRVmNzUTBGQlF5eEpRVUZKTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1JVRkJSU3hKUVVGSkxFVkJRVVVzYlVKQlFXMUNMRVZCUVVVc1YwRkJWeXhGUVVGRkxFMUJRVTBzUTBGQlF5eERRVUZETzA5QlF6TkdMRTFCUVUwc1NVRkJTU3hEUVVGRExHTkJRV01zUlVGQlJUdEJRVU14UWl4elFrRkJZeXhIUVVGSExFbEJRVWtzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1YwRkJWeXhEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVWQlFVVXNSVUZCUlN4RFFVRkRMRU5CUVVNN1QwRkRPVVE3UVVGRFJDeGhRVUZQTEdOQlFXTXNRMEZCUXp0TFFVTjJRanM3UVVGRlJDeFJRVUZKTEVWQlFVVXNZMEZCVXl4TFFVRkxMRVZCUVVVc1MwRkJTeXhGUVVGRk8wRkJRek5DTEdGQlFVOHNTMEZCU3l4SlFVRkpMRXRCUVVzc1JVRkJSU3hGUVVGRk8wRkJRM1pDTEdGQlFVc3NSMEZCUnl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRE8wOUJRM1pDTzBGQlEwUXNZVUZCVHl4TFFVRkxMRU5CUVVNN1MwRkRaRHRCUVVORUxGTkJRVXNzUlVGQlJTeGxRVUZUTEV0QlFVc3NSVUZCUlN4TlFVRk5MRVZCUVVVN1FVRkROMElzVlVGQlNTeEhRVUZITEVkQlFVY3NTMEZCU3l4SlFVRkpMRTFCUVUwc1EwRkJRenM3UVVGRk1VSXNWVUZCU1N4TFFVRkxMRWxCUVVrc1RVRkJUU3hKUVVGTExFdEJRVXNzUzBGQlN5eE5RVUZOTEVGQlFVTXNSVUZCUlR0QlFVTjZReXhYUVVGSExFZEJRVWNzUzBGQlN5eERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1RVRkJUU3hGUVVGRkxFdEJRVXNzUTBGQlF5eERRVUZETzA5QlEzWkRPenRCUVVWRUxHRkJRVThzUjBGQlJ5eERRVUZETzB0QlExbzdPMEZCUlVRc1pVRkJWeXhGUVVGRkxFMUJRVTBzUTBGQlF5eEpRVUZKTEVOQlFVTXNSVUZCUlN4RFFVRkRPenRCUVVVMVFpeFJRVUZKTEVWQlFVVXNSMEZCUnl4RFFVRkRMRVZCUVVVc1EwRkJReXhKUVVGSk8wRkJRMnBDTEdkQ1FVRlpMRVZCUVVVc1dVRkJXU3hEUVVGRExGRkJRVkU3UjBGRGNFTXNRMEZCUXpzN1FVRkZSaXhYUVVGVExFZEJRVWNzUTBGQlF5eFBRVUZQTEVWQlFXZENPMUZCUVdRc1QwRkJUeXg1UkVGQlJ5eEZRVUZGT3p0QlFVTm9ReXhSUVVGSkxFbEJRVWtzUjBGQlJ5eFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRPenRCUVVWNFFpeFBRVUZITEVOQlFVTXNUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8wRkJRM0JDTEZGQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1QwRkJUeXhKUVVGSkxGbEJRVmtzUTBGQlF5eFBRVUZQTEVWQlFVVTdRVUZETlVNc1ZVRkJTU3hIUVVGSExGRkJRVkVzUTBGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1N4RFFVRkRMRU5CUVVNN1MwRkRhRU03UVVGRFJDeFJRVUZKTEUxQlFVMHNXVUZCUVR0UlFVTk9MRmRCUVZjc1IwRkJSeXhaUVVGWkxFTkJRVU1zWTBGQll5eEhRVUZITEVWQlFVVXNSMEZCUnl4VFFVRlRMRU5CUVVNN1FVRkRMMFFzVVVGQlNTeFpRVUZaTEVOQlFVTXNVMEZCVXl4RlFVRkZPMEZCUXpGQ0xGVkJRVWtzVDBGQlR5eERRVUZETEUxQlFVMHNSVUZCUlR0QlFVTnNRaXhqUVVGTkxFZEJRVWNzVDBGQlR5eEpRVUZKTEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1QwRkJUeXhEUVVGRExFMUJRVTBzUTBGQlF5eEhRVUZITEU5QlFVOHNRMEZCUXl4TlFVRk5MRU5CUVVNN1QwRkRNMFlzVFVGQlRUdEJRVU5NTEdOQlFVMHNSMEZCUnl4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8wOUJRM0JDTzB0QlEwWTdPMEZCUlVRc1lVRkJVeXhKUVVGSkxFTkJRVU1zVDBGQlR5eG5Ra0ZCWlR0QlFVTnNReXhoUVVGUExFVkJRVVVzUjBGQlJ5eFpRVUZaTEVOQlFVTXNTVUZCU1N4RFFVRkRMRk5CUVZNc1JVRkJSU3hQUVVGUExFVkJRVVVzVTBGQlV5eERRVUZETEU5QlFVOHNSVUZCUlN4VFFVRlRMRU5CUVVNc1VVRkJVU3hGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVWQlFVVXNUVUZCVFN4RFFVRkRMRU5CUVVNN1MwRkRja2c3UVVGRFJDeFJRVUZKTEVkQlFVY3NhVUpCUVdsQ0xFTkJRVU1zV1VGQldTeERRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRkxFOUJRVThzUTBGQlF5eE5RVUZOTEVsQlFVa3NSVUZCUlN4RlFVRkZMRWxCUVVrc1JVRkJSU3hYUVVGWExFTkJRVU1zUTBGQlF6dEJRVU4wUnl4WFFVRlBMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdSMEZETDBJN1FVRkRSQ3hMUVVGSExFTkJRVU1zUzBGQlN5eEhRVUZITEVsQlFVa3NRMEZCUXpzN1FVRkZha0lzUzBGQlJ5eERRVUZETEUxQlFVMHNSMEZCUnl4VlFVRlRMRTlCUVU4c1JVRkJSVHRCUVVNM1FpeFJRVUZKTEVOQlFVTXNUMEZCVHl4RFFVRkRMRTlCUVU4c1JVRkJSVHRCUVVOd1FpeGxRVUZUTEVOQlFVTXNUMEZCVHl4SFFVRkhMRk5CUVZNc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEU5QlFVOHNSVUZCUlN4SFFVRkhMRU5CUVVNc1QwRkJUeXhEUVVGRExFTkJRVU03TzBGQlJXeEZMRlZCUVVrc1dVRkJXU3hEUVVGRExGVkJRVlVzUlVGQlJUdEJRVU16UWl4cFFrRkJVeXhEUVVGRExGRkJRVkVzUjBGQlJ5eFRRVUZUTEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhSUVVGUkxFVkJRVVVzUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMDlCUTNSRk8wRkJRMFFzVlVGQlNTeFpRVUZaTEVOQlFVTXNWVUZCVlN4SlFVRkpMRmxCUVZrc1EwRkJReXhoUVVGaExFVkJRVVU3UVVGRGVrUXNhVUpCUVZNc1EwRkJReXhWUVVGVkxFZEJRVWNzVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1ZVRkJWU3hGUVVGRkxFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0UFFVTTFSVHRMUVVOR0xFMUJRVTA3UVVGRFRDeGxRVUZUTEVOQlFVTXNUMEZCVHl4SFFVRkhMRTlCUVU4c1EwRkJReXhQUVVGUExFTkJRVU03UVVGRGNFTXNaVUZCVXl4RFFVRkRMRkZCUVZFc1IwRkJSeXhQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETzBGQlEzUkRMR1ZCUVZNc1EwRkJReXhWUVVGVkxFZEJRVWNzVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXp0TFFVTXpRenRIUVVOR0xFTkJRVU03TzBGQlJVWXNTMEZCUnl4RFFVRkRMRTFCUVUwc1IwRkJSeXhWUVVGVExFTkJRVU1zUlVGQlJTeEpRVUZKTEVWQlFVVXNWMEZCVnl4RlFVRkZMRTFCUVUwc1JVRkJSVHRCUVVOc1JDeFJRVUZKTEZsQlFWa3NRMEZCUXl4alFVRmpMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVU3UVVGREwwTXNXVUZCVFN3eVFrRkJZeXgzUWtGQmQwSXNRMEZCUXl4RFFVRkRPMHRCUXk5RE8wRkJRMFFzVVVGQlNTeFpRVUZaTEVOQlFVTXNVMEZCVXl4SlFVRkpMRU5CUVVNc1RVRkJUU3hGUVVGRk8wRkJRM0pETEZsQlFVMHNNa0pCUVdNc2VVSkJRWGxDTEVOQlFVTXNRMEZCUXp0TFFVTm9SRHM3UVVGRlJDeFhRVUZQTEZkQlFWY3NRMEZCUXl4VFFVRlRMRVZCUVVVc1EwRkJReXhGUVVGRkxGbEJRVmtzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZCUlN4SlFVRkpMRVZCUVVVc1EwRkJReXhGUVVGRkxGZEJRVmNzUlVGQlJTeE5RVUZOTEVOQlFVTXNRMEZCUXp0SFFVTnFSaXhEUVVGRE8wRkJRMFlzVTBGQlR5eEhRVUZITEVOQlFVTTdRMEZEV2pzN1FVRkZUU3hUUVVGVExGZEJRVmNzUTBGQlF5eFRRVUZUTEVWQlFVVXNRMEZCUXl4RlFVRkZMRVZCUVVVc1JVRkJSU3hKUVVGSkxFVkJRVVVzYlVKQlFXMUNMRVZCUVVVc1YwRkJWeXhGUVVGRkxFMUJRVTBzUlVGQlJUdEJRVU0xUml4WFFVRlRMRWxCUVVrc1EwRkJReXhQUVVGUExFVkJRV2RDTzFGQlFXUXNUMEZCVHl4NVJFRkJSeXhGUVVGRk96dEJRVU5xUXl4UlFVRkpMR0ZCUVdFc1IwRkJSeXhOUVVGTkxFTkJRVU03UVVGRE0wSXNVVUZCU1N4TlFVRk5MRWxCUVVrc1QwRkJUeXhKUVVGSkxFMUJRVTBzUTBGQlF5eERRVUZETEVOQlFVTXNTVUZCU1N4RlFVRkZMRTlCUVU4c1MwRkJTeXhUUVVGVExFTkJRVU1zVjBGQlZ5eEpRVUZKTEUxQlFVMHNRMEZCUXl4RFFVRkRMRU5CUVVNc1MwRkJTeXhKUVVGSkxFTkJRVUVzUVVGQlF5eEZRVUZGTzBGQlEyaEhMRzFDUVVGaExFZEJRVWNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVGRExFTkJRVU03UzBGRE1VTTdPMEZCUlVRc1YwRkJUeXhGUVVGRkxFTkJRVU1zVTBGQlV5eEZRVU5tTEU5QlFVOHNSVUZEVUN4VFFVRlRMRU5CUVVNc1QwRkJUeXhGUVVGRkxGTkJRVk1zUTBGQlF5eFJRVUZSTEVWQlEzSkRMRTlCUVU4c1EwRkJReXhKUVVGSkxFbEJRVWtzU1VGQlNTeEZRVU53UWl4WFFVRlhMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVjBGQlZ5eERRVUZETEVOQlFVTXNUVUZCVFN4RFFVRkRMRmRCUVZjc1EwRkJReXhGUVVONFJDeGhRVUZoTEVOQlFVTXNRMEZCUXp0SFFVTndRanM3UVVGRlJDeE5RVUZKTEVkQlFVY3NhVUpCUVdsQ0xFTkJRVU1zUlVGQlJTeEZRVUZGTEVsQlFVa3NSVUZCUlN4VFFVRlRMRVZCUVVVc1RVRkJUU3hGUVVGRkxFbEJRVWtzUlVGQlJTeFhRVUZYTEVOQlFVTXNRMEZCUXpzN1FVRkZla1VzVFVGQlNTeERRVUZETEU5QlFVOHNSMEZCUnl4RFFVRkRMRU5CUVVNN1FVRkRha0lzVFVGQlNTeERRVUZETEV0QlFVc3NSMEZCUnl4TlFVRk5MRWRCUVVjc1RVRkJUU3hEUVVGRExFMUJRVTBzUjBGQlJ5eERRVUZETEVOQlFVTTdRVUZEZUVNc1RVRkJTU3hEUVVGRExGZEJRVmNzUjBGQlJ5eHRRa0ZCYlVJc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRE5VTXNVMEZCVHl4SlFVRkpMRU5CUVVNN1EwRkRZanM3UVVGRlRTeFRRVUZUTEdOQlFXTXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJUdEJRVU40UkN4TlFVRkpMRU5CUVVNc1QwRkJUeXhGUVVGRk8wRkJRMW9zVVVGQlNTeFBRVUZQTEVOQlFVTXNTVUZCU1N4TFFVRkxMR2RDUVVGblFpeEZRVUZGTzBGQlEzSkRMR0ZCUVU4c1IwRkJSeXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXl4RFFVRkRPMHRCUTNwRExFMUJRVTA3UVVGRFRDeGhRVUZQTEVkQlFVY3NUMEZCVHl4RFFVRkRMRkZCUVZFc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTMEZETVVNN1IwRkRSaXhOUVVGTkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNTVUZCU1N4SlFVRkpMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzUlVGQlJUczdRVUZGZWtNc1YwRkJUeXhEUVVGRExFbEJRVWtzUjBGQlJ5eFBRVUZQTEVOQlFVTTdRVUZEZGtJc1YwRkJUeXhIUVVGSExFOUJRVThzUTBGQlF5eFJRVUZSTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1IwRkRja003UVVGRFJDeFRRVUZQTEU5QlFVOHNRMEZCUXp0RFFVTm9RanM3UVVGRlRTeFRRVUZUTEdGQlFXRXNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhGUVVGRkxFOUJRVThzUlVGQlJUczdRVUZGZGtRc1RVRkJUU3h0UWtGQmJVSXNSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hKUVVGSkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNaVUZCWlN4RFFVRkRMRU5CUVVNN1FVRkRNVVVzVTBGQlR5eERRVUZETEU5QlFVOHNSMEZCUnl4SlFVRkpMRU5CUVVNN1FVRkRka0lzVFVGQlNTeFBRVUZQTEVOQlFVTXNSMEZCUnl4RlFVRkZPMEZCUTJZc1YwRkJUeXhEUVVGRExFbEJRVWtzUTBGQlF5eFhRVUZYTEVkQlFVY3NUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zU1VGQlNTeFBRVUZQTEVOQlFVTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1EwRkJRenRIUVVOMlJUczdRVUZGUkN4TlFVRkpMRmxCUVZrc1dVRkJRU3hEUVVGRE8wRkJRMnBDTEUxQlFVa3NUMEZCVHl4RFFVRkRMRVZCUVVVc1NVRkJTU3hQUVVGUExFTkJRVU1zUlVGQlJTeExRVUZMTEVsQlFVa3NSVUZCUlRzN1FVRkRja01zWVVGQlR5eERRVUZETEVsQlFVa3NSMEZCUnl4clFrRkJXU3hQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdPMEZCUlhwRExGVkJRVWtzUlVGQlJTeEhRVUZITEU5QlFVOHNRMEZCUXl4RlFVRkZMRU5CUVVNN1FVRkRjRUlzYTBKQlFWa3NSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRExHVkJRV1VzUTBGQlF5eEhRVUZITEZOQlFWTXNiVUpCUVcxQ0xFTkJRVU1zVDBGQlR5eEZRVUZuUWp0WlFVRmtMRTlCUVU4c2VVUkJRVWNzUlVGQlJUczdPenRCUVVrdlJpeGxRVUZQTEVOQlFVTXNTVUZCU1N4SFFVRkhMR3RDUVVGWkxFOUJRVThzUTBGQlF5eEpRVUZKTEVOQlFVTXNRMEZCUXp0QlFVTjZReXhsUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEdWQlFXVXNRMEZCUXl4SFFVRkhMRzFDUVVGdFFpeERRVUZETzBGQlEzQkVMR1ZCUVU4c1JVRkJSU3hEUVVGRExFOUJRVThzUlVGQlJTeFBRVUZQTEVOQlFVTXNRMEZCUXp0UFFVTTNRaXhEUVVGRE8wRkJRMFlzVlVGQlNTeEZRVUZGTEVOQlFVTXNVVUZCVVN4RlFVRkZPMEZCUTJZc1pVRkJUeXhEUVVGRExGRkJRVkVzUjBGQlJ5eExRVUZMTEVOQlFVTXNUVUZCVFN4RFFVRkRMRVZCUVVVc1JVRkJSU3hQUVVGUExFTkJRVU1zVVVGQlVTeEZRVUZGTEVWQlFVVXNRMEZCUXl4UlFVRlJMRU5CUVVNc1EwRkJRenRQUVVOd1JUczdSMEZEUmpzN1FVRkZSQ3hOUVVGSkxFOUJRVThzUzBGQlN5eFRRVUZUTEVsQlFVa3NXVUZCV1N4RlFVRkZPMEZCUTNwRExGZEJRVThzUjBGQlJ5eFpRVUZaTEVOQlFVTTdSMEZEZUVJN08wRkJSVVFzVFVGQlNTeFBRVUZQTEV0QlFVc3NVMEZCVXl4RlFVRkZPMEZCUTNwQ0xGVkJRVTBzTWtKQlFXTXNZMEZCWXl4SFFVRkhMRTlCUVU4c1EwRkJReXhKUVVGSkxFZEJRVWNzY1VKQlFYRkNMRU5CUVVNc1EwRkJRenRIUVVNMVJTeE5RVUZOTEVsQlFVa3NUMEZCVHl4WlFVRlpMRkZCUVZFc1JVRkJSVHRCUVVOMFF5eFhRVUZQTEU5QlFVOHNRMEZCUXl4UFFVRlBMRVZCUVVVc1QwRkJUeXhEUVVGRExFTkJRVU03UjBGRGJFTTdRMEZEUmpzN1FVRkZUU3hUUVVGVExFbEJRVWtzUjBGQlJ6dEJRVUZGTEZOQlFVOHNSVUZCUlN4RFFVRkRPME5CUVVVN08wRkJSWEpETEZOQlFWTXNVVUZCVVN4RFFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSkxFVkJRVVU3UVVGREwwSXNUVUZCU1N4RFFVRkRMRWxCUVVrc1NVRkJTU3hGUVVGRkxFMUJRVTBzU1VGQlNTeEpRVUZKTEVOQlFVRXNRVUZCUXl4RlFVRkZPMEZCUXpsQ0xGRkJRVWtzUjBGQlJ5eEpRVUZKTEVkQlFVY3NhMEpCUVZrc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeERRVUZETzBGQlEzSkRMRkZCUVVrc1EwRkJReXhKUVVGSkxFZEJRVWNzVDBGQlR5eERRVUZETzBkQlEzSkNPMEZCUTBRc1UwRkJUeXhKUVVGSkxFTkJRVU03UTBGRFlqczdRVUZGUkN4VFFVRlRMR2xDUVVGcFFpeERRVUZETEVWQlFVVXNSVUZCUlN4SlFVRkpMRVZCUVVVc1UwRkJVeXhGUVVGRkxFMUJRVTBzUlVGQlJTeEpRVUZKTEVWQlFVVXNWMEZCVnl4RlFVRkZPMEZCUTNwRkxFMUJRVWtzUlVGQlJTeERRVUZETEZOQlFWTXNSVUZCUlR0QlFVTm9RaXhSUVVGSkxFdEJRVXNzUjBGQlJ5eEZRVUZGTEVOQlFVTTdRVUZEWml4UlFVRkpMRWRCUVVjc1JVRkJSU3hEUVVGRExGTkJRVk1zUTBGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RlFVRkZMRk5CUVZNc1JVRkJSU3hOUVVGTkxFbEJRVWtzVFVGQlRTeERRVUZETEVOQlFVTXNRMEZCUXl4RlFVRkZMRWxCUVVrc1JVRkJSU3hYUVVGWExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdRVUZETlVZc1UwRkJTeXhEUVVGRExFMUJRVTBzUTBGQlF5eEpRVUZKTEVWQlFVVXNTMEZCU3l4RFFVRkRMRU5CUVVNN1IwRkRNMEk3UVVGRFJDeFRRVUZQTEVsQlFVa3NRMEZCUXp0RFFVTmlJaXdpWm1sc1pTSTZJbkoxYm5ScGJXVXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKcGJYQnZjblFnS2lCaGN5QlZkR2xzY3lCbWNtOXRJQ2N1TDNWMGFXeHpKenRjYm1sdGNHOXlkQ0JGZUdObGNIUnBiMjRnWm5KdmJTQW5MaTlsZUdObGNIUnBiMjRuTzF4dWFXMXdiM0owSUhzZ1EwOU5VRWxNUlZKZlVrVldTVk5KVDA0c0lGSkZWa2xUU1U5T1gwTklRVTVIUlZNc0lHTnlaV0YwWlVaeVlXMWxJSDBnWm5KdmJTQW5MaTlpWVhObEp6dGNibHh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR05vWldOclVtVjJhWE5wYjI0b1kyOXRjR2xzWlhKSmJtWnZLU0I3WEc0Z0lHTnZibk4wSUdOdmJYQnBiR1Z5VW1WMmFYTnBiMjRnUFNCamIyMXdhV3hsY2tsdVptOGdKaVlnWTI5dGNHbHNaWEpKYm1adld6QmRJSHg4SURFc1hHNGdJQ0FnSUNBZ0lHTjFjbkpsYm5SU1pYWnBjMmx2YmlBOUlFTlBUVkJKVEVWU1gxSkZWa2xUU1U5T08xeHVYRzRnSUdsbUlDaGpiMjF3YVd4bGNsSmxkbWx6YVc5dUlDRTlQU0JqZFhKeVpXNTBVbVYyYVhOcGIyNHBJSHRjYmlBZ0lDQnBaaUFvWTI5dGNHbHNaWEpTWlhacGMybHZiaUE4SUdOMWNuSmxiblJTWlhacGMybHZiaWtnZTF4dUlDQWdJQ0FnWTI5dWMzUWdjblZ1ZEdsdFpWWmxjbk5wYjI1eklEMGdVa1ZXU1ZOSlQwNWZRMGhCVGtkRlUxdGpkWEp5Wlc1MFVtVjJhWE5wYjI1ZExGeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dGNHbHNaWEpXWlhKemFXOXVjeUE5SUZKRlZrbFRTVTlPWDBOSVFVNUhSVk5iWTI5dGNHbHNaWEpTWlhacGMybHZibDA3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0NkVVpXMXdiR0YwWlNCM1lYTWdjSEpsWTI5dGNHbHNaV1FnZDJsMGFDQmhiaUJ2YkdSbGNpQjJaWEp6YVc5dUlHOW1JRWhoYm1Sc1pXSmhjbk1nZEdoaGJpQjBhR1VnWTNWeWNtVnVkQ0J5ZFc1MGFXMWxMaUFuSUN0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ2RRYkdWaGMyVWdkWEJrWVhSbElIbHZkWElnY0hKbFkyOXRjR2xzWlhJZ2RHOGdZU0J1WlhkbGNpQjJaWEp6YVc5dUlDZ25JQ3NnY25WdWRHbHRaVlpsY25OcGIyNXpJQ3NnSnlrZ2IzSWdaRzkzYm1keVlXUmxJSGx2ZFhJZ2NuVnVkR2x0WlNCMGJ5QmhiaUJ2YkdSbGNpQjJaWEp6YVc5dUlDZ25JQ3NnWTI5dGNHbHNaWEpXWlhKemFXOXVjeUFySUNjcExpY3BPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBdkx5QlZjMlVnZEdobElHVnRZbVZrWkdWa0lIWmxjbk5wYjI0Z2FXNW1ieUJ6YVc1alpTQjBhR1VnY25WdWRHbHRaU0JrYjJWemJpZDBJR3R1YjNjZ1lXSnZkWFFnZEdocGN5QnlaWFpwYzJsdmJpQjVaWFJjYmlBZ0lDQWdJSFJvY205M0lHNWxkeUJGZUdObGNIUnBiMjRvSjFSbGJYQnNZWFJsSUhkaGN5QndjbVZqYjIxd2FXeGxaQ0IzYVhSb0lHRWdibVYzWlhJZ2RtVnljMmx2YmlCdlppQklZVzVrYkdWaVlYSnpJSFJvWVc0Z2RHaGxJR04xY25KbGJuUWdjblZ1ZEdsdFpTNGdKeUFyWEc0Z0lDQWdJQ0FnSUNBZ0lDQW5VR3hsWVhObElIVndaR0YwWlNCNWIzVnlJSEoxYm5ScGJXVWdkRzhnWVNCdVpYZGxjaUIyWlhKemFXOXVJQ2duSUNzZ1kyOXRjR2xzWlhKSmJtWnZXekZkSUNzZ0p5a3VKeWs3WEc0Z0lDQWdmVnh1SUNCOVhHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUIwWlcxd2JHRjBaU2gwWlcxd2JHRjBaVk53WldNc0lHVnVkaWtnZTF4dUlDQXZLaUJwYzNSaGJtSjFiQ0JwWjI1dmNtVWdibVY0ZENBcUwxeHVJQ0JwWmlBb0lXVnVkaWtnZTF4dUlDQWdJSFJvY205M0lHNWxkeUJGZUdObGNIUnBiMjRvSjA1dklHVnVkbWx5YjI1dFpXNTBJSEJoYzNObFpDQjBieUIwWlcxd2JHRjBaU2NwTzF4dUlDQjlYRzRnSUdsbUlDZ2hkR1Z0Y0d4aGRHVlRjR1ZqSUh4OElDRjBaVzF3YkdGMFpWTndaV011YldGcGJpa2dlMXh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZlR05sY0hScGIyNG9KMVZ1YTI1dmQyNGdkR1Z0Y0d4aGRHVWdiMkpxWldOME9pQW5JQ3NnZEhsd1pXOW1JSFJsYlhCc1lYUmxVM0JsWXlrN1hHNGdJSDFjYmx4dUlDQjBaVzF3YkdGMFpWTndaV011YldGcGJpNWtaV052Y21GMGIzSWdQU0IwWlcxd2JHRjBaVk53WldNdWJXRnBibDlrTzF4dVhHNGdJQzh2SUU1dmRHVTZJRlZ6YVc1bklHVnVkaTVXVFNCeVpXWmxjbVZ1WTJWeklISmhkR2hsY2lCMGFHRnVJR3h2WTJGc0lIWmhjaUJ5WldabGNtVnVZMlZ6SUhSb2NtOTFaMmh2ZFhRZ2RHaHBjeUJ6WldOMGFXOXVJSFJ2SUdGc2JHOTNYRzRnSUM4dklHWnZjaUJsZUhSbGNtNWhiQ0IxYzJWeWN5QjBieUJ2ZG1WeWNtbGtaU0IwYUdWelpTQmhjeUJ3YzNWbFpHOHRjM1Z3Y0c5eWRHVmtJRUZRU1hNdVhHNGdJR1Z1ZGk1V1RTNWphR1ZqYTFKbGRtbHphVzl1S0hSbGJYQnNZWFJsVTNCbFl5NWpiMjF3YVd4bGNpazdYRzVjYmlBZ1puVnVZM1JwYjI0Z2FXNTJiMnRsVUdGeWRHbGhiRmR5WVhCd1pYSW9jR0Z5ZEdsaGJDd2dZMjl1ZEdWNGRDd2diM0IwYVc5dWN5a2dlMXh1SUNBZ0lHbG1JQ2h2Y0hScGIyNXpMbWhoYzJncElIdGNiaUFnSUNBZ0lHTnZiblJsZUhRZ1BTQlZkR2xzY3k1bGVIUmxibVFvZTMwc0lHTnZiblJsZUhRc0lHOXdkR2x2Ym5NdWFHRnphQ2s3WEc0Z0lDQWdJQ0JwWmlBb2IzQjBhVzl1Y3k1cFpITXBJSHRjYmlBZ0lDQWdJQ0FnYjNCMGFXOXVjeTVwWkhOYk1GMGdQU0IwY25WbE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUhCaGNuUnBZV3dnUFNCbGJuWXVWazB1Y21WemIyeDJaVkJoY25ScFlXd3VZMkZzYkNoMGFHbHpMQ0J3WVhKMGFXRnNMQ0JqYjI1MFpYaDBMQ0J2Y0hScGIyNXpLVHRjYmlBZ0lDQnNaWFFnY21WemRXeDBJRDBnWlc1MkxsWk5MbWx1ZG05clpWQmhjblJwWVd3dVkyRnNiQ2gwYUdsekxDQndZWEowYVdGc0xDQmpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNibHh1SUNBZ0lHbG1JQ2h5WlhOMWJIUWdQVDBnYm5Wc2JDQW1KaUJsYm5ZdVkyOXRjR2xzWlNrZ2UxeHVJQ0FnSUNBZ2IzQjBhVzl1Y3k1d1lYSjBhV0ZzYzF0dmNIUnBiMjV6TG01aGJXVmRJRDBnWlc1MkxtTnZiWEJwYkdVb2NHRnlkR2xoYkN3Z2RHVnRjR3hoZEdWVGNHVmpMbU52YlhCcGJHVnlUM0IwYVc5dWN5d2daVzUyS1R0Y2JpQWdJQ0FnSUhKbGMzVnNkQ0E5SUc5d2RHbHZibk11Y0dGeWRHbGhiSE5iYjNCMGFXOXVjeTV1WVcxbFhTaGpiMjUwWlhoMExDQnZjSFJwYjI1ektUdGNiaUFnSUNCOVhHNGdJQ0FnYVdZZ0tISmxjM1ZzZENBaFBTQnVkV3hzS1NCN1hHNGdJQ0FnSUNCcFppQW9iM0IwYVc5dWN5NXBibVJsYm5RcElIdGNiaUFnSUNBZ0lDQWdiR1YwSUd4cGJtVnpJRDBnY21WemRXeDBMbk53YkdsMEtDZGNYRzRuS1R0Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ2FTQTlJREFzSUd3Z1BTQnNhVzVsY3k1c1pXNW5kR2c3SUdrZ1BDQnNPeUJwS3lzcElIdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb0lXeHBibVZ6VzJsZElDWW1JR2tnS3lBeElEMDlQU0JzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JpY21WaGF6dGNiaUFnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQnNhVzVsYzF0cFhTQTlJRzl3ZEdsdmJuTXVhVzVrWlc1MElDc2diR2x1WlhOYmFWMDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnY21WemRXeDBJRDBnYkdsdVpYTXVhbTlwYmlnblhGeHVKeWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhoalpYQjBhVzl1S0NkVWFHVWdjR0Z5ZEdsaGJDQW5JQ3NnYjNCMGFXOXVjeTV1WVcxbElDc2dKeUJqYjNWc1pDQnViM1FnWW1VZ1kyOXRjR2xzWldRZ2QyaGxiaUJ5ZFc1dWFXNW5JR2x1SUhKMWJuUnBiV1V0YjI1c2VTQnRiMlJsSnlrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ0x5OGdTblZ6ZENCaFpHUWdkMkYwWlhKY2JpQWdiR1YwSUdOdmJuUmhhVzVsY2lBOUlIdGNiaUFnSUNCemRISnBZM1E2SUdaMWJtTjBhVzl1S0c5aWFpd2dibUZ0WlNrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0VvYm1GdFpTQnBiaUJ2WW1vcEtTQjdYRzRnSUNBZ0lDQWdJSFJvY205M0lHNWxkeUJGZUdObGNIUnBiMjRvSjF3aUp5QXJJRzVoYldVZ0t5QW5YQ0lnYm05MElHUmxabWx1WldRZ2FXNGdKeUFySUc5aWFpazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnlaWFIxY200Z2IySnFXMjVoYldWZE8xeHVJQ0FnSUgwc1hHNGdJQ0FnYkc5dmEzVndPaUJtZFc1amRHbHZiaWhrWlhCMGFITXNJRzVoYldVcElIdGNiaUFnSUNBZ0lHTnZibk4wSUd4bGJpQTlJR1JsY0hSb2N5NXNaVzVuZEdnN1hHNGdJQ0FnSUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElHeGxianNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoa1pYQjBhSE5iYVYwZ0ppWWdaR1Z3ZEdoelcybGRXMjVoYldWZElDRTlJRzUxYkd3cElIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdaR1Z3ZEdoelcybGRXMjVoYldWZE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTeGNiaUFnSUNCc1lXMWlaR0U2SUdaMWJtTjBhVzl1S0dOMWNuSmxiblFzSUdOdmJuUmxlSFFwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUIwZVhCbGIyWWdZM1Z5Y21WdWRDQTlQVDBnSjJaMWJtTjBhVzl1SnlBL0lHTjFjbkpsYm5RdVkyRnNiQ2hqYjI1MFpYaDBLU0E2SUdOMWNuSmxiblE3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJR1Z6WTJGd1pVVjRjSEpsYzNOcGIyNDZJRlYwYVd4ekxtVnpZMkZ3WlVWNGNISmxjM05wYjI0c1hHNGdJQ0FnYVc1MmIydGxVR0Z5ZEdsaGJEb2dhVzUyYjJ0bFVHRnlkR2xoYkZkeVlYQndaWElzWEc1Y2JpQWdJQ0JtYmpvZ1puVnVZM1JwYjI0b2FTa2dlMXh1SUNBZ0lDQWdiR1YwSUhKbGRDQTlJSFJsYlhCc1lYUmxVM0JsWTF0cFhUdGNiaUFnSUNBZ0lISmxkQzVrWldOdmNtRjBiM0lnUFNCMFpXMXdiR0YwWlZOd1pXTmJhU0FySUNkZlpDZGRPMXh1SUNBZ0lDQWdjbVYwZFhKdUlISmxkRHRjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdjSEp2WjNKaGJYTTZJRnRkTEZ4dUlDQWdJSEJ5YjJkeVlXMDZJR1oxYm1OMGFXOXVLR2tzSUdSaGRHRXNJR1JsWTJ4aGNtVmtRbXh2WTJ0UVlYSmhiWE1zSUdKc2IyTnJVR0Z5WVcxekxDQmtaWEIwYUhNcElIdGNiaUFnSUNBZ0lHeGxkQ0J3Y205bmNtRnRWM0poY0hCbGNpQTlJSFJvYVhNdWNISnZaM0poYlhOYmFWMHNYRzRnSUNBZ0lDQWdJQ0FnWm00Z1BTQjBhR2x6TG1adUtHa3BPMXh1SUNBZ0lDQWdhV1lnS0dSaGRHRWdmSHdnWkdWd2RHaHpJSHg4SUdKc2IyTnJVR0Z5WVcxeklIeDhJR1JsWTJ4aGNtVmtRbXh2WTJ0UVlYSmhiWE1wSUh0Y2JpQWdJQ0FnSUNBZ2NISnZaM0poYlZkeVlYQndaWElnUFNCM2NtRndVSEp2WjNKaGJTaDBhR2x6TENCcExDQm1iaXdnWkdGMFlTd2daR1ZqYkdGeVpXUkNiRzlqYTFCaGNtRnRjeXdnWW14dlkydFFZWEpoYlhNc0lHUmxjSFJvY3lrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tDRndjbTluY21GdFYzSmhjSEJsY2lrZ2UxeHVJQ0FnSUNBZ0lDQndjbTluY21GdFYzSmhjSEJsY2lBOUlIUm9hWE11Y0hKdlozSmhiWE5iYVYwZ1BTQjNjbUZ3VUhKdlozSmhiU2gwYUdsekxDQnBMQ0JtYmlrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCeVpYUjFjbTRnY0hKdlozSmhiVmR5WVhCd1pYSTdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lHUmhkR0U2SUdaMWJtTjBhVzl1S0haaGJIVmxMQ0JrWlhCMGFDa2dlMXh1SUNBZ0lDQWdkMmhwYkdVZ0tIWmhiSFZsSUNZbUlHUmxjSFJvTFMwcElIdGNiaUFnSUNBZ0lDQWdkbUZzZFdVZ1BTQjJZV3gxWlM1ZmNHRnlaVzUwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJSFpoYkhWbE8xeHVJQ0FnSUgwc1hHNGdJQ0FnYldWeVoyVTZJR1oxYm1OMGFXOXVLSEJoY21GdExDQmpiMjF0YjI0cElIdGNiaUFnSUNBZ0lHeGxkQ0J2WW1vZ1BTQndZWEpoYlNCOGZDQmpiMjF0YjI0N1hHNWNiaUFnSUNBZ0lHbG1JQ2h3WVhKaGJTQW1KaUJqYjIxdGIyNGdKaVlnS0hCaGNtRnRJQ0U5UFNCamIyMXRiMjRwS1NCN1hHNGdJQ0FnSUNBZ0lHOWlhaUE5SUZWMGFXeHpMbVY0ZEdWdVpDaDdmU3dnWTI5dGJXOXVMQ0J3WVhKaGJTazdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQnZZbW83WEc0Z0lDQWdmU3hjYmlBZ0lDQXZMeUJCYmlCbGJYQjBlU0J2WW1wbFkzUWdkRzhnZFhObElHRnpJSEpsY0d4aFkyVnRaVzUwSUdadmNpQnVkV3hzTFdOdmJuUmxlSFJ6WEc0Z0lDQWdiblZzYkVOdmJuUmxlSFE2SUU5aWFtVmpkQzV6WldGc0tIdDlLU3hjYmx4dUlDQWdJRzV2YjNBNklHVnVkaTVXVFM1dWIyOXdMRnh1SUNBZ0lHTnZiWEJwYkdWeVNXNW1iem9nZEdWdGNHeGhkR1ZUY0dWakxtTnZiWEJwYkdWeVhHNGdJSDA3WEc1Y2JpQWdablZ1WTNScGIyNGdjbVYwS0dOdmJuUmxlSFFzSUc5d2RHbHZibk1nUFNCN2ZTa2dlMXh1SUNBZ0lHeGxkQ0JrWVhSaElEMGdiM0IwYVc5dWN5NWtZWFJoTzF4dVhHNGdJQ0FnY21WMExsOXpaWFIxY0NodmNIUnBiMjV6S1R0Y2JpQWdJQ0JwWmlBb0lXOXdkR2x2Ym5NdWNHRnlkR2xoYkNBbUppQjBaVzF3YkdGMFpWTndaV011ZFhObFJHRjBZU2tnZTF4dUlDQWdJQ0FnWkdGMFlTQTlJR2x1YVhSRVlYUmhLR052Ym5SbGVIUXNJR1JoZEdFcE8xeHVJQ0FnSUgxY2JpQWdJQ0JzWlhRZ1pHVndkR2h6TEZ4dUlDQWdJQ0FnSUNCaWJHOWphMUJoY21GdGN5QTlJSFJsYlhCc1lYUmxVM0JsWXk1MWMyVkNiRzlqYTFCaGNtRnRjeUEvSUZ0ZElEb2dkVzVrWldacGJtVmtPMXh1SUNBZ0lHbG1JQ2gwWlcxd2JHRjBaVk53WldNdWRYTmxSR1Z3ZEdoektTQjdYRzRnSUNBZ0lDQnBaaUFvYjNCMGFXOXVjeTVrWlhCMGFITXBJSHRjYmlBZ0lDQWdJQ0FnWkdWd2RHaHpJRDBnWTI5dWRHVjRkQ0FoUFNCdmNIUnBiMjV6TG1SbGNIUm9jMXN3WFNBL0lGdGpiMjUwWlhoMFhTNWpiMjVqWVhRb2IzQjBhVzl1Y3k1a1pYQjBhSE1wSURvZ2IzQjBhVzl1Y3k1a1pYQjBhSE03WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0JrWlhCMGFITWdQU0JiWTI5dWRHVjRkRjA3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdablZ1WTNScGIyNGdiV0ZwYmloamIyNTBaWGgwTHlvc0lHOXdkR2x2Ym5NcUx5a2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlDY25JQ3NnZEdWdGNHeGhkR1ZUY0dWakxtMWhhVzRvWTI5dWRHRnBibVZ5TENCamIyNTBaWGgwTENCamIyNTBZV2x1WlhJdWFHVnNjR1Z5Y3l3Z1kyOXVkR0ZwYm1WeUxuQmhjblJwWVd4ekxDQmtZWFJoTENCaWJHOWphMUJoY21GdGN5d2daR1Z3ZEdoektUdGNiaUFnSUNCOVhHNGdJQ0FnYldGcGJpQTlJR1Y0WldOMWRHVkVaV052Y21GMGIzSnpLSFJsYlhCc1lYUmxVM0JsWXk1dFlXbHVMQ0J0WVdsdUxDQmpiMjUwWVdsdVpYSXNJRzl3ZEdsdmJuTXVaR1Z3ZEdoeklIeDhJRnRkTENCa1lYUmhMQ0JpYkc5amExQmhjbUZ0Y3lrN1hHNGdJQ0FnY21WMGRYSnVJRzFoYVc0b1kyOXVkR1Y0ZEN3Z2IzQjBhVzl1Y3lrN1hHNGdJSDFjYmlBZ2NtVjBMbWx6Vkc5d0lEMGdkSEoxWlR0Y2JseHVJQ0J5WlhRdVgzTmxkSFZ3SUQwZ1puVnVZM1JwYjI0b2IzQjBhVzl1Y3lrZ2UxeHVJQ0FnSUdsbUlDZ2hiM0IwYVc5dWN5NXdZWEowYVdGc0tTQjdYRzRnSUNBZ0lDQmpiMjUwWVdsdVpYSXVhR1ZzY0dWeWN5QTlJR052Ym5SaGFXNWxjaTV0WlhKblpTaHZjSFJwYjI1ekxtaGxiSEJsY25Nc0lHVnVkaTVvWld4d1pYSnpLVHRjYmx4dUlDQWdJQ0FnYVdZZ0tIUmxiWEJzWVhSbFUzQmxZeTUxYzJWUVlYSjBhV0ZzS1NCN1hHNGdJQ0FnSUNBZ0lHTnZiblJoYVc1bGNpNXdZWEowYVdGc2N5QTlJR052Ym5SaGFXNWxjaTV0WlhKblpTaHZjSFJwYjI1ekxuQmhjblJwWVd4ekxDQmxibll1Y0dGeWRHbGhiSE1wTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnYVdZZ0tIUmxiWEJzWVhSbFUzQmxZeTUxYzJWUVlYSjBhV0ZzSUh4OElIUmxiWEJzWVhSbFUzQmxZeTUxYzJWRVpXTnZjbUYwYjNKektTQjdYRzRnSUNBZ0lDQWdJR052Ym5SaGFXNWxjaTVrWldOdmNtRjBiM0p6SUQwZ1kyOXVkR0ZwYm1WeUxtMWxjbWRsS0c5d2RHbHZibk11WkdWamIzSmhkRzl5Y3l3Z1pXNTJMbVJsWTI5eVlYUnZjbk1wTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQmpiMjUwWVdsdVpYSXVhR1ZzY0dWeWN5QTlJRzl3ZEdsdmJuTXVhR1ZzY0dWeWN6dGNiaUFnSUNBZ0lHTnZiblJoYVc1bGNpNXdZWEowYVdGc2N5QTlJRzl3ZEdsdmJuTXVjR0Z5ZEdsaGJITTdYRzRnSUNBZ0lDQmpiMjUwWVdsdVpYSXVaR1ZqYjNKaGRHOXljeUE5SUc5d2RHbHZibk11WkdWamIzSmhkRzl5Y3p0Y2JpQWdJQ0I5WEc0Z0lIMDdYRzVjYmlBZ2NtVjBMbDlqYUdsc1pDQTlJR1oxYm1OMGFXOXVLR2tzSUdSaGRHRXNJR0pzYjJOclVHRnlZVzF6TENCa1pYQjBhSE1wSUh0Y2JpQWdJQ0JwWmlBb2RHVnRjR3hoZEdWVGNHVmpMblZ6WlVKc2IyTnJVR0Z5WVcxeklDWW1JQ0ZpYkc5amExQmhjbUZ0Y3lrZ2UxeHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVjRZMlZ3ZEdsdmJpZ25iWFZ6ZENCd1lYTnpJR0pzYjJOcklIQmhjbUZ0Y3ljcE8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RHVnRjR3hoZEdWVGNHVmpMblZ6WlVSbGNIUm9jeUFtSmlBaFpHVndkR2h6S1NCN1hHNGdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYaGpaWEIwYVc5dUtDZHRkWE4wSUhCaGMzTWdjR0Z5Wlc1MElHUmxjSFJvY3ljcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUIzY21Gd1VISnZaM0poYlNoamIyNTBZV2x1WlhJc0lHa3NJSFJsYlhCc1lYUmxVM0JsWTF0cFhTd2daR0YwWVN3Z01Dd2dZbXh2WTJ0UVlYSmhiWE1zSUdSbGNIUm9jeWs3WEc0Z0lIMDdYRzRnSUhKbGRIVnliaUJ5WlhRN1hHNTlYRzVjYm1WNGNHOXlkQ0JtZFc1amRHbHZiaUIzY21Gd1VISnZaM0poYlNoamIyNTBZV2x1WlhJc0lHa3NJR1p1TENCa1lYUmhMQ0JrWldOc1lYSmxaRUpzYjJOclVHRnlZVzF6TENCaWJHOWphMUJoY21GdGN5d2daR1Z3ZEdoektTQjdYRzRnSUdaMWJtTjBhVzl1SUhCeWIyY29ZMjl1ZEdWNGRDd2diM0IwYVc5dWN5QTlJSHQ5S1NCN1hHNGdJQ0FnYkdWMElHTjFjbkpsYm5SRVpYQjBhSE1nUFNCa1pYQjBhSE03WEc0Z0lDQWdhV1lnS0dSbGNIUm9jeUFtSmlCamIyNTBaWGgwSUNFOUlHUmxjSFJvYzFzd1hTQW1KaUFoS0dOdmJuUmxlSFFnUFQwOUlHTnZiblJoYVc1bGNpNXVkV3hzUTI5dWRHVjRkQ0FtSmlCa1pYQjBhSE5iTUYwZ1BUMDlJRzUxYkd3cEtTQjdYRzRnSUNBZ0lDQmpkWEp5Wlc1MFJHVndkR2h6SUQwZ1cyTnZiblJsZUhSZExtTnZibU5oZENoa1pYQjBhSE1wTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsZEhWeWJpQm1iaWhqYjI1MFlXbHVaWElzWEc0Z0lDQWdJQ0FnSUdOdmJuUmxlSFFzWEc0Z0lDQWdJQ0FnSUdOdmJuUmhhVzVsY2k1b1pXeHdaWEp6TENCamIyNTBZV2x1WlhJdWNHRnlkR2xoYkhNc1hHNGdJQ0FnSUNBZ0lHOXdkR2x2Ym5NdVpHRjBZU0I4ZkNCa1lYUmhMRnh1SUNBZ0lDQWdJQ0JpYkc5amExQmhjbUZ0Y3lBbUppQmJiM0IwYVc5dWN5NWliRzlqYTFCaGNtRnRjMTB1WTI5dVkyRjBLR0pzYjJOclVHRnlZVzF6S1N4Y2JpQWdJQ0FnSUNBZ1kzVnljbVZ1ZEVSbGNIUm9jeWs3WEc0Z0lIMWNibHh1SUNCd2NtOW5JRDBnWlhobFkzVjBaVVJsWTI5eVlYUnZjbk1vWm00c0lIQnliMmNzSUdOdmJuUmhhVzVsY2l3Z1pHVndkR2h6TENCa1lYUmhMQ0JpYkc5amExQmhjbUZ0Y3lrN1hHNWNiaUFnY0hKdlp5NXdjbTluY21GdElEMGdhVHRjYmlBZ2NISnZaeTVrWlhCMGFDQTlJR1JsY0hSb2N5QS9JR1JsY0hSb2N5NXNaVzVuZEdnZ09pQXdPMXh1SUNCd2NtOW5MbUpzYjJOclVHRnlZVzF6SUQwZ1pHVmpiR0Z5WldSQ2JHOWphMUJoY21GdGN5QjhmQ0F3TzF4dUlDQnlaWFIxY200Z2NISnZaenRjYm4xY2JseHVaWGh3YjNKMElHWjFibU4wYVc5dUlISmxjMjlzZG1WUVlYSjBhV0ZzS0hCaGNuUnBZV3dzSUdOdmJuUmxlSFFzSUc5d2RHbHZibk1wSUh0Y2JpQWdhV1lnS0NGd1lYSjBhV0ZzS1NCN1hHNGdJQ0FnYVdZZ0tHOXdkR2x2Ym5NdWJtRnRaU0E5UFQwZ0owQndZWEowYVdGc0xXSnNiMk5ySnlrZ2UxeHVJQ0FnSUNBZ2NHRnlkR2xoYkNBOUlHOXdkR2x2Ym5NdVpHRjBZVnNuY0dGeWRHbGhiQzFpYkc5amF5ZGRPMXh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCd1lYSjBhV0ZzSUQwZ2IzQjBhVzl1Y3k1d1lYSjBhV0ZzYzF0dmNIUnBiMjV6TG01aGJXVmRPMXh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJR2xtSUNnaGNHRnlkR2xoYkM1allXeHNJQ1ltSUNGdmNIUnBiMjV6TG01aGJXVXBJSHRjYmlBZ0lDQXZMeUJVYUdseklHbHpJR0VnWkhsdVlXMXBZeUJ3WVhKMGFXRnNJSFJvWVhRZ2NtVjBkWEp1WldRZ1lTQnpkSEpwYm1kY2JpQWdJQ0J2Y0hScGIyNXpMbTVoYldVZ1BTQndZWEowYVdGc08xeHVJQ0FnSUhCaGNuUnBZV3dnUFNCdmNIUnBiMjV6TG5CaGNuUnBZV3h6VzNCaGNuUnBZV3hkTzF4dUlDQjlYRzRnSUhKbGRIVnliaUJ3WVhKMGFXRnNPMXh1ZlZ4dVhHNWxlSEJ2Y25RZ1puVnVZM1JwYjI0Z2FXNTJiMnRsVUdGeWRHbGhiQ2h3WVhKMGFXRnNMQ0JqYjI1MFpYaDBMQ0J2Y0hScGIyNXpLU0I3WEc0Z0lDOHZJRlZ6WlNCMGFHVWdZM1Z5Y21WdWRDQmpiRzl6ZFhKbElHTnZiblJsZUhRZ2RHOGdjMkYyWlNCMGFHVWdjR0Z5ZEdsaGJDMWliRzlqYXlCcFppQjBhR2x6SUhCaGNuUnBZV3hjYmlBZ1kyOXVjM1FnWTNWeWNtVnVkRkJoY25ScFlXeENiRzlqYXlBOUlHOXdkR2x2Ym5NdVpHRjBZU0FtSmlCdmNIUnBiMjV6TG1SaGRHRmJKM0JoY25ScFlXd3RZbXh2WTJzblhUdGNiaUFnYjNCMGFXOXVjeTV3WVhKMGFXRnNJRDBnZEhKMVpUdGNiaUFnYVdZZ0tHOXdkR2x2Ym5NdWFXUnpLU0I3WEc0Z0lDQWdiM0IwYVc5dWN5NWtZWFJoTG1OdmJuUmxlSFJRWVhSb0lEMGdiM0IwYVc5dWN5NXBaSE5iTUYwZ2ZId2diM0IwYVc5dWN5NWtZWFJoTG1OdmJuUmxlSFJRWVhSb08xeHVJQ0I5WEc1Y2JpQWdiR1YwSUhCaGNuUnBZV3hDYkc5amF6dGNiaUFnYVdZZ0tHOXdkR2x2Ym5NdVptNGdKaVlnYjNCMGFXOXVjeTVtYmlBaFBUMGdibTl2Y0NrZ2UxeHVJQ0FnSUc5d2RHbHZibk11WkdGMFlTQTlJR055WldGMFpVWnlZVzFsS0c5d2RHbHZibk11WkdGMFlTazdYRzRnSUNBZ0x5OGdWM0poY0hCbGNpQm1kVzVqZEdsdmJpQjBieUJuWlhRZ1lXTmpaWE56SUhSdklHTjFjbkpsYm5SUVlYSjBhV0ZzUW14dlkyc2dabkp2YlNCMGFHVWdZMnh2YzNWeVpWeHVJQ0FnSUd4bGRDQm1iaUE5SUc5d2RHbHZibk11Wm00N1hHNGdJQ0FnY0dGeWRHbGhiRUpzYjJOcklEMGdiM0IwYVc5dWN5NWtZWFJoV3lkd1lYSjBhV0ZzTFdKc2IyTnJKMTBnUFNCbWRXNWpkR2x2YmlCd1lYSjBhV0ZzUW14dlkydFhjbUZ3Y0dWeUtHTnZiblJsZUhRc0lHOXdkR2x2Ym5NZ1BTQjdmU2tnZTF4dVhHNGdJQ0FnSUNBdkx5QlNaWE4wYjNKbElIUm9aU0J3WVhKMGFXRnNMV0pzYjJOcklHWnliMjBnZEdobElHTnNiM04xY21VZ1ptOXlJSFJvWlNCbGVHVmpkWFJwYjI0Z2IyWWdkR2hsSUdKc2IyTnJYRzRnSUNBZ0lDQXZMeUJwTG1VdUlIUm9aU0J3WVhKMElHbHVjMmxrWlNCMGFHVWdZbXh2WTJzZ2IyWWdkR2hsSUhCaGNuUnBZV3dnWTJGc2JDNWNiaUFnSUNBZ0lHOXdkR2x2Ym5NdVpHRjBZU0E5SUdOeVpXRjBaVVp5WVcxbEtHOXdkR2x2Ym5NdVpHRjBZU2s3WEc0Z0lDQWdJQ0J2Y0hScGIyNXpMbVJoZEdGYkozQmhjblJwWVd3dFlteHZZMnNuWFNBOUlHTjFjbkpsYm5SUVlYSjBhV0ZzUW14dlkyczdYRzRnSUNBZ0lDQnlaWFIxY200Z1ptNG9ZMjl1ZEdWNGRDd2diM0IwYVc5dWN5azdYRzRnSUNBZ2ZUdGNiaUFnSUNCcFppQW9abTR1Y0dGeWRHbGhiSE1wSUh0Y2JpQWdJQ0FnSUc5d2RHbHZibk11Y0dGeWRHbGhiSE1nUFNCVmRHbHNjeTVsZUhSbGJtUW9lMzBzSUc5d2RHbHZibk11Y0dGeWRHbGhiSE1zSUdadUxuQmhjblJwWVd4ektUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnBaaUFvY0dGeWRHbGhiQ0E5UFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSEJoY25ScFlXeENiRzlqYXlrZ2UxeHVJQ0FnSUhCaGNuUnBZV3dnUFNCd1lYSjBhV0ZzUW14dlkyczdYRzRnSUgxY2JseHVJQ0JwWmlBb2NHRnlkR2xoYkNBOVBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVY0WTJWd2RHbHZiaWduVkdobElIQmhjblJwWVd3Z0p5QXJJRzl3ZEdsdmJuTXVibUZ0WlNBcklDY2dZMjkxYkdRZ2JtOTBJR0psSUdadmRXNWtKeWs3WEc0Z0lIMGdaV3h6WlNCcFppQW9jR0Z5ZEdsaGJDQnBibk4wWVc1alpXOW1JRVoxYm1OMGFXOXVLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIQmhjblJwWVd3b1kyOXVkR1Y0ZEN3Z2IzQjBhVzl1Y3lrN1hHNGdJSDFjYm4xY2JseHVaWGh3YjNKMElHWjFibU4wYVc5dUlHNXZiM0FvS1NCN0lISmxkSFZ5YmlBbkp6c2dmVnh1WEc1bWRXNWpkR2x2YmlCcGJtbDBSR0YwWVNoamIyNTBaWGgwTENCa1lYUmhLU0I3WEc0Z0lHbG1JQ2doWkdGMFlTQjhmQ0FoS0NkeWIyOTBKeUJwYmlCa1lYUmhLU2tnZTF4dUlDQWdJR1JoZEdFZ1BTQmtZWFJoSUQ4Z1kzSmxZWFJsUm5KaGJXVW9aR0YwWVNrZ09pQjdmVHRjYmlBZ0lDQmtZWFJoTG5KdmIzUWdQU0JqYjI1MFpYaDBPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQmtZWFJoTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJsZUdWamRYUmxSR1ZqYjNKaGRHOXljeWhtYml3Z2NISnZaeXdnWTI5dWRHRnBibVZ5TENCa1pYQjBhSE1zSUdSaGRHRXNJR0pzYjJOclVHRnlZVzF6S1NCN1hHNGdJR2xtSUNobWJpNWtaV052Y21GMGIzSXBJSHRjYmlBZ0lDQnNaWFFnY0hKdmNITWdQU0I3ZlR0Y2JpQWdJQ0J3Y205bklEMGdabTR1WkdWamIzSmhkRzl5S0hCeWIyY3NJSEJ5YjNCekxDQmpiMjUwWVdsdVpYSXNJR1JsY0hSb2N5QW1KaUJrWlhCMGFITmJNRjBzSUdSaGRHRXNJR0pzYjJOclVHRnlZVzF6TENCa1pYQjBhSE1wTzF4dUlDQWdJRlYwYVd4ekxtVjRkR1Z1WkNod2NtOW5MQ0J3Y205d2N5azdYRzRnSUgxY2JpQWdjbVYwZFhKdUlIQnliMmM3WEc1OVhHNGlYWDA9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvaGFuZGxlYmFycy9kaXN0L2Nqcy9oYW5kbGViYXJzL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gZnVuY3Rpb24gKEhhbmRsZWJhcnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgdmFyIHJvb3QgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHdpbmRvdyxcbiAgICAgICRIYW5kbGViYXJzID0gcm9vdC5IYW5kbGViYXJzO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBIYW5kbGViYXJzLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJvb3QuSGFuZGxlYmFycyA9PT0gSGFuZGxlYmFycykge1xuICAgICAgcm9vdC5IYW5kbGViYXJzID0gJEhhbmRsZWJhcnM7XG4gICAgfVxuICAgIHJldHVybiBIYW5kbGViYXJzO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJaTR1THk0dUx5NHVMMnhwWWk5b1lXNWtiR1ZpWVhKekwyNXZMV052Ym1ac2FXTjBMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN08zRkNRVU5sTEZWQlFWTXNWVUZCVlN4RlFVRkZPenRCUVVWc1F5eE5RVUZKTEVsQlFVa3NSMEZCUnl4UFFVRlBMRTFCUVUwc1MwRkJTeXhYUVVGWExFZEJRVWNzVFVGQlRTeEhRVUZITEUxQlFVMDdUVUZEZEVRc1YwRkJWeXhIUVVGSExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTTdPMEZCUld4RExGbEJRVlVzUTBGQlF5eFZRVUZWTEVkQlFVY3NXVUZCVnp0QlFVTnFReXhSUVVGSkxFbEJRVWtzUTBGQlF5eFZRVUZWTEV0QlFVc3NWVUZCVlN4RlFVRkZPMEZCUTJ4RExGVkJRVWtzUTBGQlF5eFZRVUZWTEVkQlFVY3NWMEZCVnl4RFFVRkRPMHRCUXk5Q08wRkJRMFFzVjBGQlR5eFZRVUZWTEVOQlFVTTdSMEZEYmtJc1EwRkJRenREUVVOSUlpd2labWxzWlNJNkltNXZMV052Ym1ac2FXTjBMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5b2daMnh2WW1Gc0lIZHBibVJ2ZHlBcUwxeHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0b1NHRnVaR3hsWW1GeWN5a2dlMXh1SUNBdktpQnBjM1JoYm1KMWJDQnBaMjV2Y21VZ2JtVjRkQ0FxTDF4dUlDQnNaWFFnY205dmRDQTlJSFI1Y0dWdlppQm5iRzlpWVd3Z0lUMDlJQ2QxYm1SbFptbHVaV1FuSUQ4Z1oyeHZZbUZzSURvZ2QybHVaRzkzTEZ4dUlDQWdJQ0FnSkVoaGJtUnNaV0poY25NZ1BTQnliMjkwTGtoaGJtUnNaV0poY25NN1hHNGdJQzhxSUdsemRHRnVZblZzSUdsbmJtOXlaU0J1WlhoMElDb3ZYRzRnSUVoaGJtUnNaV0poY25NdWJtOURiMjVtYkdsamRDQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJR2xtSUNoeWIyOTBMa2hoYm1Sc1pXSmhjbk1nUFQwOUlFaGhibVJzWldKaGNuTXBJSHRjYmlBZ0lDQWdJSEp2YjNRdVNHRnVaR3hsWW1GeWN5QTlJQ1JJWVc1a2JHVmlZWEp6TzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1NHRnVaR3hsWW1GeWN6dGNiaUFnZlR0Y2JuMWNiaUpkZlE9PVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2hhbmRsZWJhcnMvZGlzdC9janMvaGFuZGxlYmFycy9uby1jb25mbGljdC5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RhYmxlLWxvYWQtZm9ybS5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBQcmVwYXJlIGNzc1RyYW5zZm9ybWF0aW9uXG52YXIgdHJhbnNmb3JtO1xuXG52YXIgb3B0aW9ucyA9IHt9XG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RhYmxlLWxvYWQtZm9ybS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3RhYmxlLWxvYWQtZm9ybS5zY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3RhYmxlLWxvYWQtZm9ybS90YWJsZS1sb2FkLWZvcm0uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBOzs7OztBQ2x5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2R0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeEZBO0FBQ0E7Ozs7O0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QSIsInNvdXJjZVJvb3QiOiIifQ==