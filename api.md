# API Utilizador:

## Posts

- **Descrição:** Feed com paginate
- **Método:** GET
- **Rota:** v1/post/feed
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Ver post qualquer
- **Método:** GET
- **Rota:** v1/post/:idPost
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Criar Artigo
- **Método:** POST
- **Rota:** v1/post/createPost
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Apagar Artigo
- **Método:** POST
- **Rota:** v1/post/deletePost
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Editar Artigo
- **Método:** PATCH
- **Rota:** v1/post/editPost
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Guardar artigo
- **Método:** POST
- **Rota:** v1/post/save/:idPost
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Remover artigo dos guardados
- **Método:** POST
- **Rota:** v1/post/unsave/:idPost
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Pesquisar por utilizador
- **Método:** GET
- **Rota:** v1/user/search/:username
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Dar like/dislike
- **Método:** POST
- **Rota:** v1/post/createUserPost
- **Estado:** :heavy_balot_x:
-- mudar a rota e verificar os tipos

---

- **Descrição:** Obter comentários de um post
- **Método:** POST
- **Rota:** v1/post/getComments
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Comentar post
- **Método:** POST
- **Rota:** v1/post/comment
- **Estado:** :heavy_check_mark:

---

- **Descrição:** Apagar comentário em post
- **Método:** POST
- **Rota:** v1/post/deleteComment
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Marcar post como indisponível
- **Método:** POST
- **Rota:** v1/post/markUnavailable
- **Estado:** :heavy_balot_x:

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

- **Descrição:** Ver posts guardados
- **Método:** GET
- **Rota:** v1/profile/wishlist
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Pessoas que o seguem
- **Método:** GET
- **Rota:** v1/profile/followers
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Pessoas que segue
- **Método:** GET
- **Rota:** v1/profile/followings
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Ver perfil pessoal com fotos e infos
- **Método:** GET
- **Rota:** /v1/profile
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Ver perfil alheio com fotos e infos
- **Método:** GET
- **Rota:** /v1/profile/:username
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Ver histórico de compras
- **Método:** GET
- **Rota:** v1/profile/buyHistory
- **Estado:** :heavy_balot_x:

---

- **Descrição:** Ver histórico de vendas
- **Método:** GET
- **Rota:** v1/profile/salesHistory
- **Estado:** :heavy_balot_x:

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
- **Estado:** :heavy_balot_x:
-- falta receber o ID

---

- **Descrição:** Apagar filtro
- **Método:** POST
- **Rota:** v1/filter/deleteFilter
- **Estado:** :heavy_balot_x:

Fazer compra
Dar review em compra
TODO

# API ADMIN:

- TODO