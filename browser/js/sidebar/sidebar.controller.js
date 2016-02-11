'use strict';

juke.controller('SidebarCtrl', function ($scope, PlaylistFactory, $state) {

	$scope.viewAlbums = function () {
	$state.go('albums');
	};

	$scope.viewAllArtists = function () {
	$state.go('artists');
	};

	PlaylistFactory.fetchAll()
	.then(function(playlists) {
		$scope.playlists = playlists;
	});
	

});
