//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class TimeSeriesDataModel {
  /// Returns a new [TimeSeriesDataModel] instance.
  TimeSeriesDataModel({
    this.id,
    this.timestamp,
    this.timeframe,
    this.ohlcv,
    this.latestFiveMin,
    this.latestFifteenMin,
    this.latestHourly,
    this.latestDaily,
    this.latestWeekly,
    this.latestMonthly,
    this.latestYearly,
    this.volume,
    this.openInterest,
    this.volatility,
    this.relativeStrengthIndex,
    this.movingAverage50,
    this.movingAverage200,
    this.bollingerUpperBand,
    this.bollingerLowerBand,
    this.macdLine,
    this.macdSignalLine,
    this.macdHistogram,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? id;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? timestamp;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? timeframe;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? ohlcv;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? latestFiveMin;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? latestFifteenMin;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? latestHourly;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? latestDaily;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? latestWeekly;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? latestMonthly;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  OHLCVModel? latestYearly;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? volume;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? openInterest;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? volatility;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? relativeStrengthIndex;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? movingAverage50;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? movingAverage200;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? bollingerUpperBand;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? bollingerLowerBand;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? macdLine;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? macdSignalLine;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? macdHistogram;

  @override
  bool operator ==(Object other) => identical(this, other) || other is TimeSeriesDataModel &&
    other.id == id &&
    other.timestamp == timestamp &&
    other.timeframe == timeframe &&
    other.ohlcv == ohlcv &&
    other.latestFiveMin == latestFiveMin &&
    other.latestFifteenMin == latestFifteenMin &&
    other.latestHourly == latestHourly &&
    other.latestDaily == latestDaily &&
    other.latestWeekly == latestWeekly &&
    other.latestMonthly == latestMonthly &&
    other.latestYearly == latestYearly &&
    other.volume == volume &&
    other.openInterest == openInterest &&
    other.volatility == volatility &&
    other.relativeStrengthIndex == relativeStrengthIndex &&
    other.movingAverage50 == movingAverage50 &&
    other.movingAverage200 == movingAverage200 &&
    other.bollingerUpperBand == bollingerUpperBand &&
    other.bollingerLowerBand == bollingerLowerBand &&
    other.macdLine == macdLine &&
    other.macdSignalLine == macdSignalLine &&
    other.macdHistogram == macdHistogram;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (id == null ? 0 : id!.hashCode) +
    (timestamp == null ? 0 : timestamp!.hashCode) +
    (timeframe == null ? 0 : timeframe!.hashCode) +
    (ohlcv == null ? 0 : ohlcv!.hashCode) +
    (latestFiveMin == null ? 0 : latestFiveMin!.hashCode) +
    (latestFifteenMin == null ? 0 : latestFifteenMin!.hashCode) +
    (latestHourly == null ? 0 : latestHourly!.hashCode) +
    (latestDaily == null ? 0 : latestDaily!.hashCode) +
    (latestWeekly == null ? 0 : latestWeekly!.hashCode) +
    (latestMonthly == null ? 0 : latestMonthly!.hashCode) +
    (latestYearly == null ? 0 : latestYearly!.hashCode) +
    (volume == null ? 0 : volume!.hashCode) +
    (openInterest == null ? 0 : openInterest!.hashCode) +
    (volatility == null ? 0 : volatility!.hashCode) +
    (relativeStrengthIndex == null ? 0 : relativeStrengthIndex!.hashCode) +
    (movingAverage50 == null ? 0 : movingAverage50!.hashCode) +
    (movingAverage200 == null ? 0 : movingAverage200!.hashCode) +
    (bollingerUpperBand == null ? 0 : bollingerUpperBand!.hashCode) +
    (bollingerLowerBand == null ? 0 : bollingerLowerBand!.hashCode) +
    (macdLine == null ? 0 : macdLine!.hashCode) +
    (macdSignalLine == null ? 0 : macdSignalLine!.hashCode) +
    (macdHistogram == null ? 0 : macdHistogram!.hashCode);

  @override
  String toString() => 'TimeSeriesDataModel[id=$id, timestamp=$timestamp, timeframe=$timeframe, ohlcv=$ohlcv, latestFiveMin=$latestFiveMin, latestFifteenMin=$latestFifteenMin, latestHourly=$latestHourly, latestDaily=$latestDaily, latestWeekly=$latestWeekly, latestMonthly=$latestMonthly, latestYearly=$latestYearly, volume=$volume, openInterest=$openInterest, volatility=$volatility, relativeStrengthIndex=$relativeStrengthIndex, movingAverage50=$movingAverage50, movingAverage200=$movingAverage200, bollingerUpperBand=$bollingerUpperBand, bollingerLowerBand=$bollingerLowerBand, macdLine=$macdLine, macdSignalLine=$macdSignalLine, macdHistogram=$macdHistogram]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.id != null) {
      json[r'id'] = this.id;
    } else {
      json[r'id'] = null;
    }
    if (this.timestamp != null) {
      json[r'timestamp'] = this.timestamp!.toUtc().toIso8601String();
    } else {
      json[r'timestamp'] = null;
    }
    if (this.timeframe != null) {
      json[r'timeframe'] = this.timeframe;
    } else {
      json[r'timeframe'] = null;
    }
    if (this.ohlcv != null) {
      json[r'ohlcv'] = this.ohlcv;
    } else {
      json[r'ohlcv'] = null;
    }
    if (this.latestFiveMin != null) {
      json[r'latestFiveMin'] = this.latestFiveMin;
    } else {
      json[r'latestFiveMin'] = null;
    }
    if (this.latestFifteenMin != null) {
      json[r'latestFifteenMin'] = this.latestFifteenMin;
    } else {
      json[r'latestFifteenMin'] = null;
    }
    if (this.latestHourly != null) {
      json[r'latestHourly'] = this.latestHourly;
    } else {
      json[r'latestHourly'] = null;
    }
    if (this.latestDaily != null) {
      json[r'latestDaily'] = this.latestDaily;
    } else {
      json[r'latestDaily'] = null;
    }
    if (this.latestWeekly != null) {
      json[r'latestWeekly'] = this.latestWeekly;
    } else {
      json[r'latestWeekly'] = null;
    }
    if (this.latestMonthly != null) {
      json[r'latestMonthly'] = this.latestMonthly;
    } else {
      json[r'latestMonthly'] = null;
    }
    if (this.latestYearly != null) {
      json[r'latestYearly'] = this.latestYearly;
    } else {
      json[r'latestYearly'] = null;
    }
    if (this.volume != null) {
      json[r'volume'] = this.volume;
    } else {
      json[r'volume'] = null;
    }
    if (this.openInterest != null) {
      json[r'openInterest'] = this.openInterest;
    } else {
      json[r'openInterest'] = null;
    }
    if (this.volatility != null) {
      json[r'volatility'] = this.volatility;
    } else {
      json[r'volatility'] = null;
    }
    if (this.relativeStrengthIndex != null) {
      json[r'relativeStrengthIndex'] = this.relativeStrengthIndex;
    } else {
      json[r'relativeStrengthIndex'] = null;
    }
    if (this.movingAverage50 != null) {
      json[r'movingAverage50'] = this.movingAverage50;
    } else {
      json[r'movingAverage50'] = null;
    }
    if (this.movingAverage200 != null) {
      json[r'movingAverage200'] = this.movingAverage200;
    } else {
      json[r'movingAverage200'] = null;
    }
    if (this.bollingerUpperBand != null) {
      json[r'bollingerUpperBand'] = this.bollingerUpperBand;
    } else {
      json[r'bollingerUpperBand'] = null;
    }
    if (this.bollingerLowerBand != null) {
      json[r'bollingerLowerBand'] = this.bollingerLowerBand;
    } else {
      json[r'bollingerLowerBand'] = null;
    }
    if (this.macdLine != null) {
      json[r'macdLine'] = this.macdLine;
    } else {
      json[r'macdLine'] = null;
    }
    if (this.macdSignalLine != null) {
      json[r'macdSignalLine'] = this.macdSignalLine;
    } else {
      json[r'macdSignalLine'] = null;
    }
    if (this.macdHistogram != null) {
      json[r'macdHistogram'] = this.macdHistogram;
    } else {
      json[r'macdHistogram'] = null;
    }
    return json;
  }

  /// Returns a new [TimeSeriesDataModel] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static TimeSeriesDataModel? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "TimeSeriesDataModel[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "TimeSeriesDataModel[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return TimeSeriesDataModel(
        id: mapValueOfType<String>(json, r'id'),
        timestamp: mapDateTime(json, r'timestamp', r''),
        timeframe: mapValueOfType<String>(json, r'timeframe'),
        ohlcv: OHLCVModel.fromJson(json[r'ohlcv']),
        latestFiveMin: OHLCVModel.fromJson(json[r'latestFiveMin']),
        latestFifteenMin: OHLCVModel.fromJson(json[r'latestFifteenMin']),
        latestHourly: OHLCVModel.fromJson(json[r'latestHourly']),
        latestDaily: OHLCVModel.fromJson(json[r'latestDaily']),
        latestWeekly: OHLCVModel.fromJson(json[r'latestWeekly']),
        latestMonthly: OHLCVModel.fromJson(json[r'latestMonthly']),
        latestYearly: OHLCVModel.fromJson(json[r'latestYearly']),
        volume: mapValueOfType<double>(json, r'volume'),
        openInterest: mapValueOfType<double>(json, r'openInterest'),
        volatility: mapValueOfType<double>(json, r'volatility'),
        relativeStrengthIndex: mapValueOfType<double>(json, r'relativeStrengthIndex'),
        movingAverage50: mapValueOfType<double>(json, r'movingAverage50'),
        movingAverage200: mapValueOfType<double>(json, r'movingAverage200'),
        bollingerUpperBand: mapValueOfType<double>(json, r'bollingerUpperBand'),
        bollingerLowerBand: mapValueOfType<double>(json, r'bollingerLowerBand'),
        macdLine: mapValueOfType<double>(json, r'macdLine'),
        macdSignalLine: mapValueOfType<double>(json, r'macdSignalLine'),
        macdHistogram: mapValueOfType<double>(json, r'macdHistogram'),
      );
    }
    return null;
  }

  static List<TimeSeriesDataModel> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <TimeSeriesDataModel>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = TimeSeriesDataModel.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, TimeSeriesDataModel> mapFromJson(dynamic json) {
    final map = <String, TimeSeriesDataModel>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = TimeSeriesDataModel.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of TimeSeriesDataModel-objects as value to a dart map
  static Map<String, List<TimeSeriesDataModel>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<TimeSeriesDataModel>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = TimeSeriesDataModel.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

