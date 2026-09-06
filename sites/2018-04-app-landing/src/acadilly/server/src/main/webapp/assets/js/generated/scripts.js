/* Compiled from the era TypeScript by build/transpile.py
   tsc 2.8.3, the options from components/tsconfig.json.
   Do not edit; edit the .ts under src/ and re-run. */
/* ==== app/component.ts ==== */
function Component(options) {
    return function (controller) {
        var selector = options.selector;
        delete options.selector;
        var module = angular.module('acadillyApp');
        module.component(selector, angular.extend(options, { controller: controller }));
    };
}

/* ==== services/app-settings-service.ts ==== */
var AppIds;
(function (AppIds) {
    AppIds["MATHBRIDGE"] = "MATHBRIDGE";
    AppIds["ACADILLY"] = "ACADILLY";
    AppIds["EMATHS"] = "e-maths";
    AppIds["TASKBASE"] = "taskbase";
})(AppIds || (AppIds = {}));
var AppSettingsService = (function () {
    function AppSettingsService() {
        if (location.host.indexOf('e-maths') > -1) {
            var logoWhite = '/assets/img/logos/e-maths2.png';
            this._appSettings = {
                id: AppIds.EMATHS,
                title: 'E-Maths',
                createTemplateCourse: false,
                showTutor: false,
                onlyAllowRegistrationForStudents: true,
                logos: {
                    white: logoWhite,
                },
                header: {
                    loggedOut: {
                        isWhite: false,
                        logo: logoWhite,
                        logoHeight: 40,
                        links: [{
                                link: 'signup',
                                text: 'Sign Up'
                            }, {
                                link: 'login',
                                text: 'Login'
                            }]
                    }
                },
                colors: {
                    primary: '#66594B'
                }
            };
        }
        else if (location.host.indexOf('mathbridge') > -1) {
            var logoWhite = '/assets/img/logos/mathbridge-white.svg';
            this._appSettings = {
                id: AppIds.MATHBRIDGE,
                title: 'Mathbridge',
                createTemplateCourse: false,
                showTutor: false,
                onlyAllowRegistrationForStudents: true,
                logos: {
                    white: logoWhite
                },
                header: {
                    loggedOut: {
                        isWhite: false,
                        logo: logoWhite,
                        logoHeight: 60,
                        links: [{
                                link: 'pricing',
                                text: 'Pricing'
                            }, {
                                link: 'signup',
                                text: 'Sign Up'
                            }, {
                                link: 'login',
                                text: 'Login'
                            }]
                    }
                },
                colors: {
                    primary: '#76AFAD'
                }
            };
        }
        else if (location.host.indexOf('acadilly') > -1) {
            var logoWhite = '/assets/img/logos/acadilly-white.svg';
            var logoColor = '/assets/img/logos/acadilly.svg';
            this._appSettings = {
                id: AppIds.ACADILLY,
                title: 'Taskbase',
                mainBg: 'bg-white',
                specialBg1: 'bg-symphony',
                hasSecondaryFooter: true,
                hasSecondaryHeader: true,
                createTemplateCourse: true,
                showTutor: true,
                logos: {
                    white: logoWhite,
                    color: logoColor
                },
                header: {
                    loggedOut: {
                        isWhite: true,
                        logo: logoColor,
                        logoHeight: 45,
                        links: [{
                                link: 'pricing',
                                text: 'Preise'
                            }, {
                                link: 'signup',
                                text: 'Registrieren'
                            }, {
                                link: 'login',
                                text: 'Login'
                            }]
                    }
                },
                colors: {
                    primary: '#134196'
                }
            };
        }
        else {
            var logoWhite = '/assets/img/logos/taskbase.svg';
            var logoColor = '/assets/img/logos/taskbase-alt.svg';
            this._appSettings = {
                id: AppIds.TASKBASE,
                title: 'Taskbase',
                mainBg: 'bg-white',
                specialBg1: 'bg-symphony',
                hasSecondaryFooter: true,
                hasSecondaryHeader: true,
                createTemplateCourse: true,
                showTutor: true,
                logos: {
                    white: logoWhite,
                    color: logoColor
                },
                header: {
                    loggedOut: {
                        isWhite: true,
                        logo: logoColor,
                        logoHeight: 45,
                        links: [{
                                link: 'signup',
                                text: 'Registrieren'
                            }, {
                                link: 'login',
                                text: 'Login'
                            }]
                    }
                },
                colors: {
                    primary: '#009688'
                }
            };
        }
    }
    AppSettingsService.prototype.getSettings = function () {
        return this._appSettings;
    };
    AppSettingsService.$inject = [];
    return AppSettingsService;
}());
angular.module('acadillyApp').service('AppSettingsService', AppSettingsService);

