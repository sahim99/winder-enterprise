//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class CapSegment {
  /// Returns a new [CapSegment] instance.
  CapSegment({
    this.segmentName,
    this.weightPercentage,
    this.segmentValue,
    this.numberOfStocks,
    this.topStocks = const [],
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? segmentName;

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
  double? segmentValue;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? numberOfStocks;

  List<String> topStocks;

  @override
  bool operator ==(Object other) => identical(this, other) || other is CapSegment &&
    other.segmentName == segmentName &&
    other.weightPercentage == weightPercentage &&
    other.segmentValue == segmentValue &&
    other.numberOfStocks == numberOfStocks &&
    _deepEquality.equals(other.topStocks, topStocks);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (segmentName == null ? 0 : segmentName!.hashCode) +
    (weightPercentage == null ? 0 : weightPercentage!.hashCode) +
    (segmentValue == null ? 0 : segmentValue!.hashCode) +
    (numberOfStocks == null ? 0 : numberOfStocks!.hashCode) +
    (topStocks.hashCode);

  @override
  String toString() => 'CapSegment[segmentName=$segmentName, weightPercentage=$weightPercentage, segmentValue=$segmentValue, numberOfStocks=$numberOfStocks, topStocks=$topStocks]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.segmentName != null) {
      json[r'segmentName'] = this.segmentName;
    } else {
      json[r'segmentName'] = null;
    }
    if (this.weightPercentage != null) {
      json[r'weightPercentage'] = this.weightPercentage;
    } else {
      json[r'weightPercentage'] = null;
    }
    if (this.segmentValue != null) {
      json[r'segmentValue'] = this.segmentValue;
    } else {
      json[r'segmentValue'] = null;
    }
    if (this.numberOfStocks != null) {
      json[r'numberOfStocks'] = this.numberOfStocks;
    } else {
      json[r'numberOfStocks'] = null;
    }
      json[r'topStocks'] = this.topStocks;
    return json;
  }

  /// Returns a new [CapSegment] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static CapSegment? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "CapSegment[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "CapSegment[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return CapSegment(
        segmentName: mapValueOfType<String>(json, r'segmentName'),
        weightPercentage: mapValueOfType<double>(json, r'weightPercentage'),
        segmentValue: mapValueOfType<double>(json, r'segmentValue'),
        numberOfStocks: mapValueOfType<int>(json, r'numberOfStocks'),
        topStocks: json[r'topStocks'] is Iterable
            ? (json[r'topStocks'] as Iterable).cast<String>().toList(growable: false)
            : const [],
      );
    }
    return null;
  }

  static List<CapSegment> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <CapSegment>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = CapSegment.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, CapSegment> mapFromJson(dynamic json) {
    final map = <String, CapSegment>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = CapSegment.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of CapSegment-objects as value to a dart map
  static Map<String, List<CapSegment>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<CapSegment>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = CapSegment.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

