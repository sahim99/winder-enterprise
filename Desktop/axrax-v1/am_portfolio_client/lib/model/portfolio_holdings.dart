//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class PortfolioHoldings {
  /// Returns a new [PortfolioHoldings] instance.
  PortfolioHoldings({
    this.userId,
    this.equityHoldings = const [],
    this.lastUpdated,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? userId;

  List<EquityHoldings> equityHoldings;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? lastUpdated;

  @override
  bool operator ==(Object other) => identical(this, other) || other is PortfolioHoldings &&
    other.userId == userId &&
    _deepEquality.equals(other.equityHoldings, equityHoldings) &&
    other.lastUpdated == lastUpdated;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (userId == null ? 0 : userId!.hashCode) +
    (equityHoldings.hashCode) +
    (lastUpdated == null ? 0 : lastUpdated!.hashCode);

  @override
  String toString() => 'PortfolioHoldings[userId=$userId, equityHoldings=$equityHoldings, lastUpdated=$lastUpdated]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.userId != null) {
      json[r'userId'] = this.userId;
    } else {
      json[r'userId'] = null;
    }
      json[r'equityHoldings'] = this.equityHoldings;
    if (this.lastUpdated != null) {
      json[r'lastUpdated'] = this.lastUpdated!.toUtc().toIso8601String();
    } else {
      json[r'lastUpdated'] = null;
    }
    return json;
  }

  /// Returns a new [PortfolioHoldings] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static PortfolioHoldings? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "PortfolioHoldings[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "PortfolioHoldings[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return PortfolioHoldings(
        userId: mapValueOfType<String>(json, r'userId'),
        equityHoldings: EquityHoldings.listFromJson(json[r'equityHoldings']),
        lastUpdated: mapDateTime(json, r'lastUpdated', r''),
      );
    }
    return null;
  }

  static List<PortfolioHoldings> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PortfolioHoldings>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PortfolioHoldings.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, PortfolioHoldings> mapFromJson(dynamic json) {
    final map = <String, PortfolioHoldings>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = PortfolioHoldings.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of PortfolioHoldings-objects as value to a dart map
  static Map<String, List<PortfolioHoldings>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<PortfolioHoldings>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = PortfolioHoldings.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

