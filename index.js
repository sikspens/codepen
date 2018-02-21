var broadcastApp = angular.module('broadcastApp', []);

//UI controller
broadcastApp.controller('MainCtrl', function() {
  this.stateFilter = "";
  this.selected = 1;
  var control = this;

  this.stateFilter = {
    isStreaming: ""
  };
  this.select = function(index) {
    control.selected = index;
  };
  this.displayAll = function() {
    this.stateFilter = "";
  };

  this.displayOnline = function() {
    this.stateFilter = {
      isStreaming: true
    };
  };

  this.displayOffline = function() {
    this.stateFilter = {
      isStreaming: false
    };
  };
});
//Controller for the API
broadcastApp.controller('APIController', ['$http', function($http) {
  var control = this; // Set scope properties for promise callbacks 
  this.usersList = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "medrybw", "brunofin", "thomasballinger", "noobs2ninjas", "beohoff"];
  this.users = []; //this stores users info

  this.getUserInfo = function(username) {
    var user = {}
    var userPromise = $http.jsonp("https://api.twitch.tv/kraken/users/44322889?client_id=XXXXX");

    userPromise.success(function(data, status, headers, config) {
      user.name = data.display_name;
      user.logo = data.logo;

    });
    userPromise.error(function(data, status, headers, config) {
      alert("AJAX failed!");
    });

    var streamPromise = $http.jsonp("https://api.twitch.tv/kraken/users/44322889?client_id=XXXXX");

    streamPromise.success(function(data, status, headers, config) {
      if (data.stream) {
        user.isStreaming = true;
        user.status = data.stream.channel.status;
      } else {
        user.isStreaming = false;
      }
    });
    streamPromise.error(function(data, status, headers, config) {
      console.log("AJAX failed!");
    });

    return user;
  };

  this.getAllUsers = function(list) {
    control.usersList.forEach(function(user) {
      var user = control.getUserInfo(user);
      control.users.push(user);
    });
  };

  control.getAllUsers(control.usersList);
}]);