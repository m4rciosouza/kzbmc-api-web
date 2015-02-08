/**
 * Controller de edição e/ou remoção de um item do canvas.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller('CanvasEditarRemoverCtrl', [ '$scope', '$location', '$routeParams', 
		'canvasService', '$resource', '$rootScope', '$window',
	function( $scope, $location, $routeParams, canvasService, $resource, $rootScope, $window ) {
	   
	    /**
		 * Atualiza os dados de um item canvas.
		 * @method CanvasEditarRemoverCtrl::atualizar
		 * @param {object} item
		 */
	    $scope.atualizar = function( item ) {
			if( $scope.form.$valid ) {
				var itemCanvasObj = { 
					'id_projeto_canvas' : $scope.projetoId, 
					'tipo' : $scope.tipo, 
					'titulo' : item.titulo,
					'descricao' : item.descricao, 
					'cor' : item.cor,
					'email' : $window.sessionStorage.email
				};
			    canvasService.atualizar( $scope.itemId, itemCanvasObj, 
			    	function() {
			    		$location.path( '/canvas/' + $scope.projetoId );
			    	},
			    	function() {
			     		$scope.erro = true;
			    	}
			    );
			}
		};

		/**
		 * Remove um item canvas.
		 * @method CanvasEditarRemoverCtrl::remover
		 */
	    $scope.remover = function() {
			canvasService.remover( $scope.itemId,
				function() {
		    		$location.path( '/canvas/' + $scope.projetoId );
		    	},
		    	function() {
		     		$scope.erro = true;
		    	}
		    );
		};

		  /**
		 * Carrega um projeto canvas para cadastro de um novo item de canvas.
		 * @method CanvasEditarRemoverCtrl::carregarProjeto
		 */
		$scope.carregarProjeto = function() {
			$scope.projetoId = $routeParams.projetoId;
			$scope.itemId = $routeParams.itemId;
			$scope.tipo = $routeParams.tipo;
			canvasService.carregarItem( $scope.itemId, 
				function( response ) {
					$scope.item = response || [];
					$scope.projeto = response.projetoCanvas || [];
					$scope.validarParametros();
				},
				function() {
				  	$location.path( '/' );
				}
			);
		};

		/**
		 * Valida os parâmetros de entrada de uma requisição de edição/remoção de um item.
		 * @method CanvasEditarRemoverCtrl::validarParametros
		 */
		$scope.validarParametros = function() {
			var tipos = [ 'pc', 'ac', 'rc', 'pv', 'rcl', 'ca', 'sc', 'ec', 'fr' ];
			if( $scope.projeto === false || ! $scope.ehItemIdValido() || 
				tipos.indexOf( $scope.tipo ) === -1 ) {
				$location.path( '/' );
			}
		};

		/**
		 * Valida o valor do item de uma requisição de edição/remoção de um item.
		 * @method CanvasEditarRemoverCtrl::ehItemIdValido
		 * @return boolean
		 */
		$scope.ehItemIdValido = function() {
			if( isNaN( $scope.itemId ) || $scope.itemId < 0 ) {
				return false;
			}
			return true;
		};

		/**
		  * Retorna o nome completo de um tipo de item canvas dado sua abreviação.
		  * @method CanvasEditarRemoverCtrl::obterNomeItemPorTipo
		  */
		$scope.obterNomeItemPorTipo = function() {
			return canvasService.obterNomeItemPorTipo( $scope.tipo );
		};

		$scope.carregarProjeto();
  	}
]);