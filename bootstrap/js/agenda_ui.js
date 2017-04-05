// Toggle More or Less panel descriptions
(function() {
    $('.more-less').on("hide.bs.collapse", function() {
        $(this).children().children('a[data-toggle]').text('More');
    })
    .on("show.bs.collapse", function() {
        $(this).children().children('a[data-toggle]').text('Less');
    });

    // Hover effect turning opacity on
    $('.bubble-md, .bubble-sm').mouseover(function() {
        $(this).children().children('div').css('opacity', '0.5');
    })
    .mouseout(function() {
        $(this).children().children('div').css('opacity', '1');
    });
})();

// Display top button to return top
(function() {
    $(window).on('scroll', function() {
        var appearHeight = $('.anchor').eq(1).offset().top;
        if (window.pageYOffset >= appearHeight) {
            $('.top-navigation').fadeIn();
        
        } else {
            $('.top-navigation').fadeOut();
        }
    });

    $('.top-navigation').click(function() {
        window.scrollTo(0, 0);
    });
})();

// Code to create the affix effect (complements of adussaq)
/*global $, window*/
(function () {
    'use strict';

    var setParameters, nestThem, resetParents, table$, originalHeader$;

    setParameters = function (index) {
        var $agendaDay = $(this), navbarHeight = $('.navbar').height(),
                $table = $(table$[index]), tableTop = $table.offset().top,
                tableBottom = tableTop + $table.height();

        //When it is affixed make sure the parent does not lose any height
        $agendaDay.on('affix.bs.affix', function () {
            //Maintian width
            $agendaDay.css("width", $agendaDay.parent().width());
            $agendaDay.parent().css("min-height", $agendaDay.height());
        });

        //Actually set up the affix functions
        $agendaDay.affix({
            offset: {
                top: $agendaDay.offset().top - navbarHeight,
                bottom: $(document).height() - tableBottom
            }
        });
    };

    nestThem = function () {
        var $header = $(this), $temp;
        $temp = $('<div>');
        $header.wrap($temp);

        //return the non jquery element
        return $header.parent()[0];
    };

    resetParents = function (index) {
        var $parent = $(this), $temp;
        //Creates a new div out of the contained html, removing affix
        $temp = $(originalHeader$[index]).clone();

        //Removes old stuff and replaces it with the new
        $parent.empty();
        $parent.append($temp);

        //Set new minimum height for the parent
        $parent.css("min-height", $temp.height());

        //return the non jquery element
        return $temp[0];
    };

    $(window).load(function () {
        var header$, parent$;
        //Set the table array
        table$ = $('.agenda-table');

        //Get all of the headers that will be affixed
        header$ = $('.agenda-day');
        originalHeader$ = header$.clone();

        //Now nest them, returning the parents
        parent$ = header$.map(nestThem);

        //Now set all the affix parameters
        header$.each(setParameters);

        $(window).on('resize', function () {
            //return the headers to the start point as far as HTML goes, this is
            // the only way to reset the affix points...
            header$ = parent$.map(resetParents);

            //set the new parameters
            header$.each(setParameters);
        });
    });
}());

// Code to add hashes where appropriate (compliments of adussaq)
$(function () {
    var addHashToUrl = function (hash) {
        //If we can manipulate this
        if (history) {
            if (hash.length === 0) {
                //No hash passed, set it to nothing
                history.pushState(
                    '',
                    document.title,
                    window.location.pathname
                );
            } else {
                //Hash passed, set it to the appropriate value
                history.pushState(
                    '',
                    document.title,
                    window.location.pathname + '#' + hash
                );
            }
        }
    };

    $(document).scroll(function () {
        var i, top = window.pageYOffset, currentHash = window.location.hash,
                //These last two values initialize the loop below
                last_loc = -1, newHash = "", found = 0;

        //Get each of the possibilities and see if that is where we are
        $('.anchor').each(function (index) {
            var this_loc = $(this).offset().top;
            if (!found) {
                if (top > last_loc && top < this_loc) {
                    //We found it!
                    found = 1;
                } else {
                    //If we are not there then change the values to be set
                    last_loc = this_loc;
                    newHash = $(this).attr('id');
                }
            }
        });
        //Now set the location if it has changed
        if (newHash !== currentHash) {
            addHashToUrl(newHash);
        }
    });
});