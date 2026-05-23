//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class MarketIndexIndices {
  /// Returns a new [MarketIndexIndices] instance.
  MarketIndexIndices({
    this.key,
    this.index,
    this.indexSymbol,
    this.marketData,
    this.fundamentalRatios,
    this.marketBreadth,
    this.historicalComparison,
    this.chartPaths,
    this.timestamp,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? key;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? index;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? indexSymbol;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  MarketData? marketData;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  FundamentalRatios? fundamentalRatios;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  MarketBreadth? marketBreadth;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  HistoricalComparison? historicalComparison;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  ChartPaths? chartPaths;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? timestamp;

  @override
  bool operator ==(Object other) => identical(this, other) || other is MarketIndexIndices &&
    other.key == key &&
    other.index == index &&
    other.indexSymbol == indexSymbol &&
    other.marketData == marketData &&
    other.fundamentalRatios == fundamentalRatios &&
    other.marketBreadth == marketBreadth &&
    other.historicalComparison == historicalComparison &&
    other.chartPaths == chartPaths &&
    other.timestamp == timestamp;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (key == null ? 0 : key!.hashCode) +
    (index == null ? 0 : index!.hashCode) +
    (indexSymbol == null ? 0 : indexSymbol!.hashCode) +
    (marketData == null ? 0 : marketData!.hashCode) +
    (fundamentalRatios == null ? 0 : fundamentalRatios!.hashCode) +
    (marketBreadth == null ? 0 : marketBreadth!.hashCode) +
    (historicalComparison == null ? 0 : historicalComparison!.hashCode) +
    (chartPaths == null ? 0 : chartPaths!.hashCode) +
    (timestamp == null ? 0 : timestamp!.hashCode);

  @override
  String toString() => 'MarketIndexIndices[key=$key, index=$index, indexSymbol=$indexSymbol, marketData=$marketData, fundamentalRatios=$fundamentalRatios, marketBreadth=$marketBreadth, historicalComparison=$historicalComparison, chartPaths=$chartPaths, timestamp=$timestamp]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.key != null) {
      json[r'key'] = this.key;
    } else {
      json[r'key'] = null;
    }
    if (this.index != null) {
      json[r'index'] = this.index;
    } else {
      json[r'index'] = null;
    }
    if (this.indexSymbol != null) {
      json[r'indexSymbol'] = this.indexSymbol;
    } else {
      json[r'indexSymbol'] = null;
    }
    if (this.marketData != null) {
      json[r'marketData'] = this.marketData;
    } else {
      json[r'marketData'] = null;
    }
    if (this.fundamentalRatios != null) {
      json[r'fundamentalRatios'] = this.fundamentalRatios;
    } else {
      json[r'fundamentalRatios'] = null;
    }
    if (this.marketBreadth != null) {
      json[r'marketBreadth'] = this.marketBreadth;
    } else {
      json[r'marketBreadth'] = null;
    }
    if (this.historicalComparison != null) {
      json[r'historicalComparison'] = this.historicalComparison;
    } else {
      json[r'historicalComparison'] = null;
    }
    if (this.chartPaths != null) {
      json[r'chartPaths'] = this.chartPaths;
    } else {
      json[r'chartPaths'] = null;
    }
    if (this.timestamp != null) {
      json[r'timestamp'] = this.timestamp!.toUtc().toIso8601String();
    } else {
      json[r'timestamp'] = null;
    }
    return json;
  }

  /// Returns a new [MarketIndexIndices] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static MarketIndexIndices? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "MarketIndexIndices[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "MarketIndexIndices[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return MarketIndexIndices(
        key: mapValueOfType<String>(json, r'key'),
        index: mapValueOfType<String>(json, r'index'),
        indexSymbol: mapValueOfType<String>(json, r'indexSymbol'),
        marketData: MarketData.fromJson(json[r'marketData']),
        fundamentalRatios: FundamentalRatios.fromJson(json[r'fundamentalRatios']),
        marketBreadth: MarketBreadth.fromJson(json[r'marketBreadth']),
        historicalComparison: HistoricalComparison.fromJson(json[r'historicalComparison']),
        chartPaths: ChartPaths.fromJson(json[r'chartPaths']),
        timestamp: mapDateTime(json, r'timestamp', r''),
      );
    }
    return null;
  }

  static List<MarketIndexIndices> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <MarketIndexIndices>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = MarketIndexIndices.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, MarketIndexIndices> mapFromJson(dynamic json) {
    final map = <String, MarketIndexIndices>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = MarketIndexIndices.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of MarketIndexIndices-objects as value to a dart map
  static Map<String, List<MarketIndexIndices>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<MarketIndexIndices>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = MarketIndexIndices.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

