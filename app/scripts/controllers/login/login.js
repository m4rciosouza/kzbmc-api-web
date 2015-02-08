/**
 * Controller de login no sistema.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'LoginCtrl', [ '$scope', '$location', 
		'$window', 'loginService',
	function( $scope, $location, $window, loginService ) {
	  
	  	/**
		 * Efetua o login no sistema.
		 * @method LoginCtrl::login
		 * @param {object} usuario
		 */
	    $scope.login = function( usuario ) {
		    loginService.login( usuario, 
		    	function( response ) {
		    		$window.sessionStorage.token = response.token;
		    		$window.sessionStorage.email = usuario.email;
					$location.path( '/' );
		    	},
		    	function() {
		    		delete $window.sessionStorage.token;
		    		delete $window.sessionStorage.email;
		     		$scope.erro = true;
		    	}
		    );
	    };

	    delete $window.sessionStorage.token;
	    delete $window.sessionStorage.email;
}]);