/**
 * Controller de cadastro de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasCadastrarCtrl', [ '$scope', '$location', '$resource', '$rootScope', 
		function( $scope, $location, $resource, $rootScope ) {
	  
	$scope.liteVersion = $rootScope.liteVersion;
	$scope.qtdProjetos = 1; //TODO tornar dinamico

	/**
	 * Cadastra um novo projeto canvas.
	 * @method ProjetosCanvasCadastrarCtrl::cadastrar
	 * @param {object} projeto canvas
	 */
	$scope.cadastrar = function( canvas ) {
		if( $scope.form.$valid ) {
			var projetoCanvasObj = { 'nome' : canvas.nome, 'descricao' : canvas.descricao, 'email' : 'marcio@kazale.com' }; //TODO email dinamico
			var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas );
		    projetosCanvasResource.save( {}, projetoCanvasObj, function() {
		    		$location.path( '/' );
		    	},
		    	function() {
		     		$scope.erro = true;
		    	});
		}
	};
}]);