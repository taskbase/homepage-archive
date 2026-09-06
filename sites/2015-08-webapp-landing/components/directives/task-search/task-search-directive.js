'use strict';

/*global angular */

angular.module('taskbaseApp')
  .directive('taskSearch',[
    '$http',
    '$stateParams',
    '$state',
    'Course',
    'Objective',
    'Share', function($http, $stateParams, $state, Course, Objective, Share){
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'components/directives/task-search/task-search-directive.html',
      scope: {
      },
      link: function(scope) {

        scope.showVersions = Share.getShowVersions;
        scope.getVersions = Share.getVersions;

        var addedTaskIds = [];
        addedTaskIds = Share.getAddedTaskIds();

        //date slider values
        scope.dateSlider = {
            min: 2000,
            max: 2016,
            floor: 2000,
            ceil: 2016,
        };

        //difficulty slider values
        scope.difficultySlider = {
            min: 1,
            max: 5,
            floor: 1,
            ceil: 5,
        };

        scope.objective = Objective.get({objectiveId: $stateParams.objectiveId});

        scope.searchNumber = 0;
        var searchTasksRecursively = function(searchObject) {
          //default number of tasks is 10
          if (!searchObject.numTasks) {
            searchObject.numTasks = 10;
          }

          scope.searchNumber++;
          var searchNumber = angular.copy(scope.searchNumber);

          // Define a function to recursively query tasks
          var recursiveHTTP = function recHTTP (counter) {
            
            scope.loadingTasks = true;

            scope.tasks = scope.tasks || [];


            // Put together query Url, which retrieves 1 task
            var queryUrl = 'api/task-search?limit=1&offset=' +
                (Math.floor(scope.tasks.length / searchObject.numTasks) * searchObject.numTasks + counter);

            // enhance queryUrl
            if ( searchObject.queryText && !searchObject.usedby  ) {
              queryUrl += '&q=' + searchObject.queryText;
            }

            if ( !searchObject.queryText && searchObject.usedby ) {
              queryUrl += '&q="' + searchObject.usedby + '"';
            }

            if ( searchObject.queryText && searchObject.usedby ) {
              queryUrl += '&q=' + searchObject.queryText + ' "' + searchObject.usedby + '"';
            }

            if ( searchObject.collectionId ) {
              queryUrl += '&container=' + searchObject.collectionId;
            }

            if ( searchObject.tasktype ) {
              queryUrl += '&tasktype=' + searchObject.tasktype;
            }

            if ( searchObject.nottasktype ) {
              queryUrl += '&nottasktype=' + searchObject.nottasktype;
            }

            if ( searchObject.tags ) {
              angular.forEach(searchObject.tags, function(tag) {
                queryUrl += '&tag=' + tag.text;
              });
            }

            var d, n;

            //SPECIFIC FOR OBJECTIVE-TASKS
            if ( searchObject.start ) {
              d = new Date(searchObject.start.toString());
              n = d.getTime();
              queryUrl += '&after=' + n;
            }

            if ( searchObject.end ) {
              d = new Date(searchObject.end.toString());
              n = d.getTime();
              queryUrl += '&before=' + n;
            }

            if (searchObject.minimumDifficulty) {
              queryUrl += '&dmin=' + searchObject.minimumDifficulty;
            }

            if (searchObject.maximumDifficulty) {
              queryUrl += '&dmax=' + searchObject.maximumDifficulty;
            }


            // Issue a get request
            $http.get(queryUrl).then(function(response) {

              if (searchNumber === scope.searchNumber) {

                // if no more tasks, set loading & hasMoreTasks to false
                if (response.data.length === 0) {
                  scope.loadingTasks = false;
                  scope.hasMoreTasks = false;
                  return;
                } else {

                  var task = response.data[0];

                  // if has tasks & searchObject.numTasks not reached, retrieve another task
                  scope.loadingTasks = false;

                  //check for added tasks
                  if ( addedTaskIds.indexOf(task._id) > -1 || addedTaskIds.indexOf(task.origin) > -1 ) {
                    task.isAdded = true;
                  }

                  scope.tasks.push(task);

                  ++counter;

                  if ( counter % searchObject.numTasks !== 0) {
                    recHTTP(counter);
                  } else {

                    // check if there would be one task more
                    $http.get(queryUrl).then(function(response) {
                      if (response.data.length === 0) {
                        scope.hasMoreTasks = false;
                      } else {
                        scope.hasMoreTasks = true;
                      }
                    });
                  }
                }

              }

            });
          };

          //call
          recursiveHTTP(0);

        };


        scope.courseId = $stateParams.courseId;
        scope.query = {};

        scope.loadTags = function(query) {
          return $http.get('/api/tag?q=' + query);
        };

        scope.getTasks = function(query) {
          var searchObject = {
            queryText: query.fullText,
            start: scope.dateSlider.min,
            end: scope.dateSlider.max,
            tags: query.tags,
            usedby: query.usedby,
            minimumDifficulty: scope.difficultySlider.min,
            maximumDifficulty: scope.difficultySlider.max
          };

          if ($stateParams.nottasktype) {
            searchObject.nottasktype = $stateParams.nottasktype;
          }

          if ($stateParams.tasktype) {
            searchObject.tasktype = $stateParams.tasktype;
          }

          scope.tasks = [];

          searchTasksRecursively(searchObject);
        };

        scope.getTasksOnKeypress = function(e, query) {
          var charCode = e.charCode || e.keyCode || e.which;
          if(charCode === 13) {
            scope.getTasks(query);
          }
        };

        scope.query.fullText = $stateParams.q;

        if ($stateParams.courseId) {
          scope.course = Course.get({courseId: $stateParams.courseId});
        }
        
        scope.stateParams = angular.extend({}, $stateParams);
        scope.state = angular.extend({}, $state);

        scope.updateCourse = function() {
          Course.update({courseId: $stateParams.courseId},scope.course);
        };

        scope.showMore = function(query) {
          var searchObject = {
            queryText: query.fullText,
            start: scope.dateSlider.min,
            end: scope.dateSlider.max,
            tags: query.tags,
            usedby: query.usedby,
            minimumDifficulty: scope.difficultySlider.min,
            maximumDifficulty: scope.difficultySlider.max
          };

          if ($stateParams.nottasktype) {
            searchObject.nottasktype = $stateParams.nottasktype;
          }

          if ($stateParams.tasktype) {
            searchObject.tasktype = $stateParams.tasktype;
          }

          searchTasksRecursively(searchObject);
        };
        
      }
    }

  }]);
