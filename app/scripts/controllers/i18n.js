/**
 * Controller i18n para seleção da língua utilizada.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.2
 * @since 0.2.2
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).controller( 'I18nCtrl', [ '$scope', '$translate', '$window', 
	function( $scope, $translate, $window ) {

	/**
	 * Define a língua a ser utilizada na aplicação.
	 * @method I18nCtrl::selecionarLingua
	 * @param {string} lingua código da língua a ser definida ( pt, en ou es )
	 */
	$scope.selecionarLingua = function( lingua ) {
		$window.localStorage.lingua = lingua;
    	$translate.use( lingua );
  	};

  	/**
	 * Retorna se a língua utilizada é português.
	 * @method I18nCtrl::portugues
	 */
  	$scope.portugues = function() {
  		return $window.localStorage.lingua === 'pt';
  	};

  	/**
	 * Retorna se a língua utilizada é espanhol.
	 * @method I18nCtrl::espanhol
	 */
  	$scope.espanhol = function() {
  		return $window.localStorage.lingua === 'es';
  	};

  	/**
	 * Retorna se a língua utilizada é inglês.
	 * @method I18nCtrl::inglês
	 */
  	$scope.ingles = function() {
  		return $window.localStorage.lingua === 'en';
  	};

  	/**
	 * Retorna a língua selecionada.
	 * @method I18nCtrl::lingua
	 */
  	$scope.lingua = function() {
  		return $window.localStorage.lingua;
  	};
}]);