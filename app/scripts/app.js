'use strict';

//TODO remover angular.module( 'LocalStorageModule' ).value( 'prefix', 'kzbmc' );
var kzbmcMobileApp = angular.module('kzbmcMobileApp', [
      'ngRoute',
      //TODO remover 'LocalStorageModule',
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
          config.headers = config.headers || {};
          if( $window.sessionStorage.token ) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }
          return config;
        },
        response: function( response ) {
            if( response.headers( 'X-Token' ) ) {
                $window.sessionStorage.token = response.headers( 'X-Token' );
            }
            return response || $q.when( response );
        },
        responseError: function( rejection ) {
          if( rejection.status === 401 ) {
            delete $window.sessionStorage.token;
            $location.path( '/login' );
          }
          return $q.reject( rejection );
        }
      };
    }]);

kzbmcMobileApp.config( function( $httpProvider ) {
  $httpProvider.interceptors.push( 'authInterceptor' );
});

//Translation
kzbmcMobileApp.config( function( $translateProvider ) {
  $translateProvider.translations( 'pt', {
    // topicos da ajuda
    SEGMENTOS_CLIENTES : 'Segmentos de Clientes',
    PROPOSTAS_VALOR : 'Propostas de Valor',
    CANAIS : 'Canais',
    RELACIONAMENTO_CLIENTES : 'Relacionamento com os Clientes',
    RECURSOS_CHAVE : 'Recursos Chave',
    ATIVIDADES_CHAVE : 'Atividades Chave',
    PARCEIROS_CHAVE : 'Parceiros Chave',    
    ESTRUTURA_CUSTO : 'Estrutura de Custo',
    FLUXO_RECEITA : 'Fluxo de Receita',
    // index.html
    KZ_CANVAS : 'KZ-Canvas',
    INICIAL : 'Inicial',
    ENVIAR_POR_EMAIL : 'Enviar Por Email',
    AJUDA : 'Ajuda',
    PORTUGUES : 'Portugu\u00eas',
    ESPANHOL : 'Espanhol',
    INGLES : 'Ingl\u00eas',
    KAZALE : 'Kazale',
    KAZALE_COM : 'Kazale.com',
    COPYRIGHT : '2014. Todos os direitos reservados',
    // projeto-canvas/listar.html
    CANVAS_MODELO_NEGOCIOS : 'Canvas de Modelo de Neg\u00f3cios',
    CRIAR_NOVO_CANVAS : 'Criar Novo Canvas',
    MEUS_CANVAS : 'Meus Canvas de Modelo de Neg\u00f3cios',
    EDITAR_CANVAS : 'Editar Canvas',
    REMOVER_CANVAS : 'Remover Canvas',
    VISUALIZAR_CANVAS : 'Visualizar Canvas',
    NENHUM_CANVAS : 'Nenhum Canvas criado, clique no bot\u00e3o acima para criar um agora mesmo.',
    // projeto-canvas/cadastrar.html
    VERSAO_LITE_LIMITADA : 'Vers\u00e3o lite limitada a um projeto. Para criar projetos ilimitados atualize para a vers\u00e3o Enterprise.',
    ATUALIZAR_VERSAO : 'Atualizar vers\u00e3o',
    VOLTAR : 'Voltar',
    NOME_DO_PROJETO : 'Nome do Projeto',
    DIGITE_NOME_PROJETO : 'Digite o nome do projeto...',
    BREVE_DESCRICAO : 'Breve Descri\u00e7\u00e3o',
    DIGITE_BREVE_DESCRICAO_PROJETO : 'Digite uma breve descri\u00e7\u00e3o do projeto...',
    CRIAR : 'Criar',
    // projeto-canvas/editar.html
    ATUALIZAR : 'Atualizar',
    // projeto-canvas/remover.html
    REMOVER : 'Remover',
    // canvas/cadastrar.html
    ADICIONAR_EM : 'Adicionar em',
    TITULO : 'T\u00edtulo',
    DIGITE_TITULO_ITEM : 'Digite um t\u00edtulo para o item...',
    DESCRICAO : 'Descri\u00e7\u00e3o',
    DIGITE_DESCRICAO_ITEM : 'Digite uma descri\u00e7\u00e3o para o item...',
    COR : 'Cor',
    ADICIONAR : 'Adicionar',
    // canvas/editar-remover.html
    EDITAR_REMOVER_EM : 'Editar / Remover em',
    // canvas/visualizar.html
    ADICIONAR_ITEM : 'Adicionar Item',
    EDITAR_REMOVER_ITEM : 'Editar | Remover Item',
    REMOVER_ITEM : 'Remover Item',
    PARCEIROS : 'Parceiros',
    CHAVE_PARCEIROS : 'Chave',
    CHAVE_ATIVIDADES : 'Chave',
    CHAVE_RECURSOS : 'Chave',
    ATIVIDADES : 'Atividades',
    PROPOSTAS : 'Propostas',
    DE_VALOR : 'de Valor',
    RELACIONAMENTO : 'Relacionamento',
    COM_CLIENTES : 'com os Clientes',
    SEGMENTOS : 'Segmentos',
    DE_CLIENTES : 'de Clientes',
    RECURSOS : 'Recursos',
    EDITAR : 'Editar',
    // enviar-por-email.html
    ENVIAR_EMAIL_1 : 'Enviar Canvas por email',
    ENVIAR_EMAIL_2 : 'Preencha o campo email e clique no bot\u00e3o ao lado do modelo canvas para envi\u00e1-lo para o email indicado.',
    ENVIAR_EMAIL_3 : 'Vers\u00e3o lite n\u00e3o permite o envio de emails. Para enviar os projetos por email atualize para a vers\u00e3o Enterprise.',
    ENVIAR_EMAIL_4 : 'Atualizar vers\u00e3o',
    ENVIAR_EMAIL_5 : 'Email (separe por v\u00edrgula para mais de um remetente)',
    ENVIAR_EMAIL_6 : 'Digite o seu email...',
    ENVIAR_EMAIL_7 : 'Gravar',
    ENVIAR_EMAIL_8 : 'Email enviado com sucesso!',
    ENVIAR_EMAIL_9 : 'Erro enviando email. Verifique a conex\u00e3o com a Internet e tente novamente.',
    ENVIAR_EMAIL_10 : 'Enviando email',
    ENVIAR_EMAIL_11 : 'Aguarde o envio do email...',
    ENVIAR_EMAIL_12 : 'Canvas de Modelo de Neg\u00f3cios',
    // ajuda/index.html
    AJUDA_TOPICO_1 : 'Sugest\u00e3o de ordem do preenchimento do Canvas de Modelo de Neg\u00f3cios.',
    AJUDA_TOPICO_2 : 'Embora n\u00e3o exista uma ordem definida \u00e0 ser utilizada para o preenchimento de um Canvas de Modelo de Neg\u00f3cios, sugerimos a sequencia abaixo, que possui um fluxo intuitivo de racioc\u00ednio para o correto preenchimento do Canvas.',
    // ajuda/segmento-clientes.html
    SC_1 : 'Para quem estamos criando valor?',
    SC_2 : 'Quem s\u00e3o nossos clientes mais importantes?',
    SC_3 : 'Mercado de massa',
    SC_4 : 'Nicho de mercado',
    SC_5 : 'Segmentado',
    SC_6 : 'Diversificado',
    // ajuda/propostas-valor.html
    PV_1 : 'Que valores n\u00f3s entregamos ao cliente?',
    PV_2 : 'Quais problemas dos nossos clientes estamos ajudando a resolver?',
    PV_3 : 'Quais pacotes de produtos e servi\u00e7os oferecemos a cada Segmento de Cliente?',
    PV_4 : 'Quais necessidades dos clientes estamos satisfazendo?',
    PV_5 : 'CARACTER\u00cdSTICAS:',
    PV_6 : 'Novidade',
    PV_7 : 'Performance',
    PV_8 : 'Personaliza\u00e7\u00e3o',
    PV_9 : 'Realizando os Trabalhos',
    PV_10 : 'Projeto',
    PV_11 : 'Marca/Status',
    PV_12 : 'Pre\u00e7o',
    PV_13 : 'Redu\u00e7\u00e3o de Custo',
    PV_14 : 'Redu\u00e7\u00e3o de Risco',
    PV_15 : 'Acessibilidade',
    PV_16 : 'Conveni\u00eancia/Usabilidade',
    // ajuda/canais.html
    CA_1 : 'Atrav\u00e9s de quais canais de nossos Segmentos de Clientes gostar\u00edamos de atingir?',
    CA_2 : 'Como podemos alcan\u00e7\u00e1-los agora?',
    CA_3 : 'Como os nossos Canais est\u00e3o integrados?',
    CA_4 : 'Quais funcionam melhor?',
    CA_5 : 'Quais tem melhor custo-benef\u00edcio?',
    CA_6 : 'Como estamos integrando-os \u00e0s rotinas do cliente?',
    CA_7 : 'FASES DO CANAL:',
    CA_8 : '1 - Conscientiza\u00e7\u00e3o',
    CA_9 : 'Como podemos aumentar a conscientiza\u00e7\u00e3o sobre os nossos produtos e servi\u00e7os?',
    CA_10 : '2 - Avalia\u00e7\u00e3o',
    CA_11 : 'Como podemos ajudar os clientes a avaliar a Proposta de Valor da nossa organiza\u00e7\u00e3o?',
    CA_12 : '3 - Compra',
    CA_13 : 'Como podemos permitir que os clientes comprem produtos e servi\u00e7os espec\u00edficos?',
    CA_14 : '4 - Entrega',
    CA_15 : 'Como entregaremos uma Proposta de Valor para nossos clientes?',
    CA_16 : '5 - P\u00f3s-venda',
    CA_17 : 'Como podemos oferecer suporte p\u00f3s-venda aos nossos clientes?',
    // ajuda/relacionamento-clientes.html
    RCL_1 : 'Que tipo de relacionamento temos com cada um de nossos Clientes?',
    RCL_2 : 'O que os segmentos esperam que possamos estabelecer e manter com eles?',
    RCL_3 : 'Quais deles n\u00f3s temos estabelecidos?',
    RCL_4 : 'Como eles est\u00e3o integrados com o restante do nosso modelo de neg\u00f3cio?',
    RCL_5 : 'Quanto caros eles s\u00e3o?',
    RCL_6 : 'EXEMPLOS:',
    RCL_7 : 'Assist\u00eancia pessoal',
    RCL_8 : 'Assist\u00eancia Pessoal Dedicada',
    RCL_9 : 'Self-Service',
    RCL_10 : 'Servi\u00e7os Automatizados',
    RCL_11 : 'Comunidades',
    RCL_12 : 'Co-cria\u00e7\u00e3o',
    // ajuda/recursos-chave.html
    RC_1 : 'Quais Recursos Chave nossa Proposta de Valor requer?',
    RC_2 : 'Nossos canais de distribui\u00e7\u00e3o?',
    RC_3 : 'Relacionamento com os Clientes?',
    RC_4 : 'Fontes de receita?',
    RC_5 : 'TIPOS DE RECURSOS:',
    RC_6 : 'F\u00edsico',
    RC_7 : 'Intelectual (patentes de marcas, direitos autorais, dados)',
    RC_8 : 'Humano',
    RC_9 : 'Financeiro',
    // ajuda/atividades-chave.html
    AC_1 : 'Quais Atividades Chave nossa Proposta de Valor exige?',
    AC_2 : 'Nossos Canais de Distribui\u00e7\u00e3o?',
    AC_3 : 'Relacionamento com o Cliente?',
    AC_4 : 'Fontes de receita?',
    AC_5 : 'CATEGORIAS:',
    AC_6 : 'Produ\u00e7\u00e3o',
    AC_7 : 'Resolu\u00e7\u00e3o de Problemas',
    AC_8 : 'Plataforma / Rede',
    // ajuda/parceiros-chave.html
    PC_1 : 'Quem s\u00e3o os nossos Parceiros Chave?',
    PC_2 : 'Quem s\u00e3o os nossos Fornecedores Chave?',
    PC_3 : 'Quais Recursos Chave estamos adquirindo de parceiros?',
    PC_4 : 'Quais Atividades Chave os parceiros realizam?',
    PC_5 : 'MOTIVA\u00c7\u00d5ES PARA PARCERIAS:',
    PC_6 : 'Otimiza\u00e7\u00e3o e economia',
    PC_7 : 'Redu\u00e7\u00e3o de risco e incerteza',
    PC_8 : 'Aquisi\u00e7\u00e3o de recursos particulares e atividades',
    // ajuda/estrutura-custo.html
    EC_1 : 'Quais s\u00e3o os custos mais importantes inerentes ao nosso modelo de neg\u00f3cio?',
    EC_2 : 'Quais s\u00e3o os Recursos Chave mais caros?',
    EC_3 : 'Quais s\u00e3o as Atividades Chave mais caras?',
    EC_4 : 'SEU NEG\u00d3CIO \u00c9 MAIS:',
    EC_5 : 'Guiado por Custos (estrutura de custo mais enxuta, proposta de valor de baixo pre\u00e7o, m\u00e1xima automa\u00e7\u00e3o, terceiriza\u00e7\u00e3o extensiva)',
    EC_6 : 'Guiado por Valor (focada na cria\u00e7\u00e3o de valor, proposta de valor premium)',
    EC_7 : 'EXEMPLOS DE CARACTER\u00cdSTICAS:',
    EC_8 : 'Custos Fixos (sal\u00e1rios, alugu\u00e9is, servi\u00e7os p\u00fablicos)',
    EC_9 : 'Custos Vari\u00e1veis',
    EC_10 : 'Economias de escala',
    EC_11 : 'Economias de escopo',
    // ajuda/fluxo-receita.html
    FR_1 : 'Por quais valores nossos clientes est\u00e3o realmente interessados em pagar?',
    FR_2 : 'Por quais eles pagam atualmente?',
    FR_3 : 'Como eles est\u00e3o pagando atualmente?',
    FR_4 : 'Como eles gostariam de pagar?',
    FR_5 : 'Como cada fluxo de receita contribui para a receita global?',
    FR_6 : 'TIPOS:',
    FR_7 : 'Venda de ativos',
    FR_8 : 'Taxa de utiliza\u00e7\u00e3o',
    FR_9 : 'Taxas de inscri\u00e7\u00e3o',
    FR_10 : 'Empr\u00e9stimos / Aluguel / Arrendamento',
    FR_11 : 'Licenciamento',
    FR_12 : 'Taxas de corretagem',
    FR_13 : 'Publicidade',
    FR_14 : 'PRE\u00c7OS FIXOS:',
    FR_15 : 'Pre\u00e7o de tabela',
    FR_16 : 'Produtos dependentes',
    FR_17 : 'Segmentos de Clientes dependentes',
    FR_18 : 'Volumes dependentes',
    FR_19 : 'PRECIFICA\u00c7\u00c3O DIN\u00c2MICA:',
    FR_20 : 'Negocia\u00e7\u00e3o (barganha)',
    FR_21 : 'Gest\u00e3o de Rendimentos',
    FR_22 : 'Mercado em Tempo Real',
    ERRO_OBTENDO_DADOS : 'Erro obtendo dados. Tente novamente',
    ERRO_CADASTRANDO_CANVAS : 'Erro cadastrando Canvas. Tente novamente',
    ERRO_CADASTRANDO_ITEM_CANVAS : 'Erro cadastrando item. Tente novamente',
    LOGIN : 'Login',
    ERRO_AUTENTICANDO : 'Usuário/senha inválido(s)',
    EMAIL : 'Email',
    DIGITE_EMAIL : 'Digite o seu email...',
    SENHA : 'Senha',
    DIGITE_SENHA : 'Digite a sua senha...',
    LOGAR : 'Logar',
    SAIR : 'Sair',
    ESQUECEU_SENHA : 'Esqueceu a senha?',
    CRIAR_NOVO_USUARIO : 'Criar novo usuário',
    ERRO_RECUPERANDO_SENHA : 'Erro recuperando senha. Tente novamente.',
    SUCESSO_RECUPERANDO_SENHA : 'Um email contendo as instruções de recuperação da senha foi enviado ao email informado.',
    RECUPERAR_SENHA : 'Recuperar senha',
    INFO_RECUPERANDO_SENHA : 'Digite o seu email abaixo para receber um link contendo as instruções de como recuperar sua senha.',
    ERRO_CRIANDO_USUARIO : 'Erro criando usuário. Tente novamente.',
    USUARIO_CRIANDO_SUCESSO : 'Usuário cadastrado com sucesso! Acesse o link abaixo para entrar no sistema:',
    ENTRAR_NO_SISTEMA : 'Entrar no sistema',
    LINGUA : 'Língua',
    IMPRIMIR : 'Imprimir',
    COMPARTILHAR_AMIGO : 'Compartilhar com um amigo',
    ERRO_COMPARTILHANDO_CANVAS : 'Erro compartilhando projeto canvas. Tente novamente mais tarde.',
    SUCESSO_COMPARTILHANDO_CANVAS : 'Projeto canvas compartilhado com sucesso. Seu amigo receberá um email com as instruções de acesso ao modelo.',
    DIGITE_EMAIL_COMPARTILHAR : 'Digite o email a ser compartilhado o modelo...',
    COMPARTILHAR : 'Compartilhar',
    PROJETO : 'Projeto',
    MEUS_CANVAS_COMPARTILHADOS : 'Canvas de Modelo de Negócios compartilhados comigo',
    VER_CANVAS_COMPARTILHADOS : 'Ver Canvas Compartilhados',
    VER_MEUS_CANVAS : 'Ver Meus Canvas',
    NENHUM_CANVAS_COMPARTILHADO : 'Nenhum Canvas compartilhado',
    GERAR_RELATORIO : 'Exportar relatório',
    WHAT : 'O QUE',
    WHO : 'QUEM',
    HOW : 'COMO',
    HOW_MUCH : 'QUANTO',
    WIZARD : 'Assistente de criação de Canvas',
    ANTERIOR : 'Anterior',
    AVANCAR : 'Próximo',
    FINALIZAR : 'Finalizar',
    ERRO_REMOVENDO_ITEM_CANVAS : 'Erro removendo item. Tente novamente',
    EXECUTAR_WIZARD : 'Executar assistente de criação de Canvas'
  })
  .translations( 'en', {
    // topicos da ajuda
    SEGMENTOS_CLIENTES : 'Customer Segments',
    PROPOSTAS_VALOR : 'Value Proposition',
    CANAIS : 'Channels',
    RELACIONAMENTO_CLIENTES : 'Customer Relationships',
    RECURSOS_CHAVE : 'Key Resources',
    ATIVIDADES_CHAVE : 'Key Activities',
    PARCEIROS_CHAVE : 'Key Partners',    
    ESTRUTURA_CUSTO : 'Cost Structure',
    FLUXO_RECEITA : 'Revenue Streams',
    // index.html
    KZ_CANVAS : 'KZ-Canvas',
    INICIAL : 'Home',
    ENVIAR_POR_EMAIL : 'Send By Email',
    AJUDA : 'Help',
    PORTUGUES : 'Portuguese',
    ESPANHOL : 'Spanish',
    INGLES : 'English',
    KAZALE : 'Kazale',
    KAZALE_COM : 'Kazale.com',
    COPYRIGHT : '2014. All rights reserved',
    // projeto-canvas/listar.html
    CANVAS_MODELO_NEGOCIOS : 'Business Model Canvas',
    CRIAR_NOVO_CANVAS : 'Create New Canvas',
    MEUS_CANVAS : 'My Business Model Canvas',
    EDITAR_CANVAS : 'Edit Canvas',
    REMOVER_CANVAS : 'Remove Canvas',
    VISUALIZAR_CANVAS : 'View Canvas',
    NENHUM_CANVAS : 'No Canvas created, click the above button to create one.',
    // projeto-canvas/cadastrar.html
    VERSAO_LITE_LIMITADA : 'Lite version. To create unlimited Canvas upgrade to the Premium version.',
    ATUALIZAR_VERSAO : 'Upgrade to Premium',
    VOLTAR : 'Back',
    NOME_DO_PROJETO : 'Project name',
    DIGITE_NOME_PROJETO : 'Enter the project name...',
    BREVE_DESCRICAO : 'Short description',
    DIGITE_BREVE_DESCRICAO_PROJETO : 'Enter a short project description...',
    CRIAR : 'Create',
    // projeto-canvas/editar.html
    ATUALIZAR : 'Update',
    // projeto-canvas/remover.html
    REMOVER : 'Remove',
    // canvas/cadastrar.html
    ADICIONAR_EM : 'Add in',
    TITULO : 'Title',
    DIGITE_TITULO_ITEM : 'Enter the item title...',
    DESCRICAO : 'Description',
    DIGITE_DESCRICAO_ITEM : 'Enter the item description...',
    COR : 'Color',
    ADICIONAR : 'Add',
    // canvas/editar-remover.html
    EDITAR_REMOVER_EM : 'Edit / Remove in',
    // canvas/visualizar.html
    ADICIONAR_ITEM : 'Add Item',
    EDITAR_REMOVER_ITEM : 'Edit | Remove Item',
    REMOVER_ITEM : 'Remove Item',
    PARCEIROS : 'Key',
    CHAVE_PARCEIROS : 'Partners',
    CHAVE_ATIVIDADES : 'Activities',
    CHAVE_RECURSOS : 'Resources',
    ATIVIDADES : 'Key',
    PROPOSTAS : 'Value',
    DE_VALOR : 'Proposition',
    RELACIONAMENTO : 'Customer',
    COM_CLIENTES : 'Relationships',
    SEGMENTOS : 'Customer',
    DE_CLIENTES : 'Segments',
    RECURSOS : 'Key',
    EDITAR : 'Edit',
    // enviar-por-email.html
    ENVIAR_EMAIL_1 : 'Send Canvas by email',
    ENVIAR_EMAIL_2 : 'Fill the email field and click the button next to the model canvas to send it.',
    ENVIAR_EMAIL_3 : 'Lite version. Upgrade to the Premium version to send email.',
    ENVIAR_EMAIL_4 : 'Upgrade to Premium',
    ENVIAR_EMAIL_5 : 'Email (separate by comma to send to more than one email)',
    ENVIAR_EMAIL_6 : 'Enter the email...',
    ENVIAR_EMAIL_7 : 'Save',
    ENVIAR_EMAIL_8 : 'Email sent successfully!',
    ENVIAR_EMAIL_9 : 'Error sending email. Check your Internet connexion and try again.',
    ENVIAR_EMAIL_10 : 'Sending email',
    ENVIAR_EMAIL_11 : 'Wait while the email is being sent...',
    ENVIAR_EMAIL_12 : 'Business Model Canvas',
    // ajuda/index.html
    AJUDA_TOPICO_1 : 'Suggestion to fill the Business Model Canvas.',
    AJUDA_TOPICO_2 : 'Although does not have a correct order to fill the Business Model Canvas, we suggest the following order, that is very intuitive.',
    // ajuda/segmento-clientes.html
    SC_1 : 'For whom are we creating value?',
    SC_2 : 'Who are our most important customers?',
    SC_3 : 'Mass market',
    SC_4 : 'Niche market',
    SC_5 : 'Segmented',
    SC_6 : 'Diversified',
    // ajuda/propostas-valor.html
    PV_1 : 'Which values do we deliver to the customer?',
    PV_2 : 'What problems of our clients are we helping to solve?',
    PV_3 : 'What bundles of products and services do we offer to each Customer Segment?',
    PV_4 : 'Which customer needs are we satisfying?',
    PV_5 : 'FEATURES:',
    PV_6 : 'News',
    PV_7 : 'Performance',
    PV_8 : 'Customization',
    PV_9 : 'Performing the jobs',
    PV_10 : 'Project',
    PV_11 : 'Brand / Status',
    PV_12 : 'Price',
    PV_13 : 'Cost Reduction',
    PV_14 : 'Risk Reduction',
    PV_15 : 'Accessibility',
    PV_16 : 'Convenience / Usability',
    // ajuda/canais.html
    CA_1 : 'Through which channels our Customer Segments like to achieve?',
    CA_2 : 'How can we reach them now?',
    CA_3 : 'How are our Channels integrated?',
    CA_4 : 'Which ones work best?',
    CA_5 : 'Which is better value for money?',
    CA_6 : 'How are we integrating them with customer routines?',
    CA_7 : 'CHANNEL PHASES:',
    CA_8 : '1 - Awareness',
    CA_9 : 'How can we raise awareness of our products and services?',
    CA_10 : '2 - Evaluation',
    CA_11 : 'How can we help customers evaluate the value proposition of our organization?',
    CA_12 : '3 - Purchase',
    CA_13 : 'How can we allow customers to purchase specific products and services?',
    CA_14 : '4 - Delivery',
    CA_15 : 'How to deliver a Value Proposition for our customers?',
    CA_16 : '5 - After sales',
    CA_17 : 'How can we provide after sales support to our customers?',
    // ajuda/relacionamento-clientes.html
    RCL_1 : 'What kind of relationship do we have with each of our clients?',
    RCL_2 : 'What segments expecting that we can establish and maintain with them?',
    RCL_3 : 'Which ones have we established?',
    RCL_4 : 'How are they integrated with the rest of our business model?',
    RCL_5 : 'How expensive are they?',
    RCL_6 : 'EXAMPLES:',
    RCL_7 : 'Personal assistance',
    RCL_8 : 'Dedicated personal assistance',
    RCL_9 : 'Self-Service',
    RCL_10 : 'Automated services',
    RCL_11 : 'Comunities',
    RCL_12 : 'Co-criation',
    // ajuda/recursos-chave.html
    RC_1 : 'Which Key Resources requires our Value Proposition?',
    RC_2 : 'Our distribution channels?',
    RC_3 : 'Relationship with Customers?',
    RC_4 : 'Sources of revenue?',
    RC_5 : 'RESOURCES TYPES:',
    RC_6 : 'Physical',
    RC_7 : 'Intellectual (patents trademarks, copyright, database)',
    RC_8 : 'Human',
    RC_9 : 'Financial',
    // ajuda/atividades-chave.html
    AC_1 : 'Which Key Activities Our Value Proposition requires?',
    AC_2 : 'Our Distribution Channels?',
    AC_3 : 'Customer Relationship?',
    AC_4 : 'Sources of revenue?',
    AC_5 : 'CATEGORIES:',
    AC_6 : 'Production',
    AC_7 : 'Troubleshooting',
    AC_8 : 'Platform / Network',
    // ajuda/parceiros-chave.html
    PC_1 : 'Who are our Key Partners?',
    PC_2 : 'Who are our Key Suppliers?',
    PC_3 : 'Which Key Resources are we acquiring from partners?',
    PC_4 : 'Which Key Activities partners perform?',
    PC_5 : 'REASONS FOR PARTNERSHIPS:',
    PC_6 : 'Optimization and economy',
    PC_7 : 'Reduction of risk and uncertainty',
    PC_8 : 'Acquisition of particular resources and activities',
    // ajuda/estrutura-custo.html
    EC_1 : 'What are the most important inherent in our business model cost?',
    EC_2 : 'What are the most expensive Key Features?',
    EC_3 : 'What are the most expensive Key Activities?',
    EC_4 : 'YOUR BUSINESS IS MORE:',
    EC_5 : 'Guided by Cost (leaner cost structure, value proposition of low, maximum automation, extensive outsourcing)',
    EC_6 : 'Guided by Value (focused on value creation, premium value proposition)',
    EC_7 : 'FEATURES EXAMPLES:',
    EC_8 : 'Fixed costs (salaries, rent, utilities)',
    EC_9 : 'Variables costs',
    EC_10 : 'Scale economies',
    EC_11 : 'Scope economies',
    // ajuda/fluxo-receita.html
    FR_1 : 'For what values ​​our customers are really interested in paying?',
    FR_2 : 'For what they are paying?',
    FR_3 : 'How are they currently paying?',
    FR_4 : 'How would they pay?',
    FR_5 : 'How does each revenue stream contribute to the overall revenue?',
    FR_6 : 'TYPES:',
    FR_7 : 'Assets sales',
    FR_8 : 'Utilization taxes',
    FR_9 : 'Registration fees',
    FR_10 : 'Loans / Rent / Lease',
    FR_11 : 'Licensing',
    FR_12 : 'Brokerage fees',
    FR_13 : 'Advertising',
    FR_14 : 'FIXED PRICES:',
    FR_15 : 'List price',
    FR_16 : 'Dependent products',
    FR_17 : 'Dependent Customers Segments',
    FR_18 : 'Dependent volumes',
    FR_19 : 'DYNAMIC PRICING:',
    FR_20 : 'Negotiation (bargaining)',
    FR_21 : 'Revenue Management',
    FR_22 : 'Real time market',
    ERRO_OBTENDO_DADOS : 'Error getting data. Try again later',
    ERRO_CADASTRANDO_CANVAS : 'Error creating Canvas. Try again later',
    ERRO_CADASTRANDO_ITEM_CANVAS : 'Error creating item. Try again later',
    LOGIN : 'Login',
    ERRO_AUTENTICANDO : 'Invalid user/password',
    EMAIL : 'Email',
    DIGITE_EMAIL : 'Enter your email...',
    SENHA : 'Password',
    DIGITE_SENHA : 'Enter your password...',
    LOGAR : 'Login',
    SAIR : 'Exit',
    ESQUECEU_SENHA : 'Forgot your password?',
    CRIAR_NOVO_USUARIO : 'Create new user',
    ERRO_RECUPERANDO_SENHA : 'Error getting password. Try again later.',
    SUCESSO_RECUPERANDO_SENHA : 'An email has been sent with the password recovery instructions.',
    RECUPERAR_SENHA : 'Recover password',
    INFO_RECUPERANDO_SENHA : 'Enter your email to receive an email with the password recovery instructions.',
    ERRO_CRIANDO_USUARIO : 'Error creating user. Try again later.',
    USUARIO_CRIANDO_SUCESSO : 'User created successfully! Click the following link to login:',
    ENTRAR_NO_SISTEMA : 'Login',
    LINGUA : 'Language',
    IMPRIMIR : 'Print',
    COMPARTILHAR_AMIGO : 'Share with a friend',
    ERRO_COMPARTILHANDO_CANVAS : 'Error sharing Canvas. Try again later.',
    SUCESSO_COMPARTILHANDO_CANVAS : 'Canvas project shared successfully! An email has been sent to your friend with the instructions to view it.',
    DIGITE_EMAIL_COMPARTILHAR : 'Enter the email to be shared the canvas...',
    COMPARTILHAR : 'Share',
    PROJETO : 'Project',
    MEUS_CANVAS_COMPARTILHADOS : 'Business Model Canvas shared with me',
    VER_CANVAS_COMPARTILHADOS : 'View Shared Canvas',
    VER_MEUS_CANVAS : 'View My Canvas',
    NENHUM_CANVAS_COMPARTILHADO : 'No Canvas shared',
    GERAR_RELATORIO : 'Export report',
    WHAT : 'WHAT',
    WHO : 'WHO',
    HOW : 'HOW',
    HOW_MUCH : 'HOW MUCH',
    WIZARD : 'Canvas creation wizard',
    ANTERIOR : 'Previous',
    AVANCAR : 'Next',
    FINALIZAR : 'Finish',
    ERRO_REMOVENDO_ITEM_CANVAS : 'Error removing item. Try again later',
    EXECUTAR_WIZARD : 'Run Canvas creation wizard'
  })
  .translations( 'es', {
    // topicos da ajuda
    SEGMENTOS_CLIENTES : 'Segmentos de Clientes',
    PROPOSTAS_VALOR : 'Propuesta de Valor',
    CANAIS : 'Canales',
    RELACIONAMENTO_CLIENTES : 'Relaci\u00f3n con Clientes',
    RECURSOS_CHAVE : 'Recursos Clave',
    ATIVIDADES_CHAVE : 'Actividades Clave',
    PARCEIROS_CHAVE : 'Socios Clave',    
    ESTRUTURA_CUSTO : 'Estructura de Costos',
    FLUXO_RECEITA : 'Fuente de Ingresos',
    // index.html
    KZ_CANVAS : 'KZ-Canvas',
    INICIAL : 'Inicial',
    ENVIAR_POR_EMAIL : 'Enviar Por Email',
    AJUDA : 'Ayudar',
    PORTUGUES : 'Portugu\u00e9s',
    ESPANHOL : 'Espa\u00f1ol',
    INGLES : 'Ingl\u00e9s',
    KAZALE : 'Kazale',
    KAZALE_COM : 'Kazale.com',
    COPYRIGHT : '2014. Todos los derechos reservados',
    // projeto-canvas/listar.html
    CANVAS_MODELO_NEGOCIOS : 'Lienzo de Modelo de Negocios',
    CRIAR_NOVO_CANVAS : 'Crear Nuevo Modelo',
    MEUS_CANVAS : 'Mi Modelos de Negocios',
    EDITAR_CANVAS : 'Editar Modelo',
    REMOVER_CANVAS : 'Eliminar Modelo',
    VISUALIZAR_CANVAS : 'Visualizar Modelo',
    NENHUM_CANVAS : 'No hay un Modelo creado, haga clic en el bot\u00f3n de arriba para crear uno ahora mismo.',
    // projeto-canvas/cadastrar.html
    VERSAO_LITE_LIMITADA : 'Limitado a una versi\u00f3n lite. Para crear proyectos ilimitados actualizar a la versi\u00f3n Enterprise.',
    ATUALIZAR_VERSAO : 'Actualizar versi\u00f3n',
    VOLTAR : 'Volver',
    NOME_DO_PROJETO : 'Nombre del proyecto',
    DIGITE_NOME_PROJETO : 'Introduzca el nombre del proyecto...',
    BREVE_DESCRICAO : 'Breve Descripci\u00f3n',
    DIGITE_BREVE_DESCRICAO_PROJETO : 'Introduzca una breve descripci\u00f3n del proyecto...',
    CRIAR : 'Crear',
    // projeto-canvas/editar.html
    ATUALIZAR : 'Atualizar',
    // projeto-canvas/remover.html
    REMOVER : 'Eliminar',
    // canvas/cadastrar.html
    ADICIONAR_EM : 'A\u00f1adir en',
    TITULO : 'T\u00edtulo',
    DIGITE_TITULO_ITEM : 'Introduzca un t\u00edtulo para el elemento...',
    DESCRICAO : 'Descripci\u00f3n',
    DIGITE_DESCRICAO_ITEM : 'Escriba una descripci\u00f3n para el elemento...',
    COR : 'Color',
    ADICIONAR : 'A\u00f1adir',
    // canvas/editar-remover.html
    EDITAR_REMOVER_EM : 'Editar / Eliminar en',
    // canvas/visualizar.html
    ADICIONAR_ITEM : 'A\u00f1adir Elemento',
    EDITAR_REMOVER_ITEM : 'Editar | Eliminar Elemento',
    REMOVER_ITEM : 'Eliminar Elemento',
    PARCEIROS : 'Socios',
    CHAVE_PARCEIROS : 'Clave',
    CHAVE_ATIVIDADES : 'Clave',
    CHAVE_RECURSOS : 'Clave',
    ATIVIDADES : 'Actividades',
    PROPOSTAS : 'Propuesta',
    DE_VALOR : 'de Valor',
    RELACIONAMENTO : 'Relaci\u00f3n',
    COM_CLIENTES : 'con Clientes',
    SEGMENTOS : 'Segmentos',
    DE_CLIENTES : 'de Clientes',
    RECURSOS : 'Recursos',
    EDITAR : 'Editar',
    // enviar-por-email.html
    ENVIAR_EMAIL_1 : 'Enviar Modelo por email',
    ENVIAR_EMAIL_2 : 'Rellene el campo de email y haga clic en el bot\u00f3n para enviarlo a lo email indicado.',
    ENVIAR_EMAIL_3 : 'Versi\u00f3n Lite no permite el env\u00edo de email. Para enviar emails actualizar a la versi\u00f3n Enterprise.',
    ENVIAR_EMAIL_4 : 'Actualizar versi\u00f3n',
    ENVIAR_EMAIL_5 : 'Email (separar por comas de m\u00e1s de un remitente)',
    ENVIAR_EMAIL_6 : 'Ingrese su email...',
    ENVIAR_EMAIL_7 : 'Registro',
    ENVIAR_EMAIL_8 : 'Email enviado con \u00e9xito!',
    ENVIAR_EMAIL_9 : 'Error al enviar el email. Compruebe su conexi\u00f3n a Internet y vuelva a intentarlo.',
    ENVIAR_EMAIL_10 : 'Env\u00edo por email',
    ENVIAR_EMAIL_11 : 'Simplemente enviando un email...',
    ENVIAR_EMAIL_12 : 'Lienzo de Modelo de Negocios',
    // ajuda/index.html
    AJUDA_TOPICO_1 : 'Orden sugerido de relleno del Lienzo de Modelo de Negocios.',
    AJUDA_TOPICO_2 : 'Si bien no hay un orden definido para ser utilizado para la realizaci\u00f3n de un Lienzo de Modelo de Negocios, se sugiere la siguiente secuencia, que tiene un flujo intuitivo de razonamiento para la conclusi\u00f3n correcta del Modelo.',
    // ajuda/segmento-clientes.html
    SC_1 : 'Para qui\u00e9n estamos creando valor?',
    SC_2 : 'Qui\u00e9nes son nuestros clientes mas importantes?',
    SC_3 : 'Mercado de masas',
    SC_4 : 'Nicho de mercado',
    SC_5 : 'Segmentado',
    SC_6 : 'Diversificado',
    // ajuda/propostas-valor.html
    PV_1 : 'Que valor estamos entregando a los clientes?',
    PV_2 : 'Cual problema estamos ayudando a resolver?',
    PV_3 : 'Cual necesidad estamos satisfaciendo?',
    PV_4 : 'Que paquetes de productos o servicios estamos ofreciendo a cada segmento de clientes?',
    PV_5 : 'CARACTER:',
    PV_6 : 'Novedad',
    PV_7 : 'Desempeño',
    PV_8 : 'Personalizaci\u00f3n',
    PV_9 : '“Ayuda a hacer el trabajo”',
    PV_10 : 'Diseño',
    PV_11 : 'Marca / Status',
    PV_12 : 'Precio',
    PV_13 : 'Reduccion de Costos',
    PV_14 : 'Reduccion de Riesgos',
    PV_15 : 'Accesibilidad',
    PV_16 : 'Conveniencia / Usabilidad',
    // ajuda/canais.html
    CA_1 : 'A traves de que canales nuestros segmentos de clientes quieren ser alcanzados?',
    CA_2 : 'Como los estamos alcanzando ahora?',
    CA_3 : 'Como estan integrados nuestros canales?',
    CA_4 : 'Cuales Funcionan Mejor?',
    CA_5 : 'Cuales son los mas rentables?',
    CA_6 : 'Como podemos integrarlos a las rutinas de nuestros clientes?',
    CA_7 : 'FASES DEL CANAL:',
    CA_8 : '1 - Crear conciencia',
    CA_9 : 'Como creamos conciencia de los productos y servicios de nuestra compañia?',
    CA_10 : '2 - Evaluaci\u00f3n',
    CA_11 : 'Como ayudamos a que nuestros clientes evaluen nuestra propuesta de valor?',
    CA_12 : '3 - Compra',
    CA_13 : 'Como podemos permitir que nuestros clientes compresn productos o servicios específicos?',
    CA_14 : '4 - Entrega',
    CA_15 : 'Como proveemos servicio Post venta?',
    CA_16 : '5 - Post Venta',
    CA_17 : 'Como estamos entregando la propuesta de valor a los clientes?',
    // ajuda/relacionamento-clientes.html
    RCL_1 : 'Que tipo de relación espera que establescamos y mantengamos cada uno de nuestros segmentos de clientes?',
    RCL_2 : 'Que relaciones hemos establecido?',
    RCL_3 : 'Cuan hemos establecido?',
    RCL_4 : 'Como se integran con el resto de nuestro modelo de negocio?',
    RCL_5 : 'Cuan costosas son?',
    RCL_6 : 'EJEMPLOS:',
    RCL_7 : 'La asistencia personal',
    RCL_8 : 'Asistencia Personal',
    RCL_9 : 'Asistencia Personal Dedicada',
    RCL_10 : 'Auto Servicio',
    RCL_11 : 'Servicios Automatizados',
    RCL_12 : 'Comunidades',
    // ajuda/recursos-chave.html
    RC_1 : 'Que recursos clave requiere nuestra propuesta de valor?',
    RC_2 : 'nuestros caneles?',
    RC_3 : 'nuestras relaciones con los clientes?',
    RC_4 : 'nuestras fuentes de ingreso?',
    RC_5 : 'TIPOS DE RECURSOS:',
    RC_6 : 'Físicos',
    RC_7 : 'Intelectuales (Marcas, patentes, derechos de autor, datos)',
    RC_8 : 'Humanos',
    RC_9 : 'Financieros',
    // ajuda/atividades-chave.html
    AC_1 : 'Que actividades clave requiere nuestra propuesta de valor?',
    AC_2 : 'Nuestros caneles?',
    AC_3 : 'Nuestras relaciones con los clientes?',
    AC_4 : 'Nuestras fuentes de ingresos?',
    AC_5 : 'CATEGORÍAS:',
    AC_6 : 'Producci\u00f3n',
    AC_7 : 'Soluci\u00f3n de problemas',
    AC_8 : 'Plataforma / Red',
    // ajuda/parceiros-chave.html
    PC_1 : 'Quienes son nuestros socios clave?',
    PC_2 : 'Quienes son nuestros proveedores clave?',
    PC_3 : 'Que recursos clave estamos adquiriendo de nuestros socios clave?',
    PC_4 : 'Que actividades realizan nuestros socios clave?',
    PC_5 : 'MOTIVACIONES PARA REALIZAR ALIANZAS:',
    PC_6 : 'Optimizaci\u00f3n y economia',
    PC_7 : 'Reducir riesgos e incertidumbre',
    PC_8 : 'Adquisicion de recursos y actividades particulares',
    // ajuda/estrutura-custo.html
    EC_1 : 'Cuales son los costos mas importantes en nuestro modelo de negocio?',
    EC_2 : 'Cuales recursos clave son los mas costosos?',
    EC_3 : 'Cuales actividades clave son las mas costosas?',
    EC_4 : 'SU NEGOCIO ES MAS:',
    EC_5 : 'Enfocado al costo(estructura de costos conservadora, propuesta de valor de bajo costo, máxima automatización, mucho outsourcing)',
    EC_6 : 'Enfocado al valor(Enfocado a la creación de valor, Proposiciones de valor premium)',
    EC_7 : 'EJEMPLOS DE FUNCIONES:',
    EC_8 : 'Costos fijo (Salarios, rentas, Utilidades)',
    EC_9 : 'Costos Variables',
    EC_10 : 'Economías de escala',
    EC_11 : 'Economías de alcance',
    // ajuda/fluxo-receita.html
    FR_1 : 'Por cual valor nuestros clientes están dispuestos a pagar?',
    FR_2 : 'Actualmente por que se paga?',
    FR_3 : 'Como están pagando?',
    FR_4 : 'Como prefieren pagar?',
    FR_5 : 'Cuanto aporta cada fuente de ingresos a los ingresos generales?',
    FR_6 : 'TIPOS:',
    FR_7 : 'Venta de activos',
    FR_8 : 'Cargo por uso',
    FR_9 : 'Cargo por suscripción',
    FR_10 : 'Prestamo/Alquiler/Arrengamiento',
    FR_11 : 'Licensiamiento',
    FR_12 : 'Cargo de corretaje',
    FR_13 : 'Publicidad',
    FR_14 : 'PRECIOS FIJOS:',
    FR_15 : 'Lista de precios',
    FR_16 : 'Según caracteristicas',
    FR_17 : 'Dependiendo del segmento',
    FR_18 : 'Dependiendo del volumen',
    FR_19 : 'PRECIOS DINÁMICOS:',
    FR_20 : 'Negociación',
    FR_21 : 'Gestión del rendimiento',
    FR_22 : 'Mercado en tiempo real',
    ERRO_OBTENDO_DADOS : 'Error al obtener los datos. Inténtalo de nuevo',
    ERRO_CADASTRANDO_CANVAS : 'Error al registrar lo lienzo. Inténtalo de nuevo',
    ERRO_CADASTRANDO_ITEM_CANVAS : 'Error al registrar lo item. Inténtalo de nuevo',
    LOGIN : 'Iniciar sesión',
    ERRO_AUTENTICANDO : 'Usuario/contraseña no válida (s)',
    EMAIL : 'Email',
    DIGITE_EMAIL : 'Ingrese su email...',
    SENHA : 'Contraseña',
    DIGITE_SENHA : 'Ingrese su contraseña...',
    LOGAR : 'Autenticar',
    SAIR : 'Salir',
    ESQUECEU_SENHA : 'Olvidaste tu contraseña?',
    CRIAR_NOVO_USUARIO : 'Crear nuevo usuario',
    ERRO_RECUPERANDO_SENHA : 'Error al recuperar la contraseña. Inténtalo de nuevo.',
    SUCESSO_RECUPERANDO_SENHA : 'Un email que contiene las instrucciones de recuperación de contraseña se ha enviado a la dirección de email que ha introducido.',
    RECUPERAR_SENHA : 'Recuperar contraseña',
    INFO_RECUPERANDO_SENHA : 'Introduzca su email para recibir un vínculo con instrucciones sobre cómo restablecer su contraseña.',
    ERRO_CRIANDO_USUARIO : 'Error al crear el usuario. Inténtalo de nuevo.',
    USUARIO_CRIANDO_SUCESSO : 'Usuario registrado con éxito! Siga el enlace de abajo para iniciar sesión:',
    ENTRAR_NO_SISTEMA : 'Ingresar en el sistema',
    LINGUA : 'Idioma',
    IMPRIMIR : 'Imprimir',
    COMPARTILHAR_AMIGO : 'Comparte con un amigo',
    ERRO_COMPARTILHANDO_CANVAS : 'Error compartiendo lienzo. Inténtalo de nuevo más tarde.',
    SUCESSO_COMPARTILHANDO_CANVAS : 'Lienzo compartido correctamente. Tu amigo recibirá un email con instrucciones para acceder a la modelo.',
    DIGITE_EMAIL_COMPARTILHAR : 'Introduzca el email para compartilhadar el modelo...',
    COMPARTILHAR : 'Compartir',
    PROJETO : 'Proyecto',
    MEUS_CANVAS_COMPARTILHADOS : 'Lienzo de Modelo de Negocios compartió conmigo',
    VER_CANVAS_COMPARTILHADOS : 'Ver Lienzos Compartidos',
    VER_MEUS_CANVAS : 'Ver Mi Lienzos',
    NENHUM_CANVAS_COMPARTILHADO : 'No lienzo compartido',
    GERAR_RELATORIO : 'Exportar informe',
    WHAT : 'QUÉ',
    WHO : 'ACERCA',
    HOW : 'CÓMO',
    HOW_MUCH : 'CUÁNTO',
    WIZARD : 'Asistente de creación de Lienzo',
    ANTERIOR : 'Anterior',
    AVANCAR : 'Cerca',
    FINALIZAR : 'Fin',
    ERRO_REMOVENDO_ITEM_CANVAS : 'Error al eliminar lo item. Inténtalo de nuevo',
    EXECUTAR_WIZARD : 'Ejecutar asistente de creación de Lienzo'
  });
  $translateProvider.preferredLanguage( 'en' );
});

kzbmcMobileApp.run([ '$rootScope', '$window', '$translate', function( $rootScope, $window, $translate ) {
  $rootScope.liteVersion = false;
  $rootScope.urlProjetoCanvas = 'http://localhost:8888/kzbmc-api/web/index.php/v1/projeto-canvas';
  $rootScope.urlItemCanvas = 'http://localhost:8888/kzbmc-api/web/index.php/v1/item-canvas';
  $rootScope.urlUsuario = 'http://localhost:8888/kzbmc-api/web/index.php/v1/usuarios/auth';
  $rootScope.urlEsqueciSenha = 'http://localhost:8888/kzbmc-api/web/index.php/v1/usuarios/esqueci-senha';
  $rootScope.urlUsuarios = 'http://localhost:8888/kzbmc-api/web/index.php/v1/usuarios';
  $rootScope.urlProjetoCanvasComp = 'http://localhost:8888/kzbmc-api/web/index.php/v1/compartilhados/compartilhar';
  $rootScope.urlProjetoCanvasListarComp = 'http://localhost:8888/kzbmc-api/web/index.php/v1/compartilhados';
  $translate.use( $window.localStorage.lingua || 'en' );
}]);