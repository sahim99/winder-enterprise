//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class StockMovement {
  /// Returns a new [StockMovement] instance.
  StockMovement({
    this.symbol,
    this.companyName,
    this.lastPrice,
    this.changeAmount,
    this.changePercent,
    this.sector,
    this.quantity,
    this.marketValue,
    this.weightPercentage,
  });

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
  String? companyName;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? lastPrice;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? changeAmount;

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
  String? sector;

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
  double? marketValue;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  double? weightPercentage;

  @override
  bool operator ==(Object other) => identical(this, other) || other is StockMovement &&
    other.symbol == symbol &&
    other.companyName == companyName &&
    other.lastPrice == lastPrice &&
    other.changeAmount == changeAmount &&
    other.changePercent == changePercent &&
    other.sector == sector &&
    other.quantity == quantity &&
    other.marketValue == marketValue &&
    other.weightPercentage == weightPercentage;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (symbol == null ? 0 : symbol!.hashCode) +
    (companyName == null ? 0 : companyName!.hashCode) +
    (lastPrice == null ? 0 : lastPrice!.hashCode) +
    (changeAmount == null ? 0 : changeAmount!.hashCode) +
    (changePercent == null ? 0 : changePercent!.hashCode) +
    (sector == null ? 0 : sector!.hashCode) +
    (quantity == null ? 0 : quantity!.hashCode) +
    (marketValue == null ? 0 : marketValue!.hashCode) +
    (weightPercentage == null ? 0 : weightPercentage!.hashCode);

  @override
  String toString() => 'StockMovement[symbol=$symbol, companyName=$companyName, lastPrice=$lastPrice, changeAmount=$changeAmount, changePercent=$changePercent, sector=$sector, quantity=$quantity, marketValue=$marketValue, weightPercentage=$weightPercentage]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.symbol != null) {
      json[r'symbol'] = this.symbol;
    } else {
      json[r'symbol'] = null;
    }
    if (this.companyName != null) {
      json[r'companyName'] = this.companyName;
    } else {
      json[r'companyName'] = null;
    }
    if (this.lastPrice != null) {
      json[r'lastPrice'] = this.lastPrice;
    } else {
      json[r'lastPrice'] = null;
    }
    if (this.changeAmount != null) {
      json[r'changeAmount'] = this.changeAmount;
    } else {
      json[r'changeAmount'] = null;
    }
    if (this.changePercent != null) {
      json[r'changePercent'] = this.changePercent;
    } else {
      json[r'changePercent'] = null;
    }
    if (this.sector != null) {
      json[r'sector'] = this.sector;
    } else {
      json[r'sector'] = null;
    }
    if (this.quantity != null) {
      json[r'quantity'] = this.quantity;
    } else {
      json[r'quantity'] = null;
    }
    if (this.marketValue != null) {
      json[r'marketValue'] = this.marketValue;
    } else {
      json[r'marketValue'] = null;
    }
    if (this.weightPercentage != null) {
      json[r'weightPercentage'] = this.weightPercentage;
    } else {
      json[r'weightPercentage'] = null;
    }
    return json;
  }

  /// Returns a new [StockMovement] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static StockMovement? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "StockMovement[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "StockMovement[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return StockMovement(
        symbol: mapValueOfType<String>(json, r'symbol'),
        companyName: mapValueOfType<String>(json, r'companyName'),
        lastPrice: mapValueOfType<double>(json, r'lastPrice'),
        changeAmount: mapValueOfType<double>(json, r'changeAmount'),
        changePercent: mapValueOfType<double>(json, r'changePercent'),
        sector: mapValueOfType<String>(json, r'sector'),
        quantity: mapValueOfType<double>(json, r'quantity'),
        marketValue: mapValueOfType<double>(json, r'marketValue'),
        weightPercentage: mapValueOfType<double>(json, r'weightPercentage'),
      );
    }
    return null;
  }

  static List<StockMovement> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <StockMovement>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = StockMovement.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, StockMovement> mapFromJson(dynamic json) {
    final map = <String, StockMovement>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = StockMovement.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of StockMovement-objects as value to a dart map
  static Map<String, List<StockMovement>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<StockMovement>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = StockMovement.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}

