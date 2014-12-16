/**
 * Controller de logout no sistema.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'LogoutCtrl', [ '$scope', '$location', '$window',
	function( $scope, $location, $window ) {
	  
	  	/**
		 * Efetua o logout no sistema.
		 * @method LogoutCtrl::logout
		 */
	    $scope.logout = function() {
	    	delete $window.sessionStorage.token;
	    	delete $window.sessionStorage.email;
			$location.path( '/login' );
	    };

	    $scope.logout();
}]);