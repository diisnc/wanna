# API Utilizador:

## Posts

- **Descrição:** Feed com paginate
- **Método:** GET
- **Rota:** v1/post/feed?page=
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Ver post qualquer
- **Método:** GET
- **Rota:** v1/post/:idPost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Criar Artigo
- **Método:** POST
- **Rota:** v1/post/createPost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Apagar Artigo
- **Método:** DELETE
- **Rota:** v1/post/:idPost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Editar Artigo
- **Método:** PATCH
- **Rota:** v1/post/:idPost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Guardar artigo
- **Método:** POST
- **Rota:** v1/post/savedpost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Remover artigo dos guardados
- **Método:** DELETE
- **Rota:** v1/post/savedpost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Pesquisar por utilizador
- **Método:** GET
- **Rota:** v1/user/search/:username
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Dar like/dislike
- **Método:** POST
- **Rota:** v1/post/vote
- **Estado:** :heavy_check_mark:

---
- **Descrição:** Remover like/dislike
- **Método:** DELETE
- **Rota:** v1/post/vote
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Obter comentários de um post
- **Método:** GET
- **Rota:** v1/post/comment
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Comentar post
- **Método:** POST
- **Rota:** v1/post/comment
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Apagar comentário em post
- **Método:** DELETE
- **Rota:** v1/post/comment
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Marcar post como indisponível
- **Método:** POST
- **Rota:** v1/post/:idPost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Posts da parte de cima do combine
- **Método:** GET
- **Rota:** v1/post/upperitems
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Posts da parte de baixo do combine
- **Método:** GET
- **Rota:** v1/post/loweritems
- **Estado:** :heavy_check_mark:

## Perfis

- **Descrição:** Seguir pessoa
- **Método:** POST
- **Rota:** v1/profile/follow/:userID
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Deixar de seguir pessoa
- **Método:** POST
- **Rota:** v1/profile/unfollow/:userID
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Ver lista de artigos guardados
- **Método:** GET
- **Rota:** v1/profile/savedposts
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Pessoas que o seguem
- **Método:** GET
- **Rota:** v1/profile/followers
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Pessoas que segue
- **Método:** GET
- **Rota:** v1/profile/followings
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Ver perfil pessoal com fotos e infos
- **Método:** GET
- **Rota:** /v1/profile
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Ver perfil alheio com fotos e infos
- **Método:** GET
- **Rota:** /v1/profile/?username=
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Ver histórico de compras
- **Método:** GET
- **Rota:** v1/profile/buyHistory
- **Estado:** &#9746;

---

- **Descrição:** Ver histórico de vendas
- **Método:** GET
- **Rota:** v1/profile/salesHistory
- **Estado:** &#9746;

## Autenticação

- **Descrição:** Registar
- **Método:** POST
- **Rota:** v1/auth/register
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Login
- **Método:** POST
- **Rota:** v1/auth/login
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Logout
- **Método:** POST
- **Rota:** v1/auth/logout
- **Estado:** :heavy_check_mark:

## Filtros

- **Descrição:** Obter filtros
- **Método:** POST
- **Rota:** v1/filter/
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Criar filtro
- **Método:** POST
- **Rota:** v1/filter/createFilter
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Pesquisar por filtro
- **Método:** POST
- **Rota:** v1/filter/searchByFilter
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Obter um determinado filtro
- **Método:** GET
- **Rota:** v1/filter/:idFilter
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Apagar filtro
- **Método:** DELETE
- **Rota:** v1/filter/:idFilter
- **Estado:** :heavy_check_mark:


Fazer compra
Dar review em compra
TODO

# API ADMIN:

- TODO
