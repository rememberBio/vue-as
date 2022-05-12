<template>
  <div id="mainPage">
    <div class="main-container">
        <!-- hero -->
      <section class="hero main-hero flex">
        <div class="wrap-left-hero left-side">
            <div class="desktop-only">
                <div class="text">
                    <h1 class="name" v-if="currentRPAttrs.name">{{currentRPAttrs.name}}</h1>
                    <h1 class="name" v-else>Full Name Of The Deceased</h1>
                    <span class="desc" v-if="currentRPAttrs.brief" v-html="currentRPAttrs.brief"></span>
                    <span class="desc" v-else>a few words about him.</span> 
                    <a href="">Read More >></a>
                </div>
                 <img 
                  v-if="currentRPAttrs.heroImg" 
                  :src="currentRPAttrs.heroImg" alt=""
                  class="main-hero-img desktop-only">
                  <img 
                  v-else
                  :src="require('@/assets/images/empty-image.svg')" 
                  class="main-hero-img desktop-only"
                  alt="">
            </div>
            <div class="form">
                <div class="wrap-form-footer">
                    <span class="text">Love? Want to remember?</span>
                    <form method="post" name="registerForm" id="registerForm" action="">
                        <input type="email" name="email" value="" id="email" placeholder="enter your email" >
                        <button type="submit">
                            <img 
                            :src="require('@/assets/images/logo.svg')"
                            alt=""
                            style="width:100%">
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="mobile-only">
            <div class="text mobile-only">
                <h1 class="name" v-if="currentRPAttrs.name">{{currentRPAttrs.name}}</h1>
                <h1 class="name" v-else>Full Name Of The Deceased</h1>
                <span class="desc" v-if="currentRPAttrs.brief">{{currentRPAttrs.brief}}</span>
                <span class="desc" v-else>a few words about him.</span> 
                <a href="">Read More >></a>
            </div>
             <img 
                  v-if="currentRPAttrs.heroImg" 
                  :src="currentRPAttrs.heroImg" alt=""
                  class="main-hero-img desktop-only">
                  <img 
                  v-else
                  :src="require('@/assets/images/empty-image.svg')" 
                  class="main-hero-img desktop-only"
                  alt="">
        </div>

      </section>
      <!-- END hero -->
      <!-- cf -->
      <section class="main-candles-and-flowers">
        <a href="" class="write-candles-flowers-btn">
            <img :src="require('@/assets/images/createPage/candle.svg')" alt="">
            <div class="right-btn">
                <span v-if="numOfCandles" class="num">{{numOfCandles}}</span>
                <span v-else class="num">000</span>
                <span class="desc">Candles</span>
                <span class="text">have been lit until now</span>
                <div class="main-cf-btn pointer">light a candle</div>
            </div>
        </a>
        <a href="<?php echo $url . '/?tab=candle-and-flowers' ?>" class="write-candles-flowers-btn">
            <img :src="require('@/assets/images/createPage/flower.svg')" alt="">
            <div class="right-btn">
                <span v-if="numOfCandles" class="num">{{numOfFlowers}}</span>
                <span v-else class="num">000</span>
                <span else class="desc">Flowers</span>
                <span class="text">have been Sent until now</span>
                <div class="main-cf-btn">send a flower</div>
            </div>
        </a>
    </section>
      <!-- END cf -->
      <!-- about -->
      <section class="main-about">
        <h2 class="main-heading">About</h2>
        <div class="wrap-content">
            <p class="text" v-html="currentRPAttrs.about"></p>
            <div class="wrap-dates">
                <a href="" class="date">
                    <span class="date-desc">Date of birth:</span>
                    <span class="year">{{formatDate(currentRPAttrs.dateOfBirth)}}</span>
                </a>
                <a href="" class="date">
                    <span class="date-desc">Date of death:</span>
                    <span class="year">{{formatDate(currentRPAttrs.dateOfDeath)}}</span>
                </a>
            </div>
            <div class="second-part">
                <div class="circle country">
                    <img :src="require('@/assets/images/createPage/country.svg')"  alt="">
                    <h3>Country:</h3>
                    <span>{{currentRPAttrs.country}}</span>
                </div>
                <div class="circle spouse">
                    <template v-if="currentRPAttrs.spouse&&currentRPAttrs.spouse.type == 'husband'">
                        <img :src="require('@/assets/images/createPage/husband.svg')" alt="">
                        <h3>Husband:</h3>
                    </template>
                     <template v-else>
                        <img :src="require('@/assets/images/createPage/wife.svg')" alt="">
                        <h3>Wife:</h3>
                    </template>
                    <a v-if="currentRPAttrs.spouse&&currentRPAttrs.spouse.rememberPageLink" :href="currentRPAttrs.spouse.rememberPageLink"><span>{{currentRPAttrs.spouse.name}}</span></a>
                    <span v-else>{{currentRPAttrs.spouse.name}}</span>
                </div>

                <div class="circle parents">
                    <img :src="require('@/assets/images/createPage/parents.svg')" alt="">
                    <h3>Parents:</h3>
                    <div v-if="currentRPAttrs.parents&&currentRPAttrs.parents.length" class="wrap-parents flex">
                        <div v-for="(parent,index) in currentRPAttrs.parents" :key="index">
                            <a v-if="parent.rememberPageLink" :href="parent.rememberPageLink">
                                <span>{{parent.name}}</span>
                            </a>
                            <span v-else>{{parent.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="circle children">
                    <img :src="require('@/assets/images/createPage/children.svg')" alt="">
                    <h3>Children:</h3>
                    <div v-if="currentRPAttrs.children&&currentRPAttrs.children.length" class="wrap-children flex">
                       <div v-for="(child,index) in currentRPAttrs.children" :key="index">
                            <a v-if="child.rememberPageLink" :href="child.rememberPageLink">
                                <span>{{child.name}}</span>
                            </a>
                            <span v-else>{{child.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-bottom-link-main">
            <a href="" class="main-link-main">Read More ></a>
        </div>
        </section>
      <!-- End about -->
      <!-- stories -->
        <section class="main-stories">
            <h2 class="main-heading">Stories</h2>
            <div class="wrap-content" 
                v-if="currentRPAttrs.stories && currentRPAttrs.stories.length > 0 && (currentRPAttrs.stories[0].content || currentRPAttrs.stories[0].date || currentRPAttrs.stories[0].witnessName) ">
                <a href="" class="wrap-story" 
                v-for="(story, index) in currentRPAttrs.stories.slice(0, 4)"
                :key="index">
                    <div>
                        <p class="short-text" v-html="story.content"></p>
                        <span class="read-more">Read ></span>
                    </div>
                </a>
            </div>
            <div class="wrap-content" v-else>
                <a href="" class="wrap-story" 
                v-for="index in 4" :key="index">
                    <div>
                        <p class="short-text">Write a story about your loved onel</p>
                        <span class="read-more">Read ></span>
                    </div>
                </a>
            </div>
            <div class="wrap-bottom-link-main">
                <a href="" class="main-link-main">More Stories ></a>
            </div>
        </section>
        <!-- End stories -->
        <!-- places -->
        <section class="main-places">
            <h2 class="main-heading">Places Of Commemoration</h2>
            <div class="wrap-content"
            v-if="currentRPAttrs.placesOfCommemoration && currentRPAttrs.placesOfCommemoration.length > 0 && (currentRPAttrs.placesOfCommemoration[0].name || currentRPAttrs.placesOfCommemoration[0].address || currentRPAttrs.placesOfCommemoration[0].shortDesc || currentRPAttrs.placesOfCommemoration[0].textAbout) ">
                <a href="" class="wrap-place" 
                v-for="(place, index) in currentRPAttrs.placesOfCommemoration.slice(0, 4)"
                :class="{ notHaveImage:!place.image }"
                :key="index">
                    <img v-if="place.image" class="lazy" :src="place.image" alt="">
                    <div class="wrap-place-bottom">
                        <span class="name">{{place.name}}</span>
                        <span class="desc">{{place.address}}</span>
                    </div>
                </a>
            </div>
             <div class="wrap-content empty-places" v-else>
                <a href="" class="wrap-place" 
                v-for="index in 4" :key="index">
                    <img class="lazy" src="" alt="">
                    <div class="wrap-place-bottom">
                        <span class="name">place</span>
                        <span class="desc">Address Of the Commemoration</span>
                    </div>
                </a>
            </div>
            <div class="wrap-bottom-link-main">
                <a href="" class="main-link-main">View More ></a>
            </div>
        </section>
        <!-- End places -->
        <!-- grave -->
        <section class="main-tomb">
            <h2 class="main-heading">The Tomb</h2>
            <div class="wrap-content">
                <div class="custom-acf-map"  v-if="currentRPAttrs.grave.address.location.lat  && currentRPAttrs.grave.address.location.lng">
                    <GMapMap
                      :center="currentRPAttrs.grave.address.location"
                      :zoom="15"
                      :map-type-id="roadmap"
                    />
                </div>
                <div class="custom-acf-map" v-else>
                </div>
                <a href="" class="wrap-address">
                    <span class="name" v-if="currentRPAttrs.grave.nameOfCemetery">{{ currentRPAttrs.grave.nameOfCemetery }}</span>
                    <span class="name" v-else >Place of the tomb</span>
                    <span class="street" v-if="currentRPAttrs.grave.address.name">{{currentRPAttrs.grave.address.name}}</span>
                    <span class="street" v-else>Street, city, country</span>
                    <div class="pointer">View ></div>
                </a>
            </div>
        </section>
        <!-- End grave -->
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import '@/assets/css/editRememberPage.css';


export default {
  name: "remeberPageDemo",
  data() {
    return {
        numOfCandles: 0,
        numOfFlowers: 0
    };
  },
  methods: {
      formatDate: function (value) {    
        if(value)
            return moment(String(value)).format('DD/MM/YYYY');
      }
  },
  created: function () {
  },
  computed: {
    currentRPAttrs: function () {
     return this.$store.state.curEditRP.attributes
    }
  },
};
</script>