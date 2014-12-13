/**
 * Controller de remoção de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('ProjetosCanvasRemoverCtrl', [ '$scope', '$location', '$routeParams', '$resource', '$rootScope', 
		function( $scope, $location, $routeParams, $resource, $rootScope ) {
	  
	/**
	 * Carrega um projeto canvas para remoção.
	 * @method ProjetosCanvasRemoverCtrl::carregarProjeto
	 */
	$scope.carregarProjeto = function() {
		var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id' );
	    var projetoCanvas = projetoCanvasResource.get( { id : $routeParams.index }, function() {
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
			var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id' );
		    projetosCanvasResource.remove( { id : $routeParams.index }, function() {
		    		$location.path( '/' );
		    	},
		    	function( response ) {
			     	if( response.status === 401 ) {
			     		$location.path( '/login' );
			     	}
		     		$scope.erro = true;
		    	});
    };
	  
	$scope.carregarProjeto();
}]);