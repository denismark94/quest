angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("qrCodeCtrl", function($scope, $cordovaBarcodeScanner) {
    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData){
			      var respond = imageData.text;
			      if (respond=="Правильный ответ")
			        alert("Bingo!");
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
})

.controller("SQLiteCtrl", function($scope, $cordovaSQLite) {

    $scope.select = function(lastname) {
        alert('start');
        var query = "SELECT * FROM tasks";

        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
              for (var i = 0; i <= res.rows.length; i++) {
                alert("SELECTED -> " + res.rows.item(i).title + " " + res.rows.item(i).content);
              }
            } else {
                alert("No results found");
            }
        }, function (err) {
            alert('Error: ' + err);
        });
    }

})

.controller("StarterCtrl", function($scope, $ionicPlatform) {
})

.controller("NextCtrl", function($scope, $cordovaSQLite){
    $scope.getnextpage = function() {
  alert(scene.active + " scene id " + scene.id);
    var query = 'SELECT * FROM `scene-list` WHERE scene = "' + scene.id + '" AND `num` = "' + (++scene.active)  + '"';
    $cordovaSQLite.execute(db, query).then(
      function(result) {
        if (result.rows.length == 0)
        {
          scene.active = -1;
          getPage();
          return;
        }
        scene.task = result.rows.item(0).task;
        getPage();
      },
        function(err) {error(err);}
      );
    }
})

.controller("AdminCtrl", function($scope){
    $scope.prefildDB = prefildDB();
});

function getContext() {
  var query = "SELECT * FROM `scene-stats` WHERE active != -1";
  $cordovaSQLite = sqlplugin;
  $cordovaSQLite.execute(db, query).then(
    function(result) {
        if (result.rows.length != 1) {
          admin();
          return;
        }

        if (!confirm("Продолжить квест?"))
          admin();

        scene.start = result.rows.item(0).start;
        scene.id = result.rows.item(0).scene;
        scene.active = result.rows.item(0).active;

        var query = 'SELECT * FROM `scene` WHERE `id` ="' + scene.id + '"';
        $cordovaSQLite.execute(db, query).then(
            function(result) {
                if (result.rows.length != 1) {
                  alert ('Scene !exists');
                  return;
                }
                scene.name = result.rows.item(0).name;
                scene.time = result.rows.item(0).time;
                scene.endTime = Date.parse(scene.start) + (scene.time * 60 + UTCShift) * 1000;
                var timeinterval = setInterval(timer, 1000);
                getPage();
            },
            function (err) {error(err);}
          );
    },
    function (err) {
      prefildDB();
      error(' db !exists ' + err);
      getContext();
    }
  );
}

function getPage() {
  if (scene.active == 0)
  {
    $('h1').text(scene.name);
    return;
  }
  if (scene.active == -1)
  {
    $('ion-content').html('<h1>Конец</h1>');
      return;
  }
  var query = 'SELECT * FROM `tasks` WHERE id = "' + scene.task + '"';
  $cordovaSQLite = sqlplugin;
  $cordovaSQLite.execute(db, query).then(
    function(result) {
      if (result.rows.length == 0) {
        error('!exists task ' + scene.task);
        return;
      }
      $('#content').text(result.rows.item(0).content);
      $('h1').text(result.rows.item(0).title);
    },
    function (err) {error(err)}
  );
}

function admin() {
  while (prompt("Введите пароль:", '') != "1")
  {
    alert('Неверный пароль? Пиши: 1');
  }

  $('h1').html('quest admin pro 2000');

  if (!confirm("Очистить ДБ?"))
    prefildDB();
}

function error(err) {
    alert('error ' + JSON.stringify(err, null, 4));
    console.error(JSON.stringify(err, null, 4));
}

function formatTime(time){return ((time > 9)? time: '0' + time);}
function timer(){
  //var t = Date.parse('May 22 2016 23:00:00 GMT+03:00') - Date.parse(new Date());
  var t = scene.endTime - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  document.getElementById("timer").innerHTML = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}


