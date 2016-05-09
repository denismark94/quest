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
});


function getContext() {
  alert(JSON.stringify(sqliQuery("SELECT * FROM `scene-stats` WHERE active = 1"), null, 4));
}

function formatTime(time){return ((time > 9)? time: '0' + time);}

function timer(){
  var t = Date.parse('May 22 2016 23:00:00 GMT+03:00') - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  document.getElementById("timer").innerHTML = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

var timeinterval = setInterval(timer, 1000);

