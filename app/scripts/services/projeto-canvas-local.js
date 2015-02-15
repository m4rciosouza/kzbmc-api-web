/**
 * Serviço de gerenciamento de um projeto canvas armazenado localmente no LocalStorage.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'projetoCanvasLocalService', [ '$window',
  function( $window ) {

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
      var projeto = this.carregarProjetoPorId( projetoId );
      if( projeto ) {
          sucesso( projeto );
          return;
      }
      erro();
    };

    /**
     * Carrega um projeto canvas por id.
     * @method projetoCanvasLocalService::carregarProjetoPorId
     * @param {integer} projetoId
     * @return {object} projeto
     */
    projetoCanvas.carregarProjetoPorId = function( projetoId ) {
      var projetos = this.obterProjetosJson();
      for( var i = 0; i < projetos.length; i ++ ) {
        if( projetos[ i ].id === projetoId ) {
          return projetos[ i ];
        }
      }
      return false;
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
     * @param {object} projetoCanvasObj { nome, descricao }
     * @param {function} sucesso
     */
    projetoCanvas.atualizar = function( projetoId, projetoCanvasObj, sucesso ) {
      var projetos = this.obterProjetosJson();
      for( var i = 0; i < projetos.length; i ++ ) {
        if( projetos[ i ].id === projetoId ) {
          projetos[ i ].nome = projetoCanvasObj.nome;
          projetos[ i ].descricao = projetoCanvasObj.descricao;
          break;
        }
      }
      $window.localStorage.projetos = angular.toJson( projetos );
      sucesso();
    };

    /**
     * Remove um projeto canvas.
     * @method projetoCanvasLocalService::remover
     * @param {integer} projetoId
     * @param {function} sucesso
     */
    projetoCanvas.remover = function( projetoId, sucesso ) {
      var projetos = this.obterProjetosJson();
      var projetosGravar = [];
      for( var i = 0; i < projetos.length; i ++ ) {
        if( projetos[ i ].id !== projetoId ) {
          projetosGravar.push( projetos[ i ] );
        }
      }
      $window.localStorage.projetos = angular.toJson( projetosGravar );
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

    projetoCanvas.guid = function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    return projetoCanvas;
}]);