<template>
  <div id="create-page-sidebar" class="main-container">
    <div class="main-content">
      <form @submit.prevent="createRememberPage"  ref="createForm">
        <!-- Main -->
        <div class="wrap-field-groups" :class="{ active: showMainFieldGroups }">
          <span class="field-groups-name" @click="toggleGroupsWrapper('Main')"
            >Main <span class="arrow flex"><img :src="require('@/assets/images/createPage/arrow-bar-down.svg')"  alt=""></span></span
          >
          <div class="field-groups-content" v-if="showMainFieldGroups">
            <!-- main image -->
            <div class="wrap-field">
              <label class="field-label"> Main Image</label>
              <label class="small-small-field-label upload-image" for="main-image"> 
                upload main image
                <div class="image-container">
                  <div class="no-image" v-if="!mainImg">
                      <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                  </div>
                  <div v-else class="images">
                    <img :src="mainImg" alt="">
                  </div>
                </div>
              </label>
              <div class="wrap-input">
                <input
                  type="file"
                  id="main-image"
                  name="main-image"
                  placeholder=""
                  accept="image/*"
                  @input="changerememberPageState('mainImg', $event)"
                />
              </div>
            </div>
            <!-- name -->
            <div class="wrap-field">
              <label class="field-label"> Name</label>
              <div class="wrap-input">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name Of The Deceased"
                  v-model="name"
                  @input="changerememberPageState('name', $event)"
                />
              </div>
            </div>
            <!-- brief -->
            <div class="wrap-field">
              <label class="field-label"> Brief </label>
              <div class="wrap-input">
                <div
                  id="unique-element-brief"
                  class="custom-editor"
                  @input="changerememberPageState('brief', $event)"
                  name="brief"
                  contenteditable
                >
                  a few words about him.
                </div>
              </div>
              <span class="field-small-text">
                Up To 4 Lines
              </span>
            </div>
            <!-- about -->
            <div class="wrap-field">
              <label class="field-label"> About </label>
              <div class="wrap-input">
                <div
                  id="unique-element-about"
                  class="custom-editor rp-scroll"
                  @input="changerememberPageState('about', $event)"
                  name="about"
                  contenteditable
                >
                  more about him..
                </div>
                
              </div>
            </div>
            <!-- dateOfBirth -->
            <div class="wrap-field">
              <label class="field-label"> Date Of Birth:</label>
              <div class="wrap-input">
                <input
                  type="date"
                  name="dateOfBirth"
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
                <div class="wrap-input">
                  <select
                    name="spouse"
                    id="spouse"
                    v-model="spouse.type"
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
              <div class="wrap-field">
                <div class="wrap-input rp-link">
                  <input
                    type="text"
                    name="spouse-link"
                    placeholder="Link to Remember page"
                    v-model="spouse.rememberPageLink"
                    @input="changerememberPageState('spouse', $event)"
                  />
                </div>
              </div>
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
              <div class="wrap-field">
                <div class="wrap-input rp-link">
                  <input
                    type="text"
                    name="parent-1-link"
                    placeholder="Link to Remember page"
                    v-model="parents[0].rememberPageLink"
                    @input="changerememberPageState('parents', $event)"
                  />
                </div>
              </div>
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
              <div class="wrap-field">
                <div class="wrap-input rp-link">
                  <input
                    type="text"
                    name="parent-2-link"
                    placeholder="Link to Remember page"
                    v-model="parents[1].rememberPageLink"
                    @input="changerememberPageState('parents', $event)"
                  />
                </div>
              </div>
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
                    ><img :src="require('@/assets/images/createPage/remove.svg')" /></a
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
                <div class="wrap-field">
                  <div class="wrap-input rp-link">
                    <input
                      type="text"
                      name="children-link"
                      placeholder="Link To Rememeber Page"
                      v-model="children[index].rememberPageLink"
                      @input="changerememberPageState('children', $event)"
                    />
                  </div>
                </div>
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
          <div class="field-groups-content" v-if="showAboutFieldGroups">
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
                    ><img :src="require('@/assets/images/createPage/remove.svg')" /></a
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
                      v-model="timeline[index].shortDesc"
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
          <div class="field-groups-content" v-if="showStoriesFieldGroups">
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
                        ><img :src="require('@/assets/images/createPage/remove.svg')" /></a
                      >
                </label>
                <div class="wrap-field">
                  <div class="wrap-input">
                    <div
                      :id="'unique-element-stories-' + index"
                      class="custom-editor rp-scroll "
                      @input="changerememberPageState('stories', $event)"
                      :data-index="index"
                      name="story-text"
                      contenteditable
                    >
                      <template v-if="story.content" :v-html="story.content">  The Story </template>
                      <template v-else>  The Story </template>
                    </div>
                   
                  </div>
                </div>
                <div class="wrap-field">
                  <div class="wrap-input">
                    <label for="">date of the story</label>
                    <input
                      type="date"
                      name="story-date"
                      placeholder=""
                      :data-index="index"
                      v-model="stories[index].date"
                      @input="changerememberPageState('stories', $event)"
                    />
                  </div>
                </div>
                <div class="wrap-field">
                  <label class="small-small-field-label upload-image" :for="'story-image' + index">add image
                    <div class="image-container">
                       <div class="no-image" v-if="!story.image">
                            <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                        </div>
                        <div v-else class="images">
                          <img :src="story.image" alt="">
                        </div>
                    </div>
                  </label>
                  <div class="wrap-input">
                    <input
                      type="file"
                      :id="'story-image' + index"
                      accept="image/*"
                      name="story-image"
                      placeholder=""
                      :data-index="index"
                      @input="changerememberPageState('stories', $event)"
                    />
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
          <div class="field-groups-content" v-if="showGalleryFieldGroups">
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
                    ><img :src="require('@/assets/images/createPage/remove.svg')" /></a
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
                  <label for="" class="field-label" :class="{ 'wrap-remove': index > 0}">
                    Albume {{ indexAl + 1 }}
                    <a
                      href=""
                      v-if="indexAl > 0"
                      class="remove"
                      @click="removeEl('album-gallery', indexAl, $event,index)"
                      ><img :src="require('@/assets/images/createPage/remove.svg')" /></a
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
                    <label class="small-small-field-label upload-image" :for="'album-image-' + indexAl + '-' + index">
                      upload images 
                      <div class="image-container">
                         <div class="no-image">
                              <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                          </div>
                          <div class="images" v-for="(image, indexAlImg) in album.images"
                                  :key="indexAlImg" >
                            <img v-if="image" :src="image" alt="">
                          </div>
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
                        @input="changerememberPageState('gallery', $event)"
                      />
                    </div>
                  </div>
                  <div class="wrap-field upload-videos">
                    <label class="small-small-field-label upload-video" :for="'album-video-' + indexAl + '-' + index"> upload videos 
                      <div class="image-container">
                         <div class="no-image" >
                              <img :src="require('@/assets/images/createPage/uploads_videos.svg')"  alt="">
                          </div>
                          <div class="videos"  v-for="(video, indexAlVideo) in album.videos"
                                  :key="indexAlVideo">
                            <video  v-if="video" :src="video">
                            </video>
                          </div>
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
                        @input="changerememberPageState('gallery', $event)"
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
          <div class="field-groups-content" v-if="showPlacesFieldGroups">
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
                    ><img :src="require('@/assets/images/createPage/remove.svg')" /></a
                  >
                </label>
                <div class="wrap-field">
                  <label class="field-label"> Image Of Place</label>
                  <label class="small-small-field-label upload-image" :for="'place-image' + index">
                    upload image 
                    <div class="image-container">
                       <div class="no-image" v-if="!place.image">
                            <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                        </div>
                        <div v-else class="images">
                          <img :src="place.image" alt="">
                        </div>
                    </div>
                  </label>
                  <div class="wrap-input">
                    <input
                      type="file"
                      :id="'place-image' + index"
                      name="place-image"
                      accept="image/*"
                      placeholder=""
                      @input="changerememberPageState('placesOfCommemoration', $event)"
                    />
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
                    <div
                      :id="'unique-element-placesOfCommemoration-' + index"
                      class="custom-editor rp-scroll "
                      @input="
                        changerememberPageState('placesOfCommemoration', $event)
                      "
                      :data-index="index"
                      name="place-text"
                      contenteditable
                    >
                      Type Here
                    </div>
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
          <div class="field-groups-content" v-if="showGraveFieldGroups">
            <div class="wrap-field-group">
              <div class="wrap-field upload-images">
                <label class="field-label"> Images Gallery Of The Grave</label>
                <label class="small-small-field-label upload-image" for="grave-images">
                upload images to gallery 
                <div class="image-container">
                    <div class="no-image">
                        <img :src="require('@/assets/images/createPage/upload_photo.svg')"  alt="">
                    </div>
                    <div class="images">
                      <img  v-for="(image, indexImg) in grave.images"
                            :key="indexImg" :src="image" alt="">
                    </div>
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
                    @input="changerememberPageState('grave', $event)"
                  />
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
                <GMapAutocomplete
                  placeholder="Type And Select"
                  @place_changed="setPlace($event)"
                >
                </GMapAutocomplete>
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
                <GMapMap
                  :center="this.grave.address.location"
                  :zoom="15"
                  :map-type-id="roadmap"
                />
              </div>
            </div>
          </div>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  </div>
