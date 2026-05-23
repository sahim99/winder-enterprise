//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class PortfolioModelV1 {
  /// Returns a new [PortfolioModelV1] instance.
  PortfolioModelV1({
    this.id,
    this.name,
    this.description,
    this.owner,
    this.currency,
    this.fundType,
    this.status,
    this.tags,
    this.notes,
    this.equityModels = const [],
    this.totalValue,
    this.brokerType,
    this.assetCount,
    this.createdAt,
    this.updatedAt,
    this.createdBy,
    this.updatedBy,
    this.version,
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
  String? name;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? description;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? owner;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? currency;

  PortfolioModelV1FundTypeEnum? fundType;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? status;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? tags;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? notes;

  List<EquityModel> equityModels;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? totalValue;

  PortfolioModelV1BrokerTypeEnum? brokerType;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? assetCount;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? createdAt;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  DateTime? updatedAt;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? createdBy;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? updatedBy;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? version;

  @override
  bool operator ==(Object other) => identical(this, other) || other is PortfolioModelV1 &&
    other.id == id &&
    other.name == name &&
    other.description == description &&
    other.owner == owner &&
    other.currency == currency &&
    other.fundType == fundType &&
    other.status == status &&
    other.tags == tags &&
    other.notes == notes &&
    _deepEquality.equals(other.equityModels, equityModels) &&
    other.totalValue == totalValue &&
    other.brokerType == brokerType &&
    other.assetCount == assetCount &&
    other.createdAt == createdAt &&
    other.updatedAt == updatedAt &&
    other.createdBy == createdBy &&
    other.updatedBy == updatedBy &&
    other.version == version;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (id == null ? 0 : id!.hashCode) +
    (name == null ? 0 : name!.hashCode) +
    (description == null ? 0 : description!.hashCode) +
    (owner == null ? 0 : owner!.hashCode) +
    (currency == null ? 0 : currency!.hashCode) +
    (fundType == null ? 0 : fundType!.hashCode) +
    (status == null ? 0 : status!.hashCode) +
    (tags == null ? 0 : tags!.hashCode) +
    (notes == null ? 0 : notes!.hashCode) +
    (equityModels.hashCode) +
    (totalValue == null ? 0 : totalValue!.hashCode) +
    (brokerType == null ? 0 : brokerType!.hashCode) +
    (assetCount == null ? 0 : assetCount!.hashCode) +
    (createdAt == null ? 0 : createdAt!.hashCode) +
    (updatedAt == null ? 0 : updatedAt!.hashCode) +
    (createdBy == null ? 0 : createdBy!.hashCode) +
    (updatedBy == null ? 0 : updatedBy!.hashCode) +
    (version == null ? 0 : version!.hashCode);

  @override
  String toString() => 'PortfolioModelV1[id=$id, name=$name, description=$description, owner=$owner, currency=$currency, fundType=$fundType, status=$status, tags=$tags, notes=$notes, equityModels=$equityModels, totalValue=$totalValue, brokerType=$brokerType, assetCount=$assetCount, createdAt=$createdAt, updatedAt=$updatedAt, createdBy=$createdBy, updatedBy=$updatedBy, version=$version]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.id != null) {
      json[r'id'] = this.id;
    } else {
      json[r'id'] = null;
    }
    if (this.name != null) {
      json[r'name'] = this.name;
    } else {
      json[r'name'] = null;
    }
    if (this.description != null) {
      json[r'description'] = this.description;
    } else {
      json[r'description'] = null;
    }
    if (this.owner != null) {
      json[r'owner'] = this.owner;
    } else {
      json[r'owner'] = null;
    }
    if (this.currency != null) {
      json[r'currency'] = this.currency;
    } else {
      json[r'currency'] = null;
    }
    if (this.fundType != null) {
      json[r'fundType'] = this.fundType;
    } else {
      json[r'fundType'] = null;
    }
    if (this.status != null) {
      json[r'status'] = this.status;
    } else {
      json[r'status'] = null;
    }
    if (this.tags != null) {
      json[r'tags'] = this.tags;
    } else {
      json[r'tags'] = null;
    }
    if (this.notes != null) {
      json[r'notes'] = this.notes;
    } else {
      json[r'notes'] = null;
    }
      json[r'equityModels'] = this.equityModels;
    if (this.totalValue != null) {
      json[r'totalValue'] = this.totalValue;
    } else {
      json[r'totalValue'] = null;
    }
    if (this.brokerType != null) {
      json[r'brokerType'] = this.brokerType;
    } else {
      json[r'brokerType'] = null;
    }
    if (this.assetCount != null) {
      json[r'assetCount'] = this.assetCount;
    } else {
      json[r'assetCount'] = null;
    }
    if (this.createdAt != null) {
      json[r'createdAt'] = this.createdAt!.toUtc().toIso8601String();
    } else {
      json[r'createdAt'] = null;
    }
    if (this.updatedAt != null) {
      json[r'updatedAt'] = this.updatedAt!.toUtc().toIso8601String();
    } else {
      json[r'updatedAt'] = null;
    }
    if (this.createdBy != null) {
      json[r'createdBy'] = this.createdBy;
    } else {
      json[r'createdBy'] = null;
    }
    if (this.updatedBy != null) {
      json[r'updatedBy'] = this.updatedBy;
    } else {
      json[r'updatedBy'] = null;
    }
    if (this.version != null) {
      json[r'version'] = this.version;
    } else {
      json[r'version'] = null;
    }
    return json;
  }

  /// Returns a new [PortfolioModelV1] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static PortfolioModelV1? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "PortfolioModelV1[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "PortfolioModelV1[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return PortfolioModelV1(
        id: mapValueOfType<String>(json, r'id'),
        name: mapValueOfType<String>(json, r'name'),
        description: mapValueOfType<String>(json, r'description'),
        owner: mapValueOfType<String>(json, r'owner'),
        currency: mapValueOfType<String>(json, r'currency'),
        fundType: PortfolioModelV1FundTypeEnum.fromJson(json[r'fundType']),
        status: mapValueOfType<String>(json, r'status'),
        tags: mapValueOfType<String>(json, r'tags'),
        notes: mapValueOfType<String>(json, r'notes'),
        equityModels: EquityModel.listFromJson(json[r'equityModels']),
        totalValue: mapValueOfType<double>(json, r'totalValue'),
        brokerType: PortfolioModelV1BrokerTypeEnum.fromJson(json[r'brokerType']),
        assetCount: mapValueOfType<int>(json, r'assetCount'),
        createdAt: mapDateTime(json, r'createdAt', r''),
        updatedAt: mapDateTime(json, r'updatedAt', r''),
        createdBy: mapValueOfType<String>(json, r'createdBy'),
        updatedBy: mapValueOfType<String>(json, r'updatedBy'),
        version: mapValueOfType<int>(json, r'version'),
      );
    }
    return null;
  }

  static List<PortfolioModelV1> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PortfolioModelV1>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PortfolioModelV1.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, PortfolioModelV1> mapFromJson(dynamic json) {
    final map = <String, PortfolioModelV1>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = PortfolioModelV1.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of PortfolioModelV1-objects as value to a dart map
  static Map<String, List<PortfolioModelV1>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<PortfolioModelV1>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = PortfolioModelV1.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


class PortfolioModelV1FundTypeEnum {
  /// Instantiate a new enum with the provided [value].
  const PortfolioModelV1FundTypeEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const largeCapEquityFund = PortfolioModelV1FundTypeEnum._(r'Large Cap Equity Fund');
  static const midCapEquityFund = PortfolioModelV1FundTypeEnum._(r'Mid Cap Equity Fund');
  static const smallCapEquityFund = PortfolioModelV1FundTypeEnum._(r'Small Cap Equity Fund');
  static const multiCapEquityFund = PortfolioModelV1FundTypeEnum._(r'Multi Cap Equity Fund');
  static const largeAmpersandMidCapEquityFund = PortfolioModelV1FundTypeEnum._(r'Large & Mid Cap Equity Fund');
  static const dividendYieldFund = PortfolioModelV1FundTypeEnum._(r'Dividend Yield Fund');
  static const focusedEquityFund = PortfolioModelV1FundTypeEnum._(r'Focused Equity Fund');
  static const contraFund = PortfolioModelV1FundTypeEnum._(r'Contra Fund');
  static const valueFund = PortfolioModelV1FundTypeEnum._(r'Value Fund');
  static const ultraShortDurationFund = PortfolioModelV1FundTypeEnum._(r'Ultra Short Duration Fund');
  static const lowDurationFund = PortfolioModelV1FundTypeEnum._(r'Low Duration Fund');
  static const shortDurationFund = PortfolioModelV1FundTypeEnum._(r'Short Duration Fund');
  static const mediumDurationFund = PortfolioModelV1FundTypeEnum._(r'Medium Duration Fund');
  static const longDurationFund = PortfolioModelV1FundTypeEnum._(r'Long Duration Fund');
  static const dynamicBondFund = PortfolioModelV1FundTypeEnum._(r'Dynamic Bond Fund');
  static const corporateBondFund = PortfolioModelV1FundTypeEnum._(r'Corporate Bond Fund');
  static const creditRiskFund = PortfolioModelV1FundTypeEnum._(r'Credit Risk Fund');
  static const bankingAndPSUFund = PortfolioModelV1FundTypeEnum._(r'Banking and PSU Fund');
  static const floaterFund = PortfolioModelV1FundTypeEnum._(r'Floater Fund');
  static const aggressiveHybridFund = PortfolioModelV1FundTypeEnum._(r'Aggressive Hybrid Fund');
  static const balancedHybridFund = PortfolioModelV1FundTypeEnum._(r'Balanced Hybrid Fund');
  static const conservativeHybridFund = PortfolioModelV1FundTypeEnum._(r'Conservative Hybrid Fund');
  static const equitySavingsFund = PortfolioModelV1FundTypeEnum._(r'Equity Savings Fund');
  static const multiAssetAllocationFund = PortfolioModelV1FundTypeEnum._(r'Multi Asset Allocation Fund');
  static const nifty50IndexFund = PortfolioModelV1FundTypeEnum._(r'Nifty 50 Index Fund');
  static const sensexIndexFund = PortfolioModelV1FundTypeEnum._(r'Sensex Index Fund');
  static const niftyNext50IndexFund = PortfolioModelV1FundTypeEnum._(r'Nifty Next 50 Index Fund');
  static const midcapIndexFund = PortfolioModelV1FundTypeEnum._(r'Midcap Index Fund');
  static const smallcapIndexFund = PortfolioModelV1FundTypeEnum._(r'Smallcap Index Fund');
  static const sectoralIndexFund = PortfolioModelV1FundTypeEnum._(r'Sectoral Index Fund');
  static const bankingSectorFund = PortfolioModelV1FundTypeEnum._(r'Banking Sector Fund');
  static const iTSectorFund = PortfolioModelV1FundTypeEnum._(r'IT Sector Fund');
  static const pharmaSectorFund = PortfolioModelV1FundTypeEnum._(r'Pharma Sector Fund');
  static const fMCGSectorFund = PortfolioModelV1FundTypeEnum._(r'FMCG Sector Fund');
  static const infrastructureFund = PortfolioModelV1FundTypeEnum._(r'Infrastructure Fund');
  static const autoSectorFund = PortfolioModelV1FundTypeEnum._(r'Auto Sector Fund');
  static const powerSectorFund = PortfolioModelV1FundTypeEnum._(r'Power Sector Fund');
  static const metalSectorFund = PortfolioModelV1FundTypeEnum._(r'Metal Sector Fund');
  static const consumptionSectorFund = PortfolioModelV1FundTypeEnum._(r'Consumption Sector Fund');
  static const eSGFund = PortfolioModelV1FundTypeEnum._(r'ESG Fund');
  static const mNCFund = PortfolioModelV1FundTypeEnum._(r'MNC Fund');
  static const globalAdvantageFund = PortfolioModelV1FundTypeEnum._(r'Global Advantage Fund');
  static const retirementFund = PortfolioModelV1FundTypeEnum._(r'Retirement Fund');
  static const childrenQuoteSFund = PortfolioModelV1FundTypeEnum._(r'Children's Fund');
  static const pensionFund = PortfolioModelV1FundTypeEnum._(r'Pension Fund');
  static const uSEquityFund = PortfolioModelV1FundTypeEnum._(r'US Equity Fund');
  static const emergingMarketsFund = PortfolioModelV1FundTypeEnum._(r'Emerging Markets Fund');
  static const globalEquityFund = PortfolioModelV1FundTypeEnum._(r'Global Equity Fund');
  static const europeanMarketsFund = PortfolioModelV1FundTypeEnum._(r'European Markets Fund');
  static const japaneseMarketsFund = PortfolioModelV1FundTypeEnum._(r'Japanese Markets Fund');
  static const chinaMarketsFund = PortfolioModelV1FundTypeEnum._(r'China Markets Fund');
  static const liquidFund = PortfolioModelV1FundTypeEnum._(r'Liquid Fund');
  static const overnightFund = PortfolioModelV1FundTypeEnum._(r'Overnight Fund');
  static const arbitrageFund = PortfolioModelV1FundTypeEnum._(r'Arbitrage Fund');
  static const giltFund = PortfolioModelV1FundTypeEnum._(r'Gilt Fund');
  static const giltWithConstantMaturity = PortfolioModelV1FundTypeEnum._(r'Gilt with Constant Maturity');
  static const eLSSTaxSaver = PortfolioModelV1FundTypeEnum._(r'ELSS Tax Saver');
  static const fundOfFundsDomestic = PortfolioModelV1FundTypeEnum._(r'Fund of Funds - Domestic');
  static const fundOfFundsOverseas = PortfolioModelV1FundTypeEnum._(r'Fund of Funds - Overseas');
  static const default_ = PortfolioModelV1FundTypeEnum._(r'Default');

  /// List of all possible values in this [enum][PortfolioModelV1FundTypeEnum].
  static const values = <PortfolioModelV1FundTypeEnum>[
    largeCapEquityFund,
    midCapEquityFund,
    smallCapEquityFund,
    multiCapEquityFund,
    largeAmpersandMidCapEquityFund,
    dividendYieldFund,
    focusedEquityFund,
    contraFund,
    valueFund,
    ultraShortDurationFund,
    lowDurationFund,
    shortDurationFund,
    mediumDurationFund,
    longDurationFund,
    dynamicBondFund,
    corporateBondFund,
    creditRiskFund,
    bankingAndPSUFund,
    floaterFund,
    aggressiveHybridFund,
    balancedHybridFund,
    conservativeHybridFund,
    equitySavingsFund,
    multiAssetAllocationFund,
    nifty50IndexFund,
    sensexIndexFund,
    niftyNext50IndexFund,
    midcapIndexFund,
    smallcapIndexFund,
    sectoralIndexFund,
    bankingSectorFund,
    iTSectorFund,
    pharmaSectorFund,
    fMCGSectorFund,
    infrastructureFund,
    autoSectorFund,
    powerSectorFund,
    metalSectorFund,
    consumptionSectorFund,
    eSGFund,
    mNCFund,
    globalAdvantageFund,
    retirementFund,
    childrenQuoteSFund,
    pensionFund,
    uSEquityFund,
    emergingMarketsFund,
    globalEquityFund,
    europeanMarketsFund,
    japaneseMarketsFund,
    chinaMarketsFund,
    liquidFund,
    overnightFund,
    arbitrageFund,
    giltFund,
    giltWithConstantMaturity,
    eLSSTaxSaver,
    fundOfFundsDomestic,
    fundOfFundsOverseas,
    default_,
  ];

  static PortfolioModelV1FundTypeEnum? fromJson(dynamic value) => PortfolioModelV1FundTypeEnumTypeTransformer().decode(value);

  static List<PortfolioModelV1FundTypeEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PortfolioModelV1FundTypeEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PortfolioModelV1FundTypeEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [PortfolioModelV1FundTypeEnum] to String,
/// and [decode] dynamic data back to [PortfolioModelV1FundTypeEnum].
class PortfolioModelV1FundTypeEnumTypeTransformer {
  factory PortfolioModelV1FundTypeEnumTypeTransformer() => _instance ??= const PortfolioModelV1FundTypeEnumTypeTransformer._();

  const PortfolioModelV1FundTypeEnumTypeTransformer._();

  String encode(PortfolioModelV1FundTypeEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a PortfolioModelV1FundTypeEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  PortfolioModelV1FundTypeEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'Large Cap Equity Fund': return PortfolioModelV1FundTypeEnum.largeCapEquityFund;
        case r'Mid Cap Equity Fund': return PortfolioModelV1FundTypeEnum.midCapEquityFund;
        case r'Small Cap Equity Fund': return PortfolioModelV1FundTypeEnum.smallCapEquityFund;
        case r'Multi Cap Equity Fund': return PortfolioModelV1FundTypeEnum.multiCapEquityFund;
        case r'Large & Mid Cap Equity Fund': return PortfolioModelV1FundTypeEnum.largeAmpersandMidCapEquityFund;
        case r'Dividend Yield Fund': return PortfolioModelV1FundTypeEnum.dividendYieldFund;
        case r'Focused Equity Fund': return PortfolioModelV1FundTypeEnum.focusedEquityFund;
        case r'Contra Fund': return PortfolioModelV1FundTypeEnum.contraFund;
        case r'Value Fund': return PortfolioModelV1FundTypeEnum.valueFund;
        case r'Ultra Short Duration Fund': return PortfolioModelV1FundTypeEnum.ultraShortDurationFund;
        case r'Low Duration Fund': return PortfolioModelV1FundTypeEnum.lowDurationFund;
        case r'Short Duration Fund': return PortfolioModelV1FundTypeEnum.shortDurationFund;
        case r'Medium Duration Fund': return PortfolioModelV1FundTypeEnum.mediumDurationFund;
        case r'Long Duration Fund': return PortfolioModelV1FundTypeEnum.longDurationFund;
        case r'Dynamic Bond Fund': return PortfolioModelV1FundTypeEnum.dynamicBondFund;
        case r'Corporate Bond Fund': return PortfolioModelV1FundTypeEnum.corporateBondFund;
        case r'Credit Risk Fund': return PortfolioModelV1FundTypeEnum.creditRiskFund;
        case r'Banking and PSU Fund': return PortfolioModelV1FundTypeEnum.bankingAndPSUFund;
        case r'Floater Fund': return PortfolioModelV1FundTypeEnum.floaterFund;
        case r'Aggressive Hybrid Fund': return PortfolioModelV1FundTypeEnum.aggressiveHybridFund;
        case r'Balanced Hybrid Fund': return PortfolioModelV1FundTypeEnum.balancedHybridFund;
        case r'Conservative Hybrid Fund': return PortfolioModelV1FundTypeEnum.conservativeHybridFund;
        case r'Equity Savings Fund': return PortfolioModelV1FundTypeEnum.equitySavingsFund;
        case r'Multi Asset Allocation Fund': return PortfolioModelV1FundTypeEnum.multiAssetAllocationFund;
        case r'Nifty 50 Index Fund': return PortfolioModelV1FundTypeEnum.nifty50IndexFund;
        case r'Sensex Index Fund': return PortfolioModelV1FundTypeEnum.sensexIndexFund;
        case r'Nifty Next 50 Index Fund': return PortfolioModelV1FundTypeEnum.niftyNext50IndexFund;
        case r'Midcap Index Fund': return PortfolioModelV1FundTypeEnum.midcapIndexFund;
        case r'Smallcap Index Fund': return PortfolioModelV1FundTypeEnum.smallcapIndexFund;
        case r'Sectoral Index Fund': return PortfolioModelV1FundTypeEnum.sectoralIndexFund;
        case r'Banking Sector Fund': return PortfolioModelV1FundTypeEnum.bankingSectorFund;
        case r'IT Sector Fund': return PortfolioModelV1FundTypeEnum.iTSectorFund;
        case r'Pharma Sector Fund': return PortfolioModelV1FundTypeEnum.pharmaSectorFund;
        case r'FMCG Sector Fund': return PortfolioModelV1FundTypeEnum.fMCGSectorFund;
        case r'Infrastructure Fund': return PortfolioModelV1FundTypeEnum.infrastructureFund;
        case r'Auto Sector Fund': return PortfolioModelV1FundTypeEnum.autoSectorFund;
        case r'Power Sector Fund': return PortfolioModelV1FundTypeEnum.powerSectorFund;
        case r'Metal Sector Fund': return PortfolioModelV1FundTypeEnum.metalSectorFund;
        case r'Consumption Sector Fund': return PortfolioModelV1FundTypeEnum.consumptionSectorFund;
        case r'ESG Fund': return PortfolioModelV1FundTypeEnum.eSGFund;
        case r'MNC Fund': return PortfolioModelV1FundTypeEnum.mNCFund;
        case r'Global Advantage Fund': return PortfolioModelV1FundTypeEnum.globalAdvantageFund;
        case r'Retirement Fund': return PortfolioModelV1FundTypeEnum.retirementFund;
        case r'Children's Fund': return PortfolioModelV1FundTypeEnum.childrenQuoteSFund;
        case r'Pension Fund': return PortfolioModelV1FundTypeEnum.pensionFund;
        case r'US Equity Fund': return PortfolioModelV1FundTypeEnum.uSEquityFund;
        case r'Emerging Markets Fund': return PortfolioModelV1FundTypeEnum.emergingMarketsFund;
        case r'Global Equity Fund': return PortfolioModelV1FundTypeEnum.globalEquityFund;
        case r'European Markets Fund': return PortfolioModelV1FundTypeEnum.europeanMarketsFund;
        case r'Japanese Markets Fund': return PortfolioModelV1FundTypeEnum.japaneseMarketsFund;
        case r'China Markets Fund': return PortfolioModelV1FundTypeEnum.chinaMarketsFund;
        case r'Liquid Fund': return PortfolioModelV1FundTypeEnum.liquidFund;
        case r'Overnight Fund': return PortfolioModelV1FundTypeEnum.overnightFund;
        case r'Arbitrage Fund': return PortfolioModelV1FundTypeEnum.arbitrageFund;
        case r'Gilt Fund': return PortfolioModelV1FundTypeEnum.giltFund;
        case r'Gilt with Constant Maturity': return PortfolioModelV1FundTypeEnum.giltWithConstantMaturity;
        case r'ELSS Tax Saver': return PortfolioModelV1FundTypeEnum.eLSSTaxSaver;
        case r'Fund of Funds - Domestic': return PortfolioModelV1FundTypeEnum.fundOfFundsDomestic;
        case r'Fund of Funds - Overseas': return PortfolioModelV1FundTypeEnum.fundOfFundsOverseas;
        case r'Default': return PortfolioModelV1FundTypeEnum.default_;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [PortfolioModelV1FundTypeEnumTypeTransformer] instance.
  static PortfolioModelV1FundTypeEnumTypeTransformer? _instance;
}



class PortfolioModelV1BrokerTypeEnum {
  /// Instantiate a new enum with the provided [value].
  const PortfolioModelV1BrokerTypeEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const DHAN = PortfolioModelV1BrokerTypeEnum._(r'DHAN');
  static const ZERODHA = PortfolioModelV1BrokerTypeEnum._(r'ZERODHA');
  static const MSTOCK = PortfolioModelV1BrokerTypeEnum._(r'MSTOCK');
  static const GROW = PortfolioModelV1BrokerTypeEnum._(r'GROW');
  static const KOTAK = PortfolioModelV1BrokerTypeEnum._(r'KOTAK');

  /// List of all possible values in this [enum][PortfolioModelV1BrokerTypeEnum].
  static const values = <PortfolioModelV1BrokerTypeEnum>[
    DHAN,
    ZERODHA,
    MSTOCK,
    GROW,
    KOTAK,
  ];

  static PortfolioModelV1BrokerTypeEnum? fromJson(dynamic value) => PortfolioModelV1BrokerTypeEnumTypeTransformer().decode(value);

  static List<PortfolioModelV1BrokerTypeEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <PortfolioModelV1BrokerTypeEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = PortfolioModelV1BrokerTypeEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [PortfolioModelV1BrokerTypeEnum] to String,
/// and [decode] dynamic data back to [PortfolioModelV1BrokerTypeEnum].
class PortfolioModelV1BrokerTypeEnumTypeTransformer {
  factory PortfolioModelV1BrokerTypeEnumTypeTransformer() => _instance ??= const PortfolioModelV1BrokerTypeEnumTypeTransformer._();

  const PortfolioModelV1BrokerTypeEnumTypeTransformer._();

  String encode(PortfolioModelV1BrokerTypeEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a PortfolioModelV1BrokerTypeEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  PortfolioModelV1BrokerTypeEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'DHAN': return PortfolioModelV1BrokerTypeEnum.DHAN;
        case r'ZERODHA': return PortfolioModelV1BrokerTypeEnum.ZERODHA;
        case r'MSTOCK': return PortfolioModelV1BrokerTypeEnum.MSTOCK;
        case r'GROW': return PortfolioModelV1BrokerTypeEnum.GROW;
        case r'KOTAK': return PortfolioModelV1BrokerTypeEnum.KOTAK;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [PortfolioModelV1BrokerTypeEnumTypeTransformer] instance.
  static PortfolioModelV1BrokerTypeEnumTypeTransformer? _instance;
}


