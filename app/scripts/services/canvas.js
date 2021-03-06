/**
 * Serviço de gerenciamento de um canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'canvasService', [ '$rootScope', '$window', 
    '$resource', 'canvasLocalService',
  function( $rootScope, $window, $resource, canvasLocalService ) {

  var canvas = {};

  /**
   * Carrega um projeto canvas por id.
   * @method canvasService::carregarProjeto
   * @param {integer} projetoId
   * @param {function} sucesso
   * @param {function} erro
   */
  canvas.carregarProjeto = function( projetoId, sucesso, erro ) {
    if( $rootScope.local ) {
      canvasLocalService.carregarProjeto( projetoId, sucesso, erro );
      return;
    }
    var params = { 
      id : projetoId, 
      email : $window.sessionStorage.email 
    };
    var itensCanvasResource = $resource( $rootScope.urlItemCanvas[ $rootScope.mode ] + '/projeto-canvas/:id?email=:email' );
    itensCanvasResource.get( params, sucesso, erro );
  };

  /**
   * Carrega um item canvas por id.
   * @method canvasService::carregarItem
   * @param {integer} projetoId
   * @param {string} tipo
   * @param {integer} itemId
   * @param {function} sucesso
   * @param {function} erro
   */
  canvas.carregarItem = function( projetoId, tipo, itemId, sucesso, erro ) {
    if( $rootScope.local ) {
      canvasLocalService.carregarItem( projetoId, tipo, itemId, sucesso, erro );
      return;
    }
    var params = { 
      id : itemId, 
      email : $window.sessionStorage.email 
    };
    var itensCanvasResource = $resource( $rootScope.urlItemCanvas[ $rootScope.mode ] + '/:id?email=:email' );
    itensCanvasResource.get( params, sucesso, erro );
  };

  /**
   * Cadastra um novo item canvas.
   * @method canvasService::cadastrar
   * @param {integer} projetoId
   * @param {object} itemCanvasObj { id_projeto_canvas, tipo, titulo, descricao, cor, email }
   * @param {function} sucesso
   * @param {function} erro
   */
  canvas.cadastrar = function( projetoId, itemCanvasObj, sucesso, erro ) {
    if( $rootScope.local ) {
      canvasLocalService.cadastrar( projetoId, itemCanvasObj, sucesso, erro );
      return;
    }
    var itemCanvasResource = $resource( $rootScope.urlItemCanvas[ $rootScope.mode ] );
    itemCanvasResource.save( {}, itemCanvasObj, sucesso, erro );
  };

  /**
   * Atualiza os dados de um item canvas.
   * @method canvasService::atualizar
   * @param {integer} projetoId
   * @param {integer} itemId
   * @param {object} itemCanvasObj { id_projeto_canvas, tipo, titulo, descricao, cor, email }
   * @param {function} sucesso
   * @param {function} erro
   */
  canvas.atualizar = function( projetoId, itemId, itemCanvasObj, sucesso, erro ) {
    if( $rootScope.local ) {
      canvasLocalService.atualizar( projetoId, itemId, itemCanvasObj, sucesso, erro );
      return;
    }
    var itemCanvasResource = $resource( $rootScope.urlItemCanvas[ $rootScope.mode ] + '/:id', null, 
          { 'update' : { method : 'PUT' } } );
    itemCanvasResource.update( { 'id' : itemId }, itemCanvasObj, sucesso, erro );
  };

  /**
   * Remove um item canvas.
   * @method canvasService::remover
   * @param {integer} projetoId
   * @param {string} tipo
   * @param {integer} itemId
   * @param {function} sucesso
   * @param {function} erro
   */
  canvas.remover = function( projetoId, tipo, itemId, sucesso, erro ) {
    if( $rootScope.local ) {
      canvasLocalService.remover( projetoId, tipo, itemId, sucesso );
      return;
    }
    var params = { 
      id : itemId, 
      email : $window.sessionStorage.email 
    };
    var itemCanvasResource = $resource( $rootScope.urlItemCanvas[ $rootScope.mode ] + '/:id?email=:email' );
    itemCanvasResource.remove( params, sucesso, erro );
  };

  /**
   * Retorna o nome completo de um tipo de item canvas dado sua abreviação.
   * @method CanvasService::obterNomeItemPorTipo
   * @param {string} tipo
   */
  canvas.obterNomeItemPorTipo = function( tipo ) {
    var tipos = { 
      'pc' : 'PARCEIROS_CHAVE', 
      'ac' : 'ATIVIDADES_CHAVE', 
      'rc' : 'RECURSOS_CHAVE', 
      'pv' : 'PROPOSTAS_VALOR', 
      'rcl' : 'RELACIONAMENTO_CLIENTES', 
      'ca' : 'CANAIS', 
      'sc' : 'SEGMENTOS_CLIENTES', 
      'ec' : 'ESTRUTURA_CUSTO', 
      'fr' : 'FLUXO_RECEITA' 
    };
    var tiposLean = { 
      'pc' : 'PROBLEMA', 
      'ac' : 'SOLUCAO', 
      'rc' : 'METRICAS_CHAVE', 
      'pv' : 'PROPOSTAS_VALOR_UNICAS', 
      'rcl' : 'VANTAGEM_INJUISTA', 
      'ca' : 'CANAIS', 
      'sc' : 'SEGMENTOS_CLIENTES', 
      'ec' : 'ESTRUTURA_CUSTO', 
      'fr' : 'FLUXO_RECEITA' 
    };
    return $rootScope.bmc ? tipos[ tipo ] : tiposLean[ tipo ];
  };

  /**
   * Retorna os tipos de itens canvas.
   * @method CanvasService::obterTipos
   * @return {array} tipos
   */
  canvas.obterTipos = function() {
    return [ 'pc', 'ac', 'rc', 'pv', 'rcl', 'ca', 'sc', 'ec', 'fr' ];
  };

  return canvas;
}]);