﻿/**
* Table To JSON
* jQuery plugin that reads an HTML table and returns a javascript object representing the values and columns of the table
*
* @author Daniel White
* @copyright Daniel White 2013
* @license MIT <https://github.com/lightswitch05/table-to-json/blob/master/MIT-LICENSE>
* @link https://github.com/lightswitch05/table-to-json
* @module Table To JSON
* @version 0.3.0
*/

(function ($) {
    $.fn.tableToJSON = function (opts) {

        // Set options
        var defaults = {
            ignoreColNum: [],
            ignoreHiddenRows: true
        };
        opts = $.extend(defaults, opts);

        // Gather headings
        var headings = [];
        this.find("tr > th").each(function (colIndex, col) {
            if ($.inArray(colIndex, opts.ignoreColNum) === -1) {
                if ($(col).data("column-name") !== undefined && $(col).data("column-name") != null) {
                    headings[colIndex] = $(col).data("column-name");
                } else {
                    headings[colIndex] = $.trim($(col).text());
                }
            } else {
                headings[colIndex] = null;
            }
        });

        // Gather values
        var values = [];
        this.children("tbody").children("tr:has(td)")
    .filter(function (index) {
        // Only get rows with values, no headings
        return $(this).children("th").length === 0;
    }).each(function (rowIndex, row) {
        if ($(row).is(':visible') || !opts.ignoreHiddenRows) {
            values[rowIndex] = {};
            $(row).children("td").each(function (colIndex, col) {
                if (headings[colIndex] !== undefined && headings[colIndex] !== null) {
                    if ($(col).data("cell-value") !== undefined && $(col).data("cell-value") !== null) {
                        values[rowIndex][headings[colIndex]] = $(col).data("cell-value");
                    } else {
                        // bind the text of the column
                        values[rowIndex][headings[colIndex]] = $.trim($(col).text());
                        //added by swathi on 7-May-13: check whether switch exist in column
                        if ($(col).has('div.but-switch').length > 0) {
                            //if exist, bind the checkbox value
                            values[rowIndex][headings[colIndex]] = $(col).has('div.but-switch').find('input[type=checkbox]')[0].checked;
                        }
                        //end 
                    }
                }
            });
        }
    });
        return values;
    };
})(jQuery);
