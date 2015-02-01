/**
 * Controller de geração de relatórios em modo texto de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasRelatorioTextoCtrl', [ '$scope', '$location', '$routeParams', 
		'$resource', '$rootScope', '$window', 
	function( $scope, $location, $routeParams, $resource, $rootScope, $window ) {

		/**
		 * Carrega um projeto canvas.
		 * @method ProjetosCanvasRelatorioTextoCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
			$scope.index = $routeParams.index;
		    var itensCanvasResource = $resource( $rootScope.urlItemCanvas + '/projeto-canvas/:id?email=:email' );
			var itensCanvas = itensCanvasResource.get( { id : $routeParams.index, email : $window.sessionStorage.email }, 
				function() {
					$scope.projeto = itensCanvas.projeto || [];
					$scope.projeto.itens = itensCanvas.itens || [];
				},
				function() {
				  	$location.path( '/' );
				});
		};

		$scope.carregarProjeto();
	}
]);