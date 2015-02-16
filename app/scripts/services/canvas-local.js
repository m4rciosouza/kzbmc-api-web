/**
 * Serviço de gerenciamento de um canvas armazenado localmente no LocalStorage.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'canvasLocalService', [ '$window', 'projetoCanvasLocalService', '_', 
  	function( $window, projetoCanvasLocalService, _ ) {

  	var canvas = {};

  	/**
 	 * Carrega um projeto canvas por id.
 	 * @method canvasLocalService::carregarProjeto
 	 * @param {integer} projetoId
 	 * @param {function} sucesso
     * @param {function} erro
 	 */
	canvas.carregarProjeto = function( projetoId, sucesso, erro ) {
		var response = { modoLeitura : false };
		var projetos = projetoCanvasLocalService.carregarProjetoPorId( projetoId );
		if( projetos.length > 0 ) {
	      	response.projeto = projetos[ 0 ];
	      	response.itens = projetos[ 0 ].itens;
	      	sucesso( response );
	      	return;
		}
		erro( response );
	};

	/**
     * Carrega um item canvas por id.
     * @method canvasLocalService::carregarItemPorId
     * @param {integer} itemId
     * @param {array} itens
     * @return {array} itens
     */
    canvas.carregarItemPorId = function( itemId, itens ) {
		return _.filter( itens, function( item ) {
				return item.id === itemId;
			});
    };

	/**
     * Carrega um item canvas por id.
     * @method canvasLocalService::carregarItem
     * @param {integer} projetoId
     * @param {string} tipo
     * @param {integer} itemId
     * @param {function} sucesso
     * @param {function} erro
     */
    canvas.carregarItem = function( projetoId, tipo, itemId, sucesso, erro ) {
		var response = {};
		var projetos = projetoCanvasLocalService.carregarProjetoPorId( projetoId );
		if( projetos.length > 0 ) {
			var itens = this.carregarItemPorId( itemId, projetos[ 0 ].itens[ tipo ] );
			if( itens.length > 0 ) {
				response = itens[ 0 ];
				response.projetoCanvas = projetos[ 0 ];
		    	sucesso( response );
		    	return;
			}
		}
	  	erro();
	};

	/**
	 * Cadastra um novo item canvas.
	 * @method canvasLocalService::cadastrar
	 * @param {integer} projetoId
	 * @param {object} itemCanvasObj { tipo, titulo, descricao, cor }
	 * @param {function} sucesso
	 * @param {function} erro
	 */
	canvas.cadastrar = function( projetoId, itemCanvasObj, sucesso, erro ) {
		var projetos = projetoCanvasLocalService.carregarProjetoPorId( projetoId );
		if( projetos.length > 0 ) {
			var item = {
	      		id : projetoCanvasLocalService.guid(),
	      		titulo : itemCanvasObj.titulo,
	      		descricao : itemCanvasObj.descricao,
	      		cor : itemCanvasObj.cor
	      	};
	      	projetos[ 0 ].itens[ itemCanvasObj.tipo ].push( item );
	      	projetoCanvasLocalService.atualizar( projetoId, projetos[ 0 ] );
        	sucesso( item );
        	return;
		}
		erro();
	};

	/**
     * Atualiza os dados de um item canvas.
     * @method canvasLocalService::atualizar
     * @param {integer} projetoId
     * @param {integer} itemId
     * @param {object} itemCanvasObj { tipo, titulo, descricao, cor }
     * @param {function} sucesso
     * @param {function} erro
     */
  	canvas.atualizar = function( projetoId, itemId, itemCanvasObj, sucesso, erro ) {
  		var tipo = itemCanvasObj.tipo;
  		var projetos = projetoCanvasLocalService.carregarProjetoPorId( projetoId );
		if( projetos.length > 0 ) {
			projetos[ 0 ].itens[ tipo ] = _.map( projetos[ 0 ].itens[ tipo ], function( item ) {
				if( item.id === itemId ) {
					item.titulo = itemCanvasObj.titulo;
        			item.descricao = itemCanvasObj.descricao;
        			item.cor = itemCanvasObj.cor;
				}
				return item;
			});
			projetoCanvasLocalService.atualizar( projetoId, projetos[ 0 ], sucesso );
			return;
		}
	  	erro();
  	};

  	/**
     * Remove um item canvas.
     * @method canvasLocalService::remover
     * @param {integer} projetoId
     * @param {string} tipo
     * @param {integer} itemId
     * @param {function} sucesso
     */
    canvas.remover = function( projetoId, tipo, itemId, sucesso ) {
  		var projetos = projetoCanvasLocalService.carregarProjetoPorId( projetoId );
		if( projetos.length > 0 ) {
			projetos[ 0 ].itens[ tipo ] = _.filter( projetos[ 0 ].itens[ tipo ], function( item ) {
				return item.id !== itemId;
			});
			projetoCanvasLocalService.atualizar( projetoId, projetos[ 0 ], sucesso );
		}
    };

  	return canvas;
}]);