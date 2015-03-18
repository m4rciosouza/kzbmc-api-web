/**
 * Serviço de sincronização de projetos canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'sincronizacaoService', [ '$window', '$resource', 
    '$rootScope',
  function( $window, $resource, $rootScope ) {

    var sincronizar = {};

    /**
     * Cadastra um novo projeto canvas.
     * @method sincronizacaoService::cadastrar
     * @param {object} projetoCanvasObj { nome, descricao, email, itens }
     * @param {function} sucesso
     * @param {function} erro
     */
    sincronizar.cadastrar = function( projetoCanvasObj, sucesso, erro ) {
      var sincronizarServidorResource = $resource( $rootScope.sincronizarServidor );
      sincronizarServidorResource.save( {}, projetoCanvasObj, sucesso, erro );
    };

    return sincronizar;
}]);