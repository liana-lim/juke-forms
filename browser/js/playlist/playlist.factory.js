'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory) {
	
	var cachedPlaylists = [];

	var playlistObj = {};

	var toData = function(response) {
		return response.data;
	};

	playlistObj.create = function(playlist){
		return $http.post('/api/playlists', playlist)
		.then(toData)
		.then(function(playlist){
			cachedPlaylists.push(playlist);
			return playlist;
		});
	};

	playlistObj.fetchAll = function() {
		return $http.get('/api/playlists')
		.then(toData)
		.then(function(playlists){
			angular.copy(playlists, cachedPlaylists);
			return cachedPlaylists;
		});
	};

	playlistObj.fetchById = function(id) {
		return $http.get('/api/playlists/' + id)
		.then(toData)
		.then(function(playlists) {
			playlists.songs = playlists.songs.map(SongFactory.convert);
			return playlists;
		});
	}

	playlistObj.addSong = function(playlistId, song) {
		return $http.post('api/playlists/' + playlistId + '/songs', {song: song})
		.then(toData)
		.then(function(song) {
			return SongFactory.convert(song);
		});
	};

	return playlistObj;

});
