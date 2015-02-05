/**
 * Controller de cadastro de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasCadastrarCtrl', [ '$scope', '$location', 
		'$resource', '$rootScope', '$window', 'projetoCanvasService',
	function( $scope, $location, $resource, $rootScope, $window, projetoCanvasService ) {
	  
		$scope.liteVersion = $rootScope.liteVersion;
		$scope.qtdProjetos = 1; //TODO tornar dinamico

		/**
		 * Cadastra um novo projeto canvas.
		 * @method ProjetosCanvasCadastrarCtrl::cadastrar
		 * @param {object} projeto canvas
		 */
		$scope.cadastrar = function( canvas ) {
			if( $scope.form.$valid ) {
				var projetoCanvasObj = { 
					nome : canvas.nome, 
					descricao : canvas.descricao, 
					email : $window.sessionStorage.email 
				};
				projetoCanvasService.cadastrar( projetoCanvasObj, 
					function( response ) {
						if( $scope.wizard ) {
				            $location.path( '/wizard-canvas/' + response.id );
				            return;
				          }
				          $location.path( '/' );
					},
					function() {
						$scope.erro = true;
					}
				);
			}
		};
	}
]);