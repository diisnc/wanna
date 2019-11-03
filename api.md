# API Utilizador:

## Posts

**Descrição:** Feed com paginate
**Método:** GET
**Rota:** v1/post/feed
**Estado:** []

**Descrição:** Ver post qualquer
**Método:** GET
**Rota:** v1/post/:idPost
**Estado:** []

**Descrição:** Criar Artigo
**Método:** POST
**Rota:** v1/post/createPost
**Estado:** [x]

**Descrição:** Apagar Artigo
**Método:** POST
**Rota:** v1/post/deletePost
**Estado:** []

**Descrição:** Editar Artigo
**Método:** PATCH
**Rota:** v1/post/editPost
**Estado:** []

**Descrição:** Guardar artigo
**Método:** POST
**Rota:** v1/post/save/:idPost
**Estado:** []

**Descrição:** Remover artigo dos guardados
**Método:** POST
**Rota:** v1/post/unsave/:idPost
**Estado:** []

**Descrição:** Pesquisar por utilizador
**Método:** GET
**Rota:** v1/user/search/:username
**Estado:** [x]

**Descrição:** Dar like/dislike
**Método:** POST
**Rota:** v1/post/createUserPost
**Estado:** []
-- mudar a rota e verificar os tipos

**Descrição:** Obter comentários de um post
**Método:** POST
**Rota:** v1/post/getComments
**Estado:** []

**Descrição:** Comentar post
**Método:** POST
**Rota:** v1/post/comment
**Estado:** [x]

**Descrição:** Apagar comentário em post
**Método:** POST
**Rota:** v1/post/deleteComment
**Estado:** []

**Descrição:** Marcar post como indisponível
**Método:** POST
**Rota:** v1/post/markUnavailable
**Estado:** []

## Perfis

**Descrição:** Seguir pessoa
**Método:** POST
**Rota:** v1/profile/follow/:userID
**Estado:** [x]

**Descrição:** Deixar de seguir pessoa
**Método:** POST
**Rota:** v1/profile/unfollow/:userID
**Estado:** [x]

**Descrição:** Ver posts guardados
**Método:** GET
**Rota:** v1/profile/wishlist
**Estado:** []

**Descrição:** Pessoas que o seguem
**Método:** GET
**Rota:** v1/profile/followers
**Estado:** []

**Descrição:** Pessoas que segue
**Método:** GET
**Rota:** v1/profile/followings
**Estado:** []

**Descrição:** Ver perfil pessoal com fotos e infos
**Método:** GET
**Rota:** /v1/profile
**Estado:** []

**Descrição:** Ver perfil alheio com fotos e infos
**Método:** GET
**Rota:** /v1/profile/:username
**Estado:** []

**Descrição:** Ver histórico de compras
**Método:** GET
**Rota:** v1/profile/buyHistory
**Estado:** []

**Descrição:** Ver histórico de vendas
**Método:** GET
**Rota:** v1/profile/salesHistory
**Estado:** []

## Autenticação

**Descrição:** Registar
**Método:** POST
**Rota:** v1/auth/register
**Estado:** [x]

**Descrição:** Login
**Método:** POST
**Rota:** v1/auth/login
**Estado:** [x]

**Descrição:** Logout
**Método:** POST
**Rota:** v1/auth/logout
**Estado:** [x]

## Filtros

**Descrição:** Obter filtros
**Método:** POST
**Rota:** v1/filter/
**Estado:** [x]

**Descrição:** Criar filtro
**Método:** POST
**Rota:** v1/filter/createFilter
**Estado:** [x]

**Descrição:** Pesquisar por filtro
**Método:** POST
**Rota:** v1/filter/searchByFilter
**Estado:** []
-- falta receber o ID

**Descrição:** Apagar filtro
**Método:** POST
**Rota:** v1/filter/deleteFilter
**Estado:** []

Fazer compra
Dar review em compra
TODO

# API ADMIN:

- TODO