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
     * Retrieves the panels from the list of events
     * @param {Array} events All events and the associated information
     */
    var retrievePanels = function(events) {
        var panels = [];

        for (var i = 0; i < events.length; i++) {
            if (events[i].type === "panel") {
                // insure that all panels have a date and time
                if (events[i].date && events[i].time) {
                    panels.push(events[i]);
                } else {
                    console.error("The panel listed as event " + (i+1) + " must have a date and time");
                }
            }
        }
        return panels;
    };
    
    /**
     * Creates the preliminary information to display for a panel including the description, datetime, and location
     * @param {Object} panel All panel information including participants
     * @param {*} element The element to attach the panel information to
     * @return void
     */
    var createPanelMainInfo = function(panel, element) {
        var location = panel.location || "TBA";
        
        element.append($('<a id="' + createPanelId(panel.title) + '" class="anchor"></a>'));
        element.append($('<h2 class="page-header">' + panel.title + '</h2>'));
        
        if (panel.description) {
            element.append($('<p>' + panel.description + '</p>'));
        }

        element.append(
            $('<ul>').append(
                $('<li><strong>Date</strong>: ' + formatDateString(new Date(panel.date)) + '</li>')
            ).append(
                $('<li><strong>Time</strong>: ' + panel.time + '</li>')
            ).append(
                $('<li><strong>Location</strong>: ' + location + '</li>')
            )
        )
    };

    /**
     * Retrieves panel participants that have an image, bio, and a name
     * @param {Array} participants List of panel participants
     * @return {Array} list of valid panel participants
     */
    var retrieveValidParticipants = function(participants) {
        var participant,
            validParticipants = [];
        for (var i = 0; i < participants.length; i++) {
            participant = participants[i];
            if (participant.image && participant.bio) {
                if (participant.name) {
                    validParticipants.push(participant);
                } else {
                    console.error("All participants on a panel must have a name");
                }
            }
        }
        return validParticipants;
    };

    /**
     * Creates the anchor and the row and returns the row for attaching elements to it
     * @param {Object} participant All information for a single participant on a specific panel
     * @param {jQuery DOM Object} element The DOM element to attach the row to (typically the main page container)
     * @return {jQuery DOM Object} The row for adding the participant's information for display
     */
    var createPanelParticipantRow = function(participant, element) {
        var $participantRow = $('<div class="row panel-participant-row"></div>');
        
        element
            .append($('<a id="' + createSpeakerId(participant.name) + '" class="anchor"></a>'))
            .append($participantRow);

        return $participantRow;
    };

    /**
     * Creates the image column for a panel participant
     * @param {Object} participant All information for a participant on a specific panel
     * @return {jQuery DOM Object} The column containing the participants image to attach to the participant row
     */
    var createPanelParticipantImageCol = function(participant) {
        var $imageCol = $('<div class="col-sm-3 text-center"></div>');

        $imageCol.append(
            $('<p>').append(
                $('<img src="../images/panels/' + participant.image + '" alt="' + participant.name + '" class="img-responsive img-rounded center-block" />')
            )
        );

        return $imageCol;
    };

    /**
     * Creates the information column for a panel participant, including the name and the description
     * @param {Object} participant All information for a participant on a specific panel
     * @return {jQuery DOM Object} The information column containing the participant's name and bio
     */
    var createPanelParticipantInfoCol = function(participant) {
        var $infoCol = $('<div class="col-sm-8"></div>'),
            nameString = participant.name;

        // add in moderator tag if the participant is the moderator
        if (participant.moderator) {
            nameString += ' (Moderator)';
        }

        // Add affiliation if speaker has one present
        if (participant.affiliation) {
            nameString += ', ' + participant.affiliation;
        }

        $infoCol
            .append('<h4>' + nameString + '</h4>')
            .append($.parseHTML(participant.bio));
        
        return $infoCol;
    };

    $(document).ready(function() {
        $.getJSON('../../meeting_info/meeting_info.json', function(events) {
            var $pageContainer = $('#page-container'),
                panels,
                panelParticipants,
                $participantRow;

            panels = retrievePanels(events);

            // only start displaying panels if there are valid ones to display
            if (panels.length > 0) {
                for (var i = 0; i < panels.length; i++) {
                    createPanelMainInfo(panels[i], $pageContainer);
                    panelParticipants = retrieveValidParticipants(panels[i].participant);
                    
                    // Only display the panel participants if valid ones exist
                    if (panelParticipants.length > 0) {
                        $pageContainer.append('<h3 class="page-header">Participants</h3>');

                        for (var j = 0; j < panelParticipants.length; j++) {
                            $participantRow = createPanelParticipantRow(panelParticipants[j], $pageContainer);
                            $participantRow
                                .append(createPanelParticipantImageCol(panelParticipants[j]))
                                .append(createPanelParticipantInfoCol(panelParticipants[j]));
                        }
                    }
                }

            // otherwise put coming soon text
            } else {
                $pageContainer.append($('<p class="lead text-center">Coming Soon</p>'));
            }

            // Force URL hash navigation after page is created (otherwise page attempts to navigate to hash that hasn't been created yet)
            // Force URL hash navigation after page is created (otherwise page attempts to navigate to hash that hasn't been created yet)
            if (location.hash) {
                document.getElementById(location.hash.slice(1)).scrollIntoView(true, {
                    behavior: 'smooth'
                });
            }
        });
    });
}());