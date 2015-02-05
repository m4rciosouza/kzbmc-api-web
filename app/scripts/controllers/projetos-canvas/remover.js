/**
 * Controller de remoção de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('ProjetosCanvasRemoverCtrl', [ '$scope', '$location', '$routeParams', 
		'$resource', '$rootScope', '$window', 'projetoCanvasService',
	function( $scope, $location, $routeParams, $resource, $rootScope, $window, projetoCanvasService ) {
	  
		/**
		 * Carrega um projeto canvas para remoção.
		 * @method ProjetosCanvasRemoverCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
		    projetoCanvasService.carregarProjeto( $routeParams.index,
		    	function( response ) {
			     	$scope.canvasRemover = response || [];
				},
				function() {
					$location.path( '/' );
				});
			};
	      
	    /**
		 * Remove um projeto canvas.
		 * @method ProjetosCanvasRemoverCtrl::remover
		 */
	    $scope.remover = function() {
			projetoCanvasService.remover( $routeParams.index,
			   	function() {
			   		$location.path( '/' );
			   	},
			   	function() {
			   		$scope.erro = true;
			   	}
			);
	    };
		  
		$scope.carregarProjeto();
	}
]);