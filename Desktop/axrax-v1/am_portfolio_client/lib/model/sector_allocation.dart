//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SectorAllocation {
  /// Returns a new [SectorAllocation] instance.
  SectorAllocation({
    this.sectorWeights = const [],
    this.industryWeights = const [],
  });

  List<SectorWeight> sectorWeights;

  List<IndustryWeight> industryWeights;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SectorAllocation &&
    _deepEquality.equals(other.sectorWeights, sectorWeights) &&
    _deepEquality.equals(other.industryWeights, industryWeights);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (sectorWeights.hashCode) +
    (industryWeights.hashCode);

  @override
  String toString() => 'SectorAllocation[sectorWeights=$sectorWeights, industryWeights=$industryWeights]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'sectorWeights'] = this.sectorWeights;
      json[r'industryWeights'] = this.industryWeights;
    return json;
  }

  /// Returns a new [SectorAllocation] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SectorAllocation? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "SectorAllocation[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "SectorAllocation[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return SectorAllocation(
        sectorWeights: SectorWeight.listFromJson(json[r'sectorWeights']),
        industryWeights: IndustryWeight.listFromJson(json[r'industryWeights']),
      );
    }
    return null;
  }

  static List<SectorAllocation> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SectorAllocation>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SectorAllocation.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SectorAllocation> mapFromJson(dynamic json) {
    final map = <String, SectorAllocation>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SectorAllocation.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SectorAllocation-objects as value to a dart map
  static Map<String, List<SectorAllocation>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SectorAllocation>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SectorAllocation.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

