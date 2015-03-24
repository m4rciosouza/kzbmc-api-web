/**
 * Controller de cadastro de dados acesso a sincronização 
 * com o servidor remoto.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'DadosSincronizarCtrl', [ '$scope', '$window', 
	function( $scope, $window ) {
	  
	  	/**
		 * Grava os dados de acesso ao servidor remoto no localStorage do navegador.
		 * @method DadosSincronizarCtrl::cadastrar
		 * @param {object} usuario
		 */
	    $scope.cadastrar = function( usuario ) {
	    	$window.localStorage.usuario = usuario.email;
	    	$window.localStorage.token = usuario.token;
		    $scope.sucesso = true;
	    };
}]);