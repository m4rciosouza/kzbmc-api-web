/**
 * Controller de recuperação de senha.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'NovaSenhaCtrl', [ '$scope', '$resource', '$rootScope', '$routeParams',
	function( $scope, $resource, $rootScope, $routeParams ) {
	  
		$scope.token = $routeParams.token;
		$scope.usuario = {};
		$scope.usuario.email = $routeParams.usuario;

	  	/**
		 * Define uma nova senha para o usuário.
		 * @method NovaSenhaCtrl::definirNovaSenha
		 * @param {object} usuario
		 */
	    $scope.definirNovaSenha = function( usuario ) {
	    	$scope.sucesso = false;
		    $scope.erro = false;
		    var params = { 
		    	email : usuario.email,
		    	senha : usuario.senha,
		    	token : $scope.token 
		    };
			var novaSenhaResource = $resource( $rootScope.urlNovaSenha );
		    novaSenhaResource.save( {}, params, 
		    	function() {
		    		$scope.sucesso = true;
		    	},
		    	function() {
		     		$scope.erro = true;
		    	}
		    );
	    };
}]);