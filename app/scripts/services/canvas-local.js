/**
 * Serviço de gerenciamento de um canvas armazenado localmente no LocalStorage.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'canvasLocalService', [ '$window', 'projetoCanvasLocalService',
  	function( $window, projetoCanvasLocalService ) {

  	var canvas = {};

  	/**
 	 * Carrega um projeto canvas por id.
 	 * @method canvasLocalService::carregarProjeto
 	 * @param {integer} projetoId
 	 * @param {function} sucesso
     * @param {function} erro
 	 * @return {object} projeto
 	 */
	canvas.carregarProjeto = function( projetoId, sucesso, erro ) {
		var response = { modoLeitura : false };
	  	var projetos = projetoCanvasLocalService.obterProjetosJson();
	  	for( var i = 0; i < projetos.length; i ++ ) {
	    	if( projetos[ i ].id === projetoId ) {
	      		response.projeto = projetos[ i ];
	      		response.itens = projetos[ i ].itens;
	      		sucesso( response );
	      		return;
	    	}
	  	}
	  	erro( response );
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
    	var projeto = projetoCanvasLocalService.carregarProjetoPorId( projetoId );
    	if( projeto ) {
    		for( var i = 0; i < projeto.itens[ tipo ].length; i ++ ) {
    			if( projeto.itens[ tipo ][ i ].id === itemId ) {
    				response = projeto.itens[ tipo ][ i ];
		      		response.projetoCanvas = projeto;
		      		sucesso( response );
		      		return;
		      	}
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
		var projetos = projetoCanvasLocalService.obterProjetosJson();
		for( var i = 0; i < projetos.length; i ++ ) {
	    	if( projetos[ i ].id === projetoId ) {
	    		var item = {
	      			id : projetoCanvasLocalService.guid(),
	      			titulo : itemCanvasObj.titulo,
	      			descricao : itemCanvasObj.descricao,
	      			cor : itemCanvasObj.cor
	      		};
	      		projetos[ i ].itens[ itemCanvasObj.tipo ].push( item );
	      		$window.localStorage.projetos = angular.toJson( projetos );
        		sucesso( item );
        		return;
	    	}
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
  		var projetos = projetoCanvasLocalService.obterProjetosJson();
	    for( var i = 0; i < projetos.length; i ++ ) {
	        if( projetos[ i ].id === projetoId ) {
	        	for( var j = 0; j < projetos[ i ].itens[ tipo ].length; j ++ ) {
	        		var item = projetos[ i ].itens[ tipo ][ j ];
	        		if( item.id === itemId ) {
	        			item.titulo = itemCanvasObj.titulo;
	        			item.descricao = itemCanvasObj.descricao;
	        			item.cor = itemCanvasObj.cor;
	        			$window.localStorage.projetos = angular.toJson( projetos );
	    				sucesso();
	          			return;
	          		}
	          	}
	        }
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
  		var projetos = projetoCanvasLocalService.obterProjetosJson();
  		var itensGravar = [];
	    for( var i = 0; i < projetos.length; i ++ ) {
	        if( projetos[ i ].id === projetoId ) {
	        	for( var j = 0; j < projetos[ i ].itens[ tipo ].length; j ++ ) {
	        		var item = projetos[ i ].itens[ tipo ][ j ];
	        		if( item.id !== itemId ) {
	        			itensGravar.push( item );
	          		}
	          	}
	          	projetos[ i ].itens[ tipo ] = itensGravar;
	        }
	    }
	    $window.localStorage.projetos = angular.toJson( projetos );
	    sucesso();
    };

  	return canvas;
}]);