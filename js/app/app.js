define("app", function(require) {
    "use strict";

    var Marionette              = require("marionette"),
        Radio                   = require("backbone.radio"),
        SoundboardController    = require("controllers/soundboard"),
        app;

    require("css!../../bower_components/ilyabirman-likely/release/likely.css");
    require("likely");

    app = Marionette.Application.extend({
        initialize: function intialize() {
            this.addRegions({
                mainRegion: "#main",
                modalRegion: "#modal"
            });

            Radio.channel("App").reply("region:show", this.showRegion.bind(this));
            Radio.channel("App").reply("modal:show", this.showModal.bind(this));

            this.router = new Marionette.AppRouter();

            this.start();
        },

        start: function start() {
            var soundboardController = new SoundboardController();

            this.router.processAppRoutes(soundboardController, {
                "": "index",
                "son/:slug": "index"
            });

            if (Backbone.history) {
                Backbone.history.start();
                this.trigger("backbone:history:start");
            }

            likely.initiate();
        },

        showRegion: function showRegion(params) {
            this.mainRegion.show(params.view);
        },

        showModal: function showModal(params) {
            this.modalRegion.show(params.view);
        }
    });

    return app;
});
