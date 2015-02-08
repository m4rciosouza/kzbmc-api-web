/**
 * Controller de visualização de um canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'CanvasVisualizarCtrl', [ '$scope', '$routeParams', '$location', '$resource', 
		'$window', '$rootScope', 'canvasService',
	function( $scope, $routeParams, $location, $resource, $window, $rootScope, canvasService ) {
	  
	/**
	 * Carrega um projeto canvas para visualização do canvas.
	 * @method CanvasVisualizarCtrl::carregarProjeto
	 */
	$scope.carregarProjeto = function() {
		$scope.index = $routeParams.index;
		$scope.urlSlideshow = $rootScope.urlSlideshow + '?id=' + $scope.index + '&email=' + $window.sessionStorage.email;
		canvasService.carregarProjeto( $scope.index, 
			function( response ) {
				$scope.projeto = response.projeto || [];
				$scope.projeto.itens = response.itens || [];
				$scope.modoLeitura = response.modoLeitura;
			},
			function() {
				$location.path( '/' );
			}
		);
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