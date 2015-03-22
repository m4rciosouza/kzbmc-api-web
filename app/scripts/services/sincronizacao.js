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
      projetoCanvasObj.email = 'm4rcio.souza@gmail.com';
      projetoCanvasObj.senha = '123456';
      var sincronizarServidorResource = $resource( $rootScope.sincronizarServidor );
      sincronizarServidorResource.save( {}, projetoCanvasObj, sucesso, erro );
    };

    /**
     * Atualiza um projeto canvas com os dados do servidor remoto.
     * @method sincronizacaoService::atualizarDoServidorRemoto
     * @param {integer} projetoId
     * @param {function} sucesso
     * @param {function} erro
     */
    sincronizar.atualizarDoServidorRemoto = function( projetoId, sucesso, erro ) {
      var usuario = {};
      usuario.email = 'm4rcio.souza@gmail.com';
      usuario.senha = '123456';
      var sincronizarListarProjeto = $resource( $rootScope.sincronizarListarProjeto );
      sincronizarListarProjeto.save( { id : projetoId }, usuario, sucesso, erro );
    };

    /**
     * Baixa projetos remotos não cadastrados localmente. Remove projetos remotos
     * que foram excluídos localmente.
     * @method sincronizacaoService::baixarProjetosServidor
     * @param {string} idsExistentes ids separados por ','
     * @param {string} idsExcluir ids separados por ','
     * @param {function} sucesso
     * @param {function} erro
     */
    sincronizar.baixarProjetosServidor = function( idsExistentes, idsExcluir, sucesso, erro ) {
      var params = { 'idsExistentes' : idsExistentes, 'idsExcluir' : idsExcluir };
      params.email = 'm4rcio.souza@gmail.com';
      params.senha = '123456';
      var sincronizarCliente = $resource( $rootScope.sincronizarCliente );
      sincronizarCliente.query( params, sucesso, erro );
    };

    return sincronizar;
}]);