//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class AdvancedAnalyticsResponse {
  /// Returns a new [AdvancedAnalyticsResponse] instance.
  AdvancedAnalyticsResponse({
    this.portfolioId,
    this.indexSymbol,
    this.comparisonIndexSymbol,
    this.startDate,
    this.endDate,
    this.timestamp,
    this.analytics,
    this.performanceMetrics,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? portfolioId;

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
  String? comparisonIndexSymbol;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? startDate;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? endDate;

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
  AnalyticsComponent? analytics;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  PerformanceMetrics? performanceMetrics;

  @override
  bool operator ==(Object other) => identical(this, other) || other is AdvancedAnalyticsResponse &&
    other.portfolioId == portfolioId &&
    other.indexSymbol == indexSymbol &&
    other.comparisonIndexSymbol == comparisonIndexSymbol &&
    other.startDate == startDate &&
    other.endDate == endDate &&
    other.timestamp == timestamp &&
    other.analytics == analytics &&
    other.performanceMetrics == performanceMetrics;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (portfolioId == null ? 0 : portfolioId!.hashCode) +
    (indexSymbol == null ? 0 : indexSymbol!.hashCode) +
    (comparisonIndexSymbol == null ? 0 : comparisonIndexSymbol!.hashCode) +
    (startDate == null ? 0 : startDate!.hashCode) +
    (endDate == null ? 0 : endDate!.hashCode) +
    (timestamp == null ? 0 : timestamp!.hashCode) +
    (analytics == null ? 0 : analytics!.hashCode) +
    (performanceMetrics == null ? 0 : performanceMetrics!.hashCode);

  @override
  String toString() => 'AdvancedAnalyticsResponse[portfolioId=$portfolioId, indexSymbol=$indexSymbol, comparisonIndexSymbol=$comparisonIndexSymbol, startDate=$startDate, endDate=$endDate, timestamp=$timestamp, analytics=$analytics, performanceMetrics=$performanceMetrics]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.portfolioId != null) {
      json[r'portfolioId'] = this.portfolioId;
    } else {
      json[r'portfolioId'] = null;
    }
    if (this.indexSymbol != null) {
      json[r'indexSymbol'] = this.indexSymbol;
    } else {
      json[r'indexSymbol'] = null;
    }
    if (this.comparisonIndexSymbol != null) {
      json[r'comparisonIndexSymbol'] = this.comparisonIndexSymbol;
    } else {
      json[r'comparisonIndexSymbol'] = null;
    }
    if (this.startDate != null) {
      json[r'startDate'] = _dateFormatter.format(this.startDate!.toUtc());
    } else {
      json[r'startDate'] = null;
    }
    if (this.endDate != null) {
      json[r'endDate'] = _dateFormatter.format(this.endDate!.toUtc());
    } else {
      json[r'endDate'] = null;
    }
    if (this.timestamp != null) {
      json[r'timestamp'] = this.timestamp!.toUtc().toIso8601String();
    } else {
      json[r'timestamp'] = null;
    }
    if (this.analytics != null) {
      json[r'analytics'] = this.analytics;
    } else {
      json[r'analytics'] = null;
    }
    if (this.performanceMetrics != null) {
      json[r'performanceMetrics'] = this.performanceMetrics;
    } else {
      json[r'performanceMetrics'] = null;
    }
    return json;
  }

  /// Returns a new [AdvancedAnalyticsResponse] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static AdvancedAnalyticsResponse? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "AdvancedAnalyticsResponse[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "AdvancedAnalyticsResponse[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return AdvancedAnalyticsResponse(
        portfolioId: mapValueOfType<String>(json, r'portfolioId'),
        indexSymbol: mapValueOfType<String>(json, r'indexSymbol'),
        comparisonIndexSymbol: mapValueOfType<String>(json, r'comparisonIndexSymbol'),
        startDate: mapDateTime(json, r'startDate', r''),
        endDate: mapDateTime(json, r'endDate', r''),
        timestamp: mapDateTime(json, r'timestamp', r''),
        analytics: AnalyticsComponent.fromJson(json[r'analytics']),
        performanceMetrics: PerformanceMetrics.fromJson(json[r'performanceMetrics']),
      );
    }
    return null;
  }

  static List<AdvancedAnalyticsResponse> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <AdvancedAnalyticsResponse>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = AdvancedAnalyticsResponse.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, AdvancedAnalyticsResponse> mapFromJson(dynamic json) {
    final map = <String, AdvancedAnalyticsResponse>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = AdvancedAnalyticsResponse.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of AdvancedAnalyticsResponse-objects as value to a dart map
  static Map<String, List<AdvancedAnalyticsResponse>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<AdvancedAnalyticsResponse>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = AdvancedAnalyticsResponse.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

