//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class ChartPaths {
  /// Returns a new [ChartPaths] instance.
  ChartPaths({
    this.chart365dPath,
    this.chart30dPath,
    this.chartTodayPath,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? chart365dPath;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? chart30dPath;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? chartTodayPath;

  @override
  bool operator ==(Object other) => identical(this, other) || other is ChartPaths &&
    other.chart365dPath == chart365dPath &&
    other.chart30dPath == chart30dPath &&
    other.chartTodayPath == chartTodayPath;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (chart365dPath == null ? 0 : chart365dPath!.hashCode) +
    (chart30dPath == null ? 0 : chart30dPath!.hashCode) +
    (chartTodayPath == null ? 0 : chartTodayPath!.hashCode);

  @override
  String toString() => 'ChartPaths[chart365dPath=$chart365dPath, chart30dPath=$chart30dPath, chartTodayPath=$chartTodayPath]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.chart365dPath != null) {
      json[r'chart365dPath'] = this.chart365dPath;
    } else {
      json[r'chart365dPath'] = null;
    }
    if (this.chart30dPath != null) {
      json[r'chart30dPath'] = this.chart30dPath;
    } else {
      json[r'chart30dPath'] = null;
    }
    if (this.chartTodayPath != null) {
      json[r'chartTodayPath'] = this.chartTodayPath;
    } else {
      json[r'chartTodayPath'] = null;
    }
    return json;
  }

  /// Returns a new [ChartPaths] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static ChartPaths? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "ChartPaths[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "ChartPaths[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return ChartPaths(
        chart365dPath: mapValueOfType<String>(json, r'chart365dPath'),
        chart30dPath: mapValueOfType<String>(json, r'chart30dPath'),
        chartTodayPath: mapValueOfType<String>(json, r'chartTodayPath'),
      );
    }
    return null;
  }

  static List<ChartPaths> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <ChartPaths>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = ChartPaths.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, ChartPaths> mapFromJson(dynamic json) {
    final map = <String, ChartPaths>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = ChartPaths.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of ChartPaths-objects as value to a dart map
  static Map<String, List<ChartPaths>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<ChartPaths>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = ChartPaths.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

