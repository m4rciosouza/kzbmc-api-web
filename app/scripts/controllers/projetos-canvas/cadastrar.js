/**
 * Controller de cadastro de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasCadastrarCtrl', [ '$scope', '$location', '$resource', '$rootScope', '$window', 
		function( $scope, $location, $resource, $rootScope, $window ) {
	  
	$scope.liteVersion = $rootScope.liteVersion;
	$scope.qtdProjetos = 1; //TODO tornar dinamico

	/**
	 * Cadastra um novo projeto canvas.
	 * @method ProjetosCanvasCadastrarCtrl::cadastrar
	 * @param {object} projeto canvas
	 */
	$scope.cadastrar = function( canvas ) {
		if( $scope.form.$valid ) {
			var projetoCanvasObj = { 'nome' : canvas.nome, 'descricao' : canvas.descricao, 'email' : $window.sessionStorage.email };
			var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas );
		    projetosCanvasResource.save( {}, projetoCanvasObj, function() {
		    		$location.path( '/' );
		    	},
		    	function( response ) {
			     	if( response.status === 401 ) {
			     		$location.path( '/login' );
			     	}
		     		$scope.erro = true;
		    	});
		}
	};
}]);