# Para que serve esse Web App?

Esse Web App foi feito com a intenção de incrementar meu [portfólio](https://github.com/walteralleyz).  
Seu uso é extremamente simples:

- Você pode criar uma lista de compras,
	
- Você pode editar ou excluir uma lista de compras.

#### Autenticação

Para acessar o aplicativo você não precisa usar senhas. Depois de inserir seu email, um código é enviado para seu email. Depois do acesso, você precisará fazer fornecer o código novamente se estiver usando outro navegador, ou apagar seu histórico.

# EndPoints para a API

-   ### Listas
    
	    Base: /item  
        Novo: /new  
        Deletar: /id  
        Buscar: /userID  
        
-   ### Usuários
    
		Base: /user  
        Criar: /signup  
        Entrar: /signin  
        Verificar Login: /verifysign

### Autorização

Para fazer uma requisição, você precisa adicionar  um header chamado _x-access-token_ e passar o seu token de usuário!

# Tecnologias
|          | Backend | Frontend |
|----------|:-------:|:--------:|
| Postgres | &check; | &#10008; |
| Express  | &check; | &#10008; |
| Node     | &check; | &#10008; |
| TypScript| &check; | &#10008; |
| JWT      | &check; | &#10008; |
| NodeMail | &check; | &#10008; |
| React    |&#10008; | &check;  |
| Redux    |&#10008; | &check;  |
| SCSS     |&#10008; | &check;  |
