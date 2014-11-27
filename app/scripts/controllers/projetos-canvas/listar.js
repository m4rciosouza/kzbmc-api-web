/**
 * Controller de listagem de projetos canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasListarCtrl', [ '$scope', '$resource', '$rootScope',
	function( $scope, $resource, $rootScope ) {
	  
	  	/**
		 * Carrega uma lista de projetos canvas.
		 * @method ProjetosCanvasListarCtrl::carregarProjetos
		 */
	    $scope.carregarProjetos = function() {
	    	var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '?email=:email' );
		    var projetosCanvas = projetosCanvasResource.get( { email : 'marcio@kazale.com' }, function() { //TODO remover email
		     	$scope.projetos = projetosCanvas.items || [];
		     },
		     function() {
		     	$scope.erro = true;
		     });
	    };
		  
		$scope.carregarProjetos();
}]);