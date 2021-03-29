/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "#header {\n    position: fixed;\n    overflow: hidden;\n    top: 0;\n    left: 0;\n    width: 100%;\n    background-color:  rgb(128, 183, 255);\n    color: rgb(0, 0, 0);\n    height: 50px;\n    display: flex;\n    align-items: center;\n}\n\nbody {\n    background: rgb(255, 0, 0);\n    color: rgb(26, 26, 26);\n    margin: 0;\n    padding: 0;\n    overflow: hidden;\n}\n\n#app-container {\n    display: grid;\n    grid-template-columns: 30% 70%;\n    width: 100vw;\n    height: 100vh;\n    max-width: 100%;\n    margin-top: 50px;\n}\n\n#project-container {\n    background-color: rgb(236, 236, 236);\n    grid-column: 1 / 1;\n    border: solid rgb(187, 187, 187);\n    padding: 5px;\n}\n\n\n#todo-container {\n    display: flex;\n    flex-direction: column;\n    grid-column: 2 / 2;\n    background-color: rgb(255, 255, 255);\n    border: solid rgb(187, 187, 187);\n    padding: 5px;\n}\n\n.project-instance {\n    \n}\n\n.todo-instance {\n    border-bottom: 1px solid rgb(182, 182, 182);\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n}\n\nbutton {\n    color: red;\n    width: 150px;\n    \n}\n\n#add-project-button {\n    grid-column: 1 / 1;\n}\n\n#add-todo-button {\n    grid-column: 2 / 2;\n}\n\n.modal {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n    align-items: center;\n    color: white;\n    background-color: rgb(0, 41, 41);\n    position: fixed;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    \n}\n\n.modal-form {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-around;\n    align-items: center;\n    padding: 10px;\n}\n\n.hide {\n    transform: scale(0%);\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInstance": () => (/* binding */ ProjectInstance),
/* harmony export */   "TodoInstance": () => (/* binding */ TodoInstance)
/* harmony export */ });
const ProjectInstance = (name, dueDate, moreInfo, todos) => {
    todos = [];
    return {name, dueDate, moreInfo, todos
    }
};


const TodoInstance = (name, dueDate, priority, checkBox, moreInfo) => {
    return {name, dueDate, priority, checkBox, moreInfo}
};




/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalEvents": () => (/* binding */ modalEvents)
/* harmony export */ });
/* harmony import */ var _domdisplay_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _datacapture_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



const modalEvents = (function () {
    const todoModal = document.getElementById('todo-modal');
    const projectModal = document.getElementById('project-modal')

    const newTodoButton = document.getElementById('add-todo-button');
    const confirmTodoButton = document.getElementById('confirm-todo');
    const newProjectButton = document.getElementById('add-project-button');
    const confirmProjectButton = document.getElementById('confirm-project')

    function hideModal(element) {
        element.classList.add('hide');
    };

    function displayModal(element) {
        element.classList.remove('hide');
    };

    //bring up new project input
    newProjectButton.addEventListener('click', () => {
        displayModal(projectModal);
    });

    //confirm new project
    confirmProjectButton.addEventListener('click', () => {
        hideModal(projectModal);
    });

    //bring up new todo input
    newTodoButton.addEventListener('click', () => {
        displayModal(todoModal);
    });

    //confirm new todo
    confirmTodoButton.addEventListener('click', () => {
        hideModal(todoModal);
        (0,_datacapture_js__WEBPACK_IMPORTED_MODULE_1__.todoCapture)();   
        (0,_domdisplay_js__WEBPACK_IMPORTED_MODULE_0__.render)();   

    });

})();




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayProjects": () => (/* binding */ displayProjects),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _datacapture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);





