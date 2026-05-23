//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class PerformanceMetrics {
  /// Returns a new [PerformanceMetrics] instance.
  PerformanceMetrics({
    this.indexPerformancePercent,
    this.comparisonIndexPerformancePercent,
    this.relativePerformancePercent,
    this.volatility,
    this.maxDrawdownPercent,
    this.bestPerformingSector,
    this.worstPerformingSector,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? indexPerformancePercent;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? comparisonIndexPerformancePercent;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? relativePerformancePercent;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? volatility;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? maxDrawdownPercent;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? bestPerformingSector;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? worstPerformingSector;

  @override
  bool operator ==(Object other) => identical(this, other) || other is PerformanceMetrics &&
    other.indexPerformancePercent == indexPerformancePercent &&
    other.comparisonIndexPerformancePercent == comparisonIndexPerformancePercent &&
    other.relativePerformancePercent == relativePerformancePercent &&
    other.volatility == volatility &&
    other.maxDrawdownPercent == maxDrawdownPercent &&
    other.bestPerformingSector == bestPerformingSector &&
    other.worstPerformingSector == worstPerformingSector;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (indexPerformancePercent == null ? 0 : indexPerformancePercent!.hashCode) +
    (comparisonIndexPerformancePercent == null ? 0 : comparisonIndexPerformancePercent!.hashCode) +
    (relativePerformancePercent == null ? 0 : relativePerformancePercent!.hashCode) +
    (volatility == null ? 0 : volatility!.hashCode) +
    (maxDrawdownPercent == null ? 0 : maxDrawdownPercent!.hashCode) +
    (bestPerformingSector == null ? 0 : bestPerformingSector!.hashCode) +
    (worstPerformingSector == null ? 0 : worstPerformingSector!.hashCode);

  @override
  String toString() => 'PerformanceMetrics[indexPerformancePercent=$indexPerformancePercent, comparisonIndexPerformancePercent=$comparisonIndexPerformancePercent, relativePerformancePercent=$relativePerformancePercent, volatility=$volatility, maxDrawdownPercent=$maxDrawdownPercent, bestPerformingSector=$bestPerformingSector, worstPerformingSector=$worstPerformingSector]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.indexPerformancePercent != null) {
      json[r'indexPerformancePercent'] = this.indexPerformancePercent;
    } else {
      json[r'indexPerformancePercent'] = null;
    }
    if (this.comparisonIndexPerformancePercent != null) {
      json[r'comparisonIndexPerformancePercent'] = this.comparisonIndexPerformancePercent;
    } else {
      json[r'comparisonIndexPerformancePercent'] = null;
    }
    if (this.relativePerformancePercent != null) {
      json[r'relativePerformancePercent'] = this.relativePerformancePercent;
    } else {
      json[r'relativePerformancePercent'] = null;
    }
    if (this.volatility != null) {
      json[r'volatility'] = this.volatility;
    } else {
      json[r'volatility'] = null;
    }
    if (this.maxDrawdownPercent != null) {
      json[r'maxDrawdownPercent'] = this.maxDrawdownPercent;
    } else {
      json[r'maxDrawdownPercent'] = null;
    }
    if (this.bestPerformingSector != null) {
      json[r'bestPerformingSector'] = this.bestPerformingSector;
    } else {
      json[r'bestPerformingSector'] = null;
    }
    if (this.worstPerformingSector != null) {
      json[r'worstPerformingSector'] = this.worstPerformingSector;
    } else {
      json[r'worstPerformingSector'] = null;
    }
    return json;
  }

  /// Returns a new [PerformanceMetrics] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static PerformanceMetrics? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "PerformanceMetrics[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "PerformanceMetrics[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return PerformanceMetrics(
        indexPerformancePercent: mapValueOfType<double>(json, r'indexPerformancePercent'),
        comparisonIndexPerformancePercent: mapValueOfType<double>(json, r'comparisonIndexPerformancePercent'),
        relativePerformancePercent: mapValueOfType<double>(json, r'relativePerformancePercent'),
        volatility: mapValueOfType<double>(json, r'volatility'),
        maxDrawdownPercent: mapValueOfType<double>(json, r'maxDrawdownPercent'),
        bestPerformingSector: mapValueOfType<String>(json, r'bestPerformingSector'),
        worstPerformingSector: mapValueOfType<String>(json, r'worstPerformingSector'),
      );
    }
    return null;
  }

  static List<PerformanceMetrics> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PerformanceMetrics>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PerformanceMetrics.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, PerformanceMetrics> mapFromJson(dynamic json) {
    final map = <String, PerformanceMetrics>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = PerformanceMetrics.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of PerformanceMetrics-objects as value to a dart map
  static Map<String, List<PerformanceMetrics>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<PerformanceMetrics>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = PerformanceMetrics.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

