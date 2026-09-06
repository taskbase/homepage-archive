declare var ga;

class GoogleAnalyticsService {

  static $inject = ['Utils'];

  constructor(
    private Utils
  ){
    var currdate : any = new Date();

    (function(i,s,o,g,r,a?,m?){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*currdate;a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    //determine correct tracking code
    if (location.hostname === 'e-maths.taskbase.com') {
      ga('create', 'UA-66739553-4', 'auto');
    } else if (location.hostname === 'www.taskbase.com') {
      ga('create', 'UA-66739553-6', 'auto');
    } else {
      ga('create', 'UA-66739553-5', 'auto');
    }

    ga('send', 'pageview');
  }


}

angular.module('taskbaseApp').service('GoogleAnalyticsService', GoogleAnalyticsService);

