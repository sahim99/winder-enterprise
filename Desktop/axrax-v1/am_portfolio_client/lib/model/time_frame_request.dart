//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class TimeFrameRequest {
  /// Returns a new [TimeFrameRequest] instance.
  TimeFrameRequest({
    this.fromDate,
    this.toDate,
    this.timeFrame,
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

  TimeFrameRequestTimeFrameEnum? timeFrame;

  @override
  bool operator ==(Object other) => identical(this, other) || other is TimeFrameRequest &&
    other.fromDate == fromDate &&
    other.toDate == toDate &&
    other.timeFrame == timeFrame;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (fromDate == null ? 0 : fromDate!.hashCode) +
    (toDate == null ? 0 : toDate!.hashCode) +
    (timeFrame == null ? 0 : timeFrame!.hashCode);

  @override
  String toString() => 'TimeFrameRequest[fromDate=$fromDate, toDate=$toDate, timeFrame=$timeFrame]';

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
    return json;
  }

  /// Returns a new [TimeFrameRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static TimeFrameRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "TimeFrameRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "TimeFrameRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return TimeFrameRequest(
        fromDate: mapDateTime(json, r'fromDate', r''),
        toDate: mapDateTime(json, r'toDate', r''),
        timeFrame: TimeFrameRequestTimeFrameEnum.fromJson(json[r'timeFrame']),
      );
    }
    return null;
  }

  static List<TimeFrameRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <TimeFrameRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = TimeFrameRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, TimeFrameRequest> mapFromJson(dynamic json) {
    final map = <String, TimeFrameRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = TimeFrameRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of TimeFrameRequest-objects as value to a dart map
  static Map<String, List<TimeFrameRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<TimeFrameRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = TimeFrameRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


class TimeFrameRequestTimeFrameEnum {
  /// Instantiate a new enum with the provided [value].
  const TimeFrameRequestTimeFrameEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const n1m = TimeFrameRequestTimeFrameEnum._(r'1m');
  static const n3m = TimeFrameRequestTimeFrameEnum._(r'3m');
  static const n5m = TimeFrameRequestTimeFrameEnum._(r'5m');
  static const n10m = TimeFrameRequestTimeFrameEnum._(r'10m');
  static const n15m = TimeFrameRequestTimeFrameEnum._(r'15m');
  static const n30m = TimeFrameRequestTimeFrameEnum._(r'30m');
  static const n1h = TimeFrameRequestTimeFrameEnum._(r'1H');
  static const n4h = TimeFrameRequestTimeFrameEnum._(r'4H');
  static const n1d = TimeFrameRequestTimeFrameEnum._(r'1D');
  static const n1w = TimeFrameRequestTimeFrameEnum._(r'1W');
  static const n1m2 = TimeFrameRequestTimeFrameEnum._(r'1M');
  static const n1y = TimeFrameRequestTimeFrameEnum._(r'1Y');

  /// List of all possible values in this [enum][TimeFrameRequestTimeFrameEnum].
  static const values = <TimeFrameRequestTimeFrameEnum>[
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

  static TimeFrameRequestTimeFrameEnum? fromJson(dynamic value) => TimeFrameRequestTimeFrameEnumTypeTransformer().decode(value);

  static List<TimeFrameRequestTimeFrameEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <TimeFrameRequestTimeFrameEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = TimeFrameRequestTimeFrameEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [TimeFrameRequestTimeFrameEnum] to String,
/// and [decode] dynamic data back to [TimeFrameRequestTimeFrameEnum].
class TimeFrameRequestTimeFrameEnumTypeTransformer {
  factory TimeFrameRequestTimeFrameEnumTypeTransformer() => _instance ??= const TimeFrameRequestTimeFrameEnumTypeTransformer._();

  const TimeFrameRequestTimeFrameEnumTypeTransformer._();

  String encode(TimeFrameRequestTimeFrameEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a TimeFrameRequestTimeFrameEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  TimeFrameRequestTimeFrameEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'1m': return TimeFrameRequestTimeFrameEnum.n1m;
        case r'3m': return TimeFrameRequestTimeFrameEnum.n3m;
        case r'5m': return TimeFrameRequestTimeFrameEnum.n5m;
        case r'10m': return TimeFrameRequestTimeFrameEnum.n10m;
        case r'15m': return TimeFrameRequestTimeFrameEnum.n15m;
        case r'30m': return TimeFrameRequestTimeFrameEnum.n30m;
        case r'1H': return TimeFrameRequestTimeFrameEnum.n1h;
        case r'4H': return TimeFrameRequestTimeFrameEnum.n4h;
        case r'1D': return TimeFrameRequestTimeFrameEnum.n1d;
        case r'1W': return TimeFrameRequestTimeFrameEnum.n1w;
        case r'1M': return TimeFrameRequestTimeFrameEnum.n1m2;
        case r'1Y': return TimeFrameRequestTimeFrameEnum.n1y;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [TimeFrameRequestTimeFrameEnumTypeTransformer] instance.
  static TimeFrameRequestTimeFrameEnumTypeTransformer? _instance;
}