</template>
<script>
import { createrememberPageService } from "../../../services/remember-page-service";
import { rememberPage } from "../../../models/rememberPage";

import dates from "../../../functions/dates";

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
  components: {},
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
        type: "", // wife/husband
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
                images: [""],
                videos: [""],
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
        images: [""],
        nameOfCemetery: "",
        address: {
          location: {
            lat: 0,
            lng: 0,
          },
          name: "",
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
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    createRememberPage: function () {
      //if (this.checkValidForm()) {
        // eslint-disable-next-line no-console
        console.log("hi");
      //}
    },
    // checkValidForm: async function () {
    //   let isFormCorrect = await this.v$.$validate();
    //   if (isFormCorrect) {
    //     return true;
    //   } else return false;
    // },
    changerememberPageState: async function (attributeName, event) {
      if (
        attributeName == "brief" ||
        attributeName == "about" ||
        attributeName == "stories"
      ) {
        let innerContent;
        if (
          attributeName == "stories" ||
          attributeName == "placesOfCommemoration"
        ) {
          let index = event.target.dataset.index;
          innerContent = document.getElementById(
            "unique-element-" + attributeName + "-" + index
          ).innerHTML;
        } else {
          innerContent = document.getElementById(
            "unique-element-" + attributeName
          ).innerHTML;
        }

        if (innerContent == "") {
          if (attributeName == "stories") {
            let index = event.target.dataset.index;
            this[attributeName][index].content = "";
          } else if (attributeName == "placesOfCommemoration") {
            let index = event.target.dataset.index;
            this[attributeName][index].textAbout = "";
          } else {
            this[attributeName] = "";
          }
        } else {
          let tmpInnerContent = innerContent;
          innerContent = innerContent
            .replaceAll("<div>", "<br>")
            .replaceAll("</div>", "");

          if (attributeName == "brief" )  { 
            /*let lines = innerContent.split('<br>');
            if(lines.length > 4 ) {
              tmpInnerContent = tmpInnerContent.replaceAll("<div>", "<br>")
              .replaceAll("</div>", "<tmp>");
              let linesTmp = tmpInnerContent.split('<br>');
              innerContent = linesTmp[0] +  '<br>' +  linesTmp[1] +  '<br>'+  linesTmp[2] +  '<br>' +  linesTmp[3];
              document.getElementById(
                  "unique-element-" + attributeName
                ).innerHTML = innerContent.replaceAll( "<br>","<div>")
              .replaceAll("<tmp>","</div>");
            }
            else if(innerContent.length > 250)
            {
              tmpInnerContent = tmpInnerContent.replaceAll("<div>", "<br>")
              .replaceAll("</div>", "<tmp>");
              let innerContent = tmpInnerContent.substr(0,250);
              innerContent = innerContent.substr(0,250);
                document.getElementById(
                  "unique-element-" + attributeName
                ).innerHTML = innerContent .replaceAll( "<br>","<div>")
              .replaceAll("<tmp>","</div>");
            }
            innerContent = innerContent.replace("<tmp>","");*/
            this[attributeName] = innerContent;
          } 
          else {
            if (attributeName == "stories") {
              let index = event.target.dataset.index;
              this[attributeName][index].content = innerContent;
            } else if (attributeName == "placesOfCommemoration") {
              let index = event.target.dataset.index;
              this[attributeName][index].textAbout = innerContent;
            } else {
              this[attributeName] = innerContent;
            }
          }
        }
      }
      let value = this[attributeName];
      //let isFieldCorrect = await this.v$[attributeName].$validate();
      //if (isFieldCorrect) {
        this.$store.commit("setCurEditRPAttrState", {
          value: value,
          attr: attributeName,
        });

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
                images: [""],
                videos: [""],
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
            images: [""],
            videos: [""],
          });
          break;
      }
    },
    removeEl: function (attributeName, index, event, galleryAlbumItemIndex = 0) {
      event.preventDefault();
      let array = this[attributeName];
      if(attributeName == "gallery") {
        array = array.items;
      } else if(attributeName == "album-gallery") {
        array = this['gallery'].items[galleryAlbumItemIndex].albumes;
      }
      
      if (index != null && index >= 0 && array.length > index) {
        array = array.splice(index, 1);
      }
      if(attributeName == "stories") this.updateStoryContentDisplay(index);

      this.$store.commit("setCurEditRPAttrState", {
        value: this[attributeName],
        attr: attributeName,
      });

    },
    toggleGroupsWrapper: function (desc) {
      this["show" + desc + "FieldGroups"] =
        !this["show" + desc + "FieldGroups"];
    },
    setPlace(event) {
      let lat = event.geometry.location.lat();
      let lng = event.geometry.location.lng();
      let name = event.formatted_address;
      this.grave.address.location.lat = lat;
      this.grave.address.location.lng = lng;
      this.grave.address.name = name;

      this.$store.commit("setCurEditRPAttrState", {
          value: this.grave,
          attr: "grave",
      });
    },
    updateStoryContentDisplay(storyIndex) {
      if(storyIndex >= 0 && this.stories.length -1 >= storyIndex) {
          document.getElementById(
            "unique-element-stories-" + storyIndex
          ).innerHTML = this.stories[storyIndex].content;
      }
    }
  },
  created() {
    if (!this.$store.state.curEditRP) {
      this.$store.commit("setState", {
        value: new rememberPage(),
        state: "curEditRP",
      });
    } else {
      // eslint-disable-next-line no-console
      console.log("there are object in state");
    }
    this.$eventBus.on('submit-form', () => this.$refs.createForm.submit(),this);
  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
  },
};
</script>

<style>
.vue-map {
  height: 213px;
  background: white;
  border-radius: 17px;
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
}
.rp-link {
  /**
  link icon
   */
}
.wrap-loop {margin-bottom: 10px;}
.remove {
  display: flex;

}
label.field-label.wrap-remove {display: flex;justify-content: space-between;align-items: center;}

.image-container {margin-bottom: 14px;}
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

.custom-editor[name=story-text] {height: 213px;}
.rp-scroll.custom-editor::-webkit-scrollbar {
	width:4px;
}
/* Track */
.rp-scroll.custom-editor::-webkit-scrollbar-track {
  width:4px;
}
</style>