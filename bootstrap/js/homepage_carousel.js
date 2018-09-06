(function() {
    'use strict';

    /**
     * Pulls all of the speakers out of the events that have BIOS and IMAGES
     * @param {Object} events The object containing the information for all of the events
     * @return {Array} The array of speaker objects without any modification
     */
    var retrieveSpeakers = function(events) {
        var speakers = [],
            eventSpeakers;

        // go through all of the events
        for (var i = 0; i < events.length; i++) {
            // find the keynotes
            if (events[i].type.toLowerCase() === "keynote") {
                eventSpeakers = events[i].speaker;
                
                // retrieve the speakers
                for (var j = 0; j < eventSpeakers.length; j++) {
                    if (eventSpeakers[j].image && eventSpeakers[j].bio) {
                        speakers.push(eventSpeakers[j]);
                    }
                }
            }
        }

        return speakers;
    };

    /**
     * Creates and attaches a carousel to the main body of the homepage on the keynote row
     * @param {String} carouselId A unique string to create an ID for the carousel for later referencing
     * @return {Array} [0] The carousel itself, [1] The inner body of the carousel to attach slides to
     */
    var createCarousel = function(carouselId) {
        var $carousel = $('<div id="' + carouselId + '" class="carousel keynote-carousel slide" data-ride="carousel"></div>'),
        // var $carousel = $('<div id="' + carouselId + '" class="carousel keynote-carousel slide"></div>'),
            $carouselInner = $('<div class="carousel-inner" role="listbox"></div>');

        $carousel.append($carouselInner);
        $carousel.append(createCarouselControl("left", carouselId));
        $carousel.append(createCarouselControl("right", carouselId));

        // attach carousel to main page (hard-coded ID!!!!!!)
        $('#keynote-row').append($carousel);

        // This is the part where the slides will be added
        return [$carousel, $carouselInner];
    };

    /**
     * Creates a button to advance the carousel right or left
     * @param {String} direction "right" or "left" depending on the direction of the carousel advancer
     * @param {String} carouselId The id of the carousel to attach to
     * @return {jQuery DOM Object} The DOM object of the carousel advancer
     */
    var createCarouselControl = function(direction, carouselId) {
        var $controlLink,
            slideAdvance,
            slideAdvanceText;

        if (direction === "right") {
            slideAdvance = "next";
            slideAdvanceText = "Next";
        } else {
            slideAdvance = "prev";
            slideAdvanceText = "Previous";
        }

        $controlLink = $('<a class="' + direction + ' carousel-control" href="#' + carouselId + '" role="button" data-slide="' + slideAdvance + '"></a>');
        $controlLink.append($('<span class="glyphicon glyphicon-chevron-' + direction + '" aria-hidden="true"></span>'));
        $controlLink.append($('<span class="sr-only">' + slideAdvanceText + '</span>'));

        return $controlLink;
    };

    /**
     * Creates an individual slide for the homepage carousel from a speakers information
     * @param {Object} speaker The object containing all of a speakers information
     * @param {Boolean} active Determines if the carousel slide is active or not (bootstrap specific, should only be applied to ONE slide at the start)
     */
    var createCarouselSlide = function(speaker, active) {
        var $slide = $('<div class="item"></div>'),
            $speakerLink,
            $speakerImg,
            $slideCaptionDiv = $('<div class="carousel-caption"></div>'),
            $slideCaption;

        // added if the slide should be .active (should only be added to one slide)
        if (active) {
            $slide.addClass('active');
        }
        
        // Add speaker information into HTML elements
        $speakerLink = $('<a href="speakers/#' + createSpeakerId(speaker.name) + '"></a>');
        $speakerImg = $('<img src="images/keynotes/' + speaker.image + '" alt="' + speaker.name + '" class="img-rounded center-block">');
        $slideCaption = $('<strong>' + speaker.name + '<br />' + speaker.affiliation + '</strong>');

        // Combine DOM elements into slide
        $slide.append(
            $speakerLink.append(
                $speakerImg
            ).append(
                $slideCaptionDiv.append(
                    $slideCaption
                )
            )
        );
        return $slide;
    };

    $(document).ready(function() {
        $.getJSON('../../meeting_info/meeting_info.json', function(events) {
            var speakers,
                $carouselContainer = $('#keynote-carousel'), // hard-coded ID in HTML
                carouselParts,
                $carousel,
                $carouselInner,
                activeSlide = false;

            // only retrieves speakers with image and bio
            speakers = retrieveSpeakers(events);

            // Create carousel if there are speakers to display
            if (speakers.length > 0) {
                carouselParts = createCarousel("keynote-carousel-slides");
                $carousel = carouselParts[0];
                $carouselInner = carouselParts[1];

                // Create carousel slide for each speaker
                for (var i = 0; i < speakers.length; i++) {
                    activeSlide = false;
                    if (i === 0) {
                        activeSlide = true;
                    }
                    $carouselInner.append(createCarouselSlide(speakers[i], activeSlide));
                }

                // append carousel to homepage (hard-coded ID!!!!!)
                $carouselContainer.append($carousel);
                // $carousel.carousel();

            // otherwise display blanket "coming soon" text
            } else {
                $carouselContainer.append($('<p class="lead text-center">Coming Soon</p>'));
            }

        });
    });
}())