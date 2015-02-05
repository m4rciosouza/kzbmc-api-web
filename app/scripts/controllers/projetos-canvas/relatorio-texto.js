/**
 * Controller de geração de relatórios em modo texto de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasRelatorioTextoCtrl', [ '$scope', '$location', '$routeParams', 
		'$resource', '$rootScope', '$window', 'projetoCanvasService',
	function( $scope, $location, $routeParams, $resource, $rootScope, $window, projetoCanvasService ) {

		/**
		 * Carrega um projeto canvas.
		 * @method ProjetosCanvasRelatorioTextoCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
			$scope.index = $routeParams.index;
			projetoCanvasService.carregarProjeto( $scope.index,
				function( response ) {
					$scope.projeto = response.projeto || [];
					$scope.projeto.itens = response.itens || [];
				},
				function() {
				  	$location.path( '/' );
				}
			);
		};

		$scope.carregarProjeto();
	}
]);