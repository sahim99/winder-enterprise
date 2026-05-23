//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class GainerLoser {
  /// Returns a new [GainerLoser] instance.
  GainerLoser({
    this.topGainers = const [],
    this.topLosers = const [],
    this.sectorMovements = const [],
  });

  List<StockMovement> topGainers;

  List<StockMovement> topLosers;

  List<SectorMovement> sectorMovements;

  @override
  bool operator ==(Object other) => identical(this, other) || other is GainerLoser &&
    _deepEquality.equals(other.topGainers, topGainers) &&
    _deepEquality.equals(other.topLosers, topLosers) &&
    _deepEquality.equals(other.sectorMovements, sectorMovements);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (topGainers.hashCode) +
    (topLosers.hashCode) +
    (sectorMovements.hashCode);

  @override
  String toString() => 'GainerLoser[topGainers=$topGainers, topLosers=$topLosers, sectorMovements=$sectorMovements]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'topGainers'] = this.topGainers;
      json[r'topLosers'] = this.topLosers;
      json[r'sectorMovements'] = this.sectorMovements;
    return json;
  }

  /// Returns a new [GainerLoser] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static GainerLoser? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "GainerLoser[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "GainerLoser[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return GainerLoser(
        topGainers: StockMovement.listFromJson(json[r'topGainers']),
        topLosers: StockMovement.listFromJson(json[r'topLosers']),
        sectorMovements: SectorMovement.listFromJson(json[r'sectorMovements']),
      );
    }
    return null;
  }

  static List<GainerLoser> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <GainerLoser>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = GainerLoser.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, GainerLoser> mapFromJson(dynamic json) {
    final map = <String, GainerLoser>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = GainerLoser.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of GainerLoser-objects as value to a dart map
  static Map<String, List<GainerLoser>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<GainerLoser>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = GainerLoser.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

