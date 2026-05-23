//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class PortfolioSummaryV1 {
  /// Returns a new [PortfolioSummaryV1] instance.
  PortfolioSummaryV1({
    this.investmentValue,
    this.currentValue,
    this.totalGainLoss,
    this.totalGainLossPercentage,
    this.todayGainLoss,
    this.todayGainLossPercentage,
    this.totalAssets,
    this.gainersCount,
    this.losersCount,
    this.todayGainersCount,
    this.todayLosersCount,
    this.lastUpdated,
    this.brokerPortfolios = const {},
    this.marketCapHoldings = const {},
    this.sectorialHoldings = const {},
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? investmentValue;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? currentValue;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? totalGainLoss;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? totalGainLossPercentage;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? todayGainLoss;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? todayGainLossPercentage;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? totalAssets;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? gainersCount;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? losersCount;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? todayGainersCount;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? todayLosersCount;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? lastUpdated;

  Map<String, BrokerPortfolioSummary> brokerPortfolios;

  Map<String, List<EquityHoldings>> marketCapHoldings;

  Map<String, List<EquityHoldings>> sectorialHoldings;

  @override
  bool operator ==(Object other) => identical(this, other) || other is PortfolioSummaryV1 &&
    other.investmentValue == investmentValue &&
    other.currentValue == currentValue &&
    other.totalGainLoss == totalGainLoss &&
    other.totalGainLossPercentage == totalGainLossPercentage &&
    other.todayGainLoss == todayGainLoss &&
    other.todayGainLossPercentage == todayGainLossPercentage &&
    other.totalAssets == totalAssets &&
    other.gainersCount == gainersCount &&
    other.losersCount == losersCount &&
    other.todayGainersCount == todayGainersCount &&
    other.todayLosersCount == todayLosersCount &&
    other.lastUpdated == lastUpdated &&
    _deepEquality.equals(other.brokerPortfolios, brokerPortfolios) &&
    _deepEquality.equals(other.marketCapHoldings, marketCapHoldings) &&
    _deepEquality.equals(other.sectorialHoldings, sectorialHoldings);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (investmentValue == null ? 0 : investmentValue!.hashCode) +
    (currentValue == null ? 0 : currentValue!.hashCode) +
    (totalGainLoss == null ? 0 : totalGainLoss!.hashCode) +
    (totalGainLossPercentage == null ? 0 : totalGainLossPercentage!.hashCode) +
    (todayGainLoss == null ? 0 : todayGainLoss!.hashCode) +
    (todayGainLossPercentage == null ? 0 : todayGainLossPercentage!.hashCode) +
    (totalAssets == null ? 0 : totalAssets!.hashCode) +
    (gainersCount == null ? 0 : gainersCount!.hashCode) +
    (losersCount == null ? 0 : losersCount!.hashCode) +
    (todayGainersCount == null ? 0 : todayGainersCount!.hashCode) +
    (todayLosersCount == null ? 0 : todayLosersCount!.hashCode) +
    (lastUpdated == null ? 0 : lastUpdated!.hashCode) +
    (brokerPortfolios.hashCode) +
    (marketCapHoldings.hashCode) +
    (sectorialHoldings.hashCode);

  @override
  String toString() => 'PortfolioSummaryV1[investmentValue=$investmentValue, currentValue=$currentValue, totalGainLoss=$totalGainLoss, totalGainLossPercentage=$totalGainLossPercentage, todayGainLoss=$todayGainLoss, todayGainLossPercentage=$todayGainLossPercentage, totalAssets=$totalAssets, gainersCount=$gainersCount, losersCount=$losersCount, todayGainersCount=$todayGainersCount, todayLosersCount=$todayLosersCount, lastUpdated=$lastUpdated, brokerPortfolios=$brokerPortfolios, marketCapHoldings=$marketCapHoldings, sectorialHoldings=$sectorialHoldings]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.investmentValue != null) {
      json[r'investmentValue'] = this.investmentValue;
    } else {
      json[r'investmentValue'] = null;
    }
    if (this.currentValue != null) {
      json[r'currentValue'] = this.currentValue;
    } else {
      json[r'currentValue'] = null;
    }
    if (this.totalGainLoss != null) {
      json[r'totalGainLoss'] = this.totalGainLoss;
    } else {
      json[r'totalGainLoss'] = null;
    }
    if (this.totalGainLossPercentage != null) {
      json[r'totalGainLossPercentage'] = this.totalGainLossPercentage;
    } else {
      json[r'totalGainLossPercentage'] = null;
    }
    if (this.todayGainLoss != null) {
      json[r'todayGainLoss'] = this.todayGainLoss;
    } else {
      json[r'todayGainLoss'] = null;
    }
    if (this.todayGainLossPercentage != null) {
      json[r'todayGainLossPercentage'] = this.todayGainLossPercentage;
    } else {
      json[r'todayGainLossPercentage'] = null;
    }
    if (this.totalAssets != null) {
      json[r'totalAssets'] = this.totalAssets;
    } else {
      json[r'totalAssets'] = null;
    }
    if (this.gainersCount != null) {
      json[r'gainersCount'] = this.gainersCount;
    } else {
      json[r'gainersCount'] = null;
    }
    if (this.losersCount != null) {
      json[r'losersCount'] = this.losersCount;
    } else {
      json[r'losersCount'] = null;
    }
    if (this.todayGainersCount != null) {
      json[r'todayGainersCount'] = this.todayGainersCount;
    } else {
      json[r'todayGainersCount'] = null;
    }
    if (this.todayLosersCount != null) {
      json[r'todayLosersCount'] = this.todayLosersCount;
    } else {
      json[r'todayLosersCount'] = null;
    }
    if (this.lastUpdated != null) {
      json[r'lastUpdated'] = this.lastUpdated!.toUtc().toIso8601String();
    } else {
      json[r'lastUpdated'] = null;
    }
      json[r'brokerPortfolios'] = this.brokerPortfolios;
      json[r'marketCapHoldings'] = this.marketCapHoldings;
      json[r'sectorialHoldings'] = this.sectorialHoldings;
    return json;
  }

  /// Returns a new [PortfolioSummaryV1] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static PortfolioSummaryV1? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "PortfolioSummaryV1[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "PortfolioSummaryV1[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return PortfolioSummaryV1(
        investmentValue: mapValueOfType<double>(json, r'investmentValue'),
        currentValue: mapValueOfType<double>(json, r'currentValue'),
        totalGainLoss: mapValueOfType<double>(json, r'totalGainLoss'),
        totalGainLossPercentage: mapValueOfType<double>(json, r'totalGainLossPercentage'),
        todayGainLoss: mapValueOfType<double>(json, r'todayGainLoss'),
        todayGainLossPercentage: mapValueOfType<double>(json, r'todayGainLossPercentage'),
        totalAssets: mapValueOfType<int>(json, r'totalAssets'),
        gainersCount: mapValueOfType<int>(json, r'gainersCount'),
        losersCount: mapValueOfType<int>(json, r'losersCount'),
        todayGainersCount: mapValueOfType<int>(json, r'todayGainersCount'),
        todayLosersCount: mapValueOfType<int>(json, r'todayLosersCount'),
        lastUpdated: mapDateTime(json, r'lastUpdated', r''),
        brokerPortfolios: BrokerPortfolioSummary.mapFromJson(json[r'brokerPortfolios']),
        marketCapHoldings: json[r'marketCapHoldings'] == null
          ? const {}
            : EquityHoldings.mapListFromJson(json[r'marketCapHoldings']),
        sectorialHoldings: json[r'sectorialHoldings'] == null
          ? const {}
            : EquityHoldings.mapListFromJson(json[r'sectorialHoldings']),
      );
    }
    return null;
  }

  static List<PortfolioSummaryV1> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PortfolioSummaryV1>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PortfolioSummaryV1.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, PortfolioSummaryV1> mapFromJson(dynamic json) {
    final map = <String, PortfolioSummaryV1>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = PortfolioSummaryV1.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of PortfolioSummaryV1-objects as value to a dart map
  static Map<String, List<PortfolioSummaryV1>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<PortfolioSummaryV1>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = PortfolioSummaryV1.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

