/**
 * Serviço de gerenciamento de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'projetoCanvasService', [ '$window', '$resource', '$rootScope', '$location',
  function( $window, $resource, $rootScope, $location ) {

    var projetoCanvas = {};

    /**
     * Carrega uma listagem paginada de projetos canvas e 
     * popula o escopo.
     * @method projetoCanvasService::carregarProjetos
     * @param {object} scope
     * @param {integer} pagina
     */
    projetoCanvas.carregarProjetos = function( scope, pagina ) {
      var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '?email=:email&page=:pagina' );
      projetosCanvasResource.get( { email : $window.sessionStorage.email, page : pagina }, 
            function( response ) {
              scope.projetos = response.items || [];
              scope.totalCount = response._meta.totalCount;
              scope.pageCount = response._meta.pageCount;
              scope.currentPage = response._meta.currentPage + 1;
              scope.perPage = response._meta.perPage;
              scope.pages = [];
              for(var i = 1; i <= scope.pageCount; i ++ ) {
                scope.pages.push( i );
              }
            },
            function() {
              scope.erro = true;
            }
      );
    };

    /**
     * Carrega uma listagem paginada de projetos canvas  
     * compartilhados e popula o escopo.
     * @method projetoCanvasService::carregarProjetosCompartilhados
     * @param {object} scope
     * @param {integer} pagina
     */
    projetoCanvas.carregarProjetosCompartilhados = function( scope, pagina ) {
      var projetosCanvasCompResource = $resource( $rootScope.urlProjetoCanvasListarComp + '?email=:email&page=:pagina' );
      projetosCanvasCompResource.get( { email : $window.sessionStorage.email, page : pagina }, 
          function( response ) {
            scope.projetosComp = response.items || [];
            scope.totalCountComp = response._meta.totalCount;
            scope.pageCountComp = response._meta.pageCount;
            scope.currentPageComp = response._meta.currentPage + 1;
            scope.perPageComp = response._meta.perPage;
            scope.pagesComp = [];
            for(var i = 1; i <= scope.pageCountComp; i ++ ) {
              scope.pagesComp.push( i );
            }
          },
          function() {
            scope.erro = true;
          }
      );
    };

    /**
     * Cadastra um novo projetos canvas.
     * @method projetoCanvasService::cadastrar
     * @param {object} scope
     * @param {object} projetoCanvasObj { nome, descricao, email }
     */
    projetoCanvas.cadastrar = function( scope, projetoCanvasObj ) {
      var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas );
      projetosCanvasResource.save( {}, projetoCanvasObj, 
        function( response ) {
          if( scope.wizard ) {
            $location.path( '/wizard-canvas/' + response.id );
            return;
          }
          $location.path( '/' );
        },
        function() {
          scope.erro = true;
        }
      );
    };

    return projetoCanvas;
}]);