const displayProjects = (function () {
    const projectParent = document.getElementById('project-parent');


    //Display projects in project container

    function addToDom() {
        
        projectParent.innerHTML = ''

        for (let i = 0; i < _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.projectCapture.myProjects.length; i++) {
            const newDiv = document.createElement('div');
            const newSpan = document.createElement('span');
            const deleteBtn = document.createElement('button');

            projectParent.appendChild(newDiv);
            newDiv.setAttribute('id', 'project' + i);
            newDiv.classList.add('project-instance');
            newDiv.textContent = _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.projectCapture.myProjects[i].name + ' ';

            newDiv.appendChild(newSpan);
            newSpan.classList.add('project-name');
            newSpan.textContent = _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.projectCapture.myProjects[i].dueDate;

            newSpan.appendChild(deleteBtn);
            deleteBtn.setAttribute('id', 'delete' + i);
            deleteBtn.innerHTML = '-'

            deleteBtn.addEventListener('click', () => {
                _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.projectCapture.myProjects.splice(i, 1);
                render();
                _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.selectCurrentProject.currentProject = [];
                _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.projectCapture.saveProjects();
            })


            newDiv.addEventListener('click', () => {
                _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.selectCurrentProject.currentProject = _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.projectCapture.myProjects[i];
                console.log(_datacapture_js__WEBPACK_IMPORTED_MODULE_0__.selectCurrentProject.currentProject)
            })



        }


    }

    const todoParent = document.getElementById('todo-parent');

    function displayTodos() {

        todoParent.innerHTML = '';

        for (let i = 0; i < _datacapture_js__WEBPACK_IMPORTED_MODULE_0__.selectCurrentProject.currentProject.todos; i++) {

            const newTodo = document.createElement('div');
            todoParent.appendChild(newTodo);
            newTodo.innerHTML = 'success';


        }
        //console.log(todos)


    }


    return {
        addToDom,
        projectParent,
        todoParent,
        displayTodos


    }

})();


function render() {
    displayProjects.todoParent.innerHTML = '';
    displayProjects.projectParent.innerHTML = '';
    displayProjects.addToDom();
    displayProjects.displayTodos();
    


}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectCapture": () => (/* binding */ projectCapture),
/* harmony export */   "selectCurrentProject": () => (/* binding */ selectCurrentProject),
/* harmony export */   "todoCapture": () => (/* binding */ todoCapture)
/* harmony export */ });
/* harmony import */ var _constructors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _domdisplay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _domevents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);





const projectCapture = (function () {
    
    const confirmProjectButton = document.getElementById('confirm-project')

    let houseWork = (0,_constructors_js__WEBPACK_IMPORTED_MODULE_0__.ProjectInstance)('House Work', '06/12/22', 'Need to clean the whole house');

    let myProjects = [houseWork];

    //Create new project and add to array
    confirmProjectButton.addEventListener('click', () => {
        const projectName = document.getElementById('project-name').value
        const projectDueDate = document.getElementById('project-due-date').value
        const projectDescription = document.getElementById('project-description').value
        let newProject = (0,_constructors_js__WEBPACK_IMPORTED_MODULE_0__.ProjectInstance)(projectName, projectDueDate, projectDescription);
        myProjects.push(newProject);
        selectCurrentProject.currentProject = newProject;
        console.log(selectCurrentProject.currentProject)
        saveProjects();
        (0,_domdisplay_js__WEBPACK_IMPORTED_MODULE_1__.render)();

    })



    //Saves project array
    function saveProjects() {
        localStorage.setItem('myProjects', JSON.stringify(myProjects));
    }

    if (!localStorage.myProjects) {
        return
    } else {
        myProjects = JSON.parse(window.localStorage.getItem('myProjects'));
    }


    return {
        myProjects,
        saveProjects
    }

})();




const selectCurrentProject = (function () {

    let currentProject;

    return {
        currentProject
    }

})();








function todoCapture() {

    const todoName = document.getElementById('todo-name').value
    const todoDueDate = document.getElementById('todo-due-date').value
    const todoPriority = document.getElementById('priority-select').value
    const todoCheckbox = false;
    const todoDescription = document.getElementById('todo-info').value

    let newTodo = (0,_constructors_js__WEBPACK_IMPORTED_MODULE_0__.TodoInstance)(todoName, todoDueDate, todoPriority, todoCheckbox, todoDescription)
    selectCurrentProject.currentProject.todos.push(newTodo);

    projectCapture.saveProjects();
    


}




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_domdisplay_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _modules_constructors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _modules_domevents_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _modules_datacapture_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);









let hooverStairs = (0,_modules_constructors_js__WEBPACK_IMPORTED_MODULE_2__.TodoInstance)('Hoover the stairs', '11/12/22', 'High', false, 'Get right in those corners');
_modules_datacapture_js__WEBPACK_IMPORTED_MODULE_4__.selectCurrentProject.currentProject = [];
(0,_modules_domdisplay_js__WEBPACK_IMPORTED_MODULE_1__.render)();








})();

/******/ })()
;