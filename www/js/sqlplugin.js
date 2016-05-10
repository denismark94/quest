/*function sqliQuery (query) {
  $cordovaSQLite = sqlplugin;
  var result = {
    "error": true
  };
  alert('1');
  $cordovaSQLite.execute(db, query).then(function(res) {
      result = res;
      alert(JSON.stringify(result));
  }, function (err) {
      alert('3');

      console.error(JSON.stringify(err, null, 4));
  });
  //http://stackoverflow.com/questions/32509022/angular-wait-for-promise-in-sqlite-insert
  return result;
}
*/

function prefildDB () {
    $cordovaSQLite = sqlplugin;
    $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS `tasks`').then(
    $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS `answers`').then(
    $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS `questions`').then(
    $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS `scene`').then(
    $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS `scene-list`').then(
    $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS `scene-stats`').then(

      $cordovaSQLite.execute(db, 'CREATE TABLE `tasks` (id integer primary key, title varchar, content varchar, img varchar, type integer);').then(
      $cordovaSQLite.execute(db, 'CREATE TABLE `answers` ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "question" INTEGER, "answer" VARCHAR);').then(
      $cordovaSQLite.execute(db, 'CREATE TABLE `questions` ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "task" INTEGER, "number" INTEGER, "type" INTEGER, "question" VARCHAR);').then(
      $cordovaSQLite.execute(db, 'CREATE TABLE `scene` ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "name" VARCHAR, "time" INTEGER);').then(
      $cordovaSQLite.execute(db, 'CREATE TABLE `scene-list` ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "scene" INTEGER, "num" INTEGER, "task" INTEGER);').then(
      $cordovaSQLite.execute(db, 'CREATE TABLE `scene-stats` ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "scene" INTEGER, "active" INTEGER, "start" Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);').then(

        $cordovaSQLite.execute(db, 'INSERT INTO tasks (title, content, img) VALUES ("Задание 1", "Небольшой текст", "img/davinci.jpg");').then(
        $cordovaSQLite.execute(db, 'INSERT INTO tasks (title, content, img) VALUES ("Задание 2", "Ненебольшой текст", "img/davinci.jpg");').then(
        $cordovaSQLite.execute(db, 'INSERT INTO "scene" VALUES(1,"Пробный",180);').then(
        $cordovaSQLite.execute(db, 'INSERT INTO "answers" VALUES(1,1,"Ответик");').then(
        $cordovaSQLite.execute(db, 'INSERT INTO "questions" VALUES(1,1,1,1,"Вопросик");').then(
        $cordovaSQLite.execute(db, 'INSERT INTO "scene-list" (scene, num, task) VALUES(1,1,1);').then(
        $cordovaSQLite.execute(db, 'INSERT INTO "scene-list" (scene, num, task) VALUES(1,2,2);').then(
        $cordovaSQLite.execute(db, 'INSERT INTO "tasks" VALUES(1,"Первое задание","Современная образовательная парадигма, ратифицируя приоритет           личностной ориентации педагогического процесса, в ходе которого           осуществляется развитие природных задатков, заложенных в каждом индивидууме,           требует переосмысления существующих традиционных форм и           методов общеобязательного образования.","img/davinci.jpg","");').then(
        $cordovaSQLite.execute(db, 'INSERT INTO "scene-stats" (`scene`, `active`) VALUES(1, 0);').then(

          alert('Done.')
         )))))))))
      ))))))
    ))))));
}


