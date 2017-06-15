myNS.autocomplete.initialize = function(scope) {
  var source = function(req, res) {
		var request = {
	    type: 'airport',
	    query: req.term + ' airports in United States'
	  };

	  scope.service.textSearch(request, callback);

		function callback(results, status) {
			// Consider adding regex to verify that location is in the US
			switch(status) {
				case 'OK':
					// Have no more than 5 suggestions
					var len = Math.min(5, results.length)

					// Uncomment to use seed results (without needing to make Google API calls) appended to this file
					// var suggestions = seedResults.results.map(function(result) {
					var suggestions = results.slice(0, len).map(function(result) {
						// Assumes Google returns unique names
						scope.state.searchResultPlaceDetail[result.name] = result;

						return result.name;
					});

					res(suggestions);
				  break;

				case 'ZERO_RESULTS':
					res(['No results found.']);
					break;

				default:
					var message = 'A problem was found with the request:' + status;
					console.warn(message);
					res(message);
				}
		}
	}

  $( "#a1-input" ).autocomplete({
    source: source
  });

  $( "#a2-input" ).autocomplete({
    source: source
  })
}

// var seedResults = {
//    "html_attributions" : [],
//    "results" : [
//       {
//          "formatted_address" : "New York, NY 11430, United States",
//          "geometry" : {
//             "location" : {
//                "lat" : 40.64131109999999,
//                "lng" : -73.77813909999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 40.67117114999999,
//                   "lng" : -73.76339675
//                },
//                "southwest" : {
//                   "lat" : 40.63135774999999,
//                   "lng" : -73.82236615000001
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png",
//          "id" : "87586c86ef1c53323d31eba8260ca7f0ea7cb094",
//          "name" : "John F. Kennedy International Airport",
//          "photos" : [
//             {
//                "height" : 2204,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/105651045546753056949/photos\"\u003eAhmad Mohd\u003c/a\u003e"
//                ],
//                "photo_reference" : "CoQBdwAAAD3XY23s8P_Rfm-T0zrv-yYtZPidbE9Q5JfUpzgsy28XxjL3l0wI_WR5d4Ww_faIcbU58O5hHOsMDLalrt4_1vF_jGEohLKXJwWybJ_IIrs3exl02g83039Ta4A1OL9irnXpwEieBMg38HvtcgkPhds8sLUHEuTBcxz-Ja7HKn4hEhAPIn63wHJjzuV6q9UbWGTrGhTKCSaOOMJXjKbua0gkt0YspUcuhA",
//                "width" : 3920
//             }
//          ],
//          "place_id" : "ChIJR0lA1VBmwokR8BGfSBOyT-w",
//          "rating" : 4,
//          "reference" : "CmRSAAAAukKfGPfZQPmgSCvFje47wHP3AW4jePt-QcpSn-zT8L4bAsNiEBSFHkv6RMj72NXKm0f6drX4vPznBgkxPlsWfcxFDa7LrWnY2qKrcanKFupAfLMlQVoStq-YFfDUpRUTEhB5LudGEZvSEzXSLO0b_YuQGhTVKQHCF-u_God25bxLOVEkjJMrwg",
//          "types" : [ "airport", "point_of_interest", "establishment" ]
//       },
//       {
//          "formatted_address" : "3 Brewster Rd, Newark, NJ 07114, United States",
//          "geometry" : {
//             "location" : {
//                "lat" : 40.68953140000001,
//                "lng" : -74.1744624
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 40.7010876,
//                   "lng" : -74.16704055
//                },
//                "southwest" : {
//                   "lat" : 40.68379319999998,
//                   "lng" : -74.19672795
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png",
//          "id" : "8d57add005d7717b94e463fe24b9825cdd909afc",
//          "name" : "Newark Liberty International Airport",
//          "photos" : [
//             {
//                "height" : 2322,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/107474546702656754111/photos\"\u003ePaul Fevola\u003c/a\u003e"
//                ],
//                "photo_reference" : "CoQBdwAAADmldfeHiDmTc9QcUwRGRX4AlFGk9vP945AmG3Xd22ot6s7z7PEqr5dn0yx4LNdeIZWO4RIxpEDWh9Oe0ula4WG65isyD4ubiej1aGjUopImAVB3haYeJBkyTJooYnMEANXxBaDJCsR2JALO1o9fD9r3B0S8cO6UqIzxR_bD4A0YEhB9Ec58_Eux6H5YooGvfU8fGhRMsK48xCXszJKkbvmUlbQEDA99Bw",
//                "width" : 4128
//             }
//          ],
//          "place_id" : "ChIJ7wzsxeFSwokRhvLXxTe087M",
//          "rating" : 3.3,
//          "reference" : "CmRSAAAA0_wTbNfpN8vAuqsMsZ9_R5GpXNURxiYWjdnsfjA3S5PjWWhyUGhZanCw3D0APmaIby6ZTPl-Z0ztUnVc4MS2lZY-eZHC0afHz_n4kJ-Me9pg5l-5r43AZaDIiqSunFZCEhBUjQPNvuQUV9Mgo2EPSP5BGhQEaLnx83mb4jvzqQ330W1cybMzhQ",
//          "types" : [ "airport", "point_of_interest", "establishment" ]
//       },
//       {
//          "formatted_address" : "New York, NY 11371, United States",
//          "geometry" : {
//             "location" : {
//                "lat" : 40.7769271,
//                "lng" : -73.8739659
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 40.781122,
//                   "lng" : -73.86019215
//                },
//                "southwest" : {
//                   "lat" : 40.7643424,
//                   "lng" : -73.88064874999999
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png",
//          "id" : "f8eabf71af15bb6c56ec923bf2e475ca3a39f3b2",
//          "name" : "LaGuardia Airport",
//          "photos" : [
//             {
//                "height" : 3456,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/111786161601234608617/photos\"\u003eFernando López-Azcárate Fdez\u003c/a\u003e"
//                ],
//                "photo_reference" : "CoQBdwAAADZvDae9ZAcR9u0aLjF8O-ybX5H5ustOoYZv3v_5_8oyP_LP5s0X9wWS9xsHkWC_qb9e5PRElc1JvUCqCearkmWkvw_HODzKj6sHQBLJHRXPp2SbynwaMR1iG0XlEdBLROfO-5r6IKGUuc8S6JwJ0W_JWOac7O0hPxzzUMtAVuy3EhD-fxYUu2jCzUvlIp5-iVpLGhSzm8NpCDjx--qv3PROarNWnXS6xQ",
//                "width" : 5184
//             }
//          ],
//          "place_id" : "ChIJtU1Cg4lfwokRs2aWDmbEL3c",
//          "rating" : 3.3,
//          "reference" : "CmRRAAAALM94j_TfrPA0RGLq7Jn7JQjmNbUsr8ev63u5F4M6QjNTDrrI6AVwdHn4oAr34osufPXfvChDMua_mr31WB7AI16pqkl1eupCTEq7RWc7z9uVbEbktUAdSS2gmmXDWZsdEhCBu2NOwt_LeJjgUMcLQl8hGhRx6xTkTDHzjK5ApCdWB_DR_GUJug",
//          "types" : [ "airport", "point_of_interest", "establishment" ]
//       },
//       {
//          "formatted_address" : "1180 1st St, New Windsor, NY 12553, United States",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.49856349999999,
//                "lng" : -74.1004385
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.4998385802915,
//                   "lng" : -74.09934691970849
//                },
//                "southwest" : {
//                   "lat" : 41.4971406197085,
//                   "lng" : -74.1020448802915
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/airport-71.png",
//          "id" : "7c16d05d110dd418bd6410bcfa7261f7626f5df4",
//          "name" : "Stewart International Airport",
//          "photos" : [
//             {
//                "height" : 1836,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/114862171130506736572/photos\"\u003eJoshua Hail\u003c/a\u003e"
//                ],
//                "photo_reference" : "CoQBdwAAALrd-5tyE0qbVqSyQsTRyytSaMLHI3TsYqFC_RrJhmJ6Nk5PjU6z-CtvlYRkKmlbhWn3f8u4DBX6thnicNZ-SoF-bGgBuQrl9kSYLS84n1ojtnxvJ--_r5z00NqFECCG4JYf3O0xBi9RGOemAxorE27AxMhRhfBgZXam9-pYMCa6EhBrR897r7snyp716bPTYF4HGhQ0bqjD92yhFMy2TZTfE5Hf9rmW-Q",
//                "width" : 3264
//             }
//          ],
//          "place_id" : "ChIJFw_tgxQs3YkR3ZW2YKVU1Vw",
//          "rating" : 4.1,
//          "reference" : "CmRRAAAAhutL2aRmULTJl8Fg_6hpqLtOjPX5S9L20sP_CD2rZaekoD_A7YECKxvBrQG5XaSyPzhFRbJUnrTvwBkUcrv1gD4whXAOERe0pNeBEYFMXlQdXN4N4Cx5aM971syQ0rJxEhDUBVQiN0VM0fwzz2AeZ16BGhTONXmxPmbRC6qYqebL_6ZvZ5EIgw",
//          "types" : [ "airport", "point_of_interest", "establishment" ]
//       }
//    ],
//    "status" : "OK"
// };