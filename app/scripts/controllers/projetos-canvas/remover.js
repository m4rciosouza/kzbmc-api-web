/**
 * Controller de remoção de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('ProjetosCanvasRemoverCtrl', [ '$scope', '$location', '$routeParams', 
		'$resource', '$rootScope', '$window', 
	function( $scope, $location, $routeParams, $resource, $rootScope, $window ) {
	  
		/**
		 * Carrega um projeto canvas para remoção.
		 * @method ProjetosCanvasRemoverCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
			var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id?email=:email' );
		    var projetoCanvas = projetoCanvasResource.get( { id : $routeParams.index, email : $window.sessionStorage.email }, 
		    	function() {
		     		$scope.canvasRemover = projetoCanvas || [];
			    },
			    function() {
			    	$location.path( '/' );
			    });
		};	
	      
	    /**
		 * Remove um projeto canvas.
		 * @method ProjetosCanvasRemoverCtrl::remover
		 * @param {object} canvas
		 */
	    $scope.remover = function() {
				var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id?email=:email' );
			    projetosCanvasResource.remove( { id : $routeParams.index, email : $window.sessionStorage.email }, 
			    	function() {
			    		$location.path( '/' );
			    	},
			    	function() {
			     		$scope.erro = true;
			    	});
	    };
		  
		$scope.carregarProjeto();
	}
]);