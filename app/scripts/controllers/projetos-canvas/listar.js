/**
 * Controller de listagem de projetos canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasListarCtrl', [ '$scope', '$resource', 
		'$rootScope', '$location', '$window', 
	function( $scope, $resource, $rootScope, $location, $window ) {
	  
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
		    	var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '?email=:email&page=:pagina' );
			    var projetosCanvas = projetosCanvasResource.get( { email : $window.sessionStorage.email, page : pagina }, 
			    	function() {
				     	$scope.projetos = projetosCanvas.items || [];
				     	$scope.totalCount = projetosCanvas._meta.totalCount;
				     	$scope.pageCount = projetosCanvas._meta.pageCount;
				     	$scope.currentPage = projetosCanvas._meta.currentPage + 1;
				     	$scope.perPage = projetosCanvas._meta.perPage;
						$scope.pages = [];
						for(var i = 1; i <= $scope.pageCount; i ++ ) {
							$scope.pages.push( i );
						}
				     },
				     function() {
				     	$scope.erro = true;
				     });
			}
	    };

	    /**
		 * Carrega uma lista de projetos canvas.
		 * @method ProjetosCanvasListarCtrl::carregarProjetosCompartilhados
		 * @param {integer} pagina utilizada na paginação dos dados
		 */
	    $scope.carregarProjetosCompartilhados = function( pagina ) {
	    	if( $scope.mostrarCompartilhados ) {
		    	var projetosCanvasCompResource = $resource( $rootScope.urlProjetoCanvasListarComp + '?email=:email&page=:pagina' );
			    var projetosCanvasComp = projetosCanvasCompResource.get( { email : $window.sessionStorage.email, page : pagina }, 
			    	function() {
				     	$scope.projetosComp = projetosCanvasComp.items || [];
				     	$scope.totalCountComp = projetosCanvasComp._meta.totalCount;
				     	$scope.pageCountComp = projetosCanvasComp._meta.pageCount;
				     	$scope.currentPageComp = projetosCanvasComp._meta.currentPage + 1;
				     	$scope.perPageComp = projetosCanvasComp._meta.perPage;
						$scope.pagesComp = [];
						for(var i = 1; i <= $scope.pageCountComp; i ++ ) {
							$scope.pagesComp.push( i );
						}
				     },
				     function() {
				     	$scope.erro = true;
				     });
			}
	    };
		  
		$scope.carregarProjetos( 1 );
		$scope.carregarProjetosCompartilhados( 1 );
	}
]);