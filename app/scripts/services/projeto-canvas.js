/**
 * Serviço de gerenciamento de um projeto canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'projetoCanvasService', [ '$window', '$resource', 
    '$rootScope', 'projetoCanvasLocalService',
  function( $window, $resource, $rootScope, projetoCanvasLocalService ) {

    var projetoCanvas = {};

    /**
     * Carrega uma listagem paginada de projetos canvas e 
     * popula o escopo.
     * @method projetoCanvasService::carregarProjetos
     * @param {integer} pagina
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.carregarProjetos = function( pagina, sucesso, erro ) {
      if( $rootScope.local ) {
        projetoCanvasLocalService.carregarProjetos( pagina, sucesso );
        return;
      }
      var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '?email=:email&page=:pagina' );
      projetosCanvasResource.get( { email : $window.sessionStorage.email, page : pagina }, 
            function( response ) {
              sucesso( response );
            },
            function( response ) {
              erro( response );
            }
      );
    };

    /**
     * Carrega uma listagem paginada de projetos canvas  
     * compartilhados e popula o escopo.
     * @method projetoCanvasService::carregarProjetosCompartilhados
     * @param {integer} pagina
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.carregarProjetosCompartilhados = function( pagina, sucesso, erro ) {
      var projetosCanvasCompResource = $resource( $rootScope.urlProjetoCanvasListarComp + '?email=:email&page=:pagina' );
      projetosCanvasCompResource.get( { email : $window.sessionStorage.email, page : pagina }, 
          function( response ) {
            sucesso( response );
          },
          function( response ) {
            erro( response );
          }
      );
    };

    /**
     * Carrega um projeto canvas por id.
     * @method projetoCanvasService::carregarProjeto
     * @param {integer} projetoId
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.carregarProjeto = function( projetoId, sucesso, erro ) {
      if( $rootScope.local ) {
        projetoCanvasLocalService.carregarProjeto( projetoId, sucesso, erro );
        return;
      }
      var params = { 
        id : projetoId, 
        email : $window.sessionStorage.email 
      };
      var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id?email=:email' );
      projetoCanvasResource.get( params, 
        function( response ) {
          sucesso( response );
        },
        function( response ) {
          erro( response );
        }
      );
    };   

    /**
     * Cadastra um novo projeto canvas.
     * @method projetoCanvasService::cadastrar
     * @param {object} projetoCanvasObj { nome, descricao, email }
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.cadastrar = function( projetoCanvasObj, sucesso, erro ) {
      if( $rootScope.local ) {
        projetoCanvasLocalService.cadastrar( projetoCanvasObj, sucesso );
        return;
      }
      var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas );
      projetosCanvasResource.save( {}, projetoCanvasObj, 
        function( response ) {
          sucesso( response );
        },
        function( response ) {
          erro( response );
        }
      );
    };

    /**
     * Atualiza os dados de um projeto canvas.
     * @method projetoCanvasService::atualizar
     * @param {integer} projetoId
     * @param {object} projetoCanvasObj { nome, descricao, email }
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.atualizar = function( projetoId, projetoCanvasObj, sucesso, erro ) {
      if( $rootScope.local ) {
        projetoCanvasLocalService.atualizar( projetoId, projetoCanvasObj, sucesso );
        return;
      }
      var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id', null,
          { 'update' : { method : 'PUT' } });
      projetoCanvasResource.update( { id : projetoId }, projetoCanvasObj, 
        function( response ) {
          sucesso( response );
        },
        function( response ) {
          erro( response );
        }
      );
    };

    /**
     * Remove um projeto canvas.
     * @method projetoCanvasService::remover
     * @param {integer} projetoId
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.remover = function( projetoId, sucesso, erro ) {
      if( $rootScope.local ) {
        projetoCanvasLocalService.remover( projetoId, sucesso );
        return;
      }
      var params = { 
        id : projetoId, 
        email : $window.sessionStorage.email 
      };
      var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id?email=:email' );
      projetosCanvasResource.remove( params, 
        function( response ) {
          sucesso( response );
        },
        function( response ) {
          erro( response );
        }
      );
    };

    /**
     * Compartilha um projeto canvas com outro usuário.
     * @method projetoCanvasService::compartilhar
     * @param {object} projetoCanvasCompObj { idProjetoCanvas, emailCompartilhar, lingua, email }
     * @param {function} sucesso
     * @param {function} erro
     */
    projetoCanvas.compartilhar = function( projetoCanvasCompObj, sucesso, erro ) {
      var projetosCanvasCompResource = $resource( $rootScope.urlProjetoCanvasComp );
      projetosCanvasCompResource.save( {}, projetoCanvasCompObj, 
        function( response ) {
          sucesso( response );
        },
        function( response ) {
          erro( response );
        }
      );
    };

    /**
     * Retorna todos os projetos canvas cadastrados.
     * @method ProjetoCanvasService::obterProjetos
     * @return Array
     */
    projetoCanvas.obterProjetos = function() {
        var projetos = $window.localStorage.projetos;
        return projetos ? angular.fromJson( projetos ) : [];
    };

    /**
     * Retorna todos os projetos canvas cadastrados no formato json.
     * @method ProjetoCanvasService::obterProjetosJson
     * @return Array de objetos json
     */
    projetoCanvas.obterProjetosJson = function() {
      return angular.fromJson( this.obterProjetos() );
    };

    return projetoCanvas;
}]);