/**
 * Controller de envio de um canvas por email.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'EnviarPorEmailCtrl', [ '$scope', '$http', '$rootScope', '$window', '$resource', '$location',
	function( $scope, $http, $rootScope, $window, $resource, $location ) {
	  
	/**
	 * Modifica o estado dos controles de mensagens e botões da tela.
	 * @method EnviarPorEmailCtrl::reset
	 * @param {boolean} sucesso flag de indicando se a msg de sucesso deve ser exibida
	 * @param {boolean} erro flag de indicando se a msg de erro deve ser exibida
	 */
	$scope.reset = function( sucesso, erro ) {
		$scope.processando = false;
		$scope.btnDesabilitado = false;
		$scope.exibirMsgOk = sucesso;
		$scope.exibirMsgErro = erro;
	};

	/**
	 * Grava o email que será utilizado para o envio de um modelo canvas.
	 * @method EnviarPorEmailCtrl::gravarEmail
	 */
	$scope.gravarEmail = function() {
		//localStorageService.add( 'email', $scope.email );
	};

	/**
	 * Retorna o email que será utilizado para o envio de um modelo canvas.
	 * @method EnviarPorEmailCtrl::carregarEmail
	 */
	$scope.carregarEmail = function() {
		return $window.sessionStorage.email || '';
	};

	/**
	 * Envia o email do modelo canvas selecionado para o email indicado.
	 * @method EnviarPorEmailCtrl::gravarEmail
	 */
	$scope.enviarEmail = function( $canvasId ) {
		$scope.reset( false, false );
		$canvasId = parseInt( $canvasId, 10 );

		var projeto = false;
		var projetoCanvasResource = $resource( $rootScope.urlProjetoCanvas + '/:id' );
	    var projetoCanvas = projetoCanvasResource.get( { id : $canvasId }, 
	    	function() {
	     		projeto = projetoCanvas || [];
	     		if( projeto !== false && $scope.email !== '' ) {
					$scope.btnHabilitado = false;
					$scope.processando = true;
					$http.post( 'http://kazale.com/kzbmcmail/email.php', 
						{ 'projeto' : projeto, 'id' : $canvasId, 'lingua' : $window.localStorage.lingua, 'email' : $scope.email  } ).
						success( function( data ) {
					    	var sucesso = ( data === 'OK' );
					    	$scope.reset( sucesso, ! sucesso );
					    }).
					    error( function() {
					    	$scope.reset( false, true );
					    });

				} else {
					$scope.reset( false, true );
				}
		    });

		
	};

	/**
	 * Carrega uma lista de projetos canvas.
	 * @method ProjetosCanvasListarCtrl::carregarProjetos
	 */
    $scope.carregarProjetos = function() {
    	var projetosCanvasResource = $resource( $rootScope.urlProjetoCanvas + '?email=:email' );
	    var projetosCanvas = projetosCanvasResource.get( { email : $window.sessionStorage.email }, 
	    	function() {
		     	$scope.projetos = projetosCanvas.items || [];
		     },
		     function( response ) {
		     	if( response.status === 401 ) {
		     		$location.path( '/login' );
		     	}
		     	$scope.erro = true;
		     });
    };

	$scope.reset( false, false );

	$scope.email = $scope.carregarEmail();
	$scope.projetos = $scope.carregarProjetos();
}]);