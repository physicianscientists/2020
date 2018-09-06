/**
 * Sadly, APSA's Annual Meeting website is not a single page web application
 * As a result, IDs used as anchors must be created uniformly across pages
 * This files serves as a repository for creating those IDs
 */

/**
 * Creates a quicky ID for DOM for the speaker for use as an anchor in HTML
 * @param {String} speakerName The name of the speaker
 */
var createSpeakerId = function(speakerName) {
    return speakerName
        ? speakerName.toLowerCase().replace(/ |, |\./g, '-')
        : '';
};

/**
 * Creates an ID for an HTML anchor of the panel
 * @param {String} panelName The name of the panel
 */
var createPanelId = function(panelName) {
    return panelName.toLowerCase().replace(/ |, |\./g, '-');
};
