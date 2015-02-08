/**
 * Controller de cadastro de um novo usuario.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'CriarUsuarioCtrl', [ '$scope', 'loginService',
		function( $scope, loginService ) {

	/**
	 * Cadastra um novo usuario.
	 * @method CriarUsuarioCtrl::cadastrar
	 * @param {object} usuario
	 */
	$scope.cadastrar = function( usuario ) {
		if( $scope.form.$valid ) {
		    loginService.cadastrarUsuario( usuario, 
		    	function() {
		    		$scope.sucesso = true;
		    	},
		    	function() {
		     		$scope.erro = true;
		    	}
		    );
		}
	};
}]);