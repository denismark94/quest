// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//
var db = null;
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform,  $cordovaSQLite) {

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    alert('pre open run');
    db = $cordovaSQLite.openDB({name: "quest.db", location: "default"});
    alert('run');
    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS tasks (id integer primary key, title varchar, content varchar, img varchar, type integer);');
    $cordovaSQLite.execute(db, 'INSERT INTO tasks (title, content, img) VALUES ("123", "ывлаоывлоало", "img/davinci.jpg");');
//    $cordovaSQLite.execute(db, "select * from 'tasks'");
    alert('123 ' + db);
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

app.controller("qrCodeController", function($scope, $cordovaBarcodeScanner) {
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

});


app.controller("ExampleController", function($scope, $cordovaSQLite) {

    $scope.select = function(lastname) {
        alert('start');
        var query = "SELECT * FROM tasks";

        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                alert("SELECTED -> " + res.rows.item(0).title + " " + res.rows.item(0).content);
            } else {
                alert("No results found");
            }
        }, function (err) {
            alert('Error: ' + err);
        });
    }

});



/*function onNavigatingTo(args) {
    var page = args.object;
    if (!Sqlite.exists("populated.db")) {
        Sqlite.copyDatabase("populated.db");
    }
    (new Sqlite("populated.db")).then(db => {
        database = db;
        db.execSQL("SELECT * FROM `tasks`").then(id => {
            console.log("SELECT OK");
        }, error => {
            console.log("select ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
}*/
