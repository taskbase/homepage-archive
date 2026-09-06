angular.module('appFilters', []).filter('translate', function(TranslationService: TranslationService) {

  return (value: string, args: any[]): any => {
    if (!value) return;
    return TranslationService.instant(value);
  }

}).filter('language', function() {
  return function(languageAbbreviation) {
    let abbreviationMap = {
      'de': "Deutsch",
      'en': "English"
    };
    return abbreviationMap[languageAbbreviation];
  }
}).filter('splitByYear', function() {
  return function(inputArray, key) {

    //morph to intermediate format
    var temp = {};
    angular.forEach(inputArray, function(item) {
      var d = new Date(item[key]);
      var y = d.getFullYear();
      temp[y] = temp[y] || [];
      temp[y].push(item);
    });

    //morph to final format
    var result = [];
    angular.forEach(temp, function(arr, y) {
      result.push({year: y, items: arr});
    });

    return result;
  };
}).filter('precision', function() {

  return function(number, precision) {
    let fractionSizeString:string = (number + "").split(".")[1];
    let fractionSizeNumber:number;

    if (fractionSizeString) {
      fractionSizeNumber = fractionSizeString.length;
    } else {
      fractionSizeNumber = 0;
    }

    if (fractionSizeNumber < precision) {
      return number.toFixed(fractionSizeNumber);
    } else {
      return number.toFixed(precision);
    }

  }

}).filter('subject', function() {
  return function(subject) {
    subject = subject.replace(/POLITICS_PHILOSOPHY_PAEDAGOGICS/g, "Politics, Philosophy and/or Paedagogics");

    subject = subject.toLowerCase();
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    subject = subject.replace(/_/g, " ");
    return subject;
  }
}).filter('taskLevel', function() {
  return function(level) {

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
  }
}).filter('trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]).filter('gapSolution', function() {
  return function (solution: string) {
    return solution.split("||")[0];
  }
});
