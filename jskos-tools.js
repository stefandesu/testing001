(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jskos = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  // adapted from from https://locutus.io/php/strings/sha1/
  var sha1 = function sha1(str) {
    //  discuss at: https://locutus.io/php/sha1/
    // original by: Webtoolkit.info (https://www.webtoolkit.info/)
    // improved by: Michael White (https://getsprink.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    //      note 1: Keep in mind that in accordance with PHP, the whole string is buffered and then
    //      note 1: hashed. If available, we'd recommend using Node's native crypto modules directly
    //      note 1: in a steaming fashion for faster and more efficient hashing
    //   example 1: sha1('Kevin van Zonneveld')
    //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
    var _rotLeft = function _rotLeft(n, s) {
      var t4 = n << s | n >>> 32 - s;
      return t4;
    };

    var _cvtHex = function _cvtHex(val) {
      var str = "";
      var i;
      var v;

      for (i = 7; i >= 0; i--) {
        v = val >>> i * 4 & 0x0f;
        str += v.toString(16);
      }

      return str;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp; // utf8_encode

    str = unescape(encodeURIComponent(str));
    var strLen = str.length;
    var wordArray = [];

    for (i = 0; i < strLen - 3; i += 4) {
      j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
      wordArray.push(j);
    }

    switch (strLen % 4) {
      case 0:
        i = 0x080000000;
        break;

      case 1:
        i = str.charCodeAt(strLen - 1) << 24 | 0x0800000;
        break;

      case 2:
        i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000;
        break;

      case 3:
        i = str.charCodeAt(strLen - 3) << 24 | str.charCodeAt(strLen - 2) << 16 | str.charCodeAt(strLen - 1) << 8 | 0x80;
        break;
    }

    wordArray.push(i);

    while (wordArray.length % 16 !== 14) {
      wordArray.push(0);
    }

    wordArray.push(strLen >>> 29);
    wordArray.push(strLen << 3 & 0x0ffffffff);

    for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
      for (i = 0; i < 16; i++) {
        W[i] = wordArray[blockstart + i];
      }

      for (i = 16; i <= 79; i++) {
        W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
      }

      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;

      for (i = 0; i <= 19; i++) {
        temp = _rotLeft(A, 5) + (B & C | ~B & D) + E + W[i] + 0x5A827999 & 0x0ffffffff;
        E = D;
        D = C;
        C = _rotLeft(B, 30);
        B = A;
        A = temp;
      }

      for (i = 20; i <= 39; i++) {
        temp = _rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1 & 0x0ffffffff;
        E = D;
        D = C;
        C = _rotLeft(B, 30);
        B = A;
        A = temp;
      }

      for (i = 40; i <= 59; i++) {
        temp = _rotLeft(A, 5) + (B & C | B & D | C & D) + E + W[i] + 0x8F1BBCDC & 0x0ffffffff;
        E = D;
        D = C;
        C = _rotLeft(B, 30);
        B = A;
        A = temp;
      }

      for (i = 60; i <= 79; i++) {
        temp = _rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6 & 0x0ffffffff;
        E = D;
        D = C;
        C = _rotLeft(B, 30);
        B = A;
        A = temp;
      }

      H0 = H0 + A & 0x0ffffffff;
      H1 = H1 + B & 0x0ffffffff;
      H2 = H2 + C & 0x0ffffffff;
      H3 = H3 + D & 0x0ffffffff;
      H4 = H4 + E & 0x0ffffffff;
    }

    temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4);
    return temp.toLowerCase();
  };

  /**
   * Module to calculate JSKOS mapping identifiers.
   */
  // Reduce JSKOS set to members with URI.

  function reduceSet(set) {
    return set.map(function (member) {
      return member && member.uri;
    }).filter(Boolean);
  } // Tell which concept bundle field is used.


  function memberField(bundle) {
    return ["memberSet", "memberList", "memberChoice"].find(function (f) {
      return bundle[f];
    });
  } // Reduce JSKOS concept bundle to memberSet/List/Choice with member URIs only.


  function reduceBundle(bundle) {
    var field = memberField(bundle);
    var set = bundle[field] ? reduceSet(bundle[field]) : [];
    return _defineProperty({}, set.length > 1 ? field : "memberSet", set.map(function (uri) {
      return {
        uri: uri
      };
    }));
  } // Reduce mapping to reduced fields from, to, and type.


  function mappingContent(mapping) {
    var from = mapping.from,
        to = mapping.to,
        type = mapping.type;
    var result = {
      from: reduceBundle(from || {}),
      to: reduceBundle(to || {}),
      type: [type && type[0] || "http://www.w3.org/2004/02/skos/core#mappingRelation"]
    };

    for (var _i = 0, _arr = ["from", "to"]; _i < _arr.length; _i++) {
      var side = _arr[_i];

      if ((result[side][memberField(result[side])] || []).length == 0) {
        var scheme = mapping[side + "Scheme"];

        if (scheme && scheme.uri) {
          // Create new object to remove all unnecessary properties.
          result[side + "Scheme"] = {
            uri: scheme.uri
          };
        }
      }
    }

    return result;
  } // Get a sorted list of member URIs.


  function mappingMembers(mapping) {
    var _ref2;

    var from = mapping.from,
        to = mapping.to;
    var memberUris = [from, to].filter(Boolean).map(function (bundle) {
      return reduceSet(bundle[memberField(bundle)] || []);
    });
    return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(memberUris)).sort();
  }
  /**
   * Returns a mapping content identifier. The identifier starts with `urn:jskos:mapping:content:`
   * and takes concepts and type into consideration. It uses the `mappingContent` function to get
   * relevant properties from the mapping.
   * @memberof module:jskos-tools
   */


  function mappingContentIdentifier(mapping) {
    var json = JSON.stringify(mappingContent(mapping), ["from", "fromScheme", "to", "toScheme", "type", "memberSet", "memberList", "memberChoice", "uri"]);
    return "urn:jskos:mapping:content:" + sha1(json + "\n");
  }
  /**
   * @memberof module:jskos-tools
   */


  function mappingMembersIdentifier(mapping) {
    var json = JSON.stringify(mappingMembers(mapping));
    return "urn:jskos:mapping:members:" + sha1(json + "\n");
  }
  /**
   * @memberof module:jskos-tools
   */


  function addMappingIdentifiers(mapping) {
    var identifier = (mapping.identifier || []).filter(function (id) {
      return !id.startsWith("urn:jskos:mapping:");
    }).concat([mappingMembersIdentifier(mapping), mappingContentIdentifier(mapping)]).sort();
    return Object.assign({}, mapping, {
      identifier: identifier
    });
  }

  function compare(mapping1, mapping2, prefix) {
    mapping1 = mapping1 && addMappingIdentifiers(mapping1);
    mapping2 = mapping2 && addMappingIdentifiers(mapping2);
    var id1 = mapping1 && mapping1.identifier ? mapping1.identifier.find(function (element) {
      return element.startsWith(prefix);
    }) : null;
    var id2 = mapping2 && mapping2.identifier ? mapping2.identifier.find(function (element) {
      return element.startsWith(prefix);
    }) : null;
    return id1 == id2;
  }
  /**
   * @memberof module:jskos-tools
   */


  function compareMappings(mapping1, mapping2) {
    return compare(mapping1, mapping2, "urn:jskos:mapping:content:");
  }

  var compareMappingContent = compareMappings;
  /**
   * @memberof module:jskos-tools
   */

  function compareMappingMembers(mapping1, mapping2) {
    return compare(mapping1, mapping2, "urn:jskos:mapping:members:");
  }

  var identifiers = {
    mappingContent: mappingContent,
    mappingMembers: mappingMembers,
    mappingContentIdentifier: mappingContentIdentifier,
    mappingMembersIdentifier: mappingMembersIdentifier,
    addMappingIdentifiers: addMappingIdentifiers,
    compareMappings: compareMappings,
    compareMappingContent: compareMappingContent,
    compareMappingMembers: compareMappingMembers
  };

  function isEqualWith(a, b, compare) {
    var pSlice = Array.prototype.slice;
    var Object_keys = typeof Object.keys === "function" ? Object.keys : function (obj) {
      var keys = [];

      for (var key in obj) {
        keys.push(key);
      }

      return keys;
    };

    var deepEqual = function deepEqual(actual, expected) {
      if (actual === expected) {
        return true;
      } else if (actual instanceof Date && expected instanceof Date) {
        return actual.getTime() === expected.getTime();
      } else if (_typeof(actual) != "object" && _typeof(expected) != "object") {
        return actual == expected;
      } else {
        return objEquiv(actual, expected);
      }
    };

    function isUndefinedOrNull(value) {
      return value === null || value === undefined;
    }

    function isArguments(object) {
      return Object.prototype.toString.call(object) == "[object Arguments]";
    }

    function objEquiv(a, b) {
      if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
      if (a.prototype !== b.prototype) return false;

      if (isArguments(a)) {
        if (!isArguments(b)) {
          return false;
        }

        a = pSlice.call(a);
        b = pSlice.call(b);
        return deepEqual(a, b);
      }

      try {
        var ka = Object_keys(a),
            kb = Object_keys(b),
            key,
            i;
      } catch (e) {
        return false;
      }

      if (ka.length != kb.length) return false;
      ka.sort();
      kb.sort();

      for (i = ka.length - 1; i >= 0; i--) {
        if (ka[i] != kb[i]) return false;
      }

      for (i = ka.length - 1; i >= 0; i--) {
        key = ka[i];

        if (compare) {
          var result = compare(a[key], b[key], key);

          if (result === undefined) {
            // fallback to method without comparison
            result = isEqualWith(a[key], b[key]);
          }

          if (!result) {
            return false;
          }
        } else {
          if (!deepEqual(a[key], b[key])) return false;
        }
      }

      return true;
    }

    return deepEqual(a, b);
  }

  var utils = {
    get: function get(obj, path) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      var travel = function travel(regexp) {
        return String.prototype.split.call(path, regexp).filter(Boolean).reduce(function (res, key) {
          return res !== null && res !== undefined ? res[key] : res;
        }, obj);
      };

      var result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
      return result === undefined || result === obj ? defaultValue : result;
    },
    pick: function pick(object, keys) {
      return keys.reduce(function (obj, key) {
        // eslint-disable-next-line no-prototype-builtins
        if (object && object.hasOwnProperty(key)) {
          obj[key] = object[key];
        }

        return obj;
      }, {});
    },
    forOwn: function forOwn(object, cb) {
      for (var key in object) {
        // eslint-disable-next-line no-prototype-builtins
        if (object.hasOwnProperty(key)) {
          cb(object[key], key);
        }
      }
    },
    isEqual: function isEqual(a, b) {
      return isEqualWith(a, b);
    },
    isEqualWith: isEqualWith,
    intersection: function intersection() {
      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }

      return arrays.reduce(function (a, b) {
        return a.filter(function (c) {
          return b.includes(c);
        });
      });
    },
    isArray: Array.isArray,
    isObject: function isObject(object) {
      return _typeof(object) === "object" && object !== null;
    },
    isString: function isString(str) {
      return str && typeof str.valueOf() === "string" ? true : false;
    },
    union: function union(a, b) {
      return _toConsumableArray(new Set([].concat(_toConsumableArray(a), _toConsumableArray(b))));
    },
    unionWith: function unionWith(a, b, compare) {
      return [].concat(_toConsumableArray(a), _toConsumableArray(b)).reduce(function (p, c) {
        if (p.findIndex(function (v) {
          return compare(v, c);
        }) !== -1) {
          return p;
        }

        p.push(c);
        return p;
      }, []);
    },
    omitMod: function omitMod(obj, paths) {
      var _iterator = _createForOfIteratorHelper(paths),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var path = _step.value;

          if (typeof path === "string") {
            path = path.split(".");
          }

          for (var i = 0; i < path.length - 1; i++) {
            obj = obj[path[i]];

            if (typeof obj === "undefined") {
              continue;
            }
          }

          delete obj[path.pop()];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };

  var mappingTypes = [
  	{
  		RELEVANCE: "very high",
  		broader: [
  			{
  				uri: "http://www.w3.org/2004/02/skos/core#closeMatch"
  			}
  		],
  		definition: {
  			de: [
  				"gleiche Bedeutung"
  			],
  			en: [
  				"same meaning"
  			]
  		},
  		notation: [
  			"="
  		],
  		prefLabel: {
  			ar: "تطابق تام",
  			be: "дакладная адпаведнасць",
  			"be-tarask": "дакладная адпаведнасьць",
  			ca: "equivalència exacta",
  			cs: "přesná shoda",
  			da: "exact match",
  			de: "exakte Übereinstimmung",
  			en: "exact match",
  			eo: "ekzakta ekvivalento",
  			es: "equivalencia exacta",
  			fi: "vastaava käsite",
  			fr: "équivalence exacte",
  			he: "התאמה מדויקת",
  			hu: "pontos egyezés",
  			id: "sama persis",
  			it: "corrispondenza esatta",
  			ja: "完全一致",
  			mk: "точно совпаѓање",
  			ms: "padanan tepat",
  			nb: "eksakt samsvar",
  			nl: "exacte match",
  			nn: "eksakt samsvar",
  			pl: "dokładne dopasowanie",
  			pt: "correspondência exata",
  			ro: "echivalentul exact",
  			ru: "точное соответствие",
  			sq: "përputhje e përpiktë",
  			sr: "тачно подударање",
  			sv: "exakt träff",
  			uk: "точна відповідність",
  			zh: "精確匹配",
  			"zh-hans": "精确匹配",
  			"zh-hant": "精確匹配"
  		},
  		SHORT: "exact",
  		uri: "http://www.w3.org/2004/02/skos/core#exactMatch"
  	},
  	{
  		RELEVANCE: "high",
  		broader: [
  			{
  				uri: "http://www.w3.org/2004/02/skos/core#mappingRelation"
  			}
  		],
  		definition: {
  			de: [
  				"in etwa gleiche Bedeutung"
  			],
  			en: [
  				"same general idea but not fully identical meaning"
  			]
  		},
  		notation: [
  			"≈"
  		],
  		prefLabel: {
  			ar: "تطابق قريب",
  			"be-tarask": "блізкая адпаведнасьць",
  			ca: "equivalència inexacta",
  			de: "hohe Übereinstimmung",
  			en: "close match",
  			eo: "proksima kongruaĵo",
  			es: "equivalencia inexacta",
  			fi: "lähes vastaava käsite",
  			fr: "quasi-équivalence",
  			he: "התאמה קרובה",
  			it: "corrispondenza stretta",
  			mk: "блиско совпаѓање",
  			nb: "nært samsvar",
  			nl: "nabije match",
  			nn: "nært samsvar",
  			pl: "częściowe dopasowanie",
  			pt: "correspondência próxima",
  			ru: "близкое соответствие",
  			sr: "блиско поклапање",
  			sv: "nära matchning",
  			"zh-hans": "高度匹配"
  		},
  		SHORT: "close",
  		uri: "http://www.w3.org/2004/02/skos/core#closeMatch"
  	},
  	{
  		RELEVANCE: "medium",
  		broader: [
  			{
  				uri: "http://www.w3.org/2004/02/skos/core#mappingRelation"
  			}
  		],
  		definition: {
  			de: [
  				"umfassendere Bedeutung"
  			],
  			en: [
  				"broader meaning"
  			]
  		},
  		notation: [
  			">"
  		],
  		prefLabel: {
  			"be-tarask": "шырокая адпаведнасьць",
  			de: "allgemeinere Bedeutung",
  			en: "broad match",
  			eo: "malstrikta kongruo",
  			fi: "vastaava laajempi käsite",
  			he: "התאמה רחבה",
  			it: "corrispondenza generica",
  			ja: "部分一致",
  			mk: "пошироко совпаѓање",
  			nb: "bredere samsvar",
  			nl: "brede match",
  			nn: "breitt samsvar",
  			pl: "dopasowanie pojęcia o szerszym znaczeniu",
  			"pt-br": "correspondência genérica",
  			ru: "более широкое соответствие",
  			sv: "bred träff",
  			"zh-hans": "广泛匹配"
  		},
  		related: [
  			{
  				uri: "http://www.w3.org/2004/02/skos/core#narrowMatch"
  			}
  		],
  		SHORT: "broad",
  		uri: "http://www.w3.org/2004/02/skos/core#broadMatch"
  	},
  	{
  		RELEVANCE: "medium",
  		broader: [
  			{
  				uri: "http://www.w3.org/2004/02/skos/core#mappingRelation"
  			}
  		],
  		definition: {
  			de: [
  				"umfassendere Bedeutung"
  			],
  			en: [
  				"more specific meaning"
  			]
  		},
  		notation: [
  			"<"
  		],
  		prefLabel: {
  			"be-tarask": "вузкая адпаведнасьць",
  			de: "spezifischere Bedeutung",
  			en: "narrow match",
  			eo: "strikta kongruo",
  			fi: "vastaava suppeampi käsite",
  			he: "התאמה צרה",
  			mk: "потесно совпаѓање",
  			nb: "smalere samsvar",
  			nl: "nauwe match",
  			nn: "snevert samsvar",
  			pl: "dopasowanie pojęcia o węższym znaczeniu",
  			"pt-br": "correspondência aproximada",
  			ru: "более узкое соответствие",
  			sv: "smal träff",
  			"zh-hans": "有限匹配"
  		},
  		related: [
  			{
  				uri: "http://www.w3.org/2004/02/skos/core#broadMatch"
  			}
  		],
  		SHORT: "narrow",
  		uri: "http://www.w3.org/2004/02/skos/core#narrowMatch"
  	},
  	{
  		RELEVANCE: "low",
  		broader: [
  			{
  				uri: "http://www.w3.org/2004/02/skos/core#mappingRelation"
  			}
  		],
  		definition: {
  			de: [
  				"assoziative Verknüpfung unterschiedlicher Bedeutungen"
  			],
  			en: [
  				"associative link between meanings"
  			]
  		},
  		notation: [
  			"~"
  		],
  		prefLabel: {
  			"be-tarask": "зьвязаная адпаведнасьць",
  			de: "verwandte Bedeutung",
  			en: "related match",
  			he: "התאמה קשורה",
  			it: "corrispondenza correlata",
  			mk: "поврзано совпаѓање",
  			nb: "relatert samsvar",
  			nl: "gerelateerde match",
  			pl: "dopasowanie pojęcia o powiązanym znaczeniu",
  			ru: "ассоциативное соответствие",
  			"zh-hans": "关联匹配"
  		},
  		SHORT: "related",
  		uri: "http://www.w3.org/2004/02/skos/core#relatedMatch"
  	},
  	{
  		RELEVANCE: "generic",
  		definition: {
  			de: [
  				"unbekannter Bedeutungszusammenhang"
  			],
  			en: [
  				"unknown type of link between meanings"
  			]
  		},
  		notation: [
  			"→"
  		],
  		prefLabel: {
  			ar: "نوع علاقة التطبيق",
  			be: "характэрная адносіна адлюстравання",
  			"be-tarask": "характэрная адносіна адлюстраваньня",
  			ca: "relació de mapatge",
  			de: "allgemeine Mapping-Relation",
  			en: "SKOS generic mapping relation",
  			he: "יחס מיפוי כללי",
  			id: "relasi pemetaan",
  			mk: "пресликувачки однос",
  			nb: "generell mappingrelasjon",
  			"pt-br": "relação genérica de mapeamento",
  			sr: "релација мапирања",
  			sv: "mappnings relation",
  			zh: "映射關係",
  			"zh-hant": "映射關係"
  		},
  		SHORT: "",
  		uri: "http://www.w3.org/2004/02/skos/core#mappingRelation"
  	}
  ];

  var mappingTypes$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': mappingTypes
  });

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var mappingTypes$2 = getCjsExportFromNamespace(mappingTypes$1);

  /**
   * JSKOS Concept Types indexed by primary name.
   * @memberof module:jskos-tools
   */

  var objectTypes = {
    Concept: {
      type: ["http://www.w3.org/2004/02/skos/core#Concept"]
    },
    ConceptScheme: {
      type: ["http://www.w3.org/2004/02/skos/core#ConceptScheme"]
    },
    ConceptMapping: {
      type: mappingTypes$2.map(function (type) {
        return type.uri;
      })
    },
    ConceptOccurrence: {
      type: ["http://purl.org/cld/cdtype/CatalogueOrIndex"]
    },
    Registry: {
      type: ["http://www.w3.org/ns/dcat#Catalog"]
    },
    Distribution: {
      type: ["http://www.w3.org/ns/dcat#Distribution"]
    },
    Concordance: {
      type: ["http://rdfs.org/ns/void#Linkset", "http://rdf-vocabulary.ddialliance.org/xkos#Correspondence"]
    },
    Resource: {},
    Item: {},
    Annotation: {
      type: ["Annotation", "http://www.w3.org/ns/oa#Annotation"]
    }
  }; // build lookup table

  var objectTypeUris = Object.keys(objectTypes).reduce(function (map, name) {
    var _iterator = _createForOfIteratorHelper(objectTypes[name].type || []),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var uri = _step.value;
        map[uri] = name;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return map;
  }, {});
  /**
   * Guess the JSKOS Concept Type name from an object or name.
   * @memberof module:jskos-tools
   * @param {object|string} jskos|name|uri object or string to guess from
   * @param {boolean} shortname return short name if enabled (false by default)
   */

  function guessObjectType(obj) {
    var shortname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var type;

    if (typeof obj === "string" && obj) {
      if (obj in objectTypeUris) {
        // given by URI
        type = objectTypeUris[obj];
      } else {
        // given by name
        obj = obj.toLowerCase().replace(/s$/, "");
        type = Object.keys(objectTypes).find(function (name) {
          var lowercase = name.toLowerCase();

          if (lowercase === obj || lowercase === "concept" + obj) {
            return true;
          }
        });
      }
    } else if (_typeof(obj) === "object") {
      if (obj.type) {
        var types = Array.isArray(obj.type) ? obj.type : [obj.type];

        var _iterator2 = _createForOfIteratorHelper(types),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var uri = _step2.value;

            if (uri in objectTypeUris) {
              type = objectTypeUris[uri];
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }

    return shortname && type ? type.toLowerCase().replace(/^concept(.+)/, "$1") : type;
  }

  var objectTypes_1 = {
    objectTypes: objectTypes,
    guessObjectType: guessObjectType
  };

  var regexChars = /[\\^$.*+?()[\]{}|]/g;

  var regexEscape = function regexEscape(string) {
    return string.replace(regexChars, "\\$&");
  }; // Special characters that uriPattern can be build with
  // Some other special characters such as [ and ] will not work!


  var notationEscapeChars = /[% ]/;
  /**
   * A [JSKOS Concept Scheme](http://gbv.github.io/jskos/jskos.html#concept-schemes).
   * @memberof module:jskos-tools
   * @example
   * const { ConceptScheme } = require('jskos-tools')
   * let scheme = new ConceptScheme({
   *   namespace: "http://example.org/",
   *   notationPattern: "[0-9]+"
   * })
   */

  var ConceptScheme = /*#__PURE__*/function () {
    /**
     * @param {object} [jskos] - object that's copied as scheme (shallow copy)
     */
    function ConceptScheme() {
      var scheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, ConceptScheme);

      Object.assign(this, scheme);

      if (!this.notationPattern) {
        this.notationPattern = ".+";
      }

      if (!this.uriPattern && this.namespace) {
        this.uriPattern = "^" + regexEscape(this.namespace);
        var escaped = this.notationPattern.replace(notationEscapeChars, encodeURI);
        this.uriPattern += "(" + escaped + ")$";
      }

      this.NOTATION_REGEX = RegExp("^" + this.notationPattern + "$");

      if (this.uriPattern) {
        this.URI_REGEX = RegExp(this.uriPattern);
      }
    }
    /**
     * Check whether a string is a valid notation as defined by `notationPattern`.
     * @param {string} notation
     * @returns {array|null}
     */


    _createClass(ConceptScheme, [{
      key: "isValidNotation",
      value: function isValidNotation(notation) {
        return this.NOTATION_REGEX.exec(notation);
      }
      /**
       * Check whether URI belongs to the scheme, return local notation on success.
       * Requires scheme to have `uriPattern` or `namespace`.
       * @param {string} uri
       * @returns {string|undefined}
       */

    }, {
      key: "notationFromUri",
      value: function notationFromUri(uri) {
        if (this.URI_REGEX) {
          var match = this.URI_REGEX.exec(uri);

          if (match) {
            return decodeURI(match[1]);
          }
        }
      }
      /**
       * Map local notation to URI. Does not check whether notation is valid!
       * Requires scheme to have `uriPattern` or `namespace`.
       * @param {string} notation
       * @example scheme.uriFromNotation("123") // http://example.org/123
       */

    }, {
      key: "uriFromNotation",
      value: function uriFromNotation(notation) {
        if (this.uriPattern) {
          notation = encodeURI(notation);
          return this.uriPattern.replace(/^\^|\$$/g, "").replace(/\\/g, "").replace(/\(.*\)/, notation);
        }
      }
      /**
       * Check whether URI belongs to the scheme, return concept on success.
       * Requires scheme to have `uriPattern` or `namespace`.
       * @param {string} uri
       * @param {object} [options] boolean flags `inScheme` and `toConcept`
       */

    }, {
      key: "conceptFromUri",
      value: function conceptFromUri(uri) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var notation = this.notationFromUri(uri);

        if (notation === undefined) {
          return;
        }

        var concept = {
          uri: uri,
          notation: [notation]
        };

        if (options.inScheme) {
          concept.inScheme = [{
            uri: this.uri
          }];
        }

        if (options.topConcept) {
          concept.topConceptOf = [{
            uri: this.uri
          }];
        }

        return concept;
      }
      /**
       * Map local notation to concept, if notation is valid. Requires scheme to
       * have `uriPattern` or `namespace`.
       * @param {string} notation
       * @param {object} [options] same as conceptFromUri options
       */

    }, {
      key: "conceptFromNotation",
      value: function conceptFromNotation(notation, options) {
        if (this.isValidNotation(notation)) {
          return this.conceptFromUri(this.uriFromNotation(notation), options);
        }
      }
    }]);

    return ConceptScheme;
  }();

  var conceptScheme = ConceptScheme;

  var languagePreference = {
    store: null,
    path: "",
    defaults: ["en"],
    getLanguages: getLanguages,
    selectLanguage: selectLanguage
  };
  /**
   * Get the preference list either from store or from defaults (fallback)
   */

  function getLanguages() {
    return utils.get(languagePreference.store, languagePreference.path) || languagePreference.defaults;
  }
  /**
   * Selects a language tag from a language map or null if no language was found.
   *
   * @param {object} languageMap map to select language tag from
   */


  function selectLanguage(languageMap) {
    if (!languageMap) {
      return null;
    }

    var _iterator = _createForOfIteratorHelper(getLanguages()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _language = _step.value;

        if (languageMap[_language]) {
          return _language;
        }
      } // fallback: iterate through languages and choose the first one

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    for (var _i = 0, _Object$keys = Object.keys(languageMap); _i < _Object$keys.length; _i++) {
      var language = _Object$keys[_i];

      if (language != "-") {
        return language;
      }
    }

    return null;
  }

  var languagePreference_1 = languagePreference;

  /**
   * Tests if a string only contains uppercase letters.
   * @private
   * @param {string} str
   */

  var isUpperCase = function isUpperCase(str) {
    return /^[A-Z]*$/.test(str);
  };
  /**
   * Safely get a nested property.
   * @private
   * @param {*} object the object to access
   * @param {*} path path expression
   */


  var getNested = function getNested(object, path) {
    return path.split(".").reduce(function (xs, x) {
      return xs && xs[x] ? xs[x] : null;
    }, object);
  };
  /**
   * Add @context URI to a JSKOS resource or to an array of JSKOS resources.
   * @memberof module:jskos-tools
   * @param {object} jskos object or array of objects
   */


  var addContext = function addContext(jskos) {
    var array = jskos instanceof Array ? jskos : [jskos];
    array.forEach(function (resource) {
      resource["@context"] = "https://gbv.github.io/jskos/context.json";
    });
    return jskos;
  };
  /**
   * Recursively cleans JSKOS object by removing properties starting with _ or containing only uppercase letters.
   * Warning: Works directly on the object without creating a copy!
   * @memberof module:jskos-tools
   * @param {object} jskos
   */


  var clean = function clean(jskos) {
    Object.keys(jskos).forEach(function (key) {
      if (isUpperCase(key) || key.startsWith("_")) {
        delete jskos[key];
      } else {
        if (jskos[key] != null && _typeof(jskos[key]) === "object") {
          jskos[key] = clean(jskos[key]);
        }
      }
    });
    return jskos;
  }; // cleanJSKOS as alias for clean.


  var cleanJSKOS = clean;
  /**
   * Creates a deep copy of a JSKOS object, replacing possibly circular structures with open world [null] statements.
   * All properties starting with an underscore (_) will be ignored.
   * @memberof module:jskos-tools
   * @param {object} object
   * @param {array} replaceCircular - additional property names that should be replace with open world [null] statements
   * @param {bool} skipUnderscore - whether to skip properties starting with `_` (default `true`)
   */

  var copyDeep = function copyDeep(object) {
    var replaceCircular = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var skipUnderscore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    replaceCircular = replaceCircular.concat(["ancestors", "narrower", "broader", "mappings", "TOPCONCEPTS", "MAPPINGS", "PROVIDER"]);
    var clone = Array.isArray(object) ? [] : {};

    for (var i in object) {
      // Ignore all properties starting with _
      if (skipUnderscore && i[0] == "_") {
        continue;
      }

      if (replaceCircular.includes(i)) {
        // Remove circular structures, replace with [null] if it has elements
        if (object[i] && Array.isArray(object[i])) {
          if (object[i].length > 0) {
            clone[i] = [null];
          } else {
            clone[i] = [];
          }

          continue;
        } else {
          clone[i] = null;
          continue;
        }
      }

      if (i == "inScheme") {
        // Remove circular structur for inScheme and replace with new object consisting only of URI, notation, and prefLabel
        var inScheme = [];

        var _iterator = _createForOfIteratorHelper(object.inScheme),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var scheme = _step.value;
            var newScheme = {
              uri: scheme.uri
            };

            if (scheme.notation) {
              newScheme.notation = scheme.notation;
            }

            if (scheme.prefLabel) {
              newScheme.prefLabel = scheme.prefLabel;
            }

            inScheme.push(newScheme);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        clone.inScheme = inScheme;
        continue;
      }

      if (object[i] != null && _typeof(object[i]) == "object") {
        clone[i] = copyDeep(object[i]);
      } else {
        clone[i] = object[i];
      }
    }

    return clone;
  }; // deepCopy as alias for copyDeep.


  var deepCopy = copyDeep;
  /**
   * Returns all possible URIs for a JSKOS object. Takes into consideration both the uri and identifier properties, as well as different variants of those identifiers.
   *
   * Variants:
   * - http vs. https
   * - with trailing slash vs. without trailing slash
   * - /en/ vs. /de/
   *
   * @memberof module:jskos-tools
   * @param {object} object
   */

  var getAllUris = function getAllUris(object) {
    if (!object) return [];
    var uris = (object.uri ? [object.uri] : []).concat(object.identifier || []); // Generate several variants of URIs to work around inconsistencies

    uris = uris.concat(uris.map(function (uri) {
      return uri.startsWith("https") ? uri.replace("https", "http") : uri.replace("http", "https");
    }));
    uris = uris.concat(uris.map(function (uri) {
      return uri.endsWith("/") ? uri.substring(0, uri.length - 1) : uri + "/";
    }));
    uris = uris.concat(uris.map(function (uri) {
      return uri.indexOf("/en/") != -1 ? uri.replace("/en/", "/de/") : uri.replace("/de/", "/en/");
    }));
    return uris;
  };
  /**
   * Compares two objects based on their URIs, using getAllUris.
   *
   * @memberof module:jskos-tools
   * @param {object} object1
   * @param {object} object2
   */


  var compare$1 = function compare(object1, object2) {
    // Return true if both objects are null.
    if (object1 == null && object2 == null) {
      return true;
    } // Compare URIs for objects.


    var object1uris = getAllUris(object1);
    var object2uris = getAllUris(object2);

    if (utils.intersection(object1uris, object2uris).length > 0) {
      return true;
    } else {
      return false;
    }
  }; // compareObjects, compareSchemes and compareConcepts as aliases for compare, for compatibility.


  var compareObjects = compare$1;
  var compareSchemes = compare$1;
  var compareConcepts = compare$1;
  /**
   * Checks whether JSKOS object is a concept based on type property.
   * @memberof module:jskos-tools
   */

  var isConcept = function isConcept(object) {
    return utils.get(object, "type", []).includes("http://www.w3.org/2004/02/skos/core#Concept") || utils.get(object, "inScheme") != null || utils.get(object, "topConceptOf") != null;
  };
  /**
   * Checks whether JSKOS object is a concept scheme based on type property.
   * @memberof module:jskos-tools
   */


  var isScheme = function isScheme(object) {
    return utils.get(object, "type", []).includes("http://www.w3.org/2004/02/skos/core#ConceptScheme");
  };
  /**
   * Checks whether an object is contained in a list of objects using compare.
   * @memberof module:jskos-tools
   */


  var isContainedIn = function isContainedIn(object, objects) {
    if (!object || !objects) {
      return false;
    }

    var _iterator2 = _createForOfIteratorHelper(objects),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var o = _step2.value;

        if (compare$1(object, o)) {
          return true;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return false;
  }; // isSchemeInList as alias for isContainedIn.


  var isSchemeInList = isContainedIn;
  /**
   * Sorts a list of concepts by their notation, then URI.
   *
   * @memberof module:jskos-tools
   * @param {*} concepts
   */

  var sortConcepts = function sortConcepts(concepts) {
    var numerical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return concepts.sort(function (a, b) {
      var _a = utils.get(a, "notation[0]"),
          _b = utils.get(b, "notation[0]");

      if (_a && _b) {
        _a = _a.toLowerCase();
        _b = _b.toLowerCase();
      }

      if (numerical) {
        _a = parseFloat(_a) || _a;
        _b = parseFloat(_b) || _b;
      } // Fallback to URI


      if (!_a || !_b || _a == _b) {
        _a = a.uri;
        _b = b.uri;
      }

      if (_a && _b) {
        if (_a > _b) {
          return 1;
        } else if (_a < _b) {
          return -1;
        }
      }

      return 0;
    });
  };
  /**
   * Sorts a list of schemes by their prefLabel (German or English), then notation, then URI.
   *
   * @memberof module:jskos-tools
   * @param {*} schemes
   */


  var sortSchemes = function sortSchemes(schemes) {
    var order = ["notation[0]", ["prefLabel.de", "prefLabel.en"], "uri"];
    return schemes.sort(function (a, b) {
      var _iterator3 = _createForOfIteratorHelper(order),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var path = _step3.value;

          var _a = void 0,
              _b = void 0;

          if (utils.isArray(path)) {
            var _iterator4 = _createForOfIteratorHelper(path),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var path2 = _step4.value;
                _a = _a || utils.get(a, path2);
                _b = _b || utils.get(b, path2);
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          } else {
            _a = utils.get(a, path);
            _b = utils.get(b, path);
          }

          if (_a != null && _b != null) {
            _a = _a.toLowerCase();
            _b = _b.toLowerCase();

            if (_a > _b) {
              return 1;
            } else if (_a < _b) {
              return -1;
            }
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return 0;
    });
  };
  /**
   * @memberof module:jskos-tools
   */


  var minifyMapping = function minifyMapping(mapping) {
    var newMapping = utils.pick(copyDeep(mapping), ["from", "to", "fromScheme", "toScheme", "creator", "contributor", "type", "created", "modified", "note", "identifier", "uri"]);

    var _loop = function _loop() {
      var fromTo = _arr[_i];

      utils.forOwn(fromTo, function (value, key) {
        var conceptBundle = [];

        var _iterator5 = _createForOfIteratorHelper(value),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var concept = _step5.value;
            conceptBundle.push(utils.pick(concept, ["uri", "notation"]));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }

        fromTo[key] = conceptBundle;
      });
    };

    for (var _i = 0, _arr = [newMapping.from, newMapping.to]; _i < _arr.length; _i++) {
      _loop();
    }

    if (newMapping.fromScheme) {
      newMapping.fromScheme = utils.pick(newMapping.fromScheme, ["uri", "notation"]);
    }

    if (newMapping.toScheme) {
      newMapping.toScheme = utils.pick(newMapping.toScheme, ["uri", "notation"]);
    }

    return newMapping;
  };
  /**
   * @memberof module:jskos-tools
   *
   * Run `bin/localize-mapping-types` to update labels from Wikidata.
   */

  /**
   * @memberof module:jskos-tools
   */


  var mappingTypeByUri = function mappingTypeByUri(uri) {
    var _iterator6 = _createForOfIteratorHelper(mappingTypes$2),
        _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var mappingType = _step6.value;

        if (uri == mappingType.uri) {
          return mappingType;
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    return null;
  };
  /**
   * @memberof module:jskos-tools
   */


  var defaultMappingType = mappingTypeByUri("http://www.w3.org/2004/02/skos/core#mappingRelation");
  /**
   * @memberof module:jskos-tools
   */

  var mappingTypeByType = function mappingTypeByType(type) {
    var defaultType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMappingType;
    var uri;

    if (Array.isArray(type) && type.length > 0) {
      uri = type[0];
    } else {
      // This is a workaround for the type being a string instead of an array.
      uri = type;
    }

    return mappingTypeByUri(uri) || defaultType;
  };
  /**
   * @memberof module:jskos-tools
   */


  var flattenMapping = function flattenMapping(mapping) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var language = options.language;
    var fromNotation = getNested(mapping, "from.memberSet.0.notation.0");
    var toNotation = getNested(mapping, "to.memberSet.0.notation.0");
    fromNotation = fromNotation !== null ? fromNotation : "";
    toNotation = toNotation !== null ? toNotation : "";
    var type = mappingTypeByUri(getNested(mapping, "type.0"));
    type = type ? type.SHORT : "";
    var fromLabel = "";
    var toLabel = "";
    var creator = "";

    if (language) {
      fromLabel = getNested(mapping, "from.memberSet.0.prefLabel.".concat(language));
      toLabel = getNested(mapping, "to.memberSet.0.prefLabel.".concat(language));
      creator = getNested(mapping, "creator.0.prefLabel.".concat(language));
    }

    return {
      fromNotation: fromNotation,
      toNotation: toNotation,
      fromLabel: fromLabel,
      toLabel: toLabel,
      type: type,
      creator: creator
    };
  };
  /**
   * Returns a function to serialize an array as CSV row as configured.
   * See CSV Dialect (<https://frictionlessdata.io/specs/csv-dialect/>).
   *
   * @memberof module:jskos-tools
   */


  var csvSerializer = function csvSerializer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var delimiter = options.delimiter || ",";
    var quoteChar = options.quoteChar || "\"";
    var lineTerminator = options.lineTerminator || "\n";
    var doubleQuote = quoteChar + quoteChar;

    var quote = function quote(s) {
      return quoteChar + (s == null ? "" : s.split(quoteChar).join(doubleQuote)) + quoteChar;
    };

    return function (row) {
      return row.map(quote).join(delimiter) + lineTerminator;
    };
  };
  /**
   * Returns a list of concepts for a mapping.
   *
   * @memberof module:jskos-tools
   * @param {*} mapping
   * @param {*} side - Either `from` or `to`. Default is both.
   */


  var conceptsOfMapping = function conceptsOfMapping(mapping, side) {
    var concepts = [];

    for (var _i2 = 0, _arr2 = ["from", "to"]; _i2 < _arr2.length; _i2++) {
      var s = _arr2[_i2];

      if (side == null || s === side) {
        concepts = concepts.concat(utils.get(mapping, "".concat(s, ".memberSet")) || utils.get(mapping, "".concat(s, ".memberChoice")) || utils.get(mapping, "".concat(s, ".memberList")) || []);
      }
    }

    return concepts.filter(function (c) {
      return c != null;
    });
  };
  /**
   * Returns an object of preconfigured conversion functions to convert mappings into CSV.
   *
   * @memberof module:jskos-tools
   * @param {object} options
   *
   * Possible options:
   * - delimiter: delimiter character (default `,`)
   * - quoteChar: quote character (default `"`)
   * - lineTerminator: line terminator (default `\n`)
   * - type: whether to include mapping type in output (default true)
   * - schemes: whether to include scheme notations in output (default false)
   * - labels: whether to include concept labels in output (default false)
   * - creator: whether to include mapping creator in output (default false)
   *
   */


  var mappingCSV = function mappingCSV() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var toCSV = csvSerializer(options);
    var language = options.language || "en";

    if (options.type == null) {
      options.type = true;
    }

    var header = function header(mappings) {
      mappings = mappings || [];
      var fields = [];

      var _loop2 = function _loop2() {
        var side = _arr3[_i3];

        // Scheme
        if (options.schemes) {
          fields.push("".concat(side, "Scheme"));
        } // Minimum count: 1 (for 1-to-1 mappings)


        var conceptCount = Math.max.apply(Math, _toConsumableArray(mappings.map(function (mapping) {
          return conceptsOfMapping(mapping, side).length;
        })).concat([1]));

        for (var i = 0; i < conceptCount; i += 1) {
          // Notation
          fields.push("".concat(side, "Notation").concat(i ? i + 1 : "")); // Label

          if (options.labels) {
            fields.push("".concat(side, "Label").concat(i ? i + 1 : ""));
          }
        }
      };

      for (var _i3 = 0, _arr3 = ["from", "to"]; _i3 < _arr3.length; _i3++) {
        _loop2();
      } // Type


      if (options.type) {
        fields.push("type");
      } // Creator


      if (options.creator) {
        fields.push("creator");
      }

      return toCSV(fields);
    };
    /**
     * Converts a single mapping into a CSV line.
     *
     * @param {*} mapping a single mapping
     * @param {*} options2 an options object with properties `fromCount` and `toCount`
     */


    var fromMapping = function fromMapping(mapping) {
      var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var fields = [];

      for (var _i4 = 0, _arr4 = ["from", "to"]; _i4 < _arr4.length; _i4++) {
        var side = _arr4[_i4];

        // Scheme
        if (options.schemes) {
          fields.push(utils.get(mapping, "".concat(side, "Scheme.notation[0]"), ""));
        }

        var concepts = conceptsOfMapping(mapping, side);
        var conceptCount = options2["".concat(side, "Count")];

        if (conceptCount == null) {
          conceptCount = concepts.length;
        } // Minimum count: 1 (for 1-to-1 mappings)


        conceptCount = Math.max(conceptCount, 1);

        for (var i = 0; i < conceptCount; i += 1) {
          // Notation
          fields.push(utils.get(concepts[i], "notation[0]", "")); // Label

          if (options.labels) {
            fields.push(utils.get(concepts[i], "prefLabel.".concat(language), ""));
          }
        }
      } // Type


      if (options.type) {
        fields.push(utils.get(mappingTypeByUri(utils.get(mapping, "type[0]")), "SHORT", ""));
      } // Creator


      if (options.creator) {
        fields.push(utils.get(mapping, "creator[0].prefLabel.".concat(language)));
      }

      return toCSV(fields);
    };
    /**
     * Converts an array of mappings into CSV.
     *
     * @param {*} mapping an array of mappings
     * @param {*} options2 an options object with optional property `header` (default true)
     */


    var fromMappings = function fromMappings(mappings) {
      var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        header: true
      };
      var result = "";

      if (options2.header) {
        result += header(mappings);
      }

      var fromMappingOptions = {
        fromCount: Math.max.apply(Math, _toConsumableArray(mappings.map(function (mapping) {
          return conceptsOfMapping(mapping, "from").length;
        }))),
        toCount: Math.max.apply(Math, _toConsumableArray(mappings.map(function (mapping) {
          return conceptsOfMapping(mapping, "to").length;
        })))
      };

      var _iterator7 = _createForOfIteratorHelper(mappings),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var mapping = _step7.value;
          result += fromMapping(mapping, fromMappingOptions);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return result;
    };

    return {
      header: header,
      fromMapping: fromMapping,
      fromMappings: fromMappings
    };
  };
  /**
   * Compare two mappings based on their properties. Concept sets and schemes are compared by URI.
   *
   * @memberof module:jskos-tools
   */


  function compareMappingsDeep(mapping1, mapping2) {
    return utils.isEqualWith(mapping1, mapping2, function (object1, object2, prop) {
      var mapping1 = _defineProperty({}, prop, object1);

      var mapping2 = _defineProperty({}, prop, object2);

      if (prop == "from" || prop == "to") {
        if (!utils.isEqual(Object.getOwnPropertyNames(utils.get(object1, prop, {})), Object.getOwnPropertyNames(utils.get(object2, prop, {})))) {
          return false;
        }

        return utils.isEqualWith(conceptsOfMapping(mapping1, prop), conceptsOfMapping(mapping2, prop), function (concept1, concept2, index) {
          if (index != undefined) {
            return compare$1(concept1, concept2);
          }

          return undefined;
        });
      }

      if (prop == "fromScheme" || prop == "toScheme") {
        return compare$1(object1, object2);
      } // Let lodash's isEqual do the comparison


      return undefined;
    });
  }

  var objectTypes$1 = objectTypes_1.objectTypes,
      guessObjectType$1 = objectTypes_1.guessObjectType;
  /**
   * Checks if two objects have a matching object type. Returns false only if types for both objects could be guessed and they did not match.
   *
   * @memberof module:jskos-tools
   * @param {object} a
   * @param {object} b
   */

  var matchObjectTypes = function matchObjectTypes(a, b) {
    // Guess object types of both objects
    var aType = guessObjectType$1(a),
        bType = guessObjectType$1(b); // If both object types could be guessed, throw an error if they don't match

    if (aType && bType && aType != bType) {
      return false;
    }

    return true;
  };
  /**
   * Sorts an array so that `null` values are at the end.
   *
   * @private
   * @param {*} array
   */


  var _nullSort = function _nullSort(array) {
    if (utils.isArray(array)) {
      array.sort(function (a, b) {
        if (a === null) {
          return 1;
        }

        if (b === null) {
          return -1;
        }

        return 0;
      });
    }
  };
  /**
   * Merge URIs of two objects `a` and `b` into `a` by adding/removing URIs from identifier property.
   *
   * @memberof module:jskos-tools
   * @param {object} a
   * @param {object} b
   */


  var mergeUris = function mergeUris(a, b) {
    if (!a || !b) {
      return a;
    } // Merge identifier array


    if (utils.isArray(a.identifier) || utils.isArray(b.identifier)) {
      a.identifier = utils.union(a.identifier || [], b.identifier || []);
    } // Add URI to a if necessary


    if (!a.uri && b.uri) {
      a.uri = b.uri;
    } // Add b's URI to a's identifier if necessary


    if (a.uri && b.uri && a.uri != b.uri && !(a.identifier || []).includes(b.uri)) {
      a.identifier = (a.identifier || []).concat([b.uri]);
    } // Remove a's URI from identifier if necessary


    if (utils.isArray(a.identifier) && a.uri) {
      a.identifier = a.identifier.filter(function (uri) {
        return uri !== a.uri;
      });
    } // Remove identifier property if empty


    if ((a.identifier || []).length == 0) {
      delete a.identifier;
    } // Sort null values to end


    _nullSort(a.identifier);

    return a;
  };
  /**
   * Merges two JSKOS objects. Object properties will be merged deeply. Array properties will be combined (and URIs will be used for comparison if it's an array of objects).
   *
   * The `options` property allows for different options:
   * - `mergeUris` (boolean, default `false`) - appends b's URI to the result's `identifier` property if necessary, removes a's URI from the result's `identifier` property if necessary (useful for merging ConceptSchemes)
   * - `detectMismatch` (array of strings, default `[]`) - throws an error if the value at a certain path does not match between the two objects (allows for deep properties, e.g. `prefLabel.de`)
   * - `skipPaths` (array of strings, default `[]`) - provide paths to completely skip when merging
   *
   * @memberof module:jskos-tools
   * @param {object} a
   * @param {object} b
   * @param {object} options - optional, see above
   */


  var merge = function merge(a, b, options) {
    if (!a || !b) {
      return a ? a : b;
    }

    options = options || {}; // Path is used for deep detectMismatch checks

    var path = options._path || ""; // Throw an error if two simple properties do not match between the objects

    var detectMismatch = options.detectMismatch || [];
    var skipPaths = options.skipPaths || [];
    var result = {}; // Merge properties that are in both objects

    utils.forOwn(a, function (value, key) {
      // Skip path if necessary
      if (skipPaths.includes(path + key)) {
        return;
      }

      if (utils.isArray(value) && utils.isArray(b[key])) {
        // Merge array properties
        result[key] = utils.unionWith(value, b[key], function (first, second) {
          if (utils.isObject(first) && utils.isObject(second)) {
            return compare$1(first, second);
          }

          return first === second;
        }); // Sort null values to the end while keeping the rest of the order the same

        _nullSort(result[key]);
      } else if (utils.isObject(value) && utils.isObject(b[key])) {
        // Merge object properties
        result[key] = merge(value, b[key], Object.assign({
          _path: "".concat(path).concat(key, ".")
        }, options));
      } else {
        if (value && b[key] && detectMismatch.includes(path + key) && !utils.isEqual(value, b[key])) {
          throw new Error("Property mismatch in " + path + key);
        }

        result[key] = value;
      }
    }); // Add properties that are only in b


    utils.forOwn(b, function (value, key) {
      if (!a[key]) {
        result[key] = value;
      }
    }); // Remove paths if necessary


    if (path == "") {
      utils.omitMod(result, skipPaths);
    } // Merge URIs if necessary


    if (options.mergeUris) {
      mergeUris(result, b);
    }

    return result;
  };
  /**
   * Applies recursive unicode normalization to data.
   *
   * - If data is an array, it will recursively normalize all elements of that array.
   * - If data is an object, it will recursively normalize all property values of that object.
   * - If data is a string, it will apply unicode normalization to that string.
   * - If data is of any other type, it will be returned as is.
   *
   * @param {*} data
   */


  var normalize = function normalize(data) {
    if (utils.isArray(data)) {
      return data.map(function (element) {
        return normalize(element);
      });
    } else if (utils.isObject(data)) {
      utils.forOwn(data, function (value, key) {
        data[key] = normalize(value);
      });

      return data;
    } else {
      if (utils.isString(data)) {
        return data.normalize();
      } else {
        return data;
      }
    }
  };
  /**
   * Checks whether a string is a valid URI.
   *
   * @param {string} uri URI to be tested
   */


  var isValidUri = function isValidUri(uri) {
    // from: http://jmrware.com/articles/2009/uri_regexp/URI_regex.html
    var re_js_rfc3986_URI = /^[A-Za-z][A-Za-z0-9+\-.]*:(?:\/\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\.[A-Za-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*)(?::[0-9]*)?(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|\/(?:(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?|(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:\/(?:[A-Za-z0-9\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*|)(?:\?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?(?:#(?:[A-Za-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*)?$/;
    return uri.match(re_js_rfc3986_URI) !== null;
  };
  /**
   * An object of compare functions (can be used by array.sort for example).
   *
   * TODO: Add more functions.
   */


  var compareFunctions = {
    /**
     * Compare mappings by their first concept.
     *
     * @param {*} mapping1 - first mapping
     * @param {*} mapping2 - second mapping
     * @param {*} fromTo - side, either `from` or `to`
     */
    mappingsByConcepts: function mappingsByConcepts(mapping1, mapping2, fromTo) {
      var bundleFields = ["memberSet", "memberList", "memberChoice"],
          notation1,
          notation2;

      for (var _i5 = 0, _bundleFields = bundleFields; _i5 < _bundleFields.length; _i5++) {
        var field = _bundleFields[_i5];
        notation1 = notation1 || utils.get(mapping1, fromTo + "." + field + "[0].notation[0]");
        notation2 = notation2 || utils.get(mapping2, fromTo + "." + field + "[0].notation[0]");
      }

      if (notation1 == null || notation1 < notation2) {
        return -1;
      }

      if (notation2 == null || notation1 > notation2) {
        return 1;
      }

      return 0;
    }
  };
  /**
   * Returns `true` if the user owns the mapping (i.e. is first creator), `false` if not.
   *
   * @param {*} user a login-server compatible user object
   * @param {*} mapping a JSKOS mapping
   */

  var userOwnsMapping = function userOwnsMapping(user, mapping) {
    if (!user || !mapping) {
      return false;
    }

    return [user.uri].concat(Object.values(user.identities || {}).map(function (identity) {
      return identity.uri;
    })).filter(function (uri) {
      return uri != null;
    }).includes(utils.get(mapping, "creator[0].uri"));
  };
  /**
   * Returns the primary notation for a JSKOS Item. If there is no notation, it will return an empty string.
   * Scheme notations will be uppercased.
   *
   * @param {object} item a JSKOS Item
   * @param {string} type type of item (optional)
   */


  function notation(item, type) {
    var notation;

    if (item && item.notation && item.notation.length) {
      notation = item.notation[0];

      if (isScheme(item) || type == "scheme") {
        notation = notation.toUpperCase();
      }
    } else if (item && item.inScheme && item.inScheme[0] && item.uri) {
      // Try to imply notation from scheme and concept URI
      var scheme = new conceptScheme(item && item.inScheme && item.inScheme[0]);
      notation = scheme.notationFromUri(item.uri);
    }

    return notation || "";
  }
  /**
   * Returns the content of a language map for a JSKOS Item.
   *
   * @param {*} item a JSKOS Item
   * @param {string} prop property of interest in the item
   * @param {object} options options object:
   * - `language`: preferred language
   * - will also be passed through to `getLanguages`
   */


  function languageMapContent(item, prop) {
    var languageMap = item && prop ? item[prop] : item;

    if (languageMap) {
      var language = languagePreference_1.selectLanguage(languageMap);

      if (language) {
        return languageMap[language];
      }
    }

    return null;
  }
  /**
   * Returns the prefLabel of a JSKOS Item. If there is no label, it will return the URI. If there is no URI, it will return an empty string.
   *
   * @param {*} item
   * @param {object} options options object:
   * - `fallbackToUri`: return URI if no prefLabel can be found (default: true)
   * - `language`: preferred language
   */


  function prefLabel(item) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = options || {};
    var fallbackToUri = options.fallbackToUri == null ? true : options.fallbackToUri;
    return utils.get(item, "prefLabel.".concat(options.language)) || languageMapContent(item, "prefLabel") || (fallbackToUri && item && item.uri ? item.uri : "");
  }
  /**
   * Returns the definition of a JSKOS Item as an array. If there is no definition, an empty array will be returned.
   *
   * @param {*} item
   * @param {object} options options object:
   * - `language`: preferred language
   */


  function definition(item) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    options = options || {};
    var content = utils.get(item, "definition.".concat(options.language)) || languageMapContent(item, "definition") || []; // Make sure an array is returned

    if (utils.isString(content)) {
      content = [content];
    }

    return content;
  }
  /**
   * Returns whether a mapping registry has stored mappings (`true` = database) or not (`false` = recommendations).
   *
   * @param {object} registry JSKOS registry
   */


  function mappingRegistryIsStored(registry) {
    return utils.get(registry, "stored", utils.get(registry, "constructor.stored", utils.get(registry, "provider.constructor.stored", false)));
  }
  /**
   * Returns the creator URI for an annotation.
   *
   * @param {object} annotation a JSKOS annotation
   */


  function annotationCreatorUri(annotation) {
    if (utils.isString(annotation.creator)) {
      return annotation.creator;
    }

    return annotation.creator && annotation.creator.id;
  }
  /**
   * Returns the craetor name for an annotation.
   *
   * @param {object} annotation a JSKOS annotation
   */


  function annotationCreatorName(annotation) {
    return utils.get(annotation, "creator.name") || "";
  }
  /**
   * Matches an annotation's creator URI against a list of URIs (e.g. from a user).
   *
   * @param {object} annotation a JSKOS annotation
   * @param {array} uris array of user URIs
   */


  function annotationCreatorMatches(annotation, uris) {
    return !!(annotation && utils.isString(annotation.creator) ? uris && uris.includes(annotation.creator) : uris && annotation.creator && uris.includes(annotation.creator.id));
  }

  var tools = {
    addContext: addContext,
    clean: clean,
    cleanJSKOS: cleanJSKOS,
    copyDeep: copyDeep,
    deepCopy: deepCopy,
    getAllUris: getAllUris,
    compare: compare$1,
    compareObjects: compareObjects,
    compareSchemes: compareSchemes,
    compareConcepts: compareConcepts,
    isConcept: isConcept,
    isScheme: isScheme,
    isContainedIn: isContainedIn,
    isSchemeInList: isSchemeInList,
    sortConcepts: sortConcepts,
    sortSchemes: sortSchemes,
    minifyMapping: minifyMapping,
    mappingTypes: mappingTypes$2,
    mappingTypeByUri: mappingTypeByUri,
    mappingTypeByType: mappingTypeByType,
    flattenMapping: flattenMapping,
    mappingCSV: mappingCSV,
    defaultMappingType: defaultMappingType,
    conceptsOfMapping: conceptsOfMapping,
    compareMappingsDeep: compareMappingsDeep,
    objectTypes: objectTypes$1,
    guessObjectType: guessObjectType$1,
    matchObjectTypes: matchObjectTypes,
    mergeUris: mergeUris,
    merge: merge,
    normalize: normalize,
    isValidUri: isValidUri,
    compareFunctions: compareFunctions,
    userOwnsMapping: userOwnsMapping,
    notation: notation,
    languageMapContent: languageMapContent,
    prefLabel: prefLabel,
    definition: definition,
    mappingRegistryIsStored: mappingRegistryIsStored,
    annotationCreatorUri: annotationCreatorUri,
    annotationCreatorName: annotationCreatorName,
    annotationCreatorMatches: annotationCreatorMatches
  };

  /**
   * JSKOS Tools.
   * @module jskos-tools
   */

  var jskosTools = Object.assign({
    ConceptScheme: conceptScheme,
    languagePreference: languagePreference_1
  }, identifiers, tools);

  return jskosTools;

})));
