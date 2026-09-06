// hand-transpiled from components/services/fe-utilities.ts (no tsc on this box).
// Type annotations, access modifiers and `<any>` casts stripped; TS parameter
// properties and class-field initialisers moved into the constructor the way
// tsc would have emitted them. Logic and strings are unchanged.
class Utils {

  constructor(Notify, $http, $q, $uibModal, Current, $window, $log, $rootScope, UserService, $state,
              PermissionService, $filter) {
    this.Notify = Notify;
    this.$http = $http;
    this.$q = $q;
    this.$uibModal = $uibModal;
    this.Current = Current;
    this.$window = $window;
    this.$log = $log;
    this.$rootScope = $rootScope;
    this.UserService = UserService;
    this.$state = $state;
    this.PermissionService = PermissionService;
    this.$filter = $filter;

    this.getEnumAsArray = (EnumClassName) => {
      const objValues = Object.keys(EnumClassName).map(k => EnumClassName[k]);
      const ary = objValues.filter(v => typeof v === "string");
      return ary;
    };

    this.browser = {
      //not implemented
    };
  }

  get host() {
    return location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
  }

  get currentContainer() {
    return this.$state.params.containerId;
  }

  get chartColors() {
    return ['#009688', '#3366CC', '#DC3912', '#FF9900', '#990099'];
  }

  goingForward () {
    this.$rootScope.goingForward = true;
  }

  fileUrl(file) {
    return '/api/file?id=' + file._id;
  }

  redirectPermissionDeniedToHome () {
    this.PermissionService.coursePermissions.then(resp => {
      if (!resp.data.UPDATE_COURSE) {
        this.$state.go('home');
      }
    });
  }

  lockFrontend () {
    let height = $(document).height();
    $('html').append(`<div id="frontend-lock" style="position:absolute; top:0; width:100%;height:` + height + `px;opacity:0.3;z-index:100;background:#000;">
<div class="tb-spinner screen-center" style="z-index:101"></div>
</div>`);
  }

  unlockFrontend() {
    $('#frontend-lock').remove();
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = decodeURI(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  postFile(file, uploadUrl) {
    var fd = new FormData();
    fd.append('file', file);
    var resp = this.$http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    });
    return resp;
  }

  swap (list, index1, index2) {
    let b = list[index2];
    list[index2] = list[index1];
    list[index1] = b;
  }

  isOfType (task, type) {
    return typeof task.type === 'string' ? task.type === type : task.type === TaskType[type];
  }

  colorFromHexString (n,str) {
    return '#' + str.slice(n*6, (n+1)*6);
  }

  buildQueryString (obj) {
    var qstr = "";
    angular.forEach(obj, (vl, ky) => {
      if (angular.isArray(vl)) {
        angular.forEach(vl, (elt) => {
          qstr += "&" + ky + "=" + elt;
        });
      } else {
        qstr += "&" + ky + "=" + vl;
      }
    });
    return qstr;
  }

