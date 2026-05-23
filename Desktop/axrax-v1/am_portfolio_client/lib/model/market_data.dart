//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class MarketData {
  /// Returns a new [MarketData] instance.
  MarketData({
    this.last,
    this.variation,
    this.percentChange,
    this.open,
    this.high,
    this.low,
    this.previousClose,
    this.yearHigh,
    this.yearLow,
    this.indicativeClose,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? last;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? variation;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? percentChange;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? open;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? high;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? low;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? previousClose;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? yearHigh;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? yearLow;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? indicativeClose;

  @override
  bool operator ==(Object other) => identical(this, other) || other is MarketData &&
    other.last == last &&
    other.variation == variation &&
    other.percentChange == percentChange &&
    other.open == open &&
    other.high == high &&
    other.low == low &&
    other.previousClose == previousClose &&
    other.yearHigh == yearHigh &&
    other.yearLow == yearLow &&
    other.indicativeClose == indicativeClose;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (last == null ? 0 : last!.hashCode) +
    (variation == null ? 0 : variation!.hashCode) +
    (percentChange == null ? 0 : percentChange!.hashCode) +
    (open == null ? 0 : open!.hashCode) +
    (high == null ? 0 : high!.hashCode) +
    (low == null ? 0 : low!.hashCode) +
    (previousClose == null ? 0 : previousClose!.hashCode) +
    (yearHigh == null ? 0 : yearHigh!.hashCode) +
    (yearLow == null ? 0 : yearLow!.hashCode) +
    (indicativeClose == null ? 0 : indicativeClose!.hashCode);

  @override
  String toString() => 'MarketData[last=$last, variation=$variation, percentChange=$percentChange, open=$open, high=$high, low=$low, previousClose=$previousClose, yearHigh=$yearHigh, yearLow=$yearLow, indicativeClose=$indicativeClose]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.last != null) {
      json[r'last'] = this.last;
    } else {
      json[r'last'] = null;
    }
    if (this.variation != null) {
      json[r'variation'] = this.variation;
    } else {
      json[r'variation'] = null;
    }
    if (this.percentChange != null) {
      json[r'percentChange'] = this.percentChange;
    } else {
      json[r'percentChange'] = null;
    }
    if (this.open != null) {
      json[r'open'] = this.open;
    } else {
      json[r'open'] = null;
    }
    if (this.high != null) {
      json[r'high'] = this.high;
    } else {
      json[r'high'] = null;
    }
    if (this.low != null) {
      json[r'low'] = this.low;
    } else {
      json[r'low'] = null;
    }
    if (this.previousClose != null) {
      json[r'previousClose'] = this.previousClose;
    } else {
      json[r'previousClose'] = null;
    }
    if (this.yearHigh != null) {
      json[r'yearHigh'] = this.yearHigh;
    } else {
      json[r'yearHigh'] = null;
    }
    if (this.yearLow != null) {
      json[r'yearLow'] = this.yearLow;
    } else {
      json[r'yearLow'] = null;
    }
    if (this.indicativeClose != null) {
      json[r'indicativeClose'] = this.indicativeClose;
    } else {
      json[r'indicativeClose'] = null;
    }
    return json;
  }

  /// Returns a new [MarketData] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static MarketData? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "MarketData[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "MarketData[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return MarketData(
        last: mapValueOfType<double>(json, r'last'),
        variation: mapValueOfType<double>(json, r'variation'),
        percentChange: mapValueOfType<double>(json, r'percentChange'),
        open: mapValueOfType<double>(json, r'open'),
        high: mapValueOfType<double>(json, r'high'),
        low: mapValueOfType<double>(json, r'low'),
        previousClose: mapValueOfType<double>(json, r'previousClose'),
        yearHigh: mapValueOfType<double>(json, r'yearHigh'),
        yearLow: mapValueOfType<double>(json, r'yearLow'),
        indicativeClose: mapValueOfType<double>(json, r'indicativeClose'),
      );
    }
    return null;
  }

  static List<MarketData> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <MarketData>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = MarketData.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, MarketData> mapFromJson(dynamic json) {
    final map = <String, MarketData>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = MarketData.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of MarketData-objects as value to a dart map
  static Map<String, List<MarketData>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<MarketData>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = MarketData.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

