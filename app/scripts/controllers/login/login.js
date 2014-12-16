/**
 * Controller de login no sistema.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'LoginCtrl', [ '$scope', '$location', '$resource', '$rootScope', '$window',
	function( $scope, $location, $resource, $rootScope, $window ) {
	  
	  	/**
		 * Efetua o login no sistema.
		 * @method LoginCtrl::login
		 * @param {object} usuario
		 */
	    $scope.login = function( usuario ) {
	    	var usuarioObj = { 'email' : usuario.email, 'senha' : usuario.senha };
			var usuariosResource = $resource( $rootScope.urlUsuario );
		    usuariosResource.save( {}, usuarioObj, function( data ) {
		    		$window.sessionStorage.token = data.token;
		    		$window.sessionStorage.email = usuario.email;
					$location.path( '/' );
		    	},
		    	function() {
		    		delete $window.sessionStorage.token;
		    		delete $window.sessionStorage.email;
		     		$scope.erro = true;
		    	});
	    };

	    delete $window.sessionStorage.token;
	    delete $window.sessionStorage.email;
}]);