  isUrl (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

  removeObjectWithId (aray, id) {
    angular.forEach(aray, (obj, idx) => {
      if (obj._id === id) {
        aray.splice(idx, 1);
      }
    });
    return aray;
  }

  imageUrl (image) {
    if (image.filetype) {
      return 'data:' + image.filetype + ';base64,' + image.base64;
    } else {
      return image.base64;
    }
  }

  resizeImage ( file, params) {

    var resized = {};

    var deferred = this.$q.defer();

    var img = document.createElement("img");
    var reader = new FileReader();
    reader.onload = (e) => {
      // resize the picture
      img.src = e.target.result;

      var canvas = document.createElement("canvas");

      var MAX_WIDTH = params.maxWidth || 150;
      var MAX_HEIGHT = params.maxHeight || 150;
      var width = img.width;
      var height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      resized.base64 = canvas.toDataURL("image/png");
      deferred.resolve(resized);
    };
    reader.readAsDataURL(file, "UTF-8");

    return deferred.promise;

  }

  get isMobile() {
    return this.$window.innerWidth < 768;
  }

  camelCaseToDash(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  openComponentModal (componentName, bindings) {

    let resolve = {
      component: () => {
        return componentName;
      },
      bindings: () => {
        return bindings;
      }
    };

    return this.$uibModal.open({
      animation: true,
      component: 'modal',
      resolve: resolve
    });

  }

  openModal (modalNameDash, modalNameCamelCase, scope, obj, modalOptions) {
    var resolveObj = {
      resolveObj: function () {
        return obj;
      }
    };
    var modalMainOptions = {
      templateUrl: 'components/modals/' + modalNameDash + '/' + modalNameDash + '-modal.html',
      controller: modalNameCamelCase + 'ModalController',
      scope: scope,
      resolve: resolveObj,
      windowClass: 'app-modal-window'
    }
    modalOptions = modalOptions || {};
    modalOptions = angular.extend(modalOptions, modalMainOptions);
    this.$uibModal.open(modalOptions);
  }

  findBootstrapEnvironment () {
    var envs = ['xs', 'sm', 'md', 'lg'];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envs.length - 1; i >= 0; i--) {
      var env = envs[i];

      $el.addClass('hidden-'+env);
      if ($el.is(':hidden')) {
        $el.remove();
        return env;
      }
    }
  }

  get defaultVideo () {
    return 'https://youtu.be/GEmuEWjHr5c';
  }

  onMobile (scope) {
    scope.onMobile = window.innerWidth < 768;
    $( window ).resize(() => {
      scope.onMobile = window.innerWidth < 768;
      scope.$apply();
    });
  }

  urlContains (hostSlice) {
    return window.location.hostname.indexOf(hostSlice) > -1;
  }

  typeIcon (type) {

    let typeIconMap = {
      videounit: 'play',
      onlineunit: 'tasks',
      sheet: 'file-text',
      theoryunit: 'book',
      flashcardunit: 'clone',
      block: 'square',
      //open: 'circle-o',
      //mc: 'check-square',
      //gap: 'gap'
    };

    return typeIconMap[type];
  }

  removeDuplicates (a, b, prop) {

    var toMap = (arr, prop) => {
      var map = {};

      angular.forEach(arr, (entry) => {
        map[entry[prop]] = true;
      });
      return map;
    };

    var m = toMap(b, prop || '_id');

    for (var i = a.length - 1; i >= 0; i--) {
      if ( m.hasOwnProperty(a[i]._id)) {
        a.splice(i, 1);
      }
    }

    return a;
  }

  capitalize (str) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  getIds (a) {
    var ids = [];
    angular.forEach(a, (val) => {
      ids.push(val._id);
    });
    return ids;
  }

  weekAgo () {
    var weekInMillis = 1000*60*60*24*7;
    var weekAgo = new Date().getTime() - weekInMillis;
    return weekAgo;
  }

  //appends e.g. param1=bla&param2=blub e.g. to /api/bla? or to /api/bla?somethingalreadyhere=true&
  addQueryParams (queryUrl, params) {
    if (params) {
      var lfn = (val) => {
        str.push(p + "=" + val);
      };
      var str = [];
      for(var p in params) {
        if (params.hasOwnProperty(p)) {
          if (Array.isArray(params[p])) {
            angular.forEach(params[p], lfn);
          } else {
            str.push(p + "=" + params[p]);
          }
        }
      }
      if (queryUrl.slice(-1) === '&' || queryUrl.slice(-1) === '?') {
        return queryUrl + str.join("&");
      } else if (queryUrl.indexOf("?") > -1) {
        return queryUrl + "&" + str.join("&");
      } else {
        return queryUrl + "?" + str.join("&")
      }
    } else {
      return queryUrl;
    }
  }

  allowedChildren (parent) {
    if (parent.type === 'course') {
      return this.objectivesAndBlock;
    } else if (parent.type === 'block') {
      return this.objectives;
    } else if (parent.type === 'sheet') {
      return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video'];
    } else if (parent.type === 'onlineunit') {
      return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video'];
    } else if (parent.type === 'theoryunit') {
      return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video']
    } else if (parent.type === 'flashcardunit') {
      return ['flashcard']
    } else if (parent.type === 'videounit') {
      return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video']
    }
  }

  static convertStringToXmlIfContentTypeIsWysiwyg (str, contentType) {
    return contentType === 'wysiwyg' ? '<content>' + str + '</content>' : str;
  }

  static convertStringToHtmlIfContentTypeIsWysiwyg (str, contentType) {
    return contentType === 'wysiwyg' ? '<div class="content">' + str + '</div>' : str;
  }

  doOnEnter(e, fn) {
    var charCode = e.charCode || e.keyCode || e.which;
    if(charCode === 13) {
      fn();
    }
  }

  isEnter(e) {
    let isEnter = false;
    var charCode = e.charCode || e.keyCode || e.which;
    if(charCode === 13) {
      isEnter = true;
    }
    return isEnter;
  }

  updateIds (updateMap) {
    //nothing to do anymore
  }

  objectiveSvg (objective) {
    //semi code dup
    var str = "assets/img/icons/objective-icons/";
    str += objective.type;
    str += ".svg";
    return str;
  }

  numberToAlphabet(idx) {
    return String.fromCharCode(idx+97);
  }

  getUserName (user) {
    if (user) {
      if (user.firstName || user.lastName) {
        return user.firstName + " " + user.lastName;
      } else {
        var re = /.+?(?=@|$)/;
        if (user.email) {
          return user.email.match(re)[0];
        }
      }
    }
  }

  serializeId(id) {
    return id.key + this.versionSeparator + id.version;
  }

  deserializeId(str) {
    let key = str.substr(0,str.indexOf(this.versionSeparator));
    let version = str.substr(str.indexOf(this.versionSeparator)+this.versionSeparator.length);

    let id = {
      key: key,
      version: version
    }
    return id;
  }

  getPrecision(number, precision) {
    var fractionSize = (number + "").split(".")[1];

    if (fractionSize) {
      fractionSize = fractionSize.length
    } else {
      fractionSize = 0
    }

    if (fractionSize < precision) {
      return number.toFixed(fractionSize);
    } else {
      return number.toFixed(precision);
    }
  }

  escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  escapeRegexReplacementString(str) {
    return str.replace(/\$/g, "$$$$");
  }

  mainMathStartDelimiter(c) {
    return c.delimiters[0][0];
  }
  mainMathEndDelimiter(c) {
    return c.delimiters[0][1];
  }
  get mathConstants() {
    return [{
      type: 'block',
      delimiters: [['$$','$$'],['\\[','\\]']],
      xmlClass: "bigmath"
    },{
      type: 'inline',
      delimiters: [['$','$'],['\\(','\\)']],
      xmlClass: "math"
    }];
  }

  get onPrint() {
    return this.$state.current.name === 'print';
  }

  get primaryColor() {
    return '#009688';
  }

  get secondaryColor() {
    return '#f2e394';
  }

  taskCategory(type) {
    if (type) {
      if (type === 'mc' || type === 'truefalse' || type === 'open' || type === 'theory' || type === 'video' || type === 'gap' || type === 'solutionfield') {
        return 'task';
      } else if (type === 'flashcard') {
        return 'flashcard'
      } else if (type && type.indexOf("unit") > -1 || type === 'sheet' || type === 'autoobjective') {
        return 'objective';
      } else if (type === 'block') {
        return 'block';
      } else if (type === 'course') {
        return 'course';
      } else {
        return 'unspecified';
      }
    } else {
      return 'unspecified';
    }
  }

  //this is useful since when you would do oldObject = newObject angular doesn't update
  //old object and new object should be of the same type
  makeEqualWithoutChangingReference(oldObject, newObject) {

    //to update all existing properties in oldObject
    for (var property in oldObject) {
      if (oldObject.hasOwnProperty(property)) {
        oldObject[property] = newObject[property];
      }
    }

    //to account for properties that are new in newObject
    for (var property in newObject) {
      if (newObject.hasOwnProperty(property)) {
        oldObject[property] = newObject[property];
      }
    }

    //both loops are necessary since we need to find the props to delete in oldObjects and the new ones in newObject

  }

  taskIsInCategory(task, category) {
    if (task && task.type) {
      let type = task.type;
      if (type === 'mc' || type === 'truefalse' || type === 'open' || type === 'gap' || type === 'solutionfield') {
        return category === 'exercise' || category === 'task'
      } else if (type === 'theory' || type === 'video') {
        return category === 'theory' || category === 'task';
      } else if (type === 'flashcard') {
        return category === 'flashcard';
      } else if (type && type.indexOf("unit") > -1 || type === 'sheet' || type === 'autoobjective') {
        return category === 'objective';
      } else if (type === 'block') {
        return category === 'block';
      } else if (type === 'course') {
        return category === 'course';
      }
    }
  }

  getTaskTitle(task) {
    return this.$filter('translate')(task.title || this.typeFeName(task.type));
  }

  typeFeName(type) {

    let nameMap = {'mc':'Multiple Choice',
      'truefalse': 'True / False Question',
      'flashcard':'Flashcard',
      'open':'Open Question',
      'theory':'Theory',
      'theoryunit':'Theory',
      'onlineunit':'Quiz',
      'sheet':'Sheet',
      'flashcardunit':'Flashcards',
      'videounit':'Video',
      'video':'Video',
      'block':'Block',
      'course':'Course',
      'gap': 'Text',
      'solutionfield': 'Solution Field'
    }

    return nameMap[type];

  }

  get implementedLanguages() {
    return ['de', 'en'];
  }

  get objectives() {
    return ['sheet', 'onlineunit', 'flashcardunit'];
  }

  get objectivesAndBlock() {
    return ['block'].concat(this.objectives);
  }

  get contentType() {
    return (this.UserService.getUser().preferredContentType === 'latex' || this.$state.params.latex) ?
        'latex' : 'wysiwyg';
  }

  isPublished(task) {
    if (task) {
      let isPub = false;
      if (task.start && new Date(task.start) < new Date()) {
        isPub = true;
      }
      return isPub;
    } else {
      this.$log.error('no task found');
      this.$log.debug('Problem in: ' + arguments.callee.caller.toString());
    }
  }

  getTypesFromCategory(category) {
    if (category === 'block') {
      return ['block']
    } else if (category === 'objective') {
      return this.objectives;
    } else {
      this.$log.error('category types not defined!!!');
    }
  }

  get versionSeparator() {
    return '__';
  }
}
Utils.$inject = ['Notify', '$http', '$q', '$uibModal', 'Current', '$window', '$log', '$rootScope', 'UserService', '$state',
  'PermissionService', '$filter'];

angular.module('taskbaseApp').service('Utils', Utils);
