juke.config(function ($stateProvider) {

  $stateProvider
  .state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/newPlaylist.html',
    controller: 'PlaylistCtrl'
  })
  .state('playlist', {
    url: '/playlists/:playlistId',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'showPlaylistCtrl'
  })
});