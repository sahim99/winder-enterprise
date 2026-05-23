//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SectorMovement {
  /// Returns a new [SectorMovement] instance.
  SectorMovement({
    this.sectorName,
    this.averageChangePercent,
    this.stockCount,
    this.marketCapWeight,
    this.topGainerSymbols = const [],
    this.topLoserSymbols = const [],
    this.stockPerformance = const {},
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
  double? averageChangePercent;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? stockCount;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? marketCapWeight;

  List<String> topGainerSymbols;

  List<String> topLoserSymbols;

  Map<String, double> stockPerformance;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SectorMovement &&
    other.sectorName == sectorName &&
    other.averageChangePercent == averageChangePercent &&
    other.stockCount == stockCount &&
    other.marketCapWeight == marketCapWeight &&
    _deepEquality.equals(other.topGainerSymbols, topGainerSymbols) &&
    _deepEquality.equals(other.topLoserSymbols, topLoserSymbols) &&
    _deepEquality.equals(other.stockPerformance, stockPerformance);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (sectorName == null ? 0 : sectorName!.hashCode) +
    (averageChangePercent == null ? 0 : averageChangePercent!.hashCode) +
    (stockCount == null ? 0 : stockCount!.hashCode) +
    (marketCapWeight == null ? 0 : marketCapWeight!.hashCode) +
    (topGainerSymbols.hashCode) +
    (topLoserSymbols.hashCode) +
    (stockPerformance.hashCode);

  @override
  String toString() => 'SectorMovement[sectorName=$sectorName, averageChangePercent=$averageChangePercent, stockCount=$stockCount, marketCapWeight=$marketCapWeight, topGainerSymbols=$topGainerSymbols, topLoserSymbols=$topLoserSymbols, stockPerformance=$stockPerformance]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.sectorName != null) {
      json[r'sectorName'] = this.sectorName;
    } else {
      json[r'sectorName'] = null;
    }
    if (this.averageChangePercent != null) {
      json[r'averageChangePercent'] = this.averageChangePercent;
    } else {
      json[r'averageChangePercent'] = null;
    }
    if (this.stockCount != null) {
      json[r'stockCount'] = this.stockCount;
    } else {
      json[r'stockCount'] = null;
    }
    if (this.marketCapWeight != null) {
      json[r'marketCapWeight'] = this.marketCapWeight;
    } else {
      json[r'marketCapWeight'] = null;
    }
      json[r'topGainerSymbols'] = this.topGainerSymbols;
      json[r'topLoserSymbols'] = this.topLoserSymbols;
      json[r'stockPerformance'] = this.stockPerformance;
    return json;
  }

  /// Returns a new [SectorMovement] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SectorMovement? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "SectorMovement[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "SectorMovement[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return SectorMovement(
        sectorName: mapValueOfType<String>(json, r'sectorName'),
        averageChangePercent: mapValueOfType<double>(json, r'averageChangePercent'),
        stockCount: mapValueOfType<int>(json, r'stockCount'),
        marketCapWeight: mapValueOfType<double>(json, r'marketCapWeight'),
        topGainerSymbols: json[r'topGainerSymbols'] is Iterable
            ? (json[r'topGainerSymbols'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        topLoserSymbols: json[r'topLoserSymbols'] is Iterable
            ? (json[r'topLoserSymbols'] as Iterable).cast<String>().toList(growable: false)
            : const [],
        stockPerformance: mapCastOfType<String, double>(json, r'stockPerformance') ?? const {},
      );
    }
    return null;
  }

  static List<SectorMovement> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SectorMovement>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SectorMovement.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SectorMovement> mapFromJson(dynamic json) {
    final map = <String, SectorMovement>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SectorMovement.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SectorMovement-objects as value to a dart map
  static Map<String, List<SectorMovement>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SectorMovement>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SectorMovement.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

