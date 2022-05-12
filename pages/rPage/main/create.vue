<template>
  <div id="create-page-sidebar" class="main-container">
    <div class="main-content">
      <form @submit.prevent="createPage">
        <!-- Main -->
        <div class="wrap-field-groups" :class="{ active: showMainFieldGroups }">
          <span class="field-groups-name" @click="toggleGroupsWrapper('Main')"
            >Main <span class="char">></span></span
          >
          <div class="field-groups-content" v-if="showMainFieldGroups">
            <div class="wrap-field-group">
              <!-- name -->
              <div class="wrap-field">
                <label class="form-label"> Name</label>
                <div class="wrap-input">
                  <input
                    :class="{ invalid: v$.name.$error }"
                    type="text"
                    name="name"
                    placeholder="Full Name Of The Deceased"
                    v-model="v$.name.$model"
                    @input="changeRememberPageState('name', $event)"
                  />
                  <div v-if="v$.name.$error" class="input-error">
                    Required Field
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <!-- brief -->
              <div class="wrap-field">
                <label class="form-label"> Brief </label>
                <div class="wrap-input">
                  <div
                    id="unique-element-brief"
                    class="custom-editor"
                    @input="changeRememberPageState('brief', $event)"
                    name="brief"
                    contenteditable
                  >
                    a few words about him.
                  </div>
                  <div
                    class="input-error"
                    v-for="(error, errorIndex) in v$.brief.$errors"
                    :key="errorIndex"
                  >
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <!-- about -->
              <div class="wrap-field">
                <label class="form-label"> About </label>
                <div class="wrap-input">
                  <div
                    id="unique-element-about"
                    class="custom-editor"
                    @input="changeRememberPageState('about', $event)"
                    name="about"
                    contenteditable
                  >
                    more about him..
                  </div>
                  <div
                    class="input-error"
                    v-for="(error, errorIndex) in v$.about.$errors"
                    :key="errorIndex"
                  >
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <!-- dateOfBirth -->
              <div class="wrap-field">
                <label class="form-label"> Date Of Birth:</label>
                <div class="wrap-input">
                  <input
                    :class="{ invalid: v$.dateOfBirth.$error }"
                    type="date"
                    name="dateOfBirth"
                    v-model="v$.dateOfBirth.$model"
                    @change="changeRememberPageState('dateOfBirth', $event)"
                  />
                  <div
                    class="input-error"
                    v-for="(error, errorIndex) in v$.dateOfBirth.$errors"
                    :key="errorIndex"
                  >
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <!-- dateOfDeath -->
              <div class="wrap-field">
                <label class="form-label"> Date Of Death:</label>
                <div class="wrap-input">
                  <input
                    :class="{ invalid: v$.dateOfDeath.$error }"
                    type="date"
                    name="dateOfDeath"
                    v-model="v$.dateOfDeath.$model"
                    @change="changeRememberPageState('dateOfDeath', $event)"
                  />
                  <div
                    class="input-error"
                    v-for="(error, errorIndex) in v$.dateOfDeath.$errors"
                    :key="errorIndex"
                  >
                    {{ error.$message }}
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <!-- Country -->
              <div class="wrap-field">
                <label class="form-label"> Country:</label>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="country"
                    v-model="v$.country.$model"
                    @input="changeRememberPageState('country', $event)"
                  />
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <!-- Spouse -->
              <div class="wrap-field">
                <label class="form-label"> Wife/ Husband </label>
                <div class="wrap-input">
                  <select
                    name="spouse"
                    id="spouse"
                    v-model="v$.spouse.$model.type"
                    @input="changeRememberPageState('spouse', $event)"
                  >
                    <option value="-1">Select</option>
                    <option value="wife">Wife</option>
                    <option value="husband">Husband</option>
                  </select>
                </div>
              </div>
              <div class="wrap-field wrap-some-inputs">
                <div class="wrap-input">
                  <input
                    type="text"
                    name="spouse-name"
                    placeholder="Name"
                    v-model="v$.spouse.$model.name"
                    @input="changeRememberPageState('spouse', $event)"
                  />
                </div>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="spouse-link"
                    placeholder="Link to Remember page"
                    v-model="v$.spouse.$model.rememberPageLink"
                    @input="changeRememberPageState('spouse', $event)"
                  />
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <!-- parents 1 -->

              <label class="form-label"> Parents:</label>
              <div class="wrap-field wrap-some-inputs">
                <div class="wrap-input">
                  <input
                    type="text"
                    name="parent-1-name"
                    placeholder="Father"
                    v-model="v$.parents.$model[0].name"
                    @input="changeRememberPageState('parents', $event)"
                  />
                </div>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="parent-1-link"
                    placeholder="Link to Remember page"
                    v-model="v$.parents.$model[0].rememberPageLink"
                    @input="changeRememberPageState('parents', $event)"
                  />
                </div>
              </div>
              <!-- parents 2 -->
              <div class="wrap-field wrap-some-inputs">
                <div class="wrap-input">
                  <input
                    type="text"
                    name="parent-2-name"
                    placeholder="Mother"
                    v-model="v$.parents.$model[1].name"
                    @input="changeRememberPageState('parents', $event)"
                  />
                </div>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="parent-2-link"
                    placeholder="Link to Remember page"
                    v-model="v$.parents.$model[1].rememberPageLink"
                    @input="changeRememberPageState('parents', $event)"
                  />
                </div>
              </div>
            </div>
            <div class="wrap-field-group">
              <label class="form-label"> Children:</label>
              <div
                class="wrap-field wrap-some-inputs"
                v-for="(child, index) in children"
                :key="index"
              >
                <label class="field-label">
                  Child {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('children', index, $event)"
                    >X</a
                  >
                </label>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="children-name"
                    placeholder="Child's Name"
                    v-model="v$.children.$model[index].name"
                    @input="changeRememberPageState('children', $event)"
                  />
                </div>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="children-link"
                    placeholder="Link To Rememeber Page"
                    v-model="v$.children.$model[index].rememberPageLink"
                    @input="changeRememberPageState('children', $event)"
                  />
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
            >About <span class="char">></span></span
          >
          <div class="field-groups-content" v-if="showAboutFieldGroups">
            <div class="wrap-field-group">
              <label class="form-label"> Timeline</label>
              <div
                class="wrap-field wrap-some-inputs"
                v-for="(time, index) in timeline"
                :key="index"
              >
                <label for="">
                  Event {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('timeline', index, $event)"
                    >X</a
                  >
                </label>
                <div class="wrap-input">
                  <label for="">Event Date</label>
                  <input
                    type="number"
                    name="timeline-date"
                    placeholder="0000"
                    v-model="v$.timeline.$model[index].year"
                    @input="changeRememberPageState('timeline', $event)"
                  />
                </div>
                <div class="wrap-input">
                  <label for="">Event Description</label>
                  <input
                    type="text"
                    name="timeline-desc"
                    placeholder=""
                    v-model="v$.timeline.$model[index].shortDesc"
                    @input="changeRememberPageState('timeline', $event)"
                  />
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
            >Stories <span class="char">></span></span
          >
          <div class="field-groups-content" v-if="showStoriesFieldGroups">
            <div class="wrap-field-group">
              <div
                class="wrap-field wrap-some-inputs"
                v-for="(story, index) in stories"
                :key="index"
              >
                <div class="wrap-input">
                  <label for="">
                    Story {{ index + 1 }}
                    <a
                      href=""
                      v-if="index > 0"
                      class="remove"
                      @click="removeEl('stories', index, $event)"
                      >X</a
                    >
                  </label>
                  <div class="wrap-input">
                    <div
                      :id="'unique-element-stories-' + index"
                      class="custom-editor"
                      @input="changeRememberPageState('stories', $event)"
                      :data-index="index"
                      name="story-text"
                      contenteditable
                    >
                      The Story
                    </div>
                  </div>
                </div>
                <div class="wrap-input">
                  <label for="">date of the story</label>
                  <input
                    type="date"
                    name="story-date"
                    placeholder=""
                    :data-index="index"
                    v-model="v$.stories.$model[index].date"
                    @input="changeRememberPageState('stories', $event)"
                  />
                </div>
                <div class="wrap-input">
                  <label for="">witness name</label>
                  <input
                    type="text"
                    name="story-name"
                    placeholder="Name"
                    :data-index="index"
                    v-model="v$.stories.$model[index].witnessName"
                    @input="changeRememberPageState('stories', $event)"
                  />
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
            >Gallery <span class="char">></span></span
          >
          <div class="field-groups-content" v-if="showGalleryFieldGroups">
            <div class="wrap-field-group">
              <div
                class="wrap-field wrap-some-inputs"
                v-for="(item, index) in gallery.items"
                :key="index"
              >
                <label for="">
                  Gallery Item {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('gallery', index, $event)"
                    >X</a
                  >
                </label>
                <div class="wrap-input">
                  <label for="">Start Year Of Range</label>
                  <input
                    type="number"
                    name="gallery-item-start-year"
                    placeholder="0000"
                    :data-index="index"
                    v-model="v$.gallery.$model.items[index].startYear"
                    @input="changeRememberPageState('gallery', $event)"
                  />
                </div>
                <div class="wrap-input">
                  <label for="">End Year Of Range</label>
                   <input
                    type="number"
                    name="gallery-item-end-year"
                    placeholder="0000"
                    :data-index="index"
                    v-model="v$.gallery.$model.items[index].endYear"
                    @input="changeRememberPageState('gallery', $event)"
                  />
                </div>
                <div
                class="wrap-field wrap-some-inputs"
                v-for="(album, indexAl) in item.albumes"
                :key="indexAl"
                >
                  <label for="">
                    Albume {{ indexAl + 1 }}
                    <a
                      href=""
                      v-if="indexAl > 0"
                      class="remove"
                      @click="removeEl('album-gallery', indexAl, $event,index)"
                      >X</a
                    >
                  </label>
                  <div class="wrap-input">
                    <label for="">Album's Name</label>
                    <input
                      type="text"
                      name="gallery-album-name"
                      placeholder="Type Here"
                      :data-index="indexAl"
                      v-model="v$.gallery.$model.items[index].albumes[indexAl].name"
                      @input="changeRememberPageState('gallery', $event)"
                    />
                  </div>
                  <div class="wrap-input">
                    <label for="">Start Year Of Albume</label>
                    <input
                      type="number"
                      name="gallery-album-start-year"
                      placeholder="0000"
                      :data-index="indexAl"
                      v-model="v$.gallery.$model.items[index].albumes[indexAl].startYear"
                      @input="changeRememberPageState('gallery', $event)"
                    />
                  </div>
                  <div class="wrap-input">
                    <label for="">End Year Of Albume</label>
                    <input
                      type="number"
                      name="gallery-album-end-year"
                      placeholder="0000"
                      :data-index="indexAl"
                      v-model="v$.gallery.$model.items[index].albumes[indexAl].startYear"
                      @input="changeRememberPageState('gallery', $event)"
                    />
                  </div>
                </div>
                <div class="wrap-add-button">
                      <a href="" @click="addElement('gallery-album', $event,index)"
                        >Add Albume In This Gallery</a
                      >
                    </div>
                </div>
              </div>
              <div class="wrap-add-button">
              <a href="" @click="addElement('gallery', $event)"
                >Add New Gallery</a
              >
              </div>
          </div>
        </div>
        <!-- Places -->
        <div
          class="wrap-field-groups"
          :class="{ active: showPlacesFieldGroups }"
        >
          <span class="field-groups-name" @click="toggleGroupsWrapper('Places')"
            >Places Of Commemoration <span class="char">></span></span
          >
          <div class="field-groups-content" v-if="showPlacesFieldGroups">
            <div class="wrap-field-group">
              <div
                class="wrap-field wrap-some-inputs"
                v-for="(place, index) in placesOfCommemoration"
                :key="index"
              >
                <label for="">
                  Place {{ index + 1 }}
                  <a
                    href=""
                    v-if="index > 0"
                    class="remove"
                    @click="removeEl('placesOfCommemoration', index, $event)"
                    >X</a
                  >
                </label>

                <div class="wrap-input">
                  <label for="">Name Of The Place</label>
                  <input
                    type="text"
                    name="place-name"
                    placeholder="Type Here"
                    :data-index="index"
                    v-model="v$.placesOfCommemoration.$model[index].name"
                    @input="
                      changeRememberPageState('placesOfCommemoration', $event)
                    "
                  />
                </div>
                <div class="wrap-input">
                  <label for="">Address Of The Place</label>
                  <input
                    type="text"
                    name="place-address"
                    placeholder="Type Here"
                    :data-index="index"
                    v-model="v$.placesOfCommemoration.$model[index].address"
                    @input="
                      changeRememberPageState('placesOfCommemoration', $event)
                    "
                  />
                </div>
                <div class="wrap-input">
                  <label for="">Text About The Connection To This Place</label>
                  <div
                    :id="'unique-element-placesOfCommemoration-' + index"
                    class="custom-editor"
                    @input="
                      changeRememberPageState('placesOfCommemoration', $event)
                    "
                    :data-index="index"
                    name="place-text"
                    contenteditable
                  >
                    Type Here
                  </div>
                </div>
                <div class="wrap-input">
                  <label for="">Short Description Of Place</label>
                  <input
                    type="text"
                    name="place-short-desc"
                    placeholder="Type Here"
                    :data-index="index"
                    v-model="v$.placesOfCommemoration.$model[index].shortDesc"
                    @input="
                      changeRememberPageState('placesOfCommemoration', $event)
                    "
                  />
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
            >The grave <span class="char">></span></span
          >
          <div class="field-groups-content" v-if="showGraveFieldGroups">
            <div class="wrap-field-group">
              <!-- name -->
              <div class="wrap-field">
                <label class="form-label"> The Name Of A Cemetery</label>
                <div class="wrap-input">
                  <input
                    type="text"
                    name="grave-name"
                    placeholder="Type Here"
                    v-model="v$.grave.$model.nameOfCemetery"
                    @input="changeRememberPageState('grave', $event)"
                  />
                </div>
              </div>
              <div class="wrap-field">
                <label class="form-label"> Grave Location </label>
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
import { createRememberPageService } from "../../../services/remember-page-service";
import { RememberPage } from "../../../models/rememberPage";

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
      mainImg: "",
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
  validations() {
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
  },
  methods: {
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
    createRememberPage: function () {
      if (this.checkValidForm()) {
        // eslint-disable-next-line no-console
        console.log("hi");
      }
    },
    checkValidForm: async function () {
      let isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        return true;
      } else return false;
    },
    changeRememberPageState: async function (attributeName, event) {
      //let value = event.target.value;
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
          innerContent = innerContent
            .replaceAll("<div>", "<br>")
            .replaceAll("</div>", "");
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
      let value = this[attributeName];
      let isFieldCorrect = await this.v$[attributeName].$validate();
      if (isFieldCorrect) {
        let currentRpEditing = this.$store.state.curEditRP;
        let attrs = currentRpEditing.attributes;
        attrs[attributeName] = value;
        this.$store.commit("setState", {
          value: currentRpEditing,
          state: "curEditRP",
        });
      }
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

      let currentRpEditing = this.$store.state.curEditRP;
      let attrs = currentRpEditing.attributes;
      attrs["grave"].address = this.grave.address;
      this.$store.commit("setState", {
        value: currentRpEditing,
        state: "curEditRP",
      });
    },
  },
  created() {
    if (!this.$store.state.curEditRP) {
      this.$store.commit("setState", {
        value: new RememberPage(),
        state: "curEditRP",
      });
    } else {
      // eslint-disable-next-line no-console
      console.log("there are object in state");
    }
  },
  computed: {
    emailVerified: function () {
      return localStorage.getItem("emailVerified") == "true";
    },
  },
};
</script>

<style>
.wrap-field.wrap-some-inputs {
  border: 1px solid var(--custom-blue);
  margin: 20px;
  padding: 10px;
}
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
</style>