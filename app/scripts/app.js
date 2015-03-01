'use strict';

var kzbmcMobileApp = angular.module('kzbmcMobileApp', [
      'ngRoute',
      //'ui.sortable',
      'pascalprecht.translate',
      'ngResource'
    ]);

kzbmcMobileApp.config( function( $routeProvider ) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/projetos-canvas/listar.html',
        controller: 'ProjetosCanvasListarCtrl'
      })
      .when('/cadastrar-canvas', {
        templateUrl: 'views/projetos-canvas/cadastrar.html',
        controller: 'ProjetosCanvasCadastrarCtrl'
      })
      .when('/editar-canvas/:index', {
        templateUrl: 'views/projetos-canvas/editar.html',
        controller: 'ProjetosCanvasEditarCtrl'
      })
      .when('/remover-canvas/:index', {
        templateUrl: 'views/projetos-canvas/remover.html',
        controller: 'ProjetosCanvasRemoverCtrl'
      })
      .when('/compartilhar/:index', {
        templateUrl: 'views/projetos-canvas/compartilhar.html',
        controller: 'ProjetosCanvasCompartilharCtrl'
      })
      .when('/relatorio-texto/:index', {
        templateUrl: 'views/projetos-canvas/relatorio-texto.html',
        controller: 'ProjetosCanvasRelatorioTextoCtrl'
      })
      .when('/canvas/:index', {
        templateUrl: 'views/canvas/visualizar.html',
        controller: 'CanvasVisualizarCtrl'
      })
      .when('/cadastrar-item-canvas/:projetoId/:tipo', {
        templateUrl: 'views/canvas/cadastrar.html',
        controller: 'CanvasCadastrarCtrl'
      })
      .when('/editar-remover-item-canvas/:projetoId/:tipo/:itemId', {
        templateUrl: 'views/canvas/editar-remover.html',
        controller: 'CanvasEditarRemoverCtrl'
      })
      .when('/wizard-canvas/:index', {
        templateUrl: 'views/canvas/wizard.html',
        controller: 'CanvasWizardCtrl'
      })
      .when('/ajuda', {
        templateUrl: 'views/ajuda/index.html'
      })
      .when('/ajuda/segmentos-clientes', {
        templateUrl: 'views/ajuda/segmentos-clientes.html'
      })
      .when('/ajuda/propostas-valor', {
        templateUrl: 'views/ajuda/propostas-valor.html'
      })
      .when('/ajuda/canais', {
        templateUrl: 'views/ajuda/canais.html'
      })
      .when('/ajuda/relacionamento-clientes', {
        templateUrl: 'views/ajuda/relacionamento-clientes.html'
      })
      .when('/ajuda/recursos-chave', {
        templateUrl: 'views/ajuda/recursos-chave.html'
      })
      .when('/ajuda/atividades-chave', {
        templateUrl: 'views/ajuda/atividades-chave.html'
      })
      .when('/ajuda/parceiros-chave', {
        templateUrl: 'views/ajuda/parceiros-chave.html'
      })
      .when('/ajuda/estrutura-custo', {
        templateUrl: 'views/ajuda/estrutura-custo.html'
      })
      .when('/ajuda/fluxo-receita', {
        templateUrl: 'views/ajuda/fluxo-receita.html'
      })
      .when('/enviar-por-email', {
        templateUrl: 'views/enviar-por-email.html',
        controller: 'EnviarPorEmailCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/login/login.html',
        controller: 'LogoutCtrl'
      })
      .when('/esqueci-senha', {
        templateUrl: 'views/login/esqueci-senha.html',
        controller: 'EsqueciSenhaCtrl'
      })
      .when('/nova-senha/usuario/:usuario/token/:token', {
        templateUrl: 'views/login/nova-senha.html',
        controller: 'NovaSenhaCtrl'
      })
      .when('/trocar-senha', {
        templateUrl: 'views/login/trocar-senha.html',
        controller: 'TrocarSenhaCtrl'
      })
      .when('/criar-usuario', {
        templateUrl: 'views/login/criar-usuario.html',
        controller: 'CriarUsuarioCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

kzbmcMobileApp.factory( 'authInterceptor', [ '$rootScope', '$q', '$window', '$location',
    function( $rootScope, $q, $window, $location ) {
      return {
        request : function( config ) {
          $rootScope.loading = true;
          config.headers = config.headers || {};
          if( $window.sessionStorage.token ) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }
          return config;
        },
        response: function( response ) {
            $rootScope.loading = false;
            if( response.headers( 'X-Token' ) ) {
                $window.sessionStorage.token = response.headers( 'X-Token' );
            }
            return response || $q.when( response );
        },
        responseError: function( rejection ) {
          $rootScope.loading = false;
          if( rejection.status === 401 ) {
            delete $window.sessionStorage.token;
            $rootScope.loggedIn = false;
            $location.path( '/login' );
          }
          return $q.reject( rejection );
        }
      };
    }]);

kzbmcMobileApp.config( function( $httpProvider ) {
  $httpProvider.interceptors.push( 'authInterceptor' );
});

kzbmcMobileApp.config( function( $translateProvider ) {
  $translateProvider.preferredLanguage( 'en' );
});

kzbmcMobileApp.constant( '_', window._ );

kzbmcMobileApp.run([ '$rootScope', '$window', '$translate', function( $rootScope, $window, $translate ) {
  $rootScope.liteVersion = false;
  $rootScope.baseUrl = 'http://localhost:8888/kzbmc-api/web/v1/';
  $rootScope.urlProjetoCanvas = {
    'projetos' : $rootScope.baseUrl + 'projeto-canvas',
    'projetosLean' : $rootScope.baseUrl + 'projeto-canvas-leans',
  };
  $rootScope.urlItemCanvas = {
    'projetos' : $rootScope.baseUrl + 'item-canvas',
    'projetosLean' : $rootScope.baseUrl + 'item-canvas-leans'
  };
  $rootScope.urlProjetoCanvasComp = {
    'projetos' : $rootScope.baseUrl + 'compartilhados/compartilhar',
    'projetosLean' : $rootScope.baseUrl + 'compartilhado-leans/compartilhar'
  };
  $rootScope.urlProjetoCanvasListarComp = {
    'projetos' : $rootScope.baseUrl + 'compartilhados',
    'projetosLean' : $rootScope.baseUrl + 'compartilhado-leans'
  };
  $rootScope.urlUsuario = $rootScope.baseUrl + 'usuarios/auth';
  $rootScope.urlEsqueciSenha = $rootScope.baseUrl + 'usuarios/esqueci-senha';
  $rootScope.urlNovaSenha = $rootScope.baseUrl + 'usuarios/nova-senha';
  $rootScope.urlTrocarSenha = $rootScope.baseUrl + 'usuarios/trocar-senha';
  $rootScope.urlUsuarios = $rootScope.baseUrl + 'usuarios';
  $rootScope.urlSlideshow = $rootScope.baseUrl + 'slideshow';
  $rootScope.urlAssinarPlano = 'http://kazcanvas.com';
  $rootScope.local = false;
  $rootScope.bmc = true;
  $rootScope.mode = 'projetos'; // projetos ou projetosLean
  $translate.use( $window.localStorage.lingua || 'en' );
  $rootScope._ = window._;
}]);