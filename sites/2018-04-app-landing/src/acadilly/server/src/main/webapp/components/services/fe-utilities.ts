class Utils {

  static $inject = ['Notify', '$http', '$q', '$uibModal', 'Current', '$window', '$log', '$rootScope', 'UserService', '$state',
  'PermissionService', '$filter', 'AppSettingsService'];

  constructor(
      private Notify,
      private $http,
      private $q: IQService,
      private $uibModal,
      private Current: Current,
      private $window,
      private $log: ILogService,
      private $rootScope,
      private UserService: UserService,
      private $state,
      private PermissionService: PermissionService,
      private $filter,
      private AppSettingsService: AppSettingsService
  ) {
  };

  public isInternetExplorer(): boolean { // not tested yet, but would be more concise than SO answers...
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ') > -1;
    const trident = ua.indexOf('Trident/') > -1;
    return msie || trident;
  }

  public sortedListMerger = (sorted1: number[], sorted2: number[]) => {
    let out: number[] = [];
    let i:number = 0;
    let j:number = 0;

    while (i < sorted1.length || j < sorted2.length) {

      if (i === sorted1.length) {
        out = out.concat(sorted2.slice(j, sorted2.length));
        return out;
      } else if (j === sorted2.length) {
        out = out.concat(sorted2.slice(i, sorted1.length));
        return out;
      } else if (sorted1[i] < sorted2[j]) {
        out.push(sorted1[i]);
        i++;
      } else {
        out.push(sorted2[j]);
        j++;
      }

    }

  };

  public get currentCourseHasSubject() {
    return this.Current.course && this.Current.course.courseSettings && this.Current.course.courseSettings.subjects
        && this.Current.course.courseSettings.subjects.length > 0;
  }

  public get currentCourseSubject(): string {
    if (this.currentCourseHasSubject) {
      return this.Current.course.courseSettings.subjects[0]
    }
  }

  public get subjectDependentFeature() {
    return {
      mathHandwritingRecognition: this.currentCourseSubject === 'MATHEMATICS' ||
          this.currentCourseSubject === 'PHYSICS' ||
          this.currentCourseSubject === 'CHEMISTRY',

      flashcardWriting: this.currentCourseIsLanguageSubject
    }
  }

  private get currentCourseIsLanguageSubject () {
    return this.currentCourseSubject === 'GERMAN' ||
        this.currentCourseSubject === 'FRENCH' ||
        this.currentCourseSubject === 'ITALIAN' ||
        this.currentCourseSubject === 'SPANISH' ||
        this.currentCourseSubject === 'ENGLISH'
  }

  
  public get deadlineOver(): boolean {

    if (!this.deadlineIsSet) {
      return false;
    }

    let endDate = new Date(this.Current.objective.end);
    endDate.setDate(endDate.getDate() + 1);

    return new Date() > endDate;

  }

  public get hideSolution(): boolean {
    return this.deadlineIsSet && !this.deadlineOver && this.Current.objective.displaySolution === 'afterend';
  }

  public get deadlineIsSet(): boolean {
    return this.Current.objective && this.Current.objective.type === 'sheet' && this.Current.objective.end;
  }

  public getStateKey() {
    return this.$state.current.name + JSON.stringify(this.$state.params);
  }
  public getStateKeyByNameAndParams(stateName, params) {
    return stateName + JSON.stringify(params);
  }

  //forward if state is different from existing state
  public forward(newStateName: string, newStateParams: {[key: string]: string} ) {
    if (this.getStateKeyByNameAndParams(newStateName, newStateParams) !== this.getStateKey()) {

      let replaceOldBackStateIfExists = () => {
        if (this.$rootScope.previousStates && this.$rootScope.previousStates[this.getStateKey()]) {
          this.$rootScope.previousStates[this.getStateKeyByNameAndParams(newStateName, newStateParams)] =
              this.$rootScope.previousStates[this.getStateKey()];
          delete this.$rootScope.previousStates[this.getStateKey()]
        }
      };
      replaceOldBackStateIfExists();

      this.$state.go(newStateName, newStateParams);
    }
  }

  public highlightText(elementId): void {
    let doc = document
        , text = doc.getElementById(elementId)
        , range, selection
        ;
    if ((<any>doc.body).createTextRange) {
      range = (<any>document.body).createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  public get host() {
    return location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
  }

  public get currentContainer() {
    return this.$state.params.containerId;
  }

  public get chartColors() {
    return [this.AppSettingsService.getSettings().colors.primary,
      '#3366CC', '#DC3912', '#FF9900', '#990099'];
  }

  public goingForward () {
    this.$rootScope.goingForward = true;
  }

  public fileUrl(file: TbFile): string {
    return '/api/file?id=' + file._id;
  }

  public redirectPermissionDeniedToCourse () {
    this.PermissionService.coursePermissions.then(resp => {
      if (!resp.data.UPDATE_COURSE) {
        this.$state.params.containerId ? this.$state.go('course', {containerId: this.$state.params.containerId}) : this.$state.go('home');
      }
    });
  }


  public lockFrontend (): void {
    let height = $(document).height();
    $('html').append(`<div id="frontend-lock" style="position:absolute; top:0; width:100%;height:` + height + `px;opacity:0.3;z-index:100;background:#000;">
<div class="tb-spinner screen-center" style="z-index:101"></div>
</div>`);
  }

  public unlockFrontend(): void {
    $('#frontend-lock').remove();
  }

  public getEnumAsArray = (EnumClassName) => {
    const objValues = Object.keys(EnumClassName).map(k => EnumClassName[k]);
    const ary: string[] = objValues.filter(v => typeof v === "string") as string[];
    return ary;
  }

  public dataURItoBlob(dataURI) {
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

  public postFile(file: File, uploadUrl: string) {
    var fd = new FormData();
    fd.append('file', file);
    var resp = this.$http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    });
    return resp;
  }

  public swap (list: any[], index1: number, index2: number) {
    let b = list[index2];
    list[index2] = list[index1];
    list[index1] = b;
  }

  public isOfType (task, type: string) {
    return typeof task.type === 'string' ? task.type === type : task.type === TaskType[type];
  }

  public colorFromHexString (n,str) {
    return '#' + str.slice(n*6, (n+1)*6);
  };

  public buildQueryString (obj) {
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
  };

  public isUrl (str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  };


  public removeObjectWithId (aray, id) {
    angular.forEach(aray, (obj, idx) => {
      if (obj._id === id) {
        aray.splice(idx, 1);
      }
    });
    return aray;
  };

  public imageUrl (image) {
    if (image.filetype) {
      return 'data:' + image.filetype + ';base64,' + image.base64;
    } else {
      return image.base64;
    }
  };

  public resizeImage ( file, params?) {

    var resized = {};

    var deferred = this.$q.defer();

    var img = document.createElement("img");
    var reader = new FileReader();
    reader.onload = (e) => {
      // resize the picture
      img.src = (<any>e.target).result;

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

      (<any>resized).base64 = canvas.toDataURL("image/png");
      deferred.resolve(resized);
    };
    (<any>reader).readAsDataURL(file, "UTF-8");

    return deferred.promise;

  };

  public get isMobile():boolean {
    return this.$window.innerWidth < 768;
  }

  public camelCaseToDash(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  public openComponentModal (componentName: string, bindings?, settings?) {

    let resolve = {
      component: () => {
        return componentName;
      },
      bindings: () => {
        return bindings;
      },
      settings: () => {
        return settings
      }
    };

    return this.$uibModal.open({
      animation: true,
      component: 'modal',
      resolve: resolve,
      windowClass: settings && settings.fullWidth ? 'full-width-modal' : undefined
    });

  }

  public openModal (modalNameDash, modalNameCamelCase, scope, obj?, modalOptions?) {
    let resolveObj = {
      resolveObj: function () {
        return obj;
      }
    };
    let modalMainOptions = {
      templateUrl: '/components/modals/' + modalNameDash + '/' + modalNameDash + '-modal.html',
      controller: modalNameCamelCase + 'ModalController',
      scope: scope,
      resolve: resolveObj,
      windowClass: 'app-modal-window'
    };
    modalOptions = modalOptions || {};
    modalOptions = angular.extend(modalOptions, modalMainOptions);
    this.$uibModal.open(modalOptions);
  }

  public findBootstrapEnvironment () {
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
  };

  public get defaultVideo (): string {
    return 'https://youtu.be/GEmuEWjHr5c';
  }

  public onMobile (scope) {
    scope.onMobile = window.innerWidth < 768;
    $( window ).resize(() => {
      scope.onMobile = window.innerWidth < 768;
      scope.$apply();
    });
  };

  public urlContains (hostSlice) {
    return window.location.hostname.indexOf(hostSlice) > -1;
  };

  public typeIcon (type: TaskTypeEnum):string {

    let typeIconMap = {
      videounit: 'fa fa-play',
      onlineunit: 'tbi-quiz',
      sheet: 'fa fa-file-text',
      theoryunit: 'fa fa-book',
      flashcardunit: 'fa fa-clone',
      block: 'fa fa-square',
      //open: 'circle-o',
      //mc: 'check-square',
      //gap: 'gap'
    };

    return typeIconMap[type];
  }

  public removeDuplicates (a, b, prop) {

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
  };

  capitalize (str) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  };

  getIds (a) {
    var ids = [];
    angular.forEach(a, (val) => {
      ids.push(val._id);
    });
    return ids;
  };

  browser = {
    //not implemented
  };

  public weekAgo () {
    var weekInMillis = 1000*60*60*24*7;
    var weekAgo = new Date().getTime() - weekInMillis;
    return weekAgo;
  };

  //appends e.g. param1=bla&param2=blub e.g. to /api/bla? or to /api/bla?somethingalreadyhere=true&
  public addQueryParams (queryUrl, params) {
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
  };

  public allowedChildren (parent: Task) : TaskTypeEnum[] {
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

  public static convertStringToXmlIfContentTypeIsWysiwyg (str: string, contentType) {
    return contentType === 'wysiwyg' ? '<content>' + str + '</content>' : str;
  }

  public static convertStringToHtmlIfContentTypeIsWysiwyg (str: string, contentType) {
    return contentType === 'wysiwyg' ? '<div class="content">' + str + '</div>' : str;
  }

  public doOnEnter(e, fn) {
    var charCode = e.charCode || e.keyCode || e.which;
    if(charCode === 13) {
      fn();
    }
  }

  public isEnter(e) {
    let isEnter = false;
    var charCode = e.charCode || e.keyCode || e.which;
    if(charCode === 13) {
      isEnter = true;
    }
    return isEnter;
  }

  public updateIds (updateMap) {
    //nothing to do anymore
  };

  public objectiveSvg (objective) {
    //semi code dup
    var str = "/assets/img/icons/objective-icons/";
    str += objective.type;
    str += ".svg";
    return str;
  };

  public numberToAlphabet(idx) {
    return String.fromCharCode(idx+97);
  }

  public getUserName (user: User) {
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

  public serializeId(id: ComposedId): string {
    return id.key + this.versionSeparator + id.version;
  }

  public deserializeId(str: string): ComposedId {
    let key = str.substr(0,str.indexOf(this.versionSeparator));
    let version = str.substr(str.indexOf(this.versionSeparator)+this.versionSeparator.length);

    let id: ComposedId = {
      key: key,
      version: version
    }
    return id;
  }

  public getPrecision(number: number, precision: number): string {
    var fractionSize: any = (number + "").split(".")[1];

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

  public escapeRegExp(str: string) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  public escapeRegexReplacementString(str: string) {
    return str.replace(/\$/g, "$$$$");
  }

  public mainMathStartDelimiter(c: MathConstant): string {
    return c.delimiters[0][0];
  }
  public mainMathEndDelimiter(c: MathConstant): string {
    return c.delimiters[0][1];
  }
  public get mathConstants(): MathConstant[] {
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

  public get onPrint(): boolean {
    return this.$state.current.name === 'print';
  }

  public get primaryColor(): string {
    return this.AppSettingsService.getSettings().colors.primary;
  }

  public get secondaryColor(): string {
    return '#f2e394';
  }

  public taskCategory(type: string): TaskCategory {
    if (type) {
      if (type === 'mc' || type === 'truefalse' || type === 'open' || type === 'theory' || type === 'video' || type === 'gap' || type === 'solutionfield') {
        return 'task';
      } else if (type === 'flashcard') {
        return 'flashcard'
      } else if (type && type.indexOf("unit") > -1 || type === 'sheet') {
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
  public makeEqualWithoutChangingReference(oldObject: any, newObject: any) {

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

  public taskIsInCategory(task: Task, category: TaskCategory): boolean {
    if (task && task.type) {
      let t: string = task.type;
      if (t === 'mc' || t === 'truefalse' || t === 'open' || t === 'gap' || t === 'solutionfield') {
        return category === 'exercise' || category === 'task'
      } else if (t === 'theory' || t === 'video') {
        return category === 'theory' || category === 'task';
      } else if (t === 'flashcard') {
        return category === 'flashcard';
      } else if (t && t.indexOf("unit") > -1 || t === 'sheet' || t === 'autoobjective') {
        return category === 'objective';
      } else if (t === 'block') {
        return category === 'block';
      } else if (t === 'course') {
        return category === 'course';
      }
    }
  }

  public getTaskTitle(task: Task) {
    return this.$filter('translate')(task.title || this.typeFeName(task.type));
  }

  public typeFeName(type: string): string {

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

  public get implementedLanguages() {
    return ['de', 'en'];
  }

  public get objectives(): TaskTypeEnum[] {
    return ['sheet', 'onlineunit', 'flashcardunit'];
  }

  public get objectivesAndBlock(): TaskTypeEnum[] {
    return (<any>['block'].concat(this.objectives));
  }

  public get contentType(): ContentTypeEnum {
    return (this.$state.params.latex) ?
        'latex' : 'wysiwyg';
  }

  isPublished(task: Task): boolean {
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

  getTypesFromCategory(category: TaskCategory): string[] {
    if (category === 'block') {
      return ['block']
    } else if (category === 'objective') {
      return this.objectives;
    } else {
      this.$log.error('category types not defined!!!');
    }
  }

  public get versionSeparator(): string {
    return '__';
  }

  public get separator(): string {
    return '__';
  }

};

angular.module('acadillyApp').service('Utils', Utils);
