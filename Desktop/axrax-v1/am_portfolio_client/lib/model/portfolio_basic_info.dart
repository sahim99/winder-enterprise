//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class PortfolioBasicInfo {
  /// Returns a new [PortfolioBasicInfo] instance.
  PortfolioBasicInfo({
    this.portfolioId,
    this.portfolioName,
  });

  /// Unique portfolio identifier
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? portfolioId;

  /// Portfolio name
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? portfolioName;

  @override
  bool operator ==(Object other) => identical(this, other) || other is PortfolioBasicInfo &&
    other.portfolioId == portfolioId &&
    other.portfolioName == portfolioName;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (portfolioId == null ? 0 : portfolioId!.hashCode) +
    (portfolioName == null ? 0 : portfolioName!.hashCode);

  @override
  String toString() => 'PortfolioBasicInfo[portfolioId=$portfolioId, portfolioName=$portfolioName]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.portfolioId != null) {
      json[r'portfolioId'] = this.portfolioId;
    } else {
      json[r'portfolioId'] = null;
    }
    if (this.portfolioName != null) {
      json[r'portfolioName'] = this.portfolioName;
    } else {
      json[r'portfolioName'] = null;
    }
    return json;
  }

  /// Returns a new [PortfolioBasicInfo] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static PortfolioBasicInfo? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "PortfolioBasicInfo[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "PortfolioBasicInfo[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return PortfolioBasicInfo(
        portfolioId: mapValueOfType<String>(json, r'portfolioId'),
        portfolioName: mapValueOfType<String>(json, r'portfolioName'),
      );
    }
    return null;
  }

  static List<PortfolioBasicInfo> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PortfolioBasicInfo>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PortfolioBasicInfo.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, PortfolioBasicInfo> mapFromJson(dynamic json) {
    final map = <String, PortfolioBasicInfo>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = PortfolioBasicInfo.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of PortfolioBasicInfo-objects as value to a dart map
  static Map<String, List<PortfolioBasicInfo>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<PortfolioBasicInfo>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = PortfolioBasicInfo.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

