//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class AnalyticsComponent {
  /// Returns a new [AnalyticsComponent] instance.
  AnalyticsComponent({
    this.heatmap,
    this.movers,
    this.sectorAllocation,
    this.marketCapAllocation,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  Heatmap? heatmap;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  GainerLoser? movers;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  SectorAllocation? sectorAllocation;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  MarketCapAllocation? marketCapAllocation;

  @override
  bool operator ==(Object other) => identical(this, other) || other is AnalyticsComponent &&
    other.heatmap == heatmap &&
    other.movers == movers &&
    other.sectorAllocation == sectorAllocation &&
    other.marketCapAllocation == marketCapAllocation;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (heatmap == null ? 0 : heatmap!.hashCode) +
    (movers == null ? 0 : movers!.hashCode) +
    (sectorAllocation == null ? 0 : sectorAllocation!.hashCode) +
    (marketCapAllocation == null ? 0 : marketCapAllocation!.hashCode);

  @override
  String toString() => 'AnalyticsComponent[heatmap=$heatmap, movers=$movers, sectorAllocation=$sectorAllocation, marketCapAllocation=$marketCapAllocation]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.heatmap != null) {
      json[r'heatmap'] = this.heatmap;
    } else {
      json[r'heatmap'] = null;
    }
    if (this.movers != null) {
      json[r'movers'] = this.movers;
    } else {
      json[r'movers'] = null;
    }
    if (this.sectorAllocation != null) {
      json[r'sectorAllocation'] = this.sectorAllocation;
    } else {
      json[r'sectorAllocation'] = null;
    }
    if (this.marketCapAllocation != null) {
      json[r'marketCapAllocation'] = this.marketCapAllocation;
    } else {
      json[r'marketCapAllocation'] = null;
    }
    return json;
  }

  /// Returns a new [AnalyticsComponent] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static AnalyticsComponent? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "AnalyticsComponent[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "AnalyticsComponent[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return AnalyticsComponent(
        heatmap: Heatmap.fromJson(json[r'heatmap']),
        movers: GainerLoser.fromJson(json[r'movers']),
        sectorAllocation: SectorAllocation.fromJson(json[r'sectorAllocation']),
        marketCapAllocation: MarketCapAllocation.fromJson(json[r'marketCapAllocation']),
      );
    }
    return null;
  }

  static List<AnalyticsComponent> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <AnalyticsComponent>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = AnalyticsComponent.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, AnalyticsComponent> mapFromJson(dynamic json) {
    final map = <String, AnalyticsComponent>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = AnalyticsComponent.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of AnalyticsComponent-objects as value to a dart map
  static Map<String, List<AnalyticsComponent>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<AnalyticsComponent>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = AnalyticsComponent.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

