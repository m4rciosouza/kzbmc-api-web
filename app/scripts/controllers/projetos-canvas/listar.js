/**
 * Controller de listagem de projetos canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasListarCtrl', [ '$scope', '$resource', 
		'$rootScope', '$location', '$window', 'projetoCanvasService',
	function( $scope, $resource, $rootScope, $location, $window, projetoCanvasService ) {
	  
		$scope.mostrarCompartilhados = false;

		/**
		 * Define qual listagem de modelos canvas deve ser exibida,
		 * entre as do usuário e as compartilhadas.
		 * @method ProjetosCanvasListarCtrl::alternarVisualizacao
		 * @param {boolean} compartilhado se deve exibir os compartilhados ou do usuário
		 */
		$scope.alternarVisualizacao = function( compartilhado ) {
			$scope.mostrarCompartilhados = compartilhado;
			if( compartilhado === true ) {
				$scope.carregarProjetosCompartilhados( 1 );
			} else {
				$scope.carregarProjetos( 1 );
			}
		};

	  	/**
		 * Carrega uma lista de projetos canvas.
		 * @method ProjetosCanvasListarCtrl::carregarProjetos
		 * @param {integer} pagina utilizada na paginação dos dados
		 */
	    $scope.carregarProjetos = function( pagina ) {
	    	if( ! $scope.mostrarCompartilhados ) {
	    		projetoCanvasService.carregarProjetos( $scope, pagina );
			}
	    };

	    /**
		 * Carrega uma lista de projetos canvas.
		 * @method ProjetosCanvasListarCtrl::carregarProjetosCompartilhados
		 * @param {integer} pagina utilizada na paginação dos dados
		 */
	    $scope.carregarProjetosCompartilhados = function( pagina ) {
	    	if( $scope.mostrarCompartilhados ) {
		    	projetoCanvasService.carregarProjetosCompartilhados( $scope, pagina );
			}
	    };
		  
		$scope.carregarProjetos( 1 );
		$scope.carregarProjetosCompartilhados( 1 );
	}
]);