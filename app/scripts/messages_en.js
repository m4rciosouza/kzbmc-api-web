/**
 * Arquivo de tradução de mensagens.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.2
 * @since 0.2.2
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).config( function( $translateProvider ) {
  $translateProvider.translations( 'en', {
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
    //lean 
    PROBLEMA : 'Problem', // key partners
    SOLUCAO : 'Solution', // key activities
    METRICAS_CHAVE: 'Key Metrics', //  key resouces
    PROPOSTAS_VALOR_UNICAS: 'Unique Value Proposition', // Value Proposition
    VANTAGEM_INJUISTA: 'Unfair Advantage', // Customer Relationships
    MC_METRICAS: 'Key',
    MC_CHAVE: 'Metrics',
    PVU_PROPOSTAS: 'Unique',
    PVU_VALOR: 'Value',
    PVU_UNICAS: 'Proposition',
    VI_VANTAGEM: 'Unfair',
    VI_INJUSTA: 'Advantage',
    // index.html
    KZ_CANVAS : 'KAZ-Canvas',
    INICIAL : 'Home',
    ENVIAR_POR_EMAIL : 'Send By Email',
    AJUDA : 'Help',
    PORTUGUES : 'Portuguese',
    ESPANHOL : 'Spanish',
    INGLES : 'English',
    KAZALE : 'Kazale',
    KAZALE_COM : 'Kazale.com',
    COPYRIGHT : '2015. All rights reserved',
    // projeto-canvas/listar.html
    CANVAS_MODELO_NEGOCIOS : 'Business Model Canvas',
    CRIAR_NOVO_CANVAS : 'Create New Canvas',
    MEUS_CANVAS : 'My Canvas',
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
    ERRO_ATUALIZANDO_ITEM_CANVAS : 'Error updating item. Try again later',
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
    MEUS_CANVAS_COMPARTILHADOS : 'Canvas shared with me',
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
    EXECUTAR_WIZARD : 'Run Canvas creation wizard',
    SLIDESHOW : 'Slideshow',
    DEFINIR_NOVA_SENHA : 'Define a new password',
    DIGITE_NOVA_SENHA : 'Enter your new password...',
    SUCESSO_DEFININDO_SENHA : 'Password changed successfully!',
    ERRO_DEFININDO_SENHA : 'Error changing password. Try again later.',
    TROCAR_SENHA : 'Change password',
    ERRO_TROCANDO_SENHA : 'Error changing password. Check if you entered the passwords correctly and try again.',
    SUCESSO_TROCANDO_SENHA : 'Password changed successfully!',
    SENHA_ATUAL : 'Current password',
    DIGITE_SENHA_ATUAL : 'Enter your current password...',
    NOVA_SENHA : 'New password',
    ERRO_LIMITACAO_PLANO : 'To create more than one Canvas you need to be a Premium user.',
    ASSINAR_PLANO : 'Subscribe now',
    NENHUM_MODELO_CADASTRADO : 'No model found.',
    LEAN_MODEL_CANVAS : 'Lean Model Canvas',
    ACOES : 'Actions',
    META_DESCRIPTION : 'Build your Business Model Canvas from your computer or mobile, share with friends and much more...',
    UPLOAD_CANVAS : 'Upload Canvas',
    UPLOAD_CANVAS_SOBRESCREVER : 'Upload Canvas (Overwrite)',
    SINCRONIZAR_SERVIDOR_REMOTO : 'Synchronize with the server',
    ENVIAR_SERVIDOR_REMOTO : 'Upload to the server',
    ENVIAR_SERVIDOR_REMOTO_SOBRESCREVER : 'Upload to the server (overwrite)',
    BAIXAR_SERVIDOR_REMOTO_SOBRESCREVER : 'Download from server (overwrite)',
    SUCESSO_UPLOAD : 'The project canvas has been uploaded successfully to the remote server! Now it can be synchronized from another device.',
    ERRO_UPLOAD : 'Error uploading the project canvas to the remote server. Make sure you have Internet connection and try again.',
    SUCESSO_DOWNLOAD : 'The project canvas has been updated successfully to the remote server!',
    ERRO_DOWNLOAD : 'Error updating the project canvas to the remote server. Make sure you have Internet connection and try again.',
    SUCESSO_SINCRONIZAR : 'The new/removed projects data have been synchronized successfully with the remote server!',
    ERRO_SINCRONIZAR : 'Error synchronizing the projects canvas data with the remote server data. Make sure you have Internet connection and try again.',
    DADOS_SINCRONIZAR : 'Data Sync',
    DADOS_SINCRONIZAR_SERVIDOR_REMOTO : 'Access data to sync with the remote server',
    INSTRUCOES_DADOS_SINCRONIZACAO : 'Enter your registered http://kazcanvas.com email and password to synchronize your projects with the remote server.',
    DADOS_GRAVADOS_SUCESSO : 'Data saved successfully! Click in "HOME" at the main menu to synchronize your canvas models.',
    GRAVAR : 'Save',
    CADASTRAR : 'Sign Up'
  });
});