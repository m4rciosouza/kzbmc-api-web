/**
 * Serviço de gerenciamento de um projeto canvas armazenado localmente no LocalStorage.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'projetoCanvasLocalService', [ '$window', '_', 
  function( $window, _ ) {

    var projetoCanvas = {};

    /**
     * Carrega uma listagem paginada de projetos canvas e 
     * popula o escopo.
     * @method projetoCanvasLocalService::carregarProjetos
     * @param {integer} pagina
     * @param {function} sucesso
     */
    projetoCanvas.carregarProjetos = function( pagina, sucesso ) {
      var projetos = this.obterProjetosJson();
      var response = {};
      var porPagina = 20;
      response._meta = {};
      response._meta.perPage = porPagina;
      response._meta.totalCount = projetos.length;
      response._meta.pageCount = Math.ceil( projetos.length / porPagina );
      response._meta.currentPage = pagina - 1;
      response.items = projetos.splice( ( porPagina * response._meta.currentPage ), porPagina );
      sucesso( response );
    };

    /**
     * Carrega um projeto canvas por id.
     * @method projetoCanvasLocalService::carregarProjeto
     * @param {integer} projetoId
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.carregarProjeto = function( projetoId, sucesso, erro ) {
      var projetos = this.carregarProjetoPorId( projetoId );
      if( projetos.length > 0 ) {
          sucesso( projetos[ 0 ] );
          return;
      }
      erro();
    };

    /**
     * Carrega um projeto canvas por id.
     * @method projetoCanvasLocalService::carregarProjetoPorId
     * @param {integer} projetoId
     * @return {array} projetos
     */
    projetoCanvas.carregarProjetoPorId = function( projetoId ) {
      var projetos = this.obterProjetosJson();
      return _.filter( projetos, function( projeto ) {
                  return projeto.id === projetoId;
              });
    };

    /**
     * Cadastra um novo projeto canvas.
     * @method projetoCanvasLocalService::cadastrar
     * @param {object} projetoCanvasObj { nome, descricao, email }
     * @param {function} sucesso
     */
    projetoCanvas.cadastrar = function( projetoCanvasObj, sucesso ) {
        var projetos = this.obterProjetos();
        var projetoCanvasLocal = { 
          'id' : this.guid(),
          'nome' : projetoCanvasObj.nome, 
          'descricao' : projetoCanvasObj.descricao, 
          'itens' : { 
            'pc' : [], 'ac' : [], 'rc' : [], 'pv' : [], 'rcl' : [], 
            'ca' : [], 'sc' : [], 'ec' : [], 'fr' : [] 
          }
        };
        projetos.push( projetoCanvasLocal );
        $window.localStorage.projetos = angular.toJson( projetos );
        sucesso();
    };

    /**
     * Atualiza os dados de um projeto canvas.
     * @method projetoCanvasLocalService::atualizar
     * @param {integer} projetoId
     * @param {object} projetoCanvasObj { nome, descricao, itens }
     * @param {function} sucesso
     */
    projetoCanvas.atualizar = function( projetoId, projetoCanvasObj, sucesso ) {
      var projetos = _.map( this.obterProjetosJson(), function( projeto ) {
            if( projeto.id === projetoId ) {
              projeto.nome = projetoCanvasObj.nome;
              projeto.descricao = projetoCanvasObj.descricao;
              if( projetoCanvasObj.itens ) {
                projeto.itens = projetoCanvasObj.itens;
              }
            }
            return projeto;
          });
      $window.localStorage.projetos = angular.toJson( projetos );
      if( typeof sucesso === 'function' ) {
        sucesso();
      }
    };

    /**
     * Remove um projeto canvas.
     * @method projetoCanvasLocalService::remover
     * @param {integer} projetoId
     * @param {function} sucesso
     */
    projetoCanvas.remover = function( projetoId, sucesso ) {
      var projetos = _.filter( this.obterProjetosJson(), function( projeto ) {
            return projeto.id !== projetoId;
          });
      $window.localStorage.projetos = angular.toJson( projetos );
      sucesso();
    };

    /**
     * Retorna todos os projetos canvas cadastrados.
     * @method projetoCanvasLocalService::obterProjetos
     * @return Array
     */
    projetoCanvas.obterProjetos = function() {
        var projetos = $window.localStorage.projetos;
        return projetos ? angular.fromJson( projetos ) : [];
    };

    /**
     * Retorna todos os projetos canvas cadastrados no formato json.
     * @method projetoCanvasLocalService::obterProjetosJson
     * @return Array de objetos json
     */
    projetoCanvas.obterProjetosJson = function() {
      return angular.fromJson( this.obterProjetos() );
    };

    /**
     * Gera um id único.
     * @method projetoCanvasLocalService::guid
     * @return {string} guid
     */
    projetoCanvas.guid = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    return projetoCanvas;
}]);