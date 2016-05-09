function sqliQuery (query) {
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

function createDB () {
    $cordovaSQLite = sqlplugin;
    var query = "SELECT * FROM tasks";
    $cordovaSQLite.execute(db, query).then(function(res) {
       alert("DB exists");
    }, function (err) {
      alert("DB !exists");
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS tasks (id integer primary key, title varchar, content varchar, img varchar, type integer);');
      $cordovaSQLite.execute(db, 'CREATE TABLE "answers" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "question" INTEGER, "answer" VARCHAR);');
      $cordovaSQLite.execute(db, 'CREATE TABLE "questions" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "task" INTEGER, "number" INTEGER, "type" INTEGER, "question" VARCHAR);');
      $cordovaSQLite.execute(db, 'CREATE TABLE "scene" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "name" VARCHAR, "time" INTEGER);');
      $cordovaSQLite.execute(db, 'CREATE TABLE "scene-list" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL , "scene" INTEGER, "num" INTEGER, "task" INTEGER);');
      $cordovaSQLite.execute(db, 'CREATE TABLE "scene-stats" ("id" INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL  UNIQUE , "scene" INTEGER, "active" INTEGER, "start" Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);');

      $cordovaSQLite.execute(db, 'INSERT INTO tasks (title, content, img) VALUES ("Задание 1", "Небольшой текст", "img/davinci.jpg");');
      $cordovaSQLite.execute(db, 'INSERT INTO tasks (title, content, img) VALUES ("Задание 2", "Ненебольшой текст", "img/davinci.jpg");');
      $cordovaSQLite.execute(db, 'INSERT INTO "scene" VALUES(1,"Пробный",1800);');
      $cordovaSQLite.execute(db, 'INSERT INTO "answers" VALUES(1,1,"Ответик");');
      $cordovaSQLite.execute(db, 'INSERT INTO "questions" VALUES(1,1,1,1,"Вопросик");');
      $cordovaSQLite.execute(db, 'INSERT INTO "scene-list" VALUES(1,1,1,1);');
      $cordovaSQLite.execute(db, 'INSERT INTO "tasks" VALUES(1,"Первое задание","Современная образовательная парадигма, ратифицируя приоритет           личностной ориентации педагогического процесса, в ходе которого           осуществляется развитие природных задатков, заложенных в каждом индивидууме,           требует переосмысления существующих традиционных форм и           методов общеобязательного образования.","img/davinci.jpg","");');
      $cordovaSQLite.execute(db, 'INSERT INTO "scene-stats" (`scene`, `active`) VALUES(1, 1);');
    });
}


