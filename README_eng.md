# **Super Mario World API**

## **INTRODUCTION**

A **Super Mario World API** é um projeto de estudo que fornece uma interface para acessar dados estruturados sobre o clássico jogo [_Super Mario World_ (1990)](https://www-mariowiki-com.translate.goog/Super_Mario_World?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc), desenvolvido para o [_Super Nintendo Entertainment System (SNES)_](https://pt.wikipedia.org/wiki/Super_Nintendo_Entertainment_System).

A API permite que desenvolvedores, entusiastas e pesquisadores consultem informações detalhadas sobre elementos do jogo, como mundos, inimigos, chefes e suas respectivas características. O objetivo é oferecer uma maneira acessível e organizada de explorar e reutilizar esses dados em aplicações, análises ou projetos relacionados.

**What will you find in the API?**

- **Characters:** Details on iconic heroes and villains.
- **Power-ups:** Description of items that grant special abilities.
- **Inimigos:** Information about the opponents faced by Mario.
- **Bosses:** Profiles of the bosses of each stage.
- **Worlds:** Complete description of the worlds.
- **Collectible Items:** Information about interactive objects throughout the adventure.

The **Super Mario World API** provides access to this data in a structured way, allowing easy integration for personal projects, studies and even new interactive experiences based on the game's universe.

# **AUTHENTICATION**

The **Super Mario World API** is currently **100% public** and **does not require authentication** AUTHENTICATION

In future releases, authentication may be implemented for certain advanced features or functionality. If this occurs, this section will be updated with full authentication instructions.

# **Base URL and Environment**

The **Super Mario World API** is currently available in a single production environment. All requests must be made using the following base endpoint:

[_https://supermarioworldapi.vercel.app/_](https://supermarioworldapi.vercel.app/)

# **Request and Response Formats**

The Super Mario World API uses the protocol **HTTP/HTTPS** and works exclusively with the format **JSON** in the answers.

For all requests, it is recommended to include the following headers:

`Accept: application/json`

**Request Example (GET):**

``` 
GET /v1/characters HTTP/1.1
Host: supermarioapi.adrian.dev
Accept: application/json
``` 

**Example Response (200 OK):**

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

# **Data Structure**

This section describes the structure of the database used by **Super Mario World API**. It includes a relational diagram and table definitions with their respective fields and relationships.

<img width="1084" height="581" alt="Super Mario API" src="https://github.com/user-attachments/assets/979ac966-dd7d-4c62-b796-d0a5b89f1dd5" />

##

## Character

This table lists all playable and non-playable characters.

| **Field** | **Description** |
| --- | --- |
| **id** | Identification number |
| **name** | Character name |
| **description** | Character description |
| **image** | URL of the character's image in the API |

## Enemy

This table contains all the enemies in the game.

| **Field** | **Description** |
| --- | --- |
| **id** | Identification number |
| **name** | Enemy name |
| **description** | Enemy description |
| **image** | URL of the enemy's image in the API |
| **hp** | Number of hits required to defeat the enemy |
| **behaviour** | Description of the enemy's actions and behavior |

## Item

This table includes all collectible items, pick-up items, and health restoration objects.

| **Field** | **Description** |
| --- | --- |
| **id** | Identification number |
| **name** | Item name |
| **description** | Item description |
| **image** | URL of the item's image in the API |
| **type** | Defines the item type. e.g., Collectible, Power-Up… |
| **value** | Number of points the player earns by collecting the item |

## Boss

This table contains all the bosses in the game.

| **Field** | **Description** |
| --- | --- |
| **id** | Identification number |
| **name** | Boss name |
| **description** | Boss description |
| **image** | URL of the boss's image in the API |
| **hp** | Number of hits required to defeat the boss |

## World

This table contains all the worlds in the game.

| **Field** | **Description** |
| --- | --- |
| **id** | Identification number |
| **name** | World name |
| **description** | World description |
| **image** | URL of the world's image in the API |

## World_Enemy

This table maps the relationships between enemies and worlds, showing where each enemy can be found.

| **Field** | **Description** |
| --- | --- |
| **id** | Identification number |
| **world_id** | ID from the World table |
| **enemy_id** | ID from the Enemy table |

## World_Boss

This table maps the relationships between bosses and worlds, showing where each boss can be found.

| **Field** | **Description** |
| --- | --- |
| **id** | Identification number |
| **world_id** | ID from the World table |
| **boss_id** | ID from the Boss table |

# **API Endpoints**

Here are the endpoints separated by table.

## characters

### **GET** /characters

**Description:** Returns the list of all characters.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | Search | No | Filters characters by name | ?search=mario |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | No character found |
| 500 | Internal server error |

### **GET** /characters/id

**Description:** Returns a specific character.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Looks for a specific character based on the provided id | characters/1 |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Character not found |
| 500 | Internal server error |

###

### **GET** /characters/id/image

**Description:** Returns the image of a specific character.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Looks for a specific character based on the provided id | characters/1 |
| Query | image | No | Returns the character's image | characters/1/image |

**Example Response (200) OK:**

![Character Image](https://github.com/user-attachments/assets/bbe0c920-d9bc-4aeb-9c11-41376763a5af)

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Character not found |
| 404 | Character has no image |
| 404 | Image not found |
| 500 | Internal server error |

## enemies

### **GET** /enemies

**Description:** Returns the list of all enemies.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | Search | No | Filters enemies by name | ?search=goomba |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | No enemy found |
| 500 | Internal server error |

###

### **GET** /enemies/id

**Description:** Returns a specific enemy.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific enemy based on the provided id | enemies/1 |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Enemy not found |
| 500 | Internal server error |

###

### **GET** /enemies/id/image

**Description:** Returns the image of a specific enemy.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific enemy based on the provided id | enemies/1 |
| Query | image | No | Returns the enemy's image | enemies/1/image |

**Example Response (200) OK:**

![Enemy Image](https://github.com/user-attachments/assets/244e64de-ea26-4d80-81d8-eb0a0e47fce8)

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Enemy not found |
| 404 | Enemy has no image |
| 404 | Image not found |
| 500 | Internal server error |

##

## items

### **GET** /items

**Description:** Returns the list of all items.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | Search | No | Filters items by name | ?search=star |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | No item found |
| 500 | Internal server error |

###

### **GET** /items/id

**Description:** Returns a specific item.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific item based on the provided id | items/1 |

**Example Response (200) OK:**

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

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Item not found |
| 500 | Internal server error |

###

### **GET** /items/id/image

**Description:** Returns the image of a specific item.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific item based on the provided id | items/1 |
| Query | image | No | Returns the item's image | items/1/image |

**Example Response (200) OK:**

![Item Image](https://github.com/user-attachments/assets/dadea274-dc86-4b10-bda9-44b60ee2dc2d)

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Item not found |
| 404 | Item has no image |
| 404 | Image not found |
| 500 | Internal server error |

##

## bosses

### **GET** /bosses

**Description:** Returns the list of all bosses.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | Search | No | Filters bosses by name | ?search=bowser |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | No boss found |
| 500 | Internal server error |

###

### **GET** /bosses/id

**Description:** Returns a specific boss.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific boss based on the provided id | bosses/1 |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Boss not found |
| 500 | Internal server error |

###

### **GET** /bosses/id/image

**Description:** Returns the image of a specific boss.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific boss based on the provided id | bosses/1 |
| Query | image | No | Returns the boss's image | bosses/1/image |

**Example Response (200) OK:**

![Boss Image](https://github.com/user-attachments/assets/eae619f7-f223-45d3-9a3c-e32374a862c1)

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | Boss not found |
| 404 | Boss has no image |
| 404 | Image not found |
| 500 | Internal server error |

##

## world

### **GET** /worlds

**Description:** Returns the list of all worlds.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | Search | No | Filters worlds by name | ?search=yoshi island |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | No world found |
| 500 | Internal server error |

###

### **GET** /worlds/id

**Description:** Returns a specific world.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific world based on the provided id | worlds/1 |

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | World not found |
| 500 | Internal server error |

###

### **GET** /worlds/id/image

**Description:** Returns the image of a specific world.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | id  | Yes | Searches for a specific world based on the provided id | worlds/1 |
| Query | image | No | Returns the world's image | worlds/1/image |

**Example Response (200) OK:**

![World Image](https://github.com/user-attachments/assets/3467eecb-940a-4ece-a6e2-2660818967ed)

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 404 | World not found |
| 404 | World has no image |
| 404 | Image not found |
| 500 | Internal server error |

##

## world_enemy

### **GET** /world_enemy

**Description:** Returns the list of relationships between world and enemy.

**Parameters:**

This endpoint has no parameters.

**Example Response (200) OK:**

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


**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 500 | Internal server error |

###

### **GET** /world_enemy/world_id

**Description:** Returns the enemies of a specific world.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | world_id | Yes | Returns the list of enemies in the specified world | world_enemy/1 |

**Example Response (200) OK:**

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

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 400 | world_id is required |
| 404 | No enemies found for this world |
| 500 | Internal server error |

## world_boss

### **GET** /world_boss

**Description:** Returns the list of relationships between world and boss.

**Parameters:**

This endpoint has no parameters.

**Example Response (200) OK:**

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

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 500 | Internal server error |

###

### **GET** /world_boss/world_id

**Description:** Returns the boss of a specific world.

**Parameters:**

| **Type** | **Name** | **Required** | **Description** | **Example** |
| --- | --- | --- | --- | --- |
| Query | world_id | Yes | Returns the boss of the specified world | world_boss/1 |

**Example Response (200) OK:**

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

**Response Codes:**

| **Code** | **Description** |
| --- | --- |
| 200 | Successful request |
| 400 | world_id is required |
| 404 | No boss found for this world |
| 500 | Internal server error |

###

# **Contact and Additional Information**

Whether you have technical questions, feedback, contributions, or just want to chat about the project, feel free to contact us through the channels below.

📧 e-mail: [adriancotrimdosreis4@gmail.com](mailto:adriancotrimdosreis4@gmail.com)
🐙 github: [AdrianCotrim](https://github.com/AdrianCotrim)
💼 linkedin: [Adrian Cotrim](https://www.linkedin.com/in/adriancotrim/)

# **Source**

I have to thank the Super Mario World wiki! It's where I got my descriptions, information, and sprites for the game:

<https://www.mariowiki.com/Super_Mario_World>

#
