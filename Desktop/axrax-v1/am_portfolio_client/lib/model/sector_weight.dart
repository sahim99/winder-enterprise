//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SectorWeight {
  /// Returns a new [SectorWeight] instance.
  SectorWeight({
    this.sectorName,
    this.weightPercentage,
    this.marketCap,
    this.topStocks = const [],
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? sectorName;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? weightPercentage;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? marketCap;

  List<String> topStocks;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SectorWeight &&
    other.sectorName == sectorName &&
    other.weightPercentage == weightPercentage &&
    other.marketCap == marketCap &&
    _deepEquality.equals(other.topStocks, topStocks);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (sectorName == null ? 0 : sectorName!.hashCode) +
    (weightPercentage == null ? 0 : weightPercentage!.hashCode) +
    (marketCap == null ? 0 : marketCap!.hashCode) +
    (topStocks.hashCode);

  @override
  String toString() => 'SectorWeight[sectorName=$sectorName, weightPercentage=$weightPercentage, marketCap=$marketCap, topStocks=$topStocks]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.sectorName != null) {
      json[r'sectorName'] = this.sectorName;
    } else {
      json[r'sectorName'] = null;
    }
    if (this.weightPercentage != null) {
      json[r'weightPercentage'] = this.weightPercentage;
    } else {
      json[r'weightPercentage'] = null;
    }
    if (this.marketCap != null) {
      json[r'marketCap'] = this.marketCap;
    } else {
      json[r'marketCap'] = null;
    }
      json[r'topStocks'] = this.topStocks;
    return json;
  }

  /// Returns a new [SectorWeight] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SectorWeight? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "SectorWeight[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "SectorWeight[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return SectorWeight(
        sectorName: mapValueOfType<String>(json, r'sectorName'),
        weightPercentage: mapValueOfType<double>(json, r'weightPercentage'),
        marketCap: mapValueOfType<double>(json, r'marketCap'),
        topStocks: json[r'topStocks'] is Iterable
            ? (json[r'topStocks'] as Iterable).cast<String>().toList(growable: false)
            : const [],
      );
    }
    return null;
  }

  static List<SectorWeight> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SectorWeight>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SectorWeight.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SectorWeight> mapFromJson(dynamic json) {
    final map = <String, SectorWeight>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SectorWeight.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SectorWeight-objects as value to a dart map
  static Map<String, List<SectorWeight>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SectorWeight>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SectorWeight.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

