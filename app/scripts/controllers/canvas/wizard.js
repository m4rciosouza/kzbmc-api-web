/**
 * Controller de assistente de criação de um canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('CanvasWizardCtrl', [ '$scope', '$location', '$routeParams', 
		'canvasService', '$window',
	function( $scope, $location, $routeParams, canvasService, $window ) {
	  
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
					'cor' : item.cor,
					'email' : $window.sessionStorage.email
				};
			    canvasService.cadastrar( $scope.projeto.id, itemCanvasObj, 
			    	function( response ) {
			    		item.titulo = '';
			    		item.descricao = '';
			    		item.cor = '';
			    		var newItem = { 
			    			'id' : response.id, 
			    			'titulo' : response.titulo, 
			    			'descricao' : response.descricao, 
			    			'cor' : response.cor 
			    		};
			    		$scope.projeto.itens[ $scope.tab ].push( newItem );
			    	},
			    	function() {
			     		$scope.erro = true;
			    	}
			    );
			}
		};

		/**
		 * Remove um item canvas.
		 * @method CanvasWizardCtrl::remover
		 * @param {integer} itemId
		 * @param {integer} index
		 */
	    $scope.remover = function( itemId, index ) {
			canvasService.remover( $scope.projeto.id, $scope.tab, itemId,
				function() {
			    	$scope.projeto.itens[ $scope.tab ].splice( index, 1 );
			    },
			    function() {
			    	$scope.erroRemover = true;
			    }
			);
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
			canvasService.carregarProjeto( $scope.index, 
				function( response ) {
					$scope.projeto = response.projeto || [];
					$scope.projeto.itens = response.itens || [];
					$scope.modoLeitura = response.modoLeitura;
					$scope.labelTipo = $scope.obterNomeItemPorTipo();
				},
				function() {
				  	$location.path( '/' );
				}
			);
		};

		/**
		  * Retorna o nome completo de um tipo de item canvas dado sua abreviação.
		  * @method CanvasWizardCtrl::obterNomeItemPorTipo
		  */
		$scope.obterNomeItemPorTipo = function() {
			return canvasService.obterNomeItemPorTipo( $scope.tab );
		};

		$scope.carregarProjeto();
	}
]);