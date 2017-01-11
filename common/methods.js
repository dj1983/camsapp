'use strict';

    angular
        .module('app.core')
        .factory('app.methods', function () {
    /// <summary>
    /// Factory that contains all common methods used by Ca application.
    /// </summary>
    /// <returns type=""></returns>
    /// <doc>CompetencyAssessment.factory:ca.methods</doc>

    return {
        urlFormat: function () {
    /// <summary>
    /// Format url using string.format way to match parameters.
    /// </summary>
    /// <returns type="string">String parsed.</returns>
    /// <doc>CompetencyAssessment.factory:ca.methods#urlFormat</doc>

    var args = arguments,
        url = '',
        baseUrl = '',
        qs = '',
        qsFormatted = '',
        splitted,
        vars = [],
        hash, i;

    if (args === null || args.length === 0) {
        return "";
    }

    if (args.length === 1) {
        url = args[0];
    }
    else {
        url = args[0].replace(/\{(\d+)\}/g, function (match, number) {
            return args[parseInt(number, 10) + 1] !== undefined ? encodeURIComponent(args[parseInt(number, 10) + 1]) : '';
        });
    }

    // Remove empty qs parameters
    if (url.indexOf('?') >= 0) {
        splitted = url.split('?');
        baseUrl = splitted[0];

        if (splitted.length > 1) {
            qs = splitted[1].split('&');
            for (i = 0; i < qs.length; i++) {
                if (qs[i].indexOf('=') >= 0) {
                    hash = qs[i].split('=');
                    vars.push({ code: hash[0], value: hash[1] });
                }
                else {
                    vars.push({ code: qs[i], value: '' });
                }
            }

            // Fill qsFormatted using vars and removing empty values
            for (i = 0; i < vars.length; i++) {
                if (vars[i].value && vars[i].value !== '') {
                    qsFormatted = qsFormatted + ((qsFormatted === '') ? '?' : '&') + vars[i].code + '=' + vars[i].value;
                }
            }

        }
    }
    else {
        baseUrl = url;
    }

    return baseUrl + qsFormatted;
        }
    };
});