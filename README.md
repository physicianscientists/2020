# APSA Annual Meeting Website
This repository serves as APSA's Annual Meeting website.  It is to be copied each year in order to start afresh and create a new one for the upcoming meeting.

## Quicklinks
* [Functionality](#functionality)
* [Website Configuration](#website-configuration)
  * [HTML Pages](#html-pages)
  * [CSS](#css)
  * [Javascript](#javascript)
  * [Images](#images)
* [File Description](#file-description)
* [Agenda](#agenda)
    * [Event Types](#event-types)
    * [JSON Structure](#json-structure)
    * [JSON Event Propogation](#json-event-propogation)
* [Domain Name Structure](#domain-name-structure)
    * [Direct Access (via web browser)](#direct-access-via-web-browser)
    * [Redirect for CNAME](#redirect-for-cname)
* [Managing Website Images](#managing-website-images)
* [Future Meeting Website Deployment](#future-meeting-website-deployment)
    * [Creating a new meeting website](#creating-a-new-meeting-website)
    * [Connecting http://meeting.physicianscientists.org/ to the new repository](#connecting-httpmeetingphysicianscientistsorg-to-the-new-repository)

# Functionality
The main function of the website is to display basic information about the meeting.  The majority of this information involves the meeting's agenda with many pieces of this information display in a different format around the site.  As a result, the meeting's events have been converted to a JSON object, allowing components of the website using the agenda to be created automagically.

# Website Configuration
## HTML Pages
* **Goal**:  display clean URLs in browser address bar without needing file endings (e.g. *.html)
* **Example**:  [meeting.physicianscientists.org/panels/](http://meeting.physicianscientists.org/panels/)
* **Design**
    * Create a single folder per page named according to the webpages content
    * Place a single file named `index.html` in each folder
    * Link to webpages by explicitly omitting `index.html` as the browser will automatically display this file when the folder is referenced

## CSS
* **Goal**:  maintain a single folder for locating all CSS files
* **Location**: `/bootstrap/css/*`
* **Design**
    * Store all CSS files in the above location
    * Keep bootstrap css separated from other CSS
    * Place all custom CSS in `carousel.css`
* **Minimization**:  minimize all CSS files and reference the minimized files `*.min.css`

## Javascript
* **Goal**:  maintain a single folder for locating all JS files
* **Location**: `/bootstrap/js/*`
* **Design**
    * Store all JS files in the above location
    * Keep bootstrap JS separated from other JS
    * Place all custom CSS in `carousel.css`
* **Minimization**:  minimize all CSS files and reference the minimized files `*.min.css`
* **Naming Convention**
    * Place name of page to be affected by JS at the beginning of the file name
    * Ending should describe contents; loose patterns described below
        * **UI**:  adds UI interaction based on user behavior
        * **Creator**:  constructs page from [agenda JSON object](#json-structure)

## Images
* **Goal**: maintain all images in a single folder while organizing them into subdirectories based on *concepts* (e.g. keynotes, panelists, etc.)
* **Location**: `/images/*`
* **Design**
    * `/images/keynotes`:  speaker event images
    * `/images/panels`:  panel event images
    * `/images/luncheon_programs`:  luncheon program images
    * `/images/sponsors`:  sponsor organization images and logos
    * `/images/originals`:  all original keynote and panelist images


# File Description
<table>
  <thead>
    <tr>
      <th>File Name</th>
      <th>File Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>Homepage</li>
          <li>Carousel highlights</li>
          <li>Meeting introduction and highlights</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/agenda/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>Detailed meeting schedule</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/faq/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>Frequently asked questions</li>
          <li>Code of conduct</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/luncheon/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>List of all programs at meeting residency luncheon</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/meeting/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>General meeting information</li>
          <li>Registration pricing</li>
          <li>Venue information</li>
          <li>Accomodations</li>
          <li>Alternative accomodations</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/panels/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>Detailed information on meeting panels</li>
          <li>Panel description</li>
          <li>Panel participants</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/speakers/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>Detailed information on APSA keynotes; NOT other keynotes</li>
          <li>Picture</li>
          <li>BRIEF biosketch</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/sponsors/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>List of sponsors with links to their website</li>
          <li>Sponsors ranked by donation</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/submissions/index.html</code></td>
      <td>html</td>
      <td>
        <ol>
          <li>Abstract, poster, and travel award information</li>
          <li>Displays travel award winners once known</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/bootstrap/css/carousel.css</code></td>
      <td>css</td>
      <td>
        <ol>
          <li>Custom CSS</li>
          <li>MUST be minimized for website to use</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/bootstrap/js/agenda_creator.js</code></td>
      <td>js</td>
      <td>
        <ol>
          <li>Creates the agenda from <a href="#json-structure">JSON Object</a></li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/bootstrap/js/agenda_ui.js</code></td>
      <td>js</td>
      <td>
        <ol>
          <li>Adds interactive UI elements into agenda
            <ol>
              <li>Schedule day fixation</li>
             Future Meeting Website Deploymentc address bar hash</li>
            <Future Meeting Website Deployment
          </lFuture Meeting Website Deployment
        </ol>Future Meeting Website Deployment
      </td>
    </tr>
    <tr>
      <td><code>/bootstrap/js/homepage_carousel.js</code></td>
      <td>js</td>
      <td>
        <ol>
          <li>Creates keynote carousel on homepage using <a href="#json-structure">JSON Object</a></li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/bootstrap/js/js_id_creator.js</code></td>
      <td>js</td>
      <td>
        <ol>
          <li>utility JS functions for creating HTML anchor IDs synonymously across pages</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/bootstrap/js/panel_creator.js</code></td>
      <td>js</td>
      <td>
        <ol>
          <li>Creates panel page from <a href="#json-structure">JSON Object</a></li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><code>/bootstrap/js/speaker_creator.js</code></td>
      <td>js</td>
      <td>
        <ol>
          <li>Creates speakers page from <a href="#json-structure">JSON Object</a></li>
        </ol>
      </td>
    </tr>
  </tbody>
</table>

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
    * `affiliation`: speaker's affiliFuture Meeting Website Deploymentation (keep it brief)
    * `image`: filename of speaker's image located in images/keynotes, displayed on **/speakers/index.html** webpage
    * `agenda_image` (optional): filename of speaker's image located in images/keynotes, displayed on **/agenda/index.html** webpage
    * `lab_url` (optional): URL of speaker's lab or university page
    * `bio`: free text speaker's bio; paragraphs can be created by wrapping them in `<p></p>` HTML tags
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
    * `bio`: free text speaker's bio; paragraphs can be created by wrapping them in `<p></p>` HTML tags
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

# Domain Name Structure
## Direct Access (via web browser)
* `organization-name`.github.io/`repository-name`
* Example:  apsa-meeting.github.io/2016
* Note: `gh.physicianscientists.org` also points to `apsa-meeting.github.io`; therefore, `gh.physicianscientists.org/2016` will work as well

## Redirect for CNAME
* `repository-name`.`organization-name`.github.io.
* Example: 2016.apsa-meeting.github.io.
* Can ONLY be used as a CNAME in a DNS record and will not pull up the correct page when typed directly into a browser’s address bar or when used in an html \<a\> tag
* For redirect to work, the repository requires a CNAME file in it containing the domain name that will be used in the DNS record to point to the repository

# Managing Website Images
Briefly:  Images are one of the biggest reasons for slow webpage load times.  While not following this section will not break the website, this section is not optional and is vital to maintaining rapid load times.

1. Use JPEG (*.jpg) image format
2. Shrink images to appropriate size
    1. Agenda
        1. Speakers:  height: auto; width: 80px
        2. Panelists:  height: 75px; width: 75px (crop as necessary)
    2. Separate pages (panels/index.html and speakers/index.html)
          1. Speakers and Panelists:  height:  200px; width:  auto
3. Use image quality score of 75 - 85%
4. Losslessly compress image (see “Suggested Applications” section) (follow [Google’s suggestions](https://developers.google.com/speed/docs/insights/OptimizeImages) if using ImageMagick)
5. Use [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) for any further compression (allows download of optimized images)

# Future Meeting Website Deployment
## Creating a new meeting website
1. Go to https://github.com/APSA-meeting
2. Create a new repository named for the meeting year (“2017”, “2018”, etc.)
3. After clicking “Create repository”, select “Import code” on the next screen
4. Select the previous year’s repository to create a copy to work with
5. Edit website pages based on “Page Content” section above

## Connecting [http://meeting.physicianscientists.org/](http://meeting.physicianscientists.org/) to the new repository
1. Delete the CNAME file in the repository for the previous year’s annual meeting website
2. In “Settings” for new repository, put “meeting.physicianscientists.org” in “Custom Domain” section
3. Login to APSA’s account at https://www.cloudflare.com/
4. Change the CNAME of “meeting.physicianscientists.org” to “`repository-name`.apsa-meeting.github.io.” (i.e. 2017.apsa-meeting.github.io.)
5. Add github link to old repository (i.e. gh.physicianscientists.org/2016) to “Past Events” page on APSA’s main website as archive
