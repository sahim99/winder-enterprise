//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class OHLCVModel {
  /// Returns a new [OHLCVModel] instance.
  OHLCVModel({
    this.open,
    this.high,
    this.low,
    this.close,
    this.volume,
    this.timestamp,
    this.timeframe,
    this.adjustedClose,
    this.dividendAmount,
    this.splitCoefficient,
  });

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
  double? close;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? volume;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? timestamp;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? timeframe;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? adjustedClose;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? dividendAmount;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? splitCoefficient;

  @override
  bool operator ==(Object other) => identical(this, other) || other is OHLCVModel &&
    other.open == open &&
    other.high == high &&
    other.low == low &&
    other.close == close &&
    other.volume == volume &&
    other.timestamp == timestamp &&
    other.timeframe == timeframe &&
    other.adjustedClose == adjustedClose &&
    other.dividendAmount == dividendAmount &&
    other.splitCoefficient == splitCoefficient;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (open == null ? 0 : open!.hashCode) +
    (high == null ? 0 : high!.hashCode) +
    (low == null ? 0 : low!.hashCode) +
    (close == null ? 0 : close!.hashCode) +
    (volume == null ? 0 : volume!.hashCode) +
    (timestamp == null ? 0 : timestamp!.hashCode) +
    (timeframe == null ? 0 : timeframe!.hashCode) +
    (adjustedClose == null ? 0 : adjustedClose!.hashCode) +
    (dividendAmount == null ? 0 : dividendAmount!.hashCode) +
    (splitCoefficient == null ? 0 : splitCoefficient!.hashCode);

  @override
  String toString() => 'OHLCVModel[open=$open, high=$high, low=$low, close=$close, volume=$volume, timestamp=$timestamp, timeframe=$timeframe, adjustedClose=$adjustedClose, dividendAmount=$dividendAmount, splitCoefficient=$splitCoefficient]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
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
    if (this.close != null) {
      json[r'close'] = this.close;
    } else {
      json[r'close'] = null;
    }
    if (this.volume != null) {
      json[r'volume'] = this.volume;
    } else {
      json[r'volume'] = null;
    }
    if (this.timestamp != null) {
      json[r'timestamp'] = this.timestamp!.toUtc().toIso8601String();
    } else {
      json[r'timestamp'] = null;
    }
    if (this.timeframe != null) {
      json[r'timeframe'] = this.timeframe;
    } else {
      json[r'timeframe'] = null;
    }
    if (this.adjustedClose != null) {
      json[r'adjustedClose'] = this.adjustedClose;
    } else {
      json[r'adjustedClose'] = null;
    }
    if (this.dividendAmount != null) {
      json[r'dividendAmount'] = this.dividendAmount;
    } else {
      json[r'dividendAmount'] = null;
    }
    if (this.splitCoefficient != null) {
      json[r'splitCoefficient'] = this.splitCoefficient;
    } else {
      json[r'splitCoefficient'] = null;
    }
    return json;
  }

  /// Returns a new [OHLCVModel] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static OHLCVModel? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "OHLCVModel[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "OHLCVModel[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return OHLCVModel(
        open: mapValueOfType<double>(json, r'open'),
        high: mapValueOfType<double>(json, r'high'),
        low: mapValueOfType<double>(json, r'low'),
        close: mapValueOfType<double>(json, r'close'),
        volume: mapValueOfType<double>(json, r'volume'),
        timestamp: mapDateTime(json, r'timestamp', r''),
        timeframe: mapValueOfType<String>(json, r'timeframe'),
        adjustedClose: mapValueOfType<double>(json, r'adjustedClose'),
        dividendAmount: mapValueOfType<double>(json, r'dividendAmount'),
        splitCoefficient: mapValueOfType<double>(json, r'splitCoefficient'),
      );
    }
    return null;
  }

  static List<OHLCVModel> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <OHLCVModel>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = OHLCVModel.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, OHLCVModel> mapFromJson(dynamic json) {
    final map = <String, OHLCVModel>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = OHLCVModel.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of OHLCVModel-objects as value to a dart map
  static Map<String, List<OHLCVModel>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<OHLCVModel>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = OHLCVModel.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

