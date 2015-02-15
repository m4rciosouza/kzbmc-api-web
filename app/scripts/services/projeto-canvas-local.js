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
      var response = {};
      response._meta = {};
      response.items = this.obterProjetosJson();
      response._meta.totalCount = 1;
      response._meta.pageCount = 1;
      response._meta.currentPage = pagina - 1;
      response._meta.perPage = 20;
      sucesso( response );
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
          'id' : 'L' + projetos.length,
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
        return;
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

    return projetoCanvas;
}]);