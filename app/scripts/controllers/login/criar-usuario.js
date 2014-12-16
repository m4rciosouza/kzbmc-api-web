/**
 * Controller de cadastro de um novo usuario.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'CriarUsuarioCtrl', [ '$scope', '$resource', '$rootScope', '$window',
		function( $scope, $resource, $rootScope, $window ) {

	/**
	 * Cadastra um novo usuario.
	 * @method CriarUsuarioCtrl::cadastrar
	 * @param {object} usuario
	 */
	$scope.cadastrar = function( usuario ) {
		if( $scope.form.$valid ) {
			var usuarioObj = { 'email' : usuario.email, 'senha' : usuario.senha, 'lingua' : $window.localStorage.lingua };
			var usuariosResource = $resource( $rootScope.urlUsuarios );
		    usuariosResource.save( {}, usuarioObj, function() {
		    		$scope.sucesso = true;
		    	},
		    	function() {
		     		$scope.erro = true;
		    	});
		}
	};
}]);