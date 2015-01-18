/**
 * Controller de assistente de criação de um canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('CanvasWizardCtrl', [ '$scope', '$location', '$routeParams', 'canvasService', 
		'$resource', '$rootScope', '$window',
		function( $scope, $location, $routeParams, canvasService, $resource, $rootScope, $window ) {
	  
	$scope.tipos = [ 'sc', 'pv', 'ca', 'rcl', 'rc', 'ac', 'pc', 'ec', 'fr' ];
	$scope.tab = $scope.tipos[ 0 ];
	$scope.labelTipo = '';
	$scope.selAtual = 0;
	$scope.porcentagem = 11;

	/**
	 * Avança uma aba.
	 * @method CanvasWizardCtrl::avancar
	 */
	$scope.avancar = function() {
		if( $scope.selAtual === 8 ) {
			return;
		}
		$scope.mudarAba( $scope.selAtual + 1 );
	};

	/**
	 * Volta uma aba.
	 * @method CanvasWizardCtrl::anterior
	 */
	$scope.anterior = function() {
		if( $scope.selAtual === 0 ) {
			return;
		}
		$scope.mudarAba( $scope.selAtual - 1 );
	};

	/**
	 * Retorna a porcentagem corrente.
	 * @method CanvasWizardCtrl::obterPorcentagem
	 */
	$scope.obterPorcentagem = function() {
		if( $scope.selAtual === 8 ) {
			$scope.porcentagem = 100;
			return;
		}
		$scope.porcentagem = ( $scope.selAtual + 1 ) * 11;
	};

	/**
	 * Carrega a aba dado um tipo.
	 * @method CanvasWizardCtrl::mudarAba
	 * @param {integer} index
	 */
	$scope.mudarAba = function( index ) {
		$scope.selAtual = index;
		$scope.tab = $scope.tipos[ index ];
		$scope.labelTipo = $scope.obterNomeItemPorTipo();
		$scope.obterPorcentagem();
	};

   	/**
	 * Carrega um projeto canvas.
	 * @method CanvasWizardCtrl::carregarProjeto
	 */
	$scope.carregarProjeto = function() {
		$scope.index = $routeParams.index;
	    var itensCanvasResource = $resource( $rootScope.urlItemCanvas + '/projeto-canvas/:id?email=:email' );
		var itensCanvas = itensCanvasResource.get( { id : $routeParams.index, email : $window.sessionStorage.email }, function() {
				$scope.projeto = itensCanvas.projeto || [];
				$scope.projeto.itens = itensCanvas.itens || [];
				$scope.modoLeitura = itensCanvas.modoLeitura;
				$scope.labelTipo = $scope.obterNomeItemPorTipo();
			},
			function() {
			  	$location.path( '/' );
			});
	};

	/**
	  * Retorna o nome completo de um tipo de item canvas dado sua abreviação.
	  * @method CanvasWizardCtrl::obterNomeItemPorTipo
	  */
	$scope.obterNomeItemPorTipo = function() {
		return canvasService.obterNomeItemPorTipo( $scope.tab );
	};

	$scope.carregarProjeto();
}]);