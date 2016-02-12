'use strict';

juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $stateParams, $state) {

	$scope.createPlaylist = function(){

		PlaylistFactory.create($scope.playlist)
		.then(function(playlist){
			console.log(playlist, "new playlist");
			$scope.playlist.name = "";
			$scope.NewPlaylist.$setPristine();
			$state.go('playlist', {playlistId: playlist._id});
		});
	};

});

juke.controller('showPlaylistCtrl', function ($scope, $stateParams, PlaylistFactory, SongFactory, PlayerFactory) {

	PlaylistFactory.fetchById($stateParams.playlistId)
	.then(function (playlist) {
		$scope.playlist = playlist;
	});

	SongFactory.fetchAll()
	.then(function (songs){
		$scope.songs = songs;
	})

	$scope.addSong = function() {
		console.log($scope.songSelection,$stateParams.playlistId )
		PlaylistFactory.addSong($stateParams.playlistId, $scope.songSelection)
		.then(function(song) {
			console.log("song added", song);
			$scope.playlist.songs.push(song);
			$scope.songSelection = "";
		});
	};

	$scope.toggle = function (song) {
	    if (song !== PlayerFactory.getCurrentSong()) {
	      PlayerFactory.start(song, $scope.playlist.songs);
	    } else if ( PlayerFactory.isPlaying() ) {
	      PlayerFactory.pause();
	    } else {
	      PlayerFactory.resume();
	    }
  	};

  	$scope.getCurrentSong = PlayerFactory.getCurrentSong;
  	$scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.deleteSong = function(playlistId, song){
  	console.log("deleting song")
  	PlaylistFactory.deleteSong(playlistId, song._id)
  	.then(function () {
  		var i = $scope.playlist.songs.indexOf(song);
  		console.log("the index:",i);
  		$scope.playlist.songs.splice(i,1);
  	})
  	.catch(console.error.bind(console));
  }



});
