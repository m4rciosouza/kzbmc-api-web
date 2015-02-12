/**
 * Controller de logout no sistema.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'LogoutCtrl', [ '$scope', '$location', '$window', '$rootScope',
	function( $scope, $location, $window, $rootScope ) {
	  
	  	/**
		 * Efetua o logout no sistema.
		 * @method LogoutCtrl::logout
		 */
	    $scope.logout = function() {
	    	delete $window.sessionStorage.token;
	    	delete $window.sessionStorage.email;
	    	$rootScope.loggedIn = false;
			$location.path( '/login' );
	    };

	    $scope.logout();
}]);