// hand-transpiled from components/services/translation-service.ts
// (type annotations and access modifiers stripped; the translation map below
//  is copied verbatim from the era source)

class TranslationService {

  get currentLang() {

    let lang;
    if (this.UserService.getUser() && this.UserService.getUser().language) {
      lang =  this.UserService.getUser().language
    } else {
      lang =  this.browserLanguage();
    }
    return lang;
  }

  constructor(Utils, UserService){
    this.Utils = Utils;
    this.UserService = UserService;
    this._translations = {};

    this.deTranslations = {
      "File too large" : "Datei zu gross",
      "Select Image": "Bild wählen",
      "Select Files": "Dateien wählen",
      "Join": "Beitreten",
      "Not found": "Nicht gefunden",
      "Sorry, this code doesn't exist": "Diesen Code gibt es leider nicht",
      "You must be logged in to register for this course" : "Du musst eingeloggt sein um dich für diesen Kurs zu registrieren",
      "Share automatic join link": "Link für den automatischen Beitritt teilen",
      "insert solution": "Lösung eingeben",
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
      "In case of any questions, please don't hesitate to contact us!" : "Bei Fragen wenden Sie sich ungeniert an uns!",
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
      "Wrong! Pay attention to the comparative and superlative of your adjectives.": "Falsch. Achte auf den Komparativ und Superlativ deiner Adjektive.",
      "Wrong! Pay attention to the plural of your nouns.": "Falsch. Achte auf den Plural deiner Nomen.",
      "Wrong! Pay attention to the comparative and superlative of your adverbs.": "Falsch. Achte auf den Komparativ und Superlativ deiner Adverben.",
      "Wrong! Pay attention to the form and tense of your verbs.": "Falsch. Achte auf die Form deiner Verben.",
      "Wrong! Consider that this prototype is optimized for english and math expresions.": "Falsch. Beachte, dass dies ein Prototyp ist für englische und mathematische Ausdrücke.",
      "Wrong! Your answer doesn't fit the solution.": "Falsch. Deine Antwort passt nicht zur Lösung.",
      "Wrong! Please enter something!" : "Falsch. Bitte gib etwas ein.",
      "Wrong" : "Falsch",
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
      "Share a copy of your resources with other teachers, or invite students to this course." : "Teile eine Kopie von deinen Ressourcen mit anderen Lehrpersonen oder lade Lernende ein.",
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
      "Create": "Erstellen",
      "Course Title": "Kurs Titel",
      "Choose an image for the course" : "Wähle ein Bild für den Kurs",
      "Select course level" : "Niveau wählen",
      "Select a subject" : "Fach wählen",
      "Create New Course" : "Neuen Kurs erstellen",
      "What is what?": "Was ist was?",
      "Create your own course for your class. The students love it and you've got everything in one place.": "Erstelle einen eigenen Kurs für Deine Klasse. Die Schüler lieben es und Du hast alles an einem Ort.",
      "Or send us your material and we'll upload it for you!" :'Wir helfen Dir dabei.',
      'Upload your existing content.':'Lade Dein bestehendes Material hoch.',
      'Play with Taskbase. We have created a course for you, where you can test things out.':'Spiele mit der Plattform. Wir haben einen Kurs für Dich erstellt, wo Du Dinge testen kannst.',
      'How to start': 'Wie anfangen',
      'Create new material' : 'Neues Material erstellen',
      'Search for existing Material in our database or in your library': 'Suche nach existierendem Material in unserer Datenbank oder deiner Bibliothek.',
      'Add Answer': "Antwort hinzufügen",
      'True / False Question' : "Wahr / Falsch Fragen",
      'Flashcard' : 'Karteikarten',
      'Open Question' : 'Offene Frage',
      'Quiz' : 'Quiz',
      'Sheet' : "Interaktives Blatt",
      'Flashcards': 'Karteikarten',
      'Video':'Video',
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
      "Points": "Punkte",
      "Cancel": "Abbrechen",
      "Update": "Speichern",
      "Add Existing": "Suchen",
      "Create New": "Erstellen",
      "Task Title": "Titel",
      "Solution": "Lösung",
      "Add Solution Step": "Lösungsschritt hinzufügen",
      "New Course": "Kurs erstellen",
      "Courses": "Kurse",
      "Share": "Teilen",
      "Settings": "Einstellungen",
      "Course Info": "Kurs Info",
      "Click here to edit": "Hier klicken zum Editieren",
      "Student-View": "Schüler-Ansicht",
      "Teacher-View": "Lehrer-Ansicht",
      "Log out": "Ausloggen",
      "Profile": "Profil",
      "Change Password": "Passwort Ändern",
      "Advanced": "Fortgeschritten",
      "Preferred Content Type": "Präferierter Inhaltstyp",
      "Default": "Standard",
      "Old Password" : "Altes Passwort",
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
      "Change type": "Typ ändern",
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
      "German": "Deutsch",
      "English": "Englisch",
      "Subject": "Thema",
      "Level": "Niveau",
      "Image": "Bild",
      "Save": "Speichern",
      "Delete Course": "Kurs löschen",
      "Do you really want to delete this": "Möchtest du das wirklich löschen",
      "Confirm by entering" : "Bestätige mit der Eingabe",
      "of": "von",
      "by questions answered": "nach beantworteten Fragen",
      "by number of active students": "nach Anzahl aktiver SchülerInnen",
      "Activity": "Aktivität",
      "Library": "Bibliothek"
    };
    this._translations.de = this.deTranslations;

  }

  browserLanguage() {
    let locale = window.navigator.language;
    if (locale.indexOf('de') > -1) {
      return 'de';
    } else {
      return 'en';
    }
  }

  translate(key) {
    // private perform translation
    let translation = key;

    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    return translation;
  }

  instant(key) {
    // call translation
    return this.translate(key);
  }

}
TranslationService.$inject = ['Utils', 'UserService'];

angular.module('taskbaseApp').service('TranslationService', TranslationService);
