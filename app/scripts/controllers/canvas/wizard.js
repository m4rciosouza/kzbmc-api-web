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
	 * Cadastra um novo item no canvas.
	 * @method CanvasWizardCtrl::cadastrar
	 * @param {object} item
	 */
	$scope.cadastrar = function( item ) {
		if( $scope.form.$valid ) {
			var itemCanvasObj = { 
					'id_projeto_canvas' : $scope.projeto.id, 
					'tipo' : $scope.tab, 
					'titulo' : item.titulo,
					'descricao' : item.descricao, 
					'cor' : item.cor 
				};
			var itemCanvasResource = $resource( $rootScope.urlItemCanvas );
		    itemCanvasResource.save( {}, itemCanvasObj, function( response ) {
		    		item.titulo = '';
		    		item.descricao = '';
		    		item.cor = '';
		    		console.log( response );
		    		var newItem = { 'id' : response.id, 'titulo' : response.titulo, 
		    						'descricao' : response.descricao, 'cor' : response.cor };
		    		$scope.projeto.itens[$scope.tab].push( newItem );
		    	},
		    	function( response ) {
			     	if( response.status === 401 ) {
			     		$location.path( '/login' );
			     	}
		     		$scope.erro = true;
		    	});
		}
	};

	/**
	 * Remove um item canvas.
	 * @method CanvasWizardCtrl::remover
	 * @param {integer} itemId
	 * @param {integer} index
	 */
    $scope.remover = function( itemId, index ) {
    	console.log('itemId='+itemId);
    	console.log('index='+index);
    	
		var itemCanvasResource = $resource( $rootScope.urlItemCanvas + '/:id' );
		itemCanvasResource.remove( { 'id' : itemId }, function() {
		    		$scope.projeto.itens[$scope.tab].splice( index, 1 );
		    	},
		    	function( response ) {
			     	if( response.status === 401 ) {
			     		$location.path( '/login' );
			     	}
		     		$scope.erroRemover = true;
		    	});
	};

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