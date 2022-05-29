<template>
  <div id="create-page-sidebar" class="main-container">
    <div class="main-content">
      <form methode="post" ref="createForm">
        <!-- Main -->
        <div class="wrap-field-groups" :class="{ active: showMainFieldGroups }">
          <span class="field-groups-name" @click="toggleGroupsWrapper('Main')"
            >Main <span class="arrow flex"><img :src="require('@/assets/images/createPage/arrow-bar-down.svg')"  alt=""></span></span
          >
          <div class="field-groups-content">
            <!-- main image -->
            <div class="wrap-field">
              <label class="field-label"> Main Image</label>
              <label class="small-small-field-label upload-image" for="main-image"> 
                upload main image
                <div class="no-image" v-if="!mainImg">
                    <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                </div>
              </label>
              <div class="image-container">
                <div  v-if="mainImg" class="images">
                  <div class="background-image" :style="'background-image:url(' + customEncodeUrl(mainImg) +  ')'"></div>
                  <a
                  href=""
                  class="remove"
                  @click="removeFileFunc($event,mainImg,'mainImg','image')"
                  ><img :src="require('@/assets/images/blue-x.svg')" /></a>
                </div>
              </div>
              <div class="wrap-input">
                <input
                  v-if="!mainImg"
                  type="file"
                  id="main-image"
                  name="main-image"
                  placeholder=""
                  accept="image/*"
                  @change="(event) => uploadFiles(event,'mainImg','image')"
                />
                <span class="error-message" v-if="errorUploadMainImage">
                  {{errorUploadMainImage}}
                </span>
                <span class="error-message" v-if="!mainImg">
                  This field is required
                </span>
              </div>
            </div>
            <!-- name -->
            <div class="wrap-field">
              <label class="field-label"> Name</label>
              <div class="wrap-input">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name Of The Deceased"
                  v-model="name"
                  @input="changerememberPageState('name', $event)"
                />
              </div>
              <span class="error-message" v-if="!name">
                This field is required
              </span>
            </div>
            <!-- brief -->
            <div class="wrap-field">
              <label class="field-label"> Brief </label>
              <div class="wrap-input">
                <textarea
                 @input="changerememberPageState('brief', $event)"
                 name="brief" 
                 id="brief" 
                 maxlength="250" 
                 cols="30" 
                 rows="6" 
                 v-model="brief"
                 placeholder="a few words about him."> 
                </textarea>
              </div>
              <span class="field-small-text">
                Up to 250 characters
              </span>
            </div>
            <!-- about -->
            <div class="wrap-field">
              <label class="field-label"> About </label>
              <div class="wrap-input">
                <textarea
                 @input="changerememberPageState('about', $event)"
                 name="about" 
                 id="about" 
                 class="rp-scroll"
                 cols="30" 
                 rows="19" 
                 v-model="about"
                 placeholder="more about him.."> 
                </textarea>
              </div>
            </div>
            <!-- dateOfBirth -->
            <div class="wrap-field">
              <label class="field-label"> Date Of Birth:</label>
              <div class="wrap-input">
                <input
                  type="date"
                  name="dateOfBirth"
                  :class="{'color-black' : dateOfBirth}"
                  v-model="dateOfBirth"
                  @change="changerememberPageState('dateOfBirth', $event)"
                />
              </div>
            </div>
            <!-- dateOfDeath -->
            <div class="wrap-field">
              <label class="field-label"> Date Of Death:</label>
              <div class="wrap-input">
                <input
                  type="date"
                  :class="{'color-black' : dateOfDeath}"
                  name="dateOfDeath"
                  v-model="dateOfDeath"
                  @change="changerememberPageState('dateOfDeath', $event)"
                />
              </div>
            </div>
            <!-- Country -->
            <div class="wrap-field">
              <label class="field-label"> Country:</label>
              <div class="wrap-input">
                <input
                  type="text"
                  name="country"
                  v-model="country"
                  @input="changerememberPageState('country', $event)"
                />
              </div>
            </div>
            <!-- Spouse -->
            <div class="wrap-field-group">
              <!-- Spouse -->
              <label class="field-label"> Wife/ Husband </label>
              <div class="wrap-field">
                <div class="wrap-input wrap-select">
                  <select
                    name="spouse"
                    id="spouse"
                    v-model="spouse.kind"
                    @change="changerememberPageState('spouse', $event)"
                  >
                    <option value="">Select</option>
                    <option value="wife">Wife</option>
                    <option value="husband">Husband</option>
                  </select>
                </div>
              </div>
              <div class="wrap-field">
                <div class="wrap-input">
                  <input
                    type="text"
                    name="spouse-name"
                    placeholder="Name"
                    v-model="spouse.name"
                    @input="changerememberPageState('spouse', $event)"
                  />
                </div>
              </div>
              <!-- <div class="wrap-field">
                <div class="wrap-input rp-link">
                  <input
                    type="text"
                    name="spouse-link"
                    placeholder="Link to Remember page"
                    v-model="spouse.rememberPageLink"
                    @input="changerememberPageState('spouse', $event)"
                  />
                </div>
              </div> -->
            </div>
            <!-- parents -->
            <div class="wrap-field-group">
              <!-- parents 1 -->
              <label class="field-label"> Parents:</label>
              <div class="wrap-field">
                <div class="wrap-input">
                  <input
                    type="text"
                    name="parent-1-name"
                    placeholder="Father"
                    v-model="parents[0].name"
                    @input="changerememberPageState('parents', $event)"
                  />
                </div>
              </div>
              <!-- <div class="wrap-field">
                <div class="wrap-input rp-link">
                  <input
                    type="text"
                    name="parent-1-link"
                    placeholder="Link to Remember page"
                    v-model="parents[0].rememberPageLink"
                    @input="changerememberPageState('parents', $event)"
                  />
                </div>
              </div> -->
              <div class="fields-devider"></div>
                <!-- parents 2 -->
              <div class="wrap-field">
                <div class="wrap-input">
                  <input
                    type="text"
                    name="parent-2-name"
                    placeholder="Mother"
                    v-model="parents[1].name"
                    @input="changerememberPageState('parents', $event)"
                  />
                </div>
              </div>
              <!-- <div class="wrap-field">
                <div class="wrap-input rp-link">
                  <input
                    type="text"
                    name="parent-2-link"
                    placeholder="Link to Remember page"
                    v-model="parents[1].rememberPageLink"
                    @input="changerememberPageState('parents', $event)"
                  />
                </div>
              </div> -->
            </div>
            <!-- children -->
            <div class="wrap-field-group">
              <label class="field-label"> Children:</label>
              <div
                class="wrap-loop"
                v-for="(child, index) in children"
                :key="index"
              >
                <label class="field-label" :class="{ 'wrap-remove': index > 0}">
                  Child {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('children', index, $event)"
                    ><img :src="require('@/assets/images/blue-x.svg')" /></a
                  >
                </label>
                <div class="wrap-field">
                  <div class="wrap-input">
                    <input
                      type="text"
                      name="children-name"
                      placeholder="Child's Name"
                      v-model="children[index].name"
                      @input="changerememberPageState('children', $event)"
                    />
                  </div>
                </div>
                <!-- <div class="wrap-field">
                  <div class="wrap-input rp-link">
                    <input
                      type="text"
                      name="children-link"
                      placeholder="Link To Rememeber Page"
                      v-model="children[index].rememberPageLink"
                      @input="changerememberPageState('children', $event)"
                    />
                  </div>
                </div> -->
              </div>
              <div class="wrap-add-button">
                <a href="" @click="addElement('children', $event)">Add Child</a>
              </div>
            </div>
          </div>
        </div>
        <!-- About -->
        <div
          class="wrap-field-groups"
          :class="{ active: showAboutFieldGroups }"
        >
          <span class="field-groups-name" @click="toggleGroupsWrapper('About')"
            >About <span class="arrow flex"><img :src="require('@/assets/images/createPage/arrow-bar-down.svg')"  alt=""></span></span
          >
          <div class="field-groups-content">
            <div class="wrap-field-group">
              <label class="field-label"> Timeline</label>
              <div
                class="wrap-loop"
                v-for="(time, index) in timeline"
                :key="index"
              >
                <label for="" class="field-label" :class="{ 'wrap-remove': index > 0}">
                  Event {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('timeline', index, $event)"
                    ><img :src="require('@/assets/images/blue-x.svg')" /></a
                  >
                </label>
                <div class="wrap-field">
                  <label for="" class="small-field-label">Event Date</label>
                  <div class="wrap-input">
                    <input
                      type="number"
                      name="timeline-date"
                      placeholder="0000"
                      v-model="timeline[index].year"
                      @input="changerememberPageState('timeline', $event)"
                    />
                  </div>
                </div>
                <div
                class="wrap-field">
                  <label for="" class="small-field-label">Event Description</label>
                  <div class="wrap-input">
                    <input
                      type="text"
                      name="timeline-desc"
                      placeholder=""
                      v-model="timeline[index].shortDescription"
                      @input="changerememberPageState('timeline', $event)"
                    />
                  </div>
                </div>
              </div>
              <div class="wrap-add-button">
                <a href="" @click="addElement('timeline', $event)">Add Event</a>
              </div>
            </div>
          </div>
        </div>
        <!-- Stories -->
        <div
          class="wrap-field-groups"
          :class="{ active: showStoriesFieldGroups }"
        >
          <span
            class="field-groups-name"
            @click="toggleGroupsWrapper('Stories')"
            >Stories <span class="arrow flex"><img :src="require('@/assets/images/createPage/arrow-bar-down.svg')"  alt=""></span></span
          >
          <div class="field-groups-content">
            <div class="wrap-field-group">
              <div
                class="wrap-loop"
                v-for="(story, index) in stories"
                :key="index"
              >
               <label for="" class="field-label" :class="{ 'wrap-remove': index > 0}">
                      Story {{ index + 1 }}
                      <a
                        href=""
                        v-if="index > 0"
                        class="remove"
                        @click="removeEl('stories', index, $event)"
                        ><img :src="require('@/assets/images/blue-x.svg')" /></a
                      >
                </label>
                <div class="wrap-field">
                  <div class="wrap-input">
                    <textarea
                      @input="changerememberPageState('stories', $event)"
                      :data-index="index"
                      name="story-text" 
                      class="rp-scroll"
                      id="story-text"
                      cols="30" 
                      rows="10" 
                      v-model="stories[index].content"
                      placeholder="The Story"> 
                    </textarea>
                  </div>
                </div>
                <div class="wrap-field">
                  <div class="wrap-input">
                    <label for="">date of the story</label>
                    <input
                      type="date"
                      name="story-date"
                      :class="{'color-black' : story.date}"
                      placeholder=""
                      :data-index="index"
                      v-model="stories[index].date"
                      @input="changerememberPageState('stories', $event)"
                    />
                  </div>
                </div>
                <div class="wrap-field">
                  <label class="small-small-field-label upload-image" :for="'story-image' + index">add image
                    <div class="no-image" v-if="!story.image">
                        <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                    </div>
                  </label>
                  <div class="image-container">
                      <div v-if="story.image" class="images">
                        <div class="background-image" :style="'background-image:url(' + customEncodeUrl(story.image) +  ')'"></div>
                        <a
                        href=""
                        class="remove"
                        @click="removeFileFunc($event,story.image,'stories','image',index)"
                        ><img :src="require('@/assets/images/blue-x.svg')" /></a>
                      </div>
                  </div>
                  <div class="wrap-input">
                    <input
                      v-if="!story.image"
                      type="file"
                      :id="'story-image' + index"
                      accept="image/*"
                      name="story-image"
                      placeholder=""
                      :data-index="index"
                      @change="(event) => uploadFiles(event,'stories','image',index)"                    
                    />
                    <span class="error-message" v-if="errorUploadStoryImage && errorUploadStoryImage.index == index">
                      {{errorUploadStoryImage.message}}
                    </span>
                  </div>
                </div>
                <div class="wrap-field">
                  <div class="wrap-input">
                    <label for="">witness name</label>
                    <input
                      type="text"
                      name="story-name"
                      placeholder="Name"
                      :data-index="index"
                      v-model="stories[index].witnessName"
                      @input="changerememberPageState('stories', $event)"
                    />
                  </div>
                </div>
              </div>
              <div class="wrap-add-button">
                <a href="" @click="addElement('stories', $event)"
                  >Add A Story</a
                >
              </div>
            </div>
          </div>
        </div>
        <!-- gallery-->
        <div
          class="wrap-field-groups"
          :class="{ active: showGalleryFieldGroups }"
        >
          <span
            class="field-groups-name"
            @click="toggleGroupsWrapper('Gallery')"
            >Gallery <span class="arrow flex"><img :src="require('@/assets/images/createPage/arrow-bar-down.svg')"  alt=""></span></span
          >
          <div class="field-groups-content">
            <div class="wrap-field-group">
              <div
                class="wrap-loop"
                v-for="(item, index) in gallery.items"
                :key="index"
              >
                <label for="" class="field-label" :class="{ 'wrap-remove': index > 0}">
                  Gallery Item {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('gallery', index, $event)"
                    ><img :src="require('@/assets/images/blue-x.svg')" /></a
                  >
                </label>
                <div class="wrap-field">
                  <label class="small-field-label" for="">Start Year Of Range</label>
                  <div class="wrap-input">
                    <input
                      type="number"
                      name="gallery-item-start-year"
                      placeholder="0000"
                      :data-index="index"
                      v-model="gallery.items[index].startYear"
                      @input="changerememberPageState('gallery', $event)"
                    />
                  </div>
                </div>
                <div class="wrap-field">
                  <label for="" class="small-field-label">End Year Of Range</label>
                  <div class="wrap-input">
                    <input
                      type="number"
                      name="gallery-item-end-year"
                      placeholder="0000"
                      :data-index="index"
                      v-model="gallery.items[index].endYear"
                      @input="changerememberPageState('gallery', $event)"
                    />
                  </div>
                </div>
                <div
                class="wrap-loop"
                v-for="(album, indexAl) in item.albumes"
                :key="indexAl"
                >
                  <label for="" class="field-label" :class="{ 'wrap-remove': indexAl > 0}">
                    Albume {{ indexAl + 1 }}
                    <a
                      href=""
                      v-if="indexAl > 0"
                      class="remove"
                      @click="removeEl('album-gallery', indexAl, $event,index)"
                      ><img :src="require('@/assets/images/blue-x.svg')" /></a
                    >
                  </label>
                  <div class="wrap-field">
                    <label for="" class="small-field-label">Album's Name</label>
                    <div class="wrap-input">
                      <input
                        type="text"
                        name="gallery-album-name"
                        placeholder="Type Here"
                        :data-index="indexAl"
                        v-model="gallery.items[index].albumes[indexAl].name"
                        @input="changerememberPageState('gallery', $event)"
                      />
                    </div>
                  </div>
                  <div class="wrap-field">
                      <label for="" class="small-field-label">Start Year Of Albume</label>
                      <div class="wrap-input">
                        <input
                          type="number"
                          name="gallery-album-start-year"
                          placeholder="0000"
                          :data-index="indexAl"
                          v-model="gallery.items[index].albumes[indexAl].startYear"
                          @input="changerememberPageState('gallery', $event)"
                        />
                      </div>
                  </div>
                  <div class="wrap-field">
                      <label class="small-field-label" for="">End Year Of Albume</label>
                      <div class="wrap-input">
                        <input
                          type="number"
                          name="gallery-album-end-year"
                          placeholder="0000"
                          :data-index="indexAl"
                          v-model="gallery.items[index].albumes[indexAl].endYear"
                          @input="changerememberPageState('gallery', $event)"
                        />
                      </div>
                  </div>
                  <div class="wrap-field upload-images">
                    <label v-if="album.images&&album.images.length&&album.images[0]" class="small-small-field-label upload-video"> upload images </label>
                    <span class="error-message multiply-upload-error-message" v-if="errorUploadGalleryImage && errorUploadGalleryImage.index == index && errorUploadGalleryImage.albumIndex == indexAl && errorUploadGalleryImage.type == 'image'">
                      {{errorUploadGalleryImage.message}}
                    </span>
                    <div v-if="album.images&&album.images.length&&album.images[0]" class="image-container multiply-images">
                      <div class="images" v-for="(image, indexAlImg) in album.images"
                         :key="indexAlImg">
                        <div class="background-image" v-if="image" :style="'background-image:url(' + customEncodeUrl(image) +  ')'"></div>
                          <a
                          v-if="image"
                          href=""
                          class="remove"
                          @click="removeFileFunc($event,image,'gallery','image',indexAlImg,index,indexAl)"
                          ><img :src="require('@/assets/images/blue-x.svg')" /></a>
                      </div>
                    </div>
                    <label v-else class="small-small-field-label upload-image" :for="'album-image-' + indexAl + '-' + index">
                      upload images 
                      <div class="no-image full-width">
                          <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                      </div>
                    </label>
                    <label v-if="album.images&&album.images.length&&album.images[0]" class="small-field-label upload-video" :for="'album-image-' + indexAl + '-' + index">
                      <div class="wrap-add-button add-file">
                      <a>
                        Upload more images</a
                      >
                    </div>
                    </label>
                    <div class="wrap-input">
                      <input
                        :id="'album-image-' + indexAl + '-' + index"
                        type="file"
                        name="album-images"
                        placeholder=""
                        multiple
                        accept="image/*"
                        @change="(event) => uploadFiles(event,'gallery','image',index,indexAl)"
                      />
                    </div>
                  </div>
                  <div class="wrap-field upload-videos">
                    <label v-if="album.videos&&album.videos.length&&(album.videos[0] || (album.videos.length > 1 &&album.videos[1]))" class="small-small-field-label upload-video"> upload videos </label>
                    <span class="error-message multiply-upload-error-message" v-if="errorUploadGalleryImage && errorUploadGalleryImage.index == index && errorUploadGalleryImage.albumIndex == indexAl && errorUploadGalleryImage.type== 'video'">
                      {{errorUploadGalleryImage.message}}
                    </span>
                    <div v-if="album.videos&&album.videos.length&&(album.videos[0] || (album.videos.length > 1 &&album.videos[1]))" class="image-container multiply-images">
                      <div class="videos"  v-for="(video, indexAlVideo) in album.videos"
                              :key="indexAlVideo">
                        <video  v-if="video" :src="video">
                        </video>
                        <a
                          href=""
                          v-if="video"
                          class="remove"
                          @click="removeFileFunc($event,video,'gallery','video',indexAlVideo,index,indexAl)"
                          ><img :src="require('@/assets/images/blue-x.svg')" /></a>
                      </div>
                    </div>
                    <label  v-else class="small-small-field-label upload-video" :for="'album-video-' + indexAl + '-' + index"> upload videos 
                      <div class="no-image full-width" >
                          <img :src="require('@/assets/images/createPage/uploads_videos.svg')"  alt="">
                      </div>
                    </label>
                    <label v-if="album.videos&&album.videos.length&&(album.videos[0] || (album.videos.length > 1 &&album.videos[1]))" class="small-field-label upload-video" :for="'album-video-' + indexAl + '-' + index">
                       <div class="wrap-add-button add-file">
                        <a>
                          Upload more videos</a
                        >
                      </div>
                    </label>
                    
                    <div class="wrap-input">
                      <input
                        type="file"
                        :id="'album-video-' + indexAl + '-' + index"
                        name="album-videos"
                        placeholder=""
                        multiple
                        accept="video/*"
                        @change="(event) => uploadFiles(event,'gallery','video',index,indexAl)"
                      />
                     
                    </div>
                  </div>
                </div>
                <div class="wrap-add-button">
                      <a href="" @click="addElement('gallery-album', $event,index)"
                        >Add Albume In This Gallery</a
                      >
                </div>
              </div>
              <div class="wrap-add-button">
                <a href="" @click="addElement('gallery', $event)"
                  >Add New Gallery</a
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Places -->
        <div
          class="wrap-field-groups"
          :class="{ active: showPlacesFieldGroups }"
        >
          <span class="field-groups-name" @click="toggleGroupsWrapper('Places')"
            >Places Of Commemoration <span class="arrow flex"><img :src="require('@/assets/images/createPage/arrow-bar-down.svg')"  alt=""></span></span
          >
          <div class="field-groups-content">
            <div class="wrap-field-group">
              <div
                class="wrap-loop"
                v-for="(place, index) in placesOfCommemoration"
                :key="index"
              >
                <label for="" class="field-label" :class="{ 'wrap-remove': index > 0}">
                  Place {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('placesOfCommemoration', index, $event)"
                    ><img :src="require('@/assets/images/blue-x.svg')" /></a
                  >
                </label>
                <div class="wrap-field">
                  <label class="field-label"> Image Of Place</label>
                  <label class="small-small-field-label upload-image" :for="'place-image' + index">
                    upload image 
                    <div class="no-image" v-if="!place.image">
                        <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                    </div>
                       
                  </label>
                  <div class="image-container">
                    <div v-if="place.image" class="images">
                      <div class="background-image" :style="'background-image:url(' + customEncodeUrl(place.image) + ')'"></div>
                      <a
                        href=""
                        class="remove"
                        @click="removeFileFunc($event,place.image,'placesOfCommemoration','image',index)"
                        ><img :src="require('@/assets/images/blue-x.svg')" /></a>
                    </div>
                  </div>
                  <div class="wrap-input">
                    <input
                      type="file"
                      :id="'place-image' + index"
                      name="place-image"
                      accept="image/*"
                      placeholder=""
                      @change="(event) => uploadFiles(event,'placesOfCommemoration','image',index)"
                    />
                     <span class="error-message" v-if="errorUploadPlaceImage && errorUploadPlaceImage.index == index">
                      {{errorUploadPlaceImage.message}}
                    </span>
                  </div>
                </div>
                <div class="wrap-field">
                  <label class="field-label" for="">Name Of The Place</label>
                  <div class="wrap-input">
                    <input
                      type="text"
                      name="place-name"
                      placeholder="Type Here"
                      :data-index="index"
                      v-model="placesOfCommemoration[index].name"
                      @input="
                        changerememberPageState('placesOfCommemoration', $event)
                      "
                    />
                  </div>
                </div>
                <div class="wrap-field">
                  <label class="field-label" for="">Address Of The Place</label>
                  <div class="wrap-input">
                    <input
                      type="text"
                      name="place-address"
                      placeholder="Type Here"
                      :data-index="index"
                      v-model="placesOfCommemoration[index].address"
                      @input="
                        changerememberPageState('placesOfCommemoration', $event)
                      "
                    />
                  </div>
                </div>
                <div class="wrap-field">
                  <label for="" class="field-label">Text About The Connection To This Place</label>
                  <div class="wrap-input">
                    <textarea
                      @input="changerememberPageState('placesOfCommemoration', $event)"
                      name="place-text" 
                      id="place-text" 
                      class="rp-scroll"
                      :data-index="index"
                      cols="30" 
                      rows="5" 
                      v-model="placesOfCommemoration[index].textAbout"
                      placeholder="Type Here"> 
                    </textarea>
                  </div>
                </div>
                <div class="wrap-field">
                  <label class="field-label" for="">Short Description Of Place</label>
                  <div class="wrap-input">
                    <input
                      type="text"
                      name="place-short-desc"
                      placeholder="Type Here"
                      :data-index="index"
                      v-model="placesOfCommemoration[index].shortDesc"
                      @input="
                        changerememberPageState('placesOfCommemoration', $event)
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="wrap-add-button">
                <a href="" @click="addElement('placesOfCommemoration', $event)"
                  >Add New place</a
                >
              </div>
            </div>
          </div>
        </div>
        <!-- Grave -->
        <div
          class="wrap-field-groups"
          :class="{ active: showGraveFieldGroups }"
        >
          <span class="field-groups-name" @click="toggleGroupsWrapper('Grave')"
            >The grave <span class="arrow flex"><img :src="require('@/assets/images/createPage/arrow-bar-down.svg')"  alt=""></span></span
          >
          <div class="field-groups-content">
            <div class="wrap-field-group">
              <div class="wrap-field upload-images">
                <label class="field-label"> Images Gallery Of The Grave</label>
                <label v-if="grave.images&&grave.images.length" class="small-small-field-label"> upload images to gallery </label>
                <div v-if="grave.images&&grave.images.length" class="image-container multiply-images">
                  <div class="images" v-for="(image, indexImg) in grave.images"
                  :key="indexImg">
                    <div class="background-image" v-if="image" :style="'background-image:url(' + customEncodeUrl(image) +  ')'"></div>
                    <a
                    v-if="image"
                    href=""
                    class="remove"
                    @click="removeFileFunc($event,image,'grave','image',indexImg)"
                    ><img :src="require('@/assets/images/blue-x.svg')" /></a>
                  </div>
                </div>
                <label v-else class="small-small-field-label upload-image" for="grave-images">
                  upload images to gallery 
                  <div class="no-image full-width">
                      <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                  </div>
                </label>
                <label for="grave-images"  v-if="grave.images&&grave.images.length" class='small-field-label'>
                  <div class="wrap-add-button add-file">
                    <a>
                      Upload more images</a
                    >
                  </div>
                </label>
                <div class="wrap-input">
                  <input
                    type="file"
                    id="grave-images"
                    name="grave-image"
                    placeholder=""
                    multiple
                    accept="image/*"
                    @change="(event) => uploadFiles(event,'grave','image')"
                  />
                  <span class="error-message" v-if="errorUploadGraveImage">
                    {{errorUploadGraveImage.message}}
                  </span>
                </div>
              </div>
              <div class="wrap-field">
                <label class="field-label"> The Name Of A Cemetery</label>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="grave-name"
                    placeholder="Type Here"
                    v-model="grave.nameOfCemetery"
                    @input="changerememberPageState('grave', $event)"
                  />
                </div>
              </div>
              <div class="wrap-field">
                <label class="field-label"> Grave Location </label>
                <input v-if="!this.grave.address.name" ref="autocomplete"  type="text" id="autocomplete" placeholder="Type And Select" />
                <input v-else ref="autocomplete" type="text" id="autocomplete" :placeholder="this.grave.address.name" />

              </div>
              <div
                class="wrap-map"
                v-if="
                  !this.grave.address.location.lat ||
                  !this.grave.address.location.lng
                "
              >
                <div class="vue-map">
                  <img
                    :src="require('@/assets/images/createPage/location.svg')"
                    alt=""
                  />
                </div>
              </div>
              <div class="wrap-map" v-else>
                <!-- <GMapMap
                  :center="this.grave.address.location"
                  :zoom="15"
                  :map-type-id="roadmap"
                /> -->
                <gmaps-map
                :options="{
                  center: this.grave.address.location,
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
            </div>
          </div>
        </div>
        <button type="submit">save</button>
      </form>
      <div class="wrap-cropper-popup" v-if="showCropper && mainImgBeforeCrop">
        <VueCropper
            ref="cropper"
            :src="mainImgBeforeCrop"
            :aspectRatio="1/1" 
            :initialAspectRatio="1/1"
            :autoCropArea="1"
            :zoomable="false"
            alt="Crop Main Image"
          >
        </VueCropper >
      </div>
    </div>
  </div>
</template>
<script>

import { createOrUpdateRememberPage } from "../../services/rememberPageService";
import { uploadFile, removeFile, removeFiles } from '../../services/s3Service';
//google map
import { gmaps, gmapsMap } from "x5-gmaps";
//cropper
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import moment from 'moment';

import dates from "../../functions/dates";

//vuelidate
/*import useVuelidate from "vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  numeric,
  helpers,
} from "vuelidate/validators";*/
export default {
  name: "CreatePageSidebar",
  components: { gmapsMap,VueCropper },
  /*setup() {
    return { v$: useVuelidate() };
  },*/
  data() {
    return {
      name: "",
      mainImg: null,
      brief: "",
      about: "",
      dateOfBirth: "",
      dateOfDeath: "",
      country: "",
      parents: [
        { name: "", rememberPageLink: "" },
        { name: "", rememberPageLink: "" },
      ],
      spouse: {
        kind: "", // wife/husband
        name: "",
        rememberPageLink: "",
      },
      children: [
        {
          name: "",
          rememberPageLink: "",
        },
      ],
      timeline: [
        {
          year: "",
          shortDescription: "",
        },
      ],
      stories: [
        {
          date: "",
          image: "",
          content: "",
          witnessName: "",
        },
      ],
      gallery:
      {
        items: [
          {
            startYear: "",
            endYear: "",
            albumes: [
              {
                name: "",
                startYear: "",
                endYear: "",
                images: [],
                videos: [],
              },
            ],
          },
        ],
      },
      placesOfCommemoration: [
        {
          name: "",
          image: "",
          textAbout: "",
          shortDesc: "",
        },
      ],
      grave: {
        images: [],
        nameOfCemetery: "",
        address: {
          location: {
            lat: 0,
            lng: 0,
          },
          name: "",
          city:"",
          country: "",
          streetNumber: "",
          streetName: "",
        },
      },
      addHebrewDate: false,
      currentUser: localStorage.getItem("currentUser"),

      //Show content
      showMainFieldGroups: true,
      showAboutFieldGroups: false,
      showStoriesFieldGroups: false,
      showGalleryFieldGroups: false,
      showPlacesFieldGroups: false,
      showGraveFieldGroups: false,

      //errors messages
      //uploads images and videos
      errorUploadMainImage : "",
      errorUploadStoryImage : {
        index:"",
        message:""
      },
      errorUploadPlaceImage : {
        index:"",
        message:""
      },
      errorUploadGalleryImage : {
        index:"",
        albumIndex:"",
        message:""
      },
      errorUploadGraveImage : "",

      //google maps
      mapOptions: {
        zoom: 15,
        fullscreenControl: false,
        mapTypeControl: false,
        rotateControl: false,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: false,
      },
      autocomplete: null,
      places: null,

      //cropper
      mainImgBeforeCrop: "",
      showCropper:false
     

    };
  },
  /*validations() {
    const maxBirthDate = (value) => {
      return dates.compare(new Date(value), new Date()) < 0;
    };
    const minDeathDate = (value) => {
      let compare = dates.compare(new Date(value), this.dateOfBirth);
      return compare >= 0 || isNaN(compare);
    };
    return {
      name: { required }, // Matches this.name
      mainImg: { required },
      brief: { maxLength: maxLength(300) },
      about: {},
      dateOfBirth: {
        maxBirthDate: helpers.withMessage(
          "This date must be earlier or equal to today",
          maxBirthDate
        ),
      },
      dateOfDeath: {
        maxBirthDate: helpers.withMessage(
          "This date must be earlier or equal to today",
          maxBirthDate
        ),
        minDeathDate: helpers.withMessage(
          "This date must be after or equal to date of birth",
          minDeathDate
        ),
      },
      country: {},
      parents: {},
      spouse: {},
      children: {},
      timeline: {},
      stories: {},
      gallery: {},
      placesOfCommemoration: {
        name: {},
        image: {},
        textAbout: {},
        shortDesc: {},
      },
      grave: {
        images: {},
        nameOfCemetery: {},
        address: {
          location: {},
          name: {},
        },
      },
    };
  },*/
  methods: {
    customEncodeUrl(value) {
      if(value)
        return encodeURI(value).replaceAll(/\(/g, '%28').replaceAll(/\)/g, '%29');
    },
    //google maps
    setGoogleMap() {
      gmaps().then((maps) => {
        // Search
        this.autocomplete = new maps.places.Autocomplete(
          this.$refs.autocomplete
        );
        this.autocomplete.addListener("place_changed", this.setPlace);

      });
    },
    setPlace() {
      const place = this.autocomplete.getPlace();
      // Set end point to selected address
      if (place.geometry) {
        let name = place.formatted_address;
        this.grave.address.location = { lat: place.geometry.location.lat(),lng: place.geometry.location.lng() };
        this.grave.address.name = name;
        let address = place.address_components;

        //set address components
        address.forEach(function(v1) {v1.types.forEach(function(v2){address[v2]=v1.long_name});});

        this.grave.address.city = address.locality;
        this.grave.address.country = address.country;
        this.grave.address.streetNumber = address.street_number;
        this.grave.address.streetName = address.route;

        this.updateCurrentEditedRPAttributes("grave",this.grave);
      }
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    convertDateToDatePickerVal: function (value) {
      if(value){
          if(typeof(value) != 'string') value = String(value);
          value = moment(value).format('YYYY-MM-DD');
          return value;
      }
    },
    async submitForm () {
      this.$refs.createForm[0].focus();
      this.$store.commit('setState',{
        state: 'errorUpdateRP',
        value: ""
      })
      if (this.mainImg) {
        if(this.name){
          if(this.$store.state.curEditRP._id)
          this.playLoader("Update Page...");
          else
          this.playLoader("Create Page...");

          const userToken = await this.$store.getters.getUserToken;
          console.log('From create component, user token: ',userToken);
          this.$store.commit("setState",{
              state:"userToken",
              value: userToken
          });
          await createOrUpdateRememberPage(this.$store.state.curEditRP,userToken).then((rememberPage) => {
            rememberPage = rememberPage.data;
            rememberPage.attributes.dateOfBirth = this.convertDateToDatePickerVal(rememberPage.attributes.dateOfBirth);
            rememberPage.attributes.dateOfDeath = this.convertDateToDatePickerVal(rememberPage.attributes.dateOfDeath);
            
            this.$store.commit('setState',{
              state:"curEditRP",
              value: rememberPage
            });
            window.localStorage.setItem('currentEditedRP',JSON.stringify(rememberPage));

            this.stopLoader();
          }).catch((err) => {
            console.log(err);
            this.$store.commit('setState',{
              state: 'errorUpdateRP',
              value: err.message
            })
            this.stopLoader();
          });
        } else {
          this.showMainFieldGroups = true;
          this.$refs.createForm[0].focus();
           this.$store.commit('setState',{
              state: 'errorUpdateRP',
              value: "Please fill required fields"
          })
          
        }
      } else {
        this.showMainFieldGroups = true;
        this.$refs.createForm[0].focus();
          this.$store.commit('setState',{
            state: 'errorUpdateRP',
            value: "Please fill required fields"
        })
      }
    },
    // checkValidForm: async function () {
    //   let isFormCorrect = await this.v$.$validate();
    //   if (isFormCorrect) {
    //     return true;
    //   } else return false;
    // },
    changerememberPageState: async function (attributeName, event) {
      let value = this[attributeName];
      //let isFieldCorrect = await this.v$[attributeName].$validate();
      //if (isFieldCorrect) {
      this.updateCurrentEditedRPAttributes(attributeName,value);
      //}
    },
    addElement: function (attributeName, event, galleryItemIndex = 0) {
      event.preventDefault();
      let value = this[attributeName];
      switch (attributeName) {
        case "children":
          value.push({ rememberPageLink: "", name: "" });
          break;
        case "timeline":
          value.push({ year: "", shortDescription: "" });
          break;
        case "stories":
          value.push({ content: "", date: "", witnessName: "" });
          break;
        case "placesOfCommemoration":
          value.push({ name: "", shortDesc: "", address: "", textAbout: "" });
          break;
        case "gallery":
          value.items.push(
          {
            startYear: "",
            endYear: "",
            albumes: [
              {
                name: "",
                startYear: "",
                endYear: "",
                images: [],
                videos: [],
              },
            ]
          });
          break;
        case "gallery-album":
          value= this['gallery'].items[galleryItemIndex];
          value.albumes.push({
            name: "",
            startYear: "",
            endYear: "",
            images: [],
            videos: [],
          });
          break;
      }
    },
    removeEl: async function (attributeName, index, event, galleryAlbumItemIndex = 0) {
      event.preventDefault();
      this.playLoader("Remove...");
      let array = this[attributeName];
      if(attributeName == "gallery") {
        array = array.items;
        const albumes = array[index].albumes;
        let files = [];
        for (let j = 0; j < albumes.length; j++) {
          const album = albumes[j];
          if(album.images && album.images.length)
            files = files.concat(album.images);
          if(album.videos && album.videos.length)
            files = files.concat(album.videos);
        }
        if(files.length)
          await removeFiles(files);
      } else if(attributeName == "album-gallery") {
        let files = [];
        array = this['gallery'].items[galleryAlbumItemIndex].albumes;
        const album = array[index];
        if(album.images && album.images.length)
          files = files.concat(album.images);
        if(album.videos && album.videos.length)
          files = files.concat(album.videos);
        if(files.length)
          await removeFiles(files);
      }

      if(attributeName == "stories" || attributeName == 'placesOfCommemoration') {
        let fileUrl = this[attributeName][index].image;
        if(fileUrl)
          await removeFile(fileUrl);
      }

      if (index != null && index >= 0 && array.length > index) {
        array = array.splice(index, 1);
      }

      this.updateCurrentEditedRPAttributes(attributeName,this[attributeName]);
      this.stopLoader();

    },
    toggleGroupsWrapper: function (desc) {
      this["show" + desc + "FieldGroups"] =
        !this["show" + desc + "FieldGroups"];
      if(desc == 'Grave' && this["show" + desc + "FieldGroups"]) this.setGoogleMap();
    },
  

    //files integation with s3
    async removeFileFunc(event,fileUrl,attrName,fileType,fileIndex,itemIndex,albumIndex) {
      event.preventDefault();
      this.playLoader('Delete...');
      await removeFile(fileUrl).then((res)=> {
        switch (attrName) {
            case 'stories':
              this.stories[fileIndex].image = "";
              break;
            case 'grave':
              this.grave.images.splice(fileIndex,1);
              break;
            case 'gallery':
              if(fileType == "image")
                this.gallery.items[itemIndex].albumes[albumIndex].images.splice(fileIndex,1);
              else 
               this.gallery.items[itemIndex].albumes[albumIndex].videos.splice(fileIndex,1);
              break;
            case 'placesOfCommemoration':
              this.placesOfCommemoration[fileIndex].image = "";
              break;
            case 'mainImg':
              this.mainImg = "";
              break;
        }
        this.updateCurrentEditedRPAttributes(attrName,this[attrName]);
        this.renderDisplay(this,attrName);
        this.$eventBus.emit('re-init-gallery-slider');
        this.stopLoader();        
      }).catch((err)=>{
        this.stopLoader();
      })
    },
    async uploadFiles(event,attrName,fileTypeThatCanUploaded,indexItem,indexAlbum) {
      this.playLoader();
      let files = [];
      let self = this;
      if (event) files = event.target.files;
      if(!files.length) 
        this.stopLoader();
            
      for (let index = 0; index < files.length; index++) {
        let file = files[index];
        await uploadFile(file,fileTypeThatCanUploaded,this.$store.state.currentUser._id).then((fileUrl) => {
          //console.log(fileUrl, " :file url");
          if(attrName == 'stories' || attrName == 'placesOfCommemoration') {
            self[attrName][indexItem].image = fileUrl;
            if(attrName == 'stories') this.errorUploadStoryImage = "";
            else this.errorUploadPlaceImage = "";
          } else if(attrName == 'gallery') {
              let tmpArr = [];
              if(fileTypeThatCanUploaded == "video")
                tmpArr = self[attrName].items[indexItem].albumes[indexAlbum].videos;
              else                
                tmpArr = self[attrName].items[indexItem].albumes[indexAlbum].images;
              if(tmpArr == undefined) tmpArr = [];
              tmpArr.push(fileUrl);
              this.errorUploadGalleryImage = ""
          } else if(attrName == 'grave') {
            self['grave'].images.push(fileUrl);
            this.errorUploadGraveImage = ""
          }
          else {
            this.errorUploadMainImage = ""
            self[attrName] = fileUrl;
          }
         
          this.updateCurrentEditedRPAttributes(attrName,this[attrName]);
          this.renderDisplay(self,attrName);
          this.stopLoader();
          this.$eventBus.emit('re-init-gallery-slider');

        }).catch((err)=>{
          switch (attrName) {
            case 'stories':
              this.errorUploadStoryImage = {
                index: indexItem,
                message: err
              }
              break;
            case 'grave':
              this.errorUploadGraveImage = {
                index: indexItem,
                message: err
              }
              break;
            case 'gallery':
              this.errorUploadGalleryImage = {
                index: indexItem,
                albumIndex: indexAlbum,
                message: err,
                type: fileTypeThatCanUploaded
              }
              break;
            case 'grave':
              this.errorUploadGraveImage = err;
              break;
            case 'placesOfCommemoration':
                this.errorUploadPlaceImage = {
                  index: indexItem,
                  message: err
                };
                break;
            case 'mainImg':
                this.errorUploadMainImage = err;
                break;
          }
          this.stopLoader();
        });
      }
    },
    stopLoader (){
      this.$store.commit('setState',{
        state:"playLoader",
        value: false
      })
      this.$store.commit('setState',{
        state:"loaderMessage",
        value: ""
      })
    },
    playLoader (loaderMessage = "Upload..."){
      this.$store.commit('setState',{
        state:"playLoader",
        value: true
      })
      this.$store.commit('setState',{
        state:"loaderMessage",
        value: loaderMessage
      })
    },
    updateCurrentEditedRPAttributes(attrName,value) {
      this.$store.commit("setCurEditRPAttrState", {
        value: value,
        attr: attrName,
      });
    },
    renderDisplay(thisEl,attrName) {
      //Render the display
      if(Array.isArray(thisEl[attrName])) {
        thisEl[attrName].push({});
        thisEl[attrName].pop();
      } else if(attrName == 'gallery') {
        thisEl['gallery'].items.push({});
        thisEl['gallery'].items.pop();
      } 
    }
  },
  created() {
    const currentEditedRPAttrs = JSON.parse(localStorage.getItem('currentEditedRP')).attributes;
    let self = this;
    Object.keys(currentEditedRPAttrs).forEach( key => {
        let value = currentEditedRPAttrs[key];
        if(key == 'parents' && value.length < 2)
        {
          self[key][0] = value[0];
          self[key].push({});
        }
        else {
          self[key] = value;
        }
    })

    this.$eventBus.on('submit-form', () => this.submitForm(),this);
    
  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
  },
};
</script>

<style>
.wrap-field-groups:not(.active) .field-groups-content {display: none;}

.wrap-map {
  height: 213px;
  border-radius: 17px;
  background: white;
  display: flex;
}
.gmaps-map {
 border-radius: 17px;
}
.vue-map {
  width: 100%;
  display: flex;
}
.vue-map > img {
  margin: auto;
  display: block;
}
.small-small-field-label {
  font-size: 12px;
}
.small-field-label {
  font-size: 14px;
}
.field-small-text {
  color: #777777;
  font-size: 14px;
  margin-right: 0;
  margin-left: auto;
  display: block;
  width: max-content;
  margin-top: -14px;
  display: block;
  margin-bottom: 14px;
}
.rp-link {
  position: relative;
}
.rp-link input {
  padding-right: 40px;
}
.rp-link::after {
    content: "";
    background-image: url(@/assets/images/createPage/link.svg);
    width: 14px;
    height: 14px;
    display: inline-block;
    position: absolute;
    top: 29%;
    background-size: contain;
    right: 20px;
}
.wrap-loop {margin-bottom: 10px;}
.remove {
  display: flex;

}
label.field-label.wrap-remove {display: flex;justify-content: space-between;align-items: center;}

.image-container {margin-bottom: 14px;}
.image-container.multiply-images .background-image {
    width: 69px !important;
    height: 69px;
}
.image-container.multiply-images {
    background: white;
    border-radius: 15px;
    padding: 16px 20px;
    gap: 10px;
    display: flex;
    flex-wrap: wrap;
}
.fields-devider {
  height: 6px;
  display: block;
}
.wrap-add-button a {
  color: var(--custom-light-blue);
  height: 21px;
  width: 21px;
}
.wrap-add-button a:before {content: '+';color: white;background-color: var(--custom-light-blue);border-radius: 50%;width: 21px;height: 21px;display: inline-block;text-align: center;margin-right: 12px;font-family: 'Rubik Medium';box-shadow: 0px 3px 6px;}
span.field-groups-name { margin-bottom: 32px;cursor: pointer;font-size: 18px;font-weight: bold;color: var(--custom-blue);border-bottom: 1px solid #B9B9B9;width: 100%;display: flex;
    gap: 5px;}
.wrap-field-groups.active {margin-bottom: 40px;}
div#create-page-sidebar button[type=submit] {
    height: 0;
    width: 0;
    background: none;
    border: none;
    color: transparent;
    box-shadow: none;
}

.wrap-field-groups:not(.active) .arrow {
    transform: rotate(-90deg);
}
div#unique-element-about[name=about] {height: 444px;}

textarea[name=story-text] {height: 213px;}
textarea.rp-scroll::-webkit-scrollbar {
	width:4px;
}
/* Track */
textarea.rp-scroll::-webkit-scrollbar-track {
  width:4px;
}
</style>