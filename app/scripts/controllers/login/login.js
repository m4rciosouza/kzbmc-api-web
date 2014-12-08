/**
 * Controller de login no sistema.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'LoginCtrl', [ '$scope', '$location', '$resource', '$rootScope',
	function( $scope, $location, $resource, $rootScope ) {
	  
	  	/**
		 * Efetua o login no sistema.
		 * @method LoginCtrl::login
		 * @param {object} usuario
		 */
	    $scope.login = function( usuario ) {
	    	var usuarioObj = { 'email' : usuario.email, 'senha' : usuario.senha };
			var usuariosResource = $resource( $rootScope.urlUsuario );
		    usuariosResource.get( usuarioObj, function( data ) {
		    		sessionStorage.token = data.token;
					$location.path( '/' );
		    	},
		    	function() {
		     		$scope.erro = true;
		    	});
	    };
}]);