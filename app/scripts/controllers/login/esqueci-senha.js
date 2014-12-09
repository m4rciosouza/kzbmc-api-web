/**
 * Controller de recuperação de senha.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'EsqueciSenhaCtrl', [ '$scope', '$resource', '$rootScope',
	function( $scope, $resource, $rootScope ) {
	  
	  	/**
		 * Efetua o processo de recupeção de senha.
		 * @method EsqueciSenhaCtrl::recuperarSenha
		 * @param {object} usuario
		 */
	    $scope.recuperarSenha = function( usuario ) {
	    	$scope.sucesso = false;
		    $scope.erro = false;
			var esqueciSenhaResource = $resource( $rootScope.urlEsqueciSenha );
		    esqueciSenhaResource.get( { 'email' : usuario.email }, function() {
		    		$scope.sucesso = true;
		    	},
		    	function() {
		     		$scope.erro = true;
		    	});
	    };
}]);