//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class PaginationRequest {
  /// Returns a new [PaginationRequest] instance.
  PaginationRequest({
    this.page,
    this.size,
    this.sortBy,
    this.sortDirection,
    this.returnAllData,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? page;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? size;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? sortBy;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? sortDirection;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  bool? returnAllData;

  @override
  bool operator ==(Object other) => identical(this, other) || other is PaginationRequest &&
    other.page == page &&
    other.size == size &&
    other.sortBy == sortBy &&
    other.sortDirection == sortDirection &&
    other.returnAllData == returnAllData;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (page == null ? 0 : page!.hashCode) +
    (size == null ? 0 : size!.hashCode) +
    (sortBy == null ? 0 : sortBy!.hashCode) +
    (sortDirection == null ? 0 : sortDirection!.hashCode) +
    (returnAllData == null ? 0 : returnAllData!.hashCode);

  @override
  String toString() => 'PaginationRequest[page=$page, size=$size, sortBy=$sortBy, sortDirection=$sortDirection, returnAllData=$returnAllData]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.page != null) {
      json[r'page'] = this.page;
    } else {
      json[r'page'] = null;
    }
    if (this.size != null) {
      json[r'size'] = this.size;
    } else {
      json[r'size'] = null;
    }
    if (this.sortBy != null) {
      json[r'sortBy'] = this.sortBy;
    } else {
      json[r'sortBy'] = null;
    }
    if (this.sortDirection != null) {
      json[r'sortDirection'] = this.sortDirection;
    } else {
      json[r'sortDirection'] = null;
    }
    if (this.returnAllData != null) {
      json[r'returnAllData'] = this.returnAllData;
    } else {
      json[r'returnAllData'] = null;
    }
    return json;
  }

  /// Returns a new [PaginationRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static PaginationRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "PaginationRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "PaginationRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return PaginationRequest(
        page: mapValueOfType<int>(json, r'page'),
        size: mapValueOfType<int>(json, r'size'),
        sortBy: mapValueOfType<String>(json, r'sortBy'),
        sortDirection: mapValueOfType<String>(json, r'sortDirection'),
        returnAllData: mapValueOfType<bool>(json, r'returnAllData'),
      );
    }
    return null;
  }

  static List<PaginationRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PaginationRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PaginationRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, PaginationRequest> mapFromJson(dynamic json) {
    final map = <String, PaginationRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = PaginationRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of PaginationRequest-objects as value to a dart map
  static Map<String, List<PaginationRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<PaginationRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = PaginationRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

