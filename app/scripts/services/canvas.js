/**
 * Serviço de gerenciamento de um canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'canvasService', function() {

  var canvas = {};

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
});