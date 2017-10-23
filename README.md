# Desafio DeviceLab

Crie um aplicativo contendo um módulo backend e outro frontend com as seguintes características:

## Backend

Exportará uma API RESTful de:

1. Sign-in: Para entrar no sistema
2. *Sign-out: Para sair do sistema
3. Sign-up: Para se cadastrar no sistema
4. *Profile: Para exibir seu perfil

(*) Necessário estar préviamente autenticado.

Todos os endpoints devem **aceitar exclusivamente JSON** e retornar também.
Os dados do usuário devem ser persistidos numa base de dados e todas as mensagens de erro devem retornar com o respectivo código HTTP referente ao erro no seguinte formto:

```
{
    "message": "Respective error message"
}
```

### Sign-in

* Receber um obj com email e senha
* Caso o email e senha sejam iguais aos dados persistidos, retornar uma "chave" de autenticação.
* Caso o email não exista ou a senha esteja errada, retornar uma mensagem nos padrões especificados anteriormente informando que o "Usuário e/ou senha estão incorretos", porém exibir um log no console do backend sobre tipo de evento, seja por senha incorreta ou por email inexistente.

### Sign-out

* Invalidar a "chave" informada do usuário no banco de dados impossibilitando que ela seja utilizada novamente até que se faça um novo procesos de login.
* Caso a chave informada seja inválida, retornar o respectivo erro informando esta situação ao usuário.

### sign-up

* Deve receber um objeto com os seguintes campos:
    * name : String,
    * email : String,
    * password : String
* Em caso de falha restornar um erro com a mensagem e código http respectivo para cada cenário de erro
* Em caso de sucesso retornar uma "chave" para ser utilizada nas transações que exijam autenticação.

### profile

* Retornar as propriedades do usuário + os seguintes campos:
    * creationDate: Date
    * lastAccess: Date
* Retornar um erro (sessão expirada) caso a "chave" informada tenha mais de 5 min existência desde o último login.

## Oberservações

* Não é necessário fazer "renovação da chave" a fim de evitar que ela expire no processo de profile
 
## Requisitos

* Persistência em banco de dados
* Padronização do código com esLint/jsLint/jsHint
* Uso de Express para o servidor HTTP
* **A "chave" deve ser enviada no header do protocolo http com o parametro: AUTH-TOKEN**

## Diferenciais

* Uso de banco de dados embarcado
* uso de babel
* Processo de build
* Criptografia hash para a senha
* Criptografia assimétrica para a "chave" ou uso de JWT
* Testes unitários e de serviço
 
# Front-end

Implementar o uso das API's descritas no backend, sinta-se livre para implementar como desejar

## Diferenciais
* Uso de Angular 1
* Uso de Angular 4
* Uso de local-storage
* Uso de browser-sync
* Estilização + SASS