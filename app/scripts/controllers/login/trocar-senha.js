/**
 * Controller de recuperação de senha.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'TrocarSenhaCtrl', [ '$scope', '$resource', '$rootScope', 
		'$routeParams', '$window', '$location',
	function( $scope, $resource, $rootScope, $routeParams, $window, $location ) {
	  
		$scope.usuario = {};
		$scope.usuario.email = $window.sessionStorage.email;

	  	/**
		 * Define uma nova senha para o usuário.
		 * @method TrocarSenhaCtrl::trocarSenha
		 * @param {object} usuario
		 */
	    $scope.trocarSenha = function( usuario ) {
	    	$scope.sucesso = false;
		    $scope.erro = false;
		    var params = { 
		    	email : $window.sessionStorage.email,
		    	senhaAtual : usuario.senhaAtual,
		    	novaSenha : usuario.novaSenha
		    };
			var trocarSenhaResource = $resource( $rootScope.urlTrocarSenha );
		    trocarSenhaResource.save( {}, params, 
		    	function() {
		    		$scope.sucesso = true;
		    	},
		    	function() {
		     		$scope.erro = true;
		    	}
		    );
	    };

	    if( ! $rootScope.loggedIn ) {
	    	$location.path( '/login' );
	    }
}]);