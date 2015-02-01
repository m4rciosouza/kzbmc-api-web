/**
 * Controller de edição de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('ProjetosCanvasEditarCtrl', [ '$scope', '$location', 
		'$routeParams', '$resource', '$rootScope', '$window', 
	function( $scope, $location, $routeParams, $resource, $rootScope, $window ) {
	  
		/**
		 * Carrega um projeto canvas para edição.
		 * @method ProjetosCanvasEditarCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
			var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id?email=:email' );
		    var projetoCanvas = projetoCanvasResource.get( { id : $routeParams.index, email : $window.sessionStorage.email }, 
		    	function() {
			     	$scope.canvasEditar = projetoCanvas || [];
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
	    	var canvasObj = { 'nome' : canvas.nome, 'descricao' : canvas.descricao, 'email' : $window.sessionStorage.email };
	    	var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id', null,
	    			{ 'update' : { method : 'PUT' } });
	    	projetoCanvasResource.update( { id : $routeParams.index }, canvasObj, function() {
		     		$location.path( '/' );
			     },
			     function() {
			     	$location.path( '/' );
			     });
		  };
		  
		  $scope.carregarProjeto();
  	}
]);