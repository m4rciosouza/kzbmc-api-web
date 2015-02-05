/**
 * Controller de edição de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('ProjetosCanvasEditarCtrl', [ '$scope', '$location', 
		'$routeParams', '$resource', '$rootScope', '$window', 'projetoCanvasService',
	function( $scope, $location, $routeParams, $resource, $rootScope, $window, projetoCanvasService ) {
	  
		/**
		 * Carrega um projeto canvas para edição.
		 * @method ProjetosCanvasEditarCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
		    projetoCanvasService.carregarProjeto( $routeParams.index,
		    	function( response ) {
			     	$scope.canvasEditar = response || [];
				},
				function() {
					$location.path( '/' );
				});
			};	 
		  
	    /**
		 * Atualiza os dados de um projeto canvas.
		 * @method ProjetosCanvasEditarCtrl::atualizar
		 * @param {object} canvas
		 */
	    $scope.atualizar = function( canvas ) {
	    	var projetoCanvasObj = { 
	    		nome : canvas.nome, 
	    		descricao : canvas.descricao, 
	    		email : $window.sessionStorage.email 
	    	};
	    	projetoCanvasService.atualizar( $routeParams.index, projetoCanvasObj,
	    		function() {
		     		$location.path( '/' );
			    },
			    function() {
			     	$location.path( '/' );
			    }
			);
		};
		  
		$scope.carregarProjeto();
  	}
]);