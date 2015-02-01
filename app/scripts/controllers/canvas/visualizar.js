/**
 * Controller de visualização de um canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'CanvasVisualizarCtrl', [ '$scope', '$routeParams', '$location', '$resource', 
		'$window', '$rootScope',
	function( $scope, $routeParams, $location, $resource, $window, $rootScope ) {
	  
	/**
	 * Carrega um projeto canvas para visualização do canvas.
	 * @method CanvasVisualizarCtrl::carregarProjeto
	 */
	$scope.carregarProjeto = function() {
		$scope.index = $routeParams.index;
	    var itensCanvasResource = $resource( $rootScope.urlItemCanvas + '/projeto-canvas/:id?email=:email' );
		var itensCanvas = itensCanvasResource.get( { id : $routeParams.index, email : $window.sessionStorage.email }, 
			function() {
				$scope.projeto = itensCanvas.projeto || [];
				$scope.projeto.itens = itensCanvas.itens || [];
				$scope.modoLeitura = itensCanvas.modoLeitura;
			},
			function() {
			  	$location.path( '/' );
			});
	};

	/**
	 * Objeto utilizado para a atualização da ordem dos itens de uma área do canvas quando ordenado.
	 */
	$scope.sortableOptions = {
        stop : function() {
                console.log( 'projeto : ' + angular.toJson($scope.projeto) + ' :: index : ' + $scope.index  );
              },
        axis : 'y',
      };

	$scope.carregarProjeto();
	  
}]);