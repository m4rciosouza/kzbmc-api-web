/**
 * Controller de listagem de projetos canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasListarCtrl', [ '$scope', '$resource', 
		'$rootScope', '$location', '$window', 'projetoCanvasService', 
		'sincronizacaoService', 'projetoCanvasLocalService', '_',
	function( $scope, $resource, $rootScope, $location, $window, projetoCanvasService, 
		sincronizacaoService, projetoCanvasLocalService, _ ) {
	  
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
	    		projetoCanvasService.carregarProjetos( pagina, 
	    			function( response ) { 
	    				$scope.projetos = response.items || [];
			            $scope.totalCount = response._meta.totalCount;
			            $scope.pageCount = response._meta.pageCount;
			            $scope.currentPage = response._meta.currentPage + 1;
			            $scope.perPage = response._meta.perPage;
			            $scope.pages = [];
			            for(var i = 1; i <= $scope.pageCount; i ++ ) {
			            	$scope.pages.push( i );
			            }
	    			},
	    			function() {
	    				$scope.erro = true;
	    			}
	    		);
			}
	    };

	    /**
		 * Carrega uma lista de projetos canvas.
		 * @method ProjetosCanvasListarCtrl::carregarProjetosCompartilhados
		 * @param {integer} pagina utilizada na paginação dos dados
		 */
	    $scope.carregarProjetosCompartilhados = function( pagina ) {
	    	if( $scope.mostrarCompartilhados ) {
		    	projetoCanvasService.carregarProjetosCompartilhados( pagina,
		    		function( response ) {
		    			$scope.projetosComp = response.items || [];
			            $scope.totalCountComp = response._meta.totalCount;
			            $scope.pageCountComp = response._meta.pageCount;
			            $scope.currentPageComp = response._meta.currentPage + 1;
			            $scope.perPageComp = response._meta.perPage;
			            $scope.pagesComp = [];
			            for(var i = 1; i <= $scope.pageCountComp; i ++ ) {
			              $scope.pagesComp.push( i );
			            }
		    		},
		    		function() {
		    			$scope.erro = true;
		    		}
		    	);
			}
	    };

	    /**
		 * Verifica se o projeto foi criado localmente e deve
		 * ser enviado para o servidor remoto.
		 * @method ProjetosCanvasListarCtrl::projetoLocal
		 * @param {integer} projetoId
		 */
	    $scope.projetoLocal = function( projetoId ) {
	    	return isNaN( projetoId );
	    };

	    /**
		 * Cadastra/atualiza um projeto no servidor remoto.
		 * @method ProjetosCanvasListarCtrl::upload
		 * @param {integer} projetoId
		 */
	    $scope.upload = function( projetoId ) {
	    	$scope.resetMensagens();
	    	projetoCanvasService.carregarProjeto( projetoId, 
	    		function( response ) {
	    			var projeto = response || {};
	    			sincronizacaoService.cadastrar( projeto,  
	    				function( response ) {
	    					$scope.sincronizarLocal( projetoId, response );
	    					$scope.sucessoUpload = true;
	    				}
	    			);
	    		},
	    		function() {
	    			$scope.erroUpload = true;
	    		}
	    	);
	    };

	    /**
		 * Atualiza os dados de um projeto do servidor remoto, 
		 * sobrescrevendo os valores locais.
		 * @method ProjetosCanvasListarCtrl::download
		 * @param {integer} projetoId
		 */
	    $scope.download = function( projetoId ) {
	    	$scope.resetMensagens();
	    	sincronizacaoService.atualizarDoServidorRemoto( projetoId,  
				function( response ) {
					$scope.sincronizarLocal( projetoId, response );
					$scope.sucessoDownload = true;
				},
				function() {
					$scope.erroDownload = true;
	    		}
			);
	    };

	    /**
		 * Baixa projetos remotos não cadastrados localmente. Remove projetos remotos
     	 * que foram excluídos localmente.
		 * @method ProjetosCanvasListarCtrl::baixarProjetosServidor
		 */
	    $scope.baixarProjetosServidor = function() {
	    	$scope.resetMensagens();
	    	var idsExistentes = projetoCanvasLocalService.carregarIdsProjetos();
	    	var idsExcluir = $window.localStorage.idsExcluir || '';
	    	idsExcluir = idsExcluir.substr( 0, idsExcluir.length - 1 );
	    	sincronizacaoService.baixarProjetosServidor( idsExistentes.join(), idsExcluir,
				function( response ) {
					_.each( response, function( projeto ) {
							projeto.id = projeto.id.toString();
							console.log( projeto.id );
							projetoCanvasService.cadastrar( projeto, function() {
								projetoCanvasService.atualizar( projeto.id, projeto );
							});
			        	}
			      	);
			      	$window.localStorage.idsExcluir = '';
			      	$scope.carregarProjetos( 1 );
			      	$scope.sucessoSincronizar = true;
				},
				function() {
					$scope.erroSincronizar = true;
	    		}
			);
	    };
		  
		/**
		 * Atualiza localmente os dados do projeto sincronizado remotamente.
		 * @method ProjetosCanvasListarCtrl::sincronizarLocal
		 * @param {integer} projetoId
		 * @param {object} data {projeto, itens}
		 */
	    $scope.sincronizarLocal = function( projetoId, data ) {
	    	var projeto = data.projeto;
	    	projeto.id = projeto.id.toString();
	    	projeto.itens = data.itens;
			if( isNaN( projetoId ) ) {
				projetoCanvasService.remover( projetoId, function() {
						projetoCanvasService.cadastrar( projeto );
					} 
				);
			} else {
				projetoCanvasService.atualizar( projetoId, projeto );
			}
			$scope.carregarProjetos( 1 );
	    };

	    /**
		 * Reinicia o status de todas as mensagens de sucesso e 
		 * erros de sincronização com o servidor remoto.
		 * @method ProjetosCanvasListarCtrl::resetMensagens
		 */
	    $scope.resetMensagens = function() {
	    	$scope.sucessoUpload = false;
	    	$scope.erroUpload = false;
	    	$scope.sucessoDownload = false;
	    	$scope.erroDownload = false;
	    	$scope.sucessoSincronizar = false;
	    	$scope.erroSincronizar = false;
	    };

		$scope.carregarProjetos( 1 );
		$scope.carregarProjetosCompartilhados( 1 );
	}
]);