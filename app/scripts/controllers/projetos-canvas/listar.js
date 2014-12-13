/**
 * Controller de listagem de projetos canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasListarCtrl', [ '$scope', '$resource', '$rootScope', '$location',
	function( $scope, $resource, $rootScope, $location ) {
	  
	  	/**
		 * Carrega uma lista de projetos canvas.
		 * @method ProjetosCanvasListarCtrl::carregarProjetos
		 */
	    $scope.carregarProjetos = function() {
	    	var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '?email=:email' );
		    var projetosCanvas = projetosCanvasResource.get( { email : 'marcio@kazale.com' }, function() { //TODO remover email
		     	$scope.projetos = projetosCanvas.items || [];
		     },
		     function( response ) {
		     	if( response.status === 401 ) {
		     		$location.path( '/login' );
		     	}
		     	$scope.erro = true;
		     });
	    };
		  
		$scope.carregarProjetos();
}]);