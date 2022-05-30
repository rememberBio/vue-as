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
                    <span class="desc" v-if="currentRPAttrs.brief" v-html="convertTextArea(currentRPAttrs.brief)"></span>
                    <span class="desc" v-else>a few words about him.</span> 
                    <a class="disabled">Read More >></a>
                </div>
                 <img 
                  v-if="currentRPAttrs.mainImg" 
                  :src="currentRPAttrs.mainImg" alt=""
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
                            :src="require('@/assets/images/logo-form.svg')"
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
                <span class="desc" v-if="currentRPAttrs.brief" v-html="convertTextArea(currentRPAttrs.brief)"></span>
                <span class="desc" v-else>a few words about him.</span> 
                <a class="disabled">Read More >></a>
            </div>
             <img 
                  v-if="currentRPAttrs.mainImg" 
                  :src="currentRPAttrs.mainImg" alt=""
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
      <section class="main-candles-and-flowers" style="display:none;">
        <a class="write-candles-flowers-btn disabled">
            <img :src="require('@/assets/images/createPage/candle.svg')" alt="">
            <div class="right-btn">
                <span v-if="numOfCandles" class="num">{{numOfCandles}}</span>
                <span v-else class="num">000</span>
                <span class="desc">Candles</span>
                <span class="text">have been lit until now</span>
                <div class="main-cf-btn pointer">light a candle</div>
            </div>
        </a>
        <a class="write-candles-flowers-btn disabled">
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
            <p class="text" v-if="currentRPAttrs.about" v-html="convertTextArea(currentRPAttrs.about)"></p>
            <p class="text" v-else >a few more words about him.</p>
            <div class="wrap-dates">
                <a  class="date disabled">
                    <span class="date-desc">Date of birth:</span>
                    <span class="year" v-if="currentRPAttrs.dateOfBirth">{{formatDate(currentRPAttrs.dateOfBirth)}}</span>
                    <span class="year" v-else>00/00/0000</span>
                </a>
                <a class="date disabled">
                    <span class="date-desc">Date of death:</span>
                    <span class="year" v-if="currentRPAttrs.dateOfDeath">{{formatDate(currentRPAttrs.dateOfDeath)}}</span>
                    <span class="year" v-else>00/00/0000</span>
                </a>
            </div>
            <div class="second-part">
                <div class="circle country">
                    <img :src="require('@/assets/images/createPage/country.svg')"  alt="">
                    <h3>Country:</h3>
                    <span>{{currentRPAttrs.country}}</span>
                </div>
                <div class="circle spouse">
                    <template v-if="currentRPAttrs.spouse&&currentRPAttrs.spouse.kind == 'husband'">
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
                            <a  v-if="child.rememberPageLink" :href="child.rememberPageLink">
                                <span>{{child.name}}</span>
                            </a>
                            <span v-else>{{child.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-bottom-link-main">
            <a  class="main-link-main disabled">Read More ></a>
        </div>
        </section>
      <!-- End about -->
      <!-- stories -->
        <section class="main-stories">
            <h2 class="main-heading">Stories</h2>
            <div class="wrap-content" 
                v-if="currentRPAttrs.stories && currentRPAttrs.stories.length > 0 && (currentRPAttrs.stories[0].content || currentRPAttrs.stories[0].date || currentRPAttrs.stories[0].witnessName || currentRPAttrs.stories[0].image) ">
                <a class="wrap-story disabled" 
                v-for="(story, index) in currentRPAttrs.stories.slice(0, 4)"
                :key="index">
                    <div>
                        <p class="short-text" v-html="convertTextArea(story.content)"></p>
                        <span class="read-more">Read ></span>
                    </div>
                </a>
            </div>
            <div class="wrap-content" v-else>
                <a  class="wrap-story disabled" 
                v-for="index in 4" :key="index">
                    <div>
                        <p class="short-text">Write a story about your loved onel</p>
                        <span class="read-more">Read ></span>
                    </div>
                </a>
            </div>
            <div class="wrap-bottom-link-main">
                <a  class="main-link-main disabled">More Stories ></a>
            </div>
        </section>
        <!-- End stories -->
        <!-- Gallery -->
        <section class="main-gallery">
            <h2 class="main-heading">Gallery</h2>
            
            <div class="wrap-content" id="galley-main-slider">
                <VueSlickCarousel v-bind="settings" ref="carousel" :key="carouselKey">
                    <template #prevArrow="">
                        <button class="slide-arrow prev-arrow"><img src="@/assets/images/white-arrow.svg" /></button>
                    </template>
                    <template v-if="getOnlyFilesByType('',currentRPAttrs.gallery.items).length">
                        <a v-for="(image,indexItem) in getOnlyFilesByType('image',currentRPAttrs.gallery.items)" :key="indexItem" class="wrap-image disabled">
                            <img class="lazy" :src="image" alt="" v-if="image">
                        </a>
                        <a class="wrap-video disabled"  v-for="(video,indexItem) in getOnlyFilesByType('video',currentRPAttrs.gallery.items)" :key="indexItem">
                            <video class="lazy" :src="video" v-if="video">
                            </video>
                        </a>
                    </template>
                    <template v-else>
                        <a class="wrap-image empty-image disabled"><img  src="@/assets/images/gray-image.svg" alt=""></a>
                        <a class="wrap-video empty-image disabled"><img  src="@/assets/images/gray-image.svg" alt=""></a>
                        <a class="wrap-image empty-image disabled"><img  src="@/assets/images/gray-image.svg" alt=""></a>
                        <a class="wrap-video empty-image disabled"><img  src="@/assets/images/gray-image.svg" alt=""></a>
                    </template>
                    <template #nextArrow="">
                       <button class="slide-arrow next-arrow"><img src="@/assets/images/white-arrow.svg" /></button>
                    </template>
                </VueSlickCarousel>
              
            </div>
           
            <div class="wrap-bottom-link-main">
                <a class="main-link-main disabled">To The Gallery ></a>
            </div>
        </section>
        <!-- End Gallery -->
        <!-- places -->
        <section class="main-places">
            <h2 class="main-heading">Places Of Commemoration</h2>
            <div class="wrap-content"
            v-if="currentRPAttrs.placesOfCommemoration && currentRPAttrs.placesOfCommemoration.length > 0 && (currentRPAttrs.placesOfCommemoration[0].name || currentRPAttrs.placesOfCommemoration[0].address || currentRPAttrs.placesOfCommemoration[0].shortDesc || currentRPAttrs.placesOfCommemoration[0].textAbout || currentRPAttrs.placesOfCommemoration[0].image) ">
                <a class="wrap-place disabled" 
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
                <a  class="wrap-place disabled" 
                v-for="index in 4" :key="index">
                    <img class="lazy" src="" alt="">
                    <div class="wrap-place-bottom">
                        <span class="name">place</span>
                        <span class="desc">Address Of the Commemoration</span>
                    </div>
                </a>
            </div>
            <div class="wrap-bottom-link-main">
                <a  class="main-link-main disabled">View More ></a>
            </div>
        </section>
        <!-- End places -->
        <!-- grave -->
        <section class="main-tomb">
            <h2 class="main-heading">The Tomb</h2>
            <div class="wrap-content">
                <div class="custom-acf-map"  v-if="currentRPAttrs.grave.address&&currentRPAttrs.grave.address.location.lat  && currentRPAttrs.grave.address.location.lng">
                    <gmaps-map
                    :options="{
                    center: currentRPAttrs.grave.address.location,
                    zoom: 15,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    rotateControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                    }"
                    ></gmaps-map>
                </div>
                <div class="custom-acf-map" v-else>
                </div>
                <a class="wrap-address disabled">
                    <span class="name" v-if="currentRPAttrs.grave.nameOfCemetery">{{ currentRPAttrs.grave.nameOfCemetery }}</span>
                    <span class="name" v-else >Place of the tomb</span>
                    <span class="street" v-if="currentRPAttrs.grave.address.name">{{currentRPAttrs.grave.address.name}}</span>
                    <span class="street" v-else>Street, city, country</span>
                    <div class="pointer">View ></div>
                </a>
            </div>
        </section>
        
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { gmapsMap } from "x5-gmaps";
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

import '~/assets/css/editRememberPage.css';

import { rememberPage } from "~/models/rememberPage";


export default {
  name: "rememberPageDemo",
  computed: {
    currentRPAttrs: function () {
        return this.$store.state.curEditRP.attributes;
    }
  },
  components: { gmapsMap,VueSlickCarousel },
  data() {
    return {
        numOfCandles: 0,
        numOfFlowers: 0,

        //gallery slider
        carouselKey: 0,
        settings: {
            // slidesToShow: 2,
            centerMode: false,
            variableWidth: true,
            autoplay: true,
            arrows: true, 
            responsive: [
            {
                breakpoint: 1100,
                settings: {
                    // slidesToShow: 2
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                },
            }]
        }
    };
  },
  methods: {
      convertTextArea: (value) => {
          if(value)
            return value.replaceAll('\n','<br>');
      },
      formatDate: function (value) {
        if(value)
            return moment(String(value)).format('DD/MM/YYYY');
      },
      getOnlyFilesByType(type,galleryItems) {
        let files = [];
        if(Array.isArray(galleryItems)){
            galleryItems.forEach((item) => {
                let albumes = item.albumes;
                if(Array.isArray(albumes)) {
                    albumes.forEach((album) => {
                        if(type == 'image' || type == '') {
                            let images = album.images;
                            if(Array.isArray(images) && images.length) {
                                files = files.concat(images);
                            }
                        }
                        if(type == 'video' || type == '') {
                            let videos = album.videos;
                            if(Array.isArray(videos) && videos.length) {
                                files = files.concat(videos);
                            }
                        }
                    });
                }
            });
        }
        return files;
      },
      reInitSlider() {
        this.carouselKey += 1;
      }
  },
  created: function () {
    this.$eventBus.on('re-init-gallery-slider', () => this.reInitSlider(),this);
  },
 
};
</script>