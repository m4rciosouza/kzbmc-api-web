/**
 * Controller de listagem de projetos canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'ProjetosCanvasListarCtrl', [ '$scope', '$resource', 
		'$rootScope', '$location', '$window', 'projetoCanvasService', 
		'sincronizacaoService', 'projetoCanvasLocalService', '_', 'canvasService',
	function( $scope, $resource, $rootScope, $location, $window, projetoCanvasService, 
		sincronizacaoService, projetoCanvasLocalService, _, canvasService ) {
	  
	  	$scope.lingua = $window.localStorage.lingua || 'en';
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
	    		$scope.ajustarProjetosLegados();
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
		 * Gera os ids para os projetos cadastrados na versão mobile legada 0.1.0.
		 * @method ProjetosCanvasListarCtrl::ajustarProjetosLegados
		 */
	    $scope.ajustarProjetosLegados = function() {
	    	if( $rootScope.bmc && $rootScope.local && !$window.localStorage.ajustado ) {
	    		var projetos = $window.localStorage.projetos || false;
	    		if( projetos ) {
	    			delete $window.localStorage.projetos;
	    			projetos = angular.fromJson( projetos );
	    			for( var i = 0; i < projetos.length; i ++ ) {
	    				$scope.cadastrarProjetosAjustados( projetos[ i ] );
	    			}
	    		}
	    	}
	    };

	    /**
		 * Persiste os projetos da versão mobile legada 0.1.0.
		 * @method ProjetosCanvasListarCtrl::cadastrarProjetosAjustados
		 * @param {object} projeto objeto a ser persistido
		 */
	    $scope.cadastrarProjetosAjustados = function( projeto ) {
	    	projeto = angular.fromJson( projeto );
	    	projeto.itens = $scope.cadastrarItensProjetosAjustados( projeto.itens );
			projetoCanvasService.cadastrar( projeto, 
				function( response ) {
					projetoCanvasService.atualizar( response.id, projeto, 
						function() {
							$window.localStorage.ajustado = true;
						}
					);
				}
			);
	    };

	    /**
		 * Define os ids dos itens de um projeto da versão mobile legada 0.1.0.
		 * @method ProjetosCanvasListarCtrl::cadastrarItensProjetosAjustados
		 * @param {object} objItens
		 * @return {object} objItens
		 */
	    $scope.cadastrarItensProjetosAjustados = function( objItens ) {
	    	var tipos = canvasService.obterTipos();
	    	for( var i = 0; i < tipos.length; i ++ ) {
	    		if( objItens[ tipos[ i ] ] ) {
	    			for( var j = 0; j < objItens[ tipos[ i ] ].length; j ++ ) {
	    				objItens[ tipos[ i ] ][ j ].id = projetoCanvasLocalService.guid();
	    			}
	    		}
	    	}
	    	return objItens;
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
	    				}, 
	    				function( response ) {
			    			if( response.status === 400 && response.data.code === 1001 ) {
								$scope.erroPlano = true;
							} else {
			    				$scope.erroUpload = true;
			    			}
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
				function( response ) {
					if( response.status === 400 && response.data.code === 1001 ) {
						$scope.erroPlano = true;
					} else {
						$scope.erroDownload = true;
					}
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
							projetoCanvasService.cadastrar( projeto, function() {
								projetoCanvasService.atualizar( projeto.id, projeto );
							});
			        	}
			      	);
			      	$window.localStorage.idsExcluir = '';
			      	$scope.carregarProjetos( 1 );
			      	$scope.sucessoSincronizar = true;
				},
				function( response ) {
					if( response.status === 400 && response.data.code === 1001 ) {
						$scope.erroPlano = true;
					} else {
						$scope.erroSincronizar = true;
					}
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
						projetoCanvasService.cadastrar( projeto, function() {
							projetoCanvasService.atualizar( projeto.id, projeto );
						});
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