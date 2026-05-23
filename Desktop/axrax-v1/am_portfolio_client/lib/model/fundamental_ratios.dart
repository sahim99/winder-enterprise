//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class FundamentalRatios {
  /// Returns a new [FundamentalRatios] instance.
  FundamentalRatios({
    this.priceToEarningRation,
    this.priceToBookRation,
    this.dividenYield,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? priceToEarningRation;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? priceToBookRation;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? dividenYield;

  @override
  bool operator ==(Object other) => identical(this, other) || other is FundamentalRatios &&
    other.priceToEarningRation == priceToEarningRation &&
    other.priceToBookRation == priceToBookRation &&
    other.dividenYield == dividenYield;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (priceToEarningRation == null ? 0 : priceToEarningRation!.hashCode) +
    (priceToBookRation == null ? 0 : priceToBookRation!.hashCode) +
    (dividenYield == null ? 0 : dividenYield!.hashCode);

  @override
  String toString() => 'FundamentalRatios[priceToEarningRation=$priceToEarningRation, priceToBookRation=$priceToBookRation, dividenYield=$dividenYield]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.priceToEarningRation != null) {
      json[r'priceToEarningRation'] = this.priceToEarningRation;
    } else {
      json[r'priceToEarningRation'] = null;
    }
    if (this.priceToBookRation != null) {
      json[r'priceToBookRation'] = this.priceToBookRation;
    } else {
      json[r'priceToBookRation'] = null;
    }
    if (this.dividenYield != null) {
      json[r'dividenYield'] = this.dividenYield;
    } else {
      json[r'dividenYield'] = null;
    }
    return json;
  }

  /// Returns a new [FundamentalRatios] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static FundamentalRatios? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "FundamentalRatios[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "FundamentalRatios[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return FundamentalRatios(
        priceToEarningRation: mapValueOfType<double>(json, r'priceToEarningRation'),
        priceToBookRation: mapValueOfType<double>(json, r'priceToBookRation'),
        dividenYield: mapValueOfType<double>(json, r'dividenYield'),
      );
    }
    return null;
  }

  static List<FundamentalRatios> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <FundamentalRatios>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = FundamentalRatios.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, FundamentalRatios> mapFromJson(dynamic json) {
    final map = <String, FundamentalRatios>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = FundamentalRatios.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of FundamentalRatios-objects as value to a dart map
  static Map<String, List<FundamentalRatios>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<FundamentalRatios>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = FundamentalRatios.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