/* ==== services/current.ts ==== */
'use strict';
var Current = (function () {
    function Current() {
        this._editorId = 0;
        this._chartId = 0;
    }
    Object.defineProperty(Current.prototype, "noDnd", {
        get: function () {
            return this._noDnd;
        },
        set: function (value) {
            this._noDnd = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "onQuizEnd", {
        get: function () {
            return this._onQuizEnd;
        },
        set: function (value) {
            this._onQuizEnd = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "googleChartReady", {
        get: function () {
            return this._googleChartReady;
        },
        set: function (value) {
            this._googleChartReady = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "viewAsStudent", {
        get: function () {
            return this._viewAsStudent;
        },
        set: function (value) {
            this._viewAsStudent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "newEditorId", {
        get: function () {
            this._editorId++;
            return this._editorId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "newChartId", {
        get: function () {
            this._chartId++;
            return this._chartId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "scope", {
        get: function () {
            return this._scope;
        },
        set: function (value) {
            this._scope = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "index", {
        get: function () {
            return this._index;
        },
        set: function (value) {
            this._index = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (value) {
            this._parent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        set: function (value) {
            this._callback = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "containerId", {
        get: function () {
            return this._containerId;
        },
        set: function (value) {
            this._containerId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "permissions", {
        get: function () {
            return this._permissions;
        },
        set: function (value) {
            this._permissions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "objective", {
        get: function () {
            return this._objective;
        },
        set: function (value) {
            this._objective = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "course", {
        get: function () {
            return this._course;
        },
        set: function (value) {
            this._course = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "objectives", {
        get: function () {
            return this._objectives;
        },
        set: function (value) {
            this._objectives = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "task", {
        get: function () {
            return this._task;
        },
        set: function (value) {
            this._task = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (value) {
            this._step = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "block", {
        get: function () {
            return this._block;
        },
        set: function (value) {
            this._block = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "tasks", {
        get: function () {
            return this._tasks;
        },
        set: function (value) {
            this._tasks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (value) {
            this._state = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Current.prototype, "stateParams", {
        get: function () {
            return this._stateParams;
        },
        set: function (value) {
            this._stateParams = value;
        },
        enumerable: true,
        configurable: true
    });
    return Current;
}());
angular.module('acadillyApp').service('Current', Current);

/* ==== services/tracking-service.ts ==== */
var ILocationService = angular.ILocationService;
var TrackingService = (function () {
    function TrackingService($location) {
        this.$location = $location;
    }
    Object.defineProperty(TrackingService.prototype, "isProduction", {
        get: function () {
            return location.host.indexOf('www.taskbase.com') > -1;
        },
        enumerable: true,
        configurable: true
    });
    TrackingService.prototype.pushTag = function (tagsObject) {
        if (this.isProduction) {
            __insp && __insp.push(['tagSession', tagsObject]);
        }
    };
    TrackingService.prototype.identify = function (userIdentifier) {
        if (this.isProduction) {
            __insp && __insp.push(['identify', userIdentifier]);
        }
    };
    TrackingService.$inject = ['$location'];
    return TrackingService;
}());
angular.module('acadillyApp').service('TrackingService', TrackingService);

/* ==== services/user-service.ts ==== */
'use strict';
angular.module('acadillyApp').factory('User', function ($resource) {
    return $resource('/api/user/:userId', null, {
        update: {
            method: 'PUT'
        }
    });
});
var UserService = (function () {
    function UserService(User, $http, $log, $q) {
        var _this = this;
        this.User = User;
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.getCourseUsers = function (containerId, role) {
            return _this.$http.get('/api/people?container=' + containerId + '&role=' + role);
        };
        this.changePassword = function (passwordResetData) {
            return _this.$http.post('/api/pw-reset', passwordResetData);
        };
    }
    UserService.prototype.getUser = function () {
        return this.user;
    };
    UserService.prototype.getAndSetUser = function () {
        var promise;
        if (this.user) {
            promise = this.$q.when(this.user);
        }
        else {
            promise = this.setUser();
        }
        return promise;
    };
    UserService.prototype.setUser = function (user) {
        var _this = this;
        if (user) {
            var promise = this.$http.put('/api/user', user);
            promise.then(function (response) {
                _this.user = user;
            });
        }
        else {
            this.user = undefined;
            var promise = this.$http.get('/api/user');
            promise.then(function (response) {
                _this.user = response.data;
            });
        }
        return promise;
    };
    UserService.prototype.getAndSetLoggedIn = function () {
        var _this = this;
        var promise = this.$http.get('/api/login');
        promise.then(function (resp) {
            _this.setLoggedIn(resp.data.loggedIn);
        });
        return promise;
    };
    UserService.prototype.setLoggedIn = function (loggedIn) {
        if (loggedIn) {
            this._loggedIn = true;
        }
        else {
            this._loggedIn = false;
        }
    };
    UserService.prototype.loggedIn = function () {
        return this._loggedIn;
    };
    UserService.prototype.numTeachers = function () {
        return this.$http.get('/api/usercount?role=COURSE_OWNER');
    };
    UserService.prototype.numUsersTotal = function () {
        return this.$http.get('/api/usercount');
    };
    UserService.prototype.numStudents = function () {
        return this.$http.get('/api/usercount?role=STUDENT');
    };
    UserService.$inject = ['User', '$http', '$log', '$q'];
    return UserService;
}());
angular.module('acadillyApp').service('UserService', UserService);

/* ==== services/permission-service.ts ==== */
'use strict';
var IHttpService = angular.IHttpService;
var IPromise = angular.IPromise;
var IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
angular.module('acadillyApp')
    .factory('Permission', function ($resource) {
    return $resource('/api/permission');
})
    .factory('ResourcePermission', function ($resource) {
    return $resource('/api/permission');
});
var PermissionService = (function () {
    function PermissionService($http, $stateParams, TrackingService, $q, Current) {
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.TrackingService = TrackingService;
        this.$q = $q;
        this.Current = Current;
    }
    PermissionService.prototype.httpGetPermission = function (permission, resourceName, resourceId) {
        var that = this;
        var config = {
            params: {
                activity: permission,
                container: resourceId,
                resourceName: resourceName,
                resourceId: resourceId
            }
        };
        return that.$http.get('/api/permission', config);
    };
    ;
    Object.defineProperty(PermissionService.prototype, "coursePermissions", {
        get: function () {
            if (!this._coursePermissions) {
                if (this.Current.viewAsStudent) {
                    this.setExplicitCoursePermissions({
                        UPDATE_COURSE: false,
                        CREATE_MESSAGE: true
                    });
                }
                else {
                    this._coursePermissions = this.setCoursePermissions();
                }
            }
            return this._coursePermissions;
        },
        enumerable: true,
        configurable: true
    });
    PermissionService.prototype.clearPermissions = function (clearStudentView) {
        if (clearStudentView) {
            this.Current.viewAsStudent = false;
        }
        delete this._coursePermissions;
    };
    PermissionService.prototype.setExplicitCoursePermissions = function (permissions) {
        var wrapperToMakeItSameTypeAsHttpResponse = {
            data: permissions
        };
        this._coursePermissions = this.$q.when(wrapperToMakeItSameTypeAsHttpResponse);
    };
    PermissionService.prototype.setAppPermissions = function () {
        var _this = this;
        var permissions = ['TEACHER_VIEW', 'CREATE_COURSE', 'ADMINISTRATION'];
        var config = {
            params: {
                activity: permissions
            }
        };
        var req = this.$http.get('/api/permission', config);
        req.then(function (resp) {
            if (resp.data.TEACHER_VIEW) {
                _this.TrackingService.pushTag('TEACHER');
            }
        });
        this._appPermissions = req;
    };
    Object.defineProperty(PermissionService.prototype, "appPermissions", {
        get: function () {
            return this._appPermissions;
        },
        enumerable: true,
        configurable: true
    });
    PermissionService.prototype.setCoursePermissions = function ($stateParams) {
        var _this = this;
        var stateParams = $stateParams || this.$stateParams;
        var coursePermissions = ['UPDATE_COURSE', 'CREATE_MESSAGE'];
        var config = {
            params: {
                activity: coursePermissions,
                container: stateParams.containerId
            }
        };
        var promise = this.$http.get('/api/permission', config);
        promise.then(function (resp) {
            if (!resp.data.UPDATE_COURSE) {
                _this.Current.viewAsStudent = false;
            }
        });
        return promise;
    };
    PermissionService.prototype.unsetCoursePermissions = function () {
        this._coursePermissions = undefined;
    };
    return PermissionService;
}());
;
angular.module('acadillyApp').service('PermissionService', PermissionService);

/* ==== services/fe-utilities.ts ==== */
var Utils = (function () {
    function Utils(Notify, $http, $q, $uibModal, Current, $window, $log, $rootScope, UserService, $state, PermissionService, $filter, AppSettingsService) {
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
        this.AppSettingsService = AppSettingsService;
        this.sortedListMerger = function (sorted1, sorted2) {
            var out = [];
            var i = 0;
            var j = 0;
            while (i < sorted1.length || j < sorted2.length) {
                if (i === sorted1.length) {
                    out = out.concat(sorted2.slice(j, sorted2.length));
                    return out;
                }
                else if (j === sorted2.length) {
                    out = out.concat(sorted2.slice(i, sorted1.length));
                    return out;
                }
                else if (sorted1[i] < sorted2[j]) {
                    out.push(sorted1[i]);
                    i++;
                }
                else {
                    out.push(sorted2[j]);
                    j++;
                }
            }
        };
        this.getEnumAsArray = function (EnumClassName) {
            var objValues = Object.keys(EnumClassName).map(function (k) { return EnumClassName[k]; });
            var ary = objValues.filter(function (v) { return typeof v === "string"; });
            return ary;
        };
        this.browser = {};
    }
    ;
    Utils.prototype.isInternetExplorer = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ') > -1;
        var trident = ua.indexOf('Trident/') > -1;
        return msie || trident;
    };
    Object.defineProperty(Utils.prototype, "currentCourseHasSubject", {
        get: function () {
            return this.Current.course && this.Current.course.courseSettings && this.Current.course.courseSettings.subjects
                && this.Current.course.courseSettings.subjects.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "currentCourseSubject", {
        get: function () {
            if (this.currentCourseHasSubject) {
                return this.Current.course.courseSettings.subjects[0];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "subjectDependentFeature", {
        get: function () {
            return {
                mathHandwritingRecognition: this.currentCourseSubject === 'MATHEMATICS' ||
                    this.currentCourseSubject === 'PHYSICS' ||
                    this.currentCourseSubject === 'CHEMISTRY',
                flashcardWriting: this.currentCourseIsLanguageSubject
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "currentCourseIsLanguageSubject", {
        get: function () {
            return this.currentCourseSubject === 'GERMAN' ||
                this.currentCourseSubject === 'FRENCH' ||
                this.currentCourseSubject === 'ITALIAN' ||
                this.currentCourseSubject === 'SPANISH' ||
                this.currentCourseSubject === 'ENGLISH';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "deadlineOver", {
        get: function () {
            if (!this.deadlineIsSet) {
                return false;
            }
            var endDate = new Date(this.Current.objective.end);
            endDate.setDate(endDate.getDate() + 1);
            return new Date() > endDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "hideSolution", {
        get: function () {
            return this.deadlineIsSet && !this.deadlineOver && this.Current.objective.displaySolution === 'afterend';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "deadlineIsSet", {
        get: function () {
            return this.Current.objective && this.Current.objective.type === 'sheet' && this.Current.objective.end;
        },
        enumerable: true,
        configurable: true
    });
    Utils.prototype.getStateKey = function () {
        return this.$state.current.name + JSON.stringify(this.$state.params);
    };
    Utils.prototype.getStateKeyByNameAndParams = function (stateName, params) {
        return stateName + JSON.stringify(params);
    };
    Utils.prototype.forward = function (newStateName, newStateParams) {
        var _this = this;
        if (this.getStateKeyByNameAndParams(newStateName, newStateParams) !== this.getStateKey()) {
            var replaceOldBackStateIfExists = function () {
                if (_this.$rootScope.previousStates && _this.$rootScope.previousStates[_this.getStateKey()]) {
                    _this.$rootScope.previousStates[_this.getStateKeyByNameAndParams(newStateName, newStateParams)] =
                        _this.$rootScope.previousStates[_this.getStateKey()];
                    delete _this.$rootScope.previousStates[_this.getStateKey()];
                }
            };
            replaceOldBackStateIfExists();
            this.$state.go(newStateName, newStateParams);
        }
    };
    Utils.prototype.highlightText = function (elementId) {
        var doc = document, text = doc.getElementById(elementId), range, selection;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        }
        else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    Object.defineProperty(Utils.prototype, "host", {
        get: function () {
            return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "currentContainer", {
        get: function () {
            return this.$state.params.containerId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "chartColors", {
        get: function () {
            return [this.AppSettingsService.getSettings().colors.primary,
                '#3366CC', '#DC3912', '#FF9900', '#990099'];
        },
        enumerable: true,
        configurable: true
    });
    Utils.prototype.goingForward = function () {
        this.$rootScope.goingForward = true;
    };
    Utils.prototype.fileUrl = function (file) {
        return '/api/file?id=' + file._id;
    };
    Utils.prototype.redirectPermissionDeniedToCourse = function () {
        var _this = this;
        this.PermissionService.coursePermissions.then(function (resp) {
            if (!resp.data.UPDATE_COURSE) {
                _this.$state.params.containerId ? _this.$state.go('course', { containerId: _this.$state.params.containerId }) : _this.$state.go('home');
            }
        });
    };
    Utils.prototype.lockFrontend = function () {
        var height = $(document).height();
        $('html').append("<div id=\"frontend-lock\" style=\"position:absolute; top:0; width:100%;height:" + height + "px;opacity:0.3;z-index:100;background:#000;\">\n<div class=\"tb-spinner screen-center\" style=\"z-index:101\"></div>\n</div>");
    };
    Utils.prototype.unlockFrontend = function () {
        $('#frontend-lock').remove();
    };
    Utils.prototype.dataURItoBlob = function (dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = decodeURI(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    };
    Utils.prototype.postFile = function (file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        var resp = this.$http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        });
        return resp;
    };
    Utils.prototype.swap = function (list, index1, index2) {
        var b = list[index2];
        list[index2] = list[index1];
        list[index1] = b;
    };
    Utils.prototype.isOfType = function (task, type) {
        return typeof task.type === 'string' ? task.type === type : task.type === TaskType[type];
    };
    Utils.prototype.colorFromHexString = function (n, str) {
        return '#' + str.slice(n * 6, (n + 1) * 6);
    };
    ;
    Utils.prototype.buildQueryString = function (obj) {
        var qstr = "";
        angular.forEach(obj, function (vl, ky) {
            if (angular.isArray(vl)) {
                angular.forEach(vl, function (elt) {
                    qstr += "&" + ky + "=" + elt;
                });
            }
            else {
                qstr += "&" + ky + "=" + vl;
            }
        });
        return qstr;
    };
    ;
    Utils.prototype.isUrl = function (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return pattern.test(str);
    };
    ;
    Utils.prototype.removeObjectWithId = function (aray, id) {
        angular.forEach(aray, function (obj, idx) {
            if (obj._id === id) {
                aray.splice(idx, 1);
            }
        });
        return aray;
    };
    ;
    Utils.prototype.imageUrl = function (image) {
        if (image.filetype) {
            return 'data:' + image.filetype + ';base64,' + image.base64;
        }
        else {
            return image.base64;
        }
    };
    ;
    Utils.prototype.resizeImage = function (file, params) {
        var resized = {};
        var deferred = this.$q.defer();
        var img = document.createElement("img");
        var reader = new FileReader();
        reader.onload = function (e) {
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
            }
            else {
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
    };
    ;
    Object.defineProperty(Utils.prototype, "isMobile", {
        get: function () {
            return this.$window.innerWidth < 768;
        },
        enumerable: true,
        configurable: true
    });
    Utils.prototype.camelCaseToDash = function (str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };
    Utils.prototype.openComponentModal = function (componentName, bindings, settings) {
        var resolve = {
            component: function () {
                return componentName;
            },
            bindings: function () {
                return bindings;
            },
            settings: function () {
                return settings;
            }
        };
        return this.$uibModal.open({
            animation: true,
            component: 'modal',
            resolve: resolve,
            windowClass: settings && settings.fullWidth ? 'full-width-modal' : undefined
        });
    };
    Utils.prototype.openModal = function (modalNameDash, modalNameCamelCase, scope, obj, modalOptions) {
        var resolveObj = {
            resolveObj: function () {
                return obj;
            }
        };
        var modalMainOptions = {
            templateUrl: '/components/modals/' + modalNameDash + '/' + modalNameDash + '-modal.html',
            controller: modalNameCamelCase + 'ModalController',
            scope: scope,
            resolve: resolveObj,
            windowClass: 'app-modal-window'
        };
        modalOptions = modalOptions || {};
        modalOptions = angular.extend(modalOptions, modalMainOptions);
        this.$uibModal.open(modalOptions);
    };
    Utils.prototype.findBootstrapEnvironment = function () {
        var envs = ['xs', 'sm', 'md', 'lg'];
        var $el = $('<div>');
        $el.appendTo($('body'));
        for (var i = envs.length - 1; i >= 0; i--) {
            var env = envs[i];
            $el.addClass('hidden-' + env);
            if ($el.is(':hidden')) {
                $el.remove();
                return env;
            }
        }
    };
    ;
    Object.defineProperty(Utils.prototype, "defaultVideo", {
        get: function () {
            return 'https://youtu.be/GEmuEWjHr5c';
        },
        enumerable: true,
        configurable: true
    });
    Utils.prototype.onMobile = function (scope) {
        scope.onMobile = window.innerWidth < 768;
        $(window).resize(function () {
            scope.onMobile = window.innerWidth < 768;
            scope.$apply();
        });
    };
    ;
    Utils.prototype.urlContains = function (hostSlice) {
        return window.location.hostname.indexOf(hostSlice) > -1;
    };
    ;
    Utils.prototype.typeIcon = function (type) {
        var typeIconMap = {
            videounit: 'fa fa-play',
            onlineunit: 'tbi-quiz',
            sheet: 'fa fa-file-text',
            theoryunit: 'fa fa-book',
            flashcardunit: 'fa fa-clone',
            block: 'fa fa-square',
        };
        return typeIconMap[type];
    };
    Utils.prototype.removeDuplicates = function (a, b, prop) {
        var toMap = function (arr, prop) {
            var map = {};
            angular.forEach(arr, function (entry) {
                map[entry[prop]] = true;
            });
            return map;
        };
        var m = toMap(b, prop || '_id');
        for (var i = a.length - 1; i >= 0; i--) {
            if (m.hasOwnProperty(a[i]._id)) {
                a.splice(i, 1);
            }
        }
        return a;
    };
    ;
    Utils.prototype.capitalize = function (str) {
        if (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };
    ;
    Utils.prototype.getIds = function (a) {
        var ids = [];
        angular.forEach(a, function (val) {
            ids.push(val._id);
        });
        return ids;
    };
    ;
    Utils.prototype.weekAgo = function () {
        var weekInMillis = 1000 * 60 * 60 * 24 * 7;
        var weekAgo = new Date().getTime() - weekInMillis;
        return weekAgo;
    };
    ;
    Utils.prototype.addQueryParams = function (queryUrl, params) {
        if (params) {
            var lfn = function (val) {
                str.push(p + "=" + val);
            };
            var str = [];
            for (var p in params) {
                if (params.hasOwnProperty(p)) {
                    if (Array.isArray(params[p])) {
                        angular.forEach(params[p], lfn);
                    }
                    else {
                        str.push(p + "=" + params[p]);
                    }
                }
            }
            if (queryUrl.slice(-1) === '&' || queryUrl.slice(-1) === '?') {
                return queryUrl + str.join("&");
            }
            else if (queryUrl.indexOf("?") > -1) {
                return queryUrl + "&" + str.join("&");
            }
            else {
                return queryUrl + "?" + str.join("&");
            }
        }
        else {
            return queryUrl;
        }
    };
    ;
    Utils.prototype.allowedChildren = function (parent) {
        if (parent.type === 'course') {
            return this.objectivesAndBlock;
        }
        else if (parent.type === 'block') {
            return this.objectives;
        }
        else if (parent.type === 'sheet') {
            return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video'];
        }
        else if (parent.type === 'onlineunit') {
            return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video'];
        }
        else if (parent.type === 'theoryunit') {
            return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video'];
        }
        else if (parent.type === 'flashcardunit') {
            return ['flashcard'];
        }
        else if (parent.type === 'videounit') {
            return ['gap', 'open', 'mc', 'truefalse', 'solutionfield', 'video'];
        }
    };
    Utils.convertStringToXmlIfContentTypeIsWysiwyg = function (str, contentType) {
        return contentType === 'wysiwyg' ? '<content>' + str + '</content>' : str;
    };
    Utils.convertStringToHtmlIfContentTypeIsWysiwyg = function (str, contentType) {
        return contentType === 'wysiwyg' ? '<div class="content">' + str + '</div>' : str;
    };
    Utils.prototype.doOnEnter = function (e, fn) {
        var charCode = e.charCode || e.keyCode || e.which;
        if (charCode === 13) {
            fn();
        }
    };
    Utils.prototype.isEnter = function (e) {
        var isEnter = false;
        var charCode = e.charCode || e.keyCode || e.which;
        if (charCode === 13) {
            isEnter = true;
        }
        return isEnter;
    };
    Utils.prototype.updateIds = function (updateMap) {
    };
    ;
    Utils.prototype.objectiveSvg = function (objective) {
        var str = "/assets/img/icons/objective-icons/";
        str += objective.type;
        str += ".svg";
        return str;
    };
    ;
    Utils.prototype.numberToAlphabet = function (idx) {
        return String.fromCharCode(idx + 97);
    };
    Utils.prototype.getUserName = function (user) {
        if (user) {
            if (user.firstName || user.lastName) {
                return user.firstName + " " + user.lastName;
            }
            else {
                var re = /.+?(?=@|$)/;
                if (user.email) {
                    return user.email.match(re)[0];
                }
            }
        }
    };
    Utils.prototype.serializeId = function (id) {
        return id.key + this.versionSeparator + id.version;
    };
    Utils.prototype.deserializeId = function (str) {
        var key = str.substr(0, str.indexOf(this.versionSeparator));
        var version = str.substr(str.indexOf(this.versionSeparator) + this.versionSeparator.length);
        var id = {
            key: key,
            version: version
        };
        return id;
    };
    Utils.prototype.getPrecision = function (number, precision) {
        var fractionSize = (number + "").split(".")[1];
        if (fractionSize) {
            fractionSize = fractionSize.length;
        }
        else {
            fractionSize = 0;
        }
        if (fractionSize < precision) {
            return number.toFixed(fractionSize);
        }
        else {
            return number.toFixed(precision);
        }
    };
    Utils.prototype.escapeRegExp = function (str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    };
    Utils.prototype.escapeRegexReplacementString = function (str) {
        return str.replace(/\$/g, "$$$$");
    };
    Utils.prototype.mainMathStartDelimiter = function (c) {
        return c.delimiters[0][0];
    };
    Utils.prototype.mainMathEndDelimiter = function (c) {
        return c.delimiters[0][1];
    };
    Object.defineProperty(Utils.prototype, "mathConstants", {
        get: function () {
            return [{
                    type: 'block',
                    delimiters: [['$$', '$$'], ['\\[', '\\]']],
                    xmlClass: "bigmath"
                }, {
                    type: 'inline',
                    delimiters: [['$', '$'], ['\\(', '\\)']],
                    xmlClass: "math"
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "onPrint", {
        get: function () {
            return this.$state.current.name === 'print';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "primaryColor", {
        get: function () {
            return this.AppSettingsService.getSettings().colors.primary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "secondaryColor", {
        get: function () {
            return '#f2e394';
        },
        enumerable: true,
        configurable: true
    });
    Utils.prototype.taskCategory = function (type) {
        if (type) {
            if (type === 'mc' || type === 'truefalse' || type === 'open' || type === 'theory' || type === 'video' || type === 'gap' || type === 'solutionfield') {
                return 'task';
            }
            else if (type === 'flashcard') {
                return 'flashcard';
            }
            else if (type && type.indexOf("unit") > -1 || type === 'sheet') {
                return 'objective';
            }
            else if (type === 'block') {
                return 'block';
            }
            else if (type === 'course') {
                return 'course';
            }
            else {
                return 'unspecified';
            }
        }
        else {
            return 'unspecified';
        }
    };
    Utils.prototype.makeEqualWithoutChangingReference = function (oldObject, newObject) {
        for (var property in oldObject) {
            if (oldObject.hasOwnProperty(property)) {
                oldObject[property] = newObject[property];
            }
        }
        for (var property in newObject) {
            if (newObject.hasOwnProperty(property)) {
                oldObject[property] = newObject[property];
            }
        }
    };
    Utils.prototype.taskIsInCategory = function (task, category) {
        if (task && task.type) {
            var t = task.type;
            if (t === 'mc' || t === 'truefalse' || t === 'open' || t === 'gap' || t === 'solutionfield') {
                return category === 'exercise' || category === 'task';
            }
            else if (t === 'theory' || t === 'video') {
                return category === 'theory' || category === 'task';
            }
            else if (t === 'flashcard') {
                return category === 'flashcard';
            }
            else if (t && t.indexOf("unit") > -1 || t === 'sheet' || t === 'autoobjective') {
                return category === 'objective';
            }
            else if (t === 'block') {
                return category === 'block';
            }
            else if (t === 'course') {
                return category === 'course';
            }
        }
    };
    Utils.prototype.getTaskTitle = function (task) {
        return this.$filter('translate')(task.title || this.typeFeName(task.type));
    };
    Utils.prototype.typeFeName = function (type) {
        var nameMap = { 'mc': 'Multiple Choice',
            'truefalse': 'True / False Question',
            'flashcard': 'Flashcard',
            'open': 'Open Question',
            'theory': 'Theory',
            'theoryunit': 'Theory',
            'onlineunit': 'Quiz',
            'sheet': 'Sheet',
            'flashcardunit': 'Flashcards',
            'videounit': 'Video',
            'video': 'Video',
            'block': 'Block',
            'course': 'Course',
            'gap': 'Text',
            'solutionfield': 'Solution Field'
        };
        return nameMap[type];
    };
    Object.defineProperty(Utils.prototype, "implementedLanguages", {
        get: function () {
            return ['de', 'en'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "objectives", {
        get: function () {
            return ['sheet', 'onlineunit', 'flashcardunit'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "objectivesAndBlock", {
        get: function () {
            return ['block'].concat(this.objectives);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "contentType", {
        get: function () {
            return (this.$state.params.latex) ?
                'latex' : 'wysiwyg';
        },
        enumerable: true,
        configurable: true
    });
    Utils.prototype.isPublished = function (task) {
        if (task) {
            var isPub = false;
            if (task.start && new Date(task.start) < new Date()) {
                isPub = true;
            }
            return isPub;
        }
        else {
            this.$log.error('no task found');
            this.$log.debug('Problem in: ' + arguments.callee.caller.toString());
        }
    };
    Utils.prototype.getTypesFromCategory = function (category) {
        if (category === 'block') {
            return ['block'];
        }
        else if (category === 'objective') {
            return this.objectives;
        }
        else {
            this.$log.error('category types not defined!!!');
        }
    };
    Object.defineProperty(Utils.prototype, "versionSeparator", {
        get: function () {
            return '__';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Utils.prototype, "separator", {
        get: function () {
            return '__';
        },
        enumerable: true,
        configurable: true
    });
    Utils.$inject = ['Notify', '$http', '$q', '$uibModal', 'Current', '$window', '$log', '$rootScope', 'UserService', '$state',
        'PermissionService', '$filter', 'AppSettingsService'];
    return Utils;
}());
;
angular.module('acadillyApp').service('Utils', Utils);

/* ==== services/translation-service.ts ==== */
var TranslationService = (function () {
    function TranslationService(Utils, UserService) {
        this.Utils = Utils;
        this.UserService = UserService;
        this._translations = {};
        this.deTranslations = {
            "Welcome to your new course!\n Start by adding existing material from our library to your course.\n Or create new material from scratch.": "Willkommen in deinem neuen Kurs!\n Starte indem du existierendes Material von unserer Bibliothek zu deinem Kurs hinzufügst.\n Oder erstelle neue Inhalte.",
            "New Message in Forum": "Neue Nachricht im Forum",
            "Notify students": "Studenten benachrichtigen",
            "New Entry": "Neuer Eintrag",
            "There's nothing to show...": "Hierzu wurde nichts gefunden",
            "Progress": "Fortschritt",
            "Favorites": "Favoriten",
            "Select Cards": "Karteikarten filtern",
            "Only wrong": "Nur falsch gelöste",
            "Let's go": "Starten",
            "Write": "Schreiben",
            "Classic": "Klassisch",
            "Translation": "Übersetzung",
            "Select Mode": "Modus wählen",
            "Handwriting recognition for math-expressions": "Handschrifterkennung für mathematische Ausdrücke",
            "Insert": "Einfügen",
            "All subjects": "Alle Fächer",
            "or call +41 79 817 74 19.": "oder ruf uns an unter +41 79 817 74 19!",
            "In case of questions, just drop us a message at": "Bei Fragen, schreib uns eine Mail an",
            "just sign up.": "registriere dich auf Acadilly.",
            "To edit or reuse content and to save progress,": "Um Inhalte zu editieren, weiterzuverwenden oder den Fortschritt zu speichern,",
            "Students can learn and teachers can find material.": "Schüler können direkt üben und Lehrpersonen finden Material.",
            "This is a page with freely available learning/teaching content, hand-picked by the Taskbase-Team.": "Dies ist eine Seite mit frei zugänglichen Lern- bzw. Lehrinhalten, ausgewählt vom Taskbase-Team!",
            "What's this?": "Was ist das?",
            "Featured Courses": "Ausgewählte Kurse",
            "and the": "und der",
            "for the contribution of content": "für das Bereitstellen von Inhalten",
            "Many thanks to": "Vielen Dank an",
            "Play": "Spielen",
            "Enter YouTube URL or YouTube ID here": "YouTube URL oder YouTube ID hier eingeben",
            "day": "Tag",
            "days": "Tage",
            "solution visible after deadline": "Lösung nach Deadline sichtbar",
            "Solution will be available after deadline": "Die Lösung wird erst nach der Deadline angezeit",
            "Display solutions after submission": "Zeige die Lösung direkt nach der Abgabe",
            "Display solutions after deadline": "Zeige die Lösungen nach der Deadline",
            "Select date first": "Wähle zuerst ein Datum",
            "Click anywhere to turn the card": "Klicke irgendwohin um die Karte zu drehen",
            "Change": "Ändern",
            "points": "Punkten",
            "point": "Punkt",
            "Task with": "Aufgabe mit",
            "Points": "Punkte",
            "Comment": "Kommentar",
            "Grade": "Note",
            "Submitted solution on": "Abgegeben am",
            "Display all data": "Alle Abgaben anzeigen",
            "Display data before deadline": "Nur Abgaben vor der Deadline anzeigen",
            "Source": "Quelle",
            "Next up": "Als nächstes",
            "Acadilly recommends:": "Acadilly empfiehlt:",
            "Get List": "Als Liste anzeigen",
            "Search the database for learning content...": "Durchsuche die Datenbank nach Lerninhalten...",
            "Create your own course.": "Erstelle deinen eigenen Kurs.",
            "You're not signed up for any courses yet.": "Du bist noch für keine Kurse registriert.",
            "Download started": "Download gestartet",
            "Enumerate Items": "Einheiten nummerieren",
            "Show Solutions": "Lösungen anzeigen",
            "Exam": "Prüfung",
            "Default": "Standard",
            "Two Columns": "Zwei Kolonnen",
            "Show Task Titles": "Titel anzeigen",
            "Show QR Code": "QR Code anzeigen",
            "Download": "Herunterladen",
            "Get PDF": "PDF herunterladen",
            "Content": "Inhalt",
            "Exercises": "Aufgaben",
            "Solution": "Lösung",
            "Options": "Optionen",
            "Added": "Hinzugefügt",
            "1 - 2 class": "1 - 2 Klasse",
            "3 - 4 class": "3 - 4 Klasse",
            "5 - 6 class": "5 - 6 Klasse",
            "7 - 8 class": "7 - 8 Klasse",
            "9 - 10 class": "9 - 10 Klasse",
            "11 - 12 class": "11 - 12 Klasse",
            "13 - 14 class": "13 - 14 Klasse",
            "University": "Universität",
            "Trade school": "Berufsschule",
            "Mathematics": "Mathematik",
            "Physics": "Physik",
            "Biology": "Biologie",
            "Chemistry": "Chemie",
            "Geography": "Geographie",
            "History": "Geschichte",
            "Economics and law": "Wirtschaft und Recht",
            "Computer science": "Informatik",
            "German": "Deutsch",
            "English": "Englisch",
            "French": "Französisch",
            "Italian": "Italienisch",
            "Spanish": "Spanisch",
            "Art": "Kunst",
            "Music": "Musik",
            "Sports": "Sport",
            "Politics, philosophy and/or paedagogics": "Politik, Philosophie und/oder Pädagogik",
            "Religion": "Religion",
            "Other": "Andere",
            "article": "Artikel",
            "articles": "Artikel",
            "No Results": "Keine Resultate",
            "Flip Back": "Zurückdrehen",
            "Flip": "Umdrehen",
            "Flip-View": "Flip-Ansicht",
            "Table-View": "Tabellen-Ansicht",
            "item": "Einheit",
            "items": "Einheiten",
            "Name of School": "Name der Schule",
            "First and Last Name": "Vor- und Nachname",
            "Course Settings Updated": "Kurseinstellungen gespeichert",
            "Successfully added": "Erfolgreich hinzugefügt",
            "User Profile Changed": "Einstellungen geändert",
            "Name of Department (e.g. Physics)": "Name der Fachschaft (zum Beispiel Physik)",
            "Example": "Beispiel",
            "Adjust the generated content.": "Optionen für generierten Inhalt wählen.",
            "Questions": "Fragen",
            "Future Tense": "Zukunft",
            "Past Tense": "Vergangenheit",
            "Present Tense": "Gegenwart",
            "Hear and write": "Hören und schreiben",
            "e.g.": "z.B.",
            "How many questions do you want to create": "Wieviele Fragen möchtest Du erstellen",
            "How many cards do you want to create": "Wieviele Karten möchtest Du erstellen",
            "Definition": "Definition",
            "Create": "Erstellen",
            "Automatically generate flashcards with one click!": "Automatisch Karteikarten generieren, mit einem Klick!",
            "Generate Quiz": "Quiz generieren",
            "Generate Flashcards": "Karteikarten generieren",
            "Generate Vocabulary": "Vokabel–Übungen generieren",
            "Please contact us.": "Bitte kontaktieren Sie uns.",
            "For entire classes, departments or schools we offer individual pricing.": "Für ganze Klassen, Fachschaften und Schulen bieten wir indivduelle, reduzierte Preismodelle.",
            "Or visit": "Oder besuche",
            "Scan to watch the video": "Scanne diesen Code, um das Video anzuschauen",
            "File too large": "Datei zu gross",
            "Select Image": "Bild wählen",
            "Select Files": "Dateien wählen",
            "Join": "Beitreten",
            "Not found": "Nicht gefunden",
            "Sorry, this code doesn't exist": "Diesen Code gibt es leider nicht",
            "You must be logged in to add this course": "Du musst eingeloggt sein um dich für diesen Kurs einzuschreiben",
            "Share automatic join link": "Link für den automatischen Beitritt teilen",
            "insert solution": "Lösung",
            "No data": "Keine Daten",
            "Percentage Correct": "Prozent Richtige",
            "You": "Du",
            "Congratulations! You have finished the quiz.": "Glückwunsch! Du hast das Quiz durchgespielt.",
            "No content to browse in your library yet": "Sie haben noch keine Inhalte in Ihrer Bibliothek",
            "All": "Alle",
            "Search the database for tasks": "Die Datenbank nach Inhalten durchsuchen",
            "Handwritten Math-Expressions Recognizer": "Handgeschriebene Formeln hier eingeben",
            "Enter solution with keyboard or use handwriting-recognition for math-expressions": "Lösung mit Tastatur eingeben oder Handschrit-Erkennung für mathematische Ausdrücke benutzen",
            "Replay Quiz": "Quiz Wiederholen",
            "Back to course": "Zurück zum Kurs",
            "1 Month Free": "1 Monat gratis",
            "In case of any questions, please don't hesitate to contact us!": "Bei Fragen wenden Sie sich ungeniert an uns!",
            "Your name": "Ihr Name",
            "Your email": "Ihre E-Mail",
            "Thank you for your submission": "Danke für Ihre Nachricht",
            "Send a message": "Nachricht senden",
            "Your message": "Ihre Nachricht",
            "Send": "Senden",
            "No data available": "Keine Daten verfügbar",
            "Math-Expression Recognizer": "Mathematische Ausdrücke",
            "Next": "Nächste",
            "Skip": "Überspringen",
            "Number Correct / Number Attempts": "Anzahl Richtige / Anzahl Versuche",
            "A due date let's your students know by when they should have completed something": "Eine Deadline lässt die Lernenden wissen, bis wann etwas erledigt sein sollte",
            "Remove Due Date": "Deadline entfernen",
            "class": "Klasse",
            "Submissions": "Abgaben",
            "Add resources by creating new ones or searching for existing ones": "Füge Ressourcen hinzu, indem du existierende suchst oder neue erstellst",
            "The Forum is empty": "Das Forum ist leer",
            "Questions about tasks will appear here": "Fragen erscheinen hier",
            "Wrong! You can simplify your result!": "Falsch. Du kannst dein Resultat vereinfachen",
            "Wrong! You have to expand your result!": "Falsch. Du kannst dein Resultat erweitern.",
            "Wrong! Did you pay attention to the comparative and superlative of your adjectives?": "Falsch. Hast du  auf den Komparativ und Superlativ deiner Adjektive geachtet?",
            "Wrong! Did you pay attention to the plural of your nouns?": "Falsch. Hast du auf den Plural deiner Nomen geachtet?",
            "Wrong! Did you pay attention to the comparative and superlative of your adverbs?": "Falsch. Hast du  auf den Komparativ und Superlativ deiner Adverben geachtet?",
            "Wrong! Did you pay attention to the form and tense of your verbs?": "Falsch. Hast du auf die Form und Zeit deiner Verben geachtet?",
            "Wrong! Consider that this prototype is optimized for english and math expresions.": "Falsch. Beachte, dass dies ein Prototyp ist für englische und mathematische Ausdrücke.",
            "Wrong! Your answer doesn't fit the solution.": "Falsch. Deine Antwort passt nicht zur Lösung.",
            "Wrong! Please enter something!": "Falsch. Bitte gib etwas ein.",
            "Wrong": "Falsch",
            "Correct": "Richtig",
            "There aren't any statistics yet to show": "Es gibt hierfür noch keine Statistiken",
            "Example Inputs": "Beispiel Eingaben",
            "The solution field intelligently compares the answer of the teacher to the answer of the student": "Das Lösungsfeld vergleicht auf intelligente Weise die Antwort der Lehrperson mit derjenigen des Schülers",
            "The input can range from numbers, to words, to phrases but even mathematical expressions are possible": "Die Eingabe kann von einer Zahl, zu Wörtern, zu ganzen Sätzen bis sogar zu mathematischen Ausdrücken reichen",
            "The correct solution is": "Die korrekte Lösung ist",
            "Comparison of units": "Einheiten im Vergleich",
            "Comparison of students": "Lernende im Vergleich",
            "Add comparison to student": "Schüler-Vergleich hinzufügen",
            "Statistics of": "Statistiken von",
            "Class Average": "Klassenschnitt",
            "View more details": "Details ansehen",
            "Maximum": "Maximal",
            "Performance": "Leistung",
            "Select students": "Wähle Schüler aus",
            "True": "Wahr",
            "False": "Falsch",
            "Language": "Sprache",
            "Share a copy of your resources with other teachers, or invite students to this course.": "Teile eine Kopie von deinen Ressourcen mit anderen Lehrpersonen oder lade Lernende ein.",
            "List of comma-separated e-mail addresses": "Liste mit komma-separierten E-Mail Adressen",
            "Students": "Lernende",
            "Teachers": "Lehrpersonen",
            "Save Changes": "Änderungen speichern",
            "Public after end of course": "Öffentlich nach Kurs-Ende",
            "Private": "Privat",
            "Public": "Öffentlich",
            "Resources are": "Ressourcen sind",
            "Invite": "Einladen",
            "Add to": "Hinzufügen zu",
            "Course Title": "Kurs Titel",
            "Choose an image for the course": "Wähle ein Bild für den Kurs",
            "Select course level": "Niveau wählen",
            "Select a subject": "Fach wählen",
            "Create New Course": "Neuen Kurs erstellen",
            "What is what?": "Was ist was?",
            "Create your own course for your class. The students love it and you've got everything in one place.": "Erstelle einen eigenen Kurs für Deine Klasse. Die Schüler lieben es und Du hast alles an einem Ort.",
            "Or send us your material and we'll upload it for you!": 'Wir helfen Dir dabei.',
            'Upload your existing content.': 'Lade Dein bestehendes Material hoch.',
            'Play with Acadilly. We have created a course for you, where you can test things out.': 'Spiele mit der Plattform. Wir haben einen Kurs für Dich erstellt, wo Du Dinge testen kannst.',
            'How to start': 'Wie anfangen',
            'Create new material': 'Neues Material erstellen',
            'Search for existing Material in our database or in your library': 'Suche nach existierendem Material in unserer Datenbank oder deiner Bibliothek.',
            'Add Answer': "Antwort hinzufügen",
            'True / False Question': "Wahr / Falsch Fragen",
            'Flashcard': 'Karteikarte',
            'Flashcards': 'Karteikarten',
            'Open Question': 'Offene Frage',
            'Quiz': 'Quiz',
            'Sheet': "Interaktives Blatt",
            "Task": "Task",
            "Tasks": "Tasks",
            'Video': 'Video',
            "Videos": "Videos",
            "Block": "Block",
            "Gap Text": "Lückentext",
            "Solution Field": "Lösungsfeld",
            "Solution Steps": "Lösungsweg",
            "Clear": "Löschen",
            "Render": "Erkennen",
            "Handwriting recognition": "Handschriterkennung",
            "Report": "Melden",
            "Task Settings": "Einstellungen",
            "Task Type": "Typ",
            "Cancel": "Abbrechen",
            "Update": "Speichern",
            "Add Existing": "Suchen",
            "Create New": "Erstellen",
            "Task Title": "Titel",
            "Add Solution Step": "Lösungsschritt hinzufügen",
            "New Course": "Kurs erstellen",
            "Courses": "Kurse",
            "Share": "Teilen",
            "Settings": "Einstellungen",
            "Course Info": "Kurs Info",
            "Click here to edit": "Hier klicken zum Editieren",
            "View as Student": "Als Schüler ansehen",
            "View as Teacher": "Als Lehrer ansehen",
            "Log out": "Ausloggen",
            "Profile": "Profil",
            "Change Password": "Passwort Ändern",
            "Advanced": "Fortgeschritten",
            "Preferred Content Type": "Präferierter Inhaltstyp",
            "Old Password": "Altes Passwort",
            "New Password": "Neues Passwort",
            "Browse": "Durchstöbern",
            "Add": "Hinzufügen",
            "ADDED": "Hinzugefügt",
            "Search": "Suchen",
            "Publish": "Freischalten",
            "Unpublish": "Verstecken",
            "Set Due Date": "Deadline setzen",
            "Rename": "Umbenennen",
            "Delete": "Löschen",
            "Change to": "Ändern zu",
            "Edit": "Editieren",
            "View Task": "Task ansehen",
            "Asked on": "Gefragt am",
            "Answered on": "Beantwortet am",
            "Reply": "Antworten",
            "by": "von",
            "Groups": "Gruppen",
            "Show Past": "Vergangene anzeigen",
            "Hide Past": "Vergangene verstecken",
            "Hide": "Verstecken",
            "Print": "Drucken",
            "Ask a Question": "Stelle eine Frage",
            "Title": "Titel",
            "Submit": "Absenden",
            "all rights reserved": "alle Rechte vorbehalten",
            "Statistics": "Statistiken",
            "Student Statistics": "Schüler Statistiken",
            "Sign Up": "Registrieren",
            "Full name": "Vollständiger Name",
            "Password": "Passwort",
            "I'm a student": "Ich bin SchülerIn",
            "I'm a teacher": "Ich bin Lehrperson",
            "Remember me": "Angemeldet bleiben",
            "Forgot password": "Passwort vergessen",
            "Name": "Name",
            "Lecturer": "Lehrperson",
            "School": "Schule",
            "Department": "Department",
            "Start": "Beginn",
            "End": "Ende",
            "Subject": "Thema",
            "Level": "Niveau",
            "Image": "Bild",
            "Save": "Speichern",
            "Delete Course": "Kurs löschen",
            "Do you really want to delete this": "Möchtest du das wirklich löschen",
            "Confirm by entering": "Bestätige mit der Eingabe",
            "of": "von",
            "by questions answered": "nach beantworteten Fragen",
            "by number of active students": "nach Anzahl aktiver SchülerInnen",
            "Activity": "Aktivität",
            "Library": "Bibliothek"
        };
        this._translations.de = this.deTranslations;
    }
    Object.defineProperty(TranslationService.prototype, "currentLang", {
        get: function () {
            var lang;
            if (this.UserService.getUser() && this.UserService.getUser().language) {
                lang = this.UserService.getUser().language;
            }
            else {
                lang = this.browserLanguage();
            }
            return lang;
        },
        enumerable: true,
        configurable: true
    });
    TranslationService.prototype.browserLanguage = function () {
        var locale = window.navigator.language;
        if (locale.indexOf('de') > -1) {
            return 'de';
        }
        else {
            return 'en';
        }
    };
    ;
    TranslationService.prototype.translate = function (key) {
        var translation = key;
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }
        return translation;
    };
    TranslationService.prototype.instant = function (key) {
        return this.translate(key);
    };
    TranslationService.$inject = ['Utils', 'UserService'];
    return TranslationService;
}());
angular.module('acadillyApp').service('TranslationService', TranslationService);

/* ==== services/notify-service.ts ==== */
var Notify = (function () {
    function Notify(Notification, $filter) {
        this.Notification = Notification;
        this.$filter = $filter;
    }
    Notify.prototype.primary = function (msg) {
        var notifyObject = {
            message: this.$filter('translate')(msg),
            delay: 3000,
            positionX: 'center'
        };
        return this.Notification.success(notifyObject);
    };
    Notify.prototype.errorResponse = function (response, params) {
        var errorMessage = "Oops, something went wrong.";
        if (response.data) {
            errorMessage = response.data.message;
        }
        var notifyObject = {
            message: errorMessage,
            delay: 3000,
            positionX: 'center'
        };
        angular.extend(notifyObject, params);
        return this.Notification.error(notifyObject);
    };
    Notify.prototype.error = function (msg, params) {
        var notifyObject = {
            message: this.$filter('translate')(msg),
            delay: 3000,
            positionX: 'center'
        };
        angular.extend(notifyObject, params);
        return this.Notification.error(notifyObject);
    };
    Notify.$inject = ['Notification', '$filter'];
    return Notify;
}());
angular.module('acadillyApp').service('Notify', Notify);

/* ==== services/navigation.ts ==== */
'use strict';
angular.module('acadillyApp')
    .factory('Navigation', function ($rootScope) {
    return {
        goingForward: function () {
            $rootScope.goingForward = true;
        }
    };
});

/* ==== services/login-service.ts ==== */
'use strict';
angular.module('acadillyApp')
    .factory('Login', function (UserService, Notify, $http, $location, $state, $q, $rootScope, Utils, TrackingService, PermissionService) {
    return {
        logInByAuthKey: function () {
            var loginData = {
                authkey: $state.params.authkey,
                email: $state.params.email
            };
            this.logIn(loginData, true);
        },
        logIn: function (loginData, suppressRedirect) {
            $http.post('/api/login', loginData).then(function (response) {
                PermissionService.setAppPermissions();
                UserService.setUser().then(function (userResp) {
                    TrackingService.identify(userResp.data.email);
                    if (!suppressRedirect) {
                        $state.go('home');
                    }
                    else {
                        $state.reload();
                    }
                });
            }, function (response) {
                Notify.errorResponse(response, { positionX: 'left' });
            });
        },
        logOut: function () {
            $http.post('/api/logout').then(function () {
                PermissionService.setAppPermissions();
                UserService.setLoggedIn(false);
                UserService.setUser().then(function () {
                    $state.go('landing');
                });
            });
        },
        loginPrompt: function () {
            Utils.openModal('login-prompt', 'LoginPrompt');
        }
    };
});

/* ==== services/action-service.ts ==== */
var ActionService = (function () {
    function ActionService($http, Utils, UserService, $state, $log, Notify) {
        this.$http = $http;
        this.Utils = Utils;
        this.UserService = UserService;
        this.$state = $state;
        this.$log = $log;
        this.Notify = Notify;
    }
    ActionService.prototype.submitGap = function (gap, task) {
        var _this = this;
        var userSolution = gap.userSolution.trim();
        gap.submitting = true;
        var action = this.actionFactory("ATTEMPT", task, this.$state.params.containerId);
        action.gap = gap.id;
        action.input = gap.userSolution;
        this.postAction(action).then(function (resp) {
            if (resp.data.evaluation.type === 'CORRECT') {
                gap.correct = true;
            }
            else if ('INCORRECT') {
                gap.correct = false;
            }
            else {
                _this.$log.error('Something went wrong with the gap correction');
                _this.Notify.error('Something went wrong with the gap correction');
            }
            gap.submitting = false;
            gap.submitted = true;
            var allGapsSubmitted = true;
            Object.keys(task.gaps).forEach(function (key) {
                var gap = task.gaps[key];
                if (!gap.submitted) {
                    allGapsSubmitted = false;
                }
            });
            if (allGapsSubmitted) {
                task.currentState = task.currentState || {};
                task.currentState.solutionSubmitted = true;
            }
        }, function (resp) {
            _this.Notify.errorResponse(resp);
            gap.submitting = false;
        });
    };
    ActionService.prototype.gradeAction = function (action, evaluation) {
        var evalPatch = {
            op: action.evaluation != null ? PatchOperation.replace : PatchOperation.add,
            path: "/evaluation",
            value: evaluation
        };
        return this.$http.patch(this.basicActionUrl + '?id=' + action.hexId, [evalPatch]);
    };
    ActionService.prototype.updateRotation = function (action) {
        var evalPatch = {
            op: action.rotation != null ? PatchOperation.replace : PatchOperation.add,
            path: "/rotation",
            value: action.rotation
        };
        return this.$http.patch(this.basicActionUrl + '?id=' + action.hexId, [evalPatch]);
    };
    ActionService.prototype.actionFactory = function (type, task, container) {
        var action = {
            startTime: new Date().getTime(),
            task: task ? task.id : undefined,
            container: container,
            user: this.UserService.getUser()._id,
            taskType: task.type,
            type: type
        };
        return action;
    };
    ActionService.prototype.getAction = function (taskId, container) {
        var config = {
            params: {
                task: taskId,
                container: container
            }
        };
        var httpReq = this.$http.get(this.basicActionUrl, config);
        return httpReq;
    };
    ;
    ActionService.prototype.actionSearch = function (params) {
        var config = {
            params: params
        };
        return this.$http.get(this.basicActionSearchUrl, config);
    };
    ActionService.prototype.postAction = function (action) {
        var esthersCourses = [
            '58d2f28fa73cf00073628ed6',
            '585921cafdfc360017ba443e',
            '58807b30fdfc3600326cc7f3',
            '58807f1bfdfc3600326cc887',
            '57c41d74b54bfb001963bc87',
            '58807fe4fdfc3600326cc8c7',
            '5880891ffdfc3600326cc922',
            '586ab4aafdfc360017babd4c',
            '5a63134928c30b00828947f4',
            '586c0c6bfdfc360017bacc21',
            '589b36ebd37470006537fcc1',
            '58807cb8fdfc3600326cc870',
            '58807fa3fdfc3600326cc8b2',
            '588e0c760575060023d42a73',
            '5a76c6cf534aee007d0a3ff9',
            '59e7b17428c30b008075db3c',
            '5a132f737109d50062b8581c',
            '58a18347aecb2c0065fe9ee4',
            '588088e7fdfc3600326cc906',
            '58808968fdfc3600326cc945',
            '58247652fdfc36001517d214'
        ];
        var isEsthersCourse = esthersCourses.indexOf(this.$state.params.containerId) > -1;
        var isRelevantSubmission = action.type === 'TEXT_SUBMISSION' || action.type === 'FILE_SUBMISSION';
        if (isEsthersCourse && isRelevantSubmission) {
            this.sendEmailToEsther(action);
        }
        return this.$http.post(this.basicActionUrl, action);
    };
    ;
    ActionService.prototype.sendEmailToEsther = function (action) {
        var apiUrl = 'https://mailserver.taskbase.com/api/mail/send';
        var receiver = 'bersling@gmail.com';
        var receiver2 = 'esther.frei@easymath.ch';
        var courseId = action.container;
        var link = "https://www.taskbase.com/task/" + action.task.key + "?containerId=" + courseId;
        var emailContent = "Es gibt eine neue Abgabe unter <a href=\"" + link + "\">" + link + "</a>.";
        var reqBody = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": receiver
                        },
                        {
                            "email": receiver2
                        }
                    ]
                }
            ],
            "from": {
                "email": "info@taskbase.com",
                "name": "Taskbase"
            },
            "subject": "Neue Abgabe",
            "content": [
                {
                    "type": "text/html",
                    "value": emailContent
                }
            ]
        };
        this.$http.post(apiUrl, reqBody);
    };
    ;
    ActionService.prototype.deleteAction = function (id) {
        return this.$http.delete(this.basicActionUrl, { params: { id: id } });
    };
    Object.defineProperty(ActionService.prototype, "basicActionUrl", {
        get: function () {
            return '/api/action';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionService.prototype, "basicActionSearchUrl", {
        get: function () {
            return '/api/action-search';
        },
        enumerable: true,
        configurable: true
    });
    ActionService.$inject = ['$http', 'Utils', 'UserService', '$state', '$log', 'Notify'];
    return ActionService;
}());
angular.module('acadillyApp').service('ActionService', ActionService);

/* ==== filters/filters.ts ==== */
angular.module('appFilters', []).filter('translate', function (TranslationService) {
    return function (value, args) {
        if (!value)
            return;
        return TranslationService.instant(value);
    };
}).filter('language', function () {
    return function (languageAbbreviation) {
        var abbreviationMap = {
            'de': "Deutsch",
            'en': "English"
        };
        return abbreviationMap[languageAbbreviation];
    };
}).filter('splitByYear', function () {
    return function (inputArray, key) {
        var temp = {};
        angular.forEach(inputArray, function (item) {
            var d = new Date(item[key]);
            var y = d.getFullYear();
            temp[y] = temp[y] || [];
            temp[y].push(item);
        });
        var result = [];
        angular.forEach(temp, function (arr, y) {
            result.push({ year: y, items: arr });
        });
        return result;
    };
}).filter('precision', function () {
    return function (number, precision) {
        var fractionSizeString = (number + "").split(".")[1];
        var fractionSizeNumber;
        if (fractionSizeString) {
            fractionSizeNumber = fractionSizeString.length;
        }
        else {
            fractionSizeNumber = 0;
        }
        if (fractionSizeNumber < precision) {
            return number.toFixed(fractionSizeNumber);
        }
        else {
            return number.toFixed(precision);
        }
    };
}).filter('subject', function () {
    return function (subject) {
        subject = subject.replace(/POLITICS_PHILOSOPHY_PAEDAGOGICS/g, "Politics, Philosophy and/or Paedagogics");
        subject = subject.toLowerCase();
        subject = subject.charAt(0).toUpperCase() + subject.slice(1);
        subject = subject.replace(/_/g, " ");
        return subject;
    };
}).filter('taskLevel', function () {
    return function (level) {
        level = level.replace(/ONE_TWO/g, "1 - 2 class");
        level = level.replace(/THREE_FOUR/g, "3 - 4 class");
        level = level.replace(/FIVE_SIX/g, "5 - 6 class");
        level = level.replace(/SEVEN_EIGHT/g, "7 - 8 class");
        level = level.replace(/NINE_TEN/g, "9 - 10 class");
        level = level.replace(/ELEVEN_TWELVE/g, "11 - 12 class");
        level = level.replace(/THIRTEEN_FOURTEEN/g, "13 - 14 class");
        level = level.toLowerCase();
        level = level.charAt(0).toUpperCase() + level.slice(1);
        level = level.replace(/_/g, " ");
        return level;
    };
}).filter('trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]).filter('gapSolution', function () {
    return function (solution) {
        return solution.split("||")[0];
    };
});

/* ==== app/main-controller.ts ==== */
'use strict';
angular.module('acadillyApp')
    .controller('MainController', function ($scope, $rootScope, $http, $location, $q, $state, UserService, Utils) {
    $rootScope.appReady = false;
    var promises = [];
    promises.push(UserService.setUser());
    $q.all(promises).then(function () {
        $rootScope.appReady = true;
    });
});

/* ==== app/routes.ts ==== */
'use strict';
angular.module('acadillyApp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $provide) {
    $provide.decorator("$exceptionHandler", function ($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
        };
    });
    $provide.decorator('$state', function ($delegate, $rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, state, params) {
            $delegate.next = state;
            $delegate.toParams = params;
        });
        return $delegate;
    });
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get.Pragma = 'no-cache';
    var createView = function (url, templateUrl, controller, mainViewOnly) {
        var headerView = {
            'templateUrl': '/components/header/header.html',
            'controller': 'HeaderController'
        }, footerView = {
            'templateUrl': '/components/footer/footer.html',
            'controller': 'FooterController'
        }, mainView = {
            templateUrl: '/components/views/' + templateUrl,
            controller: {}
        };
        if (controller) {
            mainView.controller = controller;
        }
        var handleBadStates = function (UserService, $state, $timeout) {
            var badStatesWhenLoggedOut = ['home', 'profile', 'recommender', 'course-settings', 'root', 'course-registration'];
            var badStatesWhenLoggedIn = ['about', 'landing', 'signup', 'login', 'forgot-password', 'root'];
            var currentBadStates = UserService.loggedIn() ? badStatesWhenLoggedIn : badStatesWhenLoggedOut;
            var isBadState = currentBadStates.indexOf($state.next.name) > -1;
            if (isBadState) {
                if (UserService.loggedIn()) {
                    $timeout(function () {
                        $state.go('home');
                    }, 0);
                }
                else if (!UserService.loggedIn()) {
                    $timeout(function () {
                        $state.go('landing');
                    }, 0);
                }
            }
        };
        var views = {};
        if (mainViewOnly) {
            views = {
                'mainView': mainView,
            };
        }
        else {
            views = {
                'headerView': headerView,
                'mainView': mainView,
                'footerView': footerView
            };
        }
        return {
            'url': url,
            'views': views,
            resolve: {
                getUser: function (UserService, $state, $timeout) {
                    return UserService.getAndSetUser().then(function () {
                    });
                },
                setLogin: function (UserService, $state, $timeout) {
                    return UserService.getAndSetLoggedIn().then(function () {
                        handleBadStates(UserService, $state, $timeout);
                    });
                }
            }
        };
    };
    $stateProvider
        .state('root', createView('/', 'root/root-view.html', 'RootController'))
        .state('pricing', createView('/pricing', 'pricing/pricing-view.html', 'PricingController'))
        .state('print', createView('/print/:taskId?containerId?solution?layout', 'print/print-view.html', 'PrintController', true))
        .state('details', createView('/product', 'details/details-view.html', 'DetailsController'))
        .state('home', createView('/home', 'home/home.html', 'HomeController'))
        .state('landing', createView('/landing?invitation?q', 'landing/landing.html', 'LandingController'))
        .state('teaser-video', createView('/teaser-video', 'teaser-video/teaser-video.html', 'TeaserVideoController'))
        .state('task', createView('/task/:taskId?containerId?play?latex?admin?index?mode?filter', 'task/task.html', 'TaskController'))
        .state('test', createView('/test?course?collection?courseStudent?collectionRead?role', 'test/test.html', 'TestController'))
        .state('http', createView('/http', 'http/http-view.html', 'HttpController'))
        .state('profile', createView('/profile?userId', 'profile/profile.html', 'ProfileController'))
        .state('collection', createView('/collection/:collectionId?recompile?store', 'collection/collection.html', 'CollectionController'))
        .state('signup', createView('/signup?email', 'signup/signup.html', 'SignupController'))
        .state('login', createView('/login', 'login/login.html', 'LoginController'))
        .state('investor', createView('/investor', 'investor/investor-view.html', 'InvestorController'))
        .state('connect', createView('/connect', 'connect/connect.html', 'ConnectController'))
        .state('store', createView('/store', 'store/store.html', 'StoreController'))
        .state('task-search', createView('/task-search?containerId?target?q?tasktype?nottasktype?addedTask?unshift', 'task-search/task-search.html', 'TaskSearchController'))
        .state('search', createView('/search?q', 'search/search.html', 'searchController'))
        .state('course', createView('/course/:containerId?admin?email?authkey', 'course/course-view.html', 'CourseController'))
        .state('problem', createView('/task/:taskId/problem/:problemIndex', 'problem/problem.html', 'ProblemController'))
        .state('task-submissions', createView('/task/:taskId/submissions', 'task-submissions/task-submissions.html', 'TaskSubmissionsController'))
        .state('pw-reset', createView('/pw-reset', 'pw-reset/pw-reset.html', 'PwResetController'))
        .state('forgot-password', createView('/forgot-password?email', 'pw-reset/forgot-password.html', 'ForgotPasswordController'))
        .state('course-settings', createView('/course/:containerId/settings?extraRole?admin', 'course-settings/course-settings.html', 'CourseSettingsController')).state('course-people', createView('/course/:containerId/people?admin', 'course-people/course-people-view.html', 'CoursePeopleController')).state('group', createView('/group/:groupId', 'group/group.html', 'GroupController')).state('verify', createView('/verify?email?key?host', 'verify/verify.html', 'VerifyController')).state('forum', createView('/forum/:taskId?containerId', 'forum/forum.html', 'ForumController')).state('tutorial', createView('/tutorial', 'tutorial/tutorial.html', 'TutorialController')).state('collection-administration', createView('/collection-administration', 'collection-administration/collection-administration.html', 'CollectionAdministrationController')).state('course-forum', createView('/course/:containerId/course-forum?email?authkey', 'course-forum/course-forum.html', 'CourseForumController')).state('course-registration', createView('/course-registration', 'course-registration/course-registration.html', 'CourseRegistrationController')).state('competence-import', createView('/competence-import', 'competence-import/competence-import.html', 'CompetenceImportController')).state('print-objective', createView('/objective/:objectiveId/print?type', 'print-objective/print-objective.html', 'PrintObjectiveController')).state('course-info', createView('/course/:containerId/info', 'course-info/course-info.html', 'CourseInfoController')).state('course-stats', createView('/course/:containerId/course-stats?tab', 'course-stats/course-stats.html', 'CourseStatsController')).state('stats', createView('/stats?taskId?containerId?tab', 'stats/stats-view.html', 'StatsController')).state('test-bug', createView('/test-bug', 'test-bug/test-bug.html', 'TestBugController')).state('admin', createView('/admin', 'admin/admin.html', 'AdminController')).state('about', createView('/about', 'about/about.html', 'AboutController')).state('qr', createView('/qr', 'qr/qr.html', 'QrController')).state('impressum', createView('/impressum', 'impressum/impressum-view.html', 'ImpressumController')).state('block', createView('/block/:blockId', 'block/block.html', 'BlockController')).state('taskk', createView('/taskk?showheader', 'taskk/taskk-view.html', 'TaskkController')).state('notes', createView('/notes', 'notes/notes-view.html', 'NotesController')).state('table-sample', createView('/table-sample', 'table-sample/table-sample-view.html', 'TableSampleController')).state('fhnw', createView('/fhnw', 'fhnw/fhnw-view.html', 'FhnwController')).state('quiz-stats', createView('/quiz-stats/:taskId?containerId', 'quiz-stats/quiz-stats-view.html', 'QuizStatsController')).state('join', createView('/join/:secret', 'join/join-view.html', 'JoinController')).state('editor', createView('/editor', 'editor/editor-view.html', 'EditorController')).state('library', createView('/library', 'library/library-view.html', 'LibraryController')).state('featured', createView('/featured?subject', 'featured/featured-view.html', 'FeaturedController')).state('projects', createView('/projects', 'projects/projects-view.html', 'ProjectsController')).state('demo-stats', createView('/demo-stats', 'demo-stats/demo-stats-view.html', 'DemoStatsController')).state('demo-quizend', createView('/demo-quizend', 'demo-quizend/demo-quizend-view.html', 'DemoQuizendController')).state('mastery-model', createView('/mastery-model', 'mastery-model/mastery-model-view.html', 'MasteryModelController')).state('artificial-intelligence', createView('/artificial-intelligence', 'artificial-intelligence/artificial-intelligence-view.html', 'ArtificialIntelligenceController')).state('demo-tasks', createView('/demo/tasks', 'demo-tasks/demo-tasks-view.html', 'DemoTasksController'));
    $locationProvider.html5Mode(true);
});
angular.module('acadillyApp')
    .run(function ($rootScope, $window, $state, $http, $location, $stateParams, $uibModalStack, PermissionService, TaskService, UserService, $q, ActionService, Current, $timeout) {
    var currentPageviewTransaction;
    window.onbeforeunload = function () {
        ActionService.postAction(currentPageviewTransaction);
    };
    $rootScope.$on("$locationChangeStart", function (event, next) {
        ActionService.getAction().then(function (response) {
            currentPageviewTransaction = response.data;
            currentPageviewTransaction.type = 'PAGE_VIEW';
            currentPageviewTransaction.input = window.location.href;
            ActionService.postAction(currentPageviewTransaction);
        });
    });
    $rootScope.$on('$stateChangeStart', function (ev, to, toParams) {
        if (location.host.indexOf('language.taskbase.com') > -1) {
            $window.location.replace('https://www.taskbase.com/language-landing');
        }
        else if (location.host.indexOf('math.taskbase.com') > -1) {
            $window.location.replace('https://www.taskbase.com/featured?subject=MATHEMATICS');
        }
        var slugmap = {
            'mathe-matura-aufgaben': '56aa6de2c7e0ea0022e42461'
        };
        if (slugmap.hasOwnProperty(toParams.containerId)) {
            ev.preventDefault();
            $state.transitionTo('course', { containerId: slugmap[toParams.containerId] });
        }
    });
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        if (toParams.containerId) {
            TaskService.getContainer(toParams.containerId).then(function (resp) {
                Current.course = resp.data;
            });
        }
        ga('send', 'pageview');
        if (UserService.getUser()) {
            ga('set', 'userId', UserService.getUser()._id);
        }
        var clearStudentView = to.name === 'home';
        PermissionService.clearPermissions(clearStudentView);
        $uibModalStack.dismissAll();
        $rootScope.previousStates = $rootScope.previousStates || {};
        if ($rootScope.goingForward) {
            $rootScope.previousStates[to.name + JSON.stringify(toParams)] = {
                fromName: from.name,
                fromParams: fromParams
            };
            $rootScope.goingForward = false;
        }
        else {
            $rootScope.goingForward = false;
        }
    });
});

/* ==== directives/web-app/web-app-component.ts ==== */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WebApp = (function () {
    function WebApp(Utils, UserService, $state, PermissionService, $rootScope, $timeout, Current, GoogleAnalyticsService, AppSettingsService) {
        this.Utils = Utils;
        this.UserService = UserService;
        this.$state = $state;
        this.PermissionService = PermissionService;
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.Current = Current;
        this.GoogleAnalyticsService = GoogleAnalyticsService;
        this.AppSettingsService = AppSettingsService;
    }
    WebApp.prototype.$onInit = function () {
        var _this = this;
        var initMathjaxFunction = function () {
            if (!window.MathJax) {
                setTimeout(function () {
                    initMathjaxFunction();
                }, 100);
            }
            else {
                _this.$rootScope.$watch(function () {
                    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
                    return true;
                });
            }
        };
        initMathjaxFunction();
        $.ajax({
            url: '//www.google.com/jsapi',
            dataType: 'script',
            cache: true,
            success: function () {
                _this.Current.googleChartReady = true;
                _this.$rootScope.$broadcast(BroadcastEvents[BroadcastEvents.GOOGLE_CHART_READY]);
            }
        });
        this.PermissionService.setAppPermissions();
    };
    WebApp.prototype.bg = function () {
        if (this.$state.current.name === 'landing' ||
            this.$state.current.name === 'about' ||
            this.$state.current.name === 'details' ||
            this.$state.current.name === 'signup' ||
            this.$state.current.name === 'pricing') {
            return this.AppSettingsService.getSettings().specialBg1;
        }
        else {
            return this.AppSettingsService.getSettings().mainBg;
        }
    };
    WebApp.prototype.loggedIn = function () {
        return this.UserService.loggedIn();
    };
    WebApp.$inject = ['Utils', 'UserService', '$state', 'PermissionService', '$rootScope',
        '$timeout', 'Current', 'GoogleAnalyticsService', 'AppSettingsService'];
    WebApp = __decorate([
        Component({
            selector: 'webApp',
            templateUrl: '/components/directives/web-app/web-app-component.html',
            bindings: {}
        })
    ], WebApp);
    return WebApp;
}());

/* ==== directives/header/logged-out-header.component.ts ==== */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggedOutHeaderComponent = (function () {
    function LoggedOutHeaderComponent($scope, AppSettingsService) {
        var _this = this;
        this.$scope = $scope;
        this.AppSettingsService = AppSettingsService;
        this.closeEvent = (function () {
            if (_this.isMenuOpen) {
                _this.isMenuOpen = false;
                _this.$scope.$apply();
            }
        }).bind(this);
        this.isMenuOpen = false;
        this.iOsFixerFlag = false;
    }
    LoggedOutHeaderComponent.prototype.$onInit = function () {
        window.addEventListener('resize', this.closeEvent);
        window.addEventListener('click', this.closeEvent);
        this.settings = this.AppSettingsService.getSettings().header.loggedOut;
    };
    LoggedOutHeaderComponent.prototype.$onDestroy = function () {
        window.removeEventListener('resize', this.closeEvent);
        window.removeEventListener('click', this.closeEvent);
    };
    LoggedOutHeaderComponent.prototype.toggleMenu = function ($event) {
        var _this = this;
        $event.stopPropagation();
        if (!this.iOsFixerFlag) {
            this.isMenuOpen = !this.isMenuOpen;
            this.iOsFixerFlag = true;
        }
        setTimeout(function () {
            _this.iOsFixerFlag = false;
        }, 100);
    };
    LoggedOutHeaderComponent.prototype.closeMenu = function ($event) {
        $event.stopPropagation();
        this.isMenuOpen = false;
    };
    LoggedOutHeaderComponent.$inject = ['$scope', 'AppSettingsService'];
    LoggedOutHeaderComponent = __decorate([
        Component({
            selector: 'loggedOutHeader',
            templateUrl: '/components/directives/header/logged-out-header.component.html',
            bindings: {}
        })
    ], LoggedOutHeaderComponent);
    return LoggedOutHeaderComponent;
}());

/* ==== directives/tb-landing/tb-temp-landing.component.ts ==== */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TbTempLandingComponent = (function () {
    function TbTempLandingComponent() {
    }
    TbTempLandingComponent = __decorate([
        Component({
            selector: 'tbTempLanding',
            templateUrl: '/components/directives/tb-landing/tb-temp-landing.component.html',
            bindings: {}
        })
    ], TbTempLandingComponent);
    return TbTempLandingComponent;
}());

/* ==== header/header-controller.ts ==== */
'use strict';
angular.module('acadillyApp')
    .controller('HeaderController', function ($scope, $rootScope, $http, $state, Notify, Navigation, Login, $q, UserService, Utils, Permission, Upload, $timeout, Current, PermissionService, AppSettingsService) {
    $scope.$ctrl = $scope.$ctrl || {};
    PermissionService.coursePermissions.then(function (resp) {
        $scope.showViewAsStudentButton = resp.data.UPDATE_COURSE && !Current.viewAsStudent;
    });
    PermissionService.appPermissions.then(function (resp) {
        $scope.appPermissions = resp.data;
    });
    $scope.urlContains = Utils.urlContains;
    $scope.eMathsOrLanding = $state.current.name === 'landing' ? 'http://e-maths.ch' : '/#/home';
    $scope.onLanding = $state.current.name === 'landing';
    $scope.loggedIn = function () {
        return UserService.loggedIn();
    };
    $scope.secondaryHeader = function () {
        return (UserService.loggedIn() === false) && AppSettingsService.getSettings().hasSecondaryHeader;
    };
    $scope.addAlt = function () {
        return $scope.secondaryHeader() ? "-alt" : "";
    };
    $scope.loginData = {};
    $scope.goingForward = Navigation.goingForward;
    $scope.loginClicked;
    $scope.isEmaths = function () {
        return Utils.urlContains('e-maths');
    };
    $scope.goingLogin = function () {
        $scope.loginClicked = true;
    };
    $scope.closeLogin = function () {
        $scope.loginClicked = false;
    };
    $scope.appId = AppSettingsService.getSettings().id;
    $scope.user = UserService.getUser();
    $scope.logIn = Login.logIn;
    $scope.logOut = function () {
        Login.logOut();
    };
    $scope.openSupportModal = function () {
        Utils.openModal('support-form', 'SupportForm', $scope, undefined, undefined);
    };
    $scope.switchToStudentView = function () {
        $scope.showViewAsStudentButton = false;
        Current.viewAsStudent = true;
        $state.reload();
    };
    $scope.switchToTeacherView = function () {
        Current.viewAsStudent = false;
        $state.reload();
    };
    $scope.showViewAsTeacherButton = function () {
        return Current.viewAsStudent;
    };
    $scope.openInputDialog = function () {
        $('#qr-code-input').click();
    };
});

/* ==== footer/footer-controller.ts ==== */
'use strict';
angular.module('acadillyApp')
    .controller('FooterController', function ($state, $scope, UserService, Utils, AppSettingsService) {
    $scope.secondaryFooter = function () {
        return !UserService.loggedIn() && AppSettingsService.getSettings().hasSecondaryFooter;
    };
    $scope.urlContains = Utils.urlContains;
    $scope.currentDate = new Date();
});

/* ==== views/landing/landing-controller.ts ==== */
'use strict';
angular.module('acadillyApp')
    .controller('LandingController', function ($scope, AppSettingsService) {
    $scope.appId = AppSettingsService.getSettings().id;
});

/* ==== views/root/root-controller.ts ==== */
'use strict';
angular.module('acadillyApp')
    .controller('RootController', function ($scope) {
});
