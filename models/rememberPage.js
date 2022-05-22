export class rememberPage {
    constructor(link,pageManager,editors,watchedPeoples,candlesAndFlowers,rememberPageId) {
        this.link = link;
        this.pageManager = pageManager;
        this.editors = editors;
        this.watchedPeoples = watchedPeoples,
        this.candlesAndFlowers = candlesAndFlowers,
        this.attributes = {
            mainImg: "",
            name: "",
            brief: "", //short description about people
            about: "",
            dateOfBirth: "",
            dateOfDeath: "",
            country: "",
            parents: [{
                name: "",
                rememberPageLink: ""
            }],
            spouse: {
                type: "", // wife/husband
                name: "",
                rememberPageLink: ""
            },
            children: [{
                name: "",
                rememberPageLink: ""
            }],
            timeline: [{
                year: "",
                shortDescription: ""
            }],
            stories: [{
                image: "", 
                content: "",
                witnessName: "",
                date: ""
            }],
            gallery: {
                items: [{
                    startYear: "",
                    endYear: "",
                    albumes: [{
                        name: "",
                        startYear: "",
                        endYear: "",
                        images: [],
                        videos: []
                    }]
                }]
            },
            placesOfCommemoration: [{
                name: "",
                image: "",
                textAbout: "",
                shortDesc: "",
                address: ""
            }],
            grave: {
                images: [],
                nameOfCemetery: "",
                address: {
                    location: {
                      lat: 0,
                      lng: 0,
                    },
                    name:"",
                },
            },
            addHebrewDate: false,
        },
        this._id = rememberPageId;
    }
}
