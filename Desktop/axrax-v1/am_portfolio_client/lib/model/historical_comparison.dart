//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class HistoricalComparison {
  /// Returns a new [HistoricalComparison] instance.
  HistoricalComparison({
    this.value,
    this.perChange365d,
    this.date365dAgo,
    this.perChange30d,
    this.date30dAgo,
    this.previousDay,
    this.oneWeekAgo,
    this.oneMonthAgo,
    this.oneYearAgo,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? value;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? perChange365d;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? date365dAgo;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? perChange30d;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? date30dAgo;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? previousDay;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? oneWeekAgo;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? oneMonthAgo;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? oneYearAgo;

  @override
  bool operator ==(Object other) => identical(this, other) || other is HistoricalComparison &&
    other.value == value &&
    other.perChange365d == perChange365d &&
    other.date365dAgo == date365dAgo &&
    other.perChange30d == perChange30d &&
    other.date30dAgo == date30dAgo &&
    other.previousDay == previousDay &&
    other.oneWeekAgo == oneWeekAgo &&
    other.oneMonthAgo == oneMonthAgo &&
    other.oneYearAgo == oneYearAgo;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (value == null ? 0 : value!.hashCode) +
    (perChange365d == null ? 0 : perChange365d!.hashCode) +
    (date365dAgo == null ? 0 : date365dAgo!.hashCode) +
    (perChange30d == null ? 0 : perChange30d!.hashCode) +
    (date30dAgo == null ? 0 : date30dAgo!.hashCode) +
    (previousDay == null ? 0 : previousDay!.hashCode) +
    (oneWeekAgo == null ? 0 : oneWeekAgo!.hashCode) +
    (oneMonthAgo == null ? 0 : oneMonthAgo!.hashCode) +
    (oneYearAgo == null ? 0 : oneYearAgo!.hashCode);

  @override
  String toString() => 'HistoricalComparison[value=$value, perChange365d=$perChange365d, date365dAgo=$date365dAgo, perChange30d=$perChange30d, date30dAgo=$date30dAgo, previousDay=$previousDay, oneWeekAgo=$oneWeekAgo, oneMonthAgo=$oneMonthAgo, oneYearAgo=$oneYearAgo]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.value != null) {
      json[r'value'] = this.value;
    } else {
      json[r'value'] = null;
    }
    if (this.perChange365d != null) {
      json[r'perChange365d'] = this.perChange365d;
    } else {
      json[r'perChange365d'] = null;
    }
    if (this.date365dAgo != null) {
      json[r'date365dAgo'] = this.date365dAgo!.toUtc().toIso8601String();
    } else {
      json[r'date365dAgo'] = null;
    }
    if (this.perChange30d != null) {
      json[r'perChange30d'] = this.perChange30d;
    } else {
      json[r'perChange30d'] = null;
    }
    if (this.date30dAgo != null) {
      json[r'date30dAgo'] = this.date30dAgo!.toUtc().toIso8601String();
    } else {
      json[r'date30dAgo'] = null;
    }
    if (this.previousDay != null) {
      json[r'previousDay'] = this.previousDay;
    } else {
      json[r'previousDay'] = null;
    }
    if (this.oneWeekAgo != null) {
      json[r'oneWeekAgo'] = this.oneWeekAgo;
    } else {
      json[r'oneWeekAgo'] = null;
    }
    if (this.oneMonthAgo != null) {
      json[r'oneMonthAgo'] = this.oneMonthAgo;
    } else {
      json[r'oneMonthAgo'] = null;
    }
    if (this.oneYearAgo != null) {
      json[r'oneYearAgo'] = this.oneYearAgo;
    } else {
      json[r'oneYearAgo'] = null;
    }
    return json;
  }

  /// Returns a new [HistoricalComparison] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static HistoricalComparison? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "HistoricalComparison[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "HistoricalComparison[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return HistoricalComparison(
        value: mapValueOfType<double>(json, r'value'),
        perChange365d: mapValueOfType<double>(json, r'perChange365d'),
        date365dAgo: mapDateTime(json, r'date365dAgo', r''),
        perChange30d: mapValueOfType<double>(json, r'perChange30d'),
        date30dAgo: mapDateTime(json, r'date30dAgo', r''),
        previousDay: mapValueOfType<double>(json, r'previousDay'),
        oneWeekAgo: mapValueOfType<double>(json, r'oneWeekAgo'),
        oneMonthAgo: mapValueOfType<double>(json, r'oneMonthAgo'),
        oneYearAgo: mapValueOfType<double>(json, r'oneYearAgo'),
      );
    }
    return null;
  }

  static List<HistoricalComparison> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <HistoricalComparison>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = HistoricalComparison.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, HistoricalComparison> mapFromJson(dynamic json) {
    final map = <String, HistoricalComparison>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = HistoricalComparison.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of HistoricalComparison-objects as value to a dart map
  static Map<String, List<HistoricalComparison>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<HistoricalComparison>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = HistoricalComparison.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

