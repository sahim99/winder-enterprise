//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EquityHoldings {
  /// Returns a new [EquityHoldings] instance.
  EquityHoldings({
    this.isin,
    this.symbol,
    this.name,
    this.sector,
    this.industry,
    this.marketCap,
    this.quantity,
    this.investmentCost,
    this.currentValue,
    this.weightInPortfolio,
    this.gainLoss,
    this.gainLossPercentage,
    this.todayGainLoss,
    this.todayGainLossPercentage,
    this.averageBuyingPrice,
    this.currentPrice,
    this.percentageChange,
    this.brokerPortfolios = const [],
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? isin;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? symbol;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? name;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? sector;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? industry;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? marketCap;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? quantity;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? investmentCost;

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
  double? weightInPortfolio;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? gainLoss;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? gainLossPercentage;

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
  double? averageBuyingPrice;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? currentPrice;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? percentageChange;

  List<EquityBrokerHolding> brokerPortfolios;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EquityHoldings &&
    other.isin == isin &&
    other.symbol == symbol &&
    other.name == name &&
    other.sector == sector &&
    other.industry == industry &&
    other.marketCap == marketCap &&
    other.quantity == quantity &&
    other.investmentCost == investmentCost &&
    other.currentValue == currentValue &&
    other.weightInPortfolio == weightInPortfolio &&
    other.gainLoss == gainLoss &&
    other.gainLossPercentage == gainLossPercentage &&
    other.todayGainLoss == todayGainLoss &&
    other.todayGainLossPercentage == todayGainLossPercentage &&
    other.averageBuyingPrice == averageBuyingPrice &&
    other.currentPrice == currentPrice &&
    other.percentageChange == percentageChange &&
    _deepEquality.equals(other.brokerPortfolios, brokerPortfolios);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (isin == null ? 0 : isin!.hashCode) +
    (symbol == null ? 0 : symbol!.hashCode) +
    (name == null ? 0 : name!.hashCode) +
    (sector == null ? 0 : sector!.hashCode) +
    (industry == null ? 0 : industry!.hashCode) +
    (marketCap == null ? 0 : marketCap!.hashCode) +
    (quantity == null ? 0 : quantity!.hashCode) +
    (investmentCost == null ? 0 : investmentCost!.hashCode) +
    (currentValue == null ? 0 : currentValue!.hashCode) +
    (weightInPortfolio == null ? 0 : weightInPortfolio!.hashCode) +
    (gainLoss == null ? 0 : gainLoss!.hashCode) +
    (gainLossPercentage == null ? 0 : gainLossPercentage!.hashCode) +
    (todayGainLoss == null ? 0 : todayGainLoss!.hashCode) +
    (todayGainLossPercentage == null ? 0 : todayGainLossPercentage!.hashCode) +
    (averageBuyingPrice == null ? 0 : averageBuyingPrice!.hashCode) +
    (currentPrice == null ? 0 : currentPrice!.hashCode) +
    (percentageChange == null ? 0 : percentageChange!.hashCode) +
    (brokerPortfolios.hashCode);

  @override
  String toString() => 'EquityHoldings[isin=$isin, symbol=$symbol, name=$name, sector=$sector, industry=$industry, marketCap=$marketCap, quantity=$quantity, investmentCost=$investmentCost, currentValue=$currentValue, weightInPortfolio=$weightInPortfolio, gainLoss=$gainLoss, gainLossPercentage=$gainLossPercentage, todayGainLoss=$todayGainLoss, todayGainLossPercentage=$todayGainLossPercentage, averageBuyingPrice=$averageBuyingPrice, currentPrice=$currentPrice, percentageChange=$percentageChange, brokerPortfolios=$brokerPortfolios]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.isin != null) {
      json[r'isin'] = this.isin;
    } else {
      json[r'isin'] = null;
    }
    if (this.symbol != null) {
      json[r'symbol'] = this.symbol;
    } else {
      json[r'symbol'] = null;
    }
    if (this.name != null) {
      json[r'name'] = this.name;
    } else {
      json[r'name'] = null;
    }
    if (this.sector != null) {
      json[r'sector'] = this.sector;
    } else {
      json[r'sector'] = null;
    }
    if (this.industry != null) {
      json[r'industry'] = this.industry;
    } else {
      json[r'industry'] = null;
    }
    if (this.marketCap != null) {
      json[r'marketCap'] = this.marketCap;
    } else {
      json[r'marketCap'] = null;
    }
    if (this.quantity != null) {
      json[r'quantity'] = this.quantity;
    } else {
      json[r'quantity'] = null;
    }
    if (this.investmentCost != null) {
      json[r'investmentCost'] = this.investmentCost;
    } else {
      json[r'investmentCost'] = null;
    }
    if (this.currentValue != null) {
      json[r'currentValue'] = this.currentValue;
    } else {
      json[r'currentValue'] = null;
    }
    if (this.weightInPortfolio != null) {
      json[r'weightInPortfolio'] = this.weightInPortfolio;
    } else {
      json[r'weightInPortfolio'] = null;
    }
    if (this.gainLoss != null) {
      json[r'gainLoss'] = this.gainLoss;
    } else {
      json[r'gainLoss'] = null;
    }
    if (this.gainLossPercentage != null) {
      json[r'gainLossPercentage'] = this.gainLossPercentage;
    } else {
      json[r'gainLossPercentage'] = null;
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
    if (this.averageBuyingPrice != null) {
      json[r'averageBuyingPrice'] = this.averageBuyingPrice;
    } else {
      json[r'averageBuyingPrice'] = null;
    }
    if (this.currentPrice != null) {
      json[r'currentPrice'] = this.currentPrice;
    } else {
      json[r'currentPrice'] = null;
    }
    if (this.percentageChange != null) {
      json[r'percentageChange'] = this.percentageChange;
    } else {
      json[r'percentageChange'] = null;
    }
      json[r'brokerPortfolios'] = this.brokerPortfolios;
    return json;
  }

  /// Returns a new [EquityHoldings] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EquityHoldings? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EquityHoldings[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EquityHoldings[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EquityHoldings(
        isin: mapValueOfType<String>(json, r'isin'),
        symbol: mapValueOfType<String>(json, r'symbol'),
        name: mapValueOfType<String>(json, r'name'),
        sector: mapValueOfType<String>(json, r'sector'),
        industry: mapValueOfType<String>(json, r'industry'),
        marketCap: mapValueOfType<String>(json, r'marketCap'),
        quantity: mapValueOfType<double>(json, r'quantity'),
        investmentCost: mapValueOfType<double>(json, r'investmentCost'),
        currentValue: mapValueOfType<double>(json, r'currentValue'),
        weightInPortfolio: mapValueOfType<double>(json, r'weightInPortfolio'),
        gainLoss: mapValueOfType<double>(json, r'gainLoss'),
        gainLossPercentage: mapValueOfType<double>(json, r'gainLossPercentage'),
        todayGainLoss: mapValueOfType<double>(json, r'todayGainLoss'),
        todayGainLossPercentage: mapValueOfType<double>(json, r'todayGainLossPercentage'),
        averageBuyingPrice: mapValueOfType<double>(json, r'averageBuyingPrice'),
        currentPrice: mapValueOfType<double>(json, r'currentPrice'),
        percentageChange: mapValueOfType<double>(json, r'percentageChange'),
        brokerPortfolios: EquityBrokerHolding.listFromJson(json[r'brokerPortfolios']),
      );
    }
    return null;
  }

  static List<EquityHoldings> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EquityHoldings>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EquityHoldings.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EquityHoldings> mapFromJson(dynamic json) {
    final map = <String, EquityHoldings>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EquityHoldings.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EquityHoldings-objects as value to a dart map
  static Map<String, List<EquityHoldings>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EquityHoldings>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = EquityHoldings.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

