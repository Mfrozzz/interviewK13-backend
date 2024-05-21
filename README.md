# Tech Interview K13 dev Back-end 

Candidato:
> Marcos Vinicius Boava
>> Sistema em PHP - Teste Back-End K13

Tecnologias:
> PHP + Laravel + Docker + React + InertiaJs + JavaScript

### Configurações iniciais

- Esse é um projeto que se utiliza de Docker. Tendo por especifidade o uso da imagem de Docker recomendada no próprio site framework Laravel, o **Sail**, juntamente com o framework Front-end do NodeJs **React**.

- Para executar o projeto Inicie o Docker, no diretório correto do projeto abra o seu terminal e execute os comandos:

```
    ./vendor/bin/sail up -d
    ./vendor/bin/sail npm run dev
```

- Em seu navegador acesse: 
```
    http://localhost/view/contacts/home
```

- Para a criação de diversos recursos pode-se rodar o comando:
```
    ./vendor/bin/sail php artisan
```

- Para parar ou desligar os contêineres execute:
```
    ./vendor/bin/sail stop
    ou
    ./vendor/bin/sail down
```

### Funcionalidades

-   **CRUD contatos:** O sistema possui um CRUD (Create, Read, Update e Delete) de contatos. Este guarda as seguintes informações:
> Nome Completo;

> CPF - único no banco de dados;

> E-mail - único no banco de dados;

> Data de nascimento - salvo no banco no formato ano/mês/dia (AAAA/MM/DD), mas exibida para o usuário no formato dia/mês/ano (DD/MM/AAAA).

-   **Adicionar e Editar Endereços:** Para enriquecer em detalhes o contato que está sendo guardado, podem ser adicionadas todas as informações de endereço do mesmo, são essas:

> CEP;

> Rua;

> Número;

> Bairro;

> Cidade;

> Estados.

-   **Adicionar e Editar Telefone:** Além disso também pode-se fazer o mesmo em relação aos telefones do contato, podendo ser o seu pessoal, residencial e comercial.

-   **Pesquisar Contatos:** Finalmente, outra importante funcionalidade é a pesquisa do contato, em meio a uma lista, o sistema vai retornar automaticamente o contato pesquisado.

### Estrutura

Tratando-se de um projeto PHP Laravel, pode-se encontrar a maioria dos recursos e funcionalidades nas segintes pastas:

-   **app:** Trata-se da parte lógica do Back-end do projeto, inclui as models, controllers e regras.
-   **database:** Trata-se da parte da lógica de armazenamento, ou seja, possui as migrations (para não precisar fazer consultas "na mão") e também possui recursos de geração aleatória de entidades para o banco de dados.
-   **resources:** É a parte do Front-end da aplicação, caso não tenha a adição do React ou do Vue, possuirá o front nos arquivos .blade.php, caso contrário armazenará as páginas em resources/js/Pages.
-   **routes:** Trata-se da difinição das rotas do Back-end e do Front-end do sistema.