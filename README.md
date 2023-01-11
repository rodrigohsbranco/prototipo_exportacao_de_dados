# Galera.app - Front-end Vue
Módulo: Formulários / Aplicação: Formulários

webgca-spa-rh-formularios

---

## Esta aplicação

Esta aplicação contém o código fonte do front-end da aplicação **FORMULÁRIOS** do módulo **FORMULÁRIOS** do **GALERA.APP**

A aplicação de formulários tem o objetivo de disponibilizar as telas e recursos para a criação e manutenção dos formulários, que são a base de todo o módulo de pesquisa.

---

## Vue.js 2

Esta aplicação foi completamente desenvolvida com Vue.js versão 2.

Referências 

 * Vue.js 2 - [Link oficial](https://vuejs.org/)
 * Vue CLI - [Link oficial](https://cli.vuejs.org/)
 * Vue Router - [Link oficial](https://router.vuejs.org/)
 * Vuex - [Link oficial](https://vuex.vuejs.org/)

---

## Front-end x Back-end

Esta aplicação está completamente desacoplada do back-end. Por isso, toda a comunicação com o back-end é feita por meio de requisições para a API REST do Galera.app, da qual esta aplicação é totalmente dependente para funcionar.

---

## Pré-requisitos

Para execução e build desta aplicação, é necessário ter instalado o Node.js - [Link oficial](https://nodejs.org/en/)

---

## Bootstrap 4 e Vue Bootstrap

A framework de CSS disponível para ser utilizada é o Bootstrap versão 4 (link abaixo). Esta é a versão que o Galera.app já utiliza também para os templates Django.

[https://getbootstrap.com/docs/4.6/getting-started/introduction/](https://getbootstrap.com/docs/4.6/getting-started/introduction/)

A aplicação também conta com o BootstrapVue para facilitar a implementação.

[https://bootstrap-vue.org/](https://bootstrap-vue.org/)

### Arquivo /src/assets/css/bootstrap-override.css

Este arquivo tem o objetivo de sobrescrever algumas regras padrão do Bootstrap em um nível acima do da aplicação front-end. No arquivo ```main.js``` é feito o import deste arquivo.

---

## Ícones e Font Awesome 5

O pacote de ícones disponível para uso na aplicação é o gratuito da Font Awesome versão 5 (link abaixo). Também podem ser utilizados outros ícones em formato de imagem, desde que gratuitos ou com licença que permita uso comercial sem licença ou atribuição.

[https://fontawesome.com/v5.15/icons](https://fontawesome.com/v5.15/icons)

---

## Diretório - public

O diretório ```public``` contém algumas customizações importantes para conhecimento dos desenvolvedores.

**Arquivo index.html**

O arquivo index.html é utilizado somente para o ambiente local de desenvolvimento. É seguro, portanto, fazer alterações nele, porém é recomendado deixá-lo sempre o mais "limpo" possível para facilitar o entendimento.

**Arquivo index.html - Campos input hidden**

Logo após a abertura da tag body é possível ver alguns elementos input hidden. Exemplo:
```
<input type="hidden" name="client-url" value="https://frontendgca.galera.app">
```

Os valores destes elementos são como variáveis de ambiente e os valores pré-definidos neles devem ser mantidos no index.html para os testes locais. No ambiente de QA e produção os valores destes elementos são dinâmicos e eles são definidos nos templates do Django.

**Arquivo index.html - Bloco script com variável webgca**

Também no **index.html** é possível ver um bloco ```<script>```, definido logo no começo do ```<body>```, similar ao exemplo abaixo:

```
<script>
    const clientUrl = document.querySelector('[name="client-url"]').value;
    const userId = document.querySelector('[name="user-id"]').value;
    const userToken = document.querySelector('[name="user-token"]').value;
    const themeColor = '#533EEC';
    const viewHeaderTextColor = '#FFFFFF';

    webgca = {
        clientUrl,
        userId,
        userToken,
        themeColor,
        viewHeaderTextColor,
    };
</script>
```

As variável ```webgca``` é usada para expor os valores do Django para a aplicação front-end. No ambiente de QA e produção os valores que são definidos para a variável ```webgca``` são dinâmicos e são definidos nos templates do Django.

No exemplo acima:

1. ```clientUrl``` = A URL base do ambiente da aplicação;
2. ```userId``` = O id do usuário logado;
3. ```userToken``` = O token do usuário logado (enviado no cabeçalho de todas as requisições para a API);
4. ```themeColor``` = A cor (hexadecimal) de tema, para personalização do layout na aplicação;
5. ```viewHeaderTextColor``` = A cor (hexadecimal) do texto que aparece dentro dos containers que usam a cor de tema. Necessário principalmente para fazer o contraste com a cor de tema (clara/escura).

**Arquivo index.html - Container do layout**

Dentro do 

```
<div class="container">
    <div class="row">
        <div class="col-3"></div>
        <div class="col">
            <div id="app"></div>
        </div>
    </div>
</div>
```

---

## Axios

A biblioteca utilizada para as requisições é a [Axios](https://axios-http.com/).

No arquivo ```main.js``` é criada a instância do Axios, que é então atribuída a uma propriedade do ```Vue.prototype.``` para uso em qualquer parte da aplicação.

Esta arquitetura foi definida desta forma (ao invés de usar algo como vue-axios por exemplo) após alguns testes durante o desenvolvimento.

### Arquivo /src/axios/index.js

Este arquivo contém uma classe customizada que efetivamente cria a instância do Axios e  define algumas configurações padrão.

É neste arquivo por exemplo que é definido, atualmente, o timeout das requisições e a baseURL da API, específica da aplicação.

---

## Execução e build

### Execução local

#### Instalação das dependências

Antes de executar a aplicação, é necessário instalar as dependências. Este procedimento precisa ser feito quando o projeto ainda não foi executado nenhuma vez ou sempre que houver inclusão/atualização de dependências usando o npm ou alterando o arquivo package.json.
``` bash
npm install
```

#### Execução

Com as dependências devidamente instaladas, basta executar a aplicação com o comando:

``` bash
npm run serve
```

Observar no terminal os endereços para acesso da aplicação no browser, como no bloco abaixo:

``` bash
  App running at:
  - Local:   http://localhost:????/
  - Network: http://192.168.0.2:????/
```

### Build para produção

O build para a produção não está no escopo deste documento.
