//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class MarketCapAllocation {
  /// Returns a new [MarketCapAllocation] instance.
  MarketCapAllocation({
    this.segments = const [],
  });

  List<CapSegment> segments;

  @override
  bool operator ==(Object other) => identical(this, other) || other is MarketCapAllocation &&
    _deepEquality.equals(other.segments, segments);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (segments.hashCode);

  @override
  String toString() => 'MarketCapAllocation[segments=$segments]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'segments'] = this.segments;
    return json;
  }

  /// Returns a new [MarketCapAllocation] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static MarketCapAllocation? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "MarketCapAllocation[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "MarketCapAllocation[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return MarketCapAllocation(
        segments: CapSegment.listFromJson(json[r'segments']),
      );
    }
    return null;
  }

  static List<MarketCapAllocation> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <MarketCapAllocation>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = MarketCapAllocation.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, MarketCapAllocation> mapFromJson(dynamic json) {
    final map = <String, MarketCapAllocation>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = MarketCapAllocation.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of MarketCapAllocation-objects as value to a dart map
  static Map<String, List<MarketCapAllocation>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<MarketCapAllocation>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = MarketCapAllocation.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

