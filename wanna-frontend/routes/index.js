var express = require('express')
var router = express.Router()
var axios = require('axios')
const Hashids = require('hashids/cjs')

const hashids = new Hashids()

router.get('/', function(req, res, next) {
	var pageNumber=0
	if(req.query.page)
		pageNumber=req.query.page
	var postID=''
	if(req.query.postID)
		postID=req.query.postID
	axios.get('http://infernoo.duckdns.org:8000/v1/post/feed?page='+pageNumber,{
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		response.data.forEach(function(entry) {
			entry.id = hashids.encode(entry.id)
		});
		res.render('inspire', { data: response.data, postID: postID })
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/search', function(req, res, next){
	axios.get('http://infernoo.duckdns.org:8000/v1/users/search/'+req.body.usernameString,{
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.render('search', { data: response.data })
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.get('/post', function(req, res, next) {
	const postId = hashids.decode(req.query.id)
	axios.get('http://infernoo.duckdns.org:8000/v1/post/'+postId,{
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		axios.get('http://infernoo.duckdns.org:8000/v1/post/comment?idPost='+postId,{
			headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
		})
		.then(response2 =>{
			response2.data.forEach(function(entry) {
				entry.id = hashids.encode(entry.id)
			});
			response.data.postInfo.id=hashids.encode(response.data.postInfo.id)
			res.render('postPage', { data: response.data, comments: response2.data, username: req.signedCookies.username })
		})
		.catch(error => {
			next()
		})
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/comment', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.post('http://infernoo.duckdns.org:8000/v1/post/comment/', req.body , {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.redirect('/post?id='+idPost+'#commentForm')
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/commentPost', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.post('http://infernoo.duckdns.org:8000/v1/post/comment/', req.body , {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.redirect('/post?id='+idPost+'#commentForm')
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/removeComment', function(req, res, next){
	req.body.idComment = hashids.decode(req.body.idComment)
	axios.delete('http://infernoo.duckdns.org:8000/v1/post/comment/', {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken},
		data: req.body
	})
	.then(response => {
		res.redirect('/post?id='+req.query.idPost+'#commentForm')
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/vote', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.post('http://infernoo.duckdns.org:8000/v1/post/vote/', req.body , {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.redirect('/#'+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/removeVote', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.delete('http://infernoo.duckdns.org:8000/v1/post/vote/', {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken},
		data: req.body
	})
	.then(response => {
		res.redirect('/#'+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/votePost', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.post('http://infernoo.duckdns.org:8000/v1/post/vote/', req.body , {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.redirect('/post?id='+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/removeVotePost', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.delete('http://infernoo.duckdns.org:8000/v1/post/vote/', {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken},
		data: req.body
	})
	.then(response => {
		res.redirect('/post?id='+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/save', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.post('http://infernoo.duckdns.org:8000/v1/post/savedpost/', req.body , {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.redirect('/#'+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/unsave', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.delete('http://infernoo.duckdns.org:8000/v1/post/savedpost/', {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken},
		data: req.body
	})
	.then(response => {
		res.redirect('/#'+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/savePost', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.post('http://infernoo.duckdns.org:8000/v1/post/savedpost/', req.body , {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.redirect('/post?id='+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/unsavePost', function(req, res, next){
	const idPost = req.body.idPost
	req.body.idPost = hashids.decode(req.body.idPost)
	axios.delete('http://infernoo.duckdns.org:8000/v1/post/savedpost/', {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken},
		data: req.body
	})
	.then(response => {
		res.redirect('/post?id='+idPost)
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.get('/myprofile', function(req, res, next) {
	axios.get('http://infernoo.duckdns.org:8000/v1/profile',{
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		response.data.posts.forEach(element => {
			element.postid=hashids.encode(element.postid)
		})
		axios.get('http://infernoo.duckdns.org:8000/v1/profile/savedposts',{
			headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
		})
		.then(response2 =>{
			res.render('myprofile', {data: response.data, posts: response2.data})
		})
		.catch(error => {
			next()
		})
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.get('/profile', function(req, res, next){
	axios.get('http://infernoo.duckdns.org:8000/v1/profile/?username='+req.query.username, {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		response.data.posts.forEach(element => {
			element.postid=hashids.encode(element.postid)
		});
		res.render('profile', {data: response.data})
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.get('/savedPosts', function(req, res, next) {
	axios.get('http://infernoo.duckdns.org:8000/v1/profile',{
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		axios.get('http://infernoo.duckdns.org:8000/v1/profile/savedposts',{
			headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
		})
		.then(response2 =>{
			response2.data.forEach(function(entry) {
				entry.id = hashids.encode(entry.id)
			})
			res.render('savedposts', { data: response.data, posts: response2.data})
		})
		.catch(error => {
			next()
		})
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.get('/followings', function(req, res, next) {
	axios.get('http://infernoo.duckdns.org:8000/v1/profile/followings', {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.render('followings', {data: response.data})
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.get('/followers', function(req, res, next) {
	axios.get('http://infernoo.duckdns.org:8000/v1/profile/followers', {
		headers: {'Authorization': "bearer " + req.signedCookies.accessToken}
	})
	.then(response => {
		res.render('followers', {data: response.data})
	})
	.catch(error => {
		if(error.response && error.response.status==401){
			axios.post('http://infernoo.duckdns.org:8000/v1/auth/refresh-token', {
				refreshToken: req.signedCookies.refreshToken
			})
			.then(response => {
				res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
				res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
				res.redirect(req.url)
			})
			.catch(e => {
				res.redirect('/auth')
			})
		}else{
			res.redirect('/auth')
		}
	})
});

router.post('/makeRegister', function(req, res, next) {
	axios.post('http://infernoo.duckdns.org:8000/v1/auth/register', req.body)
		.then(response => {
			res.redirect('/login')
		})
		.catch(error => {
			if(error.response && error.response.status==400){
				var json=JSON.parse(error.response.config.data)
				var e = 'Utilizador já existente'
				if(error.response.data.name==='SequelizeValidationError'){
					e = 'Password fraca'
				}else if(error.response.data.name==='SequelizeUniqueConstraintError'){
					json.username=''
				}
				res.render('register', { registerData: json, title: e})
			}else{
				res.redirect('/auth')
			}
		})
});

router.post('/makeLogin', function(req, res, next) {
	axios.post('http://infernoo.duckdns.org:8000/v1/auth/login', req.body)
		.then(response => {
			res.cookie('accessToken', response.data.tokens.accessToken, { signed: true })
			res.cookie('refreshToken', response.data.tokens.refreshToken, { signed: true })
			res.cookie('username', response.data.user.username, { signed: true })
			res.redirect('/')
		})
		.catch(error => {
			if(error.response && error.response.status==400){
				if(error.response.data.errors && error.response.data.errors.email==='Email is invalid'){
					res.render('register', { registerData: '', title: 'Email desconhecido'})
				}else{
					res.render('login', { email: JSON.parse(error.response.config.data).email, title: 'Password errada'})
				}
			}else{
				res.redirect('/auth')
			}
		})
});

router.get('/auth', function(req, res, next) {
	res.render('auth')
});

router.get('/login', function(req, res, next) {
	res.render('login', { email: '', title: 'Login' })
});

router.get('/managePosts', function(req, res, next) {
	res.render('managePosts')
});

router.get('/manageUsers', function(req, res, next) {
	res.render('manageUsers')
});

router.get('/logout', function(req, res, next) {
	res.cookie('accessToken', '' , { signed: true })
	res.cookie('refreshToken', '' , { signed: true })
	res.cookie('username', '', { signed: true })
	res.redirect('/')
});

module.exports = router;