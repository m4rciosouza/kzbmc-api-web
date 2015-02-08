/**
 * Serviço de gerenciamento de usuário e autenticação.
 * @author Marcio C. de Souza <marcio@kazale.com>
 * @version 0.2.0
 * @since 0.2.0
 */
'use strict';

angular.module( 'kzbmcMobileApp' ).factory( 'loginService', [ '$rootScope', '$window', '$resource',
  function( $rootScope, $window, $resource ) {

	  var login = {};

	  /**
	   * Efetua o login.
	   * @method loginService::login
	   * @param {object} usuario { email, senha }
	   * @param {function} sucesso
	   * @param {function} erro
	   */
	  login.login = function( usuario, sucesso, erro ) {
	  	var params = { 
	  		'email' : usuario.email, 
	  		'senha' : usuario.senha 
	  	};
	  	var usuariosResource = $resource( $rootScope.urlUsuario );
		usuariosResource.save( {}, params, 
	      function( response ) {
	        sucesso( response );
	      },
	      function( response ) {
	        erro( response );
	      }
	    );
	  };

	  /**
	   * Cadastra um novo usuário no sistema.
	   * @method loginService::cadastrarUsuario
	   * @param {object} usuario { email, senha }
	   * @param {function} sucesso
	   * @param {function} erro
	   */
	  login.cadastrarUsuario = function( usuario, sucesso, erro ) {
	  	var params = { 
	  		'email' : usuario.email, 
	  		'senha' : usuario.senha,
	  		'lingua' : $window.localStorage.lingua
	  	};
	  	var usuariosResource = $resource( $rootScope.urlUsuarios );
		usuariosResource.save( {}, params, 
	      function( response ) {
	        sucesso( response );
	      },
	      function( response ) {
	        erro( response );
	      }
	    );
	  };

	  return login;
}]);