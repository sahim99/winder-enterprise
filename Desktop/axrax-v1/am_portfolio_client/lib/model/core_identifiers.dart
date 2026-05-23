//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class CoreIdentifiers {
  /// Returns a new [CoreIdentifiers] instance.
  CoreIdentifiers({
    required this.portfolioId,
    this.indexSymbol,
    this.comparisonIndexSymbol,
  });

  String portfolioId;

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

  @override
  bool operator ==(Object other) => identical(this, other) || other is CoreIdentifiers &&
    other.portfolioId == portfolioId &&
    other.indexSymbol == indexSymbol &&
    other.comparisonIndexSymbol == comparisonIndexSymbol;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (portfolioId.hashCode) +
    (indexSymbol == null ? 0 : indexSymbol!.hashCode) +
    (comparisonIndexSymbol == null ? 0 : comparisonIndexSymbol!.hashCode);

  @override
  String toString() => 'CoreIdentifiers[portfolioId=$portfolioId, indexSymbol=$indexSymbol, comparisonIndexSymbol=$comparisonIndexSymbol]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'portfolioId'] = this.portfolioId;
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
    return json;
  }

  /// Returns a new [CoreIdentifiers] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static CoreIdentifiers? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "CoreIdentifiers[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "CoreIdentifiers[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return CoreIdentifiers(
        portfolioId: mapValueOfType<String>(json, r'portfolioId')!,
        indexSymbol: mapValueOfType<String>(json, r'indexSymbol'),
        comparisonIndexSymbol: mapValueOfType<String>(json, r'comparisonIndexSymbol'),
      );
    }
    return null;
  }

  static List<CoreIdentifiers> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <CoreIdentifiers>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = CoreIdentifiers.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, CoreIdentifiers> mapFromJson(dynamic json) {
    final map = <String, CoreIdentifiers>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = CoreIdentifiers.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of CoreIdentifiers-objects as value to a dart map
  static Map<String, List<CoreIdentifiers>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<CoreIdentifiers>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = CoreIdentifiers.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'portfolioId',
  };
}

