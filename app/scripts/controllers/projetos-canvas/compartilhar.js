/**
 * Controller de compartilhamento de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasCompartilharCtrl', [ '$scope', '$location', '$routeParams', 
		'$resource', '$rootScope', '$window', 
	function( $scope, $location, $routeParams, $resource, $rootScope, $window ) {

		/**
		 * Compartilha um projeto canvas.
		 * @method ProjetosCanvasCompartilharCtrl::compartilhar
		 * @param {object} data id do projeto e email para compartilhar com canvas
		 */
		$scope.compartilhar = function( data ) {
			if( $scope.form.$valid ) {
				if( data.email === $window.sessionStorage.email ) {
					data.email = '';
					$scope.erro = true;
					return;
				}
				var projetoCanvasCompObj = { 'idProjetoCanvas' : $scope.projetoCanvas.id, 'emailCompartilhar' : data.email, 
							'lingua' : $window.localStorage.lingua, 'email' : $window.sessionStorage.email };
				var projetosCanvasCompResource = $resource( $rootScope.urlProjetoCanvasComp );
			    projetosCanvasCompResource.save( {}, projetoCanvasCompObj, function() {
			    		$scope.erro = false;
			    		$scope.sucesso = true;
			    		data.email = '';
			    	},
			    	function() {
			     		$scope.erro = true;
			    	});
			}
		};

		/**
		 * Carrega um projeto canvas.
		 * @method ProjetosCanvasCompartilharCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
			var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id?email=:email' );
		    var projetoCanvas = projetoCanvasResource.get( { id : $routeParams.index, 'email' : $window.sessionStorage.email }, 
		    	function() {
		     		$scope.projetoCanvas = projetoCanvas || [];
			    },
			    function() {
			    	$location.path( '/' );
			    });
		};

		$scope.carregarProjeto();
	}
]);