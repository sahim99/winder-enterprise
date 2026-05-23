//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class FeatureToggles {
  /// Returns a new [FeatureToggles] instance.
  FeatureToggles({
    this.includeHeatmap,
    this.includeMovers,
    this.includeSectorAllocation,
    this.includeMarketCapAllocation,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? includeHeatmap;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? includeMovers;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? includeSectorAllocation;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? includeMarketCapAllocation;

  @override
  bool operator ==(Object other) => identical(this, other) || other is FeatureToggles &&
    other.includeHeatmap == includeHeatmap &&
    other.includeMovers == includeMovers &&
    other.includeSectorAllocation == includeSectorAllocation &&
    other.includeMarketCapAllocation == includeMarketCapAllocation;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (includeHeatmap == null ? 0 : includeHeatmap!.hashCode) +
    (includeMovers == null ? 0 : includeMovers!.hashCode) +
    (includeSectorAllocation == null ? 0 : includeSectorAllocation!.hashCode) +
    (includeMarketCapAllocation == null ? 0 : includeMarketCapAllocation!.hashCode);

  @override
  String toString() => 'FeatureToggles[includeHeatmap=$includeHeatmap, includeMovers=$includeMovers, includeSectorAllocation=$includeSectorAllocation, includeMarketCapAllocation=$includeMarketCapAllocation]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.includeHeatmap != null) {
      json[r'includeHeatmap'] = this.includeHeatmap;
    } else {
      json[r'includeHeatmap'] = null;
    }
    if (this.includeMovers != null) {
      json[r'includeMovers'] = this.includeMovers;
    } else {
      json[r'includeMovers'] = null;
    }
    if (this.includeSectorAllocation != null) {
      json[r'includeSectorAllocation'] = this.includeSectorAllocation;
    } else {
      json[r'includeSectorAllocation'] = null;
    }
    if (this.includeMarketCapAllocation != null) {
      json[r'includeMarketCapAllocation'] = this.includeMarketCapAllocation;
    } else {
      json[r'includeMarketCapAllocation'] = null;
    }
    return json;
  }

  /// Returns a new [FeatureToggles] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static FeatureToggles? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "FeatureToggles[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "FeatureToggles[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return FeatureToggles(
        includeHeatmap: mapValueOfType<bool>(json, r'includeHeatmap'),
        includeMovers: mapValueOfType<bool>(json, r'includeMovers'),
        includeSectorAllocation: mapValueOfType<bool>(json, r'includeSectorAllocation'),
        includeMarketCapAllocation: mapValueOfType<bool>(json, r'includeMarketCapAllocation'),
      );
    }
    return null;
  }

  static List<FeatureToggles> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <FeatureToggles>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = FeatureToggles.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, FeatureToggles> mapFromJson(dynamic json) {
    final map = <String, FeatureToggles>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = FeatureToggles.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of FeatureToggles-objects as value to a dart map
  static Map<String, List<FeatureToggles>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<FeatureToggles>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = FeatureToggles.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

