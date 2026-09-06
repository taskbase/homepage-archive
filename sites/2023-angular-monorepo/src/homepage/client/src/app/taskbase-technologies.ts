const buildTechPicUrl = (pic: string) => {
  return `/assets/img/techmoduls/${pic}`;
};

export const blogarticles = [
  {
    pic: buildTechPicUrl("aufgabentypen.png"),
    title: "Automatisches didaktisches Feedback",
    html:
      "asf asdf asdf asdf asd fa sdf asd fa sdf asd fa sdfasdfasd fasdfasdf asdfasdfasd fasdfasdfasdfsaf" +
      "asdfasdfadfasdf asdfa sdfasdf as df as df as f as df as df a sd f asd f a asd f asdf ad df a sdf a sdf as df" +
      "asdfasdf  asdf as df as df s fa sd f asd f asdfasdfasdf asdf afsd f a sdf as dfasdf asd  sfasdfa\n\n21" +
      "sadfasdfasdf asdf asdf asdf  sd fa d f asdf a sdf asdf asd f as df a sdf  asd f asd f a sdf  asdf " +
      "asdfasdfasdfasdf",
  },
  {
    pic: buildTechPicUrl("aufgabentypen.png"),
    title: "Automatisches Aufgaben Generieren",
    html:
      "asf asdf asdf asdf asd fa sdf asd fa sdf asd fa sdfasdfasd fasdfasdf asdfasdfasd fasdfasdfasdfsaf" +
      "asdfasdfadfasdf asdfa sdfasdf as df as df as f as df as df a sd f asd f a asd f asdf ad df a sdf a sdf as df" +
      "asdfasdf  asdf as df as df s fa sd f asd f asdfasdfasdf asdf afsd f a sdf as dfasdf asd  sfasdfa\n\n21" +
      "sadfasdfasdf asdf asdf asdf  sd fa d f asdf a sdf asdf asd f as df a sdf  asd f asd f a sdf  asdf " +
      "asdfasdfasdfasdf",
  },
];

export interface BlogArticle {
  pic: string;
  title: string;
  html: string;
}

export const taskbaseTechnologies: TaskbaseTechnology[] = [
  {
    pic: buildTechPicUrl("autofeedback.svg"),
    pic2: buildTechPicUrl("puzzle1.png"),
    title: "Automatisches didaktisches Feedback",
    des1:
      "Taskbase ist marktführend auf dem Gebiet der automatischen Aufgabenauswertung. Neueste Entwicklungen aus " +
      "den Bereichen Machine Learning und Artificial Intelligence ermöglichen es, Lernenden unmittelbar didaktisches Feedback" +
      " zu geben. Antworten sind nicht einfach richtig oder falsch. Unsere Algorithmen sind auf über 250 verschiedene Feedbackfälle" +
      " trainiert. Zum Beispiel erkennen sie, ob die Lernenden Vorzeichen-, Tipp-, Komma- oder Konjunktionsfehler gemacht haben," +
      " ohne dass für die Autoren der Aufgaben ein Mehraufwand entsteht.",
    link: "automatisches-didaktisches-feedback",
  },
  {
    pic: buildTechPicUrl("50typen.svg"),
    pic2: buildTechPicUrl("puzzle2.png"),
    title: "Über 50 Aufgabentypen",
    des1:
      "Taskbase bietet Ihnen über 50 interaktive Aufgabentypen für Ihre Lernlösungen an. Damit können Sie Ihre Lösungen" +
      " mit Rekordgeschwindigkeit auf den Markt bringen. Auch bei der Umsetzung individueller Wünsche und Vorstellungen hilft" +
      " Ihnen unser spezialisiertes Team gerne weiter.",
    link: "ueber-50-aufgabentypen",
  },
  {
    pic: buildTechPicUrl("autogen.svg"),
    pic2: buildTechPicUrl("puzzle3.png"),
    title: "Automatischer Aufgabengenerator",
    des1:
      "Unsere Technologien machen es möglich, auf einfache Art und Weise Übungsaufgaben und Testfragen aus unterschiedlichen" +
      " Quellen zu erstellen. Zum Beispiel können Lehrpersonen mit kleinem Aufwand aus einem aktuellen Onlineartikel Vokabular- oder" +
      " Grammatikübungen erstellen. So kann das klassische Schulbuch ganz einfach ergänzt und erweitert werden.",
    link: "automatischer-aufgabengenerator",
  },
  {
    pic: buildTechPicUrl("testalgo.svg"),
    pic2: buildTechPicUrl("puzzle4.png"),
    title: "Adaptive Testalgorithmen",
    des1:
      "Taskbase hat langjährige Erfahrung mit adaptiven Testalgorithmen. Diese sind so konzipiert, dass mit möglichst wenig " +
      "Testfragen die Stärken und Schwächen der Lernenden erkannt werden. Die Ergebnisse können für Lehrpersonen und Eltern wichtige" +
      " Indikatoren zur Förderung sein oder in interaktiven Lernlösungen als Einstufungstest eingesetzt werden. Für Lernende dienen " +
      "die adaptiven Tests der Orientierung über ihren Wissensstand.",
    link: "adaptive-testalgorithmen",
  },
  {
    pic: buildTechPicUrl("lernalgo.svg"),
    pic2: buildTechPicUrl("puzzle5.png"),
    title: "Adaptive Lernalgorithmen",
    des1:
      "Taskbase entwickelt zusammen mit Schweizer Hochschulen modernste adaptive Lernalgorithmen. Diese berechnen individuelle" +
      " Lernpfade für jeden Lernenden. Dadurch kann auch im Selbststudium eine optimale Betreuung garantiert werden. Die Algorithmen" +
      " nehmen Rücksicht auf Stärken und Schwächen sowie individuelle Lernpräferenzen und wählen weitere Übungen aufgrund vorangegangener" +
      " Interaktionen aus. So sind die Lernenden weder über- noch unterfordert und stets maximal motiviert.",
    link: "adaptive-lernalgorithmen",
  },
  {
    pic: buildTechPicUrl("onlineedit.svg"),
    pic2: buildTechPicUrl("puzzle6.png"),
    title: "Online Aufgabeneditor",
    des1:
      "Taskbase arbeitet eng mit Autoren interaktiver Lerninhalte zusammen. Damit sich diese auf das Erstellen von kreativen und" +
      " didaktisch wertvollen Aufgaben konzentrieren können, stellen wir einfach anwendbare Werkzeuge zur Verfügung. Die Aufgaben können" +
      " elektronisch und als Printversion verwendet werden. Gerne integrieren wir auch bereits bestehende Aufgaben in neue interaktive" +
      " Lernlösungen.",
    link: "online-aufgabeneditor",
  },
];

export interface TaskbaseTechnology {
  pic: string;
  pic2: string;
  title: string;
  des1: string;
  link: string;
}
