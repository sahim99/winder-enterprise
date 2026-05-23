//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SectorPerformance {
  /// Returns a new [SectorPerformance] instance.
  SectorPerformance({
    this.sectorName,
    this.sectorCode,
    this.performanceRank,
    this.industries = const {},
    this.performance,
    this.changePercent,
    this.weightage,
    this.color,
    this.stockCount,
    this.totalValue,
    this.totalReturnAmount,
    this.stocks = const [],
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
  String? sectorCode;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? performanceRank;

  Map<String, List<StockDetail>> industries;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? performance;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? changePercent;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? weightage;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? color;

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
  num? totalValue;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? totalReturnAmount;

  List<StockDetail> stocks;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SectorPerformance &&
    other.sectorName == sectorName &&
    other.sectorCode == sectorCode &&
    other.performanceRank == performanceRank &&
    _deepEquality.equals(other.industries, industries) &&
    other.performance == performance &&
    other.changePercent == changePercent &&
    other.weightage == weightage &&
    other.color == color &&
    other.stockCount == stockCount &&
    other.totalValue == totalValue &&
    other.totalReturnAmount == totalReturnAmount &&
    _deepEquality.equals(other.stocks, stocks);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (sectorName == null ? 0 : sectorName!.hashCode) +
    (sectorCode == null ? 0 : sectorCode!.hashCode) +
    (performanceRank == null ? 0 : performanceRank!.hashCode) +
    (industries.hashCode) +
    (performance == null ? 0 : performance!.hashCode) +
    (changePercent == null ? 0 : changePercent!.hashCode) +
    (weightage == null ? 0 : weightage!.hashCode) +
    (color == null ? 0 : color!.hashCode) +
    (stockCount == null ? 0 : stockCount!.hashCode) +
    (totalValue == null ? 0 : totalValue!.hashCode) +
    (totalReturnAmount == null ? 0 : totalReturnAmount!.hashCode) +
    (stocks.hashCode);

  @override
  String toString() => 'SectorPerformance[sectorName=$sectorName, sectorCode=$sectorCode, performanceRank=$performanceRank, industries=$industries, performance=$performance, changePercent=$changePercent, weightage=$weightage, color=$color, stockCount=$stockCount, totalValue=$totalValue, totalReturnAmount=$totalReturnAmount, stocks=$stocks]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.sectorName != null) {
      json[r'sectorName'] = this.sectorName;
    } else {
      json[r'sectorName'] = null;
    }
    if (this.sectorCode != null) {
      json[r'sectorCode'] = this.sectorCode;
    } else {
      json[r'sectorCode'] = null;
    }
    if (this.performanceRank != null) {
      json[r'performanceRank'] = this.performanceRank;
    } else {
      json[r'performanceRank'] = null;
    }
      json[r'industries'] = this.industries;
    if (this.performance != null) {
      json[r'performance'] = this.performance;
    } else {
      json[r'performance'] = null;
    }
    if (this.changePercent != null) {
      json[r'changePercent'] = this.changePercent;
    } else {
      json[r'changePercent'] = null;
    }
    if (this.weightage != null) {
      json[r'weightage'] = this.weightage;
    } else {
      json[r'weightage'] = null;
    }
    if (this.color != null) {
      json[r'color'] = this.color;
    } else {
      json[r'color'] = null;
    }
    if (this.stockCount != null) {
      json[r'stockCount'] = this.stockCount;
    } else {
      json[r'stockCount'] = null;
    }
    if (this.totalValue != null) {
      json[r'totalValue'] = this.totalValue;
    } else {
      json[r'totalValue'] = null;
    }
    if (this.totalReturnAmount != null) {
      json[r'totalReturnAmount'] = this.totalReturnAmount;
    } else {
      json[r'totalReturnAmount'] = null;
    }
      json[r'stocks'] = this.stocks;
    return json;
  }

  /// Returns a new [SectorPerformance] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SectorPerformance? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "SectorPerformance[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "SectorPerformance[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return SectorPerformance(
        sectorName: mapValueOfType<String>(json, r'sectorName'),
        sectorCode: mapValueOfType<String>(json, r'sectorCode'),
        performanceRank: mapValueOfType<int>(json, r'performanceRank'),
        industries: json[r'industries'] == null
          ? const {}
            : StockDetail.mapListFromJson(json[r'industries']),
        performance: mapValueOfType<double>(json, r'performance'),
        changePercent: mapValueOfType<double>(json, r'changePercent'),
        weightage: mapValueOfType<double>(json, r'weightage'),
        color: mapValueOfType<String>(json, r'color'),
        stockCount: mapValueOfType<int>(json, r'stockCount'),
        totalValue: num.parse('${json[r'totalValue']}'),
        totalReturnAmount: num.parse('${json[r'totalReturnAmount']}'),
        stocks: StockDetail.listFromJson(json[r'stocks']),
      );
    }
    return null;
  }

  static List<SectorPerformance> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SectorPerformance>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SectorPerformance.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SectorPerformance> mapFromJson(dynamic json) {
    final map = <String, SectorPerformance>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SectorPerformance.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SectorPerformance-objects as value to a dart map
  static Map<String, List<SectorPerformance>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SectorPerformance>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SectorPerformance.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

