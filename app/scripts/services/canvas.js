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
    var itensCanvasResource = $resource( $rootScope.urlItemCanvas + '/projeto-canvas/:id?email=:email' );
    itensCanvasResource.get( params, 
      function( response ) {
        sucesso( response );
      },
      function( response ) {
        erro( response );
      }
    );
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
    var itensCanvasResource = $resource( $rootScope.urlItemCanvas + '/:id?email=:email' );
    itensCanvasResource.get( params, 
      function( response ) {
        sucesso( response );
      },
      function( response ) {
        erro( response );
      }
    );
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
    var itemCanvasResource = $resource( $rootScope.urlItemCanvas );
    itemCanvasResource.save( {}, itemCanvasObj, 
      function( response ) {
        sucesso( response );
      },
      function( response ) {
        erro( response );
      }
    );
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
    var itemCanvasResource = $resource( $rootScope.urlItemCanvas + '/:id', null, 
          { 'update' : { method : 'PUT' } } );
    itemCanvasResource.update( { 'id' : itemId }, itemCanvasObj, 
      function( response ) {
        sucesso( response );
      },
      function( response ) {
        erro( response );
      }
    );
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
    var itemCanvasResource = $resource( $rootScope.urlItemCanvas + '/:id?email=:email' );
    itemCanvasResource.remove( params, 
      function( response ) {
        sucesso( response );
      },
      function( response ) {
        erro( response );
      }
    );
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
    return tipos[ tipo ];
  };

  return canvas;
}]);