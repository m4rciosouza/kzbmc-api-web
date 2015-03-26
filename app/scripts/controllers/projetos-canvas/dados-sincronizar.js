/**
 * Controller de cadastro de dados acesso a sincronização 
 * com o servidor remoto.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.1.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'DadosSincronizarCtrl', [ 
		'$scope', '$window', '$rootScope',
	function( $scope, $window, $rootScope ) {
	  
	  	/**
		 * Grava os dados de acesso ao servidor remoto no localStorage do navegador.
		 * @method DadosSincronizarCtrl::cadastrar
		 * @param {object} usuario
		 */
	    $scope.cadastrar = function( usuario ) {
	    	if( $rootScope.bmc ) {
		    	$window.localStorage.usuario = usuario.email;
		    	$window.localStorage.token = usuario.token;
		    } else {
		    	$window.localStorage.usuarioLean = usuario.email;
		    	$window.localStorage.tokenLean = usuario.token;
		    }
		    $scope.sucesso = true;
		    $scope.possuiUsuario = true;
	    };

	    /**
		 * Carrega os dados de acesso do servidor remoto.
		 * @method DadosSincronizarCtrl::carregarValores
		 */
	    $scope.carregarValores = function() {
	    	$scope.usuario = {};
	    	if( $rootScope.bmc ) {
	    		$scope.usuario.email = $window.localStorage.usuario || '';
	    		$scope.usuario.token = $window.localStorage.token || '';
	    	} else {
	    		$scope.usuario.email = $window.localStorage.usuarioLean || '';
	    		$scope.usuario.token = $window.localStorage.tokenLean || '';
	    	}
	    	$scope.possuiUsuario = $scope.usuario.email !== '';
	    };

	    $scope.carregarValores();
}]);