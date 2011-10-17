var WebSQL = {
	db : null,
	
	init : function(){
		this.eventHandlers();
		
		this.db = window.openDatabase(
	         'o_viajante',       // Nome do banco
	         '1.0',            // Versão
	         'Banco de dados da aplicação O Viajante',      // Descrição
	          2 * 1024 * 1024,  // Espaço em bytes
		      function(db) {}   // Função de callback opcional
			);
		
		this.db.transaction(function(tx) {
			tx.executeSql('CREATE TABLE users(id INTEGER PRIMARY KEY ASC, name TEXT, email TEXT, password TEXT, city TEXT, born_date DATETIME)');
		});
	},
	
	eventHandlers : function () {
		$('#form-register').bind('submit' , WebSQL.registrate);
		$('#form-register input[type="email"]').bind('blur' , WebSQL.isEmailAvailable);
	},
	
	registrate : function () {
		var $this = $(this);
		
		var data = [];
		$('input', $this).not('input:submit').each(function(){
			data.push($(this).val());
		});
		
		WebSQL.db.transaction(function(tx) {
			tx.executeSql('INSERT INTO users(name, email, password, city, born_date) VALUES (?,?,?,?,?)', data, function(){
				console.log('ok');
			}, function(){
				console.log('erro');
			});
		});
		
		return false; 
	},
	
	isEmailAvailable : function () {
		var email = [];
		email.push($(this).val());
		
		WebSQL.db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM users WHERE email = ?', email , function(tx, results){
				 var len = results.rows.length;
				 
				 if(!len){
					 
				 }
				 
				 //for (var i = 0; i < len; ++i) {
				 //   var row = results.rows.item(i);
				 //   console.log(row);
				 // }
				  
			}, function(){
				console.log('erro');
			});
		});
	}

};