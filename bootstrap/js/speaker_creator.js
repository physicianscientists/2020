(function() {
    'use strict';
    /**
     * Formats a date object into the following: Friday, April 23
     * @param {DateObject} date
     * @return {String} Formatted date string
     */
    var formatDateString = function(date) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
    };


    /**
     * Pulls all speakers from all events into a single array
     * The issue is that some information relevant to the speaker is associated with the event, not the speaker, and needs to be re-assigned
     * @param {Array} events The array containing information for all events
     * @return {Array} The list of speaker objects containing pertinent information
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
                    // add event time to speaker object if their isn't one explicity affiliated with speaker
                    if (! eventSpeakers[j].time) {
                        eventSpeakers[j].time = events[i].time;
                    }

                    // add speaker date, location, and apsa flag from main event date
                    eventSpeakers[j].date = events[i].date;
                    eventSpeakers[j].location = events[i].location;
                    eventSpeakers[j].apsa = events[i].apsa;

                    // insure the presence of an image and bio for adding to the list of speakers to display
                    if (eventSpeakers[j].image && eventSpeakers[j].bio) {
                         if (eventSpeakers[j].date && eventSpeakers[j].time) {
                            speakers.push(eventSpeakers[j]);
                         } else {
                             console.error("A time and date must be associated with the event or all speakers associated with event " + (i+1));
                         }
                    }
                }
            }
        }

        return speakers;
    };

    /**
     * Creates a speaker row by first creating an anchor, header, and then a row, finally returning the row to be filled
     * @param {Object} speaker The object containing all information on a single speaker
     * @param {jQuery DOM Object} element The element to attach the speaker information to
     * @return {jQuery DOM Object} The jQuery DOM Object div that represents the row to be populated with speaker information
     */
    var createSpeakerRow = function(speaker, element) {
        var $speakerAnchor,
            $speakerHeader,
            $speakerLink,
            $speakerRow = $('<div class="row"></div>'),
            speakerOrganization = "ASCI/AAP Speaker";

        if (speaker.apsa) {
            speakerOrganization = "APSA Speaker";
        }

        $speakerAnchor = $('<a id="' + createSpeakerId(speaker.name) + '" class="anchor"></a>');
        element.append($speakerAnchor);

        $speakerHeader = $('<h3 class="page-header">' + speaker.name + ' (' + speakerOrganization + ')</h3>');

        // wrap presenter's name in lab url if present, otherwise just attach presenter's name
        if (speaker.lab_url) {
            $speakerLink = $('<a href="' + speaker.lab_url + '" target="_blank"></a>');
            $speakerLink.append($speakerHeader);
            element.append($speakerLink);
        
        } else {
            element.append($speakerHeader);
        }

        element.append($speakerRow);
        
        return $speakerRow;
    };

    /**
     * Creates the image column for teh speaker row
     * @param {Object} speaker The information for the speaker
     * @return {jQuery DOM Object} The DOM object of the column to be attached to the speaker row
     */
    var createSpeakerImageColumn = function(speaker) {
        var $imageCol = $('<div class="col-sm-3 text-center"></div>'),
            location = speaker.location || "TBA";

        $imageCol.append($('<p><img src="../images/keynotes/' + speaker.image + '" alt="' + speaker.image + '" class="img-responsive img-rounded center-block" /></p>'));
        $imageCol.append($('<p><strong>' + formatDateString(new Date(speaker.date)) + '<br />' + speaker.time + '</strong></p>'));
        $imageCol.append($('<p><em>' + location + '</em></p>'));

        return $imageCol;
    };

    /**
     * Creates the biography column for the speaker
     * @param {Object} speaker All speaker information
     */
    var createSpeakerBioColumn = function(speaker) {
        var $bioColumn = $('<div class="col-sm-8">');

        $bioColumn.append('<h4>' + speaker.affiliation + '</h4>');

        // Assume the ability to parse HTML
        $bioColumn.append($.parseHTML(speaker.bio));

        return $bioColumn;
    };

    $(document).ready(function() {
        $.getJSON('../../meeting_info/meeting_info.json', function(events) {
            var speakers,
                $pageContainer = $('#page-container'),
                $speakerRow;

            speakers = retrieveSpeakers(events);

            // if speakers can be highlighted (have image and bio) display them
            if (speakers.length > 0) {
                $pageContainer.append($('<h2 class="page-header">Keynote Speakers</h2>'));
                
                for (var i = 0; i < speakers.length; i++) {
                    $speakerRow = createSpeakerRow(speakers[i], $pageContainer);
                    $speakerRow.append(createSpeakerImageColumn(speakers[i]));
                    $speakerRow.append(createSpeakerBioColumn(speakers[i]));

                    $pageContainer.append($speakerRow);
                }
            
            // otherwise, display coming soon text
            } else {
                $pageContainer.append($('<p class="lead text-center">Coming Soon</p>'));
            }
        });
    });
}());