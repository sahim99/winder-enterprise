//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class AdvancedAnalyticsRequest {
  /// Returns a new [AdvancedAnalyticsRequest] instance.
  AdvancedAnalyticsRequest({
    this.fromDate,
    this.toDate,
    this.timeFrame,
    this.coreIdentifiers,
    this.pagination,
    this.featureToggles,
    this.featureConfiguration,
    this.timeFrameRequest,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? fromDate;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? toDate;

  AdvancedAnalyticsRequestTimeFrameEnum? timeFrame;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  CoreIdentifiers? coreIdentifiers;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  PaginationRequest? pagination;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  FeatureToggles? featureToggles;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  FeatureConfiguration? featureConfiguration;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  TimeFrameRequest? timeFrameRequest;

  @override
  bool operator ==(Object other) => identical(this, other) || other is AdvancedAnalyticsRequest &&
    other.fromDate == fromDate &&
    other.toDate == toDate &&
    other.timeFrame == timeFrame &&
    other.coreIdentifiers == coreIdentifiers &&
    other.pagination == pagination &&
    other.featureToggles == featureToggles &&
    other.featureConfiguration == featureConfiguration &&
    other.timeFrameRequest == timeFrameRequest;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (fromDate == null ? 0 : fromDate!.hashCode) +
    (toDate == null ? 0 : toDate!.hashCode) +
    (timeFrame == null ? 0 : timeFrame!.hashCode) +
    (coreIdentifiers == null ? 0 : coreIdentifiers!.hashCode) +
    (pagination == null ? 0 : pagination!.hashCode) +
    (featureToggles == null ? 0 : featureToggles!.hashCode) +
    (featureConfiguration == null ? 0 : featureConfiguration!.hashCode) +
    (timeFrameRequest == null ? 0 : timeFrameRequest!.hashCode);

  @override
  String toString() => 'AdvancedAnalyticsRequest[fromDate=$fromDate, toDate=$toDate, timeFrame=$timeFrame, coreIdentifiers=$coreIdentifiers, pagination=$pagination, featureToggles=$featureToggles, featureConfiguration=$featureConfiguration, timeFrameRequest=$timeFrameRequest]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.fromDate != null) {
      json[r'fromDate'] = _dateFormatter.format(this.fromDate!.toUtc());
    } else {
      json[r'fromDate'] = null;
    }
    if (this.toDate != null) {
      json[r'toDate'] = _dateFormatter.format(this.toDate!.toUtc());
    } else {
      json[r'toDate'] = null;
    }
    if (this.timeFrame != null) {
      json[r'timeFrame'] = this.timeFrame;
    } else {
      json[r'timeFrame'] = null;
    }
    if (this.coreIdentifiers != null) {
      json[r'coreIdentifiers'] = this.coreIdentifiers;
    } else {
      json[r'coreIdentifiers'] = null;
    }
    if (this.pagination != null) {
      json[r'pagination'] = this.pagination;
    } else {
      json[r'pagination'] = null;
    }
    if (this.featureToggles != null) {
      json[r'featureToggles'] = this.featureToggles;
    } else {
      json[r'featureToggles'] = null;
    }
    if (this.featureConfiguration != null) {
      json[r'featureConfiguration'] = this.featureConfiguration;
    } else {
      json[r'featureConfiguration'] = null;
    }
    if (this.timeFrameRequest != null) {
      json[r'timeFrameRequest'] = this.timeFrameRequest;
    } else {
      json[r'timeFrameRequest'] = null;
    }
    return json;
  }

  /// Returns a new [AdvancedAnalyticsRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static AdvancedAnalyticsRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "AdvancedAnalyticsRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "AdvancedAnalyticsRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return AdvancedAnalyticsRequest(
        fromDate: mapDateTime(json, r'fromDate', r''),
        toDate: mapDateTime(json, r'toDate', r''),
        timeFrame: AdvancedAnalyticsRequestTimeFrameEnum.fromJson(json[r'timeFrame']),
        coreIdentifiers: CoreIdentifiers.fromJson(json[r'coreIdentifiers']),
        pagination: PaginationRequest.fromJson(json[r'pagination']),
        featureToggles: FeatureToggles.fromJson(json[r'featureToggles']),
        featureConfiguration: FeatureConfiguration.fromJson(json[r'featureConfiguration']),
        timeFrameRequest: TimeFrameRequest.fromJson(json[r'timeFrameRequest']),
      );
    }
    return null;
  }

  static List<AdvancedAnalyticsRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <AdvancedAnalyticsRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = AdvancedAnalyticsRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, AdvancedAnalyticsRequest> mapFromJson(dynamic json) {
    final map = <String, AdvancedAnalyticsRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = AdvancedAnalyticsRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of AdvancedAnalyticsRequest-objects as value to a dart map
  static Map<String, List<AdvancedAnalyticsRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<AdvancedAnalyticsRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = AdvancedAnalyticsRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


class AdvancedAnalyticsRequestTimeFrameEnum {
  /// Instantiate a new enum with the provided [value].
  const AdvancedAnalyticsRequestTimeFrameEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const n1m = AdvancedAnalyticsRequestTimeFrameEnum._(r'1m');
  static const n3m = AdvancedAnalyticsRequestTimeFrameEnum._(r'3m');
  static const n5m = AdvancedAnalyticsRequestTimeFrameEnum._(r'5m');
  static const n10m = AdvancedAnalyticsRequestTimeFrameEnum._(r'10m');
  static const n15m = AdvancedAnalyticsRequestTimeFrameEnum._(r'15m');
  static const n30m = AdvancedAnalyticsRequestTimeFrameEnum._(r'30m');
  static const n1h = AdvancedAnalyticsRequestTimeFrameEnum._(r'1H');
  static const n4h = AdvancedAnalyticsRequestTimeFrameEnum._(r'4H');
  static const n1d = AdvancedAnalyticsRequestTimeFrameEnum._(r'1D');
  static const n1w = AdvancedAnalyticsRequestTimeFrameEnum._(r'1W');
  static const n1m2 = AdvancedAnalyticsRequestTimeFrameEnum._(r'1M');
  static const n1y = AdvancedAnalyticsRequestTimeFrameEnum._(r'1Y');

  /// List of all possible values in this [enum][AdvancedAnalyticsRequestTimeFrameEnum].
  static const values = <AdvancedAnalyticsRequestTimeFrameEnum>[
    n1m,
    n3m,
    n5m,
    n10m,
    n15m,
    n30m,
    n1h,
    n4h,
    n1d,
    n1w,
    n1m2,
    n1y,
  ];

  static AdvancedAnalyticsRequestTimeFrameEnum? fromJson(dynamic value) => AdvancedAnalyticsRequestTimeFrameEnumTypeTransformer().decode(value);

  static List<AdvancedAnalyticsRequestTimeFrameEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <AdvancedAnalyticsRequestTimeFrameEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = AdvancedAnalyticsRequestTimeFrameEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [AdvancedAnalyticsRequestTimeFrameEnum] to String,
/// and [decode] dynamic data back to [AdvancedAnalyticsRequestTimeFrameEnum].
class AdvancedAnalyticsRequestTimeFrameEnumTypeTransformer {
  factory AdvancedAnalyticsRequestTimeFrameEnumTypeTransformer() => _instance ??= const AdvancedAnalyticsRequestTimeFrameEnumTypeTransformer._();

  const AdvancedAnalyticsRequestTimeFrameEnumTypeTransformer._();

  String encode(AdvancedAnalyticsRequestTimeFrameEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a AdvancedAnalyticsRequestTimeFrameEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  AdvancedAnalyticsRequestTimeFrameEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'1m': return AdvancedAnalyticsRequestTimeFrameEnum.n1m;
        case r'3m': return AdvancedAnalyticsRequestTimeFrameEnum.n3m;
        case r'5m': return AdvancedAnalyticsRequestTimeFrameEnum.n5m;
        case r'10m': return AdvancedAnalyticsRequestTimeFrameEnum.n10m;
        case r'15m': return AdvancedAnalyticsRequestTimeFrameEnum.n15m;
        case r'30m': return AdvancedAnalyticsRequestTimeFrameEnum.n30m;
        case r'1H': return AdvancedAnalyticsRequestTimeFrameEnum.n1h;
        case r'4H': return AdvancedAnalyticsRequestTimeFrameEnum.n4h;
        case r'1D': return AdvancedAnalyticsRequestTimeFrameEnum.n1d;
        case r'1W': return AdvancedAnalyticsRequestTimeFrameEnum.n1w;
        case r'1M': return AdvancedAnalyticsRequestTimeFrameEnum.n1m2;
        case r'1Y': return AdvancedAnalyticsRequestTimeFrameEnum.n1y;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [AdvancedAnalyticsRequestTimeFrameEnumTypeTransformer] instance.
  static AdvancedAnalyticsRequestTimeFrameEnumTypeTransformer? _instance;
}


