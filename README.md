# API

O [FocusTextil](https://www.focustextil.com.br), estou disponibilizando um sistemas restful como solicitado via teste.


Para utilização de consumo desta API será necessario Postman ou  Insomnia, link para download estará abaixo.

https://www.postman.com/   https://insomnia.rest/download




Para inicializar a aplicação, basta baixa ou aplicar um fork, em seguida você precisará ter VSCode ou outro editor e leite de Codigo.

Caso não saiba 100% como lídar no github, basta acessar este link para saber como clonar https://www.atlassian.com/br/git/tutorials/setting-up-a-repository/git-clone
para clonar um repositorio, você terá acesso nesta documentação completa:  https://docs.github.com/pt/github/creating-cloning-and-archiving-repositories/cloning-a-repository

Ao Baixar a aplicação, vá até o terminal do seu editor e digite: 
   +   
        npm install


 - Aguarde o download de todas as dependencias para poder utiliza de maneira certa.

Logo após a instalação, a aplicação estár pronta para consumo. Ainda com seu terminal aberto digite: 
   +   
         npm install

Sua aplicação já estará disponível após essses pequenos processos


Recursos disponíveis para acesso via API:
* [**Clientes**]
* [**Pedidos**]
* [**Logs**]

## Métodos
Requisições para a API devem seguir os padrões HTTP:
| Método | Descrição |
|---|---|
| `GET` | Retorna informações requisitadas. |
| `POST` | Registr uma nova informação enviada. |
| `PUT` | Atualiza dados de alguma informação. |
| `DELETE` | Remove um registro do sistema. |

## Respostas

| Código | Descrição |
|---|---|
| `200` | Requisição executada com sucesso (success).|
| `400` | Erros de validação ou os campos informados não existem no sistema.|
| `401` | Dados de acesso inválidos.|
| `404` | Registro pesquisado não encontrado (Not found).|
| `405` | Método não implementado.|
| `410` | Registro pesquisado foi apagado do sistema e não esta mais disponível.|
| `422` | Dados informados estão fora do escopo definido para o campo.|

# Autenticação - Basic Authentication

Nossa API utiliza Basic Authentication para deletar e editar usuarios, será necessario criação do basic 64, para utilização dele basta se cadastrar e logo após acessar o site:

https://www.base64encode.org/ - Logo após, selecione Encode, em seguida digite seu email:senha (deve seguir o padrão, seu email e logo após : sua senha).


A regra do negocio, somente o Id do usuario cadastrado poderá excluir o mesmo, caso contrario, o acesso será negado!

Para inserir o token e ter acesso autenticado ao usuario, basta abrir o Postman, na guia headers abrir uma nova Key com o nome Authorization, e no espaço Value escreva Basic *seguido do token gerado*


### Utilizando o código de acesso [GET]


+ Request (application/json) - Utilizando o Postman

    + QueryParams
            |    Key       | Value                                    |
            |    EMAIL     | Digite o email que deseja procurar       |


    + Boby

        Para ter acesso a requisições ou filtros, basta seguir, as seguinte rotas estão disponiveis

        /clients - Com ela, você terá acesso todos os clientes registrados
        /clients/:id - Com ela, você poderá ter acesso a um determinado cliente pelo id
        /requests -  Com ela, você terá acesso todos os Pedidos registrados
        /logcollection - Com ela, você terá acesso a todos as alterações feitas em arquivos dos Pedidos


### Utilizando o código de acesso [POST]

    + Boby

       Para ter acesso a registrar requisições, basta acessar as seguintes rotas:

        /register - Com ela, você poderá cadastrar um novo usuario no sistema, podendo gerar um token como dito acima (Não é permitido email repetido)
        /newrequest - Com ela, você poderá solicitar um novo pedido (SERÀ NECESSÀRIO ESTAR AUTENTICADO)


### Utilizando o código de acesso [PUT] - PARA QUALQUER REQUISIÇÂO, É NECESSARIO ESTAR AUTENTICADO

    + Boby

        /clients/:id - Com está rota você poderá editar algum campo do usuario a qual está autenticado.
        /requests/:id - Com está rota, você poderá alterar algum pedido, com um nova descrição



### Utilizando o código de acesso [DELETE]

    + Boby

        /clients/:id - Com está rota você poderá deletar o usuario a qual está autenticado
        /requests/:id - Com está rota você poderá deletar algum request pelo id feito (será feito um log do seu ato)



### Utilizando um exemplo de [GET]

    Para utilização de um metodo GET, é necessario ir na aba  Body, selecionar a opção raw e o tipo de arquivo para ser enviado JSON.
    Para utilização ou pesquisa de algum usuario especifico, você deverá fornecer o ID ou o email via QUERYPARAMS

### Utilizando um exemplo de [POST]

    + Boby

        Para conseguir registrar um usuario, sua body deve seguir o exemplo abaixo:

        {   
            "name": "Matheus Guimaraes",
            "email": "matheus@focustextil.edu",
            "password": "joaozinho2444",
            "telephone": "99 9999-9999",
            "dateOfBirth": "2020/04/22",
            "address": "rua Santo Antonio numero 11",
            "complement": "211",
            "district": "BBBB"
        }
    
        Para conseguir registrar um pedido, só necessrio estar autenticado e em sua body colocar o seguinte corpo:

        {   
            "orderSummary": "Solicito um sofa"
        }

### Utilizando um exemplo de [PUT]

    + Boby

        Para conseguir editar, basta ter algum dos campos abaixos no body e enviar na rota de editar, juntamente com seu id por parametro
        {   
            "name": "Matheus Guimaraes",
            "email": "matheus@focustextil.edu",
            "telephone": "99 9999-9999",
            "dateOfBirth": "2020/04/22",
            "address": "rua Santo Antonio numero 11",
            "complement": "211",
            "district": "BBBB"
        }

        Para conseguir editar um pedido, basta ter um ID do mesmo, colocar jumento como dito na rota e o corpo no body seguir o exemplo a baixo

        {   
            "orderSummary": "Solicito um colchao"
        }

        NÂO É PERMITIDO EDITAR LOGS!


### Utilizando um exemplo de [DELETE]

    + Boby

        Tenha certeza ao requesitar está rota, nada aqui poderá ser alterado e será registrado!

        Para fazer isso, basta ter acesso ao ID do usuario ou da Requisição e implementar na rota como descrito acima!





### O BANCO DE DADOS É LIGADO DIRETAMENTE EM UMA CLOUD

    {
        "_id": PRIMARY KEY
        "request": Id da Pedido Alterado
        "EditBy": Id do usuario que alterou
        "log": O que foi alterado
        "EditAt": Data de criação
        "__v": 0
    },
