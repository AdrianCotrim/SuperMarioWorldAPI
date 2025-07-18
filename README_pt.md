# **Super Mario World API**

## **Introdução**

A **Super Mario World API** é um projeto de estudo que fornece uma interface para acessar dados estruturados sobre o clássico jogo [_Super Mario World_ (1990)](https://www-mariowiki-com.translate.goog/Super_Mario_World?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc), desenvolvido para o [_Super Nintendo Entertainment System (SNES)_](https://pt.wikipedia.org/wiki/Super_Nintendo_Entertainment_System).

A API permite que desenvolvedores, entusiastas e pesquisadores consultem informações detalhadas sobre elementos do jogo, como mundos, inimigos, chefes e suas respectivas características. O objetivo é oferecer uma maneira acessível e organizada de explorar e reutilizar esses dados em aplicações, análises ou projetos relacionados.

**O que você encontrará na API?**

- **Personagens:** Detalhes sobre herois e vilões icônicos.
- **Power-ups:** Descrição dos itens que concedem habilidades especiais.
- **Inimigos:** Informações sobre os adversários enfrentados por Mario.
- **Chefes:** Perfis dos chefes de cada fase.
- **Mundos:** Descrição completa dos mundos.
- **Itens Coletáveis:** Informações sobre objetos interativos ao longo da aventura.

A **Super Mario World API** oferece acesso a esses dados de forma estruturada, permitindo fácil integração para projetos pessoais, estudos e até novas experiências interativas baseadas no universo do jogo.

# **Autenticação**

A **Super Mario World API** é atualmente **100% pública** e **não requer autenticação** para acesso. Todos os endpoints estão disponíveis livremente, sem necessidade de chave de API, token ou qualquer outro método de verificação.

Em futuras versões, a autenticação poderá ser implementada para determinados recursos ou funcionalidades avançadas. Caso isso ocorra, esta seção será atualizada com as instruções completas de autenticação.

# **Base URL e Ambiente**

A Super Mario World API está disponível atualmente em um único ambiente de produção. Todas as requisições devem ser feitas utilizando o seguinte endpoint base:

[_https://supermarioworldapi.vercel.app/_](https://supermarioworldapi.vercel.app/)

# **Formatos de Requisição e Resposta**

A Super Mario World API utiliza o protocolo **HTTP/HTTPS** e trabalha exclusivamente com o formato **JSON** nas respostas.

Para todas as requisições, recomenda-se incluir os seguintes headers:

`Accept: application/json`

**Exemplo de Requisição (GET):**

``` 
GET /v1/characters HTTP/1.1
Host: supermarioapi.adrian.dev
Accept: application/json
``` 

**Exemplo de Resposta (200 OK):**

``` 
\[

{

"id": "1",

"name": "Mario",

"description": "Mario is the main protagonist of the Super Mario series and is tasked with saving Princess Peach and the Dinosaur Land from various villains, primarily Bowser.",

"image": "Mario.png"

},

{

"id": "2",

"name": "Luigi",

"description": "Luigi is Mario's younger brother and often joins him in his adventures to rescue Princess Peach and save Dinosaur Land.",

"image": "Luigi.png"

}

\]
``` 

# **Estrutura de Dados**

Esta seção descreve a estrutura do banco de dados utilizado pela **Super Mario World API**. Ela inclui um diagrama relacional e as definições das tabelas com seus respectivos campos e relacionamentos.

<img width="1084" height="581" alt="Super Mario API" src="https://github.com/user-attachments/assets/979ac966-dd7d-4c62-b796-d0a5b89f1dd5" />

##

## Character

Está tabela é sobre todos os personagens jogáveis e não jogáveis.

| **Valor** | **Descrição** |
| --- | --- |
| **id** | Número de identificação |
| **name** | Nome do personagem |
| **description** | Descrição do personagem |
| **image** | Endereço da imagem do personagem na API |

## Enemy

Está tabela contém todos os inimigos do jogo.

| **Valor** | **Descrição** |
| --- | --- |
| **id** | Número de identificação |
| **name** | Nome do inimigo |
| **description** | Descrição do inimigo |
| **image** | Endereço da imagem do inimigo na API |
| **hp** | Número de golpes necessários para derrotar o inimigo |
| **behaviour** | Descrição das ações e comportamento do inimigo |

## Item

Está tabela contém todos os itens colecionáveis, itens para pegar e objetos que restauram a saúde.

| **Valor** | **Descrição** |
| --- | --- |
| **id** | Número de identificação |
| **name** | Nome do item |
| **description** | Descrição do item |
| **image** | Endereço da imagem do item na API |
| **type** | Define o tipo do item. Ex: Coletável, Power-Up… |
| **value** | Valor em pontos que o jogador recebe ao coletar tal item |

## Boss

Está tabela contém todos chefes do jogo.

| **Valor** | **Descrição** |
| --- | --- |
| **id** | Número de identificação |
| **name** | Nome do chefe |
| **description** | Descrição do chefe |
| **image** | Endereço da imagem do chefe na API |
| **hp** | Número de golpes necessários para derrotar o chefe |

##

## World

Está tabela contém todos os mundos do jogo.

| **Valor** | **Descrição** |
| --- | --- |
| **id** | Número de identificação |
| **name** | Nome do mundo |
| **description** | Descrição do mundo |
| **image** | Endereço da imagem do mundo na API |

## World_Enemy

Esta tabela contém os relacionamentos entre inimigos e mundos, indicando em quais mundos cada inimigo pode ser encontrado.

| **Valor** | **Descrição** |
| --- | --- |
| **id** | Número de identificação |
| **world_id** | Número de identificação da tabela World |
| **enemy_id** | Número de identificação da tabela Enemy |

## World_Boss

Esta tabela contém os relacionamentos entre chefes e mundos, indicando em quais mundos cada chefe pode ser encontrado.

| **Valor** | **Descrição** |
| --- | --- |
| **id** | Número de identificação |
| **world_id** | Número de identificação da tabela World |
| **boss_id** | Número de identificação da tabela Boss |

# **Endpoints da API**

Aqui estão os endpoints separados por tabela.

## characters

### **GET** /characters

**Descrição:** Retorna a lista de todos os personagens.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | Search | Não | Filtra personagens por nome | ?search=mario |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Mario",

"description": "Mario is the main protagonist of the Super Mario series and is tasked with saving Princess Peach and the Dinosaur Land from various villains, primarily Bowser.",

"image": "Mario.png"

},

{

"id": "2",

"name": "Luigi",

"description": "Luigi is Mario's younger brother and often joins him in his adventures to rescue Princess Peach and save Dinosaur Land.",

"image": "Luigi.png"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Nenhum personagem encontrado |
| 500 | Erro interno no servidor |

### **GET** /characters/id

**Descrição:** Retorna um personagem específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um personagem específico baseado no id fornecido | characters/1 |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Mario",

"description": "Mario is the main protagonist of the Super Mario series and is tasked with saving Princess Peach and the Dinosaur Land from various villains, primarily Bowser.",

"image": "Mario.png"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Personagem não encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /characters/id/image

**Descrição:** Retorna a imagem de um personagem específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um personagem específico baseado no id fornecido | characters/1 |
| Query | image | Não | Retorna imagem do personagem | characters/1/image |

**Exemplo de Resposta (200)OK:**

<img width="901" height="494" alt="image" src="https://github.com/user-attachments/assets/bbe0c920-d9bc-4aeb-9c11-41376763a5af" />

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Personagem não encontrado |
| 404 | Personagem não tem imagem |
| 404 | Imagem não encontrada |
| 500 | Erro interno no servidor |

## enemies

### **GET** /enemies

**Descrição:** Retorna a lista de todos os inimigos.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | Search | Não | Filtra inimigos por nome | ?search=goomba |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Goomba",

"description": "A round, chestnut-like creature.",

"image": "Goomba.png",

"hp": "1",

"behaviour": "After stomping a Goomba, Mario can carry it for a short distance and throw it. Some Goombas come floating in bubbles."

},

{

"id": "2",

"name": "Para-Goomba",

"description": "A parachuting Goomba.",

"image": "ParaGoomba.png",

"hp": "1",

"behaviour": "They slowly fall down."

},

{

"id": "3",

"name": "Flying Goomba",

"description": "A hopping winged Goomba.",

"image": "FlyingGoomba.png",

"hp": "2",

"behaviour": "Jumps randomly."

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Nenhum inimigo encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /enemies/id

**Descrição:** Retorna um inimigo específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um inimigo específico baseado no id fornecido | enemies/1 |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Goomba",

"description": "A round, chestnut-like creature.",

"image": "Goomba.png",

"hp": "1",

"behaviour": "After stomping a Goomba, Mario can carry it for a short distance and throw it. Some Goombas come floating in bubbles."

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Inimigo não encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /enemies/id/image

**Descrição:** Retorna a imagem de um inimigo específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um inimigo específico baseado no id fornecido | enemies/1 |
| Query | image | Não | Retorna imagem do inimigo | enemies/1/image |

**Exemplo de Resposta (200)OK:**

<img width="902" height="501" alt="image" src="https://github.com/user-attachments/assets/244e64de-ea26-4d80-81d8-eb0a0e47fce8" />

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Inimigo não encontrado |
| 404 | Inimigo não tem imagem |
| 404 | Imagem não encontrada |
| 500 | Erro interno no servidor |

##

## items

### **GET** /items

**Descrição:** Retorna a lista de todos os itens.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | Search | Não | Filtra itens por nome | ?search=star |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "7",

"name": "Keys",

"type": "Pickup",

"description": "If Mario grabs a key and puts it in a keyhole (which is hidden in a level), a secret level is unlocked.",

"image": "Key.png",

"value": "0"

},

{

"id": "8",

"name": "Eggs",

"type": "Pickup",

"description": "The eggs knocked out of Prize Blocks hatch into Yoshis. When a ridden Yoshi lays an egg, another item comes out.",

"image": "Eggs.png",

"value": "0"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Nenhum item encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /items/id

**Descrição:** Retorna um item específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um item específico baseado no id fornecido | items/1 |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "7",

"name": "Keys",

"type": "Pickup",

"description": "If Mario grabs a key and puts it in a keyhole (which is hidden in a level), a secret level is unlocked.",

"image": "Key.png",

"value": "0"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Item não encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /items/id/image

**Descrição:** Retorna a imagem de um item específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um item específico baseado no id fornecido | items/1 |
| Query | image | Não | Retorna imagem do item | items/1/image |

**Exemplo de Resposta (200)OK:**

<img width="903" height="483" alt="image" src="https://github.com/user-attachments/assets/dadea274-dc86-4b10-bda9-44b60ee2dc2d" />

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Item não encontrado |
| 404 | Item não tem imagem |
| 404 | Imagem não encontrada |
| 500 | Erro interno no servidor |

##

## bosses

### **GET** /bosses

**Descrição:** Retorna a lista de todos os chefes.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | Search | Não | Filtra chefes por nome | ?search=bowser |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Reznor",

"description": "A fire-spitting Triceratops that comes in a set of four. Reznors guard the exits of all fortresses.",

"image": "Reznor.png",

"hp": "4"

},

{

"id": "2",

"name": "The Big Boo",

"description": "He moves around the room while invisible, then suddenly reappears.",

"image": "BigBoo.png",

"hp": "3"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Nenhum chefe encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /bosses/id

**Descrição:** Retorna um chefe específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um chefe específico baseado no id fornecido | bosses/1 |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Reznor",

"description": "A fire-spitting Triceratops that comes in a set of four. Reznors guard the exits of all fortresses.",

"image": "Reznor.png",

"hp": "4"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Chefe não encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /bosses/id/image

**Descrição:** Retorna a imagem de um chefe específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um chefe específico baseado no id fornecido | bosses/1 |
| Query | image | Não | Retorna imagem do chefe | bosses/1/image |

**Exemplo de Resposta (200)OK:**

<img width="829" height="497" alt="image" src="https://github.com/user-attachments/assets/eae619f7-f223-45d3-9a3c-e32374a862c1" />

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Chefe não encontrado |
| 404 | Chefe não tem imagem |
| 404 | Imagem não encontrada |
| 500 | Erro interno no servidor |

##

## world

### **GET** /worlds

**Descrição:** Retorna a lista de todos os mundos.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | Search | Não | Filtra mundos por nome | ?search=yoshi island |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Yoshi's Island",

"description": "Yoshi's Island is mainly a grassy plains-related world that does not contain any underwater levels. The main enemies in this world include Monty Moles, Koopa Troopas, Rexes, and a few others. Iggy is found in his castle at the end of this world. Completing this world leads to Donut Plains. This world also contains the Yellow Switch Palace. This is the only world (along with the Special Zone) not to have any secret exits.",

"image": "YoshisIsland.png"

},

{

"id": "2",

"name": "Donut Plains",

"description": "Donut Plains is the second world in the game. It is known for featuring the first Ghost House and for being the first to have a course with multiple exits. The Cape Feather is utilized frequently. The name of this world is a reference to its unique shape. It has two Ghost Houses, the Green Switch Palace, and Castle #2.",

"image": "DonutPlains.png"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Nenhum mundo encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /worlds/id

**Descrição:** Retorna um mundo específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um mundo específico baseado no id fornecido | worlds/1 |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"name": "Yoshi's Island",

"description": "Yoshi's Island is mainly a grassy plains-related world that does not contain any underwater levels. The main enemies in this world include Monty Moles, Koopa Troopas, Rexes, and a few others. Iggy is found in his castle at the end of this world. Completing this world leads to Donut Plains. This world also contains the Yellow Switch Palace. This is the only world (along with the Special Zone) not to have any secret exits.",

"image": "YoshisIsland.png"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Mundo não encontrado |
| 500 | Erro interno no servidor |

###

### **GET** /worlds/id/image

**Descrição:** Retorna a imagem de um mundo específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | id  | Sim | Procura um mundo específico baseado no id fornecido | worlds/1 |
| Query | image | Não | Retorna imagem do mundo | worlds/1/image |

**Exemplo de Resposta (200)OK:**

<img width="751" height="499" alt="image" src="https://github.com/user-attachments/assets/3467eecb-940a-4ece-a6e2-2660818967ed" />

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 404 | Mundo não encontrado |
| 404 | Mundo não tem imagem |
| 404 | Imagem não encontrada |
| 500 | Erro interno no servidor |

##

## world_enemy

### **GET** /world_enemy

**Descrição:** Retorna a lista das relações entre world e enemy.

**Parâmetros:**

Este endpoint não possuí parâmetros.

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"world_id": "1",

"enemy_id": "20"

},

{

"id": "2",

"world_id": "1",

"enemy_id": "22"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 500 | Erro interno no servidor |

###

### **GET** /world_enemy/world_id

**Descrição:** Retorna a um mundo específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | world_id | Sim | Retorna lista de inimigos do mundo especificado | world_enemy/1 |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "20",

"name": "Monty Mole"

},

{

"id": "22",

"name": "Rex"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 400 | world_id é necessário |
| 404 | Nenhum inimigo encontrado para este mundo |
| 500 | Erro interno no servidor |

## world_boss

### **GET** /world_boss

**Descrição:** Retorna a lista das relações entre world e boss.

**Parâmetros:**

Este endpoint não possuí parâmetros.

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"world_id": "1",

"boss_id": "3"

},

{

"id": "2",

"world_id": "2",

"boss_id": "1"

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 500 | Erro interno no servidor |

###

### **GET** /world_boss/world_id

**Descrição:** Retorna um personagem específico.

**Parâmetros:**

| **Código** | **Nome** | **Obrigatório** | **Descrição** | **Exemplo** |
| --- | --- | --- | --- | --- |
| Query | world_id | Sim | Retorna chefe do mundo especificado | world_boss/1 |

**Exemplo de Resposta (200)OK:**

```
\[

{

"id": "1",

"world_id": "1",

"boss_id": "3",

"Boss": {

"id": "3",

"name": "Iggy Koopa"

}

}

\]
```

**Códigos de Resposta:**

| **Código** | **Descrição** |
| --- | --- |
| 200 | Requisição bem-sucedida |
| 400 | world_id é necessário |
| 404 | Nenhum chefe encontrado para este mundo |
| 500 | Erro interno no servidor |

###

# **Contato e Informações Adicionais**

Seja para dúvidas técnicas, feedbacks, contribuições ou apenas bater um papo sobre o projeto, sinta-se à vontade para entrar em contato pelos canais abaixo

📧 e-mail: [adriancotrimdosreis4@gmail.com](mailto:adriancotrimdosreis4@gmail.com)
🐙 github: [AdrianCotrim](https://github.com/AdrianCotrim)
💼 linkedin: [Adrian Cotrim](https://www.linkedin.com/in/adriancotrim/)

# **Fonte**

Devo agradecer a wiki de Super Mario World! Por ter sido por lá onde tirei descrições, informações e sprites do jogo:

<https://www.mariowiki.com/Super_Mario_World>

#
