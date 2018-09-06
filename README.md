# APSA Annual Meeting Website
This repository serves as APSA's Annual Meeting website.  It is to be copied each year in order to start afresh and create a new one for the upcoming meeting.

## Quicklinks
* [Functionality](#functionality)
* [Site Layout](#site-layout)
* [Agenda](#agenda)
    * [Event Types](#event-types)
    * [JSON Structure](#json-structure)
    * [JSON Event Propogation](#json-event-propogation)

# Functionality
The main function of the website is to display basic information about the meeting.  The majority of this information involves the meeting's agenda with many pieces of this information display in a different format around the site.  As a result, the meeting's events have been converted to a JSON object, allowing components of the website using the agenda to be created automagically.

# Site Layout


# Agenda
The agenda is a major component of the website, has its structure stored in JSON, and impacts the content of many of the website's pages.  As previously mentioned, the JSON object controlling the schedule can be found in two files:

* `meeting_info/meeting_info.json`
* `meeting_info/meeting_info.json.default`

The `meeting_info/meeting_info.json.default` serves as a template for the JSONified agenda events, whereas the `meeting_info/meeting_info.json` is the **real** file used by the website.

## Event Types
The agenda consists of four main events that can be slightly modified through the JSON described below.  These events are *normal*, *session*, *keynote*, and *panel*.

### Normal
A basic event that only possesses a title, date, time, and optional description.  This event is only displayed on the agenda page.  Descriptions should be minimal and used sparingly.  This event can easily be used to indicate breaks.

### Session
This is an artificial event that merely indicates the start of a session of events rather than describing a single event.  It can also be used to indicate session moderator switches.

### Keynote
A complex event that holds event information for keynote speaker events.  The agenda adapts to the number of speakers, displaying events consisting of one speaker differently than events with two or more.  Additionally, many pieces of information for this event are optional.  The final event on the agenda will adapt to what is provided.

All of the speakers across all events are individually listed in a carousel on the homepage and a page highlighting them.  However, images are required for display in the homepage carousel, and both an image and a bio are required for display on the speaker page.

### Panel
Another complex event that displays a panel and all associated participants.  Similar to the keynote, some information components are optional.  The display will adapt if they are missing.

The panels and their participants are also displayed in a special page highlighting the event.

## JSON Structure
An example of the JSON structure can be found in [`meeting_info/meeting_info.json`](https://github.com/APSA-meeting/2019/blob/gh-pages/meeting_info/meeting_info.json.default).  It's structure is broken down into the 4 key event types:  *normal*, *session*, *keynote*, and *panel*.  All events **must** have a `type` property indicating the type of event in order for the event to display.

### Normal
This event is a standard event with just a title, time, location, and optional description.  The JSON properties available are listed below:

* `type`:  *normal*
* `title`: name of the event in raw text
* `date`: date of the event (e.g. April 21, 2019)
* `time`: time of the event (e.g. 2:00 - 3:00 pm)
* `location`: location of the event (defaults to "TBA" if ommitted)
* `description` (optional): creates a collapsible description of the event on the agenda
* `apsa`: boolean indicating if the event is an APSA-sponsored event

### Session
This event is an artificial event that marks the beginning of sessions and moderator changes.

* `type`:  *session*
* `title`: name of the event in raw text
* `date`: date of the event (e.g. April 21, 2019)
* `time`: time of the event (e.g. 2:00 - 3:00 pm)
* `location`: location of the event (defaults to "TBA" if ommitted)
* `apsa`: boolean indicating if the event is an APSA-sponsored event

### Keynote
This event if for any event that has a speaker **minus** panels (see [below](#panel)).  It will adapt to one or many speakers.

* `type`:  *keynote*
* `award` (optional): extra raw text title for award events
* `title`: name of the event in raw text
* `speaker`: **array** of **objects** (can have multiple) (properties below)
    * `speaker_type`: raw text placed in front of speaker name on agenda (defaults to *Invited Speaker*)
    * `title` (optional): speaker's talk title in raw text
    * `name`: speaker's name and degree(s)
    * `affiliation`: speaker's affiliation (keep it brief)
    * `image`: filename of speaker's image located in images/keynotes, displayed on **/speakers/index.html** webpage
    * `agenda_image` (optional): filename of speaker's image located in images/keynotes, displayed on **/agenda/index.html** webpage
    * `lab_url` (optional): URL of speaker's lab or university page
    * `bio`: free text speaker's bio
    * `time` (optional): time for specific speaker in a multi-speaker event
* `date`: date of the event (e.g. April 21, 2019)
* `time`: time of the event (e.g. 2:00 - 3:00 pm)
* `location`: location of the event (defaults to "TBA" if ommitted)
* `apsa`: boolean indicating if the event is an APSA-sponsored event

### Panel
* `type`:  *keynote*
* `award` (optional): extra raw text title for award events
* `title`: name of the event in raw text
* `participant`: **array** of **objects** (can have multiple) (properties below)
    * `moderator`: boolean indicating whether participant is moderator
    * `name`: participant's name and degree(s)
    * `affiliation`: speaker's affiliation (keep it brief)
    * `image`: filename of participant's image located in images/panels, displayed on **/panels/index.html** webpage
    * `agenda_image`: filename of speaker's image located in images/panels, displayed on **/agenda/index.html** webpage
    * `bio`: free text speaker's bio
* `date`: date of the event (e.g. April 21, 2019)
* `time`: time of the event (e.g. 2:00 - 3:00 pm)
* `location`: location of the event (defaults to "TBA" if ommitted)
* `description` (optional): creates a collapsible description of the event on the agenda
* `apsa`: boolean indicating if the event is an APSA-sponsored event

## JSON Event Propogation
Each event event type affects a different number of pages.  Some are limited to only the agenda, while others are responsible for a large portion of the website's content.  The webpages affected and the impact on each are listed below.

### Normal
* `/agenda/index.html`:  creates a normal event

### Session
* `/agenda/index.html`:  creates a session change event

### Keynote
* `/agenda/index.html`:  creates a keynote event hosting a speaker
* `/index.html`:  all speakers **with images** are shown in the homepage carousel
* `/speakers/index.html`: all speakers **with images AND bios** are shown in in the speakers page highlighting each one

### Panel
* `/agenda/index.html`:  creates a normal event
* `/panels/index.html`: all participants **with images AND bios** are shown in in the panels page attached to the appropriate panel
