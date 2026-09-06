@Component('taskbaseApp', 'tbLanding', {
  templateUrl: '/components/directives/tb-landing/tb-landing-component.html',
  bindings: {
    somebinding: "=" // One Way Binding
  }
})
class TbLandingComponent {

  public somebinding: string;
  static $inject: string[] = ['Utils', 'TaskService', 'UserService', '$q', 'AppSettingsService'];

  constructor(
    private Utils: Utils,
    private TaskService: TaskService,
    private UserService: UserService,
    private $q: IQService,
    private AppSettingsService: AppSettingsService
  ) {}

  public goingForward = () => {
    this.Utils.goingForward();
  };

  public language = 'de';

  public urlContains = (str: string) => {
    return this.Utils.urlContains(str);
  };

  public landingPageType;

  $onInit() {

    this.landingPageType = this.AppSettingsService.getSettings().landingPageType;

    let numTasksPromise = this.TaskService.numTasksTotal();
    let numTeachersPromise = this.UserService.numTeachers();
    let numUsersPromise = this.UserService.numUsersTotal();

    this.$q.all([numTasksPromise, numTeachersPromise, numUsersPromise]).then(resp => {

      this.counters = [{
        n: resp[2].data.count-resp[1].data.count,
        title: "Lernende"
      }, {
        n: resp[1].data.count,
        title: "Lehrpersonen"
      }, {
        n: Math.floor(parseInt(resp[0].data.split("Search index size is")[1].trim())/2.3),
        title: "Lerninhalte"
      }];

    });
  }

  public counters;

  public text = {
    de: {
      heading: ['Ihre Cloud', 'für Lerninhalte'],
      getStarted: 'Anfangen',
      howItWorks: 'Video',
      searchTitle: 'Lernmaterial-Vorschau',
      numTasksBefore: 'Unsere Datenbank enhält momentan',
      numTasksAfter: 'Lerninhalte',
      details: 'Wie wir das schaffen'
    }
  }

  public openVideoModal = () => {
    this.Utils.openComponentModal('comic-video');
  };

  public valueBullets = [{
    icon: '/assets/img/icons/heart.svg',
    anchor: 'organize',
    title: {
      de: 'Organisieren',
      en: 'Organize'
    },
    text: {
      de: "Hochwertige Lerninhalte erstellen, finden und teilen",
      en: 'All content in one place.'
    },
  }, {
    icon: '/assets/img/icons/cup.svg',
    anchor: 'create',
    title: {
      de: "Motivieren"
    },
    text: {
      en: 'Motivieren',
      de: 'Ergänzende, interaktive Quizzes für Ihre Lernenden'
    }
  }, {
    icon: '/assets/img/icons/robot-search.svg',
    anchor: 'artificial-intelligence',
    title: {
      de: 'Automatisieren'
    },
    text:  {
      de: 'Künstliche Intelligenz hilft beim Korrigieren und mehr'
    }
  }, {
    icon: '/assets/img/icons/presentation.svg',
    anchor: 'measure',
    title: {
      de: 'Messen',
      en: 'Measure'
    },
    text:  {
      de: 'Hilfreiche Statistiken zu Ihren interaktiven Übungen',
      en: 'Visualize progress.'
    }
  }];

  public awards = [
    {logo: 'v1480582033/venture_bldpxt.png',
      //name: 'Finalist',
      link: 'http://www.venture.ch/'},
    {logo: 'v1480581467/venture-kick_ubhyit.jpg',
      //name: '1st Stage Grant Winner',
      link: 'http://www.venturekick.ch/'}
  ];

  public referenceItems = [{
    logo: 'v1480581467/eth-logo_1_jkvapn.png',
    link: 'http://www.ethz.ch'
  }, {
    logo: 'v1480581467/hsg-logo1_jun01z.png',
    link: 'http://www.unisg.ch'
  },{
    logo: 'v1480581466/dmk-logo_aycgwh.jpg',
    link: 'http://www.vsmp.ch/dmk/'
    //name: 'Deutschschweizerische \n Mathematik-Kommission'
  }];



}

