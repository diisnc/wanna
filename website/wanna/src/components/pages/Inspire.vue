<template>
  <layout-basic>
    <div id="app" class="page">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <div class="card">
              <img class="card-img-top" src="https://cdn.shopify.com/s/files/1/0822/1281/products/tyson_chestnut_4_2400x.jpg?v=1538481133" alt="Card image cap">
              <div class="button-area">
                <a>{{this.likes}}</a>
                <button v-if="this.getlike(post_id) === 0" @click="givelike(post_id)" class="icon icon-reaction icon-like-empty"/>
                <button v-if="this.getlike(post_id) === 1" @click="remvlike(post_id)" class="icon icon-reaction icon-like-full"/>

                <button v-if="this.getdislike(post_id) === 0" @click="givedislike(post_id)" class="icon icon-reaction icon-dislike-empty"/>
                <button v-if="this.getdislike(post_id) === 1" @click="remvdislike(post_id)" class="icon icon-reaction icon-dislike-full"/>

              </div>
              <a href="#" class="btn btn-primary">Go somewhere</a>
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
          <div class="col-sm">


          </div>
        </div>
      </div>
    </div>
  </layout-basic>
</template>

<script>
import router from "../../router"
import LayoutBasic from "../layouts/BottomBar.vue"
export default {
  name: 'Inspire',
  components: {
    LayoutBasic,
  },
  data () {
    return {
      route: this.$router.currentRoute.name,
      like: 0,
      dislike: 1,
      likes: 342
    }
  },
  mounted: function() {
    
    //console.log(this.$router);
  },
  methods: {
    getlike(post_id){
      return this.like;
    },
    getdislike(post_id){
      return this.dislike;
    },
    givelike(post_id){
      this.like=1;
      if(this.dislike==1)
        this.likes=this.likes+2;
      else this.likes=this.likes+1;
      this.dislike=0;
    },
    remvlike(post_id){
      this.like=0;
      this.likes=this.likes-1;
    },
    givedislike(post_id){
      this.dislike=1;
      if(this.like==1)
        this.likes=this.likes-2;
      else this.likes=this.likes-1;
      this.like=0;
    },
    remvdislike(post_id){
      this.dislike=0;
      this.likes=this.likes+1;
    }
  }
}
</script>

<style>
  .icon-reaction {
    display: inline-block;
    background-color: #808080 !important;
    mask-size: cover;
    cursor: pointer;
    margin:10px !important;
  }
  .icon-like-empty {
    mask: url(https://svgur.com/i/G0S.svg);
    width:29px;
    height: 26px;
  }
  .icon-like-empty:hover{
    background-color: #F40056 !important;
  }

  .icon-like-full {
    background-color: #F40056 !important;
    mask: url(https://svgur.com/i/FzP.svg);
    width:29px;
    height: 26px;
  }

  .icon-dislike-empty {
    mask: url(https://svgur.com/i/Fzt.svg);
    width:29px;
    height: 26px;
  }
  .icon-dislike-empty:hover{
    background-color: #4A53FC !important;
  }

  .icon-dislike-full {
    background-color: #4A53FC !important;
    mask: url(https://svgur.com/i/G0c.svg);
    width:29px;
    height: 26px;
  }

</style>
